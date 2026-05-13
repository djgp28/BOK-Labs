// hero-bg.jsx — Three.js point cloud + constellation behind the hero.
// Deterministic across sessions (mulberry32(42)), additive-blended green
// twinkle, slow Y rotation, gentle camera drift.

const HERO_BG_SEED = 42;

function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (((t ^ (t >>> 14)) >>> 0) / 4294967296);
  };
}

function HeroCanvas() {
  const mountRef = React.useRef(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof THREE === 'undefined') return;
    const container = mountRef.current;
    if (!container) return;

    const w0 = container.clientWidth || 800;
    const h0 = container.clientHeight || 600;

    // ─── Scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.1, 200);
    camera.position.set(0, 0, 55);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(w0, h0);
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // ─── Geometry — seeded volume of points ─────────────────────────────
    const rng = mulberry32(HERO_BG_SEED);
    const N = 900;

    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const phases = new Float32Array(N);
    const seeds = new Float32Array(N); // per-point seed for fragment

    const cGreen = new THREE.Color('#3DBA7E');
    const cGreenSoft = new THREE.Color('#7DD3A8');
    const cDim = new THREE.Color('#52525B');
    const cVeryDim = new THREE.Color('#262626');

    const brightIdx = [];

    for (let i = 0; i < N; i++) {
      // Cylindrical-ish volume, slightly elongated in X (matches hero width).
      // Use sqrt-distributed radius for even visual density.
      const r = Math.sqrt(rng()) * 38;
      const ang = rng() * Math.PI * 2;
      const yJ = (rng() - 0.5) * 30;
      const zJ = (rng() - 0.5) * 18;

      positions[3 * i + 0] = Math.cos(ang) * r * 1.15;       // x — wider
      positions[3 * i + 1] = yJ + Math.sin(ang * 1.3) * 4;   // y — slight wave
      positions[3 * i + 2] = Math.sin(ang) * r * 0.7 + zJ;   // z — shallower depth

      const roll = rng();
      let c;
      if (roll < 0.06) { c = cGreen; brightIdx.push(i); sizes[i] = 4.2; }
      else if (roll < 0.12) { c = cGreenSoft; sizes[i] = 3.0; }
      else if (roll < 0.45) { c = cDim; sizes[i] = 2.0; }
      else { c = cVeryDim; sizes[i] = 1.4; }

      colors[3 * i + 0] = c.r;
      colors[3 * i + 1] = c.g;
      colors[3 * i + 2] = c.b;
      phases[i] = rng() * Math.PI * 2;
      seeds[i] = rng();
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    geom.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

    // ─── Shader — sized points + twinkle + soft-disc fragment ───────────
    const pointMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute float phase;
        attribute float seed;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          // Per-point twinkle — slow sin with per-point phase. Bright points
          // (size > 3) pulse more strongly; dim points barely move.
          float pulse = sin(uTime * 0.7 + phase) * 0.5 + 0.5;
          float weight = smoothstep(1.5, 3.4, size);
          vAlpha = mix(0.55, 1.0, pulse * weight + (1.0 - weight) * 0.5);
          // depth-falloff so far points feel softer
          float depthFade = clamp(1.0 + mv.z / 110.0, 0.25, 1.0);
          vAlpha *= depthFade;
          gl_PointSize = size * (320.0 / max(0.001, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          // soft disc with extra inner core
          float disc = smoothstep(0.5, 0.0, d);
          float core = smoothstep(0.18, 0.0, d) * 0.6;
          gl_FragColor = vec4(vColor, (disc + core) * vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geom, pointMat);
    scene.add(points);

    // ─── Constellation lines between near-neighbor bright points ────────
    const linePositions = [];
    const lineColors = [];
    const lineSeg = [];
    for (let i = 0; i < brightIdx.length; i++) {
      const ai = brightIdx[i];
      const ax = positions[3 * ai], ay = positions[3 * ai + 1], az = positions[3 * ai + 2];
      let conn = 0;
      for (let j = 0; j < brightIdx.length && conn < 3; j++) {
        if (i === j) continue;
        const bi = brightIdx[j];
        const bx = positions[3 * bi], by = positions[3 * bi + 1], bz = positions[3 * bi + 2];
        const d = Math.hypot(ax - bx, ay - by, az - bz);
        if (d < 18) {
          const alpha = 1 - d / 18;
          linePositions.push(ax, ay, az, bx, by, bz);
          lineColors.push(
            cGreen.r * alpha, cGreen.g * alpha, cGreen.b * alpha,
            cGreen.r * alpha, cGreen.g * alpha, cGreen.b * alpha,
          );
          lineSeg.push(phases[ai]);
          conn++;
        }
      }
    }
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    lineGeom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(lineColors), 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // ─── Visibility-based pause (don't burn cycles when off-screen) ─────
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.01 });
    io.observe(container);

    // ─── Animate ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    function frame() {
      if (visible) {
        const t = clock.getElapsedTime();
        pointMat.uniforms.uTime.value = t;
        // slow Y rotation — wraps cleanly at 2π so the visual loops.
        points.rotation.y = t * 0.035;
        lines.rotation.y = t * 0.035;
        // very gentle wobble on X (subtle parallax feel without input)
        points.rotation.x = Math.sin(t * 0.08) * 0.04;
        lines.rotation.x = points.rotation.x;
        // gentle camera drift
        camera.position.x = Math.sin(t * 0.06) * 1.8;
        camera.position.y = Math.cos(t * 0.05) * 1.2;
        camera.lookAt(0, 0, 0);
        lineMat.opacity = 0.45 + Math.sin(t * 0.4) * 0.12; // breathe constellation
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(frame);
    }

    // Stagger first paint so the "Reveal" fade-in still wins
    const startTimer = setTimeout(() => {
      setLoaded(true);
      frame();
    }, 50);

    // ─── Resize ─────────────────────────────────────────────────────────
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ─── Cleanup ────────────────────────────────────────────────────────
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      geom.dispose();
      pointMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        pointerEvents: 'none', overflow: 'hidden',
        // radial mask so the cloud fades around hero text — keeps copy readable
        maskImage: 'radial-gradient(80% 85% at 50% 45%, #000 60%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(80% 85% at 50% 45%, #000 60%, transparent 100%)',
        // canvas itself fades in once mounted
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1400ms cubic-bezier(0.16, 0.84, 0.44, 1)',
      }}
    />
  );
}

Object.assign(window, { HeroCanvas });
