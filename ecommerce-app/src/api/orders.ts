import { api } from './axios';
import type { Order, UpdateOrderStatusRequest, ApiResponse, PaginatedResponse } from '../types';

export const ordersApi = {
  create: async () => {
    const response = await api.post<ApiResponse<Order>>('/orders');
    return response.data;
  },

  getAll: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get<PaginatedResponse<Order>>('/orders', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  updateStatus: async (id: string, status: UpdateOrderStatusRequest) => {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/status`, status);
    return response.data;
  },
};

