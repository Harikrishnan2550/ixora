"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandDivider({ 
  text = "IXORA TECH", 
  // subName = "Precision Infrastructure" 
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [text]);

  return (
    <section className="relative py-24 md:py-12 bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-y border-white/5">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent w-[40%] -skew-x-12 animate-bg-drift" />
      </div>

      {/* ── 2. THE ONE-SECOND SWEEP TEXT ── */}
      <div className="relative z-10 px-6 text-center">
        <h1
          ref={containerRef}
          className={`${audiowide.className} relative text-[1.7rem] sm:text-7xl md:text-[6rem] font-normal tracking-[-0.04em] uppercase leading-none inline-block`}
        >
          {/* BASE LAYER */}
          <span className="text-white/90">
            {text.split("").map((char, i) => (
              <span key={i} className="char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          {/* THE FAST SLANTED BEAM */}
          <span 
            className="absolute inset-0 z-20 pointer-events-none animate-fast-sweep"
            style={{
              // 125deg gives it a strong industrial slant
              background: "linear-gradient(125deg, transparent 0%, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%, transparent 100%)",
              backgroundSize: "250% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 12px rgba(255,255,255,0.8))",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </h1>

       
      </div>

      <style jsx global>{`
        @keyframes bg-drift {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(250%) skewX(-12deg); }
        }
        
        @keyframes fast-sweep {
          0% { background-position: 200% 0; }
          /* Sweep finishes at 30% of the total 3s time (1 second) */
          33% { background-position: -200% 0; } 
          100% { background-position: -200% 0; }
        }

        .animate-bg-drift {
          animation: bg-drift 15s linear infinite;
        }

        .animate-fast-sweep {
          /* 3 second total: 1s for the sweep + 2s for the pause */
          animation: fast-sweep 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}