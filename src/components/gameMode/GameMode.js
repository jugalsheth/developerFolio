import React, {useState, useEffect, useContext} from "react";
import "./GameMode.scss";
import StyleContext from "../../contexts/StyleContext";

export default function GameMode() {
  const {isDark} = useContext(StyleContext);
  const [isGameMode, setIsGameMode] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const [showStats, setShowStats] = useState(false);

  const missions = [
    {
      id: "scroll_50",
      name: "Explorer",
      description: "Scroll to 50%",
      xp: 100,
      emoji: "🗺️"
    },
    {
      id: "scroll_100",
      name: "Completionist",
      description: "Reach the bottom",
      xp: 200,
      emoji: "🏁"
    },
    {
      id: "resume_tab",
      name: "Tab Master",
      description: "Click all 4 Resume tabs",
      xp: 150,
      emoji: "📊"
    },
    {
      id: "code_copied",
      name: "Code Ninja",
      description: "Copy a code snippet",
      xp: 100,
      emoji: "💻"
    },
    {
      id: "challenge_opened",
      name: "Challenger",
      description: "Open a Challenge modal",
      xp: 150,
      emoji: "🎯"
    },
    {
      id: "dark_mode",
      name: "Theme Explorer",
      description: "Toggle dark mode",
      xp: 50,
      emoji: "🌓"
    },
    {
      id: "project_filter",
      name: "Filter Pro",
      description: "Use project filter",
      xp: 75,
      emoji: "🔍"
    },
    {
      id: "arch_clicked",
      name: "Architect",
      description: "Click architecture nodes",
      xp: 100,
      emoji: "🏗️"
    },
    {
      id: "tech_radar",
      name: "Tech Scout",
      description: "Explore Tech Radar",
      xp: 100,
      emoji: "📡"
    },
    {
      id: "sticky_nav",
      name: "Navigator",
      description: "Use sticky navigation",
      xp: 75,
      emoji: "🧭"
    }
  ];

  const totalPossibleXP = missions.reduce((sum, m) => sum + m.xp, 0);
  const progress = Math.floor((score / totalPossibleXP) * 100);

  useEffect(() => {
    if (!isGameMode) return;

    // Mission listeners
    const checkMissions = () => {
      // Scroll missions
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= 50 && !completedMissions.has("scroll_50")) {
        completeMission("scroll_50");
      }
      if (scrollPercent >= 98 && !completedMissions.has("scroll_100")) {
        completeMission("scroll_100");
      }
    };

    // Resume tab click listener
    const handleResumeTabClick = e => {
      if (e.target.closest(".resume-tab")) {
        if (!completedMissions.has("resume_tab")) {
          completeMission("resume_tab");
        }
      }
    };

    // Code copy listener
    const handleCodeCopy = e => {
      if (e.target.closest(".copy-btn")) {
        if (!completedMissions.has("code_copied")) {
          completeMission("code_copied");
        }
      }
    };

    // Challenge modal listener
    const handleChallengeClick = e => {
      if (
        e.target.closest(".challenge-preview-card") ||
        e.target.closest(".challenge-modal")
      ) {
        if (!completedMissions.has("challenge_opened")) {
          completeMission("challenge_opened");
        }
      }
    };

    // Dark mode listener
    const handleThemeToggle = e => {
      if (e.target.closest(".toggle-switch")) {
        if (!completedMissions.has("dark_mode")) {
          completeMission("dark_mode");
        }
      }
    };

    // Project filter listener
    const handleFilterClick = e => {
      if (e.target.closest(".filter-btn")) {
        if (!completedMissions.has("project_filter")) {
          completeMission("project_filter");
        }
      }
    };

    // Architecture node listener
    const handleArchClick = e => {
      if (e.target.closest(".arch-node")) {
        if (!completedMissions.has("arch_clicked")) {
          completeMission("arch_clicked");
        }
      }
    };

    // Tech radar listener
    const handleTechRadarClick = e => {
      if (e.target.closest(".tech-item")) {
        if (!completedMissions.has("tech_radar")) {
          completeMission("tech_radar");
        }
      }
    };

    // Sticky nav listener
    const handleStickyNavClick = e => {
      if (e.target.closest(".nav-item")) {
        if (!completedMissions.has("sticky_nav")) {
          completeMission("sticky_nav");
        }
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkMissions();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleResumeTabClick);
    document.addEventListener("click", handleCodeCopy);
    document.addEventListener("click", handleChallengeClick);
    document.addEventListener("click", handleThemeToggle);
    document.addEventListener("click", handleFilterClick);
    document.addEventListener("click", handleArchClick);
    document.addEventListener("click", handleTechRadarClick);
    document.addEventListener("click", handleStickyNavClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleResumeTabClick);
      document.removeEventListener("click", handleCodeCopy);
      document.removeEventListener("click", handleChallengeClick);
      document.removeEventListener("click", handleThemeToggle);
      document.removeEventListener("click", handleFilterClick);
      document.removeEventListener("click", handleArchClick);
      document.removeEventListener("click", handleTechRadarClick);
      document.removeEventListener("click", handleStickyNavClick);
    };
  }, [isGameMode, completedMissions]);

  const completeMission = missionId => {
    const mission = missions.find(m => m.id === missionId);
    if (mission && !completedMissions.has(missionId)) {
      setCompletedMissions(prev => new Set([...prev, missionId]));
      setScore(prev => prev + mission.xp);

      // Show mission complete notification
      showMissionNotification(mission);

      // Level up every 300 XP
      const newLevel = Math.floor((score + mission.xp) / 300) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        showLevelUpNotification(newLevel);
      }
    }
  };

  const showMissionNotification = mission => {
    const notification = document.createElement("div");
    notification.className = `mission-notification ${
      isDark ? "dark-mode" : ""
    }`;
    notification.innerHTML = `
      <div class="mission-complete-content">
        <span class="mission-emoji">${mission.emoji}</span>
        <div class="mission-text">
          <div class="mission-name">${mission.name} Complete!</div>
          <div class="mission-xp">+${mission.xp} XP</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  };

  const showLevelUpNotification = newLevel => {
    const notification = document.createElement("div");
    notification.className = `level-up-notification ${
      isDark ? "dark-mode" : ""
    }`;
    notification.innerHTML = `
      <div class="level-up-content">
        <div class="level-up-title">LEVEL UP! 🎉</div>
        <div class="level-up-text">You're now Level ${newLevel}</div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 4000);
  };

  const toggleGameMode = () => {
    setIsGameMode(!isGameMode);
    if (!isGameMode) {
      // Reset on activate
      setScore(0);
      setLevel(1);
      setCompletedMissions(new Set());
    }
  };

  const getRank = () => {
    if (progress < 20) return "Visitor";
    if (progress < 40) return "Explorer";
    if (progress < 60) return "Investigator";
    if (progress < 80) return "Expert";
    return "Portfolio Master";
  };

  const shareResults = () => {
    const text = `🎮 I just explored @jugalsheth's portfolio in Game Mode!\n\n🏆 Level ${level} ${getRank()}\n📊 ${score} XP earned\n✅ ${
      completedMissions.size
    }/${
      missions.length
    } missions complete\n\nTry it yourself: https://jugalsheth.github.io/developerFolio/`;

    if (navigator.share) {
      navigator.share({
        title: "Portfolio Game Mode Challenge",
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Results copied to clipboard!");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`game-mode-toggle ${isGameMode ? "active" : ""} ${
          isDark ? "dark-mode" : ""
        }`}
        onClick={toggleGameMode}
        title={isGameMode ? "Exit Game Mode" : "Activate Game Mode"}
      >
        {isGameMode ? "🎮" : "🎮"}
      </button>

      {/* Game Mode HUD */}
      {isGameMode && (
        <div className={`game-mode-hud ${isDark ? "dark-mode" : ""}`}>
          <div className="hud-header">
            <div className="hud-title">🎮 GAME MODE</div>
            <button className="hud-close" onClick={toggleGameMode}>
              ×
            </button>
          </div>

          <div className="hud-stats">
            <div className="stat-item">
              <div className="stat-label">Level</div>
              <div className="stat-value">{level}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">XP</div>
              <div className="stat-value">{score}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Rank</div>
              <div className="stat-value">{getRank()}</div>
            </div>
          </div>

          <div className="xp-bar-container">
            <div className="xp-bar" style={{width: `${progress}%`}} />
            <div className="xp-text">{progress}%</div>
          </div>

          <div className="missions-list">
            <div className="missions-header">
              Missions ({completedMissions.size}/{missions.length})
            </div>
            <div className="missions-scroll">
              {missions.map(mission => (
                <div
                  key={mission.id}
                  className={`mission-item ${
                    completedMissions.has(mission.id) ? "completed" : ""
                  }`}
                >
                  <span className="mission-emoji">{mission.emoji}</span>
                  <div className="mission-info">
                    <div className="mission-name">{mission.name}</div>
                    <div className="mission-desc">{mission.description}</div>
                  </div>
                  <div className="mission-xp">
                    {completedMissions.has(mission.id)
                      ? "✓"
                      : `${mission.xp} XP`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {progress === 100 && (
            <button className="share-results-btn" onClick={shareResults}>
              Share My Score 🎉
            </button>
          )}

          {progress === 100 && (
            <button
              className="view-stats-btn"
              onClick={() => setShowStats(true)}
            >
              View Final Stats 📊
            </button>
          )}
        </div>
      )}

      {/* Final Stats Modal */}
      {showStats && (
        <div className={`stats-modal-overlay ${isDark ? "dark-mode" : ""}`}>
          <div className={`stats-modal ${isDark ? "dark-mode" : ""}`}>
            <button
              className="stats-close-btn"
              onClick={() => setShowStats(false)}
            >
              ×
            </button>

            <div className="stats-content">
              <h2 className="stats-title">🎉 Game Mode Complete!</h2>

              <div className="final-rank">
                <div className="rank-badge">🏆</div>
                <div className="rank-title">
                  Level {level} {getRank()}
                </div>
              </div>

              <div className="final-stats-grid">
                <div className="final-stat">
                  <div className="final-stat-value">{score}</div>
                  <div className="final-stat-label">Total XP</div>
                </div>
                <div className="final-stat">
                  <div className="final-stat-value">
                    {completedMissions.size}/{missions.length}
                  </div>
                  <div className="final-stat-label">Missions</div>
                </div>
                <div className="final-stat">
                  <div className="final-stat-value">{progress}%</div>
                  <div className="final-stat-label">Completion</div>
                </div>
              </div>

              <div className="achievements-showcase">
                <h3>Achievements Unlocked</h3>
                <div className="achievement-badges">
                  {Array.from(completedMissions).map(missionId => {
                    const mission = missions.find(m => m.id === missionId);
                    return (
                      <div key={missionId} className="achievement-badge">
                        <span className="badge-emoji">{mission.emoji}</span>
                        <span className="badge-name">{mission.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="share-results-btn large"
                onClick={shareResults}
              >
                Share My Results 🎉
              </button>

              <p className="stats-footer">
                Thanks for playing! Want to hire me? Let's talk! 💼
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
