// ACCORD-S · Landing Page — v2.7
// Double parcours : Bénéficiaires (Permis S) + Bénévoles Suisses
// Emploi vérifié · Logement · Mentorat · Bot Telegram entonnoir
// Multilingue dynamique : FR, DE, UK (UA), EN

const { useState, useMemo, useCallback, useEffect } = React;

/* ==================== BRAND MARK ==================== */
function BrandMark({ size = 40 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size, borderRadius: Math.round(size * 0.25) }}>
      <svg viewBox="0 0 40 40" width={Math.round(size * 0.65)} height={Math.round(size * 0.65)} aria-hidden="true">
        <rect x="17.5" y="10" width="5" height="20" rx="0.6" fill="white"/>
        <rect x="10" y="17.5" width="20" height="5" rx="0.6" fill="white"/>
        <path
          d="M14 6c-3.5 1.6-4.5 6.4-1.5 8.6"
          stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" strokeLinecap="round" fill="none"
        />
        <path
          d="M26 34c3.5-1.6 4.5-6.4 1.5-8.6"
          stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" strokeLinecap="round" fill="none"
        />
        <path
          d="M8 30c4 3 10 3.5 15 2.5"
          stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" fill="none"
          opacity="0.9"
        />
      </svg>
    </span>
  );
}

