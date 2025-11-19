import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { productsApi } from '../api/products';
import { cartApi } from '../api/cart';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { config } from '../config/config';
import type { Product } from '../types';

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { setCart } = useCartStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, searchTerm],
    queryFn: () => productsApi.getAll({ isActive: true, page, limit: 12 }),
  });

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await cartApi.addItem({
        productId: product._id,
        quantity: 1,
      });
      setCart(response.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredProducts = data?.data.products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al cargar productos</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tienda</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="flex flex-col hover:shadow-lg transition-shadow">
              <Link to={`/products/${product._id}`} className="flex-1">
                {product.imagen ? (
                  <img
                    src={product.imagen}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  )}
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-primary-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} unidades
                    </p>
                  </div>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {data?.data.pagination && (
          <div className="mt-8 flex justify-center space-x-2">
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
      </div>
    </div>
  );
};

