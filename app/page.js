"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollCarSection from "@/components/ScrollCarSection";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Custom cursor & progress bar
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      raf = requestAnimationFrame(animateFollower);
    };

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animateFollower);

    // Progress bar update
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      const bar = document.getElementById("progress-bar");
      if (bar) bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateProgress);
      cancelAnimationFrame(raf);
      cursor.remove();
      follower.remove();
    };
  }, []);

  return (
    <main>
      <Navbar />
      <HeroSection />
      <ScrollCarSection />
      <Footer />
    </main>
  );
}
