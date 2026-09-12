// SwissRelief 2.6 — Canton barème calculator (Side A)
// Connects to full 26-canton dataset with quad-lingual labels (window.CANTONS).
const CANTONS_FALLBACK = [
  { code: "VD", name: "Vaud",         authority: "EVAM",              basis: "brut", heating: "included", ceilings: { 1:1050, 2:1250, 3:1350, 4:1650, 5:2100 } },
  { code: "GE", name: "Genève",       authority: "Hospice Général",   basis: "net",  heating: "separate", ceilings: { 1:1100, 2:1300, 3:1550, 4:1800, 5:2100 } },
  { code: "ZH", name: "Zurich",       authority: "AOZ / SKOS",        basis: "brut", heating: "included", ceilings: { 1:1400, 2:1700, 3:2000, 4:2300, 5:2600 } },
  { code: "BE", name: "Berne",        authority: "GSI Bern",          basis: "brut", heating: "included", ceilings: { 1:1000, 2:1250, 3:1500, 4:1750, 5:2000 } },
  { code: "BS", name: "Bâle-Ville",   authority: "WSU Basel",         basis: "brut", heating: "included", ceilings: { 1:1100, 2:1450, 3:1700, 4:1950, 5:2200 } },
  { code: "TI", name: "Tessin",       authority: "LAPS Ticino",       basis: "brut", heating: "included", ceilings: { 1:800,  2:1100, 3:1300, 4:1500, 5:1500 } },
  { code: "LU", name: "Lucerne",      authority: "DISG Luzern",       basis: "brut", heating: "included", ceilings: { 1:1050, 2:1300, 3:1550, 4:1800, 5:2000 } },
  { code: "ZG", name: "Zoug",         authority: "SKOS Zug",          basis: "brut", heating: "included", ceilings: { 1:1200, 2:1550, 3:1850, 4:2100, 5:2350 } },
];

const chfV2 = (n) => new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 })
  .format(Math.round(n)).replace(/,/g, "'");

function CantonCalculatorV2({ t, lang = 'fr' }) {
  const [canton, setCanton] = React.useState("VD");
  const [size, setSize] = React.useState(3);
  const [rentType, setRentType] = React.useState("brut");
  const [testRent, setTestRent] = React.useState(1400);

  const cantons = (typeof window !== 'undefined' && Array.isArray(window.CANTONS) && window.CANTONS.length >= 26)
    ? window.CANTONS
    : CANTONS_FALLBACK;

  const c = cantons.find(x => x.code === canton) || cantons[0];
  const ceilings = c.ceilings || { 1: 1000, 2: 1200, 3: 1400, 4: 1600, 5: 1800 };
  const raw = ceilings[size] || ceilings[5] || 1200;

  const displayCeiling = (c.basis === rentType) ? raw
    : (c.basis === "brut" ? Math.round(raw * 0.85) : Math.round(raw / 0.85));

  const over = testRent - displayCeiling;
  const compliant = over <= 0;

  const cantonName = typeof c.name === 'object' ? (c.name[lang] || c.name.fr || c.code) : (c.name || c.code);

  return (
    <section id="calc" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.calc.eyebrow}</span>
          <h2 className="v2-section-title">{t.calc.title}</h2>
          <p className="v2-section-sub">{t.calc.lede}</p>
        </div>

        <div className="v2-calc-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label htmlFor="v2-canton">{t.calc.canton}</label>
              <select id="v2-canton" className="v2-select" value={canton} onChange={e => setCanton(e.target.value)}>
                {cantons.map(x => {
                  const optName = typeof x.name === 'object' ? (x.name[lang] || x.name.fr || x.code) : (x.name || x.code);
                  return (
                    <option key={x.code} value={x.code}>
                      {x.code} · {optName} — {x.authority}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="v2-field">
              <label>{t.calc.household}</label>
              <div className="v2-pill-group">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} className={`v2-pill-btn ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                    {s}{s === 5 ? '+' : ''} <span style={{ opacity: 0.7, fontWeight: 500 }}>pers.</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{t.calc.rentType}</label>
              <div className="v2-seg">
                <button className={rentType === 'brut' ? 'active' : ''} onClick={() => setRentType('brut')}>{t.calc.brut}</button>
                <button className={rentType === 'net'  ? 'active' : ''} onClick={() => setRentType('net')}>{t.calc.net}</button>
              </div>
            </div>

            <div className="v2-field">
              <label htmlFor="v2-rent">{t.calc.testRent}</label>
              <div className="v2-input-with-suffix">
                <input
                  id="v2-rent"
                  type="number"
                  min="200"
                  max="6000"
                  step="10"
                  className="v2-input"
                  value={testRent}
                  onChange={e => setTestRent(Number(e.target.value) || 0)}
                />
                <span className="v2-input-suffix">CHF / mois</span>
              </div>
            </div>
          </div>

          <div className="v2-verdict">
            <div className="v2-verdict-label">{t.calc.ceiling}</div>
            <div className="v2-verdict-amount">
              <span className="cur">CHF</span>
              <span className="num">{chfV2(displayCeiling)}</span>
              <span className="per">/ mois</span>
            </div>

            <div className="v2-fact-grid">
              <div className="v2-fact">
                <div className="v2-fact-label">{t.calc.authority}</div>
                <div className="v2-fact-value">{c.authority}</div>
              </div>
              <div className="v2-fact">
                <div className="v2-fact-label">{t.calc.basis}</div>
                <div className="v2-fact-value">{c.basis === 'brut' ? t.calc.brut : t.calc.net}</div>
              </div>
              <div className="v2-fact v2-fact-wide">
                <div className="v2-fact-label">{t.calc.heating}</div>
                <div className="v2-fact-value">{c.heating === 'included' ? t.calc.heatIncluded : t.calc.heatSeparate}</div>
              </div>
            </div>

            <div className={`v2-compliance ${compliant ? 'ok' : 'warn'}`} key={compliant + ':' + displayCeiling}>
              <div className="v2-compliance-icon">
                {compliant ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                )}
              </div>
              <div>
                <div className="v2-compliance-title">
                  {compliant ? t.calc.compliant : `${t.calc.over} CHF ${chfV2(over)}`}
                </div>
                <div className="v2-compliance-body">
                  {compliant
                    ? `${c.authority} · ${cantonName} · ${size}${size === 5 ? '+' : ''} ${(lang === 'uk' ? 'осіб' : lang === 'de' ? 'Personen' : lang === 'it' ? 'persone' : 'personne(s)')}`
                    : t.calc.overNote}
                </div>
              </div>
            </div>

            <div className="v2-subsidiarity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold-2)', flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
              </svg>
              <span>{t.calc.subsidiarityNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CantonCalculatorV2, chfV2 });
