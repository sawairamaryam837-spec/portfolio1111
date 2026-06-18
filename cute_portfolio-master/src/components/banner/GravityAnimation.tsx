"use client";

import React, { useImperativeHandle, forwardRef, useRef } from "react";
import gsap from "gsap";
import Letter from "./Letter";

export interface GravityAnimationRef {
  fall: () => void;
  restore: () => void;
}

interface GravityAnimationProps {
  text: string;
  onFallComplete?: () => void;
  onRestoreComplete?: () => void;
  onInteract?: () => void;
}

const GravityAnimation = forwardRef<GravityAnimationRef, GravityAnimationProps>(
  ({ text, onFallComplete, onRestoreComplete, onInteract }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      fall: () => {
        gsap.to(lettersRef.current, {
          y: (i, el) => {
            const banner = el.closest("section");
            if (banner) {
              const letterBounds = el.getBoundingClientRect();
              const bannerBounds = banner.getBoundingClientRect();
              // Add 25px offset to reduce the gap at the bottom
              return bannerBounds.bottom - letterBounds.bottom + 25; 
            }
            return 200;
          },
          x: () => (Math.random() - 0.5) * 40,
          rotation: () => (Math.random() - 0.5) * 60,
          ease: "bounce.out",
          duration: 1.5,
          stagger: 0.05,
          onComplete: () => {
            if (onFallComplete) onFallComplete();
          }
        });
      },
      restore: () => {
        gsap.to(lettersRef.current, {
          y: 0,
          x: 0,
          rotation: 0,
          ease: "elastic.out(1, 0.4)",
          duration: 1.5,
          stagger: 0.05,
          onComplete: () => {
            if (onRestoreComplete) onRestoreComplete();
          }
        });
      },
    }));

    return (
      <div ref={containerRef} className="flex space-x-1 sm:space-x-2 md:space-x-4">
        {text.split("").map((char, i) => (
          <Letter
            key={i}
            char={char}
            onClick={onInteract}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
          />
        ))}
      </div>
    );
  }
);

GravityAnimation.displayName = "GravityAnimation";
export default GravityAnimation;
