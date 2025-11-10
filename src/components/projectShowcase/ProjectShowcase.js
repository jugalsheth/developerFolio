import React, {useState, useContext} from "react";
import "./ProjectShowcase.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function ProjectShowcase({projects}) {
  const {isDark} = useContext(StyleContext);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="project-showcase-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode showcase-title" : "showcase-title"}>
          Featured Projects
        </h2>
        <p
          className={
            isDark
              ? "dark-mode showcase-subtitle"
              : "showcase-subtitle subTitle"
          }
        >
          Real-world applications and data engineering solutions
        </p>
      </Fade>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Fade
            key={index}
            bottom
            duration={1000}
            distance="20px"
            delay={index * 100}
          >
            <div
              className={
                isDark
                  ? "project-showcase-card dark-mode"
                  : "project-showcase-card"
              }
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-showcase-image"
                />
                <div className="project-overlay">
                  <span className="project-date">{project.date}</span>
                </div>
              </div>

              <div className="project-content">
                <h3
                  className={
                    isDark
                      ? "dark-mode project-name"
                      : "project-name"
                  }
                >
                  {project.name}
                </h3>
                <h4
                  className={
                    isDark
                      ? "dark-mode project-subtitle-text"
                      : "project-subtitle-text"
                  }
                >
                  {project.subtitle}
                </h4>
                <p
                  className={
                    isDark
                      ? "dark-mode project-description"
                      : "project-description"
                  }
                >
                  {project.description}
                </p>

                {project.bullets && (
                  <div
                    className={`project-details ${
                      expandedIndex === index ? "show" : ""
                    }`}
                  >
                    <ul className="project-bullets">
                      {project.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className={
                            isDark
                              ? "dark-mode project-bullet"
                              : "project-bullet"
                          }
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && (
                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className={
                          isDark ? "tech-tag dark-mode" : "tech-tag"
                        }
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="project-footer">
                  {project.links && project.links.length > 0 && (
                    <div className="project-links">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            isDark
                              ? "project-link dark-mode"
                              : "project-link"
                          }
                        >
                          {link.name} →
                        </a>
                      ))}
                    </div>
                  )}

                  {project.bullets && (
                    <button
                      className={
                        isDark
                          ? "expand-btn dark-mode"
                          : "expand-btn"
                      }
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedIndex === index ? "Show Less ▲" : "Read More ▼"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

