import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact</h2>
      <div className="contact-links">
        <a
          href="mailto:youremail@example.com"
          className="contact-item"
        >
          📧 Email
        </a>
        <a
          href="https://wa.me/27663276702"
          className="contact-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
