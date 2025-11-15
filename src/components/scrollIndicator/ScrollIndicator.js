import React, {useState, useEffect} from "react";
import "./ScrollIndicator.scss";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after user scrolls 300px
      if (window.scrollY > 300) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="scroll-indicator">
      <div className="scroll-text">Scroll to explore my journey</div>
      <div className="scroll-icon">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down">↓</div>
      </div>
    </div>
  );
}

