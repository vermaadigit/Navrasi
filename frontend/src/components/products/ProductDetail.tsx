import { useState } from 'react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import Button from '../common/Button';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0] || '');
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    alert('Product added to cart!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="aspect-square bg-secondary-100 rounded-xl overflow-hidden mb-4">
          <img
            src={product.images[selectedImage] || 'https://via.placeholder.com/800'}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h1 className="text-4xl font-display font-bold text-secondary-900 mb-4">{product.title}</h1>
        <p className="text-3xl font-bold text-primary-600 mb-6">${Number(product.price).toFixed(2)}</p>

        <p className="text-secondary-700 mb-8 leading-relaxed">{product.description}</p>

        {/* Size Selection */}
        {product.sizeOptions && product.sizeOptions.length > 0 && (
          <div className="mb-6">
            <label className="block font-semibold text-secondary-900 mb-3">Select Size</label>
            <div className="flex flex-wrap gap-2">
              {product.sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colorOptions && product.colorOptions.length > 0 && (
          <div className="mb-6">
            <label className="block font-semibold text-secondary-900 mb-3">Select Color</label>
            <div className="flex flex-wrap gap-2">
              {product.colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedColor === color
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-8">
          <label className="block font-semibold text-secondary-900 mb-3">Quantity</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center font-bold text-secondary-900"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-10 h-10 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center font-bold text-secondary-900"
              disabled={quantity >= product.stock}
            >
              +
            </button>
            <span className="text-sm text-secondary-600">({product.stock} available)</span>
          </div>
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
          size="lg"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        {/* Product Info */}
        <div className="mt-8 border-t border-secondary-200 pt-8 space-y-4">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-secondary-700">Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-secondary-700">30-day return policy</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-secondary-700">Secure payment guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
