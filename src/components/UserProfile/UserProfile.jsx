import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';

const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  return (
    <div className="user-profile-container">
      <NavBar/>
      <h1>User Profile</h1>
      <div className="profile-info">
        <div className='info-item'>
          <p className='info-title'>Name:</p>
          <p>{userName}</p>
        </div>
        <div className='info-item'>
          <p className='info-title'>Email:</p>
          <p>{userEmail}</p>
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default UserProfile;
