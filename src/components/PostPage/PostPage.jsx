import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./PostPage.css";

const AddPostPage = () => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [remainingTitleWords, setRemainingTitleWords] = useState(50);
  const [remainingPostWords, setRemainingPostWords] = useState(500);
  const [postError, setPostError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setNewPostTitle(value.slice(0, 50));
      setRemainingTitleWords(50 - value.length);
    } else {
      setNewPostContent(value);
      setRemainingPostWords(500 - value.length);
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
        onKeyDown={(e) => {
          if (
            newPostContent.length >= 500 &&
            e.key !== "Backspace" &&
            e.key !== "Delete"
          ) {
            e.preventDefault();
          }
        }}
      >
        {newPostContent.length}/500
      </textarea>

      <div className="remaining-post-characters">
        Characters Remaining: {remainingPostWords}
      </div>
      <button className="submit-post-button" onClick={handleCreatePost}>
        Post
      </button>
      {postError && <div className="error-message-postpage">{postError}</div>}
    </div>
  );
};

export default AddPostPage;
