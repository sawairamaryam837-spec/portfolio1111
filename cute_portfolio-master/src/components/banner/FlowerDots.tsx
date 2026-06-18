"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FlowerDots() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating animation
      gsap.to(".dot", {
        y: "-=8",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "center",
        },
      });
      // Glow pulse
      gsap.to(".dot", {
        opacity: 0.5,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-12 h-12 flex items-center justify-center">
      {/* Center dot */}
      <div className="dot absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
      {/* Petal dots */}
      <div className="dot absolute w-1.5 h-1.5 bg-white rounded-full top-0 shadow-[0_0_8px_#fff]" />
      <div className="dot absolute w-1.5 h-1.5 bg-white rounded-full bottom-0 shadow-[0_0_8px_#fff]" />
      <div className="dot absolute w-1.5 h-1.5 bg-white rounded-full left-0 shadow-[0_0_8px_#fff]" />
      <div className="dot absolute w-1.5 h-1.5 bg-white rounded-full right-0 shadow-[0_0_8px_#fff]" />
      {/* Diagonal dots */}
      <div className="dot absolute w-1 h-1 bg-white rounded-full top-1.5 left-1.5 shadow-[0_0_6px_#fff]" />
      <div className="dot absolute w-1 h-1 bg-white rounded-full top-1.5 right-1.5 shadow-[0_0_6px_#fff]" />
      <div className="dot absolute w-1 h-1 bg-white rounded-full bottom-1.5 left-1.5 shadow-[0_0_6px_#fff]" />
      <div className="dot absolute w-1 h-1 bg-white rounded-full bottom-1.5 right-1.5 shadow-[0_0_6px_#fff]" />
    </div>
  );
}
