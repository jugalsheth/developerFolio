import React, {useContext} from "react";
import "./JourneyStory.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function JourneyStory() {
  const {isDark} = useContext(StyleContext);

  const philosophies = [
    {
      title: "Production-First Thinking",
      icon: "🚀",
      description:
        "200 users in week 1 taught me that real impact happens in production, not in notebooks. Every system I build is designed for scale from day one.",
      highlight: "Ship fast, scale faster"
    },
    {
      title: "Automation Obsession",
      icon: "⚙️",
      description:
        "If I do it twice, I automate it. From manual data entry to complex ETL workflows, I've eliminated 80% of repetitive work through smart automation.",
      highlight: "Automate everything"
    },
    {
      title: "Data as Product",
      icon: "📊",
      description:
        "Every pipeline serves users. Every dashboard tells a story. I don't just move data—I craft data products that empower decision-makers across the organization.",
      highlight: "Build for humans"
    }
  ];

  return (
    <div className="journey-story-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode journey-title" : "journey-title"}>
          How I Build
        </h2>
        <p
          className={
            isDark
              ? "dark-mode journey-subtitle subTitle"
              : "journey-subtitle subTitle"
          }
        >
          My philosophy for creating production-grade data systems
        </p>
      </Fade>

      <div className="philosophy-grid">
        {philosophies.map((philosophy, index) => (
          <Fade
            key={index}
            bottom
            duration={1000}
            distance="20px"
            delay={index * 150}
          >
            <div
              className={
                isDark ? "philosophy-card dark-mode" : "philosophy-card"
              }
            >
              <div className="philosophy-icon">{philosophy.icon}</div>
              <h3
                className={
                  isDark ? "dark-mode philosophy-title" : "philosophy-title"
                }
              >
                {philosophy.title}
              </h3>
              <p
                className={
                  isDark
                    ? "dark-mode philosophy-description"
                    : "philosophy-description"
                }
              >
                {philosophy.description}
              </p>
              <div className="philosophy-highlight">
                <span className="highlight-text">{philosophy.highlight}</span>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
