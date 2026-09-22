import React from 'react';
import { Globe, Brain, Video, Sparkles, CheckCircle2 } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const MediaChannels: React.FC = () => {
  const channels = [
    {
      handle: '@ammiexplains',
      title: 'AMMI EXPLAIN',
      tagline: 'Real Topics | Simple Explanations | A Brighter Tomorrow',
      niche: 'Human Psychology, Tech Deep Dives, Systems Thinking & Global Affairs',
      stats: 'Core Flagship Channel',
      desc: 'Powered by a solo-built automated pipeline. Scripting, AI generation, audio synthesis, and automated thumbnail creation all running via self-hosted FastAPI proxy.',
      icon: <Brain className="w-6 h-6 text-[#e2c392]" />,
      link: 'https://www.youtube.com/@ammiexplains',
      img: '/assets/ammi/projects_youtube_ai.jpg',
      featured: true,
    },
    {
      handle: '@ViswaDarshiniUsa',
      title: 'Viswa Darshini USA',
      tagline: 'Global Perspectives & USA Life',
      niche: 'Technology Architecture, Immigrant Career Growth & Industry Insights',
      stats: 'Telugu Language Network',
      desc: 'Targeted content delivering high-value technical frameworks, IT leadership coaching, and real-world enterprise engineering experiences.',
      icon: <Globe className="w-6 h-6 text-[#e2c392]" />,
      link: 'https://www.youtube.com/@ViswaDarshiniUsa',
      img: '/assets/ammi/media_viswa_ai.jpg',
      featured: false,
    },
  ];

  return (
    <section id="content" className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <YoutubeIcon className="w-4 h-4 text-[#e2c392]" />
              MEDIA HOLDING NETWORK & AUTOMATION
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Creating beyond <span className="text-gold-gradient">the terminal.</span>
            </h2>
          </div>
          <div className="text-xs md:text-sm text-[#9496a8] max-w-md font-light space-y-1">
            <p>
              Operating an automated digital media holding network of <span className="text-white font-medium">10 YouTube channels</span> across multiple Google accounts, generating attention and syndicating technical knowledge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WATCH"
              className="group relative p-8 md:p-10 rounded-3xl glass-panel editorial-border space-y-6 block hover:border-[#e2c392]/50 transition-all duration-300 overflow-hidden"
            >
              {ch.featured && (
                <div className="absolute top-0 right-0 bg-[#e2c392] text-[#08080a] font-mono text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> OFFICIAL CREATOR CHANNEL
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-[#171720] shrink-0">
                    <img
                      src={ch.img}
                      alt={ch.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#e2c392]">{ch.handle}</span>
                    <h3 className="text-2xl font-bold font-syne text-white group-hover:text-[#e2c392] transition-colors">
                      {ch.title}
                    </h3>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#171720] border border-white/10 group-hover:bg-[#e2c392] group-hover:text-[#08080a] transition-colors">
                  <YoutubeIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-[#e2c392]/90 italic">
                  "{ch.tagline}"
                </div>
                <p className="text-xs md:text-sm text-[#9496a8] font-light leading-relaxed">
                  {ch.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9496a8]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {ch.stats}
                </span>
                <span className="text-[#e2c392] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <Video className="w-3.5 h-3.5" /> WATCH ON YOUTUBE →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
