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
    style: { top: "6%", right: "32%" },
    startPct: 0.2,
  },
  {
    id: "box2",
    num: "23%",
    label: "Decreased in customer phone calls",
    bg: "#6ac9ff",
    color: "#111",
    style: { bottom: "6%", right: "37%" },
    startPct: 0.4,
  },
  {
    id: "box3",
    num: "27%",
    label: "Increase in pick up point use",
    bg: "#333",
    color: "#fff",
    style: { top: "6%", right: "8%" },
    startPct: 0.6,
  },
  {
    id: "box4",
    num: "40%",
    label: "Decreased in customer phone calls",
    bg: "#fa7328",
    color: "#111",
    style: { bottom: "6%", right: "12%" },
    startPct: 0.8,
  },
];

const HEADLINE_LETTERS = "WELCOME ITZFIZZ".split("");

export default function ScrollCarSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const valueAddRef = useRef(null);
  const letterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const letters = letterRefs.current;
      const valueAdd = valueAddRef.current;

      if (!car || !trail || !valueAdd) return;

      const roadWidth = window.innerWidth;
      const carWidth = car.offsetWidth || 380;
      const endX = roadWidth - carWidth;

      // 1. Scroll-driven timeline for car movement & trail reveal
      gsap.to(car, {
        x: endX,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: trackRef.current,
          onUpdate: (self) => {
            const currentCarX = gsap.getProperty(car, "x") + carWidth / 2;
            const valueRect = valueAdd.getBoundingClientRect();

            // Reveal letters as car passes over them
            letters.forEach((letter) => {
              if (!letter) return;
              const letterX = letter.getBoundingClientRect().left;
              if (currentCarX >= letterX - valueRect.left / 2) {
                letter.style.opacity = "1";
              } else {
                letter.style.opacity = "0";
              }
            });

            // Expand green trail behind car
            gsap.set(trail, { width: currentCarX });
          },
        },
      });

      // 2. Animate stat boxes in on scroll scrub
      STAT_BOXES.forEach((box) => {
        const el = document.getElementById(box.id);
        if (!el) return;

        gsap.to(el, {
          opacity: 1,
          scale: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${box.startPct * 1000} top`,
            end: `top+=${box.startPct * 1000 + 200} top`,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-section"
      className="relative w-full"
      style={{ height: "250vh", backgroundColor: "#121212" }}
    >
      {/* Sticky Track Viewport */}
      <div
        ref={trackRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden select-none"
        style={{ backgroundColor: "#d1d1d1" }}
      >
        {/* Stat Boxes */}
        {STAT_BOXES.map((box) => (
          <div
            key={box.id}
            id={box.id}
            className="absolute z-10 flex flex-col justify-center items-start gap-1 p-6 rounded-2xl shadow-xl transition-all pointer-events-none"
            style={{
              backgroundColor: box.bg,
              color: box.color,
              opacity: 0,
              transform: "scale(0.9) translateY(20px)",
              minWidth: "220px",
              maxWidth: "280px",
              ...box.style,
            }}
          >
            <span className="text-5xl font-extrabold tracking-tight">
              {box.num}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
              {box.label}
            </span>
          </div>
        ))}

        {/* Central Road */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "200px", backgroundColor: "#1e1e1e" }}
        >
          {/* Green Trail behind car */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 z-1 pointer-events-none"
            style={{ height: "200px", width: 0, backgroundColor: "#45db7d" }}
          />

          {/* Letter Reveal ("WELCOME ITZFIZZ") */}
          <div
            ref={valueAddRef}
            className="absolute z-5 flex gap-2 md:gap-4 font-black tracking-widest pointer-events-none"
            style={{
              top: "22%",
              left: "5%",
              fontSize: "clamp(2.5rem, 6.5vw, 6.8rem)",
            }}
          >
            {HEADLINE_LETTERS.map((char, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className="transition-opacity duration-150"
                style={{
                  color: "#111",
                  opacity: 0,
                  display: "inline-block",
                  minWidth: char === " " ? "1.5rem" : "auto",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Top-Down McLaren Car (Downloaded Official 4K Reference PNG) */}
          <img
            ref={carRef}
            src="/mclaren-top.png"
            alt="McLaren 720S Top View"
            className="absolute top-0 left-0 z-10 pointer-events-none object-contain"
            style={{
              height: "200px",
              width: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}


