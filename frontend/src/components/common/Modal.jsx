import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', inset: 0, zIndex: 2000, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)' }} 
        onClick={onClose}
      />
      <div style={{ 
        position: 'relative', width: '100%', maxWidth: '600px', 
        background: 'var(--bg-card)', borderRadius: '32px', 
        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)',
        border: '1.5px solid var(--border-color)',
        overflow: 'hidden',
        animation: 'modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ padding: '2rem 2.5rem', borderBottom: '1.5px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{title}</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '8px', borderRadius: '50%' }}
            className="hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div style={{ padding: '2.5rem', maxHeight: '70vh', overflowY: 'auto' }} className="custom-scrollbar">
          {children}
        </div>

        {footer && (
          <div style={{ padding: '1.5rem 2.5rem', borderTop: '1.5px solid var(--border-color)', background: 'rgba(0,0,0,0.01)', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
