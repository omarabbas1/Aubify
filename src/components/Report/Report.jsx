import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./Report.css";

const ReportedPostsPage = () => {
  const [reportedPosts, setReportedPosts] = useState([]);

  // useEffect(() => {
  //   fetchReportedPosts();
  // }, []);

  // const fetchReportedPosts = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/reportedPosts");
  //     setReportedPosts(response.data);
  //   } catch (error) {
  //     console.error("Error fetching reported posts:", error);
  //   }
  // };

  return (
    <div className="report-page">
      <NavBar />
      <div className="reported-posts-container">
        <h1>Reported Posts</h1>
        {reportedPosts.map((post) => (
          <div className="reported-post" key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedPostsPage;
