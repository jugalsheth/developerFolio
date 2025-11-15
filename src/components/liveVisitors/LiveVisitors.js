import React, {useState, useEffect, useContext} from "react";
import "./LiveVisitors.scss";
import StyleContext from "../../contexts/StyleContext";

export default function LiveVisitors() {
  const {isDark} = useContext(StyleContext);
  const [visitorCount, setVisitorCount] = useState(2);
  const [recentActivity, setRecentActivity] = useState("");
  const [showActivity, setShowActivity] = useState(false);

  const activities = [
    "Someone just earned Code Ninja badge 🥷",
    "Alex from SF opened Challenge #2 🎯",
    "Sarah copied the Snowflake snippet ❄️",
    "Michael clicked all Resume tabs 📊",
    "Jessica completed Game Mode 🎮",
    "David explored Tech Radar 📡",
    "Emily toggled dark mode 🌓",
    "Chris filtered projects by GenAI 🤖",
    "Lisa clicked the architecture diagram 🏗️",
    "Ryan reached 100% completion 🎉"
  ];

  useEffect(() => {
    // Update visitor count every 30-60 seconds
    const visitorInterval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setVisitorCount(prev => Math.max(1, Math.min(5, prev + change)));
    }, Math.random() * 30000 + 30000); // 30-60 seconds

    // Show activity feed every 10-20 seconds
    const activityInterval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity(randomActivity);
      setShowActivity(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setShowActivity(false);
      }, 5000);
    }, Math.random() * 10000 + 10000); // 10-20 seconds

    return () => {
      clearInterval(visitorInterval);
      clearInterval(activityInterval);
    };
  }, []);

  return (
    <>
      {/* Live Visitor Counter */}
      <div className={`live-visitors-widget ${isDark ? "dark-mode" : ""}`}>
        <div className="visitor-indicator">
          <span className="live-dot"></span>
          <span className="visitor-count">{visitorCount} viewing now</span>
        </div>
      </div>

      {/* Recent Activity Feed */}
      {showActivity && (
        <div className={`activity-feed ${isDark ? "dark-mode" : ""}`}>
          <div className="activity-content">
            <span className="activity-icon">👤</span>
            <span className="activity-text">{recentActivity}</span>
          </div>
        </div>
      )}
    </>
  );
}

