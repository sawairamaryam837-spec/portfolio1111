import React from "react";

const NAV_LINKS = ["Home", "About", "Projects", "Services", "Contact"];
const SOCIALS = [
  { label: "GH", href: "#" },
  { label: "LI", href: "#" },
  { label: "IG", href: "#" },
  { label: "TW", href: "#" },
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10 text-white">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10 px-6 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-4">
            Open for work · Available now
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-none text-white">
            LET&apos;S BUILD<br />
            <span className="text-blue-500">SOMETHING</span><br />
            GREAT.
          </h2>
        </div>

        <a
          href="mailto:sawairamaryam837@gmail.com"
          className="group flex items-center gap-4 bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-sm hover:bg-blue-950 hover:text-white transition-all duration-300 shrink-0 self-end"
        >
          Email Me
          <svg
            className="w-4 h-4 -rotate-45 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Middle Nav + Socials */}
      <div className="border-b border-white/10 px-6 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Nav Links */}
        <nav className="flex flex-wrap gap-6 md:gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}-section`}
              className="text-sm font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="w-10 h-10 border border-white/20 flex items-center justify-center text-xs font-black text-white/40 hover:border-white hover:text-white transition-all duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs font-bold uppercase tracking-widest">
        <span>© {currentYear} SAWAIRA MARYAM — All Rights Reserved</span>
        <span>Designed &amp; Built with ♥ by SAWAIRA MARYAM</span>
      </div>
    </footer>
  );
}
