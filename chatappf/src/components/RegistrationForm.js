
import React, { useState } from 'react';
import axios from 'axios';
import './registrationForm.css'; // Import your CSS file for styling

const RegistrationForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log(response.data);
      window.alert('User registered successfully!');
      setFormData({ username: '', email: '', password: '' }); // Clear the form after successful registration
      onClose();
      
    } catch (error) {
      console.error(error);
      window.alert('Registration failed. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    // Reset the form fields before closing
    setFormData({
      username: '',
      email: '',
      password: '',
    });

    onClose(); // Close the registration form
  };

  return (
    <div>
    <div className="registration-form-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          required
          className="registration-input"
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required
          className="registration-input"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
          className="registration-input"
        />

        <button type="submit" className="registration-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button type="button" onClick={handleClose} className="close-button">
            Close
          </button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
