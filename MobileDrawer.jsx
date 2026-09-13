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
    { id: 'prof',    side: 'a', icon: <Ico.chart/>, label: t.nav?.jobs || "Emploi", sub: "Offres · Art. 21a LEI" },
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

