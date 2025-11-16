import React, {useContext} from "react";
import "./QuickStats.scss";
import StyleContext from "../../contexts/StyleContext";

export default function QuickStats() {
  const {isDark} = useContext(StyleContext);

  const stats = [
    "200+ Users Onboarded",
    "40% Pipeline Optimization",
    "80% Manual Work Automated",
    "$2M+ Budget Decisions Supported",
    "50+ Datasets Architected"
  ];

  return (
    <div
      className={
        isDark ? "quick-stats-container dark-mode" : "quick-stats-container"
      }
    >
      <div className="stats-ticker">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-text">{stat}</span>
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {stats.map((stat, index) => (
          <div key={`duplicate-${index}`} className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-text">{stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
