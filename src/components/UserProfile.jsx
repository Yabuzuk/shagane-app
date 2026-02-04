import React from 'react';

export default function UserProfile({ user, onLogout, isAdmin }) {
  return (
    <div style={{
      background: 'var(--cream)',
      padding: '15px',
      margin: '20px',
      borderRadius: '12px',
      border: '2px solid var(--light-green)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      {user.photo_url ? (
        <img 
          src={user.photo_url} 
          alt={user.first_name}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid var(--gold)'
          }}
        />
      ) : (
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: 'var(--dark-green)',
          fontWeight: '700'
        }}>
          {user.first_name?.[0] || '👤'}
        </div>
      )}
      
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontWeight: '600', 
          color: 'var(--dark-green)',
          marginBottom: '3px'
        }}>
          {user.first_name} {user.last_name || ''}
          {isAdmin && (
            <span style={{
              marginLeft: '8px',
              background: 'var(--gold)',
              color: 'var(--dark-green)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: '700'
            }}>
              АДМИН
            </span>
          )}
        </div>
        {user.username && (
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--medium-green)' 
          }}>
            @{user.username}
          </div>
        )}
      </div>

      <button 
        onClick={onLogout}
        style={{
          padding: '8px 16px',
          background: 'var(--medium-green)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Выйти
      </button>
    </div>
  );
}
