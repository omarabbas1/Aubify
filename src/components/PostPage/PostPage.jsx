import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./PostPage.css";
import SideBar from "../SideBar/SideBar";

const PostPage = () => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [remainingTitleWords, setRemainingTitleWords] = useState(50);
  const [remainingPostWords, setRemainingPostWords] = useState(500);
  const [postError, setPostError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      // Limit the input to 50 characters
      const truncatedValue = value.slice(0, 50);
      setNewPostTitle(truncatedValue);
      // Update remaining characters count
      const remainingTitle = Math.max(0, 50 - truncatedValue.length);
      setRemainingTitleWords(remainingTitle);
    } else {
      // Limit the input to 500 characters
      const truncatedValue = value.slice(0, 500);
      setNewPostContent(truncatedValue);
      // Update remaining characters count
      const remainingContent = Math.max(0, 500 - truncatedValue.length);
      setRemainingPostWords(remainingContent);
    }
    setPostError("");
  };

  const handleCreatePost = async () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      setPostError("Please enter both title and content for the post.");
      return;
    }
    const userEmail = localStorage.getItem("userEmail");

    try {
      // Include the userEmail in the request body
      await axios.post("/posts", {
        title: newPostTitle,
        content: newPostContent,
        userEmail, // Send the user's email with the post data
      });
      navigate("/homepage");
    } catch (error) {
      console.error("Failed to create post:", error);
      setPostError(
        "You have reached your posting limit for today, please try again later!"
      );
    }
  };

  return (
    <div className="post-page">
      <NavBar />
      <SideBar />
      <div className="post-page-container">
        <h1>Add a Post:</h1>
        <input
          type="text"
          placeholder="Post Title"
          className="post-title-input"
          value={newPostTitle}
          name="title"
          onChange={handleInputChange}
        />
        <div className="remaining-title-characters">
          Characters Remaining: {remainingTitleWords}
        </div>
        <textarea
          placeholder="What's on your mind?"
          className="post-content-input"
          value={newPostContent}
          onChange={handleInputChange}
        ></textarea>
        <div className="remaining-post-characters">
          Characters Remaining: {remainingPostWords}
        </div>
        <button className="submit-post-button" onClick={handleCreatePost}>
          Post
        </button>
        {postError && <div className="error-message-postpage">{postError}</div>}
      </div>
    </div>
  );
};

export default PostPage;
