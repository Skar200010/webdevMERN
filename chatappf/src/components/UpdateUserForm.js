
import React, { useState } from 'react';
import './updateForm.css';

const UpdateUserForm = ({ user, onUpdate, onClose }) => {
  const [updatedUsername, setUpdatedUsername] = useState(user.username);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);

  const handleUpdate = () => {
    const updatedUserData = {
      username: updatedUsername,
      email: updatedEmail,
    };
    onUpdate(user._id, updatedUserData);
    onClose();
  };

  return (
     <div className="update-form-container">
      <h3>Update User</h3>
      <label htmlFor="updateUsername">
        Username:
        <input
          id="updateUsername"
          type="text"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
        />
      </label>
      <label htmlFor="updateEmail">
        Email:
        <input
          id="updateEmail"
          type="text"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
export default UpdateUserForm;
