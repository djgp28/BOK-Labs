// landing-sections.jsx — Nav, Hero, Logos, Services, Process, Work, Stats, Footer.

// ─── Nav ────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: scrolled ? `1px solid ${C.border}` : `1px solid transparent`,
      background: scrolled ? 'rgba(10,10,10,0.78)' : 'rgba(10,10,10,0.4)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transition: 'all 200ms',
    }}>
      <Container style={{
        padding: isMobile ? '14px 20px' : '18px 56px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Wordmark size={isMobile ? 22 : 24} />
        </a>
        <div style={{
          display: isMobile ? 'none' : 'flex', gap: 28, fontSize: 14, color: C.text2, fontWeight: 500,
        }}>
          {['Services', 'Process', 'Contact'].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ transition: 'color 150ms' }}
               onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
               onMouseLeave={(e) => (e.currentTarget.style.color = C.text2)}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
            letterSpacing: '0.06em', display: isMobile ? 'none' : 'inline',
          }}>v2.4</span>
          <a href="#contact" style={{
            background: C.text, color: C.bg,
            padding: isMobile ? '8px 11px' : '9px 14px', borderRadius: 5,
            fontWeight: 600, fontSize: isMobile ? 12 : 13,
          }}>Start a project</a>
        </div>
      </Container>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────
function Hero() {
  const isMobile = useIsMobile();
  const isNarrow = useIsNarrowMobile();
  return (
    <section id="top" style={{ position: 'relative', padding: isMobile ? '56px 0 76px' : '100px 0 120px', overflow: 'hidden' }}>
      <HeroCanvas />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
          <div>
            <MountReveal delay={50} y={12}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '6px 12px',
                border: `1px solid ${C.borderStrong}`, borderRadius: 999,
                fontFamily: 'var(--mono)', fontSize: isNarrow ? 10 : 11, color: C.text2,
                background: 'rgba(20,54,31,0.18)', marginBottom: 28,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                lineHeight: 1.4, maxWidth: '100%',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: 4,
                  background: C.greenActive, boxShadow: `0 0 8px ${C.greenActive}`,
                  animation: 'mo-pulse 2.4s ease-in-out infinite',
                }} />
                <span><span style={{ color: C.greenActive }}>available</span> · team available for engagement</span>
              </div>
            </MountReveal>
            <MountReveal delay={180} y={20}>
              <h1 style={{
                fontSize: isNarrow ? 46 : isMobile ? 54 : 88, fontWeight: 700, letterSpacing: '-0.045em',
                lineHeight: isMobile ? 0.98 : 0.96, margin: 0,
              }}>
                Software<br/>
                <span style={{ color: C.text2 }}>that actually</span><br/>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  ships
                  <span style={{
                    position: 'absolute', right: -22, top: 6,
                    fontFamily: 'var(--mono)', fontSize: 16,
                    color: C.greenActive, fontWeight: 500,
                    animation: 'mo-blink 1.1s steps(2) infinite',
                  }}>_</span>
                </span>
              </h1>
            </MountReveal>
            <MountReveal delay={360} y={16}>
              <div style={{ fontSize: isMobile ? 16 : 19, color: C.text2, lineHeight: 1.55, maxWidth: 520, marginTop: isMobile ? 24 : 32 }}>
                We design and build custom web, mobile, and automation systems for SMBs and mid-market teams. Real engineering, real deadlines.
              </div>
            </MountReveal>
            <MountReveal delay={520} y={12}>
              <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
                <a href="#contact" className="btn-primary">
                  Start a project
                  <span style={{ fontFamily: 'var(--mono)' }}>→</span>
                </a>
              </div>
            </MountReveal>
          </div>

          <MountReveal delay={280} y={20} duration={1000}>
            <HeroTerminal />
          </MountReveal>
        </div>
      </Container>
    </section>
  );
}

