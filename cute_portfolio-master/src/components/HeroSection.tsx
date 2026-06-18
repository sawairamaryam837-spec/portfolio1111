"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Top Gallery Images ---
import img1 from "@/assets/hero_image/hero_top_image/image-1.png";
import img2 from "@/assets/hero_image/hero_top_image/image-2.png";
import img3 from "@/assets/hero_image/hero_top_image/image-3.png";
import img4 from "@/assets/hero_image/hero_top_image/image-4.png";
import img5 from "@/assets/hero_image/hero_top_image/image-5.png";
import img6 from "@/assets/hero_image/hero_top_image/image-6.png";
import img7 from "@/assets/hero_image/hero_top_image/image-7.png";
import img8 from "@/assets/hero_image/hero_top_image/image-8.png";

// --- Person Image ---
import personImg from "@/assets/hero_image/person_image/person.png";

const ROW1_IMAGES = [img1, img2, img3, img4];
const ROW2_IMAGES = [img5, img6, img7, img8];

const NEW_ROLES = ["DESIGNER", "PROGRAMMER", "CREATIVE DEVELOPER"];

// Infinite marquee using GSAP seamless loop
function useMarquee(rowRef: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") {
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const items = Array.from(row.children) as HTMLElement[];
    if (items.length === 0) return;

    // We duplicate the children for seamless loop
    const totalWidth = row.scrollWidth / 2; // half because we duplicate

    const tl = gsap.fromTo(
      row,
      { x: direction === "left" ? 0 : -totalWidth },
      {
        x: direction === "left" ? -totalWidth : 0,
        duration: 28,
        ease: "none",
        repeat: -1,
      }
    );

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        let targetScale = 1 + velocity / 300;
        targetScale = Math.min(targetScale, 10);

        gsap.to(tl, { timeScale: targetScale, duration: 0.1, overwrite: true });
        gsap.to(tl, { timeScale: 1, duration: 1, delay: 0.1, overwrite: "auto" });
      }
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, [rowRef, direction]);
}

