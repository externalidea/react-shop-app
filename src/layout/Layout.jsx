import { Outlet, Link } from 'react-router-dom';
import '../styles/App.css';

const Layout = () => {
  return (
    <div className="container">
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;