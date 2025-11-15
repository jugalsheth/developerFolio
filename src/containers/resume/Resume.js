import React, {useState, useContext} from "react";
import "./Resume.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import ImpactMetrics from "../../components/impactMetrics/ImpactMetrics";
import CareerTimeline from "../../components/careerTimeline/CareerTimeline";
import SkillsMatrix from "../../components/skillsMatrix/SkillsMatrix";
import ProjectShowcase from "../../components/projectShowcase/ProjectShowcase";
import Button from "../../components/button/Button";
import {visualResume, workExperiences} from "../../portfolio";

export default function Resume() {
  const {isDark} = useContext(StyleContext);
  const [activeTab, setActiveTab] = useState("impact");

  if (!visualResume.display) {
    return null;
  }

  const tabs = [
    {id: "impact", label: "Impact", icon: "📊"},
    {id: "experience", label: "Experience", icon: "💼"},
    {id: "skills", label: "Skills", icon: "⚡"},
    {id: "projects", label: "Projects", icon: "🚀"}
  ];

  return (
    <div className={isDark ? "dark-mode resume-section" : "resume-section"} id="resume">
      {/* Section Header */}
      <Fade bottom duration={1000} distance="20px">
        <div className="resume-header">
          <h2 className={isDark ? "dark-mode resume-main-title" : "resume-main-title"}>
            Professional Portfolio
          </h2>
          <p className={isDark ? "dark-mode resume-main-subtitle" : "resume-main-subtitle"}>
            Explore my experience, skills, and impact through interactive tabs
          </p>
        </div>
      </Fade>

      {/* Tab Navigation */}
      <div className="resume-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`resume-tab ${activeTab === tab.id ? "active" : ""} ${isDark ? "dark-mode" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="resume-tab-content">
        {activeTab === "impact" && visualResume.impactMetrics && visualResume.impactMetrics.length > 0 && (
          <Fade key="impact" duration={500}>
            <ImpactMetrics metrics={visualResume.impactMetrics} />
          </Fade>
        )}

        {activeTab === "experience" && workExperiences.experience && workExperiences.experience.length > 0 && (
          <Fade key="experience" duration={500}>
            <CareerTimeline experiences={workExperiences.experience} />
          </Fade>
        )}

        {activeTab === "skills" && visualResume.skills && Object.keys(visualResume.skills).length > 0 && (
          <Fade key="skills" duration={500}>
            <SkillsMatrix skills={visualResume.skills} />
          </Fade>
        )}

        {activeTab === "projects" && visualResume.detailedProjects && visualResume.detailedProjects.length > 0 && (
          <Fade key="projects" duration={500}>
            <ProjectShowcase projects={visualResume.detailedProjects} />
          </Fade>
        )}
      </div>

      {/* Download Resume CTA */}
      <div className="resume-download-section">
        <Fade bottom duration={1000} distance="20px">
          <div className={isDark ? "dark-mode download-card" : "download-card"}>
            <h2 className={isDark ? "dark-mode download-title" : "download-title"}>
              Want the Full Details?
            </h2>
            <p className={isDark ? "dark-mode download-subtitle" : "download-subtitle"}>
              Download my complete resume in PDF format for a comprehensive view of my experience,
              skills, and achievements.
            </p>
            <div className="download-buttons">
              <a
                href={require("../greeting/resume.pdf")}
                download="Jugal_Sheth_Resume.pdf"
                className="download-link-wrapper main-button"
              >
                Download Resume PDF
              </a>
              <Button text="Contact Me" href="#contact" />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}

