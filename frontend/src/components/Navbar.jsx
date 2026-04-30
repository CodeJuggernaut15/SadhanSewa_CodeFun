import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Bell, Mail, LogIn, User 
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { notifications, markAllAsRead } = useNotification();
  const { user, isAuthenticated, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-dark" style={{ background: '#0f172a', padding: '1rem', color: 'white', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1.5px solid rgba(255,255,255,0.05)' }}>
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left Side Spacer (since logo is in sidebar) */}
        <div style={{ width: '40px' }}></div>

        {/* Right Side Icons & User Profile */}
        <div className="flex gap-6 items-center" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              {/* Notifications Bell */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => { setShowNotifications(!showNotifications); markAllAsRead(); }}
                  style={{ background: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 800, padding: '2px 5px', borderRadius: '99px', border: '2px solid #0f172a' }}>
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div style={{ position: 'absolute', top: '40px', right: 0, width: '300px', background: '#1e293b', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Notifications</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: n.read ? 'rgba(255,255,255,0.5)' : 'var(--primary)' }}>{n.title}</span>
                              <span style={{ fontSize: '10px', opacity: 0.5 }}>{n.time}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User info + POS */}
              {(user.role === 'Admin' || user.role === 'Staff') && (
                <Link to="/staff/sales" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                  <ShoppingCart size={16} /> POS Terminal
                </Link>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                  {user.fullName?.charAt(0)?.toUpperCase()}
                </div>
                <div style={{ lineHeight: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>{user.fullName}</p>
                  <p style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 700, margin: 0 }}>{user.role}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                <LogIn size={15} /> Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
