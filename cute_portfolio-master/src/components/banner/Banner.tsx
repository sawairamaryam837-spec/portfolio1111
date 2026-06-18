"use client";

import React, { useRef, useState } from "react";
import GravityAnimation, { GravityAnimationRef } from "./GravityAnimation";

export default function Banner() {
  const gravityRef = useRef<GravityAnimationRef>(null);
  const [hasFallen, setHasFallen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleInteract = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (!hasFallen) {
      gravityRef.current?.fall();
    } else {
      gravityRef.current?.restore();
    }
  };

  return (
    <section className="relative w-full h-[50vh] bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black flex flex-col items-center justify-center">
      {/* Main Typography wrapped in gravity animation */}
      <div className="z-10">
        <GravityAnimation 
          ref={gravityRef} 
          text="PORTFOLIO" 
          onInteract={handleInteract}
          onFallComplete={() => {
            setHasFallen(true);
            setIsAnimating(false);
          }}
          onRestoreComplete={() => {
            setHasFallen(false);
            setIsAnimating(false);
          }}
        />
      </div>

      {/* Interactive Bottom Right Action Area */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={handleInteract}
          disabled={isAnimating}
          className="group flex items-center gap-4 cursor-pointer focus:outline-none"
        >
          {!hasFallen ? (
            <>
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                Don&apos;t Touch
              </span>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4 text-white/60 group-hover:text-white group-hover:rotate-180 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </>
          ) : (
            <>
              <span className="text-white/60 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                Restore
              </span>
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
                <svg className="w-4 h-4 text-white/60 group-hover:text-white group-hover:-rotate-180 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </>
          )}
        </button>
      </div>
      {/* Scroll to Hero — Bottom Left Black Circle Arrow */}
      <div className="absolute bottom-8 left-8 z-20">
        <button
          onClick={() => {
            const hero = document.getElementById("hero-section");
            if (hero) hero.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-4 cursor-pointer focus:outline-none"
          aria-label="Scroll to hero section"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-5 h-5 text-blue-950 group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <span className="text-white/50 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
            Scroll
          </span>
        </button>
      </div>
    </section>
  );
}
