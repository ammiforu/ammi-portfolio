# Project Blueprint — 360° Enterprise Portfolio

## Overview
Luxury editorial portfolio and interactive technical showcase for Ammi Reddy Tetala.

## System Components

```
+-----------------------------------------------------------------------------+
|                                App Layout                                   |
+-----------------------------------------------------------------------------+
|  CustomCursor | Preloader | Navbar (Recruiter Toggle + 60s Brief Button) |
+-----------------------------------------------------------------------------+
|  Hero (GSAP Pinned 360° Real Photo Engine + Live Ticker + 60s Trigger)       |
+-----------------------------------------------------------------------------+
|  CommandCenterStatus (Real-Time 5-Cluster Bloomberg Terminal & Dual Clocks)  |
+-----------------------------------------------------------------------------+
|  About | Marquee | Projects (AuthPortal, YouTube AI, EDI, IBM MQ)           |
+-----------------------------------------------------------------------------+
|  Professional Journey (Timeline) | Technical Mastery (Radar + Tilt Cards)   |
+-----------------------------------------------------------------------------+
|  Services | WhyMe | Achievements & Education | Track Record & References    |
+-----------------------------------------------------------------------------+
|  MediaChannels & Live YouTube Telemetry Chart | Contact & Google Calendar   |
+-----------------------------------------------------------------------------+
|  ExecutiveBriefModal (60s Candidate Dossier Overlay)                        |
+-----------------------------------------------------------------------------+
|  AIChat (Highlighted Floating AI Clone + Serverless Proxy api/chat.ts)      |
+-----------------------------------------------------------------------------+
```

## Turntable Engine Architecture
- **Source Assets**: 32 WebP real photographic turnaround frames generated from Ammi's character reference sheet.
- **Scroll Synchronization**: Scroll progress $p \in [0, 1]$ mapped linearly to frame index $\lfloor p \times 32 \rfloor$.
- **Seamless Backdrop**: Dual-gradient radial studio lighting blending softly into `#08080a`.
- **Responsive Sizing**: 75–85% viewport height dominance with zero layout shifts.

## Advanced Interactions & Features
- **60-Second Recruiter Dossier Modal**: Instant executive cheat-sheet with target roles, team scale, verified 99.99% uptime, and one-click actions (PDF resume, Google Meet, LinkedIn, email).
- **Enterprise Command Center**: Bloomberg-style live status bar with dual real-time clocks (CT & UTC), 5 monitored enterprise clusters (IBM Sterling, IBM MQ, Manhattan WMS, AuthPortal, YouTube AI) and expandable technical specification drawers.
- **AI Chatbot**: Intelligent assistant with FAQ fast-path + serverless Gemini API proxy, highlighted by an eye-catching animated callout and bouncing arrow.
- **Direct Google Calendar Booking**: One-click 30-min conversation scheduling via `https://calendar.app.google/FkHk6NzDGzwhXEBn8`.
- **Recruiter Perspective Toggle**: Switch between "Enterprise IT Leader" and "AI Architect" perspectives in the navbar.
- **Currently Working On Live Ticker**: Real-time project activity ticker displayed below the Hero status badge.
- **Particle Background**: `react-tsparticles` constellation effect reacting to cursor.
- **Magnetic UI**: Framer Motion powered buttons that attract to cursor hover.
- **3D Tilt Cards**: Glassmorphism cards with `rotateX` and `rotateY` tracking.
- **Data Visualization**: Recharts Radar Chart for technical competencies.
- **Live YouTube Telemetry Chart**: Interactive Recharts area chart with metric toggles, synced from Google Drive JSON (`ammi_explain_daily.json` & Archive, 43 continuous daily snapshots).
- **Verified Career Timeline**: 4-role chronological progression matching resume (GEODIS IT Manager, Technical Lead, EDI Analyst, and AT&T Hadoop Administrator).
