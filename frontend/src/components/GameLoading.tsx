/* eslint-disable react-hooks/exhaustive-deps */

import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
	gameInitializedAtom,
	gameLoadingAtom,
	loadingCompleteAtom,
} from "../store/gameStore";

const GameLoading = () => {
	const [progress, setProgress] = useState(0);
	const [currentTask, setCurrentTask] = useState("Oyun başlatılıyor...");
	const [gameLoading] = useAtom(gameLoadingAtom);
	const [gameInitialized] = useAtom(gameInitializedAtom);
	const setLoadingComplete = useSetAtom(loadingCompleteAtom);
	const [startTime] = useState(() => Date.now());
	const [progressInterval, setProgressInterval] =
		useState<NodeJS.Timeout | null>(null);

	const loadingTasks = [
		"Kullanıcı bilgileri yükleniyor...",
		"Eşyalar hazırlanıyor...",
		"Oyun dünyası oluşturuluyor...",
		"Savaş hazırlıkları tamamlanıyor...",
	];

	// Start progress animation on mount
	useEffect(() => {
		let taskIndex = 0;
		const isCompleted = false;

		const interval = setInterval(() => {
			setProgress((prev) => {
				// If already completed, don't change progress
				if (isCompleted || prev >= 100) {
					return prev;
				}

				// Progressive speed - faster at start, slower near end
				let increment: number;
				if (prev < 30) {
					increment = 8; // Fast start
				} else if (prev < 60) {
					increment = 6; // Medium speed
				} else if (prev < 80) {
					increment = 4; // Slow down
				} else {
					increment = 2; // Very slow near end
				}

				// Don't go past 85% until actual loading is complete
				const newProgress = Math.min(prev + increment, 85);

				// Update task based on progress
				if (newProgress >= 25 && taskIndex === 0) {
					setCurrentTask(loadingTasks[1]);
					taskIndex++;
				} else if (newProgress >= 50 && taskIndex === 1) {
					setCurrentTask(loadingTasks[2]);
					taskIndex++;
				} else if (newProgress >= 75 && taskIndex === 2) {
					setCurrentTask(loadingTasks[3]);
					taskIndex++;
				}

				return newProgress;
			});
		}, 200);

		setProgressInterval(interval);
		return () => clearInterval(interval);
	}, []); // Empty dependency - only run on mount

	// Handle completion when data is ready
	useEffect(() => {
		if (!gameLoading && gameInitialized) {
			const minLoadingTime = 1500; // 1.5 sec
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

			setTimeout(() => {
				// Clear the interval first
				if (progressInterval) {
					clearInterval(progressInterval);
				}

				setProgress(100);
				setCurrentTask("Tamamlandı!");
				setTimeout(() => {
					setLoadingComplete(true);
				}, 500);
			}, remainingTime);
		}
	}, [
		gameLoading,
		gameInitialized,
		startTime,
		progressInterval,
		setLoadingComplete,
	]);

	return (
		<div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-zinc-900 to-black flex items-center justify-center">
			<div className="text-center space-y-8">
				{/* Game Logo/Title */}
				<div className="space-y-2">
					<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
						⚔️ SAVAŞ OYUNU ⚔️
					</h1>
					<p className="text-zinc-400 text-sm">Efsanevi maceraya hazırlan!</p>
				</div>

				{/* Loading Bar */}
				<div className="w-80 mx-auto space-y-4">
					<div className="bg-zinc-800 rounded-full h-4 overflow-hidden shadow-lg">
						<div
							className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 ease-out rounded-full shadow-lg"
							style={{ width: `${progress}%` }}
						/>
					</div>

					{/* Progress Text */}
					<div className="flex justify-between text-xs text-zinc-500">
						<span>%{progress}</span>
						<span>Yükleniyor...</span>
					</div>
				</div>

				{/* Current Task */}
				<div className="space-y-2">
					<p className="text-yellow-400 text-sm font-medium animate-pulse">
						{currentTask}
					</p>

					{/* Loading Animation */}
					<div className="flex justify-center space-x-1">
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
								style={{ animationDelay: `${i * 0.2}s` }}
							/>
						))}
					</div>
				</div>

				{/* Flavor Text */}
				<p className="text-zinc-600 text-xs max-w-md mx-auto">
					Büyülü silahların ve güçlü kalkanların seni beklediği epik bir dünyaya
					adım atmaya hazırlan...
				</p>
			</div>
		</div>
	);
};

export default GameLoading;
