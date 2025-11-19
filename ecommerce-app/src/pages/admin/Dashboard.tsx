import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { productsApi } from '../../api/products';
import { ordersApi } from '../../api/orders';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { config } from '../../config/config';

const DashboardPage = () => {
  const { data: productsData } = useQuery({
    queryKey: ['products', 'admin'],
    queryFn: () => productsApi.getAll({ page: 1, limit: 1 }),
  });

  const { data: ordersData } = useQuery({
    queryKey: ['orders', 'admin'],
    queryFn: () => ordersApi.getAll({ page: 1, limit: 1 }),
  });

  const totalProducts = productsData?.data.pagination.total || 0;
  const totalOrders = ordersData?.data.pagination.total || 0;
  const totalRevenue = ordersData?.data.orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const activeProducts = productsData?.data.products?.filter((p) => p.isActive).length || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Resumen general de tu tienda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Productos Activos</p>
                  <p className="text-2xl font-bold">{activeProducts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pedidos</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ingresos Totales</p>
                  <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Administra tu catálogo de productos, agrega nuevos items, actualiza precios y stock.
              </p>
              <Link to={config.routes.admin.products}>
                <Button className="w-full">Gestionar Productos</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestión de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Revisa y gestiona todos los pedidos de tus clientes, actualiza estados y más.
              </p>
              <Link to={config.routes.admin.orders}>
                <Button className="w-full">Gestionar Pedidos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => (
  <ProtectedRoute requiredRole="admin">
    <DashboardPage />
  </ProtectedRoute>
);

