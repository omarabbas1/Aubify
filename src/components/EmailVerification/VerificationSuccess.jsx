import React from "react";
import { Link } from "react-router-dom";
import "./VerificationSuccess.css";

function VerificationSuccess() {
  return (
    <div className="vs-wrapper">
      <div className="verification-success-container">
        <h1>Verification Successful!</h1>
        <p>Your email has been successfully verified.</p>
        <Link to="/homepage" className="home-link">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default VerificationSuccess;
