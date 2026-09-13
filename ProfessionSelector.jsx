// SwissRelief 2.6 / 2.7 — Emploi & Métiers CH-ISCO + Offres d'emploi vérifiées
// Intègre les 63 offres d'emploi en direct, la détection Art. 21a LEI, et l'assistant de lettre de motivation en français.

function JobLetterModal({ job, onClose, lang = 'fr', t }) {
  const [name, setName] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-name', '') : '');
  const [phone, setPhone] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-phone', '') : '');
  const [email, setEmail] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-email', '') : '');
  const [residence, setResidence] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-city', 'Morges (VD)') : 'Morges (VD)');
  const [permis, setPermis] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-permis', 'S-VD-2026') : 'S-VD-2026');
  const [frenchLevel, setFrenchLevel] = React.useState('B1');
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (window.safeSet) {
      if (name) window.safeSet('sr-cand-name', name);
      if (phone) window.safeSet('sr-cand-phone', phone);
      if (email) window.safeSet('sr-cand-email', email);
      if (residence) window.safeSet('sr-cand-city', residence);
      if (permis) window.safeSet('sr-cand-permis', permis);
    }
  }, [name, phone, email, residence, permis]);

  const todayStr = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' });
  }, []);

  const generatedLetter = React.useMemo(() => {
    const candidateDisp = name.trim() || '[Votre Prénom et Nom]';
    const phoneDisp = phone.trim() || '+41 79 000 00 00';
    const emailDisp = email.trim() || 'candidat.suisse@email.ch';
    const resDisp = residence.trim() || 'Morges (VD)';
    const permisDisp = permis.trim() || 'Permis S · Canton de Vaud';
    const compDisp = job.company || 'Entreprise suisse';
    const cityDisp = job.city || 'Suisse';
    const titleDisp = job.title || 'Poste proposé';
    const sbbDisp = job.sbb_min ? `${job.sbb_min} minutes` : '15 minutes';

    return `${candidateDisp}
${resDisp}
Tél. : ${phoneDisp} | Email : ${emailDisp}
Statut : Titulaire du Permis S (${permisDisp}) — Droit de travail immédiat

À l'attention du Service des Ressources Humaines
${compDisp}
${cityDisp}, Suisse

${cityDisp}, le ${todayStr}

Objet : Candidature au poste de : ${titleDisp}

Madame, Monsieur,

C'est avec un vif intérêt et une grande motivation que je vous soumets ma candidature pour le poste de ${titleDisp} au sein de votre établissement ${compDisp} à ${cityDisp}.

Actuellement domicilié(e) à ${resDisp}, je dispose d'une accessibilité directe et rapide à votre site (environ ${sbbDisp} via le réseau CFF), ce qui me garantit une parfaite ponctualité, une disponibilité rapide et une grande flexibilité opérationnelle.

Sur le plan administratif, je suis titulaire du statut de protection S (Permis S), lequel m'accorde l'autorisation d'exercer une activité lucrative immédiate en Suisse. L'engagement s'effectue selon la procédure cantonale simplifiée de simple déclaration préalable, sans contingentement, sans taxe pour l'employeur, et sans délai d'attente administratif (conformément aux directives SEM et à la législation fédérale LEI).

Rigoureux(se), volontaire et doté(e) d'une grande conscience professionnelle, j'ai à cœur de m'intégrer rapidement au sein de votre équipe. Je possède un niveau de français opérationnel (${frenchLevel}) me permettant de communiquer efficacement au quotidien et de respecter strictement l'ensemble de vos consignes opérationnelles et de sécurité.

Convaincu(e) de pouvoir apporter une contribution constructive et fiable à ${compDisp}, je me tiens à votre entière disposition pour un entretien à votre convenance.

Je vous remercie chaleureusement de l'attention que vous porterez à ma candidature et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.


${candidateDisp}`;
  }, [name, phone, email, residence, permis, frenchLevel, job, todayStr]);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 780 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>📄 Assistant Lettre de Motivation Suisse</h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>
              Candidature ciblée pour <strong>{job.company}</strong> · {job.title}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Nom & Prénom</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex. Olena Petrenko"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Téléphone</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+41 79 123 45 67"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre.email@domaine.ch"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Lieu de résidence actuel</label>
            <input
              type="text"
              value={residence}
              onChange={e => setResidence(e.target.value)}
              placeholder="ex. Morges (VD)"
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>N° Dossier Permis S</label>
            <input
              type="text"
              value={permis}
              onChange={e => setPermis(e.target.value)}
              placeholder="S-VD-..."
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11.5, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Niveau de français</label>
            <select
              value={frenchLevel}
              onChange={e => setFrenchLevel(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 8, background: 'rgba(2,6,15,.6)', border: '1px solid var(--line-2)', color: '#fff', fontSize: 13 }}
            >
              <option value="A2 (notions solides)">A2 (notions solides)</option>
              <option value="B1 (opérationnel)">B1 (opérationnel)</option>
              <option value="B2 (courant)">B2 (courant)</option>
              <option value="C1 (autonome)">C1 (autonome)</option>
            </select>
          </div>
        </div>

        <div style={{
          background: '#0B1220',
          border: '1px solid var(--line-2)',
          borderRadius: 12,
          padding: 18,
          maxHeight: '380px',
          overflowY: 'auto',
          fontFamily: 'var(--f-mono)',
          fontSize: 12.5,
          lineHeight: 1.6,
          color: '#E2E8F0',
          whiteSpace: 'pre-wrap',
          marginBottom: 20
        }}>
          {generatedLetter}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            className="btn ghost"
            onClick={onClose}
            style={{ padding: '8px 16px', fontSize: 13 }}
          >
            Fermer
          </button>
          <button
            className="btn primary"
            onClick={handleCopy}
            style={{ padding: '8px 20px', fontSize: 13, background: copied ? 'var(--emerald-2)' : undefined }}
          >
            {copied ? '✓ Copié dans le presse-papier !' : '📋 Copier la lettre'}
          </button>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, t, lang, onOpenLetter }) {
  const isStellen = !!job.stellen;
  const salaryStr = (job.salary_min && job.salary_max)
    ? `CHF ${window.chf ? window.chf(job.salary_min) : job.salary_min} – ${window.chf ? window.chf(job.salary_max) : job.salary_max}`
    : 'Selon CCT / Barème';

  return (
    <article className="h-card">
      <div style={{ padding: '16px 16px 8px', borderBottom: '1px solid var(--line-1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="regie-badge">
            <span className="dot" aria-hidden="true"></span>
            {job.company}
          </span>
          <span className={`compliance-badge ${isStellen ? 'warn' : ''}`}>
            {isStellen ? '⏳ Art. 21a LEI (délai ORP)' : '✓ Libre marché'}
          </span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-0)', margin: '4px 0 6px', lineHeight: 1.35 }}>
          {job.title}
        </h3>
        <div style={{ fontSize: 12.5, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📍 {job.city}</span>
          <span className="v2-mono-tag">{job.canton}</span>
          <span style={{ color: 'var(--muted)', fontSize: 11.5 }}>· {job.workload_min}%–{job.workload_max}%</span>
        </div>
      </div>

      <div className="h-body" style={{ padding: '12px 16px' }}>
        <div className="h-price-row">
          <div className="h-price" style={{ fontSize: 18 }}>
            {salaryStr}
            <span className="per">/ {lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'}</span>
          </div>
        </div>

        <div className="sbb-pill" style={{ margin: '4px 0' }}>
          <span className="ico"><Ico.train/></span>
          <span><span className="min">{job.sbb_min || 12}</span> min de Morges / Lausanne (CFF)</span>
        </div>

        <div style={{
          fontSize: 11.5,
          color: 'var(--muted)',
          padding: '6px 10px',
          background: 'rgba(16,185,129,.06)',
          border: '1px solid rgba(16,185,129,.20)',
          borderRadius: 6,
          lineHeight: 1.4
        }}>
          🟢 <strong>Permis S :</strong> Autorisation d'embauche immédiate sans contingent ni taxe employeur.
        </div>
      </div>

      <div className="h-actions" style={{ padding: '10px 16px 14px' }}>
        <button
          className="btn primary"
          onClick={() => onOpenLetter(job)}
          style={{ flex: '1 1 140px', minHeight: 38, fontSize: 12.5 }}
        >
          <Ico.file/> 📄 Lettre de motivation
        </button>
        <button
          className="btn ghost"
          onClick={() => window.open(job.url || 'https://www.job-room.ch', '_blank')}
          style={{ flex: '1 1 110px', minHeight: 38, fontSize: 12.5 }}
        >
          <Ico.external/> Voir l'offre
        </button>
      </div>
    </article>
  );
}

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
  const [subTab, setSubTab] = React.useState('offers'); // 'offers' | 'radar'
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCanton, setSelectedCanton] = React.useState('ALL');
  const [selectedStatus, setSelectedStatus] = React.useState('ALL'); // 'ALL' | 'FREE' | 'STELLEN'
  const [limit, setLimit] = React.useState(9);
  const [activeLetterJob, setActiveLetterJob] = React.useState(null);

  // Load verified job listings from data layer
  const rawJobs = React.useMemo(() => {
    return (window.JOB_LISTINGS || window.SR_JOBS || []);
  }, []);

  // Filtered live jobs
  const filteredJobs = React.useMemo(() => {
    return rawJobs.filter(j => {
      if (selectedCanton !== 'ALL' && j.canton !== selectedCanton) return false;
      if (selectedStatus === 'FREE' && j.stellen) return false;
      if (selectedStatus === 'STELLEN' && !j.stellen) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = (j.title && j.title.toLowerCase().includes(q)) ||
                      (j.company && j.company.toLowerCase().includes(q)) ||
                      (j.city && j.city.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [rawJobs, selectedCanton, selectedStatus, searchQuery]);

  // Deep-link check: if URL has ?job=<id>, auto-open letter modal for that job
  React.useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const targetJobId = p.get('job');
      if (targetJobId && rawJobs.length > 0) {
        const found = rawJobs.find(j => j.id === targetJobId);
        if (found) {
          setActiveLetterJob(found);
          setSubTab('offers');
        }
      }
    } catch (e) {}
  }, [rawJobs]);

  // CH-ISCO Radar sectors
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
    <section id="prof" className="v2-section" style={{ background: 'rgba(15,23,42,.35)' }}>
      <div className="v2-container">
        <div className="v2-section-head" style={{ marginBottom: 20 }}>
          <span className="v2-eyebrow">{t.prof?.eyebrow || "MODULE 02 · EMPLOI & INSERTION"}</span>
          <h2 className="v2-section-title">
            {lang === 'uk' ? 'Каталог вакансій та професії CH-ISCO'
             : lang === 'de' ? 'Stellenkatalog & CH-ISCO Berufe'
             : lang === 'it' ? 'Catalogo offerte & Professioni CH-ISCO'
             : "Offres d'emploi vérifiées & Métiers CH-ISCO"}
          </h2>
          <p className="v2-section-sub">
            {lang === 'uk'
             ? 'Офіційні пропозиції роботи в Romandie, помічник складання мотиваційних листів за нормами Швейцарії та радар зарплат.'
             : lang === 'de'
             ? 'Verifizierte Stellen in der Westschweiz, Schweizer Bewerbungsschreiben-Assistent und Lohn-Radar.'
             : lang === 'it'
             ? 'Offerte verificate in Romandia, generatore di lettere di motivazione e radar salariale.'
             : "Offres réelles en Suisse romande, assistant de lettre de motivation selon les normes RH suisses, et radar des salaires CCNT."}
          </p>
        </div>

        {/* SUB-TABS: Offres d'emploi VS Grille Salariale */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderBottom: '1px solid var(--line-2)', paddingBottom: 12 }}>
          <button
            className={`btn ${subTab === 'offers' ? 'primary' : 'ghost'}`}
            onClick={() => setSubTab('offers')}
            style={{ padding: '8px 18px', fontSize: 13.5, fontWeight: 700 }}
          >
            💼 {lang === 'uk' ? `Вакансії (${rawJobs.length})` : lang === 'de' ? `Stellen (${rawJobs.length})` : `Offres d'emploi (${rawJobs.length})`}
          </button>
          <button
            className={`btn ${subTab === 'radar' ? 'primary' : 'ghost'}`}
            onClick={() => setSubTab('radar')}
            style={{ padding: '8px 18px', fontSize: 13.5, fontWeight: 700 }}
          >
            📊 {lang === 'uk' ? 'Тарифна сітка CH-ISCO' : lang === 'de' ? 'Lohntabelle CH-ISCO' : 'Grille salariale CH-ISCO'}
          </button>
        </div>

        {subTab === 'offers' && (
          <div>
            {/* Filter controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 20 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={lang === 'uk' ? 'Пошук посади, компанії чи міста...' : "Rechercher un poste, employeur ou ville..."}
                style={{
                  flex: '1 1 240px',
                  padding: '9px 14px',
                  borderRadius: 10,
                  background: 'rgba(2,6,15,.6)',
                  border: '1px solid var(--line-2)',
                  color: '#fff',
                  fontSize: 13.5
                }}
              />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['ALL', 'VD', 'BE', 'BS', 'ZH'].map(c => (
                  <button
                    key={c}
                    className={`amount-chip ${selectedCanton === c ? 'active' : ''}`}
                    onClick={() => setSelectedCanton(c)}
                    style={{ fontSize: 12, padding: '6px 12px' }}
                  >
                    {c === 'ALL' ? (lang === 'uk' ? 'Усі кантони' : 'Tous cantons') : c}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button
                  className={`amount-chip ${selectedStatus === 'ALL' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('ALL')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  {lang === 'uk' ? 'Усі статуси' : 'Tous statuts'}
                </button>
                <button
                  className={`amount-chip ${selectedStatus === 'FREE' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('FREE')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  ✓ {lang === 'uk' ? 'Вільні' : 'Libre marché'}
                </button>
                <button
                  className={`amount-chip ${selectedStatus === 'STELLEN' ? 'active' : ''}`}
                  onClick={() => setSelectedStatus('STELLEN')}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  ⏳ Art. 21a LEI
                </button>
              </div>
            </div>

            {/* Job Grid */}
            <div className="housing-list">
              {filteredJobs.slice(0, limit).map(j => (
                <JobCard
                  key={j.id}
                  job={j}
                  t={t}
                  lang={lang}
                  onOpenLetter={(item) => setActiveLetterJob(item)}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                {lang === 'uk' ? 'Жодної вакансії не знайдено за заданими фільтрами.' : "Aucune offre ne correspond aux critères sélectionnés."}
              </div>
            )}

            {limit < filteredJobs.length && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button
                  className="btn ghost"
                  style={{ padding: '12px 28px', fontSize: 14, fontWeight: 600 }}
                  onClick={() => setLimit(prev => prev + 9)}
                >
                  {lang === 'uk'
                    ? `Показати більше вакансій (ще ${filteredJobs.length - limit}) ↓`
                    : `Afficher plus d'offres (encore ${filteredJobs.length - limit}) ↓`}
                </button>
              </div>
            )}
          </div>
        )}

        {subTab === 'radar' && (
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

            {anyStellen && (
              <div className="v2-stellen-alert" role="note">
                <span className="v2-stellen-badge">Art. 21a LEI</span>
                <div className="v2-stellen-body">
                  <div className="v2-stellen-title">{t.prof?.stellenTitle || "Profession soumise à l'obligation d'annoncer (Art. 21a LEI)"}</div>
                  <div className="v2-stellen-text">{t.prof?.stellenBody || "Taux de chômage national ≥ 5%. Le poste doit être réservé aux inscrits ORP pendant 5 jours ouvrables."}</div>
                </div>
              </div>
            )}

            <div className="v2-prof-table-wrap">
              <table className="v2-prof-table">
                <thead>
                  <tr>
                    <th>ISCO</th>
                    <th>{t.prof?.titleCol || "Intitulé du poste"}</th>
                    <th>{t.prof?.qualif || "Qualification"}</th>
                    <th style={{ textAlign: 'right' }}>{t.prof?.salary || "Fourchette CCNT"}</th>
                    <th>{t.prof?.stellenCol || "Statut"}</th>
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
                          CHF {window.chf ? window.chf(j.salary[0]) : j.salary[0]} – {window.chf ? window.chf(j.salary[1]) : j.salary[1]}
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
        )}

        {/* Modal for Swiss Motivation Letter */}
        {activeLetterJob && (
          <JobLetterModal
            job={activeLetterJob}
            onClose={() => setActiveLetterJob(null)}
            lang={lang}
            t={t}
          />
        )}
      </div>
    </section>
  );
}

Object.assign(window, { ProfessionSelector, JobCard, JobLetterModal });
