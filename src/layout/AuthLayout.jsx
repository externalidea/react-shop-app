import { Outlet, Link } from 'react-router-dom';
import '../styles/App.css';

const AuthLayout = () => {
  return (
    <div className="auth-wrapper" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Welcome to Our Shop</h1>
        <p style={{ color: '#666' }}>Please access your account</p>
      </header>

      <main className="auth-card" style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '90%',
        maxWidth: '400px'
      }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: '2rem' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Catalog
        </Link>
      </footer>
    </div>
  );
};

export default AuthLayout;