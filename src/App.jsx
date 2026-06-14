import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import NotifyRequests from './pages/NotifyRequests';

function AdminGuard() {
  const { isAdminLoggedIn } = useStore();
  if (!isAdminLoggedIn) return <Navigate to="/admin" replace />;
  return <Outlet />;
}

function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <Routes>
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Route>

            <Route path="/admin" element={<AdminLogin />} />

            <Route element={<AdminGuard />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/edit-product/:id" element={<EditProduct />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/notify-requests" element={<NotifyRequests />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}