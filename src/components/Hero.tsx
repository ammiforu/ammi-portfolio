import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroTurntableCanvas } from './HeroTurntableCanvas';
import { ArrowDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onConnectClick: () => void;
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnectClick, onWorkClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visualPinRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const [rotationProgress, setRotationProgress] = useState<number>(0);
  const [rotationDegree, setRotationDegree] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current || !visualPinRef.current) return;

    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger timeline mapping scroll distance to 360 rotation
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%', // 250vh scroll distance for full cinematic rotation
        pin: true,
        scrub: 0.5, // Ultra-smooth linear scroll interpolation
        onUpdate: (self) => {
          const p = self.progress;
          setRotationProgress(p);
          setRotationDegree(Math.round(p * 360));

          // Fade out scroll indicator on scroll start
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: Math.max(0, 1 - p * 5),
              duration: 0.2,
            });
          }
        },
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#08080a] text-[#f4f4f6] overflow-hidden flex flex-col justify-between"
      id="hero"
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e2c392]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Centered Hero Visual Pin Layer */}
      <div
        ref={visualPinRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto"
      >
        <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center p-4">
          <HeroTurntableCanvas progress={rotationProgress} className="z-10" />
        </div>
      </div>

      {/* Hero Editorial Typography Overlay (Framing Visual without Face Occlusion) */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-12 flex flex-col justify-between pointer-events-none">
        {/* Top Floating Badge & Status */}
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto bg-[#111116]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-xs font-mono tracking-widest text-[#e2c392]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ENTERPRISE IT MANAGER & SOLUTIONS DEVELOPER</span>
          </div>

          <div className="hidden md:flex flex-col items-end text-xs font-mono text-[#9496a8] pointer-events-auto">
            <span>ROTATION: {rotationDegree}°</span>
            <span className="text-white/40">360° SCROLL TURNTABLE</span>
          </div>
        </div>

        {/* Left & Right Minimal Typography Grid (Framing center) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto pointer-events-none">
          {/* Left Text Block */}
          <div className="md:col-span-4 space-y-4 pointer-events-auto bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/60 to-transparent p-4 md:p-6 rounded-2xl backdrop-blur-sm border border-white/5">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight font-syne leading-tight text-white">
              Building robust <br />
              <span className="text-gold-gradient">enterprise architectures</span> <br />
              & automated AI workflows.
            </h1>
            <p className="text-xs md:text-sm text-[#9496a8] font-light leading-relaxed">
              IT Manager at GEODIS leading a 14-person global team across the U.S. and India. Specializing in EDI, WMS systems, IBM MQ, and solo-engineered automation platforms.
            </p>
          </div>

          {/* Center Space Reserved for 75-85% Portrait Visual */}
          <div className="hidden md:block md:col-span-4 h-[60vh] pointer-events-none" />

          {/* Right Text & Action CTAs */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end space-y-6 pointer-events-auto md:text-right bg-gradient-to-l from-[#08080a]/90 via-[#08080a]/60 to-transparent p-4 md:p-6 rounded-2xl backdrop-blur-sm border border-white/5">
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#e2c392] tracking-wider uppercase flex items-center md:justify-end gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#e2c392]" />
                GEODIS IT LEADERSHIP
              </div>
              <div className="text-xs text-[#9496a8]">
                Franklin, TN • IBM Sterling • WMS • IBM MQ • AuthPortal • @ammiexplains
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onWorkClick}
                data-cursor="VIEW WORK"
                className="px-6 py-3 rounded-full bg-[#f4f4f6] text-[#08080a] text-xs font-semibold tracking-wider uppercase hover:bg-[#e2c392] transition-colors duration-300 shadow-lg"
              >
                View My Work
              </button>
              <button
                onClick={onConnectClick}
                data-cursor="CONNECT"
                className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-[#f4f4f6] text-xs font-semibold tracking-wider uppercase hover:border-[#e2c392] hover:text-[#e2c392] transition-all duration-300"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="flex flex-col items-center justify-center space-y-2 pointer-events-auto"
        >
          <span className="text-[10px] font-mono tracking-widest text-[#9496a8] uppercase">
            SCROLL TO EXPLORE 360°
          </span>
          <div className="w-6 h-10 border border-white/20 rounded-full flex items-center justify-center p-1">
            <div className="w-1 h-2 bg-[#e2c392] rounded-full animate-bounce" />
          </div>
          <ArrowDown className="w-4 h-4 text-[#e2c392]/80 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
