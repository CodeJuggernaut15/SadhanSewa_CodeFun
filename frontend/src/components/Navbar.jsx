import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Bell, Mail, LogIn, User, ShieldAlert, Zap, ArrowRight, Package, Check, CreditCard
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { notifications, markAllAsRead } = useNotification();
  const { user, isAuthenticated, logout, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('Direct');
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
                  <div className="glass-dark animate-in fade-in zoom-in-95 duration-200" style={{ 
                    position: 'absolute', top: '55px', right: 0, width: '420px', 
                    background: 'rgba(15, 23, 42, 0.98)', backdropFilter: 'blur(24px)',
                    borderRadius: '28px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)', 
                    padding: '0', border: '1.5px solid rgba(255,255,255,0.1)', zIndex: 1000,
                    overflow: 'hidden'
                  }}>
                    {/* Header with Mark All as Read */}
                    <div style={{ padding: '1.75rem 1.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: 0 }}>Notifications</h4>
                      <button 
                        onClick={markAllAsRead}
                        style={{ background: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 700, padding: 0 }}
                      >
                        Mark all as read
                      </button>
                    </div>

                    {/* Tabs */}
                    <div style={{ padding: '0 1.75rem', display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['Direct', 'Overall'].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          style={{ 
                            padding: '0.75rem 0', fontSize: '13px', fontWeight: 700,
                            color: activeTab === tab ? 'var(--primary)' : 'rgba(255,255,255,0.4)',
                            borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                            background: 'none', cursor: 'pointer'
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div style={{ maxHeight: '480px', overflowY: 'auto', padding: '1rem 0' }} className="custom-scrollbar">
                      {['TODAY', 'YESTERDAY'].map(group => {
                        // Filter by Group (Today/Yesterday) AND Tab (Direct = Recent/Today, Overall = All)
                        if (activeTab === 'Direct' && group !== 'TODAY') return null;
                        
                        const groupNotifications = notifications.filter(n => n.group === group);
                        if (groupNotifications.length === 0) return null;

                        return (
                          <div key={group}>
                            <div style={{ 
                              padding: '1.25rem 1.75rem 0.5rem', fontSize: '10px', fontWeight: 800, 
                              color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' 
                            }}>
                              {group}
                            </div>
                            {groupNotifications.map(n => (
                              <div key={n.id} style={{ 
                                display: 'flex', gap: '16px', padding: '1rem 1.75rem',
                                background: n.read ? 'transparent' : 'rgba(29, 158, 117, 0.03)',
                                transition: 'background 0.2s', position: 'relative'
                              }}>
                                {!n.read && (
                                  <div style={{ 
                                    position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                                    width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%'
                                  }}></div>
                                )}
                                
                                {/* Avatar/Icon System */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                  <div style={{ 
                                    width: '44px', height: '44px', borderRadius: '50%', 
                                    background: n.category === 'Finance' ? '#f59e0b20' : n.category === 'Inventory' ? '#ef444420' : '#1D9E7520',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: n.category === 'Finance' ? '#f59e0b' : n.category === 'Inventory' ? '#ef4444' : '#1D9E75'
                                  }}>
                                    {n.category === 'Finance' ? <CreditCard size={20} /> : n.category === 'Inventory' ? <Package size={20} /> : <Zap size={20} />}
                                  </div>
                                  <div style={{ 
                                    position: 'absolute', bottom: '-2px', right: '-2px', 
                                    width: '18px', height: '18px', borderRadius: '50%', background: '#0f172a',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1.5px solid #0f172a'
                                  }}>
                                    <div style={{ 
                                      width: '100%', height: '100%', borderRadius: '50%', 
                                      background: n.read ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                      <Check size={10} color="white" strokeWidth={4} />
                                    </div>
                                  </div>
                                </div>

                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <p style={{ fontSize: '13px', color: '#fff', margin: 0, lineHeight: 1.4 }}>
                                      <span style={{ fontWeight: 800 }}>{n.category} Update:</span> {n.title}
                                    </p>
                                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, flexShrink: 0, marginLeft: '10px' }}>{n.time}</span>
                                  </div>
                                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.5 }}>{n.message}</p>
                                  {n.category === 'Inventory' && (
                                    <span style={{ 
                                      display: 'inline-block', marginTop: '8px', padding: '3px 8px', borderRadius: '6px', 
                                      background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '10px', fontWeight: 800 
                                    }}>
                                      MANI-8821
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
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
