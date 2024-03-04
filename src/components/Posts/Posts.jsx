import React, { useState } from 'react';
import './Posts.css';

const Posts = ({ handleSubmitPost }) => {
  const [content, setContent] = useState('');
  const [postList, setPostList] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the content from the state
    const newPostContent = content;
    // Call the onSubmit function passed as a prop with the new post content
    handleSubmitPost(newPostContent);
    // Update the post list with the new post content
    setPostList([...postList, newPostContent]);
    // Clear the input field after submission
    setContent('');
  };

  return (
    <div className='post-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content"></label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <div className="post-list">
        <h2>Posts:</h2>
        <ul>
          {postList.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
