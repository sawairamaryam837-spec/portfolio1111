"use client";

import { useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Banner from "@/components/banner/Banner";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainRef.current) return;

    if (loadingComplete) {
      // Animate in from current state (already set to opacity:0 below via gsap.set)
      gsap.to(mainRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    } else {
      // Set initial hidden state immediately — before the loading screen exits
      // This means there is zero gap between "loading screen gone" and "content visible"
      gsap.set(mainRef.current, { opacity: 0, scale: 1.04 });
    }
  }, [loadingComplete]);

  return (
    <main className="relative min-h-screen bg-black">
      {/* Navbar — always visible, fixed over everything including loading screen */}
      <Navbar />
      {/* LoadingScreen is fixed/full-screen — it visually covers main-content below */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* 
        Always mounted so GSAP can set opacity:0 BEFORE the loading screen disappears.
        This eliminates the black flash entirely.
      */}
      <div ref={mainRef} className="main-content flex flex-col">
        <Banner />
        <HeroSection />

        {/* next section anchor for scroll arrow */}
        <div id="next-section">
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </main>
  );
}
