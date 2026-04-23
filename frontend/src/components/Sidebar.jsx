import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, ShoppingCart, 
  Calendar, History, Shield, PieChart, 
  TrendingUp, Bell, Users, Truck,
  LogOut, Package, FileText, Zap,
  BarChart3, Settings, ShoppingBag, Star,
  Activity, ShieldAlert, CreditCard
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [role, setRole] = useState('Admin'); // Mock role for demonstration
  
  const isActive = (path) => location.pathname === path;

  const adminMenu = [
    { title: "Governance", links: [
      { name: "Executive Dashboard", path: "/admin/dashboard", icon: Activity },
      { name: "Fiscal Reports", path: "/admin/financial-reports", icon: BarChart3 },
    ]},
    { title: "Operations", links: [
      { name: "Staff Management", path: "/admin/staff-management", icon: Users },
      { name: "Vendor Partners", path: "/admin/vendor-management", icon: Truck },
    ]},
    { title: "Inventory", links: [
      { name: "Asset Registry", path: "/admin/parts-management", icon: Package },
      { name: "Purchase Invoices", path: "/admin/purchase-invoices", icon: FileText },
    ]},
    { title: "System Intelligence", links: [
      { name: "AI Diagnostics", path: "/admin/diagnostics", icon: Zap },
      { name: "Event Manifest", path: "/admin/notifications", icon: Bell },
    ]}
  ];

  const staffMenu = [
    { title: "Command", links: [
      { name: "Staff Dashboard", path: "/staff/dashboard", icon: TrendingUp },
      { name: "POS Terminal", path: "/staff/sales", icon: ShoppingCart },
    ]},
    { title: "Customers", links: [
      { name: "Customer Intake", path: "/staff/customer-registration", icon: User },
      { name: "Client Insights", path: "/staff/customers", icon: Users },
    ]},
    { title: "Intelligence", links: [
      { name: "Operational Reports", path: "/staff/reports", icon: FileText },
    ]}
  ];

  const customerMenu = [
    { title: "Experience", links: [
      { name: "My Dashboard", path: "/customer/dashboard", icon: Shield },
      { name: "Identity Settings", path: "/customer/profile", icon: Settings },
    ]},
    { title: "Services", links: [
      { name: "Book Appointment", path: "/customer/appointments", icon: Calendar },
      { name: "Service History", path: "/customer/history", icon: History },
    ]},
    { title: "Retail", links: [
      { name: "Browse Catalog", path: "/customer/shop", icon: ShoppingBag },
    ]}
  ];

  const currentMenu = role === 'Admin' ? adminMenu : role === 'Staff' ? staffMenu : customerMenu;

  return (
    <aside style={{ 
      width: '275px', height: '100vh', background: '#0f172a', color: 'white', 
      position: 'fixed', left: 0, top: 0, borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex', flexDirection: 'column', zIndex: 1000, boxShadow: '10px 0 30px rgba(0,0,0,0.1)'
    }}>
      {/* Role Switcher (Demo Only) */}
      <div style={{ padding: '1rem', background: '#1D9E7510', borderBottom: '1px solid #1D9E7520', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {['Admin', 'Staff', 'Customer'].map(r => (
          <button 
            key={r} 
            onClick={() => setRole(r)}
            style={{ 
              fontSize: '9px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px',
              background: role === r ? '#1D9E75' : 'transparent',
              color: role === r ? '#fff' : '#64748b',
              border: '1px solid' + (role === r ? '#1D9E75' : '#64748b20'),
              cursor: 'pointer'
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* BRANDING */}
      <div style={{ padding: '1.5rem 1.15rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" style={{ 
          display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit',
          background: '#000000', padding: '1.25rem 1rem', borderRadius: '18px',
          border: '1.5px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}>
          <div style={{ 
            background: '#1D9E75', width: '44px', height: '44px', borderRadius: '12px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(29, 158, 117, 0.4)',
          }}>
            <Shield size={24} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-1px', textTransform: 'uppercase', lineHeight: 1 }}>
            VEHICLE<span style={{color: '#1D9E75'}}>CORE</span>
          </span>
        </Link>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.15rem' }} className="custom-scrollbar">
        {currentMenu.map((group, i) => (
          <div key={i} style={{ marginBottom: '2.2rem' }}>
            <p style={{ 
              fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', 
              color: 'rgba(255,255,255,0.25)', marginBottom: '1rem', paddingLeft: '0.85rem'
            }}>
              {group.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {group.links.map((link, j) => (
                <Link
                  key={j}
                  to={link.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px',
                    borderRadius: '11px', fontSize: '13px', fontWeight: isActive(link.path) ? 700 : 500,
                    textDecoration: 'none', transition: 'all 0.2s',
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
            <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, margin: 0 }}>{role}</p>
          </div>
        </div>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', 
          color: '#ef4444', fontSize: '11px', fontWeight: 800, cursor: 'pointer', padding: 0, opacity: 0.8
        }}>
          <LogOut size={14} /> LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
