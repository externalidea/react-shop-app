import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products } = useContext(ProductContext);

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>No products found.</h3>
        <p>Check back later or add some in Admin panel.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;