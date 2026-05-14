// landing-contact.jsx — Contact section with working form (mailto submit).

function ContactSection() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{
      padding: isMobile ? '76px 0' : '120px 0',
      borderTop: `1px solid ${C.border}`,
      background: `linear-gradient(180deg, rgba(20,54,31,0.08), transparent 60%)`,
      position: 'relative',
    }}>
      <Container>
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80, alignItems: 'start',
        }}>
          <Reveal y={20}><ContactLeft /></Reveal>
          <Reveal y={20} delay={120}><ContactForm /></Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactLeft() {
  const isMobile = useIsMobile();
  return (
    <div style={{ position: isMobile ? 'relative' : 'sticky', top: isMobile ? 'auto' : 100 }}>
      <div className="eyebrow" style={{ marginBottom: 18 }}>// start a project</div>
      <h2 style={{
        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
        fontSize: isMobile ? 42 : 56, letterSpacing: '-0.035em', lineHeight: isMobile ? 1.06 : 1.02, margin: 0,
      }}>
        Tell us<br/>
        <span style={{ color: C.text2 }}>what you're</span><br/>
        building<span style={{ color: C.greenActive }}>.</span>
      </h2>
      <p style={{ fontSize: isMobile ? 16 : 17, color: C.text2, lineHeight: 1.6, marginTop: 24, maxWidth: 420 }}>
        Send us the rough shape. We'll come back within one business day with questions, a timeline, and a budget range — no slides, no pitch deck.
      </p>

      <div style={{
        marginTop: isMobile ? 28 : 36, padding: isMobile ? '18px 18px' : '20px 22px',
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <ContactRow k="email" v="info@bok-labs.com" href="mailto:info@bok-labs.com" />
        <ContactRow k="reply"  v="< 1 business day" highlight />
      </div>

      <div style={{
        marginTop: 24,
        fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
        letterSpacing: '0.06em', lineHeight: 1.7,
      }}>
        <div>// avg first-response: 4h 12m</div>
        <div>// avg time-to-quote: 36h</div>
      </div>
    </div>
  );
}

function ContactRow({ k, v, href, highlight }) {
  const body = (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 12, flexWrap: 'wrap',
      paddingBottom: 12, borderBottom: `1px solid ${C.border}`,
    }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 11,
        color: C.text3, letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>{k}</span>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 13,
        color: highlight ? C.greenActive : C.text, fontWeight: 500,
        whiteSpace: 'nowrap',
      }}>{v}</span>
    </div>
  );
  return href ? <a href={href} style={{ display: 'block' }}>{body}</a> : body;
}

// ─── The form ───────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  'Web application', 'Mobile app', 'Marketing site', 'Business automation', 'Not sure yet',
];
const BUDGETS = [
  '< $2k', '$2k–$5k', '$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+',
];

