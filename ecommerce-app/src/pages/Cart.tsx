import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { cartApi } from '../api/cart';
import { ordersApi } from '../api/orders';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { config } from '../config/config';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { cart, setCart, getTotalPrice } = useCartStore();

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.get(),
    onSuccess: (response) => {
      setCart(response.data);
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.updateItem(productId, { quantity }),
    onSuccess: (response) => {
      setCart(response.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId: string) => cartApi.removeItem(productId),
    onSuccess: (response) => {
      setCart(response.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: () => ordersApi.create(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate(config.routes.orders);
    },
  });

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemMutation.mutate({ productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: string) => {
    removeItemMutation.mutate(productId);
  };

  const handleCheckout = () => {
    createOrderMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const items = cart?.items || [];
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Agrega algunos productos para comenzar</p>
            <Button onClick={() => navigate(config.routes.shop)}>Ir a la Tienda</Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={item.productId._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                {item.productId.imagen ? (
                  <img
                    src={item.productId.imagen}
                    alt={item.productId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.productId.name}</h3>
                  <p className="text-primary-600 font-bold">${item.productId.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}
                    className="p-1 rounded hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}
                    className="p-1 rounded hover:bg-gray-100"
                    disabled={item.quantity >= item.productId.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <p className="font-semibold w-24 text-right">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="sticky bottom-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary-600">${total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
            isLoading={createOrderMutation.isPending}
          >
            Proceder al Checkout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export const Cart = () => (
  <ProtectedRoute>
    <CartPage />
  </ProtectedRoute>
);

