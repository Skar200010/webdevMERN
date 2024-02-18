// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './getUsers.css'; 
import RegistrationForm from './RegistrationForm';
import HomePage from './HomePage';
import UpdateUserForm from './UpdateUserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowUpdateForm = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setSelectedUser(null);
    setShowUpdateForm(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getUsers');
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error('Failed to fetching users');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [showRegistrationForm]); 

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:3000/updateUser/${userId}`, updatedUserData);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? { ...user, ...updatedUserData } : user))
        );
        console.log(`User with ID ${userId} updated successfully`);
        window.alert(`User with ID ${userId} updated successfully`);
      } else {
        console.error(`Failed to update user with ID ${userId}`);
      }
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error.message);
      window.alert('Username and email already exist');
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteUser/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error.message);
    }
  };

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <HomePage />
      <div className="user-list-container">
        <button className="btn3" onClick={handleShowRegistrationForm}>
          +
        </button>
        {showRegistrationForm && <RegistrationForm onClose={handleCloseRegistrationForm} />}
        <h2>User List</h2>
        <input className='search-input'
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearch}
        />

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn1" onClick={() => handleShowUpdateForm(user)}>
                    Update
                  </button>
                  <button className="btn2" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
        {showUpdateForm && (
          <UpdateUserForm user={selectedUser} onUpdate={handleUpdate} onClose={handleCloseUpdateForm} />
        )}
      </div>
    </div>
  );
};

export default UserList;
