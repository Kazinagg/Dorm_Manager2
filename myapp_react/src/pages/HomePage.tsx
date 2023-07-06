import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // height у //',vh100 ':становите высоту по вашему усмотрению
    }}>
      <Link to="/students" className="login-button">
        Войти
      </Link>
    </div>
    );
};

export default HomePage;