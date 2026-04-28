import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet, Link } from 'react-router-dom';

/**
 * Modern High-Aesthetic Dashboard Layout
 * Provides a fixed sidebar and a fluid, centered content area.
 */
const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Fixed Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Scrollable Area */}
      <main style={{ 
        flex: 1, 
        marginLeft: '275px', // Matches the new sidebar width
        minHeight: '100vh',
        background: 'var(--bg-main)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Navbar */}
        <Navbar />
        {/* Decorative Grid Pattern for Dark Mode */}
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', 
          backgroundSize: '40px 40px', 
          opacity: 1, 
          pointerEvents: 'none', 
          zIndex: 0 
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, paddingBottom: '6rem' }}>
          <div className="content-container">
            <Outlet />
          </div>
        </div>
        
        <footer style={{ 
          position: 'relative', 
          zIndex: 1,
          padding: '4rem 6rem', 
          borderTop: '1px solid #e2e8f0', 
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
            <div>
               <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.15em', marginBottom: '4px' }}>Infrastructure Protocol V2.1</p>
               <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>© 2026 VehicleCore Infrastructure. All Rights Reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem' }}>
              <a href="#" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', textDecoration: 'none' }}>Service Terms</a>
              <Link to="/contact" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
