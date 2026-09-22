import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onConnectClick: () => void;
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnectClick, onWorkClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--bg-dark)] text-[#f4f4f6] overflow-hidden flex flex-col justify-between"
      id="hero"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-cyan)]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Centered Hero Visual */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div 
          style={{ y: yPos, opacity, scale }}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative w-full h-full max-w-5xl mx-auto flex items-end justify-center pt-24"
        >
          {/* Glowing Aura Behind Image */}
          <motion.div 
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-[60%] h-[70%] bg-[var(--accent-blue)]/20 rounded-full blur-[100px]"
          />
          
          <img 
            src="/assets/ammi/hero_ai.jpg" 
            alt="Ammi Reddy Tetala"
            className="relative z-10 h-[85vh] object-contain drop-shadow-2xl rounded-3xl"
          />
        </motion.div>
      </div>

      {/* Hero Editorial Typography Overlay */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12 flex flex-col justify-between pointer-events-none">
        {/* Top Floating Badge & Status */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pointer-events-auto blue-glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--accent-cyan)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>ENTERPRISE IT MANAGER & SOLUTIONS DEVELOPER</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="hidden md:flex flex-col items-end text-xs font-mono text-[#9496a8] pointer-events-auto"
          >
            <span className="text-white/40">BASED IN</span>
            <span>FRANKLIN, TN</span>
          </motion.div>
        </div>

        {/* Left & Right Minimal Typography Grid (Framing center) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto pointer-events-none">
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="md:col-span-4 space-y-4 pointer-events-auto bg-gradient-to-r from-[var(--bg-dark)]/90 via-[var(--bg-dark)]/60 to-transparent p-4 md:p-6 rounded-2xl backdrop-blur-sm border-l border-[var(--border-subtle)]"
          >
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight font-syne leading-tight text-white flex flex-wrap">
              {"Building robust ".split(" ").map((word, i) => (
                <motion.span key={`w1-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }} className="mr-2">{word}</motion.span>
              ))}
              <div className="w-full h-0" />
              {"enterprise architectures ".split(" ").map((word, i) => (
                <motion.span key={`w2-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }} className="mr-2 text-cyan-gradient">{word}</motion.span>
              ))}
              <div className="w-full h-0" />
              {"& automated AI workflows.".split(" ").map((word, i) => (
                <motion.span key={`w3-${i}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }} className="mr-2">{word}</motion.span>
              ))}
            </h1>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] font-light leading-relaxed">
              IT Manager at GEODIS leading a 14-person global team across the U.S. and India. Specializing in EDI, WMS systems, IBM MQ, and solo-engineered automation platforms.
            </p>
          </motion.div>

          {/* Center Space Reserved for Portrait Visual */}
          <div className="hidden md:block md:col-span-4 h-[60vh] pointer-events-none" />

          {/* Right Text & Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="md:col-span-4 flex flex-col items-start md:items-end space-y-6 pointer-events-auto md:text-right bg-gradient-to-l from-[var(--bg-dark)]/90 via-[var(--bg-dark)]/60 to-transparent p-4 md:p-6 rounded-2xl backdrop-blur-sm border-r border-[var(--border-subtle)]"
          >
            <div className="space-y-1">
              <div className="text-xs font-mono text-[var(--accent-cyan)] tracking-wider uppercase flex items-center md:justify-end gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                GEODIS IT LEADERSHIP
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                Franklin, TN • IBM Sterling • WMS • IBM MQ • AuthPortal
              </div>
            </div>

            {/* Stat Cards Mini */}
            <div className="flex gap-4 mb-4">
              <div className="blue-glass p-3 rounded-lg border border-[var(--border-subtle)] text-center">
                <div className="text-xl font-syne font-bold text-[var(--text-primary)]">20<span className="text-[var(--accent-blue)]">+</span></div>
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Years Exp</div>
              </div>
              <div className="blue-glass p-3 rounded-lg border border-[var(--border-subtle)] text-center">
                <div className="text-xl font-syne font-bold text-[var(--text-primary)]">500<span className="text-[var(--accent-blue)]">+</span></div>
                <div className="text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">Partners</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-end gap-4">
              <Magnetic strength={0.3}>
                <button
                  onClick={onWorkClick}
                  data-cursor="VIEW WORK"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-[#050811] text-xs font-bold tracking-wider uppercase hover:shadow-[0_0_20px_var(--accent-cyan)] transition-all duration-300"
                >
                  View My Work
                </button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="/assets/Ammi_Reddy_Tetala_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="DOWNLOAD"
                  className="inline-block px-6 py-3 rounded-full bg-transparent border border-[var(--border-subtle)] text-[var(--accent-cyan)] text-xs font-semibold tracking-wider uppercase hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/5 transition-all duration-300 cyan-glow"
                >
                  Resume
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <button
                  onClick={onConnectClick}
                  data-cursor="CONNECT"
                  className="px-6 py-3 rounded-full bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-semibold tracking-wider uppercase hover:border-[var(--text-primary)] transition-all duration-300"
                >
                  Let's Connect
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center justify-center space-y-2 pointer-events-auto"
        >
          <span className="text-[10px] font-mono tracking-widest text-[var(--text-secondary)] uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-10 border border-[var(--border-subtle)] rounded-full flex items-center justify-center p-1">
            <div className="w-1 h-2 bg-[var(--accent-cyan)] rounded-full animate-bounce shadow-[0_0_8px_var(--accent-cyan)]" />
          </div>
          <ArrowDown className="w-4 h-4 text-[var(--accent-cyan)]/80 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};
