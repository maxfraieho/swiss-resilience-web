// SwissRelief 2.6 — Portal-mounted full-height drawer.
// Uses ReactDOM.createPortal(..., document.body) to escape ANY parent containing block (ADR-017).
function MobileDrawer({ lang, setLang, side, setSide, onClose, onOpenDonate, t }) {
  const FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦" };
  const NAMES = { fr: "Français", de: "Deutsch", it: "Italiano", uk: "Українська" };

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const gotoService = (targetSide, id) => {
    if (targetSide) setSide(targetSide);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const services = [
    {
      id: 'calc',
      side: 'a',
      label: t.svc.calc,
      sub: 'EVAM · Hospice · AOZ',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12 12 3l9 9M5 10v10h14V10"/>
        </svg>
      )
    },
    {
      id: 'prof',
      side: 'a',
      label: t.svc.prof,
      sub: 'Art. 21a LEI · CH-ISCO',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 15l4-4 3 3 5-6"/>
        </svg>
      )
    },
    {
      id: 'sublease',
      side: 'b',
      label: t.svc.sublease,
      sub: '10–20% mobilier · ASLOCA',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      id: 'mentors',
      side: 'b',
      label: t.svc.mentors,
      sub: 'Art. 394 CO · Benevol',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      id: 'beta',
      side: null,
      label: t.svc.beta,
      sub: '0 CHF · Transparence',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    },
  ];

  const overlay = (
    <div className="v2-drawer-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside className="v2-drawer" role="dialog" aria-label="Menu SwissRelief" aria-modal="true">
        <div className="v2-drawer-head">
          <div className="v2-brand">
            <span className="v2-brand-badge">
              <BrandMark size={20}/>
            </span>
            <span className="v2-brand-name">SwissRelief<span>Pan-Swiss 2.6</span></span>
          </div>
          <button className="v2-drawer-close" onClick={onClose} aria-label="Fermer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* 2×2 language grid — the mobile sandwich language switch */}
        <section className="v2-drawer-section">
          <div className="v2-drawer-section-title">{t.drawer.language}</div>
          <div className="v2-lang-grid">
            {['fr','de','it','uk'].map(l => (
              <button key={l} className={`v2-lang-tile ${l === lang ? 'active' : ''}`} onClick={() => { setLang(l); onClose(); }}>
                <span className="v2-lang-tile-flag" aria-hidden="true">{FLAGS[l]}</span>
                <span className="v2-lang-tile-name">{NAMES[l]}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="v2-drawer-section">
          <div className="v2-drawer-section-title">{t.drawer.modules}</div>
          <div className="v2-drawer-services">
            {services.map(s => (
              <button key={s.id} className="v2-drawer-service" onClick={() => gotoService(s.side, s.id)}>
                <span className={`v2-drawer-svc-icon ${s.side ? `side-${s.side}` : ''}`}>{s.icon}</span>
                <span className="v2-drawer-svc-body">
                  <span className="v2-drawer-svc-label">{s.label}</span>
                  <span className="v2-drawer-svc-sub">{s.sub}</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <path d="M9 6l6 6-6 6"/>
                </svg>
              </button>
            ))}
          </div>
        </section>

        <div className="v2-drawer-actions">
          <button className="v2-btn v2-btn-primary" style={{ width: '100%' }} onClick={() => { onClose(); onOpenDonate(); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {t.donate}
          </button>
          <a href="https://t.me/SwissResilienceHubBot" target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-ghost" style={{ width: '100%', marginTop: 10 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            @SwissResilienceHubBot
          </a>
          <p className="v2-drawer-legal">
            Association en création — Art. 60–79 CC Suisse<br/>
            Bêta publique · Aucun émolument · Aucun abonnement payant
          </p>
        </div>
      </aside>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

Object.assign(window, { MobileDrawer });
