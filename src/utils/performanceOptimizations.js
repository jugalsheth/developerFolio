/**
 * Performance Optimization Utilities
 * Lightweight helpers for optimizing website performance
 */

// Debounce function for expensive operations
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll/resize events
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy load images
export const lazyLoadImage = img => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });

    imageObserver.observe(img);
  } else {
    // Fallback for older browsers
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  }
};

// Preload critical resources
export const preloadResource = (href, as = "fetch", crossorigin = false) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = "anonymous";
  }
  document.head.appendChild(link);
};

// Optimize animations with requestAnimationFrame
export const optimizedAnimation = callback => {
  let rafId;
  const animate = () => {
    callback();
    rafId = requestAnimationFrame(animate);
  };
  animate();
  return () => cancelAnimationFrame(rafId);
};

// Memoize expensive calculations
export const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Batch DOM updates
export const batchDOMUpdates = updates => {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

// Check if element is in viewport
export const isInViewport = element => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Intersection Observer for scroll animations
export const createScrollObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
    ...options
  };

  if ("IntersectionObserver" in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  return null;
};

// Optimize font loading
export const loadFont = (fontFamily, fontUrl) => {
  if ("fonts" in document) {
    const font = new FontFace(fontFamily, `url(${fontUrl})`);
    font
      .load()
      .then(loadedFont => {
        document.fonts.add(loadedFont);
      })
      .catch(err => {
        console.warn("Font loading failed:", err);
      });
  }
};

// Service Worker registration helper
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/serviceWorker.js"
      );
      console.log("Service Worker registered:", registration);
      return registration;
    } catch (error) {
      console.warn("Service Worker registration failed:", error);
    }
  }
};

// Performance metrics
export const getPerformanceMetrics = () => {
  if ("performance" in window && "PerformanceObserver" in window) {
    const navigation = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance
        .getEntriesByType("paint")
        .find(entry => entry.name === "first-paint")?.startTime,
      firstContentfulPaint: performance
        .getEntriesByType("paint")
        .find(entry => entry.name === "first-contentful-paint")?.startTime
    };
  }
  return null;
};

// Optimize CSS animations
export const shouldReduceMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Virtual scrolling helper (for large lists)
export const getVisibleRange = (
  containerHeight,
  itemHeight,
  scrollTop,
  totalItems
) => {
  const start = Math.floor(scrollTop / itemHeight);
  const end = Math.min(
    start + Math.ceil(containerHeight / itemHeight) + 1,
    totalItems
  );
  return {start, end};
};
