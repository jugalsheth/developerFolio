import {useEffect, useState} from "react";
import "./ConfettiCelebration.scss";

export default function ConfettiCelebration() {
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkForCompletion = () => {
      if (hasTriggered) return;

      // Check if scrolled to 100%
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;

      if (progress >= 98) {
        triggerConfetti();
        setHasTriggered(true);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkForCompletion();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered]);

  const triggerConfetti = () => {
    // Create confetti container
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";

      // Random properties
      const colors = [
        "#6b5b95",
        "#9078c3",
        "#667eea",
        "#4caf50",
        "#2196f3",
        "#ff9800"
      ];
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.animationDuration = Math.random() * 3 + 3 + "s";

      confettiContainer.appendChild(confetti);
    }

    // Show celebration message
    const message = document.createElement("div");
    message.className = "celebration-message";
    message.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-icon">🎉</div>
        <div class="celebration-text">You're a Legend!</div>
        <div class="celebration-subtext">You explored everything!</div>
      </div>
    `;
    document.body.appendChild(message);

    // Remove after 6 seconds
    setTimeout(() => {
      confettiContainer.remove();
      message.remove();
    }, 6000);
  };

  return null;
}
