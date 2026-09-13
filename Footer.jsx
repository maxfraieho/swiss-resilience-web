// SwissRelief 2.6 — Legal footer with compliance chip strip
function FooterV2({ t }) {
  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-foot-grid">
          <div className="v2-foot-col">
            <div className="v2-brand" style={{ marginBottom: 14 }}>
              <span className="v2-brand-badge">
                <BrandMark size={20}/>
              </span>
              <span className="v2-brand-name">SwissRelief<span>Pan-Swiss 2.6</span></span>
            </div>
            <p>{t.footer.about}</p>
            <p className="v2-foot-url">violin-integration.works · swiss-resilience-web.pages.dev</p>
          </div>
          <div className="v2-foot-col">
            <h4>Modules</h4>
            <ul>
              <li><a href="#calc">Barèmes cantonaux (26)</a></li>
              <li><a href="#prof">Radar CH-ISCO-19</a></li>
              <li><a href="#sublease">Sous-location 262 CO</a></li>
              <li><a href="#mentors">Mentors Benevol</a></li>
              <li><a href="#beta">Transparence Merkle</a></li>
            </ul>
          </div>
          <div className="v2-foot-col">
            <h4>Références légales</h4>
            <ul>
              <li><a>Art. 262 CO · Sous-location</a></li>
              <li><a>Art. 21a LEI · Priorité ORP</a></li>
              <li><a>Art. 394 CO · Mandat gratuit</a></li>
              <li><a>Art. 60–79 CC · Association</a></li>
              <li><a>Art. 239 CO · Donation</a></li>
            </ul>
          </div>
          <div className="v2-foot-col">
            <h4>Conformité</h4>
            <ul>
              <li><a>LPD / GDPR-CH</a></li>
              <li><a>SKOS Standards</a></li>
              <li><a>USPI · ASLOCA</a></li>
              <li><a>Benevol Suisse</a></li>
              <li><a>WCAG 2.1 AA</a></li>
            </ul>
          </div>
        </div>

        <div className="v2-compliance-row">
          <span className="v2-comp-chip">SKOS · CH</span>
          <span className="v2-comp-chip">CCNT / CCT</span>
          <span className="v2-comp-chip">Benevol Suisse</span>
          <span className="v2-comp-chip">USPI · ASLOCA</span>
          <span className="v2-comp-chip">SECO · Art. 21a LEI</span>
          <span className="v2-comp-chip cyan">Merkle SHA-256</span>
          <span className="v2-comp-chip">WCAG 2.1 AA</span>
          <span className="v2-comp-chip">TMA v7.10</span>
        </div>
        <div className="v2-foot-legal">
          © 2026 SwissRelief — Association en création · Genève / Vaud · Art. 60–79 CC Suisse.
          <br/>
          Plateforme souveraine d'intelligence territoriale. Données officielles (SKOS, cantons, SECO, régies officielles mandatées, Tribunal fédéral) · Conformité LCD/UWG Art. 5 & ADR-018 Source-Agnostique.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterV2 });
