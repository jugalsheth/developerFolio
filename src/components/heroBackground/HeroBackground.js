import React, {useState, useEffect, useContext} from "react";
import {Fade} from "react-reveal";
import "./HeroBackground.scss";
import StyleContext from "../../contexts/StyleContext";

export default function HeroBackground({
  images = [],
  videos = [],
  reels = [],
  autoPlay = true,
  transitionDuration = 3000,
  showOverlay = true
}) {
  const {isDark} = useContext(StyleContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Combine all media sources
  const mediaItems = [
    ...images.map(img => ({type: "image", ...img})),
    ...videos.map(vid => ({type: "video", ...vid})),
    ...reels.map(reel => ({type: "reel", ...reel}))
  ];

  // Auto-rotate through media
  useEffect(() => {
    if (!autoPlay || mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % mediaItems.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration for smooth fade
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [autoPlay, mediaItems.length, transitionDuration]);

  if (mediaItems.length === 0) {
    return null;
  }

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className={`hero-background-modern ${isDark ? "dark-mode" : ""}`}>
      {/* Background Media Container */}
      <div className="background-media-container">
        {mediaItems.map((item, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % mediaItems.length;

          return (
            <div
              key={index}
              className={`media-slide ${isActive ? "active" : ""} ${
                isNext ? "next" : ""
              }`}
            >
              {item.type === "image" && (
                <div
                  className="background-image"
                  style={{
                    backgroundImage: `url(${item.url || item})`
                  }}
                />
              )}

              {item.type === "video" && (
                <video
                  className="background-video"
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}

              {item.type === "reel" && item.embedUrl && (
                <div className="background-reel">
                  <iframe
                    src={item.embedUrl}
                    className="reel-iframe"
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Gradient Overlay */}
              {showOverlay && <div className="media-overlay" />}
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      {mediaItems.length > 1 && (
        <div className="media-indicators">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Caption Overlay (optional) */}
      {currentMedia.caption && (
        <Fade bottom duration={800}>
          <div className="media-caption">
            <p>{currentMedia.caption}</p>
          </div>
        </Fade>
      )}
    </div>
  );
}
