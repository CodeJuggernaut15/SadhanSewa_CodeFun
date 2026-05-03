import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5188';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for stored token and validate it
  useEffect(() => {
    const stored = localStorage.getItem('sadhansewa_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if token is expired
        if (new Date(parsed.expiresAt) > new Date()) {
          setUser(parsed);
        } else {
          localStorage.removeItem('sadhansewa_auth');
        }
      } catch {
        localStorage.removeItem('sadhansewa_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.detail || json.message || 'Login failed');
    }

    const userData = {
      userId: json.data.userId,
      fullName: json.data.fullName,
      email: json.data.email,
      role: json.data.role,
      token: json.data.token,
      expiresAt: json.data.expiresAt,
    };

    localStorage.setItem('sadhansewa_auth', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (fullName, email, phone, password) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.detail || json.message || 'Registration failed');
    }

    return json.data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sadhansewa_auth');
    setUser(null);
  }, []);

  // Helper to make authenticated API calls
  const authFetch = useCallback(async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (user?.token) {
      headers['Authorization'] = `Bearer ${user.token}`;
    }

    return fetch(url.startsWith('http') ? url : `${API_BASE}${url}`, {
      ...options,
      headers,
    });
  }, [user]);

  const getDashboardPath = useCallback(() => {
    if (!user) return '/';
    switch (user.role) {
      case 'Admin': return '/admin/dashboard';
      case 'Staff': return '/staff/dashboard';
      case 'Customer': return '/customer/dashboard';
      default: return '/';
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      authFetch,
      getDashboardPath,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
