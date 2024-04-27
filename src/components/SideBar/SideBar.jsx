import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./SideBar.css";
import profileIcon from "../icons/profile.png";
import faqIcon from "../icons/faq.png";
import feedbackIcon from "../icons/feedback.png";
import reportIcon from "../icons/reportside.png";
import homeIcon from "../icons/home.png";
import signoutIcon from "../icons/signout.png";

const SideBar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useUser();

  const handleReturnToHomepage = () => {
    navigate("/homepage");
  };

  const handleNavigateToFAQ = () => {
    navigate("/faq");
  };

  const handleNavigateToUserProfile = () => {
    navigate("/userprofile");
  };

  const handleNavigateToFeedback = () => {
    navigate("/feedback");
  };

  const handleNavigateToReport = () => {
    navigate("/report");
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
    window.history.replaceState(null, "", "/");
    window.onpopstate = () => {
      navigate("/");
      window.history.replaceState(null, "", "/");
    };
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="menu-option" onClick={handleReturnToHomepage}>
          <img src={homeIcon} alt="home" className="sidebar-icons" />
          Home
        </div>
        <div className="menu-option" onClick={handleNavigateToFAQ}>
          <img src={faqIcon} alt="faq" className="sidebar-icons" />
          FAQ
        </div>
        <div className="menu-option" onClick={handleNavigateToFeedback}>
          <img src={feedbackIcon} alt="feedback" className="sidebar-icons" />
          Feedback
        </div>
        {isAdmin && (
          <div className="menu-option" onClick={handleNavigateToReport}>
            <img src={reportIcon} alt="report" className="sidebar-icons" />
            Report
          </div>
        )}
        <div className="menu-option" onClick={handleNavigateToUserProfile}>
          <img src={profileIcon} alt="profile" className="sidebar-icons" />
          My Profile
        </div>
        <div className="menu-option" onClick={handleSignOut}>
          <img src={signoutIcon} alt="signout" className="sidebar-icons" />
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default SideBar;
