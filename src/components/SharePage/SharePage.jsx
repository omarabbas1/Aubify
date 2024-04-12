import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SharePage.css";
import upvoteIcon from "../icons/upvote.png";
import downvoteIcon from "../icons/downvote.png";
import commentIcon from "../icons/comment.png";
import shareIcon from "../icons/share.png";
import reportIcon from "../icons/report.png";

const SharePage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [shareError, setShareError] = useState(null);

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    try {
      const response = await axios.get(`/posts/${postId}`);
      const fetchedPost = {
        ...response.data,
        authorAnonymousId: response.data.author.anonymousId,
      };
      setPost(fetchedPost);
    } catch (error) {
      console.error("Failed to fetch post:", error);
      setShareError(
        "Sorry, this post has been deleted or is no longer available."
      );
    }
  };

  return (
    <div className="share-page">
      {shareError ? (
        <p className="error-message-share">{shareError}</p>
      ) : (
        <>
          <h3>Post:</h3>
          {post ? (
            <div key={post._id} className="post">
              <div className="post-details-comment">
                <div className="post-anonymousId">{post.authorAnonymousId}</div>
                <div className="post-created-at">
                  {new Date(post.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </div>
              </div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="comment-interactions">
                <button className="interaction-button">
                  <img src={upvoteIcon} alt="Upvote" />
                  <span className="interaction-count">{post.upvotes || 0}</span>
                </button>
                <button className="interaction-button">
                  <img src={downvoteIcon} alt="Downvote" />
                  <span className="interaction-count">
                    {post.downvotes || 0}
                  </span>
                </button>
                <button className="interaction-button">
                  <img src={commentIcon} alt="Comments" />
                  <span className="interaction-count">
                    {post.comments ? post.comments.length : 0}
                  </span>
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
            <p className="loading-post">Loading post...</p>
          )}
          <div className="comments-share">
            <h3>Comments:</h3>
            <div className="comments-container">
              <div className="comments-list">
                {post &&
                  post.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <div className="comment-details">
                        <div className="comment-anonymousId">
                          {comment.author.anonymousId}
                        </div>
                        <div className="comment-created-at">
                          {new Date(comment.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </div>
                      </div>
                      <p>{comment.content}</p>
                      <div className="comment-interactions">
                        <button className="interaction-button">
                          <img src={upvoteIcon} alt="Upvote" />
                          <span className="interaction-count">
                            {comment.upvotes || 0}
                          </span>
                        </button>
                        <button className="interaction-button">
                          <img src={downvoteIcon} alt="Downvote" />
                          <span className="interaction-count">
                            {comment.downvotes || 0}
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SharePage;
