import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css'; // Import CSS file
import NavBar from '../NavBar/NavBar';

const Feedback = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [remainingWords, setRemainingFeedbackWords] = useState(500);

  useEffect(() => {
    // Check if the admin status is stored in local storage
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus !== null) {
      setIsAdmin(adminStatus === 'true');
    } else {
      // If not found in local storage, default to false
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
        fetchFeedbackList();
    }
  }, []);

  useEffect(() => {
    // Update remaining characters count when content changes
    const remaining = Math.max(0, 500 - feedback.length);
    setRemainingFeedbackWords(remaining);
  }, [feedback]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const fetchFeedbackList = async () => {
    try {
      // Fetch feedback data from the backend
      const response = await axios.get('http://localhost:8080/getFeedbackList');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback list:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  const handleSendFeedback = async () => {
    try {
      // Send the feedback to the backend
      await axios.post('http://localhost:8080/sendFeedback', { feedback });
      // Clear the feedback input after sending
      setFeedback('');
      // Optionally, you can show a success message or trigger a reload of feedback data
    } catch (error) {
      console.error('Error sending feedback:', error);
      // Handle error, such as displaying an error message to the user
    }
  };

  return (
    <div className="feedback-page">
        <NavBar/>
      {isAdmin ? (
        // Admin interface
        <div className="admin-feedback-interface">
          <h1 className="interface-title">Users Feedback</h1>
          <ul className="feedback-list">
            {feedbackList.map((item) => (
              <li key={item.id} className="feedback-item">{item.message}</li>
            ))}
          </ul>
        </div>
      ) : (
        // User interface
        <div className="user-feedback-interface">
          <h1 className="interface-title">Provide us with your Feedback!</h1>
          <textarea className="feedback-input" value={feedback} onChange={handleFeedbackChange} onKeyDown={(e) => {
            if (feedback.length >= 500 && e.key !== 'Backspace' && e.key !== 'Delete') {
              e.preventDefault();
            }
          }}/>
          <div className="remaining-feedback-characters">Characters Remaining: {remainingWords}</div>
          <button className="send-feedback-button" onClick={handleSendFeedback}>Send Feedback</button>
        </div>
      )}
    </div>
  );
};

export default Feedback;