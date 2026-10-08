"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_LINKS = ["Home", "Work", "About", "Contact"];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
      style={{
        background:
          "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, transparent 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="text-xl font-black tracking-widest"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="text-white">ItZ</span>
          <span style={{ color: "#39ff14" }}>FiZZ</span>
        </span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm font-medium tracking-wider text-gray-400 hover:text-white transition-colors duration-300 relative group"
            >
              {link}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: "#39ff14" }}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105"
        style={{
          borderColor: "#39ff14",
          color: "#39ff14",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#39ff14";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#39ff14";
        }}
      >
        Get In Touch
      </button>
    </nav>
  );
}
