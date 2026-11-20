# Project Context: Premium 360° Portfolio

## Identity & Role
- **Subject**: Ammi Reddy Tetala
- **Title**: IT Manager | Supply Chain & Logistics Technology | Enterprise Systems & AI Architect
- **Experience**: 13+ years in enterprise IT infrastructure & systems architecture, including 7+ years leading logistics technology at GEODIS
- **Location**: Franklin, TN (Greater Nashville Metro • Open to Remote)
- **Email**: ammitetala@gmail.com | Phone: +1 (925) 663-5429
- **LinkedIn**: https://www.linkedin.com/in/ammireddytetala/
- **GitHub**: https://github.com/ammiforu
- **YouTube Flagship**: https://www.youtube.com/@ammiexplains (AMMI EXPLAIN)
- **Google Calendar Booking**: https://calendar.app.google/FkHk6NzDGzwhXEBn8
- **Digital Media Holding Asset**: Automated 10-channel YouTube network

## Key Stack & Architecture
- **Vite + React 19 + TypeScript + Tailwind CSS v4**
- **Three.js (r186) + WebGL GPU Acceleration**
- **GSAP + ScrollTrigger + Lenis Smooth Scroll**
- **Vercel Web Analytics**: `@vercel/analytics/react` for silent real-time visitor telemetry
- **360° Hero Turntable Engine**: 32 high-resolution WebP frames extracted and rendered from Ammi's real photographic turnaround reference sheet
- **Serverless AI Proxy**: `api/chat.ts` (Vercel Serverless Function) keeping `GEMINI_API_KEY` secure server-side
- **Components**:
  - `Hero.tsx`: Pinned ScrollTrigger 360° rotation centerpiece, streamlined CTAs, Executive Audio Player, LiveTicker & 60s Brief trigger
  - `ThreeBackground.tsx`: GPU-accelerated Three.js WebGL 3D cybernetic constellation and wave field with dynamic lines and mouse parallax
  - `GlobalArchitectureGlobe.tsx`: Interactive Three.js 3D supply chain & B2B integration globe connecting Franklin HQ, India team, and global partner hubs with live incident-reactive photon packet arcs
  - `SystemArchitecture.tsx`: Interactive Enterprise Topology & Incident Simulator integrated with 3D Global Architecture Globe, covering 500+ Trading Partners, IBM Sterling B2B, IBM MQ, Manhattan WMS, and UIP
  - `EnterpriseCalculator.tsx`: Real-time interactive slider quantifying engineering hours saved (70% triage cut) and dollar value delivered with Google Calendar strategy booking
  - `Skills.tsx`: Verified competencies: EDI (X12/EDIFACT), IBM MQ, Python, Bash, ASP.NET Core, Hadoop, Linux, Grafana
  - `Services.tsx`: Client-focused enterprise architecture & automation offerings
  - `Journey.tsx`: Accurate chronological timeline matching resume (GEODIS IT Manager, Technical Lead, EDI Analyst, and AT&T Hadoop Engineer)
  - `Achievements.tsx`: Milestones (MQ TLS recovery, BizManager upgrades, Grafana rollout, Hadoop at AT&T) & Degrees (MS Information Systems Security, MS CS, BS CS)
  - `Testimonials.tsx`: Honest track record & enterprise references on request + verified LinkedIn connect CTA
  - `MediaChannels.tsx`: YouTube Flagship channel @ammiexplains, @ViswaDarshiniUsa, and embedded live telemetry
  - `YouTubeAnalyticsChart.tsx`: Interactive Recharts telemetry chart synced from cloud pipeline (80 daily snapshots tracking 685K+ views, 1,720+ subscribers, velocity, watch hours)
  - `Contact.tsx`: Direct email, phone, canonical LinkedIn, GitHub, YouTube, inquiry form, and instant Google Calendar Appointment Scheduling
  - `CustomCursor.tsx`: Smooth follower with VIEW/EXPLORE expansion

## Automation & Sync Pipeline
- `api/youtube-stats.ts`: Vercel Serverless Function caching live YouTube Data API statistics (with 30-min CDN edge caching) and local snapshot fallback
- `scripts/sync_youtube_analytics.py`: Syncs daily analytics and archive history from `G:\My Drive\Ammi Explains\Analytics\` and local `YoutubeAutomation/output/` into `public/analytics/`, with `--auto-push` to git & Vercel
- `scripts/sync_analytics.ps1`: One-command automated sync, commit, and push pipeline
- `scripts/setup_windows_sync_task.ps1`: Configures resilient daily Windows Scheduled Task (`AmmiPortfolio-YouTubeSync` at 07:15 AM)
- `YoutubeAutomation` Scheduler Hook: Connected to APScheduler in `app/services/auditor/scheduler.py` to auto-trigger portfolio sync immediately after 06:30 ET report generation

## Verification Status
- Production Build: `npm run build` PASS (0 errors, 0 warnings).
- YouTube Telemetry Sync: PASS (80 snapshots, 685,036 views, 1,720 subscribers automatically committed and pushed to GitHub origin master).
- Windows Scheduled Task: PASS (`AmmiPortfolio-YouTubeSync` scheduled daily at 07:15 AM).
