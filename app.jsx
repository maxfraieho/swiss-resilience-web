// SwissRelief 2.6 — App Root Component
// Implements ADR-016 safe storage, Telegram WebApp stabilization, and quad-lingual i18n routing.

// Safe storage helper resilient to Telegram in-app browser and private mode storage blocks (ADR-016)
const _memStore = {};
function safeStorageGet(key, def = null) {
  try {
    return window.localStorage ? (window.localStorage.getItem(key) || def) : (_memStore[key] || def);
  } catch (e) {
    return _memStore[key] || def;
  }
}

function safeStorageSet(key, val) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, val);
  } catch (e) {
    _memStore[key] = val;
  }
}

// Global aliases for components that call window.safeGet / window.safeSet
window.safeGet = safeStorageGet;
window.safeSet = safeStorageSet;

function App() {
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

  const [service, setService] = React.useState('calc');
  const [canton, setCanton] = React.useState(() => safeStorageGet('sr26-canton', 'VD'));
  const [status, setStatus] = React.useState(() => safeStorageGet('sr26-status', 'evam')); // evam | salary
  const [income, setIncome] = React.useState(() => Number(safeStorageGet('sr26-income', 4800)) || 4800);
  const [drawerOpen, setDrawer] = React.useState(false);
  const [donateOpen, setDonate] = React.useState(false);
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
            window.location.hash = "#housing";
            document.getElementById('housing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  if (!t || !t.banner) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#CBD5E1', fontFamily: 'Inter, sans-serif' }}>
        Chargement de l'environnement SwissRelief 2.6...
      </div>
    );
  }

  return (
    <React.Fragment>
      <TopBannerV2 t={t}/>
      <NavV2
        lang={lang}
        setLang={setLang}
        side={side}
        setSide={setSide}
        onOpenDrawer={() => setDrawer(true)}
        onOpenDonate={() => setDonate(true)}
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
        <BetaSection onOpenDonate={() => setDonate(true)} t={t}/>
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
          onOpenDonate={() => setDonate(true)}
          onDonate={() => setDonate(true)}
          t={t}
        />
      )}
      {donateOpen && <DonationModal onClose={() => setDonate(false)} t={t}/>}
    </React.Fragment>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App/>);
}
