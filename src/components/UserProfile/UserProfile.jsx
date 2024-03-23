import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './UserProfile.css';
import Navbar from '../NavBar/NavBar';

const UserProfile = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);
  const [category1Visible, setCategory1Visible] = useState(false);
  const [category2Visible, setCategory2Visible] = useState(false);
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const location = useLocation();

  // Function to toggle visibility of content and heading
  const toggleVisibility = (setState) => {
    setState((prevState) => !prevState);
  };

  return (
    <div className="user-profile-container">
      {location.pathname === '/userprofile' && <Navbar showChangePassword={true} />}
      <h2 className="user-profile-heading">User Profile</h2>
      <div className="user-profile-box">
        <div className="profile-category" onClick={() => toggleVisibility(setNameVisible)}>
          {nameVisible ? (
            <div className="category-content">{userName}</div>
          ) : (
            <h3 className="category-heading">Name:</h3>
          )}
        </div>
        <div className="profile-category" onClick={() => toggleVisibility(setEmailVisible)}>
          {emailVisible ? (
            <div className="category-content">{userEmail}</div>
          ) : (
            <h3 className="category-heading">Email:</h3>
          )}
        </div>
        <div className="profile-category" onClick={() => toggleVisibility(setCategory1Visible)}>
          {category1Visible ? (
            <div className="category-content">Content for Category 1</div>
          ) : (
            <h3 className="category-heading">Category 1</h3>
          )}
        </div>
        <div className="profile-category" onClick={() => toggleVisibility(setCategory2Visible)}>
          {category2Visible ? (
            <div className="category-content">Content for Category 2</div>
          ) : (
            <h3 className="category-heading">Category 2</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
