// SwissRelief · Pan-Swiss 2.6 — Mobile Drawer (Anomalie 1 FIX)
// Rendered via ReactDOM.createPortal to document.body → escapes .nav-wrap
// containing-block trap. 100dvh, inset:0, z-index 99999.
// Contains 2×2 language grid (Anomalie 2 FIX).

function MobileDrawer({ lang, setLang, side, setSide, service, setService, onClose, onDonate, onOpenInfo, onOpenChat, t }) {
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

        {/* AI Co-Pilot Launcher */}
        {onOpenChat && (
          <div className="drawer-section" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
            <button
              className="svc-item"
              onClick={() => { onClose(); onOpenChat(); }}
              style={{ background: 'linear-gradient(135deg, rgba(213,43,30,0.18) 0%, rgba(30,41,59,0.7) 100%)', border: '1px solid rgba(213,43,30,0.35)' }}
            >
              <div className="icon">🤖</div>
              <div className="info">
                <div className="label" style={{ color: '#FCA5A5', fontWeight: 700 }}>
                  {lang === 'uk' ? 'ШІ-Копілот ACCORD Suisse' : 'Co-pilote IA ACCORD'}
                </div>
                <div className="sub">{lang === 'uk' ? 'Діалог 24/7 · EVAM, ст. 262 CO, досьє' : 'Dialogue 24/7 · EVAM, Art. 262 CO'}</div>
              </div>
              <Ico.arrow className="arrow"/>
            </button>
          </div>
        )}

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
