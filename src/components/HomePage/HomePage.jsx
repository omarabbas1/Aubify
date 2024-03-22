import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import upvoteIcon from '../icons/upvote.png'; // Add your icons in the public/assets/icons/ directory
import downvoteIcon from '../icons/downvote.png';
import commentIcon from '../icons/comment.png';
import shareIcon from '../icons/share.png';
import Navbar from '../NavBar/Navbar';
import SideBar from '../SideBar/SideBar';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [currentFilter, setCurrentFilter] = useState(''); 
  
  const handleUpvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail');
    const savedFilter = localStorage.getItem('selectedFilter');
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/upvote`, { userEmail });
      fetchPostsFiltered(savedFilter) // Refresh the posts to reflect the new upvote count
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };
  
  const handleDownvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    const savedFilter = localStorage.getItem('selectedFilter');
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/downvote`, { userEmail });
      fetchPostsFiltered(savedFilter); // Refresh the posts to reflect the new downvote count
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
  const savedFilter = localStorage.getItem('selectedFilter') || 'relevance';
  setCurrentFilter(savedFilter);
  fetchPostsFiltered(savedFilter);

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
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      alert('Please enter both title and content for the post.');
      return;
    }
    const savedFilter = localStorage.getItem('selectedFilter');
    try {
      await axios.post('http://localhost:8080/posts', { title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
      fetchPostsFiltered(savedFilter);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const fetchPostsFiltered = async (filter) => {
    try {
      // Include the filter in the request as a query parameter
      const response = await axios.get(`http://localhost:8080/posts?filter=${filter}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
  
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    localStorage.setItem('selectedFilter', selectedFilter);
    setCurrentFilter(selectedFilter);
    fetchPostsFiltered(selectedFilter);
  };
  

  return (
    <div className="home-page">
      <Navbar/>
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
          <h1> Posts: </h1>
          <div className='filter-container'>
            <label htmlFor="filter">Filter by:</label>
            <select value={currentFilter} onChange={handleFilterChange}>
              <option value="relevance">Relevance</option>
              <option value="date_added">Most Recent</option>
            </select>
          </div>
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
        </div>
        </div>
    </div>
  );
};
export default HomePage;