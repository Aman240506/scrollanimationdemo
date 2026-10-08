"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    id: "ms-1",
    title: "Full Throttle",
    desc: "Zero to hero — max speed from the start",
    scrollPct: 0.08,
    side: "top",
  },
  {
    id: "ms-2",
    title: "Mid Sprint",
    desc: "Momentum builds with every pixel scrolled",
    scrollPct: 0.45,
    side: "bottom",
  },
  {
    id: "ms-3",
    title: "Finish Line",
    desc: "Smooth landing, perfectly in control",
    scrollPct: 0.82,
    side: "top",
  },
];

export default function ScrollCarSection() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const roadLinesRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Main scroll-driven timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Smooth lag-behind — the higher the number the more lag
        },
      });

      // Car drives left → right across viewport
      tl.fromTo(
        carRef.current,
        { xPercent: -120 },
        { xPercent: 120, ease: "none" },
        0
      );

      // Trail expands behind car (neon glow)
      tl.fromTo(
        trailRef.current,
        { width: "0%" },
        { width: "115%", ease: "none" },
        0
      );

      // Road center dashes scroll for parallax feel
      tl.fromTo(
        roadLinesRef.current,
        { x: "0%" },
        { x: "-50%", ease: "none" },
        0
      );

      // Section label fades out as car passes midpoint
      tl.to(
        sectionTitleRef.current,
        { opacity: 0, y: -24, ease: "power2.in", duration: 0.2 },
        0.55
      );

      // Milestone pop-ins
      MILESTONES.forEach((ms) => {
        const el = document.getElementById(ms.id);
        if (!el) return;
        const enterAt = ms.scrollPct - 0.04;
        const exitAt = ms.scrollPct + 0.15;

        // Fade in
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.82, y: ms.side === "top" ? -20 : 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.12, ease: "back.out(2)" },
          enterAt
        );
        // Fade out
        tl.to(
          el,
          { opacity: 0, scale: 0.88, duration: 0.08, ease: "power2.in" },
          exitAt
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scroll-section"
      style={{ height: "260vh", background: "#060606" }}
    >
      {/* Top gradient divider */}
      <div
        className="w-full"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)",
        }}
      />

      {/* Sticky viewport */}
      <div
        className="sticky top-0 overflow-hidden flex flex-col items-center justify-center"
        style={{ height: "100vh", background: "#0a0a0a" }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(57,255,20,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.018) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Section label */}
        <div
          ref={sectionTitleRef}
          className="absolute top-14 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none"
        >
          <p
            className="text-xs tracking-[0.45em] uppercase font-semibold"
            style={{ color: "#39ff14" }}
          >
            Scroll-Driven Animation
          </p>
          <p className="text-xs mt-1" style={{ color: "#383838" }}>
            Scroll to drive the car
          </p>
        </div>

        {/* Milestone text boxes */}
        {MILESTONES.map((ms) => (
          <div
            key={ms.id}
            id={ms.id}
            className="absolute z-30 px-5 py-4 rounded-2xl text-center pointer-events-none"
            style={{
              opacity: 0,
              top: ms.side === "top" ? "12%" : undefined,
              bottom: ms.side === "bottom" ? "28%" : undefined,
              left: "50%",
              transform: "translateX(-50%)",
              minWidth: "220px",
              background: "rgba(5,5,5,0.75)",
              border: "1px solid rgba(57,255,20,0.28)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 30px rgba(57,255,20,0.08)",
            }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: "#39ff14" }}>
              {ms.title}
            </p>
            <p className="text-xs" style={{ color: "#777" }}>
              {ms.desc}
            </p>
          </div>
        ))}

        {/* Road Section */}
        <div
          className="relative w-full"
          style={{ height: "200px" }}
        >
          {/* Road surface */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #181818 0%, #121212 50%, #181818 100%)",
              borderTop: "2px solid #222",
              borderBottom: "2px solid #222",
            }}
          />

          {/* Yellow edge lines */}
          <div
            className="absolute left-0 right-0"
            style={{
              top: "10px",
              height: "2px",
              background: "rgba(255, 220, 70, 0.35)",
            }}
          />
          <div
            className="absolute left-0 right-0"
            style={{
              bottom: "10px",
              height: "2px",
              background: "rgba(255, 220, 70, 0.35)",
            }}
          />

          {/* Center dashed road markings (GSAP moves these for parallax) */}
          <div
            ref={roadLinesRef}
            className="absolute flex items-center gap-8"
            style={{
              top: "50%",
              left: "-50%",
              width: "200%",
              transform: "translateY(-50%)",
            }}
          >
            {Array.from({ length: 44 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "56px",
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  flexShrink: 0,
                  willChange: "transform",
                }}
              />
            ))}
          </div>

          {/* Neon trail behind car */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full"
            style={{
              width: "0%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.04) 60%, rgba(57,255,20,0.15) 100%)",
              zIndex: 1,
              willChange: "width",
            }}
          />

          {/* Car wrapper — GSAP drives xPercent */}
          <div
            ref={carRef}
            className="absolute"
            style={{
              bottom: "0px",
              left: "0%",
              zIndex: 10,
              willChange: "transform",
            }}
          >
            {/* Speed streaks */}
            <div
              className="absolute flex flex-col gap-1.5"
              style={{
                right: "calc(100% - 10px)",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {[70, 45, 25].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: `${w}px`,
                    height: "2px",
                    background: `rgba(57,255,20,${0.55 - i * 0.16})`,
                    borderRadius: "1px",
                    marginLeft: "auto",
                  }}
                />
              ))}
            </div>

            {/* Car image */}
            <Image
              src="/car.png"
              alt="Sports car driving across the screen in a scroll animation"
              width={300}
              height={170}
              style={{
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 22px rgba(57,255,20,0.35)) drop-shadow(0 12px 24px rgba(0,0,0,0.9))",
                userSelect: "none",
                pointerEvents: "none",
                display: "block",
              }}
              priority
            />

            {/* Ground shadow */}
            <div
              style={{
                width: "240px",
                height: "14px",
                background:
                  "radial-gradient(ellipse, rgba(0,0,0,0.75) 0%, transparent 70%)",
                marginTop: "-6px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20"
        >
          <span className="text-xs tracking-widest font-mono" style={{ color: "#2a2a2a" }}>
            0%
          </span>
          <div
            className="relative overflow-hidden rounded-full"
            style={{ width: "180px", height: "2px", background: "rgba(57,255,20,0.08)" }}
          >
            <div
              id="progress-bar"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "0%",
                background: "#39ff14",
                borderRadius: "9999px",
                boxShadow: "0 0 6px rgba(57,255,20,0.8)",
              }}
            />
          </div>
          <span className="text-xs tracking-widest font-mono" style={{ color: "#2a2a2a" }}>
            100%
          </span>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div
        className="w-full"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
