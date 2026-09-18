import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  testimonials?: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
  }>;
}

export const Testimonials: React.FC<TestimonialProps> = ({ testimonials = [] }) => {
  return (
    <section className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
            <Quote className="w-4 h-4 text-[#e2c392]" />
            ENDORSEMENTS & FEEDBACK
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
            Client & Executive <span className="text-gold-gradient">Testimonials.</span>
          </h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl glass-panel editorial-border space-y-6">
                <Quote className="w-8 h-8 text-[#e2c392]/60" />
                <p className="text-base text-[#f4f4f6] italic leading-relaxed font-light">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold font-syne text-white">{t.author}</div>
                  <div className="text-xs font-mono text-[#9496a8]">
                    {t.role} • {t.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl glass-panel editorial-border text-center max-w-2xl mx-auto space-y-4">
            <Quote className="w-10 h-10 text-[#e2c392]/40 mx-auto" />
            <p className="text-sm text-[#9496a8] font-light leading-relaxed">
              Verified enterprise partner testimonials and executive references available upon request during confidential engagement discussions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
