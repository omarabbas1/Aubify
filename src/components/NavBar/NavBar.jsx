import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './NavBar.css';
import SideBar from '../SideBar/SideBar';
import axios from 'axios'; // Import axios for making HTTP requests

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState(''); // Initialize state for user avatar
  const location = useLocation();

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchAvatar();
  }, []);
  

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    window.history.replaceState(null, '', '/');
    window.onpopstate = () => {
      navigate('/');
      window.history.replaceState(null, '', '/');
    };
  };

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/avatar?email=${userEmail}`);
      const avatarUrl = response.data.avatarUrl;
      if (avatarUrl) {
        setUserAvatar(avatarUrl);
      }
    } catch (error) {
      console.error('Failed to fetch avatar:', error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  // const isAuthenticated = () => {
  //   return username !== null && username.trim() !== '';
  // };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left" onClick={toggleSidebar}>
          <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" />
          <span className="website-name">Aubify</span>
        </div>
        <div className="navbar-center">
          {location.pathname === '/homepage' && (
            <input type="text" placeholder="Search..." onChange={handleSearch} />
          )}
        </div>
        <div className="navbar-right">
            {userAvatar && <img src={userAvatar} alt="User Avatar" className="user-avatar-home" />}
            <div className='navbar-name'>
              <span className="user-name">{username}</span>
            </div>
        </div>
      </nav>
      <SideBar isOpen={sidebarVisible} onClose={closeSidebar} onSignOut={handleSignOut} />
    </>
  );
};

export default Navbar;