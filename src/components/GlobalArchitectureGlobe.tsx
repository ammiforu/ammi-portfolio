import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlobalArchitectureGlobeProps {
  scenario?: 'nominal' | 'mq_tls' | 'asn_discrepancy' | 'peak_surge';
  onSelectHub?: (hubName: string) => void;
}

interface HubInfo {
  name: string;
  role: string;
  location: string;
  lat: number;
  lon: number;
  color: number;
  highlightColor: string;
  protocol: string;
  volume: string;
}

const HUBS: HubInfo[] = [
  {
    name: 'Franklin, TN (HQ Core)',
    role: 'Central Enterprise B2B & MQ Gateway',
    location: 'Franklin, TN (USA)',
    lat: 35.9251,
    lon: -86.8689,
    color: 0x00f0ff,
    highlightColor: '#00f0ff',
    protocol: 'IBM Sterling SI / IBM MQ v9.x',
    volume: 'Primary Core (500+ Partners)',
  },
  {
    name: 'Hyderabad & Chennai (Global Team)',
    role: '14-Person Global IT Engineering Hub',
    location: 'India',
    lat: 17.385,
    lon: 78.4867,
    color: 0xe2c392,
    highlightColor: '#e2c392',
    protocol: 'UIP Telemetry / On-Call Ops',
    volume: '24/7 Monitoring & Support',
  },
  {
    name: 'Rotterdam & Frankfurt (EU Gateway)',
    role: 'Tier-1 European Logistics Exchange',
    location: 'Europe',
    lat: 51.9244,
    lon: 4.4777,
    color: 0x3b82f6,
    highlightColor: '#3b82f6',
    protocol: 'EDIFACT / AS2 Secure Pipelines',
    volume: '150+ European Suppliers',
  },
  {
    name: 'Long Beach & Oakland (West Coast)',
    role: 'Maritime Import & Rail Ingestion Corridor',
    location: 'California (USA)',
    lat: 33.7701,
    lon: -118.1937,
    color: 0x10b981,
    highlightColor: '#10b981',
    protocol: 'Inbound 850 PO / 856 ASN Dispatch',
    volume: '2M+ Units Monthly Throughput',
  },
  {
    name: 'Chicago & Midwest (Retail Rail Core)',
    role: 'Tier-1 Big-Box Distribution & WMS Core',
    location: 'Illinois (USA)',
    lat: 41.8781,
    lon: -87.6298,
    color: 0xa855f7,
    highlightColor: '#a855f7',
    protocol: 'Manhattan WMS / Oracle / 856 ASN',
    volume: 'High-Velocity Cross-Docking',
  },
  {
    name: 'APAC Ingestion (Singapore/Tokyo)',
    role: 'Global Manufacturing & OEM Feeds',
    location: 'Asia-Pacific',
    lat: 1.3521,
    lon: 103.8198,
    color: 0xf59e0b,
    highlightColor: '#f59e0b',
    protocol: 'AS2 / HTTPS REST / EDI X12',
    volume: 'Critical Component Pipelines',
  },
];

