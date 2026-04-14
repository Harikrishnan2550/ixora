"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Michroma } from "next/font/google";
import { 
  FaBars, 
  FaXmark, 
  FaChevronRight, 
  FaArrowRightArrowLeft 
} from "react-icons/fa6";

const michroma = Michroma({ weight: "400", subsets: ["latin"] });

const NAV_ITEMS = ["Home", "About", "Services", "Pricing", "Brochures"] as const;

const NAV_HREFS: Record<string, string> = {
  Home: "/",
  About: "/about",
  Services: "/services",
  Pricing: "/pricing",
  Brochures: "/brochures",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // ALIGNMENT FIX: Matched the px-6 md:px-12 padding exactly to your Hero section
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-5 px-6 md:px-12 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        // ALIGNMENT FIX: Matched the max-w-[1400px] exactly to your Hero section
        className="pointer-events-auto w-full max-w-[1300px]"
      >
        <motion.div
          animate={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            paddingTop: scrolled ? "0.5rem" : "0.75rem",
            paddingBottom: scrolled ? "0.5rem" : "0.75rem",
          }}
          className="relative flex items-center justify-between px-6 md:px-8 border border-white/60 rounded-full transition-all duration-500 shadow-sm text-slate-950"
        >
          {/* LOGO */}
          <Link href="/" className="group flex items-center shrink-0">
            <div className="relative h-10 w-28 md:h-16 md:w-32 transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/logo-ixora.png" 
                alt="Ixora Logo"
                fill
                className="object-contain object-left"
                priority 
              />
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-16">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item} 
                href={NAV_HREFS[item]} 
                className={`
                  ${michroma.className} text-[9px] tracking-[0.3em] uppercase  relative group py-2 text-slate-500 hover:text-slate-950 transition-colors duration-300
                  [-webkit-text-stroke:0.5px_currentColor]
                `}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  ${michroma.className} text-[8px] tracking-[0.2em] px-6 py-2.5 rounded-full flex items-center gap-3 transition-all bg-slate-950 text-white hover:bg-orange-500
                  [-webkit-text-stroke:0.5px_currentColor]
                `}
              >
                Contact <FaChevronRight size={10} />
              </motion.button>
            </Link>

            {/* HAMBURGER */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-xl text-slate-950 hover:text-orange-500 transition-colors"
            >
              {menuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </motion.div>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="md:hidden mt-4 bg-slate-950 rounded-[2rem] p-8 shadow-2xl border border-white/10"
            >
              <div className="flex flex-col gap-5">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      href={NAV_HREFS[item]}
                      onClick={() => setMenuOpen(false)}
                      className={`
                        ${michroma.className} text-xl uppercase tracking-tighter text-slate-500 hover:text-white transition-all flex justify-between items-center
                        [-webkit-text-stroke:1px_currentColor]
                      `}
                    >
                      {item}
                      <FaChevronRight className="text-orange-500 text-sm" />
                    </Link>
                  </motion.div>
                ))}
                
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-4 pt-5 border-t border-white/5">
                  <button className={`
                    ${michroma.className} w-full py-4 bg-orange-500 text-white rounded-xl text-[9px] tracking-[0.3em] uppercase flex items-center justify-center gap-3
                    [-webkit-text-stroke:0.5px_currentColor]
                  `}>
                    Connect Now <FaArrowRightArrowLeft />
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}