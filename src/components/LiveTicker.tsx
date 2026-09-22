import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const ITEMS = [
  "Scaling EDI infrastructure for 500+ trading partners at GEODIS",
  "Building AI-automated YouTube content pipeline @ammiexplains",
  "Architecting local LLM inference cluster for enterprise RAG",
  "Onboarding new retail trading partners via IBM Sterling B2B",
  "Developing GenAI tools for supply chain automation",
];

export const LiveTicker: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % ITEMS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 overflow-hidden max-w-[340px] md:max-w-[480px]">
      <div className="shrink-0 w-5 h-5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center">
        <Zap className="w-2.5 h-2.5 text-[#00f0ff]" />
      </div>
      <div className="relative h-5 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 text-[10px] font-mono text-[#9496a8] truncate"
          >
            {ITEMS[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
