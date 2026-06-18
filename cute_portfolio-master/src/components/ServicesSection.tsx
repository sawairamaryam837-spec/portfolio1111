"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    shortTitle: "1. Web Applications",
    title: "Full Stack Web Development",
    desc: "Building complete web applications from frontend to backend.",
    points: ["React / Next.js interfaces", "Backend APIs", "Database integration", "Authentication systems"],
  },
  {
    shortTitle: "2. Frontend Experiences",
    title: "Frontend Development",
    desc: "Creating modern, responsive and interactive user interfaces.",
    points: ["React.js", "Next.js", "Tailwind CSS", "GSAP animations", "Responsive design"],
  },
  {
    shortTitle: "3. Backend Systems",
    title: "Backend Development",
    desc: "Developing secure and scalable server-side applications.",
    points: ["Node.js / FastAPI", "REST APIs", "Server architecture", "API integrations"],
  },
  {
    shortTitle: "4. Database Solutions",
    title: "Database & Cloud Solutions",
    desc: "Managing data and deploying reliable applications.",
    points: ["MYSQL", "MongoDB", "Database optimization", "Cloud deployment"],
  },
  {
    shortTitle: "5. UI/UX Development",
    title: "UI/UX Design & Development",
    desc: "Transforming ideas into beautiful digital experiences.",
    points: ["Modern UI design", "Design systems", "Prototyping", "Interactive experiences"],
  },
 {
  shortTitle: "6. Deployment",
  title: "Deployment & DevOps",
  desc: "Deploying, managing and maintaining modern web applications.",
  points: [
    "Vercel Deployment",
    "Netlify Deployment",
    "Git & GitHub",
    "Environment Variables",
    "Domain Configuration",
    "Application Security"
  ],
},
]

// 500vh = 100vh visible + 400vh scroll space
const SCROLL_HEIGHT = "500vh";

export default function ServicesSection() {
  // containerRef: tall static outer wrapper (500vh, bg-black)
  const containerRef = useRef<HTMLDivElement>(null);
  // wrapperRef: sticky inner accordion (h-screen, sticks to top)
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { contextSafe } = useGSAP(() => {
    // 1. Initial State Setup via GSAP (no inline style conflicts)
    const panels = gsap.utils.toArray(".service-panel", wrapperRef.current);
    const expandedContents = gsap.utils.toArray(".expanded-content", wrapperRef.current);
    const collapsedContents = gsap.utils.toArray(".collapsed-content", wrapperRef.current);

    gsap.set(panels, {
      flex: (i) => (i === 0 ? 7 : 1),
    });
    gsap.set(expandedContents, { autoAlpha: (i) => (i === 0 ? 1 : 0) });
    gsap.set(collapsedContents, { autoAlpha: (i) => (i === 0 ? 0 : 1) });

    // 2. Scroll Progress Tracking — NO pin here.
    //    The sticky CSS handles the visual pinning natively.
    //    ScrollTrigger only reads scroll progress (no pin-spacer created = no black flash).
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom", // matches the full 500vh container height
      onUpdate: (self) => {
        const newIndex = Math.min(
          SERVICES.length - 1,
          Math.floor(self.progress * SERVICES.length)
        );
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
      },
    });
  }, { scope: containerRef });

  // 3. Animate panels whenever active index changes
  useEffect(() => {
    const animateToIndex = contextSafe(() => {
      if (!wrapperRef.current) return;

      const panels = gsap.utils.toArray(".service-panel", wrapperRef.current);
      const expandedContents = gsap.utils.toArray(".expanded-content", wrapperRef.current);
      const collapsedContents = gsap.utils.toArray(".collapsed-content", wrapperRef.current);

      panels.forEach((panel, i) => {
        const isExpanded = i === activeIndex;

        gsap.to(panel as Element, {
          flex: isExpanded ? 7 : 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.8)",
          overwrite: "auto",
        });

        gsap.to(expandedContents[i] as Element, {
          autoAlpha: isExpanded ? 1 : 0,
          duration: isExpanded ? 0.6 : 0.3,
          ease: "power2.out",
          delay: isExpanded ? 0.2 : 0,
          overwrite: "auto",
        });

        gsap.to(collapsedContents[i] as Element, {
          autoAlpha: isExpanded ? 0 : 1,
          duration: isExpanded ? 0.3 : 0.6,
          ease: "power2.out",
          delay: isExpanded ? 0 : 0.2,
          overwrite: "auto",
        });
      });
    });

    animateToIndex();
  }, [activeIndex, contextSafe]);

  // 4. Hover Handler
  const handleHover = (index: number) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
  };

  return (
    /*
      Outer container: full 500vh height, solid black background.
      Because this is a regular block element (not pinned by GSAP),
      there is NO pin-spacer and NO background flash — ever.
    */
    <div
      id="services-section"
      ref={containerRef}
      className="w-full bg-black"
      style={{ height: SCROLL_HEIGHT }}
    >
      {/*
        Inner accordion: uses CSS sticky to "pin" itself to the top
        while the parent scrolls. Native sticky = zero JS-pin artifacts.
      */}
      <div
        ref={wrapperRef}
        className="sticky top-0 h-screen w-full bg-black flex flex-col md:flex-row items-stretch border-y-2 border-white/10 overflow-hidden"
      >
        {SERVICES.map((service, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(index)}
            className="service-panel border-b-2 md:border-b-0 md:border-r-2 border-white/10 bg-black flex flex-col justify-center items-center relative overflow-hidden cursor-pointer"
            style={{
              flex: index === 0 ? 7 : 1,
            }}
          >
            {/* COLLAPSED CONTENT */}
            <div className="collapsed-content absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="whitespace-nowrap md:-rotate-90 text-xl md:text-3xl font-black uppercase tracking-widest text-white/40">
                {service.shortTitle}
              </h3>
            </div>

            {/* EXPANDED CONTENT */}
            <div className="expanded-content absolute inset-0 w-full h-[60vh] md:w-[60vw] md:h-full bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black p-6 md:p-16 flex flex-col justify-center items-start pointer-events-none">
              <div className="max-w-2xl pointer-events-auto">
                <p className="text-blue-400 font-bold tracking-widest mb-2 md:mb-4 uppercase text-sm">
                  {service.shortTitle}
                </p>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white mb-4 md:mb-6">
                  {service.title}
                </h2>
                <p className="text-white/80 text-base md:text-xl font-medium mb-6 md:mb-10 leading-relaxed max-w-lg">
                  {service.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {service.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-bold text-sm md:text-base uppercase tracking-wider text-white">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
