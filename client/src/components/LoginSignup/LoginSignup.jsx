import React, { useState } from 'react';
import './LoginSignup.css'; // Import CSS styles

function Login() {
  const [activeContainer, setActiveContainer] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegisterClick = () => {
    setActiveContainer('active');
    setSignupError('');
  };

  const handleLoginClick = () => {
    setActiveContainer('');
    setLoginError('');
  };

  const checkUserExists = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/checkUserExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      return data.exists; // Assuming the response contains a boolean value indicating user existence
    } catch (error) {
      console.error('Error checking user existence:', error);
      // Handle error, such as displaying a generic error message to the user
      return false;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setSignupError('');

    // Check if name is empty
    if (!signupName.trim()) {
      setSignupError('Name is required.');
      return;
    }

    // Client-side validation
    if (!isValidEmail(signupEmail)) {
      setSignupError('Invalid email format.');
      return;
    }
    if (!isValidPassword(signupPassword)) {
      setSignupError('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.');
      return;
    }

    // Check if user already exists
    const userExists = await checkUserExists(signupEmail);
    if (userExists) {
      setSignupError('User already exists. Please login.');
      return;
    }

    // Proceed with signup if all validations pass
    // You can implement your signup logic here
  
    // Clear the input fields and reset the error after successful signup
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setLoginError('');

    // Check if user exists
    const userExists = await checkUserExists(loginEmail);
    if (!userExists) {
      setLoginError('User does not exist. Please sign up.');
      return;
    }

    // Proceed with login if user exists
    // You can implement your login logic here
  };

  const handlePasswordChange = (e) => {
    setSignupPassword(e.target.value);
    // Clear previous errors when password is being corrected
    setSignupError('');
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-z]{3}\d{2,3}@mail\.aub\.edu$/;
    return emailRegex.test(email);
  };

  // Function to validate password format
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[,~!@#$%^&*()[\]{}:;"'.,<>?/|])[A-Za-z\d,~!@#$%^&*()[\]{}:;"'.,<>?/|]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className={`login-signup-container ${activeContainer}`}>
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} />
          <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={signupPassword} onChange={handlePasswordChange} />
          <button type="submit">Sign Up</button>
          {signupError && <p className="error">{signupError}</p>}
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <button type="submit">Sign In</button>
          {loginError && <p className="error">{loginError}</p>}
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