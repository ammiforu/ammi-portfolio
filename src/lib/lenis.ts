import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let lockCount = 0;

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  return lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Completely freeze window and Lenis scrolling while a modal/popup is open
 */
export function lockScroll(): () => void {
  lockCount++;

  if (lockCount === 1) {
    if (lenisInstance) {
      lenisInstance.stop();
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (lenisInstance) {
        lenisInstance.start();
      }
    }
  };
}
