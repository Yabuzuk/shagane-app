import React from 'react';

export default function Navigation({ currentPage, onPageChange, cartCount, isAdmin }) {
  return (
    <nav className="nav">
      <button 
        className={`nav-item ${currentPage === 'catalog' ? 'active' : ''}`}
        onClick={() => onPageChange('catalog')}
      >
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Каталог</span>
      </button>
      <button 
        className={`nav-item ${currentPage === 'cart' ? 'active' : ''}`}
        onClick={() => onPageChange('cart')}
      >
        <span className="nav-icon">
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </span>
        <span className="nav-label">Корзина</span>
      </button>
      <button 
        className={`nav-item ${currentPage === 'orders' ? 'active' : ''}`}
        onClick={() => onPageChange('orders')}
      >
        <span className="nav-icon">📦</span>
        <span className="nav-label">Заказы</span>
      </button>
      {isAdmin && (
        <button 
          className={`nav-item ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={() => onPageChange('admin')}
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Админ</span>
        </button>
      )}
    </nav>
  );
}
