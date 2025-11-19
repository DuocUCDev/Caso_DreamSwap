# E-Commerce Frontend

Aplicación de e-commerce moderna construida con React, TypeScript, Vite, TailwindCSS, React Query y Zustand.

## 🚀 Características

### Front Office (Cliente)
- ✅ Catálogo de productos con búsqueda y paginación
- ✅ Detalle de productos
- ✅ Carrito de compras
- ✅ Checkout y creación de órdenes
- ✅ Gestión de perfil de usuario
- ✅ Historial de pedidos
- ✅ Autenticación (Login/Registro)

### Back Office (Admin)
- ✅ Dashboard con métricas
- ✅ Gestión completa de productos (CRUD)
- ✅ Gestión de órdenes y estados
- ✅ Control de acceso basado en roles

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **TailwindCSS** - Estilos utility-first
- **React Query** - Gestión de estado del servidor
- **Zustand** - Gestión de estado global
- **React Router** - Navegación
- **React Hook Form + Zod** - Formularios y validación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://ecommerce-tenant.vercel.app/api
VITE_API_TIMEOUT=15000
VITE_TENANT_ID=690f356f30040f3b94a70efd
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── api/              # Clientes API (auth, products, cart, orders)
├── components/       # Componentes reutilizables
│   ├── admin/       # Componentes del panel admin
│   ├── auth/        # Componentes de autenticación
│   ├── layout/      # Layout components (Navbar, Footer)
│   └── ui/          # Componentes UI base (Button, Input, Card)
├── config/          # Configuración de la app
├── pages/           # Páginas de la aplicación
│   ├── admin/       # Páginas del panel admin
│   └── ...          # Páginas públicas y de usuario
├── routes/           # Configuración de rutas
├── store/           # Stores de Zustand
├── types/            # Tipos TypeScript
└── utils/           # Utilidades
```

## 🔐 Autenticación

La aplicación maneja dos roles:
- **customer**: Usuario regular que puede comprar productos
- **admin**: Administrador con acceso al panel de control

## 🎨 Diseño

- Diseño responsive y moderno
- Sistema de componentes reutilizables
- Paleta de colores consistente
- UX optimizada con feedback visual

## 📝 API Integration

La aplicación está completamente integrada con la API documentada en `API-DOCUMENTATION.md`:

- ✅ Autenticación (Login/Register)
- ✅ Productos (CRUD completo)
- ✅ Carrito de compras
- ✅ Órdenes

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implementen)
npm test
```

## 📄 Licencia

MIT
