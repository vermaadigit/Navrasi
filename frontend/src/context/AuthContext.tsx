import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '../utils/axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  authProvider?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication status on mount and handle Google OAuth callback
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, check for Google OAuth callback token in URL
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');
        const authStatus = params.get('auth');

        let token = localStorage.getItem('token');

        // If we have a token from Google OAuth callback
        if (urlToken && authStatus === 'success') {
          token = urlToken;
          localStorage.setItem('token', token);
          
          // Clean up URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        } else if (authStatus === 'error') {
          console.error('Google authentication failed');
          window.history.replaceState({}, document.title, window.location.pathname);
          setLoading(false);
          return;
        }

        if (!token) {
          setLoading(false);
          return;
        }

        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Verify token and get user data
        const { data } = await axios.get('/api/auth/me');
        
        // Handle nested response structure { success, data: { user } }
        if (data.success && data.data && data.data.user) {
          setUser(data.data.user);
        } else {
          // Invalid token, clear it
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    
    if (data.success && data.data) {
      const { token, user: userData } = data.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(userData);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    const { data } = await axios.post('/api/admin/login', { email, password });
    
    if (data.success && data.data) {
      const { token, user: userData } = data.data;
      
      // Verify user is admin
      if (userData.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(userData);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password });
    
    if (data.success && data.data) {
      const { token, user: userData } = data.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Set authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(userData);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const updateProfile = async (formData: FormData) => {
    const { data } = await axios.put('/api/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle nested response if needed
    if (data.success && data.data) {
      // Check if response has nested user object
      const userData = data.data.user || data.data;
      setUser(userData);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    adminLogin,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
