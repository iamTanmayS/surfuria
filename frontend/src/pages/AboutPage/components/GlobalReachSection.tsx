import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { motion, useReducedMotion } from 'motion/react';
import { GLOBAL_REACH_DATA, type GlobalMarket } from '../../../data/about/aboutPageData';
import './GlobalReachSection.css';

interface LocationMarker {
  id: string;
  name: string;
  role: string;
  lat: number;
  lng: number;
  isOrigin: boolean;
}

/**
 * 3D Elevated Great Circle Arc Curve
 * Computes exact spherical linear interpolation (SLERP) along the shortest path
 * between origin and destination, with a controlled smooth vertical altitude arch
 * that guarantees the path stays strictly elevated above the globe surface.
 */
class GreatCircleArcCurve extends THREE.Curve<THREE.Vector3> {
  private v0: THREE.Vector3;
  private v1: THREE.Vector3;
  private omega: number;
  private sinOmega: number;
  private baseRadius: number;
  private maxElevation: number;

  constructor(origin: THREE.Vector3, dest: THREE.Vector3, baseRadius: number, maxElevation: number) {
    super();
    this.v0 = origin.clone().normalize();
    this.v1 = dest.clone().normalize();
    this.baseRadius = baseRadius;
    this.maxElevation = maxElevation;

    const dot = Math.max(-1, Math.min(1, this.v0.dot(this.v1)));
    this.omega = Math.acos(dot);
    this.sinOmega = Math.sin(this.omega);
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    if (this.sinOmega < 0.0001) {
      return optionalTarget.copy(this.v0).multiplyScalar(this.baseRadius);
    }
    const s0 = Math.sin((1 - t) * this.omega) / this.sinOmega;
    const s1 = Math.sin(t * this.omega) / this.sinOmega;

    optionalTarget.set(
      s0 * this.v0.x + s1 * this.v1.x,
      s0 * this.v0.y + s1 * this.v1.y,
      s0 * this.v0.z + s1 * this.v1.z
    ).normalize();

    // Altitude profile: smooth sine arch strictly above the globe surface
    const altitude = this.maxElevation * Math.sin(t * Math.PI);
    return optionalTarget.multiplyScalar(this.baseRadius + altitude);
  }
}

