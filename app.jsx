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
