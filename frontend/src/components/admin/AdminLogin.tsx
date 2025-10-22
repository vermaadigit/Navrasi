import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import Input from '../common/Input';
import Button from '../common/Button';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminApi.login(email, password);
      if (response.success && response.data) {
        login(response.data.user, response.data.token);
        navigate('/admin');
      }
    } catch (err: any) {
      if (err.message === 'Access denied. Admin privileges required.') {
        setError('Access denied. You must be an admin to access this area.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-4xl font-display font-bold text-secondary-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-secondary-600">
            Sign in to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@navrasi.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <Button type="submit" isLoading={loading} className="w-full" size="lg">
            Sign In as Admin
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-secondary-600 hover:text-primary-600"
            >
              ← Back to regular login
            </Link>
          </div>

          <div className="text-sm text-center text-secondary-600">
            <p>Default admin credentials:</p>
            <p className="font-mono bg-secondary-50 p-2 rounded mt-2">
              Email: admin@navrasi.com<br />
              Password: Admin@123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