/* ==================== COMPLETE MULTILINGUAL I18N ==================== */
const I18N = {
  uk: {
    banner: "26 кантонів · 4 мови · Офіційні норми SEM / SECO · Працюючий Telegram-бот",
    nav: { pillars: "Чому АКОРД", jobs: "Вакансії", mentors: "Волонтери", assistant: "ШІ-Асистент" },
    hero: {
      pill: "АКОРД ШВЕЙЦАРІЯ · PERMIS S · БЕЗКОШТОВНО",
      title1: "Твоя дія у Швейцарії:",
      title2: "житло, робота та спільнота.",
      lede: "АКОРД усуває бюрократію та виснажливе очікування. Сповіщення в Telegram за 60 секунд, резюме та листи за швейцарськими стандартами та підтримка волонтерів — прямо у смартфоні, без посередників.",
      ctaBot: "Запустити АКОРД у Telegram",
      ctaApp: "Відкрити Mini App",
      reassure: "100% Безкоштовно",
      reassure2: "Без складної реєстрації",
      reassure3: "Закон про працю LSE · ст. 262 CO",
    },
    tabs: {
      seekers: "Шукачам · Permis S",
      seekersSub: "Робота, житло, досьє на оренду",
      volunteers: "Швейцарським волонтерам",
      volunteersSub: "Наставництво та гостинність",
    },
    trust: [
      { k: "Кантони", v: "26 / 26", d: "Офіційні ліміти Конфедерації" },
      { k: "Швидкість сповіщень", v: "< 60 сек", d: "Прямий пуш у Telegram" },
      { k: "Перевірені роботодавці", v: "63 вакансії", d: "Прямо, без агрегаторів · ст. 5 LCD" },
      { k: "Активні ментори", v: "148+", d: "Мережа Benevol Suisse зростає" },
    ],
    pillars: {
      eyebrow: "Чому АКОРД ?",
      title: "Чотири стовпи довіри, без складних термінів.",
      sub: "Прямий інструмент дії — у дусі знайомої цифрової зручності — створений для швейцарських реалій: швидкість, юридична точність і гідність.",
      items: [
        {
          idx: "01", cls: "pillar-1", icon: "⚡",
          title: "Швидкість, яка вирішує все",
          body: "Сповіщення в Telegram за лічені секунди після появи нової пропозиції. Відгукуйтесь першими — до напливу сотень інших кандидатів.",
          kpi: { n: "< 60 с", l: "швидкість сигналу" }
        },
        {
          idx: "02", cls: "pillar-2", icon: "🤖",
          title: "Швейцарський ШІ-копілот 24/7",
          body: "Адаптація CV до швейцарських кантональних норм, мотиваційні листи французькою та німецькою, та автоматична збірка досьє на оренду.",
          kpi: { n: "Claude · GPT", l: "швейцарські моделі" }
        },
        {
          idx: "03", cls: "pillar-3", icon: "🤝",
          title: "Швейцарські наставники та волонтери",
          body: "Підтримка від місцевих жителів: перевірка резюме, супровід на перегляди квартир, мовна практика. Офіційний цивільний мандат ст. 394 CO за стандартами Benevol.",
          kpi: { n: "148+", l: "активних наставників" }
        },
        {
          idx: "04", cls: "pillar-4", icon: "🛡️",
          title: "Повна повага та безпека",
          body: "Жодного спаму, дублікатів та застарілих оголошень. Повна відповідність ставкам вашого кантону і 100% безкоштовно згідно з законом LSE.",
          kpi: { n: "LPD · LSE", l: "відповідність закону" }
        }
      ]
    },
    jobs: {
      eyebrow: "Перевірена робота · ст. 17 та 21a LEI",
      title: "Вакансії від швейцарських роботодавців. Напряму. Без посередників.",
      sub: "Кожна вакансія веде безпосередньо до роботодавця. Офіційні зарплати за CCT, точний час потягом CFF SBB, прозорий правовий статус.",
      allCantons: "Усі кантони",
      activeCount: "активних вакансій · оновлення < 60 с",
      stellenBadge: "Вікно ORP 5 д · ст. 21a LEI",
      directBadge: "Прямий прийом · ст. 17 LEI",
      btnLetter: "Створити лист кандидатури",
      perMonth: "/ міс · CCT",
      from: "від"
    },
    assistant: {
      title: "Швейцарський ШІ-копілот · доступний у Telegram-боті",
      sub: "Допомагає на кожному етапі інтеграції: пояснює вакансії, адаптує CV за кантональними стандартами, складає досьє на житло та навчає ввічливому спілкуванню.",
      items: ["Швейцарський стандарт CV", "Мотиваційні листи", "Досьє на оренду", "Етикет спілкування"],
      cta: "Спробувати в боті"
    },
    vol: {
      eyebrow: "Станьте ментором · Волонтерство у Швейцарії",
      title: "Живете у Швейцарії? Поділіться вашим досвідом.",
      sub: "Гнучка участь від 1 до 3 годин на тиждень, без трудових зобов язань, у рамках цивільного права Швейцарії та стандартів Benevol Suisse.",
      accroche: "«Допоможіть родині або шукачу роботи інтегруватися — подаруйте те, що ви вже знаєте, там, де ви є.»",
      stats: [
        { n: "1 – 3 год", l: "/ тиждень · гнучкий графік" },
        { n: "148+", l: "активних менторів · 26 кантонів" },
        { n: "ст. 394", l: "CO · безоплатний цивільний мандат" },
        { n: "CH · LPD", l: "захист даних, швейцарський хостинг" }
      ],
      tracks: [
        { n: "01", icon: "📄", title: "Менторство з працевлаштування", body: "Перевірка резюме, пояснення швейцарських звичаїв роботи, тренування співбесіди французькою або німецькою.", legal: "ст. 394 CO" },
        { n: "02", icon: "🏠", title: "Підтримка з орендою житла", body: "Перевірка пакету документів, супровід на перегляди квартир з агентствами для впевненості орендодавців.", legal: "ASLOCA · USPI" },
        { n: "03", icon: "☕", title: "Мовна практика та кава", body: "Дружнє живе спілкування французькою або німецькою за чашкою кави, щоб подолати мовний бар єр.", legal: "Benevol Suisse" },
        { n: "04", icon: "🚪", title: "Гостинний господар", body: "Пропозиція кімнати або студії в законну та безпечну суборенду для родини, що облаштовується у Швейцарії.", legal: "ст. 262 CO" }
      ],
      ctaBtn: "Приєднатися до мережі швейцарських менторів",
      legalStrip: "Режим ментора · волонтерський профіль без пошукових сповіщень · повна безоплатність"
    },
    footer: {
      desc: "Офіційна асоціація у процесі створення (ст. 60–79 CC) · Женева / Во. Суверенна платформа територіальної інтеграції. Офіційні дані (SKOS, кантони, SECO, Федеральний суд). Відповідність ст. 5 LCD/UWG та ADR-018.",
      telegramLink: "Telegram-бот: @SwissResilienceHubBot · Назва: ACCORD | Швейцарія 🇨🇭"
    }
  },

  fr: {
    banner: "26 cantons · 4 langues · Conforme SEM / SECO · Bot Telegram opérationnel",
    nav: { pillars: "Pourquoi ACCORD", jobs: "Emplois", mentors: "Bénévoles", assistant: "Assistant IA" },
    hero: {
      pill: "L ACCORD SUISSE · PERMIS S · GRATUIT",
      title1: "Votre passerelle d action pour",
      title2: "logement, emploi et communauté.",
      lede: "ACCORD élimine la bureaucratie et l attente. Alertes Telegram en 60s, lettres de motivation aux normes suisses et jumelage avec des mentors bénévoles — depuis votre smartphone, sans intermédiaire.",
      ctaBot: "Lancer ACCORD sur Telegram",
      ctaApp: "Ouvrir la Mini App",
      reassure: "100% Gratuit",
      reassure2: "Sans inscription complexe",
      reassure3: "Conforme LSE · Art. 262 CO",
    },
    tabs: {
      seekers: "Bénéficiaires · Permis S",
      seekersSub: "Emploi, logement, dossier de bail",
      volunteers: "Bénévoles suisses",
      volunteersSub: "Mentorat & hôtes solidaires",
    },
    trust: [
      { k: "Cantons couverts", v: "26 / 26", d: "Barèmes officiels de la Confédération" },
      { k: "Réactivité alertes", v: "< 60 sec", d: "Notification Telegram en direct" },
      { k: "Employeurs vérifiés", v: "63 offres", d: "Direct, sans agrégateur tiers · Art. 5 LCD" },
      { k: "Mentors actifs", v: "148+", d: "Réseau Benevol Suisse en croissance" },
    ],
    pillars: {
      eyebrow: "Pourquoi ACCORD ?",
      title: "Quatre piliers de confiance, sans jargon.",
      sub: "Un outil d émancipation direct — dans l esprit de Дія — pensé pour la réalité suisse : rapidité, précision juridique et dignité.",
      items: [
        {
          idx: "01", cls: "pillar-1", icon: "⚡",
          title: "La réactivité qui change tout",
          body: "Des alertes Telegram déclenchées en moins de 60 secondes après chaque nouvelle offre validée. Postulez avant la saturation des candidatures — l écart concurrentiel décisif en Suisse.",
          kpi: { n: "< 60 s", l: "délai alerte" }
        },
        {
          idx: "02", cls: "pillar-2", icon: "🤖",
          title: "Co-pilote IA suisse · 24/7",
          body: "Relecture de CV aux standards helvétiques, lettre de motivation en français romand adaptée à chaque poste, et constitution automatisée du dossier de bail (poursuites, attestation EVAM).",
          kpi: { n: "Claude · GPT", l: "modèles suisses" }
        },
        {
          idx: "03", cls: "pillar-3", icon: "🤝",
          title: "Mentors & bénévoles suisses",
          body: "Jumelage bienveillant avec des résidentes et résidents locaux qui vous accompagnent — CV, visite d appartement, entretien d embauche. Cadre juridique Art. 394 CO · standards Benevol Suisse.",
          kpi: { n: "148+", l: "mentors actifs" }
        },
        {
          idx: "04", cls: "pillar-4", icon: "🛡️",
          title: "Respect total & sécurité",
          body: "Zéro spam, zéro doublon, conformité aux barèmes officiels de chaque canton et gratuité totale selon la LSE. Vos données restent souveraines — infrastructure hébergée en Suisse.",
          kpi: { n: "LPD · LSE", l: "conformité" }
        }
      ]
    },
    jobs: {
      eyebrow: "Emploi vérifié · Art. 17 & 21a LEI",
      title: "Offres d employeurs suisses. Direct. Sans intermédiaire.",
      sub: "Chaque annonce est attribuée à son employeur d origine — aucun agrégateur tiers (Art. 5 LCD/UWG). Salaires selon CCT, trajet CFF réel, statut légal transparent.",
      allCantons: "Tous les cantons",
      activeCount: "offres actives · mise à jour < 60 s",
      stellenBadge: "Délai ORP 5 j · Art. 21a LEI",
      directBadge: "Embauche immédiate · Art. 17 LEI",
      btnLetter: "Générer lettre suisse",
      perMonth: "/ mois · CCT",
      from: "depuis"
    },
    assistant: {
      title: "Co-pilote IA suisse · disponible dans le bot Telegram",
      sub: "Votre assistant personnel pour chaque démarche : analyse des postes, lettres de motivation sur mesure, conformité des baux et entraînement aux entretiens.",
      items: ["CV suisse standard", "Lettres de motivation", "Dossier de bail", "Politesse & étiquette"],
      cta: "Tester dans le bot"
    },
    vol: {
      eyebrow: "Devenez mentor · Bénévolat suisse",
      title: "Vous vivez en Suisse ? Transmettez votre expérience.",
      sub: "Un engagement souple de 1 à 3 heures par semaine, sans lien d emploi, cadré par le droit civil suisse et les standards Benevol Suisse.",
      accroche: "« Aidez une famille ou un réfugié à s intégrer — offrez ce que vous savez déjà, là où vous êtes. »",
      stats: [
        { n: "1 – 3 h", l: "/ semaine · engagement souple" },
        { n: "148+", l: "mentors actifs · 26 cantons" },
        { n: "Art. 394", l: "CO · mandat civil gratuit" },
        { n: "CH · LPD", l: "données souveraines, hébergement suisse" }
      ],
      tracks: [
        { n: "01", icon: "📄", title: "Mentorat emploi", body: "Relecture de CV, explication des coutumes professionnelles suisses, simulation d entretien d embauche en français ou allemand.", legal: "Art. 394 CO" },
        { n: "02", icon: "🏠", title: "Soutien au logement", body: "Relecture des dossiers de candidature, accompagnement lors des visites d appartement avec les régies pour rassurer les propriétaires.", legal: "ASLOCA · USPI" },
        { n: "03", icon: "☕", title: "Échange & conversation", body: "Pratique conviviale du français ou de l allemand autour d un café, pour débloquer la parole et créer un lien humain durable.", legal: "Benevol Suisse" },
        { n: "04", icon: "🚪", title: "Hôte solidaire", body: "Proposition d une chambre ou d un studio en sous-location légale et sécurisée pour une famille arrivant en Suisse.", legal: "Art. 262 CO" }
      ],
      ctaBtn: "Rejoindre le réseau des mentors suisses",
      legalStrip: "Mode mentor · profil bénévole sans alertes de recherche · gratuité totale"
    },
    footer: {
      desc: "Association en création · Genève / Vaud · Art. 60–79 CC. Plateforme d intelligence territoriale souveraine. Données officielles (SKOS, cantons, SECO, régies mandatées, Tribunal fédéral). Conformité LCD/UWG Art. 5 & ADR-018 source-agnostique.",
      telegramLink: "Bot Telegram: @SwissResilienceHubBot · Nom affiché: ACCORD | Швейцарія 🇨🇭"
    }
  },

  de: {
    banner: "26 Kantone · 4 Sprachen · Konform mit SEM / SECO · Telegram-Bot betriebsbereit",
    nav: { pillars: "Warum AKKORD", jobs: "Stellen", mentors: "Freiwillige", assistant: "KI-Assistent" },
    hero: {
      pill: "AKKORD SCHWEIZ · STATUS S · KOSTENLOS",
      title1: "Ihre aktive Plattform für",
      title2: "Wohnen, Arbeit und Gemeinschaft.",
      lede: "AKKORD beseitigt Bürokratie und Wartezeiten. Telegram-Benachrichtigungen in 60 Sekunden, Schweizer Bewerbungsschreiben und Vermittlung von freiwilligen Mentoren — direkt auf Ihrem Smartphone, ohne Zwischenhändler.",
      ctaBot: "AKKORD auf Telegram starten",
      ctaApp: "Mini App öffnen",
      reassure: "100% Kostenlos",
      reassure2: "Ohne komplizierte Registrierung",
      reassure3: "Konform mit AVG · Art. 262 OR",
    },
    tabs: {
      seekers: "Stellensuchende · Status S",
      seekersSub: "Arbeit, Wohnen, Mietdossier",
      volunteers: "Schweizer Freiwillige",
      volunteersSub: "Mentoring & solidarische Gastgeber",
    },
    trust: [
      { k: "Abgedeckte Kantone", v: "26 / 26", d: "Offizielle Richtlinien des Bundes" },
      { k: "Reaktionszeit", v: "< 60 Sek", d: "Direkte Telegram-Benachrichtigung" },
      { k: "Geprüfte Arbeitgeber", v: "63 Stellen", d: "Direkt, ohne Drittaggregatoren · Art. 5 UWG" },
      { k: "Aktive Mentoren", v: "148+", d: "Wachsendes Benevol Schweiz Netzwerk" },
    ],
    pillars: {
      eyebrow: "Warum AKKORD ?",
      title: "Vier Säulen des Vertrauens, ohne Fachjargon.",
      sub: "Ein direktes Werkzeug zur Selbstbestimmung — im Geist moderner digitaler Einfachheit — konzipiert für die Schweizer Realität: Schnelligkeit, Rechtssicherheit und Würde.",
      items: [
        {
          idx: "01", cls: "pillar-1", icon: "⚡",
          title: "Schnelligkeit, die entscheidet",
          body: "Telegram-Meldungen in weniger als 60 Sekunden nach Veröffentlichung. Bewerben Sie sich zuerst, bevor Stellen überlaufen sind.",
          kpi: { n: "< 60 s", l: "Meldezeit" }
        },
        {
          idx: "02", cls: "pillar-2", icon: "🤖",
          title: "Schweizer KI-Copilot · 24/7",
          body: "Lebenslaufprüfung nach Schweizer Standards, Motivationsschreiben auf Deutsch und Französisch, automatisierte Zusammenstellung des Mietdossiers.",
          kpi: { n: "Claude · GPT", l: "geprüfte Modelle" }
        },
        {
          idx: "03", cls: "pillar-3", icon: "🤝",
          title: "Schweizer Mentoren & Freiwillige",
          body: "Begleitung durch Einheimische — Lebenslauf, Wohnungsbesichtigung, Vorstellungsgespräch. Rechtsrahmen Art. 394 OR · Benevol Schweiz Standards.",
          kpi: { n: "148+", l: "aktive Mentoren" }
        },
        {
          idx: "04", cls: "pillar-4", icon: "🛡️",
          title: "Voller Respekt & Sicherheit",
          body: "Kein Spam, keine Duplikate, Einhaltung kantonaler Richtlinien und vollständige Kostenlosigkeit nach AVG. Souveräne Datenhaltung in der Schweiz.",
          kpi: { n: "DSG · AVG", l: "Rechtskonformität" }
        }
      ]
    },
    jobs: {
      eyebrow: "Geprüfte Stellen · Art. 17 & 21a AIG",
      title: "Angebote von Schweizer Arbeitgebern. Direkt. Ohne Vermittler.",
      sub: "Jede Stelle führt direkt zum Arbeitgeber. Faire Löhne nach GAV, genaue SBB-Fahrzeit, transparenter Rechtsstatus.",
      allCantons: "Alle Kantone",
      activeCount: "aktive Stellen · Aktualisierung < 60 s",
      stellenBadge: "RAV-Frist 5 Tage · Art. 21a AIG",
      directBadge: "Sofortige Anstellung · Art. 17 AIG",
      btnLetter: "Bewerbungsschreiben erstellen",
      perMonth: "/ Monat · GAV",
      from: "ab"
    },
    assistant: {
      title: "Schweizer KI-Copilot · im Telegram-Bot verfügbar",
      sub: "Unterstützt Sie bei jedem Schritt: erklärt Stelleninserate, optimiert Lebensläufe nach kantonalen Standards und erstellt Mietdossiers.",
      items: ["Schweizer Lebenslauf", "Motivationsschreiben", "Mietdossier", "Umgang & Höflichkeit"],
      cta: "Im Bot testen"
    },
    vol: {
      eyebrow: "Mentor werden · Freiwilligenarbeit Schweiz",
      title: "Sie leben in der Schweiz? Teilen Sie Ihre Erfahrung.",
      sub: "Ein flexibles Engagement von 1 bis 3 Stunden pro Woche, ohne Arbeitsverhältnis, geregelt nach Schweizer Zivilrecht und Benevol-Standards.",
      accroche: "«Helfen Sie einer Familie oder einem Geflüchteten bei der Integration — geben Sie weiter, was Sie bereits wissen.»",
      stats: [
        { n: "1 – 3 Std", l: "/ Woche · flexibel" },
        { n: "148+", l: "aktive Mentoren · 26 Kantone" },
        { n: "Art. 394", l: "OR · unentgeltlicher Auftrag" },
        { n: "CH · DSG", l: "Schweizer Hosting" }
      ],
      tracks: [
        { n: "01", icon: "📄", title: "Job-Mentoring", body: "Lebenslaufprüfung, Erklärung der Schweizer Arbeitskultur, Vorbereitung auf Bewerbungsgespräche.", legal: "Art. 394 OR" },
        { n: "02", icon: "🏠", title: "Wohnungssuche", body: "Prüfung von Bewerbungsdossiers, Begleitung zu Wohnungsbesichtigungen mit Verwaltungen.", legal: "MV · USPI" },
        { n: "03", icon: "☕", title: "Austausch & Sprache", body: "Konversation auf Deutsch oder Französisch bei einem Kaffee, um Sprachbarrieren abzubauen.", legal: "Benevol Schweiz" },
        { n: "04", icon: "🚪", title: "Gastgeber sein", body: "Angebot eines Zimmers oder Studios zur legalen und sicheren Untermiete für eine ankommende Familie.", legal: "Art. 262 OR" }
      ],
      ctaBtn: "Dem Schweizer Mentoren-Netzwerk beitreten",
      legalStrip: "Mentoren-Modus · Freiwilligenprofil ohne Suchalarme · 100% unentgeltlich"
    },
    footer: {
      desc: "Offizieller Verein in Gründung (Art. 60–79 ZGB) · Genf / Waadt. Souveräne territoriale Integrationsplattform. Offizielle Daten (SKOS, Kantone, SECO, Bundesgericht). Konform mit Art. 5 UWG und ADR-018.",
      telegramLink: "Telegram-Bot: @SwissResilienceHubBot · Angezeigter Name: ACCORD | Schweiz 🇨🇭"
    }
  },

  en: {
    banner: "26 cantons · 4 languages · SEM / SECO compliant · Active Telegram Bot",
    nav: { pillars: "Why ACCORD", jobs: "Jobs", mentors: "Volunteers", assistant: "AI Assistant" },
    hero: {
      pill: "ACCORD SWISS · PERMIT S · FREE",
      title1: "Your action gateway for",
      title2: "housing, employment and community.",
      lede: "ACCORD eliminates bureaucracy and waiting. Telegram alerts in 60 seconds, Swiss-standard cover letters and matching with volunteer mentors — directly on your smartphone.",
      ctaBot: "Launch ACCORD on Telegram",
      ctaApp: "Open Mini App",
      reassure: "100% Free",
      reassure2: "No complex registration",
      reassure3: "Compliant with LSE · Art. 262 CO",
    },
    tabs: {
      seekers: "Job & Housing Seekers · Permit S",
      seekersSub: "Jobs, housing, lease application",
      volunteers: "Swiss Volunteers",
      volunteersSub: "Mentorship & friendly hosts",
    },
    trust: [
      { k: "Covered Cantons", v: "26 / 26", d: "Official Swiss Confederation scales" },
      { k: "Alert Speed", v: "< 60 sec", d: "Direct Telegram push notification" },
      { k: "Verified Employers", v: "63 jobs", d: "Direct, no third-party scrapers · Art. 5 LCD" },
      { k: "Active Mentors", v: "148+", d: "Growing Benevol Switzerland network" },
    ],
    pillars: {
      eyebrow: "Why ACCORD ?",
      title: "Four pillars of trust, without jargon.",
      sub: "A direct self-empowerment tool — inspired by modern digital agility — crafted for Swiss realities: speed, legal precision, and human dignity.",
      items: [
        {
          idx: "01", cls: "pillar-1", icon: "⚡",
          title: "Speed that makes the difference",
          body: "Telegram alerts triggered in less than 60 seconds. Apply first, before vacancies are flooded with applications.",
          kpi: { n: "< 60 s", l: "alert delay" }
        },
        {
          idx: "02", cls: "pillar-2", icon: "🤖",
          title: "Swiss AI Co-Pilot · 24/7",
          body: "Swiss resume review, tailored French/German cover letters, and automated rental dossier packaging.",
          kpi: { n: "Claude · GPT", l: "verified models" }
        },
        {
          idx: "03", cls: "pillar-3", icon: "🤝",
          title: "Swiss Mentors & Volunteers",
          body: "Guidance from locals: CV review, housing visits, mock interviews. Civil mandate under Art. 394 CO & Benevol standards.",
          kpi: { n: "148+", l: "active mentors" }
        },
        {
          idx: "04", cls: "pillar-4", icon: "🛡️",
          title: "Total Respect & Security",
          body: "Zero spam, zero duplicates, compliance with cantonal welfare thresholds, and 100% free under Swiss employment law (LSE).",
          kpi: { n: "FADP · LSE", l: "compliance" }
        }
      ]
    },
    jobs: {
      eyebrow: "Verified Jobs · Art. 17 & 21a LEI",
      title: "Jobs from Swiss employers. Direct. No intermediaries.",
      sub: "Every job posting links directly to the employer. CLA/CCT standard salaries, real SBB transit time, transparent legal status.",
      allCantons: "All cantons",
      activeCount: "active jobs · updated < 60s",
      stellenBadge: "ORP/RAV 5-day window · Art. 21a LEI",
      directBadge: "Immediate hiring · Art. 17 LEI",
      btnLetter: "Generate Swiss application letter",
      perMonth: "/ month · CLA",
      from: "from"
    },
    assistant: {
      title: "Swiss AI Co-Pilot · available in Telegram Bot",
      sub: "Supports your integration journey: explains job requirements, tailors resumes to cantonal standards, and assists in lease dossiers.",
      items: ["Swiss CV standard", "Cover letters", "Housing dossier", "Swiss etiquette"],
      cta: "Try in Telegram Bot"
    },
    vol: {
      eyebrow: "Become a mentor · Volunteering in Switzerland",
      title: "Living in Switzerland? Share your experience.",
      sub: "A flexible commitment of 1 to 3 hours per week, under Swiss civil law and Benevol Switzerland standards.",
      accroche: "«Help a family or refugee integrate — share what you already know, right where you are.»",
      stats: [
        { n: "1 – 3 hrs", l: "/ week · flexible" },
        { n: "148+", l: "active mentors · 26 cantons" },
        { n: "Art. 394", l: "CO · gratuitous civil mandate" },
        { n: "CH · FADP", l: "sovereign Swiss hosting" }
      ],
      tracks: [
        { n: "01", icon: "📄", title: "Career Mentoring", body: "Resume feedback, Swiss workplace culture advice, mock interviews in French or German.", legal: "Art. 394 CO" },
        { n: "02", icon: "🏠", title: "Housing Support", body: "Application file review, accompaniment to rental viewings with property management agencies.", legal: "ASLOCA · USPI" },
        { n: "03", icon: "☕", title: "Language & Coffee", body: "Friendly conversation practice in French or German to break the language barrier.", legal: "Benevol Switzerland" },
        { n: "04", icon: "🚪", title: "Solidarity Host", body: "Offering a room or studio for safe, legal subletting to a family arriving in Switzerland.", legal: "Art. 262 CO" }
      ],
      ctaBtn: "Join the Swiss Mentors Network",
      legalStrip: "Mentor mode · volunteer profile with no job search alerts · 100% gratuitous"
    },
    footer: {
      desc: "Official non-profit association in formation (Art. 60–79 CC) · Geneva / Vaud. Sovereign territorial integration platform. Official data (SKOS, Cantons, SECO, Federal Court). Compliant with Art. 5 LCD/UWG & ADR-018.",
      telegramLink: "Telegram Bot: @SwissResilienceHubBot · Display Name: ACCORD | Switzerland 🇨🇭"
    }
  }
};

