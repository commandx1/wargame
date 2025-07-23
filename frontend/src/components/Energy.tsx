/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { userApi } from '../services/api';
import { localEnergyAtom, logoutAtom, userAtom } from '../store/authStore';
import type { User } from '../types/user';

const Energy = () => {
    const [user, setUser] = useAtom(userAtom);
    const [localEnergy, setLocalEnergy] = useAtom(localEnergyAtom);
    const logout = useSetAtom(logoutAtom);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isReloading, setIsReloading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const prevSecondsRef = useRef<number | null>(null);

    const handleLogout = () => {
        logout();
    };

    const formatTime = (seconds: number): string => {
        if (seconds <= 0) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const reloadEnergy = async () => {
        if (isReloading) return;

        try {
            setIsReloading(true);
            const res = await userApi.reloadEnergy(user?.id as string);
            setUser(prev => {
                const user = {
                    ...prev,
                    energy_reload_time: res.data.energy_reload_time,
                    energy: res.data.energy
                } as User;

                localStorage.setItem('user', JSON.stringify(user));

                return user;
            });
            // Update local energy
            setLocalEnergy(res.data.energy);
            // Önceki saniye değerini sıfırla
            prevSecondsRef.current = null;
        } catch (error) {
            console.error('Energy reload failed:', error);
        } finally {
            setIsReloading(false);
        }
    };

    useEffect(() => {
        if (!user?.energy_reload_time) return;

        const updateTimer = () => {
            const now = Date.now();
            const diff = user.energy_reload_time - now;

            const seconds = Math.max(0, Math.floor(diff / 1000));

            setTimeLeft(seconds);

            // Sadece aktif geri sayımdan 0'a geçişte reload yap
            // prevSeconds null değilse (ilk render değil) VE
            // prevSeconds > 0 VE seconds === 0 ise reload yap
            if (prevSecondsRef.current !== null && prevSecondsRef.current > 0 && seconds === 0) {
                reloadEnergy();
            }

            // Mevcut saniyeyi kaydet
            prevSecondsRef.current = seconds;
        };

        // İlk update'i hemen yap
        updateTimer();
        setIsMounted(true);

        // Sonra her saniye tekrarla
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [user?.energy_reload_time, isMounted]);

    // energy_reload_time değiştiğinde prev değeri sıfırla
    useEffect(() => {
        prevSecondsRef.current = null;

        if (user?.energy_reload_time && user.energy_reload_time <= Date.now()) {
            console.log('reloadEnergy');
            reloadEnergy();
        }
    }, [user?.energy_reload_time]);

    // Sync localEnergy with user.energy when it changes
    useEffect(() => {
        if (user?.energy !== undefined && !isReloading) {
            console.log('Syncing localEnergy with user.energy:', user.energy);
            setLocalEnergy(user.energy);
        }
    }, [user?.energy, isReloading, setLocalEnergy]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex justify-between items-center mb-2'>
                <div className='text-yellow-400 text-xs font-semibold'>⚔️ {user?.name}</div>
                <button
                    type='button'
                    onClick={handleLogout}
                    className='bg-red-600 hover:bg-red-700 text-white text-[10px] px-2 py-1 rounded transition-colors'
                    title='Çıkış Yap'
                >
                    Çıkış
                </button>
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-orange-300 text-xs font-bold ml-10'>Enerji</div>
                <div className='text-zinc-600 text-[10px] font-medium'>
                    %50 Yenilenmesine Kalan: {formatTime(timeLeft)}
                </div>
            </div>
            <div className='p-1.5 bg-zinc-800 rounded-full shadow-[0px_0px_4px_0px_rgba(248,176,220,1.00)] relative'>
                <img
                    src='/game/energy.webp'
                    alt='energy'
                    width={50}
                    height={50}
                    className='absolute bottom-0 -left-4'
                />
                <div
                    className='h-4 bg-pink-500 rounded-full shadow-[0px_0px_2px_0px_rgba(238,57,168,1.00),inset_0px_0px_3px_0px_rgba(255,255,255,1.00)] transition-all duration-200'
                    style={{ width: `${localEnergy}%` }}
                />
                <div className='text-orange-300 text-xs font-bold absolute right-3 top-1/2 -translate-y-1/2'>
                    %{localEnergy}
                </div>
            </div>
        </div>
    );
};

export default Energy;
