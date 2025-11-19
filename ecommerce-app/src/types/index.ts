// User Types
export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  message: string;
  statusCode: number;
  data: {
    user: User;
    token: string;
  };
}

// Product Types
export interface Product {
  _id: string;
  tenantId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imagen?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductCreate {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imagen?: string;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imagen?: string | null;
  isActive?: boolean;
}

// Cart Types
export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  tenantId: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Order Types
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled';

export interface OrderItem {
  productId: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  tenantId: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

// API Response Types
export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  statusCode: number;
  data: {
    [key: string]: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

