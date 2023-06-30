import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '1rem' }}>Страница входа</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input type="text" placeholder="Логин" style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <input type="password" placeholder="Пароль" style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <button type="submit" className="login-button">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;

