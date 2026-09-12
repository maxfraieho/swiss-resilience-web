// Side B: Solidarité Suisse — Host sublease wizard + Benevol mentors
const { useState: uSB, useMemo: mSB } = React;

// ============================================================
// HOST SUBLEASE WIZARD (Art. 262 CO)
// ============================================================
function HostSubleaseWizard({ t, lang }) {
  const [totalRent, setTotalRent] = uSB(1800);
  const [rooms, setRooms] = uSB(4);
  const [surcharge, setSurcharge] = uSB(15);
  const [showPdf, setShowPdf] = uSB(false);

  const base = mSB(() => Math.round(totalRent / rooms), [totalRent, rooms]);
  const finalRent = mSB(() => Math.round(base * (1 + surcharge / 100)), [base, surcharge]);
  const over20 = surcharge > 20;

  return (
    <section id="sublease">
      <div className="container">
        <span className="eyebrow">{t.sublease.eyebrow}</span>
        <h2 className="section-title">{t.sublease.title}</h2>
        <p className="section-sub">{t.sublease.lede}</p>

        <div className="host-grid" style={{marginTop: 34}}>
          {/* LEFT — Wizard */}
          <div className="card">
            <div className="shield-box">
              <div className="icon"><I.shield/></div>
              <div>
                <div className="title">{t.sublease.shield}</div>
                <div className="body">{t.sublease.shieldBody}</div>
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap: 14}}>
              <div className="field">
                <label>{t.sublease.totalRent}</label>
                <input type="number" min="500" max="8000" step="50" className="input"
                       value={totalRent} onChange={e=>setTotalRent(Number(e.target.value)||0)}/>
              </div>
              <div className="field">
                <label>{t.sublease.rooms}</label>
                <input type="number" min="1" max="10" step="0.5" className="input"
                       value={rooms} onChange={e=>setRooms(Number(e.target.value)||1)}/>
              </div>
            </div>

            <div className="field" style={{marginTop: 6}}>
              <label>{t.sublease.base}</label>
              <div style={{padding:'12px 14px', background:'rgba(15,23,42,0.65)', border:'1px solid var(--line-2)', borderRadius:10, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:13, color:'var(--muted)'}} className="mono">CHF {chf(totalRent)} / {rooms} = </span>
                <span style={{fontFamily:"'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700, color:'#E2E8F0'}}>CHF {chf(base)}</span>
              </div>
            </div>

            <div className="field">
              <label style={{display:'flex', justifyContent:'space-between'}}>
                <span>{t.sublease.surcharge}</span>
                <span className="mono" style={{color: over20 ? '#FCA5A5' : '#FCD34D'}}>{surcharge}%</span>
              </label>
              <div className="slider-wrap">
                <input type="range" min="0" max="30" step="1" className="slider"
                       value={surcharge} onChange={e=>setSurcharge(Number(e.target.value))}/>
                <div className="slider-labels">
                  <span>0%</span><span style={{color:'var(--emerald-2)'}}>10%</span><span style={{color:'var(--gold-2)'}}>20% MAX</span><span style={{color:'#FCA5A5'}}>30%</span>
                </div>
              </div>
              <div style={{fontSize: 11.5, color: 'var(--muted)', marginTop: 6}}>{t.sublease.surchargeLimit}</div>
            </div>

            <div className="final-rent-box">
              <div className="label">{t.sublease.final}</div>
              <div className="amount"><span className="cur">CHF</span> <span className="mono">{chf(finalRent)}</span></div>
              <div className="breakdown">CHF {chf(base)} + {surcharge}% = CHF {chf(finalRent)} / {lang==='de'?'Monat':lang==='it'?'mese':lang==='uk'?'міс.':'mois'}</div>
              <div className={`compliance-box ${over20?'warn':'ok'}`} style={{marginTop:14}}>
                <div className="icon">{over20?'!':'✓'}</div>
                <div>
                  <div className="title">{over20 ? t.sublease.overBadge : t.sublease.okBadge}</div>
                  <div className="body">{over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA / Mieterverband'}</div>
                </div>
              </div>
            </div>

            <div className="badges-row">
              <span className="mini-badge gold"><I.euro/> {t.sublease.taxBadge}</span>
              <span className="mini-badge blue"><I.shield/> {t.sublease.insBadge}</span>
            </div>

            <div style={{marginTop: 20, display:'flex', gap: 10, flexWrap:'wrap'}}>
              <button className="btn btn-blue" onClick={()=>setShowPdf(true)} disabled={over20}>
                <I.arrow/> {t.sublease.letterBtn}
              </button>
            </div>
            <div style={{marginTop: 10, fontSize: 12, color:'var(--muted)'}}>{t.sublease.letterHint}</div>
          </div>

          {/* RIGHT — PDF preview */}
          <div>
            <div className="pdf-preview">
              <h4>{t.sublease.pdfTitle}</h4>
              <p style={{margin:'6px 0 12px', fontSize: 11.5, color:'#334155', fontStyle:'italic'}}>{t.sublease.pdfIntro}</p>

              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.from}</span><span>[ Nom · Adresse · NPA / Ville ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.to}</span><span>[ Gérance · Adresse ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.subtenant}</span><span>[ Nom · N° Permis S ]</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.desc}</span><span>1 pièce meublée, {Math.round(15/(rooms||1)*100)/10 || 12} m², partagée cuisine/SdB</span></div>
              <div className="pdf-row"><span className="k">{t.sublease.pdfFields.rent}</span><span style={{fontWeight:700}}>CHF {chf(finalRent)} / mois</span></div>

              <div className="pdf-close">{t.sublease.pdfClose}</div>

              <div className="pdf-sig">
                <div><div className="line"></div>Signature locataire principal</div>
                <div><div className="line"></div>Date · Lieu</div>
              </div>
            </div>

            <div style={{marginTop: 14, padding: '12px 14px', background: 'rgba(15,23,42,0.5)', border: '1px dashed var(--line-2)', borderRadius: 12, fontSize: 12, color: 'var(--muted)'}}>
              📄 Aperçu du courrier — bouton "{t.sublease.letterBtn}" génère un PDF/A signable, avec citations légales complètes et coordonnées de la gérance ciblée.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BENEVOL MENTOR HUB
// ============================================================
function BenevolMentors({ t, lang }) {
  const [commit, setCommit] = uSB(1);

  return (
    <section id="mentors">
      <div className="container">
        <span className="eyebrow">{t.mentors.eyebrow}</span>
        <h2 className="section-title">{t.mentors.title}</h2>
        <p className="section-sub">{t.mentors.lede}</p>

        <div className="card" style={{marginTop: 34}}>
          <div className="field">
            <label>{t.mentors.commit}</label>
            <div className="pill-group">
              {t.mentors.commitOpts.map((opt, i) => (
                <button key={i} className={`pill-btn active-blue ${commit===i?'active-blue':''}`} style={{opacity: commit===i?1:0.55}} onClick={()=>setCommit(i)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop: 24}}>
            <div className="metric-label" style={{marginBottom: 12}}>{t.mentors.tracks}</div>
            <div className="tracks-grid">
              {t.mentors.trackList.map((tr, i) => (
                <div key={i} className="track-card">
                  <div className="track-num">TRACK 0{i+1}</div>
                  <div className="track-title">{tr.t}</div>
                  <div className="track-body">{tr.b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="legal-strip">
            <span>{t.mentors.legal}</span>
          </div>

          <div style={{marginTop: 22, display:'flex', gap: 10, flexWrap:'wrap'}}>
            <button className="btn btn-blue btn-lg">
              <I.users/> {t.mentors.apply}
            </button>
            <a href="https://t.me/SwissResilienceHubBot?start=mentor" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              <I.send/> @SwissResilienceHubBot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HostSubleaseWizard, BenevolMentors });
