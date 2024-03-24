import React from 'react';
import './ChangePassword.css';
import NavBar from '../NavBar/NavBar';

const ChangePassword = () => {
  return (
    <div className="change-password-container">
        <NavBar/>
        <h1>Change Password</h1>
        <form className="password-form">
            <div className="form-group">
                <label htmlFor="old-password">Old Password:</label>
                <input type="password" id="old-password" name="old-password" />
            </div>
            <div className="form-group">
                <label htmlFor="new-password">New Password:</label>
                <input type="password" id="new-password" name="new-password" />
            </div>
            <button type="submit" className='change-password-button'>Submit</button>
        </form>
    </div>
  );
};

export default ChangePassword;