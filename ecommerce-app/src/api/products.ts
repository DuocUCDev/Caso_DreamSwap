import { api } from './axios';
import type { Product, ProductCreate, ProductUpdate, ApiResponse, PaginatedResponse } from '../types';

export const productsApi = {
  getAll: async (params?: { isActive?: boolean; page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Product>>('/products', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  create: async (product: ProductCreate) => {
    const response = await api.post<ApiResponse<Product>>('/products', product);
    return response.data;
  },

  update: async (id: string, product: ProductUpdate) => {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },
};

