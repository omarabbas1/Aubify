import React from 'react';
import './NavBar.css';

const Navbar = ({ websiteName, userName }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src= "/aubify-logo.jpg" alt="Logo" className="navbar-logo" /> 
        <span className="website-name">{websiteName}</span> 
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search..." /> {/* Add the search bar input. It does nothing now just to display it for observation */}
      </div>
      <div className="navbar-right">
        <span className="user-name">{userName}</span> 
        <button className="sign-out-button" disabled>Sign Out</button> {/* Just a button till now it is disabled until we fix the token */}
      </div>
    </nav>
  );
};

export default Navbar;
