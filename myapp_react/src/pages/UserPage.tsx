import React, { useState, useEffect, ChangeEvent } from 'react';
import './UserPage.css';
import axios from 'axios';

interface User {
  id: number;
  // username: string;
  first_name: string;
  last_name: string;
  email: string;
  // Добавьте здесь другие поля, которые вы хотите отобразить
}

interface UserPageProps {
  userId: number;
  onLogout: () => void;
}

const UserPage: React.FC<UserPageProps> = ({ userId, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(response => setUser(response.data));
  }, [userId]);

  const handleEdit = (newData: Partial<User>) => {
    axios.put(`/api/users/${userId}`, newData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => setUser(response.data));
  };

  const handleChangePassword = () => {
    axios.post(`/api/users/${userId}/change-password`, { password: newPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/users/${userId}`)
      .then(() => onLogout());
  };

  const handleLogout = () => {
    axios.post(`/api/logout`)
      .then(() => onLogout());
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="user-page">
        <h1>Welcome, {user ? `${user.first_name} ${user.last_name}` : 'Загрузка...'}</h1>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDelete}>Delete Account</button>
        <input
          type="password"
          value={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default UserPage;


