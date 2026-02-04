import React from 'react';
import { deliveryInfo } from '../data/mockData';

export default function CartPage({ cart, onUpdateQuantity, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= deliveryInfo.minOrder ? deliveryInfo.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ color: 'var(--dark-green)', marginBottom: '20px' }}>Ваша корзина</h2>
      
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-image">{item.icon}</div>
          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">{item.price} ₽</div>
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span style={{ fontWeight: '600' }}>{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <span style={{ marginLeft: 'auto', fontWeight: '700', color: 'var(--gold)' }}>
                {item.price * item.quantity} ₽
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="total-section">
        <div className="total-row">
          <span>Сумма заказа:</span>
          <span>{subtotal} ₽</span>
        </div>
        <div className="total-row">
          <span>Доставка:</span>
          <span>{deliveryFee > 0 ? `${deliveryFee} ₽` : 'Бесплатно'}</span>
        </div>
        {subtotal < deliveryInfo.minOrder && (
          <div style={{ fontSize: '12px', marginTop: '10px', color: 'var(--light-gold)' }}>
            Минимальная сумма заказа: {deliveryInfo.minOrder} ₽
          </div>
        )}
        <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--gold)' }} />
        <div className="total-row">
          <span style={{ fontSize: '18px' }}>Итого:</span>
          <span className="total-amount">{total} ₽</span>
        </div>
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '15px' }}
          onClick={onCheckout}
          disabled={subtotal < deliveryInfo.minOrder}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
