# Project Blueprint — 360° Enterprise Portfolio

## Overview
Luxury editorial portfolio and interactive technical showcase for Ammi Reddy Tetala.

## System Components

```
+-----------------------------------------------------------------------------+
|                                App Layout                                   |
+-----------------------------------------------------------------------------+
|  CustomCursor | Preloader | Navbar (Recruiter Mode Toggle)               |
+-----------------------------------------------------------------------------+
|  Hero (GSAP Pinned 360° Real Photo Engine + Live Ticker + Particle Canvas)  |
+-----------------------------------------------------------------------------+
|  About | Marquee | Projects (AuthPortal, YouTube AI, EDI, IBM MQ)           |
+-----------------------------------------------------------------------------+
|  Professional Journey (Timeline) | Technical Mastery (Radar + Tilt Cards)   |
+-----------------------------------------------------------------------------+
|  Services | WhyMe | Achievements & Education | Track Record & References    |
+-----------------------------------------------------------------------------+
|  MediaChannels | Contact (Web3Forms + Google Calendar Appointment Booking)  |
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
- **AI Chatbot**: Intelligent assistant with FAQ fast-path + serverless Gemini API proxy, highlighted by an eye-catching animated callout and bouncing arrow.
- **Direct Google Calendar Booking**: One-click 30-min conversation scheduling via `https://calendar.app.google/FkHk6NzDGzwhXEBn8`.
- **Recruiter Perspective Toggle**: Switch between "Enterprise IT Leader" and "AI Architect" perspectives in the navbar.
- **Currently Working On Live Ticker**: Real-time project activity ticker displayed below the Hero status badge.
- **Particle Background**: `react-tsparticles` constellation effect reacting to cursor.
- **Magnetic UI**: Framer Motion powered buttons that attract to cursor hover.
- **3D Tilt Cards**: Glassmorphism cards with `rotateX` and `rotateY` tracking.
- **Data Visualization**: Recharts Radar Chart for technical competencies.
- **Live YouTube Data**: Automated counter integrated with real channel statistics.
