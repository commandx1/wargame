import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import Energy from "./components/Energy";
import GameLoading from "./components/GameLoading";
import Items from "./components/Items";
import Login from "./components/Login";
import Tabs from "./components/Tabs";
import { initAuthAtom, isAuthenticatedAtom, userAtom } from "./store/authStore";
import {
	gameInitializedAtom,
	gameLoadingAtom,
	initializeGameAtom,
	loadingCompleteAtom,
} from "./store/gameStore";
import "./fonts.css";

function App() {
	const [user] = useAtom(userAtom);
	const [isAuthenticated] = useAtom(isAuthenticatedAtom);
	const [gameLoading] = useAtom(gameLoadingAtom);
	const [gameInitialized] = useAtom(gameInitializedAtom);
	const [loadingComplete] = useAtom(loadingCompleteAtom);
	const initializeGame = useSetAtom(initializeGameAtom);
	const initAuth = useSetAtom(initAuthAtom);

	// Initialize auth on app start
	useEffect(() => {
		initAuth();
	}, [initAuth]);

	// Initialize game when user is authenticated but game is not initialized
	useEffect(() => {
		if (isAuthenticated && user && !gameInitialized && !gameLoading) {
			initializeGame();
		}
	}, [isAuthenticated, user, gameInitialized, gameLoading, initializeGame]);

	// Show login if not authenticated
	if (!isAuthenticated || !user) {
		return <Login />;
	}

	// Show loading if game is not initialized or loading animation not complete
	if (!gameInitialized || !loadingComplete) {
		return <GameLoading />;
	}

	// Show main game interface
	return (
		<div className="w-full h-screen bg-gradient-to-b from-neutral-900 to-zinc-700">
			<div className="max-w-xl mx-auto p-4 sm:px-6 lg:px-8 flex flex-col gap-4 h-full">
				<Energy />
				<Tabs />
				<Items />
			</div>
		</div>
	);
}

export default App;
