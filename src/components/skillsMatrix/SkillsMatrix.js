import React, {useState, useContext} from "react";
import "./SkillsMatrix.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function SkillsMatrix({skills}) {
  const {isDark} = useContext(StyleContext);
  const categories = Object.keys(skills);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="skills-matrix-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode skills-title" : "skills-title"}>
          Technical Skills
        </h2>
        <p
          className={
            isDark ? "dark-mode skills-subtitle" : "skills-subtitle subTitle"
          }
        >
          Comprehensive technical expertise across the data engineering stack
        </p>
      </Fade>

      <Fade bottom duration={1000} distance="20px" delay={100}>
        <div className="skills-tabs">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`skill-tab ${
                activeCategory === category ? "active" : ""
              } ${isDark ? "dark-mode" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </Fade>

      <div className="skills-content">
        {categories.map((category, catIndex) => (
          <div
            key={catIndex}
            className={`skill-category ${
              activeCategory === category ? "active" : ""
            }`}
          >
            <Fade
              bottom
              duration={800}
              distance="20px"
              when={activeCategory === category}
            >
              <div className="skills-tags">
                {skills[category].map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={isDark ? "skill-tag dark-mode" : "skill-tag"}
                    style={{animationDelay: `${skillIndex * 50}ms`}}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
}
