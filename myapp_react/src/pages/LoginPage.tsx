// LoginPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

type admins = {
  admin_id: number;
  username: string;
  password: string;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState<admins[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/auth/')
      .then(response => {
        setRows(response.data);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const admin = rows.find(row => row.username === username && row.password === password);
    if (admin) {
      onLogin(username, password);
      navigate('/admin');
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '1rem' }}>Страница входа</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <button type="submit" className="login-button">Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;



