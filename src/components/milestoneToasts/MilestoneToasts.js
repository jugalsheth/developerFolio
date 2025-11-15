import React, {useState, useEffect, useContext} from "react";
import "./MilestoneToasts.scss";
import StyleContext from "../../contexts/StyleContext";

const milestones = [
  {percent: 25, message: "You're getting the hang of it!", icon: "📊", emoji: "🎯"},
  {percent: 50, message: "Halfway there! The best is yet to come", icon: "🚀", emoji: "💪"},
  {percent: 75, message: "Almost done! You're thorough", icon: "💪", emoji: "🔥"},
  {percent: 100, message: "You made it! You're one of the few! 🎉", icon: "🎉", emoji: "🏆"}
];

export default function MilestoneToasts() {
  const {isDark} = useContext(StyleContext);
  const [activeToast, setActiveToast] = useState(null);
  const [shownMilestones, setShownMilestones] = useState(new Set());

  useEffect(() => {
    let ticking = false;

    const checkMilestones = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = Math.floor((scrollTop / totalScroll) * 100);

      milestones.forEach(milestone => {
        if (progress >= milestone.percent && !shownMilestones.has(milestone.percent)) {
          // Show toast
          setActiveToast(milestone);
          setShownMilestones(prev => new Set([...prev, milestone.percent]));

          // Auto-hide after 4 seconds
          setTimeout(() => {
            setActiveToast(null);
          }, 4000);
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkMilestones();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shownMilestones]);

  if (!activeToast) return null;

  return (
    <div className={`milestone-toast ${isDark ? "dark-mode" : ""}`}>
      <div className="toast-icon">{activeToast.icon}</div>
      <div className="toast-content">
        <div className="toast-message">{activeToast.message}</div>
        <div className="toast-progress">{activeToast.percent}% explored</div>
      </div>
      <div className="toast-emoji">{activeToast.emoji}</div>
    </div>
  );
}

