// LoginPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { type } from 'os';

interface LoginPageProps {
  onLogin: (type: boolean, id: number) => void;
}

type admins = {
  admin_id: number;
  username: string;
  password: string;
};

type user = {
  user_id: number;
  username: string;
  password: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user_id, setUser_id] = useState();
  // const [admin_id, setAdmin_id] = useState();
  const [RowsAdmins, setRowsAdmins] = useState<admins[]>([]);
  const [RowsUser, setRowsUser] = useState<user[]>([]);
  const navigate = useNavigate();
  // const [type, setType] = useState();

  useEffect(() => {
    axios.get('/api/auth/admin/')
      .then(response => {
        setRowsAdmins(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get('/api/auth/user/')
      .then(response => {
        setRowsUser(response.data);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const admin = RowsAdmins.find(row => row.username === username && row.password === password);
    const user = RowsUser.find(row => row.username === username && row.password === password);
    if (admin) {
      onLogin(true, admin.admin_id);
      navigate('/admin');
    }else if (user){
      onLogin(false, user.user_id);
      navigate('/user');
    }else {
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



