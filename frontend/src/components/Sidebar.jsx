import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, ShoppingCart, 
  Calendar, History, Shield, PieChart, 
  TrendingUp, Bell, Users, Truck,
  LogOut, Package, FileText, Zap
} from 'lucide-react';

/**
 * Enterprise Sidebar Navigation - Simplified Icons for Compatibility
 * Removed modern icons that might not exist in lucide-react@1.7.0.
 */
const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuGroups = [
    {
      title: "General",
      links: [
        { name: "Home", path: "/", icon: Home },
        { name: "Self Registration", path: "/register", icon: User },
      ]
    },
    {
      title: "Operations",
      links: [
        { name: "Service Appointments", path: "/appointments", icon: Calendar },
        { name: "Point of Sale (POS)", path: "/staff/sales", icon: ShoppingCart },
        { name: "Staff Intake Registry", path: "/staff/register", icon: FileText },
        { name: "History", path: "/history", icon: History },
      ]
    },
    {
      title: "Inventory & Assets",
      links: [
        { name: "Manage Parts", path: "/admin/parts", icon: Package },
        { name: "Purchase Invoice", path: "/admin/procurement", icon: FileText },
        { name: "Vendor Partners", path: "/admin/vendors", icon: Truck },
      ]
    },
    {
      title: "Intelligence",
      links: [
        { name: "AI Diagnostics", path: "/admin/diagnostics", icon: Zap },
        { name: "Customer Insights", path: "/staff/insights", icon: TrendingUp },
        { name: "Notifications", path: "/admin/notifications", icon: Bell },
      ]
    },
    {
      title: "Administration",
      links: [
        { name: "Financial Overview", path: "/admin", icon: PieChart },
        { name: "Staff Management", path: "/admin/staff", icon: Users },
      ]
    }
  ];

  return (
    <aside style={{ 
      width: '275px', 
      height: '100vh', 
      background: '#0f172a', 
      color: 'white', 
      position: 'fixed', 
      left: 0, 
      top: 0, 
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      boxShadow: '10px 0 30px rgba(0,0,0,0.1)'
    }}>
      {/* BRANDING BLOCK - CONTAINED BLACK BORDER BOX */}
      <div style={{ padding: '2.5rem 1.15rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          textDecoration: 'none', 
          color: 'inherit',
          background: '#000000',
          padding: '1.25rem 1rem',
          borderRadius: '18px',
          border: '1.5px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}>
          <div style={{ 
            background: '#1D9E75', 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(29, 158, 117, 0.4)',
          }}>
            <Shield size={24} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ 
            fontWeight: 800, 
            fontSize: '1.2rem', 
            letterSpacing: '-1px', 
            textTransform: 'uppercase',
            lineHeight: 1
          }}>
            VEHICLE<span style={{color: '#1D9E75'}}>CORE</span>
          </span>
        </Link>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.15rem' }} className="custom-scrollbar">
        {menuGroups.map((group, i) => (
          <div key={i} style={{ marginBottom: '2.2rem' }}>
            <p style={{ 
              fontSize: '10px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              color: 'rgba(255,255,255,0.25)', 
              marginBottom: '1rem',
              paddingLeft: '0.85rem'
            }}>
              {group.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {group.links.map((link, j) => (
                <Link
                  key={j}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '11px',
                    fontSize: '13px',
                    fontWeight: isActive(link.path) ? 700 : 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: isActive(link.path) ? 'rgba(29, 158, 117, 0.15)' : 'transparent',
                    color: isActive(link.path) ? '#1D9E75' : '#94a3b8',
                    border: isActive(link.path) ? '1px solid rgba(29, 158, 117, 0.1)' : '1px solid transparent'
                  }}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{ 
            width: '38px', height: '38px', borderRadius: '10px', 
            background: 'linear-gradient(135deg, #1D9E75 0%, #0f172a 100%)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontWeight: 800, fontSize: '12px' 
          }}>PB</div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Prashiddhika B.</p>
            <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, margin: 0 }}>Administrator</p>
          </div>
        </div>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', 
          background: 'none', border: 'none', color: '#ef4444', 
          fontSize: '11px', fontWeight: 800, cursor: 'pointer',
          padding: 0, opacity: 0.8
        }}>
          <LogOut size={14} /> LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
