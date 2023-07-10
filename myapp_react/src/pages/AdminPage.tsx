// pages/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

type Student = {
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
  // const [student, setStudent] = useState<Student>(selectedStudent);
  const [rows, setRows] = useState<Student[]>([]);
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  //const [newStudent, setNewStudent] = useState({});
  const [countries, setCountries] = useState<Countries[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    student_id: 0,
    first_name: '',
    last_name: '',
    birth_date: '',
    gender: '',
    country_id: 0,
    country_name: '',
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
    // Добавляем нового студента в состояние rows
    // setRows([...rows, response.data]);
    setShowForm(!showForm)
    setNewStudent({
      student_id: 0,
      first_name: '',
      last_name: '',
      birth_date: '',
      gender: '',
      country_id: 0,
      country_name: '',
      phone: '',
      username: '',
      password: '',
      email: '',
    });
  });
};


  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
      // добавьте здесь другие поля, по которым вы хотите фильтровать
  );
    
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

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseEditForm = () => {
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (studentId: number) => {

    axios.post('/api/data/deleteStudent/' + studentId + '/')
        .then(res => {
            console.log(res.data);
            // Обновляем состояние rows, удаляя студента с указанным ID
            setRows(rows.filter(student => student.student_id !== studentId));
            setSelectedStudent(null);
        })
        .catch(error => console.error(error));
  };

  const handleUpdateStudent = (student: Student) => {
      axios.post('/api/data/updateStudent/' + student.student_id + '/', student)
          .then(response => {
              console.log(response.data);
              // Обновляем состояние rows, заменяя обновленного студента
              setRows(rows.map(row => row.student_id === student.student_id ? student : row));
          })
          .catch(error => {
            console.error(error);
          });
  };
  // const [student, setStudent] = useState<Student | null>(selectedStudent);

  return (
    <div>
    <div className="Login-div">
      <button className="btn" onClick={buttonOnLogout}>Logout</button>
    </div>
    <div className="home-page">
      <h1 className="home-page__title">Страница администратора</h1>
      <p className="home-page__info">
        Жители этого общажного ада.
      </p>
      <button className="btn" onClick={() => setShowForm(!showForm)}>Добавить нового студента</button>
      {showForm && (
      <div className="add-student-form">
        <button className="btn close-btn" onClick={() => setShowForm(!showForm)}>
          X
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
      {/* <button onClick={handleAddStudent}>Добавить студента</button> */}
      <button className="btn" onClick={handleAddStudent}>Добавить студента</button>
      </div>
      )}
        {/* </div> */}
        <input
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
                padding: "12px 20px",
                margin: "8px 0",
                boxSizing: "border-box",
                border: "2px solid #ccc",
                borderRadius: "4px"
            }}
        />
        <table>
          <thead>
          <tr>
            <th onClick={() => requestSort('first_name')}>Имя</th>
            <th onClick={() => requestSort('last_name')}>Фамилия</th>
            {/* <th onClick={() => requestSort('birth_date')}>День рождения</th> */}
            <th onClick={() => requestSort('email')}>Email</th>
            <th onClick={() => requestSort('gender')}>Пол</th>
            <th onClick={() => requestSort('country_name')}>Страна</th>
            {/* <th onClick={() => requestSort('username')}>Логин</th> */}
            {/* <th onClick={() => requestSort('password')}>Пароль</th> */}
            <th onClick={() => requestSort('phone')}>Phone</th>
          </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                {/* <td>{row.birth_date}</td> */}
                <td>{row.email}</td>
                <td>{row.gender}</td>
                <td>{row.country_name}</td>
                {/* <td>{row.username}</td> */}
                {/* <td>{row.password}</td> */}
                <td>{row.phone}</td>
                <td>
                  <button className="btn" onClick={() => handleSelectStudent(row)}>Показать</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {selectedStudent && (
      <div className="student-info">
        <h2>Информация о студенте</h2>

        <div className="student-update">
        <label>
          Имя:
          <input type="text" value={selectedStudent.first_name} onChange={e => setSelectedStudent({...selectedStudent, first_name: e.target.value})} />
        </label>
        <label>
          Фамилия:
          <input type="text" value={selectedStudent.last_name} onChange={e => setSelectedStudent({...selectedStudent, last_name: e.target.value})} />
        </label>
        <label>
          Email:
          <input type="email" value={selectedStudent.email} onChange={e => setSelectedStudent({...selectedStudent, email: e.target.value})} />
        </label>
        <label>
          Пол:
          <select value={selectedStudent.gender} onChange={e => setSelectedStudent({...selectedStudent, gender: e.target.value})}>
            <option value="M">Мужской</option>
            <option value="F">Женский</option>
          </select>
        </label>
        <label>
          Страна:
          <input type="text" value={selectedStudent.country_name} onChange={e => setSelectedStudent({...selectedStudent, country_name: e.target.value})} />
        </label>
        <label>
          Телефон:
          <input type="tel" value={selectedStudent.phone} onChange={e => setSelectedStudent({...selectedStudent, phone: e.target.value})} />
        </label>
        <label>
          Дата рождения:
          <input type="date" value={selectedStudent.birth_date} onChange={e => setSelectedStudent({...selectedStudent, birth_date: e.target.value})} />
        </label>
        <label>
          Имя пользователя:
          <input type="text" value={selectedStudent.username} onChange={e => setSelectedStudent({...selectedStudent, username: e.target.value})} />
        </label>
        <label>
          Пароль:
          <input type="password" value={selectedStudent.password} onChange={e => setSelectedStudent({...selectedStudent, password: e.target.value})} />
        </label>
        </div>
        
        <div>
          <button className="btn" onClick={() => handleDeleteStudent(selectedStudent.student_id)}>Удалить</button>
          <button className="btn" onClick={() => handleUpdateStudent(selectedStudent)}>Изменить</button>
          <button className="btn" onClick={() => handleCloseEditForm()}>Закрыть</button>
        </div>

      </div>
    )}
    </div>
  </div>
  );
};

export default AdminPage;
