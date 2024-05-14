import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./NavBar.css";
import plusIcon from "../icons/plus.png";
import axios from "axios";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [userAvatar, setUserAvatar] = useState(""); // Initialize state for user avatar
  const location = useLocation();
  const { isAdmin, setIsAdmin } = useUser();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchAvatar();
  }, []);

  const fetchAdminStatus = async () => {
    try {
      const response = await axios.get(
        `/checkAdminStatus?userEmail=${userEmail}`
      );
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error("Error fetching admin status:", error);
    }
  };

  useEffect(() => {
    fetchAdminStatus();
  }, [userEmail, isAdmin]); // Run the effect when userEmail changes

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`/user/avatar?email=${userEmail}`);
      const avatarUrl = response.data.avatarUrl;
      if (avatarUrl) {
        setUserAvatar(avatarUrl);
      }
    } catch (error) {
      console.error("Failed to fetch avatar:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  const handleCreateButton = () => {
    navigate("/post");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/aubify-logo.png" alt="Logo" className="navbar-logo" />
        <span className="website-name">Aubify</span>
      </div>
      <div className="navbar-center">
        {location.pathname === "/homepage" && (
          <input
            type="text"
            placeholder="Search by title..."
            onChange={handleSearch}
          />
        )}
      </div>
      <div className="navbar-right">
        {location.pathname !== "/post" && (
          <button className="create-post-navbar" onClick={handleCreateButton}>
            <img src={plusIcon} alt="plus" className="plus-icon" />
            <span className="create">Create</span>
          </button>
        )}
        {userAvatar && (
          <img
            src={userAvatar}
            alt="User Avatar"
            className="user-avatar-home"
          />
        )}
        <div className="navbar-name">
          <span className="user-name">{username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
