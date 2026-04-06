import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>Our Products</h1>
      <ProductList />
    </div>
  );
};

export default Home;