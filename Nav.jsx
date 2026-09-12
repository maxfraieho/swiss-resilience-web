// SwissRelief 2.6 — Sticky header (NO backdrop-filter on the wrap = no containing-block trap, ADR-017)
function BrandMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#D52B1E"/>
      <rect x="10.5" y="5" width="3" height="14" fill="#F8FAFC"/>
      <rect x="5" y="10.5" width="14" height="3" fill="#F8FAFC"/>
      <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="0.6" opacity="0.55" fill="none"/>
    </svg>
  );
}

function TopBannerV2({ t }) {
  return (
    <div className="v2-top-banner" role="status">
      <div className="v2-container v2-top-banner-inner">
        <span className="v2-top-dot" aria-hidden="true"/>
        <span>{t.banner}</span>
      </div>
    </div>
  );
}

function NavV2({ lang, setLang, side, setSide, onOpenDrawer, onOpenDonate, t }) {
  const [langOpen, setLangOpen] = React.useState(false);
  const FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦" };
  const NAMES = { fr: "Français", de: "Deutsch", it: "Italiano", uk: "Українська" };
  const LABELS = { fr: "FR", de: "DE", it: "IT", uk: "UK" };

  React.useEffect(() => {
    const closeOnOutside = (e) => { if (!e.target.closest('.v2-lang-dropdown')) setLangOpen(false); };
    const closeOnEsc = (e) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('click', closeOnOutside);
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('click', closeOnOutside);
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, []);

  return (
    <header className="v2-sticky-header" role="banner">
      {/* Row 1: brand + desktop nav + actions */}
      <div className="v2-container v2-nav-row">
        <a href="#top" className="v2-brand" aria-label="SwissRelief">
          <span className="v2-brand-badge"><BrandMark size={22}/></span>
          <span className="v2-brand-name">
            SwissRelief
            <span>Pan-Swiss 2.6</span>
          </span>
        </a>

        <div className="v2-nav-tagline" aria-hidden="true">
          <span className="v2-mono-tag">26 CANTONS · 4 LANGUES · ART. 60–79 CC</span>
        </div>

        <div className="v2-nav-actions">
          {/* Desktop language dropdown — MOBILE HIDDEN via CSS */}
          <div className="v2-lang-dropdown v2-desktop-only">
            <button
              className="v2-lang-btn"
              aria-expanded={langOpen}
              aria-haspopup="menu"
              aria-label="Sélectionner la langue"
              onClick={(e) => { e.stopPropagation(); setLangOpen(v => !v); }}
            >
              <span aria-hidden="true">{FLAGS[lang]}</span>
              <span>{LABELS[lang]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 180ms' }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {langOpen && (
              <div className="v2-lang-menu" role="menu">
                {['fr','de','it','uk'].map(l => (
                  <button
                    key={l}
                    className={`v2-lang-item ${l === lang ? 'active' : ''}`}
                    role="menuitemradio"
                    aria-checked={l === lang}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                  >
                    <span className="v2-lang-flag" aria-hidden="true">{FLAGS[l]}</span>
                    <span className="v2-lang-name">{NAMES[l]}</span>
                    {l === lang && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="https://t.me/SwissResilienceHubBot" target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-ghost v2-desktop-only">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>Bot Telegram</span>
          </a>

          <button className="v2-btn v2-btn-primary v2-donate" onClick={onOpenDonate} aria-label={t.donate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span className="v2-donate-label">{t.donate}</span>
          </button>

          {/* Mobile active language badge */}
          <button
            className="v2-mobile-only"
            onClick={onOpenDrawer}
            aria-label="Changer de langue"
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-active)',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--gold-cream)',
              display: 'none',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span aria-hidden="true">{FLAGS[lang]}</span>
            <span>{LABELS[lang]}</span>
          </button>

          {/* Mobile hamburger menu */}
          <button className="v2-hamburger v2-mobile-only" onClick={onOpenDrawer} aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { NavV2, TopBannerV2, BrandMark });
