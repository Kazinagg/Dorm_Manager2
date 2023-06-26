// pages/LoginPage.tsx
import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div>
      <h1>Страница входа</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}>
        <input type="text" placeholder="Логин" />
        <input type="password" placeholder="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
