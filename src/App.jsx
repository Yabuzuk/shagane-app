import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import UserProfile from './components/UserProfile';
import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import { mockProducts } from './data/mockData';
import './styles/App.css';

const ADMIN_IDS = [407457753];

export default function App() {
  const [currentPage, setCurrentPage] = useState('catalog');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(mockProducts);

  const isAdmin = user && ADMIN_IDS.includes(user.id);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('telegramUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('telegramUser');
    setCart([]);
    setCurrentPage('catalog');
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setCart(cart.filter(item => item.id !== id));
  };

  React.useEffect(() => {
    const savedUser = localStorage.getItem('telegramUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Войдите через Telegram для оформления заказа');
      return;
    }
    setCurrentPage('checkout');
  };

  const handleOrderComplete = (orderData) => {
    setOrders([...orders, { ...orderData, user }]);
    setCart([]);
    setCurrentPage('orders');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    return (
      <div className="app">
        <Header />
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <UserProfile user={user} onLogout={handleLogout} isAdmin={isAdmin} />
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        cartCount={cartCount}
        isAdmin={isAdmin}
      />
      
      {currentPage === 'catalog' && (
        <CatalogPage products={products} onAddToCart={handleAddToCart} />
      )}
      
      {currentPage === 'cart' && (
        <CartPage 
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      )}
      
      {currentPage === 'checkout' && (
        <CheckoutPage 
          cart={cart}
          onOrderComplete={handleOrderComplete}
        />
      )}
      
      {currentPage === 'orders' && (
        <OrdersPage orders={orders} isAdmin={isAdmin} currentUserId={user?.id} />
      )}

      {currentPage === 'admin' && isAdmin && (
        <AdminPage 
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}
