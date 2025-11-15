import React, {useContext} from "react";
import "./Skills.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import SkillEcosystem from "../../components/skillEcosystem/SkillEcosystem";
import {skillsSection, visualResume} from "../../portfolio";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  if (!skillsSection.display) {
    return null;
  }

  // Use comprehensive skills from visualResume if available, otherwise use basic skills
  const skillsData = visualResume?.skills || {
    "Core Skills": skillsSection.softwareSkills.map(s => s.skillName)
  };

  return (
    <div className={isDark ? "dark-mode skills-section" : "skills-section"} id="skills">
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-header">
          <h1 className={isDark ? "dark-mode skills-heading" : "skills-heading"}>
            {skillsSection.title || "Skills & Expertise"}
          </h1>
          <p className={isDark ? "dark-mode skills-subtitle" : "skills-subtitle"}>
            {skillsSection.subTitle || "Mastering the tools and technologies that power modern data systems"}
          </p>
        </div>
      </Fade>

      <SkillEcosystem skills={skillsData} />

      {/* Key Highlights - Minimalist */}
      {skillsSection.skills && skillsSection.skills.length > 0 && (
        <Fade bottom duration={1000} delay={400}>
          <div className="skills-highlights">
            <div className="highlights-list">
              {skillsSection.skills.map((skill, i) => (
                <div 
                  key={i} 
                  className={`highlight-item ${isDark ? "dark-mode" : ""}`}
                  style={{animationDelay: `${i * 80}ms`}}
                >
                  <span className="highlight-bullet">→</span>
                  <span className="highlight-text">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}
