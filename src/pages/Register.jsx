import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ nickname: '', email: '', password: '', age: '' });
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError('Password too short');
    if (Number(form.age) < 18) return setError('Must be 18+');

    const status = register({ ...form, age: Number(form.age) });
    if (status === "Success") {
      navigate('/login');
    } else {
      setError(status);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Account</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister} className="form-group">
        <div>
          <input 
            placeholder="Nickname" 
            required 
            value={form.nickname}
            onChange={e => setForm({...form, nickname: e.target.value})} 
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>
        <div>
          <input 
            type="number" 
            placeholder="Age" 
            required 
            value={form.age}
            onChange={e => setForm({...form, age: e.target.value})} 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;