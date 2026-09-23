import React from 'react';
import { Award, CheckCircle2, GraduationCap } from 'lucide-react';

export const Achievements: React.FC = () => {
  const achievements = [
    {
      title: 'Global Team Leadership (GEODIS)',
      desc: 'Promoted to IT Manager overseeing a 14-person distributed team (US & India) driving EDI operations, WMS systems, Linux infrastructure, and IBM MQ queue management.',
      category: 'LEADERSHIP & OPS',
    },
    {
      title: 'Production IBM MQ TLS Handshake Recovery',
      desc: 'Fixed an IBM MQ TLS/SSL handshake failure on a production queue manager following an unexpected certificate rotation with zero customer service downtime.',
      category: 'HIGH AVAILABILITY',
    },
    {
      title: 'Real-Time Grafana Pipeline Observability',
      desc: 'Engineered and rolled out centralized Grafana dashboards across integration pipelines, shifting the team from reactive triage to real-time proactive incident detection.',
      category: 'SYSTEM MONITORING',
    },
    {
      title: 'RHEL Shell Automation & Data Safety',
      desc: 'Rebuilt bash-based CSV/TXT file-splitting scripts on RHEL with configurable split sizes, lock-file safety, and line-ending normalization, eliminating recurring downstream bugs.',
      category: 'AUTOMATION & SHELL',
    },
    {
      title: 'AT&T Big Data Hadoop Cluster Administration',
      desc: 'Managed 7 engineers (4 onshore, 3 offshore) deploying multi-node Hadoop clusters (Cloudera/Hortonworks — HDFS, Hive, Kafka, Spark) with Kerberos/LDAP security hardening.',
      category: 'BIG DATA & INFRA',
    },
    {
      title: 'UIP (Unified Integration Portal) Solo Engineering',
      desc: 'Independently conceptualized and built an internal ops automation platform in ASP.NET Core, C#, and PostgreSQL with JWT auth and scheduled automated reporting.',
      category: 'FULL-STACK PLATFORM',
    },
  ];

  const education = [
    {
      degree: "Master's in Information Systems Security",
      school: 'University of the Cumberlands, Kentucky',
      year: '2019',
    },
    {
      degree: "Master's in Computer Science",
      school: 'Northwestern Polytechnic University, California',
      year: '2016',
    },
    {
      degree: "Bachelor's in Computer Science",
      school: 'JNTUK, India',
      year: '2013',
    },
  ];

  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <Award className="w-4 h-4 text-[#e2c392]" />
            PROVEN TRACK RECORD
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Enterprise Impact & <span className="text-gold-gradient">Credentials.</span>
          </h2>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel editorial-border flex flex-col justify-between hover:border-[#e2c392]/40 transition-colors space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#e2c392] bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold font-syne text-white">{item.title}</h3>
                <p className="text-xs text-[#9496a8] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Education & Degrees */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#e2c392] uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            ACADEMIC CREDENTIALS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel editorial-border space-y-2 hover:border-[#e2c392]/30 transition-colors"
              >
                <div className="text-xs font-mono text-[#e2c392]">{edu.year}</div>
                <h4 className="text-sm font-bold font-syne text-white">{edu.degree}</h4>
                <div className="text-xs font-mono text-[#9496a8]">{edu.school}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
