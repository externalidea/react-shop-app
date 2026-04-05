import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(ProductContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(credentials.email, credentials.password)) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className="form-group">
        <input 
          type="email" 
          placeholder="Email" 
          required
          value={credentials.email}
          onChange={e => setCredentials({...credentials, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          value={credentials.password}
          onChange={e => setCredentials({...credentials, password: e.target.value})} 
        />
        <button type="submit">Enter</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;