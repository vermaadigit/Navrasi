import { useState, FormEvent, useEffect } from 'react';
import type { Product } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price.toString() || '',
    stock: product?.stock.toString() || '',
    category: product?.category || '',
    sizeOptions: product?.sizeOptions?.join(', ') || '',
    colorOptions: product?.colorOptions?.join(', ') || '',
  });
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('category', formData.category);

      // Parse size and color options
      const sizes = formData.sizeOptions
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const colors = formData.colorOptions
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      data.append('sizeOptions', JSON.stringify(sizes));
      data.append('colorOptions', JSON.stringify(colors));

      // Add existing images if updating
      if (product?.images) {
        data.append('existingImages', JSON.stringify(product.images));
      }

      // Add new images
      if (images) {
        Array.from(images).forEach((image) => {
          data.append('images', image);
        });
      }

      await onSubmit(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-secondary-900">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Product Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Classic Cotton T-Shirt"
        />

        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="29.99"
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={handleChange}
          required
          placeholder="50"
        />

        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="T-Shirts"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="input-field resize-none"
          placeholder="Detailed product description..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Size Options (comma-separated)"
          name="sizeOptions"
          value={formData.sizeOptions}
          onChange={handleChange}
          placeholder="S, M, L, XL, XXL"
        />

        <Input
          label="Color Options (comma-separated)"
          name="colorOptions"
          value={formData.colorOptions}
          onChange={handleChange}
          placeholder="White, Black, Navy, Gray"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">
          Product Images {!product && <span className="text-red-500">*</span>}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required={!product}
          className="w-full px-4 py-2.5 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <p className="text-xs text-secondary-600 mt-1">
          Upload up to 5 images (JPEG, PNG, WebP). Max 5MB per image.
        </p>
        {product?.images && product.images.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button type="submit" isLoading={loading} className="flex-1">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