function HeroTerminal() {
  const isMobile = useIsMobile();
  const isNarrow = useIsNarrowMobile();
  // Each line is an array of {t, c} segments; null = blank spacer row.
  // c keys: p=prompt, k=command, a=accent, o=output, s=success-soft
  const COL = { p: C.text3, k: C.text, a: C.greenActive, o: C.text2, s: C.greenSoft };
  const LINES = [
    [{ t: '$ ', c: 'p' }, { t: 'git clone ', c: 'k' }, { t: 'git@github.com:client/platform', c: 'a' }],
    [{ t: "  Cloning into 'platform'... done", c: 'o' }],
    [{ t: '  → 3 branches · 418 commits · last push 2h ago', c: 'o' }],
    null,
    [{ t: '$ ', c: 'p' }, { t: 'npm install && npm run db:migrate', c: 'k' }],
    [{ t: '  → 1,341 packages added in 6.2s', c: 'o' }],
    [{ t: '  → postgres: ', c: 'o' }, { t: '5 migrations applied', c: 's' }, { t: ' · schema ready', c: 'o' }],
    null,
    [{ t: '$ ', c: 'p' }, { t: 'git commit -m ', c: 'k' }, { t: '"feat: stripe checkout + webhooks"', c: 'a' }],
    [{ t: '  → 4 files changed · +312 −22', c: 'o' }],
    null,
    [{ t: '$ ', c: 'p' }, { t: 'npm test && git push origin main', c: 'k' }],
    [{ t: '  → 138 tests passed · 0 failed', c: 'o' }],
    [{ t: '  → CI pipeline: ', c: 'o' }, { t: '✓ passing', c: 'a' }, { t: ' · deploying…', c: 'o' }],
    [{ t: '  ✓ live in 41s · zero downtime', c: 'a' }],
  ];

  const [s, setS] = React.useState({ li: 0, ci: 0, done: false });

  React.useEffect(() => {
    if (s.done) return;
    const line = LINES[s.li];

    // Spacer row — pause then advance
    if (line === null) {
      const id = setTimeout(() => {
        const next = s.li + 1;
        setS(next >= LINES.length
          ? { li: s.li, ci: 0, done: true }
          : { li: next, ci: 0, done: false });
      }, 280);
      return () => clearTimeout(id);
    }

    const total = line.reduce((n, seg) => n + seg.t.length, 0);
    const isCmd = line[0]?.t[0] === '$';

    // Still typing this line
    if (s.ci < total) {
      const id = setTimeout(
        () => setS(p => ({ ...p, ci: p.ci + 1 })),
        isCmd ? 52 : 10,
      );
      return () => clearTimeout(id);
    }

    // Line complete — pause then move to next
    const id = setTimeout(() => {
      const next = s.li + 1;
      setS(next >= LINES.length
        ? { li: s.li, ci: total, done: true }
        : { li: next, ci: 0, done: false });
    }, isCmd ? 360 : 55);
    return () => clearTimeout(id);
  }, [s.li, s.ci, s.done]);

  function renderPartial(segs, chars) {
    let rem = chars;
    return segs.map((seg, i) => {
      if (rem <= 0) return null;
      const vis = seg.t.slice(0, rem);
      rem -= seg.t.length;
      return vis ? <span key={i} style={{ color: COL[seg.c] }}>{vis}</span> : null;
    });
  }

  const cursor = (
    <span style={{
      display: 'inline-block', width: 6, height: '0.85em',
      background: C.greenActive, marginLeft: 1, verticalAlign: 'text-bottom',
      animation: 'mo-blink 0.8s steps(2) infinite',
    }} />
  );

  const lineStyle = { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' };

  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10,
      overflow: 'hidden', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)', marginTop: isMobile ? 4 : 16,
      maxWidth: '100%',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px', borderBottom: `1px solid ${C.border}`,
        background: C.elevated,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FF5F57' }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FFBD2E' }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28CA41' }} />
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.text3, display: isNarrow ? 'none' : 'inline' }}>~/client/platform — zsh</span>
      </div>
      <div style={{
        padding: isMobile ? '14px 14px 18px' : '20px 22px 24px', fontFamily: 'var(--mono)', fontSize: isNarrow ? 10.5 : isMobile ? 11.5 : 12.5,
        lineHeight: isMobile ? 1.65 : 1.75, minHeight: isMobile ? 260 : 340,
        overflowX: 'hidden',
      }}>
        {LINES.map((line, i) => {
          if (i > s.li) return null;
          if (line === null) return i < s.li ? <div key={i} style={{ height: 6 }} /> : null;
          if (i < s.li) {
            return (
              <div key={i} style={lineStyle}>
                {line.map((seg, j) => <span key={j} style={{ color: COL[seg.c] }}>{seg.t}</span>)}
              </div>
            );
          }
          // current line being typed
          return <div key={i} style={lineStyle}>{renderPartial(line, s.ci)}{!s.done && cursor}</div>;
        })}
        {s.done && <div><span style={{ color: C.text3 }}>$ </span>{cursor}</div>}
      </div>
    </div>
  );
}

