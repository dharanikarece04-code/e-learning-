import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

/**
 * Wraps protected routes. Redirects unauthenticated users to /auth/login.
 * Usage in App.jsx: <Route element={<ProtectedRoute />}> ... </Route>
 */
const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
