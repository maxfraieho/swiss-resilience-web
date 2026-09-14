// ACCORD-S · Landing Page — v2.7
// Double parcours : Bénéficiaires (Permis S) + Bénévoles Suisses
// Emploi vérifié · Logement · Mentorat · Bot Telegram entonnoir

const { useState, useMemo, useCallback, useEffect } = React;

/* ==================== BRAND MARK (violin f-hole S + Swiss + + emerald sweep) ==================== */
function BrandMark({ size = 40 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size, borderRadius: Math.round(size * 0.25) }}>
      <svg viewBox="0 0 40 40" width={Math.round(size * 0.65)} height={Math.round(size * 0.65)} aria-hidden="true">
        {/* Swiss cross center */}
        <rect x="17.5" y="10" width="5" height="20" rx="0.6" fill="white"/>
        <rect x="10" y="17.5" width="20" height="5" rx="0.6" fill="white"/>
        {/* Musical S curve (violin f-hole hint) — top loop */}
        <path
          d="M14 6c-3.5 1.6-4.5 6.4-1.5 8.6"
          stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" strokeLinecap="round" fill="none"
        />
        {/* Bottom loop */}
        <path
          d="M26 34c3.5-1.6 4.5-6.4 1.5-8.6"
          stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" strokeLinecap="round" fill="none"
        />
        {/* Emerald harmony sweep — the accord check */}
        <path
          d="M8 30c4 3 10 3.5 15 2.5"
          stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" fill="none"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

/* ==================== I18N (light — FR primary + snippets) ==================== */
const I18N = {
  fr: {
    banner: "26 cantons · 4 langues · Conforme SEM / SECO · Bot Telegram opérationnel",
    nav: { pillars: "Pourquoi ACCORD", jobs: "Emplois", mentors: "Bénévoles", assistant: "Assistant IA" },
    hero: {
      pill: "L'ACCORD SUISSE · PERMIS S · GRATUIT",
      title1: "Votre passerelle d'action pour",
      title2: "logement, emploi et communauté.",
      lede: "ACCORD élimine la bureaucratie et l'attente. Alertes Telegram en 60s, lettres de motivation aux normes suisses et jumelage avec des mentors bénévoles — depuis votre smartphone, sans intermédiaire.",
      ctaBot: "Lancer ACCORD sur Telegram",
      ctaApp: "Ouvrir la Mini App",
      reassure: "100% Gratuit",
      reassure2: "Sans inscription complexe",
      reassure3: "Conforme LSE · Art. 262 CO",
    },
    tabs: {
      seekers: "Bénéficiaires · Permis S",
      seekersSub: "Emploi, logement, dossier de bail",
      volunteers: "Bénévoles suisses",
      volunteersSub: "Mentorat & hôtes solidaires",
    },
    trust: [
      { k: "Cantons couverts", v: "26 / 26", d: "Barèmes officiels de la Confédération" },
      { k: "Réactivité alertes", v: "< 60 sec", d: "Notification Telegram en direct" },
      { k: "Employeurs vérifiés", v: "63 offres", d: "Direct, sans agrégateur tiers · Art. 5 LCD" },
      { k: "Mentors actifs", v: "148+", d: "Réseau Benevol Suisse en croissance" },
    ],
  }
};

/* ==================== TOP BANNER + NAV ==================== */
function TopBanner({ t }) {
  return (
    <div className="top-banner" role="status">
      <div className="top-banner-inner">
        <span className="pulse-dot" aria-hidden="true"/>
        <span>{t.banner}</span>
      </div>
    </div>
  );
}

