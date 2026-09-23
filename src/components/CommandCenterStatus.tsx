import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Shield,
  Server,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  Clock,
  Terminal,
} from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  category: string;
  status: 'operational' | 'nominal' | 'active';
  uptime: string;
  metrics: string;
  description: string;
  technicalSpecs: {
    protocol: string;
    throughput: string;
    failover: string;
    monitoring: string;
  };
}

const SYSTEMS: SystemNode[] = [
  {
    id: 'sterling',
    name: 'IBM Sterling B2B Integrator',
    category: 'EDI & Supply Chain Gateway',
    status: 'operational',
    uptime: '99.99% SLA',
    metrics: '500+ Partners Active',
    description: 'Mission-critical enterprise B2B gateway handling automated X12 and EDIFACT supply chain transactions (856, 850, 810, 820).',
    technicalSpecs: {
      protocol: 'AS2 / SFTP / FTPS / HTTPS',
      throughput: 'Millions of monthly transactions',
      failover: 'Multi-node active-passive cluster',
      monitoring: 'Custom Grafana dashboards + automated alert rules',
    },
  },
  {
    id: 'ibmmq',
    name: 'IBM MQ TLS Enterprise Broker',
    category: 'Asynchronous Messaging',
    status: 'operational',
    uptime: '100% Uptime Track',
    metrics: 'Zero Backlog · TLS 1.3',
    description: 'High-throughput enterprise message queuing with hardened TLS/SSL certificate verification and zero-downtime rotation protocol.',
    technicalSpecs: {
      protocol: 'IBM MQ 9.x / TLS 1.3 Handshake',
      throughput: 'Sub-millisecond latency queue delivery',
      failover: 'Automated queue manager failover',
      monitoring: 'Real-time channel & depth listeners',
    },
  },
  {
    id: 'wms',
    name: 'Manhattan Associates WMS',
    category: 'Warehouse Operations',
    status: 'nominal',
    uptime: 'Continuous Sync',
    metrics: 'ASN 856 Discrepancy Gate',
    description: 'Integrated warehouse management system syncing inventory, order fulfillment, and automated RHEL CSV/TXT file-splitting pipelines.',
    technicalSpecs: {
      protocol: 'Restricted RHEL Bash / POSIX Lock Concurrency',
      throughput: 'Batch & real-time inventory reconciliation',
      failover: 'Automated line-ending normalization & rollback',
      monitoring: 'Proactive mismatch root-cause detection',
    },
  },
  {
    id: 'authportal',
    name: 'AuthPortal Platform',
    category: 'Enterprise Ops & IAM',
    status: 'active',
    uptime: '99.95% Availability',
    metrics: '5+ Background Services',
    description: 'Internal operations platform built solo in ASP.NET Core & PostgreSQL for on-call scheduling, server health monitoring, and vendor data reconciliation.',
    technicalSpecs: {
      protocol: 'ASP.NET Core Web API / EF Core / JWT + Refresh',
      throughput: 'Continuous automated background polling',
      failover: 'Dockerized failover + PowerShell auto-deploy hooks',
      monitoring: 'Full audit logging & scheduled PDF reporting',
    },
  },
  {
    id: 'yt-pipeline',
    name: 'YouTube AI Media Engine',
    category: 'Autonomous Asset Network',
    status: 'active',
    uptime: 'Autonomous Daily',
    metrics: '10 Channels · 625K+ Views',
    description: 'Automated digital media holding asset running end-to-end content generation, script synthesis, thumbnail generation, and daily telemetry sync.',
    technicalSpecs: {
      protocol: 'FastAPI / Python Async / Gemini & OpenAI APIs',
      throughput: 'Automated multi-account batch syndication',
      failover: 'Dual Google Drive & local redundancy',
      monitoring: 'Daily telemetry archive with 43+ snapshots',
    },
  },
];

export const CommandCenterStatus: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [time, setTime] = useState<{ utc: string; local: string }>({
    utc: '',
    local: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        utc: now.toUTCString().slice(17, 25) + ' UTC',
        local: now.toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour12: false,
        }) + ' CT (Franklin, TN)',
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedSystem = SYSTEMS.find((s) => s.id === activeNode);

  return (
    <section className="relative z-20 py-10 bg-[#08080a] border-y border-white/8 px-6 md:px-12 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Top Telemetry Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/20 to-[#00f0ff]/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold font-syne text-white flex items-center gap-2">
                <span>ENTERPRISE COMMAND CENTER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  ALL 5 CLUSTERS NOMINAL
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#9496a8]">
                Real-time infrastructure health, integration gateways, and autonomous holding assets
              </p>
            </div>
          </div>

          {/* Real-time Telemetry Clocks */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#9496a8]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10111a] border border-white/5">
              <Clock className="w-3.5 h-3.5 text-[#e2c392]" />
              <span className="text-white font-semibold">{time.local}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10111a] border border-white/5">
              <Terminal className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="text-white font-semibold">{time.utc}</span>
            </div>
          </div>
        </div>

        {/* 5 Monitored Systems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {SYSTEMS.map((system) => {
            const isSelected = activeNode === system.id;
            return (
              <div
                key={system.id}
                onClick={() => setActiveNode(isSelected ? null : system.id)}
                className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 relative group ${
                  isSelected
                    ? 'bg-[#151726] border border-[#00f0ff]/60 shadow-[0_0_25px_rgba(0,240,255,0.18)]'
                    : 'bg-[#0f1019] border border-white/8 hover:border-white/20 hover:bg-[#121320]'
                }`}
              >
                {/* Node Status Indicator */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono text-[#9496a8] uppercase truncate max-w-[120px]">
                    {system.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {system.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-sm font-bold font-syne text-white group-hover:text-[#e2c392] transition-colors leading-snug">
                  {system.name}
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#e2c392] font-semibold">{system.uptime}</span>
                  <span className="text-[#9496a8] flex items-center gap-0.5">
                    {isSelected ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Architecture Drawer */}
        <AnimatePresence>
          {selectedSystem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-[#11121e] border border-white/15 p-6 space-y-4 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#00f0ff]/20 to-[#e2c392]/20 border border-white/10 text-white">
                    <Server className="w-5 h-5 text-[#00f0ff]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-syne text-white flex items-center gap-2">
                      <span>{selectedSystem.name}</span>
                      <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {selectedSystem.metrics}
                      </span>
                    </h4>
                    <p className="text-xs font-mono text-[#9496a8]">
                      Category: {selectedSystem.category}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNode(null)}
                  className="self-end sm:self-center text-xs font-mono text-[#9496a8] hover:text-white px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                >
                  Close Details ✕
                </button>
              </div>

              <p className="text-sm text-[#f4f4f6] font-light leading-relaxed">
                {selectedSystem.description}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#9496a8] flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#e2c392]" /> Protocol / Standard
                  </div>
                  <div className="text-xs font-mono text-white font-medium">
                    {selectedSystem.technicalSpecs.protocol}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#9496a8] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#00f0ff]" /> Throughput & Scale
                  </div>
                  <div className="text-xs font-mono text-white font-medium">
                    {selectedSystem.technicalSpecs.throughput}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#9496a8] flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400" /> Failover Protocol
                  </div>
                  <div className="text-xs font-mono text-white font-medium">
                    {selectedSystem.technicalSpecs.failover}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0a0b12] border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#9496a8] flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-purple-400" /> Monitoring Engine
                  </div>
                  <div className="text-xs font-mono text-white font-medium">
                    {selectedSystem.technicalSpecs.monitoring}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
