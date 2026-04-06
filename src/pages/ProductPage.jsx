import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ProductContext);
  const product = products.find(p => p.id === Number(id));

  if (!product) return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>Product not found</h2>
      <p>The product you're looking for doesn't exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );

  return (
    <div className="card">
      <button onClick={() => window.history.back()} style={{ marginBottom: '1rem', background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>← Back to Catalog</button>
      <h1>{product.name}</h1>
      <p style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>Category: {product.category}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '1rem' }}>${product.price}</p>
      <p style={{ lineHeight: '1.6' }}>{product.desc}</p>
      <button onClick={() => addToCart(product)} style={{ marginTop: '1.5rem' }}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;