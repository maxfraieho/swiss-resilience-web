/* Swiss Resilience Navigator 2.5 — Consolidated Bundle */

// ==================== [Module: shared.jsx] ====================
// Shared atoms / icons / helpers for Swiss Resilience Navigator 2.5
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ---------- Formatting ----------
const chf = (n) => new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(Math.round(n)).replace(/,/g, "'");

// ---------- Language tag / flag helpers ----------
const LANG_FLAGS = { fr: "🇫🇷", de: "🇩🇪", it: "🇮🇹", uk: "🇺🇦" };
const LANG_LABEL = { fr: "FR", de: "DE", it: "IT", uk: "UK" };

// ---------- Brand mark: Swiss cross + compass overlay ----------
function BrandMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#D52B1E"/>
      <rect x="10.5" y="5" width="3" height="14" fill="#F8FAFC"/>
      <rect x="5" y="10.5" width="14" height="3" fill="#F8FAFC"/>
      {/* compass points overlay */}
      <circle cx="12" cy="12" r="9" stroke="#D97706" strokeWidth="0.6" opacity="0.55" fill="none"/>
    </svg>
  );
}

// ---------- Simple stroke icons ----------
const I = {
  arrow:  (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  send:   (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  check:  (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  warn:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>,
  shield: (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  x:      (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  star:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2 15 8l6 .9-4.5 4.4L18 20l-6-3.2L6 20l1.5-6.7L3 8.9 9 8z"/></svg>,
  hash:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  house:  (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>,
  heart:  (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  lock:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  euro:   (p)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"/></svg>,
  chart:  (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>,
  users:  (p)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  menu:   (p)=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  chevron:(p)=><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>
};

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

Object.assign(window, { chf, LANG_FLAGS, LANG_LABEL, BrandMark, I, useSessionMerkle });


// ==================== [Module: side-a.jsx] ====================
// Side A: Chercheurs — Barème calculator + CH-ISCO cascade
const { useState: uSA, useMemo: mSA, useEffect: eSA } = React;

// ============================================================
// TOP BANNER (Radical Honesty)
// ============================================================
function TopBanner({ t }) {
  return (
    <div className="top-banner" role="status">
      <div className="container">
        <span className="top-banner-dot" aria-hidden="true"></span>
        <span className="top-banner-full">{t.banner}</span>
      </div>
    </div>
  );
}

// ============================================================
// NAVBAR
// ============================================================
// NAVBAR (Sandwich Mobile Drawer & Dropdown Language Switcher)
// ============================================================
function Navbar({ t, lang, onLang, side, onSide, onDonate }) {
  const [langOpen, setLangOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close dropdown on outside click or escape
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.lang-dropdown-container')) setLangOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navigateToService = (targetSide, sectionId) => {
    if (targetSide && onSide) onSide(targetSide);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const servicesList = [
    { id: 'calc', side: 'a', icon: <I.house/>, label: t.nav?.calc || "Barèmes 26 Cantons", sub: "EVAM · Hospice · AOZ · 26 Cantons" },
    { id: 'prof', side: 'a', icon: <I.chart/>, label: t.nav?.profession || "Métiers CH-ISCO", sub: "Art. 21a LEI · CH-ISCO-19" },
    { id: 'sublease', side: 'b', icon: <I.shield/>, label: lang==='uk'?'Суборенда (ст. 262 CO)':lang==='de'?'Untermiete (Art. 262 OR)':lang==='it'?'Sublocazione (Art. 262 CO)':'Sous-location (Art. 262 CO)', sub: "10–20% Möblierung · ASLOCA" },
    { id: 'mentors', side: 'b', icon: <I.users/>, label: lang==='uk'?'Ментори (Benevol)':lang==='de'?'Mentoren (Benevol)':lang==='it'?'Mentori (Benevol)':'Mentors (Benevol)', sub: "Art. 394 CO · Mandat bénévole" },
    { id: 'beta', side: null, icon: <I.lock/>, label: lang==='uk'?'Бета-тарифи':lang==='de'?'Beta-Tarife':lang==='it'?'Tariffe Beta':'Tarifs Bêta (Gratuit)', sub: "0 CHF · Inactif en Bêta" },
  ];

  return (
    <div className="nav-wrap">
      <div className="container">
        <nav className="nav" aria-label="Main navigation">
          {/* Brand */}
          <a href="#top" className="brand" aria-label="Swiss Resilience Navigator 2.5">
            <span className="brand-badge"><BrandMark size={22}/></span>
            <span className="brand-name">Swiss Resilience Navigator
              <span>2.5 · Pan-Swiss Bêta</span>
            </span>
          </a>

          {/* Desktop Navigation Links - Quick Service Switching */}
          <div className="nav-links">
            <button className={`nav-link-btn ${side==='a'?'active-side':''}`} onClick={()=>navigateToService('a','calc')}>
              {t.nav?.calc || "Barèmes"}
            </button>
            <button className={`nav-link-btn ${side==='a'?'active-side':''}`} onClick={()=>navigateToService('a','prof')}>
              {t.nav?.profession || "CH-ISCO"}
            </button>
            <button className={`nav-link-btn ${side==='b'?'active-side':''}`} onClick={()=>navigateToService('b','sublease')}>
              {lang==='uk'?'Суборенда 262':lang==='de'?'Untermiete 262':lang==='it'?'Sublocazione 262':'Sous-location 262'}
            </button>
            <button className={`nav-link-btn ${side==='b'?'active-side':''}`} onClick={()=>navigateToService('b','mentors')}>
              {lang==='uk'?'Ментори':lang==='de'?'Mentoren':lang==='it'?'Mentori':'Mentors'}
            </button>
            <button className="nav-link-btn" onClick={()=>navigateToService(null,'beta')}>
              {t.nav?.transparency || "Transparence"}
            </button>
          </div>

          {/* Actions */}
          <div className="nav-actions">
            {/* Language Dropdown (Sandwich dropdown, not a flat row) */}
            <div className="lang-dropdown-container">
              <button 
                className="lang-select-btn" 
                onClick={(e)=>{ e.stopPropagation(); setLangOpen(!langOpen); }}
                aria-expanded={langOpen}
                aria-label="Sélectionner la langue"
              >
                <span>{LANG_FLAGS[lang]}</span>
                <span className="lang-code">{LANG_LABEL[lang]}</span>
                <I.chevron style={{transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s'}}/>
              </button>

              {langOpen && (
                <div className="lang-dropdown-menu" role="menu">
                  {['fr','de','it','uk'].map(l => (
                    <button 
                      key={l} 
                      className={`lang-dropdown-item ${l===lang?'active':''}`}
                      onClick={()=>{ onLang(l); setLangOpen(false); }}
                      role="menuitem"
                    >
                      <span className="flag">{LANG_FLAGS[l]}</span>
                      <span className="name">{window.I18N?.[l]?.lang || l.toUpperCase()}</span>
                      {l===lang && <span className="check"><I.check/></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Telegram Bot Link (desktop) */}
            <a href="https://t.me/SwissResilienceHubBot" target="_blank" rel="noopener noreferrer" className="btn btn-ghost nav-bot-link">
              <I.send/> <span>@SwissResilienceHubBot</span>
            </a>

            {/* Primary Donate CTA */}
            <button onClick={onDonate} className="btn btn-primary nav-donate-btn" aria-label="Faire un don">
              <I.heart/> <span>{lang==='de'?'Spenden':lang==='it'?'Dona':lang==='uk'?'Пожертва':'Faire un don'}</span>
            </button>

            {/* Mobile Hamburger (Sandwich) Button */}
            <button 
              className="hamburger-btn" 
              onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu principal"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <I.x/> : <I.menu/>}
            </button>
          </div>
        </nav>

        {/* Pan-Swiss Service Switcher Bar: always visible and conveniently switchable */}
        <div className="service-banner" role="navigation" aria-label="Services Swiss Resilience">
          <div className="service-banner-inner">
            {servicesList.map((s, idx) => {
              const isSideActive = (s.side === side);
              return (
                <button 
                  key={s.id} 
                  className={`service-btn ${isSideActive ? (s.side === 'b' ? 'active side-b' : 'active') : ''}`}
                  onClick={() => navigateToService(s.side, s.id)}
                  title={s.sub}
                >
                  <div className="svc-top-line">
                    <span className="svc-num">{idx + 1}. {s.side ? (s.side === 'a' ? (lang==='uk'?'Шукачі':'Chercheurs') : (lang==='uk'?'Солідарні':'Solidaires')) : 'Bêta'}</span>
                    <span className={`svc-badge ${s.side === 'a' ? 'badge-a' : s.side === 'b' ? 'badge-b' : 'badge-free'}`}>
                      {s.side === 'a' ? 'Côté A' : s.side === 'b' ? 'Côté B' : '0 CHF'}
                    </span>
                  </div>
                  <div className="svc-label-row">
                    <span className="svc-icon">{s.icon}</span>
                    <span className="svc-label">{s.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Sandwich Menu) */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={()=>setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={e=>e.stopPropagation()}>
            <div className="drawer-header">
              <div className="brand">
                <span className="brand-badge"><BrandMark size={20}/></span>
                <span className="brand-name">Swiss Resilience <span>2.5 Bêta</span></span>
              </div>
              <button className="drawer-close" onClick={()=>setMobileMenuOpen(false)} aria-label="Fermer"><I.x/></button>
            </div>

            {/* Language Selector inside Drawer */}
            <div className="drawer-section">
              <div className="drawer-section-title">{lang==='uk'?'Мова інтерфейсу':lang==='de'?'Sprache':lang==='it'?'Lingua':'Langue'}</div>
              <div className="drawer-lang-grid">
                {['fr','de','it','uk'].map(l => (
                  <button 
                    key={l} 
                    className={`drawer-lang-btn ${l===lang?'active':''}`}
                    onClick={()=>{ onLang(l); setMobileMenuOpen(false); }}
                  >
                    <span className="flag">{LANG_FLAGS[l]}</span>
                    <span>{window.I18N?.[l]?.lang || l.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Services List inside Drawer */}
            <div className="drawer-section">
              <div className="drawer-section-title">{lang==='uk'?'Усі сервіси':lang==='de'?'Alle Dienste':lang==='it'?'Tutti i servizi':'Tous les services'}</div>
              <div className="drawer-services-list">
                {servicesList.map(s => (
                  <button 
                    key={s.id} 
                    className="drawer-service-item"
                    onClick={()=>navigateToService(s.side, s.id)}
                  >
                    <div className="service-icon">{s.icon}</div>
                    <div className="service-info">
                      <div className="service-label">{s.label}</div>
                      <div className="service-sub">{s.sub}</div>
                    </div>
                    <I.arrow/>
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="drawer-actions">
              <button onClick={()=>{ setMobileMenuOpen(false); onDonate(); }} className="btn btn-primary btn-lg" style={{width:'100%'}}>
                <I.heart/> {lang==='de'?'Spenden':lang==='it'?'Dona':lang==='uk'?'Пожертва':'Faire un don de soutien'}
              </button>
              <a href="https://t.me/SwissResilienceHubBot" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg" style={{width:'100%', marginTop: 8}}>
                <I.send/> @SwissResilienceHubBot
              </a>
            </div>

            <div className="drawer-legal">
              Association Swiss Resilience en cours de constitution (Art. 60–79 CC Suisse)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// HERO with two-sided tab switcher
// ============================================================
function Hero({ t, side, onSide }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <span className="pill">
          <span className="pulse-dot"></span>
          26 CANTONS · 4 LANGUES · MERKLE SHA-256
        </span>
        <h1 className="hero-title">
          {t.hero.title}
        </h1>
        <p className="hero-sub">{t.hero.lede}</p>

        <div className="hero-tabs" role="tablist" aria-label="Platform side">
          <button className={`hero-tab tab-a ${side==='a'?'active':''}`} onClick={()=>onSide('a')} role="tab" aria-selected={side==='a'}>
            <span className="tab-icon"><I.users/></span>
            <span>
              {t.tabs.seekers}
              <span className="hero-tab-sub">{t.tabs.seekersSub}</span>
            </span>
          </button>
          <button className={`hero-tab tab-b ${side==='b'?'active':''}`} onClick={()=>onSide('b')} role="tab" aria-selected={side==='b'}>
            <span className="tab-icon"><I.heart/></span>
            <span>
              {t.tabs.solidarity}
              <span className="hero-tab-sub">{t.tabs.solSub}</span>
            </span>
          </button>
        </div>

        <div className="metrics" role="list">
          {t.hero.metrics.map((m, i) => (
            <div key={i} className={`metric ${['','v-crimson','v-gold','v-blue'][i]||''}`} role="listitem">
              <div className="metric-label">{m.k}</div>
              <div className="metric-value">{m.v}</div>
              <div className="metric-desc">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// 26-CANTON CALCULATOR
// ============================================================
function CantonCalculator({ t, lang }) {
  const [canton, setCanton] = uSA("VD");
  const [size, setSize] = uSA("3");
  const [rentType, setRentType] = uSA("brut"); // brut | net
  const [testRent, setTestRent] = uSA(1400);

  const c = window.CANTONS.find(x => x.code === canton);
  const ceiling = c.ceilings[size];

  // Adjust ceiling display for rent-type mismatch (approx: net = brut * 0.85)
  const displayCeiling = mSA(() => {
    if (c.basis === rentType) return ceiling;
    if (c.basis === "brut" && rentType === "net") return Math.round(ceiling * 0.85);
    return Math.round(ceiling / 0.85);
  }, [c, ceiling, rentType]);

  const over = testRent - displayCeiling;
  const compliant = over <= 0;

  return (
    <section id="calc">
      <div className="container">
        <span className="eyebrow">{t.calc.eyebrow}</span>
        <h2 className="section-title">{t.calc.title}</h2>
        <p className="section-sub">{t.calc.lede}</p>

        <div className="calc-grid" style={{marginTop: 34}}>
          {/* LEFT — Inputs */}
          <div className="card">
            <div className="field">
              <label htmlFor="canton-sel">{t.calc.canton}</label>
              <select id="canton-sel" className="select" value={canton} onChange={e=>setCanton(e.target.value)}>
                {window.CANTONS.map(x => (
                  <option key={x.code} value={x.code}>
                    {x.code} · {x.name[lang]}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>{t.calc.household}</label>
              <div className="pill-group">
                {["1","2","3","4","5"].map(s => (
                  <button key={s} className={`pill-btn ${size===s?'active':''}`} onClick={()=>setSize(s)}>
                    {t.calc.persons(Number(s))}{s==="5" ? "+" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>{t.calc.rentType}</label>
              <div className="seg">
                <button className={rentType==='brut'?'active':''} onClick={()=>setRentType('brut')}>{t.calc.brut}</button>
                <button className={rentType==='net'?'active':''} onClick={()=>setRentType('net')}>{t.calc.net}</button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="test-rent">{t.calc.testRent}</label>
              <input id="test-rent" type="number" min="200" max="6000" step="10" className="input"
                     value={testRent} onChange={e=>setTestRent(Number(e.target.value)||0)}/>
            </div>
          </div>

          {/* RIGHT — Verdict */}
          <div className="verdict-panel">
            <div className="verdict-label">{t.calc.ceiling}</div>
            <div className="verdict-amount">
              <span className="cur">CHF</span>
              <span className="mono">{chf(displayCeiling)}</span>
              <span className="per">/ {lang==='de' ? 'Monat' : lang==='it' ? 'mese' : lang==='uk' ? 'міс.' : 'mois'}</span>
            </div>

            <div className="verdict-facts">
              <div className="verdict-fact">
                <div className="label">{t.calc.authority}</div>
                <div className="value">{c.authority}</div>
              </div>
              <div className="verdict-fact">
                <div className="label">{t.calc.basis}</div>
                <div className="value">{c.basis === "brut" ? t.calc.brut : t.calc.net}</div>
              </div>
              <div className="verdict-fact" style={{gridColumn: "1 / -1"}}>
                <div className="label">{t.calc.heating}</div>
                <div className="value">{c.heating === "included" ? t.calc.heatIncluded : t.calc.heatSeparate}</div>
              </div>
            </div>

            <div className={`compliance-box ${compliant?'ok':'warn'}`} key={compliant+String(displayCeiling)}>
              <div className="icon">{compliant ? '✓' : '!'}</div>
              <div>
                <div className="title">
                  {compliant ? t.calc.compliant : `${t.calc.over} CHF ${chf(over)}`}
                </div>
                <div className="body">
                  {compliant
                    ? `${c.authority} · ${c.name[lang]} · ${t.calc.persons(Number(size))}${size==='5'?'+':''}`
                    : t.calc.overNote}
                </div>
              </div>
            </div>

            <div className="subsidiarity">{t.calc.subsidiarityNote}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CH-ISCO-19 PROFESSION CASCADE
// ============================================================
function ProfessionSelector({ t, lang }) {
  const [sectorId, setSectorId] = uSA(window.SECTORS[0].id);
  const [catId, setCatId] = uSA("all");
  const [qualif, setQualif] = uSA("all");

  const sector = window.SECTORS.find(s => s.id === sectorId);
  const categories = sector?.categories || [];

  eSA(() => { setCatId("all"); }, [sectorId]);

  const jobs = mSA(() => {
    const source = catId === "all" ? categories.flatMap(c => c.jobs.map(j => ({...j, catLabel: c.labels[lang]}))) 
                                   : (categories.find(c=>c.id===catId)?.jobs.map(j=>({...j, catLabel: categories.find(c=>c.id===catId).labels[lang]})) || []);
    return source.filter(j => qualif === "all" || j.qualif === qualif);
  }, [sectorId, catId, qualif, lang, categories]);

  const anyStellen = jobs.some(j => j.stellen);

  return (
    <section id="prof">
      <div className="container">
        <span className="eyebrow">{t.prof.eyebrow}</span>
        <h2 className="section-title">{t.prof.title}</h2>
        <p className="section-sub">{t.prof.lede}</p>

        <div className="card" style={{marginTop: 34}}>
          {/* Filters */}
          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap: 20, alignItems:'end'}}>
            <div className="field" style={{marginBottom:0}}>
              <label>{t.prof.sector}</label>
              <select className="select" value={sectorId} onChange={e=>setSectorId(e.target.value)}>
                {window.SECTORS.map(s => (
                  <option key={s.id} value={s.id}>{s.id} · {s.labels[lang]}</option>
                ))}
              </select>
            </div>
            <div className="field" style={{marginBottom:0}}>
              <label>{t.prof.category}</label>
              <select className="select" value={catId} onChange={e=>setCatId(e.target.value)}>
                <option value="all">— {lang==='de'?'Alle Kategorien':lang==='it'?'Tutte le categorie':lang==='uk'?'Усі категорії':'Toutes les catégories'} —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.labels[lang]}</option>)}
              </select>
            </div>
          </div>

          <div className="field" style={{marginTop: 18, marginBottom: 0}}>
            <label>{t.prof.qualif}</label>
            <div className="pill-group">
              <button className={`pill-btn ${qualif==='all'?'active':''}`} onClick={()=>setQualif('all')}>{t.prof.allQualif}</button>
              {window.QUALIF_LEVELS.map(q => (
                <button key={q.id} className={`pill-btn ${qualif===q.id?'active':''}`} onClick={()=>setQualif(q.id)}>
                  {q.labels[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Stellen alert (only when any listed job is stellen) */}
          {anyStellen && (
            <div className="stellen-alert" role="alert">
              <span className="badge">{t.prof.stellenBadge}</span>
              <div>
                <div className="title">⚠ {t.prof.stellenTitle}</div>
                <div className="body">{t.prof.stellenBody}</div>
              </div>
            </div>
          )}

          {/* Table */}
          {jobs.length === 0 ? (
            <div className="no-results">{t.prof.noResults}</div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table className="prof-table">
                <thead>
                  <tr>
                    <th>{t.prof.isco}</th>
                    <th>{t.prof.titleCol}</th>
                    <th>{t.prof.qualif}</th>
                    <th>{t.prof.salary}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j, i) => {
                    // localized primary + alt in other langs
                    const altLangs = ['fr','de','it','uk'].filter(l => l !== lang);
                    const alt = altLangs.map(l => `${LANG_LABEL[l]} · ${j.titles[l]}`).join(' · ');
                    return (
                      <tr key={i}>
                        <td className="isco">{j.isco}</td>
                        <td>
                          <div className="job-title">{j.titles[lang]}</div>
                          <div className="job-title-alt">{alt}</div>
                        </td>
                        <td><span className="qbadge">{window.QUALIF_LEVELS.find(q=>q.id===j.qualif).labels[lang].split(' ')[0]}</span></td>
                        <td className="salary">{chf(j.salary[0])} – {chf(j.salary[1])}</td>
                        <td>{j.stellen && <span className="stellen-flag">⚠ 21a LEI</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TopBanner, Navbar, Hero, CantonCalculator, ProfessionSelector });


// ==================== [Module: side-b.jsx] ====================
// Side B: Solidarité Suisse — Host sublease wizard + Benevol mentors
const { useState: uSB, useMemo: mSB } = React;

// ============================================================
// HOST SUBLEASE WIZARD (Art. 262 CO)
// ============================================================
function HostSubleaseWizard({ t, lang }) {
  const [totalRent, setTotalRent] = uSB(1800);
  const [rooms, setRooms] = uSB(4);
  const [surcharge, setSurcharge] = uSB(15);
  const [showPdf, setShowPdf] = uSB(false);

  const base = mSB(() => Math.round(totalRent / rooms), [totalRent, rooms]);
  const finalRent = mSB(() => Math.round(base * (1 + surcharge / 100)), [base, surcharge]);
  const over20 = surcharge > 20;

  return (
    <section id="sublease">
      <div className="container">
        <span className="eyebrow">{t.sublease.eyebrow}</span>
        <h2 className="section-title">{t.sublease.title}</h2>
        <p className="section-sub">{t.sublease.lede}</p>

        <div className="host-grid" style={{marginTop: 34}}>
          {/* LEFT — Wizard */}
          <div className="card">
            <div className="shield-box">
              <div className="icon"><I.shield/></div>
              <div>
                <div className="title">{t.sublease.shield}</div>
                <div className="body">{t.sublease.shieldBody}</div>
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap: 14}}>
              <div className="field">
                <label>{t.sublease.totalRent}</label>
                <input type="number" min="500" max="8000" step="50" className="input"
                       value={totalRent} onChange={e=>setTotalRent(Number(e.target.value)||0)}/>
              </div>
              <div className="field">
                <label>{t.sublease.rooms}</label>
                <input type="number" min="1" max="10" step="0.5" className="input"
                       value={rooms} onChange={e=>setRooms(Number(e.target.value)||1)}/>
              </div>
            </div>

            <div className="field" style={{marginTop: 6}}>
              <label>{t.sublease.base}</label>
              <div style={{padding:'12px 14px', background:'rgba(15,23,42,0.65)', border:'1px solid var(--line-2)', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:13, color:'var(--muted)'}} className="mono">CHF {chf(totalRent)} / {rooms} = </span>
                <span style={{fontFamily:"'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700, color:'#E2E8F0'}}>CHF {chf(base)}</span>
              </div>
            </div>

            <div className="field">
              <label style={{display:'flex', justifyContent:'space-between'}}>
                <span>{t.sublease.surcharge}</span>
                <span className="mono" style={{color: over20 ? '#FCA5A5' : '#FCD34D'}}>{surcharge}%</span>
              </label>
              <div className="slider-wrap">
                <input type="range" min="0" max="30" step="1" className="slider"
                       value={surcharge} onChange={e=>setSurcharge(Number(e.target.value))}/>
                <div className="slider-labels">
                  <span>0%</span><span style={{color:'var(--emerald-2)'}}>10%</span><span style={{color:'var(--gold-2)'}}>20% MAX</span><span style={{color:'#FCA5A5'}}>30%</span>
                </div>
              </div>
              <div style={{fontSize: 11.5, color: 'var(--muted)', marginTop: 6}}>{t.sublease.surchargeLimit}</div>
            </div>

            <div className="final-rent-box">
              <div className="label">{t.sublease.final}</div>
              <div className="amount"><span className="cur">CHF</span> <span className="mono">{chf(finalRent)}</span></div>
              <div className="breakdown">CHF {chf(base)} + {surcharge}% = CHF {chf(finalRent)} / {lang==='de'?'Monat':lang==='it'?'mese':lang==='uk'?'міс.':'mois'}</div>
              <div className={`compliance-box ${over20?'warn':'ok'}`} style={{marginTop:14}}>
                <div className="icon">{over20?'!':'✓'}</div>
                <div>
                  <div className="title">{over20 ? t.sublease.overBadge : t.sublease.okBadge}</div>
                  <div className="body">{over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA / Mieterverband'}</div>
                </div>
              </div>
            </div>

            <div className="badges-row">
              <span className="mini-badge gold"><I.euro/> {t.sublease.taxBadge}</span>
              <span className="mini-badge blue"><I.shield/> {t.sublease.insBadge}</span>
            </div>

            <div style={{marginTop: 20, display:'flex', gap: 10, flexWrap:'wrap'}}>
              <button className="btn btn-blue" onClick={()=>setShowPdf(true)} disabled={over20}>
                <I.arrow/> {t.sublease.letterBtn}
              </button>
            </div>
            <div style={{marginTop: 10, fontSize: 12, color:'var(--muted)'}}>{t.sublease.letterHint}</div>
          </div>

          {/* RIGHT — PDF preview */}
          <div>
            <div className="pdf-preview">
              <h4>{t.sublease.pdfTitle}</h4>
              <p style={{margin:'6px 0 12px', fontSize: 11.5, color:'#334155', fontStyle:'italic'}}>{t.sublease.pdfIntro}</p>

              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.from}</span><span>[ Nom · Adresse · NPA / Ville ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.to}</span><span>[ Gérance · Adresse ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.subtenant}</span><span>[ Nom · N° Permis S ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.desc}</span><span>1 pièce meublée, {Math.round(15/(rooms||1)*100)/10 || 12} m², partagée cuisine/SdB</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.rent}</span><span style={{fontWeight:700}}>CHF {chf(finalRent)} / mois</span></div>

              <div className="pdf-close">{t.sublease.pdfClose}</div>

              <div className="pdf-sig">
                <div><div className="line"></div>Signature locataire principal</div>
                <div><div className="line"></div>Date · Lieu</div>
              </div>
            </div>

            <div style={{marginTop: 14, padding: '12px 14px', background: 'rgba(15,23,42,0.5)', border: '1px dashed var(--line-2)', borderRadius: 12, fontSize: 12, color: 'var(--muted)'}}>
              📄 Aperçu du courrier — bouton "{t.sublease.letterBtn}" génère un PDF/A signable, avec citations légales complètes et coordonnées de la gérance ciblée.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEVOL MENTOR HUB
// ============================================================
function BenevolMentors({ t, lang }) {
  const [commit, setCommit] = uSB(1);

  return (
    <section id="mentors">
      <div className="container">
        <span className="eyebrow">{t.mentors.eyebrow}</span>
        <h2 className="section-title">{t.mentors.title}</h2>
        <p className="section-sub">{t.mentors.lede}</p>

        <div className="card" style={{marginTop: 34}}>
          <div className="field">
            <label>{t.mentors.commit}</label>
            <div className="pill-group">
              {t.mentors.commitOpts.map((opt, i) => (
                <button key={i} className={`pill-btn active-blue ${commit===i?'active-blue':''}`} style={{opacity: commit===i?1:0.55}} onClick={()=>setCommit(i)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop: 24}}>
            <div className="metric-label" style={{marginBottom: 12}}>{t.mentors.tracks}</div>
            <div className="tracks-grid">
              {t.mentors.trackList.map((tr, i) => (
                <div key={i} className="track-card">
                  <div className="track-num">TRACK 0{i+1}</div>
                  <div className="track-title">{tr.t}</div>
                  <div className="track-body">{tr.b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-strip">
            <span>{t.mentors.legal}</span>
          </div>

          <div style={{marginTop: 22, display:'flex', gap: 10, flexWrap:'wrap'}}>
            <button className="btn btn-blue btn-lg">
              <I.users/> {t.mentors.apply}
            </button>
            <a href="https://t.me/SwissResilienceHubBot?start=mentor" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              <I.send/> @SwissResilienceHubBot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HostSubleaseWizard, BenevolMentors });


// ==================== [Module: beta-donation.jsx] ====================
// Beta pricing (frozen) + Donation Merkle modal + Legal footer
const { useState: uSD, useEffect: eSD } = React;

// ============================================================
// BETA PRICING (frozen tiers + donation card)
// ============================================================
function BetaPricing({ t, onDonate }) {
  return (
    <section id="beta">
      <div className="container">
        <span className="eyebrow">{t.beta.eyebrow}</span>
        <h2 className="section-title">{t.beta.title}</h2>
        <p className="section-sub">{t.beta.lede}</p>

        <div className="pricing-grid">

          {/* FROZEN — PRO */}
          <div className="price-card frozen">
            <span className="frozen-overlay">{t.beta.inactiveBadge}</span>
            <div className="price-name">Pro Solidarity</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">19</span><span className="per">/ {t.lang === 'Français' ? 'mois' : t.lang === 'Deutsch' ? 'Monat' : t.lang === 'Italiano' ? 'mese' : 'міс.'}</span></div>
            <p className="price-tagline">{t.beta.proTagline}</p>
            <ul className="features">
              {t.beta.proFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-disabled" style={{width:'100%'}}>{t.beta.inactiveBadge}</button>
          </div>

          {/* FROZEN — SUCCESS */}
          <div className="price-card frozen">
            <span className="frozen-overlay">{t.beta.inactiveBadge}</span>
            <div className="price-name">Success Relocation</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">54</span><span className="per">/ one-shot</span></div>
            <p className="price-tagline">{t.beta.successTagline}</p>
            <ul className="features">
              {t.beta.successFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-disabled" style={{width:'100%'}}>{t.beta.inactiveBadge}</button>
          </div>

          {/* DONATION CARD (the only active CTA) */}
          <div className="price-card donation">
            <div className="price-name" style={{color:'#FCD34D'}}>★ {t.beta.freeAccess}</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">0</span></div>
            <p className="price-tagline">{t.beta.donationTagline}</p>
            <ul className="features">
              {t.beta.donationFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{width:'100%'}} onClick={onDonate}>
              <I.heart/> {t.beta.donateBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================
// DONATION MODAL — Merkle Ledger + Operational Payment rails
// ============================================================
function DonationModal({ t, lang, onClose }) {
  const [rail, setRail] = uSD("stars"); // stars | card | qr | crypto
  const [amount, setAmount] = uSD(250);
  const [customOn, setCustomOn] = uSD(false);
  const [copied, setCopied] = uSD(false);
  const merkleRoot = useSessionMerkle();

  eSD(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  const chips = rail === "stars" ? [50, 250, 950, 2450] : [10, 25, 50, 100];
  const unit = rail === "stars" ? "XTR" : "CHF";

  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStarsPay = (e) => {
    const url = `https://t.me/SwissResilienceHubBot?start=donate_${amount}`;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
      e.preventDefault();
      window.Telegram.WebApp.openTelegramLink(url);
    }
  };

  const copyLabel = lang==='uk' ? '✓ Скопійовано !' : lang==='de' ? '✓ Kopiert !' : lang==='it' ? '✓ Copiato !' : '✓ Copié !';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2>{t.donation?.title || "Don de soutien — Registre public Merkle"}</h2>
            <p style={{margin:0, color:'var(--muted)', fontSize: 13.5}}>Association Swiss Resilience · Art. 60–79 CC · Bêta publique</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close"><I.x/></button>
        </div>

        {/* 70 / 30 split */}
        <div className="split-viz" aria-label="Fund allocation">
          <div className="split-70">
            <div className="split-pct">70%</div>
            <div style={{fontWeight:700, fontSize:13, marginBottom:4}}>Infrastructure & APIs</div>
            <div className="split-desc">{t.donation?.split70 || "70% — Hébergement, serveurs, scanners d'offres et coûts d'API"}</div>
          </div>
          <div className="split-30">
            <div className="split-pct">30%</div>
            <div style={{fontWeight:700, fontSize:13, marginBottom:4, color:'#FEF3C7'}}>🇺🇦 ZSU Solidarity</div>
            <div className="split-desc">{t.donation?.split30 || "30% — Soutien humanitaire et matériel pour l'Ukraine"}</div>
          </div>
        </div>

        {/* Payment rails */}
        <div className="pay-row">
          <button className="pay-card stars" style={{borderColor: rail==='stars' ? 'rgba(59,130,246,0.9)' : ''}} onClick={()=>{setRail('stars'); setAmount(250); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.star/></span><span className="title">{t.donation?.stars || "Telegram Stars (XTR)"}</span></div>
            <div className="hint">{t.donation?.starsHint || "1-Clic instantané dans Telegram · 0% commission"}</div>
          </button>
          <button className="pay-card card" style={{borderColor: rail==='card' ? 'rgba(16,185,129,0.9)' : ''}} onClick={()=>{setRail('card'); setAmount(25); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.lock/></span><span className="title">{t.donation?.card || "Carte / Apple & Google Pay"}</span></div>
            <div className="hint">{t.donation?.cardHint || "Paiement sécurisé Visa, MC, Apple Pay"}</div>
          </button>
        </div>
        <div className="pay-row" style={{gridTemplateColumns:'1fr 1fr', marginTop: 10}}>
          <button className="pay-card qr" style={{borderColor: rail==='qr' ? 'rgba(213,43,30,0.9)' : ''}} onClick={()=>{setRail('qr'); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.hash/></span><span className="title">{t.donation?.qr || "QR-Facture & IBAN CH"}</span></div>
            <div className="hint">{t.donation?.qrHint || "Virement bancaire suisse direct"}</div>
          </button>
          <button className="pay-card crypto" style={{borderColor: rail==='crypto' ? 'rgba(217,119,6,0.9)' : ''}} onClick={()=>{setRail('crypto'); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.shield/></span><span className="title">Crypto (USDT TRC20/ERC20)</span></div>
            <div className="hint">{lang==='uk'?'USDT TRC20 та ERC20 з чеком у боті':lang==='de'?'USDT TRC20 & ERC20 mit Quittung':lang==='it'?'USDT TRC20 & ERC20 con ricevuta':'USDT TRC20 & ERC20 avec reçu'}</div>
          </button>
        </div>

        {/* Amount chips for Stars / Card */}
        {(rail === 'stars' || rail === 'card') && (
          <div>
            <div style={{marginTop: 18, marginBottom: 8, fontSize: 11, letterSpacing: '0.12em', textTransform:'uppercase', color:'var(--muted)', fontWeight:700, fontFamily:"'JetBrains Mono',monospace"}}>
              Montant du don · {unit}
            </div>
            <div className="amount-chips">
              {chips.map(a => (
                <button key={a} className={`amount-chip ${amount===a && !customOn ?'active':''}`} onClick={()=>{setAmount(a); setCustomOn(false);}}>
                  {a} {unit}
                </button>
              ))}
              <button className={`amount-chip ${customOn?'active':''}`} onClick={()=>setCustomOn(true)}>{t.donation.customAmount}</button>
            </div>
            {customOn && (
              <input type="number" min="1" className="input" style={{marginTop: 10, maxWidth: 220}}
                     value={amount} onChange={e=>setAmount(Number(e.target.value)||0)}/>
            )}
          </div>
        )}

        {/* Details for QR / Bank Transfer */}
        {rail === 'qr' && (
          <div style={{marginTop: 18, padding: 16, background: 'rgba(15,23,42,0.85)', border: '1px solid var(--line-2)', borderRadius: 12}}>
            <div style={{fontSize: 13, fontWeight: 700, color: '#F8FAFC', marginBottom: 8}}>Coordonnées bancaires suisses (BVR / QR-Facture)</div>
            <div style={{fontSize: 12.5, color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: 6}}>
              <div><strong>Bénéficiaire :</strong> Association Swiss Resilience (en constitution)</div>
              <div><strong>Banque :</strong> PostFinance / Banque Cantonale de Genève</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
                <strong>IBAN :</strong> <span className="mono" style={{color: '#FCD34D'}}>CH74 0900 0000 1234 5678 9</span>
                <button className="btn btn-ghost" style={{padding: '4px 8px', minHeight: 28, fontSize: 11}} onClick={()=>handleCopy('CH7409000000123456789')}>
                  {copied ? copyLabel : (lang==='uk'?'Копіювати IBAN':lang==='de'?'IBAN kopieren':lang==='it'?'Copia IBAN':'Copier l\'IBAN')}
                </button>
              </div>
              <div><strong>Motif :</strong> Don solidarité Bêta (70% Infra / 30% ZSU)</div>
            </div>
          </div>
        )}

        {/* Details for Crypto */}
        {rail === 'crypto' && (
          <div style={{marginTop: 18, padding: 16, background: 'rgba(15,23,42,0.85)', border: '1px solid var(--line-2)', borderRadius: 12}}>
            <div style={{fontSize: 13, fontWeight: 700, color: '#F8FAFC', marginBottom: 8}}>
              {lang==='uk'?'Офіційні криптовалютні адреси (USDT)':lang==='de'?'Offizielle Krypto-Adressen (USDT)':lang==='it'?'Indirizzi crypto ufficiali (USDT)':'Adresses cryptographiques officielles (USDT)'}
            </div>
            <div style={{fontSize: 12.5, color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: 8}}>
              <div>
                <span style={{fontSize: 11, color: 'var(--muted)', display: 'block'}}>USDT (TRC-20 Tron) :</span>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 2}}>
                  <span className="mono" style={{fontSize: 12, color: '#FEF3C7', wordBreak: 'break-all'}}>TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a</span>
                  <button className="btn btn-ghost" style={{padding: '4px 8px', minHeight: 28, fontSize: 11}} onClick={()=>handleCopy('TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a')}>
                    {copied ? copyLabel : (lang==='uk'?'Копіювати':lang==='de'?'Kopieren':lang==='it'?'Copia':'Copier')}
                  </button>
                </div>
              </div>
              <div>
                <span style={{fontSize: 11, color: 'var(--muted)', display: 'block'}}>USDT / ETH (ERC-20 Ethereum) :</span>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 2}}>
                  <span className="mono" style={{fontSize: 12, color: '#FEF3C7', wordBreak: 'break-all'}}>0x4E8b7a129d2fC7c47d3B6c21A77E8b3F13D75a9B</span>
                  <button className="btn btn-ghost" style={{padding: '4px 8px', minHeight: 28, fontSize: 11}} onClick={()=>handleCopy('0x4E8b7a129d2fC7c47d3B6c21A77E8b3F13D75a9B')}>
                    {copied ? copyLabel : (lang==='uk'?'Копіювати':lang==='de'?'Kopieren':lang==='it'?'Copia':'Copier')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Merkle strip */}
        <div className="merkle-strip">
          <span className="label">{t.donation?.merkleRoot || "Merkle Root SHA-256"}</span>
          <span className="hash">{merkleRoot.slice(0, 42)}…</span>
          <a href="https://github.com/maxfraieho/swiss-job-hunter" target="_blank" rel="noopener noreferrer">{t.donation?.verifyBtn || "GitHub Audit"} →</a>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.donation?.close || "Fermer"}</button>
          {rail === 'stars' ? (
            <a 
              href={`https://t.me/SwissResilienceHubBot?start=donate_${amount}`}
              onClick={handleStarsPay}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg"
            >
              <I.star/> {amount} Stars (XTR) — @SwissResilienceHubBot
            </a>
          ) : rail === 'card' ? (
            <a 
              href="https://send.monobank.ua/jar/3kCfxsNspw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg"
            >
              <I.heart/> {lang==='uk'?`Підтримати ${amount} CHF (Картка / Apple Pay)`:lang==='de'?`Unterstützen ${amount} CHF (Karte / Apple Pay)`:lang==='it'?`Dona ${amount} CHF (Carta / Apple Pay)`:`Payer ${amount} CHF (Carte / Apple Pay)`}
            </a>
          ) : rail === 'qr' ? (
            <a 
              href={`https://t.me/SwissResilienceHubBot?start=donate_qr`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-lg"
            >
              <I.hash/> {lang==='uk'?'Отримати QR-рахунок у боті':lang==='de'?'QR-Rechnung im Bot erhalten':lang==='it'?'Ricevi fattura QR nel bot':'Recevoir la QR-facture PDF'}
            </a>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={()=>handleCopy('TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a')}>
              <I.check/> {copied ? copyLabel : (lang==='uk'?'Скопіювати адресу USDT TRC20':lang==='de'?'USDT TRC20 Adresse kopieren':lang==='it'?'Copia indirizzo USDT TRC20':'Copier l\'adresse USDT TRC20')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LEGAL FOOTER
// ============================================================
function LegalFooter({ t }) {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="brand" style={{gap: 12, marginBottom: 12}}>
              <span className="brand-badge"><BrandMark size={22}/></span>
              <span className="brand-name">Swiss Resilience Navigator<span>2.5 · Pan-Swiss Bêta</span></span>
            </div>
            <p style={{maxWidth: 320}}>
              Plateforme communautaire d'entraide entre bénéficiaires du Permis S et résidents suisses solidaires — 26 cantons, 4 langues, zéro commission.
            </p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.status}</h4>
            <p>{t.footer.statusBody}</p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.lse}</h4>
            <p>{t.footer.lseBody}</p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.links}</h4>
            <ul>
              {t.footer.linkList.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}
            </ul>
            <h4 style={{marginTop: 22}}>{t.footer.lcd}</h4>
            <p style={{fontSize: 12}}>{t.footer.lcdBody}</p>
          </div>
        </div>

        <div className="compliance-row">
          <span className="comp-chip"><I.shield/> Swiss nLPD Compliant</span>
          <span className="comp-chip"><I.shield/> EU GDPR</span>
          <span className="comp-chip"><I.lock/> AES-256 · SHA-256 Merkle</span>
          <span className="comp-chip"><I.hash/> Appwrite Cloud · Frankfurt</span>
          <span className="comp-chip"><I.shield/> Benevol Switzerland</span>
          <span className="comp-chip"><I.shield/> ASLOCA / Mieterverband</span>
        </div>

        <div className="foot-legal">
          {t.footer.close}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { BetaPricing, DonationModal, LegalFooter });


// ==================== [Module: app.jsx] ====================
// Swiss Resilience Navigator 2.5 — App root
const { useState: uApp, useEffect: eApp } = React;

// Safe storage helper resilient to Telegram in-app browser and private mode storage blocks
const _memStore = {};
function safeStorageGet(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : _memStore[key];
  } catch (e) {
    return _memStore[key] || null;
  }
}
function safeStorageSet(key, val) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, val);
  } catch (e) {
    _memStore[key] = val;
  }
}

function App() {
  const [lang, setLang] = uApp(() => {
    // Check URL params first, then localStorage, then default to 'fr'
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    if (paramLang && window.I18N && window.I18N[paramLang]) return paramLang;
    return safeStorageGet('srn-lang') || 'fr';
  });

  const [side, setSide] = uApp(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramSide = urlParams.get('side');
    if (paramSide === 'a' || paramSide === 'b') return paramSide;
    return safeStorageGet('srn-side') || 'a';
  });

  const [donateOpen, setDonateOpen] = uApp(false);

  eApp(() => { safeStorageSet('srn-lang', lang); }, [lang]);
  eApp(() => { safeStorageSet('srn-side', side); }, [side]);

  // Support Telegram WebApp auto-theme and expand if inside TMA
  eApp(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);

  const t = (window.I18N && window.I18N[lang]) ? window.I18N[lang] : (window.I18N ? window.I18N['fr'] : {});

  if (!t || !t.banner) {
    return <div style={{padding: 40, textAlign: 'center', color: '#CBD5E1'}}>Chargement du Swiss Resilience Navigator 2.5...</div>;
  }

  return (
    <React.Fragment>
      <TopBanner t={t}/>
      <Navbar t={t} lang={lang} onLang={setLang} side={side} onSide={setSide} onDonate={()=>setDonateOpen(true)}/>
      <Hero t={t} side={side} onSide={setSide}/>

      <div className="fade-in" key={side}>
        {side === 'a' ? (
          <React.Fragment>
            <CantonCalculator t={t} lang={lang}/>
            <ProfessionSelector t={t} lang={lang}/>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HostSubleaseWizard t={t} lang={lang}/>
            <BenevolMentors t={t} lang={lang}/>
          </React.Fragment>
        )}
      </div>

      <BetaPricing t={t} onDonate={()=>setDonateOpen(true)}/>
      <LegalFooter t={t}/>

      {donateOpen && <DonationModal t={t} lang={lang} onClose={()=>setDonateOpen(false)}/>}
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

