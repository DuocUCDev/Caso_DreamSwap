import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Package, Eye, CheckCircle } from 'lucide-react';
import { ordersApi } from '../../api/orders';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import type { OrderStatus } from '../../types';

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

const statusOptions: OrderStatus[] = ['pending', 'paid', 'shipped', 'cancelled'];

const AdminOrdersPage = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'admin', page],
    queryFn: () => ordersApi.getAll({ page, limit: 10 }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    if (confirm(`¿Cambiar el estado del pedido a "${statusLabels[newStatus]}"?`)) {
      updateStatusMutation.mutate({ id: orderId, status: newStatus });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const orders = data?.data.orders || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Pedidos</h1>

        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No hay pedidos</h2>
            <p className="text-gray-600">Los pedidos aparecerán aquí cuando los clientes realicen compras</p>
          </Card>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {orders.map((order) => (
                <Card key={order._id}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Pedido #{order._id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">
                        Cliente ID: {order.userId.slice(-8)}
                      </p>
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
                    <div className="flex space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value as OrderStatus)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={updateStatusMutation.isPending}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {statusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {data?.data.pagination && (
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </Button>
                <span className="flex items-center px-4">
                  Página {data.data.pagination.page} de {data.data.pagination.pages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= data.data.pagination.pages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export const AdminOrders = () => (
  <ProtectedRoute requiredRole="admin">
    <AdminOrdersPage />
  </ProtectedRoute>
);

