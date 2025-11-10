import React, {useContext} from "react";
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

  if (!visualResume.display) {
    return null;
  }

  return (
    <div className={isDark ? "dark-mode resume-section" : "resume-section"} id="resume">
      {/* Impact Metrics Section */}
      {visualResume.impactMetrics && visualResume.impactMetrics.length > 0 && (
        <ImpactMetrics metrics={visualResume.impactMetrics} />
      )}

      {/* Career Timeline Section */}
      {workExperiences.experience && workExperiences.experience.length > 0 && (
        <CareerTimeline experiences={workExperiences.experience} />
      )}

      {/* Skills Matrix Section */}
      {visualResume.skills && Object.keys(visualResume.skills).length > 0 && (
        <SkillsMatrix skills={visualResume.skills} />
      )}

      {/* Featured Projects Section */}
      {visualResume.detailedProjects && visualResume.detailedProjects.length > 0 && (
        <ProjectShowcase projects={visualResume.detailedProjects} />
      )}

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

