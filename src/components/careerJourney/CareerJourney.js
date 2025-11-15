import React, {useState, useContext} from "react";
import "./CareerJourney.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import ConnectModal from "../connectModal/ConnectModal";
import Button from "../button/Button";

export default function CareerJourney() {
  const {isDark} = useContext(StyleContext);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const journeyPhases = [
    {
      id: 1,
      year: "2014-2018",
      title: "The Foundation",
      icon: "🔧",
      role: "Mechanical Engineer",
      description: "Started with science, then mechanical engineering",
      details: [
        "Studied mechanical engineering fundamentals",
        "Worked on shop floor with hydraulic manufacturing",
        "Hands-on experience with hydraulic fluids and systems",
        "Built analytical mindset through engineering problems"
      ],
      colorLight: "#e74c3c",
      colorDark: "#ff6b6b",
      gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
    },
    {
      id: 2,
      year: "2019-2021",
      title: "The Pivot",
      icon: "🎓",
      role: "Master's Student → Data Analyst",
      description: "Discovered data and never looked back",
      details: [
        "Masters in Engineering Management at Northeastern",
        "Deep dive into: Machine Learning, Data Analytics, BI",
        "Data Warehousing and Database Design coursework",
        "First data role: Claims Data Analyst at insurance company",
        "Fell in love with transforming data into insights"
      ],
      colorLight: "#3498db",
      colorDark: "#5dade2",
      gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)"
    },
    {
      id: 3,
      year: "2021-2023",
      title: "The Analytics Era",
      icon: "📊",
      role: "Analytics Engineer @ VaynerMedia",
      description: "Media analytics, paid/organic campaigns, storytelling with data",
      details: [
        "Social insights analyst managing media buying & planning",
        "Paid media analytics across multiple platforms",
        "Organic media analytics and attribution",
        "Built dashboards for million-dollar ad campaigns",
        "Started gravitating toward data engineering..."
      ],
      colorLight: "#16a085",
      colorDark: "#1abc9c",
      gradient: "linear-gradient(135deg, #16a085 0%, #138d75 100%)"
    },
    {
      id: 4,
      year: "2023-Present",
      title: "The Engineer",
      icon: "🏗️",
      role: "Senior Data Engineer @ VaynerX",
      description: "Building scalable pipelines, architecting data platforms",
      details: [
        "Full-stack data engineering: ETL/ELT pipelines",
        "Python automation for file ingestion & extraction",
        "Data warehouse architecture (Medallion, dbt)",
        "Airflow orchestration & pipeline maintenance",
        "Supporting analytics for 50+ datasets"
      ],
      colorLight: "#9b59b6",
      colorDark: "#bb8fce",
      gradient: "linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)"
    },
    {
      id: 5,
      year: "2024-Present",
      title: "The Builder",
      icon: "🚀",
      role: "Full-Stack Data Engineer",
      description: "NextJS apps, GenAI tools, production systems at scale",
      details: [
        "Built NextJS web apps serving 200-500 users",
        "GenAI tool development (ETLGenie, QueryGenie)",
        "Deployed on Vercel with zero-downtime CI/CD",
        "System design & scalability (DSA studies)",
        "From data pipelines to full products"
      ],
      colorLight: "#6b5b95",
      colorDark: "#9078c3",
      gradient: "linear-gradient(135deg, #6b5b95 0%, #9078c3 100%)"
    },
    {
      id: 6,
      year: "Future",
      title: "The Vision",
      icon: "🎯",
      role: "Solutions Engineer",
      description: "Where I'm heading: Bridging technical depth with customer impact",
      details: [
        "Leverage data engineering + full-stack skills",
        "Design solutions for customer data problems",
        "Architect scalable platforms for clients",
        "Demonstrate, educate, and enable customers",
        "Continuous learning: Always evolving 📚"
      ],
      colorLight: "#667eea",
      colorDark: "#8b9dff",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      isFuture: true
    }
  ];

  const togglePhase = (phaseId) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="career-journey-container">
      <Fade bottom duration={1000} distance="20px">
        <div className="journey-header">
          <h2 className={isDark ? "dark-mode journey-title" : "journey-title"}>
            My Journey
          </h2>
          <p className={isDark ? "dark-mode journey-subtitle" : "journey-subtitle"}>
            From mechanical engineer to full-stack data engineer - a story of continuous evolution
          </p>
        </div>
      </Fade>

      <div className="journey-timeline">
        {journeyPhases.map((phase, index) => {
          const phaseColor = isDark ? phase.colorDark : phase.colorLight;
          
          return (
            <Fade key={phase.id} left={index % 2 === 0} right={index % 2 === 1} duration={1000} distance="50px">
              <div 
                className={`journey-phase ${index % 2 === 0 ? "left" : "right"} ${phase.isFuture ? "future" : ""} ${isDark ? "dark-mode" : ""}`}
                onClick={() => togglePhase(phase.id)}
              >
                <div className="phase-timeline-marker" style={{background: phase.gradient}}>
                  <div className="phase-icon">{phase.icon}</div>
                </div>

                <div className="phase-content-wrapper">
                  <div className="phase-card" style={{borderLeftColor: phaseColor}}>
                    <div className="phase-year" style={{color: phaseColor}}>{phase.year}</div>
                    <h3 className={isDark ? "dark-mode phase-title" : "phase-title"}>{phase.title}</h3>
                    <div className="phase-role" style={{color: phaseColor}}>{phase.role}</div>
                    <p className={isDark ? "dark-mode phase-description" : "phase-description"}>
                      {phase.description}
                    </p>

                    <button 
                      className={`expand-btn ${expandedPhase === phase.id ? "expanded" : ""}`}
                      style={{
                        borderColor: phaseColor,
                        color: expandedPhase === phase.id ? "white" : phaseColor,
                        background: expandedPhase === phase.id ? phaseColor : "transparent"
                      }}
                    >
                      {expandedPhase === phase.id ? "Show Less ▲" : "Learn More ▼"}
                    </button>

                    {expandedPhase === phase.id && (
                      <div className="phase-details">
                        <ul>
                          {phase.details.map((detail, idx) => (
                            <li key={idx} className={isDark ? "dark-mode" : ""} style={{"--accent-color": phaseColor}}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>

      <Fade bottom duration={1000} distance="20px">
        <div className={isDark ? "journey-cta dark-mode" : "journey-cta"}>
          <h3>The Journey Continues...</h3>
          <p>Every day I'm learning, building, and shipping. Want to be part of the next chapter?</p>
          <Button
            text="Let's Connect"
            variant="gradient"
            size="large"
            icon="🚀"
            iconPosition="right"
            onClick={() => setIsConnectModalOpen(true)}
            animated
          />
        </div>
      </Fade>

      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
}

