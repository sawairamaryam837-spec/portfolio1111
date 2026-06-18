"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Initial State: The boxes are white initially, so the white text is invisible.
      // GSAP setup for fill: move them up initially so they can slide down
      gsap.set(".fill-bg", { yPercent: -100 });
      gsap.set(".letter-text", { color: "#ffffff" });

      // 2. Fill Animation: Slide the navy blue down (top to bottom)
      tl.to(".fill-bg", {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.inOut",
      });

      // Hold the filled state for a moment to let the user see the word "JULIAL"
      tl.to({}, { duration: 0.5 });

      // 3. Reveal Animation: Shutter opening from bottom to top
      // Slide the blue background UP (yPercent: -100)
      // At the exact same time, change the text color to dark navy (#001F3F) so it stays visible
      tl.to(
        ".fill-bg",
        {
          yPercent: -100,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.inOut",
        },
        "reveal"
      ).to(
        ".letter-text",
        {
          color: "#000000",
          duration: 0.1, // quick color change right as the shutter passes
          stagger: 0.1,
        },
        "reveal+=0.3" // Delay slightly so color changes precisely as the edge passes the text
      );

      // 4. Completion: Scale up and fade out the whole loading screen
      tl.to(
        container.current,
        {
          scale: 1.1,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          display: "none",
        },
        "+=0.2"
      );
    },
    { scope: container }
  );

  const letters = ["S", "A", "W", "A", "I", "R" ,"A"];

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[200] flex bg-white"
    >
      <div className="flex w-full h-full">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="relative flex-1 h-full overflow-hidden flex items-center justify-center"
          >
            {/* Background that fills from top to bottom */}
            <div className="fill-bg absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black z-0" />

            {/* Letter Text */}
            <span className="letter-text relative z-10 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase">
              {letter}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
