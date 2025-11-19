import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { useAuthStore } from '../store/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { User, Mail, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <span className="text-xs font-semibold bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {user.role === 'admin' ? 'Admin' : 'Cliente'}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rol</p>
                  <p className="font-semibold capitalize">{user.role}</p>
                </div>
              </div>

              {user.createdAt && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Miembro desde</p>
                    <p className="font-semibold">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Profile = () => (
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
);

