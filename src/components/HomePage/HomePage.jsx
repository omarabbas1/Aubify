import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import upvoteIcon from '../icons/upvote.png'; // Add your icons in the public/assets/icons/ directory
import downvoteIcon from '../icons/downvote.png';
import commentIcon from '../icons/comment.png';
import shareIcon from '../icons/share.png';
import NavBar from '../NavBar/NavBar';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [currentFilter, setCurrentFilter] = useState(''); 
  const [anonymousId, setAnonymousId] = useState('');
  const [remainingWords, setRemainingWords] = useState(500);
  const [remainingTitleWords, setRemainingTitleWords] = useState(50);
  const [searchedPosts, setSearchedPosts] = useState([]); // Display posts based on search
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch anonymousId
    fetchAnonymousId();
  }, []);

  useEffect(() => {
    const handleSearch = (searchTerm) => {
      // Filter posts based on the search term
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(filtered); // Update the filtered posts state
    };
  
    handleSearch(searchTerm);
  }, [searchTerm, posts]);
  
  const handleUpvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/upvote`, { userEmail });
      fetchPostsFiltered(currentFilter); // Use currentFilter instead of savedFilter
    } catch (error) {
      console.error('Failed to upvote post:', error);
    }
  };
  
  const handleDownvote = async (postId) => {
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    try {
      await axios.post(`http://localhost:8080/posts/${postId}/downvote`, { userEmail });
      fetchPostsFiltered(currentFilter); // Use currentFilter instead of savedFilter
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

  useEffect(() => {
    // Update remaining characters count when content changes
    const remaining = Math.max(0, 500 - newPostContent.length);
    setRemainingWords(remaining);
  }, [newPostContent]);

  useEffect(() => {
    // Update remaining characters count when title changes
    const remainingTitle = Math.max(0, 50 - newPostTitle.length);
    setRemainingTitleWords(remainingTitle);
  }, [newPostTitle]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setNewPostTitle(value.slice(0, 50)); 
    } else {
      setNewPostContent(value);
    }
  };

  const handleCreatePost = async () => {
    if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
      alert('Please enter both title and content for the post.');
      return;
    }
    const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
    const savedFilter = localStorage.getItem('selectedFilter');
    
    try {
      // Include the userEmail in the request body
      await axios.post('http://localhost:8080/posts', { 
        title: newPostTitle, 
        content: newPostContent, 
        userEmail // Send the user's email with the post data
      });
      setNewPostTitle('');
      setNewPostContent('');
      fetchPostsFiltered(savedFilter);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const fetchAnonymousId = async () => {
    try {
      const response = await axios.get('http://localhost:8080/anonymousId');
      setAnonymousId(response.data);
      localStorage.setItem('anonymousId', response.data);
    } catch (error) {
      console.error('Error fetching anonymous ID:', error);
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
    setCurrentFilter(selectedFilter);
    localStorage.setItem('selectedFilter', selectedFilter);
    fetchPostsFiltered(selectedFilter);
  };

  const handleSearch = (searchTerm) => {
    // If search term is empty, display all posts
    if (!searchTerm.trim()) {
      setSearchedPosts(posts);
    } else {
      // Filter posts based on the search term
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(filtered); // Update the filtered posts state
    }
  };

  return (
    <div className="home-page">
      <NavBar onSearch={handleSearch} />
      <div className='post-container'>
      <h1>Add a Post:</h1>
      <input
  type="text"
  placeholder="Post Title"
  className="post-title-input"
  value={newPostTitle}
  name="title"
  onChange={handleInputChange}
/>
<div className="remaining-characters">
  Characters Remaining: {remainingTitleWords}
</div>
  <textarea
  placeholder="What's on your mind?"
  className="post-content-input"
  value={newPostContent}
  onChange={handleInputChange}
  onKeyDown={(e) => {
    if (newPostContent.length >= 500 && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  }}
></textarea>
<div className="remaining-Postcharacters">
  Characters Remaining: {remainingWords}
</div>
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
          {searchedPosts.map((post) => (
            
            <div key={post._id} className="post">
               <div className="post-details">
              <div className="post-anonymous">
                 Author ID: { anonymousId}
                 </div>
                <div className="post-created-at">
                   Created at {new Date(post.createdAt).toDateString()}
                </div>
              </div>
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
