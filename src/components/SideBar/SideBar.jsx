import React  from 'react';
import { useNavigate, } from 'react-router-dom';
import './SideBar.css'; // Import your CSS file for styling

const SideBar = ({ isOpen, onClose, onSignOut }) => {
    const navigate = useNavigate();

    const handleReturnToHomepage = () => {
        navigate('/homepage'); 
    };

    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar-header">
                <h2>Menu</h2>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <ul>
                <li><button className="menu-option" onClick={() => console.log('User Profile clicked')}>User Profile</button></li>
                <li><button className="menu-option" onClick={() => console.log('FAQ clicked')}>FAQ</button></li>
                <li><button className="menu-option" onClick={handleReturnToHomepage}>Return to Homepage</button></li>
                <li><button className="menu-option" onClick={onSignOut}>Sign Out</button></li>
            </ul>
        </div>
    );
}

export default SideBar;

