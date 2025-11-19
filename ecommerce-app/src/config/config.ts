export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'https://ecommerce-tenant.vercel.app/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '15000'),
    tenantId: import.meta.env.VITE_TENANT_ID || '690f356f30040f3b94a70efd',
  },
  app: {
    name: 'E-Commerce',
    version: '1.0.0',
  },
  routes: {
    home: '/',
    shop: '/shop',
    cart: '/cart',
    profile: '/profile',
    orders: '/orders',
    login: '/login',
    register: '/register',
    admin: {
      dashboard: '/admin/dashboard',
      products: '/admin/products',
      orders: '/admin/orders',
    },
  },
} as const;

