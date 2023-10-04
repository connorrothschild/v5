import React, { useState, useEffect } from "react";

const Option = ({
  id,
  title,
  paused,
  setPaused,
  anyHovered,
  setAnyHovered,
  hovered,
  setHovered,
  currentVideo,
  setCurrentVideo,
  artist,
}) => {
  const [hoverReady, setHoverReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHoverReady(true);
    }, 1000);
  }, []);

  const classify = (title) => {
    return title.replace(/\s/g, "-").toLowerCase();
  };

  return (
    <li
      onMouseOver={() => {
        if (!hoverReady) return;

        setHovered(id);
        setAnyHovered(true);
      }}
      onFocus={() => {
        if (!hoverReady) return;

        setHovered(id);
        setAnyHovered(true);
      }}
      onClick={() => {
        if (!hoverReady) return;

        setHovered(id);

        if (currentVideo === id) {
          setPaused(!paused);
        } else {
          setPaused(false);
          setCurrentVideo(id);
        }
      }}
      className={`transition-title overflow-hidden ${classify(title)} ${
        currentVideo
          ? currentVideo === id
            ? "active" + (paused ? " paused" : "")
            : "inactive"
          : ""
      } ${anyHovered ? (hovered === id ? "hovered" : "inactive") : ""}`}
    >
      {title}
      {currentVideo === id || (anyHovered && hovered === id) ? (
        <span className="artist">by {artist}</span>
      ) : null}
    </li>
  );
};

export default Option;
