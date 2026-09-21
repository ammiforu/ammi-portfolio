import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categories = [
    {
      name: 'Systems & EDI Integration',
      items: [
        'IBM B2B Integrator (Sterling)',
        'EDI (X12 & EDIFACT)',
        '856 ASN & 850 PO Mapping',
        '810 / 820 / 824 Invoices & Payments',
        'IBM MQ TLS/SSL Queue Mgmt',
        'AS2 / SFTP / FTP Protocols',
        'WMS Integration & Triaging',
      ],
    },
    {
      name: 'Automation, AI & Scripting',
      items: [
        'Python Automation & Pipelines',
        'Bash Shell Scripting (RHEL/CentOS)',
        'FastAPI Self-Hosted Proxies',
        'Generative AI Content Systems',
        'Grafana Observability Dashboards',
        'Cron Daemons & Lock-File Safety',
      ],
    },
    {
      name: 'Full-Stack Platforms & DBs',
      items: [
        'ASP.NET Core MVC & Web API',
        'C# & Entity Framework Core',
        'PostgreSQL & Oracle SQL',
        'JWT & Encrypted Vault Auth',
        'Automated PDF & Excel Reporting',
        'PowerShell Auto-Deployment',
      ],
    },
    {
      name: 'Platforms & Big Data',
      items: [
        'RHEL / CentOS / Ubuntu Linux',
        'Hadoop (HDFS, Hive, Kafka, Spark)',
        'Docker & Nginx Proxy Manager',
        'AWS Cloud (EC2, S3)',
        'WireGuard & ZeroTier Networks',
        'Git & CI/CD Git Hooks',
      ],
    },
    {
      name: 'Leadership & Methodologies',
      items: [
        'Global Team Leadership (14 engineers)',
        'Onshore/Offshore Coordination',
        'Cross-Functional Stakeholder Mgmt',
        'Vendor & Retail Client Onboarding',
        'Root Cause Defect Investigation',
        'Agile / Scrum Delivery',
      ],
    },
  ];

  return (
    <section id="skills" className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
            TECHNICAL & LEADERSHIP COMPETENCIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Core Competencies & <span className="text-gold-gradient">Stack.</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 border-b border-white/10 pb-6">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                activeCategory === idx
                  ? 'bg-[#e2c392] text-[#08080a] font-bold shadow-lg'
                  : 'bg-white/5 text-[#9496a8] hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Interactive Typography Display */}
        <div className="p-8 md:p-14 rounded-3xl glass-panel editorial-border min-h-[300px] flex items-center">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-4 md:gap-6 items-center"
          >
            {categories[activeCategory].items.map((skill, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="group relative px-6 py-4 rounded-2xl bg-[#111116] border border-white/10 hover:border-[#e2c392]/50 transition-all duration-300"
              >
                <span className="text-lg md:text-2xl font-bold font-syne text-[#f4f4f6] group-hover:text-[#e2c392] transition-colors">
                  {skill}
                </span>
                <div className="text-[10px] font-mono text-[#9496a8] pt-1 uppercase tracking-widest">
                  PRODUCTION VERIFIED
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
