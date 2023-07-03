// pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

type Student = {
  student_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_name: string;
  phone: string;
  username: string;
  password:string;
  email: string;
};

type SortConfig = {
  key: keyof Student;
  direction: 'ascending' | 'descending';
};

interface AdminPageProps {
  onLogout: () => void;
};

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'first_name', direction: 'ascending' });
  const [rows, setRows] = useState<Student[]>([]);
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState<Student>({
    student_id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    country_name: '',
    phone: '',
    username: '',
    password: '',
    email: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddStudent = () => {
    axios.post('/api/data/addStudent/', newStudent)
      .then(response => {
        setRows([...rows, response.data]);
        setNewStudent({
          student_id: 0,
          first_name: '',
          last_name: '',
          birth_date: '',
          gender: '',
          country_name: '',
          phone: '',
          username: '',
          password: '',
          email: '',
        });
      });
  };

  useEffect(() => {
    axios.get('/api/data/ollStudent/')
      .then(response => {
        setRows(response.data);
        console.log("response.data");
        console.log(response.data);
      });
  }, []);

  useEffect(() => {
    const sortArray = (type: keyof Student) => {
      const sorted = [...rows].sort((a, b) => {
        if (typeof a[type] === 'number' && typeof b[type] === 'number') {
          return (a[type] as number) - (b[type] as number);
        }
        if (typeof a[type] === 'string' && typeof b[type] === 'string') {
          return (a[type] as string).localeCompare(b[type] as string);
        }
        return 0;
      });
      if (sortConfig.direction === 'descending') sorted.reverse();
      return sorted;
    };
    if (sortConfig.key) {
      const sortedData = sortArray(sortConfig.key);
      setRows(sortedData);
    }
  }, [sortConfig]);

  const requestSort = (key: keyof Student) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const buttonOnLogout = () => {
    onLogout();
    navigate('/');
  }

  return (
    <div>
      {/* <h1>Страница администратора</h1> */}
      <div>
      <div className="Login-div">
        <button className="login-button" onClick={buttonOnLogout}>Logout</button>
      </div>
      <div className="home-page">
        <h1 className="home-page__title">Страница администратора</h1>
        <p className="home-page__info">
          Жители этого общажного ада.
        </p>
        <button className="login-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Скрыть форму' : 'Добавить нового студента'}
        </button>
        {showForm && (
        <div className="add-student-form">
          <h2>Добавить нового студента</h2>
          <input name="first_name" value={newStudent.first_name} onChange={handleInputChange} placeholder="Имя" />
          <input name="last_name" value={newStudent.last_name} onChange={handleInputChange} placeholder="Фамилия" />
          <input name="birth_date" value={newStudent.birth_date} onChange={handleInputChange} placeholder="День рождения" />
          <input name="gender" value={newStudent.gender} onChange={handleInputChange} placeholder="Пол" />
          <input name="country_name" value={newStudent.country_name} onChange={handleInputChange} placeholder="Страна" />
          <input name="phone" value={newStudent.phone} onChange={handleInputChange} placeholder="Телефон" />
          <input name="username" value={newStudent.username} onChange={handleInputChange} placeholder="Логин" />
          <input name="password" value={newStudent.password} onChange={handleInputChange} placeholder="Пароль" />
          <input name="email" value={newStudent.email} onChange={handleInputChange} placeholder="Email" />
          <button onClick={handleAddStudent}>Добавить студента</button>
        </div>
        )}
        <table>
          <thead>
          <tr>
            <th onClick={() => requestSort('first_name')}>Имя</th>
            <th onClick={() => requestSort('last_name')}>Фамилия</th>
            <th onClick={() => requestSort('birth_date')}>День рождения</th>
            <th onClick={() => requestSort('email')}>Email</th>
            <th onClick={() => requestSort('gender')}>Пол</th>
            <th onClick={() => requestSort('country_name')}>Страна</th>
            <th onClick={() => requestSort('username')}>Логин</th>
            <th onClick={() => requestSort('password')}>Пароль</th>
            <th onClick={() => requestSort('phone')}>Phone</th>
          </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.birth_date}</td>
                <td>{row.email}</td>
                <td>{row.gender}</td>
                <td>{row.country_name}</td>
                <td>{row.username}</td>
                <td>{row.password}</td>
                <td>{row.phone}</td>
                <td>изменить "вьеди кнопку"</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminPage;
