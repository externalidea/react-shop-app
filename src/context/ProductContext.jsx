import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('shop_users')) || []);
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'High-End Laptop', price: 1200, category: 'Tech' },
    { id: 2, name: 'Smartphone Pro', price: 800, category: 'Tech' },
    { id: 3, name: 'Wireless Headphones', price: 150, category: 'Audio' }
  ]);

  useEffect(() => {
    localStorage.setItem('shop_users', JSON.stringify(users));
  }, [users]);

  const register = (newUser) => {
    if (users.find(u => u.email === newUser.email)) return "User exists";
    setUsers([...users, newUser]);
    return "Success";
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, instanceId: Date.now() }]);
  };

  return (
    <ProductContext.Provider value={{ 
      products, setProducts, users, currentUser, 
      cart, register, login, addToCart, setCart 
    }}>
      {children}
    </ProductContext.Provider>
  );
};