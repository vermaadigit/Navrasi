import axios from "axios";
import type { Product, User, ApiResponse, PaginatedResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log("Frontend - src/services/api.ts", API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Don't redirect admin login for regular auth errors
      if (!window.location.pathname.includes("/admin")) {
        window.location.href = "/login";
      } else {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string }>>(
      "/auth/register",
      { name, email, password }
    );
    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  },

  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string }>>(
      "/auth/login",
      { email, password }
    );
    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  },

  logout: async () => {
    const { data } = await api.post<ApiResponse<null>>("/auth/logout");
    localStorage.removeItem("token");
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get<ApiResponse<{ user: User }>>("/auth/me");
    return data;
  },

  googleAuth: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },
};

// Admin API
export const adminApi = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<ApiResponse<{ user: User; token: string }>>(
      "/auth/login",
      { email, password }
    );

    // Check if user has admin role
    if (data.data?.user.role !== "admin") {
      throw new Error("Access denied. Admin privileges required.");
    }

    if (data.data?.token) {
      localStorage.setItem("token", data.data.token);
    }
    return data;
  },

  logout: async () => {
    const { data } = await api.post<ApiResponse<null>>("/auth/logout");
    localStorage.removeItem("token");
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get<ApiResponse<{ user: User }>>("/auth/me");
    return data;
  },
};

// Product API
export const productApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const { data } = await api.get<PaginatedResponse<Product>>("/products", {
      params,
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await api.get<ApiResponse<string[]>>(
      "/products/categories"
    );
    return data;
  },

  create: async (formData: FormData) => {
    const { data } = await api.post<ApiResponse<Product>>(
      "/products",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  update: async (id: string, formData: FormData) => {
    const { data } = await api.put<ApiResponse<Product>>(
      `/products/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete<ApiResponse<null>>(`/products/${id}`);
    return data;
  },
};

export default api;
