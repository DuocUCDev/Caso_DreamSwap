import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { config } from '../../config/config';
import type { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={config.routes.login} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={config.routes.home} replace />;
  }

  return <>{children}</>;
};

