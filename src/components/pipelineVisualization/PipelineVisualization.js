import React, {useContext, useState, useEffect} from "react";
import "./PipelineVisualization.scss";
import StyleContext from "../../contexts/StyleContext";

export default function PipelineVisualization() {
  const {isDark} = useContext(StyleContext);
  const [activeStage, setActiveStage] = useState(0);

  const pipelineStages = [
    {
      name: "Source",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: "Kafka",
      color: "#fbbf24",
      gradient: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Spark",
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      name: "Snowflake",
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V22M12 2L8 6M12 2L16 6M12 22L8 18M12 22L16 18M2 12H22M2 12L6 8M2 12L6 16M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      name: "Dashboard",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M3 9H21M9 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 12L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
  ];

  // Animate through stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [pipelineStages.length]);

  return (
    <div className={`pipeline-visualization ${isDark ? "dark-mode" : ""}`}>
      <div className="pipeline-stages">
            {pipelineStages.map((stage, index) => (
              <React.Fragment key={stage.name}>
                <div 
                  className={`pipeline-stage ${activeStage === index ? "active" : ""} ${index < activeStage ? "completed" : ""}`}
                  style={{
                    "--stage-color": stage.color,
                    "--stage-gradient": stage.gradient
                  }}
                  onMouseEnter={() => setActiveStage(index)}
                >
                  <div className="stage-glow"></div>
                  <div className="stage-card">
                    <div className="stage-icon-wrapper">
                      <div className="stage-icon" style={{color: stage.color}}>
                        {stage.icon}
                      </div>
                      <div className="stage-pulse"></div>
                    </div>
                    <div className="stage-name">{stage.name}</div>
                    <div className="stage-indicator"></div>
                  </div>
                </div>
                {index < pipelineStages.length - 1 && (
                  <div className="pipeline-connection">
                    <div className="connection-line">
                      <div 
                        className={`data-flow ${index < activeStage ? "flowing" : ""}`}
                        style={{animationDelay: `${index * 0.3}s`}}
                      ></div>
                    </div>
                    <svg className="connection-arrow" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
      </div>
    </div>
  );
}

