import React, { useState } from 'react';
import './EmailVerification.css';

function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous error messages
    setVerificationError('');

    try {
      // Make a request to your backend to verify the code
      const response = await fetch('http://localhost:8080/verifyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      // If verification is successful, you can redirect the user to a success page
      window.location.href = '/verification_success';
    } catch (error) {
      console.error('Error verifying email:', error);
      setVerificationError('Verification failed. Please try again.');
    }
  };

  return (
    <div className="verification-container">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="verificationCode">Enter the verification code sent to your email:</label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit">Verify Email</button>
      </form>
      {verificationError && <p className="error">{verificationError}</p>}
    </div>
  );
}

export default EmailVerification;