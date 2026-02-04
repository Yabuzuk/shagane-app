import React from 'react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          ×
        </button>

        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '16px 16px 0 0'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '250px',
            background: 'linear-gradient(135deg, var(--light-green) 0%, var(--medium-green) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            borderRadius: '16px 16px 0 0'
          }}>
            {product.icon}
          </div>
        )}

        <div style={{ padding: '20px' }}>
          <h2 style={{ 
            color: 'var(--dark-green)', 
            marginBottom: '10px',
            fontSize: '24px'
          }}>
            {product.name}
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <div style={{ 
              color: 'var(--gold)', 
              fontSize: '28px', 
              fontWeight: '700' 
            }}>
              {product.price} ₽
            </div>
            <div style={{ 
              color: 'var(--medium-green)', 
              fontSize: '14px' 
            }}>
              {product.weight}
            </div>
          </div>

          {product.description && (
            <div style={{
              color: 'var(--text-dark)',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px',
              padding: '15px',
              background: 'var(--cream)',
              borderRadius: '8px'
            }}>
              {product.description}
            </div>
          )}

          <button 
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px' }}
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}
