import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import DropdownMenu from './dropdown';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMouseEnter = (event) => {
    if (event.target.className === 'sidebar' || event.target.className === 'container') {
      setSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`container ${sidebarOpen ? 'sidebar-open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar" style={{ left: sidebarOpen ? '0' : '-200px' }}>
        <i className={`fas ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        <h2>Chat App</h2>
        <button className="sidebar-toggle-btn"></button>
        <nav>
          <ul className={sidebarOpen ? 'visible' : ''}>
            <li>
              <Link to="/login">Login</Link>
            </li>   
          </ul>
        </nav>
        <DropdownMenu />
      </div>
    </div>
  );
};

export default HomePage;
