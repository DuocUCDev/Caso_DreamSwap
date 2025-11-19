import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { productsApi } from '../../api/products';
import { ordersApi } from '../../api/orders';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { config } from '../../config/config';
import type { OrderStatus } from '../../types';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  shipped: 'Enviado',
  cancelled: 'Cancelado',
};

const DashboardPage = () => {
  const { data: productsData } = useQuery({
    queryKey: ['products', 'admin', 'dashboard'],
    queryFn: () => productsApi.getAll({ page: 1, limit: 100 }),
  });

  const { data: ordersData } = useQuery({
    queryKey: ['orders', 'admin', 'dashboard'],
    queryFn: () => ordersApi.getAll({ page: 1, limit: 50 }),
  });

  const totalProducts = productsData?.data.pagination.total || 0;
  const totalOrders = ordersData?.data.pagination.total || 0;
  const activeProducts = productsData?.data.products?.filter((p) => p.isActive).length || 0;
  const inactiveProducts = totalProducts - activeProducts;
  
  // Calcular ingresos por estado
  const orders = ordersData?.data.orders || [];
  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status !== 'cancelled') return sum + order.total;
    return sum;
  }, 0);
  
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const paidOrders = orders.filter((o) => o.status === 'paid').length;
  const shippedOrders = orders.filter((o) => o.status === 'shipped').length;
  
  // Productos con bajo stock (menos de 10 unidades)
  const lowStockProducts = productsData?.data.products?.filter((p) => p.stock < 10 && p.stock > 0) || [];
  
  // Pedidos recientes (últimos 5)
  const recentOrders = orders.slice(0, 5);
  
  // Productos más vendidos (top 5)
  const productSales: Record<string, number> = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      const productId = item.productId._id;
      productSales[productId] = (productSales[productId] || 0) + item.quantity;
    });
  });
  
  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([productId]) => {
      return productsData?.data.products?.find((p) => p._id === productId);
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Resumen general de tu tienda</p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                  <p className="text-2xl font-bold">{totalProducts}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activeProducts} activos, {inactiveProducts} inactivos
                  </p>
                </div>
                <Package className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Pedidos</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {pendingOrders} pendientes
                  </p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    {paidOrders + shippedOrders} completados
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Productos Bajo Stock</p>
                  <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Requieren atención
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas de pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Pendientes</p>
                  <p className="text-xl font-bold">{pendingOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Pagados</p>
                  <p className="text-xl font-bold">{paidOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Enviados</p>
                  <p className="text-xl font-bold">{shippedOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Tasa de Éxito</p>
                  <p className="text-xl font-bold">
                    {totalOrders > 0
                      ? (((paidOrders + shippedOrders) / totalOrders) * 100).toFixed(0)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pedidos Recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay pedidos recientes</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">Pedido #{order._id.slice(-8)}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">${order.total.toFixed(2)}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'paid'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'shipped'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Link to={config.routes.admin.orders} className="block mt-4">
                <Button variant="outline" className="w-full">
                  Ver Todos los Pedidos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Productos con Bajo Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Productos con Bajo Stock</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Todos los productos tienen stock suficiente</p>
              ) : (
                <div className="space-y-3">
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <div key={product._id} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-xs text-gray-600">Stock: {product.stock} unidades</p>
                      </div>
                      <Link to={config.routes.admin.products}>
                        <Button variant="outline" size="sm">
                          Actualizar
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {lowStockProducts.length > 5 && (
                <Link to={config.routes.admin.products} className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Ver Todos los Productos
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Productos Más Vendidos */}
        {topProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((product, index) => {
                  if (!product) return null;
                  const sales = productSales[product._id] || 0;
                  return (
                    <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-primary-600">#{index + 1}</span>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-gray-600">{sales} unidades vendidas</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary-600">${product.price.toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accesos Rápidos */}
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
