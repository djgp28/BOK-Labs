// motion.jsx — CSS keyframe-based reveals.
// We avoid CSS transitions because the preview iframe's design tooling can
// thrash inline styles and pin transitions at currentTime: 0. Keyframe
// animations with fill-mode: both run once and "stick" at the end state.

const EASE = {
  out: 'cubic-bezier(0.16, 0.84, 0.44, 1)',
  outFast: 'cubic-bezier(0.22, 1, 0.36, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  in: 'cubic-bezier(0.55, 0, 1, 0.45)',
};

if (typeof document !== 'undefined' && !document.getElementById('motion-styles')) {
  const s = document.createElement('style');
  s.id = 'motion-styles';
  s.textContent = `
    @keyframes mo-fadeUp { from { opacity: 0; transform: translateY(var(--mo-y, 16px)) translateX(var(--mo-x, 0)); } to { opacity: 1; transform: none; } }
    @keyframes mo-blink { 50% { opacity: 0 } }
    @keyframes mo-pulse { 0%, 100% { opacity: 0.6 } 50% { opacity: 1 } }
    @keyframes mo-drift-y { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }

    /* MountReveal animation — fill mode both pins start & end states */
    .mo-mount {
      opacity: 0;
      animation: mo-fadeUp var(--mo-dur, 900ms) var(--mo-ease, cubic-bezier(0.16, 0.84, 0.44, 1)) var(--mo-delay, 0ms) both;
    }
    /* Reveal — starts hidden, plays animation once when .mo-show class flips */
    .mo-watch { opacity: 0; transform: translateY(var(--mo-y, 24px)); will-change: opacity, transform; }
    .mo-watch.mo-show {
      animation: mo-fadeUp var(--mo-dur, 800ms) var(--mo-ease, cubic-bezier(0.16, 0.84, 0.44, 1)) var(--mo-delay, 0ms) both;
    }

    @media (prefers-reduced-motion: reduce) {
      .mo-mount, .mo-watch, .mo-watch.mo-show { animation: none !important; opacity: 1 !important; transform: none !important; }
    }
  `;
  document.head.appendChild(s);
}

// Reveal — fades + lifts content when it scrolls into view. Uses
// IntersectionObserver to add `.mo-show`, then CSS animation runs once.
function Reveal({
  children, delay = 0, y = 24, x = 0, duration = 800,
  threshold = 0.12, ease = EASE.out, style,
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin: '0px 0px -8% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return (
    <div
      ref={ref}
      className={'mo-watch' + (shown ? ' mo-show' : '')}
      style={{
        '--mo-y': `${y}px`,
        '--mo-x': `${x}px`,
        '--mo-dur': `${duration}ms`,
        '--mo-delay': `${delay}ms`,
        '--mo-ease': ease,
        ...style,
      }}
    >{children}</div>
  );
}

// MountReveal — pure CSS animation, no state. Plays once on mount, stays
// rendered at the end state via fill-mode: both. Robust to parent re-renders.
function MountReveal({
  children, delay = 0, y = 16, duration = 900, ease = EASE.out, style,
}) {
  return (
    <div
      className="mo-mount"
      style={{
        '--mo-y': `${y}px`,
        '--mo-dur': `${duration}ms`,
        '--mo-delay': `${delay}ms`,
        '--mo-ease': ease,
        ...style,
      }}
    >{children}</div>
  );
}

function Stagger({ children, step = 90, baseDelay = 0, ...rest }) {
  const items = React.Children.toArray(children);
  return (
    <>
      {items.map((child, i) => (
        <Reveal key={child.key ?? i} delay={baseDelay + i * step} {...rest}>
          {child}
        </Reveal>
      ))}
    </>
  );
}

Object.assign(window, { EASE, Reveal, MountReveal, Stagger });
