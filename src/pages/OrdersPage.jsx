import React from 'react';

const ORDER_STATUSES = {
  new: { label: 'Новый', color: 'var(--gold)' },
  preparing: { label: 'Готовится', color: '#2196F3' },
  delivering: { label: 'В доставке', color: '#FF9800' },
  completed: { label: 'Выполнен', color: '#4CAF50' },
  cancelled: { label: 'Отменен', color: '#f44336' }
};

export default function OrdersPage({ orders, isAdmin, currentUserId, onUpdateStatus }) {
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
      
      {displayOrders.map((order, index) => {
        const actualIndex = orders.indexOf(order);
        const status = order.status || 'new';
        const statusInfo = ORDER_STATUSES[status];

        return (
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
                background: statusInfo.color,
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                height: 'fit-content'
              }}>
                {statusInfo.label}
              </div>
            </div>

            {isAdmin && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--medium-green)', 
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  Изменить статус:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {Object.entries(ORDER_STATUSES).map(([key, info]) => (
                    <button
                      key={key}
                      onClick={() => onUpdateStatus(actualIndex, key)}
                      style={{
                        padding: '6px 12px',
                        background: status === key ? info.color : 'white',
                        color: status === key ? 'white' : info.color,
                        border: `2px solid ${info.color}`,
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {info.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
        );
      })}
    </div>
  );
}
