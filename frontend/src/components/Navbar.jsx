import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, UserPlus, ShoppingCart, Info, UserCheck, 
  Calendar, History, Shield, PieChart, TrendingUp, Bell, Mail 
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Navbar = () => {
  const { notifications, markAllAsRead } = useNotification();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="glass-dark" style={{ background: '#0f172a', padding: '1rem', color: 'white', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1.5px solid rgba(255,255,255,0.05)' }}>
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand Link */}
        <Link to="/" className="flex items-center gap-3 group transition-all" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--primary-gradient)', padding: '0.5rem', borderRadius: '10px' }} className="shadow-lg group-hover:scale-110 transition-transform">
            <LayoutDashboard size={20} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.8px' }} className="text-white">VEHICLE<span style={{ color: 'var(--primary)' }}>CORE</span></span>
        </Link>

        {/* Feature Links (Modularity & High UX) */}
        <div className="flex gap-8 items-center" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            Home
          </Link>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
          
          <Link to="/customer/dashboard" style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            Dashboard
          </Link>

          <Link to="/customer/contact" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            <Mail size={15} /> Contact
          </Link>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

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
          
          {/* Main Action Call */}
          <Link to="/staff/sales" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            <ShoppingCart size={16} /> POS Terminal
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
