import React, {useContext} from "react";
import "./ProjectFilter.scss";
import StyleContext from "../../contexts/StyleContext";

export default function ProjectFilter({activeFilter, setActiveFilter}) {
  const {isDark} = useContext(StyleContext);

  const filters = [
    {id: "all", label: "All Projects"},
    {id: "production", label: "Production Apps"},
    {id: "realtime", label: "Real-Time"},
    {id: "genai", label: "GenAI"},
    {id: "automation", label: "Automation"}
  ];

  return (
    <div
      className={
        isDark
          ? "project-filter-container dark-mode"
          : "project-filter-container"
      }
    >
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-btn ${
            activeFilter === filter.id ? "active" : ""
          } ${isDark ? "dark-mode" : ""}`}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
