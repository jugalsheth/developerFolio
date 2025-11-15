import React, {useState, useContext} from "react";
import "./GrowthTrajectory.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function GrowthTrajectory() {
  const {isDark} = useContext(StyleContext);
  const [activeTab, setActiveTab] = useState("curve");

  const tabs = [
    {id: "curve", label: "Growth Curve", icon: "📈"},
    {id: "speed", label: "Learning Speed", icon: "⚡"},
    {id: "value", label: "Value Delivered", icon: "💰"},
    {id: "hunger", label: "Current Streak", icon: "🔥"}
  ];

  const growthMilestones = [
    {year: "2019", impact: 1, label: "The Pivot", description: "Discovered data"},
    {year: "2021", impact: 3, label: "First Data Role", description: "Claims analyst → impact"},
    {year: "2022", impact: 8, label: "Analytics Engineer", description: "$2M decisions supported"},
    {year: "2023", impact: 15, label: "Senior Engineer", description: "50+ datasets, 40% optimization"},
    {year: "2024", impact: 30, label: "Full-Stack Builder", description: "500 users, production systems"}
  ];

  const skillSpeed = [
    {skill: "SQL", weeks: 2, outcome: "Production queries", color: "#3498db"},
    {skill: "Python", weeks: 3, outcome: "Automation scripts", color: "#e74c3c"},
    {skill: "Snowflake", weeks: 4, outcome: "DWH architecture", color: "#16a085"},
    {skill: "NextJS", weeks: 6, outcome: "200+ user app", color: "#9b59b6"},
    {skill: "dbt", weeks: 2, outcome: "Production pipelines", color: "#667eea"},
    {skill: "System Design", weeks: 12, outcome: "Multi-tenant systems", color: "#6b5b95"}
  ];

  const valueTimeline = [
    {year: 2021, value: "0.5M", label: "Reports & Analytics", multiplier: "1x"},
    {year: 2022, value: "2M", label: "Dashboards & Insights", multiplier: "4x"},
    {year: 2023, value: "40%", label: "Cost Optimization", multiplier: "8x"},
    {year: 2024, value: "500", label: "Users Served", multiplier: "15x"}
  ];

  const currentHunger = {
    learningStreak: 47,
    newSkills2024: 8,
    projectsShipped: 5,
    automationScripts: 15,
    lateNightCommits: "∞",
    currentFocus: "System Design & Solutions Engineering"
  };

  const industryComparison = [
    {metric: "Time to Production-Ready", industry: "6 months", you: "6 weeks", better: "4x faster"},
    {metric: "Career Growth", industry: "Linear", you: "Exponential", better: "15x impact"},
    {metric: "Skill Acquisition", industry: "1-2 per year", you: "8 in 2024", better: "4x faster"}
  ];

  return (
    <div className="growth-trajectory-container">
      <Fade bottom duration={1000} distance="20px">
        <div className="growth-header">
          <h2 className={isDark ? "dark-mode growth-title" : "growth-title"}>
            The Growth Story
          </h2>
          <p className={isDark ? "dark-mode growth-subtitle" : "growth-subtitle"}>
            From mechanical engineer to full-stack data engineer in 3 years - exponential growth, not linear
          </p>
        </div>
      </Fade>

      {/* Tab Navigation */}
      <div className="growth-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`growth-tab ${activeTab === tab.id ? "active" : ""} ${isDark ? "dark-mode" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="growth-content">
        {/* Growth Curve Tab */}
        {activeTab === "curve" && (
          <Fade key="curve" duration={500}>
            <div className={isDark ? "growth-chart-container dark-mode" : "growth-chart-container"}>
              <div className="chart-header">
                <h3>Impact Acceleration Over Time</h3>
                <p>Not linear growth - exponential growth 📈</p>
              </div>
              
              <div className="exponential-curve">
                {growthMilestones.map((milestone, index) => (
                  <div 
                    key={index} 
                    className="milestone-point"
                    style={{
                      left: `${(index / (growthMilestones.length - 1)) * 90}%`,
                      bottom: `${(milestone.impact / 30) * 70}%`
                    }}
                  >
                    <div className="milestone-dot" style={{animationDelay: `${index * 0.2}s`}}>
                      <span className="milestone-value">{milestone.impact}x</span>
                    </div>
                    <div className="milestone-label">
                      <div className="milestone-year">{milestone.year}</div>
                      <div className="milestone-title">{milestone.label}</div>
                      <div className="milestone-desc">{milestone.description}</div>
                    </div>
                  </div>
                ))}
                
                {/* Curve line */}
                <svg className="curve-line" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 0 95 Q 25 80, 40 60 T 70 25 T 100 5"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    className="animated-path"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e74c3c" />
                      <stop offset="50%" stopColor="#9b59b6" />
                      <stop offset="100%" stopColor="#667eea" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className={isDark ? "curve-footer dark-mode" : "curve-footer"}>
                <strong>Velocity: ACCELERATING</strong> - Each year's impact > all previous years combined
              </div>
            </div>
          </Fade>
        )}

        {/* Learning Speed Tab */}
        {activeTab === "speed" && (
          <Fade key="speed" duration={500}>
            <div className={isDark ? "learning-speed-container dark-mode" : "learning-speed-container"}>
              <div className="speed-header">
                <div className="sponge-icon">🧽</div>
                <div className="speed-text">
                  <h3>Like a Sponge: Rapid Skill Absorption</h3>
                  <p>Production-grade skills in weeks, not months</p>
                </div>
              </div>

              <div className="skills-timeline">
                {skillSpeed.map((skill, index) => (
                  <div key={index} className="skill-speed-item" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="skill-info">
                      <div className="skill-name" style={{color: skill.color}}>{skill.skill}</div>
                      <div className="skill-outcome">{skill.outcome}</div>
                    </div>
                    <div className="skill-time">
                      <div className="time-badge" style={{borderColor: skill.color, color: skill.color}}>
                        {skill.weeks} weeks
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="comparison-section">
                <h4>Industry Average vs. Me</h4>
                <div className="comparison-grid">
                  {industryComparison.map((comp, index) => (
                    <div key={index} className={isDark ? "comparison-card dark-mode" : "comparison-card"}>
                      <div className="comp-metric">{comp.metric}</div>
                      <div className="comp-values">
                        <span className="comp-industry">Industry: {comp.industry}</span>
                        <span className="comp-arrow">→</span>
                        <span className="comp-you">Me: {comp.you}</span>
                      </div>
                      <div className="comp-result">{comp.better} 🚀</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={isDark ? "speed-footer dark-mode" : "speed-footer"}>
                <strong>"If I've learned it once, I master it. If I've done it twice, I automate it."</strong>
              </div>
            </div>
          </Fade>
        )}

        {/* Value Delivered Tab */}
        {activeTab === "value" && (
          <Fade key="value" duration={500}>
            <div className={isDark ? "value-container dark-mode" : "value-container"}>
              <div className="value-header">
                <h3>Impact Multiplier Effect</h3>
                <p>Value delivered growing exponentially year over year</p>
              </div>

              <div className="value-timeline">
                {valueTimeline.map((item, index) => (
                  <div key={index} className="value-milestone" style={{animationDelay: `${index * 0.15}s`}}>
                    <div className="value-year">{item.year}</div>
                    <div className="value-bar-container">
                      <div 
                        className="value-bar" 
                        style={{width: `${(item.multiplier.replace('x', '') / 15) * 100}%`}}
                      />
                      <div className="value-multiplier">{item.multiplier}</div>
                    </div>
                    <div className="value-amount">${item.value}</div>
                    <div className="value-label">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className={isDark ? "value-insight dark-mode" : "value-insight"}>
                <div className="insight-icon">💡</div>
                <div className="insight-text">
                  <strong>Impact Acceleration:</strong> From supporting decisions to shipping products that 500+ people use daily. 
                  Each year's contribution exceeds all previous years combined.
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* Current Hunger Tab */}
        {activeTab === "hunger" && (
          <Fade key="hunger" duration={500}>
            <div className={isDark ? "hunger-container dark-mode" : "hunger-container"}>
              <div className="hunger-header">
                <div className="fire-icon">🔥</div>
                <div className="hunger-text">
                  <h3>Still Hungry, Still Growing</h3>
                  <p>The drive that got me here isn't slowing down</p>
                </div>
              </div>

              <div className="hunger-stats">
                <div className="hunger-stat">
                  <div className="hunger-value">{currentHunger.learningStreak}</div>
                  <div className="hunger-label">Days Learning Streak</div>
                  <div className="hunger-desc">Currently: System Design</div>
                </div>
                <div className="hunger-stat">
                  <div className="hunger-value">{currentHunger.newSkills2024}</div>
                  <div className="hunger-label">New Skills in 2024</div>
                  <div className="hunger-desc">Still adding more</div>
                </div>
                <div className="hunger-stat">
                  <div className="hunger-value">{currentHunger.projectsShipped}</div>
                  <div className="hunger-label">Production Systems</div>
                  <div className="hunger-desc">All in last 12 months</div>
                </div>
                <div className="hunger-stat">
                  <div className="hunger-value">{currentHunger.automationScripts}+</div>
                  <div className="hunger-label">Scripts Built</div>
                  <div className="hunger-desc">Automate everything</div>
                </div>
              </div>

              <div className={isDark ? "current-focus dark-mode" : "current-focus"}>
                <h4>🎯 Currently Leveling Up:</h4>
                <p>{currentHunger.currentFocus}</p>
              </div>

              <div className="hunger-quotes">
                <div className={isDark ? "quote-card dark-mode" : "quote-card"}>
                  <div className="quote-icon">"</div>
                  <p>200 users in week 1 because I built for scale from day 1</p>
                </div>
                <div className={isDark ? "quote-card dark-mode" : "quote-card"}>
                  <div className="quote-icon">"</div>
                  <p>Went from 'What's dbt?' to 'Architecting medallion architecture' in 3 weeks</p>
                </div>
                <div className={isDark ? "quote-card dark-mode" : "quote-card"}>
                  <div className="quote-icon">"</div>
                  <p>Not just learning - SHIPPING. 5 production systems in 2024 alone.</p>
                </div>
              </div>

              <div className={isDark ? "hunger-footer dark-mode" : "hunger-footer"}>
                <div className="hunger-meter">
                  <div className="meter-label">Hunger Level:</div>
                  <div className="meter-bar">
                    <div className="meter-fill" style={{width: "100%"}}>
                      <span className="meter-text">MAXIMUM 🔥</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        )}
      </div>

      {/* Bottom Summary Banner */}
      <Fade bottom duration={1000} distance="20px">
        <div className={isDark ? "growth-summary dark-mode" : "growth-summary"}>
          <div className="summary-stat">
            <div className="summary-icon">📊</div>
            <div className="summary-text">
              <strong>15x</strong> Impact Multiplier
            </div>
          </div>
          <div className="summary-stat">
            <div className="summary-icon">⚡</div>
            <div className="summary-text">
              <strong>4x</strong> Faster Learning
            </div>
          </div>
          <div className="summary-stat">
            <div className="summary-icon">🚀</div>
            <div className="summary-text">
              <strong>Exponential</strong> Growth
            </div>
          </div>
          <div className="summary-stat">
            <div className="summary-icon">🔥</div>
            <div className="summary-text">
              <strong>Still</strong> Hungry
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

