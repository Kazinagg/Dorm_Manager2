import React, { useState, useEffect, ChangeEvent } from 'react';
import './UserPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Divider, Form, Input, Select, Typography } from 'antd';

type User = {
  student_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_name: string;
  country_id: number;
  phone: string;
  username: string;
  password:string;
  email: string;
  avatar: string;
};

type Countries = {
  country_id: number;
  country_name: string;
};

interface UserPageProps {
  userId: number;
  onLogout: () => void;
}

interface SelectProps<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  // другие свойства
}

const UserPage: React.FC<UserPageProps> = ({ userId, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Countries[]>([]);

  useEffect(() => {
    axios.get(`/api/users/get/${userId}`)
      .then(response => {
        setUser(response.data)
        console.log(response);
      });
    
  }, [userId]);

  useEffect(() => {
    axios.get('/api/countries/')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('There was an!', error);
      });
  }, []);

  // const handleChangePassword = () => {
  //   axios.post(`/api/users/${userId}/change-password`, { password: newPassword }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleEdit = () => { 
    setEditMode(true); 
  };

  const handleSave = () => { 
    console.log(user);
    axios.post(`/api/users/`, user, { 
      headers: { 'Content-Type': 'application/json', }, 
    }); 
    setEditMode(false); 
  };

  const handleCancel = () => { 
    setEditMode(false); 
    setNewPassword(''); 
    axios.get(`/api/users/get/${userId}`) .then(response => { 
      setUser(response.data) 
      console.log(response); 
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser!, [name]: value }));
  };
  
  // const handleSelectChange = (value: string) => {
  //   setUser((prevUser) => ({ ...prevUser!, gender: value }));
  // };
  // const handleSelectChange1 = (value:{ value: number, label: string }, name: string) => {
  //   setUser((prevUser) => ({ ...prevUser!, [name]: value.value }));
  // };
  const handleSelectChange1 = (value: number, name: string) => {
    setUser((prevUser) => ({ ...prevUser!, [name]: value }));
  };
  const handleSelectChange2 = (value: string, name: string) => {
    setUser((prevUser) => ({ ...prevUser!, [name]: value }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className="user-page">
      <Card className="user-card">
        <div className="user-avatar">
          <Avatar size={128} src={user.avatar} />
        </div>
        <div className="user-info">
          <Typography.Title level={3}>
            {user.first_name} {user.last_name}
          </Typography.Title>
          <Typography.Paragraph>
            Username: {user.username}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Email: {user.email}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Birth date: {user.birth_date}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Gender: {user.gender}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Country: {user.country_name}
          </Typography.Paragraph>
          <Typography.Paragraph>
            Phone: {user.phone}
          </Typography.Paragraph>
          {editMode ? (
            <Form layout="vertical">
              <Form.Item label="New password">
                <Input.Password
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="First name">
                <Input
                  name="first_name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Last name">
                <Input
                  name="last_name"
                  value={user.last_name}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Birth date">
                <Input
                  name="birth_date"
                  value={user.birth_date}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Gender">
                <Select
                  // name="gender"
                  value={user.gender}
                  onChange={(value) => handleSelectChange2(value, 'gender')}
                >
                  <Select.Option value="М">Male</Select.Option>
                  <Select.Option value="Ж">Female</Select.Option>
                  {/* <Select.Option value="other">Other</Select.Option> */}
                </Select>
              </Form.Item>
              <Form.Item label="Country">
                <Select
                  value={user.country_id}
                  // {console.log(user.country_id)}
                  onChange={(value) => handleSelectChange1(value, 'country_id')}
                >
                  {countries.map(country => (
                    <Select.Option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Phone">

                <Input
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </Form.Item>
              <Button type="primary" onClick={handleSave}>
                Save changes
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form>
          ) : (
            <>
              <Button type="primary" onClick={handleEdit}>
                Edit profile
              </Button>
              {/* <Button onClick={handleChangePassword}>Change password</Button> */}
            </>
          )}
          <Divider />
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
    </div>
  );
};

export default UserPage;


