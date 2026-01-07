import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/customer/HomePage'
import OrderCompletePage from './pages/customer/OrderCompletePage';
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "react-hot-toast";
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminMenusPage from './pages/admin/AdminMenusPage';
import AdminMenuDetailPage from './pages/admin/AdminMenuDetailPage';
import AdminMenuCreatePage from './pages/admin/AdminMenuCreatePage';
import AdminMenuEditPage from './pages/admin/AdminMenuEditPage';
import { useAuth } from './context/AuthContext';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/order-complete/:orderId"
          element={<OrderCompletePage />}
        />
        
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menus"
          element={
            <ProtectedRoute>
              <AdminMenusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menus/create"
          element={
            <ProtectedRoute>
              <AdminMenuCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menus/:id"
          element={
            <ProtectedRoute>
              <AdminMenuDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/menus/:id/edit"
          element={
            <ProtectedRoute>
              <AdminMenuEditPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <RegisterPage />
            ) : (
              <Navigate to="/admin/orders" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage />
            ) : (
              <Navigate to="/admin/orders" replace />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App
