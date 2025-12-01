/**
 * useReveal Hook - Lightweight replacement for react-reveal
 * Uses Intersection Observer for performant scroll animations
 */
import {useEffect, useRef, useState} from "react";

/**
 * Custom hook for reveal animations on scroll
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Only trigger animation once
 * @param {string} options.direction - Animation direction ('bottom', 'top', 'left', 'right')
 * @param {number} options.duration - Animation duration in ms
 * @returns {Array} [ref, isVisible, className] - Ref to attach, visibility state, CSS class
 */
export const useReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    direction = "bottom"
    // duration is used in Reveal component, not in this hook
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {threshold, rootMargin}
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Generate CSS class based on visibility and direction
  const getClassName = () => {
    if (!isVisible) {
      return `reveal-hidden reveal-${direction}`;
    }
    return `reveal-visible reveal-${direction}`;
  };

  return [ref, isVisible, getClassName()];
};

/**
 * Higher-order component for easy migration from react-reveal
 * Usage: <Reveal bottom duration={1000}><Component /></Reveal>
 */
export const Reveal = ({
  children,
  bottom = false,
  top = false,
  left = false,
  right = false,
  duration = 1000,
  distance = "40px",
  ...props
}) => {
  const direction = bottom
    ? "bottom"
    : top
    ? "top"
    : left
    ? "left"
    : right
    ? "right"
    : "bottom";
  const [ref, , className] = useReveal({
    direction,
    duration,
    ...props
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{"--reveal-duration": `${duration}ms`}}
    >
      {children}
    </div>
  );
};

// Export individual direction components for easier migration
export const Fade = ({
  children,
  bottom = false,
  top = false,
  left = false,
  right = false,
  duration = 1000,
  distance = "40px",
  ...props
}) => {
  return (
    <Reveal
      bottom={bottom}
      top={top}
      left={left}
      right={right}
      duration={duration}
      distance={distance}
      {...props}
    >
      {children}
    </Reveal>
  );
};

export const Slide = Fade; // Alias for compatibility
