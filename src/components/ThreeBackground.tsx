import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground
 * High-performance WebGL 3D Cybernetic Constellation & Neural Wave Field
 * Built with Three.js (r186) utilizing GPU BufferGeometry, dynamic line segments,
 * smooth 3D mouse parallax, and automatic viewport culling.
 */
export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.0018);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1500);
    camera.position.z = 450;
    camera.position.y = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // --- Particle System ---
    const particleCount = 280;
    const maxDistance = 110;
    const coordsRange = { x: 700, y: 400, z: 450 };

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color Palette: Cyber Cyan (#00f0ff), Executive Gold (#e2c392), Deep Indigo (#3b82f6)
    const cyan = new THREE.Color(0x00f0ff);
    const gold = new THREE.Color(0xe2c392);
    const blue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * coordsRange.x;
      const y = (Math.random() - 0.5) * coordsRange.y;
      const z = (Math.random() - 0.5) * coordsRange.z;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.35;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.35;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.25;

      // Color distribution: 60% Cyan, 25% Gold, 15% Deep Blue
      const rand = Math.random();
      const chosenColor = rand > 0.4 ? cyan : rand > 0.15 ? gold : blue;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle point sprite texture generated programmatically
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const pointTexture = createCircleTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: pointTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Dynamic Dynamic Line Constellations ---
    const maxLineSegments = particleCount * 6;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // --- 3D Geometric Wave Grid Plane on Floor ---
    const gridHelper = new THREE.GridHelper(900, 30, 0x00f0ff, 0x1a2138);
    gridHelper.position.y = -180;
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.18;
    gridMat.blending = THREE.AdditiveBlending;
    scene.add(gridHelper);

    // --- Mouse Parallax Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.25;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // --- Responsive Resize ---
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- Visibility & Intersection Management (Zero GPU waste when offscreen) ---
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // --- Animation Loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth Camera Parallax Lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = -targetY + 20;
      camera.lookAt(0, 0, 0);

      // Rotate Floor Grid slowly
      gridHelper.rotation.y = time * 0.02;

      // Update Particle Positions & Calculate Constellation Lines
      let lineVertexIndex = 0;
      let lineSegmentCount = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Wave oscillation + velocity
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1] + Math.sin(time * 0.8 + positions[i3] * 0.01) * 0.15;
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary Bounce
        if (Math.abs(positions[i3]) > coordsRange.x / 2) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > coordsRange.y / 2) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > coordsRange.z / 2) velocities[i3 + 2] *= -1;

        // Connect nearby particles with lines
        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance && lineSegmentCount < maxLineSegments) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxDistance;

            // Start Vertex
            linePositions[lineVertexIndex] = positions[i3];
            linePositions[lineVertexIndex + 1] = positions[i3 + 1];
            linePositions[lineVertexIndex + 2] = positions[i3 + 2];

            lineColors[lineVertexIndex] = colors[i3] * alpha;
            lineColors[lineVertexIndex + 1] = colors[i3 + 1] * alpha;
            lineColors[lineVertexIndex + 2] = colors[i3 + 2] * alpha;
            lineVertexIndex += 3;

            // End Vertex
            linePositions[lineVertexIndex] = positions[j3];
            linePositions[lineVertexIndex + 1] = positions[j3 + 1];
            linePositions[lineVertexIndex + 2] = positions[j3 + 2];

            lineColors[lineVertexIndex] = colors[j3] * alpha;
            lineColors[lineVertexIndex + 1] = colors[j3 + 1] * alpha;
            lineColors[lineVertexIndex + 2] = colors[j3 + 2] * alpha;
            lineVertexIndex += 3;

            lineSegmentCount++;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      // Update lines count
      lineGeometry.setDrawRange(0, lineSegmentCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup Lifecycle ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();

      // Dispose Three.js WebGL objects
      particleGeometry.dispose();
      particleMaterial.dispose();
      pointTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((m) => m.dispose());
      } else {
        gridHelper.material.dispose();
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
};
