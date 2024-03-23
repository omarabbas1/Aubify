import React from 'react';
import { useLocation } from 'react-router-dom';
import './UserProfile.css';
import Navbar from '../NavBar/NavBar';

const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const location = useLocation();

  return (
    <div className="user-profile-container">
      {location.pathname === '/userprofile' && <Navbar showChangePassword={true} />}
      <h2>User Profile</h2>
      <div className="profile-info">
        <h3>Name:</h3>
        <div>{userName}</div>
      </div>
      <div className="profile-info">
        <h3>Email:</h3>
        <div>{userEmail}</div>
      </div>
    </div>
  );
};

export default UserProfile;
