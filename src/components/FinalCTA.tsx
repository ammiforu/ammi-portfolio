import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onConnectClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onConnectClick }) => {
  return (
    <section className="py-28 bg-[#0a0a0e] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5 relative overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e2c392]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h2 className="text-3xl md:text-6xl font-bold font-syne tracking-tight text-white leading-tight">
          Your infrastructure should work for you, <br />
          <span className="text-gold-gradient">not the other way around.</span>
        </h2>

        <div>
          <button
            onClick={onConnectClick}
            data-cursor="CONNECT"
            className="px-8 py-4 rounded-full bg-[#e2c392] text-[#08080a] text-xs font-bold uppercase tracking-widest hover:bg-[#f5d79e] transition-all duration-300 inline-flex items-center gap-2 shadow-2xl hover:scale-105"
          >
            <span>Let's Connect</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
