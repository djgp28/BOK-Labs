// landing-shared.jsx — shared brand atoms for the landing page.

const C = {
  bg: '#0A0A0A',
  surface: '#111111',
  elevated: '#171717',
  border: '#262626',
  borderStrong: '#303030',
  text: '#F4F4F5',
  text2: '#A1A1AA',
  text3: '#52525B',
  text4: '#3F3F46',
  green: '#1F5C3F',
  greenActive: '#3DBA7E',
  greenDim: '#14361F',
  greenSoft: '#7DD3A8',
  danger: '#E5484D',
};

function useMediaQuery(query) {
  const getMatches = () => (
    typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia(query).matches
  );
  const [matches, setMatches] = React.useState(getMatches);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, [query]);

  return matches;
}

function useIsMobile() {
  return useMediaQuery('(max-width: 760px)');
}

function useIsNarrowMobile() {
  return useMediaQuery('(max-width: 420px)');
}

// Wordmark — BOK + [labs]
function Wordmark({ size = 32, fg = C.text, accent = C.greenActive, muted = C.text2 }) {
  return (
    <div style={{
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700, fontSize: size, lineHeight: 1,
      letterSpacing: '-0.025em', color: fg,
      display: 'inline-flex', alignItems: 'baseline', gap: size * 0.22,
    }}>
      <span>BOK</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 400, fontSize: size * 0.34,
        color: muted, display: 'inline-flex', alignItems: 'center',
      }}>
        <span style={{ color: accent, fontWeight: 500, marginRight: size * 0.02 }}>[</span>
        <span>labs</span>
        <span style={{ color: accent, fontWeight: 500, marginLeft: size * 0.02 }}>]</span>
      </span>
    </div>
  );
}

// [B] icon — green tile, white B + green-active brackets.
function WordmarkIcon({ size = 32, bg = C.green, fg = C.text, accent = C.greenActive, radius }) {
  const r = radius == null ? Math.max(2, size * 0.18) : radius;
  const showBrackets = size >= 16;
  return (
    <div style={{
      width: size, height: size, borderRadius: r,
      background: bg, color: fg, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, lineHeight: 1,
      letterSpacing: '-0.04em', overflow: 'hidden',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.02 }}>
        {showBrackets && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontWeight: 500,
            fontSize: size * 0.5, color: accent, lineHeight: 1,
            marginRight: -size * 0.04,
          }}>[</span>
        )}
        <span style={{ fontSize: size * 0.58 }}>B</span>
        {showBrackets && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontWeight: 500,
            fontSize: size * 0.5, color: accent, lineHeight: 1,
            marginLeft: -size * 0.04,
          }}>]</span>
        )}
      </span>
    </div>
  );
}

// Section shell — eyebrow + h2 + optional subhead
function SectionHead({ tag, title, subhead, align = 'left' }) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
      gap: isMobile ? 14 : 18, marginBottom: isMobile ? 36 : 56,
    }}>
      <div className="eyebrow">{tag}</div>
      <h2 style={{
        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
        fontSize: isMobile ? 34 : 48, letterSpacing: '-0.03em', lineHeight: isMobile ? 1.08 : 1.05,
        margin: 0, maxWidth: 720,
      }}>{title}</h2>
      {subhead && (
        <div style={{
          fontSize: isMobile ? 16 : 18, color: C.text2, lineHeight: 1.55,
          maxWidth: 640,
        }}>{subhead}</div>
      )}
    </div>
  );
}

// Container width helpers
function Container({ children, style }) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      maxWidth: 1280, margin: '0 auto',
      padding: isMobile ? '0 20px' : '0 56px', width: '100%',
      ...style,
    }}>{children}</div>
  );
}

Object.assign(window, {
  C, useMediaQuery, useIsMobile, useIsNarrowMobile,
  Wordmark, WordmarkIcon, SectionHead, Container,
});
