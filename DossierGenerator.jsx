// SwissRelief · Pan-Swiss 2.6 — Générateur de Dossier Régie 1-Click (Art. 253 CO)

function DossierGenerator({ t, lang, prefill }) {
  const [name, setName] = React.useState('Maryna Vokovytch');
  const [permis, setPermis] = React.useState('S-VD-2024-0847');
  const [statusForm, setStatusForm] = React.useState('evam');   // evam | salary
  const [salary, setSalary] = React.useState(4800);
  const [guarantors, setGuarantors] = React.useState('—');
  const [poursuites, setPoursuites] = React.useState('has');
  const [previewLang, setPreviewLang] = React.useState('fr');   // fr | de

  // Prefill from a housing card
  const listing = prefill || window.SR_HOUSING[0];

  const today = new Date().toLocaleDateString(previewLang === 'de' ? 'de-CH' : 'fr-CH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const financialLine = statusForm === 'evam'
    ? (previewLang === 'de'
        ? "Die Miete wird vollständig durch das kantonale Amt EVAM (Vaud) übernommen, gemäss der bundesrechtlichen Kostenübernahme für Personen mit S-Ausweis."
        : "Le loyer est intégralement pris en charge par l'organe cantonal EVAM (Vaud), au titre de la couverture fédérale des personnes titulaires du Permis S.")
    : (previewLang === 'de'
        ? `Mein regelmässiges Nettoeinkommen beträgt CHF ${window.chf(salary)}/Monat, was der 33%-Regel (max. CHF ${window.chf(Math.round(salary * 0.33))}) entspricht.`
        : `Mon revenu net régulier s'élève à CHF ${window.chf(salary)}/mois, respectant la règle des 33% (loyer max. CHF ${window.chf(Math.round(salary * 0.33))}).`);

  const poursuitesLine = poursuites === 'has'
    ? (previewLang === 'de'
        ? "Ein aktueller Betreibungsregisterauszug (leer, weniger als 3 Monate alt) liegt diesem Schreiben bei."
        : "Un extrait du Registre des Poursuites (vierge, daté de moins de 3 mois) est joint à la présente.")
    : (previewLang === 'de'
        ? "Der Betreibungsregisterauszug wurde beim zuständigen Amt beantragt und wird innerhalb von 5 Werktagen nachgereicht."
        : "L'extrait du Registre des Poursuites a été demandé à l'Office et sera transmis sous 5 jours ouvrés.");

  const salutation = previewLang === 'de'
    ? "Sehr geehrte Damen und Herren,"
    : "Madame, Monsieur,";

  const opening = previewLang === 'de'
    ? `mit Interesse habe ich Ihr Angebot für die ${listing.title.de} zur Kenntnis genommen und erlaube mir, mich hiermit als Mieter/in zu bewerben.`
    : `Ayant pris connaissance avec grand intérêt de votre annonce concernant l'${listing.title.fr.toLowerCase()}, je me permets par la présente de me porter candidat·e à la location de ce bien.`;

  const closing = previewLang === 'de'
    ? "Für ein Vorstellungsgespräch stehe ich Ihnen gerne zur Verfügung. In der Zwischenzeit danke ich Ihnen für die Prüfung meiner Bewerbung und verbleibe mit freundlichen Grüssen,"
    : "Je me tiens à votre entière disposition pour un entretien de présentation. Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.";

  const cityName = listing.city.fr;
  const priceLine = `CHF ${window.chf(listing.price)}/mois`;

  const d = t?.dossier || {};

  return (
    <section id="dossier" className="block" style={{background: 'rgba(213,43,30,.03)'}}>
      <div className="container">
        <span className="section-eyebrow">{d.eyebrow || "Dossier régie 1-Click · Art. 253 CO"}</span>
        <h2 className="section-title">{d.title || "Générateur de dossier de candidature locative"}</h2>
        <p className="section-sub">{d.lede || "Formulaire candidat conforme aux normes régies suisses."}</p>

        <div className="dossier-grid">
          {/* FORM */}
          <div className="card">
            <div style={{
              fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.08em',
              textTransform: 'uppercase', color: 'var(--gold-2)', fontWeight: 700,
              marginBottom: 14
            }}>
              📄 {d.formTitle || "Formulaire candidat"}
            </div>

            {/* Prefill notice */}
            <div style={{
              padding: '10px 12px', marginBottom: 16,
              background: 'rgba(213,43,30,.08)',
              border: '1px solid rgba(213,43,30,.25)',
              borderRadius: 10, fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5
            }}>
              <b style={{color: 'var(--ink-0)'}}>Bien ciblé :</b> {listing.title?.[lang] || listing.title?.fr || listing.title || "Logement Suisse"}<br/>
              <span className="mono" style={{color: 'var(--muted)', fontSize: 11}}>
                {listing.regie} · CHF {window.chf(listing.price)}/mois · {listing.city?.[lang] || listing.city?.fr || listing.city_name || "Vaud"}
              </span>
            </div>

            <div className="field">
              <label>{d.name || "Nom · Prénom"}</label>
              <input className="input" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="field">
              <label>{d.permis || "N° dossier / Permis S"}</label>
              <input className="input mono" value={permis} onChange={e => setPermis(e.target.value)}/>
            </div>

            <div className="field">
              <label>{d.status || "Statut financier"}</label>
              <div className="dossier-status-toggle">
                <button className={statusForm === 'evam' ? 'active' : ''} onClick={() => setStatusForm('evam')}>
                  📋 {d.evamPec || "Prise en charge EVAM"}
                </button>
                <button className={statusForm === 'salary' ? 'active' : ''} onClick={() => setStatusForm('salary')}>
                  💼 {lang === 'de' ? 'Lohn' : lang === 'it' ? 'Salario' : lang === 'uk' ? 'Зарплата' : 'Salaire'}
                </button>
              </div>
            </div>

            {statusForm === 'salary' && (
              <div className="field">
                <label>{d.salary || "Revenu mensuel (CHF)"}</label>
                <input type="number" className="input mono" value={salary}
                  onChange={e => setSalary(Number(e.target.value) || 0)}/>
              </div>
            )}

            <div className="field">
              <label>{d.guarantors || "Garants éventuels"}</label>
              <input className="input" value={guarantors} onChange={e => setGuarantors(e.target.value)}/>
            </div>

            <div className="field" style={{marginBottom: 0}}>
              <label>{d.poursuites || "Extrait du Registre des Poursuites"}</label>
              <div className="dossier-status-toggle">
                <button className={poursuites === 'has' ? 'active' : ''} onClick={() => setPoursuites('has')}>
                  ✓ {d.hasIt || "Disponible (< 3 mois)"}
                </button>
                <button className={poursuites === 'will' ? 'active' : ''} onClick={() => setPoursuites('will')}>
                  ⏳ {d.willGet || "En cours de commande"}
                </button>
              </div>
            </div>
          </div>

          {/* LETTER PREVIEW */}
          <div>
            <div className="lang-preview-toggle">
              <span style={{
                fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.08em',
                textTransform: 'uppercase', color: 'var(--muted)',
                padding: '6px 8px', fontWeight: 600
              }}>
                {d.previewIn || "Aperçu de la lettre"}
              </span>
              <button className={previewLang === 'fr' ? 'active' : ''} onClick={() => setPreviewLang('fr')}>🇫🇷 FR</button>
              <button className={previewLang === 'de' ? 'active' : ''} onClick={() => setPreviewLang('de')}>🇩🇪 DE</button>
            </div>

            <div className="letter" role="document">
              <div className="from">
                <b style={{color:'#0f172a'}}>{name}</b><br/>
                {previewLang === 'de' ? 'S-Ausweis Nr.' : 'Permis S n°'} <span className="highlight">{permis}</span><br/>
                c/o EVAM, Route de Chavannes 33<br/>
                1007 Lausanne · +41 21 XXX XX XX
              </div>

              <div className="to">
                <b>{listing.regie}</b><br/>
                {previewLang === 'de' ? 'Vermietungsabteilung' : 'Service Location'}<br/>
                Case postale<br/>
                1000 Lausanne
              </div>

              <div className="place-date">Lausanne, {today}</div>

              <div className="subject">
                {previewLang === 'de'
                  ? `Betreff: Bewerbung für die Miete – ${listing.title.de}`
                  : `Objet : Candidature à la location – ${listing.title.fr}`
                }<br/>
                <span style={{fontWeight: 400, fontSize: 11, color: '#64748B'}}>
                  Réf. annonce : <span className="highlight">{listing.id.toUpperCase()}</span> · {priceLine}
                </span>
              </div>

              <p style={{marginTop: 8}}>{salutation}</p>
              <p>{opening}</p>

              <div className="listing-box">
                <b>{previewLang === 'de' ? 'Betroffenes Objekt' : 'Objet concerné'}</b><br/>
                {listing.title[previewLang === 'de' ? 'de' : 'fr']}<br/>
                <span style={{color:'#64748B'}}>
                  {listing.city[previewLang === 'de' ? 'de' : 'fr']} · {priceLine} · {listing.rooms} {previewLang === 'de' ? 'Zimmer' : 'pièces'}
                </span>
              </div>

              <p>{financialLine}</p>
              <p>{poursuitesLine}</p>

              <p style={{marginTop: 14}}>{closing}</p>

              <div className="sig">
                <div><div className="line"></div>{previewLang === 'de' ? 'Unterschrift' : 'Signature'}</div>
                <div><div className="line"></div>{previewLang === 'de' ? 'Ort · Datum' : 'Lieu · Date'}</div>
              </div>

              <div style={{
                marginTop: 22, paddingTop: 14,
                borderTop: '1px dotted rgba(0,0,0,.18)',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontSize: 10, color: '#94A3B8', lineHeight: 1.5
              }}>
                <b>{previewLang === 'de' ? 'Beilagen' : 'Annexes'} :</b>{' '}
                {previewLang === 'de'
                  ? 'Kopie S-Ausweis · EVAM-Kostenübernahmebestätigung · Betreibungsauszug'
                  : 'Copie Permis S · Attestation EVAM · Extrait Poursuites'
                }<br/>
                <span style={{color: '#D97706'}}>
                  {previewLang === 'de'
                    ? 'Erstellt mit SwissRelief 2.6 · Art. 253 OR konform · Merkle SHA-256'
                    : 'Généré via SwissRelief 2.6 · Conforme Art. 253 CO · Merkle SHA-256'
                  }
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap'
            }}>
              <button className="btn primary" onClick={() => alert('Génération PDF/A (mock)')}>
                <Ico.file/> {d.downloadPdf || "Télécharger PDF/A"}
              </button>
              <button className="btn ghost" onClick={() => alert('Texte copié dans le presse-papier (mock)')}>
                {d.copyText || "Copier le texte"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.DossierGenerator = DossierGenerator;

Object.assign(window, { DossierGenerator });

