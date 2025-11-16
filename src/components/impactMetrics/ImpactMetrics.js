import React, {useState, useEffect, useRef, useContext} from "react";
import "./ImpactMetrics.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function ImpactMetrics({metrics}) {
  const {isDark} = useContext(StyleContext);
  const [counters, setCounters] = useState(metrics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const metricsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      {threshold: 0.3}
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    metrics.forEach((metric, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = metric.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= metric.value) {
          current = metric.value;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, duration / steps);
    });
  };

  return (
    <div className="impact-metrics-container" ref={metricsRef}>
      <Fade bottom duration={1000} distance="20px">
        <h2 className={isDark ? "dark-mode metrics-title" : "metrics-title"}>
          Impact at a Glance
        </h2>
        <p
          className={
            isDark ? "dark-mode metrics-subtitle" : "metrics-subtitle subTitle"
          }
        >
          Key achievements and measurable results across my career
        </p>
      </Fade>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <Fade
            bottom
            duration={1000}
            distance="20px"
            delay={index * 100}
            key={index}
          >
            <div
              className={
                isDark
                  ? `metric-card metric-${metric.color} dark-mode`
                  : `metric-card metric-${metric.color}`
              }
            >
              <div className="metric-value">
                <span className="metric-number">{counters[index]}</span>
                <span className="metric-suffix">{metric.suffix}</span>
              </div>
              <h3 className="metric-label">{metric.label}</h3>
              <p className="metric-description">{metric.description}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
