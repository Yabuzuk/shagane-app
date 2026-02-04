import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import ProductModal from '../components/ProductModal';

export default function CatalogPage({ products, onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container">
      <h2 style={{ color: 'var(--dark-green)', marginBottom: '10px' }}>Наши десерты</h2>
      <p style={{ color: 'var(--medium-green)', marginBottom: '20px' }}>
        Свежая выпечка каждый день
      </p>
      
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                product.icon
              )}
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--medium-green)', marginBottom: '8px' }}>
                {product.weight}
              </div>
              <div className="product-price">{product.price} ₽</div>
            </div>
          </div>
        ))}
      </div>

      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
