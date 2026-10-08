# Scroll-Driven Hero Car Animation (amanifitz)

A premium, performant scroll-driven hero section animation built with **Next.js**, **React**, **GSAP**, **ScrollTrigger**, and **Tailwind CSS**. Inspired by [Paras Chaturvedi's Car Scroll Animation](https://paraschaturvedi.github.io/car-scroll-animation).

## 🚀 Live Demo & Repository

- **Live Webpage**: [https://aman240506.github.io/amanifitz/](https://aman240506.github.io/amanifitz/) (or Vercel / GitHub Pages link)
- **GitHub Repository**: [https://github.com/Aman240506/amanifitz](https://github.com/Aman240506/amanifitz)

---

## 🌟 Key Features

1. **Hero Section (Above the Fold)**
   - Letter-spaced headline: `W E L C O M E   I T Z F I Z Z`
   - Smooth initial load animation with 3D letter flips, neon line expansion, and spring-loaded stat card reveals.
   - Interactive ambient glow and bouncing scroll indicator.

2. **Scroll-Driven Car Section (Core Feature)**
   - **McLaren 720S Top-Down View**: 4K transparent RGBA car asset centered vertically on the road.
   - **Horizontal Translation**: Car moves left-to-right tied directly to scroll progress via GSAP `ScrollTrigger` (`scrub: 1`).
   - **Expanding Green Trail**: Dynamic neon trail line (`#45db7d`) extending behind the car.
   - **Letter Reveal**: `WELCOME ITZFIZZ` text lights up in green with glowing text shadow as the car passes over each letter.
   - **Staggered Stat Cards**: 4 floating statistics cards (`58%`, `23%`, `27%`, `40%`) popping in smoothly on scroll.

3. **Performance & Motion Guidelines**
   - Built with hardware-accelerated CSS `transform` properties (`translate3d`, `scale`) for 60fps animations without layout reflows.
   - Decoupled CSS `sticky top-0` viewport positioning from GSAP `ScrollTrigger` scrub logic to prevent layout conflicts and keep footer scrolling natural.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Animation**: GSAP 3.12 (GreenSock) + ScrollTrigger Plugin
- **Styling**: Tailwind CSS + Vanilla CSS Design System
- **Language**: JavaScript (ES6+)

---

## 🏁 Getting Started Locally

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Aman240506/amanifitz.git

# Navigate to project directory
cd amanifitz

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment to GitHub Pages / Vercel

```bash
# Production Build
npm run build
```

---

## 📄 License
MIT © Aman

