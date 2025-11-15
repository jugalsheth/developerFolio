import React, {useState, useContext} from "react";
import "./TechRadar.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function TechRadar() {
  const {isDark} = useContext(StyleContext);
  const [selectedTech, setSelectedTech] = useState(null);

  const technologies = {
    adopt: [
      {
        name: "Snowflake",
        category: "Data Warehouse",
        experience: "3+ years",
        opinion: "Best-in-class cloud DWH. Separation of compute/storage is game-changing for cost optimization."
      },
      {
        name: "dbt",
        category: "Transformation",
        experience: "3+ years",
        opinion: "Essential for modern data teams. Version control for SQL, testing, and documentation in one."
      },
      {
        name: "NextJS",
        category: "Full-Stack",
        experience: "2+ years",
        opinion: "Production-grade React framework. SSR + API routes make it perfect for data apps."
      },
      {
        name: "Airflow",
        category: "Orchestration",
        experience: "3+ years",
        opinion: "Industry standard for pipeline orchestration. Python-based DAGs give maximum flexibility."
      }
    ],
    trial: [
      {
        name: "DuckDB",
        category: "Analytics",
        experience: "Exploring",
        opinion: "Promising embedded analytics DB. Great for local development and small-scale analytics."
      },
      {
        name: "Polars",
        category: "Data Processing",
        experience: "Exploring",
        opinion: "Faster than Pandas for large datasets. Considering for next data processing project."
      },
      {
        name: "Mage",
        category: "Orchestration",
        experience: "Exploring",
        opinion: "Modern alternative to Airflow with better UX. Watching closely for production readiness."
      }
    ],
    assess: [
      {
        name: "Databricks",
        category: "Platform",
        experience: "Evaluating",
        opinion: "Powerful unified platform. Evaluating vs. Snowflake for Spark workloads."
      },
      {
        name: "Kafka Streams",
        category: "Streaming",
        experience: "Learning",
        opinion: "Stateful stream processing. Currently using Spark Streaming but exploring alternatives."
      }
    ]
  };

  const handleTechClick = tech => {
    setSelectedTech(selectedTech?.name === tech.name ? null : tech);
  };

  return (
    <div className="tech-radar-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode radar-title" : "radar-title"}>
          Technology Radar
        </h2>
        <p className={isDark ? "dark-mode radar-subtitle subTitle" : "radar-subtitle subTitle"}>
          My current technology adoption strategy and opinions
        </p>
      </Fade>

      <div className="radar-grid">
        <Fade bottom duration={1000} distance="20px" delay={100}>
          <div className={isDark ? "radar-quadrant adopt dark-mode" : "radar-quadrant adopt"}>
            <h3 className="quadrant-title">
              <span className="quadrant-icon">✓</span>
              Adopt
            </h3>
            <p className="quadrant-desc">Technologies I actively use in production</p>
            <div className="tech-items">
              {technologies.adopt.map((tech, index) => (
                <div
                  key={index}
                  className={`tech-item ${selectedTech?.name === tech.name ? "selected" : ""}`}
                  onClick={() => handleTechClick(tech)}
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-category">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade bottom duration={1000} distance="20px" delay={200}>
          <div className={isDark ? "radar-quadrant trial dark-mode" : "radar-quadrant trial"}>
            <h3 className="quadrant-title">
              <span className="quadrant-icon">🔬</span>
              Trial
            </h3>
            <p className="quadrant-desc">Exploring for potential adoption</p>
            <div className="tech-items">
              {technologies.trial.map((tech, index) => (
                <div
                  key={index}
                  className={`tech-item ${selectedTech?.name === tech.name ? "selected" : ""}`}
                  onClick={() => handleTechClick(tech)}
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-category">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>

        <Fade bottom duration={1000} distance="20px" delay={300}>
          <div className={isDark ? "radar-quadrant assess dark-mode" : "radar-quadrant assess"}>
            <h3 className="quadrant-title">
              <span className="quadrant-icon">👁️</span>
              Assess
            </h3>
            <p className="quadrant-desc">Watching and evaluating</p>
            <div className="tech-items">
              {technologies.assess.map((tech, index) => (
                <div
                  key={index}
                  className={`tech-item ${selectedTech?.name === tech.name ? "selected" : ""}`}
                  onClick={() => handleTechClick(tech)}
                >
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-category">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {selectedTech && (
        <Fade duration={500}>
          <div className={isDark ? "tech-detail dark-mode" : "tech-detail"}>
            <div className="detail-header">
              <h4>{selectedTech.name}</h4>
              <button className="close-btn" onClick={() => setSelectedTech(null)}>
                ×
              </button>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{selectedTech.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">{selectedTech.experience}</span>
              </div>
              <div className="detail-opinion">
                <span className="detail-label">My Take:</span>
                <p>{selectedTech.opinion}</p>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}

