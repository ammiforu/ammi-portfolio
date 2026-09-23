import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Shield, RefreshCw, AlertTriangle, CheckCircle2, 
  ArrowRight, Activity, Layers, Cpu
} from 'lucide-react';

interface TopologyNode {
  id: string;
  label: string;
  category: string;
  role: string;
  specs: string[];
  protocol: string;
  status: 'nominal' | 'alert' | 'remediating';
  sla: string;
  highlightColor: string;
}

const NODES: TopologyNode[] = [
  {
    id: 'partners',
    label: '500+ Trading Partners',
    category: 'Ingestion Layer',
    role: 'Tier-1 Retailers, Suppliers & 3PL Shippers',
    specs: ['Fortune 500 Retailers & Global Consumer Brands (Big-Box, Grocery, Auto)', 'Inbound 850 (PO), Outbound 856 (ASN), 810 (Invoice)', 'VAN, AS2, SFTP, FTPS pipelines'],
    protocol: 'EDI X12 / EDIFACT / AS2',
    status: 'nominal',
    sla: '99.98% Ingestion',
    highlightColor: 'from-amber-500/20 to-amber-500/5',
  },
  {
    id: 'sterling',
    label: 'IBM Sterling B2B',
    category: 'Transformation Engine',
    role: 'Central Enterprise B2B Gateway',
    specs: ['High-throughput business process translation', 'Custom map rule validation & enveloper', 'Automated 997 functional acknowledgment generation'],
    protocol: 'IBM Sterling SI / BPML',
    status: 'nominal',
    sla: '99.99% Availability',
    highlightColor: 'from-blue-500/20 to-blue-500/5',
  },
  {
    id: 'ibmmq',
    label: 'IBM MQ Messaging',
    category: 'Message Broker',
    role: 'Decoupled Production Queue Managers',
    specs: ['TLS 1.3 encrypted channel synchronization', 'Clustered failover queues with zero message loss', 'Dynamic queue depth monitoring via Grafana'],
    protocol: 'IBM MQ v9.x / TLS',
    status: 'nominal',
    sla: 'Zero Message Loss',
    highlightColor: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    id: 'wms',
    label: 'Manhattan WMS',
    category: 'Execution Layer',
    role: 'Warehouse Fulfillment Core',
    specs: ['Inbound receiving & wave release management', 'Cartonization, pick-pack-ship verification', 'Real-time ASN 856 payload generation on dispatch'],
    protocol: 'Manhattan Associates / Oracle',
    status: 'nominal',
    sla: 'Sub-second Dispatch',
    highlightColor: 'from-cyan-500/20 to-cyan-500/5',
  },
  {
    id: 'authportal',
    label: 'AuthPortal & Ops AI',
    category: 'Telemetry & Control',
    role: 'Custom Internal Platform & Telemetry',
    specs: ['ASP.NET Core background worker services', 'Automated Oracle database transaction polling', 'Live Grafana telemetry & incident triage routing'],
    protocol: 'ASP.NET Core / Postgres / PromQL',
    status: 'nominal',
    sla: 'Active 24/7/365',
    highlightColor: 'from-purple-500/20 to-purple-500/5',
  },
];

type SimulationScenario = 'nominal' | 'mq_tls' | 'asn_discrepancy' | 'peak_surge';

