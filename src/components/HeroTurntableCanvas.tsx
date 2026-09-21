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
  const framesRef = useRef<HTMLImageElement[]>([]);
  const totalFrames = 32;

  // Preload real 360 photo turntable frames of Ammi
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, '0');
      img.src = `/assets/turntable/frame_${frameNum}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount >= totalFrames) {
          framesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        // Even if an error happens, still track count
        loadedCount++;
        if (loadedCount >= totalFrames) {
          framesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }
  }, []);

  // Render current frame synchronized with scroll progress (0 to 1)
  useEffect(() => {
    if (!canvasRef.current || framesRef.current.length === 0 || !imagesLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Map 0 -> 1 progress seamlessly to 0 -> 31 frame index
    const normalizedProgress = ((progress % 1) + 1) % 1;
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(normalizedProgress * totalFrames)
    );

    const targetImg = framesRef.current[frameIndex];

    ctx.clearRect(0, 0, rect.width, rect.height);

    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      // Calculate aspect ratio preserving fit (75-85% height dominance)
      const imgAspect = targetImg.naturalWidth / targetImg.naturalHeight;
      let drawHeight = rect.height * 0.88;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > rect.width * 0.95) {
        drawWidth = rect.width * 0.95;
        drawHeight = drawWidth / imgAspect;
      }

      const drawX = (rect.width - drawWidth) / 2;
      const drawY = (rect.height - drawHeight) / 2;

      // Draw subtle ambient studio spotlight behind subject
      const radial = ctx.createRadialGradient(
        rect.width / 2,
        rect.height / 2,
        20,
        rect.width / 2,
        rect.height / 2,
        rect.height * 0.45
      );
      radial.addColorStop(0, 'rgba(226, 195, 146, 0.07)');
      radial.addColorStop(0.5, 'rgba(17, 17, 24, 0.3)');
      radial.addColorStop(1, 'rgba(8, 8, 10, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw real photo frame of Ammi
      ctx.drawImage(targetImg, drawX, drawY, drawWidth, drawHeight);

      // Bottom soft fade to blend cleanly into the background
      const bottomFade = ctx.createLinearGradient(
        0,
        drawY + drawHeight - 70,
        0,
        drawY + drawHeight + 5
      );
      bottomFade.addColorStop(0, 'rgba(8, 8, 10, 0)');
      bottomFade.addColorStop(1, '#08080a');
      ctx.fillStyle = bottomFade;
      ctx.fillRect(drawX - 20, drawY + drawHeight - 70, drawWidth + 40, 80);
    }

    ctx.restore();
  }, [progress, imagesLoaded]);

  return (
    <div
      aria-label="Interactive 360 Turntable Visual of Ammi Reddy Tetala"
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      data-cursor="EXPLORE 360°"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain max-h-[88vh] drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
      />
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#08080a]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#e2c392] border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-mono tracking-widest text-[#9496a8] uppercase">
              LOADING 360° ASSETS...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
