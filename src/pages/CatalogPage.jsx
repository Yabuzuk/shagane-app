import React from 'react';
import { mockProducts } from '../data/mockData';

export default function CatalogPage({ products, onAddToCart }) {
  return (
    <div className="container">
      <h2 style={{ color: 'var(--dark-green)', marginBottom: '10px' }}>Наши десерты</h2>
      <p style={{ color: 'var(--medium-green)', marginBottom: '20px' }}>
        Свежая выпечка каждый день
      </p>
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.icon}
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--medium-green)', marginBottom: '8px' }}>
                {product.weight}
              </div>
              <div className="product-price">{product.price} ₽</div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '10px', padding: '8px' }}
                onClick={() => onAddToCart(product)}
              >
                В корзину
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
