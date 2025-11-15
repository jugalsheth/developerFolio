import React, {useContext, useMemo, useState} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import ConnectModal from "../../components/connectModal/ConnectModal";
import RotatingText from "../../components/rotatingText/RotatingText";
import ScrollIndicator from "../../components/scrollIndicator/ScrollIndicator";
import PipelineVisualization from "../../components/pipelineVisualization/PipelineVisualization";
import {illustration, greeting, skillsSection} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  
  // Generate stable particle positions
  const particles = useMemo(() => {
    return Array.from({length: 20}, (_, i) => ({
      id: i,
      left: (i * 37) % 100, // Pseudo-random but stable
      top: (i * 23) % 100,
      delay: (i * 0.3) % 5,
      duration: 5 + (i * 0.5) % 10
    }));
  }, []);

  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <div className="greet-main" id="greeting">
      {/* Animated gradient mesh background */}
      <div className="hero-background">
        <div className="gradient-mesh"></div>
        <div className="data-particles">
          {particles.map((particle) => (
            <div 
              key={particle.id} 
              className="particle" 
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="greeting-main">
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

        <Fade right duration={1000} distance="40px" delay={300}>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
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
