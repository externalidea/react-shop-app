import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shop_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'High-End Laptop', price: 1200, category: 'Electronics', desc: 'Powerful laptop for developers' },
      { id: 2, name: 'Smartphone Pro', price: 800, category: 'Electronics', desc: 'Amazing camera and performance' },
      { id: 3, name: 'Wireless Headphones', price: 150, category: 'Audio', desc: 'High-quality sound with noise cancellation' },
      { id: 4, name: 'Gaming Mouse', price: 50, category: 'Accessories', desc: 'Ergonomic design for long gaming sessions' },
      { id: 5, name: 'Mechanical Keyboard', price: 100, category: 'Accessories', desc: 'RGB backlit with tactile switches' },
      { id: 6, name: 'Smart Watch', price: 250, category: 'Wearables', desc: 'Fitness tracking and notifications' },
      { id: 7, name: 'Tablet', price: 400, category: 'Electronics', desc: 'Portable device for work and entertainment' },
      { id: 8, name: 'Bluetooth Speaker', price: 80, category: 'Audio', desc: 'Portable speaker with great bass' },
      { id: 9, name: 'Webcam', price: 60, category: 'Accessories', desc: 'HD webcam for video calls' }
    ];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('shop_users');
    return saved ? JSON.parse(saved) : [{ email: 'admin@shop.com', password: 'admin123', isAdmin: true }];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('shop_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('shop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shop_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('shop_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  // Auth functions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const exists = users.find(u => u.email === userData.email);
    if (exists) return "User already exists";
    setUsers([...users, { ...userData, isAdmin: false }]);
    return "Success";
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // КОРЗИНА: Добавление с учетом количества
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  // АДМИНКА: CRUD
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
  
  const updateProduct = (id, updatedData) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const addProduct = (productData) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...productData, id: newId }]);
  };

  return (
    <ProductContext.Provider value={{ 
      products, setProducts, deleteProduct, updateProduct, addProduct,
      cart, setCart, addToCart, updateQty,
      users, currentUser, login, register, logout
    }}>
      {children}
    </ProductContext.Provider>
  );
};