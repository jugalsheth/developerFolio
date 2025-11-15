import React, {useState, useContext} from "react";
import "./Button.scss";
import StyleContext from "../../contexts/StyleContext";

export default function Button({
  text,
  className = "",
  href,
  newTab = false,
  variant = "primary", // primary, secondary, outline, ghost, gradient
  size = "medium", // small, medium, large
  icon = null,
  iconPosition = "left", // left, right
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  animated = true
}) {
  const {isDark} = useContext(StyleContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const buttonClasses = `
    main-button
    button-${variant}
    button-${size}
    ${isDark ? "dark-mode" : ""}
    ${fullWidth ? "button-full-width" : ""}
    ${animated ? "button-animated" : ""}
    ${disabled || loading ? "button-disabled" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonContent = (
    <>
      {loading && (
        <span className="button-loader">
          <span className="loader-spinner"></span>
        </span>
      )}
      {icon && iconPosition === "left" && !loading && (
        <span className="button-icon button-icon-left">{icon}</span>
      )}
      <span className="button-text">{text}</span>
      {icon && iconPosition === "right" && !loading && (
        <span className="button-icon button-icon-right">{icon}</span>
      )}
      {animated && !disabled && !loading && (
        <span className="button-ripple"></span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        aria-disabled={disabled || loading}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      aria-disabled={disabled || loading}
    >
      {buttonContent}
    </button>
  );
}
