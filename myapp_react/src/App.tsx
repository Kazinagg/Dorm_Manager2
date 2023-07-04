import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedInAdmin(true);
    }
  }, []);

  const handleLogin = (type: boolean, id: number) => {
    setId(id);
    if (type){
      setIsLoggedInAdmin(true);
      console.log("setIsLoggedInAdmin")
    } else{
      console.log("setIsLoggedInUser")
      setIsLoggedInUser(true);
    }
    localStorage.setItem('token', 'your token');
  };

  const handleLogout = () => {
    setIsLoggedInAdmin(false);
    setIsLoggedInUser(false);
    setId(null);
    localStorage.removeItem('token');
  };

  return (
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
  );
};

export default App;



