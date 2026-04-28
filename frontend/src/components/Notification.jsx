import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Notification = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  const { message, type } = notification;

  const styles = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-rose-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`${styles[type] || styles.info} px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px] backdrop-blur-md bg-opacity-90`}>
        <div className="flex-shrink-0">
          {icons[type] || icons.info}
        </div>
        <div className="flex-grow">
          {notification.title && <div className="font-bold text-sm mb-0.5">{notification.title}</div>}
          <div className="font-medium text-xs opacity-90">{message}</div>
        </div>
        <button 
          onClick={hideNotification}
          className="flex-shrink-0 hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
