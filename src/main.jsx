import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import ProtectedRoute from './admin/ProtectedRoute.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import BannerManager from './admin/pages/BannerManager.jsx'
import ProductManager from './admin/pages/ProductManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Storefront Route */}
        <Route path="/*" element={<App />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="banners" element={<BannerManager />} />
          <Route path="products" element={<ProductManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
