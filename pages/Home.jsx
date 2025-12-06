import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // Switch to async version
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>Evans Chauke | Mechatronics & Robotics Student</title>
        <meta
          name="description"
          content="First-year Mechatronics & Robotics student at RTU MIREA Moscow. Passionate about robotics, engineering innovation, and software development."
        />
        <link rel="preload" as="image" href="/picture.jpg?w=400" />
      </Helmet>

      <section className="home">
        <div className="home-content">
          <div className="home-text">
            <h1 className="heading-animate">
              Innovating the Future with{" "}
              <span className="gradient-text">Robotics & AI</span>
            </h1>
            
            <div className="role-tags">
              <span className="tag">🤖 Robotics Engineer</span>
              <span className="tag">⚙️ Mechatronics Student</span>
              <span className="tag">💻 Software Developer</span>
            </div>
            
            <p className="intro-text">
              First-year <strong>Mechatronics & Robotics</strong> student at RTU MIREA in Moscow.
              Passionate about bridging hardware and software to create innovative engineering
              solutions that solve real-world problems.
            </p>
            
            <div className="stats">
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number">2</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Passionate</div>
              </div>
            </div>
            
            <div className="cta-buttons">
              <Link to="/projects" className="btn btn-primary">
                <span className="btn-icon">🚀</span>
                View My Projects
              </Link>
              <a href="#contact" className="btn btn-secondary">
                <span className="btn-icon">📧</span>
                Get In Touch
              </a>
            </div>
            
            <div className="scroll-hint">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>

          <div className="home-image">
            <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
              <img
                src="picture.jpg"
                alt="Evans Chauke - Mechatronics & Robotics Student"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className="profile-image"
              />
              <div className="image-overlay"></div>
              <div className="tech-badge">
                <span className="badge-icon">🤖</span>
                <span>RTU MIREA</span>
              </div>
            </div>
            
            <div className="floating-elements">
              <div className="floating-element">⚙️</div>
              <div className="floating-element">🔧</div>
              <div className="floating-element">💡</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}