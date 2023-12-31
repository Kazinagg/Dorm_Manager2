import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StudentsPage.css';


type Student = {
  student_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_name: number;
  // phone: string;
  // email: string;
};

type SortConfig = {
  key: keyof Student;
  direction: 'ascending' | 'descending';
};

const StudentsPage: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'first_name', direction: 'ascending' });
  const [rows, setRows] = useState<Student[]>([]);

  useEffect(() => {
    axios.get('/api/data/')
      .then(response => {
        setRows(response.data);
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

  return (
    <div>
      {/* <div className="Login-div">
        <Link to="/login" className="login-button">Войти</Link>
      </div> */}
      <div className="students-page">
        <h1 className="students-page__title">Добро пожаловать на главную страницу</h1>
        <p className="students-page__info">
          Жители этого общажного ада.
        </p>
        <table>
          <thead>
          <tr>
            <th onClick={() => requestSort('first_name')}>Имя</th>
            <th onClick={() => requestSort('last_name')}>Фамилия</th>
            <th onClick={() => requestSort('birth_date')}>День рождения</th>
            {/* <th onClick={() => requestSort('email')}>Email</th> */}
            <th onClick={() => requestSort('gender')}>Пол</th>
            <th onClick={() => requestSort('country_name')}>Страна</th>
            {/* <th onClick={() => requestSort('phone')}>Phone</th> */}
          </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.birth_date}</td>
                {/* <td>{row.email}</td> */}
                <td>{row.gender}</td>
                <td>{row.country_name}</td>
                {/* <td>{row.phone}</td> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;