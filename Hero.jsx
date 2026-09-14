// SwissRelief 2.6 — Hero with SHORT title, two-sided tab switcher, trust badges.
// Uses fluid grid `repeat(auto-fit, minmax(220px, 1fr))` for badges (ADR-017 anomaly #4 fix).
function HeroV2({ side, setSide, onOpenInfo, t }) {
  return (
    <section className="v2-hero" id="top">
      <div className="v2-container">
        {/* Role tabs moved to TOP per user screenshot */}
        <div className="v2-hero-tabs" role="tablist" aria-label="Public cible" style={{ marginBottom: 20 }}>
          <button
            className={`v2-hero-tab tab-a ${side === 'a' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'a'}
            onClick={() => setSide('a')}
          >
            <span className="v2-tab-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="v2-tab-body">
              <span className="v2-tab-label">{t?.tabs?.seekers || "Шукачам житла та роботи"}</span>
              <span className="v2-tab-sub">{t?.tabs?.seekersSub || "Статус S · Без посередників"}</span>
            </span>
          </button>
          <button
            className={`v2-hero-tab tab-b ${side === 'b' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'b'}
            onClick={() => setSide('b')}
          >
            <span className="v2-tab-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <span className="v2-tab-body">
              <span className="v2-tab-label">{t?.tabs?.solidarity || t?.tabs?.volunteers || "Швейцарським друзям"}</span>
              <span className="v2-tab-sub">{t?.tabs?.solSub || t?.tabs?.volunteersSub || "Господарям та волонтерам"}</span>
            </span>
          </button>
        </div>

        <h1 className="v2-hero-title">
          {t?.hero?.line1 || t?.hero?.title1 || "Гідне житло, легальна робота —"}<br/>
          <span className="v2-hero-accent">{t?.hero?.line2 || t?.hero?.title2 || "без шахраїв та посередників."}</span>
        </h1>
        <p className="v2-hero-sub">{t?.hero?.lede || ""}</p>

        <div className="v2-hero-cta-group hero-ctas">
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-btn v2-btn-primary v2-btn-tg btn tg lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>{t?.hero?.ctaBot || "Запустити АКОРД у Telegram"}</span>
          </a>
          <a
            href="/app/"
            className="v2-btn v2-btn-secondary btn primary lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
            <span>{t?.hero?.ctaApp || "Відкрити Mini App"}</span>
          </a>
          <button
            onClick={() => onOpenInfo ? onOpenInfo('guide') : (window.location.hash = 'guide')}
            className="v2-btn v2-btn-secondary btn ghost lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}
          >
            <span>📖 {t?.nav?.guide || "Як користуватись"}</span>
          </button>
        </div>

        <div className="v2-trust-grid">
          {(t?.trust || []).map((m, i) => (
            <div key={i} className={`v2-trust-tile rail-${['emerald','crimson','gold','cyan'][i % 4]}`}>
              <div className="v2-trust-label">{m.k}</div>
              <div className="v2-trust-value">{m.v}</div>
              <div className="v2-trust-desc">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FourPillars({ onOpenInfo, t }) {
  const p = t?.pillars || {
    eyebrow: "POURQUOI L'ACCORD ?",
    title: "Quatre piliers de confiance, sans jargon.",
    sub: "Un outil d'action directe conçu pour la réalité suisse.",
    items: [
      { idx: "01", cls: "pillar-1", icon: "⚡", title: "Vitesse décisive", body: "Alertes Telegram en moins de 60 secondes.", kpi: { n: "< 60 s", l: "temps de signal" } },
      { idx: "02", cls: "pillar-2", icon: "🤖", title: "Copilote IA 24/7", body: "Normes suisses pour CV et lettres de motivation.", kpi: { n: "Claude · GPT", l: "modèles suisses" } },
      { idx: "03", cls: "pillar-3", icon: "🤝", title: "Mentors suisses", body: "Réseau de bénévoles suisses (Benevol).", kpi: { n: "148+", l: "mentors actifs" } },
      { idx: "04", cls: "pillar-4", icon: "🛡️", title: "Conformité totale", body: "100% gratuit selon la loi LSE et Art. 262 CO.", kpi: { n: "LPD · LSE", l: "cadre légal" } }
    ]
  };

  return (
    <section className="pillars-section" id="pillars" style={{ padding: '40px 0', borderBottom: '1px solid var(--line-2)' }}>
      <div className="v2-container">
        <div className="section-head" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 32px' }}>
          <span className="eyebrow" style={{ fontSize: 11.5, letterSpacing: '0.12em', color: 'var(--swiss-red)', textTransform: 'uppercase', fontWeight: 700 }}>{p.eyebrow}</span>
          <h2 className="section-title" style={{ fontSize: 26, fontWeight: 800, margin: '6px 0 10px', letterSpacing: '-0.02em', color: '#fff' }}>{p.title}</h2>
          <p className="section-sub" style={{ fontSize: 14, color: 'var(--muted)', margin: 0 }}>{p.sub}</p>
        </div>
        <div className="pillar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {(p.items || []).map((it) => (
            <article key={it.idx} className={`pillar-card ${it.cls}`} style={{
              background: 'rgba(15,23,42,.65)', border: '1px solid var(--line-2)', borderRadius: 16, padding: 20,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <div>
                <div className="pillar-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className="pillar-idx" style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{it.idx}</span>
                  <span className="pillar-icon" style={{ fontSize: 22 }} aria-hidden="true">{it.icon}</span>
                </div>
                <h3 className="pillar-title" style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{it.title}</h3>
                <p className="pillar-body" style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: '0 0 16px' }}>{it.body}</p>
              </div>
              <div className="pillar-kpi" style={{ borderTop: '1px solid var(--line-1)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="kpi-num" style={{ fontFamily: 'var(--f-mono)', fontSize: 14, fontWeight: 700, color: '#10B981' }}>{it.kpi.n}</span>
                <span className="kpi-lbl" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{it.kpi.l}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Action buttons to open deep-dive modals */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <button
            onClick={() => onOpenInfo ? onOpenInfo('why') : (window.location.hash = 'why')}
            className="btn ghost"
            style={{ padding: '8px 16px', fontSize: 13, cursor: 'pointer', borderColor: 'rgba(16,185,129,0.3)', color: '#34D399' }}
          >
            ⭐ {t?.nav?.why ? `Порівняння: ${t.nav.why}` : "Чому ми кращий варіант"}
          </button>
          <button
            onClick={() => onOpenInfo ? onOpenInfo('guide') : (window.location.hash = 'guide')}
            className="btn ghost"
            style={{ padding: '8px 16px', fontSize: 13, cursor: 'pointer', borderColor: 'rgba(56,189,248,0.3)', color: '#38BDF8' }}
          >
            📖 {t?.nav?.guide || "Як користуватись"}
          </button>
          <button
            onClick={() => onOpenInfo ? onOpenInfo('about') : (window.location.hash = 'about')}
            className="btn ghost"
            style={{ padding: '8px 16px', fontSize: 13, cursor: 'pointer' }}
          >
            🏛️ {t?.nav?.about || "Про проєкт АКОРД"}
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroV2, FourPillars });
