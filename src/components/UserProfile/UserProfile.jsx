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
    <div className="user-profile-container">
      <NavBar />
      <h1>User Profile</h1>
      <div className="profile-info">
        <div className='info-item'>
          <p className='info-title'>First Name:</p>
          <p>{userName}</p>
        </div>
        <div className='info-item'>
          <p className='info-title'>Last Name:</p>
          <p>{userName}</p>
        </div>
        <div className='info-item'>
          <p className='info-title'>Email:</p>
          <p>{userEmail}</p>
        </div>
        <div className='info-item'>
          <p className='info-title'>Date Created:</p>
          <p>{dateCreated}</p>
        </div>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <div className="avatar-selection">
        <h2>Select Avatar</h2>
        <div className="avatar-grid">
          <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarClick(avatar1)} />
          <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarClick(avatar2)} />
          <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarClick(avatar3)} />
          {/* Add more avatars as needed */}
        </div>
      </div>
      <div className="profile-picture">
        <h2>Profile Picture</h2>
        {selectedAvatar && <img src={selectedAvatar} alt="Profile" />}
      </div>
      <div className="user-posts">
        <h2>User Posts</h2>
        <ul>
          {userPosts.map(post => (
            <li key={post._id} onClick={() => handlePostClick(post._id)} style={{ cursor: 'pointer' }}>
              <h3>{post.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;