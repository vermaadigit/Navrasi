import { create } from "zustand";
import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: sessionStorage.getItem("token"), // Changed from localStorage
  isAuthenticated: !!sessionStorage.getItem("token"), // Changed from localStorage

  login: (user, token) => {
    sessionStorage.setItem("token", token); // Changed from localStorage
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    sessionStorage.removeItem("token"); // Changed from localStorage
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (user) => {
    set({ user });
  },
}));
