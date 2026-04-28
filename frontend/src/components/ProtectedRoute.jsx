import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protects routes based on authentication and role.
 * Usage: <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading, getDashboardPath } = useAuth();
  const location = useLocation();

  // Show nothing while checking auth state
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', color: 'var(--text-muted)', fontSize: '14px', fontWeight: 700
      }}>
        Verifying access...
      </div>
    );
  }

  // Not authenticated → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard
    return <Navigate to={getDashboardPath()} replace />;
  }

  return children;
};

export default ProtectedRoute;
