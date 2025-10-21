import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import Button from '../components/common/Button';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-secondary-900">Your cart is empty</h2>
        <p className="mt-2 text-secondary-600">Start shopping to add items to your cart</p>
        <Link to="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-secondary-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-secondary-900">{item.product.title}</h3>
                  {item.selectedSize && (
                    <p className="text-sm text-secondary-600">Size: {item.selectedSize}</p>
                  )}
                  {item.selectedColor && (
                    <p className="text-sm text-secondary-600">Color: {item.selectedColor}</p>
                  )}
                  <p className="text-xl font-bold text-primary-600 mt-2">
                    ${Number(item.product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-secondary-700">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-secondary-700">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-secondary-200 pt-3 flex justify-between text-lg font-bold text-secondary-900">
                <span>Total</span>
                <span className="text-primary-600">${getTotal().toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
