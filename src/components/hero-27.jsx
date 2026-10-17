import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, Layers, Search, Sparkles, Zap } from 'lucide-react';

const VERTEX_SHADER = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uText;
uniform vec3 uBand;
uniform vec3 uInk;
uniform float uOpacity;
uniform vec3 uLight;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorld;
void main() {
  vec3 n = normalize(vNormal);
  bool front = gl_FrontFacing;
  if (!front) n = -n;
  vec3 view = normalize(cameraPosition - vWorld);
  float facing = dot(n, uLight);
  float wrap = facing * 0.5 + 0.5;
  float light = mix(1.0, 0.42 + 0.5 * wrap * wrap + 0.16 * max(facing, 0.0), 0.55);
  float spec = pow(max(dot(n, normalize(uLight + view)), 0.0), 48.0) * 0.18;
  float rim = pow(1.0 - abs(dot(n, view)), 4.0) * 0.06;
  float glyph = texture2D(uText, vUv).a;
  vec3 surface = front ? mix(uBand, uInk, glyph) : uBand * 0.62;
  gl_FragColor = vec4(surface * light + vec3(spec + rim), uOpacity);
  #include <colorspace_fragment>
}
`;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const smoothstep = (val) => {
  const t = clamp(val, 0, 1);
  return t * t * (3 - 2 * t);
};

export function Hero27({
  title = "We Build Digital Experiences That Move Businesses Forward.",
  description = "Webdora is a full-spectrum digital brand partnering with ambitious businesses to engineer bespoke web platforms, memorable user interfaces, and high-impact digital solutions — including technical SEO, performance architecture, and speed optimization.",
  ribbonText = "WEBDORA · DIGITAL EXPERIENCES · WEB ENGINEERING · DESIGN SYSTEMS · SEO & VISIBILITY · PERFORMANCE · ",
  primaryCtaText = "Start a Project",
  secondaryCtaText = "View Our Services",
  bandColor = "#93A3B1", // Official Cool Steel
  inkColor = "#322214",  // Official Dark Coffee
  onPrimaryCta,
  onSecondaryCta,
}) {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const doc = container.ownerDocument;
    const win = doc.defaultView || window;
    const isReduced = win.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = doc.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:auto;';

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0, 0);
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 20000);
    const geometry = new THREE.BufferGeometry();

    // Offscreen 2D canvas for rendering the text banner
    const textCanvas = doc.createElement('canvas');
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.wrapS = THREE.RepeatWrapping;
    textTexture.wrapT = THREE.RepeatWrapping;
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uText: { value: textTexture },
        uBand: { value: new THREE.Color(bandColor) },
        uInk: { value: new THREE.Color(inkColor) },
        uOpacity: { value: isReduced ? 1 : 0 },
        uLight: { value: new THREE.Vector3(-0.18, 0.42, 0.89).normalize() },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const SAMPLES = 420;
    const curvePoints = new Float32Array((SAMPLES + 1) * 3);
    const curveLengths = new Float32Array(SAMPLES + 1);
    const positions = new Float32Array((SAMPLES + 1) * 6);
    const normals = new Float32Array((SAMPLES + 1) * 6);
    const uvs = new Float32Array((SAMPLES + 1) * 4);
    const indices = [];

    for (let i = 0; i < SAMPLES; i++) {
      const idx = 2 * i;
      indices.push(idx, idx + 2, idx + 1, idx + 1, idx + 2, idx + 3);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2).setUsage(THREE.DynamicDrawUsage));
    geometry.setIndex(indices);

    const ripples = [];
    const projVec = new THREE.Vector3();
    const pointerState = {
      inside: false,
      down: false,
      id: -1,
      startX: 0,
      startY: 0,
      lastX: 0,
      startAt: 0,
      lastAt: 0,
      moved: false,
    };

    let width = 1;
    let height = 1;
    let ribbonWidth = 64;
    let waveAmplitude = 14;
    let zDepth = 48;
    let aspectMultiplier = 8;
    let totalLength = 1;
    let wavePhase = 0;
    let scrollVelocity = 0;
    let scrollSpeedScale = 1;
    let dragMomentum = 0;
    let startTime = -1;
    let cachedFont = '';
    let animFrameId = 0;
    let lastTimestamp = 0;
    let isIntersecting = false;
    let isDestroyed = false;

    const renderTextTexture = () => {
      const fontFamily = win.getComputedStyle(section).fontFamily || 'sans-serif';
      if (fontFamily === cachedFont) return;
      cachedFont = fontFamily;

      const ctx = textCanvas.getContext('2d');
      if (!ctx) return;

      const fullText = ribbonText;
      let segments;
      if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        segments = Array.from(
          new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(fullText),
          (s) => s.segment
        );
      } else {
        segments = Array.from(fullText);
      }

      ctx.font = `800 180px ${fontFamily}`;
      const totalTextWidth = segments.reduce((acc, char) => acc + ctx.measureText(char).width - 3.6, 0);
      const canvasHeight = Math.round(281.25);

      textCanvas.width = Math.max(2, Math.ceil(totalTextWidth));
      textCanvas.height = canvasHeight;

      ctx.font = `800 180px ${fontFamily}`;
      ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.fillStyle = '#fff';
      ctx.textBaseline = 'alphabetic';

      const ascent = ctx.measureText('H').actualBoundingBoxAscent || 126;
      let curX = -1.8;
      for (const char of segments) {
        ctx.fillText(char, curX, canvasHeight / 2 + ascent / 2);
        curX += ctx.measureText(char).width - 3.6;
      }

      aspectMultiplier = textCanvas.width / textCanvas.height;
      textTexture.dispose();
      textTexture.needsUpdate = true;
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);

      const dist = 1.25 * Math.max(width, height);
      camera.fov = (2 * Math.atan(height / 2 / dist) * 180) / Math.PI;
      camera.aspect = width / height;
      camera.position.set(0, 0, dist);
      camera.far = 4 * dist;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      ribbonWidth = 0.58 * height;
      waveAmplitude = 0.16 * ribbonWidth;
      zDepth = 1.15 * ribbonWidth;
      mesh.rotation.z = width < 640 ? -0.045 : -0.03;
    };

    const computeCurvePoint = (tVal, index) => {
      const phase = 0.28 * wavePhase;
      const span = 1.3 * width;
      const progress = (tVal - 0.5) * 1.3;
      curvePoints[index] = (tVal - 0.5) * span;
      curvePoints[index + 1] = waveAmplitude * Math.sin(0.45 * Math.PI * 2 * progress + phase);
      curvePoints[index + 2] = zDepth * Math.sin(0.28 * Math.PI * 2 * progress + 0.6 * phase + 1.3);
    };

    const computeTwist = (curvePos, nowSec) => {
      let twist = 0.035 * Math.PI * 2 * Math.sin((curvePos / Math.max(1, width)) * Math.PI + 0.08 * wavePhase * Math.PI * 2);
      for (const rip of ripples) {
        twist += Math.PI * 2 * smoothstep(((nowSec - rip.start) * 900 - Math.abs(curvePos - rip.origin)) / 520);
      }
      return twist;
    };

    const pickRibbonPoint = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;
      let closestDist = Infinity;
      let closestOrigin = 0;

      mesh.updateMatrixWorld();

      for (let i = 0; i <= SAMPLES; i += 2) {
        projVec
          .set(curvePoints[3 * i], curvePoints[3 * i + 1], curvePoints[3 * i + 2])
          .applyMatrix4(mesh.matrixWorld)
          .project(camera);

        const screenX = (0.5 * projVec.x + 0.5) * width;
        const screenY = (0.5 - 0.5 * projVec.y) * height;
        const dist = Math.hypot(screenX - localX, screenY - localY);

        if (dist < closestDist) {
          closestDist = dist;
          closestOrigin = curveLengths[i];
        }
      }
      return { distance: closestDist, origin: closestOrigin };
    };

    const triggerLoop = () => {
      if (isDestroyed || !isIntersecting || animFrameId) return;
      animFrameId = win.requestAnimationFrame(renderLoop);
    };

    function renderLoop(timestamp) {
      animFrameId = 0;
      if (isDestroyed) return;

      const dt = lastTimestamp ? clamp((timestamp - lastTimestamp) / 1000, 1 / 240, 0.05) : 1 / 60;
      lastTimestamp = timestamp;

      const nowSec = performance.now() / 1000;
      if (startTime < 0) startTime = nowSec;

      if (!isReduced) {
        wavePhase += dt;
      }

      scrollSpeedScale += ((pointerState.inside && !pointerState.down ? 0.35 : 1) - scrollSpeedScale) * (1 - Math.exp(-4 * dt));

      if (!pointerState.down) {
        dragMomentum *= Math.exp(-dt / 0.6);
      }

      scrollVelocity += ((isReduced ? 0 : 0.42 * ribbonWidth * scrollSpeedScale) + dragMomentum) * dt;

      for (let i = ripples.length - 1; i >= 0; i--) {
        if ((nowSec - ripples[i].start) * 900 - totalLength > 520) {
          ripples.splice(i, 1);
        }
      }

      shaderMaterial.uniforms.uOpacity.value = isReduced ? 1 : smoothstep((nowSec - startTime) / 1.1);

      const halfW = ribbonWidth / 2;
      for (let i = 0; i <= SAMPLES; i++) {
        computeCurvePoint(i / SAMPLES, 3 * i);
      }

      let runningLen = 0;
      curveLengths[0] = 0;
      for (let i = 1; i <= SAMPLES; i++) {
        runningLen += Math.hypot(
          curvePoints[3 * i] - curvePoints[3 * i - 3],
          curvePoints[3 * i + 1] - curvePoints[3 * i - 2],
          curvePoints[3 * i + 2] - curvePoints[3 * i - 1]
        );
        curveLengths[i] = runningLen;
      }
      totalLength = Math.max(1, runningLen);

      const repeatDistance = ribbonWidth * aspectMultiplier;

      for (let i = 0; i <= SAMPLES; i++) {
        const prev = Math.max(0, i - 1);
        const next = Math.min(SAMPLES, i + 1);

        let tanX = curvePoints[3 * next] - curvePoints[3 * prev];
        let tanY = curvePoints[3 * next + 1] - curvePoints[3 * prev + 1];
        let tanZ = curvePoints[3 * next + 2] - curvePoints[3 * prev + 2];
        const tanLen = Math.hypot(tanX, tanY, tanZ) || 1;
        tanX /= tanLen;
        tanY /= tanLen;
        tanZ /= tanLen;

        let normX = -tanZ * tanX;
        let normY = -tanZ * tanY;
        let normZ = 1 - tanZ * tanZ;
        const normLen = Math.hypot(normX, normY, normZ) || 1;
        normX /= normLen;
        normY /= normLen;
        normZ /= normLen;

        const binormX = normY * tanZ - normZ * tanY;
        const binormY = normZ * tanX - normX * tanZ;
        const binormZ = normX * tanY - normY * tanX;

        const twist = computeTwist(curveLengths[i], nowSec);
        const cosTwist = Math.cos(twist);
        const sinTwist = Math.sin(twist);

        const sideX = cosTwist * binormX + sinTwist * normX;
        const sideY = cosTwist * binormY + sinTwist * normY;
        const sideZ = cosTwist * binormZ + sinTwist * normZ;

        const posIdx = 6 * i;
        const px = curvePoints[3 * i];
        const py = curvePoints[3 * i + 1];
        const pz = curvePoints[3 * i + 2];

        positions[posIdx] = px - sideX * halfW;
        positions[posIdx + 1] = py - sideY * halfW;
        positions[posIdx + 2] = pz - sideZ * halfW;
        positions[posIdx + 3] = px + sideX * halfW;
        positions[posIdx + 4] = py + sideY * halfW;
        positions[posIdx + 5] = pz + sideZ * halfW;

        const crossNormalX = tanY * sideZ - tanZ * sideY;
        const crossNormalY = tanZ * sideX - tanX * sideZ;
        const crossNormalZ = tanX * sideY - tanY * sideX;

        normals[posIdx] = crossNormalX;
        normals[posIdx + 1] = crossNormalY;
        normals[posIdx + 2] = crossNormalZ;
        normals[posIdx + 3] = crossNormalX;
        normals[posIdx + 4] = crossNormalY;
        normals[posIdx + 5] = crossNormalZ;

        const uCoord = (curveLengths[i] + scrollVelocity) / repeatDistance;
        const uvIdx = 4 * i;
        uvs[uvIdx] = uCoord;
        uvs[uvIdx + 1] = 0;
        uvs[uvIdx + 2] = uCoord;
        uvs[uvIdx + 3] = 1;
      }

      geometry.getAttribute('position').needsUpdate = true;
      geometry.getAttribute('normal').needsUpdate = true;
      geometry.getAttribute('uv').needsUpdate = true;

      renderer.render(scene, camera);

      if (!isReduced || Math.abs(dragMomentum) > 1 || ripples.length > 0) {
        triggerLoop();
      } else {
        lastTimestamp = 0;
      }
    }

    const onPointerMove = (e) => {
      if (pointerState.down && e.pointerId === pointerState.id) {
        const dx = e.clientX - pointerState.lastX;
        const now = performance.now() / 1000;
        if (Math.hypot(e.clientX - pointerState.startX, e.clientY - pointerState.startY) > 6) {
          pointerState.moved = true;
        }
        if (pointerState.moved) {
          scrollVelocity -= dx;
          dragMomentum = 0.6 * dragMomentum + (-dx / Math.max(0.008, now - pointerState.lastAt)) * 0.4;
        }
        pointerState.lastX = e.clientX;
        pointerState.lastAt = now;
      } else if (e.pointerType === 'mouse') {
        pointerState.inside = pickRibbonPoint(e.clientX, e.clientY).distance < 0.75 * ribbonWidth;
        container.style.cursor = pointerState.inside ? 'grab' : '';
      }
      triggerLoop();
    };

    const onPointerDown = (e) => {
      if (!e.isPrimary || pointerState.down) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (pickRibbonPoint(e.clientX, e.clientY).distance > 0.75 * ribbonWidth) return;

      if (e.pointerType === 'mouse') e.preventDefault();
      container.setPointerCapture?.(e.pointerId);
      container.style.cursor = 'grabbing';

      pointerState.down = true;
      pointerState.id = e.pointerId;
      pointerState.startX = e.clientX;
      pointerState.startY = e.clientY;
      pointerState.lastX = e.clientX;
      pointerState.startAt = performance.now() / 1000;
      pointerState.lastAt = pointerState.startAt;
      pointerState.moved = false;
      triggerLoop();
    };

    const onPointerUp = (e) => {
      if (pointerState.down && e.pointerId === pointerState.id) {
        pointerState.down = false;
        container.releasePointerCapture?.(e.pointerId);
        container.style.cursor = pointerState.inside ? 'grab' : '';

        const now = performance.now() / 1000;
        if (now - pointerState.lastAt > 0.12) {
          dragMomentum = 0;
        }

        if (!pointerState.moved && now - pointerState.startAt < 0.4) {
          const hitOrigin = pickRibbonPoint(e.clientX, e.clientY).origin;
          if (!isReduced) {
            if (ripples.length > 5) ripples.shift();
            ripples.push({ origin: hitOrigin, start: now });
          }
        }
        triggerLoop();
      }
    };

    const onPointerLeave = () => {
      pointerState.inside = false;
      if (!pointerState.down) container.style.cursor = '';
      triggerLoop();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
      triggerLoop();
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      lastTimestamp = 0;
      triggerLoop();
    });

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    resizeObserver.observe(container);
    intersectionObserver.observe(container);

    renderTextTexture();
    handleResize();

    doc.fonts?.ready?.then(() => {
      if (!isDestroyed) {
        cachedFont = '';
        renderTextTexture();
        triggerLoop();
      }
    });

    return () => {
      isDestroyed = true;
      win.cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.style.cursor = '';

      geometry.dispose();
      shaderMaterial.dispose();
      textTexture.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, [ribbonText, bandColor, inkColor]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[92vh] w-full flex-col justify-between overflow-hidden bg-[#322214] px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-16"
    >
      {/* Soft Ambient Warm Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[650px] z-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse 85% 55% at 50% 0%, rgba(76, 68, 60, 0.45) 0%, rgba(147, 163, 177, 0.08) 50%, transparent 80%)',
        }}
      />

      {/* Top Header & Strategic Capability Badges */}
      <motion.div
        variants={containerVariants}
        initial={!prefersReduced && "hidden"}
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="max-w-[46rem]">
          <motion.div
            variants={itemVariants}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#636564]/80 bg-[#4C443C]/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#FAFAF8]"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#93A3B1]" />
            <span>Webdora — Web Engineering & Digital Growth Studio</span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-pretty font-serif text-3xl font-bold tracking-tight text-[#FAFAF8] sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-[1.12]"
          >
            {title}
          </motion.h1>
        </div>

        {/* Brand Capability Matrix */}
        <motion.dl
          variants={itemVariants}
          className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-2.5 text-xs leading-relaxed sm:pt-4 sm:text-right"
        >
          <dt className="text-[#D6CFC7] flex items-center sm:justify-end gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-[#93A3B1]" />
            Web Engineering
          </dt>
          <dd className="font-semibold text-[#FAFAF8]">Custom React & Scalable Stacks</dd>

          <dt className="text-[#D6CFC7] flex items-center sm:justify-end gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[#7C898B]" />
            UI/UX Systems
          </dt>
          <dd className="font-semibold text-[#FAFAF8]">Restrained & Accessible Design</dd>

          <dt className="text-[#D6CFC7] flex items-center sm:justify-end gap-1.5">
            <Search className="h-3.5 w-3.5 text-[#93A3B1]" />
            SEO & Visibility
          </dt>
          <dd className="font-semibold text-[#FAFAF8]">Technical Crawl & Discovery</dd>

          <dt className="text-[#D6CFC7] flex items-center sm:justify-end gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#7C898B]" />
            Performance
          </dt>
          <dd className="font-semibold text-[#93A3B1]">Sub-Second Speed Standard</dd>
        </motion.dl>
      </motion.div>

      {/* 3D Flowing Satin Ribbon Canvas Area */}
      <div
        ref={canvasContainerRef}
        aria-hidden="true"
        className="relative z-10 -mx-4 my-auto h-[clamp(9rem,24vh,15rem)] touch-pan-y select-none sm:-mx-6 sm:h-[clamp(12rem,32vh,20rem)] lg:-mx-8 overflow-hidden"
      />

      {/* Bottom Supporting Copy & CTAs */}
      <motion.div
        variants={containerVariants}
        initial={!prefersReduced && "hidden"}
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 mx-auto flex w-full max-w-[1360px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <motion.p
          variants={itemVariants}
          className="max-w-[36rem] text-pretty text-base leading-relaxed text-[#D6CFC7] sm:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3.5 sm:flex-row sm:items-center"
        >
          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onPrimaryCta}
            className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#93A3B1] px-7 text-sm font-bold text-[#322214] shadow-[0_4px_24px_rgba(147,163,177,0.35)] transition-all duration-200 hover:bg-[#a6b5c2] hover:shadow-[0_6px_32px_rgba(147,163,177,0.5)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214]"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary Action Button */}
          <button
            type="button"
            onClick={onSecondaryCta}
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border border-[#636564] bg-[#4C443C]/60 px-6 text-sm font-semibold text-[#FAFAF8] backdrop-blur-sm transition-colors duration-200 hover:bg-[#4C443C] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93A3B1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#322214]"
          >
            {secondaryCtaText}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero27;