export const SystemArchitecture: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>('nominal');
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(NODES[2]); // Default IBM MQ
  const [simStep, setSimStep] = useState<number>(0);

  const handleScenarioChange = (scenario: SimulationScenario) => {
    setActiveScenario(scenario);
    setSimStep(1);
    const timer = setTimeout(() => setSimStep(2), 1200);
    const timer2 = setTimeout(() => setSimStep(3), 2400);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  };

  return (
    <section id="architecture" className="py-28 bg-[#07080c] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent-cyan)]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e2c392]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] tracking-widest uppercase">
              <Layers className="w-4 h-4 text-[var(--accent-cyan)]" />
              INTERACTIVE SYSTEM TOPOLOGY & INCIDENT SIMULATOR
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Enterprise Supply Chain <br />
              <span className="text-cyan-gradient">Architecture & Data Flow</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light leading-relaxed">
            Click any infrastructure node to inspect technical specifications, or run a simulated production incident to observe Ammi's automated recovery pathways.
          </p>
        </div>

        {/* Simulator Control Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9496a8]">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">PRODUCTION SIMULATOR:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleScenarioChange('nominal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeScenario === 'nominal'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/5 text-[#9496a8] hover:text-white border border-white/5'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Normal 99.99% Operations</span>
            </button>

            <button
              onClick={() => handleScenarioChange('mq_tls')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeScenario === 'mq_tls'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-white/5 text-[#9496a8] hover:text-white border border-white/5'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate MQ TLS Cert Expiry</span>
            </button>

            <button
              onClick={() => handleScenarioChange('asn_discrepancy')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeScenario === 'asn_discrepancy'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 text-[#9496a8] hover:text-white border border-white/5'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate 856 ASN Mismatch</span>
            </button>

            <button
              onClick={() => handleScenarioChange('peak_surge')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                activeScenario === 'peak_surge'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'bg-white/5 text-[#9496a8] hover:text-white border border-white/5'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Peak Volume Surge (10x)</span>
            </button>
          </div>
        </div>

        {/* Main Topology Diagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative">
          {NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            
            // Dynamic scenario status
            let isAffected = false;
            let scenarioText = '';

            if (activeScenario === 'mq_tls' && node.id === 'ibmmq') {
              isAffected = true;
              scenarioText = simStep >= 2 ? 'RECOVERED: Zero Downtime Security Refresh' : 'ALERT: TLS Handshake Expired';
            } else if (activeScenario === 'asn_discrepancy' && (node.id === 'wms' || node.id === 'sterling')) {
              isAffected = true;
              scenarioText = simStep >= 2 ? 'RESOLVED: Automated Discrepancy Reconciliation' : 'TRIAGE: 856 Confirmation Mismatch';
            } else if (activeScenario === 'peak_surge') {
              isAffected = true;
              scenarioText = 'LOCK-SAFE: Parallel Bash Ingestion Active';
            }

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative flex flex-col justify-between min-h-[220px] ${
                  isSelected 
                    ? 'bg-white/[0.08] border-[var(--accent-cyan)] shadow-[0_0_30px_rgba(0,240,255,0.2)]' 
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Node Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#9496a8]">
                    <span>0{index + 1} // {node.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                      {node.sla}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-syne text-white flex items-center gap-2">
                    {node.label}
                  </h3>

                  <p className="text-xs text-[#9496a8] line-clamp-2">
                    {node.role}
                  </p>
                </div>

                {/* Scenario Incident Overlay Badge */}
                {isAffected && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-2 p-2 rounded-xl text-[10px] font-mono border ${
                      scenarioText.startsWith('ALERT') || scenarioText.startsWith('TRIAGE')
                        ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                        : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                      {scenarioText}
                    </div>
                  </motion.div>
                )}

                {/* Node Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--accent-cyan)]">{node.protocol}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-[var(--accent-cyan)]' : 'text-white/20'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Technical Deep-Dive Drawer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-[#0d0f17] to-black border border-white/15 backdrop-blur-xl shadow-2xl space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 text-[var(--accent-cyan)]">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider">
                    DEEP-DIVE ARCHITECTURAL SPECIFICATION
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold font-syne text-white">
                    {selectedNode.label} — {selectedNode.role}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#e2c392] px-3 py-1.5 rounded-xl bg-[#e2c392]/10 border border-[#e2c392]/30">
                  Protocol: {selectedNode.protocol}
                </span>
                <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  SLA Target: {selectedNode.sla}
                </span>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedNode.specs.map((spec, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-[#9496a8] uppercase">CAPABILITY // 0{i + 1}</div>
                  <div className="text-xs text-white/90 font-light leading-relaxed">{spec}</div>
                </div>
              ))}
            </div>

            {/* Architecture SOP / Automated Resilience Note */}
            <div className="p-4 rounded-xl bg-[#090b12] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#9496a8]">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>
                  <strong className="text-white">Resilience Architecture:</strong> Redundant failover paths, lock-file concurrency protection, and automated Grafana telemetry alert triggers prevent cascading microservice outages.
                </span>
              </div>
              <div className="text-emerald-400 font-bold shrink-0">
                100% Zero-Loss Guaranteed
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enterprise Confidentiality & Compliance Notice */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-[11px] font-mono text-[#9496a8]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
            <span>
              <strong>Enterprise Confidentiality & Compliance Notice:</strong> All topologies, workflows, and case studies are presented at a high-level and anonymized to comply with non-disclosure agreements, customer privacy, and enterprise security policies.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
