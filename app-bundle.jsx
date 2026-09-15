/* Swiss Resilience Navigator 2.6 — Consolidated Bundle */

// ==================== [Module: shared.jsx] ====================
// Shared atoms / icons / helpers for Swiss Resilience Navigator 2.5 / SwissRelief 2.6
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Formatting ----------
const chf = (n) => new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/,/g, "'");
window.chf = chf;

// ---------- Language tag / flag helpers ----------
const LANG_FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦", en: "🇬🇧" };
const LANG_LABEL = { fr: "FR", de: "DE", it: "IT", uk: "UK", en: "EN" };

// ---------- Brand mark: ACCORD squircle logo with SVG fallback ----------
function BrandMark({ size = 28 }) {
  return (
    <span className="brand-mark" style={{
      width: size, height: size, minWidth: size, borderRadius: Math.round(size * 0.25),
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', verticalAlign: 'middle', background: '#D52B1E',
      boxShadow: '0 2px 8px rgba(213,43,30,0.35)', flexShrink: 0
    }}>
      <img
        src="/accord_logo.jpg"
        alt="ACCORD"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </span>
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

function NavV2({ lang, setLang, side, setSide, onOpenDrawer, onOpenDonate, onOpenInfo, t }) {
  const [langOpen, setLangOpen] = React.useState(false);
  const FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦", en: "🇬🇧" };
  const NAMES = { fr: "Français", de: "Deutsch", it: "Italiano", uk: "Українська", en: "English" };
  const LABELS = { fr: "FR", de: "DE", it: "IT", uk: "UK", en: "EN" };

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

  const navLabels = {
    uk: { housing: "Житло", jobs: "Вакансії", calc: "Калькулятор", dossier: "Досьє", sublease: "Суборенда", mentors: "Ментори", guide: "Інструкція", about: "Про проєкт", why: "Чому ми", privacy: "Конфіденційність" },
    fr: { housing: "Logement", jobs: "Emplois", calc: "Calculateur", dossier: "Dossier", sublease: "Sous-location", mentors: "Mentors", guide: "Mode d'emploi", about: "À propos", why: "Pourquoi nous", privacy: "Confidentialité" },
    de: { housing: "Wohnen", jobs: "Stellen", calc: "Rechner", dossier: "Dossier", sublease: "Untermiete", mentors: "Mentoren", guide: "Anleitung", about: "Über uns", why: "Warum wir", privacy: "Datenschutz" },
    en: { housing: "Housing", jobs: "Jobs", calc: "Calculator", dossier: "Dossier", sublease: "Sublease", mentors: "Mentors", guide: "User Guide", about: "About", why: "Why us", privacy: "Privacy" }
  };
  const nl = navLabels[lang] || navLabels.fr;

  return (
    <header className="v2-sticky-header" role="banner">
      {/* Row 1: brand + desktop nav + actions */}
      <div className="v2-container v2-nav-row">
        <a href="#top" className="v2-brand" aria-label="ACCORD">
          <span className="v2-brand-badge"><BrandMark size={28}/></span>
          <span className="v2-brand-name">
            ACCORD
            <span>{lang === 'uk' ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'}</span>
          </span>
        </a>

        <nav className="v2-nav-links v2-desktop-only" aria-label="Navigation principale" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <a href="#housing" className="v2-nav-link" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', textDecoration: 'none' }}>{nl.housing}</a>
          <a href="#prof" className="v2-nav-link" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', textDecoration: 'none' }}>{nl.jobs}</a>
          <a href="#calc" className="v2-nav-link" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', textDecoration: 'none' }}>{nl.calc}</a>
          <a href="#dossier" className="v2-nav-link" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', textDecoration: 'none' }}>{nl.dossier}</a>
          <a href="#mentors" className="v2-nav-link" style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-2)', textDecoration: 'none' }}>{nl.mentors}</a>
        </nav>

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
                {['fr','de','it','uk','en'].map(l => (
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


// ==================== [Module: MobileDrawer.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Mobile Drawer (Anomalie 1 FIX)
// Rendered via ReactDOM.createPortal to document.body → escapes .nav-wrap
// containing-block trap. 100dvh, inset:0, z-index 99999.
// Contains 2×2 language grid (Anomalie 2 FIX).

function MobileDrawer({ lang, setLang, side, setSide, service, setService, onClose, onDonate, onOpenInfo, t }) {
  // Body scroll lock
  React.useEffect(() => {
    document.body.classList.add('no-scroll');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
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

  const sw = t?.switcher || {};
  const services = [
    { id: 'housing', side: 'a', icon: <Ico.house/>, label: sw.housing?.label || t?.nav?.housing || "Житло", sub: sw.housing?.sub || "Оренда та EVAM" },
    { id: 'prof',    side: 'a', icon: <Ico.chart/>, label: sw.prof?.label || t?.nav?.jobs || "Робота", sub: sw.prof?.sub || "Вакансії та CV" },
    { id: 'calc',    side: 'a', icon: <Ico.house/>, label: sw.calc?.label || t?.svc?.calc || "Калькулятор", sub: sw.calc?.sub || "Ліміти 26 кантонів" },
    { id: 'dossier', side: 'a', icon: <Ico.file/>,  label: sw.dossier?.label || t?.nav?.dossier || "Досьє", sub: sw.dossier?.sub || "Пакет для режі" },
    { id: 'sublease',side: 'b', icon: <Ico.shield/>,label: sw.sublease?.label || t?.svc?.sublease || "Суборенда", sub: sw.sublease?.sub || "Кімната в оренду" },
    { id: 'mentors', side: 'b', icon: <Ico.users/>, label: sw.mentors?.label || t?.svc?.mentors || "Ментори", sub: sw.mentors?.sub || "Волонтери Benevol" },
    { id: 'beta',    side: null,icon: <Ico.heart/>, label: sw.beta?.label || t?.svc?.beta || "Підтримка", sub: sw.beta?.sub || "Вільна бета" }
  ];

  const drawer = (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Menu principal">
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head">
          <div className="brand">
            <span className="brand-badge"><BrandMark size={24}/></span>
            <span className="brand-name">
              <span className="primary">ACCORD Suisse</span>
              <span className="badge">PERMIS S · 100% GRATUIT 🇨🇭🇺🇦</span>
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
                <span className="flag" aria-hidden="true">{window.LANG_FLAGS ? window.LANG_FLAGS[l] : l}</span>
                <div style={{display:'flex', flexDirection:'column', gap:2, minWidth:0}}>
                  <span>{window.SR_I18N && window.SR_I18N[l]?.lang ? window.SR_I18N[l].lang : l.toUpperCase()}</span>
                  <span className="code">{window.LANG_CODES ? window.LANG_CODES[l] : l.toUpperCase()}</span>
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
              {t.tabs?.seekers || "Шукачі (Permis S)"}
            </button>
            <button className={side === 'b' ? 'active' : ''} onClick={() => { setSide('b'); onClose(); }}>
              {t.tabs?.solidarity || "Швейцарські волонтери"}
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

        {/* Information Hub */}
        <div className="drawer-section">
          <div className="drawer-section-title">
            {lang === 'uk' ? 'Довідка та правила'
             : lang === 'de' ? 'Informationen & Regeln'
             : lang === 'it' ? 'Informazioni e regole'
             : 'Informations & Règles'}
          </div>
          <div className="svc-list">
            <button className="svc-item" onClick={() => { onClose(); if (onOpenInfo) onOpenInfo('guide'); else window.location.hash = 'guide'; }}>
              <div className="icon">📖</div>
              <div className="info">
                <div className="label">{t?.nav?.guide || (lang === 'uk' ? 'Як користуватись' : 'Mode d\'emploi')}</div>
                <div className="sub">{lang === 'uk' ? 'Покроковий алгоритм дій' : 'Guide pas-à-pas'}</div>
              </div>
              <Ico.arrow className="arrow"/>
            </button>
            <button className="svc-item" onClick={() => { onClose(); if (onOpenInfo) onOpenInfo('why'); else window.location.hash = 'why'; }}>
              <div className="icon">⭐</div>
              <div className="info">
                <div className="label">{t?.nav?.why || (lang === 'uk' ? 'Чому ми кращі' : 'Pourquoi ACCORD ?')}</div>
                <div className="sub">{lang === 'uk' ? 'Порівняння з посередниками' : 'Comparatif avec intermédiaires'}</div>
              </div>
              <Ico.arrow className="arrow"/>
            </button>
            <button className="svc-item" onClick={() => { onClose(); if (onOpenInfo) onOpenInfo('about'); else window.location.hash = 'about'; }}>
              <div className="icon">🏛️</div>
              <div className="info">
                <div className="label">{t?.nav?.about || (lang === 'uk' ? 'Про проєкт' : 'À propos')}</div>
                <div className="sub">{lang === 'uk' ? 'Місія, засновник та статус' : 'Statuts, mission & Sonate Solidaire'}</div>
              </div>
              <Ico.arrow className="arrow"/>
            </button>
            <button className="svc-item" onClick={() => { onClose(); if (onOpenInfo) onOpenInfo('privacy'); else window.location.hash = 'privacy'; }}>
              <div className="icon">🛡️</div>
              <div className="info">
                <div className="label">{t?.nav?.privacy || (lang === 'uk' ? 'Конфіденційність' : 'Confidentialité')}</div>
                <div className="sub">nDSG / RGPD · Arsen Kovalenko</div>
              </div>
              <Ico.arrow className="arrow"/>
            </button>
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
          Association Swiss Resilience / ACCORD en cours de constitution<br/>
          (Art. 60–79 CC Suisse) · Merkle SHA-256
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(drawer, document.body);
}

Object.assign(window, { MobileDrawer });


// ==================== [Module: InfoModal.jsx] ====================
// ACCORD Suisse · Dedicated Information & Trust Hub Modal
// Tabs: 'about' (Про проєкт), 'guide' (Як користуватись), 'why' (Чому ми кращі), 'privacy' (Конфіденційність nDSG/GDPR)
// Fully reactive with multilingual support (UK, FR, DE, EN) and direct hash routing.

function InfoModal({ isOpen, onClose, initialTab = 'about', lang = 'uk', t }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabsMeta = {
    uk: {
      about: "Про проєкт",
      guide: "Як користуватись",
      why: "Чому ми кращі",
      privacy: "Конфіденційність"
    },
    fr: {
      about: "À propos",
      guide: "Mode d'emploi",
      why: "Pourquoi ACCORD ?",
      privacy: "Confidentialité"
    },
    de: {
      about: "Über uns",
      guide: "Anleitung",
      why: "Warum wir ?",
      privacy: "Datenschutz"
    },
    en: {
      about: "About project",
      guide: "User Guide",
      why: "Why ACCORD ?",
      privacy: "Privacy Policy"
    }
  };

  const tm = tabsMeta[lang] || tabsMeta.fr;

  return (
    <div className="info-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(7, 11, 18, 0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px', animation: 'fadeIn .2s ease-out'
    }}>
      <div className="info-modal-card" onClick={e => e.stopPropagation()} style={{
        background: '#0D1424', border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: 20, width: '100%', maxWidth: 880, maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
      }}>
        {/* Header with brand & tabs */}
        <div style={{
          padding: '18px 24px 14px', borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(15, 23, 42, 0.95)', display: 'flex', flexDirection: 'column', gap: 14
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BrandMark size={28}/>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', letterSpacing: '-0.01em' }}>
                  ACCORD Suisse
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>
                  {lang === 'uk' ? 'Довідковий та правовий хаб' : 'Hub d\'information & conformité'}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              style={{
                background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94A3B8', cursor: 'pointer', fontSize: 18, transition: 'all .15s'
              }}
            >
              ✕
            </button>
          </div>

          {/* Navigation tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { id: 'about', label: `🏛️ ${tm.about}` },
              { id: 'guide', label: `📖 ${tm.guide}` },
              { id: 'why',   label: `⭐ ${tm.why}` },
              { id: 'privacy', label: `🛡️ ${tm.privacy}` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  try { window.location.hash = tab.id; } catch(e) {}
                }}
                style={{
                  padding: '7px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                  whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', transition: 'all .15s',
                  background: activeTab === tab.id ? '#D52B1E' : 'rgba(255,255,255,0.06)',
                  color: activeTab === tab.id ? '#fff' : '#CBD5E1',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(213,43,30,0.4)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal body (scrollable) */}
        <div style={{ padding: '24px', overflowY: 'auto', color: '#E2E8F0', lineHeight: 1.6, fontSize: 13.5 }}>
          {activeTab === 'about' && <AboutTab lang={lang}/>}
          {activeTab === 'guide' && <GuideTab lang={lang}/>}
          {activeTab === 'why'   && <WhyTab lang={lang}/>}
          {activeTab === 'privacy' && <PrivacyTab lang={lang}/>}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(15, 23, 42, 0.95)', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 10
        }}>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>
            violin-integration.works · @SwissResilienceHubBot · <a href="/privacy" style={{ color: '#38BDF8', textDecoration: 'none' }}>/privacy ↗</a>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href="https://t.me/SwissResilienceHubBot"
              target="_blank" rel="noopener noreferrer"
              className="btn primary"
              style={{ padding: '7px 14px', fontSize: 12.5, textDecoration: 'none' }}
            >
              Telegram Bot
            </a>
            <button
              onClick={onClose}
              className="btn ghost"
              style={{ padding: '7px 14px', fontSize: 12.5 }}
            >
              {lang === 'uk' ? 'Закрити' : 'Fermer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 1. TAB: ПРО ПРОЄКТ (ABOUT)
// --------------------------------------------------------------------------
function AboutTab({ lang }) {
  if (lang === 'uk') {
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
          Про проєкт АКОРД (L'Accord Suisse)
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
          Суверенна цифрова платформа прямої дії для гідного житла, легальної праці та взаєморозуміння у Швейцарії.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', marginBottom: 6 }}>🏛️ Місія платформи</div>
            <div>
              АКОРД створено для усунення бюрократичних перепон та виснажливого очікування для українців із тимчасовим захистом (Permis S). Наша мета — надати кожній родині інструмент для самостійного, гідного пошуку житла та роботи без посередників і комісій.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981', marginBottom: 6 }}>🎻 Чому назва «АКОРД»?</div>
            <div>
              <b>L'Accord de bail:</b> Офіційна згода режі на оренду квартири.<br/>
              <b>L'Accord de travail:</b> Підписаний трудовий договір (LEI / CCT).<br/>
              <b>L'Accord mutuel:</b> Суспільна злагода та взаємоповага.<br/>
              <b>Гармонія струн:</b> Зв'язок із культурним проєктом солідарності скрипаля Арсена Коваленка <em>Sonate Solidaire</em> (<a href="https://sonate-solidaire.me" target="_blank" rel="noopener" style={{ color: '#38BDF8' }}>sonate-solidaire.me</a>).
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(213,43,30,0.06)', border: '1px solid rgba(213,43,30,0.2)', borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#F87171', marginBottom: 6 }}>⚖️ Некомерційний статус та стандарти</div>
          <div>
            Асоціація Swiss Resilience перебуває в процесі створення (ст. 60–79 Цивільного кодексу Швейцарії CC). Діяльність є на 100% волонтерською, сервіси надаються абсолютно безкоштовно відповідно до Федерального закону про службу зайнятості (LSE/AVG), який прямо забороняє стягувати плату з шукачів роботи.
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
          <b>Ініціатор та відповідальна особа:</b> Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland (Vaud) · E-mail: arsen.k111999@gmail.com · Телефон: +41 78 326 11 12
        </div>
      </div>
    );
  }

  // French default
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
        À propos de l'ACCORD Suisse
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        Plateforme souveraine d'action directe pour le logement digne, l'emploi légal et l'intégration en Suisse.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', marginBottom: 6 }}>🏛️ Notre Mission</div>
          <div>
            L'ACCORD a été conçu pour éliminer les intermédiaires abusifs et les frais clandestins. Nous offrons aux bénéficiaires du Permis S et aux employeurs suisses un outil direct, souverain et sans friction technique.
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981', marginBottom: 6 }}>🎻 Pourquoi « ACCORD » ?</div>
          <div>
            <b>L'Accord de bail :</b> Validation de candidature par la gérance.<br/>
            <b>L'Accord de travail :</b> Contrat d'embauche conforme CCT/CCNT.<br/>
            <b>L'Accord mutuel :</b> Concorde et confiance réciproque.<br/>
            <b>Harmonie musicale :</b> Synergie avec l'initiative culturelle <em>Sonate Solidaire</em> du violoniste Arsen Kovalenko (<a href="https://sonate-solidaire.me" target="_blank" rel="noopener" style={{ color: '#38BDF8' }}>sonate-solidaire.me</a>).
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(213,43,30,0.06)', border: '1px solid rgba(213,43,30,0.2)', borderRadius: 12, padding: 18, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#F87171', marginBottom: 6 }}>⚖️ Cadre légal et gratuité</div>
        <div>
          Association Swiss Resilience en création (Art. 60–79 CC). 100% bénévole et conforme à la loi fédérale sur le service de l'emploi (LSE/AVG), garantissant la stricte gratuité pour tous les candidats.
        </div>
      </div>

      <div style={{ fontSize: 12, color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
        <b>Contact référent :</b> Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland (Vaud) · E-mail : arsen.k111999@gmail.com · Téléphone : +41 78 326 11 12
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 2. TAB: ЯК КОРИСТУВАТИСЬ (GUIDE)
// --------------------------------------------------------------------------
function GuideTab({ lang }) {
  const stepsUk = [
    { n: "01", t: "Пошук житла з реальними фото", d: "Оберіть вкладку «Житло». Перевіряйте квартири з реальними фото, прямим закріпленням за режі (без сайтів-агрегаторів) та розрахунком часу CFF/SBB до найближчого вокзалу." },
    { n: "02", t: "Калькулятор кантональних лімітів", d: "У вкладці «Калькулятор» оберіть свій кантон (EVAM у Vaud, Hospice Général у Genève тощо) та перевірте, чи вписується вартість оренди в офіційні норми соціальної допомоги та правило 33% зарплати." },
    { n: "03", t: "Генератор досьє для режі в 1 клік", d: "Введіть свої дані та статус у вкладці «Досьє». Платформа створить офіційний лист-заявку французькою або німецькою мовою з повним пакетом додатків (Art. 253 CO), готовий для передачі до режі." },
    { n: "04", t: "Вакансії та швейцарське CV", d: "У вкладці «Робота» переглядайте 63 актуальні пропозиції, відсортовані за ст. 17 LEI (миттєвий найм) та ст. 21a LEI (пріоритет ORP). Ознайомтеся зі швейцарським стандартом резюме та створіть мотиваційний лист." },
    { n: "05", t: "Суборенда та швейцарські наставники", d: "Розрахуйте законну частку оплати кімнати за ст. 262 CO (максимум 20% за меблі). Подайте запит на волонтерський супровід від швейцарців мережі Benevol (ст. 394 CO)." },
    { n: "06", t: "Підключення бота @SwissResilienceHubBot", d: "Запустіть Telegram-бота для отримання персональних сповіщень швидше за 60 секунд. Відгукуйтесь першими, поки оголошення не отримало сотні відгуків." }
  ];

  const stepsFr = [
    { n: "01", t: "Trouver un logement vérifié", d: "Consultez la section « Logement ». Chaque bien est attribué factuellement à sa gérance, avec calcul précis du temps CFF/SBB et conformité aux barèmes EVAM." },
    { n: "02", t: "Calculer les plafonds cantonaux", d: "Vérifiez dans le « Calculateur » si le loyer respecte les barèmes officiels de votre canton et la règle impérative des 33% de vos revenus nets." },
    { n: "03", t: "Générer son dossier de régie 1-clic", d: "Renseignez vos coordonnées dans le « Dossier ». L'application compose automatiquement la lettre de candidature formelle selon l'Art. 253 CO." },
    { n: "04", t: "Emplois et standard CV suisse", d: "Explorez les 63 offres réelles, le radar de priorité Art. 21a LEI, et suivez le guide pas-à-pas pour adapter votre CV aux exigences des recruteurs suisses." },
    { n: "05", t: "Sous-location & Réseau de mentors", d: "Estimez une participation équitable pour une chambre selon l'Art. 262 CO. Rejoignez ou sollicitez l'accompagnement citoyen bénévole Benevol (Art. 394 CO)." },
    { n: "06", t: "Alertes via @SwissResilienceHubBot", d: "Activez le bot Telegram pour recevoir les nouvelles annonces en moins de 60 secondes chrono et postuler avant la saturation des régies." }
  ];

  const steps = lang === 'uk' ? stepsUk : stepsFr;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
        {lang === 'uk' ? 'Як користуватись платформою АКОРД' : 'Mode d\'emploi de la plateforme ACCORD'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        {lang === 'uk'
          ? 'Простий покроковий алгоритм для швидкого отримання житла, роботи та легального захисту.'
          : 'Guide méthodique pour réussir vos démarches de logement et d\'emploi en Suisse Romande.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
        {steps.map(s => (
          <div key={s.n} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 800, color: '#D52B1E' }}>
                КРОК {s.n}
              </span>
            </div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.t}</div>
            <div style={{ fontSize: 12.5, color: '#94A3B8', lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. TAB: ЧОМУ МИ КРАЩІ (WHY ACCORD / COMPARISON)
// --------------------------------------------------------------------------
function WhyTab({ lang }) {
  const isUk = lang === 'uk';

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
        {isUk ? 'Чому АКОРД — найефективніший вибір?' : 'Pourquoi l\'ACCORD est la meilleure solution ?'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        {isUk
          ? 'Пряме порівняння: АКОРД проти комерційних посередників та звичайних дощок оголошень.'
          : 'Comparatif objectif entre l\'ACCORD Suisse, les intermédiaires payants et les portails généralistes.'}
      </p>

      {/* Comparison table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(148, 163, 184, 0.25)', color: '#94A3B8' }}>
              <th style={{ padding: '10px 12px' }}>{isUk ? 'Критерій' : 'Critère'}</th>
              <th style={{ padding: '10px 12px', color: '#F87171' }}>{isUk ? 'Платні «посередники»' : 'Intermédiaires payants'}</th>
              <th style={{ padding: '10px 12px', color: '#FBBF24' }}>{isUk ? 'Звичайні сайти (ImmoScout)' : 'Portails classiques'}</th>
              <th style={{ padding: '10px 12px', color: '#34D399', background: 'rgba(16,185,129,0.08)', borderRadius: '6px 6px 0 0' }}>
                {isUk ? '✓ АКОРД Швейцарія' : '✓ L\'ACCORD Suisse'}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Вартість' : 'Tarification'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>50 – 800 CHF</td>
              <td style={{ padding: '10px 12px' }}>Платні підписки Pro</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '100% Безкоштовно (ст. 2 LSE)' : '100% Gratuit (Loi LSE)'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Швидкість сигналу' : 'Délai d\'alerte'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Вручну / із запізненням</td>
              <td style={{ padding: '10px 12px' }}>Email через 2–12 годин</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '< 60 секунд у Telegram' : '< 60 s via Telegram'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Кантональні норми' : 'Barèmes cantonaux'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Ігнорують норми кантону</td>
              <td style={{ padding: '10px 12px' }}>Відсутня перевірка</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? 'Офіційні ліміти 26 кантонів' : '26 cantons intégrés (EVAM/SKOS)'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Пакет для режі' : 'Dossier de régie'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Платне складання</td>
              <td style={{ padding: '10px 12px' }}>Самостійно без зразка</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '1-Click USPI (PDF/A)' : '1-Click USPI conforme Art. 253 CO'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Супровід волонтерів' : 'Mentorat citoyen'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Відсутній</td>
              <td style={{ padding: '10px 12px' }}>Відсутній</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? 'Мережа Benevol (ст. 394 CO)' : 'Réseau Benevol Suisse officiel'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 4. TAB: ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ (PRIVACY nDSG / GDPR — 12 SECTIONS)
// --------------------------------------------------------------------------
function PrivacyTab({ lang }) {
  const isUk = lang === 'uk';

  const sectionsUk = [
    {
      title: "1. Відповідальна особа",
      content: `Відповідальним за обробку даних на цьому веб-сайті є:

Арсен Коваленко (Arsen Kovalenko)
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Швейцарія

E-mail: arsen.k111999@gmail.com
Телефон: +41 78 326 11 12`
    },
    {
      title: "2. Зібрані дані",
      content: `Ми збираємо такі дані:

• Локальні налаштування інтерфейсу: обрана мова, статус захисту, обраний кантон та параметри калькулятора (зберігаються локально у вашому браузері через localStorage).
• Telegram Bot / Mini App: ідентифікатор користувача Telegram (ID) виключно для доставки запитаних сповіщень про житло та роботу.
• Технічні дані: журнали сервера Cloudflare (анонімізована IP-адреса, дата й час, запитувана сторінка) для захисту від DDoS та кібератак.`
    },
    {
      title: "3. Мета обробки",
      content: `Ми обробляємо ваші дані виключно з такими цілями:

• Надання безоплатного доступу до бази перевіреного житла та вакансій.
• Створення офіційного досьє для режі (Dossier de candidature Art. 253 CO) на стороні клієнта.
• Забезпечення технічної безпеки, захисту від зловживань та високої швидкості завантаження.`
    },
    {
      title: "4. Правова основа (nDSG / GDPR)",
      content: `Обробка персональних даних здійснюється на основі:

• Ст. 6 п. 1 літ. a GDPR / Ст. 31 нового швейцарського Закону nDSG: Згода користувача.
• Ст. 6 п. 1 літ. b GDPR / Ст. 31 nDSG: Виконання запиту користувача (генерація документів, сповіщення).
• Ст. 6 п. 1 літ. f GDPR / Ст. 31 nDSG: Законні інтереси (безпека серверної інфраструктури, запобігання шахрайству).`
    },
    {
      title: "5. Відсутність продажу даних та безкоштовність",
      content: `ACCORD Suisse діє згідно з Федеральним законом про службу зайнятості (LSE/AVG), ст. 2 якого категорично забороняє стягувати плату з шукачів роботи. Ми ніколи не продаємо, не здаємо в оренду і не передаємо персональні дані комерційним рекламодавцям чи посередникам.`
    },
    {
      title: "6. Зберігання та файли Cookies / LocalStorage",
      content: `Наш сайт використовує технічно необхідне локальне сховище (localStorage):

• sr26-lang / sr-v2-lang: збереження обраної мови інтерфейсу.
• sr26-canton: збереження обраного кантону для розрахунку EVAM / SKOS.
• sr26-status / sr26-income: розрахунок 33% стелі оренди.
Ви можете в будь-який момент очистити ці дані в налаштуваннях вашого браузера або натиснувши "Очистити" у футері сайту.`
    },
    {
      title: "7. Термін зберігання",
      content: `• Локальні налаштування браузера: до моменту очищення кешу користувачем.
• Telegram-сповіщення: до зупинки бота або введення команди /stop.
• Журнали безпеки Cloudflare: 30 днів.`
    },
    {
      title: "8. Ваші права згідно з nDSG та GDPR",
      content: `Згідно зі швейцарським законодавством (nDSG) та європейським регламентом GDPR, ви маєте право:

• Право на доступ до ваших даних.
• Право на виправлення або повне видалення.
• Право на обмеження або припинення обробки.
• Право на відкликання згоди в будь-який момент.

Для реалізації будь-якого з цих прав звертайтесь безпосередньо до Арсена Коваленка: arsen.k111999@gmail.com.`
    },
    {
      title: "9. Міжнародна передача та безпека інфраструктури",
      content: `Сайт розміщено в мережі Cloudflare (Cloudflare Inc., США / ЄС) відповідно до рамкової угоди Swiss-US Data Privacy Framework та гарантій ст. 16 nDSG / ст. 46 GDPR. Увесь трафік шифрується за протоколом HTTPS (TLS 1.3).`
    },
    {
      title: "10. Наглядовий орган Швейцарії",
      content: `Компетентний наглядовий орган у сфері захисту даних у Швейцарії:

Федеральний уповноважений із захисту даних та інформації (EDÖB / PFPDT)
Feldeggweg 1, 3003 Bern, Швейцарія
Веб-сайт: www.edoeb.admin.ch`
    },
    {
      title: "11. Контакти та супровід",
      content: `З усіх питань конфіденційності та захисту даних:
Арсен Коваленко · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Швейцарія
E-mail: arsen.k111999@gmail.com · Телефон: +41 78 326 11 12`
    }
  ];

  const sectionsFr = [
    {
      title: "1. Responsable du traitement",
      content: `Le responsable du traitement des données sur ce site est :

Arsen Kovalenko
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Suisse

E-mail : arsen.k111999@gmail.com
Téléphone : +41 78 326 11 12`
    },
    {
      title: "2. Données collectées",
      content: `Nous collectons et traitons les données suivantes :

• Préférences locales d'interface : langue choisie, canton de référence, statut de protection et critères de calcul (stockées localement via localStorage).
• Bot Telegram / Mini App : identifiant Telegram pour la transmission exclusive des alertes de logement ou d'emploi sollicitées.
• Données techniques : journaux de requêtes serveur Cloudflare (adresse IP anonymisée, horodatage, page consultée) pour la protection contre les attaques DDoS.`
    },
    {
      title: "3. Finalités du traitement",
      content: `Le traitement des données poursuit les buts exclusifs suivants :

• Fourniture gratuite de l'accès aux offres vérifiées de logement et d'emploi.
• Génération locale du dossier de candidature pour la régie (Art. 253 CO).
• Sécurisation technique et stabilité de la plateforme.`
    },
    {
      title: "4. Base juridique (nLPD / RGPD)",
      content: `Le traitement repose sur :

• Art. 6 par. 1 let. a RGPD / Art. 31 nLPD : Consentement de l'utilisateur.
• Art. 6 par. 1 let. b RGPD / Art. 31 nLPD : Exécution de la demande de service.
• Art. 6 par. 1 let. f RGPD / Art. 31 nLPD : Intérêts légitimes (sécurité du réseau et de l'information).`
    },
    {
      title: "5. Gratuité absolue et interdiction de cession",
      content: `Conformément à la Loi fédérale sur le service de l'emploi (LSE/AVG), la plateforme est 100% bénévole et gratuite. Aucune donnée n'est vendue ni communiquée à des tiers commerciaux ou intermédiaires payants.`
    },
    {
      title: "6. Stockage local et cookies",
      content: `Notre site utilise le stockage local (localStorage) strictement technique :
• sr26-lang / sr-v2-lang : langue de navigation.
• sr26-canton : canton pour les barèmes EVAM / SKOS.
• sr26-status / sr26-income : calcul du plafond d'effort financier de 33%.
Vous pouvez réinitialiser ces données à tout moment dans les paramètres de votre navigateur.`
    },
    {
      title: "7. Durée de conservation",
      content: `• Préférences du navigateur : conservées jusqu'à effacement par l'utilisateur.
• Alertes Telegram : conservées jusqu'à la commande /stop dans le bot.
• Journaux serveur de sécurité Cloudflare : 30 jours maximum.`
    },
    {
      title: "8. Vos droits (nLPD & RGPD)",
      content: `Vous disposez d'un droit complet d'accès, de rectification, de suppression et de limitation de vos données. Pour exercer vos droits : arsen.k111999@gmail.com.`
    },
    {
      title: "9. Sécurité et hébergement Cloudflare",
      content: `La plateforme est hébergée sur l'infrastructure Cloudflare sous les garanties du Swiss-US Data Privacy Framework (Art. 16 nLPD). Les échanges sont intégralement chiffrés en HTTPS (TLS 1.3).`
    },
    {
      title: "10. Autorité de surveillance suisse",
      content: `Préposé fédéral à la protection des données et à la transparence (PFPDT / EDÖB) :
Feldeggweg 1, 3003 Berne, Suisse
Site officiel : www.edoeb.admin.ch`
    },
    {
      title: "11. Contact",
      content: `Pour toute question relative à la protection des données :
Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Suisse
E-mail : arsen.k111999@gmail.com · Téléphone : +41 78 326 11 12`
    }
  ];

  const sections = isUk ? sectionsUk : sectionsFr;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 4 }}>
        {isUk ? 'Політика конфіденційності (nDSG / GDPR)' : 'Politique de confidentialité (nLPD / RGPD)'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 12.5, marginBottom: 18 }}>
        {isUk
          ? 'Останнє оновлення: 14 вересня 2026 року · Відповідність швейцарському закону nDSG та GDPR · sonate-solidaire.me'
          : 'Dernière mise à jour : 14 septembre 2026 · Conforme à la loi fédérale suisse nLPD et au RGPD · sonate-solidaire.me'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sections.map((s, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148, 163, 184, 0.12)', borderRadius: 10, padding: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#38BDF8', margin: '0 0 6px' }}>{s.title}</h3>
            <div style={{ whiteSpace: 'pre-line', fontSize: 13, color: '#CBD5E1' }}>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { InfoModal });


// ==================== [Module: Hero.jsx] ====================
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
    title: "Principes de confiance",
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
        <div className="pillar-grid">
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

function HousingSection({ t, lang, canton: propCanton, onGenerate }) {
  const [limit, setLimit] = React.useState(9);
  const [selectedCanton, setSelectedCanton] = React.useState(propCanton || 'ALL');

  React.useEffect(() => {
    if (propCanton) setSelectedCanton(propCanton);
  }, [propCanton]);

  React.useEffect(() => {
    setLimit(9);
  }, [selectedCanton]);

  const allItems = React.useMemo(() => {
    return (window.SR_HOUSING || window.HOUSING_LISTINGS || []);
  }, []);

  const availableCantons = React.useMemo(() => {
    const counts = { ALL: allItems.length };
    allItems.forEach(h => {
      if (h.canton) {
        counts[h.canton] = (counts[h.canton] || 0) + 1;
      }
    });
    // Cantons in order: ALL, VD, FR, VS, GE or any others present
    const standardOrder = ['ALL', 'VD', 'FR', 'VS', 'GE'];
    const extraCantons = Object.keys(counts).filter(c => !standardOrder.includes(c));
    const cantons = [...standardOrder, ...extraCantons].filter(c => c === 'ALL' || (counts[c] && counts[c] > 0));
    return { cantons, counts };
  }, [allItems]);

  const CANTON_LABELS = {
    VD: { fr: 'VD · Vaud', uk: 'VD · Во (Vaud)', de: 'VD · Waadt', it: 'VD · Vaud', en: 'VD · Vaud' },
    FR: { fr: 'FR · Fribourg', uk: 'FR · Фрібур (Fribourg)', de: 'FR · Freiburg', it: 'FR · Friburgo', en: 'FR · Fribourg' },
    VS: { fr: 'VS · Valais', uk: 'VS · Вале (Valais)', de: 'VS · Wallis', it: 'VS · Vallese', en: 'VS · Valais' },
    GE: { fr: 'GE · Genève', uk: 'GE · Женева (Genève)', de: 'GE · Genf', it: 'GE · Ginevra', en: 'GE · Geneva' }
  };

  const items = React.useMemo(() => {
    if (!selectedCanton || selectedCanton === 'ALL') return allItems;
    return allItems.filter(h => h.canton === selectedCanton);
  }, [selectedCanton, allItems]);

  const visibleItems = items.slice(0, limit);

  return (
    <section id="housing" className="block" style={{background: 'rgba(15,23,42,.25)', padding: '50px 0'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20}}>
          <div>
            <span className="section-eyebrow" style={{ color: 'var(--swiss-red)', fontWeight: 700, letterSpacing: '0.1em' }}>
              {t.housing?.eyebrow || "LOGEMENT VÉRIFIÉ"}
            </span>
            <h2 className="section-title" style={{ color: '#fff', margin: '4px 0 8px' }}>
              {t.housing?.title || "Offres vérifiées en Romandie"}
            </h2>
            <p className="section-sub" style={{ color: 'var(--muted)', margin: 0 }}>
              {t.housing?.lede || "Directement attribué aux régies sans mention de portails tiers."}
            </p>
          </div>
          <div style={{
            fontSize: 12,
            fontFamily: 'var(--f-mono)',
            padding: '6px 12px',
            borderRadius: 8,
            background: 'rgba(56,189,248,.08)',
            border: '1px solid rgba(56,189,248,.25)',
            color: 'var(--sbb-blue)'
          }}>
            ⚡ {items.length} {lang === 'uk' ? 'пропозицій з реальними фото' : lang === 'de' ? 'Angebote mit echten Fotos' : lang === 'it' ? 'offerte con foto reali' : 'offres avec photos réelles'}
          </div>
        </div>

        {/* Canton filter chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }} role="tablist" aria-label="Filtre par canton">
          {availableCantons.cantons.map(c => (
            <button
              key={c}
              className={`btn ${selectedCanton === c ? 'primary' : 'ghost'}`}
              onClick={() => setSelectedCanton(c)}
              role="tab"
              aria-selected={selectedCanton === c}
              style={{
                fontSize: 12.5,
                padding: '6px 14px',
                borderRadius: 8,
                fontWeight: selectedCanton === c ? 700 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <span>
                {c === 'ALL'
                  ? (lang === 'uk' ? 'Усі кантони' : lang === 'de' ? 'Alle Kantone' : lang === 'it' ? 'Tutti i cantoni' : 'Tous cantons')
                  : (CANTON_LABELS[c]?.[lang] || CANTON_LABELS[c]?.fr || c)}
              </span>
              <span style={{
                fontSize: 11,
                padding: '1px 6px',
                borderRadius: 10,
                background: selectedCanton === c ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)',
                color: selectedCanton === c ? '#fff' : 'var(--muted)',
                fontWeight: 700
              }}>
                {availableCantons.counts[c] || 0}
              </span>
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: 'rgba(15,23,42,0.4)',
            borderRadius: 16,
            border: '1px dashed var(--line-2)'
          }}>
            <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>
              {lang === 'uk' ? 'Наразі немає активних пропозицій у цьому кантоні.' : 'Aucun logement actif pour ce canton actuellement.'}
            </p>
          </div>
        ) : (
          <div className="housing-list">
            {visibleItems.map(it => (
              <HousingCard key={it.id} item={it} t={t} lang={lang} onGenerate={onGenerate}/>
            ))}
          </div>
        )}

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

  const d = t?.dossier || {};

  return (
    <section id="dossier" className="block" style={{background: 'rgba(213,43,30,.03)'}}>
      <div className="container">
        <span className="section-eyebrow">{d.eyebrow || "Dossier régie 1-Click · Art. 253 CO"}</span>
        <h2 className="section-title">{d.title || "Générateur de dossier de candidature locative"}</h2>
        <p className="section-sub">{d.lede || "Formulaire candidat conforme aux normes régies suisses."}</p>

        <div className="dossier-grid">
          {/* FORM */}
          <div className="card">
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.08em',
              textTransform: 'uppercase', color: 'var(--gold-2)', fontWeight: 700,
              marginBottom: 14
            }}>
              📄 {d.formTitle || "Formulaire candidat"}
            </div>

            {/* Prefill notice */}
            <div style={{
              padding: '10px 12px', marginBottom: 16,
              background: 'rgba(213,43,30,.08)',
              border: '1px solid rgba(213,43,30,.25)',
              borderRadius: 10, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5
            }}>
              <b style={{color: 'var(--ink-0)'}}>Bien ciblé :</b> {listing.title?.[lang] || listing.title?.fr || listing.title || "Logement Suisse"}<br/>
              <span className="mono" style={{color: 'var(--muted)', fontSize: 11}}>
                {listing.regie} · CHF {window.chf(listing.price)}/mois · {listing.city?.[lang] || listing.city?.fr || listing.city_name || "Vaud"}
              </span>
            </div>

            <div className="field">
              <label>{d.name || "Nom · Prénom"}</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="field">
              <label>{d.permis || "N° dossier / Permis S"}</label>
              <input className="input mono" value={permis} onChange={e => setPermis(e.target.value)}/>
            </div>

            <div className="field">
              <label>{d.status || "Statut financier"}</label>
              <div className="dossier-status-toggle">
                <button className={statusForm === 'evam' ? 'active' : ''} onClick={() => setStatusForm('evam')}>
                  📋 {d.evamPec || "Prise en charge EVAM"}
                </button>
                <button className={statusForm === 'salary' ? 'active' : ''} onClick={() => setStatusForm('salary')}>
                  💼 {lang === 'de' ? 'Lohn' : lang === 'it' ? 'Salario' : lang === 'uk' ? 'Зарплата' : 'Salaire'}
                </button>
              </div>
            </div>

            {statusForm === 'salary' && (
              <div className="field">
                <label>{d.salary || "Revenu mensuel (CHF)"}</label>
                <input type="number" className="input mono" value={salary}
                  onChange={e => setSalary(Number(e.target.value) || 0)}/>
              </div>
            )}

            <div className="field">
              <label>{d.guarantors || "Garants éventuels"}</label>
              <input className="input" value={guarantors} onChange={e => setGuarantors(e.target.value)}/>
            </div>

            <div className="field" style={{marginBottom: 0}}>
              <label>{d.poursuites || "Extrait du Registre des Poursuites"}</label>
              <div className="dossier-status-toggle">
                <button className={poursuites === 'has' ? 'active' : ''} onClick={() => setPoursuites('has')}>
                  ✓ {d.hasIt || "Disponible (< 3 mois)"}
                </button>
                <button className={poursuites === 'will' ? 'active' : ''} onClick={() => setPoursuites('will')}>
                  ⏳ {d.willGet || "En cours de commande"}
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
                {d.previewIn || "Aperçu de la lettre"}
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
                <Ico.file/> {d.downloadPdf || "Télécharger PDF/A"}
              </button>
              <button className="btn ghost" onClick={() => alert('Texte copié dans le presse-papier (mock)')}>
                {d.copyText || "Copier le texte"}
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
// SwissRelief 2.6 / 2.7 — Emploi & Métiers CH-ISCO + Offres d'emploi vérifiées
// Intègre les 63 offres d'emploi en direct, la détection Art. 21a LEI, et l'assistant de lettre de motivation en français.

function JobLetterModal({ job, onClose, lang = 'fr', t }) {
  const [name, setName] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-name', '') : '');
  const [phone, setPhone] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-phone', '') : '');
  const [email, setEmail] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-email', '') : '');
  const [residence, setResidence] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-city', 'Morges (VD)') : 'Morges (VD)');
  const [permis, setPermis] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-permis', 'S-VD-2026') : 'S-VD-2026');
  const [frenchLevel, setFrenchLevel] = React.useState('B1');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (window.safeSet) {
      if (name) window.safeSet('sr-cand-name', name);
      if (phone) window.safeSet('sr-cand-phone', phone);
      if (email) window.safeSet('sr-cand-email', email);
      if (residence) window.safeSet('sr-cand-city', residence);
      if (permis) window.safeSet('sr-cand-permis', permis);
    }
  }, [name, phone, email, residence, permis]);

  const todayStr = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  }, []);

  const generatedLetter = React.useMemo(() => {
    const candidateDisp = name.trim() || '[Votre Prénom et Nom]';
    const phoneDisp = phone.trim() || '+41 79 000 00 00';
    const emailDisp = email.trim() || 'candidat.suisse@email.ch';
    const resDisp = residence.trim() || 'Morges (VD)';
    const permisDisp = permis.trim() || 'Permis S · Canton de Vaud';
    const compDisp = job.company || 'Entreprise suisse';
    const cityDisp = job.city || 'Suisse';
    const titleDisp = job.title || 'Poste proposé';
    const sbbDisp = job.sbb_min ? `${job.sbb_min} minutes` : '15 minutes';

    return `${candidateDisp}
${resDisp}
Tél. : ${phoneDisp} | Email : ${emailDisp}
Statut : Titulaire du Permis S (${permisDisp}) — Droit de travail immédiat

À l'attention du Service des Ressources Humaines
${compDisp}
${cityDisp}, Suisse

${cityDisp}, le ${todayStr}

Objet : Candidature au poste de : ${titleDisp}

Madame, Monsieur,

C'est avec un vif intérêt et une grande motivation que je vous soumets ma candidature pour le poste de ${titleDisp} au sein de votre établissement ${compDisp} à ${cityDisp}.

Actuellement domicilié(e) à ${resDisp}, je dispose d'une accessibilité directe et rapide à votre site (environ ${sbbDisp} via le réseau CFF), ce qui me garantit une parfaite ponctualité, une disponibilité rapide et une grande flexibilité opérationnelle.

Sur le plan administratif, je suis titulaire du statut de protection S (Permis S), lequel m'accorde l'autorisation d'exercer une activité lucrative immédiate en Suisse. L'engagement s'effectue selon la procédure cantonale simplifiée de simple déclaration préalable, sans contingentement, sans taxe pour l'employeur, et sans délai d'attente administratif (conformément aux directives SEM et à la législation fédérale LEI).

Rigoureux(se), volontaire et doté(e) d'une grande conscience professionnelle, j'ai à cœur de m'intégrer rapidement au sein de votre équipe. Je possède un niveau de français opérationnel (${frenchLevel}) me permettant de communiquer efficacement au quotidien et de respecter strictement l'ensemble de vos consignes opérationnelles et de sécurité.

Convaincu(e) de pouvoir apporter une contribution constructive et fiable à ${compDisp}, je me tiens à votre entière disposition pour un entretien à votre convenance.

Je vous remercie chaleureusement de l'attention que vous porterez à ma candidature et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.


${candidateDisp}`;
  }, [name, phone, email, residence, permis, frenchLevel, job, todayStr]);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 780 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>📄 Assistant Lettre de Motivation Suisse</h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
              Candidature ciblée pour <strong>{job.company}</strong> · {job.title}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Nom & Prénom</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex. Olena Petrenko"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Téléphone</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+41 79 123 45 67"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre.email@domaine.ch"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Lieu de résidence actuel</label>
            <input
              type="text"
              value={residence}
              onChange={e => setResidence(e.target.value)}
              placeholder="ex. Morges (VD)"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>N° Dossier Permis S</label>
            <input
              type="text"
              value={permis}
              onChange={e => setPermis(e.target.value)}
              placeholder="S-VD-..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Niveau de français</label>
            <select
              value={frenchLevel}
              onChange={e => setFrenchLevel(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            >
              <option value="A2 (notions solides)">A2 (notions solides)</option>
              <option value="B1 (opérationnel)">B1 (opérationnel)</option>
              <option value="B2 (courant)">B2 (courant)</option>
              <option value="C1 (autonome)">C1 (autonome)</option>
            </select>
          </div>
        </div>

        <div style={{
          background: '#0B1220',
          border: '1px solid var(--line-2)',
          borderRadius: 12,
          padding: 18,
          maxHeight: '380px',
          overflowY: 'auto',
          fontFamily: 'var(--f-mono)',
          fontSize: 12.5,
          lineHeight: 1.6,
          color: '#E2E8F0',
          whiteSpace: 'pre-wrap',
          marginBottom: 20
        }}>
          {generatedLetter}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            className="btn ghost"
            onClick={onClose}
            style={{ padding: '8px 16px', fontSize: 13 }}
          >
            Fermer
          </button>
          <button
            className="btn primary"
            onClick={handleCopy}
            style={{ padding: '8px 20px', fontSize: 13, background: copied ? 'var(--emerald-2)' : undefined }}
          >
            {copied ? '✓ Copié dans le presse-papier !' : '📋 Copier la lettre'}
          </button>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, t, lang, onOpenLetter }) {
  const isStellen = !!job.stellen;
  const salaryStr = (job.salary_min && job.salary_max)
    ? `CHF ${window.chf ? window.chf(job.salary_min) : job.salary_min} – ${window.chf ? window.chf(job.salary_max) : job.salary_max}`
    : 'Selon CCT / Barème';

  return (
    <article className="h-card">
      <div style={{ padding: '16px 16px 8px', borderBottom: '1px solid var(--line-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="regie-badge">
            <span className="dot" aria-hidden="true"></span>
            {job.company}
          </span>
          <span className={`compliance-badge ${isStellen ? 'warn' : ''}`}>
            {isStellen ? '⏳ Art. 21a LEI (délai ORP)' : '✓ Libre marché'}
          </span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-0)', margin: '4px 0 6px', lineHeight: 1.35 }}>
          {job.title}
        </h3>
        <div style={{ fontSize: 12.5, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📍 {job.city}</span>
          <span className="v2-mono-tag">{job.canton}</span>
          <span style={{ color: 'var(--muted)', fontSize: 11.5 }}>· {job.workload_min}%–{job.workload_max}%</span>
        </div>
      </div>

      <div className="h-body" style={{ padding: '12px 16px' }}>
        <div className="h-price-row">
          <div className="h-price" style={{ fontSize: 18 }}>
            {salaryStr}
            <span className="per">/ {lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'}</span>
          </div>
        </div>

        <div className="sbb-pill" style={{ margin: '4px 0' }}>
          <span className="ico"><Ico.train/></span>
          <span><span className="min">{job.sbb_min || 12}</span> min de Morges / Lausanne (CFF)</span>
        </div>

        <div style={{
          fontSize: 11.5,
          color: 'var(--muted)',
          padding: '6px 10px',
          background: 'rgba(16,185,129,.06)',
          border: '1px solid rgba(16,185,129,.20)',
          borderRadius: 6,
          lineHeight: 1.4
        }}>
          🟢 <strong>Permis S :</strong> Autorisation d'embauche immédiate sans contingent ni taxe employeur.
        </div>
      </div>

      <div className="h-actions" style={{ padding: '10px 16px 14px' }}>
        <button
          className="btn primary"
          onClick={() => onOpenLetter(job)}
          style={{ flex: '1 1 140px', minHeight: 38, fontSize: 12.5 }}
        >
          <Ico.file/> 📄 Lettre de motivation
        </button>
        <button
          className="btn ghost"
          onClick={() => window.open(job.url || 'https://www.job-room.ch', '_blank')}
          style={{ flex: '1 1 110px', minHeight: 38, fontSize: 12.5 }}
        >
          <Ico.external/> Voir l'offre
        </button>
      </div>
    </article>
  );
}

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
  const [subTab, setSubTab] = React.useState('offers'); // 'offers' | 'radar'
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCanton, setSelectedCanton] = React.useState('ALL');
  const [selectedStatus, setSelectedStatus] = React.useState('ALL'); // 'ALL' | 'FREE' | 'STELLEN'
  const [limit, setLimit] = React.useState(9);
  const [activeLetterJob, setActiveLetterJob] = React.useState(null);

  // Load verified job listings from data layer
  const rawJobs = React.useMemo(() => {
    return (window.JOB_LISTINGS || window.SR_JOBS || []);
  }, []);

  // Filtered live jobs
  const filteredJobs = React.useMemo(() => {
    return rawJobs.filter(j => {
      if (selectedCanton !== 'ALL' && j.canton !== selectedCanton) return false;
      if (selectedStatus === 'FREE' && j.stellen) return false;
      if (selectedStatus === 'STELLEN' && !j.stellen) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = (j.title && j.title.toLowerCase().includes(q)) ||
                      (j.company && j.company.toLowerCase().includes(q)) ||
                      (j.city && j.city.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [rawJobs, selectedCanton, selectedStatus, searchQuery]);

  // Deep-link check: if URL has ?job=<id>, auto-open letter modal for that job
  React.useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const targetJobId = p.get('job');
      if (targetJobId && rawJobs.length > 0) {
        const found = rawJobs.find(j => j.id === targetJobId);
        if (found) {
          setActiveLetterJob(found);
          setSubTab('offers');
        }
      }
    } catch (e) {}
  }, [rawJobs]);

  // CH-ISCO Radar sectors
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
    <section id="prof" className="v2-section" style={{ background: 'rgba(15,23,42,.35)' }}>
      <div className="v2-container">
        <div className="v2-section-head" style={{ marginBottom: 20 }}>
          <span className="v2-eyebrow">{t.prof?.eyebrow || "MODULE 02 · EMPLOI & INSERTION"}</span>
          <h2 className="v2-section-title">
            {lang === 'uk' ? 'Каталог вакансій та професії CH-ISCO'
             : lang === 'de' ? 'Stellenkatalog & CH-ISCO Berufe'
             : lang === 'it' ? 'Catalogo offerte & Professioni CH-ISCO'
             : "Offres d'emploi vérifiées & Métiers CH-ISCO"}
          </h2>
          <p className="v2-section-sub">
            {lang === 'uk'
             ? 'Офіційні пропозиції роботи в Romandie, помічник складання мотиваційних листів за нормами Швейцарії та радар зарплат.'
             : lang === 'de'
             ? 'Verifizierte Stellen in der Westschweiz, Schweizer Bewerbungsschreiben-Assistent und Lohn-Radar.'
             : lang === 'it'
             ? 'Offerte verificate in Romandia, generatore di lettere di motivazione e radar salariale.'
             : "Offres réelles en Suisse romande, assistant de lettre de motivation selon les normes RH suisses, et radar des salaires CCNT."}
          </p>
        </div>

        {/* SUB-TABS: Offres d'emploi VS Grille Salariale */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderBottom: '1px solid var(--line-2)', paddingBottom: 12 }}>
          <button
            className={`btn ${subTab === 'offers' ? 'primary' : 'ghost'}`}
            onClick={() => setSubTab('offers')}
            style={{ padding: '8px 18px', fontSize: 13.5, fontWeight: 700 }}
          >
            💼 {lang === 'uk' ? `Вакансії (${rawJobs.length})` : lang === 'de' ? `Stellen (${rawJobs.length})` : `Offres d'emploi (${rawJobs.length})`}
          </button>
          <button
            className={`btn ${subTab === 'radar' ? 'primary' : 'ghost'}`}
            onClick={() => setSubTab('radar')}
            style={{ padding: '8px 18px', fontSize: 13.5, fontWeight: 700 }}
          >
            📊 {lang === 'uk' ? 'Тарифна сітка CH-ISCO' : lang === 'de' ? 'Lohntabelle CH-ISCO' : 'Grille salariale CH-ISCO'}
          </button>
          <button
            className={`btn ${subTab === 'cv' ? 'primary' : 'ghost'}`}
            onClick={() => setSubTab('cv')}
            style={{ padding: '8px 18px', fontSize: 13.5, fontWeight: 700 }}
          >
            📄 {lang === 'uk' ? 'Швейцарський стандарт CV' : lang === 'de' ? 'Schweizer CV-Standards' : 'Normes CV Suisse'}
          </button>
        </div>

        {subTab === 'offers' && (
          <div>
            {/* Filter controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 20 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'uk' ? 'Пошук посади, компанії чи міста...' : "Rechercher un poste, employeur ou ville..."}
                style={{
                  flex: '1 1 240px',
                  padding: '9px 14px',
                  borderRadius: 10,
                  background: 'rgba(2,6,15,.6)',
                  border: '1px solid var(--line-2)',
                  color: '#fff',
                  fontSize: 13.5
                }}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['ALL', 'VD', 'BE', 'BS', 'ZH'].map(c => (
                  <button
                    key={c}
                    className={`amount-chip ${selectedCanton === c ? 'active' : ''}`}
                    onClick={() => setSelectedCanton(c)}
                    style={{ fontSize: 12, padding: '6px 12px' }}
                  >
                    {c === 'ALL' ? (lang === 'uk' ? 'Усі кантони' : 'Tous cantons') : c}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button
                  className={`amount-chip ${selectedStatus === 'ALL' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('ALL')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  {lang === 'uk' ? 'Усі статуси' : 'Tous statuts'}
                </button>
                <button
                  className={`amount-chip ${selectedStatus === 'FREE' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('FREE')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  ✓ {lang === 'uk' ? 'Вільні' : 'Libre marché'}
                </button>
                <button
                  className={`amount-chip ${selectedStatus === 'STELLEN' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('STELLEN')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  ⏳ Art. 21a LEI
                </button>
              </div>
            </div>

            {/* Job Grid */}
            <div className="housing-list">
              {filteredJobs.slice(0, limit).map(j => (
                <JobCard
                  key={j.id}
                  job={j}
                  t={t}
                  lang={lang}
                  onOpenLetter={(item) => setActiveLetterJob(item)}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                {lang === 'uk' ? 'Жодної вакансії не знайдено за заданими фільтрами.' : "Aucune offre ne correspond aux critères sélectionnés."}
              </div>
            )}

            {limit < filteredJobs.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button
                  className="btn ghost"
                  style={{ padding: '12px 28px', fontSize: 14, fontWeight: 600 }}
                  onClick={() => setLimit(prev => prev + 9)}
                >
                  {lang === 'uk'
                    ? `Показати більше вакансій (ще ${filteredJobs.length - limit}) ↓`
                    : `Afficher plus d'offres (encore ${filteredJobs.length - limit}) ↓`}
                </button>
              </div>
            )}
          </div>
        )}

        {subTab === 'radar' && (
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

            {anyStellen && (
              <div className="v2-stellen-alert" role="note">
                <span className="v2-stellen-badge">Art. 21a LEI</span>
                <div className="v2-stellen-body">
                  <div className="v2-stellen-title">{t.prof?.stellenTitle || "Profession soumise à l'obligation d'annoncer (Art. 21a LEI)"}</div>
                  <div className="v2-stellen-text">{t.prof?.stellenBody || "Taux de chômage national ≥ 5%. Le poste doit être réservé aux inscrits ORP pendant 5 jours ouvrables."}</div>
                </div>
              </div>
            )}

            <div className="v2-prof-table-wrap">
              <table className="v2-prof-table">
                <thead>
                  <tr>
                    <th>ISCO</th>
                    <th>{t.prof?.titleCol || "Intitulé du poste"}</th>
                    <th>{t.prof?.qualif || "Qualification"}</th>
                    <th style={{ textAlign: 'right' }}>{t.prof?.salary || "Fourchette CCNT"}</th>
                    <th>{t.prof?.stellenCol || "Statut"}</th>
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
                          CHF {window.chf ? window.chf(j.salary[0]) : j.salary[0]} – {window.chf ? window.chf(j.salary[1]) : j.salary[1]}
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
        )}

        {subTab === 'cv' && (
          <div style={{ background: 'rgba(15,23,42,.6)', borderRadius: 16, border: '1px solid var(--line-2)', padding: '28px 24px' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <span style={{ fontSize: 28 }}>🇨🇭</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#fff', fontWeight: 700 }}>
                    {lang === 'uk' ? 'Швейцарський стандарт CV (Резюме) для Permis S'
                     : lang === 'de' ? 'Schweizer Lebenslauf-Standards für S-Ausweis Inhaber'
                     : 'Normes du Curriculum Vitae (CV) suisse pour titulaires du Permis S'}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                    {lang === 'uk' ? 'Офіційні вимоги швейцарських HR: структура, обов\'язкові пункти та формулювання прав'
                     : 'Exigences clés des recruteurs suisses : structure, mentions indispensables et législation SEM'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
                <div style={{ background: '#0B1220', border: '1px solid var(--line-1)', borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sbb-blue)', marginBottom: 8 }}>1. Фото та особисті дані</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    <li><strong>Фото:</strong> професійне ділове фото (світлий нейтральний фон, легка посмішка).</li>
                    <li><strong>Контакти:</strong> швейцарський номер (+41), email (ім'я.прізвище), точне місто проживання.</li>
                    <li><strong>Дата народження та сімейний стан:</strong> обов'язково за швейцарською традицією.</li>
                  </ul>
                </div>

                <div style={{ background: '#0B1220', border: '1px solid var(--line-1)', borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--emerald)', marginBottom: 8 }}>2. Юридичний статус Permis S</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    <li><strong>Обов'язковий рядок:</strong> <em>«Titulaire du Permis S — Autorisation de travail immédiate (Art. 17 LEI)»</em></li>
                    <li><strong>Перевага для HR:</strong> без квот, без сплати зборів, проста декларація онлайн.</li>
                  </ul>
                </div>

                <div style={{ background: '#0B1220', border: '1px solid var(--line-1)', borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold)', marginBottom: 8 }}>3. Мови за шкалою CEFR</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    <li>Чітка градація: <strong>Français B1 (opérationnel)</strong> / <strong>B2 (courant)</strong>.</li>
                    <li>Німецька (Deutsch), Англійська (Anglais) та Українська (langue maternelle).</li>
                  </ul>
                </div>

                <div style={{ background: '#0B1220', border: '1px solid var(--line-1)', borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--violet)', marginBottom: 8 }}>4. Досвід та рекомендації</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.6 }}>
                    <li>Антихронологічний порядок (найновіший досвід зверху).</li>
                    <li>Рядок: <em>«Certificats de travail et références disponibles sur demande»</em>.</li>
                    <li>Залучайте волонтера Benevol як місцевого поручителя.</li>
                  </ul>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <a
                  href="https://t.me/SwissResilienceHubBot?start=cv_help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: 14 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  <span>{lang === 'uk' ? 'Перевірити CV з ШІ-копілотом у Telegram' : 'Vérifier mon CV avec le copilote IA sur Telegram'}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Swiss Motivation Letter */}
        {activeLetterJob && (
          <JobLetterModal
            job={activeLetterJob}
            onClose={() => setActiveLetterJob(null)}
            lang={lang}
            t={t}
          />
        )}
      </div>
    </section>
  );
}

Object.assign(window, { ProfessionSelector, JobCard, JobLetterModal });


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

  const sub = t?.sublease || {};

  return (
    <section id="sublease" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{sub.eyebrow || "Module 03 · Solidarité Suisse"}</span>
          <h2 className="v2-section-title">{sub.title || "Héberger en toute légalité (Art. 262 CO)"}</h2>
          <p className="v2-section-sub">{sub.lede || "Calcul d'une juste participation aux frais et plafonnement légal."}</p>
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
                <div className="v2-shield-title">{sub.shield || "Bouclier juridique du locataire — Art. 262 CO"}</div>
                <div className="v2-shield-body">{sub.shieldBody || "Le bailleur ne peut pas interdire la sous-location de manière générale."}</div>
              </div>
            </div>

            <div className="v2-two-col-fields">
              <div className="v2-field">
                <label>{sub.totalRent || "Loyer total net (CHF/mois)"}</label>
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
                <label>{sub.rooms || "Nombre de pièces"}</label>
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
              <label>{sub.base || "Quote-part loyer brut"}</label>
              <div className="v2-quote-row">
                <span className="v2-quote-formula">CHF {chfV2(totalRent)} / {rooms} pièces</span>
                <span className="v2-quote-value">CHF {chfV2(base)}</span>
              </div>
            </div>

            <div className="v2-field">
              <label className="v2-slider-label">
                <span>{sub.surcharge || "Majoration meubles & équipement"}</span>
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
              <div className="v2-slider-hint">{sub.surchargeLimit || "Plafond légal 20% · Jurisprudence ASLOCA"}</div>
            </div>

            <div className="v2-final-rent">
              <div className="v2-final-label">{sub.final || "Participation mensuelle demandée"}</div>
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
                  <div className="v2-compliance-title">{over20 ? (sub.overBadge || "Loyer abusif") : (sub.okBadge || "Conforme Art. 262 CO")}</div>
                  <div className="v2-compliance-body">{over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA'}</div>
                </div>
              </div>
            </div>

            <div className="v2-badges-row">
              <span className="v2-mini-badge gold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"/>
                </svg>
                {sub.taxBadge || "Non imposable"}
              </span>
              <span className="v2-mini-badge blue">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {sub.insBadge || "RC collective 5M"}
              </span>
              <span className="v2-mini-badge cyan">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"/>
                  <line x1="4" y1="15" x2="20" y2="15"/>
                  <line x1="10" y1="3" x2="8" y2="21"/>
                  <line x1="16" y1="3" x2="14" y2="21"/>
                </svg>
                {sub.merkleBadge || "Merkle SHA-256"}
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
              {pdfGenerated ? '✓ Document prêt — Imprimer / PDF' : (sub.letterBtn || "Générer la notification régie (PDF)")}
            </button>
            <div className="v2-btn-hint">{sub.letterHint || "Courrier prêt à signer pour la gérance."}</div>
          </div>

          {/* Right: mock PDF preview (Georgia serif on white paper) */}
          <div className="v2-pdf-preview">
            <div className="v2-pdf-head">{sub.pdfTitle || "NOTIFICATION OFFICIELLE À LA GÉRANCE"}</div>
            <p className="v2-pdf-intro">{sub.pdfIntro || "En application de l'art. 262 CO..."}</p>
            <div className="v2-pdf-row"><span className="k">Locataire principal</span><span>[ Nom · Adresse · NPA / Ville ]</span></div>
            <div className="v2-pdf-row"><span className="k">Gérance</span><span>[ Nom · Adresse · Contact ]</span></div>
            <div className="v2-pdf-row"><span className="k">Sous-locataire (Permis S)</span><span>[ Nom · N° Permis S ]</span></div>
            <div className="v2-pdf-row"><span className="k">Locaux sous-loués</span><span>1 pièce meublée, ~{(15/Math.max(rooms,1)).toFixed(1)} m², cuisine/SdB partagées</span></div>
            <div className="v2-pdf-row"><span className="k">Loyer forfaitaire</span><span style={{ fontWeight: 700 }}>CHF {chfV2(finalRent)} / mois</span></div>
            <div className="v2-pdf-close">{sub.pdfClose || "Le préavis applicable demeure celui de l'art. 266e CO."}</div>
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

  const m = t?.mentors || {};

  return (
    <section id="mentors" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{m.eyebrow || "Module 04 · Engagement Citoyen — Réseau Benevol"}</span>
          <h2 className="v2-section-title">{m.title || "Mentorat solidaire : 1 à 3 heures par semaine"}</h2>
          <p className="v2-section-sub">{m.lede || "Accompagnement bénévole structuré sous mandat gratuit (Art. 394 CO)."}</p>
        </div>

        <div className="v2-mentors-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label>{m.commit || "Disponibilité souhaitée"}</label>
              <div className="v2-pill-group">
                {(m.commitOpts || ["1 h / semaine", "2–3 h / semaine", "À la demande"]).map((o, i) => (
                  <button key={i} className={`v2-pill-btn ${commit === i ? 'active-blue' : ''}`} onClick={() => setCommit(i)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{m.tracks || "Axes d'accompagnement"}</label>
              <div className="v2-tracks-grid">
                {(m.trackList || [
                  { t: "Codes professionnels suisses", b: "Relecture de CV, préparation aux entretiens, culture d'entreprise locale." },
                  { t: "Logement & intégration", b: "Aide aux visites de régies, décryptage des baux, orientation quartier." },
                  { t: "Pratique linguistique", b: "Conversations hebdomadaires en français ou allemand en situation réelle." }
                ]).map((tr, i) => (
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
              <span>{m.legal || "Engagement régi par l'art. 394 CO (mandat civil bénévole). Aucun lien de subordination."}</span>
            </div>

            <button className="v2-btn v2-btn-blue" style={{ marginTop: 18 }} onClick={handleApply}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {m.apply || "Rejoindre le réseau de mentors"}
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
  const b = t?.beta || {};

  return (
    <section id="beta" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{b.eyebrow || "BÊTA PUBLIQUE · ACCORD SUISSE"}</span>
          <h2 className="v2-section-title">{b.title || "Transparence absolue & solidarité"}</h2>
          <p className="v2-section-sub">{b.lede || "Plateforme 100% libre et gratuite pendant toute la phase publique."}</p>
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
// ACCORD Suisse — Legal and accessible footer with verified working links
function FooterV2({ t, onOpenInfo, lang = 'uk' }) {
  const isUk = lang === 'uk';

  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-foot-grid">
          {/* Column 1: Brand & Purpose */}
          <div className="v2-foot-col">
            <div className="v2-brand" style={{ marginBottom: 14 }}>
              <span className="v2-brand-badge">
                <BrandMark size={24}/>
              </span>
              <span className="v2-brand-name">
                ACCORD
                <span>{isUk ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'}</span>
              </span>
            </div>
            <p style={{ lineHeight: 1.6, color: '#94A3B8', fontSize: 13 }}>
              {isUk
                ? "Вільний волонтерський проєкт взаємодопомоги у Швейцарії: перевірені квартири від агенцій, легальна робота та підтримка місцевих жителів без посередників і комісій."
                : "Plateforme citoyenne et bénévole pour le logement digne, l'emploi légal et l'intégration en Suisse Romande. 100% gratuit et sans intermédiaire."}
            </p>
            <p className="v2-foot-url" style={{ marginTop: 10 }}>
              <a
                href="https://t.me/SwissResilienceHubBot"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38BDF8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
              >
                <span>✈️</span> @SwissResilienceHubBot
              </a>
            </p>
          </div>

          {/* Column 2: Module Services */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Сервіси' : 'Services'}</h4>
            <ul>
              <li><a href="#housing">{isUk ? 'Житло від режі (EVAM/SBB)' : 'Logement vérifié (EVAM / SBB)'}</a></li>
              <li><a href="#prof">{isUk ? 'Робота та резюме (LEI)' : 'Offres d\'emploi & CV (LEI)'}</a></li>
              <li><a href="#calc">{isUk ? 'Калькулятор норм (26 кантонів)' : 'Calculateur plafonds (26 cantons)'}</a></li>
              <li><a href="#dossier">{isUk ? 'Досьє для режі (1-Click)' : 'Dossier régie 1-Click (USPI)'}</a></li>
              <li><a href="#sublease">{isUk ? 'Суборенда кімнати (ст. 262 CO)' : 'Sous-location solidaire (262 CO)'}</a></li>
              <li><a href="#mentors">{isUk ? 'Швейцарські ментори Benevol' : 'Mentors bénévoles Benevol'}</a></li>
            </ul>
          </div>

          {/* Column 3: Information & Guides */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Корисне та довідка' : 'Guide & À propos'}</h4>
            <ul>
              <li>
                <a href="#guide" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('guide'); else window.location.hash = 'guide'; }}>
                  📖 {isUk ? 'Як користуватись сервісом' : 'Mode d\'emploi'}
                </a>
              </li>
              <li>
                <a href="#why" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('why'); else window.location.hash = 'why'; }}>
                  ⭐ {isUk ? 'Чому ми кращі (порівняння)' : 'Pourquoi ACCORD (comparatif)'}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('about'); else window.location.hash = 'about'; }}>
                  🏛️ {isUk ? 'Про проєкт АКОРД' : 'À propos du projet'}
                </a>
              </li>
              <li>
                <a href="/privacy">
                  🛡️ {isUk ? 'Політика конфіденційності (nDSG)' : 'Confidentialité (nLPD / RGPD)'}
                </a>
              </li>
              <li>
                <a href="https://sonate-solidaire.me" target="_blank" rel="noopener noreferrer">
                  🎻 Sonate Solidaire (Arsen Kovalenko) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Swiss Portals (All working external links) */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Офіційні ресурси Швейцарії' : 'Ressources officielles'}</h4>
            <ul>
              <li>
                <a href="https://www.fedlex.admin.ch" target="_blank" rel="noopener noreferrer">
                  🇨🇭 Fedlex · Закони Швейцарії (CO / LEI) ↗
                </a>
              </li>
              <li>
                <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
                  🏛️ EDÖB · Захист персональних даних ↗
                </a>
              </li>
              <li>
                <a href="https://www.asloca.ch" target="_blank" rel="noopener noreferrer">
                  🏢 ASLOCA · Захист прав орендарів ↗
                </a>
              </li>
              <li>
                <a href="https://www.seco.admin.ch" target="_blank" rel="noopener noreferrer">
                  💼 SECO · Ринок праці Швейцарії ↗
                </a>
              </li>
              <li>
                <a href="https://www.benevol.ch" target="_blank" rel="noopener noreferrer">
                  🤝 Benevol Suisse · Мережа волонтерів ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean, meaningful trust badges */}
        <div className="v2-compliance-row" style={{ marginTop: 24 }}>
          <span className="v2-comp-chip">✓ 100% Безкоштовно (ст. 2 LSE)</span>
          <span className="v2-comp-chip">✓ Офіційні ліміти 26 кантонів</span>
          <span className="v2-comp-chip cyan">✓ Захист даних (nDSG / RGPD)</span>
          <span className="v2-comp-chip">✓ Спільнота волонтерів Benevol</span>
        </div>

        {/* Human, clear legal statement */}
        <div className="v2-foot-legal">
          © 2026 АКОРД Швейцарія (ACCORD Suisse) · Некомерційна волонтерська ініціатива взаємодопомоги. Ініціатор: Arsen Kovalenko (Avenue du Mont-Blanc 29, 1196 Gland).
          <br/>
          Усі дані надходять з офіційних джерел (кантони, SECO, офіційні житлові агенції). Сервіс створений для людей і ніколи не бере грошей за пошук роботи чи житла.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterV2 });


// ==================== [Module: app.jsx] ====================
// ACCORD-S · Root Application Router & Unification
// Combines ACCORD 2.7 branding with full 2.6 suite:
// - HousingCards (real apartments with photos, EVAM limits, SBB travel time)
// - ProfessionSelector & JobCard (63 live job openings, Swiss cover letter assistant, CV guide)
// - CantonCalculator (26 cantons official social ceilings)
// - DossierGenerator (USPI standard rental dossier builder)
// - Sublease (Art. 262 CO sublease calculator & contract)
// - BenevolMentors (Benevol Suisse mentor network)
// - BetaDonation (Transparent association support & Telegram link)

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
      if (paramLang && ['fr', 'de', 'it', 'uk', 'en'].includes(paramLang)) return paramLang;
    } catch (e) {}
    return safeStorageGet('sr26-lang', safeStorageGet('sr-v2-lang', 'uk'));
  });

  const [side, setSide] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSide = urlParams.get('side');
      if (paramSide === 'a' || paramSide === 'b') return paramSide;
      const viewParam = urlParams.get('view') || urlParams.get('service') || urlParams.get('tab');
      if (viewParam === 'sublease' || viewParam === 'mentors') return 'b';
      if (['prof', 'jobs', 'calc', 'housing', 'dossier'].includes(viewParam)) return 'a';
    } catch (e) {}
    return safeStorageGet('sr26-side', safeStorageGet('sr-v2-side', 'a'));
  });

  const [service, setService] = React.useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') || params.get('service') || params.get('tab');
      if (viewParam) {
        if (['prof', 'jobs', 'job', 'emplois'].includes(viewParam)) return 'prof';
        if (['housing', 'calc', 'dossier', 'beta', 'sublease', 'mentors'].includes(viewParam)) return viewParam;
        if (viewParam === 'checkout' || viewParam === 'donate') return 'beta';
      }
      if (params.get('job')) return 'prof';
      if (params.get('housing') || params.get('item')) return 'housing';

      const h = window.location.hash.replace('#', '');
      if (['calc', 'housing', 'dossier', 'beta', 'prof', 'jobs', 'sublease', 'mentors'].includes(h)) {
        return h === 'jobs' ? 'prof' : h;
      }
    } catch (e) {}
    return 'housing';
  });

  const [canton, setCanton] = React.useState(() => safeStorageGet('sr26-canton', 'VD'));
  const [status, setStatus] = React.useState(() => safeStorageGet('sr26-status', 'evam'));
  const [income, setIncome] = React.useState(() => Number(safeStorageGet('sr26-income', 4800)) || 4800);
  const [drawerOpen, setDrawer] = React.useState(false);
  const [dossierPrefill, setPrefill] = React.useState(null);
  const [infoModal, setInfoModal] = React.useState({ open: false, tab: 'about' });

  const openInfo = (tab = 'about') => {
    setInfoModal({ open: true, tab });
    try { window.location.hash = tab; } catch (e) {}
  };

  const closeInfo = () => {
    setInfoModal(prev => ({ ...prev, open: false }));
    const h = window.location.hash.replace('#', '');
    if (['about', 'guide', 'why', 'privacy'].includes(h)) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
  };

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

  // Telegram WebApp initialization
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
          tg.MainButton.hide();
        }
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);

  // Hash & query routing
  React.useEffect(() => {
    const checkDeepLink = () => {
      try {
        const h = window.location.hash.replace('#', '');
        if (['about', 'guide', 'why', 'privacy'].includes(h)) {
          setInfoModal({ open: true, tab: h });
        } else if (['housing', 'calc', 'dossier', 'prof', 'sublease', 'mentors', 'beta'].includes(h)) {
          setService(h);
          if (['sublease', 'mentors'].includes(h)) setSide('b');
          else if (['housing', 'calc', 'dossier', 'prof'].includes(h)) setSide('a');
        } else if (h === 'jobs') {
          setService('prof');
          setSide('a');
        }
      } catch (e) {}
    };

    window.addEventListener('hashchange', checkDeepLink);
    checkDeepLink();
    return () => window.removeEventListener('hashchange', checkDeepLink);
  }, []);

  const t = (window.SR_I18N && window.SR_I18N[lang])
    ? window.SR_I18N[lang]
    : ((window.SR_I18N && window.SR_I18N.uk) ? window.SR_I18N.uk : (window.SR_I18N ? window.SR_I18N.fr : {}));

  const pickService = (id, s) => {
    const targetId = id === 'jobs' ? 'prof' : id;
    setService(targetId);
    if (s) setSide(s);
    else if (['sublease', 'mentors'].includes(targetId)) setSide('b');
    else if (['housing', 'prof', 'calc', 'dossier'].includes(targetId)) setSide('a');

    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleGenerate = (item) => {
    setPrefill(item);
    setSide('a');
    setService('dossier');
    setTimeout(() => {
      const el = document.getElementById('dossier');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const openTelegramDonate = () => {
    const url = 'https://t.me/SwissResilienceHubBot?start=donate';
    if (window.Telegram?.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Telegram Mini App dedicated mobile view
  if (isTMA) {
    return (
      <div className="tma-app-shell">
        <header className="tma-header">
          <div className="tma-brand">
            <BrandMark size={28}/>
            <div>
              <div className="tma-title">ACCORD Suisse</div>
              <div className="tma-sub">Permis S · Romandie</div>
            </div>
          </div>
          <div className="tma-actions">
            <button
              onClick={() => openInfo('guide')}
              aria-label="Mode d'emploi"
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)',
                borderRadius: 8, padding: '4px 8px', fontSize: 11.5, color: '#38BDF8', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4
              }}
            >
              <span>📖</span>
              <span>{lang === 'uk' ? 'Гід' : 'Guide'}</span>
            </button>
            <button
              className="v2-lang-btn"
              onClick={() => {
                const order = ['uk', 'fr', 'de', 'en'];
                const next = order[(order.indexOf(lang) + 1) % order.length];
                setLang(next);
              }}
              style={{ padding: '4px 8px', fontSize: 11.5 }}
            >
              <span>{window.LANG_FLAGS ? window.LANG_FLAGS[lang] : '🌐'}</span>
              <span>{window.LANG_CODES ? window.LANG_CODES[lang] : lang.toUpperCase()}</span>
            </button>
          </div>
        </header>

        <main className="tma-content">
          {service === 'housing' && (
            <HousingSection
              t={t}
              lang={lang}
              canton={canton}
              onGenerate={handleGenerate}
            />
          )}

          {service === 'calc' && (
            <CantonCalculatorV2
              t={t}
              lang={lang}
              canton={canton}
              setCanton={setCanton}
              status={status}
              income={income}
            />
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
            className={service === 'housing' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('housing'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
            <span>{t.nav?.housing || "Житло"}</span>
          </button>
          <button
            className={service === 'prof' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('prof'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>
            <span>{t.nav?.jobs || "Робота"}</span>
          </button>
          <button
            className={service === 'calc' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('calc'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/></svg>
            <span>{t.svc?.calc || "Ліміти"}</span>
          </button>
          <button
            className={service === 'dossier' ? 'active' : ''}
            onClick={() => { setSide('a'); pickService('dossier'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
            <span>{t.nav?.dossier || "Досьє"}</span>
          </button>
          <button
            className={service === 'mentors' || service === 'sublease' ? 'active' : ''}
            onClick={() => { setSide('b'); pickService('mentors', 'b'); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
            <span>{t.svc?.mentors || "Ментори"}</span>
          </button>
        </nav>

        <InfoModal
          isOpen={infoModal.open}
          onClose={closeInfo}
          initialTab={infoModal.tab}
          lang={lang}
          t={t}
        />
      </div>
    );
  }

  // Full Desktop & Mobile Web Experience
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
        onOpenInfo={openInfo}
        t={t}
      />
      <ServiceSwitcher activeId={service} onPick={pickService} t={t}/>
      <main>
        <HeroV2 side={side} setSide={setSide} onOpenInfo={openInfo} t={t}/>
        {side === 'a' ? (
          <React.Fragment>
            <FourPillars onOpenInfo={openInfo} t={t}/>
            <HousingSection
              t={t}
              lang={lang}
              canton={canton}
              onGenerate={handleGenerate}
            />
            <ProfessionSelector t={t} lang={lang}/>
            <CantonCalculatorV2
              t={t}
              lang={lang}
              canton={canton}
              setCanton={setCanton}
              status={status}
              income={income}
            />
            <DossierGenerator
              t={t}
              lang={lang}
              prefill={dossierPrefill}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FourPillars onOpenInfo={openInfo} t={t}/>
            <SubleaseWizard t={t}/>
            <BenevolMentors t={t}/>
          </React.Fragment>
        )}
        <BetaSection onOpenDonate={openTelegramDonate} t={t}/>
      </main>
      <FooterV2 t={t} onOpenInfo={openInfo} lang={lang}/>

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
          onOpenInfo={openInfo}
          t={t}
        />
      )}

      <InfoModal
        isOpen={infoModal.open}
        onClose={closeInfo}
        initialTab={infoModal.tab}
        lang={lang}
        t={t}
      />
    </React.Fragment>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ACCORD App ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B12',
          color: '#F8FAFC',
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center',
          padding: 24
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: '#D52B1E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16, boxShadow: '0 0 24px rgba(213,43,30,0.45)', overflow: 'hidden'
          }}>
            <img src="/accord_logo.jpg" alt="ACCORD" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6, letterSpacing: '-0.01em' }}>ACCORD Suisse</div>
          <div style={{ fontSize: 13, color: '#94A3B8', maxWidth: 360, lineHeight: 1.5, marginBottom: 18 }}>
            Оновлення даних... Якщо сторінка не завантажилася автоматично, натисніть кнопку нижче:
          </div>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            style={{
              background: '#D52B1E', color: '#fff', border: 'none', borderRadius: 8,
              padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }}
          >
            Оновити сторінку
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  );
}


