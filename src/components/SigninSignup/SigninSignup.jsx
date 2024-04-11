import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SigninSignup.css';
import { useUser } from '../../UserContext'; // Go up two levels

function SigninSignup({ user, setUser }) {
  const [activeContainer, setActiveContainer] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinError, setSigninError] = useState('');
  const { setUsername, setIsAdmin } = useUser();
  const navigate = useNavigate();

    // Function to check if the user is an admin based on email
    const isAdminUser = (email) => {
      const adminEmails = ['ofa15@mail.aub.edu', 'hmh97@mail.aub.edu']; // Define admin emails
      return adminEmails.includes(email); // Check if email is in the admin list
    };

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

  const checkUserVerified = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/checkUserVerified', {
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
      return data.isVerified; // Assuming the response contains a boolean value indicating user verification status
    } catch (error) {
      console.error('Error checking user verification status:', error);
      // Handle error, such as displaying a generic error message to the user
      return false;
    }
  };  

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

    // Check if user is admin based on email
    const adminStatus = isAdminUser(signupEmail);
    setIsAdmin(adminStatus);
    // localStorage.setItem('isAdmin', adminStatus ? 'true' : 'false');

    navigate('/email_verification');

    await saveUserData(signupName, signupEmail, signupPassword);
    localStorage.setItem('userEmail', signupEmail);

    // After saving user data but before navigating
    try {
      const response = await fetch('http://localhost:8080/handleSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signupEmail }), // Use signupEmail here
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      if (data.success) {
        // Save username in localStorage
        localStorage.setItem('username', data.userName);
        setUsername(data.userName); // This assumes setUsername is the method to update context or state
        
        // Check if the user's email is verified
        if (data.emailVerified) {
          // Navigate to homepage or proceed as verified user
          navigate('/homepage');
        }
      } else {
        // Handle case where user data is not returned or another error occurred
        setSignupError(data.message || 'Failed to get user data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setSignupError('An error occurred. Please try again.');
    }
    

  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setSigninError(''); // Clear previous errors

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

    // Check if the password is correct
    const correctPassword = await checkPassword(signinEmail, signinPassword);
    if (!correctPassword) {
      setSigninError('Incorrect password.');
      return;
    }

    // Check if the user is verified
    const isVerified = await checkUserVerified(signinEmail);
    if (!isVerified) {
      navigate('/email_verification')
      return;
    }

    localStorage.setItem('userEmail', signinEmail);
    // Proceed with login if user exists, password is correct, and user is verified
    try {
      const response = await fetch('http://localhost:8080/handleSignin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: signinEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch username');
      }

      const data = await response.json();
      if (data.success && data.userName) {
        // Assuming setUsername updates the username in your global state/context
        setUsername(data.userName); // Update username in context with the name fetched from backend
        const username = data.userName; // Make sure to extract the username from the response or based on your logic
        localStorage.setItem('username', username); // Save username to localStorage

        // Check if user is admin based on email
        const adminStatus = isAdminUser(signinEmail);
        setIsAdmin(adminStatus);
        // localStorage.setItem('isAdmin', adminStatus ? 'true' : 'false');

        navigate('/homepage'); // Navigate to homepage after successful sign-in
      } else {
        // Handle case where username is not found or another error occurred
        setSigninError('Failed to get username. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      setSigninError('An error occurred. Please try again.');
    }
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
    <div className='signin-signup-main-container'>
      <div className={`signin-signup-container ${activeContainer}`}>
        <div className="form-container sign-up">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required maxLength={25} />
            <input type="email" placeholder="Email ~ AUBnet@mail.aub.edu" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
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
    </div>
  );
}

export default SigninSignup;