import React, { useState, useEffect, ChangeEvent } from 'react';
import './UserPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  // username: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_name: string;
  phone: string;
  username: string;
  password: string;
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
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/users/get/${userId}`)
      .then(response => {
        setUser(response.data)
        console.log(response);
      });
    
  }, [userId]);

  // const handleEdit = (newData: Partial<User>) => {
  //   axios.put(`/api/users/${userId}`, newData, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => setUser(response.data));
  // };

  const handleChangePassword = () => {
    axios.post(`/api/users/${userId}/change-password`, { password: newPassword }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // const handleDelete = () => {
  //   axios.delete(`/api/users/${userId}`)
  //     .then(() => onLogout());
  // };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-page">
     <h1>Welcome, {user ? `${user.first_name} ${user.last_name}` : 'Загрузка...'}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Birth Date: {user.birth_date}</p>
      <p>Gender: {user.gender}</p>
      <p>Country: {user.country_name}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={handleLogout}>Logout</button>
      <input
        type="password"
        value={newPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default UserPage;


