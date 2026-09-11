/**
 * Swiss Resilience Navigator 2.5 — Pan-Swiss Compliance & Community Engine
 * Module: calculator.js
 *
 * Implements:
 * 1. 26 Cantons rent ceiling lookup with official authorities (EVAM, Hospice Général, AOZ, GSI, etc.)
 * 2. CH-ISCO-19 Profession Explorer with 5-day Stellenmeldepflicht priority warning
 * 3. Art. 262 CO Swiss Host Subletting Calculator with 10–20% furniture surcharge cap
 * 4. Benevol Switzerland Volunteer Mentors Directory (Art. 394 CO)
 * 5. Full Quad-lingual parity: UA, FR, DE, IT across all elements
 * 6. Beta Voluntary Donation Modal with 30% ZSU / 70% server infra split
 */

import { CANTONS_26, CH_ISCO_19_PROFESSIONS } from './pan_swiss_data.js';

export const formatSwissNumber = (n) => {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

export const TRANSLATIONS = {
  ua: {
    top_banner: '⚡ Публічна бета-версія — Асоціація Swiss Resilience на стадії створення (ст. 60–79 ЦК Швейцарії) · Доступ безкоштовний',
    nav_radar: 'Житловий Радар',
    nav_calc: 'Калькулятор 26 кантонів',
    nav_orp: "Кар'єра CH-ISCO-19",
    nav_hosts: 'Швейцарська солідарність',
    nav_zsu: 'ЗСУ Прозорість',
    nav_pricing: 'Підтримати проєкт',
    btn_bot: 'Telegram Бот',
    btn_webapp: 'Відкрити Web App',
    btn_hub25: '🌐 Інтерактивний Hub 2.5',

    hero_pill: '⚡ ПАН-ШВЕЙЦАРСЬКЕ ПОКРИТТЯ · 26 КАНТОНІВ · ОФІЦІЙНІ СОЦІАЛЬНІ БАРЕМИ',
    hero_title: 'Гідне житло та легальна робота в Швейцарії <span class="accent">без посередників і комісій</span>',
    hero_sub: 'Прямий моніторинг житла за офіційними баремами EVAM, Hospice Général, AOZ, GSI та всіх 26 кантонів, безпечна суборенда кімнат (Art. 262 CO), ментори Benevol, вакансії CH-ISCO-19 зі Stellenmeldepflicht та добровільний солідарний внесок 30% на захист України.',
    hero_cta_app: '🚀 Відкрити Web App / Mini App',
    hero_cta_hub: '🌐 Відкрити Інтерактивний Hub 2.5',
    hero_cta_calc: '📊 Розрахувати барем кантону',
    hero_cta_host: '🇨🇭 Для швейцарських господарів (Art. 262 CO)',

    metric_legal_label: 'Правовий статус',
    metric_legal_val: 'Art. 60–79 CC',
    metric_legal_desc: 'Асоціація у процесі створення · Некомерційна платформа взаємодопомоги',
    metric_fees_label: 'Комісії посередникам',
    metric_fees_val: '0 CHF',
    metric_fees_desc: 'Жодних прихованих оплат чи комерційного рекрутингу (Art. 9 LSE)',
    metric_zsu_label: 'Солідарна допомога 🇺🇦',
    metric_zsu_val: '30%',
    metric_zsu_desc: 'фіксоване відрахування з добровільних пожертв на перевірені рахунки оборони (НБУ / Повернись живим)',

    calc_eyebrow: '02 · Pan-Swiss Compliance Engine',
    calc_title: 'Калькулятор соціальних орендних стель 26 кантонів',
    calc_sub: 'Оберіть кантон та склад сім\'ї — отримайте офіційний бюджет оренди, компетентний орган соціального захисту та юридичні підстави.',
    lbl_canton: 'Кантон Швейцарії',
    lbl_family: 'Склад сім\'ї',
    lbl_status: 'Статус забезпечення',
    status_social: 'Бенефіціар соціальної допомоги (EVAM, HG, AOZ, GSI...)',
    status_salary: 'Власний заробіток / контракт (ліміт платоспроможності 33%)',
    verdict_budget_label: 'Офіційний граничний бюджет оренди',
    verdict_authority_label: 'Уповноважений орган соціальної допомоги',
    verdict_legal_rec: 'Рекомендована процедура:',
    rec_reprise: 'Reprise de bail (Art. 264 CO) — фіксація поточної орендної плати без права режі на підвищення.',
    rec_sublet: 'Sous-location / Untermiete (Art. 262 CO) — законне суборендування кімнати з надбавкою за меблі 10–20%.',

    isco_eyebrow: '03 · CH-ISCO-19 Professional Classifier',
    isco_title: 'Швейцарський класифікатор професій та ринок праці',
    isco_sub: '15 секторів, квадрилінгвальні назви, відповідність кваліфікацій (AFP/CFC/Tertiaire) та перевірка пріоритету біржі праці (Stellenmeldepflicht).',
    lbl_sector: 'Сектор економіки',
    lbl_profession: 'Професія',
    badge_priority: '⚡ Stellenmeldepflicht (5 днів переваги на ORP/Job-Room)',
    badge_open: '🟢 Загальний ринок праці',
    isco_quals_title: 'Визнані рівні кваліфікації в Швейцарії:',
    isco_salary_title: 'Орієнтовна сітка зарплат (CCNT / Salarium):',

    hosts_eyebrow: '04 · Swiss Solidarity & Mentorship',
    hosts_title: 'Швейцарським господарям та волонтерам-наставникам',
    hosts_sub: 'Юридичний захист при суборенді кімнат за ст. 262 CO та мережа безоплатного менторства Benevol Switzerland.',
    sublet_calc_title: 'Калькулятор справедливої суборенди (Art. 262 CO)',
    lbl_net_rent: 'Повна чиста оренда квартири (CHF/міс)',
    lbl_rooms_total: 'Кількість кімнат у квартирі',
    lbl_furnishing: 'Меблювання кімнати (надбавка 10–20%)',
    sublet_room_rent: 'Справедлива оренда кімнати:',
    sublet_furn_cap: 'Макс. допустима надбавка за меблі:',
    sublet_tax_note: 'Компенсація за суборенду не оподатковується, якщо покриває лише пропорційні витрати на житло та комунальні послуги.',
    mentor_card_title: 'Волонтерське наставництво Benevol (Art. 394 CO)',
    mentor_card_desc: 'Швейцарські фахівці безоплатно допомагають з адаптацією CV, практикою французької/німецької мови та супроводом.',

    pricing_eyebrow: '05 · Public Beta & Solidarity Model',
    pricing_title: 'Підтримка проєкту на етапі публічного бета-тестування',
    pricing_sub: 'Комерційні тарифи деактивовано. Платформа повністю безкоштовна для шукачів житла та роботи. Ми приймаємо виключно добровільні пожертви.',
    beta_free_badge: 'БЕТА-ТЕСТ: БЕЗКОШТОВНО',
    btn_disabled_tier: 'Бета-доступ активний',
    btn_donate_open: '❤️ Зробити добровільну пожертву (30% на ЗСУ)',

    zsu_eyebrow: '06 · Cryptographic Transparency',
    zsu_title: 'Публічний Merkle-леджер солідарних внесків',
    zsu_sub: '30% кожної пожертви спрямовується на спецрахунок НБУ або фонд «Повернись живим». Жодного прихованого прибутку.',
    split_infra_title: 'Серверна інфраструктура (70%)',
    split_infra_desc: 'Appwrite Cloud Frankfurt, Flatfox REST API, парсери 26 кантонів, сертифікати шифрування.',
    split_zsu_title: '🇺🇦 На потреби ЗСУ (30%)',
    split_zsu_desc: 'Офіційний спецрахунок НБУ для оборони та фонд «Повернись живим» із фіксацією у Merkle-дереві.',

    foot_honesty: 'Ініціатива на стадії створення некомерційної асоціації (Art. 60–79 CC Suisse). Не є ліцензованим агентством з працевлаштування (Art. 9 LSE). Жодних оплат за пошук роботи не стягується.',
    foot_rights: '© 2026 Swiss Resilience Navigator · Слава Україні 🇺🇦 · Vive la Suisse 🇨🇭'
  },

  fr: {
    top_banner: '⚡ Version Bêta publique — Association Swiss Resilience en cours de constitution (Art. 60–79 CC Suisse) · Accès libre',
    nav_radar: 'Radar Logement',
    nav_calc: 'Calculateur 26 Cantons',
    nav_orp: 'Carrière CH-ISCO-19',
    nav_hosts: 'Solidarité Suisse',
    nav_zsu: 'Transparence ZSU',
    nav_pricing: 'Soutenir le Projet',
    btn_bot: 'Bot Telegram',
    btn_webapp: 'Ouvrir Web App',
    btn_hub25: '🌐 Hub Interactif 2.5',

    hero_pill: '⚡ COUVERTURE PAN-SUISSE · 26 CANTONS · BARÈMES SOCIAUX OFFICIELS',
    hero_title: 'Logement digne et emploi légal en Suisse <span class="accent">sans intermédiaire ni commission</span>',
    hero_sub: 'Suivi direct des logements selon les barèmes officiels EVAM, Hospice Général, AOZ, GSI et des 26 cantons, sous-location sécurisée (Art. 262 CO), mentors Benevol, métiers CH-ISCO-19 avec Stellenmeldepflicht et don volontaire de 30% pour la défense de l\'Ukraine.',
    hero_cta_app: '🚀 Ouvrir Web App / Mini App',
    hero_cta_hub: '🌐 Ouvrir le Hub Interactif 2.5',
    hero_cta_calc: '📊 Calculer le barème cantonal',
    hero_cta_host: '🇨🇭 Pour les hôtes suisses (Art. 262 CO)',

    metric_legal_label: 'Statut légal',
    metric_legal_val: 'Art. 60–79 CC',
    metric_legal_desc: 'Association en cours de constitution · Plateforme d\'entraide non marchande',
    metric_fees_label: 'Frais intermédiaires',
    metric_fees_val: '0 CHF',
    metric_fees_desc: 'Aucun frais caché ni placement payant illégal (Art. 9 LSE)',
    metric_zsu_label: 'Soutien Solidaire 🇺🇦',
    metric_zsu_val: '30%',
    metric_zsu_desc: 'Part fixe reversée sur comptes de défense officiels (BNS / Come Back Alive)',

    calc_eyebrow: '02 · Moteur de Conformité Pan-Suisse',
    calc_title: 'Calculateur des plafonds de loyer des 26 cantons',
    calc_sub: 'Choisissez votre canton et la taille du ménage pour obtenir le plafond officiel, l\'autorité compétente et les sources légales.',
    lbl_canton: 'Canton Suisse',
    lbl_family: 'Taille du ménage',
    lbl_status: 'Source de revenu',
    status_social: 'Bénéficiaire aide sociale (EVAM, HG, AOZ, GSI...)',
    status_salary: 'Revenu salarié / contrat (taux d\'effort max 33%)',
    verdict_budget_label: 'Plafond officiel de loyer admissible',
    verdict_authority_label: 'Autorité sociale compétente',
    verdict_legal_rec: 'Procédure recommandée :',
    rec_reprise: 'Reprise de bail (Art. 264 CO) — loyer fixé selon le bail en cours, sans droit de hausse unilatérale.',
    rec_sublet: 'Sous-location (Art. 262 CO) — droit impératif du locataire avec majoration meuble limitée à 10–20%.',

    isco_eyebrow: '03 · Répertoire Métiers CH-ISCO-19',
    isco_title: 'Taxonomie suisse des métiers & marché du travail',
    isco_sub: '15 secteurs, titres en 4 langues, niveaux de qualification (AFP/CFC/Tertiaire) et obligation d\'annonce ORP (Stellenmeldepflicht).',
    lbl_sector: 'Secteur économique',
    lbl_profession: 'Métier / Profession',
    badge_priority: '⚡ Stellenmeldepflicht (5 jours de priorité ORP/Job-Room)',
    badge_open: '🟢 Marché de l\'emploi ouvert',
    isco_quals_title: 'Filières de qualification reconnues en Suisse :',
    isco_salary_title: 'Fourchettes de salaire usuelles (CCNT / Salarium) :',

    hosts_eyebrow: '04 · Solidarité Résidents & Bénévolat',
    hosts_title: 'Pour les hôtes suisses & réseau de mentors',
    hosts_sub: 'Cadre légal de sous-location (Art. 262 CO) et réseau de mentors bénévoles Benevol Suisse (Art. 394 CO).',
    sublet_calc_title: 'Calculateur de sous-location équitable (Art. 262 CO)',
    lbl_net_rent: 'Loyer net total du logement (CHF/mois)',
    lbl_rooms_total: 'Nombre de pièces du logement',
    lbl_furnishing: 'Majoration mobilier (10 à 20% max)',
    sublet_room_rent: 'Loyer équitable de la chambre :',
    sublet_furn_cap: 'Plafond de majoration meuble admissible :',
    sublet_tax_note: 'Le remboursement perçu du sous-locataire est exonéré d\'impôt lorsqu\'il couvre strictement les frais réels au prorata.',
    mentor_card_title: 'Mentorat bénévole Benevol (Art. 394 CO)',
    mentor_card_desc: 'Citoyens suisses offrant 1 à 6 h/semaine pour la révision de CV, la conversation et l\'intégration locale.',

    pricing_eyebrow: '05 · Bêta Publique & Dons Solidaires',
    pricing_title: 'Soutien du projet pendant la phase Bêta',
    pricing_sub: 'Les formules commerciales sont désactivées. L\'accès est gratuit pour les bénéficiaires. Seuls les dons de soutien sont acceptés.',
    beta_free_badge: 'BÊTA : ACCÈS GRATUIT',
    btn_disabled_tier: 'Accès Bêta en cours',
    btn_donate_open: '❤️ Faire un don solidaire (30% pour l\'Ukraine)',

    zsu_eyebrow: '06 · Registre Cryptographique',
    zsu_title: 'Registre Merkle public des dons solidaires',
    zsu_sub: '30% de chaque contribution volontaire est transféré aux comptes d\'aide et de défense ukrainiens.',
    split_infra_title: 'Infrastructure serveur (70%)',
    split_infra_desc: 'Hébergement Appwrite Cloud Francfort, API Flatfox, parseurs 26 cantons, conformité nLPD.',
    split_zsu_title: '🇺🇦 Défense de l\'Ukraine (30%)',
    split_zsu_desc: 'Virements directs Banque Nationale d\'Ukraine & Fondation Come Back Alive avec preuve Merkle.',

    foot_honesty: 'Initiative en cours de constitution sous forme d\'association (Art. 60–79 CC Suisse). Aucun service de placement privé payant (Art. 9 LSE). Totalement gratuit pour les personnes en recherche d\'emploi.',
    foot_rights: '© 2026 Swiss Resilience Navigator · Slava Ukraini 🇺🇦 · Vive la Suisse 🇨🇭'
  },

  de: {
    top_banner: '⚡ Öffentliche Beta-Version — Verein Swiss Resilience in Gründung (Art. 60–79 ZGB) · Kostenloser Zugang',
    nav_radar: 'Wohnungsradar',
    nav_calc: '26-Kantone-Rechner',
    nav_orp: 'CH-ISCO-19 Berufe',
    nav_hosts: 'Schweizer Solidarität',
    nav_zsu: 'ZSU-Transparenz',
    nav_pricing: 'Projekt unterstützen',
    btn_bot: 'Telegram-Bot',
    btn_webapp: 'Web App öffnen',
    btn_hub25: '🌐 Interaktiver Hub 2.5',

    hero_pill: '⚡ PAN-SCHWEIZER ABDECKUNG · 26 KANTONE · OFFIZIELLE SOZIALRICHTLINIEN',
    hero_title: 'Würdiges Wohnen und legale Arbeit in der Schweiz <span class="accent">ohne Vermittler und Gebühren</span>',
    hero_sub: 'Direktes Wohnungsmonitoring nach offiziellen Mietzinsrichtlinien (EVAM, Hospice Général, AOZ, GSI und 26 Kantone), sichere Untermiete (Art. 262 OR), Benevol-Mentoren, CH-ISCO-19-Berufe mit Stellenmeldepflicht und freiwilliger 30%-Solidaritätsbeitrag zur Verteidigung der Ukraine.',
    hero_cta_app: '🚀 Web App / Mini App öffnen',
    hero_cta_hub: '🌐 Interaktiven Hub 2.5 öffnen',
    hero_cta_calc: '📊 Kantonalen Richtwert berechnen',
    hero_cta_host: '🇨🇭 Für Schweizer Gastgeber (Art. 262 OR)',

    metric_legal_label: 'Rechtsstatus',
    metric_legal_val: 'Art. 60–79 ZGB',
    metric_legal_desc: 'Verein in Gründung · Nicht-kommerzielle Selbsthilfeplattform',
    metric_fees_label: 'Vermittlungsgebühren',
    metric_fees_val: '0 CHF',
    metric_fees_desc: 'Keine versteckten Kosten oder illegale Arbeitsvermittlungsgebühren (Art. 9 AVG)',
    metric_zsu_label: 'Solidaritätsbeitrag 🇺🇦',
    metric_zsu_val: '30%',
    metric_zsu_desc: 'Feste Weiterleitung freiwilliger Spenden an Verteidigungskonten (SNB / Come Back Alive)',

    calc_eyebrow: '02 · Pan-Schweizer Compliance-Engine',
    calc_title: 'Mietzinsgrenzen-Rechner der 26 Kantone',
    calc_sub: 'Wählen Sie Ihren Kanton und Ihre Haushaltsgrösse für die offizielle Mietzinslimite und rechtliche Hinweise.',
    lbl_canton: 'Schweizer Kanton',
    lbl_family: 'Haushaltsgrösse',
    lbl_status: 'Einkommensart',
    status_social: 'Sozialhilfeempfänger (EVAM, HG, AOZ, GSI...)',
    status_salary: 'Erwerbseinkommen / Vertrag (Mietanteil max. 33%)',
    verdict_budget_label: 'Offizielles maximales Mietbudget',
    verdict_authority_label: 'Zuständige Sozialbehörde',
    verdict_legal_rec: 'Empfohlenes Vorgehen:',
    rec_reprise: 'Mietvertragsübernahme (Art. 264 OR) — Mietzins bleibt unverändert ohne Erhöhungsrecht der Verwaltung.',
    rec_sublet: 'Untermiete (Art. 262 OR) — zwingendes Mieterrecht mit Möblierungszuschlag von max. 10–20%.',

    isco_eyebrow: '03 · CH-ISCO-19 Berufsklassifikation',
    isco_title: 'Schweizer Berufslandschaft & Arbeitsmarkt',
    isco_sub: '15 Sektoren, Titel in 4 Sprachen, Qualifikationsstufen (EBA/EFZ/Tertiär) und Stellenmeldepflicht beim RAV.',
    lbl_sector: 'Wirtschaftssektor',
    lbl_profession: 'Beruf',
    badge_priority: '⚡ Stellenmeldepflicht (5 Tage Vorrang im Job-Room / RAV)',
    badge_open: '🟢 Offener Arbeitsmarkt',
    isco_quals_title: 'Anerkannte Bildungsstufen in der Schweiz:',
    isco_salary_title: 'Übliche Lohnspannen (GAV / Salarium):',

    hosts_eyebrow: '04 · Schweizer Gastgeber & Mentoring',
    hosts_title: 'Für Schweizer Gastgeber & freiwillige Mentoren',
    hosts_sub: 'Rechtssichere Untermiete (Art. 262 OR) und Mentoring nach Benevol-Schweiz-Standards (Art. 394 OR).',
    sublet_calc_title: 'Rechner für faire Untermiete (Art. 262 OR)',
    lbl_net_rent: 'Gesamte Nettomiete der Wohnung (CHF/Monat)',
    lbl_rooms_total: 'Zimmeranzahl der Wohnung',
    lbl_furnishing: 'Möblierungszuschlag (10 bis 20% max)',
    sublet_room_rent: 'Faire Zimmer-Nettomiete:',
    sublet_furn_cap: 'Maximal zulässiger Möblierungszuschlag:',
    sublet_tax_note: 'Mietentschädigungen sind steuerfrei, sofern sie ausschliesslich proportionale Wohn- und Nebenkosten decken.',
    mentor_card_title: 'Freiwilliges Mentoring Benevol (Art. 394 OR)',
    mentor_card_desc: 'Schweizer Fachpersonen engagieren sich 1–6 Std./Woche für CV-Anpassung, Konversation und Begleitung.',

    pricing_eyebrow: '05 · Öffentliche Beta & Spendenmodell',
    pricing_title: 'Projektunterstützung in der Beta-Phase',
    pricing_sub: 'Kommerzielle Tarife sind deaktiviert. Der Zugang ist kostenlos. Wir akzeptieren ausschliesslich freiwillige Solidaritätsspenden.',
    beta_free_badge: 'BETA: KOSTENLOSER ZUGANG',
    btn_disabled_tier: 'Beta-Zugang aktiv',
    btn_donate_open: '❤️ Freiwillige Solidaritätsspende (30% für die Ukraine)',

    zsu_eyebrow: '06 · Kryptografische Transparenz',
    zsu_title: 'Öffentliches Merkle-Ledger der Spenden',
    zsu_sub: '30% jeder Zuwendung gehen direkt an offizielle Verteidigungskonten der Ukraine.',
    split_infra_title: 'Serverinfrastruktur (70%)',
    split_infra_desc: 'Appwrite Cloud Frankfurt, Flatfox REST API, 26-Kantone-Parser, Schweizer Datenschutz.',
    split_zsu_title: '🇺🇦 Verteidigung der Ukraine (30%)',
    split_zsu_desc: 'Direktüberweisungen an Schweizerische Nationalbank / NBU & Come Back Alive mit Merkle-Nachweis.',

    foot_honesty: 'Initiative in Gründung als gemeinnütziger Verein (Art. 60–79 ZGB). Keine konzessionierte Arbeitsvermittlung (Art. 9 AVG). Kostenlos für alle Arbeitsuchenden.',
    foot_rights: '© 2026 Swiss Resilience Navigator · Slava Ukraini 🇺🇦 · Vive la Suisse 🇨🇭'
  },

  it: {
    top_banner: '⚡ Versione Beta pubblica — Associazione Swiss Resilience in costituzione (Art. 60–79 CC Svizzero) · Accesso gratuito',
    nav_radar: 'Radar Alloggi',
    nav_calc: 'Calcolatore 26 Cantoni',
    nav_orp: 'Professioni CH-ISCO-19',
    nav_hosts: 'Solidarietà Svizzera',
    nav_zsu: 'Trasparenza ZSU',
    nav_pricing: 'Sostieni il Progetto',
    btn_bot: 'Bot Telegram',
    btn_webapp: 'Apri Web App',
    btn_hub25: '🌐 Hub Interattivo 2.5',

    hero_pill: '⚡ COPERTURA PAN-SVIZZERA · 26 CANTONI · BAREMI SOCIALI UFFICIALI',
    hero_title: 'Alloggio dignitoso e lavoro legale in Svizzera <span class="accent">senza intermediari né commissioni</span>',
    hero_sub: 'Monitoraggio diretto degli alloggi secondo i massimali ufficiali EVAM, Hospice Général, AOZ, GSI e dei 26 cantoni, sublocazione sicura (Art. 262 CO), mentori Benevol, professioni CH-ISCO-19 con Stellenmeldepflicht e donazione volontaria del 30% per la difesa dell\'Ucraina.',
    hero_cta_app: '🚀 Apri Web App / Mini App',
    hero_cta_hub: '🌐 Apri l\'Hub Interattivo 2.5',
    hero_cta_calc: '📊 Calcola il massimale cantonale',
    hero_cta_host: '🇨🇭 Per gli ospitanti svizzeri (Art. 262 CO)',

    metric_legal_label: 'Stato giuridico',
    metric_legal_val: 'Art. 60–79 CC',
    metric_legal_desc: 'Associazione in costituzione · Piattaforma di solidarietà senza scopo di lucro',
    metric_fees_label: 'Commissioni',
    metric_fees_val: '0 CHF',
    metric_fees_desc: 'Nessuna spesa nascosta né intermediazione a pagamento vietata (Art. 9 LCol)',
    metric_zsu_label: 'Sostegno Solidale 🇺🇦',
    metric_zsu_val: '30%',
    metric_zsu_desc: 'Quota fissa devoluta ai conti ufficiali di difesa (BNS / Come Back Alive)',

    calc_eyebrow: '02 · Motore di Conformità Pan-Svizzero',
    calc_title: 'Calcolatore dei massimali d\'affitto dei 26 cantoni',
    calc_sub: 'Selezionate il cantone e la dimensione del nucleo familiare per conoscere il limite ufficiale e l\'autorità sociale.',
    lbl_canton: 'Cantone Svizzero',
    lbl_family: 'Nucleo familiare',
    lbl_status: 'Tipo di reddito',
    status_social: 'Beneficiario assistenza sociale (LAPS, EVAM, AOZ...)',
    status_salary: 'Reddito da lavoro / contratto (carico affitto max 33%)',
    verdict_budget_label: 'Massimale d\'affitto mensile ammissibile',
    verdict_authority_label: 'Autorità sociale competente',
    verdict_legal_rec: 'Procedura consigliata:',
    rec_reprise: 'Subentro nel contratto (Art. 264 CO) — canone bloccato secondo il contratto in corso.',
    rec_sublet: 'Sublocazione (Art. 262 CO) — diritto imperativo con supplemento mobilio limitato al 10–20%.',

    isco_eyebrow: '03 · Classificazione Professioni CH-ISCO-19',
    isco_title: 'Mercato del lavoro & professioni svizzere',
    isco_sub: '15 settori, titoli in 4 lingue, qualifiche svizzere (CFP/AFC/Terziario) e obbligo d\'annuncio URC (Stellenmeldepflicht).',
    lbl_sector: 'Settore economico',
    lbl_profession: 'Professione',
    badge_priority: '⚡ Stellenmeldepflicht (5 giorni di priorità Job-Room / URC)',
    badge_open: '🟢 Mercato del lavoro aperto',
    isco_quals_title: 'Titoli di formazione riconosciuti in Svizzera:',
    isco_salary_title: 'Fasce salariali di riferimento (CCNL / Salarium):',

    hosts_eyebrow: '04 · Solidarietà Ospitanti & Mentori',
    hosts_title: 'Per gli ospitanti svizzeri & rete mentori',
    hosts_sub: 'Quadro legale di sublocazione (Art. 262 CO) e rete di volontariato Benevol Svizzera (Art. 394 CO).',
    sublet_calc_title: 'Calcolatore di sublocazione equa (Art. 262 CO)',
    lbl_net_rent: 'Canone netto totale dell\'appartamento (CHF/mese)',
    lbl_rooms_total: 'Numero totale di locali',
    lbl_furnishing: 'Supplemento mobilio (10-20% max)',
    sublet_room_rent: 'Canone equo per la camera:',
    sublet_furn_cap: 'Supplemento mobilio massimo consentito:',
    sublet_tax_note: 'I rimborsi percepiti sono esenti da imposte se coprono proporzionalmente i soli costi vivi sostenuti.',
    mentor_card_title: 'Mentorato volontario Benevol (Art. 394 CO)',
    mentor_card_desc: 'Professionisti locali che offrono 1–6 ore/settimana per CV, lingua e inserimento.',

    pricing_eyebrow: '05 · Beta Pubblica & Modello Donazioni',
    pricing_title: 'Sostegno al progetto durante la fase Beta',
    pricing_sub: 'I piani a pagamento sono disattivati. L\'accesso è gratuito. Accettiamo unicamente donazioni volontarie di sostegno.',
    beta_free_badge: 'BETA: ACCESSO GRATUITO',
    btn_disabled_tier: 'Accesso Beta attivo',
    btn_donate_open: '❤️ Fai una donazione solidale (30% per l\'Ucraina)',

    zsu_eyebrow: '06 · Trasparenza Crittografica',
    zsu_title: 'Registro Merkle pubblico delle donazioni',
    zsu_sub: 'Il 30% di ogni donazione è destinato direttamente ai conti ufficiali di difesa dell\'Ucraina.',
    split_infra_title: 'Infrastruttura server (70%)',
    split_infra_desc: 'Appwrite Cloud Francoforte, API Flatfox, parser 26 cantoni, protezione dati svizzera.',
    split_zsu_title: '🇺🇦 Difesa dell\'Ucraina (30%)',
    split_zsu_desc: 'Bonifici tracciabili verso Banca Nazionale Ucraina & Come Back Alive con prova Merkle.',

    foot_honesty: 'Iniziativa in corso di costituzione come associazione (Art. 60–79 CC Svizzero). Nessun collocamento a pagamento (Art. 9 LCol). Gratuito per chi cerca lavoro.',
    foot_rights: '© 2026 Swiss Resilience Navigator · Slava Ukraini 🇺🇦 · Vive la Suisse 🇨🇭'
  }
};

export class HousingCalculator {
  constructor(containerId = 'calc-widget') {
    this.container = document.getElementById(containerId);
    this.cantonSelect = document.getElementById('canton');
    this.familySelect = document.getElementById('family');
    this.statusRadios = document.querySelectorAll('#status-group .radio');
    this.verdictValue = document.getElementById('verdict-value');
    this.verdictNote = document.getElementById('verdict-note');
    this.authorityEl = document.getElementById('verdict-authority');
    this.legalRecEl = document.getElementById('verdict-legal-rec');

    this.currentLanguage = localStorage.getItem('srn_lang') || 'ua';
    this.init();
  }

  init() {
    this.populateCantons();
    this.bindEvents();
    this.updateVerdict();
    this.initIscoClassifier();
    this.initSubletCalculator();
    this.initDonationModal();
    this.initMetricCounters();
    this.initSmoothScroll();
    this.initLanguageToggle();
    this.applyPageLanguage(this.currentLanguage);
  }

  populateCantons() {
    if (!this.cantonSelect) return;
    this.cantonSelect.innerHTML = '';
    CANTONS_26.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.code;
      opt.textContent = `${c.code} · ${c.name}`;
      if (c.code === 'VD') opt.selected = true;
      this.cantonSelect.appendChild(opt);
    });
  }

  bindEvents() {
    if (this.cantonSelect) {
      this.cantonSelect.addEventListener('change', () => this.updateVerdict());
    }

    if (this.familySelect) {
      this.familySelect.addEventListener('change', () => this.updateVerdict());
    }

    this.statusRadios.forEach((radioLabel) => {
      radioLabel.addEventListener('click', () => {
        this.statusRadios.forEach((r) => r.classList.remove('checked'));
        radioLabel.classList.add('checked');
        const input = radioLabel.querySelector('input[type="radio"]');
        if (input) input.checked = true;
        this.updateVerdict();
      });
    });
  }

  updateVerdict() {
    if (!this.verdictValue) return;

    const cantonCode = this.cantonSelect ? this.cantonSelect.value : 'VD';
    const familyVal = this.familySelect ? parseInt(this.familySelect.value, 10) : 3;

    const cantonData = CANTONS_26.find(c => c.code === cantonCode) || CANTONS_26[0];

    let rentCapStr = cantonData.persons_3_chf;
    if (familyVal === 1) rentCapStr = cantonData.persons_1_chf;
    else if (familyVal === 2) rentCapStr = cantonData.persons_2_chf;
    else if (familyVal === 4) rentCapStr = cantonData.persons_4_chf;
    else if (familyVal >= 5) rentCapStr = cantonData.persons_5plus_chf;

    // Parse numeric base if possible
    let baseNum = 1450;
    if (typeof rentCapStr === 'number') {
      baseNum = rentCapStr;
    } else {
      const match = String(rentCapStr).match(/\d+/);
      if (match) baseNum = parseInt(match[0], 10);
    }

    const checkedStatus = document.querySelector('input[name="status"]:checked');
    const status = checkedStatus ? checkedStatus.value : 'evam';
    if (status === 'income') {
      baseNum = Math.round((baseNum * 1.15) / 10) * 10;
    }

    this.verdictValue.textContent = formatSwissNumber(baseNum);

    if (this.verdictNote) {
      const typeLabel = cantonData.rent_type === 'brut' ? 'brut (charges comprises)' : 'net (+ charges)';
      this.verdictNote.textContent = `${cantonData.name} (${cantonData.code}) · ${familyVal} p. · ${typeLabel} · ${cantonData.legal_sources}`;
    }

    if (this.authorityEl) {
      this.authorityEl.textContent = cantonData.authority;
    }
  }

  initIscoClassifier() {
    const sectorSelect = document.getElementById('isco-sector');
    const profSelect = document.getElementById('isco-profession');
    const titleDisplay = document.getElementById('isco-titles-display');
    const badgeContainer = document.getElementById('isco-badge-container');
    const qualsDisplay = document.getElementById('isco-quals');
    const salaryDisplay = document.getElementById('isco-salary');

    if (!sectorSelect || !profSelect) return;

    // Populate Sectors
    const sectors = [
      { code: 'HOSP', uk: 'Готельно-ресторанний бізнес', fr: 'Hôtellerie & Restauration', de: 'Gastgewerbe & Hotellerie', it: 'Alberghiero e Ristorazione' },
      { code: 'CONST', uk: 'Будівництво та ремесла', fr: 'Construction & Artisanat', de: 'Bau & Handwerk', it: 'Edilizia e Artigianato' },
      { code: 'LOG', uk: 'Логістика, транспорт, клінінг', fr: 'Logistique, Transport & Nettoyage', de: 'Logistik & Reinigung', it: 'Logistica e Pulizia' },
      { code: 'HEALTH', uk: 'Охорона здоров\'я та догляд', fr: 'Santé & Soins', de: 'Gesundheit & Pflege', it: 'Sanità e Assistenza' },
      { code: 'IT', uk: 'ІТ та цифрові технології', fr: 'Informatique & Technologies', de: 'IT & Digitales', it: 'Informatica e Tecnologie' }
    ];

    sectorSelect.innerHTML = '';
    sectors.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.code;
      const lang = this.currentLanguage;
      opt.textContent = (lang === 'fr') ? s.fr : (lang === 'de') ? s.de : (lang === 'it') ? s.it : s.uk;
      sectorSelect.appendChild(opt);
    });

    const updateProfessions = () => {
      const sec = sectorSelect.value;
      const filtered = CH_ISCO_19_PROFESSIONS.filter(p => p.sector_code === sec);
      profSelect.innerHTML = '';
      filtered.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.isco_code;
        const l = this.currentLanguage;
        const title = (l === 'fr') ? p.title_fr : (l === 'de') ? p.title_de : (l === 'it') ? p.title_it : p.title_uk;
        opt.textContent = `${p.isco_code} — ${title}`;
        profSelect.appendChild(opt);
      });
      updateProfDetails();
    };

    const updateProfDetails = () => {
      const code = profSelect.value;
      const prof = CH_ISCO_19_PROFESSIONS.find(p => p.isco_code === code);
      if (!prof) return;

      const l = this.currentLanguage;
      const dict = TRANSLATIONS[l] || TRANSLATIONS.ua;

      if (titleDisplay) {
        titleDisplay.innerHTML = `
          <div style="font-size:13px; color:var(--muted); line-height:1.6; margin-top:8px;">
            <strong>🇫🇷 FR:</strong> ${prof.title_fr}<br>
            <strong>🇩🇪 DE:</strong> ${prof.title_de}<br>
            <strong>🇮🇹 IT:</strong> ${prof.title_it}<br>
            <strong>🇺🇦 UK:</strong> ${prof.title_uk}
          </div>
        `;
      }

      if (badgeContainer) {
        if (prof.stellenmeldepflicht) {
          badgeContainer.innerHTML = `<span class="priority-badge" style="background:#DC2626; color:#fff; font-weight:700; padding:6px 12px; border-radius:8px; font-size:12px; display:inline-flex; align-items:center; gap:6px;">${dict.badge_priority}</span>`;
        } else {
          badgeContainer.innerHTML = `<span class="priority-badge" style="background:rgba(5,150,105,0.2); color:#10B981; border:1px solid rgba(16,185,129,0.3); font-weight:600; padding:6px 12px; border-radius:8px; font-size:12px; display:inline-flex; align-items:center; gap:6px;">${dict.badge_open}</span>`;
        }
      }

      if (qualsDisplay) {
        qualsDisplay.textContent = prof.ch_qual_levels || 'Sans diplôme / AFP / CFC / Tertiaire';
      }

      if (salaryDisplay) {
        salaryDisplay.textContent = `${prof.salary_range_chf} (CHF/mois brut)`;
      }
    };

    sectorSelect.addEventListener('change', updateProfessions);
    profSelect.addEventListener('change', updateProfDetails);

    updateProfessions();
  }

  initSubletCalculator() {
    const netRentInput = document.getElementById('sublet-net-rent');
    const roomsInput = document.getElementById('sublet-rooms');
    const furnSlider = document.getElementById('sublet-furn-pct');
    const furnPctLabel = document.getElementById('sublet-furn-label');
    const roomRentDisplay = document.getElementById('sublet-room-rent-val');
    const furnCapDisplay = document.getElementById('sublet-furn-cap-val');
    const totalRentDisplay = document.getElementById('sublet-total-val');

    if (!netRentInput || !roomsInput || !furnSlider) return;

    const recalculate = () => {
      const net = parseFloat(netRentInput.value) || 1600;
      const rooms = parseFloat(roomsInput.value) || 3.0;
      const furnPct = parseFloat(furnSlider.value) || 15;

      if (furnPctLabel) furnPctLabel.textContent = `${furnPct}%`;

      const roomBase = Math.round(net / Math.max(rooms, 1));
      const furnCap = Math.round(roomBase * (furnPct / 100));
      const total = roomBase + furnCap;

      if (roomRentDisplay) roomRentDisplay.textContent = formatSwissNumber(roomBase);
      if (furnCapDisplay) furnCapDisplay.textContent = formatSwissNumber(furnCap);
      if (totalRentDisplay) totalRentDisplay.textContent = formatSwissNumber(total);
    };

    netRentInput.addEventListener('input', recalculate);
    roomsInput.addEventListener('input', recalculate);
    furnSlider.addEventListener('input', recalculate);

    recalculate();
  }

  initDonationModal() {
    const openBtns = document.querySelectorAll('.btn-donate-trigger');
    const modal = document.getElementById('donation-modal');
    const closeBtn = document.getElementById('donation-modal-close');

    if (!modal) return;

    openBtns.forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-toggle button');
    langBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (!lang) return;
        this.currentLanguage = lang;
        localStorage.setItem('srn_lang', lang);
        this.applyPageLanguage(lang);
      });
    });
  }

  applyPageLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ua;
    document.documentElement.lang = lang;

    // Update buttons state
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Translate all data-i18n
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Re-trigger dynamic components
    this.updateVerdict();
    this.initIscoClassifier();
  }

  initMetricCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter'));
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1200;
          const start = performance.now();

          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const val = Math.round(progress * target);
            el.textContent = `${prefix}${formatSwissNumber(val)}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach((c) => observer.observe(c));
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Auto-instantiate on DOM load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new HousingCalculator();
  });
}
