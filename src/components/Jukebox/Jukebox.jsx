import React, { useState, useEffect } from "react";
import OptionsPage from "./OptionsPage";

const Jukebox = () => {
  const [currentVideo, setCurrentVideo] = useState(false);
  const [currentVideoTitle, setCurrentVideoTitle] = useState();
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScrollClass = () => {
      if (mounted) {
        isOpen
          ? document.documentElement.classList.add("disable-scroll")
          : document.documentElement.classList.remove("disable-scroll");
      }
    };

    setMounted(true);
    handleScrollClass();

    return () => {
      // Cleanup if needed
    };
  }, [mounted, isOpen]);

  return (
    <>
      {isOpen || currentVideo ? (
        <OptionsPage
          currentVideo={currentVideo}
          currentVideoTitle={currentVideoTitle}
          isOpen={isOpen}
        />
      ) : null}
      {/* <div
        className={`fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 translate-z-0 ${
          currentVideo ? "playing" : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onFocus={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <div className="playing-line">
          <div className="icon">{currentVideo ? "📀" : "🔇"}</div>
          {currentVideoTitle && !isOpen && isHovered ? (
            <p className="marquee-text">{currentVideoTitle}</p>
          ) : null}
        </div>
      </div> */}
    </>
  );
};

export default Jukebox;
