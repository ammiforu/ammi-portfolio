import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Database, Video, Server, ShieldCheck, Layers } from 'lucide-react';
import { ProjectDossierModal } from './ProjectDossierModal';

export const Projects: React.FC = () => {
  const [activeDossierId, setActiveDossierId] = useState<string | null>(null);
  const projects = [
    {
      id: 'auth-portal',
      title: 'AuthPortal — Enterprise Ops Automation Platform',
      category: 'ENTERPRISE FULL-STACK & BACKGROUND MICROSERVICES',
      tech: ['ASP.NET Core', 'C#', 'PostgreSQL', 'EF Core', 'JWT', 'PowerShell'],
      status: 'MVP IN TESTING (GEODIS)',
      desc: 'Solo-engineered enterprise operations management platform from the ground up. Features on-call scheduling, vendor invoice automated reconciliation, and 5+ background services for continuous server health polling and Oracle transaction monitoring with automated PDF/Excel reporting.',
      icon: <Database className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-amber-950/50 via-[#1a1309] to-black',
      codeSnippet: 'services.AddHostedService<OracleTransactionMonitoringWorker>();',
      previewImg: '/assets/ammi/projects_authportal_bg.jpg',
      imgPosition: 'object-[center_12%]',
      badge: 'SOLO-BUILT AT GEODIS',
    },
    {
      id: 'youtube-pipeline',
      title: 'YouTube AI Content Automation Engine',
      category: 'AI PIPELINE & MEDIA AUTOMATION',
      tech: ['Python', 'FastAPI', 'Generative AI', 'Claude API', 'Remotion'],
      status: 'LIVE PRODUCTION (10 CHANNELS)',
      desc: 'Autonomous multi-channel content engine that generates, produces, and publishes videos across 10 YouTube channels (including @ammiexplains). Features a self-hosted FastAPI proxy coordinating channel telemetry, script generation, and consistent thumbnail production.',
      icon: <Video className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-red-950/40 via-[#150a0a] to-black',
      codeSnippet: 'uvicorn proxy.main:app --host 0.0.0.0 --port 8000 --workers 4',
      previewImg: '/assets/ammi/projects_youtube_bg.jpg',
      imgPosition: 'object-[center_8%]',
      badge: '10 CHANNELS POWERED',
      link: 'https://www.youtube.com/@ammiexplains',
    },
    {
      id: 'edi-integration',
      title: 'Enterprise EDI & Supply Chain Architecture',
      category: 'B2B INTEGRATION & PROTOCOL NETWORKS',
      tech: ['IBM Sterling B2B', 'WMS', 'X12 / EDIFACT', 'AS2 / SFTP', '856 ASN'],
      status: 'ENTERPRISE CORE',
      desc: 'High-throughput supply chain transaction network processing procurement (832, 850, 855, 860, 865, 856) and payment (810, 820, 824) documents. Resolved critical retail customer ASN/856 confirmation discrepancies on the WMS confirmation layer with zero transaction disruption.',
      icon: <Server className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-blue-950/40 via-[#0a101f] to-black',
      codeSnippet: 'SELECT envelope_id, sender_id, status FROM b2b_x12_inbound WHERE doc_type = 856;',
      previewImg: '/assets/ammi/projects_edi_bg.jpg',
      imgPosition: 'object-[center_28%]',
      badge: '99.99% TRANSACTION SLA',
    },
    {
      id: 'mq-automation',
      title: 'IBM MQ TLS & High-Availability Scripting Suite',
      category: 'INFRASTRUCTURE & RELIABILITY ENGINEERING',
      tech: ['IBM MQ', 'TLS / SSL', 'RHEL Linux', 'Bash', 'Grafana'],
      status: 'PRODUCTION DEPLOYED',
      desc: 'Executed zero-downtime remediation of an IBM MQ TLS/SSL handshake failure on production queue managers following certificate rotation. Rebuilt lock-file safe bash file-splitting engines with line-ending normalization on RHEL, paired with live Grafana health dashboards.',
      icon: <ShieldCheck className="w-6 h-6 text-[#e2c392]" />,
      visualBg: 'from-emerald-950/40 via-[#071710] to-black',
      codeSnippet: 'runmqsc QMGR01 <<EOF\nREFRESH SECURITY TYPE(SSL)\nEOF',
      previewImg: '/assets/ammi/projects_mq_bg.jpg',
      imgPosition: 'object-[center_16%]',
      badge: 'ZERO DOWNTIME ROTATION',
    },
  ];

  return (
    <section id="work" className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
              VERIFIED RESUME PROJECTS & PLATFORMS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Enterprise Engineering <br />
              <span className="text-gold-gradient">& Production Platforms.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light">
            Real enterprise software, zero-downtime integrations, and automated AI media systems engineered from scratch.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              data-cursor="VIEW DETAILS"
              className="group relative rounded-3xl overflow-hidden glass-panel editorial-border p-8 md:p-12 transition-all duration-500 hover:border-[#e2c392]/50 hover:shadow-[0_20px_60px_rgba(226,195,146,0.06)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#e2c392] tracking-widest uppercase">
                        0{idx + 1} // {project.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold font-syne text-white group-hover:text-[#e2c392] transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base text-[#9496a8] font-light leading-relaxed">
                    {project.desc}
                  </p>

                  {/* Tech Stack Tags */}
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

                  {/* Architecture & Postmortem Deep-Dive Button */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveDossierId(project.id)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-mono text-white hover:text-[#e2c392] hover:border-[#e2c392]/50 hover:bg-[#e2c392]/10 transition-all duration-300 flex items-center gap-2 group/btn shadow-md"
                    >
                      <Layers className="w-3.5 h-3.5 text-[var(--accent-cyan)] group-hover/btn:text-[#e2c392] transition-colors" />
                      <span>Explore Architecture & Postmortem</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#e2c392] hover:underline uppercase tracking-wider px-3 py-2"
                      >
                        <span>Visit @ammiexplains Channel</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Visual Box */}
                <div className="lg:col-span-5 relative h-80 md:h-[350px] rounded-2xl overflow-hidden border border-white/20 flex flex-col justify-between p-6 bg-[#0a0a0f] transition-all duration-700 group-hover:scale-[1.02] shadow-[0_16px_50px_rgba(0,0,0,0.7)] group-hover:border-[#e2c392]/40">
                  {/* Bottom fade only - leaves face and screens 100% illuminated, bright, and sharp */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-40% to-transparent z-10 pointer-events-none" />
                  
                  {/* FULL BLEED BACKGROUND IMAGE - CRISP, ILLUMINATED & FULL COLOR */}
                  <img
                    src={project.previewImg}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover ${project.imgPosition || 'object-center'} brightness-[1.08] contrast-[1.05] opacity-100 group-hover:scale-105 transition-all duration-700 z-0`}
                  />

                  <div className="relative z-20 flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[#e2c392] shadow-xl">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#e2c392] bg-black/80 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-xl font-medium tracking-wide">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Terminal snippet */}
                  <div className="relative z-20 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 font-mono text-[11px] text-[#9496a8] overflow-x-auto whitespace-pre mt-auto transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                    <span className="text-emerald-400 font-bold">$ </span>{project.codeSnippet}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Dossier Modal */}
      <ProjectDossierModal
        projectId={activeDossierId}
        onClose={() => setActiveDossierId(null)}
      />
    </section>
  );
};
