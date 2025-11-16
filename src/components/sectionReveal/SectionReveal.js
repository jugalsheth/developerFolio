import {useEffect} from "react";

export default function SectionReveal() {
  useEffect(() => {
    // Select all major section containers
    const sections = document.querySelectorAll(
      ".resume-section, .skills-main, .journey-story-container, " +
        ".working-style-container, .architecture-diagram-container, " +
        ".challenge-me-container, .tech-radar-container, .code-snippets-container"
    );

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-revealed");
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      section.classList.add("section-locked");
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return null; // This component only adds observers
}
