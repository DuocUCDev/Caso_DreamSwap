import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter';
import { useAuthStore } from './store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    // Solo inicializar auth en el cliente
    if (typeof window !== 'undefined') {
      initAuth();
    }
  }, [initAuth]);

  return <AppRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