export default function GlobalReachSection() {
  const shouldReduceMotion = useReducedMotion();
  const { eyebrow, headline, bodyCopy, origin, destinations } = GLOBAL_REACH_DATA;

  // Selected market (null = global overview)
  const [selectedMarket, setSelectedMarket] = useState<GlobalMarket | null>(null);
  const [webglSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      return !!(
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl')
      );
    } catch {
      return false;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Three.js instances & state refs
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.22, y: -1.15 });
  const isDraggingRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const markerMeshesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const arcCurvesRef = useRef<Map<string, GreatCircleArcCurve>>(new Map());
  const arcLinesRef = useRef<Map<string, THREE.Line>>(new Map());
  const activeRouteKeyRef = useRef<string | null>('europe');
  const flightProgressRef = useRef<number>(0);
  const aircraftRef = useRef<THREE.Group | null>(null);

  // Unified list of all 4 markers
  const allMarkers: LocationMarker[] = useMemo(
    () => [{ ...origin, isOrigin: true }, ...destinations.map((d) => ({ ...d, isOrigin: false }))],
    [origin, destinations]
  );

  // Converts geographic (lat, lng) to Three.js Vector3 on sphere of given radius
  const latLngToVector3 = useCallback((lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  }, []);

  // Animate globe rotation to showcase specific trade route and market
  const rotateToMarket = useCallback(
    (market: GlobalMarket | null) => {
      setSelectedMarket(market);
      autoRotateRef.current = false;

      if (!market) {
        // Global Overview centered between India and Europe
        targetRotationRef.current = { x: 0.22, y: -1.15 };
        activeRouteKeyRef.current = 'europe';
        flightProgressRef.current = 0;
        return;
      }

      if (market.id === 'india') {
        // India is the origin hub: return to origin perspective without export route
        activeRouteKeyRef.current = null;
        flightProgressRef.current = 0;
        targetRotationRef.current = { x: 0.16, y: -2.95 };
        return;
      }

      // International destinations: activate route and restart flight from India
      activeRouteKeyRef.current = market.id;
      flightProgressRef.current = 0;

      if (market.id === 'usa') {
        // Panoramic northern view showing India origin on right and USA destination on front-left
        targetRotationRef.current = { x: 0.35, y: -0.85 };
      } else if (market.id === 'canada') {
        // Northern view showing India origin on right and Canada destination on upper-left
        targetRotationRef.current = { x: 0.38, y: -0.80 };
      } else if (market.id === 'europe') {
        // Front view showing India on right and Europe on front-center
        targetRotationRef.current = { x: 0.26, y: -1.65 };
      } else {
        const targetY = -((market.lng + 180) * (Math.PI / 180)) + Math.PI / 2;
        const targetX = (market.lat * (Math.PI / 180)) * 0.42;
        targetRotationRef.current = { x: targetX, y: targetY };
      }
    },
    []
  );

  // Procedural 3D Cargo Aircraft Model
  const createCargoAircraft = useCallback((): THREE.Group => {
    const plane = new THREE.Group();

    // Fuselage (Sleek aerodynamic body)
    const bodyGeo = new THREE.ConeGeometry(0.022, 0.16, 12);
    bodyGeo.rotateX(Math.PI / 2); // align forward along Z
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf5eee6,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x3d2b18,
      emissiveIntensity: 0.2,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    plane.add(body);

    // Main Swept Wings
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0.035);
    wingShape.lineTo(0.13, -0.045);
    wingShape.lineTo(0.115, -0.065);
    wingShape.lineTo(0, -0.015);
    wingShape.lineTo(-0.115, -0.065);
    wingShape.lineTo(-0.13, -0.045);
    wingShape.closePath();

    const wingGeo = new THREE.ShapeGeometry(wingShape);
    wingGeo.rotateX(Math.PI / 2);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xe6bd84,
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    plane.add(wings);

    // Tail Fin (Vertical Stabilizer)
    const finGeo = new THREE.BufferGeometry();
    const finVertices = new Float32Array([
      0, 0, -0.035,
      0, 0.045, -0.065,
      0, 0, -0.065,
    ]);
    finGeo.setAttribute('position', new THREE.BufferAttribute(finVertices, 3));
    finGeo.computeVertexNormals();
    const finMat = new THREE.MeshBasicMaterial({ color: 0xb77b3f, side: THREE.DoubleSide });
    const fin = new THREE.Mesh(finGeo, finMat);
    plane.add(fin);

    // Nose light beacon
    const beaconGeo = new THREE.SphereGeometry(0.012, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffe8c2 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 0.01, 0.06);
    plane.add(beacon);

    plane.scale.set(1.15, 1.15, 1.15);
    return plane;
  }, []);

  useEffect(() => {
    if (!webglSupported) return;
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);

    // Framing setup: ensure entire globe + atmospheric halo + elevated 3D arcs fit with generous breathing room
    const updateCameraDistance = () => {
      const aspect = width / height;
      if (aspect < 1) {
        camera.position.z = (5.6 / aspect) * 0.82;
      } else {
        camera.position.z = 5.6;
      }
    };
    updateCameraDistance();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGLRenderer initialization failed:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe6bd84, 1.5);
    dirLight.position.set(5, 4, 4);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xb77b3f, 0.7);
    backLight.position.set(-5, -2, -3);
    scene.add(backLight);

    // 3. Globe Master Group
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = targetRotationRef.current.x;
    globeGroup.rotation.y = targetRotationRef.current.y;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Refined radius: gives ~13% top/bottom clearance, zero clipping
    const GLOBE_RADIUS = 1.35;

    // 4. Base Sphere (Dark Architectural Espresso)
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x17120e,
      roughness: 0.82,
      metalness: 0.18,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 5. Atmospheric Halo Rim
    const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.025, 48, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xb77b3f,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    globeGroup.add(haloMesh);

    // 6. Longitude & Latitude Graticule Rings
    const graticuleMat = new THREE.LineBasicMaterial({
      color: 0x3d3025,
      transparent: true,
      opacity: 0.32,
    });

    [-45, -20, 0, 20, 45, 65].forEach((lat) => {
      const radiusAtLat = GLOBE_RADIUS * Math.cos((lat * Math.PI) / 180);
      const yAtLat = GLOBE_RADIUS * Math.sin((lat * Math.PI) / 180);
      const circleGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radiusAtLat, yAtLat, Math.sin(theta) * radiusAtLat));
      }
      circleGeo.setFromPoints(points);
      globeGroup.add(new THREE.Line(circleGeo, graticuleMat));
    });

    for (let i = 0; i < 12; i++) {
      const lng = (i / 12) * Math.PI * 2;
      const circleGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        points.push(
          new THREE.Vector3(
            GLOBE_RADIUS * Math.sin(phi) * Math.cos(lng),
            GLOBE_RADIUS * Math.cos(phi),
            GLOBE_RADIUS * Math.sin(phi) * Math.sin(lng)
          )
        );
      }
      circleGeo.setFromPoints(points);
      globeGroup.add(new THREE.Line(circleGeo, graticuleMat));
    }

    // 7. Dot Matrix Continents
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions: number[] = [];
    const landRegions = [
      [8, 37, 68, 97], // India & South Asia
      [24, 50, -125, -66], // USA
      [50, 70, -140, -55], // Canada
      [36, 70, -10, 40], // Europe
      [-35, 37, -18, 51], // Africa
      [15, 60, 40, 140], // Rest of Eurasia
      [-55, 12, -80, -35], // South America
      [-40, -10, 113, 154], // Australia
    ];

    landRegions.forEach(([minLat, maxLat, minLng, maxLng]) => {
      const count = maxLat > 60 || minLat < -40 ? 50 : 140;
      for (let i = 0; i < count; i++) {
        const lat = minLat + Math.random() * (maxLat - minLat);
        const lng = minLng + Math.random() * (maxLng - minLng);
        const pos = latLngToVector3(lat, lng, GLOBE_RADIUS * 1.002);
        dotPositions.push(pos.x, pos.y, pos.z);
      }
    });

    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x8a735c,
      size: 0.034,
      transparent: true,
      opacity: 0.65,
    });
    globeGroup.add(new THREE.Points(dotGeo, dotMat));

    // 8. India Origin Hub Marker
    const originPos = latLngToVector3(origin.lat, origin.lng, GLOBE_RADIUS * 1.008);
    const originGeo = new THREE.SphereGeometry(0.052, 16, 16);
    const originMat = new THREE.MeshBasicMaterial({ color: 0xe6bd84 });
    const originNode = new THREE.Mesh(originGeo, originMat);
    originNode.position.copy(originPos);
    globeGroup.add(originNode);
    markerMeshesRef.current['india'] = originNode;

    // Origin pulsing beacon ring
    const originRingGeo = new THREE.RingGeometry(0.065, 0.095, 32);
    const originRingMat = new THREE.MeshBasicMaterial({
      color: 0xb77b3f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const originRing = new THREE.Mesh(originRingGeo, originRingMat);
    originRing.position.copy(originPos);
    originRing.lookAt(new THREE.Vector3(0, 0, 0));
    globeGroup.add(originRing);

    // 9. Destination Markers & 3D Great Circle Trade Routes
    const curvesMap = new Map<string, GreatCircleArcCurve>();
    const linesMap = new Map<string, THREE.Line>();

    destinations.forEach((dest) => {
      const destPos = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS * 1.008);

      // Destination node
      const destGeo = new THREE.SphereGeometry(0.042, 16, 16);
      const destMat = new THREE.MeshBasicMaterial({ color: 0xfbf9f5 });
      const destNode = new THREE.Mesh(destGeo, destMat);
      destNode.position.copy(destPos);
      globeGroup.add(destNode);
      markerMeshesRef.current[dest.id] = destNode;

      // Destination outer ring
      const ringGeo = new THREE.RingGeometry(0.055, 0.08, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe6bd84,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(destPos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);

      // Elevated Great Circle Arc from India to Destination
      const u0 = originPos.clone().normalize();
      const u1 = destPos.clone().normalize();
      const omega = Math.acos(Math.max(-1, Math.min(1, u0.dot(u1))));
      // Controlled altitude scaling with distance to guarantee routes stay strictly above surface
      const maxElevation = GLOBE_RADIUS * (0.16 + omega * 0.10);

      const curve = new GreatCircleArcCurve(originPos, destPos, GLOBE_RADIUS * 1.008, maxElevation);
      const curvePoints = curve.getPoints(90);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0xe6bd84,
        transparent: true,
        opacity: dest.id === 'europe' ? 0.9 : 0.45,
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);

      curvesMap.set(dest.id, curve);
      linesMap.set(dest.id, arcLine);
    });

    arcCurvesRef.current = curvesMap;
    arcLinesRef.current = linesMap;

    // 10. Add Animated 3D Cargo Aircraft
    const aircraft = createCargoAircraft();
    globeGroup.add(aircraft);
    aircraftRef.current = aircraft;

    // 11. Pointer Drag Controls
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerPosRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - pointerPosRef.current.x;
      const deltaY = clientY - pointerPosRef.current.y;

      pointerPosRef.current = { x: clientX, y: clientY };

      targetRotationRef.current.y += deltaX * 0.005;
      targetRotationRef.current.x += deltaY * 0.005;

      // Restrict pitch to avoid flipping over poles
      targetRotationRef.current.x = Math.max(-0.85, Math.min(0.85, targetRotationRef.current.x));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    canvas.addEventListener('touchcancel', handlePointerUp);

    // 12. Dynamic Size Synchronization (ResizeObserver + window resize)
    const updateDimensions = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 480;
      if (newWidth <= 0 || newHeight <= 0) return;
      width = newWidth;
      height = newHeight;
      camera.aspect = width / height;
      updateCameraDistance();
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', updateDimensions);

    // 13. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsedTime = 0;
    const tempVec = new THREE.Vector3();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      elapsedTime += delta;

      // Idle spin when not interacting
      if (autoRotateRef.current && !shouldReduceMotion) {
        targetRotationRef.current.y += 0.0016;
      }

      // Smooth damping interpolation
      globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.07;
      globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.07;

      // Pulse origin ring
      const ringScale = 1 + Math.sin(elapsedTime * 2.5) * 0.15;
      originRing.scale.set(ringScale, ringScale, 1);

      // Animate Cargo Aircraft along selected route curve
      const activeKey = activeRouteKeyRef.current;
      const activeCurve = activeKey ? curvesMap.get(activeKey) : null;

      if (aircraft) {
        if (activeCurve && !shouldReduceMotion) {
          aircraft.visible = true;
          const curveLen = activeCurve.getLength() || 2.5;
          const speed = 0.48; // speed in Three.js units/sec for consistent visual velocity
          flightProgressRef.current = (flightProgressRef.current + (delta * speed) / curveLen) % 1;
          const t = flightProgressRef.current;
          const pos = activeCurve.getPointAt(t);
          const tangent = activeCurve.getTangentAt(t).normalize();

          aircraft.position.copy(pos);

          // Orient forward along tangent, with 'up' vector aligned radially away from globe center
          const upVec = pos.clone().normalize();
          const rightVec = new THREE.Vector3().crossVectors(tangent, upVec).normalize();
          const correctedUp = new THREE.Vector3().crossVectors(rightVec, tangent).normalize();
          const rotMatrix = new THREE.Matrix4().makeBasis(rightVec, correctedUp, tangent);
          aircraft.quaternion.setFromRotationMatrix(rotMatrix);
        } else {
          // No active export flight (e.g. India origin hub selected or motion reduced)
          aircraft.visible = false;
        }
      }

      // Synchronize 3D Markers to 2D HTML Geographic Labels
      const globeCenter = globeGroup.position;

      allMarkers.forEach((marker) => {
        const mesh = markerMeshesRef.current[marker.id];
        const labelEl = labelRefs.current[marker.id];
        if (!mesh || !labelEl) return;

        mesh.getWorldPosition(tempVec);

        // Vector from globe center to marker (normal)
        const markerNormal = tempVec.clone().sub(globeCenter).normalize();
        // Vector from marker to camera
        const toCamera = camera.position.clone().sub(tempVec).normalize();
        const dot = markerNormal.dot(toCamera);

        // When marker faces camera, show label; when rotated to back side, hide cleanly
        if (dot > 0.14) {
          tempVec.project(camera);
          const x = (tempVec.x * 0.5 + 0.5) * width;
          const y = (-tempVec.y * 0.5 + 0.5) * height;

          labelEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          labelEl.style.opacity = '1';
          labelEl.style.pointerEvents = 'auto';
        } else {
          labelEl.style.opacity = '0';
          labelEl.style.pointerEvents = 'none';
        }
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      canvas.removeEventListener('touchcancel', handlePointerUp);
      renderer.dispose();
      scene.clear();
    };
  }, [latLngToVector3, origin, destinations, shouldReduceMotion, webglSupported, createCargoAircraft, allMarkers]);

  // Update route lines when destination selection changes
  useEffect(() => {
    if (!arcLinesRef.current) return;
    arcLinesRef.current.forEach((line, id) => {
      const isSelected = selectedMarket?.id === id;
      const isOverview = !selectedMarket;
      const mat = line.material as THREE.LineBasicMaterial;
      if (mat) {
        if (isSelected) {
          // Selected international route: prominent and glowing bronze
          mat.opacity = 0.95;
          mat.color.setHex(0xe6bd84);
          line.visible = true;
        } else if (isOverview) {
          // Global overview: show all routes with subtle elegance, Europe active
          mat.opacity = id === 'europe' ? 0.9 : 0.45;
          mat.color.setHex(id === 'europe' ? 0xe6bd84 : 0x8a735c);
          line.visible = true;
        } else {
          // Another market (or India hub) is selected: deactivate line
          line.visible = false;
        }
      }
    });
  }, [selectedMarket]);

  return (
    <section className="about-reach" aria-label="Our Global Reach and International Markets">
      <div className="container--wide">
        {/* Section Header */}
        <div className="about-reach__header">
          <span className="about-reach__eyebrow">{eyebrow}</span>
          <h2 className="about-reach__headline">{headline}</h2>
          <p className="about-reach__copy">{bodyCopy}</p>
        </div>

        {/* 3D Interactive Stage & Controls */}
        <div className="about-reach__experience">
          {/* Left / Center 3D Globe Viewport */}
          <div ref={containerRef} className="about-reach__globe-stage">
            {webglSupported ? (
              <>
                <canvas
                  ref={canvasRef}
                  className="about-reach__canvas"
                  aria-label="Interactive 3D globe showing Surfuria trade routes from India to USA, Canada, and Europe. Drag to rotate."
                />

                {/* 3D Synchronized Geographic Labels Layer */}
                <div className="about-reach__labels-layer" aria-hidden="false">
                  {allMarkers.map((marker) => {
                    const isSelected = selectedMarket
                      ? selectedMarket.id === marker.id
                      : marker.id === 'india';
                    return (
                      <button
                        key={marker.id}
                        ref={(el) => {
                          labelRefs.current[marker.id] = el;
                        }}
                        type="button"
                        className={`about-reach__marker-pill ${
                          marker.isOrigin ? 'is-origin' : ''
                        } ${isSelected ? 'is-selected' : ''}`}
                        onClick={() =>
                          rotateToMarket(
                            marker.isOrigin
                              ? origin
                              : destinations.find((d) => d.id === marker.id) || null
                          )
                        }
                        aria-label={`${marker.name} — ${marker.role}`}
                      >
                        <span className="about-reach__pill-dot" aria-hidden="true" />
                        <span className="about-reach__pill-name">{marker.name}</span>
                        <span className="about-reach__pill-role">
                          {marker.isOrigin ? 'Origin Hub' : 'Export Market'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Overlay Helper Hint */}
                <div className="about-reach__drag-hint" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20M7 7l10 10M17 7L7 17" />
                  </svg>
                  <span>Drag globe to rotate</span>
                </div>
              </>
            ) : (
              /* Vector Fallback if WebGL is unavailable */
              <div className="about-reach__fallback" aria-label="Global trade connections map">
                <svg className="about-reach__fallback-svg" viewBox="0 0 800 500" fill="none">
                  <circle cx="400" cy="250" r="180" stroke="rgba(220,185,145,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                  <ellipse cx="400" cy="250" rx="180" ry="70" stroke="rgba(220,185,145,0.15)" strokeWidth="1.5" />
                  <path d="M 470 210 Q 420 140 370 170" stroke="#e6bd84" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  <circle cx="470" cy="210" r="7" fill="#e6bd84" />
                  <text x="485" y="215" fill="#e6bd84" fontSize="12" fontFamily="DM Sans" fontWeight="bold">India (Origin Hub)</text>
                  <circle cx="370" cy="170" r="6" fill="#fbf9f5" />
                  <text x="290" y="165" fill="#fbf9f5" fontSize="11" fontFamily="DM Sans">Europe</text>
                  <circle cx="270" cy="190" r="6" fill="#fbf9f5" />
                  <text x="220" y="210" fill="#fbf9f5" fontSize="11" fontFamily="DM Sans">USA</text>
                </svg>
              </div>
            )}
          </div>

          {/* Right Sidebar: Market Selector & Dynamic Details Card */}
          <div className="about-reach__sidebar">
            {/* Market Tabs Selector */}
            <div className="about-reach__selector" role="tablist" aria-label="Select export destination">
              <button
                type="button"
                role="tab"
                aria-selected={selectedMarket === null}
                className={`about-reach__tab ${selectedMarket === null ? 'active' : ''}`}
                onClick={() => rotateToMarket(null)}
              >
                Global Overview
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedMarket?.id === 'india'}
                className={`about-reach__tab ${selectedMarket?.id === 'india' ? 'active' : ''}`}
                onClick={() => rotateToMarket(origin)}
              >
                India (Hub)
              </button>
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedMarket?.id === dest.id}
                  className={`about-reach__tab ${selectedMarket?.id === dest.id ? 'active' : ''}`}
                  onClick={() => rotateToMarket(dest)}
                >
                  {dest.name}
                </button>
              ))}
            </div>

            {/* Dynamic Content Panel */}
            <motion.div
              key={selectedMarket ? selectedMarket.id : 'global-overview'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="about-reach__panel"
            >
              <span className="about-reach__panel-badge">
                {selectedMarket ? (selectedMarket.id === 'india' ? 'Origin & Manufacturing' : 'Active Export Corridor') : 'Worldwide Sourcing & Export'}
              </span>

              <h3 className="about-reach__panel-title">
                {selectedMarket
                  ? selectedMarket.id === 'india'
                    ? 'India Production Hub'
                    : `India to ${selectedMarket.name}`
                  : 'India to Global Markets'}
              </h3>

              <span className="about-reach__panel-role">
                {selectedMarket ? selectedMarket.role : 'Merchant Export Serving India, USA, Canada & Europe'}
              </span>

              <p className="about-reach__panel-desc">
                {selectedMarket
                  ? selectedMarket.description
                  : 'Surfuria combines precision manufacturing oversight in India with direct containerized export delivery, connecting architectural hardware and modular furniture solutions across major international markets.'}
              </p>

              {/* Key Metrics / Highlights */}
              <div className="about-reach__panel-facts">
                <div className="about-reach__fact">
                  <span className="about-reach__fact-label">Origin</span>
                  <span className="about-reach__fact-value">India (Production & Sourcing)</span>
                </div>
                <div className="about-reach__fact">
                  <span className="about-reach__fact-label">Export Kinematics</span>
                  <span className="about-reach__fact-value">
                    {selectedMarket
                      ? selectedMarket.id === 'india'
                        ? 'Domestic Logistics & Project Supply'
                        : `Active Route: India → ${selectedMarket.name}`
                      : 'Containerized Air & Ocean Logistics'}
                  </span>
                </div>
                <div className="about-reach__fact">
                  <span className="about-reach__fact-label">Markets Served</span>
                  <span className="about-reach__fact-value">India • USA • Canada • Europe</span>
                </div>
              </div>

              {/* Reset View Button */}
              {selectedMarket && (
                <button
                  type="button"
                  className="about-reach__reset-btn"
                  onClick={() => rotateToMarket(null)}
                >
                  ← Reset Global Perspective
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
