import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import SearchComponent from './searchComponent';
import Navbar from './navBar';
import HomePage from './HomePage';


const isTokenExpired = () => {
  const token = localStorage.getItem('token')
  if (!token) return true ;

  const expirationTime = JSON.parse(atob(token.split('.')[1])).exp*1000;
  return Date.now() >= expirationTime;
}

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession =() => {
      if(isTokenExpired()){
        navigate('/login')
      }
    }
    checkSession();
  }, [navigate])



  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setUserProfile(data);
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserProfile();
  }, []);

  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = userProfile.userId;
      await axios.post(
        'http://localhost:3000/logout',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };


  const handleSearch = async (searchId) => {
    try {
      const searchIdString = searchId.toString();
      
      const response = await axios.get(`http://localhost:3000/getDatabyId/${searchIdString}`);
  
      if (response.status === 200) {
        setSearchResult(response.data.data);

      
      } else {
        console.error('Error fetching search result:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching search result:', error.message);
    }
  };
  const [itemsPerPage] = useState(5);
  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return Object.entries(searchResult)
    .filter(([key]) => key !== '_id' && key !== '__v')
    .slice(startIndex, endIndex)
    .map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value?.toString()}</td>
      </tr>
      ));
  };

 
  const handlePageChange = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "previous") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
     
      <Navbar/>
      <HomePage/>
       <div className="user-container">
        <h2 >User Profile</h2>
        <p >Welcome, {userProfile.username}!</p>
        <p>Email: {userProfile.email}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
    <SearchComponent onSearch={handleSearch} />

    {searchResult && (
  <div className="search-result">
    <h3>Search Result:</h3>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
       
 <div className="pagination">
  <button
    onClick={() => handlePageChange("previous")}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <button
    onClick={() => handlePageChange("next")}
    disabled={
      currentPage ===
      Math.ceil(Object.keys(searchResult).length / itemsPerPage)
    }
  >
    Next
  </button>
</div>

      </div>
    )}
   
     
    </div>
  );
};


export default UserProfile;
