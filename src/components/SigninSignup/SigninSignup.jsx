import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SigninSignup.css';

function SigninSignup({ user, setUser }) {
  const [activeContainer, setActiveContainer] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinError, setSigninError] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setActiveContainer('active');
    setSignupError('');
  };

  const handleSigninClick = () => {
    setActiveContainer('');
    setSigninError('');
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

  const checkPassword = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/checkPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      return data.correctPassword; // Assuming the response contains a boolean value indicating password correctness
    } catch (error) {
      console.error('Error checking password:', error);
      // Handle error, such as displaying a generic error message to the user
      return false;
    }
  };

  // const getToken = async (email, password) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/getToken', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email, password })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok.');
  //     }

  //     const data = await response.json();
  //     return data.accessToken; // Assuming the response contains the access token
  //   } catch (error) {
  //     console.error('Error fetching token:', error);
  //     // Handle error, such as displaying a generic error message to the user
  //     return null;
  //   }
  // };

  const saveUserData = async (name, email, password) => {
    try {
      const userData = { name, email, password };
      const response = await fetch('http://localhost:8080/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
  
      // Handle success if needed
      console.log('User data saved successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle error, such as displaying a generic error message to the user
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
      setSignupError('Invalid email format. Please use your AUB student email.');
      return;
    }
    if (!isValidPassword(signupPassword)) {
      setSignupError('Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.');
      return;
    }

    // Check if user already exists
    const userExists = await checkUserExists(signupEmail);
    if (userExists) {
      setSignupError('User already exists. Please Signin.');
      return;
    }

    // Proceed with signup if all validations pass
    // You can implement your signup logic here
  
    // Redirect to email verification page after successful signup
    navigate('/email-verification'); // Use useNavigate to redirect

    // Store user data in the user state after successful signup
    // setUser({ email: signupEmail, password: signupPassword });

    // Save user data to the backend
    await saveUserData(signupName, signupEmail, signupPassword);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    // Clear previous errors
    setSigninError('');

    // Client-side validation
    if (!isValidEmail(signinEmail)) {
      setSigninError('Invalid email format. Please use your AUB student email.');
      return;
    }

    // Check if user exists
    const userExists = await checkUserExists(signinEmail);
    if (!userExists) {
      setSigninError('User does not exist. Please sign up.');
      return;
    }

    const correctPassword = await checkPassword(signinEmail, signinPassword);
    if (!correctPassword) {
      setSigninError('Incorrect password.');
      return;
    }

    // Proceed with login if user exists and password is correct
    // You can implement your login logic here
    // const token = await getToken(signinEmail, signinPassword);
    // if (token) {
    //   // Store token in localStorage
    //   window.localStorage.setItem('token', token);
    //   // Store user data in the user state after successful sign-in
    //   setUser({ email: signinEmail, password: signinPassword });
    //   // Redirect to home page after successful sign-in
    //   navigate('/homepage');
    // }
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
    <div className={`signin-signup-container ${activeContainer}`}>
      <div className="form-container sign-up">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
          <input type="email" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={signupPassword} onChange={handlePasswordChange} required />
          <button type="submit">Sign Up</button>
          {signupError && <p className="error">{signupError}</p>}
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSignin}>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} required />
          <button type="submit">Sign In</button>
          {signinError && <p className="error">{signinError}</p>}
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${activeContainer}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={handleSigninClick}>Sign In</button>
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

export default SigninSignup;