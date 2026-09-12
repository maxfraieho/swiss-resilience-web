// Beta pricing (frozen) + Donation Merkle modal + Legal footer
const { useState: uSD, useEffect: eSD } = React;

// ============================================================
// BETA PRICING (frozen tiers + donation card)
// ============================================================
function BetaPricing({ t, onDonate }) {
  return (
    <section id="beta">
      <div className="container">
        <span className="eyebrow">{t.beta.eyebrow}</span>
        <h2 className="section-title">{t.beta.title}</h2>
        <p className="section-sub">{t.beta.lede}</p>

        <div className="pricing-grid">

          {/* FROZEN — PRO */}
          <div className="price-card frozen">
            <span className="frozen-overlay">{t.beta.inactiveBadge}</span>
            <div className="price-name">Pro Solidarity</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">19</span><span className="per">/ {t.lang === 'Français' ? 'mois' : t.lang === 'Deutsch' ? 'Monat' : t.lang === 'Italiano' ? 'mese' : 'міс.'}</span></div>
            <p className="price-tagline">{t.beta.proTagline}</p>
            <ul className="features">
              {t.beta.proFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-disabled" style={{width:'100%'}}>{t.beta.inactiveBadge}</button>
          </div>

          {/* FROZEN — SUCCESS */}
          <div className="price-card frozen">
            <span className="frozen-overlay">{t.beta.inactiveBadge}</span>
            <div className="price-name">Success Relocation</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">54</span><span className="per">/ one-shot</span></div>
            <p className="price-tagline">{t.beta.successTagline}</p>
            <ul className="features">
              {t.beta.successFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-disabled" style={{width:'100%'}}>{t.beta.inactiveBadge}</button>
          </div>

          {/* DONATION CARD (the only active CTA) */}
          <div className="price-card donation">
            <div className="price-name" style={{color:'#FCD34D'}}>★ {t.beta.freeAccess}</div>
            <div className="price-amount"><span className="cur">CHF</span><span className="mono">0</span></div>
            <p className="price-tagline">{t.beta.donationTagline}</p>
            <ul className="features">
              {t.beta.donationFeatures.map((f, idx) => (
                <li key={idx}><span className="check"><I.check/></span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{width:'100%'}} onClick={onDonate}>
              <I.heart/> {t.beta.donateBtn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================
// DONATION MODAL — Merkle Ledger + Payment rails
// ============================================================
function DonationModal({ t, onClose }) {
  const [rail, setRail] = uSD("card"); // stars | card | qr
  const [amount, setAmount] = uSD(25);
  const [customOn, setCustomOn] = uSD(false);
  const merkleRoot = useSessionMerkle();

  eSD(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  const chips = rail === "stars" ? [50, 250, 950, 2450] : [10, 25, 50, 100];
  const unit = rail === "stars" ? "XTR" : "CHF";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <h2>{t.donation.title}</h2>
            <p style={{margin:0, color:'var(--muted)', fontSize: 13.5}}>Association Swiss Resilience · Bêta publique</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close"><I.x/></button>
        </div>

        {/* 70 / 30 split */}
        <div className="split-viz" aria-label="Fund allocation">
          <div className="split-70">
            <div className="split-pct">70%</div>
            <div style={{fontWeight:700, fontSize:13, marginBottom:4}}>Infrastructure</div>
            <div className="split-desc">{t.donation.split70}</div>
          </div>
          <div className="split-30">
            <div className="split-pct">30%</div>
            <div style={{fontWeight:700, fontSize:13, marginBottom:4, color:'#FEF3C7'}}>🇺🇦 ZSU</div>
            <div className="split-desc">{t.donation.split30}</div>
          </div>
        </div>

        {/* Payment rails */}
        <div className="pay-row">
          <button className="pay-card stars" style={{borderColor: rail==='stars' ? 'rgba(59,130,246,0.7)' : ''}} onClick={()=>{setRail('stars'); setAmount(950); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.star/></span><span className="title">{t.donation.stars}</span></div>
            <div className="hint">{t.donation.starsHint}</div>
          </button>
          <button className="pay-card card" style={{borderColor: rail==='card' ? 'rgba(16,185,129,0.7)' : ''}} onClick={()=>{setRail('card'); setAmount(25); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.lock/></span><span className="title">{t.donation.card}</span></div>
            <div className="hint">{t.donation.cardHint}</div>
          </button>
        </div>
        <div className="pay-row" style={{gridTemplateColumns:'1fr'}}>
          <button className="pay-card qr" style={{borderColor: rail==='qr' ? 'rgba(213,43,30,0.7)' : ''}} onClick={()=>{setRail('qr'); setCustomOn(false);}}>
            <div className="head"><span className="icon"><I.hash/></span><span className="title">{t.donation.qr}</span></div>
            <div className="hint">{t.donation.qrHint}</div>
          </button>
        </div>

        {/* Amount chips */}
        {rail !== 'qr' && (
          <div>
            <div style={{marginTop: 18, marginBottom: 8, fontSize: 11, letterSpacing: '0.12em', textTransform:'uppercase', color:'var(--muted)', fontWeight:700, fontFamily:"'JetBrains Mono',monospace"}}>
              Montant · {unit}
            </div>
            <div className="amount-chips">
              {chips.map(a => (
                <button key={a} className={`amount-chip ${amount===a && !customOn ?'active':''}`} onClick={()=>{setAmount(a); setCustomOn(false);}}>
                  {a} {unit}
                </button>
              ))}
              <button className={`amount-chip ${customOn?'active':''}`} onClick={()=>setCustomOn(true)}>{t.donation.customAmount}</button>
            </div>
            {customOn && (
              <input type="number" min="1" className="input" style={{marginTop: 10, maxWidth: 220}}
                     value={amount} onChange={e=>setAmount(Number(e.target.value)||0)}/>
            )}
          </div>
        )}

        {/* Merkle strip */}
        <div className="merkle-strip">
          <span className="label">{t.donation.merkleRoot}</span>
          <span className="hash">{merkleRoot.slice(0, 42)}…</span>
          <a href="https://github.com/maxfraieho/swiss-job-hunter" target="_blank" rel="noopener noreferrer">{t.donation.verifyBtn} →</a>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>{t.donation.close}</button>
          {rail === 'stars' ? (
            <a href="https://t.me/SwissResilienceHubBot?start=donate" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <I.star/> {amount} XTR — @SwissResilienceHubBot
            </a>
          ) : rail === 'card' ? (
            <a href="https://t.me/SwissResilienceHubBot?start=donate" target="_blank" rel="noopener noreferrer" className="btn btn-primary" title="Phase Bêta: dons via Telegram Stars">
              <I.heart/> {t.donation.pay} · CHF {amount} (@SwissResilienceHubBot)
            </a>
          ) : (
            <a href="https://t.me/SwissResilienceHubBot?start=qr_donate" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <I.hash/> QR-facture via @SwissResilienceHubBot
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LEGAL FOOTER
// ============================================================
function LegalFooter({ t }) {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="brand" style={{gap: 12, marginBottom: 12}}>
              <span className="brand-badge"><BrandMark size={22}/></span>
              <span className="brand-name">Swiss Resilience Navigator<span>2.5 · Pan-Swiss Bêta</span></span>
            </div>
            <p style={{maxWidth: 320}}>
              Plateforme communautaire d'entraide entre bénéficiaires du Permis S et résidents suisses solidaires — 26 cantons, 4 langues, zéro commission.
            </p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.status}</h4>
            <p>{t.footer.statusBody}</p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.lse}</h4>
            <p>{t.footer.lseBody}</p>
          </div>

          <div className="foot-col">
            <h4>{t.footer.links}</h4>
            <ul>
              {t.footer.linkList.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}
            </ul>
            <h4 style={{marginTop: 22}}>{t.footer.lcd}</h4>
            <p style={{fontSize: 12}}>{t.footer.lcdBody}</p>
          </div>
        </div>

        <div className="compliance-row">
          <span className="comp-chip"><I.shield/> Swiss nLPD Compliant</span>
          <span className="comp-chip"><I.shield/> EU GDPR</span>
          <span className="comp-chip"><I.lock/> AES-256 · SHA-256 Merkle</span>
          <span className="comp-chip"><I.hash/> Appwrite Cloud · Frankfurt</span>
          <span className="comp-chip"><I.shield/> Benevol Switzerland</span>
          <span className="comp-chip"><I.shield/> ASLOCA / Mieterverband</span>
        </div>

        <div className="foot-legal">
          {t.footer.close}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { BetaPricing, DonationModal, LegalFooter });
