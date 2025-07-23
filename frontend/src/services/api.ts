import axios from "axios";
import type { Item } from "../types/item";

const API_URL = "http://localhost:3001";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add auth token to requests
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("auth_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Handle auth errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("auth_token");
			localStorage.removeItem("user");
			// Don't reload - let the app handle the auth state change
		}
		return Promise.reject(error);
	},
);

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	access_token: string;
	user: {
		id: string;
		name: string;
		email: string;
		energy: number;
		energy_reload_time: number;
	};
	items: Item[];
}

export interface ReloadEnergyResponse {
	energy_reload_time: number;
	energy: number;
}

export const authApi = {
	login: (data: LoginData): Promise<{ data: AuthResponse }> =>
		api.post("/auth/login", data),

	register: (data: RegisterData): Promise<{ data: AuthResponse }> =>
		api.post("/auth/register", data),
};

export const userApi = {
	reloadEnergy: (userId: string): Promise<{ data: ReloadEnergyResponse }> =>
		api.post(`/users/${userId}/reload-energy`),
};

export const itemApi = {
	getAll: (userId: string) => api.get(`/items?userId=${userId}`),
	progress: (
		userId: string,
		itemId: string,
		percentage: number,
		energy: number,
	) => api.put(`/items/${itemId}/progress`, { userId, percentage, energy }),
	levelUp: (itemId: string) => api.put(`/items/${itemId}/level-up`),
};

export default api;
