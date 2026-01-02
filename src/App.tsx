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
            isLoggedIn ? <AdminOrdersPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/menus"
          element={
            isLoggedIn ? <AdminMenusPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/menus/:id"
          element={
            isLoggedIn ? (
              <AdminMenuDetailPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/menus/create"
          element={
            isLoggedIn ? (
              <AdminMenuCreatePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/menus/:id/edit"
          element={
            isLoggedIn ? (
              <AdminMenuEditPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? <RegisterPage /> : <Navigate to="/admin/orders" replace />
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
      </Routes>
    </>
  );
}

export default App
