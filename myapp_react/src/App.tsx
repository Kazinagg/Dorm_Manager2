import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import logo from './images/logo.png';

const App: React.FC = () => {
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('userToken');
    if (adminToken) {
      setIsLoggedInAdmin(true);
    }
    if (userToken) {
      setIsLoggedInUser(true);
      const userId = localStorage.getItem('userId');
      if (userId) {
        setId(Number(userId));
      }
    }
  }, []);


  const handleLogin = (type: boolean, id: number) => {
    setId(id);
    if (type){
      setIsLoggedInAdmin(true);
      localStorage.setItem('adminToken', 'your token');
    } else{
      setIsLoggedInUser(true);
      localStorage.setItem('userToken', 'your token');
      localStorage.setItem('userId', id.toString());
    }
  };


  const handleLogout = () => {
    setIsLoggedInAdmin(false);
    setIsLoggedInUser(false);
    setId(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
  };


  return (
    <div>
      <div style={{position: 'absolute',/* margin: '10px' background: '#1f2932'*/}}>
        <img src={logo} alt="Лого" style={{ width: '20%', height: '20%', margin: '16px' }} />
      </div>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isLoggedInAdmin && (
            <Route path="/admin" element={<AdminPage onLogout={handleLogout} />} />
          )}
          {isLoggedInUser && id && (
          <Route path="/user" element={<UserPage userId={id} onLogout={handleLogout} />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;



