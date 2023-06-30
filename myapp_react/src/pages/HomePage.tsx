import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

type Student = {
  student_id: number;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  country_id: number;
  phone: string;
  email: string;
};

type SortConfig = {
  key: keyof Student;
  direction: 'ascending' | 'descending';
};

const HomePage: React.FC = () => {
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
      <div className="Login-div">
        <Link to="/login" className="login-button">Войти</Link>
      </div>
      <div className="home-page">
        <h1 className="home-page__title">Добро пожаловать на главную страницу</h1>
        <p className="home-page__info">
          Жители этого общажного ада.
        </p>
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('first_name')}>First Name</th>
              <th onClick={() => requestSort('last_name')}>Last Name</th>
              {/* Добавьте другие столбцы по мере необходимости */}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                {/* Добавьте другие ячейки по мере необходимости */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;



