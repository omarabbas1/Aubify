import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext"; // Adjust if your file has a different name
import SigninSignup from "./components/SigninSignup/SigninSignup";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import VerificationSuccess from "./components/EmailVerification/VerificationSuccess";
import HomePage from "./components/HomePage/HomePage";
import CommentPage from "./components/CommentPage/CommentPage";
import FAQ from "./components/FAQ/FAQ";
import UserProfile from "./components/UserProfile/UserProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Feedback from "./components/Feedback/Feedback";
import Report from "./components/Report/Report";
import SharePage from "./components/SharePage/SharePage";
import PostPage from "./components/PostPage/PostPage";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "https://aubify.onrender.com/";
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SigninSignup />} />
          <Route path="/email_verification" element={<EmailVerification />} />
          <Route
            path="/verification_success"
            element={<VerificationSuccess />}
          />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/posts/:postId/comments" element={<CommentPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/report" element={<Report />} />
          <Route path="/posts/:postId/share" element={<SharePage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
