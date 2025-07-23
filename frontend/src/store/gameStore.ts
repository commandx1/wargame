import { atom } from "jotai";
import { itemApi } from "../services/api";
import type { Item } from "../types/item";
import {
	authTokenAtom,
	isAuthenticatedAtom,
	localEnergyAtom,
	userAtom,
} from "./authStore";

// Items atom
export const itemsAtom = atom<Item[]>([]);

// Game loading state
export const gameLoadingAtom = atom(false);

// Game initialized state
export const gameInitializedAtom = atom(false);

// Loading animation completed state (controlled by GameLoading component)
export const loadingCompleteAtom = atom(false);

// Async atom to fetch items
export const fetchItemsAtom = atom(null, async (get, set) => {
	try {
		const u = get(userAtom);

		if (!u?.id) {
			throw new Error("User ID not found");
		}

		const response = await itemApi.getAll(u.id);

		const { items, user } = response.data;

		if (!user) {
			localStorage.removeItem("auth_token");
			localStorage.removeItem("user");
			set(userAtom, null);
			set(localEnergyAtom, 0);
			set(authTokenAtom, null);
			set(isAuthenticatedAtom, false);
		} else {
			// Update user state with fresh data from server
			set(userAtom, user);
			set(localEnergyAtom, user.energy || 0);
			localStorage.setItem("user", JSON.stringify(user));
		}

		set(
			itemsAtom,
			items.map((item: any) => ({
				...item,
				id: item._id.toString(),
			})),
		);
		return response.data;
	} catch (error: any) {
		console.error("Failed to fetch items, error details:", error);
		console.error("Error response:", error.response);
		throw error;
	}
});

// Initialize game data
export const initializeGameAtom = atom(null, async (get, set) => {
	try {
		set(gameLoadingAtom, true);

		// Fetch items
		await set(fetchItemsAtom);

		// Mark as initialized
		set(gameInitializedAtom, true);
		set(gameLoadingAtom, false);
	} catch (error) {
		console.error("Failed to initialize game:", error);
		set(gameLoadingAtom, false);
		throw error;
	}
});
