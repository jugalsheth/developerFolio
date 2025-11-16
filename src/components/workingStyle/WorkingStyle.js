import React, {useContext} from "react";
import "./WorkingStyle.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkingStyle() {
  const {isDark} = useContext(StyleContext);

  const workflow = [
    {
      time: "Morning",
      icon: "☀️",
      title: "Data Quality",
      activities: [
        "Review dbt tests & pipeline SLAs",
        "Optimize slow queries",
        "Monitor data freshness"
      ]
    },
    {
      time: "Mid-Morning",
      icon: "💻",
      title: "Full-Stack Dev",
      activities: [
        "Build NextJS components",
        "Design API endpoints",
        "Real-time dashboards"
      ]
    },
    {
      time: "Afternoon",
      icon: "🏗️",
      title: "Architecture",
      activities: [
        "Design pipeline systems",
        "System design reviews",
        "Document decisions"
      ]
    },
    {
      time: "Late Afternoon",
      icon: "🤖",
      title: "Automation",
      activities: [
        "Build automation scripts",
        "Improve CI/CD workflows",
        "Refactor processes"
      ]
    },
    {
      time: "Evening",
      icon: "👥",
      title: "Collaboration",
      activities: ["Code reviews", "Mentor engineers", "Knowledge sharing"]
    },
    {
      time: "Continuous",
      icon: "🔄",
      title: "Learning",
      activities: ["Explore new tech", "Read documentation", "Side projects"]
    }
  ];

  return (
    <div className="working-style-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode working-title" : "working-title"}>
          How I Work
        </h2>
        <p
          className={
            isDark
              ? "dark-mode working-subtitle subTitle"
              : "working-subtitle subTitle"
          }
        >
          A typical day building production data systems
        </p>
      </Fade>

      <div className="workflow-timeline">
        {workflow.map((phase, index) => (
          <Fade
            key={index}
            bottom
            duration={1000}
            distance="20px"
            delay={index * 100}
          >
            <div
              className={isDark ? "workflow-card dark-mode" : "workflow-card"}
            >
              <div className="workflow-header">
                <div className="workflow-icon">{phase.icon}</div>
                <div className="workflow-time">{phase.time}</div>
              </div>
              <h3
                className={
                  isDark ? "dark-mode workflow-title" : "workflow-title"
                }
              >
                {phase.title}
              </h3>
              <ul className="workflow-activities">
                {phase.activities.map((activity, idx) => (
                  <li
                    key={idx}
                    className={
                      isDark ? "dark-mode activity-item" : "activity-item"
                    }
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
