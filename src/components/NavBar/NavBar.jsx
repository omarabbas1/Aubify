import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './NavBar.css';
import SideBar from '../SideBar/SideBar';

const Navbar = ({ onSearch }) => { // Pass onSearch function as a prop
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation(); // Get the current location

  // Check if the search bar should be visible based on the current location
  const isSearchVisible = location.pathname === '/homepage';

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the sign-in page
      navigate('/');
    }
  }, [navigate]);

  const handleSignOut = () => {
    // Remove the username from local storage
    localStorage.clear();
    // Redirect to the sign-in/sign-up page
    navigate('/');
    // Clear the session history
    window.history.replaceState(null, '', '/');
    // Prevent further navigation using the back button
    window.onpopstate = () => {
      navigate('/');
      window.history.replaceState(null, '', '/');
    };
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value; // Capture the search term
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const isAuthenticated = () => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');

    // Check if the username exists and is not empty
    return username !== null && username.trim() !== '';
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left" onClick={toggleSidebar}>
          <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" />
          <span className="website-name">Aubify</span>
        </div>
        {isSearchVisible && (
          <div className="navbar-center">
            <input type="text" placeholder="Search..." onChange={handleSearch} />
          </div>
        )}
        <div className="navbar-right">
          <p>Welcome,</p>
          <span className="user-name">{username}</span>
        </div>
      </nav>
      <SideBar isOpen={sidebarVisible} onClose={closeSidebar} onSignOut={handleSignOut} />
    </>
  );
};

export default Navbar;