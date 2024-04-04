import React  from 'react';
import { useNavigate, } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ isOpen, onClose, onSignOut }) => {
    const navigate = useNavigate();

    const handleReturnToHomepage = () => {
        navigate('/homepage'); 
    };

    const handleNavigateToFAQ = () => {
        navigate('/faq');
    };

    const handleNavigateToUserProfile = ()=>{
        navigate('/userprofile');
    };

    const handleNavigateToFeedback = () => {
        navigate('/feedback');
    };

    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar-header">
                <h2>Menu</h2>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <ul>
                <li><button className="menu-option" onClick={handleNavigateToUserProfile}>User Profile</button></li>
                <li><button className="menu-option" onClick={handleNavigateToFAQ}>FAQ</button></li>
                <li><button className="menu-option" onClick={handleNavigateToFeedback}>Feedback</button></li>
                <li><button className="menu-option" onClick={handleReturnToHomepage}>Return to Homepage</button></li>
                <li><button className="menu-option" onClick={onSignOut}>Sign Out</button></li>
            </ul>
        </div>
    );
}

export default SideBar;