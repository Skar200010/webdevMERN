// LoginForm.js
import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import './loginform.css'
import HomePage from './HomePage';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      const data = response.data

      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <HomePage/>
    <div  className ="login-container">
    
    <form onSubmit={handleSubmit} className='login-form'>
      <label> username: </label>
      <input type="username" name="username" onChange={handleChange} required 
      className='login-input'
      />

      <label> Password: </label>
      <input type="password" name="password" onChange={handleChange} required 
      className='login-input'
      />

      <button type="submit" className='login-button'>Login
      
      </button>
         <Link to = '/reset'> Forget password ?</Link>

    </form>
    </div>
    </div>
  );
};

export default LoginForm;
