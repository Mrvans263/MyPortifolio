import React from "react";
import "./About.css";
import aboutImg from "./about.jpg"; // replace with your real image path
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImg} alt="Evans Chauke" />
        </div>

        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I'm <strong>Evans Chauke</strong>, Having <strong>realized how technology has an impact on our daily lives</strong> 
            <strong> l take the harsh reality of learning how to use technology patiently</strong> I am interested in learning, listening from people who experience day to day challenges and try to connect it with what i am learning, in order to find innovative solutions
            
          </p>
          <p>
            I enjoy working on projects that combine automation, design, and code
            — bringing intelligent systems and interactive experiences to life.
          </p>

          <Link to="/contact" className="btn">Get In Touch</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
