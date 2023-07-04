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
  country_id: number;
  phone: string;
  username: string;
  password:string;
  email: string;
};
type Countries = {
  country_id: number;
  country_name: string;
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
  //const [newStudent, setNewStudent] = useState({});
  const [countries, setCountries] = useState<Countries[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    student_id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    country_id: 0,
    phone: '',
    username: '',
    password: '',
    email: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewStudent({
      ...newStudent,
      [event.target.name]: event.target.value,
    });
  };
  
// pages/AdminPage.tsx
  const handleAddStudent = () => {
    const csrftoken = getCookie('csrftoken'); // Получаем CSRF токен
  
    axios.post('/api/data/addStudent/', newStudent, {
      headers: {
        'X-CSRFToken': csrftoken // Добавляем CSRF токен в заголовки запроса
      }
    })
    .then(response => {
      setRows([...rows, response.data]);
      setNewStudent({
        student_id: 0,
        first_name: '',
        last_name: '',
        birth_date: '',
        gender: '',
        country_id: 0,
        phone: '',
        username: '',
        password: '',
        email: '',
      });
    });
  };
  
  function getCookie(name: string): string | null {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  
  

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

  useEffect(() => {
    axios.get('/api/countries/')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('There was an!', error);
      });
  }, []);

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
        <button className="login-button" onClick={() => setShowForm(!showForm)}>Добавить нового студента</button>
        {showForm && (
        <div className="add-student-form">
        
        
        {/* <div > */}
          <button className="login-button" onClick={() => setShowForm(!showForm)}>
            Скрыть форму 
          </button>
          <h2>Добавить нового студента</h2>
          <input name="first_name" value={newStudent.first_name} onChange={handleInputChange} placeholder="Имя" />
          <input name="last_name" value={newStudent.last_name} onChange={handleInputChange} placeholder="Фамилия" />
          <input type="date" name="birth_date" value={newStudent.birth_date} onChange={handleInputChange} placeholder="День рождения" />
          <input name="gender" value={newStudent.gender} onChange={handleInputChange} placeholder="Пол" />
          <select name="country_id" value={newStudent.country_id} onChange={handleInputChange}>
          {countries.map(country => (
          <option key={country.country_id} value={country.country_id}>{country.country_name}</option>
            ))}
          </select>
          <input name="phone" value={newStudent.phone} onChange={handleInputChange} placeholder="Телефон" />
      <input name="email" value={newStudent.email} onChange={handleInputChange} placeholder="Email" />
      <button onClick={handleAddStudent}>Добавить студента</button>
        </div>
        )}
        {/* </div> */}
        
        <table>
          <thead>
          <tr>
            <th onClick={() => requestSort('first_name')}>Имя</th>
            <th onClick={() => requestSort('last_name')}>Фамилия</th>
            <th onClick={() => requestSort('birth_date')}>День рождения</th>
            <th onClick={() => requestSort('email')}>Email</th>
            <th onClick={() => requestSort('gender')}>Пол</th>
            <th onClick={() => requestSort('country_id')}>Страна</th>
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
                <td>{row.country_id}</td>
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
