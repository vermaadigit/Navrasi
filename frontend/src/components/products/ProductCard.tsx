import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary-100">
          <img
            src={product.images[0] || 'https://via.placeholder.com/400'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-secondary-600 text-sm mt-1 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-primary-600">${Number(product.price).toFixed(2)}</span>
            {product.stock > 0 && product.stock < 10 && (
              <span className="text-xs text-orange-600 font-medium">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Category */}
          {product.category && (
            <div className="mt-2">
              <span className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
