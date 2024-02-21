import React, { useState } from 'react';
import './LoginSignup.css'; // Import CSS styles

function Login() {
  const [activeContainer, setActiveContainer] = useState('');

  const handleRegisterClick = () => {
    setActiveContainer('active');
  };

  const handleLoginClick = () => {
    setActiveContainer('');
  };

  return (
    <div className={`login-signup-container ${activeContainer}`}>
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${activeContainer}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className={`toggle-panel toggle-right ${activeContainer}`}>
            <h1>Hello, Student!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;