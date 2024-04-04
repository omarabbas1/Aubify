import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CommentPage.css';
import upvoteIcon from '../icons/upvote.png';
import downvoteIcon from '../icons/downvote.png';
import commentIcon from '../icons/comment.png';
import shareIcon from '../icons/share.png';
import reportIcon from '../icons/report.png';
import NavBar from '../NavBar/NavBar';


const CommentPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null); // State to store the fetched comment
  const [newComment, setNewComment] = useState('');
  const [remainingCharacters, setRemainingCharacters] = useState(250);

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${postId}`);
      const fetchedPost = { ...response.data, authorAnonymousId: response.data.author.anonymousId };
      setPost(fetchedPost);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };
  

  const handleAddComment = async () => {
    if (newComment.trim() === '') {
      alert('Please enter the content for the comment.');
      return;
    }
  
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('User email not found. Please ensure the user is logged in.');
      return;
    }
  
    const commentData = {
      content: newComment,
      userEmail,
    };
  
    try {
      const response = await axios.post(`http://localhost:8080/posts/${postId}/comments`, commentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201 || response.status === 200) { // Ensure successful response
        setNewComment(''); // Clear the text field
        setRemainingCharacters(250); // Reset remaining characters
        fetchPostAndComments(); // Explicitly refetch post and comments to ensure UI is updated
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      // Optionally, display an error message to the user
      alert('Failed to add comment. Please try again later.');
    }
  };
  
  
  const handleInputChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.slice(0, 250); // Limit the input to 250 characters
    setNewComment(trimmedValue);
    const remaining = Math.max(0, 250 - trimmedValue.length); // Calculate remaining characters
    setRemainingCharacters(remaining);
  };

 // Example function to upvote a comment based on its index within the post's comments array
 const handleVoteUpvote = async (postId, commentId) => {
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/comments/${commentId}/upvote`, {
      userEmail: localStorage.getItem('userEmail'),
    });
    fetchPostAndComments(); // Refresh to show updated vote counts
  } catch (error) {
    console.error(`Failed to upvote on comment:`, error);
  }
};

const handleVoteDownvote = async (postId, commentId) => {
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/comments/${commentId}/downvote`, {
      userEmail: localStorage.getItem('userEmail'),
    });
    fetchPostAndComments(); // Refresh to show updated vote counts
  } catch (error) {
    console.error(`Failed to downvote on comment:`, error);
  }
};


const handleUpvote = async (postId) => {
  const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/upvote`, { userEmail });
    fetchPostAndComments(); // Refresh the posts to reflect the new upvote count
  } catch (error) {
    console.error('Failed to upvote post:', error);
  }
};

const handleDownvote = async (postId) => {
  const userEmail = localStorage.getItem('userEmail'); // Retrieve the user's email
  try {
    await axios.post(`http://localhost:8080/posts/${postId}/downvote`, { userEmail });
    fetchPostAndComments(); // Refresh the posts to reflect the new downvote count
  } catch (error) {
    console.error('Failed to downvote post:', error);
  }
};

  return (
    <div className="comment-page">
      <NavBar/>
      <h3>Post:</h3>
      {post ? (
        <div key={post._id} className="post">
          <div className="post-details-comment">
                <div className='post-anonymousId'>
                  {post.authorAnonymousId}
                </div>
                <div className="post-created-at">
                {new Date(post.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})}
                </div>
          </div>
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
              <img src={reportIcon} alt="Report" />
            </button>
            <button className="interaction-button">
              <img src={shareIcon} alt="Share" />
            </button>
          </div>
        </div>
      ) : (
        <p className='loading-post'>Loading post...</p>
      )}
             <div className="add-comment">
             <h3>Comments:</h3>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Write your comment here..."
        />
         <div className="character-limit">Characters Remaining: {remainingCharacters}</div>
        <button onClick={handleAddComment} type="submit">Comment</button>
      </div>
      <div className="comments-container">
  <div className="comments-list">
    {post && post.comments.map((comment) => ( // Removed index as it's no longer needed for the key
      <div key={comment._id} className="comment"> {/* Use comment._id for a unique key */}
        <div className='comment-details'>
          <div className='comment-anonymousId'>
            {comment.author.anonymousId}
          </div>
          <div className="comment-created-at">
          {new Date(comment.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})}
          </div>
        </div>
        <p>{comment.content}</p>
        <div className="comment-interactions">
          <button className="interaction-button" onClick={() => handleVoteUpvote(postId, comment._id)} >
            <img src={upvoteIcon} alt="Upvote" />
            <span className="interaction-count">{comment.upvotes || 0}</span>
          </button>
          <button className="interaction-button" onClick={() => handleVoteDownvote(postId, comment._id)} >
            <img src={downvoteIcon} alt="Downvote" />
            <span className="interaction-count">{comment.downvotes || 0}</span>
          </button>
          <button className="interaction-button">
              <img src={reportIcon} alt="Report" />
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