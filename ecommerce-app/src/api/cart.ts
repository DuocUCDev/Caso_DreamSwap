import { api } from './axios';
import type { Cart, AddToCartRequest, UpdateCartItemRequest, ApiResponse } from '../types';

export const cartApi = {
  get: async () => {
    const response = await api.get<ApiResponse<Cart>>('/cart');
    return response.data;
  },

  addItem: async (item: AddToCartRequest) => {
    const response = await api.post<ApiResponse<Cart>>('/cart/items', item);
    return response.data;
  },

  updateItem: async (productId: string, item: UpdateCartItemRequest) => {
    const response = await api.put<ApiResponse<Cart>>(`/cart/items/${productId}`, item);
    return response.data;
  },

  removeItem: async (productId: string) => {
    const response = await api.delete<ApiResponse<Cart>>(`/cart/items/${productId}`);
    return response.data;
  },

  clear: async () => {
    const response = await api.delete<ApiResponse<Cart>>('/cart');
    return response.data;
  },
};

