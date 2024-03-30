import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import upvoteIcon from '../icons/upvote.png'; // Add your icons in the public/assets/icons/ directory
import downvoteIcon from '../icons/downvote.png';
import commentIcon from '../icons/comment.png';
import shareIcon from '../icons/share.png';




const UserProfile = () => {
  const userName = localStorage.getItem('username');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);



  const handleChangePassword = () => {
    navigate('/change_password');

  };

  const handleDownvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/downvote`, { userEmail });
      fetchUserPosts(userEmail); // Refresh the posts to reflect the new downvote count
    } catch (error) {
      console.error('Failed to downvote post:', error);
    }
  };   

  const handleCommentClick = (postId) => {
    navigate(`/posts/${postId}/comments`);
  };

  const fetchUserPosts = async (userEmail) => {
    try {
      const response = await axios.get(`http://localhost:8080/posts-by-user-email?userEmail=${userEmail}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleUpvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/upvote`, { userEmail });
      fetchUserPosts(userEmail) // Refresh the posts to reflect the new upvote count
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    fetchUserPosts(userEmail);
  
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
      <div className = "profile-activity">
      <p className='activity-title'>Posts:</p>
      <div className='profile-activity-posts'><div className="post-list">
          
      {posts.map((post) => (
            <div key={post._id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="post-interactions">
                {/* Interaction buttons */}
                <button className="interaction-button" onClick={() => handleUpvote(post._id)}>
                <img src={upvoteIcon} alt="Upvote" />
                <span className="interaction-count">{post.upvotes || 0}</span>
                </button>
                <button className="interaction-button" onClick={() => handleDownvote(post._id)}>
                <img src={downvoteIcon} alt="Downvote" />
                <span className="interaction-count">{post.downvotes || 0}</span>
                </button>
                <button className="interaction-button" onClick={() => handleCommentClick(post._id)}>
                  <img src={commentIcon} alt="Comments" />
                  <span className="interaction-count">{post.comments.length}</span>
                </button>
                <button className="interaction-button">
                  <img src={shareIcon} alt="Share" />
                </button>
              </div>
            </div>
          ))}

        </div></div>
      </div>
    </div>
  );
};

export default UserProfile;
