import React, { useState } from 'react';

export default function AdminPage({ products, onAddProduct, onDeleteProduct }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    weight: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Создаем canvas для сжатия
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Устанавливаем максимальный размер 300x300
        const maxSize = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Конвертируем в WebP
        canvas.toBlob((blob) => {
          const webpReader = new FileReader();
          webpReader.onloadend = () => {
            const base64 = webpReader.result;
            setFormData({...formData, image: base64});
            setImagePreview(base64);
          };
          webpReader.readAsDataURL(blob);
        }, 'image/webp', 0.8);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
      weight: formData.weight
    });
    setFormData({ name: '', price: '', image: '', description: '', weight: '' });
    setImagePreview(null);
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
            <label className="form-label">Изображение товара</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="image-upload"
            />
            <label 
              htmlFor="image-upload"
              className="btn btn-secondary"
              style={{ width: '100%', cursor: 'pointer', display: 'block', textAlign: 'center' }}
            >
              📎 Прикрепить изображение
            </label>
            {imagePreview && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '200px',
                    borderRadius: '8px',
                    border: '2px solid var(--light-green)'
                  }} 
                />
              </div>
            )}
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
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '40px' }}>{product.icon}</span>
              )}
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
