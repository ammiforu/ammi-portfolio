import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Cpu } from 'lucide-react';

type RecruiterMode = 'enterprise' | 'ai';

const RecruiterContext = createContext<{ mode: RecruiterMode; setMode: (m: RecruiterMode) => void }>({
  mode: 'enterprise',
  setMode: () => {},
});

export const useRecruiterMode = () => useContext(RecruiterContext);

export const RecruiterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<RecruiterMode>('enterprise');
  return (
    <RecruiterContext.Provider value={{ mode, setMode }}>
      {children}
    </RecruiterContext.Provider>
  );
};

export const RecruiterToggle: React.FC = () => {
  const { mode, setMode } = useRecruiterMode();

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden md:flex">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 p-1 rounded-full bg-[#0d0d14]/90 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <button
            onClick={() => setMode('enterprise')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
              mode === 'enterprise'
                ? 'text-[#08080a]'
                : 'text-[#9496a8] hover:text-white'
            }`}
          >
            {mode === 'enterprise' && (
              <motion.div
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full bg-[#e2c392]"
              />
            )}
            <Briefcase className="w-3 h-3 relative z-10" />
            <span className="relative z-10">IT Manager</span>
          </button>
          <button
            onClick={() => setMode('ai')}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 ${
              mode === 'ai'
                ? 'text-[#050811]'
                : 'text-[#9496a8] hover:text-white'
            }`}
          >
            {mode === 'ai' && (
              <motion.div
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#3b82f6]"
              />
            )}
            <Cpu className="w-3 h-3 relative z-10" />
            <span className="relative z-10">AI Architect</span>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
