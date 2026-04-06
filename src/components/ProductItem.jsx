import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductItem = ({ product }) => {
  const { addToCart } = useContext(ProductContext);

  return (
    <div className="card">
      <h3>
        <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {product.name}
        </Link>
      </h3>
      <p>Category: {product.category}</p>
      <p style={{ fontWeight: '600', fontSize: '1.1rem', color: 'var(--primary-color)' }}>
        ${product.price}
      </p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;