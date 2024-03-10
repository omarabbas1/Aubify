import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import upvoteIcon from './icons/upvote.png'; // Add your icons in the public/assets/icons/ directory
import downvoteIcon from './icons/downvote.png';
import commentIcon from './icons/comment.png';
import shareIcon from './icons/share.png';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [newPostTitle, setNewPostTitle] = useState('');
  
  const handleUpvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/upvote`, { userEmail });
      fetchPosts(); // Refresh the posts to reflect the new upvote count
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };
  
  const handleDownvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/downvote`, { userEmail });
      fetchPosts(); // Refresh the posts to reflect the new downvote count
    } catch (error) {
      console.error('Failed to downvote post:', error);
    }
  };

  const handleShare = postId => {
    console.log('Shared post:', postId);
    // TODO: Implement the share logic
  };

  const handleCommentClick = (postId) => {
    navigate(`/posts/${postId}/comments`);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/posts?searchTerm=${searchTerm}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };


  const handleCreatePost = async () => {
    try {
      // Include the title when creating a new post
      await axios.post('http://localhost:8080/posts', { title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
      fetchPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/comments`, { content: comment });
      fetchPosts();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" /> 
          <span className="website-name">Aubify</span> 
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-right">
          <span className="user-name">Welcome, {username}!</span> 
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>
      <div className='post-container'>
      <h1>Add a Post:</h1>
  <input
    type="text"
    placeholder="Post Title"
    className="post-title-input"
    value={newPostTitle}
    onChange={(e) => setNewPostTitle(e.target.value)}
  />
  <textarea
    placeholder="What's on your mind?"
    className="post-content-input"
    value={newPostContent}
    onChange={(e) => setNewPostContent(e.target.value)}
  />
  <button className="submit-post-button" onClick={() =>  handleCreatePost()} >Post</button>

        <div className="post-list">
          {/* ... */}
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h2>{post.title}</h2> {/* Post title */}
              <p>{post.content}</p> {/* Post content */}
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
        </div>
        </div>
    </div>
  );
};

const CommentInput = ({ postId, handleAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    handleAddComment(postId, comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmitComment} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
      <button type="submit">Comment</button>
    </form>
  );
};

//Hussein
export default HomePage;
