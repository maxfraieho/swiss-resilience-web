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
            <button onClick={onDonate} className="btn btn-primary nav-donate-btn">
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
