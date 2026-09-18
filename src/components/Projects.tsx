import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Database, Video, Sparkles, Terminal } from 'lucide-react';

export const Projects: React.FC = () => {
  const projects = [
    {
      id: 'db-migration',
      title: 'Enterprise Database Migration',
      category: 'DATABASE INFRASTRUCTURE & WEB PLATFORM',
      tech: ['PostgreSQL', 'Python', 'React', 'Google OAuth', 'Docker'],
      desc: 'Architectural transition of legacy Excel workflows to a robust PostgreSQL database paired with a real-time web visualization dashboard and Google OAuth single sign-on security.',
      icon: <Database className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-amber-950/40 via-purple-950/20 to-black',
      codeSnippet: 'ALTER TABLE legacy_excel RENAME TO pg_master_warehouse;',
    },
    {
      id: 'video-pipeline',
      title: 'Automated Video Production Pipeline',
      category: 'AI MEDIA AUTOMATION & ENGINE',
      tech: ['Remotion', 'Claude API', 'DaVinci Resolve', 'Pollinations AI'],
      desc: 'End-to-end video automation system utilizing Remotion programmatic video generation, Claude AI script synthesis, DaVinci Resolve color pipelines, and Pollinations AI visual generation.',
      icon: <Video className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-blue-950/40 via-indigo-950/20 to-black',
      codeSnippet: 'npx remotion render src/index.ts RenderVideo --props=script.json',
    },
    {
      id: 'ai-portfolio',
      title: 'AI-Powered Personal Portfolio',
      category: 'FULL-STACK WEB & AI INTEGRATION',
      tech: ['React', 'Firebase', 'Gemini 3.6 Flash', 'GitHub API', 'Tailwind'],
      desc: 'A modern web portfolio hosted on Firebase featuring direct contextual integration with the Gemini API and real-time GitHub activity synchronization.',
      icon: <Sparkles className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-[#e2c392]/20 via-neutral-900 to-black',
      codeSnippet: 'const response = await gemini.generateContent(contextualPrompt);',
    },
    {
      id: 'automation-suite',
      title: 'Enterprise Automation Suite',
      category: 'INFRASTRUCTURE & SERVERS',
      tech: ['Unix Bash', 'PowerShell', 'IBM MQ', 'Linux', 'Cron'],
      desc: 'A production suite of Unix shell and PowerShell scripts (e.g., BlankLineFixer.sh, csv_merger.sh) managing automated server monitoring, IBM MQ channel availability, and payload deduplication.',
      icon: <Terminal className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-emerald-950/40 via-slate-900 to-black',
      codeSnippet: './BlankLineFixer.sh --input payload.dat --dedupe',
    },
  ];

  return (
    <section id="work" className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
              SELECTED WORK & ARCHITECTURE
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Enterprise Engineering <br />
              <span className="text-gold-gradient">& Digital Products.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light">
            Each project is built with production reliability, zero-trust security, and high performance automation at its core.
          </p>
        </div>

        {/* Large Editorial Project Presentations */}
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              data-cursor="VIEW PROJECT"
              className="group relative rounded-3xl overflow-hidden glass-panel editorial-border p-8 md:p-12 transition-all duration-500 hover:border-[#e2c392]/50 hover:shadow-[0_20px_60px_rgba(226,195,146,0.06)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#e2c392] tracking-widest uppercase">
                      0{idx + 1} // {project.category}
                    </span>
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#e2c392] group-hover:text-[#08080a] transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-syne text-white group-hover:text-[#e2c392] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#9496a8] font-light leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#9496a8] group-hover:border-[#e2c392]/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Visual Box with Code Preview */}
                <div className="lg:col-span-5 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-6 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.visualBg} opacity-80`} />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-mono text-[#e2c392] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                      PRODUCTION SYSTEM
                    </span>
                  </div>

                  <div className="relative z-10 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 font-mono text-xs text-[#9496a8] overflow-x-auto">
                    <span className="text-emerald-400">$</span> {project.codeSnippet}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
