import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Terminal, Cpu, Play } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      title: 'Enterprise Integration Architecture',
      desc: 'Designing and maintaining mission-critical B2B EDI integrations utilizing IBM Sterling B2B Integrator, OpenText BizManager, IBM MQ, AS2, and SFTP pipelines.',
      tech: 'IBM Sterling • BizManager • IBM MQ',
      icon: <Network className="w-6 h-6 text-[#e2c392]" />,
    },
    {
      title: 'Database Administration & Migration',
      desc: 'Seamless architectural transition from legacy Excel data workflows to robust PostgreSQL and Oracle SQL environments with zero data loss.',
      tech: 'PostgreSQL • Oracle SQL • Python ETL',
      icon: <Database className="w-6 h-6 text-[#e2c392]" />,
    },
    {
      title: 'Custom Scripting & Automation',
      desc: 'Developing specialized Unix shell and PowerShell scripts for automated server health checks, log cleanup, MQ queue monitoring, and payload deduplication.',
      tech: 'Bash • PowerShell • Cron Automation',
      icon: <Terminal className="w-6 h-6 text-[#e2c392]" />,
    },
    {
      title: 'Local AI Hardware Deployment',
      desc: 'Architecting secure, air-gapped local AI hardware infrastructure using Dell Micro PCs running Ollama (Gemma, Qwen) for private enterprise intelligence.',
      tech: 'Ollama • Dell Micro PC • Air-Gapped LLMs',
      icon: <Cpu className="w-6 h-6 text-[#e2c392]" />,
    },
    {
      title: 'Content Generation Workflows',
      desc: 'Building programmatic media generation engines that combine Remotion video synthesis with LLM script generation and automated rendering pipelines.',
      tech: 'Remotion • Claude API • DaVinci',
      icon: <Play className="w-6 h-6 text-[#e2c392]" />,
    },
  ];

  return (
    <section className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
            SOLUTIONS & OFFERINGS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Let's build <span className="text-gold-gradient">robust systems.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl glass-panel editorial-border space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#171720] w-fit border border-white/10">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold font-syne text-white">{service.title}</h3>
                <p className="text-xs md:text-sm text-[#9496a8] font-light leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-[#e2c392]">
                {service.tech}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
