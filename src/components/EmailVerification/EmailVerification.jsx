import React, { useState } from "react";
import "./EmailVerification.css";
import axios from "axios";

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous error messages
    setVerificationError("");

    try {
      // Make a request to your backend to verify the code
      const response = await axios.post("/verifyEmail", { verificationCode });

      if (response.status !== 200) {
        throw new Error("Verification failed");
      }

      // If verification is successful, you can redirect the user to a success page
      window.location.href = "/verification_success";
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerificationError("Verification failed. Please try again.");
    }
  };

  return (
    <div className="ev-wrapper">
      <div className="verification-container">
        <h1 className="verification-title">Email Verification</h1>
        <form onSubmit={handleSubmit} className="verification-form">
          <label htmlFor="verificationCode" className="verification-label">
            Enter the verification code sent to your email:
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="verification-input"
          />
          <button type="submit" className="verification-button">
            Verify Email
          </button>
        </form>
        {verificationError && (
          <p className="verification-error">{verificationError}</p>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
