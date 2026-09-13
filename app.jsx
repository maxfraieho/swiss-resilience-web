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
