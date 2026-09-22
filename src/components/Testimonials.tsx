import React from 'react';
import { ExternalLink, Mail, Shield, Star, Users, Award } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: <Shield className="w-5 h-5 text-[#e2c392]" />,
    title: "Zero Downtime Track Record",
    desc: "Maintained 99.9%+ uptime across critical EDI infrastructure for a global 3PL network serving Fortune 500 clients.",
  },
  {
    icon: <Users className="w-5 h-5 text-[#e2c392]" />,
    title: "14-Person Global Team Leader",
    desc: "Led distributed engineering teams across US and India — hiring, mentoring, and delivering enterprise projects on schedule.",
  },
  {
    icon: <Star className="w-5 h-5 text-[#e2c392]" />,
    title: "500+ Partner Onboardings",
    desc: "Architected and executed B2B integrations across retail, automotive, grocery, and pharmaceutical verticals.",
  },
  {
    icon: <Award className="w-5 h-5 text-[#e2c392]" />,
    title: "Builder, Not Just Manager",
    desc: "Solo-built AuthPortal (enterprise IAM), YouTube AI automation pipeline, and local LLM clusters — while running full-time as IT Manager.",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <Shield className="w-4 h-4 text-[#e2c392]" />
              TRACK RECORD & REFERENCES
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Proven results. <span className="text-gold-gradient">Verifiable.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light">
            Enterprise references and professional endorsements are available upon request during confidential engagement discussions.
          </p>
        </div>

        {/* Value Prop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUE_PROPS.map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl glass-panel editorial-border space-y-3 hover:border-[#e2c392]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e2c392]/10 border border-[#e2c392]/20 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-bold font-syne text-white text-sm group-hover:text-[#e2c392] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-[#9496a8] font-light leading-relaxed pl-12">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* LinkedIn + References CTA */}
        <div className="flex flex-col md:flex-row gap-4">
          <a
            href="https://www.linkedin.com/in/ammireddytetala/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 p-5 rounded-2xl border border-[#0077b5]/30 bg-[#0077b5]/5 hover:bg-[#0077b5]/10 hover:border-[#0077b5]/60 transition-all duration-300 group"
          >
            <ExternalLink className="w-5 h-5 text-[#0077b5]" />
            <div className="text-left">
              <div className="text-sm font-bold text-white group-hover:text-[#0077b5] transition-colors">View LinkedIn Profile</div>
              <div className="text-[10px] font-mono text-[#9496a8]">Connect · Endorse · Recommend</div>
            </div>
          </a>

          <a
            href="mailto:ammitetala@gmail.com?subject=Reference%20Request&body=Hi%20Ammi%2C%20I%27d%20like%20to%20request%20professional%20references%20for%20our%20engagement%20discussion."
            className="flex-1 flex items-center justify-center gap-3 p-5 rounded-2xl border border-[#e2c392]/20 bg-[#e2c392]/5 hover:bg-[#e2c392]/10 hover:border-[#e2c392]/50 transition-all duration-300 group"
          >
            <Mail className="w-5 h-5 text-[#e2c392]" />
            <div className="text-left">
              <div className="text-sm font-bold text-white group-hover:text-[#e2c392] transition-colors">Request References</div>
              <div className="text-[10px] font-mono text-[#9496a8]">Enterprise contacts · Confidential</div>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
