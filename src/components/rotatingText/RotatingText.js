import React, {useState, useEffect} from "react";
import "./RotatingText.scss";

export default function RotatingText({roles}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % roles.length);
        setFadeClass("fade-in");
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span className={`rotating-text ${fadeClass}`}>{roles[currentIndex]}</span>
  );
}
