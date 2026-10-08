"use client";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-8 md:px-16"
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(57,255,20,0.07)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div>
          <span
            className="text-2xl font-black tracking-widest"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">ItZ</span>
            <span style={{ color: "#39ff14" }}>FiZZ</span>
          </span>
          <p
            className="mt-2 text-xs tracking-wider uppercase"
            style={{ color: "#333" }}
          >
            Premium Scroll-Driven Experiences
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-8">
          {["GitHub", "LinkedIn", "Twitter"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-xs tracking-widest uppercase transition-colors duration-300 hover:text-white"
              style={{ color: "#333" }}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs font-mono" style={{ color: "#222" }}>
          © 2024 ItZFiZZ &mdash; Built with Next.js + GSAP
        </p>
      </div>
    </footer>
  );
}
