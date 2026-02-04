import React, { useState } from 'react';

export default function AdminPage({ products, onAddProduct, onDeleteProduct }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    icon: '🍰',
    description: '',
    weight: ''
  });

  const icons = ['🎂', '🥐', '🍪', '🍰', '🍮', '🥖', '🧁', '🍩', '🥧', '🍫', '🍬', '🍭'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      icon: formData.icon,
      description: formData.description,
      weight: formData.weight
    });
    setFormData({ name: '', price: '', icon: '🍰', description: '', weight: '' });
    setShowForm(false);
  };

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: 'var(--dark-green)' }}>Управление товарами</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Отмена' : '+ Добавить товар'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: 'var(--cream)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid var(--light-green)'
        }}>
          <div className="form-group">
            <label className="form-label">Название товара</label>
            <input 
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Цена (₽)</label>
            <input 
              type="number"
              className="form-input"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Вес/Количество</label>
            <input 
              type="text"
              className="form-input"
              placeholder="например: 1 кг, 6 шт"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Описание</label>
            <textarea 
              className="form-input"
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Иконка</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(6, 1fr)', 
              gap: '10px',
              marginTop: '10px'
            }}>
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({...formData, icon})}
                  style={{
                    fontSize: '32px',
                    padding: '10px',
                    border: formData.icon === icon ? '3px solid var(--gold)' : '2px solid var(--light-green)',
                    borderRadius: '8px',
                    background: formData.icon === icon ? 'var(--light-gold)' : 'white',
                    cursor: 'pointer'
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Добавить товар
          </button>
        </form>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3 style={{ color: 'var(--dark-green)', marginBottom: '15px' }}>
          Товары ({products.length})
        </h3>
        {products.map(product => (
          <div key={product.id} style={{
            background: 'var(--cream)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '10px',
            border: '2px solid var(--light-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              fontSize: '40px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '8px'
            }}>
              {product.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: 'var(--dark-green)' }}>
                {product.name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--medium-green)' }}>
                {product.weight} • {product.description}
              </div>
              <div style={{ color: 'var(--gold)', fontWeight: '700', marginTop: '5px' }}>
                {product.price} ₽
              </div>
            </div>
            <button
              onClick={() => onDeleteProduct(product.id)}
              style={{
                padding: '8px 16px',
                background: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
