//dropdownpage
import React, { useState } from 'react';
import './dropdown.css';
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <span>Dropdown</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/usersDetailes">UserDetailes</Link>
          </li>
          <li>
              <Link to="/getTransaction">getTransaction</Link>
            </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
