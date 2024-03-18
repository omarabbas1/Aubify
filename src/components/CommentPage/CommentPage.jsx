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
    fetchPostAndComments();
  }, [postId]);

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
      setPost(postResponse.data);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Please enter the content for the comment.');
      return;
    }
  
    // Assuming the backend expects an object with a 'content' field for a new comment
    const commentData = {
      content: newComment,
      // Initialize any other fields if necessary, like upvotes, downvotes
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/comments`, {
        comment: commentData, // Sending the comment as an object
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to add comment');
      }
  
      const updatedPost = response.data;
      setPost(updatedPost); // Update the post with the new comment
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };
  

 // Example function to upvote a comment based on its index within the post's comments array
const handleVoteUpvote = async (postId,commentIndex) => {
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/comments/${commentIndex}/upvote`, {
      userEmail: localStorage.getItem('userEmail'),
    });
    fetchPostAndComments(); // Refresh to show updated vote counts
  } catch (error) {
    console.error(`Failed to upvote vote on comment:`, error);
  }
};

const handleVoteDownvote = async (postId,commentIndex) => {
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/comments/${commentIndex}/downvote`, {
      userEmail: localStorage.getItem('userEmail'),
    });
    fetchPostAndComments(); // Refresh to show updated vote counts
  } catch (error) {
    console.error(`Failed to upvote vote on comment:`, error);
  }
};

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

const fetchPosts = async () => {
  try {
    // Use the postId from useParams to make a request for a specific post
    const response = await axios.get(`http://localhost:8080/posts/${postId}`);
    if (response.status === 200) {
      setPost(response.data);
    } else {
      console.error('Failed to fetch post: Server responded with status', response.status);
    }
  } catch (error) {
    console.error('Failed to fetch post:', error);
  }
};

  return (
    <div className="comment-page">
      <h3>Post:</h3>
      {post ? (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="comment-interactions">
            <button className="interaction-button" onClick={() => handleUpvote(post._id)} >
              <img src={upvoteIcon} alt="Upvote" />
              <span className="interaction-count">{post.upvotes || 0 }</span>
            </button>
            <button className="interaction-button">
              <img src={downvoteIcon} alt="Downvote" onClick={() => handleDownvote(post._id)}/>
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
             <div className="add-comment">
             <h3>Comments:</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
        />
        <button onClick={handleAddComment} type="submit">Comment</button>
      </div>
      <div className="comments-container">
        <div className="comments-list">
          {post && post.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.content}</p>
              <div className="comment-interactions">
                <button className="interaction-button" onClick={() => handleVoteUpvote(postId,index)} >
                <img src={upvoteIcon} alt="Upvote" />
                <span className="interaction-count">{post.comments[index].upvotes || 0}</span>
                </button>
                <button className="interaction-button" onClick={() => handleVoteDownvote(postId,index)} >
                <img src={downvoteIcon} alt="Downvote" />
                <span className="interaction-count">{post.comments[index].downvotes || 0}</span>
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
export default CommentPage;