// ─── Logo strip ─────────────────────────────────────────────────────────
function LogoStrip() {
  const clients = ['HALT FINANCE', 'NORTHBOUND', 'VERTEX LABS', 'ARC SYSTEMS', 'KILN', 'ATLAS LOGISTICS'];
  return (
    <section style={{
      borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      padding: '32px 0', background: 'rgba(0,0,0,0.2)',
    }}>
      <Container>
        <Reveal y={12}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 48,
            fontFamily: 'var(--mono)', fontSize: 12, color: C.text3,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            flexWrap: 'wrap', justifyContent: 'space-between',
          }}>
            <span style={{ color: C.text2 }}>// trusted by</span>
            {clients.map((c, i) => (
              <span key={i} style={{
                fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600,
                fontSize: 14, letterSpacing: '0.16em', color: C.text2,
              }}>{c}</span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ─── Services ───────────────────────────────────────────────────────────
const SERVICES = [
  {
    n: '01', title: 'Web Applications',
    desc: 'Production-grade web apps with real auth, real data, and real deploys. Built on stacks your team can own.',
    tags: ['Next.js', 'Postgres', 'TypeScript', 'Stripe'],
    time: 'from ~3 weeks',
  },
  {
    n: '02', title: 'Mobile Apps',
    desc: 'iOS and Android — native or cross-platform. Performance-tuned, App Store approved, telemetry baked in.',
    tags: ['Swift', 'Kotlin', 'React Native', 'Expo'],
    time: 'from ~6 weeks',
  },
  {
    n: '03', title: 'Marketing Sites',
    desc: 'Sites that load fast, rank well, and stay easy to edit. Headless CMS, A/B-ready, analytics-instrumented.',
    tags: ['Astro', 'Sanity', 'Vercel', 'Plausible'],
    time: 'from ~2 weeks',
  },
  {
    n: '04', title: 'Business Automation',
    desc: 'Custom internal tools and workflow systems. Replace spreadsheets and Zapier chains with real software.',
    tags: ['Node', 'Python', 'n8n', 'APIs'],
    time: 'from ~2 weeks',
  },
];

function ServicesSection() {
  const isMobile = useIsMobile();
  return (
    <section id="services" style={{ padding: isMobile ? '76px 0' : '120px 0' }}>
      <Container>
        <Reveal>
          <SectionHead
            tag="// what we build"
            title="Four services. One engineering team."
            subhead="No subcontractors. No handoffs to junior shops. The senior engineers who scope the work are the senior engineers who write it."
          />
        </Reveal>
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} y={28}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ n, title, desc, tags, time }) {
  const [hovered, setHovered] = React.useState(false);
  const isMobile = useIsMobile();
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#161616' : C.surface,
        border: `1px solid ${hovered ? C.borderStrong : C.border}`,
        borderRadius: 10, padding: isMobile ? '24px 22px 22px' : '32px 32px 28px',
        position: 'relative', overflow: 'hidden',
        transition: 'all 220ms',
        boxShadow: hovered ? `0 20px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px ${C.greenDim}` : 'none',
        cursor: 'pointer',
      }}>
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${C.greenActive}, transparent)`,
        }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? 24 : 32 }}>
        <ServiceIcon active={hovered} n={n} />
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          letterSpacing: '0.14em',
        }}>{n} / 04</span>
      </div>
      <h3 style={{
        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: isMobile ? 22 : 26,
        margin: 0, letterSpacing: '-0.02em',
      }}>{title}</h3>
      <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.6, margin: '12px 0 22px' }}>
        {desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tags.map((t) => (
          <span key={t} style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: C.text2,
            padding: '4px 9px', borderRadius: 4,
            background: C.elevated, border: `1px solid ${C.border}`,
          }}>{t}</span>
        ))}
      </div>
      <div style={{
        marginTop: 26, paddingTop: 20, borderTop: `1px solid ${C.border}`,
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between',
        gap: isMobile ? 12 : 0,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          letterSpacing: '0.06em',
        }}>{time}</span>
        <span style={{
          fontWeight: 500, fontSize: 13,
          color: hovered ? C.greenActive : C.text,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          transition: 'color 220ms',
        }}>
          See details
          <span style={{
            fontFamily: 'var(--mono)',
            transform: hovered ? 'translateX(2px)' : 'none',
            transition: 'transform 220ms',
          }}>→</span>
        </span>
      </div>
    </article>
  );
}

function ServiceIcon({ active, n }) {
  // Geometric icons indexed by service number.
  const stroke = active ? C.greenActive : C.text2;
  const fill = active ? C.greenActive : 'none';
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 8,
      background: active ? C.greenDim : C.elevated,
      border: `1px solid ${active ? C.green : C.borderStrong}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 220ms',
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={stroke} strokeWidth="1.4">
        {n === '01' && (<>
          <rect x="2" y="2" width="12" height="12" rx="1.5" />
          <rect x="8" y="8" width="12" height="12" rx="1.5" fill={fill} />
        </>)}
        {n === '02' && (<>
          <rect x="6" y="2" width="10" height="18" rx="2" />
          <line x1="10" y1="17" x2="12" y2="17" strokeLinecap="round" />
        </>)}
        {n === '03' && (<>
          <rect x="2" y="4" width="18" height="14" rx="1.5" />
          <line x1="2" y1="8" x2="20" y2="8" />
          <circle cx="5" cy="6" r="0.5" fill={stroke} />
          <circle cx="7" cy="6" r="0.5" fill={stroke} />
        </>)}
        {n === '04' && (<>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="16" cy="6" r="2.5" />
          <circle cx="11" cy="16" r="2.5" fill={fill} />
          <line x1="6" y1="8.5" x2="11" y2="13.5" />
          <line x1="16" y1="8.5" x2="11" y2="13.5" />
        </>)}
      </svg>
    </div>
  );
}

