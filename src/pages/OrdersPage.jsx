import React from 'react';

export default function OrdersPage({ orders, isAdmin, currentUserId }) {
  // Фильтруем заказы: админ видит все, пользователь только свои
  const displayOrders = isAdmin 
    ? orders 
    : orders.filter(order => order.user.id === currentUserId);

  if (displayOrders.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h2>Нет заказов</h2>
          <p>{isAdmin ? 'Пока нет заказов от клиентов' : 'Здесь будут отображаться ваши заказы'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ color: 'var(--dark-green)', marginBottom: '10px' }}>
        {isAdmin ? 'Все заказы' : 'Мои заказы'}
      </h2>
      {isAdmin && (
        <p style={{ color: 'var(--medium-green)', marginBottom: '20px', fontSize: '14px' }}>
          Всего заказов: {displayOrders.length}
        </p>
      )}
      
      {displayOrders.map((order, index) => (
        <div key={index} style={{
          background: 'var(--cream)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '15px',
          border: '2px solid var(--light-green)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--dark-green)' }}>
                Заказ #{displayOrders.length - index}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--medium-green)', marginTop: '5px' }}>
                {order.user.first_name} {order.user.last_name || ''}
                {order.user.username && ` (@${order.user.username})`}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--medium-green)' }}>
                {order.phone}
              </div>
            </div>
            <div style={{
              background: 'var(--gold)',
              color: 'var(--dark-green)',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              height: 'fit-content'
            }}>
              В обработке
            </div>
          </div>

          <div style={{ marginBottom: '10px', color: 'var(--medium-green)' }}>
            📍 {order.address}
          </div>

          {order.comment && (
            <div style={{ 
              marginBottom: '10px', 
              color: 'var(--medium-green)',
              fontSize: '14px',
              fontStyle: 'italic'
            }}>
              💬 {order.comment}
            </div>
          )}

          <div style={{ 
            borderTop: '1px solid var(--light-green)',
            paddingTop: '10px',
            marginTop: '10px'
          }}>
            {order.cart.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '5px',
                fontSize: '14px'
              }}>
                <span>{item.name} x{item.quantity}</span>
                <span style={{ fontWeight: '600' }}>{item.price * item.quantity} ₽</span>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '2px solid var(--gold)',
            paddingTop: '10px',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '700',
            fontSize: '18px'
          }}>
            <span style={{ color: 'var(--dark-green)' }}>Итого:</span>
            <span style={{ color: 'var(--gold)' }}>{order.total} ₽</span>
          </div>
        </div>
      ))}
    </div>
  );
}
