import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import logo from './images/logo.png';
import logo_min from './images/logo_min.png';

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


  const [isHovered, setIsHovered] = useState(false);
  const navVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: '50%', x: "-90%" },
  };

  

  return (
    <Router>
      <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        
        <motion.div 
          style={{position: 'fixed', maxWidth: '15%', background: '#1f2932', height: '100%'}}
          initial="closed"
          animate={isHovered ? "open" : "closed"}
          variants={navVariants}
          transition={{ duration: 0.8 }}
        >
          <div style={{height: '100px'}}>
          {isHovered ? (
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}><motion.img 
            key="open"
            src={logo} 
            alt="Лого" 
            style={{width: '100%', margin: '16px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          /></Link>
           
          ) : (
            <motion.img 
              key="closed"
              src={logo_min} 
              alt="Лого" 
              style={{width: '20%', margin: '16px 16px 16px 90%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
          </div>
          


        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> <br/>
        <Link to="/students" style={{ color: '#fff', textDecoration: 'none' }}>дибылы</Link><br/>
        
        {!isLoggedInAdmin && !isLoggedInUser && (
          <div>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Войти</Link>
          </div>
        )}
        {isLoggedInAdmin && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Админ-панель</Link> <div style={{ color: '#fff', textDecoration: 'none' }}> | </div>
            <div onClick={() => handleLogout()} style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Выйти</div>
          </div>
        )}
        {isLoggedInUser && id && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Link to="/user" style={{ color: '#fff', textDecoration: 'none' }}>Личный кабинет</Link> <div style={{ color: '#fff', textDecoration: 'none' }}> | </div>
            <div onClick={() => handleLogout()} style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Выйти</div>
          </div>
        )}


        </motion.div>
      </div>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {isLoggedInAdmin &&            (
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



