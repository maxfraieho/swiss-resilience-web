// SwissRelief 2.6 — Hero with SHORT title, two-sided tab switcher, trust badges.
// Uses fluid grid `repeat(auto-fit, minmax(220px, 1fr))` for badges (ADR-017 anomaly #4 fix).
function HeroV2({ side, setSide, t }) {
  return (
    <section className="v2-hero" id="top">
      <div className="v2-container">
        <div className="v2-hero-pill">
          <span className="v2-pulse-dot" aria-hidden="true"/>
          <span>26 CANTONS · 4 LANGUES · MERKLE SHA-256</span>
        </div>
        <h1 className="v2-hero-title">
          {t.hero.line1}<br/>
          <span className="v2-hero-accent">{t.hero.line2}</span>
        </h1>
        <p className="v2-hero-sub">{t.hero.lede}</p>

        <div className="v2-hero-cta-group hero-ctas">
          <a
            href="https://t.me/swiss_relief_bot?start=web_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-btn v2-btn-primary v2-btn-tg btn tg lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>{t.hero?.ctaBot || "Ouvrir @swiss_relief_bot"}</span>
          </a>
          <a
            href="/app/"
            className="v2-btn v2-btn-secondary btn primary lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
            <span>{t.hero?.ctaApp || "Lancer la Mini App"}</span>
          </a>
        </div>

        <div className="v2-hero-tabs" role="tablist" aria-label="Public cible">
          <button
            className={`v2-hero-tab tab-a ${side === 'a' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'a'}
            onClick={() => setSide('a')}
          >
            <span className="v2-tab-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="v2-tab-body">
              <span className="v2-tab-label">{t.tabs.seekers}</span>
              <span className="v2-tab-sub">{t.tabs.seekersSub}</span>
            </span>
          </button>
          <button
            className={`v2-hero-tab tab-b ${side === 'b' ? 'active' : ''}`}
            role="tab" aria-selected={side === 'b'}
            onClick={() => setSide('b')}
          >
            <span className="v2-tab-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <span className="v2-tab-body">
              <span className="v2-tab-label">{t.tabs.solidarity}</span>
              <span className="v2-tab-sub">{t.tabs.solSub}</span>
            </span>
          </button>
        </div>

        <div className="v2-trust-grid">
          {t.trust.map((m, i) => (
            <div key={i} className={`v2-trust-tile rail-${['emerald','crimson','gold','cyan'][i % 4]}`}>
              <div className="v2-trust-label">{m.k}</div>
              <div className="v2-trust-value">{m.v}</div>
              <div className="v2-trust-desc">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HeroV2 });
