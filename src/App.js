import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Adjust if your file has a different name
import SigninSignup from './components/SigninSignup/SigninSignup';
import EmailVerification from './components/EmailVerification/EmailVerification';
import VerificationSuccess from './components/EmailVerification/VerificationSuccess';
import HomePage from './components/HomePage/HomePage';
import CommentPage from './components/CommentPage/CommentPage';
import FAQ from './components/FAQ/FAQ';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<SigninSignup/>}/>
          <Route path='/email_verification' element={<EmailVerification/>}/>
          <Route path='/verification_success' element={<VerificationSuccess/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='/posts/:postId/comments' element={<CommentPage/>}/>
          <Route path='/faq' element={<FAQ/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
