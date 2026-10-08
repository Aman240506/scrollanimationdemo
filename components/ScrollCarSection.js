"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STAT_BOXES = [
  {
    id: "box-1",
    pct: "98%",
    label: "CLIENT SATISFACTION",
    desc: "Top tier performance & feedback",
    bg: "#f39c12", // Yellow / Gold
    textColor: "#000",
    pos: { top: "12%", left: "18%" },
    scrollTriggerStart: 0.12,
  },
  {
    id: "box-2",
    pct: "150+",
    label: "PROJECTS DELIVERED",
    desc: "Seamless full-stack builds",
    bg: "#3498db", // Blue
    textColor: "#fff",
    pos: { bottom: "12%", left: "40%" },
    scrollTriggerStart: 0.38,
  },
  {
    id: "box-3",
    pct: "5 ★",
    label: "EXCELLENCE RATING",
    desc: "Vetted motion & UI design",
    bg: "#2c3e50", // Dark
    textColor: "#fff",
    pos: { top: "12%", left: "64%" },
    scrollTriggerStart: 0.62,
  },
  {
    id: "box-4",
    pct: "< 10ms",
    label: "LATENCY SPEED",
    desc: "Optimized 60fps GSAP pipeline",
    bg: "#e67e22", // Orange
    textColor: "#fff",
    pos: { bottom: "12%", left: "82%" },
    scrollTriggerStart: 0.82,
  },
];

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

export default function ScrollCarSection() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for car movement + green trail across scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // 1. Car moves from left (-15%) to right (110%)
      tl.fromTo(
        carRef.current,
        { left: "-15%" },
        { left: "110%", ease: "none" },
        0
      );

      // 2. Green trail width grows behind car (0% to 100%)
      tl.fromTo(
        trailRef.current,
        { width: "0%" },
        { width: "100%", ease: "none" },
        0
      );

      // 3. Letters reveal as car drives over them
      letterRefs.current.forEach((letter, index) => {
        if (!letter) return;
        const letterProgress = index / HEADLINE_TEXT.length;
        tl.to(
          letter,
          {
            color: "#39ff14",
            textShadow: "0 0 15px rgba(57, 255, 20, 0.9), 0 0 30px rgba(57, 255, 20, 0.4)",
            scale: 1.15,
            duration: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          letterProgress * 0.85
        );
      });

      // 4. Stat boxes animate in based on scroll depth
      STAT_BOXES.forEach((box) => {
        const el = document.getElementById(box.id);
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${box.scrollTriggerStart * 100}% top`,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-section"
      className="relative w-full"
      style={{ height: "300vh", background: "#111" }}
    >
      {/* Sticky viewport track container */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none"
        style={{ backgroundColor: "#d1d1d1" }}
      >
        {/* Track Title / Subtitle Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-700">
            SCROLL-DRIVEN RACE TRACK
          </p>
          <p className="text-[11px] font-medium tracking-widest text-gray-500 mt-1">
            MCLAREN 720S &bull; REVEAL ANIMATION
          </p>
        </div>

        {/* 4 Stat Boxes positioned on the track area */}
        {STAT_BOXES.map((box) => (
          <div
            key={box.id}
            id={box.id}
            className="absolute z-30 p-5 rounded-2xl shadow-2xl flex flex-col items-center text-center pointer-events-none transition-transform duration-300"
            style={{
              backgroundColor: box.bg,
              color: box.textColor,
              minWidth: "180px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.2)",
              ...box.pos,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-3xl font-black tracking-tight mb-1">
              {box.pct}
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-90">
              {box.label}
            </span>
            <span className="text-[11px] font-medium opacity-75 mt-0.5">
              {box.desc}
            </span>
          </div>
        ))}

        {/* Central Road Canvas */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: "240px", backgroundColor: "#18181b" }}
        >
          {/* Yellow outer boundary lines */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ background: "#f59e0b" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5"
            style={{ background: "#f59e0b" }}
          />

          {/* White dashed road line */}
          <div
            className="absolute w-full flex justify-between px-4 z-0"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="h-1 w-8 rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              />
            ))}
          </div>

          {/* Green Trail line that expands behind car */}
          <div
            ref={trailRef}
            className="absolute left-0 z-10 pointer-events-none"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              height: "6px",
              background:
                "linear-gradient(90deg, transparent 0%, #39ff14 30%, #39ff14 100%)",
              boxShadow:
                "0 0 15px #39ff14, 0 0 30px #39ff14, 0 0 45px rgba(57,255,20,0.8)",
              borderRadius: "3px",
            }}
          />

          {/* Headline letters on road path */}
          <div className="relative z-10 flex items-center justify-center gap-2 md:gap-4 font-black tracking-widest text-2xl md:text-5xl pointer-events-none">
            {HEADLINE_TEXT.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className="transition-colors duration-200"
                style={{
                  color: char === " " ? "transparent" : "rgba(255,255,255,0.25)",
                  display: "inline-block",
                  minWidth: char === " " ? "1rem" : "auto",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Top-Down McLaren Car Container */}
          <div
            ref={carRef}
            className="absolute z-20 pointer-events-none flex items-center"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              width: "200px",
              height: "100px",
            }}
          >
            <Image
              src="/mclaren-top.png"
              alt="Orange McLaren Top View Cutout"
              width={220}
              height={120}
              className="object-contain"
              style={{
                filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.7))",
                width: "auto",
                height: "auto",
              }}
              priority
            />
          </div>
        </div>

        {/* Progress Bar & Instructions at bottom */}
        <div className="absolute bottom-6 flex flex-col items-center gap-2 z-20 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest text-gray-600">
              START
            </span>
            <div
              className="relative w-48 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
            >
              <div
                id="progress-bar"
                className="h-full rounded-full transition-all duration-75"
                style={{ backgroundColor: "#10b981", width: "0%" }}
              />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gray-600">
              FINISH
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-widest uppercase text-gray-500">
            Scroll down to drive
          </span>
        </div>
      </div>
    </section>
  );
}

