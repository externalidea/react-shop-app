import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';

// Layouts
import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'admin', element: <Admin /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  }
]);

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;