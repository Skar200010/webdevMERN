// SearchComponent.js
import React, { useState } from 'react';
import './searchComponent.css';

const SearchComponent = ({ onSearch }) => {
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    onSearch(searchId);
  };
 
  return (
    <div className="search-container">
      <input
        type="text"
        id="searchId"
        placeholder='input your id'
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
