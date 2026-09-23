import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Terminal, Layers, ArrowUpRight, Cpu } from 'lucide-react';

export interface ProjectDossierData {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  challenge: string;
  solution: string;
  architecture: string[];
  metrics: { label: string; value: string; desc: string }[];
  codeBlock?: string;
  link?: string;
  linkText?: string;
}

export const PROJECT_DOSSIERS: Record<string, ProjectDossierData> = {
  'auth-portal': {
    id: 'auth-portal',
    title: 'AuthPortal — Enterprise Operations Platform',
    category: 'ENTERPRISE FULL-STACK & BACKGROUND WORKERS',
    subtitle: 'Solo-engineered enterprise operations management platform from the ground up at GEODIS.',
    challenge: 'Operations teams relied on fragile spreadsheets for on-call rotation schedules, and invoice reconciliation between GEODIS and logistics vendor bills was completely manual, leading to multi-day resolution backlogs.',
    solution: 'Engineered AuthPortal as a full-stack platform using ASP.NET Core, PostgreSQL, and Azure AD / MSAL authentication. Built 5+ autonomous background hosted services (`IHostedService`) that continuously poll Oracle databases, reconcile invoices, and generate automated PDF/Excel executive reports.',
    architecture: [
      'Frontend: React 18 + TypeScript + Tailwind CSS with MSAL single sign-on',
      'Backend: ASP.NET Core 8 Web API with Dependency Injection & Repository Pattern',
      'Database: PostgreSQL with Entity Framework Core code-first migrations',
      'Workers: Continuous `BackgroundService` polling Oracle transaction streams & server health',
      'Reporting: Automated PDF and OpenXML Excel dispatch via SMTP',
    ],
    metrics: [
      { label: 'Triage Time', value: '-85%', desc: 'Reduction in manual invoice reconciliation time' },
      { label: 'Background Workers', value: '5+', desc: 'Continuous polling workers running 24/7' },
      { label: 'Team Adoption', value: '100%', desc: 'Adopted across operations teams for on-call SOPs' },
    ],
    codeBlock: `// Autonomous worker registered in Program.cs
builder.Services.AddHostedService<OracleTransactionMonitoringWorker>();
builder.Services.AddHostedService<ServerHealthPollingWorker>();
builder.Services.AddHostedService<VendorInvoiceReconciliationWorker>();`,
  },
  'youtube-pipeline': {
    id: 'youtube-pipeline',
    title: 'YouTube AI Content Automation Engine',
    category: 'AUTONOMOUS MEDIA PIPELINE & MULTI-AGENT ARCHITECTURE',
    subtitle: 'Scalable media holding infrastructure powering 10 automated channels.',
    challenge: 'Scaling high-RPM educational YouTube channels requires consistent research, scriptwriting, voiceover synthesis, programmatic video composition, and daily telemetry tracking without human bottlenecks.',
    solution: 'Architected an autonomous end-to-end Python/FastAPI pipeline coordinating LLM agent scripts, programmatic video rendering via Remotion, and daily telemetry sync from Google Drive storage into interactive analytics dashboards.',
    architecture: [
      'Orchestration: Self-hosted FastAPI microservice proxy with token bucket rate limiting',
      'Content Generation: Claude 3.5 & Gemini 1.5 Pro prompts with structured JSON output',
      'Video Engine: Programmatic React video rendering using Remotion',
      'Telemetry Pipeline: Python sync scripts digesting daily JSON archives from Google Drive',
      'Network Scope: 10 channels including @ammiexplains & @ViswaDarshiniUsa',
    ],
    metrics: [
      { label: 'Total Views', value: '624K+', desc: 'Across automated channel network' },
      { label: 'Subscribers', value: '1,670+', desc: 'On flagship channel @ammiexplains' },
      { label: 'Channels', value: '10', desc: 'Automated digital media network' },
    ],
    codeBlock: `# FastAPI Proxy endpoint handling autonomous video synthesis
@app.post("/api/v1/generate-render")
async def trigger_render(payload: VideoSpec):
    script = await agent_cluster.synthesize_script(payload.topic)
    render_job = await remotion_pool.dispatch(script)
    return {"job_id": render_job.id, "status": "rendering"}`,
    link: 'https://www.youtube.com/@ammiexplains',
    linkText: 'Visit @ammiexplains Flagship Channel',
  },
  'edi-integration': {
    id: 'edi-integration',
    title: 'Enterprise EDI & Supply Chain Architecture',
    category: 'MISSION-CRITICAL B2B INTEGRATION & PROTOCOLS',
    subtitle: 'High-throughput supply chain transaction network onboarding 500+ enterprise trading partners.',
    challenge: 'Tier-1 retail accounts and national distribution partners experienced ASN/856 confirmation mismatches between physical carton dispatch and WMS record layers, creating compliance chargeback risks.',
    solution: 'Designed and deployed optimized X12/EDIFACT translation maps on IBM Sterling B2B Integrator. Established secure AS2, SFTP, and VAN transport pipelines, and implemented automated carton-level verification prior to 856 transmission.',
    architecture: [
      'Platform: IBM Sterling B2B Integrator (SI 6.x) with custom BPML business processes',
      'Standards: ANSI X12 (850, 855, 856, 810, 820, 824) and EDIFACT (ORDERS, DESADV, INVOIC)',
      'Security: AS2 signed/encrypted transmissions, SSL/TLS certificates, SFTP key pairs',
      'Validation: Automated 997 / CONTRL functional acknowledgment loops',
      'Execution: Real-time synchronization with Manhattan Associates WMS',
    ],
    metrics: [
      { label: 'Transaction SLA', value: '99.99%', desc: 'Sustained across high-volume peak seasons' },
      { label: 'Trading Partners', value: '500+', desc: 'Onboarded across retail and pharmaceutical' },
      { label: 'Chargeback Drops', value: '0', desc: 'Zero retailer compliance penalties post-fix' },
    ],
    codeBlock: `<!-- IBM Sterling BPML fragment: ASN 856 verification & transmission -->
<operation name="ValidateAndDispatchASN">
  <participant name="X12_Envelope_Service"/>
  <output message="X12EnvelopeInputMessage">
    <assign to="DocType">856</assign>
    <assign to="ValidateCartonChecksum">true</assign>
  </output>
</operation>`,
  },
  'mq-automation': {
    id: 'mq-automation',
    title: 'IBM MQ TLS & High-Availability Scripting Suite',
    category: 'INFRASTRUCTURE & RELIABILITY ENGINEERING',
    subtitle: 'Zero-downtime remediation of production queue manager TLS handshake failure.',
    challenge: 'Following an enterprise TLS certificate rotation on production IBM MQ queue managers, communication channels experienced SSL/TLS handshake failures, threatening total message ingestion halts across warehouse facilities.',
    solution: 'Diagnosed cipher suite mismatch and label discrepancies in the CMS key database. Re-imported root and intermediate certificates without killing running queue managers, executing `runmqsc REFRESH SECURITY TYPE(SSL)` with zero service disruption.',
    architecture: [
      'Broker: IBM MQ v9.x on Enterprise Red Hat Enterprise Linux (RHEL)',
      'Security: GSKit key database (`.kdb`), CMS stashed password credentials, TLS 1.3',
      'Scripting: Production RHEL bash engines with lock-file safety (`flock`) & newline sanitization',
      'Monitoring: Prometheus MQ exporter & real-time Grafana queue depth telemetry',
      'Disaster Recovery: Active-passive multi-instance queue manager clustering',
    ],
    metrics: [
      { label: 'Downtime', value: '0 min', desc: 'Zero downtime during production certificate refresh' },
      { label: 'Data Loss', value: '0 msgs', desc: '100% persistent message integrity preserved' },
      { label: 'Triage Response', value: '<5 min', desc: 'Sub-minute automated Grafana alert dispatch' },
    ],
    codeBlock: `# Zero-downtime IBM MQ SSL refresh SOP
runmqsc QMGR01 <<EOF
DISPLAY QMGR CERTLABL
REFRESH SECURITY TYPE(SSL)
START CHANNEL(TO.WMS.TLS)
EOF`,
  },
};

