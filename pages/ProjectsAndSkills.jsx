import React, { useState, useRef, useEffect, useMemo, lazy, Suspense } from "react";
import "./ProjectsAndSkills.css";

// Lazy load images
const ImagePreloader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`image-container ${loaded ? 'loaded' : 'loading'}`}>
      {!loaded && (
        <div className="image-skeleton">
          <div className="loading-spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="lazy-image"
      />
    </div>
  );
};

const SkillsAndProjects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [skillsInView, setSkillsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const hoverTimeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);

  // Optimize skills data with useMemo
  const skills = useMemo(() => ({
    spoken: [
      { name: "English", level: 95, icon: "🇺🇸" },
      { name: "Russian", level: 85, icon: "🇷🇺" },
      { name: "Tsonga", level: 100, icon: "🇿🇼" }
    ],
    programming: [
      { name: "Python", level: 90, icon: "🐍", color: "#3776AB" },
      { name: "JavaScript", level: 85, icon: "⚡", color: "#F7DF1E" },
      { name: "C++", level: 80, icon: "⚙️", color: "#00599C" },
      { name: "C", level: 75, icon: "🔧", color: "#A8B9CC" },
      { name: "HTML/CSS", level: 95, icon: "🎨", color: "#E34F26" }
    ],
    technologies: [
      { name: "React", level: 88, icon: "⚛️" },
      { name: "Node.js", level: 82, icon: "🟢" },
      { name: "Git/GitHub", level: 90, icon: "📊" },
      { name: "Figma", level: 78, icon: "🎯" }
    ],
    interests: [
      { name: "Robotics", icon: "🤖" },
      { name: "Machine Learning", icon: "🧠" },
      { name: "IoT", icon: "📡" },
      { name: "Computer Vision", icon: "👁️" }
    ]
  }), []);

  // Optimize projects data with useMemo
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Web Development Portfolio",
      description: "Building my personal portfolio website to showcase my projects and skills as a developer.",
      longDescription: "A fully responsive portfolio built with React, featuring modern animations, performance optimizations, and SEO best practices. Implemented lazy loading, image optimization, and progressive web app features.",
      image: "/webdev.jpg?w=400",
      status: "started",
      technologies: ["React", "CSS3", "JavaScript", "Vercel"],
      github: "#",
      demo: "#",
      category: "web",
      progress: 85
    },
    {
      id: 2,
      title: "Universal Languages",
      description: "Using forgetting algorithms to optimize language learning through spaced repetition.",
      longDescription: "A language learning platform that uses the forgetting curve algorithm to determine optimal review times. Features include progress tracking, vocabulary management, and personalized learning paths.",
      image: "/universallanguages.jpg?w=400",
      status: "started",
      technologies: ["Python", "React", "PostgreSQL", "Docker"],
      github: "#",
      demo: "#",
      category: "ai",
      progress: 60
    },
    {
      id: 3,
      title: "Robotic Dog",
      description: "Developing a walking robotic dog with sensors and autonomous control logic.",
      longDescription: "A quadruped robot with 12 degrees of freedom, featuring computer vision for object detection, SLAM for navigation, and reinforcement learning for gait optimization. Built using ROS and Python.",
      image: "/roboticdog.jpg?w-400",
      status: "pending",
      technologies: ["ROS", "Python", "OpenCV", "Arduino"],
      github: null,
      demo: null,
      category: "robotics",
      progress: 20
    },
    {
      id: 4,
      title: "Smart Home System",
      description: "IoT-based home automation with energy monitoring and AI predictions.",
      longDescription: "A comprehensive smart home solution featuring real-time energy monitoring, predictive maintenance, voice control integration, and automated routines based on machine learning patterns.",
      image: "/pending.jpg?w=400",
      status: "planning",
      technologies: ["IoT", "Python", "React Native", "AWS"],
      github: null,
      demo: null,
      category: "iot",
      progress: 10
    },
    {
      id: 5,
      title: "Algorithm Visualizer",
      description: "Interactive visualization of data structures and sorting algorithms.",
      longDescription: "An educational tool that visually demonstrates how various algorithms work, including sorting, searching, and graph algorithms. Features adjustable speed, step-by-step execution, and code highlighting.",
      image: "/pending.jpg?w=400",
      status: "planning",
      technologies: ["JavaScript", "D3.js", "React", "Algorithms"],
      github: null,
      demo: null,
      category: "education",
      progress: 5
    }
  ], []);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const progress = 1 - Math.max(0, Math.min(1, (rect.top + rect.height) / viewHeight));
        setScrollProgress(progress);
      }
    };

    // Intersection Observer for skills animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Clean up timeout
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredProject(index);
  };

  const handleMouseLeave = (index) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null);
    }, 100);
  };

  const handleHexClick = (index) => {
    setActiveProject(index);
  };

  // Filter projects by category
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(project => project.category === activeFilter);
  }, [projects, activeFilter]);

  // Hex grid configuration
  const hexConfig = useMemo(() => {
    const count = filteredProjects.length;
    return {
      rows: Math.ceil(count / 3),
      cols: Math.min(3, count)
    };
  }, [filteredProjects]);

  return (
    <section className="skills-projects" ref={sectionRef}>
      {/* Animated Background Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="container">
        {/* Section Header with Scroll Progress */}
        <div className="section-header">
          <div className="title-wrapper">
            <span className="section-subtitle">What I Do</span>
            <h2 className="section-title">
              Skills & <span className="gradient-text">Projects</span>
            </h2>
            <div className="scroll-indicator">
              <div 
                className="scroll-progress" 
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="section-description">
            Combining technical expertise with innovative projects to solve real-world problems
          </p>
        </div>

        {/* SKILLS SECTION with Animation */}
        <div className="skills-container" ref={skillsRef}>
          <div className="skills-header">
            <h3>Technical Expertise</h3>
            <div className="skill-categories">
              <button className="category-btn active">All</button>
              <button className="category-btn">Languages</button>
              <button className="category-btn">Frameworks</button>
              <button className="category-btn">Tools</button>
            </div>
          </div>

          <div className={`skills-grid ${skillsInView ? 'in-view' : ''}`}>
            {/* Programming Languages */}
            <div className="skill-category-card">
              <div className="category-header">
                <div className="category-icon">💻</div>
                <h4>Programming Languages</h4>
              </div>
              <div className="skill-levels">
                {skills.programming.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="skill-level-item"
                    style={{ '--animation-delay': `${index * 0.1}s` }}
                  >
                    <div className="skill-info">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-fill" 
                        style={{ 
                          width: `${skillsInView ? skill.level : 0}%`,
                          backgroundColor: skill.color
                        }}
                      >
                        <span className="skill-percent">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="skill-category-card">
              <div className="category-header">
                <div className="category-icon">🗣️</div>
                <h4>Languages I Speak</h4>
              </div>
              <div className="language-cards">
                {skills.spoken.map((language, index) => (
                  <div 
                    key={language.name} 
                    className="language-card"
                    style={{ '--animation-delay': `${index * 0.15}s` }}
                  >
                    <span className="language-flag">{language.icon}</span>
                    <div className="language-info">
                      <span className="language-name">{language.name}</span>
                      <div className="language-proficiency">
                        <div className="proficiency-dots">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`dot ${i < Math.floor(language.level / 20) ? 'active' : ''}`}
                            ></div>
                          ))}
                        </div>
                        <span className="proficiency-text">
                          {language.level >= 90 ? 'Fluent' : 
                           language.level >= 70 ? 'Advanced' : 'Intermediate'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="skill-category-card">
              <div className="category-header">
                <div className="category-icon">🛠️</div>
                <h4>Technologies & Tools</h4>
              </div>
              <div className="tech-tags">
                {skills.technologies.map((tech, index) => (
                  <div 
                    key={tech.name} 
                    className="tech-tag"
                    style={{ '--animation-delay': `${index * 0.1}s` }}
                  >
                    <span className="tech-icon">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                    <div className="tech-level">
                      <div 
                        className="tech-level-fill" 
                        style={{ width: `${skillsInView ? tech.level : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="skill-category-card">
              <div className="category-header">
                <div className="category-icon">🚀</div>
                <h4>Areas of Interest</h4>
              </div>
              <div className="interest-cloud">
                {skills.interests.map((interest, index) => (
                  <span 
                    key={interest.name}
                    className="interest-tag"
                    style={{ 
                      '--animation-delay': `${index * 0.2}s`,
                      '--size': `${0.8 + Math.random() * 0.4}rem`
                    }}
                  >
                    {interest.icon} {interest.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PROJECTS GALLERY with Filters */}
        <div className="projects-container">
          <div className="projects-header">
            <h3>Featured Projects</h3>
            <div className="project-filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Projects
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                onClick={() => setActiveFilter('web')}
              >
                Web Development
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'robotics' ? 'active' : ''}`}
                onClick={() => setActiveFilter('robotics')}
              >
                Robotics
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ai')}
              >
                AI/ML
              </button>
            </div>
          </div>

          {/* Hexagonal Grid */}
          <div className="hexagonal-gallery">
            <div 
              className="hex-grid"
              style={{
                '--grid-rows': hexConfig.rows,
                '--grid-cols': hexConfig.cols * 2
              }}
            >
              {filteredProjects.map((project, index) => {
                const isHovered = hoveredProject === index;
                const isActive = activeProject === index;
                
                return (
                  <div 
                    key={project.id}
                    className={`hex-cell ${isHovered ? 'hovered' : ''} ${isActive ? 'active' : ''}`}
                    style={{ '--cell-index': index }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() => handleHexClick(index)}
                  >
                    {/* Hexagon Border */}
                    <div className="hex-border"></div>
                    
                    {/* Project Image */}
                    <div className="hex-image">
                      <ImagePreloader src={project.image} alt={project.title} />
                      <div className="hex-overlay">
                        <div className="project-progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                          <span className="progress-text">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="hex-info">
                      <div className="project-meta">
                        <span className="project-category">{project.category}</span>
                        <span className={`project-status ${project.status}`}>
                          {project.status === 'started' ? '🚀 In Progress' :
                           project.status === 'pending' ? '⏳ Coming Soon' : '📝 Planning'}
                        </span>
                      </div>
                      <h4 className="project-title">{project.title}</h4>
                      <p className="project-description">{project.description}</p>
                      
                      {/* Tech Stack */}
                      <div className="tech-stack">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="tech-item">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="tech-more">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="project-actions">
                        {project.github && (
                          <button className="action-btn github-btn">
                            <span className="btn-icon">📂</span>
                            GitHub
                          </button>
                        )}
                        {project.demo && (
                          <button className="action-btn demo-btn">
                            <span className="btn-icon">🌐</span>
                            Live Demo
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="hex-glow"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="projects-stats">
            <div className="stat-item">
              <div className="stat-number">{projects.length}</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {projects.filter(p => p.status === 'started').length}
              </div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {projects.filter(p => p.status === 'pending').length}
              </div>
              <div className="stat-label">Coming Soon</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {projects.reduce((acc, p) => acc + p.technologies.length, 0)}
              </div>
              <div className="stat-label">Technologies Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
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
              aria-label="Close modal"
            >
              <span className="close-icon">×</span>
            </button>
            
            <div className="modal-grid">
              <div className="modal-image">
                <ImagePreloader 
                  src={projects[activeProject].image} 
                  alt={projects[activeProject].title} 
                />
                <div className="image-badges">
                  <span className={`status-badge ${projects[activeProject].status}`}>
                    {projects[activeProject].status === 'started' ? 'In Development' :
                     projects[activeProject].status === 'pending' ? 'Coming Soon' : 'Planning Phase'}
                  </span>
                  <span className="progress-badge">
                    {projects[activeProject].progress}% Complete
                  </span>
                </div>
              </div>
              
              <div className="modal-details">
                <div className="modal-header">
                  <h3>{projects[activeProject].title}</h3>
                  <div className="modal-links">
                    {projects[activeProject].github && (
                      <a href={projects[activeProject].github} className="modal-link">
                        <span className="link-icon">📂</span> GitHub
                      </a>
                    )}
                    {projects[activeProject].demo && (
                      <a href={projects[activeProject].demo} className="modal-link">
                        <span className="link-icon">🌐</span> Live Demo
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="modal-description">
                  <h4>Project Description</h4>
                  <p>{projects[activeProject].longDescription}</p>
                </div>
                
                <div className="modal-tech">
                  <h4>Technologies Used</h4>
                  <div className="tech-list">
                    {projects[activeProject].technologies.map(tech => (
                      <span key={tech} className="tech-tag-large">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-progress">
                  <h4>Progress</h4>
                  <div className="progress-container">
                    <div className="progress-track">
                      <div 
                        className="progress-fill"
                        style={{ width: `${projects[activeProject].progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-steps">
                      <span className={`step ${projects[activeProject].progress >= 25 ? 'completed' : ''}`}>
                        Planning
                      </span>
                      <span className={`step ${projects[activeProject].progress >= 50 ? 'completed' : ''}`}>
                        Development
                      </span>
                      <span className={`step ${projects[activeProject].progress >= 75 ? 'completed' : ''}`}>
                        Testing
                      </span>
                      <span className={`step ${projects[activeProject].progress >= 95 ? 'completed' : ''}`}>
                        Deployment
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-primary">View Full Details</button>
                  <button className="btn-secondary">Contact for Collaboration</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsAndProjects;