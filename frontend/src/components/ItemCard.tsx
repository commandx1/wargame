import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { sounds } from '../audio';
import { itemApi } from '../services/api';
import { localEnergyAtom, userAtom } from '../store/authStore';
import { itemsAtom } from '../store/gameStore';
import type { Particle } from '../types/animations';
import type { Item } from '../types/item';
import LevelUpAnimation from './LevelUpAnimation';

const MAX_LEVEL = 3;

const ItemCard = ({ item, cardHeight }: { item: Item; cardHeight: number }) => {
    const setItems = useSetAtom(itemsAtom);
    const [user, setUser] = useAtom(userAtom);
    const [localEnergy, setLocalEnergy] = useAtom(localEnergyAtom);

    const [isAnimating, setIsAnimating] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    // Debounce states
    const [localPercentage, setLocalPercentage] = useState(item.percentage);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingUpdatesRef = useRef(0);
    const basePercentageRef = useRef(item.percentage);
    const currentLocalEnergyRef = useRef(localEnergy); // Track the base percentage from server

    const createParticles = (isLevel3 = false) => {
        const newParticles: Particle[] = [];
        // Level 3 için daha fazla renk ve parçacık
        const colors = isLevel3
            ? ['#FFD700', '#FFA500', '#FFFFFF', '#FF6B35', '#4ECDC4', '#9B59B6']
            : ['#FFD700', '#FFA500', '#FFFFFF'];

        const particleCount = isLevel3 ? 50 : 30;

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 400,
                y: Math.random() * 400,
                vx: (Math.random() - 0.5) * (isLevel3 ? 12 : 8),
                vy: (Math.random() - 0.5) * (isLevel3 ? 12 : 8),
                life: isLevel3 ? 150 : 120,
                maxLife: isLevel3 ? 150 : 120,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * (isLevel3 ? 6 : 4) + 2
            });
        }
        setParticles(newParticles);
    };

    // Sync local percentage with props (external updates)
    useEffect(() => {
        // Only sync if there are no pending updates (to avoid overriding user clicks)
        if (pendingUpdatesRef.current === 0) {
            setLocalPercentage(item.percentage);
            basePercentageRef.current = item.percentage;
        }
    }, [item.percentage]);

    // Sync local energy with user energy changes (from API responses)
    useEffect(() => {
        if (user?.energy !== undefined) {
            setLocalEnergy(user.energy);
        }
    }, [user?.energy, setLocalEnergy]);

    // Keep ref updated with latest localEnergy value
    useEffect(() => {
        currentLocalEnergyRef.current = localEnergy;
    }, [localEnergy]);

    // Debounced API call
    const sendUpdateToAPI = useCallback(async () => {
        if (!user?.id || pendingUpdatesRef.current === 0) return;

        try {
            // Calculate final percentage: base + all pending updates
            const finalPercentage = basePercentageRef.current + pendingUpdatesRef.current * 2;
            
            // Use ref to get the latest localEnergy value to avoid stale closure
            const finalEnergy = currentLocalEnergyRef.current;
            
            console.log('Energy sync debug:', {
                itemTitle: item.title,
                userEnergy: user?.energy,
                localEnergy: currentLocalEnergyRef.current,
                pendingUpdates: pendingUpdatesRef.current,
                finalEnergy: finalEnergy,
                calculation: `${currentLocalEnergyRef.current} (current) - ${pendingUpdatesRef.current} (pending) = ${currentLocalEnergyRef.current - pendingUpdatesRef.current}`
            });

            const response = await itemApi.progress(user.id, item.id, finalPercentage, finalEnergy);

            // Update global state with server response
            setUser((prev: any) => {
                const user = {
                    ...prev,
                    energy: response.data.energy
                };

                localStorage.setItem('user', JSON.stringify(user));

                return user;
            });

            // Update local energy to match server response
            setLocalEnergy(response.data.energy);

            setItems((prev: Item[]) =>
                prev.map(i =>
                    i.id === item.id
                        ? {
                              ...response.data.item,
                              id: response.data.item._id || response.data.item.id
                          }
                        : i
                )
            );

            // Sync local percentage with server response and update base
            setLocalPercentage(response.data.item.percentage);
            basePercentageRef.current = response.data.item.percentage;

            pendingUpdatesRef.current = 0;
        } catch (error) {
            console.error('Failed to update item progress:', error);
            // Revert local changes on error
            setLocalPercentage(basePercentageRef.current);
            if (user?.energy !== undefined) {
                setLocalEnergy(user.energy);
            }
            pendingUpdatesRef.current = 0;
        }
    }, [user?.id, user?.energy, item.title, item.id, setUser, setLocalEnergy, setItems]);

    const handleCardClick = () => {
        if (!user?.id || localEnergy <= 0) return;

        console.log('Click debug - Before:', {
            itemTitle: item.title,
            localEnergy,
            pendingUpdates: pendingUpdatesRef.current
        });

                    // Update local state immediately for instant feedback
            setLocalPercentage(prev => prev + 2);
            setLocalEnergy(prev => {
                const newEnergy = prev - 1;
                // Update ref immediately for accurate API calls
                currentLocalEnergyRef.current = newEnergy;
                return newEnergy;
            });
            pendingUpdatesRef.current += 1;

        console.log('Click debug - After:', {
            itemTitle: item.title,
            localEnergy: localEnergy - 1,
            pendingUpdates: pendingUpdatesRef.current
        });

        // Clear existing timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Set new timeout for API call
        debounceTimeoutRef.current = setTimeout(() => {
            sendUpdateToAPI();
        }, 700);

        // Play sound and create particles
        sounds.itemClick.play();
        createParticles();
    };

    const handleLevelUpClick = async () => {
        if (item.level === MAX_LEVEL || isAnimating || !user?.id) return;

        try {
            setIsAnimating(true);
            createParticles(item.level === 2); // Level 3 particles if going to level 3

            // Clear any pending progress updates
            pendingUpdatesRef.current = 0;
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
                debounceTimeoutRef.current = null;
            }

            const transformDelay = item.level === 2 ? 2500 : 1800;
            const totalDuration = item.level === 2 ? 6000 : 4000;

            setTimeout(async () => {
                try {
                    // Call backend level up API
                    const response = await itemApi.levelUp(item.id);
                    const upgradedItem = response.data.item;

                    // Play sound based on new level
                    if (upgradedItem.level >= 2) {
                        sounds.levelUp.play();
                    }

                    // Update items state with server response
                    const updatedItemWithId = {
                        ...upgradedItem,
                        id: upgradedItem._id || upgradedItem.id
                    };

                    setItems((prev: Item[]) => {
                        const newItems = prev.map(i => {
                            if (i.id === item.id) {
                                return updatedItemWithId;
                            }
                            return i;
                        });
                        return newItems;
                    });

                    // Update local states
                    setLocalPercentage(0);
                    basePercentageRef.current = 0;
                } catch (error) {
                    console.error('Level up failed:', error);
                    // Revert animation if API fails
                    setIsAnimating(false);
                    setParticles([]);
                }
            }, transformDelay);

            setTimeout(() => {
                setIsAnimating(false);
                setParticles([]);
            }, totalDuration);
        } catch (error) {
            console.error('Level up error:', error);
            setIsAnimating(false);
            setParticles([]);
        }
    };

    return (
        <div
            className='rounded-lg itemCard relative bg-cover bg-center overflow-hidden'
            style={{
                backgroundImage: `url(/game/${item.name}.webp)`,
                height: cardHeight
            }}
        >
            <LevelUpAnimation item={item} isAnimating={isAnimating} particles={particles} setParticles={setParticles} />

            <div className='w-16 h-9 flex items-center justify-center bg-gradient-to-b from-black to-black/0 rounded-md text-white text-xs font-semibold absolute top-1 right-1'>
                Seviye {item.level}
            </div>
            <div className='flex flex-col gap-2 absolute bottom-0 left-0 p-2.5 w-full'>
                <div className='text-white text-[9px] font-semibold'>{item.title}</div>
                <div className='text-white text-[8px] font-normal'>{item.description}</div>
                <div className='flex items-center gap-2'>
                    <div className='flex-1 p-1 bg-zinc-800 rounded-full shadow-[0px_0px_4px_0px_rgba(248,176,220,1.00)] relative'>
                        <div
                            className='w-16 h-3 bg-pink-500 rounded-full shadow-[0px_0px_2px_0px_rgba(238,57,168,1.00),inset_0px_0px_3px_0px_rgba(255,255,255,1.00)]'
                            style={{
                                width: `${localPercentage}%`
                            }}
                        />
                        <div className='text-white text-[8px] font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            %{localPercentage}
                        </div>
                    </div>
                    {localPercentage === 100 ? (
                        <button
                            type='button'
                            onClick={handleLevelUpClick}
                            className='
                            cursor-pointer flex-1 p-1 flex items-center justify-center
                            bg-pink-500 rounded-full
                            shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_1px_2px_3px_0px_rgba(248,248,248,1.00),inset_-1px_-1px_2px_0px_rgba(93,83,107,1.00)]
                            text-white text-[9px] font-semibold
                            [text-shadow:0px_0px_3px_rgb(0_0_0_/_1.00)]
                          '
                        >
                            {item.level === MAX_LEVEL ? 'Tebrikler!' : 'Yükselt'}
                        </button>
                    ) : (
                        <button
                            type='button'
                            onClick={handleCardClick}
                            className='
                            cursor-pointer transition-all duration-300 active:scale-90
                            flex-1 p-1 flex items-center justify-center
                            bg-orange-300 rounded-full
                            shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),inset_1px_2px_3px_0px_rgba(248,248,248,1.00),inset_-1px_-1px_2px_0px_rgba(93,83,107,1.00)]
                            text-zinc-800 text-[9px] font-semibold
                          '
                        >
                            Geliştir
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
