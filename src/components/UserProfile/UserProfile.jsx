import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';

const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  useEffect(() => {
    // Fetch user's posts when the component mounts
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/posts?email=${userEmail}`);
        setUserPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

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
      <div className="user-posts">
        <h2>User Posts</h2>
        <ul>
          {userPosts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
