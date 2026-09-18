import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, Network } from 'lucide-react';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Network className="w-5 h-5 text-[#e2c392]" />,
      title: 'Enterprise Integration',
      desc: 'IBM Sterling B2B Integrator, OpenText BizManager & IBM MQ AS2/SFTP flows.',
    },
    {
      icon: <Database className="w-5 h-5 text-[#e2c392]" />,
      title: 'Database Architecture',
      desc: 'PostgreSQL, Oracle SQL optimization, zero-downtime database migrations.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#e2c392]" />,
      title: 'Local AI Deployment',
      desc: 'Hardware-level LLM clusters with Dell Micro PCs, Ollama, Gemma & Qwen.',
    },
    {
      icon: <Server className="w-5 h-5 text-[#e2c392]" />,
      title: 'Automation & Shell',
      desc: 'Unix Bash, PowerShell scripts, containerization with Docker & Nginx NPM.',
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Heading & Paragraph */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
              ABOUT & BACKGROUND
            </div>

            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
              Bridging Infrastructure <br />
              <span className="text-gold-gradient">and Innovation.</span>
            </h2>

            <p className="text-base md:text-lg text-[#9496a8] font-light leading-relaxed">
              As an IT Manager at GEODIS, I build and maintain the integrations that keep supply chains moving. Beyond enterprise systems like IBM Sterling and OpenText BizManager, I architect local AI solutions, automate data workflows with Bash and Python, and manage scalable containerized environments.
            </p>

            <div className="pt-4 flex flex-wrap gap-8 font-mono text-xs text-[#9496a8]">
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">10+ YRS</span>
                Enterprise IT Leadership
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">99.99%</span>
                B2B System Uptime
              </div>
              <div>
                <span className="text-2xl font-bold font-syne text-[#e2c392] block">4+</span>
                Media Network Assets
              </div>
            </div>
          </div>

          {/* Right Highlight Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </section>
  );
};
