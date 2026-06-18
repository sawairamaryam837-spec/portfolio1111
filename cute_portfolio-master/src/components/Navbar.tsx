"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { label: "Home",     href: "#hero-section",     num: "01" },
  { label: "About",    href: "#next-section",      num: "02" },
  { label: "Services", href: "#services-section",  num: "03" },
  { label: "Projects", href: "#projects-section",  num: "04" },
  { label: "Contact",  href: "#contact-section",   num: "05" },
];

export default function Navbar() {
  const navRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef   = useRef<HTMLUListElement>(null);

  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState("Home");
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // ── Hide on scroll-down / Show on scroll-up ────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y     = window.scrollY;
        const delta = y - lastY.current;
        if (y < 60)        setHidden(false);
        else if (delta > 6)  setHidden(true);
        else if (delta < -6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section scroll-spy ───────────────────────────
  useEffect(() => {
    const sections = [
      { id: "hero-section",     label: "Home"     },
      { id: "next-section",     label: "About"    },
      { id: "services-section", label: "Services" },
      { id: "projects-section", label: "Projects" },
      { id: "contact-section",  label: "Contact"  },
    ];
    const triggers = sections.map(({ id, label }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end:   "bottom 55%",
        onEnter:     () => setActive(label),
        onEnterBack: () => setActive(label),
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  // ── Navbar entrance animation ───────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // ── Overlay open / close animation ─────────────────────
  useEffect(() => {
    const overlay = overlayRef.current;
    const links   = linksRef.current ? Array.from(linksRef.current.children) : [];
    if (!overlay) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" }
      );
      gsap.fromTo(links,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07, delay: 0.3 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay,
        { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut",
          onComplete: () => gsap.set(overlay, { display: "none" }) }
      );
    }
  }, [open]);

  // ── Smooth scroll helper ────────────────────────────────
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* ── Fixed Navbar Bar ─────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[90] transition-transform duration-500 ease-in-out ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-6">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero-section")}
            className="text-xl font-black uppercase tracking-tighter text-white drop-shadow-lg hover:text-blue-400 transition-colors duration-300 focus:outline-none z-[91]"
          >
            SAWAIRA<span className="text-blue-500">.</span>
          </button>

          {/* Hamburger — all screen sizes */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="z-[91] flex flex-col gap-[5px] p-2 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] bg-white drop-shadow-lg transition-all duration-400 origin-center ${
                open ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-white drop-shadow-lg transition-all duration-400 ${
                open ? "w-4 opacity-0 scale-x-0" : "w-4"
              }`}
            />
            <span
              className={`block h-[2px] bg-white drop-shadow-lg transition-all duration-400 origin-center ${
                open ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Full-Screen Overlay Menu ──────────────────────── */}
      <div
        ref={overlayRef}
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
        className="fixed inset-0 z-[89] bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black flex flex-col justify-between px-8 md:px-16 py-20 md:py-24 overflow-y-auto"
      >
        {/* Nav Links */}
        <ul ref={linksRef} className="flex flex-col gap-2 mt-8">
          {NAV_LINKS.map(({ label, href, num }) => (
            <li key={label} className="overflow-hidden border-b border-white/10 last:border-b-0">
              <button
                onClick={() => scrollTo(href)}
                className={`group w-full flex items-center justify-between py-5 md:py-6 focus:outline-none ${
                  active === label ? "text-white" : "text-white/40 hover:text-white"
                } transition-colors duration-300`}
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-xs font-bold tracking-widest text-white/30">{num}</span>
                  <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
                    {label}
                  </span>
                </div>
                <svg
                  className={`w-6 h-6 md:w-8 md:h-8 -rotate-45 transition-transform duration-300 ${
                    active === label ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <a
            href="sawairamaryam837@gmail.com"
            className="text-sm font-bold text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-widest"
          >
           sawairamaryam837@gmail.com
          </a>
          <a
            href="mailto:sawairamaryam837@gmail.com"
            className="bg-white text-[#0a0f1d] px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-950 hover:text-white transition-all duration-300"
          >
            Hire Me →
          </a>
        </div>
      </div>
    </>
  );
}
