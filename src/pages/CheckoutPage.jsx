import React, { useState } from 'react';
import { deliveryInfo } from '../data/mockData';

export default function CheckoutPage({ cart, onOrderComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryInfo.deliveryFee;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    onOrderComplete({ ...formData, cart, total });
  };

  return (
    <div className="container">
      <h2 style={{ color: 'var(--dark-green)', marginBottom: '20px' }}>Оформление заказа</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Имя</label>
          <input 
            type="text" 
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Телефон</label>
          <input 
            type="tel" 
            className="form-input"
            placeholder="+7 (___) ___-__-__"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Адрес доставки</label>
          <input 
            type="text" 
            className="form-input"
            placeholder="Улица, дом, квартира"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Комментарий к заказу</label>
          <textarea 
            className="form-input"
            rows="3"
            placeholder="Пожелания к заказу..."
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
          />
        </div>

        <div style={{ 
          background: 'var(--cream)', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px',
          border: '2px solid var(--light-green)'
        }}>
          <div style={{ color: 'var(--medium-green)', marginBottom: '10px' }}>
            ⏱️ Время доставки: {deliveryInfo.deliveryTime}
          </div>
          <div style={{ color: 'var(--medium-green)' }}>
            📍 Город: {deliveryInfo.city}
          </div>
        </div>

        <div className="total-section">
          <div className="total-row">
            <span>Сумма заказа:</span>
            <span>{subtotal} ₽</span>
          </div>
          <div className="total-row">
            <span>Доставка:</span>
            <span>{deliveryFee} ₽</span>
          </div>
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid var(--gold)' }} />
          <div className="total-row">
            <span style={{ fontSize: '18px' }}>Итого:</span>
            <span className="total-amount">{total} ₽</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
}
