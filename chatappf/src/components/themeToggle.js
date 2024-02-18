
import React, { useState, useEffect } from 'react';
import './themeToggle.css'


const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('isDarkTheme');
    setIsDarkTheme(storedTheme === 'true');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('isDarkTheme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
  };

  return (
    
      <label>
      <input className="toggle-checkbox"type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
      <div class="toggle-slot">
    <div class="sun-icon-wrapper">
      <div class="iconify sun-icon" data-icon="feather-sun" data-inline="false"></div>
    </div>
    <div class="toggle-button"></div>
    <div class="moon-icon-wrapper">
      <div class="iconify moon-icon" data-icon="feather-moon" data-inline="false"></div>
    </div>
  </div>
      </label>
    
  );
};

export default ThemeToggle;
