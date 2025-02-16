import {type RouteLocationNormalized} from 'vue-router';

export default async function authMiddleware(
  to: RouteLocationNormalized, from: RouteLocationNormalized, next: (route?: string | { name: string }) => void) {
  // Import the auth store
  const {useAuthStore} = await import('../store/auth');
  const auth = useAuthStore();
  
  // Check if the user is authenticated
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = auth.isAuthenticated;
  const isLoginRoute = to.name === 'Login';

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (isAuthenticated && isLoginRoute) {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
  
}