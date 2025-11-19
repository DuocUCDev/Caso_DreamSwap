import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { X } from 'lucide-react';
import { productsApi } from '../../api/products';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { ProductCreate } from '../../types';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  stock: z.number().min(0, 'El stock debe ser mayor o igual a 0'),
  imagen: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | null;
}

export const ProductFormModal = ({ isOpen, onClose, productId }: ProductFormModalProps) => {
  const queryClient = useQueryClient();

  const { data: productData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(productId!),
    enabled: !!productId && isOpen,
  });

  const createMutation = useMutation({
    mutationFn: (data: ProductCreate) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<ProductCreate>) =>
      productsApi.update(productId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (productData?.data && isOpen) {
      setValue('name', productData.data.name);
      setValue('description', productData.data.description || '');
      setValue('price', productData.data.price);
      setValue('stock', productData.data.stock);
      setValue('imagen', productData.data.imagen || '');
    } else if (!productId && isOpen) {
      reset();
    }
  }, [productData, isOpen, productId, setValue, reset]);

  const onSubmit = (data: ProductFormData) => {
    if (productId) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {productId ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Nombre del Producto"
            {...register('name')}
            error={errors.name?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Precio"
              type="number"
              step="0.01"
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
            />

            <Input
              label="Stock"
              type="number"
              {...register('stock', { valueAsNumber: true })}
              error={errors.stock?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen (Base64 o URL)
            </label>
            <textarea
              {...register('imagen')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="data:image/jpeg;base64,... o URL de imagen"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {productId ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

