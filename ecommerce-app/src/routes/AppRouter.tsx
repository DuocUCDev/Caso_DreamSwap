import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { config } from '../config/config';
import { Home } from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductDetail } from '../pages/ProductDetail';
import { Cart } from '../pages/Cart';
import { Profile } from '../pages/Profile';
import { Orders } from '../pages/Orders';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/admin/Dashboard';
import { Products } from '../pages/admin/Products';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { OrderDetail } from '../pages/admin/OrderDetail';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path={config.routes.home} element={<Home />} />
            <Route path={config.routes.shop} element={<Shop />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path={config.routes.login} element={<Login />} />
            <Route path={config.routes.register} element={<Register />} />
            
            <Route path={config.routes.cart} element={<Cart />} />
            <Route path={config.routes.profile} element={<Profile />} />
            <Route path={config.routes.orders} element={<Orders />} />
            
            <Route
              path={config.routes.admin.dashboard}
              element={
                <ProtectedRoute requiredRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path={config.routes.admin.products}
              element={
                <ProtectedRoute requiredRole="admin">
                  <Products />
                </ProtectedRoute>
              }
            />
            
            <Route
              path={config.routes.admin.orders}
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/admin/orders/:id"
              element={
                <ProtectedRoute requiredRole="admin">
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Navigate to={config.routes.home} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
