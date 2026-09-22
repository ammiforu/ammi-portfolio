import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './Icons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    
    if (!accessKey || accessKey === 'your_key_here') {
      alert("Form is not configured yet! Please add your VITE_WEB3FORMS_KEY to the .env file.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        alert("Something went wrong submitting the form.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please check your connection.");
    }
  };

  return (
    <section id="contact" className="py-28 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Text & Verified Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e2c392]" />
                DIRECT CONTACT & CONNECTIVITY
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white leading-tight">
                Have an integration <br />
                challenge? <span className="text-gold-gradient">Let's solve it.</span>
              </h2>
              <p className="text-sm md:text-base text-[#9496a8] font-light leading-relaxed">
                Whether you are looking to optimize enterprise EDI supply chain transactions, architect a custom local AI cluster, or discuss remote leadership opportunities, reach out directly.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-3 pt-2">
              <a
                href="mailto:ammitetala@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">PRIMARY EMAIL</div>
                  <div className="text-sm font-bold font-syne text-white">ammitetala@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+19256635429"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors"
              >
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">DIRECT PHONE</div>
                  <div className="text-sm font-bold font-syne text-white">+1 (925) 663-5429</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel editorial-border">
                <div className="p-3 rounded-xl bg-[#171720] text-[#e2c392]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#9496a8]">LOCATION & AVAILABILITY</div>
                  <div className="text-sm font-bold font-syne text-white">Spring Hill, TN (Open to Remote)</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/ammireddytetala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <LinkedinIcon className="w-5 h-5 text-[#e2c392] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-mono text-[#9496a8]">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/ammiforu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <GithubIcon className="w-5 h-5 text-[#e2c392] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-mono text-[#9496a8]">GitHub</span>
                </a>

                <a
                  href="https://www.youtube.com/@ammiexplains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass-panel editorial-border hover:border-[#e2c392]/40 transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <YoutubeIcon className="w-5 h-5 text-[#e2c392] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-mono text-[#9496a8]">YouTube</span>
                </a>
              </div>
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
                    placeholder="Jane Doe"
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
                    placeholder="jane@enterprise.com"
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
                  placeholder="EDI Optimization / AI Automation Inquiry"
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
                  placeholder="Tell me about your architectural or operational requirements..."
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
                    <span>MESSAGE TRANSMITTED SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>START A CONVERSATION</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Google Calendar Appointment Booking ── */}
        <div className="mt-14 p-8 md:p-12 rounded-3xl glass-panel editorial-border space-y-6 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-[#039BE5]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-[#e2c392]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            PREFER A DIRECT CONVERSATION?
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold font-syne text-white">
            Book a 30-min call — no sales pitch.
          </h3>
          
          <p className="text-sm md:text-base text-[#9496a8] max-w-2xl mx-auto font-light leading-relaxed">
            Directly schedule time on my Google Calendar. Ideal for discussing enterprise architecture, EDI modernization, AI integration scopes, or leadership opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="https://calendar.app.google/FkHk6NzDGzwhXEBn8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#039BE5] to-[#1a73e8] text-white text-xs font-bold tracking-widest uppercase hover:brightness-110 shadow-[0_0_25px_rgba(3,155,229,0.35)] transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment on Google Calendar</span>
            </a>
          </div>
          
          <p className="text-[11px] font-mono text-[#9496a8]/70">
            Instant Google Calendar booking · Real-time availability · Automatic Google Meet invite
          </p>
        </div>
      </div>
    </section>
  );
};

