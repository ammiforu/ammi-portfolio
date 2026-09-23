import React from 'react';
import { motion } from 'framer-motion';
import { Users, Network, Database, ShieldCheck, Activity } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Users className="w-5 h-5 text-[#e2c392]" />,
      title: 'Global Team Leadership',
      desc: 'Leading a 14-person cross-functional engineering team across the U.S. and India covering EDI, WMS, Linux, and IBM MQ.',
    },
    {
      icon: <Network className="w-5 h-5 text-[#e2c392]" />,
      title: 'Enterprise Integration & EDI',
      desc: 'IBM Sterling B2B Integrator, OpenText BizManager, IBM MQ TLS queue management, and AS2/SFTP protocol pipelines.',
    },
    {
      icon: <Activity className="w-5 h-5 text-[#e2c392]" />,
      title: 'Real-Time Observability',
      desc: 'Rolled out Grafana dashboards for proactive pipeline visibility, reducing incident detection time from hours to seconds.',
    },
    {
      icon: <Database className="w-5 h-5 text-[#e2c392]" />,
      title: 'Solo Full-Stack Engineering',
      desc: 'Architected AuthPortal from scratch in ASP.NET Core, C#, and PostgreSQL with 5+ continuous background polling microservices.',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
              EXECUTIVE PROFILE & BACKGROUND
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
              Bridging Infrastructure <br />
              <span className="text-gold-gradient">and Intelligent Automation.</span>
            </h2>

            <p className="text-base md:text-lg text-[#9496a8] font-light leading-relaxed">
              I am an Enterprise IT Manager at <strong className="text-white font-medium">GEODIS</strong> with over 13+ years in enterprise IT infrastructure & systems architecture, including 7+ years leading logistics technology. Based in Franklin, TN (Greater Nashville Metro), I lead a 14-person global engineering team across the U.S. and India orchestrating mission-critical EDI operations, Manhattan WMS systems, RHEL Linux environments, and IBM MQ infrastructure.
            </p>

            <p className="text-sm md:text-base text-[#9496a8] font-light leading-relaxed">
              Outside of enterprise operations, I architect and build complete software platforms end-to-end — including <strong className="text-[#e2c392] font-medium">AuthPortal</strong> (an internal ops automation platform built solo in ASP.NET Core, C#, and PostgreSQL) and a self-hosted, multi-channel AI content generation pipeline operating across 10 YouTube channels.
            </p>

            {/* Key Live Metrics */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs text-[#9496a8] border-t border-white/10 pt-6">
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">14 People</span>
                Global Team (US & India)
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">7+ Years</span>
                Supply Chain Tech
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">10 Channels</span>
                AI Content Pipeline
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">Zero Downtime</span>
                MQ TLS Rotation
              </div>
            </div>
          </div>

          {/* Right Real Character Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden glass-panel editorial-border p-4 group">
              <div className="relative h-[480px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#161622] to-[#08080a] flex items-center justify-center">
                <img
                  src="/assets/infrastructure_ai.jpg"
                  alt="Enterprise IT Infrastructure & AI Automation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent opacity-90" />
                
                {/* Real Verified Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#111116]/90 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-syne text-white">AMMI REDDY TETALA</span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#9496a8]">
                    IT Manager • Supply Chain & AI Automation Leader
                  </div>
                  <div className="text-[10px] font-mono text-[#e2c392]">
                    Franklin, TN • Open to Remote
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Architectural Pillars Below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl glass-panel editorial-border space-y-3"
            >
              <div className="p-3 rounded-xl bg-[#171720] w-fit border border-white/10">
                {item.icon}
              </div>
              <h3 className="text-base font-bold font-syne text-white">{item.title}</h3>
              <p className="text-xs text-[#9496a8] leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
