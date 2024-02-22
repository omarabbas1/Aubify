import React from 'react';
import { Link } from 'react-router-dom';
import './VerificationSuccess.css';

function VerificationSuccess() {
  return (
    <div className="verification-success-container">
      <h1>Verification Successful!</h1>
      <p>Your email has been successfully verified.</p>
      <Link to="/" className="home-link">Go to Homepage</Link>
    </div>
  );
}

export default VerificationSuccess;