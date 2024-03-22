import React, { useState } from 'react';
import './FAQ.css';
import Navbar from '../NavBar/Navbar';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: 'Question 1: What is Lorem Ipsum?',
      answer: 'Answer 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Question 2: Why do we use it?',
      answer: 'Answer 2: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      question: 'Question 3: Where does it come from?',
      answer: 'Answer 3: Contrary to popular belief, Lorem Ipsum is not simply random text.',
    },
    {
      question: 'Question 4: Where can I get some?',
      answer: 'Answer 4: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.',
    },
    {
      question: 'Question 5: What is Lorem Ipsum?',
      answer: 'Answer 5: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Question 6: Why do we use it?',
      answer: 'Answer 6: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      question: 'Question 7: Where does it come from?',
      answer: 'Answer 7: Contrary to popular belief, Lorem Ipsum is not simply random text.',
    },
    {
      question: 'Question 8: Where can I get some?',
      answer: 'Answer 8: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.',
    },
    {
      question: 'Question 9: What is Lorem Ipsum?',
      answer: 'Answer 9: Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'Question 10: Why do we use it?',
      answer: 'Answer 10: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
            {/* Map through the FAQ data to render questions and answers */}
            {faqData.map((item, index) => (
            <div key={index} className="faq-item">
                <div className="question-container" onClick={() => toggleAnswer(index)}>
                <span className="question">{item.question}</span>
                <span className="expand-icon">{expandedIndex === index ? "-" : "+"}</span>
                </div>
                {expandedIndex === index && <div className="answer">{item.answer}</div>}
            </div>
            ))}
        </div>
    </div>
  );
};

export default FAQ;