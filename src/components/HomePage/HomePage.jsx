import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import upvoteIcon from "../icons/upvote.png"; // Add your icons in the public/assets/icons/ directory
import downvoteIcon from "../icons/downvote.png";
import commentIcon from "../icons/comment.png";
import shareIcon from "../icons/share.png";
import reportIcon from "../icons/report.png";
import deleteIcon from "../icons/delete-admin.png";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { useUser } from "../../UserContext";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [reportMessage, setReportMessage] = useState("");
  const [reportedPostId, setReportedPostId] = useState(null);
  const navigate = useNavigate();
  const { isAdmin } = useUser();

  useEffect(() => {
    const savedFilter = localStorage.getItem("selectedFilter") || "relevance";
    setCurrentFilter(savedFilter);
    fetchPostsFiltered(savedFilter);
  }, [searchTerm]);

  useEffect(() => {
    const handleSearch = (searchTerm) => {
      // Filter posts based on the search term
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(filtered); // Update the filtered posts state
    };

    handleSearch(searchTerm);
  }, [searchTerm, posts]);

  useEffect(() => {
    if (reportedPostId) {
      const timer = setTimeout(() => {
        setReportedPostId(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [reportedPostId]);

  const handleUpvote = async (postId) => {
    const userEmail = localStorage.getItem("userEmail");
    try {
      await axios.post(`/posts/${postId}/upvote`, {
        userEmail,
      });
      fetchPostsFiltered(currentFilter); // Use currentFilter instead of savedFilter
    } catch (error) {
      console.error("Failed to upvote post:", error);
    }
  };

  const handleDownvote = async (postId) => {
    const userEmail = localStorage.getItem("userEmail"); // Retrieve the user's email
    try {
      await axios.post(`/posts/${postId}/downvote`, {
        userEmail,
      });
      fetchPostsFiltered(currentFilter); // Use currentFilter instead of savedFilter
    } catch (error) {
      console.error("Failed to downvote post:", error);
    }
  };

  const handleCommentClick = (postId) => {
    navigate(`/posts/${postId}/comments`);
  };

  const fetchPostsFiltered = async (filter) => {
    try {
      const response = await axios.get(`/posts?filter=${filter}`);
      const postsWithDetails = await Promise.all(
        response.data.map(async (post) => {
          try {
            // Fetch the anonymousId for each post's author
            const res = await axios.get(
              `/posts/${post._id}/author/anonymousId`
            );
            return { ...post, authorAnonymousId: res.data.anonymousId };
          } catch (error) {
            console.error(
              "Failed to fetch author anonymous ID for post:",
              post._id,
              error
            );
            return { ...post, authorAnonymousId: "Error fetching ID" }; // Or handle this case as needed
          }
        })
      );
      setPosts(postsWithDetails);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setCurrentFilter(selectedFilter);
    localStorage.setItem("selectedFilter", selectedFilter);
    fetchPostsFiltered(selectedFilter);
  };

  const handleSearch = (searchTerm) => {
    // If search term is empty, display all posts
    if (!searchTerm.trim()) {
      setSearchedPosts(posts);
    } else {
      // Filter posts based on the search term
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(filtered); // Update the filtered posts state
    }
  };

  const handleReport = async (postId) => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.post(`/posts/${postId}/report`, {
        userEmail,
      });
      setReportedPostId(postId);
      if (response.data.action === "add") {
        setReportMessage("You have successfully reported this post!");
      } else if (response.data.action === "remove") {
        setReportMessage("Report removed!");
      }
    } catch (error) {
      console.error("Failed to toggle report:", error);
    }
  };

  const handleDeleteAdmin = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`/posts/${postId}`, {
        data: { userEmail: localStorage.getItem("userEmail") }, // Axios requires data to be in a 'data' key for DELETE requests
      });
      // Refresh the post list to reflect the deletion
      fetchPostsFiltered(currentFilter);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleShare = (postId) => {
    const commentPageLink = `${window.location.origin}/posts/${postId}/share`;
    navigator.clipboard
      .writeText(commentPageLink)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  return (
    <div className="home-page">
      <NavBar onSearch={handleSearch} />
      <SideBar />
      <div className="post-list">
        <div className="filter-container">
          <label htmlFor="filter">Filter by:</label>
          <select value={currentFilter} onChange={handleFilterChange}>
            <option value="relevance">Relevance</option>
            <option value="date_added">Most Recent</option>
          </select>
        </div>
        {searchedPosts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-details-home">
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
            <div className="post-interactions">
              {/* Interaction buttons */}
              <button
                className="interaction-button"
                onClick={() => handleUpvote(post._id)}
              >
                <img src={upvoteIcon} alt="Upvote" />
                <span className="interaction-count">{post.upvotes || 0}</span>
              </button>
              <button
                className="interaction-button"
                onClick={() => handleDownvote(post._id)}
              >
                <img src={downvoteIcon} alt="Downvote" />
                <span className="interaction-count">{post.downvotes || 0}</span>
              </button>
              <button
                className="interaction-button"
                onClick={() => handleCommentClick(post._id)}
              >
                <img src={commentIcon} alt="Comments" />
                <span className="interaction-count">
                  {(post.comments || []).length}
                </span>
              </button>
              <button
                className="interaction-button"
                onClick={() => handleReport(post._id)}
              >
                <img src={reportIcon} alt="Report" />
              </button>
              <button
                className="interaction-button"
                onClick={() => handleShare(post._id)}
              >
                <img src={shareIcon} alt="Share" />
              </button>
              {isAdmin && (
                <button
                  className="interaction-button"
                  onClick={() => handleDeleteAdmin(post._id)}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>
              )}
            </div>
            {reportedPostId === post._id && (
              <div className="report-message">{reportMessage}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
