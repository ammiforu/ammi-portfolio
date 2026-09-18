import React from 'react';
import { ShieldCheck, Zap, Layers, Eye, Cpu } from 'lucide-react';

export const WhyMe: React.FC = () => {
  const points = [
    {
      title: 'Enterprise-grade reliability',
      desc: 'Systems engineered to withstand mission-critical supply chain loads with 99.99% uptime guarantees.',
      icon: <ShieldCheck className="w-5 h-5 text-[#e2c392]" />,
    },
    {
      title: 'Built for scalability',
      desc: 'Modular database and integration pipelines designed to seamlessly accommodate explosive enterprise data growth.',
      icon: <Layers className="w-5 h-5 text-[#e2c392]" />,
    },
    {
      title: 'Security & performance focused',
      desc: 'Zero-trust TLS configuration, OAuth SSO authentication, and air-gapped local AI protection.',
      icon: <Zap className="w-5 h-5 text-[#e2c392]" />,
    },
    {
      title: 'Deep full-stack visibility',
      desc: 'From low-level Unix shell kernels and IBM MQ queues to modern React frontends and API dashboards.',
      icon: <Eye className="w-5 h-5 text-[#e2c392]" />,
    },
    {
      title: 'Automated by default',
      desc: 'Eliminating repetitive human tasks through intelligent Python scripts, cron daemons, and programmatic workflows.',
      icon: <Cpu className="w-5 h-5 text-[#e2c392]" />,
    },
  ];

  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
            CORE PHILOSOPHY
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Why Partner <span className="text-gold-gradient">With Me.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel editorial-border space-y-4 hover:border-[#e2c392]/40 transition-colors"
            >
              <div className="p-3 rounded-xl bg-[#171720] w-fit border border-white/10">
                {p.icon}
              </div>
              <h3 className="text-base font-bold font-syne text-white">{p.title}</h3>
              <p className="text-xs text-[#9496a8] font-light leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
