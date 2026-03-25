"use client";

import { useRef, useEffect } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster="/hero-poster.jpg"
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
