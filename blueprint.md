# Project Blueprint — 360° Enterprise Portfolio

## Overview
Luxury editorial portfolio and interactive technical showcase for Ammi Reddy Tetala.

## System Components

```
+-----------------------------------------------------------------------------+
|                                App Layout                                   |
+-----------------------------------------------------------------------------+
|  CustomCursor | Preloader | Navbar                                          |
+-----------------------------------------------------------------------------+
|  Hero (GSAP Pinned ScrollTrigger 360° Real Photo Turntable Canvas Engine)   |
+-----------------------------------------------------------------------------+
|  About | Marquee | Projects (AuthPortal, YouTube AI, EDI, IBM MQ) | Skills  |
+-----------------------------------------------------------------------------+
|  Services | WhyMe | Achievements & Education | MediaChannels | Contact      |
+-----------------------------------------------------------------------------+
```

## Turntable Engine Architecture
- **Source Assets**: 32 WebP real photographic turnaround frames generated from Ammi's character reference sheet.
- **Scroll Synchronization**: Scroll progress $p \in [0, 1]$ mapped linearly to frame index $\lfloor p \times 32 \rfloor$.
- **Seamless Backdrop**: Dual-gradient radial studio lighting blending softly into `#08080a`.
- **Responsive Sizing**: 75–85% viewport height dominance with zero layout shifts.
