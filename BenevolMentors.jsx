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

  return (
    <section id="mentors" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{t.mentors.eyebrow}</span>
          <h2 className="v2-section-title">{t.mentors.title}</h2>
          <p className="v2-section-sub">{t.mentors.lede}</p>
        </div>

        <div className="v2-mentors-grid">
          <div className="v2-card">
            <div className="v2-field">
              <label>{t.mentors.commit}</label>
              <div className="v2-pill-group">
                {t.mentors.commitOpts.map((o, i) => (
                  <button key={i} className={`v2-pill-btn ${commit === i ? 'active-blue' : ''}`} onClick={() => setCommit(i)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div className="v2-field">
              <label>{t.mentors.tracks}</label>
              <div className="v2-tracks-grid">
                {t.mentors.trackList.map((tr, i) => (
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
              <span>{t.mentors.legal}</span>
            </div>

            <button className="v2-btn v2-btn-blue" style={{ marginTop: 18 }} onClick={handleApply}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {t.mentors.apply}
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
