import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome to VehicleCore', message: 'Your infrastructure protocol is now active.', read: false, time: 'Just now' },
    { id: 2, title: 'Low Stock Alert', message: 'Engine Oil (5W-30) is below 10 units.', read: true, time: '2h ago' }
  ]);
  const [activeToast, setActiveToast] = useState(null);

  const addNotification = useCallback((title, message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, title, message, read: false, time: 'Just now', type };
    
    setNotifications(prev => [newNotification, ...prev]);
    setActiveToast({ title, message, type });
    
    setTimeout(() => {
      setActiveToast(null);
    }, duration);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const hideToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      markAllAsRead, 
      notification: activeToast, // For the Toast component
      hideNotification: hideToast // For the Toast component
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
