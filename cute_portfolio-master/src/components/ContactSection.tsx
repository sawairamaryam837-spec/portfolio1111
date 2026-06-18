"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_INFO = [
  { label: "Email", value: "sawairamaryam837@gmail.com", href: "mailto:sawairamaryam837@gmail.com" },
  { label: "Phone", value: "+92 3364445514", href: "tel:+923364445514" },
  { label: "Location", value: "pakistan", href: null },
];

const SOCIALS = [
  { label: "Github", href: "https://github.com/sawairamaryam837-spec" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sawaira-maryam-8a3842362/" },
  { label: "Instagram", href: "https://www.instagram.com/saweramaryam834/?hl=en" },
  { label: "Twitter", href: "https://x.com/SawairaMar82397" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Proper React refs for parallax (replaces className selectors)
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    // Entrance: left column slides in from left
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Entrance: right column slides in from right
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // ─────────────────────────────────────────────────────────────────
    // PARALLAX BLOCK — skipped for prefers-reduced-motion
    // ─────────────────────────────────────────────────────────────────
    const noMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!noMotion) {
      // GPU-accelerate both columns
      gsap.set([leftRef.current, rightRef.current], { willChange: "transform" });

      // Left column — foreground layer, faster upward drift
      gsap.to(leftRef.current, {
        y: -45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end:   "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Right column — background layer, slower drift (depth effect)
      gsap.to(rightRef.current, {
        y: -25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end:   "bottom top",
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      });
    }
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="w-full bg-gradient-to-br from-blue-950 via-[#0a0f1d] to-black py-24 md:py-36 px-6 md:px-16 text-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* LEFT — Heading + Info */}
        <div ref={leftRef} className="contact-left flex flex-col justify-between gap-12">
          <div>
            <span className="inline-block bg-white text-black font-bold tracking-widest px-4 py-2 text-xs uppercase mb-8">
              GET IN TOUCH
            </span>
            <h2 className="text-6xl sm:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] text-white">
              LET&apos;S<br />WORK<br />TOGETHER
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="flex flex-col gap-1 border-b border-white/20 pb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">
                  {info.label}
                </span>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-lg font-bold text-white hover:opacity-60 transition-opacity duration-200"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className="text-lg font-bold text-white">{info.value}</span>
                )}
              </div>
            ))}

            {/* Socials */}
            <div className="flex gap-4 flex-wrap pt-2">
              {SOCIALS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="text-xs font-black uppercase tracking-widest text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div ref={rightRef} className="contact-right flex flex-col justify-center">
          {submitted ? (
            <div className="flex flex-col items-start gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white">Message Sent!</h3>
              <p className="text-white/60 font-medium">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                className="mt-4 text-sm font-black uppercase tracking-widest border-b-2 border-white hover:opacity-60 transition-opacity"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-transparent border-b-2 border-white/30 focus:border-white outline-none py-3 text-white font-bold text-lg placeholder:text-white/20 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="bg-transparent border-b-2 border-white/30 focus:border-white outline-none py-3 text-white font-bold text-lg placeholder:text-white/20 transition-colors duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="bg-transparent border-b-2 border-white/30 focus:border-white outline-none py-3 text-white font-bold text-base placeholder:text-white/20 resize-none transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                className="group mt-4 bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-sm flex items-center gap-4 hover:bg-blue-950 hover:text-white transition-all duration-400 self-start"
              >
                Send Message
                <svg
                  className="w-4 h-4 -rotate-45 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
