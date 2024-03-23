import React, { useState } from 'react';
import './FAQ.css';
import NavBar from '../NavBar/NavBar';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question: 'Can I apply as a transfer student to another major when I already have a bachelor degree?',
      answer: 'If you already have a bachelor degree, then you will need to apply as second degree applicant.  Some of the credits taken in the bachelor degree will be transferred to your second degree per department approval',
    },
    {
      question: 'How do I pay my tuition fees?',
      answer: 'The tuition payment will appear on the AUBsis web statement of fees once you have registered for your spring courses. Print the Web statement of fees from your AUBsis, and refer to the Payment module posted in the Moodle section for the different methods of payment. Please note that payment of fees by Credit Cards or Travellers Cheques are currently not accepted. For any additional inquiries regarding the payment of tuition fees, kindly contact jm52@aub.edu.lb or re96@aub.edu.lb',
    },
    {
      question: 'I am an AUB graduate and want to apply to AUB for a second degree, do I submit an application to the Office of Admissions like other second degree applicants?',
      answer: 'AUB graduates who have been away from AUB for less than 2 years after graduation, must contact the Office of the Registrar on: registrar@aub.edu.lb and inquire about their application for second degree.   For all other applicants, they need to submit their second degree application form at the Office of Admissions.',
    },
    {
      question: 'What is the number of credits allowed in the faculty of arts and sciences?',
      answer: 'Students may normally take up to 17 undergraduate credits or 9 graduate credits per semester (for a maximum of 2 terms).',
    },
    {
      question: 'What diplomas are currently offered at AUB?',
      answer: 'Some of the diplomas that we offer include: \n-Teaching Diploma Program \n-Diploma in Special Education \n-Diploma in Educational Management and Leadership',
    },
    {
      question: 'What do I do if a course I want to take is full? How can I open capacity?',
      answer: 'If a course you want to enroll in is full, you must ask the chairperson of the department the course is given at to open capacity for you.',
    },
    {
      question: 'Can undergraduates take graduate courses?',
      answer: 'Senior undergraduate students in good academic standing can take graduate classes through submitting a petition which requires the consent of the academic adviser and the course instructor.',
    },
    {
      question: 'How can I audit a course? Will it appear on my transcript?',
      answer: 'To audit a course, you must get in touch with the course instructor and obtain their approval. An audited course does not appear on your transcript or count towards your credits.',
    },
    {
      question: 'What is the University\'s policy on student housing?',
      answer: 'To be eligible to live in AUB Student Housing facilities, you must be enrolled as full/part time student for the Academic Year you are applying to dorms. While all registered AUB students are entitled to apply for accommodation in AUB students\' residences, room reservation is processed according to priority criteria.',
    },
    {
      question: 'What is the difference between a double major and a dual degree?',
      answer: 'A dual degree is when you are pursuing two majors which have different degree structures. You can have a dual degree within the same faculty or from two different faculties Distinctively, a double major is when you pursue two majors with the same degree structure',
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <NavBar/>
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
            {/* Map through the FAQ data to render questions and answers */}
            {faqData.map((item, index) => (
            <div key={index} className="faq-item" onClick={() => toggleAnswer(index)}>
                <div className="question-container">
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