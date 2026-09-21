import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Database, Video, Server, ShieldCheck } from 'lucide-react';

export const Projects: React.FC = () => {
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
      previewImg: '/assets/ammi/pose_laptop_clean.png',
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
      previewImg: '/assets/ammi/pose_explain_clean.png',
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
      previewImg: '/assets/ammi/pose_point_clean.png',
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
      previewImg: '/assets/ammi/exp_confident.png',
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

                  {project.link && (
                    <div className="pt-2">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] hover:underline uppercase tracking-wider"
                      >
                        <span>Visit @ammiexplains Channel</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Visual Box */}
                <div className="lg:col-span-5 relative h-72 md:h-84 rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between p-6 bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.visualBg} opacity-85`} />

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#e2c392] bg-black/60 px-3 py-1 rounded-full border border-white/10">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Real Pose Stamp */}
                  <div className="absolute right-4 bottom-14 opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none">
                    <img
                      src={project.previewImg}
                      alt="Ammi Pose"
                      className="h-44 object-contain"
                    />
                  </div>

                  {/* Terminal snippet */}
                  <div className="relative z-10 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 font-mono text-[11px] text-[#9496a8] overflow-x-auto whitespace-pre">
                    <span className="text-emerald-400">$ </span>{project.codeSnippet}
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
