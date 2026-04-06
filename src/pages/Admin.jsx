import { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, currentUser, logout } = useContext(ProductContext);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', desc: '' });
  const [errors, setErrors] = useState({});

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.price || isNaN(form.price) || form.price <= 0) newErrors.price = 'Valid price is required';
    if (!form.category.trim()) newErrors.category = 'Category is required';
    if (!form.desc.trim()) newErrors.desc = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editing) {
      updateProduct(editing, { ...form, price: Number(form.price) });
      setEditing(null);
    } else {
      addProduct({ ...form, price: Number(form.price) });
    }
    setForm({ name: '', price: '', category: '', desc: '' });
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({ name: product.name, price: product.price, category: product.category, desc: product.desc });
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: '', price: '', category: '', desc: '' });
    setErrors({});
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Panel</h1>
        <button onClick={logout} style={{ backgroundColor: '#dc3545' }}>Logout</button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2>{editing ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <div>
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows="3"
            />
            {errors.desc && <span className="error">{errors.desc}</span>}
          </div>
          <div>
            <button type="submit">{editing ? 'Update' : 'Add'} Product</button>
            {editing && <button type="button" onClick={handleCancel} style={{ marginLeft: '1rem', backgroundColor: 'var(--secondary-color)' }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Product List</h2>
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          <div className="grid">
            {products.map(product => (
              <div key={product.id} className="card" style={{ margin: 0 }}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>{product.desc}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)} style={{ backgroundColor: '#dc2626' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'} onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;