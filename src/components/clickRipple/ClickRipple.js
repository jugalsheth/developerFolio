import {useEffect} from "react";
import "./ClickRipple.scss";

export default function ClickRipple() {
  useEffect(() => {
    const createRipple = e => {
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";

      document.body.appendChild(ripple);

      // Remove after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    document.addEventListener("click", createRipple);

    return () => {
      document.removeEventListener("click", createRipple);
    };
  }, []);

  return null; // This component only adds event listeners
}
