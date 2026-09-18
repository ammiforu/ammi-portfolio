import React from 'react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#08080a] text-[#9496a8] border-t border-white/10 px-6 md:px-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="font-bold font-syne text-[#f4f4f6] text-sm tracking-wider">
          AMMI REDDY TETALA
        </div>

        {/* Center */}
        <div className="text-center">
          Engineered with precision + code • Enterprise IT & Local AI
        </div>

        {/* Right & Social Links */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/ammiforu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e2c392] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e2c392] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com/@ViswaDarshiniUsa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e2c392] transition-colors"
            aria-label="YouTube"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>
          <span className="text-white/30">© 2026</span>
        </div>
      </div>
    </footer>
  );
};
