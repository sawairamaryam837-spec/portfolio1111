"use client";

import React, { forwardRef } from "react";

interface LetterProps {
  char: string;
  onClick?: () => void;
}

const Letter = forwardRef<HTMLSpanElement, LetterProps>(({ char, onClick }, ref) => {
  return (
    <span
      ref={ref}
      onClick={onClick}
      className="inline-block text-white text-[10vw] font-black uppercase tracking-tighter cursor-pointer hover:text-white/70 transition-colors"
      style={{ willChange: "transform" }}
    >
      {char}
    </span>
  );
});

Letter.displayName = "Letter";
export default Letter;
