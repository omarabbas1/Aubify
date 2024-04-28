import React, { useState } from "react";
import "./FAQ.css";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqData = [
    {
      question:
        "Can I apply as a transfer student to another major when I already have a bachelor degree?",
      answer:
        "If you already have a bachelor degree, then you will need to apply as second degree applicant.  Some of the credits taken in the bachelor degree will be transferred to your second degree per department approval",
    },
    {
      question:
        "Are there any scholarships or financial aid offered to students and what are the basis?",
      answer:
        "Different financial aid packages and scholarships are available at AUB. You may review the information and contact the Office of Financial Aid for details regarding your financial aid/scholarship questions.",
    },
    {
      question:
        "I am an AUB graduate and want to apply to AUB for a second degree, do I submit an application to the Office of Admissions like other second degree applicants?",
      answer:
        "AUB graduates who have been away from AUB for less than 2 years after graduation, must contact the Office of the Registrar on: <a href='mailto:registrar@aub.edu.lb'>registrar@aub.edu.lb</a> and inquire about their application for second degree.   For all other applicants, they need to submit their second degree application form at the Office of Admissions.",
    },
    {
      question:
        "What is the number of credits allowed in the faculty of arts and sciences?",
      answer:
        "Students may normally take up to 17 undergraduate credits or 9 graduate credits per semester (for a maximum of 2 terms).",
    },
    {
      question: "What diplomas are currently offered at AUB?",
      answer:
        "Some of the diplomas that we offer include: Teaching Diploma Program, Diploma in Special Education, Diploma in Educational Management and Leadership",
    },
    {
      question:
        "What do I do if a course I want to take is full? How can I open capacity?",
      answer:
        "If a course you want to enroll in is full, you must ask the chairperson of the department the course is given at to open capacity for you.",
    },
    {
      question: "Can undergraduates take graduate courses?",
      answer:
        "Senior undergraduate students in good academic standing can take graduate classes through submitting a petition which requires the consent of the academic adviser and the course instructor.",
    },
    {
      question: "How can I audit a course? Will it appear on my transcript?",
      answer:
        "To audit a course, you must get in touch with the course instructor and obtain their approval. An audited course does not appear on your transcript or count towards your credits.",
    },
    {
      question: "What is the University's policy on student housing?",
      answer:
        "To be eligible to live in AUB Student Housing facilities, you must be enrolled as full/part time student for the Academic Year you are applying to dorms. While all registered AUB students are entitled to apply for accommodation in AUB students' residences, room reservation is processed according to priority criteria.",
    },
    {
      question:
        "What is the difference between a double major and a dual degree?",
      answer:
        "A dual degree is when you are pursuing two majors which have different degree structures. You can have a dual degree within the same faculty or from two different faculties Distinctively, a double major is when you pursue two majors with the same degree structure",
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <NavBar />
      <SideBar />
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {/* Map through the FAQ data to render questions and answers */}
        {faqData.map((item, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleAnswer(index)}
          >
            <div className="question-container">
              <span className="question">{item.question}</span>
              <span className="expand-icon">
                {expandedIndex === index ? "-" : "+"}
              </span>
            </div>
            {expandedIndex === index && (
              <div
                className="answer"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
