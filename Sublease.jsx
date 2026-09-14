// SwissRelief 2.6 — Sublease wizard (Side B) — Art. 262 CO
// Computes fair share with 20% furniture cap + Georgia serif PDF preview mock.
function SubleaseWizard({ t }) {
  const [totalRent, setTotalRent] = React.useState(1800);
  const [rooms, setRooms] = React.useState(4);
  const [surcharge, setSurcharge] = React.useState(15);
  const [pdfGenerated, setPdfGenerated] = React.useState(false);

  const base = Math.round(totalRent / Math.max(rooms, 1));
  const finalRent = Math.round(base * (1 + surcharge / 100));
  const over20 = surcharge > 20;

  const handlePrintPdf = () => {
    setPdfGenerated(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const sub = t?.sublease || {};

  return (
    <section id="sublease" className="v2-section">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-eyebrow">{sub.eyebrow || "Module 03 · Solidarité Suisse"}</span>
          <h2 className="v2-section-title">{sub.title || "Héberger en toute légalité (Art. 262 CO)"}</h2>
          <p className="v2-section-sub">{sub.lede || "Calcul d'une juste participation aux frais et plafonnement légal."}</p>
        </div>

        <div className="v2-sublease-grid">
          <div className="v2-card">
            <div className="v2-shield-box">
              <div className="v2-shield-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="v2-shield-title">{sub.shield || "Bouclier juridique du locataire — Art. 262 CO"}</div>
                <div className="v2-shield-body">{sub.shieldBody || "Le bailleur ne peut pas interdire la sous-location de manière générale."}</div>
              </div>
            </div>

            <div className="v2-two-col-fields">
              <div className="v2-field">
                <label>{sub.totalRent || "Loyer total net (CHF/mois)"}</label>
                <div className="v2-input-with-suffix">
                  <input
                    type="number"
                    min="500"
                    max="8000"
                    step="50"
                    className="v2-input"
                    value={totalRent}
                    onChange={e => setTotalRent(Number(e.target.value) || 0)}
                  />
                  <span className="v2-input-suffix">CHF / mois</span>
                </div>
              </div>
              <div className="v2-field">
                <label>{sub.rooms || "Nombre de pièces"}</label>
                <div className="v2-input-with-suffix">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    step="0.5"
                    className="v2-input"
                    value={rooms}
                    onChange={e => setRooms(Number(e.target.value) || 1)}
                  />
                  <span className="v2-input-suffix">pièces</span>
                </div>
              </div>
            </div>

            <div className="v2-field">
              <label>{sub.base || "Quote-part loyer brut"}</label>
              <div className="v2-quote-row">
                <span className="v2-quote-formula">CHF {chfV2(totalRent)} / {rooms} pièces</span>
                <span className="v2-quote-value">CHF {chfV2(base)}</span>
              </div>
            </div>

            <div className="v2-field">
              <label className="v2-slider-label">
                <span>{sub.surcharge || "Majoration meubles & équipement"}</span>
                <span className={`v2-slider-value ${over20 ? 'danger' : 'ok'}`}>{surcharge}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                className="v2-slider"
                value={surcharge}
                onChange={e => setSurcharge(Number(e.target.value))}
              />
              <div className="v2-slider-scale">
                <span>0%</span>
                <span style={{ color: 'var(--emerald-2)' }}>10%</span>
                <span style={{ color: 'var(--gold-2)' }}>20% MAX</span>
                <span style={{ color: '#FCA5A5' }}>30%</span>
              </div>
              <div className="v2-slider-hint">{sub.surchargeLimit || "Plafond légal 20% · Jurisprudence ASLOCA"}</div>
            </div>

            <div className="v2-final-rent">
              <div className="v2-final-label">{sub.final || "Participation mensuelle demandée"}</div>
              <div className="v2-final-amount">
                <span className="cur">CHF</span>
                <span className="num">{chfV2(finalRent)}</span>
                <span className="per">/ mois</span>
              </div>
              <div className="v2-final-breakdown">
                CHF {chfV2(base)} + {surcharge}% mobilier = CHF {chfV2(finalRent)}
              </div>

              <div className={`v2-compliance ${over20 ? 'warn' : 'ok'}`} style={{ marginTop: 16 }}>
                <div className="v2-compliance-icon">
                  {over20 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="v2-compliance-title">{over20 ? (sub.overBadge || "Loyer abusif") : (sub.okBadge || "Conforme Art. 262 CO")}</div>
                  <div className="v2-compliance-body">{over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA'}</div>
                </div>
              </div>
            </div>

            <div className="v2-badges-row">
              <span className="v2-mini-badge gold">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"/>
                </svg>
                {sub.taxBadge || "Non imposable"}
              </span>
              <span className="v2-mini-badge blue">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {sub.insBadge || "RC collective 5M"}
              </span>
              <span className="v2-mini-badge cyan">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9"/>
                  <line x1="4" y1="15" x2="20" y2="15"/>
                  <line x1="10" y1="3" x2="8" y2="21"/>
                  <line x1="16" y1="3" x2="14" y2="21"/>
                </svg>
                {sub.merkleBadge || "Merkle SHA-256"}
              </span>
            </div>

            <button
              className="v2-btn v2-btn-blue"
              style={{ marginTop: 20, width: '100%' }}
              disabled={over20}
              onClick={handlePrintPdf}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
              {pdfGenerated ? '✓ Document prêt — Imprimer / PDF' : (sub.letterBtn || "Générer la notification régie (PDF)")}
            </button>
            <div className="v2-btn-hint">{sub.letterHint || "Courrier prêt à signer pour la gérance."}</div>
          </div>

          {/* Right: mock PDF preview (Georgia serif on white paper) */}
          <div className="v2-pdf-preview">
            <div className="v2-pdf-head">{sub.pdfTitle || "NOTIFICATION OFFICIELLE À LA GÉRANCE"}</div>
            <p className="v2-pdf-intro">{sub.pdfIntro || "En application de l'art. 262 CO..."}</p>
            <div className="v2-pdf-row"><span className="k">Locataire principal</span><span>[ Nom · Adresse · NPA / Ville ]</span></div>
            <div className="v2-pdf-row"><span className="k">Gérance</span><span>[ Nom · Adresse · Contact ]</span></div>
            <div className="v2-pdf-row"><span className="k">Sous-locataire (Permis S)</span><span>[ Nom · N° Permis S ]</span></div>
            <div className="v2-pdf-row"><span className="k">Locaux sous-loués</span><span>1 pièce meublée, ~{(15/Math.max(rooms,1)).toFixed(1)} m², cuisine/SdB partagées</span></div>
            <div className="v2-pdf-row"><span className="k">Loyer forfaitaire</span><span style={{ fontWeight: 700 }}>CHF {chfV2(finalRent)} / mois</span></div>
            <div className="v2-pdf-close">{sub.pdfClose || "Le préavis applicable demeure celui de l'art. 266e CO."}</div>
            <div className="v2-pdf-sig">
              <div><div className="v2-pdf-line"/>Signature · locataire principal</div>
              <div><div className="v2-pdf-line"/>Date · Lieu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SubleaseWizard });
