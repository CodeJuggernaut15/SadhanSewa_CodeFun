import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

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
    { id: 1, title: 'Inventory Reorder', message: 'Synthetic Oil threshold reached. Manifest PRQ-8821 suggested.', read: false, time: '10:15 AM', category: 'Inventory', group: 'TODAY' },
    { id: 2, title: 'Payment Settled', message: 'Invoice #INV-3821 from Manish K. confirmed.', read: false, time: '09:30 AM', category: 'Finance', group: 'TODAY' },
    { id: 3, title: 'Profile Synced', message: 'Vehicle diagnostic profiles successfully updated.', read: true, time: '08:45 AM', category: 'System', group: 'TODAY' },
    { id: 4, title: 'Audit Alert', message: 'Mandatory bi-weekly security audit required for Admin roles.', read: true, time: 'Yesterday', category: 'Security', group: 'YESTERDAY' },
    { id: 5, title: 'Vendor Sync', message: 'Parts catalogue synchronized with Global Vendor Node.', read: true, time: '2d ago', category: 'Inventory', group: 'YESTERDAY' }
  ]);
  const [activeToast, setActiveToast] = useState(null);

  // SignalR Connection
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7119/notificationHub", { // Match your backend URL/Port
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error: ', err));

    connection.on("ReceiveNotification", (title, message, category) => {
      addNotification(title, message, category);
    });

    return () => {
      connection.stop();
    };
  }, []);

  const addNotification = useCallback((title, message, category = 'System', duration = 5000) => {
    const id = Date.now();
    const newNotification = { 
      id, title, message, read: false, 
      time: 'Just now', category, group: 'TODAY' 
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setActiveToast({ title, message, type: category.toLowerCase() === 'security' || category.toLowerCase() === 'inventory' ? 'warning' : 'info' });
    
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
      notification: activeToast,
      hideNotification: hideToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
