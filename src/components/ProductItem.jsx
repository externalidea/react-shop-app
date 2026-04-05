import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useContext(ProductContext);

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;