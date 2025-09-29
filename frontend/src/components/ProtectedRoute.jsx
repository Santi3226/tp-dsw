import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';

/**
 * 
 * ProtectedRoute component to restrict access to certain routes based on authentication and roles.
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @param children - React elements to render if the user is authenticated and has the required role
 * @example
 *  // Protected Route using children component
 *  <Route path="/path" element={
 *      <ProtectedRoute>
 *          <SomeComponent />
 *      </ProtectedRoute>
 *  }> 
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, wasAuthenticated, logout } = useAuth();

  // 1. Verificar autenticación
  if (!isAuthenticated()) {
    // Si no está autenticado, redirige a la página de login.
    // 'replace' evita que el usuario vuelva a la página protegida con el botón de atrás.
    logout();
    return <Navigate to={wasAuthenticated ? "/" : "/login"} replace />;
  }
/*
  // 2. Verificar roles (si se especificaron 'allowedRoles')
  if (allowedRoles && allowedRoles.length > 0) {
    // Comprobamos si el rol del usuario está incluido en los roles permitidos
    const userHasRequiredRole = user && allowedRoles.includes(user.role);
    if (!userHasRequiredRole) {
      logout();
      return <Navigate to="/login" replace />;
    }
  }
*/
  // 3. Si está autenticado y tiene el rol correcto, renderiza los hijos.
  // Usamos 'children' directamente para mayor flexibilidad.
  // Si se usa como elemento de <Route>, se puede usar <Outlet /> para rutas anidadas.
  return children ? children : <AuthLayout />;
};

export default ProtectedRoute;
