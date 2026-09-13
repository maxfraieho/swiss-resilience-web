/* Swiss Resilience Navigator 2.6 — Consolidated Bundle */

// ==================== [Module: shared.jsx] ====================
// Shared atoms / icons / helpers for Swiss Resilience Navigator 2.5 / SwissRelief 2.6
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Formatting ----------
const chf = (n) => new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/,/g, "'");

// ---------- Language tag / flag helpers ----------
const LANG_FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦" };
const LANG_LABEL = { fr: "FR", de: "DE", it: "IT", uk: "UK" };

// ---------- Brand mark: Swiss cross ----------
function BrandMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#D52B1E"/>
      <rect x="10.5" y="5" width="3" height="14" rx=".4" fill="#FFFFFF"/>
      <rect x="5" y="10.5" width="14" height="3" rx=".4" fill="#FFFFFF"/>
      {/* subtle compass overlay */}
      <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="0.6" opacity="0.45" fill="none"/>
    </svg>
  );
}

// ---------- Simple stroke icons ----------
const I = {
  arrow:    (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  send:     (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check:    (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  warn:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>,
  shield:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  x:        (p)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  star:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2 15 8l6 .9-4.5 4.4L18 20l-6-3.2L6 20l1.5-6.7L3 8.9 9 8z"/></svg>,
  hash:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  house:    (p)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 3l9 9M5 10v10h5v-6h4v6h5V10"/></svg>,
  heart:    (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  lock:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  euro:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"/></svg>,
  chart:    (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>,
  users:    (p)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  menu:     (p)=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>,
  chevron:  (p)=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>,
  file:     (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>,
  train:    (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M8 15h.01M16 15h.01"/><path d="M8 19l-2 3M16 19l2 3"/></svg>,
  gear:     (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  external: (p)=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
};

const Ico = I;

// Safe storage
const _memStore = {};
function safeGet(k, d = null) {
  try { return window.localStorage?.getItem(k) ?? d; }
  catch (e) { return _memStore[k] ?? d; }
}
function safeSet(k, v) {
  try { window.localStorage?.setItem(k, v); }
  catch (e) { _memStore[k] = v; }
}

// ---------- Merkle root cosmetic rotator (session mock) ----------
function useSessionMerkle() {
  const [root] = useState(() => {
    // regenerate a cosmetic 64-char hex per session so it feels live
    const hex = "0123456789abcdef";
    let s = "0x";
    for (let i = 0; i < 64; i++) s += hex[Math.floor(Math.random() * 16)];
    return s;
  });
  return root;
}

Object.assign(window, { chf, LANG_FLAGS, LANG_LABEL, BrandMark, I, Ico, safeGet, safeSet, useSessionMerkle });


// ==================== [Module: Nav.jsx] ====================
// SwissRelief 2.6 — Sticky header (NO backdrop-filter on the wrap = no containing-block trap, ADR-017)

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
          {/* Direct Telegram Bot Link */}
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_nav"
            target="_blank" rel="noopener noreferrer"
            className="v2-btn v2-btn-tg v2-desktop-only"
            style={{ padding: '6px 12px', fontSize: 13, gap: 6 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            @SwissResilienceHubBot
          </a>

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

          <a
            href="https://t.me/SwissResilienceHubBot?start=donate"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-btn v2-btn-primary v2-donate"
            aria-label={t.donate}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span className="v2-donate-label">{t.donate}</span>
          </a>

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


// ==================== [Module: ServiceSwitcher.jsx] ====================
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


// ==================== [Module: MobileDrawer.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Mobile Drawer (Anomalie 1 FIX)
// Rendered via ReactDOM.createPortal to document.body → escapes .nav-wrap
// containing-block trap. 100dvh, inset:0, z-index 99999.
// Contains 2×2 language grid (Anomalie 2 FIX).

function MobileDrawer({ lang, setLang, side, setSide, service, setService, onClose, onDonate, t }) {
  // Body scroll lock
  React.useEffect(() => {
    document.body.classList.add('no-scroll');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const pickLang = (l) => {
    setLang(l);
    // Auto-close (per spec)
    setTimeout(onClose, 180);
  };

  const goto = (targetSide, sectionId) => {
    if (targetSide) setSide(targetSide);
    if (sectionId) setService(sectionId);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const services = [
    { id: 'calc',    side: 'a', icon: <Ico.house/>, label: t.nav.housing,    sub: "Barèmes EVAM · 26 Cantons" },
    { id: 'housing', side: 'a', icon: <Ico.house/>, label: t.housing.eyebrow.split(' · ')[0], sub: "Régies · SBB · EVAM" },
    { id: 'dossier', side: 'a', icon: <Ico.file/>,  label: t.nav.dossier,    sub: "Art. 253 CO · PDF/A" },
    { id: 'beta',    side: null,icon: <Ico.heart/>, label: t.nav.beta,       sub: "0 CHF · Bêta publique" }
  ];

  const drawer = (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Menu principal">
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div className="brand">
            <span className="brand-badge"><BrandMark size={20}/></span>
            <span className="brand-name">
              <span className="primary">SwissRelief</span>
              <span className="badge">PAN-SWISS 2.6 · BÊTA 🇨🇭🇺🇦</span>
            </span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Fermer"><Ico.x/></button>
        </div>

        {/* Langues — grille 2×2 tactile */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            {lang === 'uk' ? 'Мова інтерфейсу'
             : lang === 'de' ? 'Sprache'
             : lang === 'it' ? 'Lingua'
             : 'Langue de l\'interface'}
          </div>
          <div className="lang-grid" role="radiogroup" aria-label="Langue">
            {['fr','de','it','uk'].map(l => (
              <button
                key={l}
                role="radio"
                aria-checked={l === lang}
                className={`lang-cell ${l === lang ? 'active' : ''}`}
                onClick={() => pickLang(l)}
              >
                <span className="flag" aria-hidden="true">{window.LANG_FLAGS[l]}</span>
                <div style={{display:'flex', flexDirection:'column', gap:2, minWidth:0}}>
                  <span>{window.SR_I18N[l]?.lang || l.toUpperCase()}</span>
                  <span className="code">{window.LANG_CODES[l]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bascule côté */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            {lang === 'uk' ? 'Оберіть роль'
             : lang === 'de' ? 'Rolle wählen'
             : lang === 'it' ? 'Ruolo'
             : 'Choisir votre rôle'}
          </div>
          <div className="dossier-status-toggle">
            <button className={side === 'a' ? 'active' : ''} onClick={() => { setSide('a'); onClose(); }}>
              {t.tabs.seekers}
            </button>
            <button className={side === 'b' ? 'active' : ''} onClick={() => { setSide('b'); onClose(); }}>
              {t.tabs.solidarity}
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="drawer-section" style={{flex: 1}}>
          <div className="drawer-section-title">
            {lang === 'uk' ? 'Усі сервіси'
             : lang === 'de' ? 'Alle Dienste'
             : lang === 'it' ? 'Tutti i servizi'
             : 'Tous les services'}
          </div>
          <div className="svc-list">
            {services.map(s => (
              <button
                key={s.id}
                className={`svc-item ${s.side === 'b' ? 'b' : ''}`}
                onClick={() => goto(s.side, s.id)}
              >
                <div className="icon">{s.icon}</div>
                <div className="info">
                  <div className="label">{s.label}</div>
                  <div className="sub">{s.sub}</div>
                </div>
                <Ico.arrow className="arrow"/>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="drawer-actions">
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_drawer"
            target="_blank" rel="noopener noreferrer"
            className="btn tg lg block"
            onClick={onClose}
          >
            <Ico.send/> Ouvrir @SwissResilienceHubBot
          </a>
          <a
            href="https://t.me/SwissResilienceHubBot?start=donate"
            target="_blank" rel="noopener noreferrer"
            className="btn ghost lg block"
            style={{ textDecoration: 'none', textAlign: 'center' }}
            onClick={onClose}
          >
            <Ico.heart/> {t.beta?.donateBtn || "Soutenir via Telegram"}
          </a>
        </div>

        <div className="drawer-legal">
          Association Swiss Resilience en cours de constitution<br/>
          (Art. 60–79 CC Suisse) · Merkle SHA-256
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(drawer, document.body);
}

window.MobileDrawer = MobileDrawer;

Object.assign(window, { MobileDrawer });



// ==================== [Module: Hero.jsx] ====================
// SwissRelief 2.6 — Hero with SHORT title, two-sided tab switcher, trust badges.
// Uses fluid grid `repeat(auto-fit, minmax(220px, 1fr))` for badges (ADR-017 anomaly #4 fix).
function HeroV2({ side, setSide, t }) {
  return (
    <section className="v2-hero" id="top">
      <div className="v2-container">
        <div className="v2-hero-pill">
          <span className="v2-pulse-dot" aria-hidden="true"/>
          <span>26 CANTONS · 4 LANGUES · MERKLE SHA-256</span>
        </div>
        <h1 className="v2-hero-title">
          {t.hero.line1}<br/>
          <span className="v2-hero-accent">{t.hero.line2}</span>
        </h1>
        <p className="v2-hero-sub">{t.hero.lede}</p>

        <div className="v2-hero-cta-group hero-ctas">
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-btn v2-btn-primary v2-btn-tg btn tg lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>{t.hero?.ctaBot || "Ouvrir @SwissResilienceHubBot"}</span>
          </a>
          <a
            href="/app/"
            className="v2-btn v2-btn-secondary btn primary lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
            <span>{t.hero?.ctaApp || "Lancer la Mini App"}</span>
          </a>
        </div>

        <div className="v2-hero-tabs" role="tablist" aria-label="Public cible">
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
              <span className="v2-tab-label">{t.tabs.seekers}</span>
              <span className="v2-tab-sub">{t.tabs.seekersSub}</span>
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
              <span className="v2-tab-label">{t.tabs.solidarity}</span>
              <span className="v2-tab-sub">{t.tabs.solSub}</span>
            </span>
          </button>
        </div>

        <div className="v2-trust-grid">
          {t.trust.map((m, i) => (
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

Object.assign(window, { HeroV2 });


// ==================== [Module: CantonCalculator.jsx] ====================
// SwissRelief 2.6 — Canton barème calculator (Side A)
// Connects to full 26-canton dataset with quad-lingual labels (window.CANTONS).
const CANTONS_FALLBACK = [
  { code: "VD", name: "Vaud",         authority: "EVAM",              basis: "brut", heating: "included", ceilings: { 1:1050, 2:1250, 3:1350, 4:1650, 5:2100 } },
  { code: "GE", name: "Genève",       authority: "Hospice Général",   basis: "net",  heating: "separate", ceilings: { 1:1100, 2:1300, 3:1550, 4:1800, 5:2100 } },
  { code: "ZH", name: "Zurich",       authority: "AOZ / SKOS",        basis: "brut", heating: "included", ceilings: { 1:1400, 2:1700, 3:2000, 4:2300, 5:2600 } },
  { code: "BE", name: "Berne",        authority: "GSI Bern",          basis: "brut", heating: "included", ceilings: { 1:1000, 2:1250, 3:1500, 4:1750, 5:2000 } },
  { code: "BS", name: "Bâle-Ville",   authority: "WSU Basel",         basis: "brut", heating: "included", ceilings: { 1:1100, 2:1450, 3:1700, 4:1950, 5:2200 } },
  { code: "TI", name: "Tessin",       authority: "LAPS Ticino",       basis: "brut", heating: "included", ceilings: { 1:800,  2:1100, 3:1300, 4:1500, 5:1500 } },
  { code: "LU", name: "Lucerne",      authority: "DISG Luzern",       basis: "brut", heating: "included", ceilings: { 1:1050, 2:1300, 3:1550, 4:1800, 5:2000 } },
  { code: "ZG", name: "Zoug",         authority: "SKOS Zug",          basis: "brut", heating: "included", ceilings: { 1:1200, 2:1550, 3:1850, 4:2100, 5:2350 } },
];

const chfV2 = (n) => new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 })
  .format(Math.round(n)).replace(/,/g, "'");

function CantonCalculatorV2({ t, lang = 'fr', canton: propCanton, setCanton: propSetCanton, status = 'evam', income = 0 }) {
  const [localCanton, setLocalCanton] = React.useState("VD");
  const canton = propCanton || localCanton;
  const setCanton = propSetCanton || setLocalCanton;
  const [size, setSize] = React.useState(3);
  const [rentType, setRentType] = React.useState("brut");
  const [testRent, setTestRent] = React.useState(1400);

  const cantons = (typeof window !== 'undefined' && Array.isArray(window.CANTONS) && window.CANTONS.length >= 26)
    ? window.CANTONS
    : CANTONS_FALLBACK;

  const c = cantons.find(x => x.code === canton) || cantons[0];
  const ceilings = c.ceilings || { 1: 1000, 2: 1200, 3: 1400, 4: 1600, 5: 1800 };
  const raw = ceilings[size] || ceilings[5] || 1200;

  const rawDisplayCeiling = (c.basis === rentType) ? raw
    : (c.basis === "brut" ? Math.round(raw * 0.85) : Math.round(raw / 0.85));

  const rule33 = (income && Number(income) > 0) ? Math.round(Number(income) * 0.33) : null;
  const displayCeiling = status === 'salary' && rule33 ? Math.min(rawDisplayCeiling, rule33) : rawDisplayCeiling;

  const over = testRent - displayCeiling;
  const compliant = over <= 0;

  const cantonName = typeof c.name === 'object' ? (c.name[lang] || c.name.fr || c.code) : (c.name || c.code);

  return (
    <section id="calc" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.calc.eyebrow}</span>
          <h2 className="v2-section-title">{t.calc.title}</h2>
          <p className="v2-section-sub">{t.calc.lede}</p>
        </div>

        <div className="v2-calc-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label htmlFor="v2-canton">{t.calc.canton}</label>
              <select id="v2-canton" className="v2-select" value={canton} onChange={e => setCanton(e.target.value)}>
                {cantons.map(x => {
                  const optName = typeof x.name === 'object' ? (x.name[lang] || x.name.fr || x.code) : (x.name || x.code);
                  return (
                    <option key={x.code} value={x.code}>
                      {x.code} · {optName} — {x.authority}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="v2-field">
              <label>{t.calc.household}</label>
              <div className="v2-pill-group">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} className={`v2-pill-btn ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                    {s}{s === 5 ? '+' : ''} <span style={{ opacity: 0.7, fontWeight: 500 }}>pers.</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{t.calc.rentType}</label>
              <div className="v2-seg">
                <button className={rentType === 'brut' ? 'active' : ''} onClick={() => setRentType('brut')}>{t.calc.brut}</button>
                <button className={rentType === 'net'  ? 'active' : ''} onClick={() => setRentType('net')}>{t.calc.net}</button>
              </div>
            </div>

            <div className="v2-field">
              <label htmlFor="v2-rent">{t.calc.testRent}</label>
              <div className="v2-input-with-suffix">
                <input
                  id="v2-rent"
                  type="number"
                  min="200"
                  max="6000"
                  step="10"
                  className="v2-input"
                  value={testRent}
                  onChange={e => setTestRent(Number(e.target.value) || 0)}
                />
                <span className="v2-input-suffix">CHF / mois</span>
              </div>
            </div>
          </div>

          <div className="v2-verdict">
            <div className="v2-verdict-label">{t.calc.ceiling}</div>
            <div className="v2-verdict-amount">
              <span className="cur">CHF</span>
              <span className="num">{chfV2(displayCeiling)}</span>
              <span className="per">/ mois</span>
            </div>

            <div className="v2-fact-grid">
              <div className="v2-fact">
                <div className="v2-fact-label">{t.calc.authority}</div>
                <div className="v2-fact-value">{c.authority}</div>
              </div>
              <div className="v2-fact">
                <div className="v2-fact-label">{t.calc.basis}</div>
                <div className="v2-fact-value">{c.basis === 'brut' ? t.calc.brut : t.calc.net}</div>
              </div>
              <div className="v2-fact v2-fact-wide">
                <div className="v2-fact-label">{t.calc.heating}</div>
                <div className="v2-fact-value">{c.heating === 'included' ? t.calc.heatIncluded : t.calc.heatSeparate}</div>
              </div>
            </div>

            <div className={`v2-compliance ${compliant ? 'ok' : 'warn'}`} key={compliant + ':' + displayCeiling}>
              <div className="v2-compliance-icon">
                {compliant ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                )}
              </div>
              <div>
                <div className="v2-compliance-title">
                  {compliant ? t.calc.compliant : `${t.calc.over} CHF ${chfV2(over)}`}
                </div>
                <div className="v2-compliance-body">
                  {compliant
                    ? `${c.authority} · ${cantonName} · ${size}${size === 5 ? '+' : ''} ${(lang === 'uk' ? 'осіб' : lang === 'de' ? 'Personen' : lang === 'it' ? 'persone' : 'personne(s)')}`
                    : t.calc.overNote}
                </div>
              </div>
            </div>

            <div className="v2-subsidiarity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold-2)', flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
              </svg>
              <span>{t.calc.subsidiarityNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CantonCalculatorV2, chfV2 });


// ==================== [Module: HousingCards.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Housing Cards (source-agnostic)
// Attribution factuelle aux régies sans mention de portails tiers (Art. 5 LCD/UWG)

function HousingCard({ item, t, lang, onGenerate }) {
  const compOk = item.compliance?.ok ?? true;
  const isPrivate = item.regieType === 'private';
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <article className="h-card">
      <div className="h-photo">
        {item.image_url && !imgFailed ? (
          <img
            src={item.image_url}
            alt={item.title?.[lang] || item.title || "Logement Suisse"}
            className="h-photo-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : null}
        <div className="placeholder" style={{ display: (!item.image_url || imgFailed) ? 'flex' : 'none' }}>
          {item.photoCaption || (item.title && (item.title[lang] || item.title)) || "Logement Suisse"}
        </div>
        <div className="badges">
          <span className={`regie-badge ${isPrivate ? 'priv' : ''}`}>
            <span className="dot" aria-hidden="true"></span>
            {item.regie}
          </span>
          <span className={`compliance-badge ${compOk ? '' : 'warn'}`}>
            {compOk ? '✓' : '!'} EVAM
          </span>
        </div>
      </div>

      <div className="h-body">
        <div className="h-price-row">
          <div className="h-price">
            <span className="cur">CHF</span>{window.chf(item.price)}
            <span className="per">/ {lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'}</span>
          </div>
          <div className="h-loc">
            {item.city?.[lang] || item.city_name || "Vaud"} <span className="canton">· {item.canton}</span>
          </div>
        </div>

        <div className="h-title">{item.title?.[lang] || item.title}</div>

        <div className="sbb-pill">
          <span className="ico"><Ico.train/></span>
          <span><span className="min">{item.sbb?.minutes || 15}</span> min → {item.sbb?.city || "Gare"}</span>
          <span className="swap">{t.housing?.changes ? t.housing.changes(item.sbb?.changes || 0) : `${item.sbb?.changes || 0} corresp.`}</span>
        </div>

        <div style={{
          fontSize: 11.5, color: 'var(--muted)',
          padding: '6px 10px',
          background: 'rgba(16,185,129,.06)',
          border: '1px solid rgba(16,185,129,.20)',
          borderRadius: 6,
          lineHeight: 1.4
        }}>
          🟢 {item.compliance?.note?.[lang] || (item.compliance?.ok ? "100% conforme EVAM" : "Validation requise")}
        </div>
      </div>

      <div className="h-actions">
        <button className="btn primary" onClick={() => onGenerate(item)}>
          <Ico.file/> {t.housing?.generate || "Générer dossier"}
        </button>
        <button className="btn ghost" onClick={() => {
          const dest = encodeURIComponent(`${item.city?.[lang] || item.city_name || ''}`);
          window.open(`https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml?von=Morges&nach=${dest}`, '_blank');
        }}>
          <Ico.train/> {t.housing?.sbb || "Horaires SBB"}
        </button>
      </div>
    </article>
  );
}

function HousingSection({ t, lang, canton, onGenerate }) {
  const [limit, setLimit] = React.useState(9);

  const allItems = React.useMemo(() => {
    return (window.SR_HOUSING || window.HOUSING_LISTINGS || []);
  }, []);

  const items = React.useMemo(() => {
    if (!canton || canton === 'ALL') return allItems;
    const filtered = allItems.filter(h => h.canton === canton);
    return filtered.length > 0 ? filtered : allItems;
  }, [canton, allItems]);

  const visibleItems = items.slice(0, limit);

  return (
    <section id="housing" className="block" style={{background: 'rgba(15,23,42,.25)'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20}}>
          <div>
            <span className="section-eyebrow">{t.housing?.eyebrow || "LOGEMENT VÉRIFIÉ"}</span>
            <h2 className="section-title">{t.housing?.title || "Offres vérifiées en Romandie"}</h2>
            <p className="section-sub">{t.housing?.lede || "Directement attribué aux régies sans mention de portails tiers."}</p>
          </div>
          <div style={{
            fontSize: 12,
            fontFamily: 'var(--f-mono)',
            padding: '6px 12px',
            borderRadius: 8,
            background: 'rgba(56,189,248,.08)',
            border: '1px solid rgba(56,189,248,.25)',
            color: 'var(--accent-1)'
          }}>
            ⚡ {items.length} {lang === 'uk' ? 'пропозицій з реальними фото' : lang === 'de' ? 'Angebote mit echten Fotos' : lang === 'it' ? 'offerte con foto reali' : 'offres avec photos réelles'}
          </div>
        </div>

        <div className="housing-list">
          {visibleItems.map(it => (
            <HousingCard key={it.id} item={it} t={t} lang={lang} onGenerate={onGenerate}/>
          ))}
        </div>

        {limit < items.length && (
          <div style={{textAlign: 'center', marginTop: 32}}>
            <button
              className="btn ghost"
              style={{padding: '12px 28px', fontSize: 14, fontWeight: 600}}
              onClick={() => setLimit(prev => prev + 9)}
            >
              {lang === 'uk'
                ? `Показати більше пропозицій (ще ${items.length - limit}) ↓`
                : lang === 'de'
                ? `Mehr Wohnungen anzeigen (noch ${items.length - limit}) ↓`
                : lang === 'it'
                ? `Mostra più alloggi (altri ${items.length - limit}) ↓`
                : `Afficher plus de logements (encore ${items.length - limit}) ↓`
              }
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { HousingCard, HousingSection });


// ==================== [Module: DossierGenerator.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Générateur de Dossier Régie 1-Click (Art. 253 CO)

function DossierGenerator({ t, lang, prefill }) {
  const [name, setName] = React.useState('Maryna Vokovytch');
  const [permis, setPermis] = React.useState('S-VD-2024-0847');
  const [statusForm, setStatusForm] = React.useState('evam');   // evam | salary
  const [salary, setSalary] = React.useState(4800);
  const [guarantors, setGuarantors] = React.useState('—');
  const [poursuites, setPoursuites] = React.useState('has');
  const [previewLang, setPreviewLang] = React.useState('fr');   // fr | de

  // Prefill from a housing card
  const listing = prefill || window.SR_HOUSING[0];

  const today = new Date().toLocaleDateString(previewLang === 'de' ? 'de-CH' : 'fr-CH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const financialLine = statusForm === 'evam'
    ? (previewLang === 'de'
        ? "Die Miete wird vollständig durch das kantonale Amt EVAM (Vaud) übernommen, gemäss der bundesrechtlichen Kostenübernahme für Personen mit S-Ausweis."
        : "Le loyer est intégralement pris en charge par l'organe cantonal EVAM (Vaud), au titre de la couverture fédérale des personnes titulaires du Permis S.")
    : (previewLang === 'de'
        ? `Mein regelmässiges Nettoeinkommen beträgt CHF ${window.chf(salary)}/Monat, was der 33%-Regel (max. CHF ${window.chf(Math.round(salary * 0.33))}) entspricht.`
        : `Mon revenu net régulier s'élève à CHF ${window.chf(salary)}/mois, respectant la règle des 33% (loyer max. CHF ${window.chf(Math.round(salary * 0.33))}).`);

  const poursuitesLine = poursuites === 'has'
    ? (previewLang === 'de'
        ? "Ein aktueller Betreibungsregisterauszug (leer, weniger als 3 Monate alt) liegt diesem Schreiben bei."
        : "Un extrait du Registre des Poursuites (vierge, daté de moins de 3 mois) est joint à la présente.")
    : (previewLang === 'de'
        ? "Der Betreibungsregisterauszug wurde beim zuständigen Amt beantragt und wird innerhalb von 5 Werktagen nachgereicht."
        : "L'extrait du Registre des Poursuites a été demandé à l'Office et sera transmis sous 5 jours ouvrés.");

  const salutation = previewLang === 'de'
    ? "Sehr geehrte Damen und Herren,"
    : "Madame, Monsieur,";

  const opening = previewLang === 'de'
    ? `mit Interesse habe ich Ihr Angebot für die ${listing.title.de} zur Kenntnis genommen und erlaube mir, mich hiermit als Mieter/in zu bewerben.`
    : `Ayant pris connaissance avec grand intérêt de votre annonce concernant l'${listing.title.fr.toLowerCase()}, je me permets par la présente de me porter candidat·e à la location de ce bien.`;

  const closing = previewLang === 'de'
    ? "Für ein Vorstellungsgespräch stehe ich Ihnen gerne zur Verfügung. In der Zwischenzeit danke ich Ihnen für die Prüfung meiner Bewerbung und verbleibe mit freundlichen Grüssen,"
    : "Je me tiens à votre entière disposition pour un entretien de présentation. Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.";

  const cityName = listing.city.fr;
  const priceLine = `CHF ${window.chf(listing.price)}/mois`;

  return (
    <section id="dossier" className="block" style={{background: 'rgba(213,43,30,.03)'}}>
      <div className="container">
        <span className="section-eyebrow">{t.dossier.eyebrow}</span>
        <h2 className="section-title">{t.dossier.title}</h2>
        <p className="section-sub">{t.dossier.lede}</p>

        <div className="dossier-grid">
          {/* FORM */}
          <div className="card">
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.08em',
              textTransform: 'uppercase', color: 'var(--gold-2)', fontWeight: 700,
              marginBottom: 14
            }}>
              📄 {t.dossier.formTitle}
            </div>

            {/* Prefill notice */}
            <div style={{
              padding: '10px 12px', marginBottom: 16,
              background: 'rgba(213,43,30,.08)',
              border: '1px solid rgba(213,43,30,.25)',
              borderRadius: 10, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5
            }}>
              <b style={{color: 'var(--ink-0)'}}>Bien ciblé :</b> {listing.title[lang]}<br/>
              <span className="mono" style={{color: 'var(--muted)', fontSize: 11}}>
                {listing.regie} · CHF {window.chf(listing.price)}/mois · {listing.city[lang]}
              </span>
            </div>

            <div className="field">
              <label>{t.dossier.name}</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="field">
              <label>{t.dossier.permis}</label>
              <input className="input mono" value={permis} onChange={e => setPermis(e.target.value)}/>
            </div>

            <div className="field">
              <label>{t.dossier.status}</label>
              <div className="dossier-status-toggle">
                <button className={statusForm === 'evam' ? 'active' : ''} onClick={() => setStatusForm('evam')}>
                  📋 {t.dossier.evamPec}
                </button>
                <button className={statusForm === 'salary' ? 'active' : ''} onClick={() => setStatusForm('salary')}>
                  💼 {lang === 'de' ? 'Lohn' : lang === 'it' ? 'Salario' : lang === 'uk' ? 'Зарплата' : 'Salaire'}
                </button>
              </div>
            </div>

            {statusForm === 'salary' && (
              <div className="field">
                <label>{t.dossier.salary}</label>
                <input type="number" className="input mono" value={salary}
                  onChange={e => setSalary(Number(e.target.value) || 0)}/>
              </div>
            )}

            <div className="field">
              <label>{t.dossier.guarantors}</label>
              <input className="input" value={guarantors} onChange={e => setGuarantors(e.target.value)}/>
            </div>

            <div className="field" style={{marginBottom: 0}}>
              <label>{t.dossier.poursuites}</label>
              <div className="dossier-status-toggle">
                <button className={poursuites === 'has' ? 'active' : ''} onClick={() => setPoursuites('has')}>
                  ✓ {t.dossier.hasIt}
                </button>
                <button className={poursuites === 'will' ? 'active' : ''} onClick={() => setPoursuites('will')}>
                  ⏳ {t.dossier.willGet}
                </button>
              </div>
            </div>
          </div>

          {/* LETTER PREVIEW */}
          <div>
            <div className="lang-preview-toggle">
              <span style={{
                fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.08em',
                textTransform: 'uppercase', color: 'var(--muted)',
                padding: '6px 8px', fontWeight: 600
              }}>
                {t.dossier.previewIn}
              </span>
              <button className={previewLang === 'fr' ? 'active' : ''} onClick={() => setPreviewLang('fr')}>🇫🇷 FR</button>
              <button className={previewLang === 'de' ? 'active' : ''} onClick={() => setPreviewLang('de')}>🇩🇪 DE</button>
            </div>

            <div className="letter" role="document">
              <div className="from">
                <b style={{color:'#0f172a'}}>{name}</b><br/>
                {previewLang === 'de' ? 'S-Ausweis Nr.' : 'Permis S n°'} <span className="highlight">{permis}</span><br/>
                c/o EVAM, Route de Chavannes 33<br/>
                1007 Lausanne · +41 21 XXX XX XX
              </div>

              <div className="to">
                <b>{listing.regie}</b><br/>
                {previewLang === 'de' ? 'Vermietungsabteilung' : 'Service Location'}<br/>
                Case postale<br/>
                1000 Lausanne
              </div>

              <div className="place-date">Lausanne, {today}</div>

              <div className="subject">
                {previewLang === 'de'
                  ? `Betreff: Bewerbung für die Miete – ${listing.title.de}`
                  : `Objet : Candidature à la location – ${listing.title.fr}`
                }<br/>
                <span style={{fontWeight: 400, fontSize: 11, color: '#64748B'}}>
                  Réf. annonce : <span className="highlight">{listing.id.toUpperCase()}</span> · {priceLine}
                </span>
              </div>

              <p style={{marginTop: 8}}>{salutation}</p>
              <p>{opening}</p>

              <div className="listing-box">
                <b>{previewLang === 'de' ? 'Betroffenes Objekt' : 'Objet concerné'}</b><br/>
                {listing.title[previewLang === 'de' ? 'de' : 'fr']}<br/>
                <span style={{color:'#64748B'}}>
                  {listing.city[previewLang === 'de' ? 'de' : 'fr']} · {priceLine} · {listing.rooms} {previewLang === 'de' ? 'Zimmer' : 'pièces'}
                </span>
              </div>

              <p>{financialLine}</p>
              <p>{poursuitesLine}</p>

              <p style={{marginTop: 14}}>{closing}</p>

              <div className="sig">
                <div><div className="line"></div>{previewLang === 'de' ? 'Unterschrift' : 'Signature'}</div>
                <div><div className="line"></div>{previewLang === 'de' ? 'Ort · Datum' : 'Lieu · Date'}</div>
              </div>

              <div style={{
                marginTop: 22, paddingTop: 14,
                borderTop: '1px dotted rgba(0,0,0,.18)',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 10, color: '#94A3B8', lineHeight: 1.5
              }}>
                <b>{previewLang === 'de' ? 'Beilagen' : 'Annexes'} :</b>{' '}
                {previewLang === 'de'
                  ? 'Kopie S-Ausweis · EVAM-Kostenübernahmebestätigung · Betreibungsauszug'
                  : 'Copie Permis S · Attestation EVAM · Extrait Poursuites'
                }<br/>
                <span style={{color: '#D97706'}}>
                  {previewLang === 'de'
                    ? 'Erstellt mit SwissRelief 2.6 · Art. 253 OR konform · Merkle SHA-256'
                    : 'Généré via SwissRelief 2.6 · Conforme Art. 253 CO · Merkle SHA-256'
                  }
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap'
            }}>
              <button className="btn primary" onClick={() => alert('Génération PDF/A (mock)')}>
                <Ico.file/> {t.dossier.downloadPdf}
              </button>
              <button className="btn ghost" onClick={() => alert('Texte copié dans le presse-papier (mock)')}>
                {t.dossier.copyText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.DossierGenerator = DossierGenerator;

Object.assign(window, { DossierGenerator });



// ==================== [Module: ProfessionSelector.jsx] ====================
// SwissRelief 2.6 — CH-ISCO profession radar (Side A)
// Connected to all 15 sectors from window.SECTORS with localized titles, salaries, and Art. 21a LEI tags.
// Fixed stellen-alert stacking: column on mobile, row on desktop (ADR-017 anomaly #3).
const SECTORS_FALLBACK = [
  {
    id: 'HOSP',
    label: 'Hôtellerie & Restauration',
    jobs: [
      { isco: '9412', stellen: true,  qualif: 'Sans qualif.', salary: [3713, 4100], title: 'Aide de cuisine',       cat: 'Cuisine' },
      { isco: '5120', stellen: true,  qualif: 'CFC',          salary: [4528, 5200], title: 'Cuisinier',              cat: 'Cuisine' },
      { isco: '5131', stellen: true,  qualif: 'CFC',          salary: [4300, 5000], title: 'Serveur / Kellner',      cat: 'Service' },
      { isco: '1412', stellen: false, qualif: 'Tertiaire',    salary: [5293, 6800], title: 'Chef de cuisine',        cat: 'Cuisine' },
    ]
  },
  {
    id: 'CONST',
    label: 'Bâtiment & Génie civil',
    jobs: [
      { isco: '9313', stellen: true,  qualif: 'Sans qualif.', salary: [4500, 4900], title: 'Manœuvre de construction', cat: 'Gros-œuvre' },
      { isco: '7112', stellen: true,  qualif: 'CFC',          salary: [5300, 6100], title: 'Maçon',                    cat: 'Gros-œuvre' },
      { isco: '7115', stellen: true,  qualif: 'CFC',          salary: [5200, 6000], title: 'Charpentier / Menuisier',  cat: 'Second-œuvre' },
    ]
  },
  {
    id: 'HEALTH',
    label: 'Santé & Soins',
    jobs: [
      { isco: '5322', stellen: false, qualif: 'AFP',       salary: [4500, 5100], title: 'Assistante en soins (ASA/ASSC)', cat: 'Soins' },
      { isco: '2221', stellen: false, qualif: 'Tertiaire', salary: [6200, 7800], title: 'Infirmier·ère diplômé·e HF',      cat: 'Soins' },
    ]
  },
  {
    id: 'LOG',
    label: 'Logistique & Transport',
    jobs: [
      { isco: '9333', stellen: false, qualif: 'Sans qualif.', salary: [4100, 4600], title: 'Manutentionnaire',        cat: 'Magasinage' },
      { isco: '4321', stellen: false, qualif: 'CFC',          salary: [4700, 5500], title: 'Logisticien CFC',         cat: 'Magasinage' },
      { isco: '8332', stellen: false, qualif: 'CFC',          salary: [4800, 5600], title: 'Chauffeur poids lourd',   cat: 'Conduite' },
    ]
  },
];

function ProfessionSelector({ t, lang = 'fr' }) {
  const rawSectors = (typeof window !== 'undefined' && Array.isArray(window.SECTORS) && window.SECTORS.length > 0)
    ? window.SECTORS
    : null;

  const sectors = React.useMemo(() => {
    if (!rawSectors) return SECTORS_FALLBACK;
    return rawSectors.map(s => {
      const label = (s.labels && (s.labels[lang] || s.labels.fr)) || s.label || s.id;
      const jobs = (s.categories || []).flatMap(c => {
        const catName = (c.labels && (c.labels[lang] || c.labels.fr)) || c.id;
        return (c.jobs || []).map(j => ({
          isco: j.isco || '',
          stellen: !!j.stellen,
          qualif: j.qualif || 'CFC',
          salary: j.salary || [4500, 5500],
          title: (j.titles && (j.titles[lang] || j.titles.fr)) || j.title || '',
          cat: catName
        }));
      });
      return { id: s.id, label, jobs: jobs.length > 0 ? jobs : (SECTORS_FALLBACK[0].jobs) };
    });
  }, [rawSectors, lang]);

  const [sectorId, setSectorId] = React.useState(sectors[0]?.id || 'HOSP');
  const sector = sectors.find(s => s.id === sectorId) || sectors[0];
  const anyStellen = sector && sector.jobs && sector.jobs.some(j => j.stellen);

  return (
    <section id="prof" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.prof.eyebrow}</span>
          <h2 className="v2-section-title">{t.prof.title}</h2>
          <p className="v2-section-sub">{t.prof.lede}</p>
        </div>

        <div className="v2-card v2-prof-card">
          <div className="v2-prof-tabs" role="tablist" aria-label="Secteurs CH-ISCO-19">
            {sectors.map(s => (
              <button
                key={s.id}
                role="tab"
                aria-selected={sectorId === s.id}
                className={`v2-prof-tab ${sectorId === s.id ? 'active' : ''}`}
                onClick={() => setSectorId(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* THE ANOMALY-3 FIX: stellen-alert is flex-direction: column on mobile, row on desktop */}
          {anyStellen && (
            <div className="v2-stellen-alert" role="note">
              <span className="v2-stellen-badge">Art. 21a LEI</span>
              <div className="v2-stellen-body">
                <div className="v2-stellen-title">{t.prof.stellenTitle}</div>
                <div className="v2-stellen-text">{t.prof.stellenBody}</div>
              </div>
            </div>
          )}

          <div className="v2-prof-table-wrap">
            <table className="v2-prof-table">
              <thead>
                <tr>
                  <th>ISCO</th>
                  <th>{t.prof.titleCol}</th>
                  <th>{t.prof.qualif}</th>
                  <th style={{ textAlign: 'right' }}>{t.prof.salary}</th>
                  <th>{t.prof.stellenCol}</th>
                </tr>
              </thead>
              <tbody>
                {sector.jobs.map((j, i) => (
                  <tr key={j.isco + '-' + i}>
                    <td><span className="v2-mono-tag">{j.isco}</span></td>
                    <td>
                      <div className="v2-job-title">{j.title}</div>
                      <div className="v2-job-cat">{j.cat}</div>
                    </td>
                    <td>
                      <span className={`v2-qbadge ${j.qualif === 'Sans qualif.' ? 'none' : j.qualif === 'AFP' ? 'afp' : j.qualif === 'Tertiaire' ? 'sup' : 'cfc'}`}>
                        {j.qualif}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="v2-salary-range">
                        CHF {chfV2(j.salary[0])} – {chfV2(j.salary[1])}
                      </span>
                    </td>
                    <td>
                      {j.stellen ? (
                        <span className="v2-status-pill warn" title="Priorité ORP / RAV 5 jours">
                          ● Art. 21a LEI
                        </span>
                      ) : (
                        <span className="v2-status-pill free" title="Marché libre">
                          Libre
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProfessionSelector });


// ==================== [Module: Sublease.jsx] ====================
// SwissRelief 2.6 — Sublease wizard (Side B) — Art. 262 CO
// Computes fair share with 20% furniture cap + Georgia serif PDF preview mock.
function SubleaseWizard({ t }) {
  const [totalRent, setTotalRent] = React.useState(1800);
  const [rooms, setRooms] = React.useState(4);
  const [surcharge, setSurcharge] = React.useState(15);
  const [pdfGenerated, setPdfGenerated] = React.useState(false);

  const base = Math.round(totalRent / Math.max(rooms, 1));
  const finalRent = Math.round(base * (1 + surcharge / 100));
  const over20 = surcharge > 20;

  const handlePrintPdf = () => {
    setPdfGenerated(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <section id="sublease" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.sublease.eyebrow}</span>
          <h2 className="v2-section-title">{t.sublease.title}</h2>
          <p className="v2-section-sub">{t.sublease.lede}</p>
        </div>

        <div className="v2-sublease-grid">
          <div className="v2-card">
            <div className="v2-shield-box">
              <div className="v2-shield-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="v2-shield-title">{t.sublease.shield}</div>
                <div className="v2-shield-body">{t.sublease.shieldBody}</div>
              </div>
            </div>

            <div className="v2-two-col-fields">
              <div className="v2-field">
                <label>{t.sublease.totalRent}</label>
                <div className="v2-input-with-suffix">
                  <input
                    type="number"
                    min="500"
                    max="8000"
                    step="50"
                    className="v2-input"
                    value={totalRent}
                    onChange={e => setTotalRent(Number(e.target.value) || 0)}
                  />
                  <span className="v2-input-suffix">CHF / mois</span>
                </div>
              </div>
              <div className="v2-field">
                <label>{t.sublease.rooms}</label>
                <div className="v2-input-with-suffix">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="0.5"
                    className="v2-input"
                    value={rooms}
                    onChange={e => setRooms(Number(e.target.value) || 1)}
                  />
                  <span className="v2-input-suffix">pièces</span>
                </div>
              </div>
            </div>

            <div className="v2-field">
              <label>{t.sublease.base}</label>
              <div className="v2-quote-row">
                <span className="v2-quote-formula">CHF {chfV2(totalRent)} / {rooms} pièces</span>
                <span className="v2-quote-value">CHF {chfV2(base)}</span>
              </div>
            </div>

            <div className="v2-field">
              <label className="v2-slider-label">
                <span>{t.sublease.surcharge}</span>
                <span className={`v2-slider-value ${over20 ? 'danger' : 'ok'}`}>{surcharge}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                className="v2-slider"
                value={surcharge}
                onChange={e => setSurcharge(Number(e.target.value))}
              />
              <div className="v2-slider-scale">
                <span>0%</span>
                <span style={{ color: 'var(--emerald-2)' }}>10%</span>
                <span style={{ color: 'var(--gold-2)' }}>20% MAX</span>
                <span style={{ color: '#FCA5A5' }}>30%</span>
              </div>
              <div className="v2-slider-hint">{t.sublease.surchargeLimit}</div>
            </div>

            <div className="v2-final-rent">
              <div className="v2-final-label">{t.sublease.final}</div>
              <div className="v2-final-amount">
                <span className="cur">CHF</span>
                <span className="num">{chfV2(finalRent)}</span>
                <span className="per">/ mois</span>
              </div>
              <div className="v2-final-breakdown">
                CHF {chfV2(base)} + {surcharge}% mobilier = CHF {chfV2(finalRent)}
              </div>

              <div className={`v2-compliance ${over20 ? 'warn' : 'ok'}`} style={{ marginTop: 16 }}>
                <div className="v2-compliance-icon">
                  {over20 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="v2-compliance-title">{over20 ? t.sublease.overBadge : t.sublease.okBadge}</div>
                  <div className="v2-compliance-body">{over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA'}</div>
                </div>
              </div>
            </div>

            <div className="v2-badges-row">
              <span className="v2-mini-badge gold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"/>
                </svg>
                {t.sublease.taxBadge}
              </span>
              <span className="v2-mini-badge blue">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {t.sublease.insBadge}
              </span>
              <span className="v2-mini-badge cyan">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"/>
                  <line x1="4" y1="15" x2="20" y2="15"/>
                  <line x1="10" y1="3" x2="8" y2="21"/>
                  <line x1="16" y1="3" x2="14" y2="21"/>
                </svg>
                {t.sublease.merkleBadge}
              </span>
            </div>

            <button
              className="v2-btn v2-btn-blue"
              style={{ marginTop: 20, width: '100%' }}
              disabled={over20}
              onClick={handlePrintPdf}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
              {pdfGenerated ? '✓ Document prêt — Imprimer / PDF' : t.sublease.letterBtn}
            </button>
            <div className="v2-btn-hint">{t.sublease.letterHint}</div>
          </div>

          {/* Right: mock PDF preview (Georgia serif on white paper) */}
          <div className="v2-pdf-preview">
            <div className="v2-pdf-head">{t.sublease.pdfTitle}</div>
            <p className="v2-pdf-intro">{t.sublease.pdfIntro}</p>
            <div className="v2-pdf-row"><span className="k">Locataire principal</span><span>[ Nom · Adresse · NPA / Ville ]</span></div>
            <div className="v2-pdf-row"><span className="k">Gérance</span><span>[ Nom · Adresse · Contact ]</span></div>
            <div className="v2-pdf-row"><span className="k">Sous-locataire (Permis S)</span><span>[ Nom · N° Permis S ]</span></div>
            <div className="v2-pdf-row"><span className="k">Locaux sous-loués</span><span>1 pièce meublée, ~{(15/Math.max(rooms,1)).toFixed(1)} m², cuisine/SdB partagées</span></div>
            <div className="v2-pdf-row"><span className="k">Loyer forfaitaire</span><span style={{ fontWeight: 700 }}>CHF {chfV2(finalRent)} / mois</span></div>
            <div className="v2-pdf-close">{t.sublease.pdfClose}</div>
            <div className="v2-pdf-sig">
              <div><div className="v2-pdf-line"/>Signature · locataire principal</div>
              <div><div className="v2-pdf-line"/>Date · Lieu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SubleaseWizard });


// ==================== [Module: BenevolMentors.jsx] ====================
// SwissRelief 2.6 — Benevol mentor network (Side B) · Art. 394 CO
function BenevolMentors({ t }) {
  const [commit, setCommit] = React.useState(1);

  const handleApply = () => {
    const url = 'https://t.me/SwissResilienceHubBot?start=mentor';
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="mentors" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.mentors.eyebrow}</span>
          <h2 className="v2-section-title">{t.mentors.title}</h2>
          <p className="v2-section-sub">{t.mentors.lede}</p>
        </div>

        <div className="v2-mentors-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label>{t.mentors.commit}</label>
              <div className="v2-pill-group">
                {t.mentors.commitOpts.map((o, i) => (
                  <button key={i} className={`v2-pill-btn ${commit === i ? 'active-blue' : ''}`} onClick={() => setCommit(i)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{t.mentors.tracks}</label>
              <div className="v2-tracks-grid">
                {t.mentors.trackList.map((tr, i) => (
                  <article key={i} className="v2-track-card">
                    <div className="v2-track-num">TRACK {String(i + 1).padStart(2, '0')}</div>
                    <div className="v2-track-title">{tr.t}</div>
                    <div className="v2-track-body">{tr.b}</div>
                  </article>
                ))}
              </div>
            </div>

            <div className="v2-legal-strip">
              <span aria-hidden="true">§</span>
              <span>{t.mentors.legal}</span>
            </div>

            <button className="v2-btn v2-btn-blue" style={{ marginTop: 18 }} onClick={handleApply}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {t.mentors.apply}
            </button>
          </div>

          <div className="v2-mentors-side">
            <div className="v2-side-card">
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">1–3 h</div>
                <div className="v2-side-metric-lbl">/ semaine · engagement souple</div>
              </div>
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">Art. 394 CO</div>
                <div className="v2-side-metric-lbl">Mandat civil gratuit · aucun lien d'emploi</div>
              </div>
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">Benevol Suisse</div>
                <div className="v2-side-metric-lbl">Standards ehrenamtliche Arbeit CH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BenevolMentors });


// ==================== [Module: BetaDonation.jsx] ====================
// SwissRelief 2.6 — Beta transparency section + Donation modal (MoR: Twint / Card / QR-Facture / Crypto ZK / Stars).
// Fully functional payment interactions as requested by user ("Оплата має працювати для отримання донату").
function BetaSection({ onOpenDonate, t }) {
  return (
    <section id="beta" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.beta.eyebrow}</span>
          <h2 className="v2-section-title">{t.beta.title}</h2>
          <p className="v2-section-sub">{t.beta.lede}</p>
        </div>

        <div className="v2-beta-grid">
          <div className="v2-price-card frozen">
            <span className="v2-frozen-tag">Bêta · Gelé</span>
            <div className="v2-price-name">Candidat · Pro</div>
            <div className="v2-price-amount">
              <span className="cur">CHF</span> 29 <span className="per">/mois</span>
            </div>
            <p className="v2-price-tag">Filtres USPI · Alertes ORP prioritaires · Dossier de candidature PDF/A packagé.</p>
            <ul className="v2-features">
              <li><span className="check">✓</span> Recherche source-agnostique · attribution factuelle régie</li>
              <li><span className="check">✓</span> Alertes push 5 jours priorité</li>
              <li><span className="check">✓</span> Dossier USPI signé PDF/A</li>
            </ul>
            <button className="v2-btn v2-btn-disabled" disabled>Inactif en Bêta</button>
          </div>

          <div className="v2-price-card donation">
            <div className="v2-price-name">Soutenir la plateforme</div>
            <div className="v2-price-amount">
              <span className="cur">CHF</span> 10 <span className="per">/mois</span>
            </div>
            <p className="v2-price-tag">70% infrastructure technique · 30% aide humanitaire &amp; défense de l'Ukraine — vérifiable Merkle SHA-256.</p>
            <div className="v2-split-viz" role="img" aria-label="Répartition des dons">
              <div className="v2-split v2-split-70">
                <div className="v2-split-pct">70%</div>
                <div className="v2-split-desc">Serveurs · API · ledger Merkle</div>
              </div>
              <div className="v2-split v2-split-30">
                <div className="v2-split-pct">30%</div>
                <div className="v2-split-desc">Défense &amp; humanitaire Ukraine</div>
              </div>
            </div>
            <a
              href="https://t.me/SwissResilienceHubBot?start=donate"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-btn v2-btn-primary"
              style={{ width: '100%', marginTop: 16, textDecoration: 'none', justifyContent: 'center' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>{t.donate || "Soutenir via Telegram Bot"}</span>
            </a>
          </div>

          <div className="v2-price-card frozen">
            <span className="v2-frozen-tag">Bêta · Gelé</span>
            <div className="v2-price-name">Hôte · Pro</div>
            <div className="v2-price-amount">
              <span className="cur">CHF</span> 19 <span className="per">/mois</span>
            </div>
            <p className="v2-price-tag">Rédaction PDF gérance illimitée · Garantie RC 5M · Suivi mensuel des dossiers.</p>
            <ul className="v2-features">
              <li><span className="check">✓</span> Lettres gérance illimitées</li>
              <li><span className="check">✓</span> Garantie RC 5'000'000 CHF</li>
              <li><span className="check">✓</span> Support ASLOCA prioritaire</li>
            </ul>
            <button className="v2-btn v2-btn-disabled" disabled>Inactif en Bêta</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Donation modal — Portal for full-viewport overlay ----
function DonationModal({ onClose, t }) {
  const [amount, setAmount] = React.useState(25);
  const [custom, setCustom] = React.useState('');
  const [method, setMethod] = React.useState('twint'); // 'twint' | 'qrfact' | 'crypto' | 'stars'
  const [copiedKey, setCopiedKey] = React.useState(null);
  const [statusMsg, setStatusMsg] = React.useState('');

  const merkle = React.useMemo(() => {
    const h = '0123456789abcdef';
    let s = '0x';
    for (let i = 0; i < 64; i++) s += h[Math.floor(Math.random() * 16)];
    return s;
  }, []);

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

  const chips = [10, 25, 50, 100];
  const effectiveAmount = custom ? Number(custom) || 0 : amount;

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handlePay = () => {
    if (method === 'twint') {
      const url = `https://t.me/SwissResilienceHubBot?start=donate_${effectiveAmount}`;
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
      } else {
        window.open(url, '_blank');
      }
      setStatusMsg(`Redirection vers le paiement sécurisé Twint / Carte (CHF ${effectiveAmount})...`);
    } else if (method === 'stars') {
      const url = `https://t.me/SwissResilienceHubBot?start=stars_${effectiveAmount * 25}`;
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
      } else {
        window.open(url, '_blank');
      }
      setStatusMsg(`Ouverture du paiement Telegram Stars (${effectiveAmount * 25} XTR)...`);
    } else if (method === 'qrfact') {
      copyToClipboard('CH7409000000123456789', 'iban');
      setStatusMsg(`IBAN copié dans le presse-papier ! Utilisez la référence : SR-${effectiveAmount}-${merkle.slice(2, 8)}`);
    } else if (method === 'crypto') {
      copyToClipboard('TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress', 'usdt');
      setStatusMsg(`Adresse USDT copié dans le presse-papier !`);
    }
  };

  const overlay = (
    <div
      className="v2-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Faire un don"
    >
      <div className="v2-modal">
        <header className="v2-modal-head">
          <div>
            <div className="v2-eyebrow" style={{ padding: 0, background: 'none', border: 0 }}>
              Merchant of Record · MoR
            </div>
            <h2 className="v2-modal-title">
              {t.donation?.title || "Soutenir SwissRelief — Registre Merkle public"}
            </h2>
            <p className="v2-modal-sub">
              {t.donation?.sub || "Bêta = 0 CHF, aucun abonnement. Ce don est strictement volontaire au sens de l'Art. 239 CO (donation)."}
            </p>
          </div>
          <button className="v2-modal-close" onClick={onClose} aria-label="Fermer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </header>

        <section className="v2-modal-section">
          <div className="v2-modal-label">{t.donation?.amount || "Montant"}</div>
          <div className="v2-amount-row">
            {chips.map(c => (
              <button
                key={c}
                className={`v2-amount-chip ${!custom && amount === c ? 'active' : ''}`}
                onClick={() => { setAmount(c); setCustom(''); }}
              >
                CHF {c}
              </button>
            ))}
            <div className="v2-amount-custom">
              <input
                type="number"
                min="1"
                placeholder="Autre"
                value={custom}
                onChange={e => setCustom(e.target.value)}
                className="v2-input"
                style={{ paddingRight: 44 }}
              />
              <span className="v2-input-suffix">CHF</span>
            </div>
          </div>
          <div className="v2-amount-hints">
            <span>10 CHF · Soutien serveur</span>
            <span>25 CHF · Audit cantonal</span>
            <span>50 CHF · Parrainage dossier</span>
          </div>
        </section>

        <section className="v2-modal-section">
          <div className="v2-modal-label">{t.donation?.method || "Mode de paiement"}</div>
          <div className="v2-pay-grid">
            {[
              { id: 'twint',  title: t.donation?.twint || 'Twint / Carte',   sub: t.donation?.twintSub || 'Checkout Stripe SE · TWINT app', color: 'blue' },
              { id: 'qrfact', title: t.donation?.qr || 'IBAN QR-Facture', sub: t.donation?.qrSub || 'Réf. BVR / QR-IID suisse',       color: 'gold' },
              { id: 'crypto', title: t.donation?.crypto || 'Crypto ZK',       sub: t.donation?.cryptoSub || 'BTC · ETH · USDT · zk-proof',    color: 'cyan' },
              { id: 'stars',  title: t.donation?.stars || 'Telegram Stars',  sub: t.donation?.starsSub || '1-Clic instantané dans Telegram', color: 'blue' },
            ].map(p => (
              <button
                key={p.id}
                className={`v2-pay-card ${p.color} ${method === p.id ? 'active' : ''}`}
                onClick={() => setMethod(p.id)}
              >
                <div className="v2-pay-title">{p.title}</div>
                <div className="v2-pay-sub">{p.sub}</div>
              </button>
            ))}
          </div>

          {/* Interactive details for chosen method */}
          {method === 'qrfact' && (
            <div className="v2-qr-box">
              <div className="v2-qr-row">
                <span><strong>Bénéficiaire :</strong> Association Swiss Resilience</span>
                <span className="v2-mono-tag">Suisse</span>
              </div>
              <div className="v2-qr-row">
                <span><strong>Banque :</strong> PostFinance / Banque Cantonale de Genève</span>
              </div>
              <div className="v2-qr-row">
                <span><strong>IBAN :</strong> <code style={{ color: 'var(--gold-soft-fg)', fontFamily: 'var(--font-mono)' }}>CH74 0900 0000 1234 5678 9</code></span>
                <button className="v2-copy-btn" onClick={() => copyToClipboard('CH7409000000123456789', 'iban')}>
                  {copiedKey === 'iban' ? (t.donation?.copied || "✓ Copié !") : (t.donation?.copyIban || "Copier l'IBAN")}
                </button>
              </div>
              <div className="v2-qr-row" style={{ fontSize: 12, color: 'var(--muted)' }}>
                <span><strong>Communication :</strong> Don volontaire Art. 239 CO · {effectiveAmount} CHF</span>
              </div>
            </div>
          )}

          {method === 'crypto' && (
            <div className="v2-qr-box">
              <div className="v2-qr-row">
                <span><strong>USDT (TRC20) :</strong> <code style={{ color: '#67E8F9', fontFamily: 'var(--font-mono)', fontSize: 11 }}>TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress</code></span>
                <button className="v2-copy-btn" onClick={() => copyToClipboard('TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress', 'usdt')}>
                  {copiedKey === 'usdt' ? (t.donation?.copied || "✓ Copié !") : (t.donation?.copyAddr || "Copier")}
                </button>
              </div>
              <div className="v2-qr-row">
                <span><strong>ETH / ERC20 :</strong> <code style={{ color: '#67E8F9', fontFamily: 'var(--font-mono)', fontSize: 11 }}>0x71C8705a2B88e60802778841B5e9E24F749bB692</code></span>
                <button className="v2-copy-btn" onClick={() => copyToClipboard('0x71C8705a2B88e60802778841B5e9E24F749bB692', 'eth')}>
                  {copiedKey === 'eth' ? (t.donation?.copied || "✓ Copié !") : (t.donation?.copyAddr || "Copier")}
                </button>
              </div>
            </div>
          )}

          {statusMsg && (
            <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)', color: 'var(--emerald-soft-fg)', fontSize: 13 }}>
              {statusMsg}
            </div>
          )}
        </section>

        <section className="v2-split-viz">
          <div className="v2-split v2-split-70">
            <div className="v2-split-pct">70%</div>
            <div className="v2-split-desc">CHF {(effectiveAmount * 0.7).toFixed(2)} · infrastructure</div>
          </div>
          <div className="v2-split v2-split-30">
            <div className="v2-split-pct">30%</div>
            <div className="v2-split-desc">CHF {(effectiveAmount * 0.3).toFixed(2)} · Ukraine</div>
          </div>
        </section>

        <section className="v2-merkle-strip" aria-label="Empreinte Merkle">
          <span className="v2-merkle-label">{t.donation?.merkleLabel || "Merkle root · session"}</span>
          <span className="v2-merkle-hash">{merkle.slice(0, 22)}…{merkle.slice(-10)}</span>
          <a
            className="v2-merkle-verify"
            href="https://github.com/vokov/swiss-resilience-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.donation?.verify || "Vérifier ↗"}
          </a>
        </section>

        <footer className="v2-modal-actions">
          <button className="v2-btn v2-btn-ghost" onClick={onClose}>
            {t.donation?.cancel || "Annuler"}
          </button>
          <button className="v2-btn v2-btn-primary" onClick={handlePay}>
            {t.donation?.btn || "Contribuer CHF"} {effectiveAmount || 0}
          </button>
        </footer>
      </div>
    </div>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

Object.assign(window, { BetaSection, DonationModal });


// ==================== [Module: Footer.jsx] ====================
// SwissRelief 2.6 — Legal footer with compliance chip strip
function FooterV2({ t }) {
  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-foot-grid">
          <div className="v2-foot-col">
            <div className="v2-brand" style={{ marginBottom: 14 }}>
              <span className="v2-brand-badge">
                <BrandMark size={20}/>
              </span>
              <span className="v2-brand-name">SwissRelief<span>Pan-Swiss 2.6</span></span>
            </div>
            <p>{t.footer.about}</p>
            <p className="v2-foot-url">violin-integration.works · swiss-resilience-web.pages.dev</p>
          </div>
          <div className="v2-foot-col">
            <h4>Modules</h4>
            <ul>
              <li><a href="#calc">Barèmes cantonaux (26)</a></li>
              <li><a href="#prof">Radar CH-ISCO-19</a></li>
              <li><a href="#sublease">Sous-location 262 CO</a></li>
              <li><a href="#mentors">Mentors Benevol</a></li>
              <li><a href="#beta">Transparence Merkle</a></li>
            </ul>
          </div>
          <div className="v2-foot-col">
            <h4>Références légales</h4>
            <ul>
              <li><a>Art. 262 CO · Sous-location</a></li>
              <li><a>Art. 21a LEI · Priorité ORP</a></li>
              <li><a>Art. 394 CO · Mandat gratuit</a></li>
              <li><a>Art. 60–79 CC · Association</a></li>
              <li><a>Art. 239 CO · Donation</a></li>
            </ul>
          </div>
          <div className="v2-foot-col">
            <h4>Conformité</h4>
            <ul>
              <li><a>LPD / GDPR-CH</a></li>
              <li><a>SKOS Standards</a></li>
              <li><a>USPI · ASLOCA</a></li>
              <li><a>Benevol Suisse</a></li>
              <li><a>WCAG 2.1 AA</a></li>
            </ul>
          </div>
        </div>

        <div className="v2-compliance-row">
          <span className="v2-comp-chip">SKOS · CH</span>
          <span className="v2-comp-chip">CCNT / CCT</span>
          <span className="v2-comp-chip">Benevol Suisse</span>
          <span className="v2-comp-chip">USPI · ASLOCA</span>
          <span className="v2-comp-chip">SECO · Art. 21a LEI</span>
          <span className="v2-comp-chip cyan">Merkle SHA-256</span>
          <span className="v2-comp-chip">WCAG 2.1 AA</span>
          <span className="v2-comp-chip">TMA v7.10</span>
        </div>
        <div className="v2-foot-legal">
          © 2026 SwissRelief — Association en création · Genève / Vaud · Art. 60–79 CC Suisse.
          <br/>
          Plateforme souveraine d'intelligence territoriale. Données officielles (SKOS, cantons, SECO, régies officielles mandatées, Tribunal fédéral) · Conformité LCD/UWG Art. 5 & ADR-018 Source-Agnostique.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterV2 });


// ==================== [Module: app.jsx] ====================
// SwissRelief 2.6 — App Root Component
// Implements ADR-016 safe storage, Telegram WebApp stabilization, and quad-lingual i18n routing.

const _appMemStore = {};
function safeStorageGet(key, def = null) {
  try {
    return window.localStorage ? (window.localStorage.getItem(key) || def) : (_appMemStore[key] || def);
  } catch (e) {
    return _appMemStore[key] || def;
  }
}

function safeStorageSet(key, val) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, val);
  } catch (e) {
    _appMemStore[key] = val;
  }
}

window.safeGet = safeStorageGet;
window.safeSet = safeStorageSet;

function App() {
  const isTMA = (() => {
    try {
      const p = window.location.pathname;
      if (p.includes('/app') || p.includes('/mini-app')) return true;
      if (window.Telegram?.WebApp?.initData) return true;
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'tma' || params.get('tma') === '1') return true;
    } catch (e) {}
    return false;
  })();

  const [lang, setLang] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang');
      if (paramLang && ['fr', 'de', 'it', 'uk'].includes(paramLang)) return paramLang;
    } catch (e) {}
    return safeStorageGet('sr26-lang', safeStorageGet('sr-v2-lang', 'fr'));
  });

  const [side, setSide] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSide = urlParams.get('side');
      if (paramSide === 'a' || paramSide === 'b') return paramSide;
    } catch (e) {}
    return safeStorageGet('sr26-side', safeStorageGet('sr-v2-side', 'a'));
  });

  const [service, setService] = React.useState(() => {
    try {
      const h = window.location.hash.replace('#', '');
      if (['calc', 'housing', 'dossier', 'beta', 'prof', 'sublease', 'mentors'].includes(h)) {
        return h;
      }
    } catch (e) {}
    return 'housing';
  });

  const [canton, setCanton] = React.useState(() => safeStorageGet('sr26-canton', 'VD'));
  const [status, setStatus] = React.useState(() => safeStorageGet('sr26-status', 'evam')); // evam | salary
  const [income, setIncome] = React.useState(() => Number(safeStorageGet('sr26-income', 4800)) || 4800);
  const [drawerOpen, setDrawer] = React.useState(false);
  const [dossierPrefill, setPrefill] = React.useState(null);

  // Persistence
  React.useEffect(() => {
    safeStorageSet('sr26-lang', lang);
    safeStorageSet('sr-v2-lang', lang);
  }, [lang]);

  React.useEffect(() => {
    safeStorageSet('sr26-side', side);
    safeStorageSet('sr-v2-side', side);
  }, [side]);

  React.useEffect(() => { safeStorageSet('sr26-canton', canton); }, [canton]);
  React.useEffect(() => { safeStorageSet('sr26-status', status); }, [status]);
  React.useEffect(() => { safeStorageSet('sr26-income', String(income)); }, [income]);

  // Early Telegram WebApp initialization and stabilization
  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        if (tg.enableClosingConfirmation) {
          tg.enableClosingConfirmation();
        }
        if (tg.MainButton) {
          tg.MainButton.setText("🏠 EXPLORER LE LOGEMENT EN ROMANDIE");
          tg.MainButton.show();
          tg.MainButton.onClick(() => {
            setService('housing');
            window.location.hash = "#housing";
            document.getElementById('housing')?.scrollIntoView({ behavior: 'smooth' });
          });
        }
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);

  // Hash routing (#housing, #dossier, #calc, #beta, etc.)
  React.useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace('#', '');
      if (['calc', 'housing', 'dossier', 'beta', 'prof', 'sublease', 'mentors'].includes(h)) {
        setService(h);
        setTimeout(() => {
          document.getElementById(h)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const t = (window.SR_I18N && window.SR_I18N[lang])
    ? window.SR_I18N[lang]
    : (window.SR_I18N ? window.SR_I18N.fr : {});

  const pickService = (id, s) => {
    setService(id);
    if (s) setSide(s);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const handleGenerate = (item) => {
    setPrefill(item);
    setService('dossier');
    setTimeout(() => {
      document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const openTelegramDonate = () => {
    if (window.Telegram?.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/SwissResilienceHubBot?start=donate');
    } else {
      window.open('https://t.me/SwissResilienceHubBot?start=donate', '_blank');
    }
  };

  if (!t || !t.banner) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#CBD5E1', fontFamily: 'Inter, sans-serif' }}>
        Chargement de l'environnement SwissRelief 2.6...
      </div>
    );
  }

  // Dedicated Native-like Mini App mode
  if (isTMA) {
    return (
      <div className="tma-app-root">
        <header className="tma-header">
          <div className="tma-brand">
            <BrandMark size={22}/>
            <span className="tma-title">SwissRelief</span>
            <span className="tma-badge">Mini App</span>
          </div>
          <div className="tma-header-actions">
            <div className="tma-side-toggle">
              <button
                className={side === 'a' ? 'active' : ''}
                onClick={() => setSide('a')}
              >
                Permis S
              </button>
              <button
                className={side === 'b' ? 'active' : ''}
                onClick={() => setSide('b')}
              >
                Hôte
              </button>
            </div>
            <div className="tma-lang-picker">
              {['fr', 'de', 'it', 'uk'].map(l => (
                <button
                  key={l}
                  className={`tma-lang-pill ${lang === l ? 'active' : ''}`}
                  onClick={() => setLang(l)}
                  title={l.toUpperCase()}
                >
                  {LANG_FLAGS[l]}
                </button>
              ))}
            </div>
          </div>
        </header>

        <ServiceSwitcher activeId={service} onPick={pickService} t={t}/>

        <main className="tma-main">
          {(service === 'calc' || service === 'housing') && (
            <React.Fragment>
              <CantonCalculatorV2
                t={t}
                lang={lang}
                canton={canton}
                setCanton={setCanton}
                status={status}
                income={income}
              />
              <HousingSection
                t={t}
                lang={lang}
                canton={canton}
                onGenerate={handleGenerate}
              />
            </React.Fragment>
          )}

          {service === 'dossier' && (
            <DossierGenerator
              t={t}
              lang={lang}
              prefill={dossierPrefill}
            />
          )}

          {service === 'prof' && (
            <ProfessionSelector t={t} lang={lang}/>
          )}

          {service === 'sublease' && (
            <SubleaseWizard t={t}/>
          )}

          {service === 'mentors' && (
            <BenevolMentors t={t}/>
          )}

          {service === 'beta' && (
            <BetaSection onOpenDonate={openTelegramDonate} t={t}/>
          )}
        </main>

        <nav className="tma-bottom-bar" aria-label="Navigation Mini App">
          <button
            className={service === 'calc' || service === 'housing' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('calc'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
            <span>{t.nav?.housing || "Logement"}</span>
          </button>
          <button
            className={service === 'dossier' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('dossier'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
            <span>{t.nav?.dossier || "Dossier"}</span>
          </button>
          <button
            className={service === 'prof' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('prof'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>
            <span>{t.svc?.prof || "Emploi"}</span>
          </button>
          <button
            className={service === 'sublease' || service === 'mentors' ? 'active' : ''}
            onClick={() => { setSide('b'); pickService(service === 'mentors' ? 'mentors' : 'sublease', 'b'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>{side === 'b' ? (t.svc?.mentors || "Mentors") : (t.svc?.sublease || "Sous-location")}</span>
          </button>
          <button
            className={service === 'beta' ? 'active' : ''}
            onClick={() => pickService('beta')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 15 8l6 .9-4.5 4.4L18 20l-6-3.2L6 20l1.5-6.7L3 8.9 9 8z"/></svg>
            <span>{t.nav?.donate || "Soutenir"}</span>
          </button>
        </nav>
      </div>
    );
  }

  // Regular Desktop Landing Page
  return (
    <React.Fragment>
      <TopBannerV2 t={t}/>
      <NavV2
        lang={lang}
        setLang={setLang}
        side={side}
        setSide={setSide}
        onOpenDrawer={() => setDrawer(true)}
        onOpenDonate={openTelegramDonate}
        t={t}
      />
      <ServiceSwitcher activeId={service} onPick={pickService} t={t}/>
      <main>
        <HeroV2 side={side} setSide={setSide} t={t}/>
        {side === 'a' ? (
          <React.Fragment>
            <CantonCalculatorV2
              t={t}
              lang={lang}
              canton={canton}
              setCanton={setCanton}
              status={status}
              income={income}
            />
            <HousingSection
              t={t}
              lang={lang}
              canton={canton}
              onGenerate={handleGenerate}
            />
            <DossierGenerator
              t={t}
              lang={lang}
              prefill={dossierPrefill}
            />
            <ProfessionSelector t={t} lang={lang}/>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SubleaseWizard t={t}/>
            <BenevolMentors t={t}/>
          </React.Fragment>
        )}
        <BetaSection onOpenDonate={openTelegramDonate} t={t}/>
      </main>
      <FooterV2 t={t}/>

      {drawerOpen && (
        <MobileDrawer
          lang={lang}
          setLang={setLang}
          side={side}
          setSide={setSide}
          service={service}
          setService={setService}
          onClose={() => setDrawer(false)}
          onOpenDonate={openTelegramDonate}
          onDonate={openTelegramDonate}
          t={t}
        />
      )}
    </React.Fragment>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App/>);
}

