// SwissRelief 2.6 — Legal footer with compliance chip strip & direct info links
function FooterV2({ t, onOpenInfo, lang = 'uk' }) {
  const isUk = lang === 'uk';

  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-foot-grid">
          <div className="v2-foot-col">
            <div className="v2-brand" style={{ marginBottom: 14 }}>
              <span className="v2-brand-badge">
                <BrandMark size={24}/>
              </span>
              <span className="v2-brand-name">ACCORD<span>{isUk ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'}</span></span>
            </div>
            <p>{t?.footer?.about || (isUk ? "Суверенна цифрова платформа прямої дії для гідного житла, легальної праці та взаєморозуміння у Швейцарії." : "Plateforme souveraine d'insertion et d'intégration territoriale pour la Suisse.")}</p>
            <p className="v2-foot-url">violin-integration.works · @SwissResilienceHubBot</p>
          </div>

          <div className="v2-foot-col">
            <h4>{isUk ? 'Модулі сервісу' : 'Modules'}</h4>
            <ul>
              <li><a href="#housing">{isUk ? 'Житло (EVAM / SBB)' : 'Logement vérifié (EVAM / SBB)'}</a></li>
              <li><a href="#prof">{isUk ? 'Робота та резюме (LEI)' : 'Offres d\'emploi & CV (LEI)'}</a></li>
              <li><a href="#calc">{isUk ? 'Кантональні норми (26)' : 'Barèmes cantonaux (26)'}</a></li>
              <li><a href="#dossier">{isUk ? 'Досьє для режі 1-Click' : 'Dossier régie 1-Click (USPI)'}</a></li>
              <li><a href="#sublease">{isUk ? 'Суборенда (ст. 262 CO)' : 'Sous-location 262 CO'}</a></li>
              <li><a href="#mentors">{isUk ? 'Ментори Benevol Suisse' : 'Mentors Benevol Suisse'}</a></li>
              <li><a href="#beta">{isUk ? 'Вільна бета-версія' : 'Transparence Bêta'}</a></li>
            </ul>
          </div>

          <div className="v2-foot-col">
            <h4>{isUk ? 'Про проєкт та інструкції' : 'L\'Accord Suisse'}</h4>
            <ul>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('about'); else window.location.hash = 'about'; }}>
                  🏛️ {t?.nav?.about || (isUk ? 'Про проєкт' : 'À propos')}
                </a>
              </li>
              <li>
                <a href="#guide" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('guide'); else window.location.hash = 'guide'; }}>
                  📖 {t?.nav?.guide || (isUk ? 'Як користуватись' : 'Mode d\'emploi')}
                </a>
              </li>
              <li>
                <a href="#why" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('why'); else window.location.hash = 'why'; }}>
                  ⭐ {t?.nav?.why || (isUk ? 'Чому ми кращі' : 'Pourquoi ACCORD ?')}
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => { if (onOpenInfo && window.innerWidth > 600) { e.preventDefault(); onOpenInfo('privacy'); } }}>
                  🛡️ {t?.nav?.privacy || (isUk ? 'Політика конфіденційності (nDSG)' : 'Confidentialité (nLPD)')}
                </a>
              </li>
              <li>
                <a href="https://sonate-solidaire.me" target="_blank" rel="noopener noreferrer">
                  🎻 Sonate Solidaire (Arsen Kovalenko) ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="v2-foot-col">
            <h4>{isUk ? 'Закон та нагляд' : 'Conformité & Droit'}</h4>
            <ul>
              <li><a href="/privacy">nDSG / RGPD · Protection données</a></li>
              <li><a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">EDÖB / PFPDT (Bern) ↗</a></li>
              <li><a>Art. 262 CO · Sous-location</a></li>
              <li><a>Art. 21a LEI · Priorité ORP</a></li>
              <li><a>Art. 394 CO · Mandat gratuit</a></li>
              <li><a>Art. 60–79 CC · Association</a></li>
              <li><a>Loi LSE/AVG · 100% Gratuit</a></li>
            </ul>
          </div>
        </div>

        <div className="v2-compliance-row">
          <span className="v2-comp-chip">SKOS · CH</span>
          <span className="v2-comp-chip">CCNT / CCT</span>
          <span className="v2-comp-chip">Benevol Suisse</span>
          <span className="v2-comp-chip">USPI · ASLOCA</span>
          <span className="v2-comp-chip">SECO · Art. 21a LEI</span>
          <span className="v2-comp-chip cyan">nDSG / RGPD</span>
          <span className="v2-comp-chip">WCAG 2.1 AA</span>
          <span className="v2-comp-chip">TMA v7.10</span>
        </div>
        <div className="v2-foot-legal">
          © 2026 ACCORD Suisse / Swiss Resilience — Association en cours de constitution · Genève / Vaud · Art. 60–79 CC Suisse.
          <br/>
          Initiative citoyenne souveraine d'action directe initiée par Arsen Kovalenko (Avenue du Mont-Blanc 29, 1196 Gland). Données officielles (SKOS, EVAM, cantons, SECO, régies officielles mandatées, Tribunal fédéral). Strictement gratuit et sans commission.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterV2 });
