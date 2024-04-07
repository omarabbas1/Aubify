import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';
import avatar1 from '../avatars/avatar1.jpg'; // Import avatar images
import avatar2 from '../avatars/avatar2.jpg'; // Import avatar images
import avatar3 from '../avatars/avatar3.jpg'; // Import avatar images
import avatar4 from '../avatars/avatar4.jpg'; // Import avatar images
import { useUser } from '../../UserContext';

const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const [userPosts, setUserPosts] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(''); // Initialize selected avatar state
  const [dateCreated, setDateCreated] = useState('');
  const navigate = useNavigate();
  const { userAvatar } = useUser();

  const handleChangePassword = () => {
    navigate('/change_password');
  };

  useEffect(() => {
    fetchUserPosts();
    fetchAvatar();
    fetchDateCreated();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/posts?email=${userEmail}`);
      setUserPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    }
  };

  const fetchDateCreated = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/date-created?email=${userEmail}`);
      setDateCreated(response.data.dateCreated);
    } catch (error) {
      console.error('Failed to fetch date created:', error);
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

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}/comments`); // Navigate to the post's page
  };

  const handleAvatarClick = (avatarUrl) => {
    setSelectedAvatar(avatarUrl); // Set selected avatar when clicked
    userAvatar = avatarUrl
    // Send request to backend to update avatar
    axios.post('http://localhost:8080/user/update-avatar', { email: userEmail, avatarUrl })
      .then(() => console.log('Avatar updated successfully'))
      .catch(error => console.error('Failed to update avatar:', error));
  };

  
  return (
    <div className="profile-container">
      <NavBar/>
      <div className="profile-header">
        <img src={selectedAvatar} alt="Profile Avatar" className="profile-avatar" />
        <h2>My Profile</h2>
      </div>
      <div className="profile-info">
        <div className="name-info">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" defaultValue={userName} />
        </div>
        <div className="email-info">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" defaultValue={userEmail} />
        </div>
        <div className="date-info">
          <label htmlFor="date">Date Created</label>
          <input id='date' type="text" defaultValue={dateCreated} />
        </div>
        <div className='change-password-profile-container'>
          <button className="change-password-button" onClick={handleChangePassword}>Change Password</button>
        </div>
      </div>
      <div className="avatar-selection">
        <h2>Select Avatar</h2>
        <div className="avatar-grid">
          <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarClick(avatar1)} className='avatar-option'/>
          <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarClick(avatar2)} className='avatar-option'/>
          <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarClick(avatar3)} className='avatar-option'/>
          <img src={avatar4} alt="Avatar 4" onClick={() => handleAvatarClick(avatar4)} className='avatar-option'/>
        </div>
      </div>
      <div className="posts-section">
        <h2>My Posts</h2>
        <div className='profile-post-conatiner'>
          {userPosts.map(post => (
              <div key={post._id} onClick={() => handlePostClick(post._id)} className='user-profile-post'>
                <h3>{post.title}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;