import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/customer/HomePage'
import OrderCompletePage from './pages/customer/OrderCompletePage';
import MenusPage from "./pages/admin/MenusPage";
import MenuManagementPage from "./pages/admin/MenuManagementPage";
import LoginPage from "./pages/auth/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/order-complete" element={<OrderCompletePage />}></Route>
        <Route path="/menus" element={<MenusPage />}></Route>
        <Route
          path="/menus/management"
          element={<MenuManagementPage />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  );
}

export default App
