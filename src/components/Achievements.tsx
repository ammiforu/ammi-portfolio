import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export const Achievements: React.FC = () => {
  const achievements = [
    {
      title: 'OpenText BizManager Major Upgrade (16.6 → 24.2.1)',
      desc: 'Orchestrated end-to-end version migration of enterprise OpenText BizManager across production servers with zero payload loss and zero supply chain interruption.',
    },
    {
      title: 'IBM MQ TLS & Channel Disruption Resolution',
      desc: 'Diagnosed and remediated complex SSL/TLS handshake failures and channel blockage across mission-critical IBM MQ queue managers under tight SLA pressure.',
    },
    {
      title: 'Air-Gapped Dell Micro PC AI Cluster Architecture',
      desc: 'Designed and deployed multi-node hardware clusters using Dell Micro PCs running Ollama (Gemma & Qwen), securing local AI capabilities without cloud dependencies.',
    },
    {
      title: 'Live Enterprise Payload & Database Recovery',
      desc: 'Executed rapid automated payload restoration and data reconciliation across PostgreSQL and Oracle databases following severe upstream partner outages.',
    },
  ];

  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#e2c392]" />
            KEY MILESTONES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Enterprise <span className="text-gold-gradient">Impact & Milestones.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel editorial-border flex items-start gap-5 hover:border-[#e2c392]/40 transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-[#e2c392] shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-lg font-bold font-syne text-white">{item.title}</h3>
                <p className="text-xs md:text-sm text-[#9496a8] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
