import { atom } from "jotai";
import type { User } from "../types/user";
import { itemsAtom } from './gameStore'
import type { Item } from '../types/item'

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const authTokenAtom = atom<string | null>(null);

// Local energy for real-time updates
export const localEnergyAtom = atom<number>(0);

// Initialize auth state from localStorage
export const initAuthAtom = atom(null, (get, set) => {
	const token = localStorage.getItem("auth_token");
	const userStr = localStorage.getItem("user");

	if (token && userStr) {
		try {
			const user = JSON.parse(userStr);
			set(userAtom, user);
			set(localEnergyAtom, user.energy || 0);
			set(authTokenAtom, token);
			set(isAuthenticatedAtom, true);
		} catch (error) {
			console.error("Error parsing user from localStorage:", error);
			localStorage.removeItem("auth_token");
			localStorage.removeItem("user");
		}
	} else {
		console.log("No auth data found in localStorage");
	}
});

// Login action
export const loginAtom = atom(
	null,
	(_get, set, { user, token, items }: { user: User; token: string; items: Item[] }) => {
		localStorage.setItem("auth_token", token);
		localStorage.setItem("user", JSON.stringify(user));
		set(userAtom, user);
		set(itemsAtom, items);
		set(localEnergyAtom, user.energy || 0);
		set(authTokenAtom, token);
		set(isAuthenticatedAtom, true);
	},
);

// Logout action
export const logoutAtom = atom(null, (get, set) => {
	localStorage.removeItem("auth_token");
	localStorage.removeItem("user");
	set(userAtom, null);
	set(localEnergyAtom, 0);
	set(authTokenAtom, null);
	set(isAuthenticatedAtom, false);
});
