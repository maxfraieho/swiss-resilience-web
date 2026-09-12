// Swiss Resilience Navigator 2.5 — App root
const { useState: uApp, useEffect: eApp } = React;

function App() {
  const [lang, setLang] = uApp(() => {
    // Check URL params first, then localStorage, then default to 'fr'
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    if (paramLang && window.I18N && window.I18N[paramLang]) return paramLang;
    return localStorage.getItem('srn-lang') || 'fr';
  });

  const [side, setSide] = uApp(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramSide = urlParams.get('side');
    if (paramSide === 'a' || paramSide === 'b') return paramSide;
    return localStorage.getItem('srn-side') || 'a';
  });

  const [donateOpen, setDonateOpen] = uApp(false);

  eApp(() => { localStorage.setItem('srn-lang', lang); }, [lang]);
  eApp(() => { localStorage.setItem('srn-side', side); }, [side]);

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

      {donateOpen && <DonationModal t={t} onClose={()=>setDonateOpen(false)}/>}
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
