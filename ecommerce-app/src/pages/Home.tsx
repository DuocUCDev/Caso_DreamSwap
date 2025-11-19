import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Shield, Truck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { config } from '../config/config';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenido a {config.app.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Encuentra los mejores productos al mejor precio
            </p>
            <Link to={config.routes.shop}>
              <Button size="lg" variant="secondary">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Explorar Tienda
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gran Variedad</h3>
              <p className="text-gray-600">
                Miles de productos disponibles para ti
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">
                Tus datos están protegidos con nosotros
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Envío Rápido</h3>
              <p className="text-gray-600">
                Recibe tus pedidos en tiempo récord
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