// Helper to convert Lat/Lon to 3D Cartesian coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const GlobalArchitectureGlobe: React.FC<GlobalArchitectureGlobeProps> = ({
  scenario = 'nominal',
  onSelectHub,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeHub, setActiveHub] = useState<HubInfo>(HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState<HubInfo | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 270;
    camera.position.y = 35;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // --- Globe Group ---
    const globeGroup = new THREE.Group();
    // Tilt the globe naturally like Earth (23.5 deg)
    globeGroup.rotation.z = (23.5 * Math.PI) / 180;
    // Initial rotation to face Americas & Atlantic
    globeGroup.rotation.y = 1.1;
    scene.add(globeGroup);

    const globeRadius = 90;

    // 1. Dark Core Sphere
    const coreGeo = new THREE.SphereGeometry(globeRadius - 0.5, 48, 48);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x05060b,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Wireframe / Latitude-Longitude Grid Sphere
    const wireGeo = new THREE.SphereGeometry(globeRadius, 32, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x14213d,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // 3. Glowing Atmosphere Halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.05, 36, 36);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: false,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 4. Outer Equator & Orbit Data Rings
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.25, globeRadius * 1.255, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    globeGroup.add(ringMesh);

    // 5. Hub Pins & Pulse Markers
    const hqHub = HUBS[0];
    const hqPos = latLonToVector3(hqHub.lat, hqHub.lon, globeRadius);

    const hubPoints: { hub: HubInfo; position: THREE.Vector3; mesh: THREE.Mesh }[] = [];
    const pulseMeshes: THREE.Mesh[] = [];

    HUBS.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, globeRadius);

      // Hub node sphere
      const isHQ = hub === hqHub;
      const pinGeo = new THREE.SphereGeometry(isHQ ? 3.0 : 2.0, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: hub.color,
        blending: THREE.AdditiveBlending,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      globeGroup.add(pinMesh);

      // Pulse ring for each hub
      const pulseGeo = new THREE.RingGeometry(isHQ ? 3.5 : 2.5, isHQ ? 5.5 : 4.0, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: hub.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(pos);
      pulseMesh.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(pulseMesh);
      pulseMeshes.push(pulseMesh);

      hubPoints.push({ hub, position: pos, mesh: pinMesh });
    });

    // 6. 3D Quadratic Bezier Arcs to HQ (Franklin, TN)
    interface ArcData {
      curve: THREE.QuadraticBezierCurve3;
      hub: HubInfo;
      lineMesh: THREE.Line;
      packets: { mesh: THREE.Mesh; progress: number; speed: number }[];
    }

    const arcs: ArcData[] = [];

    HUBS.slice(1).forEach((hub) => {
      const start = latLonToVector3(hub.lat, hub.lon, globeRadius);
      const end = hqPos;

      // Calculate midpoint elevated outward into 3D space
      const mid = start.clone().lerp(end, 0.5);
      const distance = start.distanceTo(end);
      const altitude = globeRadius + distance * 0.35;
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const curveMat = new THREE.LineBasicMaterial({
        color: hub.color,
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending,
      });

      const lineMesh = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(lineMesh);

      // Create glowing data packets flowing along the curve
      const packetCount = 3;
      const packets: { mesh: THREE.Mesh; progress: number; speed: number }[] = [];

      for (let p = 0; p < packetCount; p++) {
        const pGeo = new THREE.SphereGeometry(1.4, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({
          color: hub.color,
          blending: THREE.AdditiveBlending,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        globeGroup.add(pMesh);

        packets.push({
          mesh: pMesh,
          progress: p / packetCount,
          speed: 0.0035 + Math.random() * 0.0015,
        });
      }

      arcs.push({ curve, hub, lineMesh, packets });
    });

    // --- Interactive Mouse Drag / Orbit ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0.002 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        globeGroup.rotation.y += deltaX * 0.005;
        globeGroup.rotation.x += deltaY * 0.005;

        // Dampen tilt to stay natural
        globeGroup.rotation.x = Math.max(-0.5, Math.min(0.5, globeGroup.rotation.x));

        rotationVelocity = { x: deltaY * 0.001, y: deltaX * 0.001 };
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // Raycasting for Hub Hover
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const targets = hubPoints.map((hp) => hp.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const match = hubPoints.find((hp) => hp.mesh === hitMesh);
        if (match) {
          setHoveredHub(match.hub);
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredHub(null);
      renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const targets = hubPoints.map((hp) => hp.mesh);
      const intersects = raycaster.intersectObjects(targets);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const match = hubPoints.find((hp) => hp.mesh === hitMesh);
        if (match) {
          setActiveHub(match.hub);
          if (onSelectHub) onSelectHub(match.hub.name);
        }
      }
    };

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('click', onClick);

    // --- Responsive Resize ---
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- Culling with IntersectionObserver ---
    let isVisible = true;
    let animId: number;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // --- Animation Loop ---
    let pulseTime = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      pulseTime += 0.03;

      // Auto-rotation with momentum coasting
      if (!isDragging) {
        globeGroup.rotation.y += rotationVelocity.y;
        rotationVelocity.y = rotationVelocity.y * 0.95 + 0.0025 * 0.05;
      }

      // Animate Pulse Rings
      pulseMeshes.forEach((pMesh, idx) => {
        const scale = 1 + (Math.sin(pulseTime + idx) * 0.5 + 0.5) * 0.45;
        pMesh.scale.set(scale, scale, scale);
      });

      // Animate Data Packets along Arcs with Scenario speed modifiers
      let speedMult = 1.0;
      if (scenario === 'peak_surge') speedMult = 2.8;
      if (scenario === 'mq_tls') speedMult = 0.4;

      arcs.forEach((arc) => {
        arc.packets.forEach((pkt) => {
          pkt.progress += pkt.speed * speedMult;
          if (pkt.progress > 1) pkt.progress = 0;

          const point = arc.curve.getPoint(pkt.progress);
          pkt.mesh.position.copy(point);

          // Size packet slightly larger at apex
          const altitude = Math.sin(pkt.progress * Math.PI);
          const pScale = 0.8 + altitude * 0.6;
          pkt.mesh.scale.set(pScale, pScale, pScale);
        });

        // Scenario Color Modifiers
        const lineMat = arc.lineMesh.material as THREE.LineBasicMaterial;
        if (scenario === 'mq_tls') {
          // Warning state for message queues
          lineMat.color.setHex(0xf59e0b);
          lineMat.opacity = 0.6 + Math.sin(pulseTime * 4) * 0.25;
        } else if (scenario === 'peak_surge') {
          // Hyper-active surge
          lineMat.color.setHex(0x00f0ff);
          lineMat.opacity = 0.85;
        } else {
          lineMat.color.setHex(arc.hub.color);
          lineMat.opacity = 0.38;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup Lifecycle ---
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      observer.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      arcs.forEach((a) => {
        a.lineMesh.geometry.dispose();
        (a.lineMesh.material as THREE.Material).dispose();
        a.packets.forEach((p) => {
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
        });
      });

      pulseMeshes.forEach((pm) => {
        pm.geometry.dispose();
        (pm.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scenario, onSelectHub]);

  return (
    <div className="relative w-full h-[420px] md:h-[480px] rounded-3xl glass-panel editorial-border overflow-hidden bg-gradient-to-b from-[#0c0d14]/90 to-[#06070a]/95 flex flex-col items-center justify-between p-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[var(--accent-cyan)]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header & Telemetry Overlay */}
      <div className="w-full flex items-center justify-between z-10 pointer-events-none pb-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            3D GLOBAL TELEMETRY
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs font-mono text-[#9496a8]">
            500+ Trading Partners · Franklin Hub
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#9496a8]">
          <span className="text-white/40">INTERACTION:</span>
          <span className="text-[var(--accent-cyan)]">DRAG TO ORBIT</span>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Dynamic Hover / Active Hub Inspection Panel (Floating Pill) */}
      <div className="z-10 w-full max-w-xl pointer-events-auto mt-auto">
        <div className="p-3.5 rounded-2xl bg-[#11121e]/90 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: (hoveredHub || activeHub).highlightColor }}
              />
              <span className="text-white font-bold text-sm font-syne">
                {(hoveredHub || activeHub).name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/5 text-[#e2c392] border border-white/10">
                {(hoveredHub || activeHub).location}
              </span>
            </div>
            <p className="text-[11px] text-[#9496a8]">
              {(hoveredHub || activeHub).role} · <span className="text-white/80">{(hoveredHub || activeHub).protocol}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-semibold text-[11px]">
              {(hoveredHub || activeHub).volume}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
