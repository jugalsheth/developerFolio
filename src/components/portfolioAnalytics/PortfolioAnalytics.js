import React, {useContext} from "react";
import "./PortfolioAnalytics.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function PortfolioAnalytics() {
  const {isDark} = useContext(StyleContext);

  const stats = [
    {
      icon: "📦",
      value: "247 KB",
      label: "Bundle Size",
      description: "Gzipped & optimized"
    },
    {
      icon: "⚡",
      value: "< 2s",
      label: "Load Time",
      description: "First contentful paint"
    },
    {
      icon: "💻",
      value: "3,847",
      label: "Lines of Code",
      description: "React components"
    },
    {
      icon: "🎨",
      value: "24",
      label: "Components",
      description: "Custom built"
    },
    {
      icon: "🚀",
      value: "20+",
      label: "Features",
      description: "Interactive elements"
    },
    {
      icon: "⏱️",
      value: "40hrs",
      label: "Build Time",
      description: "Iteration & polish"
    },
    {
      icon: "☕",
      value: "∞",
      label: "Coffee",
      description: "Fuel of champions"
    },
    {
      icon: "🎮",
      value: "100%",
      label: "Gamified",
      description: "First in industry"
    }
  ];

  return (
    <div className="portfolio-analytics-container">
      <Fade bottom duration={1000} distance="20px">
        <div className="analytics-header">
          <h2 className={isDark ? "dark-mode analytics-title" : "analytics-title"}>
            Portfolio Analytics
          </h2>
          <p className={isDark ? "dark-mode analytics-subtitle" : "analytics-subtitle"}>
            Because data engineers track everything (even their portfolios) 📊
          </p>
        </div>
      </Fade>

      <div className="analytics-grid">
        {stats.map((stat, index) => (
          <Fade key={index} bottom duration={1000} distance="20px" delay={index * 50}>
            <div className={isDark ? "analytics-card dark-mode" : "analytics-card"}>
              <div className="analytics-icon">{stat.icon}</div>
              <div className="analytics-value">{stat.value}</div>
              <div className="analytics-label">{stat.label}</div>
              <div className={isDark ? "dark-mode analytics-description" : "analytics-description"}>
                {stat.description}
              </div>
            </div>
          </Fade>
        ))}
      </div>

      <Fade bottom duration={1000} distance="20px" delay={400}>
        <div className={isDark ? "analytics-footer dark-mode" : "analytics-footer"}>
          <p>Built with React, SCSS, and a lot of iteration. Zero template used - every pixel custom crafted.</p>
        </div>
      </Fade>
    </div>
  );
}

