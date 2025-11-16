import React, {useContext, useState} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import ConnectModal from "../../components/connectModal/ConnectModal";
import RotatingText from "../../components/rotatingText/RotatingText";
import ScrollIndicator from "../../components/scrollIndicator/ScrollIndicator";
import PipelineVisualization from "../../components/pipelineVisualization/PipelineVisualization";
import InstagramReelsGrid from "../../components/instagramReelsGrid/InstagramReelsGrid";
import {greeting, skillsSection, socialMediaLinks} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <div className="greet-main" id="greeting">
      {/* Three-column Instagram Reels Grid Background */}
      {greeting.personalGallery?.display && greeting.personalGallery.reels?.length > 0 && (
        <InstagramReelsGrid
          reels={greeting.personalGallery.reels || []}
          autoPlay={greeting.personalGallery.autoPlay !== false}
          instagramAccount={socialMediaLinks.instagram || "https://www.instagram.com/jugalsheth/"}
        />
      )}

      {/* Modern Data Engineering Background */}
      <div className="hero-background-modern">
        <div className="data-flow-visualization"></div>
        <div className="code-grid-background"></div>
      </div>

      <div className="greeting-main centered-content">
        <Fade bottom duration={1000} distance="40px">
          <div className="greeting-text-div">
            <div className="greeting-content">
              {/* Badge */}
              <div className="hero-badge">
                <span className="badge-text">🚀 Building Production Systems</span>
              </div>

              {/* Main Title */}
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {greeting.title}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>

              {/* Subtitle */}
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>

              {/* Rotating Role */}
              <div className="rotating-role-container">
                <span className={isDark ? "dark-mode role-label" : "role-label"}>
                  I'm a{" "}
                </span>
                <RotatingText
                  roles={[
                    "Data Engineer",
                    "Solutions Engineer",
                    "System Architect",
                    "Pipeline Designer",
                    "Product Builder"
                  ]}
                />
              </div>

              {/* Pipeline Visualization */}
              <PipelineVisualization />

              {/* Tech Stack Badges - Key Technologies */}
              <div className="hero-tech-badges">
                <Fade bottom duration={800} delay={200}>
                  <div className="tech-badges-container">
                    {skillsSection.softwareSkills.slice(0, 5).map((skill, index) => (
                      <div 
                        key={index} 
                        className={`tech-badge ${isDark ? "dark-mode" : ""}`}
                        title={skill.skillName}
                      >
                        <span className="tech-badge-name">{skill.skillName}</span>
                      </div>
                    ))}
                  </div>
                </Fade>
              </div>

              {/* Social Media & CTA */}
              <div className="hero-actions">
                <SocialMedia />
                <div className="button-greeting-div">
                  <Button 
                    text="Let's Connect" 
                    variant="gradient"
                    size="large"
                    icon="💬"
                    iconPosition="right"
                    onClick={() => setIsConnectModalOpen(true)}
                    animated
                  />
                  {greeting.resumeLink && (
                    <Button
                      text="Download Resume"
                      variant="outline"
                      size="large"
                      icon="📄"
                      iconPosition="left"
                      href={require("./resume.pdf")}
                      newTab
                      animated
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fade>

      </div>
      <ScrollIndicator />
      
      <ConnectModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  );
}
