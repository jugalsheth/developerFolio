import React, {useState, useEffect, useContext} from "react";
import "./StickyNav.scss";
import StyleContext from "../../contexts/StyleContext";

export default function StickyNav() {
  const {isDark} = useContext(StyleContext);
  const [activeSection, setActiveSection] = useState("greeting");
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    {id: "greeting", label: "Home", icon: "🏠"},
    {id: "resume", label: "Resume", icon: "📄"},
    {id: "projects", label: "Projects", icon: "💼"},
    {id: "skills", label: "Skills", icon: "⚡"},
    {id: "contact", label: "Contact", icon: "✉️"}
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Determine active section
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: "smooth", block: "start"});
    }
  };

  return (
    <nav className={`sticky-nav ${isVisible ? "visible" : ""} ${isDark ? "dark-mode" : ""}`}>
      <div className="nav-items">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? "active" : ""}`}
            onClick={() => scrollToSection(section.id)}
            title={section.label}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

