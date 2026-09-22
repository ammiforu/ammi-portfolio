import { motion } from 'framer-motion';

const journeyData = [
  {
    role: "IT Manager",
    company: "GEODIS",
    period: "2022 - Present",
    details: [
      "Manage a 14-person global team covering EDI operations, WMS systems, Linux infrastructure, and IBM MQ",
      "Built custom, AI-assisted automation to take over repetitive manual work in EDI/WMS operations",
      "Rolled out Grafana dashboards for real-time system health and pipeline monitoring"
    ]
  },
  {
    role: "Technical Lead",
    company: "GEODIS",
    period: "2021 - 2022",
    details: [
      "Go-to person for complex EDI/WMS integration problems mapping and data validation through IBM Sterling",
      "Kept integration servers patched and maintained implementation documentation",
      "Started building AuthPortal as a solo project for internal ops automation"
    ]
  },
  {
    role: "Hadoop Engineer / Sr. Administrator",
    company: "AT&T",
    period: "2017 - 2020",
    details: [
      "Built and ran multi-node Hadoop clusters (HDFS, YARN, Hive, Kafka, Spark) for large-scale data ingestion",
      "Managed a 7-person team supporting Hadoop infrastructure and EDI onboarding",
      "Handled cluster upgrades, security hardening (Kerberos/LDAP), and performance tuning"
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
            20+ years of enterprise integration excellence
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
