import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import CustomerSelfRegister from './pages/CustomerSelfRegister';
import StaffCustomerRegistration from './pages/StaffCustomerRegistration';
import SalesAndInvoice from './pages/SalesAndInvoice';
import Appointments from './pages/Appointments';
import CustomerHistory from './pages/CustomerHistory';
import AdminDashboard from './pages/AdminDashboard';
import StaffManagement from './pages/StaffManagement';
import VendorManagement from './pages/VendorManagement';
import CustomerInsights from './pages/CustomerInsights';
import NotificationCenter from './pages/NotificationCenter';
import PartsManagement from './pages/PartsManagement';
import PurchaseInvoice from './pages/PurchaseInvoice';
import AiDiagnostics from './pages/AiDiagnostics';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Notification from './components/Notification';

// New Pages
import StaffDashboard from './pages/StaffDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerProfile from './pages/CustomerProfile';
import FinancialReports from './pages/FinancialReports';
import StaffReports from './pages/StaffReports';
import CustomerShop from './pages/CustomerShop';
import CustomerContact from './pages/CustomerContact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <NotificationProvider>
        <Notification />
      <BrowserRouter>
      <Routes>
        {/* Public standalone pages (no sidebar/navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerSelfRegister />} />

        {/* Dashboard layout with sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<CustomerContact />} />
          
          {/* Admin Section — Admin only */}
          <Route path="admin">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="financial-reports" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <FinancialReports />
              </ProtectedRoute>
            } />
            <Route path="staff-management" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <StaffManagement />
              </ProtectedRoute>
            } />
            <Route path="parts-management" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <PartsManagement />
              </ProtectedRoute>
            } />
            <Route path="purchase-invoices" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <PurchaseInvoice />
              </ProtectedRoute>
            } />
            <Route path="vendor-management" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <VendorManagement />
              </ProtectedRoute>
            } />
            <Route path="diagnostics" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AiDiagnostics />
              </ProtectedRoute>
            } />
            <Route path="notifications" element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <NotificationCenter />
              </ProtectedRoute>
            } />
          </Route>

          {/* Staff Section — Staff + Admin */}
          <Route path="staff">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            <Route path="customer-registration" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <StaffCustomerRegistration />
              </ProtectedRoute>
            } />
            <Route path="customers" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <CustomerInsights />
              </ProtectedRoute>
            } />
            <Route path="sales" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <SalesAndInvoice />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
                <StaffReports />
              </ProtectedRoute>
            } />
          </Route>

          {/* Customer Section — All authenticated users */}
          <Route path="customer">
            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <CustomerDashboard />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <CustomerProfile />
              </ProtectedRoute>
            } />
            <Route path="appointments" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="history" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <CustomerHistory />
              </ProtectedRoute>
            } />
            <Route path="shop" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <CustomerShop />
              </ProtectedRoute>
            } />
            <Route path="contact" element={
              <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Customer']}>
                <CustomerContact />
              </ProtectedRoute>
            } />
          </Route>

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
      </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
