import React, { useEffect, useRef, useState } from 'react';

interface HeroTurntableCanvasProps {
  progress: number; // Scroll progress 0 to 1
  className?: string;
}

export const HeroTurntableCanvas: React.FC<HeroTurntableCanvasProps> = ({
  progress,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLCanvasElement[]>([]);
  const totalFrames = 64;

  // Generate 64 procedural high-fidelity 360 degree turntable frames of the subject
  useEffect(() => {
    const frames: HTMLCanvasElement[] = [];
    const width = 1000;
    const height = 1200;

    for (let i = 0; i < totalFrames; i++) {
      const angle = (i / totalFrames) * Math.PI * 2;
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext('2d');

      if (ctx) {
        // Deep editorial dark studio backdrop
        const bgGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          100,
          width / 2,
          height / 2,
          700
        );
        bgGrad.addColorStop(0, '#161622');
        bgGrad.addColorStop(0.5, '#0c0c12');
        bgGrad.addColorStop(1, '#08080a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Calculate rotation projection
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        ctx.save();
        ctx.translate(width / 2, height / 2);

        // Soft studio shadow beneath subject
        ctx.beginPath();
        ctx.ellipse(0, 480, 220, 40, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fill();

        // High-Fashion Editorial Lighting & Rim Gold Accent
        const rimGold = ctx.createLinearGradient(-300, -400, 300, 400);
        rimGold.addColorStop(0, 'rgba(226, 195, 146, 0.4)');
        rimGold.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        rimGold.addColorStop(1, 'rgba(15, 15, 20, 0.9)');

        // Upper Body & Torso Silhouette (75-85% height dominance)
        const torsoWidth = 240 + Math.abs(cosA) * 60;

        ctx.beginPath();
        // Shoulders & Suit Jacket
        ctx.moveTo(-torsoWidth, 450);
        ctx.lineTo(-torsoWidth * 0.9, 120);
        ctx.quadraticCurveTo(-torsoWidth * 0.7, 50, -90, 40);
        ctx.lineTo(-60, 20); // Neck base left
        ctx.lineTo(60, 20); // Neck base right
        ctx.quadraticCurveTo(torsoWidth * 0.7, 50, torsoWidth * 0.9, 120);
        ctx.lineTo(torsoWidth, 450);
        ctx.closePath();

        // Suit Jacket Gradient Fill
        const suitGrad = ctx.createLinearGradient(-torsoWidth, -100, torsoWidth, 450);
        suitGrad.addColorStop(0, '#1e1e28');
        suitGrad.addColorStop(0.4, '#121218');
        suitGrad.addColorStop(1, '#0a0a0e');
        ctx.fillStyle = suitGrad;
        ctx.fill();

        // Suit lapel & collar lines
        ctx.beginPath();
        ctx.moveTo(-60, 20);
        ctx.lineTo(0, 180 + cosA * 20);
        ctx.lineTo(60, 20);
        ctx.strokeStyle = 'rgba(226, 195, 146, 0.3)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Inner shirt/dress collar
        ctx.beginPath();
        ctx.moveTo(-35, 25);
        ctx.lineTo(0, 120);
        ctx.lineTo(35, 25);
        ctx.fillStyle = '#f4f4f6';
        ctx.fill();

        // Tie / Accent
        ctx.beginPath();
        ctx.moveTo(-12, 50);
        ctx.lineTo(12, 50);
        ctx.lineTo(15, 300);
        ctx.lineTo(0, 330);
        ctx.lineTo(-15, 300);
        ctx.closePath();
        ctx.fillStyle = '#e2c392';
        ctx.fill();

        // Neck
        ctx.fillStyle = '#d8ab82';
        ctx.fillRect(-35, -50, 70, 75);

        // Head / Facial Structure (Ammi - Sharp Executive Portrait)
        const headWidth = 110;
        const headHeight = 150;
        const headY = -120;

        ctx.save();
        ctx.translate(sinA * 15, headY);

        // Head Base
        ctx.beginPath();
        ctx.ellipse(0, 0, headWidth, headHeight, 0, 0, Math.PI * 2);
        const skinGrad = ctx.createRadialGradient(-20 * sinA, -20, 10, 0, 0, 150);
        skinGrad.addColorStop(0, '#e5bb94');
        skinGrad.addColorStop(0.7, '#cc9c74');
        skinGrad.addColorStop(1, '#8c6444');
        ctx.fillStyle = skinGrad;
        ctx.fill();

        // Hair / Grooming (Dark styled hair with Executive cut)
        ctx.beginPath();
        ctx.ellipse(0, -35, headWidth + 4, headHeight * 0.7, 0, Math.PI, Math.PI * 2);
        ctx.fillStyle = '#111116';
        ctx.fill();

        // Facial Features Orientation depending on rotational angle
        if (cosA > -0.2) {
          // Front & 3/4 Facing Facial Features
          const faceOffsetX = sinA * 50;

          // Eyes / Glasses (Sleek Modern Frames)
          ctx.strokeStyle = '#1a1a24';
          ctx.lineWidth = 4;
          // Left Lens
          ctx.strokeRect(-45 + faceOffsetX * 0.5, -20, 35, 22);
          // Right Lens
          ctx.strokeRect(10 + faceOffsetX * 0.5, -20, 35, 22);
          // Bridge
          ctx.beginPath();
          ctx.moveTo(-10 + faceOffsetX * 0.5, -10);
          ctx.lineTo(10 + faceOffsetX * 0.5, -10);
          ctx.stroke();

          // Beard / Jawline definition
          ctx.beginPath();
          ctx.arc(faceOffsetX * 0.5, 30, 65, 0.2 * Math.PI, 0.8 * Math.PI);
          ctx.strokeStyle = 'rgba(30, 25, 20, 0.6)';
          ctx.lineWidth = 8;
          ctx.stroke();

          // Nose Line
          ctx.beginPath();
          ctx.moveTo(faceOffsetX * 0.6, -10);
          ctx.lineTo(faceOffsetX * 0.7, 10);
          ctx.lineTo(-5 + faceOffsetX * 0.7, 15);
          ctx.strokeStyle = '#a87954';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Confident Editorial Expression Lips
          ctx.beginPath();
          ctx.moveTo(-18 + faceOffsetX * 0.5, 45);
          ctx.quadraticCurveTo(faceOffsetX * 0.5, 48, 18 + faceOffsetX * 0.5, 45);
          ctx.strokeStyle = '#a36d4b';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          // Rear facing hair details
          ctx.beginPath();
          ctx.ellipse(0, 0, headWidth + 2, headHeight + 2, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#16161c';
          ctx.fill();
        }

        ctx.restore();

        // Subtle Gold Hologram Grid Ambient Overlay
        ctx.strokeStyle = 'rgba(226, 195, 146, 0.04)';
        ctx.lineWidth = 1;
        for (let gridX = -width / 2; gridX < width / 2; gridX += 60) {
          ctx.beginPath();
          ctx.moveTo(gridX, -height / 2);
          ctx.lineTo(gridX, height / 2);
          ctx.stroke();
        }

        ctx.restore();
      }

      frames.push(offscreen);
    }

    imagesRef.current = frames;
    setImagesLoaded(true);
  }, []);

  // Render current frame synchronized with scroll progress (0 to 1)
  useEffect(() => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Standardize canvas dimensions for retina display
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Map 0 -> 1 progress smoothly to 0 -> 63 frame index
    const normalizedProgress = ((progress % 1) + 1) % 1; // Ensure smooth 0..1 loop
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(normalizedProgress * totalFrames)
    );

    const targetFrame = imagesRef.current[frameIndex];
    if (targetFrame) {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(targetFrame, 0, 0, rect.width, rect.height);
    }
  }, [progress, imagesLoaded]);

  return (
    <div
      aria-label="Interactive 360 Turntable Visual of Ammi Reddy Tetala"
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      data-cursor="EXPLORE 360°"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain max-h-[85vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
      />
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#08080a]">
          <div className="w-8 h-8 border-2 border-[#e2c392] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
