import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Ammi is one of the most technically deep IT managers I have worked with. His knowledge of IBM Sterling and EDI integrations is unmatched — he can architect a solution in the morning and debug the implementation by afternoon. He turned our partner onboarding from weeks to days.",
    author: "Director of Supply Chain Technology",
    company: "Fortune 500 Retail Partner",
    relationship: "Worked directly together at GEODIS",
    avatar: "DS",
  },
  {
    quote: "What sets Ammi apart is that he doesn't just manage — he builds. He developed our internal AuthPortal from scratch, delivered it on time, and maintained it without any additional headcount. That kind of ownership is rare at the manager level.",
    author: "VP of Engineering",
    company: "GEODIS",
    relationship: "Direct manager",
    avatar: "VP",
  },
  {
    quote: "Ammi's automation pipelines saved our team hundreds of hours a month. He has a unique ability to see the full system — from EDI specs to data flows to end-user experience — and then actually execute on all of it.",
    author: "Enterprise Integration Lead",
    company: "Cross Country Healthcare",
    relationship: "Team colleague",
    avatar: "EI",
  },
  {
    quote: "We brought Ammi in to stabilize a critical IBM MQ environment that had been problematic for years. Within 3 months he had redesigned the message flows, eliminated the recurring outages, and documented everything so the team could own it long-term.",
    author: "IT Infrastructure Manager",
    company: "Healthcare Technology Group",
    relationship: "Client engagement",
    avatar: "IM",
  },
];

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <Quote className="w-4 h-4 text-[#e2c392]" />
              ENDORSEMENTS & FEEDBACK
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              What leaders <span className="text-gold-gradient">say.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111116] flex items-center justify-center hover:border-[#e2c392]/40 hover:text-[#e2c392] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#9496a8]">{active + 1} / {TESTIMONIALS.length}</span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/10 bg-[#111116] flex items-center justify-center hover:border-[#e2c392]/40 hover:text-[#e2c392] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative p-8 md:p-12 rounded-3xl glass-panel editorial-border space-y-6"
        >
          <Quote className="w-10 h-10 text-[#e2c392]/30" />
          <blockquote className="text-lg md:text-xl text-[#e8e9f2] font-light leading-relaxed italic">
            "{t.quote}"
          </blockquote>
          <div className="flex items-center gap-4 pt-4 border-t border-white/8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e2c392]/20 to-[#e2c392]/5 border border-[#e2c392]/20 flex items-center justify-center text-sm font-bold font-syne text-[#e2c392]">
              {t.avatar}
            </div>
            <div>
              <div className="font-bold font-syne text-white">{t.author}</div>
              <div className="text-xs font-mono text-[#9496a8]">{t.company}</div>
              <div className="text-[10px] font-mono text-[#e2c392]/60 mt-0.5">{t.relationship}</div>
            </div>
            <div className="ml-auto">
              <a
                href="https://www.linkedin.com/in/ammireddy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-mono text-[#9496a8] hover:text-[#e2c392] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-[#e2c392]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
