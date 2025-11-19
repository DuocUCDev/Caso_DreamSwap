import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { productsApi } from '../api/products';
import { cartApi } from '../api/cart';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { config } from '../config/config';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCart } = useCartStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id!),
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: (quantity: number) =>
      cartApi.addItem({ productId: id!, quantity }),
    onSuccess: (response) => {
      setCart(response.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center">
          <p className="text-red-600 mb-4">Producto no encontrado</p>
          <Button onClick={() => navigate(config.routes.shop)}>Volver a la Tienda</Button>
        </Card>
      </div>
    );
  }

  const product = data.data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => navigate(config.routes.shop)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-0 overflow-hidden">
            {product.imagen ? (
              <img
                src={product.imagen}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
          </Card>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-4xl font-bold text-primary-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Stock disponible:</span> {product.stock} unidades
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Estado:</span>{' '}
                <span className={product.isActive ? 'text-green-600' : 'text-red-600'}>
                  {product.isActive ? 'Disponible' : 'No disponible'}
                </span>
              </p>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={() => addToCartMutation.mutate(1)}
              disabled={product.stock === 0 || !product.isActive}
              isLoading={addToCartMutation.isPending}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0
                ? 'Sin Stock'
                : !product.isActive
                ? 'No Disponible'
                : 'Agregar al Carrito'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

