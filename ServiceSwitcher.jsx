// SwissRelief 2.6 — Horizontal 5-service switcher bar under the header.
// Isolated stacking context (z-index: 10) so the language dropdown (z: 1100) stays above.
function ServiceSwitcher({ activeId, onPick, t }) {
  const services = [
    {
      id: 'calc',
      side: 'a',
      num: '01',
      badge: 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12 12 3l9 9M5 10v10h14V10"/>
        </svg>
      ),
      label: t.svc.calc,
      sub: 'EVAM · Hospice · AOZ'
    },
    {
      id: 'prof',
      side: 'a',
      num: '02',
      badge: 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 15l4-4 3 3 5-6"/>
        </svg>
      ),
      label: t.svc.prof,
      sub: 'Art. 21a LEI · CH-ISCO'
    },
    {
      id: 'sublease',
      side: 'b',
      num: '03',
      badge: 'B',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      label: t.svc.sublease,
      sub: '10–20% mobilier · ASLOCA'
    },
    {
      id: 'mentors',
      side: 'b',
      num: '04',
      badge: 'B',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: t.svc.mentors,
      sub: 'Art. 394 CO · Benevol'
    },
    {
      id: 'beta',
      side: null,
      num: '05',
      badge: 'FREE',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      label: t.svc.beta,
      sub: '0 CHF · Transparence'
    },
  ];

  return (
    <div className="v2-service-banner-wrap">
      <div className="v2-container">
        <nav className="v2-service-banner" aria-label="Modules SwissRelief">
          <div className="v2-service-inner">
            {services.map(s => (
              <button
                key={s.id}
                className={`v2-svc-btn ${activeId === s.id ? 'active' : ''} ${s.side ? `side-${s.side}` : ''}`}
                onClick={() => onPick(s.id, s.side)}
                aria-current={activeId === s.id ? 'true' : undefined}
              >
                <div className="v2-svc-top">
                  <span className="v2-svc-num">{s.num}</span>
                  <span className={`v2-svc-badge badge-${s.badge.toLowerCase()}`}>{s.badge}</span>
                </div>
                <div className="v2-svc-body">
                  <span className="v2-svc-icon" aria-hidden="true">{s.icon}</span>
                  <span className="v2-svc-label">{s.label}</span>
                </div>
                <div className="v2-svc-sub">{s.sub}</div>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

Object.assign(window, { ServiceSwitcher });
