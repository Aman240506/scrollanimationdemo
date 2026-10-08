import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "ItZFiZZ | Premium Scroll Animation",
  description:
    "Premium scroll-driven hero animation showcase for ItZFiZZ — built with Next.js, GSAP, and Tailwind CSS.",
  keywords: "scroll animation, GSAP, Next.js, hero section, ItZFiZZ",
  openGraph: {
    title: "ItZFiZZ | Premium Scroll Animation",
    description: "Experience smooth scroll-driven animations",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
