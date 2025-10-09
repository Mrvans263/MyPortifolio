import React, { useState, useRef, useEffect } from "react";
import "./ProjectsAndSkills.css";
import universalLanguages from "./universallanguages.jpg"; 
import webdev from "./webdev.jpg";
import roboticdog from "./roboticdog.jpg";
import pending from "./pending.jpg";

const SkillsAndProjects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const galleryRef = useRef(null);

  const skills = {
    spoken: ["English", "Russian", "Tsonga"],
    programming: ["Python", "JavaScript", "C", "C++", "HTML", "CSS"],
    others: ["PowerPoint"],
    dataStructures: ["Solved 'Trapping Rain Water' Algorithm"],
  };

  const projects = [
    {
      title: "Web Development Portfolio",
      description: "Building my personal portfolio website to showcase my projects and skills as a developer.",
      image: webdev,
      status: "started"
    },
    {
      title: "Universal Languages",
      description: "Ever since you began learning a language, imagine if there was a tool to remind you all words you learned? I'm using forgetting algorithms to interrupt your forgetting curve.",
      image: universalLanguages,
      status: "started"
    },
    {
      title: "Robotic Dog",
      description: "A robotics project focused on developing a walking robotic dog with sensors and control logic.",
      image: roboticdog,
      status: "pending"
    },
    {
      title: "Upcoming Projects",
      description: "More innovative systems and smart technology solutions coming soon.",
      image: pending,
      status: "pending"
    }
  ];

  const handleMouseEnter = (index) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredProject(index);
  };

  const handleMouseLeave = (index) => {
    // Add a small delay before removing hover to allow for movement between hexagons
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
    }, 150); // 150ms delay
  };

  const handleHexClick = (index) => {
    setActiveProject(index);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Hexagonal grid configuration
  const n_rows = 2;
  const n_cols_min = 2;
  const n_cols_max = n_cols_min + 1;
  const n_cols_sum = n_cols_max + n_cols_min;
  const n = Math.ceil(.5*n_rows)*n_cols_min + Math.floor(.5*n_rows)*n_cols_max;

  return (
    <section className="skills-projects">
      <h2>Skills & Projects</h2>

      {/* SKILLS SECTION */}
      <div className="skills-section">
        <div className="skill-card">
          <h3>Languages I Speak</h3>
          <div className="skill-tags">
            {skills.spoken.map((lang) => (
              <span key={lang} className="skill-tag">{lang}</span>
            ))}
          </div>
        </div>

        <div className="skill-card">
          <h3>Programming Languages</h3>
          <div className="skill-tags">
            {skills.programming.map((lang) => (
              <span key={lang} className="skill-tag">{lang}</span>
            ))}
          </div>
        </div>

        <div className="skill-card">
          <h3>Other Skills</h3>
          <ul>
            {skills.others.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="skill-card">
          <h3>Data Structures & Algorithms</h3>
          <ul>
            {skills.dataStructures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* HEXAGONAL PROJECTS GALLERY */}
      <div className="projects-section">
        <h3>Projects Gallery</h3>
        
        <div className="hexagonal-gallery" ref={galleryRef}>
          <div 
            className="hex-grid"
            style={{
              '--n-rows': n_rows,
              '--n-cols': 2 * n_cols_max
            }}
          >
            {/* CSS for alternating columns */}
            <style>
              {`.hex-cell:nth-of-type(${n_cols_sum}n + 1) { grid-column-start: 2 }`}
            </style>
            
            {Array.from({ length: n }).map((_, i) => {
              const projectIndex = i % projects.length;
              const project = projects[projectIndex];
              const isHovered = hoveredProject === i;
              
              return (
                <div 
                  key={i}
                  className={`hex-cell ${isHovered ? 'hovered' : ''} ${activeProject === i ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  onClick={() => handleHexClick(i)}
                >
                  <img src={project.image} alt={project.title} />
                  <div className="hex-overlay">
                    <div className="hex-content">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <span className={`status-badge ${project.status}`}>
                        {project.status === "started" ? "In Progress" : "Coming Soon"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Details Modal */}
        {activeProject !== null && (
          <div 
            className="project-modal"
            onClick={() => setActiveProject(null)}
          >
            <div 
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-btn"
                onClick={() => setActiveProject(null)}
              >
                ×
              </button>
              <img 
                src={projects[activeProject % projects.length].image} 
                alt={projects[activeProject % projects.length].title} 
              />
              <div className="modal-details">
                <h3>{projects[activeProject % projects.length].title}</h3>
                <p>{projects[activeProject % projects.length].description}</p>
                <span className={`status-badge ${projects[activeProject % projects.length].status}`}>
                  {projects[activeProject % projects.length].status === "started" ? "In Progress" : "Coming Soon"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsAndProjects;