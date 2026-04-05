import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Cart = () => {
  const { cart, setCart } = useContext(ProductContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (instanceId) => {
    setCart(cart.filter(item => item.instanceId !== instanceId));
  };

  return (
    <div className="card">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.instanceId} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem 0', 
                borderBottom: '1px solid #eee' 
              }}>
                <span>{item.name} - ${item.price}</span>
                <button 
                  onClick={() => removeItem(item.instanceId)}
                  style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '0.3rem 0.6rem', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', borderTop: '2px solid #333', paddingTop: '1rem' }}>
            <h3>Total: ${totalPrice}</h3>
            <button style={{ backgroundColor: '#28a745', color: 'white', width: '100%', padding: '1rem', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;