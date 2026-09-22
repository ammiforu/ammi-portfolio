import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { RadarChart } from './RadarChart';

const skillsData = [
  { name: "Systems & Integration (EDI, IBM Sterling, MQ)", level: 95 },
  { name: "Automation & AI (Python, Bash, FastAPI)", level: 90 },
  { name: "Global Team Leadership", level: 85 },
  { name: "Full-Stack Dev (ASP.NET Core, C#)", level: 88 },
  { name: "Platforms (Linux, Hadoop, AWS)", level: 92 },
  { name: "Infrastructure Monitoring (Grafana)", level: 85 }
];

export function SkillsGrid() {
  return (
    <section id="skills" className="py-24 relative bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-cinzel font-bold text-cyan-gradient tracking-tight"
          >
            Technical Mastery
          </motion.h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Side: Radar Chart */}
          <div className="w-full h-full min-h-[400px] flex items-center justify-center p-6 blue-glass rounded-3xl border border-[var(--border-subtle)]">
            <RadarChart />
          </div>

          {/* Right Side: Skill Bars */}
          <div className="grid grid-cols-1 gap-6">
            {skillsData.map((skill, index) => (
              <TiltCard key={index} className="!p-0 !bg-transparent !border-none backdrop-blur-none">
                <div className="p-6 rounded-xl blue-glass border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors h-full flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[#f4f4f6] font-medium font-syne">{skill.name}</h3>
                    <span className="text-[var(--accent-blue)] font-mono font-bold text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0a0a0f] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] shadow-[0_0_10px_var(--accent-cyan)]"
                    />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
