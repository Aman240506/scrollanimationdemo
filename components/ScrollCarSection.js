"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STAT_BOXES = [
  {
    id: "box1",
    num: "58%",
    label: "Increase in pick up point use",
    bg: "#def54f",
    color: "#111",
    style: { top: "10%", left: "12%" },
    revealPct: 0.15,
  },
  {
    id: "box2",
    num: "23%",
    label: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    color: "#111",
    style: { bottom: "10%", left: "38%" },
    revealPct: 0.38,
  },
  {
    id: "box3",
    num: "27%",
    label: "Increase in pick up point use",
    bg: "#333",
    color: "#fff",
    style: { top: "10%", left: "62%" },
    revealPct: 0.62,
  },
  {
    id: "box4",
    num: "40%",
    label: "Decreased in customer phone calls",
    bg: "#fa7328",
    color: "#111",
    style: { bottom: "10%", left: "84%" },
    revealPct: 0.82,
  },
];

const HEADLINE_LETTERS = "WELCOME ITZFIZZ".split("");

export default function ScrollCarSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = letterRefs.current;

      if (!car || !trail) return;

      const roadWidth = window.innerWidth;
      const startX = -180;
      const endX = roadWidth + 50;

      // Master Scroll-Driven Animation
      gsap.fromTo(
        car,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress; // 0 to 1

              // 1. Expand trail behind car
              gsap.set(trail, { width: `${progress * 100}%` });

              // 2. Reveal letters sequentially as car travels
              letters.forEach((letter, i) => {
                if (!letter) return;
                const letterProgress = i / letters.length;
                if (progress >= letterProgress) {
                  letter.style.opacity = "1";
                  letter.style.color = "#39ff14";
                  letter.style.textShadow =
                    "0 0 15px rgba(57, 255, 20, 0.8), 0 0 30px rgba(57, 255, 20, 0.4)";
                } else {
                  letter.style.opacity = "0.2";
                  letter.style.color = "#111";
                  letter.style.textShadow = "none";
                }
              });

              // 3. Stat boxes pop-in
              STAT_BOXES.forEach((box) => {
                const el = document.getElementById(box.id);
                if (!el) return;
                if (progress >= box.revealPct - 0.05 && progress <= box.revealPct + 0.2) {
                  el.style.opacity = "1";
                  el.style.transform = "scale(1) translateY(0)";
                } else {
                  el.style.opacity = "0";
                  el.style.transform = "scale(0.85) translateY(20px)";
                }
              });
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-section"
      className="relative w-full"
      style={{ height: "300vh", backgroundColor: "#121212" }}
    >
      {/* Sticky Track Viewport */}
      <div
        ref={trackRef}
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none z-10"
        style={{ backgroundColor: "#d1d1d1" }}
      >
        {/* Track Title */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-gray-700">
            SCROLL-DRIVEN EXPERIENCE
          </p>
        </div>

        {/* Stat Boxes */}
        {STAT_BOXES.map((box) => (
          <div
            key={box.id}
            id={box.id}
            className="absolute z-20 flex flex-col justify-center items-start gap-1 p-5 md:p-6 rounded-2xl shadow-2xl transition-all duration-300 pointer-events-none"
            style={{
              backgroundColor: box.bg,
              color: box.color,
              opacity: 0,
              transform: "scale(0.85) translateY(20px)",
              minWidth: "200px",
              maxWidth: "260px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              ...box.style,
            }}
          >
            <span className="text-4xl md:text-5xl font-black tracking-tight">
              {box.num}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider opacity-90">
              {box.label}
            </span>
          </div>
        ))}

        {/* Central Road */}
        <div
          className="relative w-full overflow-hidden flex items-center"
          style={{ height: "200px", backgroundColor: "#1e1e1e" }}
        >
          {/* Yellow outer boundary lines */}
          <div
            className="absolute top-0 left-0 right-0 h-1 z-10"
            style={{ backgroundColor: "#f59e0b" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1 z-10"
            style={{ backgroundColor: "#f59e0b" }}
          />

          {/* Road center dashes */}
          <div
            className="absolute w-full flex justify-between px-4 z-0 pointer-events-none"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="h-1 w-8 rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              />
            ))}
          </div>

          {/* Green Trail behind car */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full z-1 pointer-events-none transition-all"
            style={{
              width: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.3) 40%, #45db7d 100%)",
              boxShadow: "0 0 20px rgba(69,219,125,0.6)",
            }}
          />

          {/* Letter Reveal ("WELCOME ITZFIZZ") */}
          <div
            className="absolute z-5 flex gap-2 md:gap-3 font-black tracking-widest pointer-events-none"
            style={{
              top: "50%",
              left: "5%",
              transform: "translateY(-50%)",
              fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
            }}
          >
            {HEADLINE_LETTERS.map((char, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className="transition-all duration-200"
                style={{
                  color: "#111",
                  opacity: 0.2,
                  display: "inline-block",
                  minWidth: char === " " ? "1.2rem" : "auto",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Sleek Top-Down McLaren Car */}
          <img
            ref={carRef}
            src="/mclaren-top.png"
            alt="McLaren 720S Top View"
            className="absolute z-10 pointer-events-none object-contain"
            style={{
              height: "110px",
              width: "auto",
              top: "50%",
              transform: "translateY(-50%)",
              filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.7))",
            }}
          />
        </div>
      </div>
    </section>
  );
}




