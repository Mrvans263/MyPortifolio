import React from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import picture from "./picture.jpg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Evans Chauke</title>
        <meta
          name="description"
          content="Welcome to the portfolio of Evans Chauke — Mechatronics & Robotics student at RTU MIREA. Explore engineering projects, robotics, and software development."
        />
        <meta property="og:title" content="Evans Chauke Portfolio" />
        <meta
          property="og:description"
          content="Explore projects and skills of Evans Chauke, Mechatronics & Robotics student at RTU MIREA."
        />
        <meta
          property="og:image"
          content="https://mrvans.vercel.app/preview.jpg"
        />
        <meta property="og:url" content="https://mrvans.vercel.app" />
      </Helmet>

      <section className="home">
        <div className="home-content">

          <div className="home-text">
            <h1>
              Hello, I'm <span>Evans Chauke</span>
            </h1>
            <p>
              I am a first-year student of <strong>Mechatronics and Robotics</strong> at
              RTU MIREA (Russian Technological University) in Moscow. I am
              passionate about using technology to solve real-world problems and
              create innovative engineering solutions.
            </p>
            <Link to="/projects" className="btn">
              View My Work
            </Link>
          </div>

          <div className="home-image">
            <img src={picture} alt="Portrait of Evans Chauke" />
          </div>

        </div>
      </section>
    </>
  );
}
