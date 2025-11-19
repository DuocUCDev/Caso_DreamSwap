import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { ordersApi } from '../api/orders';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { config } from '../config/config';
import type { OrderStatus } from '../types';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipped: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  shipped: 'Enviado',
  cancelled: 'Cancelado',
};

const OrdersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getAll({ page: 1, limit: 20 }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const orders = data?.data.orders || [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No tienes pedidos</h2>
            <p className="text-gray-600 mb-6">Cuando realices un pedido, aparecerá aquí</p>
            <Link to={config.routes.shop}>
              <Button>Ir a la Tienda</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Pedidos</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Pedido #{order._id.slice(-8)}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>

              <div className="mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-semibold">{item.productId.name}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-primary-600">
                  Total: ${order.total.toFixed(2)}
                </p>
                <Link to={`/orders/${order._id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Orders = () => (
  <ProtectedRoute>
    <OrdersPage />
  </ProtectedRoute>
);

