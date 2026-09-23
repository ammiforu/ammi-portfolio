import { motion } from 'framer-motion';

const journeyData = [
  {
    role: "IT Manager",
    company: "GEODIS — Franklin, TN",
    period: "May 2025 — Present",
    details: [
      "Manage a 14-person global team across the U.S. and India covering EDI operations, WMS systems, RHEL Linux infrastructure, and IBM MQ.",
      "Rolled out real-time Grafana dashboards for proactive pipeline visibility, shifting team triage from reactive alerts to pre-emptive incident resolution.",
      "Built custom, AI-assisted automation to eliminate repetitive manual work across EDI/WMS operational workflows.",
      "Lead root-cause investigations on EDI/WMS discrepancies (ASN/856 confirmation mismatches) for major retail accounts.",
      "Resolved an IBM MQ TLS/SSL handshake failure on a production queue manager following certificate rotation with zero service downtime.",
      "Re-engineered RHEL bash file-splitting scripts with lock-file concurrency safety and line-ending normalization."
    ]
  },
  {
    role: "Technical Lead",
    company: "GEODIS — Franklin, TN",
    period: "Nov 2021 — May 2025",
    details: [
      "Go-to technical authority for complex EDI/WMS integration problems, data validation, and X12 mapping through IBM Sterling B2B Integrator.",
      "Maintained integration server patching, authored implementation documentation, and established team SOPs.",
      "Architected and initiated AuthPortal as a solo project — full-stack ASP.NET Core & PostgreSQL internal operations platform for on-call scheduling and server health monitoring."
    ]
  },
  {
    role: "Electronic Data Interchange (EDI) Analyst",
    company: "GEODIS — Franklin, TN",
    period: "Jul 2020 — Nov 2021",
    details: [
      "Main point of contact for EDI transaction status across procurement sets (832, 850, 855, 860, 865, 856) and financial sets (810, 820, 824).",
      "Onboarded new enterprise clients onto GEODIS EDI systems, setting up and maintaining AS2, SFTP, and FTP communication pipelines."
    ]
  },
  {
    role: "Hadoop Engineer / Sr. Hadoop Administrator",
    company: "AT&T — Austin, TX",
    period: "Sep 2017 — Jul 2020",
    details: [
      "Built and operated multi-node Hadoop clusters (Cloudera/Hortonworks: HDFS, YARN, Hive, Kafka, Spark, Flume) for high-scale data ingestion and analytics.",
      "Managed a 7-person team (4 onshore, 3 offshore) supporting Hadoop infrastructure and EDI onboarding through GXS / OpenText BizManager.",
      "Handled production cluster upgrades, Kerberos/LDAP security hardening, and performance tuning."
    ]
  }
];

export function Journey() {
  return (
    <section id="journey" className="py-32 relative bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24 relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-cinzel font-bold text-cyan-gradient tracking-tight"
          >
            Professional Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-xl text-[var(--text-secondary)] font-jakarta max-w-2xl mx-auto"
          >
            7+ years of supply chain tech leadership & enterprise systems integration
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Glowing Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--accent-cyan)] to-transparent opacity-50 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12 relative z-10">
            {journeyData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[var(--bg-dark)] border-2 border-[var(--accent-cyan)] transform md:-translate-x-1/2 mt-6 md:mt-0 shadow-[0_0_15px_var(--accent-cyan)] z-20"></div>
                
                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0 relative">
                  <div className={`blue-glass p-8 rounded-2xl editorial-border ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <h3 className="text-2xl font-cinzel font-bold text-[var(--text-primary)]">{item.role}</h3>
                    <h4 className="text-lg font-jakarta font-semibold text-[var(--accent-cyan)] mt-1">{item.company}</h4>
                    <p className="text-sm font-jakarta text-[var(--text-secondary)] mt-2 mb-6 tracking-wider uppercase">{item.period}</p>
                    
                    <ul className={`space-y-3 font-jakarta text-[var(--text-secondary)] leading-relaxed text-sm ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                      {item.details.map((detail, idx) => (
                        <li key={idx} className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse flex-row'} gap-3`}>
                          <span className="text-[var(--accent-blue)] text-lg leading-none mt-0.5">▸</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Empty Space for Alignment */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
