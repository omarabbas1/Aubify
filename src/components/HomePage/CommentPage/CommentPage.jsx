// import { useParams } from 'react-router-dom';

// function CommentPage() {
//   let { postId } = useParams();

//   // Now you can use postId to fetch the post and its comments or perform other related tasks.

//   return (
//     <div>
//       {/* Render your post and its comments here using the postId */}
//       hi
//     </div>
//   );
// }

// export default CommentPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommentPage.css'; // Make sure to create this CSS file

// const CommentPage = ({ postId }) => {
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       try {
//         // const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
//         const postResponse =  "this is the post";
//         // const commentsResponse = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
//         const commentsResponse = "this is the comment";
//         // setPost(postResponse.data);
//         setPost("this is the post");
//         // setComments(commentsResponse.data);
//         setComments("this is the comment");
//       } catch (error) {
//         console.error('Failed to fetch post or comments:', error);
//       }
//     };
//     fetchPostAndComments();
//   }, [postId]);

//   const handleAddComment = async () => {
//     try {
//       await axios.post(`http://localhost:8080/posts/${postId}/comments`, { content: newComment });
//       setNewComment('');
//       // Ideally, fetch comments again to update the list
//       const updatedComments = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
//       setComments(updatedComments.data);
//     } catch (error) {
//       console.error('Failed to add comment:', error);
//     }
//   };

//   return (
//     <div className="comment-page">
//       {post && (
//         <div className="post">
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//         </div>
//       )}
//       <div className="comments">
//         <h3>Comments</h3>
//         {comments.map((comment, index) => (
//           <div key={index} className="comment">
//             <p>{comment.content}</p>
//           </div>
//         ))}
//       </div>
//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment here..."
//         />
//         <button onClick={handleAddComment}>Comment</button>
//       </div>
//     </div>
//   );
// };

// export default CommentPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './CommentPage.css'; // Make sure to create this CSS file
// import upvoteIcon from '../icons/upvote.png'; // Add your icons in the public/assets/icons/ directory
// import downvoteIcon from '../icons/downvote.png';
// import commentIcon from '../icons/comment.png';
// import shareIcon from '../icons/share.png';

// const handleCommentClick = (postId) => {
//   // navigate(`/posts/${postId}/comments`);
// };


// const CommentPage = ({ postId }) => {
//   const [post, setPost] = useState(null);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       try {
//         const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
//         setPost(postResponse.data);
//       } catch (error) {
//         console.error('Failed to fetch post or comments:', error);
//       }
//     };
//     fetchPostAndComments();
//   }, [postId]);

//   const handleAddComment = async () => {
//     try {
//       const response = await fetch(`/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ comment: newComment }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to add comment');
//       }
  
//       const updatedPost = await response.json();
//       // Update your state or UI with the updated post
//       setNewComment('');
//     } catch (error) {
//       console.error('Failed to add comment:', error);
//     }
//   };
  
//   return (
//     <div className="comment-page">
//         <h3>Post</h3>     
//         <div key={post._id} className="post">
//               <h2>{post.title}</h2> {/* Post title */}
//               <p>{post.content}</p> {/* Post content */}
//               <div className="post-interactions">
//                 {/* Interaction buttons */}
//                 <button className="interaction-button">
//                   <img src={upvoteIcon} alt="Upvote" />
//                   <span className="interaction-count">{post.upvotes || 0}</span>
//                 </button>
//                 <button className="interaction-button">
//                   <img src={downvoteIcon} alt="Downvote" />
//                   <span className="interaction-count">{post.downvotes || 0}</span>
//                 </button>
//                 <button className="interaction-button" onClick={() => handleCommentClick(post._id)}>
//                   <img src={commentIcon} alt="Comments" />
//                   <span className="interaction-count">{2}</span>
//                 </button>
//                 <button className="interaction-button">
//                   <img src={shareIcon} alt="Share" />
//                 </button>
//               </div>
//             </div>
//       <div className="comments">
//         <h3>Comments</h3>
//         {post.comments.map((comment, index) => (
//           <div key={index} className="comment">
//             <p>{comment}</p>
//           </div>
//         ))}
//       </div>
//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment here..."
//         />
//         <button onClick={handleAddComment}>Comment</button>
//       </div>
//     </div>
//   );
// };

// export default CommentPage;








// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './CommentPage.css';
// import upvoteIcon from '../icons/upvote.png';
// import downvoteIcon from '../icons/downvote.png';
// import commentIcon from '../icons/comment.png';
// import shareIcon from '../icons/share.png';

// const handleCommentClick = async (postId) => {
//   try {
//     const response = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ comment: comment }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to post comment');
//     }

//     // Handle success (e.g., clear the input field, update UI)
//     setComment('');
//   } catch (error) {
//     console.error('Error posting comment:', error);
//   }
// };


// const CommentPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       try {
//         const postResponse = await axios.get(`http://localhost:8080/posts/${postId}`);
//         setPost(postResponse.data);
//       } catch (error) {
//         console.error('Failed to fetch post:', error);
//       }
//     };
//     fetchPostAndComments();
//   }, [postId]);

//   const handleAddComment = async () => {
//     try {
//       const response = await fetch(`/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ comment: newComment }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add comment');
//       }

//       const updatedPost = await response.json();
//       setPost(updatedPost); // Update the post with the new comment
//       setNewComment('');
//     } catch (error) {
//       console.error('Failed to add comment:', error);
//     }
//   };

//   return (
//     <div className="comment-page">
//       <h3>Post</h3>
//       {post ? (
//         <div key={post._id} className="post">
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <div className="post-interactions">
//             <button className="interaction-button">
//               <img src={upvoteIcon} alt="Upvote" />
//               <span className="interaction-count">{post.upvotes || 0}</span>
//             </button>
//             <button className="interaction-button">
//               <img src={downvoteIcon} alt="Downvote" />
//               <span className="interaction-count">{post.downvotes || 0}</span>
//             </button>
//             <button className="interaction-button" onClick={() => handleCommentClick(post._id)}>
//               <img src={commentIcon} alt="Comments" />
//               <span className="interaction-count">{post.comments ? post.comments.length : 0}</span>
//             </button>
//             <button className="interaction-button">
//               <img src={shareIcon} alt="Share" />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>Loading post...</p>
//       )}
//       <div className="comments">
//         <h3>Comments</h3>
//         {post && post.comments.map((comment, index) => (
//           <div key={index} className="comment">
//             <p>{comment}</p>
//           </div>
//         ))}
//       </div>
//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment here..."
//         />
//         <button onClick={handleAddComment}>Comment</button>
//       </div>
//     </div>
//   );
// };

// export default CommentPage;


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
      <h3>Post</h3>
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
      <div className="comments">
        <h3>Comments</h3>
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
  );
};

export default CommentPage;
