import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'ENTERPRISE INTEGRATION',
    'DATABASE ADMINISTRATION',
    'LOCAL AI DEPLOYMENT',
    'CONTENT AUTOMATION',
    'FULL-STACK DEVELOPMENT',
  ];

  return (
    <div className="w-full bg-[#0d0d12] py-6 border-y border-white/10 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center space-x-8 mx-6">
            <span className="text-xs md:text-sm font-bold font-mono tracking-widest text-[#9496a8] hover:text-[#e2c392] transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]/60" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
