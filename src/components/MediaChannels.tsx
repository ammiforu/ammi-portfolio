import React from 'react';
import { Globe, Brain, Video } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export const MediaChannels: React.FC = () => {
  const channels = [
    {
      handle: '@ViswaDarshiniUsa',
      title: 'Viswa Darshini USA',
      niche: 'Global Technology, USA Life & Industry Insights',
      subscribers: 'Active Community',
      icon: <Globe className="w-6 h-6 text-[#e2c392]" />,
      link: 'https://youtube.com/@ViswaDarshiniUsa',
    },
    {
      handle: 'AMMI EXPLAIN',
      title: 'AMMI EXPLAIN',
      niche: 'Human Psychology, Complex Systems & Tech Deep Dives',
      subscribers: 'Growing Audience',
      icon: <Brain className="w-6 h-6 text-[#e2c392]" />,
      link: 'https://youtube.com',
    },
  ];

  return (
    <section id="content" className="py-24 bg-[#08080a] text-[#f4f4f6] px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#e2c392] tracking-widest uppercase">
              <YoutubeIcon className="w-4 h-4 text-[#e2c392]" />
              MEDIA & CONTENT ECOSYSTEM
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight text-white">
              Creating beyond <span className="text-gold-gradient">the terminal.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9496a8] max-w-md font-light">
            Architecting automated digital media networks that distill complex technological concepts, human behavior, and global perspectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {channels.map((ch, idx) => (
            <a
              key={idx}
              href={ch.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WATCH"
              className="group p-8 rounded-3xl glass-panel editorial-border space-y-6 block hover:border-[#e2c392]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-[#171720] border border-white/10 group-hover:bg-[#e2c392] group-hover:text-[#08080a] transition-colors">
                  {ch.icon}
                </div>
                <span className="text-xs font-mono text-[#e2c392] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {ch.handle}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-syne text-white group-hover:text-[#e2c392] transition-colors">
                  {ch.title}
                </h3>
                <p className="text-xs md:text-sm text-[#9496a8] font-light leading-relaxed">
                  {ch.niche}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9496a8]">
                <span>TELUGU LANGUAGE NETWORK</span>
                <span className="text-[#e2c392] flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> EXPLORE CHANNEL →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
