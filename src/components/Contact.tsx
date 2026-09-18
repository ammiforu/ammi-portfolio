import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Text & Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
                GET IN TOUCH
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
                Have an integration <br />
                challenge? <span className="text-gold-gradient">Let's solve it.</span>
              </h2>
              <p className="text-sm md:text-base text-[#9496a8] font-light leading-relaxed">
                Whether you need an enterprise data flow optimized, an automated AI workflow built, or infrastructure scaled, let's connect.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-4">
              <a
                href="mailto:ammiforu@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">EMAIL DIRECT</div>
                  <div className="text-sm font-bold font-syne text-white">ammiforu@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/ammiforu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">GITHUB REPOSITORIES</div>
                  <div className="text-sm font-bold font-syne text-white">github.com/ammiforu</div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">LINKEDIN PROFILE</div>
                  <div className="text-sm font-bold font-syne text-white">Ammi Reddy Tetala</div>
                </div>
              </a>

              <a
                href="https://youtube.com/@ViswaDarshiniUsa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <YoutubeIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">YOUTUBE NETWORK</div>
                  <div className="text-sm font-bold font-syne text-white">@ViswaDarshiniUsa</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-12 rounded-3xl glass-panel editorial-border space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9496a8] uppercase">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111116] border border-white/10 text-sm text-white focus:outline-none focus:border-[#e2c392] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#9496a8] uppercase">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    placeholder="john@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#111116] border border-white/10 text-sm text-white focus:outline-none focus:border-[#e2c392] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-[#9496a8] uppercase">SUBJECT</label>
                <input
                  type="text"
                  required
                  placeholder="Enterprise Integration / AI Architecture Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111116] border border-white/10 text-sm text-white focus:outline-none focus:border-[#e2c392] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-[#9496a8] uppercase">MESSAGE</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell me about your project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#111116] border border-white/10 text-sm text-white focus:outline-none focus:border-[#e2c392] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="SEND"
                className="w-full py-4 rounded-xl bg-[#e2c392] text-[#08080a] font-bold text-xs uppercase tracking-widest hover:bg-[#f5d79e] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-950" />
                    <span>MESSAGE SENT SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
