import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ProductProvider>
      {/* Wrapping the app with ProductProvider to provide context to all components */}
      {/* Using React Router for navigation between pages */}
      <Router>
        <Routes>
          {/* Main layout for most pages, includes navigation */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Separate layout for auth pages (login/register) with different styling */}
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<AuthLayout />}>
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;