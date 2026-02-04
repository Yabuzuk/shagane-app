import React, { useEffect } from 'react';

export default function LoginPage({ onLogin }) {
  useEffect(() => {
    window.onTelegramAuth = (user) => {
      onLogin(user);
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'shagane_delivery_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    const container = document.getElementById('telegram-login-container');
    if (container) {
      container.appendChild(script);
    }

    return () => {
      window.onTelegramAuth = null;
    };
  }, [onLogin]);

  return (
    <div className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{
        background: 'var(--cream)',
        padding: '40px',
        borderRadius: '16px',
        border: '2px solid var(--light-green)',
        textAlign: 'center',
        maxWidth: '350px'
      }}>
        <div style={{ 
          fontSize: '64px', 
          marginBottom: '20px' 
        }}>
          🔐
        </div>
        <h2 style={{ 
          color: 'var(--dark-green)', 
          marginBottom: '10px' 
        }}>
          Вход в приложение
        </h2>
        <p style={{ 
          color: 'var(--medium-green)', 
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Войдите через Telegram для оформления заказов
        </p>
        
        <div id="telegram-login-container" style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}></div>

        <div style={{
          fontSize: '12px',
          color: 'var(--medium-green)',
          marginTop: '20px',
          padding: '15px',
          background: 'white',
          borderRadius: '8px'
        }}>
          ℹ️ Для работы виджета нужно создать Telegram бота через @BotFather
        </div>
      </div>
    </div>
  );
}
