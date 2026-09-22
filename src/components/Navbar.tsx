import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';

interface NavbarProps {
  onNavClick: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openToWork, setOpenToWork] = useState<boolean>(() => {
    try { return localStorage.getItem('openToWork') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'H') {
        setOpenToWork(prev => {
          const next = !prev;
          localStorage.setItem('openToWork', String(next));
          return next;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Work', id: 'work' },
    { label: 'Skills', id: 'skills' },
    { label: 'Content', id: 'content' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#08080a]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className="text-sm md:text-base font-bold font-syne tracking-wider text-[#f4f4f6] hover:text-[#e2c392] transition-colors"
          >
            AMMI REDDY TETALA
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs font-medium tracking-widest text-[#9496a8] hover:text-[#f4f4f6] transition-colors uppercase font-mono"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Open-to-work badge — toggle with Shift+H */}
            <AnimatePresence>
              {openToWork && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Zap className="w-3 h-3" />
                  Available for Hire
                </motion.div>
              )}
            </AnimatePresence>
            <a
              href="/assets/Ammi_Reddy_Tetala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium tracking-widest text-[#9496a8] hover:text-[#e2c392] transition-colors uppercase"
            >
              Resume
            </a>
            <button
              onClick={() => handleLinkClick('contact')}
              data-cursor="CONNECT"
              className="px-5 py-2.5 rounded-full border border-[#e2c392]/40 text-[#e2c392] text-xs font-medium tracking-wider uppercase hover:bg-[#e2c392] hover:text-[#08080a] transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#f4f4f6] p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#08080a] flex flex-col justify-between p-8 md:hidden"
          >
            <div className="pt-24 flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-3xl font-bold font-syne text-left text-[#f4f4f6] hover:text-[#e2c392] transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <a
                href="/assets/Ammi_Reddy_Tetala_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 rounded-full border border-white/10 bg-[#111116] text-[#f4f4f6] text-sm font-bold uppercase tracking-wider text-center"
              >
                Download Resume
              </a>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-4 rounded-full bg-[#e2c392] text-[#08080a] text-sm font-bold uppercase tracking-wider text-center"
              >
                Let's Connect
              </button>
              <div className="text-center text-xs font-mono text-[#9496a8]">
                Ammi Reddy Tetala • Enterprise IT & AI Solutions
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
