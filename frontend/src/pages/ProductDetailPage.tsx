import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { useProductStore } from '../store/useProductStore';
import ProductDetail from '../components/products/ProductDetail';
import Button from '../components/common/Button';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedProduct, loading, setSelectedProduct, setLoading, setError } = useProductStore();

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setLoading(true);
    try {
      const response = await productApi.getById(productId);
      if (response.data) {
        setSelectedProduct(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div>
            <div className="aspect-square bg-secondary-200 rounded-xl mb-4"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-secondary-200 rounded-lg"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-12 bg-secondary-200 rounded w-3/4"></div>
            <div className="h-8 bg-secondary-200 rounded w-1/4"></div>
            <div className="h-24 bg-secondary-200 rounded"></div>
            <div className="h-12 bg-secondary-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-secondary-900">Product not found</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="secondary" onClick={() => navigate('/')} className="mb-6">
        ← Back to Shop
      </Button>
      <ProductDetail product={selectedProduct} />
    </div>
  );
}
