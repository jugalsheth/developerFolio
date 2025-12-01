import React, {useState, useEffect, useContext} from "react";
import "./StickyCTA.scss";
import Button from "../button/Button";
import {contactInfo, greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

export default function StickyCTA() {
  const {isDark} = useContext(StyleContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA bar after scrolling past hero section (approximately 600px)
      const scrollPosition = window.scrollY || window.pageYOffset;
      setIsVisible(scrollPosition > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`sticky-cta-bar ${isDark ? "dark-mode" : ""}`}>
      <div className="sticky-cta-content">
        {contactInfo.calendlyUrl ? (
          <Button
            text="Schedule a Meeting"
            variant="gradient"
            size="medium"
            icon="📅"
            iconPosition="left"
            href={contactInfo.calendlyUrl}
            newTab
            className="sticky-cta-primary"
          />
        ) : (
          <Button
            text="Let's Connect"
            variant="gradient"
            size="medium"
            icon="💬"
            iconPosition="left"
            href="#contact"
            className="sticky-cta-primary"
          />
        )}
        {greeting.resumeLink && (
          <Button
            text="Download Resume"
            variant="outline"
            size="medium"
            icon="📄"
            iconPosition="left"
            href={require("../../containers/greeting/resume.pdf")}
            newTab
            className="sticky-cta-secondary"
          />
        )}
      </div>
    </div>
  );
}


