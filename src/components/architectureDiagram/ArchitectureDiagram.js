import React, {useState, useContext} from "react";
import "./ArchitectureDiagram.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function ArchitectureDiagram() {
  const {isDark} = useContext(StyleContext);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = {
    frontend: {
      title: "NextJS Frontend",
      tech: "React, TypeScript, SSR",
      details: "Server-side rendered React application with Chart.js dashboards. Deployed on AWS with zero-downtime CI/CD pipeline."
    },
    api: {
      title: "REST API Layer",
      tech: "Node.js, Express",
      details: "RESTful API endpoints with Snowflake Connector integration. Handles authentication, authorization, and data transformation."
    },
    auth: {
      title: "Authentication",
      tech: "Role-Based Access Control",
      details: "Multi-department security supporting 200+ concurrent users across 5 business units with granular permissions."
    },
    snowflake: {
      title: "Snowflake DWH",
      tech: "Data Warehouse",
      details: "Enterprise data warehouse storing procurement analytics. Optimized with clustering keys and result caching for performance."
    },
    cicd: {
      title: "CI/CD Pipeline",
      tech: "GitHub Actions, AWS",
      details: "Automated testing and deployment pipeline ensuring zero-downtime releases. Deployed 47+ times with 99.9% uptime."
    }
  };

  return (
    <div className="architecture-diagram-container">
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode arch-title" : "arch-title"}>
          System Architecture
        </h2>
        <p className={isDark ? "dark-mode arch-subtitle subTitle" : "arch-subtitle subTitle"}>
          Procurement Intelligence Platform - Production Architecture
        </p>
      </Fade>

      <div className="architecture-wrapper">
        <Fade bottom duration={1000} distance="20px" delay={100}>
          <div className={isDark ? "diagram-container dark-mode" : "diagram-container"}>
            {/* Flow Diagram */}
            <div className="architecture-flow">
              {/* Users */}
              <div className="flow-layer">
                <div className={`arch-node users ${isDark ? "dark-mode" : ""}`}>
                  <div className="node-icon">👥</div>
                  <div className="node-label">200+ Users</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flow-arrow">↓</div>

              {/* Frontend Layer */}
              <div className="flow-layer">
                <div
                  className={`arch-node frontend ${selectedNode === "frontend" ? "selected" : ""} ${isDark ? "dark-mode" : ""}`}
                  onClick={() => setSelectedNode(selectedNode === "frontend" ? null : "frontend")}
                >
                  <div className="node-icon">⚛️</div>
                  <div className="node-label">NextJS Frontend</div>
                  <div className="node-tech">SSR • TypeScript</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flow-arrow">↓</div>

              {/* Middle Layer - API + Auth + CI/CD */}
              <div className="flow-layer horizontal">
                <div
                  className={`arch-node api ${selectedNode === "api" ? "selected" : ""} ${isDark ? "dark-mode" : ""}`}
                  onClick={() => setSelectedNode(selectedNode === "api" ? null : "api")}
                >
                  <div className="node-icon">🔌</div>
                  <div className="node-label">REST API</div>
                  <div className="node-tech">Node.js</div>
                </div>

                <div
                  className={`arch-node auth ${selectedNode === "auth" ? "selected" : ""} ${isDark ? "dark-mode" : ""}`}
                  onClick={() => setSelectedNode(selectedNode === "auth" ? null : "auth")}
                >
                  <div className="node-icon">🔐</div>
                  <div className="node-label">Auth & RBAC</div>
                  <div className="node-tech">Role-Based</div>
                </div>

                <div
                  className={`arch-node cicd ${selectedNode === "cicd" ? "selected" : ""} ${isDark ? "dark-mode" : ""}`}
                  onClick={() => setSelectedNode(selectedNode === "cicd" ? null : "cicd")}
                >
                  <div className="node-icon">🚀</div>
                  <div className="node-label">CI/CD</div>
                  <div className="node-tech">GitHub</div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flow-arrow">↓</div>

              {/* Data Layer */}
              <div className="flow-layer">
                <div
                  className={`arch-node snowflake ${selectedNode === "snowflake" ? "selected" : ""} ${isDark ? "dark-mode" : ""}`}
                  onClick={() => setSelectedNode(selectedNode === "snowflake" ? null : "snowflake")}
                >
                  <div className="node-icon">❄️</div>
                  <div className="node-label">Snowflake DWH</div>
                  <div className="node-tech">Data Warehouse</div>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            {selectedNode && (
              <Fade duration={400}>
                <div className={isDark ? "details-panel dark-mode" : "details-panel"}>
                  <div className="details-header">
                    <h4>{nodes[selectedNode].title}</h4>
                    <button
                      className="close-detail-btn"
                      onClick={() => setSelectedNode(null)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="details-tech">{nodes[selectedNode].tech}</div>
                  <p className="details-description">{nodes[selectedNode].details}</p>
                </div>
              </Fade>
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
}

