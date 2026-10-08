"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Projects Delivered" },
  { value: "5 ★", label: "Average Rating" },
  { value: "3+", label: "Years Experience" },
];

/** Splits text into individually animatable letter spans */
function SplitText({ text, className, style }) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const statsRef = useRef(null);
  const descRef = useRef(null);
  const scrollCueRef = useRef(null);
  const bgGlowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background glow pulse — infinite loop
      gsap.to(bgGlowRef.current, {
        opacity: 0.18,
        scale: 1.15,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Master load timeline
      const tl = gsap.timeline({ delay: 0.4 });

      // 1. Sub-label
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      // 2. Headline letters stagger with 3D flip
      tl.fromTo(
        headlineRef.current.querySelectorAll(".letter"),
        { opacity: 0, y: 60, rotateX: -60 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // 3. Divider line expands
      tl.fromTo(
        "#hero-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // 4. Description fades in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // 5. Stats stagger with spring
      tl.fromTo(
        statsRef.current.querySelectorAll(".stat-item"),
        { opacity: 0, y: 30, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.13,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // 6. Scroll cue
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      // Bouncing arrow loop
      gsap.to("#scroll-arrow", {
        y: 8,
        duration: 0.85,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050505 0%, #090909 60%, #060b04 100%)",
      }}
    >
      {/* Neon radial glow blob */}
      <div
        ref={bgGlowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(57,255,20,0.1) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.08,
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto w-full">

        {/* Sub-label */}
        <div
          ref={subRef}
          className="mb-6 flex items-center gap-3"
          style={{ opacity: 0 }}
        >
          <span className="w-10 h-px" style={{ background: "#39ff14" }} />
          <span
            className="text-xs font-semibold tracking-[0.35em] uppercase"
            style={{ color: "#39ff14" }}
          >
            Scroll Experience
          </span>
          <span className="w-10 h-px" style={{ background: "#39ff14" }} />
        </div>

        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-black leading-none mb-2"
          style={{
            fontSize: "clamp(2.8rem, 9vw, 9rem)",
            letterSpacing: "0.22em",
            fontFamily: "'Space Grotesk', sans-serif",
            perspective: "1000px",
          }}
        >
          <SplitText text="WELCOME" className="block text-white" />
          <SplitText
            text="ITZFIZZ"
            className="block"
            style={{ color: "#39ff14" }}
          />
        </h1>

        {/* Neon divider */}
        <div
          id="hero-divider"
          className="mt-4 mb-10 h-px w-40 mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, #39ff14, transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Description */}
        <p
          ref={descRef}
          className="mb-14 text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: "#888", opacity: 0 }}
        >
          Scroll down to experience a fluid, performant scroll-driven car
          animation — built with GSAP &amp; ScrollTrigger.
        </p>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-item group relative flex flex-col items-center p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                borderColor: "rgba(57,255,20,0.12)",
                background:
                  "linear-gradient(145deg, rgba(57,255,20,0.05) 0%, rgba(5,5,5,0.7) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(57,255,20,0.1) 0%, transparent 100%)",
                  border: "1px solid rgba(57,255,20,0.5)",
                  borderRadius: "inherit",
                }}
              />
              <span
                className="text-3xl md:text-4xl font-black mb-1 relative z-10"
                style={{ color: "#39ff14" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-medium tracking-widest uppercase text-center relative z-10"
                style={{ color: "#555" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#3a3a3a" }}
        >
          Scroll
        </span>
        <div
          id="scroll-arrow"
          className="w-5 h-5 border-b-2 border-r-2 rotate-45"
          style={{ borderColor: "#39ff14" }}
        />
      </div>
    </section>
  );
}
