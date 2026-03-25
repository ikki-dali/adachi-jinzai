"use client";

export default function HeroVideo() {
  return (
    <video
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
