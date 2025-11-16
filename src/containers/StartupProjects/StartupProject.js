import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  function openUrlInNewTab(url) {
    if (!url) {
      return;
    }
    var win = window.open(url, "_blank");
    win.focus();
  }

  const {isDark} = useContext(StyleContext);
  if (!bigProjects.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "subTitle project-subtitle"
            }
          >
            {bigProjects.subtitle}
          </p>

          <div className="projects-container">
            {bigProjects.projects.map((project, i) => {
              // Check if this project has an embedded dashboard
              if (project.embedUrl) {
                return (
                  <div
                    key={i}
                    className={
                      isDark
                        ? "dark-mode project-card project-card-dark project-card-embed"
                        : "project-card project-card-light project-card-embed"
                    }
                  >
                    <div className="project-detail">
                      <h5
                        className={isDark ? "dark-mode card-title" : "card-title"}
                      >
                        {project.projectName}
                      </h5>
                      <p
                        className={
                          isDark ? "dark-mode card-subtitle" : "card-subtitle"
                        }
                      >
                        {project.projectDesc}
                      </p>
                      <div className="project-embed-container">
                        {/* Try iframe first */}
                        <iframe
                          src={project.embedUrl}
                          className="project-embed-iframe"
                          frameBorder="0"
                          scrolling="yes"
                          title={project.projectName}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                          loading="eager"
                          style={{ minHeight: '700px', width: '100%' }}
                          onLoad={() => {
                            console.log("Iframe loaded successfully");
                          }}
                          onError={(e) => {
                            console.error("Iframe failed to load:", e);
                          }}
                        ></iframe>
                        {/* Fallback overlay with link */}
                        <div className="iframe-overlay">
                          <div className="iframe-overlay-content">
                            <h4>📊 Real-Time Dashboard</h4>
                            <p>Click below to view the interactive dashboard</p>
                            <a 
                              href={project.embedUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="iframe-open-button"
                            >
                              Open Dashboard →
                            </a>
                          </div>
                        </div>
                      </div>
                      {project.footerLink ? (
                        <div className="project-card-footer">
                          {project.footerLink.map((link, i) => {
                            return (
                              <span
                                key={i}
                                className={
                                  isDark ? "dark-mode project-tag" : "project-tag"
                                }
                                onClick={() => openUrlInNewTab(link.url)}
                              >
                                {link.name}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }
              
              // Regular project card (no embed)
              return (
                <div
                  key={i}
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                >
                  {project.image ? (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="card-image"
                      ></img>
                    </div>
                  ) : null}
                  <div className="project-detail">
                    <h5
                      className={isDark ? "dark-mode card-title" : "card-title"}
                    >
                      {project.projectName}
                    </h5>
                    <p
                      className={
                        isDark ? "dark-mode card-subtitle" : "card-subtitle"
                      }
                    >
                      {project.projectDesc}
                    </p>
                    {project.footerLink ? (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, i) => {
                          return (
                            <span
                              key={i}
                              className={
                                isDark ? "dark-mode project-tag" : "project-tag"
                              }
                              onClick={() => openUrlInNewTab(link.url)}
                            >
                              {link.name}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
