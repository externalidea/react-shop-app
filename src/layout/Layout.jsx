import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../styles/App.css';

const Layout = () => {
  const { currentUser, logout, cart } = useContext(ProductContext);

  return (
    <div className="container">
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Logo/brand link */}
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', textDecoration: 'none' }}>Shop</Link>
          <Link to="/">Home</Link>
          {currentUser?.isAdmin && <Link to="/admin">Admin</Link>}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Cart link with item count, positioned on the right */}
          <Link to="/cart" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)', textDecoration: 'none' }}>
            🛒 Cart ({cart.length})
          </Link>
          {currentUser ? (
            <>
              <span>Welcome, {currentUser.nickname || currentUser.email}</span>
              <button onClick={logout} style={{ backgroundColor: '#dc2626', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--border-radius)', cursor: 'pointer', color: 'white' }}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;