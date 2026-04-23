import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { icon: CheckCircle, color: '#1D9E75', bg: '#1D9E7510' },
    error: { icon: AlertCircle, color: '#ef4444', bg: '#ef444410' },
    warning: { icon: AlertTriangle, color: '#f59e0b', bg: '#f59e0b10' },
    info: { icon: Info, color: '#3b82f6', bg: '#3b82f610' },
  };

  const { icon: Icon, color, bg } = config[type];

  return (
    <div style={{
      position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 3000,
      display: 'flex', alignItems: 'center', gap: '15px', padding: '1rem 1.5rem',
      background: 'var(--bg-card)', border: `1.5px solid ${color}30`,
      borderRadius: '16px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
      animation: 'toastSlideIn 0.3s ease'
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} />
      </div>
      <p style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{message}</p>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
