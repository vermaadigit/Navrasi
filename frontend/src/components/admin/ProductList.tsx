import type { Product } from '../../types';
import Button from '../common/Button';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function ProductList({ products, onEdit, onDelete, loading }: ProductListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-secondary-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <svg
          className="mx-auto h-24 w-24 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-secondary-900">No products yet</h3>
        <p className="mt-2 text-secondary-600">Get started by creating your first product</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-secondary-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900">Stock</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200">
  {products.map((product) => (
    <tr key={product.id} className="hover:bg-secondary-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src={product.images[0] || 'https://via.placeholder.com/80'}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <p className="font-medium text-secondary-900">{product.title}</p>
            <p className="text-sm text-secondary-600 line-clamp-1">{product.description}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-secondary-700">{product.category}</td>
      <td className="px-6 py-4 text-sm font-semibold text-primary-600">
        ${Number(product.price).toFixed(2)}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            product.stock === 0
              ? 'bg-red-100 text-red-700'
              : product.stock < 10
              ? 'bg-orange-100 text-orange-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {product.stock} units
        </span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this product?')) {
              onDelete(product.id);
            }
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