function Nav({ lang, setLang, t }) {
  const langs = [
    { id: 'fr', label: 'FR', flag: '🇫🇷' },
    { id: 'de', label: 'DE', flag: '🇩🇪' },
    { id: 'uk', label: 'UK', flag: '🇺🇦' },
    { id: 'en', label: 'EN', flag: '🇬🇧' },
  ];
  return (
    <header className="nav" role="banner">
      <div className="nav-row">
        <a href="#top" className="brand" aria-label="ACCORD Suisse">
          <BrandMark size={40}/>
          <div className="brand-text">
            <span className="brand-name">ACCORD <em>Suisse</em></span>
            <span className="brand-tag">L'ACCORD · v2.7</span>
          </div>
        </a>

        <nav className="nav-mid" aria-label="Sections">
          <div className="nav-links">
            <a className="nav-link" href="#pillars">{t.nav.pillars}</a>
            <a className="nav-link" href="#jobs">{t.nav.jobs}</a>
            <a className="nav-link" href="#mentors">{t.nav.mentors}</a>
            <a className="nav-link" href="#assistant">{t.nav.assistant}</a>
          </div>
        </nav>

        <div className="nav-actions">
          <div className="lang-toggle" role="radiogroup" aria-label="Langue">
            {langs.map(l => (
              <button
                key={l.id}
                className={`lang-btn ${lang === l.id ? 'active' : ''}`}
                role="radio"
                aria-checked={lang === l.id}
                onClick={() => setLang(l.id)}
              >
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_nav"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-tg"
            style={{ padding: '8px 14px', fontSize: 12.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>@SwissResilienceHubBot</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ==================== HERO ==================== */
function Hero({ side, setSide, t }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-pill">
          <span className="pulse-dot" aria-hidden="true"/>
          <span>{t.hero.pill}</span>
        </div>
        <h1 className="hero-title">
          {t.hero.title1}<br/>
          <span className="hero-accent">{t.hero.title2}</span>
        </h1>
        <p className="hero-sub">{t.hero.lede}</p>

        <div className="hero-cta-row">
          <a
            href="https://t.me/SwissResilienceHubBot?start=seeker"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>{t.hero.ctaBot}</span>
          </a>
          <a
            href="https://violin-integration.works/app/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="3"/></svg>
            <span>{t.hero.ctaApp}</span>
          </a>
        </div>

        <div className="hero-reassure">
          <span className="check">✓</span>
          <span>{t.hero.reassure}</span>
          <span className="sep">·</span>
          <span>{t.hero.reassure2}</span>
          <span className="sep">·</span>
          <span>{t.hero.reassure3}</span>
        </div>

        <div className="side-tabs" role="tablist" aria-label="Public cible">
          <button
            className={`side-tab side-a ${side === 'a' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'a'}
            onClick={() => setSide('a')}
          >
            <span className="side-tab-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="side-tab-body">
              <span className="side-tab-label">{t.tabs.seekers}</span>
              <span className="side-tab-sub">{t.tabs.seekersSub}</span>
            </span>
          </button>
          <button
            className={`side-tab side-b ${side === 'b' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'b'}
            onClick={() => setSide('b')}
          >
            <span className="side-tab-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <span className="side-tab-body">
              <span className="side-tab-label">{t.tabs.volunteers}</span>
              <span className="side-tab-sub">{t.tabs.volunteersSub}</span>
            </span>
          </button>
        </div>

        <div className="trust-grid">
          {t.trust.map((m, i) => (
            <div key={i} className={`trust-tile rail-${['emerald','crimson','gold','blue'][i % 4]}`}>
              <div className="trust-label">{m.k}</div>
              <div className="trust-value">{m.v}</div>
              <div className="trust-desc">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== PILLARS 2x2 ==================== */
const PILLARS = [
  {
    idx: '01',
    cls: 'pillar-1',
    icon: '⚡',
    title: 'La réactivité qui change tout',
    body: "Des alertes Telegram déclenchées en moins de 60 secondes après chaque nouvelle offre validée. Postulez avant la saturation des candidatures — l'écart concurrentiel décisif en Suisse.",
    kpi: { n: '< 60 s', l: 'délai alerte' },
  },
  {
    idx: '02',
    cls: 'pillar-2',
    icon: '🤖',
    title: 'Co-pilote IA suisse · 24/7',
    body: "Relecture de CV aux standards helvétiques, lettre de motivation en français romand adaptée à chaque poste, et constitution automatisée du dossier de bail (poursuites, attestation EVAM).",
    kpi: { n: 'Claude · GPT', l: 'modèles suisses' },
  },
  {
    idx: '03',
    cls: 'pillar-3',
    icon: '🤝',
    title: 'Mentors & bénévoles suisses',
    body: "Jumelage bienveillant avec des résidentes et résidents locaux qui vous accompagnent — CV, visite d'appartement, entretien d'embauche. Cadre juridique Art. 394 CO · standards Benevol Suisse.",
    kpi: { n: '148+', l: 'mentors actifs' },
  },
  {
    idx: '04',
    cls: 'pillar-4',
    icon: '🛡️',
    title: 'Respect total & sécurité',
    body: "Zéro spam, zéro doublon, conformité aux barèmes officiels de chaque canton et gratuité totale selon la LSE. Vos données restent souveraines — infrastructure hébergée en Suisse.",
    kpi: { n: 'LPD · LSE', l: 'conformité' },
  },
];

function Pillars() {
  return (
    <section className="section" id="pillars">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow crimson">
            <span>◆</span> Pourquoi ACCORD ?
          </span>
          <h2 className="section-title">Quatre piliers de confiance, sans jargon.</h2>
          <p className="section-sub">Un outil d'émancipation direct — dans l'esprit de <em>Дія</em> — pensé pour la réalité suisse : rapidité, précision juridique et dignité.</p>
        </div>

        <div className="pillars">
          {PILLARS.map(p => (
            <article key={p.idx} className={`pillar ${p.cls}`}>
              <div className="pillar-glow" aria-hidden="true"/>
              <div className="pillar-head">
                <div className="pillar-icon" aria-hidden="true">{p.icon}</div>
                <div>
                  <div className="pillar-index">Pilier {p.idx}</div>
                </div>
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
              <div className="pillar-kpi">
                <span className="pillar-kpi-num">{p.kpi.n}</span>
                <span className="pillar-kpi-lbl">{p.kpi.l}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== JOB CATALOGUE ==================== */
const JOBS = [
  {
    id: 'j1',
    title: "Opérateur d'assemblage micromécanique — salle blanche (h/f)",
    company: 'Medtronic Tolochenaz Sàrl',
    initials: 'MT',
    city: 'Tolochenaz',
    canton: 'VD',
    salaryMin: 4350, salaryMax: 5833,
    stellen: false,
    sbb: 7, sbbFrom: 'Morges',
    workload: '80–100 %',
  },
  {
    id: 'j2',
    title: 'Agent logistique · préparateur de commandes (h/f/d)',
    company: 'Decathlon Logistics Etoy',
    initials: 'DL',
    city: 'Etoy', canton: 'VD',
    salaryMin: 4333, salaryMax: 5667,
    stellen: false,
    sbb: 12, sbbFrom: 'Lausanne',
    workload: '100 %',
  },
  {
    id: 'j3',
    title: 'Technicien SAV hardware & reconditionnement informatique',
    company: 'ReTech Solutions Suisse SA',
    initials: 'RT',
    city: 'Morges', canton: 'VD',
    salaryMin: 4600, salaryMax: 5900,
    stellen: false,
    sbb: 7, sbbFrom: 'Lausanne',
    workload: '80–100 %',
  },
  {
    id: 'j4',
    title: 'Application Manager SAP PP/QM',
    company: 'BELIMO Automation AG',
    initials: 'BA',
    city: 'Hinwil', canton: 'ZH',
    salaryMin: 6800, salaryMax: 8500,
    stellen: true,
    sbb: 24, sbbFrom: 'Zürich HB',
    workload: '80–100 %',
  },
  {
    id: 'j5',
    title: 'Product Designer · Peripherals & Ecosystem',
    company: 'Logitech Europe SA',
    initials: 'LG',
    city: 'Lausanne', canton: 'VD',
    salaryMin: 7200, salaryMax: 9200,
    stellen: true,
    sbb: 4, sbbFrom: 'Lausanne',
    workload: '100 %',
  },
  {
    id: 'j6',
    title: 'Aide-soignant EMS · nuit (CFC ou expérience validée)',
    company: 'EMS La Colombière · Vaud',
    initials: 'LC',
    city: 'Nyon', canton: 'VD',
    salaryMin: 4650, salaryMax: 5250,
    stellen: false,
    sbb: 3, sbbFrom: 'Nyon',
    workload: '60–80 %',
  },
];

function formatCHF(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function JobCard({ job }) {
  const stellen = job.stellen;
  const openLetter = () => {
    window.open(`https://t.me/SwissResilienceHubBot?start=letter_${job.id}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <article className="job-card">
      <div className="job-badges">
        {stellen ? (
          <span className="badge badge-gold">
            <span className="badge-dot" aria-hidden="true"/>
            Délai ORP 5 j · Art. 21a LEI
          </span>
        ) : (
          <span className="badge badge-emerald">
            <span className="badge-dot" aria-hidden="true"/>
            Embauche immédiate · Art. 17 LEI
          </span>
        )}
        <span className="badge badge-neutral">Permis S ✓</span>
      </div>

      <h3 className="job-title">{job.title}</h3>

      <div className="job-company">
        <div className="company-logo" aria-hidden="true">{job.initials}</div>
        <span>{job.company}</span>
      </div>

      <div className="job-salary">
        <span>
          <span style={{ color: 'var(--muted)', fontSize: 12, marginRight: 6 }}>CHF</span>
          {formatCHF(job.salaryMin)} – {formatCHF(job.salaryMax)}
        </span>
        <span className="job-salary-per">/ mois · CCT</span>
      </div>

      <div className="job-meta">
        <span className="item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M8 3v4M16 3v4"/><path d="M8 21l-2 2M16 21l2 2"/></svg>
          <strong style={{ color: 'var(--fg)' }}>{job.sbb} min</strong>
          <span style={{ color: 'var(--muted)' }}>· {job.sbbFrom}</span>
        </span>
        <span style={{ color: 'var(--muted-2)' }}>·</span>
        <span className="canton-tag">{job.canton}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{job.workload}</span>
      </div>

      <div className="job-actions">
        <button className="job-btn-primary" onClick={openLetter}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
          Générer lettre suisse
        </button>
        <a
          className="job-btn-ghost"
          href={`https://www.job-room.ch/job-advertisements/${job.id}`}
          target="_blank" rel="noopener noreferrer"
          aria-label="Voir l'annonce officielle"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
        </a>
      </div>
    </article>
  );
}

const CANTONS = ['Tous', 'VD', 'GE', 'ZH', 'BE', 'FR'];

function JobsSection() {
  const [filter, setFilter] = useState('Tous');
  const visible = useMemo(() => filter === 'Tous' ? JOBS : JOBS.filter(j => j.canton === filter), [filter]);

  return (
    <section className="section section-alt" id="jobs">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow emerald">
            <span>▲</span> Emploi vérifié · Art. 17 & 21a LEI
          </span>
          <h2 className="section-title">Offres d'employeurs suisses. Direct. Sans intermédiaire.</h2>
          <p className="section-sub">Chaque annonce est attribuée à son employeur d'origine — aucun agrégateur tiers (Art. 5 LCD/UWG). Salaires selon CCT, trajet CFF réel, statut légal transparent.</p>
        </div>

        <div className="jobs-toolbar">
          <div className="filter-pills" role="tablist" aria-label="Filtrer par canton">
            {CANTONS.map(c => (
              <button
                key={c}
                className={`filter-pill ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
                role="tab"
                aria-selected={filter === c}
              >
                {c === 'Tous' ? 'Tous les cantons' : c}
              </button>
            ))}
          </div>
          <div className="jobs-count">⚡ {visible.length} offres actives · mise à jour {'<'} 60 s</div>
        </div>

        <div className="jobs-grid">
          {visible.map(j => <JobCard key={j.id} job={j}/>)}
        </div>
      </div>
    </section>
  );
}

/* ==================== VOLUNTEER (BÉNÉVOLES) ==================== */
const TRACKS = [
  {
    n: '01',
    icon: '📄',
    title: 'Mentorat emploi',
    body: "Relecture de CV, explication des coutumes professionnelles suisses, simulation d'entretien d'embauche en français ou allemand.",
    legal: 'Art. 394 CO',
  },
  {
    n: '02',
    icon: '🏠',
    title: 'Soutien au logement',
    body: "Relecture des dossiers de candidature, accompagnement lors des visites d'appartement avec les régies pour rassurer les propriétaires.",
    legal: 'ASLOCA · USPI',
  },
  {
    n: '03',
    icon: '☕',
    title: 'Échange & conversation',
    body: "Pratique conviviale du français ou de l'allemand autour d'un café, pour débloquer la parole et créer un lien humain durable.",
    legal: 'Benevol Suisse',
  },
  {
    n: '04',
    icon: '🚪',
    title: 'Hôte solidaire',
    body: "Proposition d'une chambre ou d'un studio en sous-location légale et sécurisée pour une famille arrivant en Suisse.",
    legal: 'Art. 262 CO',
  },
];

function VolunteerSection() {
  const openBot = () => window.open('https://t.me/SwissResilienceHubBot?start=volunteer', '_blank', 'noopener,noreferrer');

  return (
    <section className="section" id="mentors">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow blue">
            <span>♥</span> Devenez mentor · Bénévolat suisse
          </span>
          <h2 className="section-title">Vous vivez en Suisse ? Transmettez votre expérience.</h2>
          <p className="section-sub">Un engagement souple de 1 à 3 heures par semaine, sans lien d'emploi, cadré par le droit civil suisse et les standards <em>Benevol Suisse</em>.</p>
        </div>

        <div className="vol-shell">
          <div className="vol-head">
            <p className="vol-accroche">
              « Aidez une famille ou un réfugié à s'intégrer — offrez ce que vous savez déjà, là où vous êtes. »
            </p>
            <div className="vol-stats">
              <div className="vol-stat">
                <div className="vol-stat-num">1 – 3 h</div>
                <div className="vol-stat-lbl">/ semaine · engagement souple</div>
              </div>
              <div className="vol-stat">
                <div className="vol-stat-num">148+</div>
                <div className="vol-stat-lbl">mentors actifs · 26 cantons</div>
              </div>
              <div className="vol-stat">
                <div className="vol-stat-num">Art. 394</div>
                <div className="vol-stat-lbl">CO · mandat civil gratuit</div>
              </div>
              <div className="vol-stat">
                <div className="vol-stat-num">CH · LPD</div>
                <div className="vol-stat-lbl">données souveraines, hébergement suisse</div>
              </div>
            </div>
          </div>

          <div className="tracks-grid">
            {TRACKS.map(tr => (
              <article key={tr.n} className="track">
                <div className="track-num">Piste {tr.n}</div>
                <div className="track-icon-title">
                  <span className="track-icon" aria-hidden="true">{tr.icon}</span>
                  <h3 className="track-title">{tr.title}</h3>
                </div>
                <p className="track-body">{tr.body}</p>
                <div className="track-legal">§ {tr.legal}</div>
              </article>
            ))}
          </div>

          <div className="vol-cta-row">
            <button className="btn btn-blue btn-lg" onClick={openBot}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              Rejoindre le réseau des mentors suisses
            </button>
            <div className="vol-legal-strip">
              <span className="paragraph">§</span>
              <span>Mode mentor · profil bénévole sans alertes de recherche · gratuité totale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== ASSISTANT IA ==================== */
function AssistantStrip() {
  return (
    <section className="section" id="assistant" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="ai-strip">
          <div className="ai-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="7" width="16" height="12" rx="3"/>
              <circle cx="9" cy="13" r="1.2" fill="currentColor"/>
              <circle cx="15" cy="13" r="1.2" fill="currentColor"/>
              <path d="M12 3v4M8 19l-1.5 2M16 19l1.5 2"/>
            </svg>
          </div>
          <div>
            <p className="ai-title">Co-pilote IA suisse · disponible dans le bot Telegram</p>
            <p className="ai-sub">Répond aux questions sur le Permis S, adapte les lettres de motivation au ton formel romand, et vérifie les pièces obligatoires du dossier de location (Office des poursuites, EVAM / Hospice Général).</p>
          </div>
          <a
            href="https://t.me/SwissResilienceHubBot?start=assistant"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-emerald"
            style={{ padding: '11px 18px' }}
          >
            Essayer l'assistant →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==================== FOOTER ==================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="brand" style={{ marginBottom: 14 }}>
              <BrandMark size={36}/>
              <div className="brand-text">
                <span className="brand-name">ACCORD <em>Suisse</em></span>
                <span className="brand-tag">L'ACCORD · v2.7</span>
              </div>
            </div>
            <p className="foot-about">
              L'ACCORD Suisse : votre passerelle d'action pour le logement, l'emploi et la culture.
              Plateforme souveraine · Association en création (Art. 60–79 CC).
            </p>
            <div className="foot-url">violin-integration.works · @SwissResilienceHubBot</div>
          </div>
          <div className="foot-col">
            <h4>Modules</h4>
            <ul>
              <li><a href="#pillars">Pourquoi ACCORD</a></li>
              <li><a href="#jobs">Emplois vérifiés</a></li>
              <li><a href="#mentors">Devenir mentor</a></li>
              <li><a href="#assistant">Assistant IA</a></li>
              <li><a href="https://violin-integration.works/app/" target="_blank" rel="noreferrer">Mini App Telegram</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Références légales</h4>
            <ul>
              <li>Art. 17 LEI · Autorisation Permis S</li>
              <li>Art. 21a LEI · Priorité ORP</li>
              <li>Art. 262 CO · Sous-location</li>
              <li>Art. 394 CO · Mandat gratuit</li>
              <li>Art. 60–79 CC · Association</li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Conformité</h4>
            <ul>
              <li>LPD / GDPR-CH · SEM · SECO</li>
              <li>USPI · ASLOCA (Romandie)</li>
              <li>Benevol Suisse · SKOS</li>
              <li>WCAG 2.1 AA</li>
              <li>Art. 5 LCD/UWG · Source-agnostique</li>
            </ul>
          </div>
        </div>

        <div className="comp-strip">
          <span className="comp-chip crimson">SEM · Confédération</span>
          <span className="comp-chip">SKOS · CH</span>
          <span className="comp-chip">CCNT / CCT</span>
          <span className="comp-chip">Benevol Suisse</span>
          <span className="comp-chip">USPI · ASLOCA</span>
          <span className="comp-chip">SECO · Art. 21a LEI</span>
          <span className="comp-chip emerald">Merkle SHA-256</span>
          <span className="comp-chip">WCAG 2.1 AA</span>
          <span className="comp-chip">TMA v7.10</span>
        </div>

        <p className="foot-legal">
          © 2026 ACCORD Suisse — Association en création · Genève / Vaud · Art. 60–79 CC.
          Plateforme d'intelligence territoriale souveraine. Données officielles (SKOS, cantons, SECO, régies mandatées, Tribunal fédéral).
          Conformité LCD/UWG Art. 5 & ADR-018 source-agnostique. Bot Telegram <code style={{ color: 'var(--fg-3)' }}>@SwissResilienceHubBot</code> · Nom affiché <em>ACCORD | Швейцарія 🇨🇭</em>.
        </p>
      </div>
    </footer>
  );
}

/* ==================== APP ROOT ==================== */
function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('accord-lang') || 'fr'; } catch { return 'fr'; }
  });
  const [side, setSide] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'volunteer' || tab === 'mentors') return 'b';
      if (tab === 'jobs' || tab === 'housing') return 'a';
      return localStorage.getItem('accord-side') || 'a';
    } catch { return 'a'; }
  });

  useEffect(() => { try { localStorage.setItem('accord-lang', lang); } catch {} }, [lang]);
  useEffect(() => { try { localStorage.setItem('accord-side', side); } catch {} }, [side]);

  const t = I18N[lang] || I18N.fr;

  return (
    <React.Fragment>
      <TopBanner t={t}/>
      <Nav lang={lang} setLang={setLang} t={t}/>
      <main>
        <Hero side={side} setSide={setSide} t={t}/>
        <Pillars/>
        {side === 'a' ? (
          <>
            <JobsSection/>
            <AssistantStrip/>
            <VolunteerSection/>
          </>
        ) : (
          <>
            <VolunteerSection/>
            <AssistantStrip/>
            <JobsSection/>
          </>
        )}
      </main>
      <Footer/>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
