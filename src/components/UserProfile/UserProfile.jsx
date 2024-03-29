import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';
import avatar1 from '../avatars/avatar1.png'; // Import avatar images
import avatar2 from '../avatars/avatar2.png'; // Import avatar images
import avatar3 from '../avatars/avatar3.jpeg'; // Import avatar images

const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const [userPosts, setUserPosts] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(''); // Initialize selected avatar state
  const [dateCreated, setDateCreated] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/posts?email=${userEmail}`);
        setUserPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    const fetchAvatar = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/avatar?email=${userEmail}`);
        const avatarUrl = response.data.avatarUrl;
        if (avatarUrl) {
          setSelectedAvatar(avatarUrl);
        }
      } catch (error) {
        console.error('Failed to fetch avatar:', error);
      }
    };

    fetchUserPosts();
    fetchAvatar();
  }, [userEmail]);

  useEffect(() => {
    const fetchDateCreated = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/date-created?email=${userEmail}`);
        setDateCreated(response.data.dateCreated);
      } catch (error) {
        console.error('Failed to fetch date created:', error);
      }
    };

    fetchDateCreated();
  }, [userEmail]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}/comments`); // Navigate to the post's page
  };

  const handleAvatarClick = (avatarUrl) => {
    setSelectedAvatar(avatarUrl); // Set selected avatar when clicked

    // Send request to backend to update avatar
    axios.post('http://localhost:8080/user/update-avatar', { email: userEmail, avatarUrl })
      .then(() => console.log('Avatar updated successfully'))
      .catch(error => console.error('Failed to update avatar:', error));
  };

  
  return (
    <div className="profile-container">
      <div className="profile-header">
      <div className="profile-date">Dec 1, 2019</div>
        <img src={avatar1} alt="Profile Avatar" className="profile-avatar" />
        <div className="profile-header-details">
        </div>
      </div>
      <div className="profile-info">
        <h2>Your Profile</h2>
        {/* Include input fields for profile data here */}
        <div className="profile-input-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={userEmail} /> {/* Bind value to state */}
        </div>
        <div className="profile-input-group">
          <label htmlFor="firstname"></label>
          <input id="firstname" type="text" value={userName} /> {/* Bind value to state */}
        </div>
        <div className="profile-input-group">
          <label htmlFor="lastname"></label>
          <input id="lastname" type="text" value={userName} /> {/* Bind value to state */}
        </div>
        <button className="change-password-button">Change Password</button>
        {/* More input fields as needed */}
      </div>
      <div className="posts-section">
        <h2>Posts</h2>
        {userPosts.map(post => (
            <li key={post._id} onClick={() => handlePostClick(post._id)} style={{ cursor: 'pointer' }}>
              <h3>{post.title}</h3>
            </li>
          ))}
      </div>
    </div>
  );
};


export default UserProfile;