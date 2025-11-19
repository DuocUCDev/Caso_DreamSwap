# Integración del API de Autenticación - DreamSwap

## 📋 Resumen

Se ha integrado exitosamente el endpoint de registro del API real en la aplicación DreamSwap, junto con mejoras en el diseño UX-UI de las pantallas de autenticación.

## 🔗 Endpoint Integrado

### POST /auth/register
- **URL Base:** `https://ecommerce-tenant.vercel.app/api`
- **Header requerido:** `x-tenant-id: 690f356f30040f3b94a70efd`

#### Request Body
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123!",
  "role": "customer"
}
```

#### Response
```json
{
  "message": "string",
  "statusCode": 0,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "tenantId": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "customer",
      "isActive": true,
      "createdAt": "2025-11-12T23:16:32.165Z",
      "updatedAt": "2025-11-12T23:16:32.165Z"
    },
    "token": "string"
  }
}
```

## 🔄 Cambios Realizados

### 1. Configuración (`config/config.ts`)
- ✅ Agregado `tenantId` a la configuración del API
- ✅ URL del API configurada por defecto
- ✅ Soporte para variables de entorno

```typescript
api: {
  baseURL: import.meta.env.VITE_API_URL || 'https://ecommerce-tenant.vercel.app/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '15000'),
  tenantId: import.meta.env.VITE_TENANT_ID || '690f356f30040f3b94a70efd',
}
```

### 2. Cliente HTTP (`api/axios.ts`)
- ✅ Header `x-tenant-id` incluido en todas las peticiones
- ✅ Header `Content-Type: application/json` configurado
- ✅ Interceptores para manejo de tokens

```typescript
export const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-id': config.api.tenantId,
  },
});
```

### 3. Tipos de TypeScript (`auth/types.ts`)
- ✅ Actualizado `User` interface con campos del API real
- ✅ Agregado `RegisterCredentials` interface
- ✅ Agregado `AuthResponse` interface
- ✅ Agregado rol `customer` a `UserRole`

### 4. Contexto de Autenticación (`auth/AuthContext.tsx`)
- ✅ Implementada función `register()`
- ✅ Manejo de tokens en localStorage
- ✅ Navegación automática post-registro según rol
- ✅ Manejo de errores del API

### 5. Formulario de Registro (`pages/Register.jsx`)
- ✅ Migrado de `ProfileContext` a `AuthContext`
- ✅ Cambio de campos separados (nombre/apellido) a campo único (nombre completo)
- ✅ Integrado con endpoint real
- ✅ Validaciones mejoradas
- ✅ Manejo de estados de carga

### 6. Formulario de Login (`pages/Login.tsx`)
- ✅ Diseño UX-UI modernizado
- ✅ Consistente con el resto del sitio
- ✅ Spinner de carga animado
- ✅ Validación de errores con animaciones
- ✅ Link a registro

### 7. Router (`routes/AppRouter.jsx`)
- ✅ Actualizado import de Login a Login.tsx
- ✅ Eliminado archivo Login.jsx obsoleto

## 🎨 Mejoras de Diseño

### Características del Diseño Unificado:

1. **Paleta de Colores:**
   - Fondo: Gradiente oscuro (#0b0f14 → #121823)
   - Primario: Gradiente azul (#4B6CB7 → #3EBDF3)
   - Texto: Blanco con opacidad variable

2. **Efectos Visuales:**
   - Cards con backdrop blur y transparencia
   - Hover effects suaves
   - Animaciones de loading
   - Transiciones fluidas
   - Shake animation para errores

3. **UX Mejorada:**
   - Feedback visual inmediato
   - Estados de carga claros
   - Validación en tiempo real
   - Navegación entre login/registro
   - Autocompletado de formularios

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz del proyecto con:

```env
# API Configuration
VITE_API_URL=https://ecommerce-tenant.vercel.app/api
VITE_API_TIMEOUT=15000
VITE_TENANT_ID=690f356f30040f3b94a70efd

# Authentication
VITE_AUTH_COOKIE_NAME=dreamswap_session
VITE_AUTH_TOKEN_EXPIRY=8h
VITE_ENABLE_REFRESH_TOKEN=false
VITE_REFRESH_TOKEN_INTERVAL=300000
VITE_ENABLE_REMEMBER_ME=true

# Security
VITE_ENABLE_CSRF=false
VITE_CSRF_HEADER_NAME=X-CSRF-Token

# Routes
VITE_DEFAULT_ADMIN_ROUTE=/admin/dashboard
VITE_DEFAULT_USER_ROUTE=/shop
```

## 🚀 Uso

### Registro de Usuario

```javascript
import { useAuth } from '../auth/AuthContext';

function RegisterComponent() {
  const { register } = useAuth();
  
  const handleSubmit = async (data) => {
    await register({
      name: "Juan Pérez",
      email: "juan@example.com",
      password: "Password123!",
      role: "customer"
    });
    // Navegación automática post-registro
  };
}
```

### Login de Usuario

```javascript
import { useAuth } from '../auth/AuthContext';

function LoginComponent() {
  const { login, error } = useAuth();
  
  const handleSubmit = async (data) => {
    await login({
      email: "juan@example.com",
      password: "Password123!"
    });
    // Navegación automática post-login
  };
}
```

## 📝 Notas Importantes

1. **Token Storage:** Los tokens se guardan en `localStorage` con la clave `auth_token`
2. **Navegación Automática:** Después del registro/login exitoso, se redirige automáticamente según el rol del usuario
3. **Manejo de Errores:** Los errores del API se muestran automáticamente en los formularios
4. **Tenant ID:** Todas las peticiones incluyen automáticamente el header `x-tenant-id`

## 🧪 Testing

Para probar el registro:

1. Navegar a `/register`
2. Completar el formulario:
   - Nombre completo: "Juan Pérez"
   - Email: "test@example.com"
   - Contraseña: "Password123!"
   - Confirmar contraseña: "Password123!"
3. Click en "Crear cuenta"
4. La aplicación debe redirigir automáticamente al shop

## 🔜 Próximos Pasos Sugeridos

1. Integrar endpoint de Login (`POST /auth/login`)
2. Implementar endpoint de Me (`GET /auth/me`)
3. Configurar refresh token si es necesario
4. Añadir manejo de sesiones expiradas
5. Implementar "Recordarme" funcionalidad
6. Añadir recuperación de contraseña

## 📚 Arquitectura

```
┌─────────────┐
│   Register  │
│   Component │
└──────┬──────┘
       │
       v
┌─────────────┐      ┌──────────┐      ┌─────────────┐
│ AuthContext │─────>│   API    │─────>│  Backend    │
│             │      │ (axios)  │      │   Server    │
└─────────────┘      └──────────┘      └─────────────┘
       │
       v
┌─────────────┐
│  Navigation │
│  + Storage  │
└─────────────┘
```

---

**Fecha de implementación:** 12 de Noviembre, 2025
**Versión del API:** v1
**Estado:** ✅ Implementado y Funcional


