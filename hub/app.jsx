// Swiss Resilience Navigator 2.5 — App root
const { useState: uApp, useEffect: eApp } = React;

function App() {
  const [lang, setLang] = uApp(() => localStorage.getItem('srn-lang') || 'fr');
  const [side, setSide] = uApp(() => localStorage.getItem('srn-side') || 'a');
  const [donateOpen, setDonateOpen] = uApp(false);

  eApp(() => { localStorage.setItem('srn-lang', lang); }, [lang]);
  eApp(() => { localStorage.setItem('srn-side', side); }, [side]);

  const t = window.I18N[lang];

  return (
    <React.Fragment>
      <TopBanner t={t}/>
      <Navbar t={t} lang={lang} onLang={setLang} onDonate={()=>setDonateOpen(true)}/>
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
