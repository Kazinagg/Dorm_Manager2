// pages/HomePage.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './HomePage.css'; // Импортируем файл стилей

const HomePage: React.FC = () => {
  // Здесь вы можете использовать useEffect для получения данных о студентах и отображения их в таблице

  // Для демонстрации создадим фиктивные данные
  const rows = [
    { name: 'Иван Иванов', room: '101' },
    { name: 'Петр Петров', room: '102' },
    // добавьте больше студентов здесь...
  ];

  return (
    <div className="home-page">
      <h1 className="home-page__title">Добро пожаловать на главную страницу</h1>
      <p className="home-page__info">
        Жители этого общажного ада.
      </p>
      <TableContainer component={Paper}>
        <Table className="home-page__table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя студента</TableCell>
              <TableCell align="right">Номер комнаты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
