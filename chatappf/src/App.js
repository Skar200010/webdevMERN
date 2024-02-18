
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import WelcomePage from './components/WelcomePage'
import ForgetPassword from  './components/ForgetPassword';
import GetUsers from './components/getUsers'
import TransactionTable from './components/getTransaction';
import ThemeToggle from './components/themeToggle';
const App = () => {
  
  return (
    <Router>
      <ThemeToggle/>
  
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/reset" element={<ForgetPassword/>} />
        <Route path="/usersDetailes" element={<GetUsers/>} />
        <Route path="/getTransaction" element={<TransactionTable/>} />

        
      </Routes>
      
    </Router>
  );
};

export default App;