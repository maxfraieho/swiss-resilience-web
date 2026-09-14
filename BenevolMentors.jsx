// SwissRelief 2.6 — Benevol mentor network (Side B) · Art. 394 CO
function BenevolMentors({ t }) {
  const [commit, setCommit] = React.useState(1);

  const handleApply = () => {
    const url = 'https://t.me/SwissResilienceHubBot?start=mentor';
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const m = t?.mentors || {};

  return (
    <section id="mentors" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{m.eyebrow || "Module 04 · Engagement Citoyen — Réseau Benevol"}</span>
          <h2 className="v2-section-title">{m.title || "Mentorat solidaire : 1 à 3 heures par semaine"}</h2>
          <p className="v2-section-sub">{m.lede || "Accompagnement bénévole structuré sous mandat gratuit (Art. 394 CO)."}</p>
        </div>

        <div className="v2-mentors-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label>{m.commit || "Disponibilité souhaitée"}</label>
              <div className="v2-pill-group">
                {(m.commitOpts || ["1 h / semaine", "2–3 h / semaine", "À la demande"]).map((o, i) => (
                  <button key={i} className={`v2-pill-btn ${commit === i ? 'active-blue' : ''}`} onClick={() => setCommit(i)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{m.tracks || "Axes d'accompagnement"}</label>
              <div className="v2-tracks-grid">
                {(m.trackList || [
                  { t: "Codes professionnels suisses", b: "Relecture de CV, préparation aux entretiens, culture d'entreprise locale." },
                  { t: "Logement & intégration", b: "Aide aux visites de régies, décryptage des baux, orientation quartier." },
                  { t: "Pratique linguistique", b: "Conversations hebdomadaires en français ou allemand en situation réelle." }
                ]).map((tr, i) => (
                  <article key={i} className="v2-track-card">
                    <div className="v2-track-num">TRACK {String(i + 1).padStart(2, '0')}</div>
                    <div className="v2-track-title">{tr.t}</div>
                    <div className="v2-track-body">{tr.b}</div>
                  </article>
                ))}
              </div>
            </div>

            <div className="v2-legal-strip">
              <span aria-hidden="true">§</span>
              <span>{m.legal || "Engagement régi par l'art. 394 CO (mandat civil bénévole). Aucun lien de subordination."}</span>
            </div>

            <button className="v2-btn v2-btn-blue" style={{ marginTop: 18 }} onClick={handleApply}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {m.apply || "Rejoindre le réseau de mentors"}
            </button>
          </div>

          <div className="v2-mentors-side">
            <div className="v2-side-card">
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">1–3 h</div>
                <div className="v2-side-metric-lbl">/ semaine · engagement souple</div>
              </div>
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">Art. 394 CO</div>
                <div className="v2-side-metric-lbl">Mandat civil gratuit · aucun lien d'emploi</div>
              </div>
              <div className="v2-side-metric">
                <div className="v2-side-metric-num">Benevol Suisse</div>
                <div className="v2-side-metric-lbl">Standards ehrenamtliche Arbeit CH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BenevolMentors });
