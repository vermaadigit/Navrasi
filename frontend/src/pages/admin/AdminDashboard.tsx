import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { productApi, adminApi } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { useProductStore } from '../../store/useProductStore';
import type { Product } from '../../types';
import ProductList from '../../components/admin/ProductList';
import ProductForm from '../../components/admin/ProductForm';
import Button from '../../components/common/Button';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { products, loading, setProducts, setLoading } = useProductStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    loadProducts();
  }, [isAuthenticated, user]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll({ limit: 100 });
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (formData: FormData) => {
    await productApi.create(formData);
    await loadProducts();
    setShowForm(false);
    alert('Product created successfully!');
  };

  const handleUpdateProduct = async (formData: FormData) => {
    if (editingProduct) {
      await productApi.update(editingProduct.id, formData);
      await loadProducts();
      setEditingProduct(undefined);
      setShowForm(false);
      alert('Product updated successfully!');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productApi.delete(id);
      await loadProducts();
      alert('Product deleted successfully!');
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const handleLogout = async () => {
    try {
      await adminApi.logout();
      logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-secondary-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-secondary-900">Admin Dashboard</h1>
            <p className="text-sm text-secondary-600">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="secondary">View Store</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Total Products</p>
                <p className="text-2xl font-bold text-secondary-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-secondary-600">In Stock</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {products.filter((p) => p.stock > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-secondary-600">Low Stock</p>
                <p className="text-2xl font-bold text-secondary-900">
                  {products.filter((p) => p.stock > 0 && p.stock < 10).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-secondary-900">Products</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>Add New Product</Button>
          )}
        </div>

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={handleCancel}
          />
        ) : (
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