function MarqueeRow({
  images,
  direction,
  className = "",
  transform = "",
}: {
  images: typeof ROW1_IMAGES;
  direction: "left" | "right";
  className?: string;
  transform?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  useMarquee(rowRef, direction);

  // Duplicate images for seamless loop (more duplicates for wider spanned rows)
  const doubled = [...images, ...images, ...images, ...images, ...images];

  return (
    <div
      className={`overflow-hidden absolute top-[40%] left-1/2 w-[200vw] py-3 md:py-4 flex items-center justify-center ${className}`}
      style={{ transform: `translate(-50%, -50%) ${transform}` }}
    >
      <div ref={rowRef} className="flex gap-16 md:gap-24 will-change-transform items-center px-8" style={{ width: "max-content" }}>
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
          >
            <Image
              src={src}
              alt={`gallery-${i}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80px, 112px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const heroRef    = useRef<HTMLElement>(null);
  const personRef  = useRef<HTMLDivElement>(null);
  const arrowRef   = useRef<HTMLDivElement>(null);
  const bottomLeftRef  = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const contactBtnRef  = useRef<HTMLButtonElement>(null);
  const dynamicTextRef = useRef<HTMLDivElement>(null);
  // Parallax wrapper refs for the two marquee strips
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // AOS style entrance animations using GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Person slide up (no transparency)
      gsap.fromTo(
        personRef.current,
        { y: "100%" },
        {
          y: "0%", duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 5%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bottom left text fade right
      gsap.fromTo(
        bottomLeftRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.2,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 5%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bottom right text fade left
      gsap.fromTo(
        bottomRightRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 5%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Arrow bounce
      gsap.to(arrowRef.current, {
        y: 10,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ─────────────────────────────────────────────────────────────────
      // PARALLAX BLOCK — only when user has no motion preference
      // ─────────────────────────────────────────────────────────────────
      const noMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!noMotion) {
        // GPU-accelerate parallax layers
        gsap.set([row1Ref.current, row2Ref.current,
                  bottomLeftRef.current, bottomRightRef.current,
                  personRef.current], { willChange: "transform" });

        // Marquee Row 1 — background layer, drifts UP slowly as hero exits
        gsap.to(row1Ref.current, {
          y: -55,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end:   "bottom top",
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });

        // Marquee Row 2 — mirrored depth, drifts DOWN as hero exits
        gsap.to(row2Ref.current, {
          y: 55,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end:   "bottom top",
            scrub: 1.8,
            invalidateOnRefresh: true,
          },
        });

        // Bottom-left branding — foreground layer, faster upward drift
        gsap.to(bottomLeftRef.current, {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end:   "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Bottom-right text — slightly slower for subtle depth difference
        gsap.to(bottomRightRef.current, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end:   "bottom top",
            scrub: 1.3,
            invalidateOnRefresh: true,
          },
        });
      }

      // Person floating removed per user request
    });

    return () => ctx.revert();
  }, []);

  // Dynamic text rotation
  useEffect(() => {
    const el = dynamicTextRef.current;
    if (!el) return;

    el.textContent = NEW_ROLES[0];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % NEW_ROLES.length;
      const nextText = NEW_ROLES[index];

      gsap.to(el, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = nextText;
          gsap.fromTo(
            el,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        },
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" ref={heroRef} className="relative w-full h-screen bg-white flex flex-col overflow-hidden select-none">
      {/* ── Top Marquee Gallery (3D Cross) ──────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-90" style={{ perspective: "1000px" }}>
        {/*
          Each MarqueeRow sits inside a positioned wrapper div.
          GSAP applies translateY only to the wrapper — leaving the row's
          own 3D rotateX/rotateZ transform completely untouched.
        */}

        {/* Row 1 parallax container — fills parent so child's absolute
            `top:40%` resolves identically to before */}
        <div ref={row1Ref} className="absolute inset-0 will-change-transform">
          <MarqueeRow
            images={ROW1_IMAGES}
            direction="left"
            className="bg-white border-y border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            transform="rotateX(15deg) rotateZ(-12deg)"
          />
        </div>

        {/* Row 2 parallax container — opposite vertical drift for depth */}
        <div ref={row2Ref} className="absolute inset-0 will-change-transform">
          <MarqueeRow
            images={ROW2_IMAGES}
            direction="right"
            className="bg-white border-y border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            transform="rotateX(15deg) rotateZ(12deg)"
          />
        </div>
      </div>

      {/* ── Main Hero Content ─────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6">

        {/* Portrait */}
        <div
          ref={personRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] h-[90vh] md:h-[95vh]"
        >
          <Image
            src={personImg}
            alt="SAWAIRA"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* ── Bottom Left Branding ──────────────────────────────── */}
      <div
        ref={bottomLeftRef}
        className="absolute bottom-10 left-6 md:left-12 z-50 flex flex-col items-start mix-blend-difference text-white opacity-0"
      >
        <p className="text-xs sm:text-sm font-medium tracking-wide text-white/80 mb-4 max-w-[200px] leading-relaxed">
          &quot;Building digital experiences through code, creativity and design.&quot;
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black leading-none tracking-tight uppercase">
          SAWAIRA MARYAM<br />
          FULL STACK<br />
          DEVELOPER
        </h1>
        <div className="mt-6 flex items-center gap-3 overflow-hidden">
          <span className="w-8 h-[2px] bg-white"></span>
          <div
            ref={dynamicTextRef}
            className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white will-change-transform"
            style={{ minHeight: "1.2em" }}
          >
            DESIGNER
          </div>
        </div>
      </div>

      {/* ── Bottom Right Content ────────────────────────── */}
      <div
        ref={bottomRightRef}
        className="absolute bottom-10 right-6 md:right-12 z-50 flex flex-col items-end text-right mix-blend-difference text-white opacity-0"
      >
        <p className="text-sm sm:text-base font-medium max-w-[280px] mb-6 leading-relaxed text-white/90">
          &quot;I build modern digital experiences combining full stack development, creative design and smooth interactions.&quot;
        </p>
        <button
          ref={contactBtnRef}
          className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-sm font-bold tracking-[0.15em] uppercase rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
        >
          <span className="relative z-10 transition-colors duration-300">
            Contact Me
          </span>
        </button>
      </div>

      {/* ── Scroll Down Arrow (Bottom LEFT → scrolls to About) ───────────────── */}
      <div
        className="absolute bottom-10 left-6 md:left-12 z-[60] cursor-pointer"
        onClick={() => {
          const about = document.getElementById("next-section");
          if (about) about.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <div
          ref={arrowRef}
          className="w-10 h-10 rounded-full border-2 border-black/20 flex items-center justify-center hover:border-black transition-colors duration-300 hover:bg-black/5"
        >
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
