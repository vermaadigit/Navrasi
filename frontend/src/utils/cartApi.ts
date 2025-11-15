import axios from "./axios";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  size?: string | null;
  color?: string | null;
  image: string;
  stock: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cart: {
      id: string;
      items: CartItem[];
      itemCount: number;
      totalAmount?: string;
    };
  };
}

/**
 * Get user's cart from backend
 */
export const getCart = async (): Promise<CartItem[]> => {
  try {
    const response = await axios.get<CartResponse>("/api/cart");
    return response.data.data.cart.items || [];
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
};

/**
 * Add item to cart
 */
export const addToCart = async (
  productId: string,
  quantity: number,
  size?: string,
  color?: string
): Promise<CartItem[]> => {
  try {
    const response = await axios.post<CartResponse>("/api/cart/add", {
      productId,
      quantity,
      size: size || null,
      color: color || null,
    });
    return response.data.data.cart.items || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (
  productId: string,
  quantity: number,
  size?: string | null,
  color?: string | null
): Promise<CartItem[]> => {
  try {
    const response = await axios.put<CartResponse>(
      `/api/cart/update/${productId}`,
      {
        quantity,
        size: size || null,
        color: color || null,
      }
    );
    return response.data.data.cart.items || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update cart item"
    );
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (
  productId: string
): Promise<CartItem[]> => {
  try {
    const response = await axios.delete<CartResponse>(
      `/api/cart/remove/${productId}`
    );
    return response.data.data.cart.items || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to remove from cart"
    );
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async (): Promise<void> => {
  try {
    await axios.delete("/api/cart/clear");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};