// ─── Process ────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Discover', dur: '~1 week',
    desc: 'We sit down with you — engineers, founders, ops. Define the problem, find the constraints, kill the wrong solutions early.' },
  { n: '02', title: 'Design', dur: '~1–2 weeks',
    desc: 'Architecture, interfaces, and edge cases on paper before code. We ship a scoping doc you can hand to any engineer.' },
  { n: '03', title: 'Build', dur: '~2–8 weeks',
    desc: 'Daily merges, weekly demos, no dark periods. You see the work as it happens. Tests, telemetry, and docs ship with every PR.' },
  { n: '04', title: 'Iterate', dur: 'ongoing',
    desc: 'After launch we stay on retainer if you want. Bug fixes, new features, performance tuning — same team, same Slack channel.' },
];

function ProcessSection() {
  const isMobile = useIsMobile();
  return (
    <section id="process" style={{
      padding: isMobile ? '76px 0' : '120px 0',
      borderTop: `1px solid ${C.border}`,
      background: 'rgba(0,0,0,0.18)',
    }}>
      <Container>
        <Reveal>
          <SectionHead
            tag="// how we work"
            title="Four phases. No fluff."
            subhead="Every engagement runs on the same rails. You'll know what's happening, when, and why — in writing."
          />
        </Reveal>
        <div style={{ position: 'relative' }}>
          {/* connector line */}
          <div style={{
            position: 'absolute', left: isMobile ? 20 : 24, top: 24, bottom: 24, width: 1,
            background: `linear-gradient(180deg, ${C.green}, transparent)`,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110} y={20} x={-12}>
                <StepRow {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepRow({ n, title, desc, dur }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', gap: isMobile ? 16 : 28, alignItems: 'flex-start' }}>
      <div style={{
        width: isMobile ? 40 : 48, height: isMobile ? 40 : 48, borderRadius: 24, flexShrink: 0,
        background: C.bg, border: `1px solid ${C.green}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: isMobile ? 12 : 13, color: C.greenActive, fontWeight: 500,
        boxShadow: `0 0 0 4px ${C.bg}`,
      }}>{n}</div>
      <div style={{
        flex: 1, background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: isMobile ? '18px 18px' : '20px 24px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: isMobile ? 12 : 24, alignItems: 'center',
      }}>
        <div>
          <h3 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 20,
            margin: 0, letterSpacing: '-0.015em',
          }}>{title}</h3>
          <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6, margin: '6px 0 0' }}>{desc}</p>
        </div>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: C.greenActive,
          padding: '4px 10px', borderRadius: 999,
          background: C.greenDim, letterSpacing: '0.06em',
          alignSelf: 'flex-start',
        }}>{dur}</span>
      </div>
    </div>
  );
}

// ─── Selected Work ──────────────────────────────────────────────────────
const WORK = [
  {
    client: 'Halt Finance', kind: 'Web Application',
    title: 'Onboarded 14k users to a regulated brokerage portal',
    metric: '4.2s p95 → 380ms', note: 'after re-architecture',
    pattern: 'orbits',
  },
  {
    client: 'Northbound Logistics', kind: 'Business Automation',
    title: 'Replaced a 60-tab spreadsheet with a routing engine',
    metric: '18 hrs/week saved', note: 'per dispatcher',
    pattern: 'grid',
  },
  {
    client: 'Vertex Labs', kind: 'Mobile App',
    title: 'Native iOS field-data app for offshore inspections',
    metric: '0 sync conflicts', note: 'in 9 months live',
    pattern: 'bars',
  },
];

function WorkSection() {
  return (
    <section id="work" style={{ padding: '120px 0' }}>
      <Container>
        <Reveal>
          <SectionHead
            tag="// selected work"
            title="Boring outcomes. Loud results."
            subhead="A few of the systems we've built recently. Names you may not know — running problems you'd recognize."
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {WORK.map((w, i) => (
            <Reveal key={w.client} delay={i * 120} y={28}>
              <WorkCard {...w} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WorkCard({ client, kind, title, metric, note, pattern }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface, border: `1px solid ${hovered ? C.borderStrong : C.border}`,
        borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
        transition: 'all 220ms',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}>
      <WorkVisual pattern={pattern} hovered={hovered} />
      <div style={{ padding: '22px 24px 24px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          letterSpacing: '0.06em', marginBottom: 14,
        }}>
          <span style={{ color: C.text2 }}>{client}</span>
          <span>{kind}</span>
        </div>
        <h3 style={{
          fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: 18,
          margin: 0, letterSpacing: '-0.01em', lineHeight: 1.35,
        }}>{title}</h3>
        <div style={{
          marginTop: 18, paddingTop: 16, borderTop: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 18, color: C.greenActive,
            fontWeight: 500, letterSpacing: '-0.01em',
          }}>{metric}</span>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          }}>{note}</span>
        </div>
      </div>
    </article>
  );
}

function WorkVisual({ pattern, hovered }) {
  // Geometric placeholder visuals — never illustration.
  return (
    <div style={{
      height: 200, background: C.bg, position: 'relative', overflow: 'hidden',
      borderBottom: `1px solid ${C.border}`,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={`fade-${pattern}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.bg} stopOpacity="0" />
            <stop offset="1" stopColor={C.bg} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {pattern === 'orbits' && (
          <g stroke={hovered ? C.greenActive : C.green} strokeWidth="0.6" fill="none" opacity="0.7">
            {[40, 70, 100, 130, 160].map((r) => (
              <circle key={r} cx="200" cy="100" r={r} />
            ))}
            <circle cx="200" cy="100" r="3" fill={C.greenActive} stroke="none" />
            <circle cx="270" cy="100" r="2" fill={C.text2} stroke="none" />
            <circle cx="120" cy="60" r="2" fill={C.text2} stroke="none" />
          </g>
        )}
        {pattern === 'grid' && (
          <g stroke={hovered ? C.greenActive : C.border} strokeWidth="1">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={'gv' + i} x1={i * 40} y1="0" x2={i * 40} y2="200" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={'gh' + i} x1="0" y1={i * 40} x2="400" y2={i * 40} />
            ))}
            <rect x="80" y="40" width="80" height="40" fill={C.greenDim} stroke={C.greenActive} />
            <rect x="240" y="120" width="80" height="40" fill={C.greenDim} stroke={C.greenActive} />
            <rect x="160" y="80" width="40" height="40" fill={C.green} stroke={C.greenActive} />
          </g>
        )}
        {pattern === 'bars' && (
          <g fill={hovered ? C.greenActive : C.green}>
            {[30, 60, 45, 90, 70, 120, 95, 140, 110, 80, 100, 130, 75, 60, 95].map((h, i) => (
              <rect key={i} x={20 + i * 24} y={180 - h} width="14" height={h} opacity={0.4 + (i % 4) * 0.15} />
            ))}
          </g>
        )}
        <rect width="400" height="200" fill={`url(#fade-${pattern})`} />
      </svg>
      <div style={{
        position: 'absolute', top: 14, left: 14,
        fontFamily: 'var(--mono)', fontSize: 10, color: C.text3,
        letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>// case study</div>
      <div style={{
        position: 'absolute', bottom: 14, right: 14,
        fontFamily: 'var(--mono)', fontSize: 10, color: hovered ? C.greenActive : C.text3,
        letterSpacing: '0.14em', transition: 'color 220ms',
      }}>read →</div>
    </div>
  );
}

// ─── Stats strip ────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { n: '78', label: 'projects shipped', sub: 'since 2019' },
    { n: '4.2', label: 'weeks avg delivery', sub: 'first build → live' },
    { n: '94%', label: 'client retention', sub: 'past 12 months' },
    { n: '0', label: 'subcontractors', sub: 'ever' },
  ];
  return (
    <section style={{
      padding: '64px 0',
      borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
      background: 'rgba(0,0,0,0.18)',
    }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} y={16}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
                  fontSize: 52, letterSpacing: '-0.03em', color: C.text, lineHeight: 1,
                }}>{s.n}</div>
                <div style={{ fontSize: 14, color: C.text2, fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.text3, letterSpacing: '0.06em' }}>// {s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ padding: isMobile ? '48px 0 28px' : '64px 0 32px', borderTop: `1px solid ${C.border}` }}>
      <Container>
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr 1fr', gap: isMobile ? 28 : 32,
          paddingBottom: isMobile ? 36 : 48,
        }}>
          <div>
            <Wordmark size={28} />
            <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6, marginTop: 18, maxWidth: 320 }}>
              Custom software for teams that need real engineering. Built different.
            </p>
            <div style={{
              marginTop: 18, fontFamily: 'var(--mono)', fontSize: 11,
              color: C.text3, letterSpacing: '0.06em',
            }}>
              <span style={{ color: C.greenActive }}>$</span> uptime: 99.98% · status: <span style={{ color: C.greenActive }}>operational</span>
            </div>
          </div>
          <FooterColumn title="Services" links={['Web Applications', 'Mobile Apps', 'Marketing Sites', 'Business Automation']} />
          <FooterColumn title="Company" links={['Process', 'Open roles', 'Engineering blog']} />
          <FooterColumn title="Contact" links={['info@bok-labs.com', 'Barcelona · Maracaibo']} />
        </div>
        <div style={{
          borderTop: `1px solid ${C.border}`, paddingTop: 24,
          display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 10 : 0,
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3, letterSpacing: '0.06em',
          lineHeight: 1.6,
        }}>
          <span>© 2026 BOK Labs, Inc · v2.4 · build 1a3f9c</span>
          <span>// built in-house</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14,
      }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <li key={l} style={{ fontSize: 14, color: C.text2 }}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

Object.assign(window, {
  Nav, Hero, ServicesSection, ProcessSection, WorkSection, Footer,
});
