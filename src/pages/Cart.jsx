import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart, updateQty } = useContext(ProductContext);
  // Calculating total price using reduce for efficiency
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="card">
      <h2>Shopping Cart 🛒</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: 'var(--secondary-color)' }}>${item.price} each</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQty(item.id, -1)} disabled={item.qty <= 1}>-</button>
                <span style={{ minWidth: '2rem', textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
                <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} style={{ marginLeft: '1rem', backgroundColor: '#dc2626' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'} onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--border-color)', textAlign: 'right' }}>
            <h3 style={{ color: 'var(--primary-color)' }}>Total: ${totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button style={{ marginTop: '1rem', width: '100%', backgroundColor: 'var(--primary-color)' }}>Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;