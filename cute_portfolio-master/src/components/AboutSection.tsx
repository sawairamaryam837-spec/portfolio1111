"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import dedicated about section person image
import personImg from "@/assets/about_image/about_person/image.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCORDION_DATA = [
  {
    title: "VISUAL DESIGN",
    content: "Crafting aesthetically pleasing and highly engaging interfaces that align with your brand identity.",
  },
  {
    title: "RESEARCH & ANALYSIS",
    content: "Conducting user interviews, surveys, and usability testing to gather insights and analyze user behaviors and needs.",
  },
  {
    title: "USABILITY TESTING",
    content: "Iteratively testing designs with real users to uncover pain points and improve the overall experience.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(1); // 2nd item open by default

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left content fades in from left when section fully covers viewport
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            // Fire when section top hits viewport top = fully visible
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right content fades in from right, slightly delayed
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, x: 120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.18,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Person image slides up from below with a slight overshoot
      gsap.fromTo(
        personRef.current,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax effect for About Person Image on scroll
      gsap.to(personRef.current, {
        yPercent: 30, // Move down slightly as user scrolls past the section
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // ─────────────────────────────────────────────────────────────────
      // PARALLAX BLOCK — skip if user prefers reduced motion
      // ─────────────────────────────────────────────────────────────────
      const noMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!noMotion) {
        // GPU-accelerate both columns
        gsap.set([leftContentRef.current, rightContentRef.current], { willChange: "transform" });

        // Left column — foreground layer, drifts up faster (feels closer)
        gsap.to(leftContentRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Right column — background layer, drifts up slower (feels farther)
        gsap.to(rightContentRef.current, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black flex flex-col justify-between overflow-hidden px-6 md:px-16 pt-16 md:pt-24 text-white select-none"
    >
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {/* LEFT COLUMN */}
        <div ref={leftContentRef} className="flex flex-col justify-between h-full pb-32">
          <div>
            <div className="inline-block bg-white text-black font-bold tracking-widest px-4 py-2 text-xs sm:text-sm uppercase mb-8 shadow-sm">
              ABOUT
            </div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] font-black leading-[0.9] tracking-tighter uppercase w-full">
              SAWAIRA  MARYAM <br /> RIGHT HERE!
            </h2>
          </div>

          {/* Accent Box with Arrow */}
          <div className="hidden md:flex w-16 h-16 border border-white items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div ref={rightContentRef} className="flex flex-col justify-between h-full pb-32 relative z-30">
          {/* Top Socials */}
          <div className="flex justify-end items-center gap-4 text-xs font-bold tracking-widest uppercase">
            <span className="mr-2 hidden sm:block opacity-60">Follow me</span>
            <div className="w-10 h-10 border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">FB</div>
            <div className="w-10 h-10 border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">TW</div>
            <div className="w-10 h-10 border border-white flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">IG</div>
          </div>

          {/* About Text */}
          <div className="max-w-md ml-auto mt-16 md:mt-0 text-sm sm:text-base font-medium leading-relaxed opacity-80">
            From concept to execution, my journey is woven with a passion for user-centric solutions, delivering seamless interactions that leave lasting impressions.
          </div>

          {/* Accordion */}
          <div className="mt-16 md:mt-0 max-w-md ml-auto w-full">
            {ACCORDION_DATA.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-white/20 overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center py-5 text-left font-bold uppercase tracking-widest text-xs sm:text-sm hover:opacity-70 transition-opacity"
                  >
                    {item.title}
                    <span className="text-white/60 transform transition-transform duration-300">
                      {isOpen ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    className={`text-sm opacity-70 leading-relaxed transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 pb-5 opacity-80" : "max-h-0 opacity-0"
                      }`}
                  >
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CENTER BOTTOM IMAGE */}
      <div
        ref={personRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[95vw] max-w-[500px] md:max-w-[700px] lg:max-w-[800px] h-[70vh] md:h-[85vh] pointer-events-none"
      >
        <Image
          src={personImg}
          alt="SAWAIRA MARYAM"
          fill
          className="object-contain object-bottom drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  );
}
