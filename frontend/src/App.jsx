import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
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
    <NotificationProvider>
      <Notification />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<CustomerSelfRegister />} />
          <Route path="contact" element={<CustomerContact />} />
          
          {/* Admin Section */}
          <Route path="admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="financial-reports" element={<FinancialReports />} />
            <Route path="staff-management" element={<StaffManagement />} />
            <Route path="parts-management" element={<PartsManagement />} />
            <Route path="purchase-invoices" element={<PurchaseInvoice />} />
            <Route path="vendor-management" element={<VendorManagement />} />
            <Route path="diagnostics" element={<AiDiagnostics />} />
            <Route path="notifications" element={<NotificationCenter />} />
          </Route>

          {/* Staff Section */}
          <Route path="staff">
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="customer-registration" element={<StaffCustomerRegistration />} />
            <Route path="customers" element={<CustomerInsights />} />
            <Route path="sales" element={<SalesAndInvoice />} />
            <Route path="reports" element={<StaffReports />} />
          </Route>

          {/* Customer Section */}
          <Route path="customer">
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="parts-request" element={<Appointments />} /> {/* Integrated in Appointments */}
            <Route path="reviews" element={<Appointments />} /> {/* Integrated in Appointments */}
            <Route path="history" element={<CustomerHistory />} />
            <Route path="shop" element={<CustomerShop />} />
            <Route path="contact" element={<CustomerContact />} />
          </Route>

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
