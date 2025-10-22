import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
  authProvider: "local" | "google";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user,
        })),
      setToken: (token) =>
        set(() => ({
          token,
        })),
      logout: () =>
        set(() => ({
          user: null,
          isAuthenticated: false,
          token: null,
        })),
      login: (user, token) =>
        set(() => ({
          user,
          token,
          isAuthenticated: true,
        })),
    }),
    {
      name: "auth-storage",
    }
  )
);
