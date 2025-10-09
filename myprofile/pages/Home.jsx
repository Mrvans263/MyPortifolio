import React from "react";
import "./Home.css";
import picture from "./picture.jpg";

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <div className="home-text">
          <h1>Hello, I'm <span>Evans Chauke</span></h1>
          <p>
            I am a First Year student of <strong>Mechatronics and Robotics</strong> at RTU MIREA  
            <strong> (Russian Technological University) </strong> in Moscow, Russia. I am passionate about about using technology to solve real-world problems and create innovative solutions.
          </p>
          <a href="#projects" className="btn">View My Work</a>
        </div>

        <div className="home-image">
          <img src={picture} alt="Evans Chauke" />
        </div>
      </div>
    </section>
  );
};

export default Home;
