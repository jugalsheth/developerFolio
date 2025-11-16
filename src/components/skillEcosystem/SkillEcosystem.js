import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback
} from "react";
import "./SkillEcosystem.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function SkillEcosystem({skills}) {
  const {isDark} = useContext(StyleContext);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("radar");

  // Memoize skill mastery calculation
  const getSkillMastery = useCallback((category, index) => {
    const baseMastery = {
      "Languages & Data Processing": 95,
      "Data Warehousing & Modeling": 92,
      "Pipeline Engineering": 90,
      "Analytics & Visualization": 88,
      "Full-Stack Development": 85,
      "System Design & Architecture": 83,
      "Cloud/DevOps": 80,
      "Testing & Reliability": 85
    };
    return Math.max(75, baseMastery[category] - index * 2);
  }, []);

  // Category positions for radar chart
  const categoryPositions = useMemo(
    () => ({
      "Languages & Data Processing": {
        angle: 0,
        color: "#3b82f6",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
      },
      "Data Warehousing & Modeling": {
        angle: 45,
        color: "#06b6d4",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
      },
      "Pipeline Engineering": {
        angle: 90,
        color: "#ef4444",
        gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
      },
      "Analytics & Visualization": {
        angle: 135,
        color: "#10b981",
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      },
      "Full-Stack Development": {
        angle: 180,
        color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
      },
      "System Design & Architecture": {
        angle: 225,
        color: "#8b5cf6",
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
      },
      "Cloud/DevOps": {
        angle: 270,
        color: "#ec4899",
        gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)"
      },
      "Testing & Reliability": {
        angle: 315,
        color: "#14b8a6",
        gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
      }
    }),
    []
  );

  // Memoize skills with metadata
  const skillsWithMetadata = useMemo(
    () =>
      Object.entries(skills).flatMap(([category, skillList]) =>
        skillList.map((skill, index) => ({
          name: skill,
          category,
          mastery: getSkillMastery(category, index),
          ...categoryPositions[category],
          index
        }))
      ),
    [skills, getSkillMastery, categoryPositions]
  );

  return (
    <div className={`skill-ecosystem ${isDark ? "dark-mode" : ""}`}>
      {/* View Mode Selector */}
      <div className="view-mode-selector">
        <button
          className={`view-mode-btn ${viewMode === "radar" ? "active" : ""}`}
          onClick={() => setViewMode("radar")}
          aria-label="Radar View"
        >
          <span className="mode-icon">🎯</span>
          <span>Radar</span>
        </button>
        <button
          className={`view-mode-btn ${viewMode === "network" ? "active" : ""}`}
          onClick={() => setViewMode("network")}
          aria-label="Network View"
        >
          <span className="mode-icon">🕸️</span>
          <span>Network</span>
        </button>
        <button
          className={`view-mode-btn ${viewMode === "mastery" ? "active" : ""}`}
          onClick={() => setViewMode("mastery")}
          aria-label="Mastery View"
        >
          <span className="mode-icon">✨</span>
          <span>Mastery</span>
        </button>
      </div>

      {/* Radar Chart View */}
      {viewMode === "radar" && (
        <Fade bottom duration={600} distance="20px">
          <div className="skill-radar-view">
            <SkillRadarChart
              skills={skillsWithMetadata}
              isDark={isDark}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </Fade>
      )}

      {/* Network Graph View */}
      {viewMode === "network" && (
        <Fade bottom duration={600} distance="20px">
          <div className="skill-network-view">
            <SkillNetworkGraph
              skills={skillsWithMetadata}
              isDark={isDark}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
            />
          </div>
        </Fade>
      )}

      {/* Mastery Rings View */}
      {viewMode === "mastery" && (
        <Fade bottom duration={600} distance="20px">
          <div className="skill-mastery-view">
            <SkillMasteryRings
              skills={skillsWithMetadata}
              isDark={isDark}
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
            />
          </div>
        </Fade>
      )}

      {/* Category Tooltip */}
      {hoveredCategory && (
        <div
          className="category-tooltip"
          style={{
            top: `${hoveredCategory.y}px`,
            left: `${hoveredCategory.x}px`
          }}
        >
          <div className="tooltip-header">{hoveredCategory.category}</div>
          <div className="tooltip-content">
            <div className="tooltip-mastery">
              {hoveredCategory.avgMastery}% Mastery
            </div>
            <div className="tooltip-skills">
              {hoveredCategory.skillCount} Skills
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Radar Chart Component
function SkillRadarChart({
  skills,
  isDark,
  hoveredCategory,
  setHoveredCategory,
  selectedCategory,
  setSelectedCategory
}) {
  const [animated, setAnimated] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Memoize category averages
  const categoryAverages = useMemo(() => {
    const skillsByCategory = {};
    skills.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    return Object.entries(skillsByCategory).map(([category, skillList]) => {
      const avgMastery = Math.round(
        skillList.reduce((sum, s) => sum + s.mastery, 0) / skillList.length
      );
      return {
        category,
        avgMastery,
        skillCount: skillList.length,
        skills: skillList,
        ...skillList[0]
      };
    });
  }, [skills]);

  const centerX = 350;
  const centerY = 350;
  const maxRadius = 280;

  // Create path for radar shape with smooth curves
  const createRadarPath = useCallback(
    masteryData => {
      const points = masteryData.map(({angle, avgMastery}) => {
        const radian = (angle * Math.PI) / 180;
        const radius = (maxRadius / 100) * avgMastery;
        const x = centerX + Math.cos(radian) * radius;
        const y = centerY + Math.sin(radian) * radius;
        return {x, y, angle, avgMastery};
      });

      // Create smooth path using quadratic curves
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length; i++) {
        const next = points[(i + 1) % points.length];
        const midX = (points[i].x + next.x) / 2;
        const midY = (points[i].y + next.y) / 2;
        path += ` Q ${points[i].x} ${points[i].y} ${midX} ${midY}`;
      }
      path += " Z";
      return path;
    },
    [centerX, centerY, maxRadius]
  );

  const radarPath = useMemo(
    () => createRadarPath(categoryAverages),
    [categoryAverages, createRadarPath]
  );

  // Handle mouse move for tooltip
  const handleMouseMove = useCallback((e, category) => {
    if (tooltipRef.current) {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        setHoveredCategory({
          ...category,
          x: e.clientX - rect.left + 20,
          y: e.clientY - rect.top - 20
        });
      }
    }
  }, []);

  return (
    <div className="radar-chart-container">
      <svg
        ref={svgRef}
        className="radar-svg"
        viewBox="0 0 700 700"
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => {
          setHoveredCategory(null);
          setHoveredPoint(null);
        }}
      >
        <defs>
          {/* Gradient definitions */}
          {categoryAverages.map(({color, category}) => (
            <linearGradient
              key={category}
              id={`gradient-${category.replace(/\s+/g, "-")}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          ))}
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid circles with animation */}
        {[1, 2, 3, 4, 5].map(i => {
          const radius = (maxRadius / 5) * i;
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={
                isDark
                  ? "rgba(102, 126, 234, 0.08)"
                  : "rgba(107, 91, 149, 0.08)"
              }
              strokeWidth="1"
              className="grid-circle"
              style={{animationDelay: `${i * 100}ms`}}
            />
          );
        })}

        {/* Category lines */}
        {categoryAverages.map(({angle}) => {
          const radian = (angle * Math.PI) / 180;
          const x = centerX + Math.cos(radian) * maxRadius;
          const y = centerY + Math.sin(radian) * maxRadius;
          return (
            <line
              key={angle}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={
                isDark
                  ? "rgba(102, 126, 234, 0.15)"
                  : "rgba(107, 91, 149, 0.15)"
              }
              strokeWidth="1"
              className="category-line"
            />
          );
        })}

        {/* Radar shape with gradient */}
        <path
          d={radarPath}
          fill={
            isDark ? "rgba(102, 126, 234, 0.25)" : "rgba(107, 91, 149, 0.25)"
          }
          stroke={isDark ? "#8b9dff" : "#6b5b95"}
          strokeWidth="3"
          className={`radar-path ${animated ? "animated" : ""}`}
          style={{
            filter: hoveredPoint ? "url(#glow)" : "none",
            transition: "filter 0.3s ease"
          }}
        />

        {/* Category points with interactions */}
        {categoryAverages.map(category => {
          const radian = (category.angle * Math.PI) / 180;
          const radius = (maxRadius / 100) * category.avgMastery;
          const x = centerX + Math.cos(radian) * radius;
          const y = centerY + Math.sin(radian) * radius;
          const labelRadius = maxRadius + 50;
          const labelX = centerX + Math.cos(radian) * labelRadius;
          const labelY = centerY + Math.sin(radian) * labelRadius;
          const isHovered = hoveredPoint === category.category;
          const isSelected = selectedCategory === category.category;

          return (
            <g
              key={category.category}
              className="category-group"
              onMouseEnter={() => setHoveredPoint(category.category)}
              onMouseMove={e => handleMouseMove(e, category)}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.category
                    ? null
                    : category.category
                )
              }
            >
              {/* Invisible larger hit area */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="transparent"
                className="hit-area"
              />

              {/* Category point */}
              <circle
                cx={x}
                cy={y}
                r={isHovered || isSelected ? "12" : "8"}
                fill={category.color}
                stroke="white"
                strokeWidth={isSelected ? "3" : "2"}
                className={`category-point ${isHovered ? "hovered" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                style={{
                  filter: isHovered || isSelected ? "url(#glow)" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />

              {/* Pulse effect for selected */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={category.color}
                  opacity="0.3"
                  className="pulse-ring"
                />
              )}

              {/* Category label */}
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isDark ? "#8b9dff" : "#6b5b95"}
                fontSize="13"
                fontWeight={isHovered || isSelected ? "700" : "600"}
                className={`category-label ${
                  isHovered || isSelected ? "highlighted" : ""
                }`}
                style={{
                  transition: "all 0.3s ease"
                }}
              >
                {category.category.split(" & ")[0].split(" ")[0]}
              </text>

              {/* Mastery value */}
              <text
                x={x}
                y={y - 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={category.color}
                fontSize={isHovered || isSelected ? "13" : "11"}
                fontWeight="700"
                className={`mastery-value ${
                  isHovered || isSelected ? "visible" : ""
                }`}
                style={{
                  opacity: isHovered || isSelected ? 1 : 0.7,
                  transition: "all 0.3s ease"
                }}
              >
                {category.avgMastery}%
              </text>

              {/* Connection line to label when hovered */}
              {isHovered && (
                <line
                  x1={x}
                  y1={y}
                  x2={labelX}
                  y2={labelY}
                  stroke={category.color}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  opacity="0.4"
                  className="connection-line"
                />
              )}
            </g>
          );
        })}

        {/* Center point with animation */}
        <circle
          cx={centerX}
          cy={centerY}
          r="6"
          fill={isDark ? "#8b9dff" : "#6b5b95"}
          className="center-point"
        />
      </svg>

      {/* Selected category details */}
      {selectedCategory && (
        <div className="category-details">
          <h4>
            {
              categoryAverages.find(c => c.category === selectedCategory)
                ?.category
            }
          </h4>
          <div className="details-mastery">
            {
              categoryAverages.find(c => c.category === selectedCategory)
                ?.avgMastery
            }
            % Average Mastery
          </div>
          <div className="details-skills">
            {categoryAverages
              .find(c => c.category === selectedCategory)
              ?.skills.slice(0, 5)
              .map((skill, i) => (
                <span key={i} className="skill-badge">
                  {skill.name} ({skill.mastery}%)
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Network Graph Component
function SkillNetworkGraph({
  skills,
  isDark,
  hoveredCategory,
  setHoveredCategory
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    width: 1000,
    height: 700
  });

  // Memoize network data with stable positions
  const networkData = useMemo(() => {
    // Group by category for better layout
    const categoryGroups = {};
    skills.forEach(skill => {
      if (!categoryGroups[skill.category]) {
        categoryGroups[skill.category] = [];
      }
      categoryGroups[skill.category].push(skill);
    });

    // Position nodes in a circular layout per category
    const nodes = [];
    const links = [];
    const categories = Object.keys(categoryGroups);
    const centerX = 500;
    const centerY = 350;
    const categoryRadius = 200;

    categories.forEach((category, catIndex) => {
      const categoryAngle = (catIndex / categories.length) * Math.PI * 2;
      const categoryCenterX =
        centerX + Math.cos(categoryAngle) * categoryRadius;
      const categoryCenterY =
        centerY + Math.sin(categoryAngle) * categoryRadius;
      const skills = categoryGroups[category];
      const skillRadius = Math.min(80, skills.length * 8);

      skills.forEach((skill, skillIndex) => {
        const skillAngle = (skillIndex / skills.length) * Math.PI * 2;
        const x = categoryCenterX + Math.cos(skillAngle) * skillRadius;
        const y = categoryCenterY + Math.sin(skillAngle) * skillRadius;

        nodes.push({
          id: skill.name,
          category: skill.category,
          mastery: skill.mastery,
          x,
          y,
          color: skill.color || "#6b5b95"
        });

        // Connect to next skill in category
        if (skillIndex < skills.length - 1) {
          links.push({
            source: skill.name,
            target: skills[skillIndex + 1].name
          });
        }
      });
    });

    return {nodes, links};
  }, [skills]);

  // Handle zoom with mouse wheel
  const handleWheel = useCallback(
    e => {
      e.preventDefault();
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const scale = e.deltaY > 0 ? 0.9 : 1.1;
      const newWidth = viewBox.width * scale;
      const newHeight = viewBox.height * scale;

      // Constrain zoom
      if (newWidth < 500 || newWidth > 2000) return;

      const svgWidth = rect.width;
      const svgHeight = rect.height;
      const xPercent = mouseX / svgWidth;
      const yPercent = mouseY / svgHeight;

      const newX = viewBox.x - (newWidth - viewBox.width) * xPercent;
      const newY = viewBox.y - (newHeight - viewBox.height) * yPercent;

      setViewBox({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight
      });
    },
    [viewBox]
  );

  return (
    <div className="network-container" ref={containerRef} onWheel={handleWheel}>
      <svg
        ref={svgRef}
        className="network-svg"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for links */}
          <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(107, 91, 149, 0.2)" />
            <stop offset="100%" stopColor="rgba(107, 91, 149, 0.05)" />
          </linearGradient>

          {/* Glow filter for nodes */}
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw links with animation */}
        {networkData.links.map((link, index) => {
          const sourceNode = networkData.nodes.find(n => n.id === link.source);
          const targetNode = networkData.nodes.find(n => n.id === link.target);
          if (!sourceNode || !targetNode) return null;

          const isHighlighted =
            hoveredNode === link.source || hoveredNode === link.target;

          return (
            <line
              key={index}
              x1={sourceNode.x}
              y1={sourceNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={
                isDark ? "rgba(102, 126, 234, 0.2)" : "rgba(107, 91, 149, 0.2)"
              }
              strokeWidth={isHighlighted ? "2" : "1"}
              className={`network-link ${isHighlighted ? "highlighted" : ""}`}
              style={{
                opacity: isHighlighted ? 0.6 : 0.3,
                transition: "all 0.3s ease"
              }}
            />
          );
        })}

        {/* Draw nodes */}
        {networkData.nodes.map((node, index) => {
          const size = (node.mastery / 100) * 10 + 5;
          const isHovered = hoveredNode === node.id;
          const nodeOpacity = isHovered ? 1 : 0.8;

          return (
            <g
              key={index}
              className="network-node"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Glow effect */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={size + 5}
                  fill={node.color}
                  opacity="0.2"
                  className="node-glow"
                />
              )}

              {/* Node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? size + 2 : size}
                fill={node.color}
                opacity={nodeOpacity}
                className="node-circle"
                style={{
                  filter: isHovered ? "url(#nodeGlow)" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer"
                }}
              />

              {/* Node label */}
              <text
                x={node.x}
                y={node.y + size + (isHovered ? 16 : 14)}
                textAnchor="middle"
                fontSize={isHovered ? "11" : "10"}
                fill={isDark ? "#8b9dff" : "#6b5b95"}
                className="node-label"
                style={{
                  fontWeight: isHovered ? "700" : "500",
                  transition: "all 0.3s ease"
                }}
              >
                {node.id.length > 15
                  ? node.id.substring(0, 13) + "..."
                  : node.id}
              </text>

              {/* Mastery badge on hover */}
              {isHovered && (
                <text
                  x={node.x}
                  y={node.y - size - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fill={node.color}
                  fontWeight="700"
                  className="node-mastery"
                >
                  {node.mastery}%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Zoom controls */}
      <div className="network-controls">
        <button
          className="zoom-btn"
          onClick={() => {
            const scale = 0.8;
            setViewBox(prev => ({
              x: prev.x + prev.width * 0.1,
              y: prev.y + prev.height * 0.1,
              width: prev.width * scale,
              height: prev.height * scale
            }));
          }}
          aria-label="Zoom In"
        >
          +
        </button>
        <button
          className="zoom-btn"
          onClick={() => {
            const scale = 1.25;
            setViewBox(prev => ({
              x: prev.x - prev.width * 0.1,
              y: prev.y - prev.height * 0.1,
              width: prev.width * scale,
              height: prev.height * scale
            }));
          }}
          aria-label="Zoom Out"
        >
          −
        </button>
        <button
          className="zoom-btn"
          onClick={() => setViewBox({x: 0, y: 0, width: 1000, height: 700})}
          aria-label="Reset"
        >
          ⌂
        </button>
      </div>
    </div>
  );
}

// Enhanced Mastery Rings Component
function SkillMasteryRings({
  skills,
  isDark,
  hoveredCategory,
  setHoveredCategory
}) {
  const [animatedRings, setAnimatedRings] = useState(new Set());
  const [hoveredRing, setHoveredRing] = useState(null);

  // Memoize category mastery calculation
  const categoryMastery = useMemo(() => {
    const mastery = {};
    skills.forEach(skill => {
      if (!mastery[skill.category]) {
        mastery[skill.category] = {
          skills: [],
          avgMastery: 0,
          color: skill.color || "#6b5b95"
        };
      }
      mastery[skill.category].skills.push(skill);
    });

    Object.keys(mastery).forEach(category => {
      const categorySkills = mastery[category].skills;
      mastery[category].avgMastery = Math.round(
        categorySkills.reduce((sum, s) => sum + s.mastery, 0) /
          categorySkills.length
      );
    });

    return mastery;
  }, [skills]);

  const categories = Object.entries(categoryMastery);

  useEffect(() => {
    // Animate rings on mount
    categories.forEach(([category], index) => {
      setTimeout(() => {
        setAnimatedRings(prev => new Set([...prev, category]));
      }, index * 150);
    });
  }, [categories]);

  return (
    <div className="mastery-rings-container">
      {categories.map(([category, data], index) => {
        const isAnimated = animatedRings.has(category);
        const isHovered = hoveredRing === category;
        const circumference = 2 * Math.PI * 50;
        const offset = circumference * (1 - data.avgMastery / 100);

        return (
          <div
            key={category}
            className={`mastery-ring-group ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => {
              setHoveredRing(category);
              setHoveredCategory({category, ...data});
            }}
            onMouseLeave={() => {
              setHoveredRing(null);
              setHoveredCategory(null);
            }}
            style={{animationDelay: `${index * 100}ms`}}
          >
            <div className="ring-header">
              <h4 className="ring-category">{category}</h4>
              <div className="ring-mastery">{data.avgMastery}%</div>
            </div>
            <div className="mastery-ring">
              <svg className="ring-svg" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  className="ring-bg"
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={
                    isDark
                      ? "rgba(102, 126, 234, 0.1)"
                      : "rgba(107, 91, 149, 0.1)"
                  }
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  className={`ring-progress ${isAnimated ? "animated" : ""}`}
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={isAnimated ? offset : circumference}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{
                    transition:
                      "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    filter: isHovered
                      ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
                      : "none"
                  }}
                />
                {/* Glow effect on hover */}
                {isHovered && (
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={data.color}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    opacity="0.2"
                    className="ring-glow"
                  />
                )}
              </svg>
              <div className="ring-content">
                <div className="ring-value">{data.avgMastery}%</div>
                <div className="ring-count">{data.skills.length} skills</div>
              </div>
            </div>
            <div className="ring-skills">
              {data.skills.slice(0, 4).map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="ring-skill-item"
                  style={{
                    opacity: isHovered ? 1 : 0.8,
                    transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div
                    className="skill-dot"
                    style={{
                      background: data.color,
                      boxShadow: isHovered
                        ? `0 0 8px ${data.color}`
                        : "0 2px 4px rgba(0, 0, 0, 0.2)"
                    }}
                  ></div>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-mastery">{skill.mastery}%</span>
                </div>
              ))}
              {data.skills.length > 4 && (
                <div className="ring-skill-item more">
                  +{data.skills.length - 4} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
