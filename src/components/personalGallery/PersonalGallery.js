import React, { useState, useEffect, useContext, useRef } from "react";
import { Fade } from "react-reveal";
import "./PersonalGallery.scss";
import StyleContext from "../../contexts/StyleContext";

export default function PersonalGallery({ photos = [], reels = [], displayMode = "floating" }) {
  const { isDark } = useContext(StyleContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-rotate for carousel mode
  useEffect(() => {
    if (displayMode === "carousel" && reels.length > 0) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % reels.length);
      }, 5000);
      return () => clearInterval(intervalRef.current);
    }
  }, [displayMode, reels.length]);

  // Handle mouse movement for floating photos
  useEffect(() => {
    if (displayMode !== "floating" || !containerRef.current) return;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const photos = container.querySelectorAll(".floating-photo");
      photos.forEach((photo, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 50) * speed * 0.01;
        const yOffset = (y - 50) * speed * 0.01;
        photo.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };

    containerRef.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [displayMode]);

  if (!photos.length && !reels.length) {
    return null;
  }

  // Floating Photos Mode - Photos float around the hero section
  if (displayMode === "floating" && photos.length > 0) {
    return (
      <div className="personal-gallery floating-mode" ref={containerRef}>
        {photos.slice(0, 6).map((photo, index) => (
          <Fade key={index} delay={index * 200} duration={1000}>
            <div
              className={`floating-photo ${isDark ? "dark-mode" : ""}`}
              style={{
                left: `${15 + (index * 12)}%`,
                top: `${20 + (index % 3) * 25}%`,
                animationDelay: `${index * 0.3}s`,
                zIndex: 10 - index,
              }}
              onMouseEnter={() => setHoveredPhoto(index)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <div className="photo-frame">
                <img
                  src={photo.url || photo}
                  alt={photo.alt || `Personal photo ${index + 1}`}
                  className="gallery-image"
                />
                {photo.caption && hoveredPhoto === index && (
                  <div className="photo-caption">{photo.caption}</div>
                )}
                <div className="photo-shine"></div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    );
  }

  // Instagram Reels Carousel Mode
  if (displayMode === "carousel" && reels.length > 0) {
    return (
      <div className={`personal-gallery carousel-mode ${isDark ? "dark-mode" : ""}`}>
        <div className="reels-container">
          <div
            className="reels-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reels.map((reel, index) => (
              <div key={index} className="reel-slide">
                <div className="reel-wrapper">
                  {reel.type === "video" ? (
                    <video
                      className="reel-video"
                      src={reel.url}
                      loop
                      muted
                      playsInline
                      autoPlay={activeIndex === index}
                    />
                  ) : (
                    <iframe
                      className="reel-embed"
                      src={reel.embedUrl || reel.url}
                      title={`Instagram Reel ${index + 1}`}
                      frameBorder="0"
                      allow="encrypted-media"
                      allowFullScreen
                    />
                  )}
                  <div className="reel-overlay">
                    <div className="reel-info">
                      <span className="reel-icon">📸</span>
                      {reel.caption && <p className="reel-caption">{reel.caption}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {reels.length > 1 && (
          <>
            <button
              className="carousel-nav prev"
              onClick={() => setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length)}
              aria-label="Previous reel"
            >
              ‹
            </button>
            <button
              className="carousel-nav next"
              onClick={() => setActiveIndex((prev) => (prev + 1) % reels.length)}
              aria-label="Next reel"
            >
              ›
            </button>
            <div className="carousel-dots">
              {reels.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${activeIndex === index ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to reel ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Photo Grid Mode - Compact grid with hover effects
  if (displayMode === "grid" && photos.length > 0) {
    return (
      <div className={`personal-gallery grid-mode ${isDark ? "dark-mode" : ""}`}>
        <div className="photo-grid">
          {photos.slice(0, 9).map((photo, index) => (
            <Fade key={index} delay={index * 100} duration={800}>
              <div
                className="grid-photo-item"
                onMouseEnter={() => setHoveredPhoto(index)}
                onMouseLeave={() => setHoveredPhoto(null)}
              >
                <div className="grid-photo-frame">
                  <img
                    src={photo.url || photo}
                    alt={photo.alt || `Photo ${index + 1}`}
                    className="grid-image"
                  />
                  <div className={`grid-overlay ${hoveredPhoto === index ? "active" : ""}`}>
                    {photo.caption && <p className="grid-caption">{photo.caption}</p>}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    );
  }

  // Polaroid Stack Mode - Photos stacked like polaroids
  if (displayMode === "polaroid" && photos.length > 0) {
    return (
      <div className={`personal-gallery polaroid-mode ${isDark ? "dark-mode" : ""}`}>
        {photos.slice(0, 5).map((photo, index) => (
          <Fade key={index} delay={index * 150} duration={1000}>
            <div
              className="polaroid-photo"
              style={{
                transform: `rotate(${-5 + index * 2.5}deg) translateY(${index * 10}px)`,
                zIndex: photos.length - index,
              }}
              onMouseEnter={() => setHoveredPhoto(index)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              <div className="polaroid-frame">
                <img
                  src={photo.url || photo}
                  alt={photo.alt || `Polaroid ${index + 1}`}
                  className="polaroid-image"
                />
                {photo.caption && (
                  <div className="polaroid-caption">{photo.caption}</div>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </div>
    );
  }

  return null;
}

