import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';
import NavBar from '../NavBar/NavBar';
import { useUser } from '../../UserContext';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [remainingWords, setRemainingFeedbackWords] = useState(500);
  const [feedbackError, setFeedbackError] = useState('');
  const { isAdmin } = useUser();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (isAdmin) {
      fetchFeedbackList();
    }
  }, [isAdmin]);

  useEffect(() => {
    const remaining = Math.max(0, 500 - feedback.length);
    setRemainingFeedbackWords(remaining);
  }, [feedback]);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    setFeedbackError('');
  };

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getFeedbackList');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback list:', error);
    }
  };

  const handleSendFeedback = async () => {
    try {
      await axios.post('http://localhost:8080/sendFeedback', { email: userEmail, message: feedback });
      setFeedback('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      setFeedbackError('You have reached your limit for sending feedback today, please try again later!');
    }
  };

  // Render nothing if isAdmin is null (initial state)
  if (isAdmin === null) {
    return null;
  }

  return (
    <div className="feedback-page">
      <NavBar />
      {isAdmin ? (
        // Admin interface
        <div className="admin-feedback-interface">
          <h1 className="interface-title">Users Feedback</h1>
          <div className="feedback-list">
            {feedbackList.map((item) => (
              <div key={item._id} className="feedback-item">{item.message}</div>
              
            ))}
          </div>
        </div>
      ) : (
        // User interface
        <div className="user-feedback-interface">
          <h1 className="interface-title">Provide us with your Feedback!</h1>
          <textarea
            className="feedback-input"
            value={feedback}
            onChange={handleFeedbackChange}
            onKeyDown={(e) => {
              if (feedback.length >= 500 && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            }}
          />
          <div className="remaining-feedback-characters">Characters Remaining: {remainingWords}</div>
          <button className="send-feedback-button" onClick={handleSendFeedback}>Send Feedback</button>
          {feedbackError && <div className="error-message-feedback">{feedbackError}</div>}
        </div>
      )}
    </div>
  );
};

export default Feedback;