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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<CustomerSelfRegister />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="history" element={<CustomerHistory />} />
          <Route path="staff">
            <Route path="register" element={<StaffCustomerRegistration />} />
            <Route path="sales" element={<SalesAndInvoice />} />
            <Route path="insights" element={<CustomerInsights />} />
          </Route>
          <Route path="admin">
            <Route index element={<AdminDashboard />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="vendors" element={<VendorManagement />} />
            <Route path="parts" element={<PartsManagement />} />
            <Route path="procurement" element={<PurchaseInvoice />} />
            <Route path="diagnostics" element={<AiDiagnostics />} />
            <Route path="notifications" element={<NotificationCenter />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
