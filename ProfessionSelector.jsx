// SwissRelief 2.6 — CH-ISCO profession radar (Side A)
// Connected to all 15 sectors from window.SECTORS with localized titles, salaries, and Art. 21a LEI tags.
// Fixed stellen-alert stacking: column on mobile, row on desktop (ADR-017 anomaly #3).
const SECTORS_FALLBACK = [
  {
    id: 'HOSP',
    label: 'Hôtellerie & Restauration',
    jobs: [
      { isco: '9412', stellen: true,  qualif: 'Sans qualif.', salary: [3713, 4100], title: 'Aide de cuisine',       cat: 'Cuisine' },
      { isco: '5120', stellen: true,  qualif: 'CFC',          salary: [4528, 5200], title: 'Cuisinier',              cat: 'Cuisine' },
      { isco: '5131', stellen: true,  qualif: 'CFC',          salary: [4300, 5000], title: 'Serveur / Kellner',      cat: 'Service' },
      { isco: '1412', stellen: false, qualif: 'Tertiaire',    salary: [5293, 6800], title: 'Chef de cuisine',        cat: 'Cuisine' },
    ]
  },
  {
    id: 'CONST',
    label: 'Bâtiment & Génie civil',
    jobs: [
      { isco: '9313', stellen: true,  qualif: 'Sans qualif.', salary: [4500, 4900], title: 'Manœuvre de construction', cat: 'Gros-œuvre' },
      { isco: '7112', stellen: true,  qualif: 'CFC',          salary: [5300, 6100], title: 'Maçon',                    cat: 'Gros-œuvre' },
      { isco: '7115', stellen: true,  qualif: 'CFC',          salary: [5200, 6000], title: 'Charpentier / Menuisier',  cat: 'Second-œuvre' },
    ]
  },
  {
    id: 'HEALTH',
    label: 'Santé & Soins',
    jobs: [
      { isco: '5322', stellen: false, qualif: 'AFP',       salary: [4500, 5100], title: 'Assistante en soins (ASA/ASSC)', cat: 'Soins' },
      { isco: '2221', stellen: false, qualif: 'Tertiaire', salary: [6200, 7800], title: 'Infirmier·ère diplômé·e HF',      cat: 'Soins' },
    ]
  },
  {
    id: 'LOG',
    label: 'Logistique & Transport',
    jobs: [
      { isco: '9333', stellen: false, qualif: 'Sans qualif.', salary: [4100, 4600], title: 'Manutentionnaire',        cat: 'Magasinage' },
      { isco: '4321', stellen: false, qualif: 'CFC',          salary: [4700, 5500], title: 'Logisticien CFC',         cat: 'Magasinage' },
      { isco: '8332', stellen: false, qualif: 'CFC',          salary: [4800, 5600], title: 'Chauffeur poids lourd',   cat: 'Conduite' },
    ]
  },
];

function ProfessionSelector({ t, lang = 'fr' }) {
  const rawSectors = (typeof window !== 'undefined' && Array.isArray(window.SECTORS) && window.SECTORS.length > 0)
    ? window.SECTORS
    : null;

  const sectors = React.useMemo(() => {
    if (!rawSectors) return SECTORS_FALLBACK;
    return rawSectors.map(s => {
      const label = (s.labels && (s.labels[lang] || s.labels.fr)) || s.label || s.id;
      const jobs = (s.categories || []).flatMap(c => {
        const catName = (c.labels && (c.labels[lang] || c.labels.fr)) || c.id;
        return (c.jobs || []).map(j => ({
          isco: j.isco || '',
          stellen: !!j.stellen,
          qualif: j.qualif || 'CFC',
          salary: j.salary || [4500, 5500],
          title: (j.titles && (j.titles[lang] || j.titles.fr)) || j.title || '',
          cat: catName
        }));
      });
      return { id: s.id, label, jobs: jobs.length > 0 ? jobs : (SECTORS_FALLBACK[0].jobs) };
    });
  }, [rawSectors, lang]);

  const [sectorId, setSectorId] = React.useState(sectors[0]?.id || 'HOSP');
  const sector = sectors.find(s => s.id === sectorId) || sectors[0];
  const anyStellen = sector && sector.jobs && sector.jobs.some(j => j.stellen);

  return (
    <section id="prof" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.prof.eyebrow}</span>
          <h2 className="v2-section-title">{t.prof.title}</h2>
          <p className="v2-section-sub">{t.prof.lede}</p>
        </div>

        <div className="v2-card v2-prof-card">
          <div className="v2-prof-tabs" role="tablist" aria-label="Secteurs CH-ISCO-19">
            {sectors.map(s => (
              <button
                key={s.id}
                role="tab"
                aria-selected={sectorId === s.id}
                className={`v2-prof-tab ${sectorId === s.id ? 'active' : ''}`}
                onClick={() => setSectorId(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* THE ANOMALY-3 FIX: stellen-alert is flex-direction: column on mobile, row on desktop */}
          {anyStellen && (
            <div className="v2-stellen-alert" role="note">
              <span className="v2-stellen-badge">Art. 21a LEI</span>
              <div className="v2-stellen-body">
                <div className="v2-stellen-title">{t.prof.stellenTitle}</div>
                <div className="v2-stellen-text">{t.prof.stellenBody}</div>
              </div>
            </div>
          )}

          <div className="v2-prof-table-wrap">
            <table className="v2-prof-table">
              <thead>
                <tr>
                  <th>ISCO</th>
                  <th>{t.prof.titleCol}</th>
                  <th>{t.prof.qualif}</th>
                  <th style={{ textAlign: 'right' }}>{t.prof.salary}</th>
                  <th>{t.prof.stellenCol}</th>
                </tr>
              </thead>
              <tbody>
                {sector.jobs.map((j, i) => (
                  <tr key={j.isco + '-' + i}>
                    <td><span className="v2-mono-tag">{j.isco}</span></td>
                    <td>
                      <div className="v2-job-title">{j.title}</div>
                      <div className="v2-job-cat">{j.cat}</div>
                    </td>
                    <td>
                      <span className={`v2-qbadge ${j.qualif === 'Sans qualif.' ? 'none' : j.qualif === 'AFP' ? 'afp' : j.qualif === 'Tertiaire' ? 'sup' : 'cfc'}`}>
                        {j.qualif}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="v2-salary-range">
                        CHF {chfV2(j.salary[0])} – {chfV2(j.salary[1])}
                      </span>
                    </td>
                    <td>
                      {j.stellen ? (
                        <span className="v2-status-pill warn" title="Priorité ORP / RAV 5 jours">
                          ● Art. 21a LEI
                        </span>
                      ) : (
                        <span className="v2-status-pill free" title="Marché libre">
                          Libre
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProfessionSelector });
