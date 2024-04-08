import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import "./SideBar.css";

const SideBar = ({ isOpen, onClose, onSignOut }) => {
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

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <div className="sidebar-header"></div>
      <ul>
        <li>
          <button className="menu-option" onClick={handleNavigateToUserProfile}>
            User Profile
          </button>
        </li>
        <li>
          <button className="menu-option" onClick={handleNavigateToFAQ}>
            FAQ
          </button>
        </li>
        <li>
          <button className="menu-option" onClick={handleNavigateToFeedback}>
            Feedback
          </button>
        </li>
        {isAdmin && (
          <li>
            <button className="menu-option" onClick={handleNavigateToReport}>
              Report
            </button>
          </li>
        )}
        <li>
          <button className="menu-option" onClick={handleReturnToHomepage}>
            Return to Homepage
          </button>
        </li>
        <li>
          <button className="menu-option" onClick={onSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
