// types/index.ts

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  sizeOptions: string[];
  colorOptions: string[];
  images: string[];
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string; // Add this
  authProvider: "local" | "google"; // Add this - REQUIRED
  isEmailVerified?: boolean; // Add this
  createdAt?: string; // Optional
  updatedAt?: string; // Optional
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Additional helpful types for authentication
export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
