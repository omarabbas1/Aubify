import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './NavBar.css';
import SideBar from '../SideBar/SideBar';

const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/');
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
      </div>
    </nav>
    <SideBar isOpen={sidebarVisible} onClose={closeSidebar} onSignOut={handleSignOut}/>
     </>
  );
};

export default Navbar;