import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('shop_users');
    if (!saved || saved === "undefined") return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'High-End Laptop', price: 1200, category: 'Tech' },
    { id: 2, name: 'Smartphone Pro', price: 800, category: 'Tech' },
    { id: 3, name: 'Wireless Headphones', price: 150, category: 'Audio' }
  ]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, instanceId: Date.now() }]);
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (newUser) => {
    if (users.find(u => u.email === newUser.email)) return "User exists";
    setUsers([...users, newUser]);
    return "Success";
  };

  return (
    <ProductContext.Provider value={{ 
      products, setProducts, users, currentUser, 
      cart, setCart, addToCart, login, register 
    }}>
      {children}
    </ProductContext.Provider>
  );
};