function ContactForm() {
  const isMobile = useIsMobile();
  const [form, setForm] = React.useState({
    name: '', email: '', company: '', type: '', budget: '', message: '',
  });
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Looks off — double-check?';
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'A few sentences please — 20+ chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const subject = `Project inquiry — ${form.name}${form.company ? ` @ ${form.company}` : ''}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || '—'}`,
      `Project type: ${form.type || '—'}`,
      `Budget: ${form.budget || '—'}`,
      '',
      '— Message —',
      form.message,
      '',
      '— Sent from bok-labs.com contact form —',
    ].join('\n');
    const url = `mailto:info@bok-labs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Open mail client
    window.location.href = url;
    // Show success state in-page
    setTimeout(() => {
      setSent(true);
      setSubmitting(false);
    }, 400);
  };

  if (sent) return <SentState onReset={() => { setSent(false); setForm({ name: '', email: '', company: '', type: '', budget: '', message: '' }); }} />;

  return (
    <form onSubmit={submit} noValidate style={{
      background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12,
      padding: isMobile ? '22px 20px 22px' : '32px 36px 28px',
      display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 22,
    }}>
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 10 : 0,
        paddingBottom: 18, borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: 4, background: C.greenActive, boxShadow: `0 0 8px ${C.greenActive}` }} />
          form / inquiry
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, color: C.text4,
          letterSpacing: '0.06em',
        }}>POST → info@bok-labs.com</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
        <Field label="Name" req k="name" v={form.name} onChange={set('name')} err={errors.name} placeholder="Alex Okafor" />
        <Field label="Email" req k="email" v={form.email} onChange={set('email')} err={errors.email} placeholder="alex@company.com" type="email" />
      </div>

      <Field label="Company" k="company" v={form.company} onChange={set('company')} placeholder="Acme Co. — optional" />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
        <SelectField label="Project type" k="type" v={form.type} onChange={set('type')} options={PROJECT_TYPES} />
        <SelectField label="Budget range" k="budget" v={form.budget} onChange={set('budget')} options={BUDGETS} />
      </div>

      <Field
        label="What are you trying to build?"
        req k="message" v={form.message} onChange={set('message')} err={errors.message}
        placeholder="A few sentences about the problem, who uses the product, and any deadlines."
        multiline rows={6}
      />

      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: 16,
        marginTop: 4,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
          letterSpacing: '0.06em',
        }}>
          // we'll reply within <span style={{ color: C.greenActive }}>1 business day</span>
        </div>
        <button type="submit" disabled={submitting} className="btn-primary"
          style={{ opacity: submitting ? 0.7 : 1, whiteSpace: 'nowrap', justifyContent: 'center', width: isMobile ? '100%' : 'auto' }}>
          {submitting ? 'Sending…' : 'Send inquiry'}
          <span style={{ fontFamily: 'var(--mono)' }}>{submitting ? '…' : '→'}</span>
        </button>
      </div>
    </form>
  );
}

function Field({ label, req, k, v, onChange, placeholder, err, type = 'text', multiline = false, rows = 4 }) {
  const isMobile = useIsMobile();
  const baseStyle = {
    width: '100%', background: C.bg, color: C.text,
    border: `1px solid ${err ? C.danger : C.border}`,
    borderRadius: 6, padding: '12px 14px',
    fontSize: isMobile ? 16 : 14, lineHeight: 1.5,
    outline: 'none', transition: 'border-color 150ms',
    fontFamily: 'inherit',
    resize: multiline ? 'vertical' : 'none',
  };
  const onFocus = (e) => { if (!err) e.target.style.borderColor = C.borderStrong; };
  const onBlur = (e) => { if (!err) e.target.style.borderColor = C.border; };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
        letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>
        <span>{label}{req && <span style={{ color: C.greenActive, marginLeft: 4 }}>*</span>}</span>
        {err && <span style={{ color: C.danger, textTransform: 'none', letterSpacing: 0, fontSize: 10 }}>{err}</span>}
      </span>
      {multiline ? (
        <textarea name={k} value={v} onChange={onChange} placeholder={placeholder}
          rows={rows} style={baseStyle} onFocus={onFocus} onBlur={onBlur} />
      ) : (
        <input name={k} type={type} value={v} onChange={onChange} placeholder={placeholder}
          style={baseStyle} onFocus={onFocus} onBlur={onBlur} />
      )}
    </label>
  );
}

function SelectField({ label, k, v, onChange, options }) {
  const isMobile = useIsMobile();
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{
        fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
        letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>{label}</span>
      <div style={{ position: 'relative' }}>
        <select name={k} value={v} onChange={onChange} style={{
          width: '100%', background: C.bg, color: v ? C.text : C.text3,
          border: `1px solid ${C.border}`, borderRadius: 6,
          padding: '12px 36px 12px 14px', fontSize: isMobile ? 16 : 14,
          appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
          outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
        }}>
          <option value="" style={{ color: C.text3 }}>Select…</option>
          {options.map((o) => <option key={o} value={o} style={{ color: C.text, background: C.surface }}>{o}</option>)}
        </select>
        <span style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'var(--mono)', color: C.text3, pointerEvents: 'none', fontSize: 12,
        }}>▾</span>
      </div>
    </label>
  );
}

function SentState({ onReset }) {
  const isMobile = useIsMobile();
  return (
    <div style={{
      background: C.surface, border: `1px solid ${C.green}`, borderRadius: 12,
      padding: isMobile ? '42px 22px' : '60px 36px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.greenActive}, transparent)`,
      }} />
      <div style={{
        width: 64, height: 64, borderRadius: 32,
        background: C.greenDim, border: `1px solid ${C.green}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: 28, color: C.greenActive,
      }}>✓</div>
      <h3 style={{
        fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, fontSize: 28,
        margin: 0, letterSpacing: '-0.02em',
      }}>Inquiry sent.</h3>
      <p style={{ fontSize: 15, color: C.text2, lineHeight: 1.55, maxWidth: 380, margin: 0 }}>
        Your mail client should have opened with the message pre-filled. If it didn't,
        email us directly at <a href="mailto:info@bok-labs.com" style={{ color: C.greenActive, textDecoration: 'underline' }}>info@bok-labs.com</a>.
      </p>
      <div style={{
        marginTop: 8, fontFamily: 'var(--mono)', fontSize: 11, color: C.text3,
        letterSpacing: '0.06em',
      }}>
        // we'll reply within 1 business day
      </div>
      <button onClick={onReset} className="btn-ghost" style={{ marginTop: 12 }}>
        Send another
      </button>
    </div>
  );
}

Object.assign(window, { ContactSection });
