// SwissRelief · Pan-Swiss 2.6 — Housing Cards (source-agnostic)
// Attribution factuelle aux régies sans mention de portails tiers (Art. 5 LCD/UWG)

function HousingCard({ item, t, lang, onGenerate }) {
  const compOk = item.compliance.ok;
  const isPrivate = item.regieType === 'private';

  return (
    <article className="h-card">
      <div className="h-photo">
        <div className="badges">
          <span className={`regie-badge ${isPrivate ? 'priv' : ''}`}>
            <span className="dot" aria-hidden="true"></span>
            {item.regie}
          </span>
          <span className={`compliance-badge ${compOk ? '' : 'warn'}`}>
            {compOk ? '✓' : '!'} EVAM
          </span>
        </div>
        <div className="placeholder">{item.photoCaption}</div>
      </div>

      <div className="h-body">
        <div className="h-price-row">
          <div className="h-price">
            <span className="cur">CHF</span>{window.chf(item.price)}
            <span className="per">/ {lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'}</span>
          </div>
          <div className="h-loc">
            {item.city[lang]} <span className="canton">· {item.canton}</span>
          </div>
        </div>

        <div className="h-title">{item.title[lang]}</div>

        <div className="sbb-pill">
          <span className="ico"><Ico.train/></span>
          <span><span className="min">{item.sbb.minutes}</span> min → {item.sbb.city}</span>
          <span className="swap">{t.housing.changes(item.sbb.changes)}</span>
        </div>

        <div style={{
          fontSize: 11.5, color: 'var(--muted)',
          padding: '6px 10px',
          background: 'rgba(16,185,129,.06)',
          border: '1px solid rgba(16,185,129,.20)',
          borderRadius: 6,
          lineHeight: 1.4
        }}>
          🟢 {item.compliance.note[lang]}
        </div>
      </div>

      <div className="h-actions">
        <button className="btn primary" onClick={() => onGenerate(item)}>
          <Ico.file/> {t.housing.generate}
        </button>
        <button className="btn ghost">
          <Ico.train/> {t.housing.sbb}
        </button>
      </div>
    </article>
  );
}

function HousingSection({ t, lang, canton, onGenerate }) {
  const items = React.useMemo(() => {
    return (window.SR_HOUSING || window.HOUSING_LISTINGS || []).filter(h => canton === 'ALL' || h.canton === canton || canton === 'VD');
  }, [canton]);

  return (
    <section id="housing" className="block" style={{background: 'rgba(15,23,42,.25)'}}>
      <div className="container">
        <span className="section-eyebrow">{t.housing.eyebrow}</span>
        <h2 className="section-title">{t.housing.title}</h2>
        <p className="section-sub">{t.housing.lede}</p>

        <div className="housing-list">
          {items.map(it => (
            <HousingCard key={it.id} item={it} t={t} lang={lang} onGenerate={onGenerate}/>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HousingCard, HousingSection });
