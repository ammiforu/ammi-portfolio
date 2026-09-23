import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Sparkles, FileText, X } from 'lucide-react';

const EXECUTIVE_TRANSCRIPT = 
  "Hello, I'm Ammi Reddy Tetala. For over 13 years, I have engineered and scaled mission-critical enterprise systems—currently leading a 14-person global team at GEODIS covering EDI, Manhattan WMS, and IBM MQ infrastructure. I bridge resilient enterprise backbones with modern autonomous AI pipelines. Take a look through my live telemetry and system architecture explorer, or click let's connect to schedule a direct conversation.";

export const ExecutiveAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePlayToggle = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser. Please view the written transcript.");
      setShowTranscript(true);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(EXECUTIVE_TRANSCRIPT);
    utteranceRef.current = utterance;

    // Pick deep, professional voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    const preferredVoice = englishVoices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male')) || englishVoices[0];
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 0.95; // Steady, professional executive tempo
    utterance.pitch = 0.95;

    let elapsed = 0;
    const durationEstimate = 28; // ~28 seconds of speech

    intervalRef.current = setInterval(() => {
      elapsed += 0.2;
      const pct = Math.min((elapsed / durationEstimate) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setProgress(0);
      }
    }, 200);

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <>
      <div className="relative inline-flex items-center gap-3 p-2 pr-4 rounded-full bg-[#0d0f1a]/90 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-md">
        {/* Play / Pause Circular Button */}
        <button
          onClick={handlePlayToggle}
          aria-label={isPlaying ? "Pause audio introduction" : "Play audio introduction"}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-[var(--accent-cyan)] to-blue-500 flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
        </button>

        {/* Audio Waveform Bars (Animated when playing) */}
        <div className="flex items-center gap-1 h-5 cursor-pointer" onClick={handlePlayToggle}>
          {[12, 20, 15, 24, 18, 22, 14, 20, 16].map((baseHeight, i) => (
            <motion.div
              key={i}
              className="w-0.5 rounded-full bg-[var(--accent-cyan)]"
              animate={
                isPlaying
                  ? { height: [baseHeight * 0.4, baseHeight, baseHeight * 0.3] }
                  : { height: 4 }
              }
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 0.8,
                delay: i * 0.08,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Label & Timer */}
        <div className="flex flex-col text-left">
          <div className="text-[11px] font-bold font-syne text-white flex items-center gap-1.5 leading-tight">
            <span>45s Executive Audio Brief</span>
            <Sparkles className="w-3 h-3 text-[#e2c392]" />
          </div>
          <div className="text-[9px] font-mono text-[#9496a8] leading-tight">
            {isPlaying ? `${Math.round((progress / 100) * 45)}s / 45s • Playing` : 'Listen to Ammi • Voice Intro'}
          </div>
        </div>

        {/* Transcript trigger */}
        <button
          onClick={() => setShowTranscript(true)}
          title="Read transcript"
          className="ml-1 p-1 rounded-lg text-[#9496a8] hover:text-white transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Transcript Modal */}
      <AnimatePresence>
        {showTranscript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full p-6 rounded-2xl bg-[#0c0d18] border border-white/15 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)]">
                  <Volume2 className="w-4 h-4" />
                  <span>EXECUTIVE AUDIO TRANSCRIPT</span>
                </div>
                <button
                  onClick={() => setShowTranscript(false)}
                  className="p-1 rounded-lg text-[#9496a8] hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-white/90 font-light leading-relaxed">
                "{EXECUTIVE_TRANSCRIPT}"
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowTranscript(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
