import React, {useState, useEffect, useContext, useRef} from "react";
import {Fade} from "react-reveal";
import "./InstagramReelsGrid.scss";
import "./InstagramReelsGrid.css";
import StyleContext from "../../contexts/StyleContext";

export default function InstagramReelsGrid({
  reels = [],
  autoPlay = true,
  instagramAccount = "https://www.instagram.com/jugalsheth/"
}) {
  const {isDark} = useContext(StyleContext);
  const [activeReels, setActiveReels] = useState([0, 0, 0]); // One active reel per column
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const videoRefs = useRef({});

  // Filter to only video files (no embeds)
  const videoReels = reels.filter(reel => reel.type === "video" && reel.url);

  // Distribute video reels across 3 columns
  const columns = [
    videoReels.filter((_, index) => index % 3 === 0),
    videoReels.filter((_, index) => index % 3 === 1),
    videoReels.filter((_, index) => index % 3 === 2)
  ];

  // Auto-scroll reels in each column
  useEffect(() => {
    if (!autoPlay || videoReels.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveReels(prev => {
        const newActive = [...prev];
        columns.forEach((column, colIndex) => {
          if (column.length > 1) {
            newActive[colIndex] = (newActive[colIndex] + 1) % column.length;
          }
        });
        return newActive;
      });
    }, 4000); // Change reel every 4 seconds

    return () => clearInterval(intervalRef.current);
  }, [autoPlay, videoReels.length]);

  // Handle video play/pause
  useEffect(() => {
    columns.forEach((column, colIndex) => {
      column.forEach((reel, reelIndex) => {
        const videoKey = `${colIndex}-${reelIndex}`;
        const video = videoRefs.current[videoKey];
        if (video) {
          if (activeReels[colIndex] === reelIndex) {
            video.play().catch(() => {
              // Autoplay was prevented, user interaction required
            });
          } else {
            video.pause();
            video.currentTime = 0; // Reset to start when paused
          }
        }
      });
    });
  }, [activeReels]);

  if (videoReels.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`instagram-reels-grid ${isDark ? "dark-mode" : ""}`}
    >
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="reel-column">
          {column.map((reel, reelIndex) => {
            const isActive = activeReels[colIndex] === reelIndex;
            const globalIndex = colIndex + reelIndex * 3;

            return (
              <Fade
                key={globalIndex}
                bottom
                duration={600}
                delay={colIndex * 100}
                when={isActive}
              >
                <a
                  href={instagramAccount}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`reel-item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => {
                    // Set as active on hover
                    const newActive = [...activeReels];
                    newActive[colIndex] = reelIndex;
                    setActiveReels(newActive);
                  }}
                >
                  <div className="reel-container">
                    {reel.type === "video" && reel.url && (
                      <video
                        ref={el => {
                          const videoKey = `${colIndex}-${reelIndex}`;
                          if (el) {
                            videoRefs.current[videoKey] = el;
                          }
                        }}
                        className="reel-video"
                        src={reel.url}
                        loop
                        muted
                        playsInline
                        autoPlay={isActive}
                        preload="auto"
                      />
                    )}

                    {/* Overlay gradient */}
                    <div className="reel-overlay" />

                    {/* Caption */}
                    {reel.caption && isActive && (
                      <div className="reel-caption">
                        <p>{reel.caption}</p>
                      </div>
                    )}

                    {/* Play indicator */}
                    {!isActive && (
                      <div className="play-indicator">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </a>
              </Fade>
            );
          })}
        </div>
      ))}
    </div>
  );
}
