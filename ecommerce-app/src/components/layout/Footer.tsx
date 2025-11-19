import { Link } from 'react-router-dom';
import { config } from '../../config/config';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{config.app.name}</h3>
            <p className="text-gray-400 text-sm">
              Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link to={config.routes.shop} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to={config.routes.cart} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Cuenta</h4>
            <ul className="space-y-2">
              <li>
                <Link to={config.routes.profile} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link to={config.routes.orders} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Mis Pedidos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contacto</h4>
            <p className="text-gray-400 text-sm">
              Email: info@ecommerce.com<br />
              Teléfono: +1 234 567 890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {config.app.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

