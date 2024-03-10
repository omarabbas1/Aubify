import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CommentPage.css';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import commentIcon from '../icons/comment.png';
import shareIcon from '../icons/share.png';

const CommentPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
        setPost(postResponse.data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    };
    fetchPostAndComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedPost = await response.json();
      setPost(updatedPost); // Update the post with the new comment
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="comment-page">
      <h3>Post:</h3>
      {post ? (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="post-interactions">
            <button className="interaction-button">
              <img src={upvoteIcon} alt="Upvote" />
              <span className="interaction-count">{post.upvotes || 0}</span>
            </button>
            <button className="interaction-button">
              <img src={downvoteIcon} alt="Downvote" />
              <span className="interaction-count">{post.downvotes || 0}</span>
            </button>
            <button className="interaction-button">
              <img src={commentIcon} alt="Comments" />
              <span className="interaction-count">{post.comments ? post.comments.length : 0}</span>
            </button>
            <button className="interaction-button">
              <img src={shareIcon} alt="Share" />
            </button>
          </div>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
      <div className="comments-container">
        <h3>Comments:</h3>
        <div className="comments-list">
        {post && post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment}</p>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
   </div>
  );
};

export default CommentPage;
