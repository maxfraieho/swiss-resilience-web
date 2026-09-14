// ACCORD Suisse — Legal and accessible footer with verified working links
function FooterV2({ t, onOpenInfo, lang = 'uk' }) {
  const isUk = lang === 'uk';

  return (
    <footer className="v2-footer">
      <div className="v2-container">
        <div className="v2-foot-grid">
          {/* Column 1: Brand & Purpose */}
          <div className="v2-foot-col">
            <div className="v2-brand" style={{ marginBottom: 14 }}>
              <span className="v2-brand-badge">
                <BrandMark size={24}/>
              </span>
              <span className="v2-brand-name">
                ACCORD
                <span>{isUk ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'}</span>
              </span>
            </div>
            <p style={{ lineHeight: 1.6, color: '#94A3B8', fontSize: 13 }}>
              {isUk
                ? "Вільний волонтерський проєкт взаємодопомоги у Швейцарії: перевірені квартири від агенцій, легальна робота та підтримка місцевих жителів без посередників і комісій."
                : "Plateforme citoyenne et bénévole pour le logement digne, l'emploi légal et l'intégration en Suisse Romande. 100% gratuit et sans intermédiaire."}
            </p>
            <p className="v2-foot-url" style={{ marginTop: 10 }}>
              <a
                href="https://t.me/SwissResilienceHubBot"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#38BDF8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
              >
                <span>✈️</span> @SwissResilienceHubBot
              </a>
            </p>
          </div>

          {/* Column 2: Module Services */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Сервіси' : 'Services'}</h4>
            <ul>
              <li><a href="#housing">{isUk ? 'Житло від режі (EVAM/SBB)' : 'Logement vérifié (EVAM / SBB)'}</a></li>
              <li><a href="#prof">{isUk ? 'Робота та резюме (LEI)' : 'Offres d\'emploi & CV (LEI)'}</a></li>
              <li><a href="#calc">{isUk ? 'Калькулятор норм (26 кантонів)' : 'Calculateur plafonds (26 cantons)'}</a></li>
              <li><a href="#dossier">{isUk ? 'Досьє для режі (1-Click)' : 'Dossier régie 1-Click (USPI)'}</a></li>
              <li><a href="#sublease">{isUk ? 'Суборенда кімнати (ст. 262 CO)' : 'Sous-location solidaire (262 CO)'}</a></li>
              <li><a href="#mentors">{isUk ? 'Швейцарські ментори Benevol' : 'Mentors bénévoles Benevol'}</a></li>
            </ul>
          </div>

          {/* Column 3: Information & Guides */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Корисне та довідка' : 'Guide & À propos'}</h4>
            <ul>
              <li>
                <a href="#guide" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('guide'); else window.location.hash = 'guide'; }}>
                  📖 {isUk ? 'Як користуватись сервісом' : 'Mode d\'emploi'}
                </a>
              </li>
              <li>
                <a href="#why" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('why'); else window.location.hash = 'why'; }}>
                  ⭐ {isUk ? 'Чому ми кращі (порівняння)' : 'Pourquoi ACCORD (comparatif)'}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); if (onOpenInfo) onOpenInfo('about'); else window.location.hash = 'about'; }}>
                  🏛️ {isUk ? 'Про проєкт АКОРД' : 'À propos du projet'}
                </a>
              </li>
              <li>
                <a href="/privacy">
                  🛡️ {isUk ? 'Політика конфіденційності (nDSG)' : 'Confidentialité (nLPD / RGPD)'}
                </a>
              </li>
              <li>
                <a href="https://sonate-solidaire.me" target="_blank" rel="noopener noreferrer">
                  🎻 Sonate Solidaire (Arsen Kovalenko) ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Swiss Portals (All working external links) */}
          <div className="v2-foot-col">
            <h4>{isUk ? 'Офіційні ресурси Швейцарії' : 'Ressources officielles'}</h4>
            <ul>
              <li>
                <a href="https://www.fedlex.admin.ch" target="_blank" rel="noopener noreferrer">
                  🇨🇭 Fedlex · Закони Швейцарії (CO / LEI) ↗
                </a>
              </li>
              <li>
                <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
                  🏛️ EDÖB · Захист персональних даних ↗
                </a>
              </li>
              <li>
                <a href="https://www.asloca.ch" target="_blank" rel="noopener noreferrer">
                  🏢 ASLOCA · Захист прав орендарів ↗
                </a>
              </li>
              <li>
                <a href="https://www.seco.admin.ch" target="_blank" rel="noopener noreferrer">
                  💼 SECO · Ринок праці Швейцарії ↗
                </a>
              </li>
              <li>
                <a href="https://www.benevol.ch" target="_blank" rel="noopener noreferrer">
                  🤝 Benevol Suisse · Мережа волонтерів ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Clean, meaningful trust badges */}
        <div className="v2-compliance-row" style={{ marginTop: 24 }}>
          <span className="v2-comp-chip">✓ 100% Безкоштовно (ст. 2 LSE)</span>
          <span className="v2-comp-chip">✓ Офіційні ліміти 26 кантонів</span>
          <span className="v2-comp-chip cyan">✓ Захист даних (nDSG / RGPD)</span>
          <span className="v2-comp-chip">✓ Спільнота волонтерів Benevol</span>
        </div>

        {/* Human, clear legal statement */}
        <div className="v2-foot-legal">
          © 2026 АКОРД Швейцарія (ACCORD Suisse) · Некомерційна волонтерська ініціатива взаємодопомоги. Ініціатор: Arsen Kovalenko (Avenue du Mont-Blanc 29, 1196 Gland).
          <br/>
          Усі дані надходять з офіційних джерел (кантони, SECO, офіційні житлові агенції). Сервіс створений для людей і ніколи не бере грошей за пошук роботи чи житла.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterV2 });
