import React, { useState } from 'react';
import { Calculator, Clock, ShieldAlert, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

export const EnterpriseCalculator: React.FC = () => {
  const [transactions, setTransactions] = useState<number>(350000);
  const [teamSize, setTeamSize] = useState<number>(10);
  const [downtimeCost, setDowntimeCost] = useState<number>(45000);

  // Calculations
  // 70% reduction in manual incident triage across team
  const hoursSavedPerMonth = Math.round(teamSize * 35 * 0.7); // 35 hrs/mo on triage per engineer cut by 70%
  const annualHoursSaved = hoursSavedPerMonth * 12;
  const laborSavings = Math.round(annualHoursSaved * 78); // $78/hr blended engineer cost

  // Prevented downtime hours (proactive monitoring + zero-downtime SOPs prevent ~4.2 hrs of Sev-1 downtime/yr)
  const downtimeSaved = Math.round(downtimeCost * 4.2);
  const totalValue = laborSavings + downtimeSaved;

  return (
    <section id="roi-calculator" className="py-28 bg-[#08080c] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <Calculator className="w-4 h-4 text-[#e2c392]" />
              ENTERPRISE VALUE & ROI ESTIMATOR
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Quantifiable Impact: <br />
              <span className="text-gold-gradient">Automation & Zero-Downtime ROI</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light leading-relaxed">
            Estimate the bottom-line financial return and engineering hours reclaimed by implementing Ammi's automated EDI triage workflows, MQ zero-downtime SOPs, and proactive Grafana dashboards.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 rounded-3xl p-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-syne text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e2c392]" />
                Your Enterprise Infrastructure Parameters
              </h3>

              {/* Slider 1: Monthly Transactions */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#9496a8]">MONTHLY EDI & B2B TRANSACTIONS</span>
                  <span className="text-white font-bold text-sm">
                    {transactions.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1500000"
                  step="25000"
                  value={transactions}
                  onChange={(e) => setTransactions(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#9496a8]/50">
                  <span>25,000</span>
                  <span>750,000</span>
                  <span>1.5M+</span>
                </div>
              </div>

              {/* Slider 2: Team Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#9496a8]">OPERATIONS & INTEGRATION TEAM SIZE</span>
                  <span className="text-white font-bold text-sm">
                    {teamSize} Engineers
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#e2c392]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#9496a8]/50">
                  <span>2 Engineers</span>
                  <span>15 Engineers</span>
                  <span>30 Engineers</span>
                </div>
              </div>

              {/* Slider 3: Cost per Hour of Outage */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-[#9496a8]">ESTIMATED SUPPLY CHAIN OUTAGE COST / HOUR</span>
                  <span className="text-white font-bold text-sm">
                    ${downtimeCost.toLocaleString()} / hr
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={downtimeCost}
                  onChange={(e) => setDowntimeCost(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#9496a8]/50">
                  <span>$10,000/hr</span>
                  <span>$75,000/hr</span>
                  <span>$150,000/hr</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-[#9496a8] leading-relaxed">
              💡 <strong>Methodology:</strong> Based on verified performance metrics at GEODIS (70% reduction in manual ASN/856 triage touchpoints, 100% zero-downtime MQ TLS rotation, and sub-minute automated Grafana alert dispatch).
            </div>
          </div>

          {/* Results Impact Showcase */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-gradient-to-br from-[#101426] via-[#090b14] to-black border border-[var(--accent-cyan)]/30 shadow-[0_20px_60px_rgba(0,240,255,0.08)] flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="text-xs font-mono text-[var(--accent-cyan)] tracking-wider uppercase flex items-center justify-between">
                <span>ESTIMATED VALUE RETURN</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Main Total Big Number */}
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 text-center space-y-2">
                <div className="text-xs font-mono text-[#9496a8] uppercase">
                  Annual Bottom-Line Value Unlocked
                </div>
                <div className="text-4xl md:text-5xl font-extrabold font-syne text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[var(--accent-cyan)] to-white tracking-tight">
                  ${totalValue.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono text-emerald-400/90">
                  Labor reclaimed + severe downtime prevented
                </div>
              </div>

              {/* Sub Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#9496a8]">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                    <span>HOURS SAVED</span>
                  </div>
                  <div className="text-xl font-bold font-syne text-white">
                    {annualHoursSaved.toLocaleString()} hrs/yr
                  </div>
                  <div className="text-[10px] text-[#9496a8]">70% triage cut</div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#9496a8]">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DOWNTIME SAVED</span>
                  </div>
                  <div className="text-xl font-bold font-syne text-emerald-400">
                    ${downtimeSaved.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#9496a8]">~4.2 hrs risk avoided</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="https://calendar.app.google/FkHk6NzDGzwhXEBn8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[var(--accent-cyan)] to-blue-500 text-black font-bold font-syne text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 30-Min Enterprise Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
