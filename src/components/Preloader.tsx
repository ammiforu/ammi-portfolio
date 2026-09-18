import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#08080a] p-8 md:p-16 text-[#f4f4f6]"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-xs tracking-widest text-[#9496a8] uppercase font-mono">
            <span>AMMI REDDY TETALA</span>
            <span>ENTERPRISE PORTFOLIO</span>
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter font-syne mb-6 text-center text-gold-gradient"
            >
              AMMI
            </motion.h1>
            <div className="text-sm font-light tracking-wider text-[#9496a8] uppercase mb-8">
              Loading experience...
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#e2c392] to-[#f5d79e]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Footer Progress Counter */}
          <div className="flex justify-between items-end text-xs font-mono text-[#9496a8]">
            <div>© 2026 holding network</div>
            <div className="text-3xl font-bold font-syne text-[#e2c392]">
              {Math.min(progress, 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
