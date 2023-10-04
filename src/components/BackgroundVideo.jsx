import React from "react";

export default function BackgroundVideo() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-[var(--background)] flex items-center justify-center">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/Cl6Rz1Uvi2M?si=Wi0bnEskzdMvCcUt&amp;start=4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}
