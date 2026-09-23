import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Users,
  Award,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBriefModal: React.FC<ExecutiveBriefModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040407]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#0c0d16] border border-white/15 shadow-[0_0_80px_rgba(226,195,146,0.18)] p-6 sm:p-10 space-y-7 z-10 max-h-[90vh] overflow-y-auto editorial-border"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#e2c392]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header with Close */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 relative">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e2c392]/10 border border-[#e2c392]/30 text-[#e2c392] text-[10px] font-mono font-bold tracking-widest uppercase">
                  <Sparkles className="w-3 h-3 text-[#e2c392]" />
                  <span>60-SECOND RECRUITER DOSSIER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-syne text-white flex items-center gap-2">
                  <span>Ammi Reddy Tetala</span>
                  <span className="text-xs font-mono text-emerald-400 font-normal px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#9496a8]">
                  IT Manager @ GEODIS • Supply Chain & Enterprise AI Automation Leader
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#9496a8] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-[#12131d] border border-white/5 space-y-1">
                <div className="text-[10px] text-[#9496a8] uppercase flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#e2c392]" /> Location
                </div>
                <div className="text-white font-semibold">Franklin, TN (Nashville Metro)</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131d] border border-white/5 space-y-1">
                <div className="text-[10px] text-[#9496a8] uppercase flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#00f0ff]" /> Team Scope
                </div>
                <div className="text-white font-semibold">14 Global Engineers</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131d] border border-white/5 space-y-1">
                <div className="text-[10px] text-[#9496a8] uppercase flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-400" /> Track Record
                </div>
                <div className="text-white font-semibold">99.99% Uptime</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#12131d] border border-white/5 space-y-1">
                <div className="text-[10px] text-[#9496a8] uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-purple-400" /> Availability
                </div>
                <div className="text-emerald-400 font-semibold">Open to Remote</div>
              </div>
            </div>

            {/* 4 Core Pillars */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#e2c392] tracking-wider uppercase">
                EXECUTIVE SUMMARY & CORE STRENGTHS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#10111a] border border-white/8 space-y-1.5 hover:border-[#e2c392]/30 transition-colors">
                  <div className="text-xs font-bold font-syne text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#e2c392]" />
                    <span>Global Engineering Leadership</span>
                  </div>
                  <p className="text-xs text-[#9496a8] font-light leading-relaxed">
                    Directly manages 14 enterprise engineers across the US & India covering EDI operations, WMS systems, RHEL Linux environments, and IBM MQ infrastructure.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#10111a] border border-white/8 space-y-1.5 hover:border-[#00f0ff]/30 transition-colors">
                  <div className="text-xs font-bold font-syne text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#00f0ff]" />
                    <span>Supply Chain & EDI Architecture</span>
                  </div>
                  <p className="text-xs text-[#9496a8] font-light leading-relaxed">
                    7+ years at GEODIS orchestrating IBM Sterling B2B Integrator, Manhattan Associates WMS, X12/EDIFACT transaction sets, and AS2/SFTP partner pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#10111a] border border-white/8 space-y-1.5 hover:border-emerald-500/30 transition-colors">
                  <div className="text-xs font-bold font-syne text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero-Downtime Reliability</span>
                  </div>
                  <p className="text-xs text-[#9496a8] font-light leading-relaxed">
                    Fixed IBM MQ TLS/SSL handshake failures in production without disruption; built Grafana observability reducing detection time from hours to seconds.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#10111a] border border-white/8 space-y-1.5 hover:border-purple-500/30 transition-colors">
                  <div className="text-xs font-bold font-syne text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Solo Platform Builder & AI Lead</span>
                  </div>
                  <p className="text-xs text-[#9496a8] font-light leading-relaxed">
                    Solo architect of AuthPortal (ASP.NET Core/PostgreSQL) and automated multi-channel AI content pipeline operating 10 YouTube channels with 625K+ views.
                  </p>
                </div>
              </div>
            </div>

            {/* Target Roles */}
            <div className="p-4 rounded-2xl bg-[#10111a] border border-white/8 space-y-2">
              <div className="text-[11px] font-mono text-[#9496a8] uppercase">
                TARGET ROLES & ENGAGEMENT FOCUS
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'IT Manager',
                  'Director of Enterprise Applications',
                  'Principal Integration Architect',
                  'Head of AI Automation',
                  'Supply Chain Technology Lead',
                ].map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Center Buttons */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-[#e2c392] tracking-wider uppercase">
                DIRECT EXECUTIVE ACTION CHANNELS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/assets/Ammi_Reddy_Tetala_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#e2c392] to-[#cba36b] text-[#08080a] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official PDF Resume</span>
                </a>

                <a
                  href="https://calendar.app.google/FkHk6NzDGzwhXEBn8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#039BE5] to-[#1a73e8] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(3,155,229,0.3)] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule 30-Min on Google Meet</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ammireddytetala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#12131d] border border-white/15 text-white font-medium text-xs uppercase tracking-wider hover:border-[#0077b5] hover:text-[#0077b5] transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-[#0077b5]" />
                  <span>View Verified LinkedIn Profile</span>
                </a>

                <a
                  href="mailto:ammitetala@gmail.com?subject=Executive%20Opportunity%20Discussion&body=Hi%20Ammi%2C%20we%20reviewed%20your%20executive%20dossier%20and%20would%20like%20to%20connect%20regarding%20an%20opportunity."
                  className="flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#12131d] border border-white/15 text-white font-medium text-xs uppercase tracking-wider hover:border-[#e2c392] hover:text-[#e2c392] transition-all"
                >
                  <Mail className="w-4 h-4 text-[#e2c392]" />
                  <span>Send Direct Executive Email</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#9496a8]/70 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#e2c392]" />
                  <span>Direct: +1 (925) 663-5429</span>
                </span>
                <span>Press ESC or click outside to dismiss</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
