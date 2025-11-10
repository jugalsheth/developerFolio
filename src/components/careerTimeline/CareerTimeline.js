import React, {useState, useContext} from "react";
import "./CareerTimeline.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function CareerTimeline({experiences}) {
  const {isDark} = useContext(StyleContext);
  const [expandedIndex, setExpandedIndex] = useState(-1); // -1 means all collapsed by default

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="career-timeline-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode timeline-title" : "timeline-title"}>
          Career Journey
        </h2>
        <p
          className={
            isDark
              ? "dark-mode timeline-subtitle"
              : "timeline-subtitle subTitle"
          }
        >
          Professional experience and achievements
        </p>
      </Fade>

      <div className="timeline">
        {experiences.map((experience, index) => (
          <Fade
            key={index}
            bottom
            duration={1000}
            distance="20px"
            delay={index * 100}
          >
            <div
              className={`timeline-item ${
                index % 2 === 0 ? "timeline-left" : "timeline-right"
              } ${isDark ? "dark-mode" : ""}`}
            >
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
                <div className="timeline-icon">
                  <img
                    src={experience.companylogo}
                    alt={experience.company}
                    className="timeline-logo"
                  />
                </div>
              </div>

              <div
                className={`timeline-content ${
                  expandedIndex === index ? "expanded" : "collapsed"
                } ${isDark ? "dark-mode" : ""}`}
                onClick={() => toggleExpand(index)}
              >
                <div className="timeline-header">
                  <div>
                    <h3
                      className={
                        isDark
                          ? "dark-mode timeline-role"
                          : "timeline-role"
                      }
                    >
                      {experience.role}
                    </h3>
                    <h4
                      className={
                        isDark
                          ? "dark-mode timeline-company"
                          : "timeline-company"
                      }
                    >
                      {experience.company}
                    </h4>
                  </div>
                  <span
                    className={
                      isDark ? "dark-mode timeline-date" : "timeline-date"
                    }
                  >
                    {experience.date}
                  </span>
                </div>

                <div className={`timeline-expandable ${expandedIndex === index ? "show" : ""}`}>
                  <p
                    className={
                      isDark
                        ? "dark-mode timeline-description"
                        : "timeline-description"
                    }
                  >
                    {experience.desc}
                  </p>

                  {experience.descBullets && (
                    <div className="timeline-bullets">
                      <ul>
                        {experience.descBullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className={
                              isDark ? "dark-mode bullet-item" : "bullet-item"
                            }
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="expand-indicator">
                  {expandedIndex === index ? "Show Less ▲" : "Show More ▼"}
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

