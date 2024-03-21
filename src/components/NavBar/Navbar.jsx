import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleSearch = (event) => {
    // Implement search functionality here
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/aubify-logo.jpg" alt="Logo" className="navbar-logo" /> 
        <span className="website-name">Aubify</span> 
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </div>
      <div className="navbar-right">
        <span className="user-name">Welcome, {username}!</span> 
        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;