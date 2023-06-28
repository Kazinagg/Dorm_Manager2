// pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Добавьте эту строку
import './HomePage.css';

type SortConfig = {
  key: 'name' | 'room';
  direction: 'ascending' | 'descending';
};

type Row = {
  name: string;
  room: string;
};

const HomePage: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' });
  const [rows, setRows] = useState<Row[]>([
    { name: 'Иван Иванов', room: '101' },
    { name: 'Петр Петров', room: '102' },
  ]);

  useEffect(() => {
    const sortArray = (type: 'name' | 'room') => {
      const types = {
        name: 'name',
        room: 'room',
      };
      const sortProperty = types[type];
      const sorted = [...rows].sort((a, b) => a[sortProperty as keyof Row].localeCompare(b[sortProperty as keyof Row]));
      if (sortConfig.direction === 'descending') sorted.reverse();
      return sorted;
    };

    if (sortConfig.key) {
      const sortedData = sortArray(sortConfig.key);
      setRows(sortedData);
    }
  }, [sortConfig]);

  const requestSort = (key: 'name' | 'room') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div >
      <div className="Login-div">
        <Link to="/login" className="login-button">Войти</Link>
      </div>
      <div className="home-page">
      <h1 className="home-page__title">Добро пожаловать на главную страницу</h1>
      <p className="home-page__info">
        Жители этого общажного ада.
      </p>
      
      {/* <Link to="/login" className="login-button">Войти</Link> */}
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Имя</th>
            <th onClick={() => requestSort('room')}>Комната</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default HomePage;


