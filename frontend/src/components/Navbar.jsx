import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, UserPlus, ShoppingCart, Info, UserCheck, 
  Calendar, History, Shield, PieChart, TrendingUp, Bell 
} from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-dark" style={{ background: '#0f172a', padding: '1rem', color: 'white', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1.5px solid rgba(255,255,255,0.05)' }}>
      <div className="container flex justify-between items-center">
        {/* Brand Link */}
        <Link to="/" className="flex items-center gap-3 group transition-all">
          <div style={{ background: 'var(--primary-gradient)', padding: '0.5rem', borderRadius: '10px' }} className="shadow-lg group-hover:scale-110 transition-transform">
            <LayoutDashboard size={20} />
          </div>
          <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.8px' }} className="text-white">VEHICLE<span className="text-primary">CORE</span></span>
        </Link>

        {/* Feature Links (Modularity & High UX) */}
        <div className="flex gap-8 items-center">
          <Link to="/" className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-black uppercase tracking-widest">
            Home
          </Link>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
          
          <Link to="/appointments" className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-black uppercase tracking-widest">
            <Calendar size={15} /> Appointments
          </Link>
          <Link to="/history" className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-black uppercase tracking-widest">
            <History size={15} /> Logs
          </Link>
          <Link to="/staff/insights" className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-black uppercase tracking-widest">
            <TrendingUp size={15} /> Insights
          </Link>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

          {/* Admin Console (Highlight for Mark 6) */}
          <Link to="/admin" className="flex items-center gap-1.5 hover:text-primary transition-all text-xs font-black uppercase tracking-widest py-2 px-3 rounded-lg border border-slate-800 hover:border-primary">
            <PieChart size={15} /> Admin Hub
          </Link>
          <Link to="/admin/notifications" className="relative hover:text-primary transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-danger rounded-full border-2 border-slate-900"></span>
          </Link>
          
          {/* Main Action Call (Highlight for Mark 6) */}
          <Link to="/staff/sales" className="btn btn-primary shadow-lg py-3 px-6 text-xs font-black uppercase tracking-widest flex items-center gap-2 group">
            <ShoppingCart size={16} className="group-hover:translate-x-1 transition-transform" /> POS Terminal
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
