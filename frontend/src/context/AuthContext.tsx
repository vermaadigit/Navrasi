import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosError } from "../utils/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
  authProvider: "local" | "google";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  adminLogin: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<any>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Configure axios defaults - RUNS ONLY ONCE when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
    }
  }, [token]); // Only depend on token

  // Handle Google OAuth callback - RUNS ONLY ONCE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const authStatus = params.get("auth");

    if (urlToken && authStatus === "success") {
      setToken(urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authStatus === "error") {
      console.error("Google authentication failed");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Empty dependency array - runs once

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/me");
      setUser(data.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/api/auth/login", { email, password });
    setToken(data.data.token);
    setUser(data.data.user);
    return data;
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    setToken(data.data.token);
    setUser(data.data.user);
    return data;
  };

  const adminLogin = async (email: string, password: string) => {
    const { data } = await axios.post("/api/admin/login", { email, password });
    setToken(data.data.token);
    setUser(data.data.user);
    return data;
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const updateProfile = async (formData: FormData) => {
    const { data } = await axios.put("/api/auth/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser(data.data.user);
    return data;
  };

  const value: AuthContextType = {
    user,
    loading,
    token,
    login,
    register,
    adminLogin,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
