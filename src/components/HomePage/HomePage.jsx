import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {

 const [postList, setPostList] = useState([]);
  const [content, setContent] = useState('');
  
  const handleSubmitPost = (newPostContent) => {
    setPostList([...postList, { content: newPostContent, comments: [] }]);
    setContent('');
  };

  const handleAddComment = (postId, newComment) => {
    setPostList(
      postList.map((post, index) => {
        if (index === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  /* const handleSignOut = () => {
      / Handle sign out logic here
    };  */

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" /> 
          <span className="website-name">Aubify</span> 
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search..." /> {/* Search bar */}
        </div>
        <div className="navbar-right">
          <span className="user-name">User Name</span> 
          <button className="sign-out-button" disabled>Sign Out</button> {/* Sign out button */}
        </div>
      </nav>
      
      {/* Posts */}
      
      <div className='post-container'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitPost(content);
        }}>
          <h1>Add a Post:</h1>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Post</button>
        </form>

        <div className="post-list">
          <h2>Posts:</h2>
          {postList.map((post, index) => (
            <div key={index} className="post" >
              <p>{post.content}</p>
              {/* Comment Container */}
              <div className="comment-container">
                <h3>Comments:</h3>
                <CommentInput postId={index} handleAddComment={handleAddComment} />
                <ul>
                  {post.comments.map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
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

  const handleSubmitComment = (event) => {
    event.preventDefault();
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

export default HomePage;