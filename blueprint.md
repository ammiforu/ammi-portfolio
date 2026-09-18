# Project Blueprint — 360° Enterprise Portfolio

## Overview
Luxury editorial + interactive technical showcase for Ammi Reddy Tetala.

## System Components

```
+-----------------------------------------------------------------+
|                         App Layout                              |
+-----------------------------------------------------------------+
|  CustomCursor | Preloader | Navbar                              |
+-----------------------------------------------------------------+
|  Hero (GSAP Pinned ScrollTrigger 360° Turntable Canvas Engine)  |
+-----------------------------------------------------------------+
|  About | Marquee | Projects | Skills | Services | WhyMe         |
+-----------------------------------------------------------------+
|  Achievements | MediaChannels | Testimonials | Contact | Footer |
+-----------------------------------------------------------------+
```

## Turntable Engine Architecture
- **Input**: Scroll progress $p \in [0, 1]$ from GSAP ScrollTrigger.
- **Rotation Degree**: $\theta = 360 \times p^\circ$.
- **Frame Index**: $\lfloor p \times 64 \rfloor$.
- **Renderer**: Dual-buffered HTML5 Canvas with DPR auto-scaling.
