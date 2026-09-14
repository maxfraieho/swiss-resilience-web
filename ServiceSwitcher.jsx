// SwissRelief 2.6 — Horizontal 5-service switcher bar under the header.
// Isolated stacking context (z-index: 10) so the language dropdown (z: 1100) stays above.
function ServiceSwitcher({ activeId, onPick, t }) {
  const sw = t?.switcher || {};

  const services = [
    {
      id: 'housing',
      side: 'a',
      num: '01',
      badge: sw.housing?.badge || 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12 12 3l9 9M5 10v10h14V10"/>
        </svg>
      ),
      label: sw.housing?.label || t?.nav?.housing || "Житло",
      sub: sw.housing?.sub || "Оренда та EVAM"
    },
    {
      id: 'prof',
      side: 'a',
      num: '02',
      badge: sw.prof?.badge || 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M7 15l4-4 3 3 5-6"/>
        </svg>
      ),
      label: sw.prof?.label || t?.nav?.jobs || "Робота",
      sub: sw.prof?.sub || "Вакансії та CV"
    },
    {
      id: 'calc',
      side: 'a',
      num: '03',
      badge: sw.calc?.badge || 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/>
        </svg>
      ),
      label: sw.calc?.label || t?.svc?.calc || "Калькулятор",
      sub: sw.calc?.sub || "Ліміти 26 кантонів"
    },
    {
      id: 'dossier',
      side: 'a',
      num: '04',
      badge: sw.dossier?.badge || 'A',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>
        </svg>
      ),
      label: sw.dossier?.label || t?.nav?.dossier || "Досьє",
      sub: sw.dossier?.sub || "Пакет для режі"
    },
    {
      id: 'sublease',
      side: 'b',
      num: '05',
      badge: sw.sublease?.badge || 'B',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      label: sw.sublease?.label || t?.svc?.sublease || "Суборенда",
      sub: sw.sublease?.sub || "Кімната в оренду"
    },
    {
      id: 'mentors',
      side: 'b',
      num: '06',
      badge: sw.mentors?.badge || 'B',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: sw.mentors?.label || t?.svc?.mentors || "Ментори",
      sub: sw.mentors?.sub || "Волонтери Benevol"
    },
    {
      id: 'beta',
      side: null,
      num: '07',
      badge: sw.beta?.badge || 'FREE',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      label: sw.beta?.label || t?.svc?.beta || "Підтримка",
      sub: sw.beta?.sub || "Вільна бета"
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
