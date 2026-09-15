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
  const [chatOpen, setChatOpen] = React.useState(false);

  const openChat = () => setChatOpen(true);
  const toggleChat = () => setChatOpen(prev => !prev);

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

        <AgentChatWidget
          isOpen={chatOpen}
          onToggle={toggleChat}
          activeService={service}
          onSwitchService={pickService}
          lang={lang}
          t={t}
        />

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
      <ServiceSwitcher activeId={service} onPick={pickService} onOpenChat={openChat} t={t}/>
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
          onOpenChat={openChat}
          t={t}
        />
      )}

      <AgentChatWidget
        isOpen={chatOpen}
        onToggle={toggleChat}
        activeService={service}
        onSwitchService={pickService}
        lang={lang}
        t={t}
      />

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

