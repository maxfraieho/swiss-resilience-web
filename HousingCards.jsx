// SwissRelief · Pan-Swiss 2.6 — Housing Cards (source-agnostic)
// Attribution factuelle aux régies sans mention de portails tiers (Art. 5 LCD/UWG)

function HousingCard({ item, t, lang, onGenerate }) {
  const compOk = item.compliance?.ok ?? true;
  const isPrivate = item.regieType === 'private';
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <article className="h-card">
      <div className="h-photo">
        {item.image_url && !imgFailed ? (
          <img
            src={item.image_url}
            alt={item.title?.[lang] || item.title || "Logement Suisse"}
            className="h-photo-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : null}
        <div className="placeholder" style={{ display: (!item.image_url || imgFailed) ? 'flex' : 'none' }}>
          {item.photoCaption || (item.title && (item.title[lang] || item.title)) || "Logement Suisse"}
        </div>
        <div className="badges">
          <span className={`regie-badge ${isPrivate ? 'priv' : ''}`}>
            <span className="dot" aria-hidden="true"></span>
            {item.regie}
          </span>
          <span className={`compliance-badge ${compOk ? '' : 'warn'}`}>
            {compOk ? '✓' : '!'} EVAM
          </span>
        </div>
      </div>

      <div className="h-body">
        <div className="h-price-row">
          <div className="h-price">
            <span className="cur">CHF</span>{window.chf(item.price)}
            <span className="per">/ {lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'}</span>
          </div>
          <div className="h-loc">
            {item.city?.[lang] || item.city_name || "Vaud"} <span className="canton">· {item.canton}</span>
          </div>
        </div>

        <div className="h-title">{item.title?.[lang] || item.title}</div>

        <div className="sbb-pill">
          <span className="ico"><Ico.train/></span>
          <span><span className="min">{item.sbb?.minutes || 15}</span> min → {item.sbb?.city || "Gare"}</span>
          <span className="swap">{t.housing?.changes ? t.housing.changes(item.sbb?.changes || 0) : `${item.sbb?.changes || 0} corresp.`}</span>
        </div>

        <div style={{
          fontSize: 11.5, color: 'var(--muted)',
          padding: '6px 10px',
          background: 'rgba(16,185,129,.06)',
          border: '1px solid rgba(16,185,129,.20)',
          borderRadius: 6,
          lineHeight: 1.4
        }}>
          🟢 {item.compliance?.note?.[lang] || (item.compliance?.ok ? "100% conforme EVAM" : "Validation requise")}
        </div>
      </div>

      <div className="h-actions">
        <button className="btn primary" onClick={() => onGenerate(item)}>
          <Ico.file/> {t.housing?.generate || "Générer dossier"}
        </button>
        <button className="btn ghost" onClick={() => {
          const dest = encodeURIComponent(`${item.city?.[lang] || item.city_name || ''}`);
          window.open(`https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml?von=Morges&nach=${dest}`, '_blank');
        }}>
          <Ico.train/> {t.housing?.sbb || "Horaires SBB"}
        </button>
      </div>
    </article>
  );
}

function HousingSection({ t, lang, canton: propCanton, onGenerate }) {
  const [limit, setLimit] = React.useState(9);
  const [selectedCanton, setSelectedCanton] = React.useState(propCanton || 'ALL');

  React.useEffect(() => {
    if (propCanton) setSelectedCanton(propCanton);
  }, [propCanton]);

  React.useEffect(() => {
    setLimit(9);
  }, [selectedCanton]);

  const allItems = React.useMemo(() => {
    return (window.SR_HOUSING || window.HOUSING_LISTINGS || []);
  }, []);

  const availableCantons = React.useMemo(() => {
    const counts = { ALL: allItems.length };
    allItems.forEach(h => {
      if (h.canton) {
        counts[h.canton] = (counts[h.canton] || 0) + 1;
      }
    });
    // Cantons in order: ALL, VD, FR, VS, GE or any others present
    const standardOrder = ['ALL', 'VD', 'FR', 'VS', 'GE'];
    const extraCantons = Object.keys(counts).filter(c => !standardOrder.includes(c));
    const cantons = [...standardOrder, ...extraCantons].filter(c => c === 'ALL' || (counts[c] && counts[c] > 0));
    return { cantons, counts };
  }, [allItems]);

  const CANTON_LABELS = {
    VD: { fr: 'VD · Vaud', uk: 'VD · Во (Vaud)', de: 'VD · Waadt', it: 'VD · Vaud', en: 'VD · Vaud' },
    FR: { fr: 'FR · Fribourg', uk: 'FR · Фрібур (Fribourg)', de: 'FR · Freiburg', it: 'FR · Friburgo', en: 'FR · Fribourg' },
    VS: { fr: 'VS · Valais', uk: 'VS · Вале (Valais)', de: 'VS · Wallis', it: 'VS · Vallese', en: 'VS · Valais' },
    GE: { fr: 'GE · Genève', uk: 'GE · Женева (Genève)', de: 'GE · Genf', it: 'GE · Ginevra', en: 'GE · Geneva' }
  };

  const items = React.useMemo(() => {
    if (!selectedCanton || selectedCanton === 'ALL') return allItems;
    return allItems.filter(h => h.canton === selectedCanton);
  }, [selectedCanton, allItems]);

  const visibleItems = items.slice(0, limit);

  return (
    <section id="housing" className="block" style={{background: 'rgba(15,23,42,.25)', padding: '50px 0'}}>
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12, marginBottom: 20}}>
          <div>
            <span className="section-eyebrow" style={{ color: 'var(--swiss-red)', fontWeight: 700, letterSpacing: '0.1em' }}>
              {t.housing?.eyebrow || "LOGEMENT VÉRIFIÉ"}
            </span>
            <h2 className="section-title" style={{ color: '#fff', margin: '4px 0 8px' }}>
              {t.housing?.title || "Offres vérifiées en Romandie"}
            </h2>
            <p className="section-sub" style={{ color: 'var(--muted)', margin: 0 }}>
              {t.housing?.lede || "Directement attribué aux régies sans mention de portails tiers."}
            </p>
          </div>
          <div style={{
            fontSize: 12,
            fontFamily: 'var(--f-mono)',
            padding: '6px 12px',
            borderRadius: 8,
            background: 'rgba(56,189,248,.08)',
            border: '1px solid rgba(56,189,248,.25)',
            color: 'var(--sbb-blue)'
          }}>
            ⚡ {items.length} {lang === 'uk' ? 'пропозицій з реальними фото' : lang === 'de' ? 'Angebote mit echten Fotos' : lang === 'it' ? 'offerte con foto reali' : 'offres avec photos réelles'}
          </div>
        </div>

        {/* Canton filter chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }} role="tablist" aria-label="Filtre par canton">
          {availableCantons.cantons.map(c => (
            <button
              key={c}
              className={`btn ${selectedCanton === c ? 'primary' : 'ghost'}`}
              onClick={() => setSelectedCanton(c)}
              role="tab"
              aria-selected={selectedCanton === c}
              style={{
                fontSize: 12.5,
                padding: '6px 14px',
                borderRadius: 8,
                fontWeight: selectedCanton === c ? 700 : 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer'
              }}
            >
              <span>
                {c === 'ALL'
                  ? (lang === 'uk' ? 'Усі кантони' : lang === 'de' ? 'Alle Kantone' : lang === 'it' ? 'Tutti i cantoni' : 'Tous cantons')
                  : (CANTON_LABELS[c]?.[lang] || CANTON_LABELS[c]?.fr || c)}
              </span>
              <span style={{
                fontSize: 11,
                padding: '1px 6px',
                borderRadius: 10,
                background: selectedCanton === c ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)',
                color: selectedCanton === c ? '#fff' : 'var(--muted)',
                fontWeight: 700
              }}>
                {availableCantons.counts[c] || 0}
              </span>
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            background: 'rgba(15,23,42,0.4)',
            borderRadius: 16,
            border: '1px dashed var(--line-2)'
          }}>
            <p style={{ color: 'var(--muted)', fontSize: 15, margin: 0 }}>
              {lang === 'uk' ? 'Наразі немає активних пропозицій у цьому кантоні.' : 'Aucun logement actif pour ce canton actuellement.'}
            </p>
          </div>
        ) : (
          <div className="housing-list">
            {visibleItems.map(it => (
              <HousingCard key={it.id} item={it} t={t} lang={lang} onGenerate={onGenerate}/>
            ))}
          </div>
        )}

        {limit < items.length && (
          <div style={{textAlign: 'center', marginTop: 32}}>
            <button
              className="btn ghost"
              style={{padding: '12px 28px', fontSize: 14, fontWeight: 600}}
              onClick={() => setLimit(prev => prev + 9)}
            >
              {lang === 'uk'
                ? `Показати більше пропозицій (ще ${items.length - limit}) ↓`
                : lang === 'de'
                ? `Mehr Wohnungen anzeigen (noch ${items.length - limit}) ↓`
                : lang === 'it'
                ? `Mostra più alloggi (altri ${items.length - limit}) ↓`
                : `Afficher plus de logements (encore ${items.length - limit}) ↓`
              }
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { HousingCard, HousingSection });
