"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    number: "01",
    title: "Astra-AI Platform",
    category: "Full Stack",
    desc: "A modern e-commerce solution with real-time inventory, secure payments, and an intuitive admin dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    year: "2025",
    color: "#3b82f6",
    live: "https://astra-ai22.vercel.app/",
    github: "https://github.com/sawairamaryam837-spec/Astra-AI",
  },
  {
    number: "02",
    title: "Humanify-ai",
    category: "Frontend",
    desc: "An interactive analytics dashboard with AI-powered insights.",
    tech: ["React", "Python", "TailwindCSS", "OpenAI"],
    year: "2025",
    color: "#ffffff",
    live: "https://humanify-ai678.vercel.app",
    github: "https://github.com/sawairamaryam837-spec/humanify-ai678",
  },
  {
    number: "03",
    title: "Social Media App",
    category: "Full Stack",
    desc: "A feature-rich social platform with real-time chat and stories.",
    tech: ["Next.js", "Socket.io", "MongoDB", "Redis"],
    year: "2024",
    color: "#3b82f6",
    live: "https://whatapp-clone1.vercel.app",
    github: "https://github.com/sawairamaryam837-spec/whatapp-clone",
  },
  {
    number: "04",
    title: "music-player",
    category: "Backend",
    desc: "A headless CMS built for creatives.",
    tech: ["FastAPI", "React", "S3", "Docker"],
    year: "2024",
    color: "#ffffff",
    live: "https://music-player12.vercel.app",
    github: "https://github.com/sawairamaryam837-spec/Music-Player",
  },
  {
    number: "05",
    title: "To-Do-list",
    category: "Frontend",
    desc: "A headless CMS built for creatives.",
    tech: ["React", "Javascript", "TailwindCSS", "OpenAI"],
    year: "2024",
    color: "#ffffff",
    live: "https://to-do-list34.vercel.app",
    github: "https://github.com/sawairamaryam837-spec/to-do-list34",
  },
  {
    number: "06",
    title: "Quran-AI",
    category: "Backend",
    desc: "A headless CMS built for creatives.",
    tech: ["React", "Javascript", "TailwindCSS", "OpenAI"],
    year: "2024",
    color: "#ffffff",
    live: "https://quran-ai33.vercel.app/",
    github: "https://github.com/sawairamaryam837-spec/quran-ai33",
  },
  {
    number: "07",
    title: "music-player",
    category: "frontend",
    desc: "A headless CMS built for creatives.",
    tech: ["React", "Javascript", "TailwindCSS", "OpenAI"],
    year: "2024",
    color: "#ffffff",
    live: "https://mental-health-companion9900-sawairamaryam837-specs-projects.vercel.app/",
    github: "https://github.com/sawairamaryam837-spec/-mental-health-companion9900",
  },
   {
    number: "08",
    title: "Full-Stack Quran-AI",
    category: "frontend",
    desc: "A headless CMS built for creatives.",
    tech: ["React", "Javascript", "TailwindCSS", "OpenAI"],
    year: "2024",
    color: "#ffffff",
    live: "https://ai-quran8377.vercel.app/",
    github: "https://github.com/sawairamaryam837-spec/ai-quran",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  // Ref array — one entry per project card (for React-ref parallax)
 const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    // Heading reveal
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards stagger reveal
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ─────────────────────────────────────────────────────────────────
    // PARALLAX BLOCK — skipped for prefers-reduced-motion users
    // ─────────────────────────────────────────────────────────────────
    const noMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!noMotion) {
      // Heading drifts up as section enters viewport (slow background speed)
      gsap.set(headingRef.current, { willChange: "transform" });
      gsap.to(headingRef.current, {
        y: -55,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Each card gets a slightly different parallax speed → depth layering
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        // Even cards drift up faster (foreground), odd drift slower (background)
        const yTarget = index % 2 === 0 ? -(18 + index * 6) : -(10 + index * 4);
        const scrubSpeed = 0.9 + index * 0.15;

        gsap.set(card, { willChange: "transform" });
        gsap.to(card, {
          y: yTarget,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: scrubSpeed,
            invalidateOnRefresh: true,
          },
        });
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects-section"
      className="w-full bg-black py-24 md:py-36 px-6 md:px-16 text-white"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="inline-block bg-white text-black font-bold tracking-widest px-4 py-2 text-xs uppercase mb-6">
              SELECTED WORKS
            </span>
            <h2 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none text-white">
              PROJECTS
            </h2>
          </div>
          <p className="text-white/50 text-base md:text-lg font-medium max-w-xs leading-relaxed">
            A selection of real-world projects built with modern technologies and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid flex flex-col divide-y divide-white/10">
          {PROJECTS.map((project, index) => (
          <a
  key={index}
  href={project.live}
  target="_blank"
  rel="noopener noreferrer"
  ref={(el) => {
    if (el) cardsRef.current[index] = el;
  }}
  className="project-card group grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4 md:gap-8 py-10 md:py-14 cursor-pointer hover:bg-white/[0.02] transition-colors duration-300 px-2 md:px-0"
>
              {/* Number */}
              <div className="flex items-start pt-1">
                <span className="text-white/20 text-5xl font-black leading-none group-hover:text-white transition-colors duration-500">
                  {project.number}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-400/30 px-3 py-1">
                    {project.category}
                  </span>
                  <span className="text-white/30 text-xs font-bold uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-500 leading-none">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold uppercase tracking-wider text-white/40 bg-white/5 px-3 py-1 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-end">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:scale-110 transition-all duration-400">
                  <svg
                    className="w-5 h-5 text-white/40 group-hover:text-black -rotate-45 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
           </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-4 border border-white/20 px-10 py-5 hover:bg-white hover:border-white transition-all duration-400">
            <span className="font-black uppercase tracking-widest text-sm text-white group-hover:text-black transition-colors duration-300">
              View All Projects
            </span>
            <svg
              className="w-4 h-4 text-white/50 group-hover:text-black -rotate-45 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
