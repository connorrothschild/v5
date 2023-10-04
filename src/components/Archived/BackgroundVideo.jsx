import React from "react";

export default function BackgroundVideo() {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-[0]"
      style={{
        filter: "brightness(0.75)",
      }}
      autoPlay
      muted
      loop
      src="https://res.cloudinary.com/air-company/video/upload/c_scale,q_auto:best,w_960/v1673977241/Website/MWxAIRCO_overview_mobile-hb-rf25_3_njpwpr_Re_h6d9bl.mp4"
      // src="/videos/2.mp4"
      // src="/videos/stars.mp4"
    />
  );
}
