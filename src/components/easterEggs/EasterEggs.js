import {useEffect, useState} from "react";
import "./EasterEggs.scss";

export default function EasterEggs() {
  const [inputBuffer, setInputBuffer] = useState("");
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [usersClickCount, setUsersClickCount] = useState(0);

  useEffect(() => {
    let logoClickTimer = null;
    let usersClickTimer = null;

    // Easter Egg 1: Type "data" anywhere
    const handleKeyPress = (e) => {
      const newBuffer = (inputBuffer + e.key).slice(-4);
      setInputBuffer(newBuffer);

      if (newBuffer === "data") {
        showToast("Data is my love language ❤️", "💾");
        setInputBuffer("");
      }
    };

    // Easter Egg 2: Triple-click logo
    const handleLogoClick = (e) => {
      if (e.target.closest('a[href="#greeting"]') || e.target.closest('.greeting-text')) {
        setLogoClickCount(prev => prev + 1);
        
        clearTimeout(logoClickTimer);
        logoClickTimer = setTimeout(() => setLogoClickCount(0), 1000);

        if (logoClickCount + 1 >= 3) {
          showToast("SELECT * FROM career WHERE growth = 'exponential' 😄", "💻");
          setLogoClickCount(0);
        }
      }
    };

    // Easter Egg 3: Click "200+ Users" 5 times
    const handleUsersClick = (e) => {
      const quickStatsText = e.target.closest('.stat-text');
      if (quickStatsText && quickStatsText.textContent.includes("200+ Users")) {
        setUsersClickCount(prev => prev + 1);
        
        clearTimeout(usersClickTimer);
        usersClickTimer = setTimeout(() => setUsersClickCount(0), 2000);

        if (usersClickCount + 1 >= 5) {
          showGrowthChart();
          setUsersClickCount(0);
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("click", handleLogoClick);
    document.addEventListener("click", handleUsersClick);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("click", handleLogoClick);
      document.removeEventListener("click", handleUsersClick);
      clearTimeout(logoClickTimer);
      clearTimeout(usersClickTimer);
    };
  }, [inputBuffer, logoClickCount, usersClickCount]);

  const showToast = (message, icon) => {
    const existingToast = document.querySelector(".easter-egg-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "easter-egg-toast";
    toast.innerHTML = `
      <div class="egg-toast-content">
        <span class="egg-icon">${icon}</span>
        <span class="egg-message">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
  };

  const showGrowthChart = () => {
    const existingChart = document.querySelector(".growth-chart-modal");
    if (existingChart) return;

    const modal = document.createElement("div");
    modal.className = "growth-chart-modal";
    modal.innerHTML = `
      <div class="growth-chart-content">
        <button class="chart-close-btn">×</button>
        <h3>📈 Procurement Platform Adoption</h3>
        <p>Week-by-week user growth</p>
        <div class="chart-bars">
          <div class="chart-bar">
            <div class="bar-fill" style="height: 25%; animation-delay: 0s;"></div>
            <div class="bar-label">Week 1<br>50 users</div>
          </div>
          <div class="chart-bar">
            <div class="bar-fill" style="height: 60%; animation-delay: 0.2s;"></div>
            <div class="bar-label">Week 2<br>120 users</div>
          </div>
          <div class="chart-bar">
            <div class="bar-fill" style="height: 100%; animation-delay: 0.4s;"></div>
            <div class="bar-label">Week 3<br>200 users</div>
          </div>
          <div class="chart-bar">
            <div class="bar-fill" style="height: 125%; animation-delay: 0.6s;"></div>
            <div class="bar-label">Week 4<br>250+ users</div>
          </div>
        </div>
        <div class="chart-footer">🚀 Exponential adoption from day 1</div>
      </div>
    `;
    document.body.appendChild(modal);

    // Close button
    modal.querySelector(".chart-close-btn").onclick = () => modal.remove();
    
    // Click outside to close
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };

    // Auto-remove after 8 seconds
    setTimeout(() => {
      if (modal.parentNode) modal.remove();
    }, 8000);
  };

  return null;
}

