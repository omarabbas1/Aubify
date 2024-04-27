import React, { useState, useEffect } from "react";
import "./ChangePassword.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrong, setPasswordStrong] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if confirm password matches new password
    setPasswordMatch(confirmPassword === newPassword);
  }, [confirmPassword, newPassword]);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError("");
    setPasswordStrong(isValidPassword(e.target.value));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentPassword === "") {
      setPasswordError("Please fill in your current password!");
      return;
    }

    // Check if current password matches the one in the database
    const currentPasswordMatch = await checkCurrentPassword(currentPassword);

    if (!currentPasswordMatch) {
      setPasswordError("Current password is incorrect.");
      return;
    }

    // Check if confirm password matches new password
    if (!passwordMatch) {
      return;
    }

    // Check if the new password meets strength criteria
    if (!passwordStrong) {
      setPasswordError(
        "New password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    // Check if current password and new password are the same
    if (currentPassword === newPassword) {
      setPasswordError(
        "New password cannot be the same as the current password."
      );
      return;
    }

    // Send the new password to the backend to save it in the database
    const email = localStorage.getItem("userEmail");
    await saveNewPassword(email, newPassword);
    navigate("/userprofile");
    // Optionally, handle success or failure after saving the new password
  };

  // Function to check if the current password matches the one in the database
  const checkCurrentPassword = async (password) => {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await axios.post("/checkCurrentPassword", {
        email,
        password,
      });
      return response.data.currentPasswordMatch;
    } catch (error) {
      console.error("Error checking current password:", error);
      return false;
    }
  };

  // Function to save the new password in the database
  const saveNewPassword = async (email, newPassword) => {
    try {
      await axios.post("/saveNewPassword", { email, newPassword });
      console.log("New password saved successfully.");
      // Optionally, handle success or failure after saving the new password
    } catch (error) {
      console.error("Error saving new password:", error);
      // Handle error, such as displaying a generic error message to the user
    }
  };

  // Function to validate password strength using regex
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[,~!@#$%^&*()[\]{}:;"'.,<>?/|])[A-Za-z\d,~!@#$%^&*()[\]{}:;"'.,<>?/|]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="change-password-page">
      <NavBar />
      <SideBar />
      <div className="change-password-container">
        <h1>Change Password</h1>
        <form className="password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button type="submit" className="change-password-button">
            Submit
          </button>
          {!passwordMatch && (
            <div className="error-message">Passwords do not match.</div>
          )}
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