interface ProjectDossierModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({ projectId, onClose }) => {
  if (!projectId) return null;
  const dossier = PROJECT_DOSSIERS[projectId];
  if (!dossier) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0b12] border border-white/15 p-6 md:p-10 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-cyan)] tracking-widest uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>CASE STUDY & ARCHITECTURE DOSSIER</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-syne text-white">
                {dossier.title}
              </h2>
              <p className="text-xs md:text-sm text-[#9496a8] font-light">
                {dossier.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dossier"
              className="p-2 rounded-2xl bg-white/5 border border-white/10 text-[#9496a8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dossier.metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-[#9496a8] uppercase">{m.label}</div>
                <div className="text-2xl font-bold font-syne text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] to-emerald-400">
                  {m.value}
                </div>
                <div className="text-xs text-[#9496a8]">{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-2">
              <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light">
                {dossier.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>The Production Solution</span>
              </div>
              <p className="text-xs md:text-sm text-white/90 leading-relaxed font-light">
                {dossier.solution}
              </p>
            </div>
          </div>

          {/* Architecture Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#e2c392] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Architecture Specifications</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {dossier.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-mono text-[#9496a8]">
                  <span className="text-[var(--accent-cyan)] font-bold">0{idx + 1}</span>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Box */}
          {dossier.codeBlock && (
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#9496a8] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production Configuration / Code Architecture</span>
              </div>
              <div className="p-4 rounded-xl bg-black/90 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre shadow-inner">
                {dossier.codeBlock}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {dossier.link ? (
              <a
                href={dossier.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] hover:underline uppercase tracking-wider"
              >
                <span>{dossier.linkText || 'View Live Platform'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="text-xs font-mono text-[#9496a8]">
                Enterprise verified architecture • High-level sanitized technical summary to comply with NDAs
              </div>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
