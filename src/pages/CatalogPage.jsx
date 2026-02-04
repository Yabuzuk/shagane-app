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
          <div key={product.id} className="product-card">
            <div onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  product.icon
                )}
              </div>
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--medium-green)', marginBottom: 'auto' }}>
                {product.weight}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <div className="product-price">{product.price} ₽</div>
                <button
                  className="btn btn-primary"
                  style={{
                    width: '36px',
                    height: '36px',
                    padding: '0',
                    borderRadius: '50%',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  +
                </button>
              </div>
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
