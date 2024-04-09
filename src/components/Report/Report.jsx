import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./Report.css";

const ReportedPostsPage = () => {
  const [reportedPosts, setReportedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReportedPosts();
  }, []);

  const fetchReportedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reportedPosts");
      setReportedPosts(response.data);
    } catch (error) {
      console.error("Error fetching reported posts:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}/comments`); // Navigate to the post's page
  };

  return (
    <div className="report-page">
      <NavBar />
      <div className="reported-posts-container">
        <h1>Reported Posts</h1>
        {reportedPosts.map((post) => (
          <div
            className="reported-post"
            key={post._id}
            onClick={() => handlePostClick(post._id)}
          >
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedPostsPage;
