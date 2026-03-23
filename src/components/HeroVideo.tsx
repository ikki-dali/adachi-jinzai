"use client";

import { useRef, useEffect, useState } from "react";

// 動画終端付近でクロスフェードしてシームレスにループさせる
export default function HeroVideo() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const fadeSeconds = 1.5;
  const playbackRate = 0.64;

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    videoA.playbackRate = playbackRate;
    videoB.playbackRate = playbackRate;

    let scheduledSwitch = false;

    const handleTimeUpdate = () => {
      const active = activeIsA ? videoA : videoB;
      const standby = activeIsA ? videoB : videoA;

      if (
        !scheduledSwitch &&
        active.duration &&
        active.currentTime >= active.duration - fadeSeconds
      ) {
        scheduledSwitch = true;
        standby.currentTime = 0;
        standby.play().catch(() => {});
        setActiveIsA((prev) => !prev);
      }
    };

    const handleEnded = () => {
      scheduledSwitch = false;
    };

    videoA.addEventListener("timeupdate", handleTimeUpdate);
    videoB.addEventListener("timeupdate", handleTimeUpdate);
    videoA.addEventListener("ended", handleEnded);
    videoB.addEventListener("ended", handleEnded);

    return () => {
      videoA.removeEventListener("timeupdate", handleTimeUpdate);
      videoB.removeEventListener("timeupdate", handleTimeUpdate);
      videoA.removeEventListener("ended", handleEnded);
      videoB.removeEventListener("ended", handleEnded);
    };
  }, [activeIsA, playbackRate]);

  const baseClass =
    "absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out";

  return (
    <>
      <video
        ref={videoARef}
        autoPlay
        muted
        playsInline
        className={`${baseClass} ${activeIsA ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDuration: `${fadeSeconds}s` }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        className={`${baseClass} ${activeIsA ? "opacity-0" : "opacity-100"}`}
        style={{ transitionDuration: `${fadeSeconds}s` }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </>
  );
}