/* ==================== TOP BANNER + NAV ==================== */
function TopBanner({ t }) {
  return (
    <div className="top-banner" role="status">
      <div className="top-banner-inner">
        <span className="pulse-dot" aria-hidden="true"/>
        <span>{t.banner}</span>
      </div>
    </div>
  );
}

function Nav({ lang, setLang, t }) {
  const langs = [
    { id: "fr", label: "FR", flag: "🇫🇷" },
    { id: "de", label: "DE", flag: "🇩🇪" },
    { id: "uk", label: "UK", flag: "🇺🇦" },
    { id: "en", label: "EN", flag: "🇬🇧" },
  ];
  return (
    <header className="nav" role="banner">
      <div className="nav-row">
        <a href="#top" className="brand" aria-label="ACCORD Suisse">
          <BrandMark size={40}/>
          <div className="brand-text">
            <span className="brand-name">ACCORD <em>Suisse</em></span>
            <span className="brand-tag">L'ACCORD · v2.7</span>
          </div>
        </a>

        <nav className="nav-mid" aria-label="Sections">
          <div className="nav-links">
            <a className="nav-link" href="#pillars">{t.nav.pillars}</a>
            <a className="nav-link" href="#jobs">{t.nav.jobs}</a>
            <a className="nav-link" href="#mentors">{t.nav.mentors}</a>
            <a className="nav-link" href="#assistant">{t.nav.assistant}</a>
          </div>
        </nav>

        <div className="nav-actions">
          <div className="lang-toggle" role="radiogroup" aria-label="Langue">
            {langs.map(l => (
              <button
                key={l.id}
                className={`lang-btn ${lang === l.id ? "active" : ""}`}
                role="radio"
                aria-checked={lang === l.id}
                onClick={() => setLang(l.id)}
              >
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
          <a
            href="https://t.me/SwissResilienceHubBot?start=web_nav"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-tg"
            style={{ padding: "8px 14px", fontSize: 12.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>@SwissResilienceHubBot</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ==================== HERO ==================== */
function Hero({ side, setSide, t }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-pill">
          <span className="hero-pill-dot" aria-hidden="true"/>
          <span>{t.hero.pill}</span>
        </div>

        <h1 className="hero-title">
          <span>{t.hero.title1}</span>
          <span className="gradient-text">{t.hero.title2}</span>
        </h1>

        <p className="hero-lede">{t.hero.lede}</p>

        <div className="hero-cta-row">
          <a
            href="https://t.me/SwissResilienceHubBot?start=seeker"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>{t.hero.ctaBot}</span>
          </a>
          <a
            href="https://violin-integration.works/app/"
            target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            <span>{t.hero.ctaApp}</span>
          </a>
        </div>

        <div className="hero-reassure">
          <span>✓ {t.hero.reassure}</span>
          <span>·</span>
          <span>✓ {t.hero.reassure2}</span>
          <span>·</span>
          <span>✓ {t.hero.reassure3}</span>
        </div>

        <div className="side-tabs" role="tablist" aria-label="Parcours">
          <button
            className={`side-tab side-a ${side === "a" ? "active" : ""}`}
            role="tab" aria-selected={side === "a"}
            onClick={() => setSide("a")}
          >
            <span className="side-tab-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="side-tab-body">
              <span className="side-tab-label">{t.tabs.seekers}</span>
              <span className="side-tab-sub">{t.tabs.seekersSub}</span>
            </span>
          </button>
          <button
            className={`side-tab side-b ${side === "b" ? "active" : ""}`}
            role="tab" aria-selected={side === "b"}
            onClick={() => setSide("b")}
          >
            <span className="side-tab-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </span>
            <span className="side-tab-body">
              <span className="side-tab-label">{t.tabs.volunteers}</span>
              <span className="side-tab-sub">{t.tabs.volunteersSub}</span>
            </span>
          </button>
        </div>

        <div className="trust-grid">
          {t.trust.map((m, i) => (
            <div key={i} className={`trust-tile rail-${["emerald","crimson","gold","blue"][i % 4]}`}>
              <div className="trust-label">{m.k}</div>
              <div className="trust-value">{m.v}</div>
              <div className="trust-desc">{m.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== PILLARS 2x2 ==================== */
function Pillars({ t }) {
  const pData = t.pillars;
  return (
    <section className="section" id="pillars">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow crimson">
            <span>◆</span> {pData.eyebrow}
          </span>
          <h2 className="section-title">{pData.title}</h2>
          <p className="section-sub">{pData.sub}</p>
        </div>

        <div className="pillars">
          {pData.items.map(p => (
            <article key={p.idx} className={`pillar ${p.cls}`}>
              <div className="pillar-glow" aria-hidden="true"/>
              <div className="pillar-head">
                <div className="pillar-icon" aria-hidden="true">{p.icon}</div>
                <div>
                  <div className="pillar-index">0{p.idx}</div>
                </div>
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
              <div className="pillar-kpi">
                <span className="pillar-kpi-num">{p.kpi.n}</span>
                <span className="pillar-kpi-lbl">{p.kpi.l}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== JOB CATALOGUE ==================== */
const JOBS = [
  {
    id: "j1",
    title: "Opérateur d'assemblage micromécanique — salle blanche (h/f)",
    company: "Medtronic Tolochenaz Sàrl",
    initials: "MT",
    city: "Tolochenaz",
    canton: "VD",
    salaryMin: 4350, salaryMax: 5833,
    stellen: false,
    sbb: 7, sbbFrom: "Morges",
    workload: "80–100 %",
  },
  {
    id: "j2",
    title: "Agent logistique · préparateur de commandes (h/f/d)",
    company: "Decathlon Logistics Etoy",
    initials: "DL",
    city: "Etoy", canton: "VD",
    salaryMin: 4333, salaryMax: 5667,
    stellen: false,
    sbb: 12, sbbFrom: "Lausanne",
    workload: "100 %",
  },
  {
    id: "j3",
    title: "Technicien SAV hardware & reconditionnement informatique",
    company: "ReTech Solutions Suisse SA",
    initials: "RT",
    city: "Morges", canton: "VD",
    salaryMin: 4600, salaryMax: 5900,
    stellen: false,
    sbb: 7, sbbFrom: "Lausanne",
    workload: "80–100 %",
  },
  {
    id: "j4",
    title: "Application Manager SAP PP/QM",
    company: "BELIMO Automation AG",
    initials: "BA",
    city: "Hinwil", canton: "ZH",
    salaryMin: 6800, salaryMax: 8500,
    stellen: true,
    sbb: 24, sbbFrom: "Zürich HB",
    workload: "80–100 %",
  },
  {
    id: "j5",
    title: "Product Designer · Peripherals & Ecosystem",
    company: "Logitech Europe SA",
    initials: "LG",
    city: "Lausanne", canton: "VD",
    salaryMin: 7200, salaryMax: 9200,
    stellen: true,
    sbb: 4, sbbFrom: "Lausanne",
    workload: "100 %",
  },
  {
    id: "j6",
    title: "Aide-soignant EMS · nuit (CFC ou expérience validée)",
    company: "EMS La Colombière · Vaud",
    initials: "LC",
    city: "Nyon", canton: "VD",
    salaryMin: 4650, salaryMax: 5250,
    stellen: false,
    sbb: 3, sbbFrom: "Nyon",
    workload: "60–80 %",
  },
];

function formatCHF(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function JobCard({ job, t }) {
  const stellen = job.stellen;
  const openLetter = () => {
    window.open(`https://t.me/SwissResilienceHubBot?start=letter_${job.id}`, "_blank", "noopener,noreferrer");
  };
  return (
    <article className="job-card">
      <div className="job-badges">
        {stellen ? (
          <span className="badge badge-gold">
            <span className="badge-dot" aria-hidden="true"/>
            {t.jobs.stellenBadge}
          </span>
        ) : (
          <span className="badge badge-emerald">
            <span className="badge-dot" aria-hidden="true"/>
            {t.jobs.directBadge}
          </span>
        )}
        <span className="badge badge-neutral">Permis S ✓</span>
      </div>

      <h3 className="job-title">{job.title}</h3>

      <div className="job-company">
        <div className="company-logo" aria-hidden="true">{job.initials}</div>
        <span>{job.company}</span>
      </div>

      <div className="job-salary">
        <span>
          <span style={{ color: "var(--muted)", fontSize: 12, marginRight: 6 }}>CHF</span>
          {formatCHF(job.salaryMin)} – {formatCHF(job.salaryMax)}
        </span>
        <span className="job-salary-per">{t.jobs.perMonth}</span>
      </div>

      <div className="job-meta">
        <span className="item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16"/><path d="M8 3v4M16 3v4"/><path d="M8 21l-2 2M16 21l2 2"/></svg>
          <strong style={{ color: "var(--fg)" }}>{job.sbb} min</strong>
          <span style={{ color: "var(--muted)" }}>· {t.jobs.from} {job.sbbFrom}</span>
        </span>
        <span style={{ color: "var(--muted-2)" }}>·</span>
        <span className="canton-tag">{job.canton}</span>
        <span style={{ marginLeft: "auto", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{job.workload}</span>
      </div>

      <div className="job-actions">
        <button className="job-btn-primary" onClick={openLetter}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>
          {t.jobs.btnLetter}
        </button>
        <a
          className="job-btn-ghost"
          href={`https://www.job-room.ch/job-advertisements/${job.id}`}
          target="_blank" rel="noopener noreferrer"
          aria-label="Voir l annonce officielle"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
        </a>
      </div>
    </article>
  );
}

const CANTONS = ["Tous", "VD", "GE", "ZH", "BE", "FR"];

function JobsSection({ t }) {
  const [filter, setFilter] = useState("Tous");
  const visible = useMemo(() => filter === "Tous" ? JOBS : JOBS.filter(j => j.canton === filter), [filter]);
  const jData = t.jobs;

  return (
    <section className="section section-alt" id="jobs">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow emerald">
            <span>▲</span> {jData.eyebrow}
          </span>
          <h2 className="section-title">{jData.title}</h2>
          <p className="section-sub">{jData.sub}</p>
        </div>

        <div className="jobs-toolbar">
          <div className="filter-pills" role="tablist" aria-label="Filtrer par canton">
            {CANTONS.map(c => (
              <button
                key={c}
                className={`filter-pill ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
                role="tab"
                aria-selected={filter === c}
              >
                {c === "Tous" ? jData.allCantons : c}
              </button>
            ))}
          </div>
          <div className="jobs-count">⚡ {visible.length} {jData.activeCount}</div>
        </div>

        <div className="jobs-grid">
          {visible.map(j => <JobCard key={j.id} job={j} t={t}/>)}
        </div>
      </div>
    </section>
  );
}

/* ==================== VOLUNTEER (BÉNÉVOLES) ==================== */
function VolunteerSection({ t }) {
  const openBot = () => window.open("https://t.me/SwissResilienceHubBot?start=volunteer", "_blank", "noopener,noreferrer");
  const vData = t.vol;

  return (
    <section className="section" id="mentors">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow blue">
            <span>♥</span> {vData.eyebrow}
          </span>
          <h2 className="section-title">{vData.title}</h2>
          <p className="section-sub">{vData.sub}</p>
        </div>

        <div className="vol-shell">
          <div className="vol-head">
            <p className="vol-accroche">{vData.accroche}</p>
            <div className="vol-stats">
              {vData.stats.map((s, idx) => (
                <div key={idx} className="vol-stat">
                  <div className="vol-stat-num">{s.n}</div>
                  <div className="vol-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tracks-grid">
            {vData.tracks.map(tr => (
              <article key={tr.n} className="track">
                <div className="track-num">0{tr.n}</div>
                <div className="track-icon-title">
                  <span className="track-icon" aria-hidden="true">{tr.icon}</span>
                  <h3 className="track-title">{tr.title}</h3>
                </div>
                <p className="track-body">{tr.body}</p>
                <div className="track-legal">§ {tr.legal}</div>
              </article>
            ))}
          </div>

          <div className="vol-cta-row">
            <button className="btn btn-blue btn-lg" onClick={openBot}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {vData.ctaBtn}
            </button>
            <div className="vol-legal-strip">
              <span className="paragraph">§</span>
              <span>{vData.legalStrip}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== ASSISTANT IA ==================== */
function AssistantStrip({ t }) {
  const aData = t.assistant;
  const openBot = () => window.open("https://t.me/SwissResilienceHubBot?start=assistant", "_blank", "noopener,noreferrer");

  return (
    <section className="section" id="assistant" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="ai-strip">
          <div className="ai-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="7" width="16" height="12" rx="3"/>
              <circle cx="9" cy="13" r="1.2" fill="currentColor"/>
              <circle cx="15" cy="13" r="1.2" fill="currentColor"/>
              <path d="M12 3v4M8 19l-1.5 2M16 19l1.5 2"/>
            </svg>
          </div>
          <div>
            <p className="ai-title">{aData.title}</p>
            <p className="ai-sub">{aData.sub}</p>
            <div className="ai-pills">
              {aData.items.map((item, idx) => (
                <span key={idx} className="ai-pill">✓ {item}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-emerald" onClick={openBot} style={{ marginLeft: "auto", flexShrink: 0 }}>
            {aData.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==================== FOOTER ==================== */
function Footer({ t }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand-col">
            <div className="foot-brand">
              <BrandMark size={36}/>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>ACCORD <span style={{ color: "var(--swiss-red)", fontWeight: 400 }}>Suisse</span></div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>L'ACCORD · Plateforme d'action territoriale</div>
              </div>
            </div>
            <p className="foot-desc">{t.footer.desc}</p>
          </div>

          <div className="foot-col">
            <h4>ACCORD</h4>
            <ul>
              <li><a href="#pillars">{t.nav.pillars}</a></li>
              <li><a href="#jobs">{t.nav.jobs}</a></li>
              <li><a href="#mentors">{t.nav.mentors}</a></li>
              <li><a href="#assistant">{t.nav.assistant}</a></li>
              <li><a href="https://violin-integration.works/app/" target="_blank" rel="noreferrer">Mini App Telegram</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Références légales</h4>
            <ul>
              <li>Art. 17 LEI · Autorisation Permis S</li>
              <li>Art. 21a LEI · Priorité ORP</li>
              <li>Art. 262 CO · Sous-location</li>
              <li>Art. 394 CO · Mandat gratuit</li>
              <li>Art. 60–79 CC · Association</li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Conformité</h4>
            <ul>
              <li>LPD / GDPR-CH · SEM · SECO</li>
              <li>USPI · ASLOCA (Romandie)</li>
              <li>Benevol Suisse · SKOS</li>
              <li>WCAG 2.1 AA</li>
              <li>Art. 5 LCD/UWG · Source-agnostique</li>
            </ul>
          </div>
        </div>

        <div className="comp-strip">
          <span className="comp-chip crimson">SEM · Confédération</span>
          <span className="comp-chip">SKOS · CH</span>
          <span className="comp-chip">CCNT / CCT</span>
          <span className="comp-chip">Benevol Suisse</span>
          <span className="comp-chip">USPI · ASLOCA</span>
          <span className="comp-chip">SECO · Art. 21a LEI</span>
          <span className="comp-chip emerald">Merkle SHA-256</span>
          <span className="comp-chip">WCAG 2.1 AA</span>
          <span className="comp-chip">TMA v7.10</span>
        </div>

        <p className="foot-legal">
          © 2026 ACCORD Suisse — Association en création · Genève / Vaud · Art. 60–79 CC.
          {t.footer.desc}
          <br/>
          {t.footer.telegramLink}
        </p>
      </div>
    </footer>
  );
}

/* ==================== APP ROOT ==================== */
function App() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("accord-lang") || "uk"; } catch { return "uk"; }
  });
  const [side, setSide] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "volunteer" || tab === "mentors") return "b";
      if (tab === "jobs" || tab === "housing") return "a";
      return localStorage.getItem("accord-side") || "a";
    } catch { return "a"; }
  });

  useEffect(() => { try { localStorage.setItem("accord-lang", lang); } catch {} }, [lang]);
  useEffect(() => { try { localStorage.setItem("accord-side", side); } catch {} }, [side]);

  const t = I18N[lang] || I18N.uk || I18N.fr;

  return (
    <React.Fragment>
      <TopBanner t={t}/>
      <Nav lang={lang} setLang={setLang} t={t}/>
      <main>
        <Hero side={side} setSide={setSide} t={t}/>
        <Pillars t={t}/>
        {side === "a" ? (
          <>
            <JobsSection t={t}/>
            <AssistantStrip t={t}/>
            <VolunteerSection t={t}/>
          </>
        ) : (
          <>
            <VolunteerSection t={t}/>
            <AssistantStrip t={t}/>
            <JobsSection t={t}/>
          </>
        )}
      </main>
      <Footer t={t}/>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
