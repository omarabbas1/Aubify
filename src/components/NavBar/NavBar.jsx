import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './NavBar.css';
import SideBar from '../SideBar/SideBar';

const Navbar = ({ showChangePassword }) => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    // Remove the username from local storage
    localStorage.removeItem('username');
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
    // Implement search functionality here
  };
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const handleNavigateToChangePassword = () => {
    // Navigate the user to the change password page
    navigate('/changepassword');
  }

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left" onClick={toggleSidebar}>
        <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" /> 
        <span className="website-name">Aubify</span> 
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
      <div className="navbar-right">
        <span className="user-name">Welcome, {username}!</span> 
        {showChangePassword && location.pathname === '/userprofile' && ( // Conditionally render change password button
          <button className="change-password-button" onClick={handleNavigateToChangePassword}>Change Password</button>
        )}
      </div>
    </nav>
    <SideBar isOpen={sidebarVisible} onClose={closeSidebar} onSignOut={handleSignOut}/>
    </>
  );
}; 

export default Navbar;