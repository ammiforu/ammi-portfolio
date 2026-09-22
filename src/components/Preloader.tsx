import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('');
  const fullText = "AMMI REDDY TETALA // ENTERPRISE AI & INTEGRATION";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setLoadingText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsTypingComplete(true), 400); // Small pause after typing
      }
    }, 40); // typing speed

    // Progress bar effect
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random bursts of progress simulating asset loading
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (isTypingComplete && progress >= 100) {
      setTimeout(() => onComplete(), 500); // Wait a beat before dismissing
    }
  }, [isTypingComplete, progress, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a]"
      >
        <div className="w-full max-w-md px-8 flex flex-col items-center space-y-8">
          
          {/* Typing Text */}
          <div className="h-6 flex items-center justify-center">
            <span className="text-xs md:text-sm font-mono tracking-[0.2em] text-[#e2c392]">
              {loadingText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#e2c392] ml-1 align-middle"
              />
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-[#e2c392]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Loading details */}
          <div className="w-full flex justify-between text-[10px] font-mono text-[#9496a8] uppercase tracking-widest">
            <span>INITIALIZING KERNEL</span>
            <span>{Math.min(Math.floor(progress), 100)}%</span>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
