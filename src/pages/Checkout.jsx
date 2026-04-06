import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, setCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    // Simple checkout simulation - in real app, this would send data to server
    alert('Order placed successfully!');
    setCart([]);
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p>Add some products to proceed to checkout.</p>
        <button onClick={() => navigate('/')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Checkout</h2>
      <div>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <span>{item.name} x{item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', textAlign: 'right', fontSize: '1.2rem', fontWeight: '600' }}>
        Total: ${totalPrice.toFixed(2)}
      </div>
      <button onClick={handleCheckout} style={{ marginTop: '1.5rem', width: '100%' }}>Place Order</button>
    </div>
  );
};

export default Checkout;