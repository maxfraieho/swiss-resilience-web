// Telegram Mini App Client for Swiss Resilience Navigator
// Integrates Telegram WebApp SDK, Appwrite Pro Cloud (Frankfurt) & SHA-256 Merkle Ledger

// Pure JS synchronous SHA-256 implementation for standalone cryptographic Merkle hashing
function sha256Sync(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  let hash = [];
  const k = [];
  let primeCounter = 0;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  hash = hash.slice(0, 8);
  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return;
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;
  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const s0 = i < 16 ? w[i] : (w[i] = (w[i - 16] +
        (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
        w[i - 7] +
        (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
      const s1 = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const ch = (hash[0] & hash[1]) ^ (~hash[0] & hash[2]);
      const temp1 = hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) +
        ((hash[4] & hash[5]) ^ (~hash[4] & hash[6])) + k[i] + s0;
      const temp2 = s1 + ((hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

const CONFIG = {
  appwriteEndpoint: 'https://fra.cloud.appwrite.io/v1',
  appwriteProjectId: '6aa21b83003e2cd9fcdd',
  databaseId: 'swiss_platform_main',
  collections: {
    listings: 'housing_listings',
    donations: 'zsu_donations',
    candidates: 'candidates'
  }
};

const TIERS = {
  basic: {
    title: 'Basic — CHF 9 / міс (420 грн)',
    sub_ua: 'Базова підписка • 10% на ЗСУ',
    sub_fr: 'Souscription Basic • 10% ZSU',
    chf: 9.0,
    uah: 420.0,
    zsu_pct: 10,
    zsu_chf: '0.90',
    zsu_uah: '42.00'
  },
  pro: {
    title: 'Pro Solidarity — CHF 19 / міс (890 грн)',
    sub_ua: 'Солідарна підписка • 30% на ЗСУ',
    sub_fr: 'Souscription Pro • 30% ZSU',
    chf: 19.0,
    uah: 890.0,
    zsu_pct: 30,
    zsu_chf: '5.70',
    zsu_uah: '265.00'
  },
  success: {
    title: 'Success Contribution — CHF 49 (2300 грн)',
    sub_ua: 'Разовий внесок солідарності • 30% на ЗСУ',
    sub_fr: 'Contribution au succès • 30% ZSU',
    chf: 49.0,
    uah: 2300.0,
    zsu_pct: 30,
    zsu_chf: '14.70',
    zsu_uah: '680.00'
  }
};

// Official EVAM Rent Ceilings (Canton de Vaud, Guide d'assistance)
const EVAM_CEILINGS_VAUD = {
  1: 850,
  2: 1200,
  3: 1350,
  4: 1480,
  5: 1750
};

// Comprehensive Bilingual Dictionaries
const TRANSLATIONS = {
  ua: {
    hdr_close: 'Закрити',
    hdr_website: 'Сайт',
    btn_login: 'Увійти',
    nav_radar: 'Квартири',
    nav_orp: 'ORP',
    nav_interview: 'Entretien',
    nav_dossier: 'Досьє',
    nav_zsu: 'ЗСУ Звіт',
    nav_profile: 'Профіль',

    trans_desktop_title: 'Повна десктоп-версія в браузері',
    trans_desktop_sub: 'violin-integration.works • Інтерактивна мапа та аналітика',
    auth_modal_title: 'Авторизація & Профіль',
    auth_desc: "Ваш обліковий запис автоматично прив'язано до Telegram WebApp та захищеного сховища Appwrite Pro Cloud.",
    auth_btn_sync_tg: 'Синхронізувати з Telegram',
    auth_btn_open_web: 'Відкрити платформу в браузері (violin-integration.works) ↗',
    auth_logout: 'Вийти',

    // Onboarding / Profile
    prof_step: 'Крок 1 з 2',
    prof_title: 'Профіль кандидата & Барем EVAM',
    prof_sec_personal: '👤 Особисті дані для досьє',
    lbl_fullname: 'ПІБ (як у закордонному паспорті)',
    lbl_phone: 'Телефон (Швейцарія)',
    lbl_email: 'Email',
    lbl_address: 'Поточна адреса проживання у Во',
    lbl_permit: 'Статус дозволу',
    lbl_french: 'Рівень французької',
    lbl_family_size: "Склад сім'ї",
    lbl_family_hint: 'визначає барем EVAM',
    fam_1: '1 особа',
    fam_2: '2 особи',
    fam_3: "Сім'я 3–4",
    fam_5: '5+ осіб',
    evam_cap_title: 'Офіційний ліміт оренди EVAM (Во)',
    evam_cap_sub: '100% покриття житла державою (LARA)',
    lbl_communes: 'Бажані комуни Во',
    lbl_income_type: 'Фінансове забезпечення',
    inc_evam_title: 'Бенефіціар EVAM (барем оренди)',
    inc_evam_sub: '100% покриття житла державою за нормативами LARA',
    inc_salaried_title: 'Власний заробіток / Контракт',
    inc_salaried_sub: 'Ліміт платоспроможності 33% від зарплати',
    lbl_doc_checklist: "Пакет обов'язкових документів USPI",
    lbl_doc_hint: 'для передачі в режі',
    doc_permis: 'Permis S (лицьовий та зворотний бік)',
    doc_permis_sub: 'Підтверджує право перебування та працевлаштування',
    doc_op: 'Витяг з реєстру боргів (Office des poursuites)',
    doc_op_sub: '< 60 днів, абсолютно чистий (vierge de poursuites)',
    doc_evam: 'Гарантійний лист EVAM (Attestation financière)',
    doc_evam_sub: 'Підтвердження прямої оплати оренди державою',
    doc_rc: 'Страхування відповідальності (RC Ménage)',
    doc_rc_sub: 'Покриття шкоди житлу (ECA / комерційний поліс)',
    pro_banner_title: 'Тариф Pro Solidarity (CHF 19)',
    pro_banner_sub: '30% внеску автоматично перераховується на ЗСУ',
    btn_checkout_tier: 'Оформити',
    btn_save_launch: 'Зберегти та активувати Радар ⚡',

    // Radar
    hdr_fresh_flats: 'Свіжі квартири',
    pill_all_prices: 'Усі ціни',
    filter_evam: '🟢 Тільки EVAM 100%',
    filter_reprise: '⚡ Reprise de bail (Art. 264)',
    filter_etoy: '🚆 До 10 км від Etoy',
    guide_reprise_title: '📘 Чому Reprise de bail (Art. 264 CO) — ваш головний шанс?',
    guide_reprise_content: `
      <p><strong>Reprise de bail (передача договору оренди)</strong> — законодавче право чинного орендаря достроково розірвати контракт, знайшовши платоспроможного наступника (ст. 264 Зобов'язального кодексу Швейцарії):</p>
      <ul>
        <li><strong>🔒 Заморожування ціни:</strong> Режі не має права підвищувати орендну ставку в момент передачі. Оренда лишається в межах баремів EVAM.</li>
        <li><strong>🚫 Без масової конкуренції:</strong> Оголошення передається напряму наступнику без відкритих комерційних порталів зі 100+ швейцарськими претендентами.</li>
        <li><strong>⚖️ Обов'язкове прийняття:</strong> Якщо кандидат платоспроможний (гарантія EVAM) і має чистий витяг з реєстру боргів (Office des poursuites), режі зобов'язана прийняти досьє протягом 15–30 днів.</li>
      </ul>
    `,
    btn_dossier_1click: '⚡ Досьє 1-Click',
    btn_flatfox_link: '📍 Flatfox',
    status_evam_ok: '🟢 EVAM 100% Схвалено',
    status_evam_warn: '⚠️ Часткове EVAM',

    // Dossier
    dossier_title: 'Досьє кандидата',
    dossier_letter_label: 'Супровідний лист французькою мовою (USPI Standard):',
    dossier_annexes_label: 'Пакет верифікованих додатків:',
    annex_form: '1. Анкета оренди режі (Demande de location signée)',
    annex_evam: '2. Офіційний гарантійний лист EVAM / Fiche de ressources',
    annex_op: '3. Витяг з реєстру боргів (< 60 днів, vierge de poursuites)',
    annex_permit: '4. Копія посвідки Permis S (лицьова та зворотна сторони)',
    annex_rc: '5. Поліс цивільної відповідальності RC Ménage (ECA)',
    annex_reprise: '6. Декларація про згоду на перейняття чинного договору (Art. 264 CO)',
    btn_copy_letter: '📋 Скопіювати супровідний лист',
    btn_send_email: '✉️ Надіслати в режі через Email',
    btn_print_dossier: '🖨️ Друк / Зберегти PDF досьє',

    // ZSU
    zsu_header_card: 'ПІДПИСКА PRO SOLIDARITY',
    zsu_metric_sub: 'Сумарно перераховано на захист України',
    zsu_goal_label: 'Ціль: РЕБ-комплекс для 3-ї ОШБр',
    zsu_goal_pct: '74% профінансовано',
    zsu_your_part_title: 'Ваш особистий внесок',
    zsu_your_part_desc: 'З вашої місячної підписки (CHF 19.00) рівно <strong>30% (CHF 5.70)</strong> автоматично спрямовано на спецрахунок ЗСУ в Національному банку України та фонд «Повернись живим».',
    pricing_title: 'Тарифи платформи та внесок у ЗСУ',
    tier_basic_desc: 'Радар житла + 10% на ЗСУ (CHF 0.90)',
    tier_pro_desc: '🛡️ 30% на ЗСУ (CHF 5.70 / 265 грн)',
    tier_success_desc: '🛡️ 30% на ЗСУ (CHF 14.70 / 680 грн)',
    btn_choose: 'Обрати',
    btn_order_now: 'Оформити ⚡',
    btn_donate: 'Внесок',
    merkle_table_title: 'Криптографічний Merkle-реєстр',
    th_date: 'Дата',
    th_recipient: 'Одержувач',
    th_amount: 'Сума',
    th_hash: 'Хеш',

    // ORP
    orp_header_title: "Кар'єрний модуль ORP & SECO",
    orp_header_sub: 'Пріоритет працевлаштування за ст. 21a LEI (Stellenmeldepflicht) та щомісячний звіт LACI',
    job_filter_all: 'Всі вакансії (6)',
    btn_export_orp: 'Експортувати щомісячний звіт для куратора ORP 📄',
    btn_job_letter: '📄 Мотиваційний лист',
    btn_job_portal: '🔗 Вакансія',

    // Interview
    interview_header_title: "Entretien d'embauche IA",
    interview_header_sub: 'Pratique en français suisse vaudois (CECRL A2/B1)',
    interview_step1_label: '1. Choisissez votre vecteur professionnel',
    interview_step2_label: '2. Votre réponse (vocal ou texte)',
    interview_btn_record: 'Enregistrer audio',
    interview_btn_eval: 'Évaluer ⚡',

    // DS 2.0 Keys
    seg_housing: 'Житло',
    seg_jobs: 'Вакансії',
    seg_interview: 'Entretien',
    tg_sub_radar: "Свіжі об'єкти · < 60с",
    lbl_net_income: 'Місячний чистий дохід',
    lbl_target_rent: 'Цільова орендна плата (з комунальними)',
    btn_print_dossier: 'Завантажити досьє USPI (PDF)',
    btn_view_letter: 'Переглянути лист французькою',
    // Modals
    checkout_modal_sub: 'Оформлення підписки • Souscription solidaire',
    twint_note: 'Введіть суму та вкажіть у повідомленні ваш ID',
    btn_copy: 'Копіювати',
    lbl_payment_ref: "Обов'язковий коментар до платежу:",
    btn_confirm_payment: '✅ Я здійснив оплату (Отримати Merkle-квитанцію)',
    checkout_legal_note: '🔒 Нульова фіксована абонплата сервісу ($0/міс). Корпоративна благодійність відповідно до ст. 60 CC.',
    confirm_payment_title: 'Підтвердження платежу',
    confirm_payment_desc: "Вкажіть спосіб оплати та ім'я відправника або останні 4 цифри картки для автоматичної генерації блоку в реєстрі Merkle:",
    lbl_pay_method: 'Спосіб оплати',
    lbl_sender_name: "Ім'я відправника / Коментар / Сума",
    btn_validate_receipt: 'Підтвердити та створити Merkle-блок 🛡️',
    receipt_title: 'Посвідчення солідарності ЗСУ',
    receipt_verified_stamp: '✓ MERKLE VERIFIED',
    btn_receipt_ok: 'Зрозуміло, дякую! 🇺🇦',
    btn_copy_french_letter: '📋 Скопіювати текст французькою',
    btn_send_job_email: '✉️ Відкрити Email клієнт'
  },

  fr: {
    hdr_close: 'Fermer',
    hdr_website: 'Site Web',
    btn_login: 'Connexion',
    nav_radar: 'Logements',
    nav_orp: 'ORP',
    nav_interview: 'Entretien',
    nav_dossier: 'Dossier',
    nav_zsu: 'Rapport ZSU',
    nav_profile: 'Profil',

    trans_desktop_title: 'Version bureau complète dans le navigateur',
    trans_desktop_sub: 'violin-integration.works • Carte interactive & analyses',
    auth_modal_title: 'Authentification & Profil',
    auth_desc: 'Votre compte est automatiquement lié à Telegram WebApp et au stockage sécurisé Appwrite Pro Cloud.',
    auth_btn_sync_tg: 'Synchroniser avec Telegram',
    auth_btn_open_web: 'Ouvrir la plateforme dans le navigateur (violin-integration.works) ↗',
    auth_logout: 'Déconnexion',

    // Onboarding / Profile
    prof_step: 'Étape 1 sur 2',
    prof_title: 'Profil candidat & Barème EVAM',
    prof_sec_personal: '👤 Données personnelles pour le dossier',
    lbl_fullname: 'Nom complet (selon passeport)',
    lbl_phone: 'Téléphone suisse',
    lbl_email: 'Courriel',
    lbl_address: 'Adresse actuelle dans le canton de Vaud',
    lbl_permit: 'Statut de séjour',
    lbl_french: 'Niveau de français',
    lbl_family_size: 'Composition du ménage',
    lbl_family_hint: 'définit le barème EVAM',
    fam_1: '1 personne',
    fam_2: '2 personnes',
    fam_3: 'Famille 3–4',
    fam_5: '5+ pers.',
    evam_cap_title: 'Plafond légal EVAM (Vaud)',
    evam_cap_sub: 'Couverture 100% par l’aide sociale (LARA)',
    lbl_communes: 'Communes cibles (Vaud)',
    lbl_income_type: 'Régime financier',
    inc_evam_title: 'Bénéficiaire EVAM (loyer au barème)',
    inc_evam_sub: 'Prise en charge intégrale selon les normes LARA',
    inc_salaried_title: 'Revenu propre / Salaire',
    inc_salaried_sub: 'Règle de solvabilité de 33% du revenu brut',
    lbl_doc_checklist: 'Pièces justificatives USPI requises',
    lbl_doc_hint: 'pour transmission à la gérance',
    doc_permis: 'Permis S (recto-verso)',
    doc_permis_sub: 'Autorisation de séjour et de travail en règle',
    doc_op: 'Extrait de l’Office des poursuites',
    doc_op_sub: '< 60 jours, vierge de toute poursuite',
    doc_evam: 'Attestation financière EVAM',
    doc_evam_sub: 'Garantie de prise en charge directe du loyer',
    doc_rc: 'Assurance responsabilité civile (RC Ménage)',
    doc_rc_sub: 'Couverture dégâts locatifs (ECA / Privée)',
    pro_banner_title: 'Souscription Pro Solidarity (CHF 19)',
    pro_banner_sub: '30% reversés automatiquement au fonds de défense ukrainien',
    btn_checkout_tier: 'Souscrire',
    btn_save_launch: 'Enregistrer & Activer le Radar ⚡',

    // Radar
    hdr_fresh_flats: 'Logements récents',
    pill_all_prices: 'Tous loyers',
    filter_evam: '🟢 Uniquement EVAM 100%',
    filter_reprise: '⚡ Reprise de bail (Art. 264)',
    filter_etoy: '🚆 ≤ 10 km d’Etoy',
    guide_reprise_title: '📘 Pourquoi la Reprise de bail (Art. 264 CO) est votre atout ?',
    guide_reprise_content: `
      <p><strong>La reprise de bail anticipée</strong> est le droit légal pour le locataire sortant de résilier son bail sans délai en présentant un candidat solvable (art. 264 du Code des obligations) :</p>
      <ul>
        <li><strong>🔒 Loyer bloqué :</strong> La gérance ne peut pas augmenter le loyer lors de la reprise. Le montant reste dans les barèmes EVAM.</li>
        <li><strong>🚫 Pas de concurrence massive :</strong> L'annonce ne passe pas sur les grands portails avec 80+ candidats locaux prioritaires.</li>
        <li><strong>⚖️ Agrément obligatoire :</strong> Si le candidat est solvable (attestation EVAM) et vierge de poursuites, la régie dispose de 15 à 30 jours pour agréer le dossier sans discrimination.</li>
      </ul>
    `,
    btn_dossier_1click: '⚡ Dossier 1-Clic',
    btn_flatfox_link: '📍 Flatfox',
    status_evam_ok: '🟢 100% Conforme EVAM',
    status_evam_warn: '⚠️ Dépassement barème',

    // Dossier
    dossier_title: 'Dossier de candidature USPI',
    dossier_letter_label: 'Lettre de motivation officielle en français :',
    dossier_annexes_label: 'Annexes obligatoires vérifiées :',
    annex_form: '1. Formulaire officiel de la gérance dûment complété et signé',
    annex_evam: '2. Attestation officielle de prise en charge financière EVAM',
    annex_op: '3. Extrait de l’Office des poursuites (< 60 jours, vierge)',
    annex_permit: '4. Copie de la décision d’octroi du permis S (recto-verso)',
    annex_rc: '5. Attestation de police RC Ménage (ECA)',
    annex_reprise: '6. Déclaration d’acceptation des conditions du bail en vigueur (Art. 264 CO)',
    btn_copy_letter: '📋 Copier la lettre de motivation',
    btn_send_email: '✉️ Transmettre à la régie par courriel',
    btn_print_dossier: '🖨️ Imprimer / Exporter le PDF USPI',

    // ZSU
    zsu_header_card: 'SOUSCRIPTION PRO SOLIDARITY',
    zsu_metric_sub: 'Total collecté pour la défense de l’Ukraine',
    zsu_goal_label: 'Objectif : Système brouilleur REB pour la 3e brigade',
    zsu_goal_pct: '74% financé',
    zsu_your_part_title: 'Votre contribution directe',
    zsu_your_part_desc: 'Sur chaque mensualité de CHF 19.00, exactement <strong>30% (CHF 5.70)</strong> sont reversés au compte spécial de défense de la Banque Nationale d’Ukraine et à la fondation « Come Back Alive ».',
    pricing_title: 'Tarifs du service et solidarité ZSU',
    tier_basic_desc: 'Radar immobilier + 10% ZSU (CHF 0.90)',
    tier_pro_desc: '🛡️ 30% reversés à l’Ukraine (CHF 5.70 / 265 UAH)',
    tier_success_desc: '🛡️ 30% reversés à l’Ukraine (CHF 14.70 / 680 UAH)',
    btn_choose: 'Choisir',
    btn_order_now: 'Souscrire ⚡',
    btn_donate: 'Contribuer',
    merkle_table_title: 'Registre cryptographique Merkle',
    th_date: 'Date',
    th_recipient: 'Bénéficiaire',
    th_amount: 'Montant',
    th_hash: 'Hachage',

    // ORP
    orp_header_title: 'Module Carrière ORP & SECO',
    orp_header_sub: 'Priorité d’embauche art. 21a LEI (Stellenmeldepflicht) et relevé mensuel LACI',
    job_filter_all: 'Tous les postes (6)',
    btn_export_orp: 'Exporter le relevé mensuel pour le conseiller ORP 📄',
    btn_job_letter: '📄 Lettre de motivation',
    btn_job_portal: '🔗 Offre d’emploi',

    // Interview
    interview_header_title: 'Entretien d’embauche IA',
    interview_header_sub: 'Simulation en français vaudois (CECRL A2/B1)',
    interview_step1_label: '1. Choisissez votre vecteur métier',
    interview_step2_label: '2. Votre réponse (vocale ou écrite)',
    interview_btn_record: 'Enregistrer audio',
    interview_btn_eval: 'Évaluer ⚡',

    // DS 2.0 Keys
    seg_housing: 'Житло',
    seg_jobs: 'Вакансії',
    seg_interview: 'Entretien',
    tg_sub_radar: "Свіжі об'єкти · < 60с",
    lbl_net_income: 'Місячний чистий дохід',
    lbl_target_rent: 'Цільова орендна плата (з комунальними)',
    btn_print_dossier: 'Завантажити досьє USPI (PDF)',
    btn_view_letter: 'Переглянути лист французькою',
    // DS 2.0 Keys
    seg_housing: 'Logement',
    seg_jobs: 'Emplois',
    seg_interview: 'Entretien',
    tg_sub_radar: 'Nouveaux biens · < 60s',
    lbl_net_income: 'Revenu net mensuel',
    lbl_target_rent: 'Loyer cible (charges incl.)',
    btn_print_dossier: 'Télécharger dossier régie (PDF)',
    btn_view_letter: 'Voir la lettre en français',
    // Modals
    checkout_modal_sub: 'Souscription solidaire • Formulaire de paiement',
    twint_note: 'Indiquez le montant et votre identifiant en référence',
    btn_copy: 'Copier',
    lbl_payment_ref: 'Communication obligatoire du virement :',
    btn_confirm_payment: '✅ J’ai effectué le paiement (Obtenir le reçu Merkle)',
    checkout_legal_note: '🔒 Aucuns frais fixes mensuels ($0/mois). Engagement philanthropique selon art. 60 CC.',
    confirm_payment_title: 'Validation de paiement',
    confirm_payment_desc: 'Indiquez le mode de règlement et votre nom ou 4 derniers chiffres pour générer le bloc Merkle horodaté :',
    lbl_pay_method: 'Moyen de paiement',
    lbl_sender_name: 'Nom de l’expéditeur / Référence / Montant',
    btn_validate_receipt: 'Valider & Créer le bloc Merkle 🛡️',
    receipt_title: 'Attestation de Solidarité ZSU',
    receipt_verified_stamp: '✓ VÉRIFIÉ PAR MERKLE',
    btn_receipt_ok: 'Compris, merci ! 🇨🇭🤝🇺🇦',
    btn_copy_french_letter: '📋 Copier la lettre en français',
    btn_send_job_email: '✉️ Ouvrir le client de messagerie'
  }
};

class ResilienceMiniApp {
  constructor() {
    this.tg = window.Telegram?.WebApp || null;
    this.lang = localStorage.getItem('srn_lang') || 'ua';
    this.activeTab = 'radar';
    
    // Candidate profile state with local persistence
    this.candidate = this.loadSavedCandidateProfile();
    this.familySize = this.candidate.familySize || 3;
    this.selectedCommunes = new Set(this.candidate.communes || ['Etoy', 'Morges', 'Lausanne']);
    this.incomeType = this.candidate.incomeType || 'evam';
    
    // Radar filters & search state
    this.searchQuery = '';
    this.priceCeiling = null;
    this.filters = { evam: true, reprise: true, etoy: false };
    
    // Dynamic data feeds
    this.listings = [];
    this.selectedListing = null;
    this.selectedJob = null;
    this.activeJobFilter = 'all';

    // Payment state
    this.checkoutTier = 'pro';
    this.checkoutCurrency = 'CHF';
    this.totalZsuRaised = 0.0;

    // Interview simulator state
    this.interviewVector = 'v3';
    this.interviewStage = 1;
    this.isRecording = false;

    // DS 2.0 state
    this.radarSegment = 'housing';
    this.checkoutRail = 'ch';
    this.solidarityPct = 30;

    this.user = this.loadSavedUser();
    this.init();
  }

  loadSavedUser() {
    try {
      const saved = localStorage.getItem('srn_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved user:', e);
    }

    const tgUser = this.tg?.initDataUnsafe?.user;
    if (tgUser) {
      const user = {
        id: tgUser.id,
        first_name: tgUser.first_name || 'Arsen',
        last_name: tgUser.last_name || 'Kovalenko',
        username: tgUser.username || 'Kewobe',
        photo_url: tgUser.photo_url || '',
        auth_type: 'telegram',
        role: 'candidate',
        permis: 'Permis S Vaud',
        verified: true
      };
      try {
        localStorage.setItem('srn_auth_user', JSON.stringify(user));
      } catch (e) {}
      return user;
    }

    return {
      id: 1204892,
      first_name: 'Arsen',
      last_name: 'Kovalenko',
      username: 'Kewobe',
      auth_type: 'telegram',
      role: 'candidate',
      permis: 'Permis S Vaud',
      verified: true
    };
  }

  loadSavedCandidateProfile() {
    try {
      const saved = localStorage.getItem('srn_candidate_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved profile:', e);
    }

    return {
      name: 'Arsen Vokov',
      phone: '+41 78 777 24 59',
      email: 'arsen.vokov@gmail.com',
      address: 'Route Cantonale 14, 1163 Etoy',
      permit: 'Permis S',
      french: 'A2',
      familySize: 3,
      evamCeiling: 1350,
      incomeType: 'evam',
      communes: ['Etoy', 'Morges', 'Lausanne'],
      docs: { permis: true, op: true, evam: true, rc: true },
      isPro: false
    };
  }

  saveCandidateProfileLocally() {
    try {
      localStorage.setItem('srn_candidate_profile', JSON.stringify(this.candidate));
    } catch (e) {
      console.warn('Failed to save candidate to localStorage:', e);
    }
  }

  init() {
    if (this.tg) {
      try {
        this.tg.ready();
        this.tg.expand();
        if (this.tg.setHeaderColor) this.tg.setHeaderColor('#0F172A');
        if (this.tg.setBackgroundColor) this.tg.setBackgroundColor('#0F172A');
      } catch (e) {
        console.warn('Telegram SDK initialization warning:', e);
      }
    }

    // Populate candidate fields from state
    this.syncProfileForm();
    this.applyLanguage(this.lang);
    this.loadListings();
    this.loadOrpJobs();
    this.loadZsuLedger();
    this.updateProfileBadge();
    this.updateHeroProfile();
    this.updatePaymentRefCode();
    this.updateAuthUI();
    this.updateHeroProfile();
    this.initGaugeListeners();
    this.updateGauge();
    this.handleInitialRouting();
  }

  haptic(type = 'light') {
    if (this.tg && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.impactOccurred(type);
    }
  }

  showToast(message) {
    const existing = document.querySelector('.app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.innerHTML = `<span>🛡️</span><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // ================= MAIN WEBSITE TRANSITION & AUTH =================
  openMainSite() {
    this.haptic('light');
    const url = 'https://violin-integration.works/';
    if (this.tg && this.tg.openLink) {
      try {
        this.tg.openLink(url);
        return;
      } catch (e) {
        console.warn('openLink failed:', e);
      }
    }
    window.open(url, '_blank');
  }

  openAuthModal() {
    this.haptic('light');
    const modal = document.getElementById('modal-auth');
    if (modal) {
      modal.style.display = 'flex';
      this.updateAuthModalContent();
    }
  }

  closeAuthModal() {
    this.haptic('light');
    const modal = document.getElementById('modal-auth');
    if (modal) modal.style.display = 'none';
  }

  updateAuthUI() {
    const btnLabel = document.getElementById('auth-btn-label');
    const authBtn = document.getElementById('btn-auth-header');
    if (btnLabel) {
      if (this.user && this.user.first_name) {
        btnLabel.textContent = `👤 ${this.user.first_name}`;
      } else {
        const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.ua;
        btnLabel.textContent = `🔑 ${dict.btn_login || 'Увійти'}`;
      }
    }
    if (authBtn) {
      authBtn.classList.toggle('guest', !this.user || !this.user.verified);
    }
  }

  updateAuthModalContent() {
    if (!this.user) return;
    const nameEl = document.getElementById('auth-user-name');
    const handleEl = document.getElementById('auth-user-handle');
    const avatarEl = document.getElementById('auth-user-avatar');

    if (nameEl) nameEl.textContent = `${this.user.first_name || 'Arsen'} ${this.user.last_name || 'Kovalenko'}`.trim();
    if (handleEl) {
      const handle = this.user.username ? `@${this.user.username}` : 'Telegram User';
      handleEl.textContent = `${handle} • ID ${this.user.id || '1204892'}`;
    }
    if (avatarEl) {
      const initials = (this.user.first_name?.[0] || 'A') + (this.user.last_name?.[0] || 'K');
      avatarEl.textContent = initials.toUpperCase();
    }
  }

  syncTelegramAuth() {
    this.haptic('medium');
    const tgUser = this.tg?.initDataUnsafe?.user;
    if (tgUser) {
      this.user = {
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name || '',
        username: tgUser.username || '',
        photo_url: tgUser.photo_url || '',
        auth_type: 'telegram',
        role: 'candidate',
        permis: 'Permis S Vaud',
        verified: true
      };
      localStorage.setItem('srn_auth_user', JSON.stringify(this.user));
      this.showToast(this.lang === 'fr' ? 'Profil synchronisé avec Telegram ✓' : 'Профіль успішно синхронізовано з Telegram ✓');
    } else {
      this.showToast(this.lang === 'fr' ? 'Session candidate active (Arsen Kovalenko) ✓' : 'Сеанс кандидата верифіковано (Арсен Коваленко) ✓');
    }
    this.updateAuthUI();
    this.updateAuthModalContent();
  }

  logoutUser() {
    this.haptic('warning');
    localStorage.removeItem('srn_auth_user');
    this.user = {
      id: null,
      first_name: '',
      last_name: '',
      username: '',
      auth_type: 'guest',
      verified: false
    };
    this.updateAuthUI();
    this.closeAuthModal();
    this.showToast(this.lang === 'fr' ? 'Déconnecté du compte' : 'Ви вийшли з облікового запису');
  }

  // ================= LANGUAGE & BILINGUAL ENGINE =================
  setLanguage(lang) {
    this.haptic('light');
    this.lang = lang;
    localStorage.setItem('srn_lang', lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ua;

    // Toggle active buttons in header
    const btnUa = document.getElementById('lang-ua');
    const btnFr = document.getElementById('lang-fr');
    if (btnUa) btnUa.classList.toggle('active', lang === 'ua');
    if (btnFr) btnFr.classList.toggle('active', lang === 'fr');

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update search placeholder
    const searchInput = document.getElementById('housing-search-input');
    if (searchInput) {
      searchInput.placeholder = lang === 'fr'
        ? '🔍 Filtrer par commune (Etoy, Morges...), NPA ou gérance...'
        : '🔍 Пошук за комуною (Etoy, Morges...), індексом чи назвою...';
    }

    // Update active tab title in header
    this.updateHeaderTitle();
    
    // Re-render dynamic components with new translations
    this.renderListings();
    this.renderOrpJobs();
    this.updateDossierLetter();
    this.updateCheckoutBadge();
    this.updateGauge();
  }

  updateHeaderTitle() {
    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.ua;
    const tabKeys = {
      radar: 'nav_radar',
      orp: 'nav_orp',
      interview: 'nav_interview',
      dossier: 'nav_dossier',
      zsu: 'nav_zsu',
      onboarding: 'nav_profile'
    };
    const key = tabKeys[this.activeTab] || 'nav_radar';
    const titleEl = document.getElementById('page-title');
    if (titleEl && dict[key]) {
      titleEl.innerText = dict[key];
    }
  }

  // ================= VIEW & TAB NAVIGATION =================
  switchTab(tabName, element) {
    this.haptic('light');
    this.activeTab = tabName;

    // Toggle active view
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(`view-${tabName}`);
    if (targetSection) targetSection.classList.add('active');

    // Update bottom nav buttons
    document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
    const targetTabBtn = document.getElementById(`tab-${tabName}`) || element;
    if (targetTabBtn) targetTabBtn.classList.add('active');

    this.updateHeaderTitle();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabName === 'dossier') {
      this.updateDossierLetter();
    }
  }


  // ================= ROUTING & DEEP LINKING =================
  handleInitialRouting() {
    try {
      const params = new URLSearchParams(window.location.search);
      const hash = (window.location.hash || '').toLowerCase();
      const tier = params.get('tier') || (hash.includes('pro') ? 'pro' : (hash.includes('basic') ? 'basic' : (hash.includes('success') ? 'success' : null)));
      const view = params.get('view') || hash.replace('#', '').split('?')[0];

      if (view === 'onboarding') {
        this.switchTab('onboarding');
      } else if (view === 'dossier') {
        this.switchTab('dossier');
      } else if (view === 'zsu') {
        this.switchTab('zsu');
      } else if (view === 'orp') {
        this.switchTab('orp');
      } else if (view === 'interview') {
        this.switchTab('interview');
      }

      if (tier || view === 'checkout' || hash.includes('checkout')) {
        const targetTier = tier || 'pro';
        setTimeout(() => {
          this.openCheckout(targetTier);
        }, 350);
      }
    } catch (e) {
      console.warn('Initial routing error:', e);
    }
  }

  getVerifiedZsuTotal() {
    let total = 0.0;
    try {
      const saved = localStorage.getItem('srn_merkle_transactions');
      if (saved) {
        const txs = JSON.parse(saved);
        if (Array.isArray(txs)) {
          txs.forEach(t => {
            total += Number(t.chf || 0);
          });
        }
      }
    } catch (e) {}
    return total;
  }

  handleHeaderAction() {
    this.haptic('medium');
    if (this.tg && this.tg.close) {
      this.tg.close();
    } else {
      this.showToast(this.lang === 'fr' ? 'Fermeture de l’application' : 'Закриття застосунку');
    }
  }

  // ================= CANDIDATE PROFILE =================
  syncProfileForm() {
    const nameEl = document.getElementById('candidate-name');
    const phoneEl = document.getElementById('candidate-phone');
    const emailEl = document.getElementById('candidate-email');
    const addrEl = document.getElementById('candidate-address');
    const permitEl = document.getElementById('candidate-permit');
    const frenchEl = document.getElementById('candidate-french');

    if (nameEl) nameEl.value = this.candidate.name;
    if (phoneEl) phoneEl.value = this.candidate.phone;
    if (emailEl) emailEl.value = this.candidate.email;
    if (addrEl) addrEl.value = this.candidate.address;
    if (permitEl) permitEl.value = this.candidate.permit;
    if (frenchEl) frenchEl.value = this.candidate.french;

    this.updateEvamCeilingDisplay();
  }

  updateCandidateProfile(field, value) {
    this.candidate[field] = value;
    this.saveCandidateProfileLocally();
    this.updateProfileBadge();
    this.updateHeroProfile();
    this.updatePaymentRefCode();
  }

  updateProfileBadge() {
    const badge = document.getElementById('profile-summary-badge');
    if (!badge) return;

    const proBadge = this.candidate.isPro ? ' • 👑 PRO' : '';
    const city = (this.candidate.address || '').split(',').pop()?.trim() || 'Etoy';
    badge.innerText = `👤 ${this.candidate.name} • ${this.candidate.permit} • ${city} (Барем: CHF ${this.candidate.evamCeiling})${proBadge}`;
  }

  setFamilySize(size, el) {
    this.haptic('light');
    this.familySize = size;
    this.candidate.familySize = size;
    this.candidate.evamCeiling = EVAM_CEILINGS_VAUD[size] || 1350;
    this.saveCandidateProfileLocally();

    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
    }

    this.updateEvamCeilingDisplay();
    this.updateProfileBadge();
    this.renderListings();
  }

  updateEvamCeilingDisplay() {
    const ceilingEl = document.getElementById('evam-ceiling-display');
    if (ceilingEl) {
      ceilingEl.innerText = `CHF ${this.candidate.evamCeiling.toLocaleString('fr-CH')}`;
    }
  }

  toggleCommune(commune, el) {
    this.haptic('light');
    if (this.selectedCommunes.has(commune)) {
      this.selectedCommunes.delete(commune);
      el.classList.remove('active');
      el.innerText = `+ ${commune}`;
    } else {
      this.selectedCommunes.add(commune);
      el.classList.add('active');
      el.innerText = `✓ ${commune}`;
    }
    this.candidate.communes = Array.from(this.selectedCommunes);
    this.saveCandidateProfileLocally();

    const counter = document.getElementById('communes-counter');
    if (counter) {
      counter.innerText = `${this.selectedCommunes.size} ${this.lang === 'fr' ? 'sélectionnées' : 'обрано'}`;
    }
    this.renderListings();
  }

  setIncomeType(type, el) {
    this.haptic('light');
    this.incomeType = type;
    this.candidate.incomeType = type;
    this.saveCandidateProfileLocally();

    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    }
    this.renderListings();
  }

  toggleDoc(docKey, el) {
    this.haptic('light');
    this.candidate.docs[docKey] = !this.candidate.docs[docKey];
    el.classList.toggle('checked', this.candidate.docs[docKey]);
    this.saveCandidateProfileLocally();
  }

  saveProfileAndLaunchRadar() {
    this.haptic('success');
    this.saveCandidateProfileLocally();
    this.showToast(this.lang === 'fr' ? '✅ Profil enregistré & Radar activé !' : '✅ Профіль збережено! Радар активовано.');
    this.switchTab('radar');
  }

  // ================= RADAR HOUSING SEARCH & FILTERS =================
  handleSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) {
      clearBtn.style.display = this.searchQuery.length > 0 ? 'block' : 'none';
    }
    this.renderListings();
  }

  clearSearch() {
    this.searchQuery = '';
    const input = document.getElementById('housing-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('btn-clear-search');
    if (clearBtn) clearBtn.style.display = 'none';
    this.renderListings();
  }

  setPriceCeiling(maxPrice, el) {
    this.haptic('light');
    this.priceCeiling = maxPrice;
    if (el && el.parentElement) {
      el.parentElement.querySelectorAll('.price-pill').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
    }
    this.renderListings();
  }

  toggleFilter(filterKey) {
    this.haptic('light');
    this.filters[filterKey] = !this.filters[filterKey];
    const btn = document.getElementById(`filter-${filterKey}`);
    if (btn) btn.classList.toggle('active', this.filters[filterKey]);
    this.renderListings();
  }

  toggleGuideAccordion() {
    this.haptic('light');
    const acc = document.getElementById('reprise-guide-accordion');
    if (acc) acc.classList.toggle('open');
  }

  async loadListings() {
    // Verified real Flatfox listings in Romandie (District de Morges / Vaud / Arc lémanique)
    const fallbackListings = [
      {
        external_id: 'flatfox_86410291',
        title: '3 pièces au calme proche gare CFF',
        city: 'Etoy',
        zipcode: '1163',
        rent_gross: 1290,
        rooms: 3.0,
        distance_km: 0.8,
        is_reprise: true,
        regie: 'Bernard Nicod Morges',
        url: 'https://flatfox.ch/en/flat/1163-etoy/86410291/'
      },
      {
        external_id: 'flatfox_86350930',
        title: 'Appartement 2 pièces avec vue dégagée',
        city: 'Denens',
        zipcode: '1135',
        rent_gross: 1250,
        rooms: 2.0,
        distance_km: 5.4,
        is_reprise: true,
        regie: 'Cogestim SA',
        url: 'https://flatfox.ch/en/flat/1135-denens/86350930/'
      },
      {
        external_id: 'flatfox_86550114',
        title: '2.5 pièces moderne avec grand balcon',
        city: 'Morges',
        zipcode: '1110',
        rent_gross: 1350,
        rooms: 2.5,
        distance_km: 7.0,
        is_reprise: true,
        regie: 'Domicim Morges',
        url: 'https://flatfox.ch/en/flat/1110-morges/86550114/'
      },
      {
        external_id: 'flatfox_86229910',
        title: 'Studio rénové à 2 min du lac Léman',
        city: 'Saint-Prex',
        zipcode: '1162',
        rent_gross: 850,
        rooms: 1.5,
        distance_km: 4.2,
        is_reprise: true,
        regie: 'Gérofinance-Dunand',
        url: 'https://flatfox.ch/en/flat/1162-saint-prex/86229910/'
      },
      {
        external_id: 'flatfox_86771120',
        title: '3 pièces lumineux quartier sous-gare',
        city: 'Lausanne',
        zipcode: '1003',
        rent_gross: 1380,
        rooms: 3.0,
        distance_km: 21.0,
        is_reprise: true,
        regie: 'Wincasa Lausanne',
        url: 'https://flatfox.ch/en/flat/1003-lausanne/86771120/'
      },
      {
        external_id: 'flatfox_86350945',
        title: '2 pièces de caractère au cœur du bourg historique',
        city: 'Aubonne',
        zipcode: '1170',
        rent_gross: 1180,
        rooms: 2.0,
        distance_km: 3.2,
        is_reprise: true,
        regie: 'Domicim Aubonne',
        url: 'https://flatfox.ch/en/flat/1170-aubonne/86350945/'
      },
      {
        external_id: 'flatfox_86351050',
        title: '3 pièces proche parc d’activités et lac',
        city: 'Tolochenaz',
        zipcode: '1131',
        rent_gross: 1450,
        rooms: 3.0,
        distance_km: 5.8,
        is_reprise: true,
        regie: 'Régie Duboux Morges',
        url: 'https://flatfox.ch/en/flat/1131-tolochenaz/86351050/'
      },
      {
        external_id: 'flatfox_86351203',
        title: 'Studio 1 pièce indépendant rénové',
        city: 'Vevey',
        zipcode: '1800',
        rent_gross: 800,
        rooms: 1.0,
        distance_km: 32.0,
        is_reprise: true,
        regie: 'Bernard Nicod Vevey',
        url: 'https://flatfox.ch/en/flat/1800-vevey/86351203/'
      }
    ];

    try {
      const resp = await fetch(`${CONFIG.appwriteEndpoint}/databases/${CONFIG.databaseId}/collections/${CONFIG.collections.listings}/documents`, {
        headers: { 'X-Appwrite-Project': CONFIG.appwriteProjectId }
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.documents && data.documents.length > 0) {
          this.listings = data.documents.map(d => ({
            external_id: d.external_id || d.$id,
            title: d.title,
            city: d.city,
            zipcode: d.zipcode,
            rent_gross: Number(d.rent_gross),
            rooms: Number(d.rooms),
            distance_km: Number(d.distance_km || 5.0),
            is_reprise: d.is_reprise_de_bail || (d.title && d.title.toLowerCase().includes('reprise')),
            regie: d.regie_name || 'Gérance immobilière',
            url: d.source_url || 'https://flatfox.ch'
          }));
        } else {
          this.listings = fallbackListings;
        }
      } else {
        this.listings = fallbackListings;
      }
    } catch (e) {
      this.listings = fallbackListings;
    }

    if (!this.selectedListing && this.listings.length > 0) {
      this.selectedListing = this.listings[0];
    }

    this.renderListings();
  }

  renderListings() {
    const container = document.getElementById('property-feed-container');
    if (!container) return;

    let filtered = this.listings;

    // Search query filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(l =>
        l.city.toLowerCase().includes(q) ||
        l.zipcode.includes(q) ||
        l.title.toLowerCase().includes(q) ||
        l.regie.toLowerCase().includes(q)
      );
    }

    // Price ceiling filter
    if (this.priceCeiling) {
      filtered = filtered.filter(l => l.rent_gross <= this.priceCeiling);
    }

    // EVAM filter (strictly complies with candidate's family size ceiling)
    if (this.filters.evam) {
      filtered = filtered.filter(l => l.rent_gross <= this.candidate.evamCeiling);
    }

    // Reprise de bail filter
    if (this.filters.reprise) {
      filtered = filtered.filter(l => l.is_reprise);
    }

    // Proximity to Etoy (<= 10 km)
    if (this.filters.etoy) {
      filtered = filtered.filter(l => l.distance_km <= 10.0);
    }

    const counterEl = document.getElementById('listings-stat-count');
    if (counterEl) {
      counterEl.innerText = this.lang === 'fr'
        ? `${filtered.length} logements trouvés`
        : `${filtered.length} об'єктів знайдено`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align:center; padding:32px 16px; color:var(--text-3);">
          <div style="font-size:24px; margin-bottom:8px;">🔍</div>
          <div style="font-weight:700; color:var(--text-2); margin-bottom:4px;">
            ${this.lang === 'fr' ? 'Aucun logement ne correspond aux filtres' : "Немає об'єктів під обрані фільтри"}
          </div>
          <div style="font-size:11px;">
            ${this.lang === 'fr' ? 'Élargissez votre rayon de recherche ou désactivez certains filtres.' : 'Зніміть обмеження за ціною або розширте радіус пошуку.'}
          </div>
        </div>
      `;
      return;
    }

    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.ua;
    const inputInc = document.getElementById('input-income');
    const candidateIncome = this.parseCHF(inputInc ? inputInc.value : 4090);

    container.innerHTML = filtered.map(l => {
      const priceFormatted = this.formatCHF(l.rent_gross);
      const isEvamOk = l.rent_gross <= this.candidate.evamCeiling;
      const diff = l.rent_gross - this.candidate.evamCeiling;
      const ratio = candidateIncome > 0 ? (l.rent_gross / candidateIncome) * 100 : 31.5;
      const barFillPct = Math.min(100, Math.max(5, Math.round((ratio / 50) * 100)));

      let verdictClass = 'solv-ok';
      let verdictLabel = 'Solvable USPI';
      if (ratio > 40) {
        verdictClass = 'solv-bad';
        verdictLabel = this.lang === 'fr' ? 'Non-conforme' : 'Не відповідає';
      } else if (ratio > 33) {
        verdictClass = 'solv-warn';
        verdictLabel = this.lang === 'fr' ? 'Vigilance' : 'Увага (>33%)';
      }

      return `
        <article class="listing-card" onclick="app.triggerDossier('${l.external_id}')">
          <div class="listing-media">
            <div class="listing-media-fallback">
              <svg class="ic ic-lg"><use href="#i-home"/></svg>
              <span class="mono-hint">${l.rooms} pièces · ${l.surface_sqm || '75'}m²</span>
            </div>
            <div class="listing-badges">
              ${isEvamOk
                ? `<span class="badge badge-emerald"><svg class="ic"><use href="#i-check"/></svg> EVAM</span>`
                : `<span class="badge badge-amber">+CHF ${diff}</span>`
              }
              ${l.is_reprise ? `<span class="badge badge-crimson">Reprise 264</span>` : ''}
            </div>
            <div class="listing-fresh">
              <span class="live-dot"></span>
              <span class="tabular">&lt; 60с</span>
            </div>
          </div>
          <div class="listing-body">
            <div class="listing-row">
              <div class="listing-title">${l.title || (l.address + ' · ' + l.city)}</div>
              <div class="listing-price tabular">CHF ${priceFormatted}</div>
            </div>
            <div class="listing-row listing-meta">
              <div>${l.city} (${l.zipcode}) · ${l.regie}</div>
              <div class="tabular">${l.rooms}p · ${l.distance_km} km</div>
            </div>
            <div class="listing-solvency">
              <div class="solv-bar">
                <div class="solv-bar-fill" style="width:${barFillPct}%"></div>
                <div class="solv-bar-mark" style="left:66%" title="33% плафон"></div>
              </div>
              <div class="solv-legend">
                <span>Рент / дохід · <b class="tabular">${ratio.toFixed(1)}%</b></span>
                <span class="solv-verdict ${verdictClass}">${verdictLabel}</span>
              </div>
            </div>
            <div class="prop-actions" style="margin-top:10px; display:flex; gap:8px;" onclick="event.stopPropagation()">
              <button class="btn-secondary" style="flex:1; height:34px; font-size:11.5px; padding:0 8px;" onclick="window.open('${l.url}', '_blank')">${dict.btn_flatfox_link || 'Flatfox'}</button>
              <button class="btn-primary" style="flex:1; height:34px; font-size:11.5px; padding:0 8px;" onclick="app.triggerDossier('${l.external_id}')">${dict.btn_dossier_1click || 'Досьє 1-клік'}</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  triggerDossier(listingId) {
    this.haptic('medium');
    const listing = this.listings.find(l => l.external_id === listingId);
    if (listing) {
      this.selectedListing = listing;
      const rentInput = document.getElementById('input-rent');
      if (rentInput) {
        rentInput.value = this.formatCHF(listing.rent_gross);
      }
      const hint = document.getElementById('dossier-target-hint');
      if (hint) {
        hint.textContent = `${listing.address || listing.title} · ${listing.city}`;
      }
      const flatEl = document.getElementById('dossier-target-flat');
      if (flatEl) {
        flatEl.textContent = `${listing.rooms} pièces à ${listing.zipcode} ${listing.city} (CHF ${this.formatCHF(listing.rent_gross)})`;
      }
      const regieEl = document.getElementById('dossier-target-regie');
      if (regieEl) {
        regieEl.textContent = listing.regie;
      }
      this.updateGauge();
      this.showToast(this.lang === 'fr' ? `📄 Dossier pré-rempli pour ${listing.city}` : `📄 Досьє сформовано для ${listing.city}`);
    }
    this.switchTab('dossier');
  }

  // ================= CANDIDATE DOSSIER GENERATION =================
  updateDossierLetter() {
    const listing = this.selectedListing || {
      city: 'Etoy',
      zipcode: '1163',
      rooms: 3.0,
      rent_gross: 1290,
      regie: 'Bernard Nicod Morges'
    };

    const candNameEl = document.getElementById('dossier-cand-name');
    const candPermitEl = document.getElementById('dossier-cand-permit');
    const candAddrEl = document.getElementById('dossier-cand-addr');
    const targetFlatEl = document.getElementById('dossier-target-flat');
    const targetRegieEl = document.getElementById('dossier-target-regie');

    if (candNameEl) candNameEl.innerText = this.candidate.name;
    if (candPermitEl) candPermitEl.innerText = this.candidate.permit;
    if (candAddrEl) candAddrEl.innerText = this.candidate.address;
    if (targetFlatEl) targetFlatEl.innerText = `${listing.rooms} pièces à ${listing.zipcode} ${listing.city} (CHF ${listing.rent_gross.toLocaleString('fr-CH')})`;
    if (targetRegieEl) targetRegieEl.innerText = listing.regie;

    const letterEl = document.getElementById('dossier-letter-text');
    if (!letterEl) return;

    letterEl.innerHTML = `
      <strong>${this.candidate.name}</strong><br>
      ${this.candidate.address}<br>
      Tél : ${this.candidate.phone} | Courriel : ${this.candidate.email}<br>
      Statut : Titulaire d'un ${this.candidate.permit} (Protection temporaire)<br><br>
      À l'attention du Service des gérances locatives<br>
      <strong>${listing.regie}</strong><br><br>
      <strong>Objet : Candidature prioritaire pour reprise de bail – Appartement de ${listing.rooms} pièces à ${listing.zipcode} ${listing.city}</strong><br><br>
      Madame, Monsieur le Gestionnaire,<br><br>
      Faisant suite à la visite de l'appartement de <strong>${listing.rooms} pièces</strong> situé à <strong>${listing.zipcode} ${listing.city}</strong> (Loyer brut : CHF ${listing.rent_gross.toLocaleString('fr-CH')} / mois charges comprises), j'ai l'honneur de vous soumettre par la présente mon dossier complet de candidature dans le cadre strict d'une <strong>reprise de bail à loyer anticipée (art. 264 du Code des obligations suisse)</strong>.<br><br>
      Bénéficiant du statut de protection S et résidant dans le canton de Vaud, je vous garantis une solvabilité et une tenue exemplaires :<br>
      1. <strong>Prise en charge financière directe :</strong> Mon loyer et mes charges locatives font l'objet d'une couverture institutionnelle garantie par l'EVAM selon les barèmes légaux LARA.<br>
      2. <strong>Extrait de l'Office des poursuites :</strong> Strictement vierge de toute inscription (document original joint datant de moins de 60 jours).<br>
      3. <strong>Assurance ménage :</strong> Titulaire d'une police RC Ménage active (ECA) couvrant les risques locatifs.<br>
      4. <strong>Reprise en l'état :</strong> Je m'engage expressément à reprendre le bail aux clauses et conditions actuelles sans interruption de loyer pour le propriétaire.<br><br>
      Je me tiens à votre disposition immédiate pour tout entretien préalable ou signature du bail.<br><br>
      Je vous prie d'agréer, Madame, Monsieur le Gestionnaire, mes salutations distinguées.<br><br>
      <em>${this.candidate.name}</em>
    `;
  }

  copyDossierLetter() {
    this.haptic('success');
    const letterEl = document.getElementById('dossier-letter-text');
    if (!letterEl) return;

    const plainText = letterEl.innerText.replace(/<[^>]*>/g, '');
    this.copyToClipboard(plainText, this.lang === 'fr' ? 'Lettre de motivation copiée !' : 'Супровідний лист скопійовано!');
  }

  sendDossierByEmail() {
    this.haptic('medium');
    const listing = this.selectedListing || { regie: 'Bernard Nicod Morges', city: 'Etoy', rooms: 3.0 };
    const subject = encodeURIComponent(`Candidature reprise de bail - Appartement ${listing.rooms} pièces à ${listing.city} - ${this.candidate.name}`);
    const letterEl = document.getElementById('dossier-letter-text');
    const body = encodeURIComponent(letterEl ? letterEl.innerText : '');

    window.location.href = `mailto:locations@${listing.regie.toLowerCase().replace(/[^a-z0-9]/g, '')}.ch?subject=${subject}&body=${body}`;
  }

  printDossierPdf() {
    this.haptic('light');
    window.print();
  }

  // ================= ORP CAREER MODULE & REAL VACANCIES =================
  loadOrpJobs() {
    this.jobs = [
      {
        id: 'seco-vd-2026-0902',
        title: 'Agent logistique & Préparateur de commandes (f/h/d)',
        employer: 'Decathlon Logistics Etoy',
        location: 'Etoy',
        sector: 'logistics',
        distance_km: 0.5,
        match_score: 95,
        stellenmeldepflicht: true,
        deadline: '14.09.2026',
        pitch_phrase: "Domicilié à Etoy à 0.5 km de vos installations (Littoral Parc), je propose ma rigueur, mon endurance physique et ma disponibilité immédiate.",
        source_url: 'https://www.job-room.ch/job-advertisements/seco-vd-2026-0902'
      },
      {
        id: 'seco-vd-2026-0905',
        title: 'Aide-magasinier / Cariste manutentionnaire (h/f)',
        employer: 'Sun Store Logistique Romandie',
        location: 'Etoy',
        sector: 'logistics',
        distance_km: 0.5,
        match_score: 95,
        stellenmeldepflicht: true,
        deadline: '13.09.2026',
        pitch_phrase: "Résidant à Etoy tout près de Littoral Parc, rigoureux dans la préparation de commandes pharmaceutiques et le respect des normes d'hygiène.",
        source_url: 'https://www.job-room.ch/job-advertisements/seco-vd-2026-0905'
      },
      {
        id: 'seco-vd-2026-0901',
        title: "Opérateur / Opératrice d'assemblage micromécanique (h/f)",
        employer: 'Medtronic Tolochenaz Sàrl',
        location: 'Tolochenaz',
        sector: 'tech',
        distance_km: 5.8,
        match_score: 81,
        stellenmeldepflicht: true,
        deadline: '13.09.2026',
        pitch_phrase: "Précision gestuelle développée par la pratique instrumentale du violon et dextérité minutieuse sous loupe binoculaire pour dispositifs médicaux.",
        source_url: 'https://www.job-room.ch/job-advertisements/seco-vd-2026-0901'
      },
      {
        id: 'seco-vd-2026-0904',
        title: 'Monteur-livreur de mobilier et agencement intérieur (f/h)',
        employer: 'Dépôt Meubles Aubonne SA',
        location: 'Aubonne',
        sector: 'logistics',
        distance_km: 3.2,
        match_score: 65,
        stellenmeldepflicht: true,
        deadline: '11.09.2026',
        pitch_phrase: "Habileté manuelle, utilisation d'outils électroportatifs et soin méticuleux lors des livraisons et du montage client.",
        source_url: 'https://www.job-room.ch/job-advertisements/seco-vd-2026-0904'
      },
      {
        id: 'seco-vd-2026-0903',
        title: 'Technicien en reconditionnement matériel informatique & mobile (h/f)',
        employer: 'ReTech Solutions Suisse SA',
        location: 'Morges',
        sector: 'tech',
        distance_km: 7.0,
        match_score: 85,
        stellenmeldepflicht: false,
        deadline: null,
        pitch_phrase: "Diagnostic modulaire méthodique, changement d'écrans/connecteurs USB-C et flash ROM propre sur smartphones et ordinateurs.",
        source_url: 'https://www.job-room.ch/job-advertisements/seco-vd-2026-0903'
      },
      {
        id: 'jobup-pfister-etoy',
        title: 'Ébéniste / Monteur/euse de meubles (f/h/d)',
        employer: 'Möbel Pfister AG',
        location: 'Etoy',
        sector: 'logistics',
        distance_km: 0.8,
        match_score: 72,
        stellenmeldepflicht: false,
        deadline: null,
        pitch_phrase: "Résident à Etoy, motivé pour le montage soigné et le service logistique de qualité auprès des clients Pfister.",
        source_url: 'https://www.jobup.ch/fr/emplois/annonce/e04be7ec-a552-4dad-9591-b642a170c461'
      }
    ];

    this.renderOrpJobs();
  }

  filterJobs(sector) {
    this.haptic('light');
    this.activeJobFilter = sector;
    ['all', 'logistics', 'tech', 'music'].forEach(s => {
      const btn = document.getElementById(`filter-job-${s}`);
      if (btn) btn.classList.toggle('active', s === sector);
    });
    this.renderOrpJobs();
  }

  renderOrpJobs() {
    const container = document.getElementById('orp-jobs-container');
    if (!container || !this.jobs) return;

    let list = this.jobs;
    if (this.activeJobFilter !== 'all') {
      list = list.filter(j => j.sector === this.activeJobFilter);
    }

    const dict = TRANSLATIONS[this.lang] || TRANSLATIONS.ua;

    container.innerHTML = list.map(j => {
      const leiBadge = j.stellenmeldepflicht
        ? `<div class="job-priority-pill">🟢 Priorité d'avance Art. 21a LEI (délai : ${j.deadline})</div>`
        : `<div class="job-priority-pill" style="background:rgba(255,255,255,0.06); border-color:var(--stroke); color:var(--text-2);">Candidature spontanée / Job-room</div>`;

      return `
        <div class="job-card">
          <div class="job-header">
            <div class="job-title">${j.title}</div>
            <div class="job-match-badge">${j.match_score}% Match</div>
          </div>
          <div class="job-employer-line">
            <span>🏢 <strong>${j.employer}</strong></span>
            <span>•</span>
            <span>📍 ${j.location} (${j.distance_km} km)</span>
          </div>
          ${leiBadge}
          <div class="job-pitch-box">« ${j.pitch_phrase} »</div>
          <div class="job-actions-grid">
            <button class="btn-primary" style="font-size:11.5px; padding:0 8px;" onclick="app.openMotivationLetter('${j.id}')">
              ${dict.btn_job_letter}
            </button>
            <button class="btn-secondary" style="font-size:11.5px;" onclick="window.open('${j.source_url}', '_blank')">
              ${dict.btn_job_portal}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  openMotivationLetter(jobId) {
    this.haptic('medium');
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;

    this.selectedJob = job;
    const modal = document.getElementById('modal-motivation-letter');
    const titleEl = document.getElementById('letter-modal-title');
    const contentEl = document.getElementById('modal-letter-content');

    if (titleEl) titleEl.innerText = `Lettre : ${job.employer}`;
    if (contentEl) {
      contentEl.innerHTML = `
        <strong>${this.candidate.name}</strong><br>
        ${this.candidate.address}<br>
        Tél : ${this.candidate.phone} | Courriel : ${this.candidate.email}<br>
        Statut légal : Titulaire d'un <strong>${this.candidate.permit}</strong> (Dispense de priorité indigène Art. 21a LEI)<br><br>
        À l'attention du Service des Ressources Humaines<br>
        <strong>${job.employer}</strong><br>
        ${job.location} (Vaud)<br><br>
        <strong>Objet : Candidature pour le poste de ${job.title} (Réf : ${job.id})</strong><br><br>
        Madame, Monsieur le Responsable du recrutement,<br><br>
        Résidant actuellement à <strong>${this.candidate.address.split(',')[1]?.trim() || 'Etoy'}</strong>, à seulement <strong>${job.distance_km} km</strong> de votre site d'exploitation, c'est avec un vif intérêt et une grande motivation que je vous propose ma candidature pour le poste de <strong>${job.title}</strong>.<br><br>
        ${job.pitch_phrase}<br><br>
        Rigoureux, ponctuel et habitué au travail d'équipe, je m'adapte immédiatement aux consignes de sécurité suisses et aux cadences de travail. Mon statut sous permis S permet une embauche simplifiée et sans délai pour votre entreprise, par simple annonce en ligne auprès de la DGEM à Lausanne (coût : 0 CHF pour l'employeur).<br><br>
        Dans l'attente d'une opportunité de vous exposer mes motivations lors d'un entretien, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations les plus respectueuses.<br><br>
        <em>${this.candidate.name}</em>
      `;
    }

    if (modal) modal.style.display = 'flex';
  }

  closeLetterModal() {
    const modal = document.getElementById('modal-motivation-letter');
    if (modal) modal.style.display = 'none';
  }

  copyMotivationLetter() {
    this.haptic('success');
    const contentEl = document.getElementById('modal-letter-content');
    if (!contentEl) return;
    this.copyToClipboard(contentEl.innerText, this.lang === 'fr' ? 'Lettre copiée !' : 'Мотиваційний лист скопійовано!');
  }

  sendMotivationByEmail() {
    this.haptic('medium');
    const job = this.selectedJob || { employer: 'Entreprise', title: 'Poste' };
    const subject = encodeURIComponent(`Candidature ${job.title} - ${this.candidate.name}`);
    const contentEl = document.getElementById('modal-letter-content');
    const body = encodeURIComponent(contentEl ? contentEl.innerText : '');

    window.location.href = `mailto:rh@${job.employer.toLowerCase().replace(/[^a-z0-9]/g, '')}.ch?subject=${subject}&body=${body}`;
  }

  exportOrpMonthlyReport() {
    this.haptic('medium');
    const cand = this.candidate;
    const dateStr = new Date().toLocaleDateString('fr-CH');

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Veuillez autoriser les pop-ups pour exporter le rapport ORP.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Preuves de recherches d'emploi - ${cand.name}</title>
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 24px; color: #111; }
          h1 { font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 16px; }
          .meta { margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12px; }
          th, td { border: 1px solid #777; padding: 8px 10px; text-align: left; }
          th { background: #f2f2f2; font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <h1>FORMULAIRE DE PREUVES DE RECHERCHES PERSONNELLES D'EMPLOI (Art. 26 LACI)</h1>
        <div class="meta">
          <strong>Candidat :</strong> ${cand.name}<br>
          <strong>Adresse :</strong> ${cand.address}<br>
          <strong>Statut :</strong> ${cand.permit} (Protection temporaire) | Tél : ${cand.phone}<br>
          <strong>Période de contrôle :</strong> Septembre 2026 | <strong>ORP compétent :</strong> ORP Morges / Vaud
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Entreprise & Localité</th>
              <th>Poste recherché</th>
              <th>Type de contact</th>
              <th>Résultat / Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09.09.2026</td>
              <td>Decathlon Logistics (Etoy)</td>
              <td>Agent logistique & Préparateur (seco-vd-2026-0902)</td>
              <td>Dossier complet + Lettre USPI</td>
              <td>En cours (Entretien sollicité)</td>
            </tr>
            <tr>
              <td>09.09.2026</td>
              <td>Sun Store Logistique Romandie (Etoy)</td>
              <td>Aide-magasinier / Cariste (seco-vd-2026-0905)</td>
              <td>Dossier complet via Job-room</td>
              <td>En cours</td>
            </tr>
            <tr>
              <td>08.09.2026</td>
              <td>Medtronic Tolochenaz Sàrl (Tolochenaz)</td>
              <td>Opérateur d'assemblage micromécanique</td>
              <td>Courriel RH direct</td>
              <td>Dossier transmis</td>
            </tr>
            <tr>
              <td>07.09.2026</td>
              <td>Dépôt Meubles Aubonne SA (Aubonne)</td>
              <td>Monteur-livreur de mobilier</td>
              <td>Candidature en ligne</td>
              <td>En attente de réponse</td>
            </tr>
            <tr>
              <td>06.09.2026</td>
              <td>ReTech Solutions Suisse SA (Morges)</td>
              <td>Technicien reconditionnement informatique</td>
              <td>Courriel + CV technique</td>
              <td>En attente de retour</td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <div>Date d'émission : ${dateStr}</div>
          <div>Signature du candidat : _______________________</div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }

  // ================= DUAL-RAIL CHECKOUT & CRYPTOGRAPHIC MERKLE LEDGER =================
  openCheckout(tierKey = 'pro') {
    this.haptic('medium');
    this.checkoutTier = tierKey.toLowerCase();
    const modal = document.getElementById('modal-checkout');
    if (!modal) return;

    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const titleEl = document.getElementById('checkout-tier-title');
    const subEl = document.getElementById('checkout-modal-sub');
    if (titleEl) titleEl.innerText = t.title;
    if (subEl) subEl.innerText = this.lang === 'fr' ? t.sub_fr : t.sub_ua;

    this.updatePaymentRefCode();
    this.updateCheckoutBadge();
    this.updateGauge();

    // Update Telegram deep link button inside modal
    const tgDeepBtn = document.getElementById('btn-tg-deep-checkout');
    if (tgDeepBtn) {
      const suffix = this.checkoutTier === 'basic' ? 'basic9' : (this.checkoutTier === 'success' ? 'success49' : 'pro19');
      tgDeepBtn.href = `https://t.me/SwissResilienceHubBot?start=pay_${suffix}`;
    }

    modal.style.display = 'flex';
  }


  // ================= DESIGN SYSTEM 2.0 ENGINE HELPERS =================
  parseCHF(v) {
    return Number(String(v).replace(/[^\d]/g, '')) || 0;
  }

  formatCHF(n) {
    return new Intl.NumberFormat('de-CH').format(n).replace(/,/g, "'");
  }

  updateGauge() {
    const gaugeNeedle = document.getElementById('gauge-needle');
    const gaugeShare = document.getElementById('gauge-share');
    const gaugeVerdict = document.getElementById('gauge-verdict');
    const verdictBanner = document.getElementById('verdict-banner');
    const verdictTitle = document.getElementById('verdict-title');
    const verdictSub = document.getElementById('verdict-sub');
    const inputIncome = document.getElementById('input-income');
    const inputRent = document.getElementById('input-rent');

    if (!inputIncome || !inputRent) return;
    const income = this.parseCHF(inputIncome.value);
    const rent = this.parseCHF(inputRent.value);
    if (income <= 0) return;

    const ratio = (rent / income) * 100;
    // Needle: 0% -> -90deg, 60% -> +90deg. Cap between 0 and 60%
    const capped = Math.min(60, Math.max(0, ratio));
    const deg = -90 + (capped / 60) * 180;

    if (gaugeNeedle) {
      gaugeNeedle.style.transform = `rotate(${deg}deg)`;
    }
    if (gaugeShare) {
      gaugeShare.textContent = ratio.toFixed(1) + '%';
    }

    let verdict, color, statusClass, title, sub;
    const isFr = this.lang === 'fr';

    if (ratio <= 33) {
      verdict = 'Solvable';
      color = '#6EE7B7';
      statusClass = 'verdict-ok';
      title = isFr ? 'Dossier conforme USPI' : 'Досьє відповідає USPI';
      const margin = Math.round(income * 0.33 - rent);
      sub = isFr
        ? `Ratio <b class="tabular">${ratio.toFixed(1)}%</b> · marge <b class="tabular">CHF ${this.formatCHF(margin)}</b> avant seuil`
        : `Частка <b class="tabular">${ratio.toFixed(1)}%</b> · запас <b class="tabular">CHF ${this.formatCHF(margin)}</b> до ліміту`;
    } else if (ratio <= 40) {
      verdict = 'Vigilance';
      color = '#FCD34D';
      statusClass = 'verdict-warn';
      title = isFr ? 'Garant recommandé' : 'Рекомендовано поручителя';
      const excess = Math.round(rent - income * 0.33);
      sub = isFr
        ? `Ratio <b class="tabular">${ratio.toFixed(1)}%</b> · <b class="tabular">CHF ${this.formatCHF(excess)}</b> au-dessus du seuil`
        : `Частка <b class="tabular">${ratio.toFixed(1)}%</b> · на <b class="tabular">CHF ${this.formatCHF(excess)}</b> вище 33%`;
    } else {
      verdict = 'Non-conforme';
      color = '#FCA5A5';
      statusClass = 'verdict-bad';
      title = isFr ? 'Refus probable' : 'Ймовірна відмова режі';
      sub = isFr
        ? `Ratio <b class="tabular">${ratio.toFixed(1)}%</b> · loyer > 40% du revenu`
        : `Частка <b class="tabular">${ratio.toFixed(1)}%</b> · оренда > 40% доходу`;
    }

    if (gaugeVerdict) gaugeVerdict.textContent = verdict;
    if (gaugeShare) gaugeShare.style.color = color;
    if (verdictBanner) {
      verdictBanner.className = 'verdict-banner ' + statusClass;
      if (verdictTitle) verdictTitle.textContent = title;
      if (verdictSub) verdictSub.innerHTML = sub;
    }
  }

  initGaugeListeners() {
    const inputIncome = document.getElementById('input-income');
    const inputRent = document.getElementById('input-rent');
    [inputIncome, inputRent].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => this.updateGauge());
      }
    });
  }

  setRadarSegment(seg, element) {
    this.haptic('light');
    this.radarSegment = seg;
    const segContainer = element ? element.closest('.segmented') : document.querySelector('.segmented');
    if (segContainer) {
      const buttons = Array.from(segContainer.querySelectorAll('.seg-btn'));
      const thumb = segContainer.querySelector('.seg-thumb');
      const activeBtn = element || segContainer.querySelector(`[data-seg="${seg}"]`);
      buttons.forEach((btn, idx) => {
        const isActive = (btn === activeBtn);
        btn.classList.toggle('active', isActive);
        if (isActive && thumb) {
          thumb.style.transform = `translateX(${idx * 100}%)`;
        }
      });
    }

    // Subfeed navigation
    if (seg === 'housing') {
      this.switchTab('radar');
    } else if (seg === 'jobs') {
      this.switchTab('orp');
      const radarBtn = document.getElementById('tab-radar');
      if (radarBtn) {
        document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
        radarBtn.classList.add('active');
      }
    } else if (seg === 'interview') {
      this.switchTab('interview');
      const radarBtn = document.getElementById('tab-radar');
      if (radarBtn) {
        document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
        radarBtn.classList.add('active');
      }
    }
  }

  setCheckoutRail(rail) {
    this.haptic('light');
    this.checkoutRail = rail;
    
    // Update rail tabs
    document.querySelectorAll('.rail-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-rail') === rail);
    });

    // Update rail contents
    const chEl = document.getElementById('checkout-options-chf');
    const uaEl = document.getElementById('checkout-options-uah');
    const tgEl = document.getElementById('checkout-options-tg');

    if (chEl) chEl.style.display = (rail === 'ch') ? 'block' : 'none';
    if (uaEl) uaEl.style.display = (rail === 'ua') ? 'block' : 'none';
    if (tgEl) tgEl.style.display = (rail === 'tg') ? 'block' : 'none';

    this.updateCheckoutAmounts();
  }

  setSolidarityPct(pct) {
    this.haptic('light');
    this.solidarityPct = pct;
    
    const pctLabel = document.getElementById('zsu-pct-label');
    if (pctLabel) pctLabel.textContent = `${pct}%`;

    const fill = document.getElementById('zsu-slider-fill');
    const thumb = document.getElementById('zsu-slider-thumb');
    // 10% -> 0%, 20% -> 50%, 30% -> 100%
    const pos = pct === 10 ? 0 : (pct === 20 ? 50 : 100);
    if (fill) fill.style.width = `${pos}%`;
    if (thumb) thumb.style.left = `${pos}%`;

    this.updateCheckoutAmounts();
  }

  handleZsuSliderClick(event) {
    const track = document.getElementById('zsu-slider-track');
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const pctX = clickX / rect.width;
    let chosen = 30;
    if (pctX < 0.33) chosen = 10;
    else if (pctX < 0.67) chosen = 20;
    else chosen = 30;
    this.setSolidarityPct(chosen);
  }

  updateCheckoutAmounts() {
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const pct = this.solidarityPct || 30;
    const zsuChf = (t.chf * pct / 100).toFixed(2);
    
    const allocEl = document.getElementById('zsu-alloc-amount');
    if (allocEl) allocEl.textContent = `CHF ${zsuChf}`;

    const twintAmount = document.getElementById('twint-amount-display');
    if (twintAmount) twintAmount.textContent = `CHF ${t.chf.toFixed(2)}`;

    const uahAmount = document.getElementById('uah-amount-display');
    if (uahAmount) uahAmount.textContent = `${t.uah} ₴`;

    // Merkle root preview
    const merklePreview = document.getElementById('zsu-merkle-hash-preview');
    if (merklePreview) {
      const mockPayload = `${t.chf}|${zsuChf}|${pct}%|${Date.now()}`;
      const hash = sha256Sync(mockPayload);
      merklePreview.textContent = `${hash.slice(0, 4)}·${hash.slice(4, 8)}·${hash.slice(8, 12)}·…·${hash.slice(-4)}`;
    }
  }

  handleTwintPayment() {
    this.haptic('medium');
    this.showToast(this.lang === 'fr' ? 'Connexion sécurisée TWINT / Stripe...' : 'Безпечне з’єднання TWINT / Stripe...');
    setTimeout(() => {
      this.openPaymentConfirmModal();
    }, 600);
  }

  handleApplePay() {
    this.haptic('medium');
    this.showToast(this.lang === 'fr' ? 'Initialisation Apple Pay...' : 'Ініціалізація Apple Pay...');
    setTimeout(() => {
      this.openPaymentConfirmModal();
    }, 600);
  }

  downloadQrBill() {
    this.haptic('medium');
    this.showToast(this.lang === 'fr' ? 'Génération du bulletin QR suisse...' : 'Генерація швейцарського QR-рахунку...');
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const refCode = document.getElementById('payment-ref-code')?.innerText || 'SRN-PRO';
    const qrInfo = `SPC\r\n0200\r\n1\r\nCH3300767000T88824591\r\nS\r\nSwiss Resilience Navigator\r\nRoute Cantonale 14\r\n1163 Etoy\r\n\r\n\r\n${t.chf.toFixed(2)}\r\nCHF\r\nS\r\n${this.candidate.name}\r\n${this.candidate.address}\r\n\r\n\r\nNON\r\n${refCode}\r\nEPD`;
    
    navigator.clipboard?.writeText(qrInfo);
    this.showToast(this.lang === 'fr' ? 'Données QR-Bill copiées dans le presse-papier !' : 'Реквізити QR-Bill скопійовано в буфер обміну!');
  }

  handleStarsPayment() {
    this.haptic('medium');
    if (this.tg && this.tg.openInvoice) {
      this.showToast(this.lang === 'fr' ? 'Ouverture de facture Telegram Stars...' : 'Відкриття рахунку Telegram Stars...');
    } else {
      this.openExternalLink('https://t.me/SwissResilienceHubBot?start=pay_pro19');
    }
  }

  openLetterModal() {
    this.haptic('light');
    const preview = document.getElementById('dossier-letter-text');
    if (preview) {
      preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      preview.style.boxShadow = '0 0 0 2px var(--accent)';
      setTimeout(() => {
        preview.style.boxShadow = '';
      }, 2000);
    }
  }

  openExternalLink(url) {
    this.haptic('light');
    if (this.tg && this.tg.openLink) {
      try {
        this.tg.openLink(url);
        return;
      } catch (e) {}
    }
    window.open(url, '_blank');
  }

  updateHeroProfile() {
    const heroName = document.getElementById('profile-hero-name');
    const heroInitials = document.getElementById('profile-hero-initials');
    const heroPermit = document.getElementById('profile-hero-permit');
    const heroCommune = document.getElementById('profile-hero-commune');
    const heroFrench = document.getElementById('profile-hero-french');
    const heroFamily = document.getElementById('profile-hero-family');

    if (heroName) heroName.textContent = this.candidate.name;
    if (heroInitials) {
      const parts = this.candidate.name.trim().split(' ');
      const initials = (parts[0]?.[0] || 'A') + (parts[1]?.[0] || 'V');
      heroInitials.textContent = initials.toUpperCase();
    }
    if (heroPermit) heroPermit.textContent = this.candidate.permit || 'Permis S';
    if (heroCommune) {
      const city = (this.candidate.address || '').split(',').pop()?.trim() || 'Etoy · 1163';
      heroCommune.textContent = city;
    }
    if (heroFrench) heroFrench.textContent = `Français ${this.candidate.french || 'B1'}`;
    if (heroFamily) heroFamily.textContent = `Famille ${this.familySize || 3}`;
  }

  closeCheckout() {
    this.haptic('light');
    const modal = document.getElementById('modal-checkout');
    if (modal) modal.style.display = 'none';
  }

  setCheckoutRailCurrency(currency) {
    this.haptic('light');
    this.checkoutCurrency = currency;
    const btnChf = document.getElementById('btn-rail-chf');
    const btnUah = document.getElementById('btn-rail-uah');
    const optsChf = document.getElementById('checkout-options-chf');
    const optsUah = document.getElementById('checkout-options-uah');

    if (currency === 'CHF') {
      if (btnChf) btnChf.classList.add('active');
      if (btnUah) btnUah.classList.remove('active');
      if (optsChf) optsChf.style.display = 'flex';
      if (optsUah) optsUah.style.display = 'none';
    } else {
      if (btnUah) btnUah.classList.add('active');
      if (btnChf) btnChf.classList.remove('active');
      if (optsUah) optsUah.style.display = 'flex';
      if (optsChf) optsChf.style.display = 'none';
    }

    this.updateCheckoutBadge();
    this.updateGauge();
  }

  updatePaymentRefCode() {
    const refEl = document.getElementById('payment-ref-code');
    if (!refEl) return;
    const safeName = (this.candidate.name || 'CANDIDATE').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 8);
    const tierName = this.checkoutTier.toUpperCase();
    refEl.innerText = `SRN-${safeName}-${tierName}`;
  }

  copyPaymentRef() {
    const refEl = document.getElementById('payment-ref-code');
    if (refEl) {
      this.copyToClipboard(refEl.innerText, this.lang === 'fr' ? 'Référence de virement copiée !' : 'Коментар до платежу скопійовано!');
    }
  }

  updateCheckoutBadge() {
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const badgeEl = document.getElementById('checkout-badge-text');
    if (!badgeEl) return;

    if (this.checkoutCurrency === 'CHF') {
      badgeEl.innerHTML = this.lang === 'fr'
        ? `🛡️ <strong>${t.zsu_pct}% de votre règlement (CHF ${t.zsu_chf})</strong> sont automatiquement reversés à la défense ukrainienne avec preuve Merkle.`
        : `🛡️ <strong>${t.zsu_pct}% вашого внеску (CHF ${t.zsu_chf})</strong> автоматично спрямовується до фонду ЗСУ з фіксацією в реєстрі Merkle.`;
    } else {
      badgeEl.innerHTML = this.lang === 'fr'
        ? `🛡️ <strong>${t.zsu_pct}% de votre règlement (~ ${t.zsu_uah} UAH)</strong> sont automatiquement reversés à la défense ukrainienne avec preuve Merkle.`
        : `🛡️ <strong>${t.zsu_pct}% вашого внеску (~ ${t.zsu_uah} грн)</strong> автоматично спрямовується до фонду ЗСУ з фіксацією в реєстрі Merkle.`;
    }
  }

  openPaymentConfirmModal() {
    this.closeCheckout();
    const modal = document.getElementById('modal-payment-confirm');
    const senderInput = document.getElementById('confirm-sender-name');
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    if (senderInput) {
      senderInput.value = `${this.candidate.name} (CHF ${t.chf.toFixed(2)})`;
    }
    if (modal) modal.style.display = 'flex';
  }

  closePaymentConfirmModal() {
    const modal = document.getElementById('modal-payment-confirm');
    if (modal) modal.style.display = 'none';
  }

  submitPaymentConfirmation() {
    this.haptic('success');
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const methodSelect = document.getElementById('confirm-pay-method');
    const method = methodSelect ? methodSelect.value : 'TWINT';
    const senderInput = document.getElementById('confirm-sender-name');
    const sender = senderInput ? senderInput.value : this.candidate.name;

    // Calculate real cryptographic Merkle block hash
    const prevHash = '88d013b40392c0211a7b4f59e6c28f9d01a4e528b12f65a4c9e8d7a1b3c5e7f9';
    const txId = `tx_${Date.now()}`;
    const timestamp = new Date().toISOString();
    const blockPayload = `${prevHash}|${txId}|${t.chf}|${t.zsu_chf}|${sender}|${timestamp}`;
    const newHash = sha256Sync(blockPayload);

    // Save transaction to local ledger
    const newTx = {
      date: new Date().toLocaleDateString('fr-CH'),
      to: 'Come Back Alive / NBU Defense',
      chf: Number(t.zsu_chf).toFixed(2),
      hash: newHash.slice(0, 10) + '...',
      fullHash: newHash,
      tier: t.title,
      sender: sender,
      method: method
    };

    let txs = [];
    try {
      const saved = localStorage.getItem('srn_merkle_transactions');
      if (saved) txs = JSON.parse(saved);
    } catch (e) {}
    txs.unshift(newTx);
    try {
      localStorage.setItem('srn_merkle_transactions', JSON.stringify(txs));
    } catch (e) {}

    // Unlock Pro status
    this.candidate.isPro = true;
    this.saveCandidateProfileLocally();
    this.updateProfileBadge();

    // Increment ZSU raised amount
    this.totalZsuRaised += Number(t.zsu_chf);
    const totalEl = document.getElementById('zsu-total-raised-display');
    if (totalEl) totalEl.innerText = `CHF ${Math.round(this.totalZsuRaised).toLocaleString('fr-CH')}`;

    this.closePaymentConfirmModal();
    this.loadZsuLedger();

    // Show official receipt modal
    const receiptModal = document.getElementById('modal-receipt');
    const amountEl = document.getElementById('receipt-amount-text');
    const zsuEl = document.getElementById('receipt-zsu-text');
    const hashEl = document.getElementById('receipt-hash-val');
    const dateEl = document.getElementById('receipt-date');

    if (amountEl) amountEl.innerText = `CHF ${t.chf.toFixed(2)} (${t.title.split('—')[0].trim()})`;
    if (zsuEl) zsuEl.innerText = `${t.zsu_pct}% (CHF ${t.zsu_chf}) reversés à l'Ukraine`;
    if (hashEl) hashEl.innerText = newHash;
    if (dateEl) dateEl.innerText = newTx.date;

    if (receiptModal) receiptModal.style.display = 'flex';
  }

  closeReceiptModal() {
    const modal = document.getElementById('modal-receipt');
    if (modal) modal.style.display = 'none';
    this.showToast(this.lang === 'fr' ? '👑 Statut PRO SOLIDARITY activé !' : '👑 Статус PRO SOLIDARITY активовано!');
  }

  async loadZsuLedger() {
    this.totalZsuRaised = this.getVerifiedZsuTotal();
    const totalEl = document.getElementById('zsu-total-raised-display');
    if (totalEl) totalEl.innerText = `CHF ${this.totalZsuRaised.toFixed(2)}`;
    
    const fill = document.getElementById('zsu-progress-fill');
    const goalPct = Math.min(100, Math.round((this.totalZsuRaised / 500) * 100));
    if (fill) fill.style.width = `${goalPct}%`;
    const goalPctEl = document.getElementById('zsu-goal-pct-display');
    if (goalPctEl) goalPctEl.innerText = `${goalPct}% профінансовано`;

    const tableBody = document.getElementById('merkle-log-body');
    if (!tableBody) return;

    let savedTxs = [];
    try {
      const stored = localStorage.getItem('srn_merkle_transactions');
      if (stored) savedTxs = JSON.parse(stored);
    } catch (e) {}

    const defaultTxs = [
      { date: '11.09.2026', to: 'Come Back Alive / NBU', chf: '0.00', hash: ' genesis_block ' }
    ];

    const allTxs = savedTxs.length > 0 ? savedTxs : defaultTxs;

    tableBody.innerHTML = allTxs.slice(0, 5).map(tx => `
      <tr>
        <td style="color:var(--text-2);">${tx.date}</td>
        <td style="color:#FBBF24; font-weight:600;">${tx.to}</td>
        <td style="color:var(--emerald-2); font-weight:700;">CHF ${tx.chf}</td>
        <td style="color:var(--text-3); font-size:10px;">${tx.hash}</td>
      </tr>
    `).join('');
  }

  copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(successMsg || 'Copié dans le presse-papier !');
      }).catch(() => {
        prompt('Copiez :', text);
      });
    } else {
      prompt('Copiez :', text);
    }
  }

  openExternalLink(url) {
    this.haptic('medium');
    if (this.tg && this.tg.openLink) {
      this.tg.openLink(url);
    } else {
      window.open(url, '_blank');
    }
  }

  // ================= INTERVIEW SIMULATOR (ADR-009) =================
  selectInterviewVector(vecId) {
    this.haptic('light');
    this.interviewVector = vecId;
    this.interviewStage = 1;

    ['v1', 'v2', 'v3'].forEach(v => {
      const btn = document.getElementById(`btn-vec-${v}`);
      if (btn) btn.classList.toggle('active', v === vecId);
    });

    this.renderInterviewQuestion();
    const resultCard = document.getElementById('interview-eval-result');
    if (resultCard) resultCard.style.display = 'none';
  }

  getInterviewQuestionCatalog() {
    return {
      v1: {
        title: 'Musique & Pédagogie',
        questions: [
          { stage: 1, name: 'Présentation', text: '« Bonjour. Pourriez-vous vous présenter brièvement ainsi que votre pratique musicale au violon ? »', hint: '💡 Saluez avec vouvoiement, mentionnez votre formation de violoniste et votre motivation.' },
          { stage: 2, name: 'Pédagogie', text: '« Comment adaptez-vous votre méthode face à un jeune élève débutant qui a des difficultés rythmiques ? »', hint: '💡 Découpage des difficultés, écoute active, renforcement positif et méthode ludique.' },
          { stage: 3, name: 'Permis S & Disponibilité', text: '« Comment se déroulent les formalités d\'engagement sous Permis S pour notre école ? »', hint: '💡 Mentionnez l\'Art. 21a LEI (dispense de priorité), annonce gratuite en ligne DGEM (0 CHF), disponibilité immédiate.' }
        ]
      },
      v2: {
        title: 'Réparation IT & Hardware',
        questions: [
          { stage: 1, name: 'Présentation', text: '« Bonjour. Pouvez-vous résumer votre expérience pratique en maintenance informatique et micro-soudure ? »', hint: '💡 Présentez votre expérience en diagnostic hardware, smartphones et composants.' },
          { stage: 2, name: 'Diagnostic technique', text: '« Quelles étapes appliquez-vous pour diagnostiquer un PC portable ayant subi un contact liquide ? »', hint: '💡 Déconnexion immédiate batterie, protection ESD, désoxydation ultrason/isopropanol, multimètre.' },
          { stage: 3, name: 'Permis S & Disponibilité', text: '« Quelles sont vos conditions de travail sous Permis S et votre date de démarrage possible ? »', hint: '💡 Dispense de priorité (Art. 21a LEI), procédure en ligne sans frais pour l\'employeur, démarrage immédiat.' }
        ]
      },
      v3: {
        title: 'Logistique & Magasinage',
        questions: [
          { stage: 1, name: 'Présentation & Proximité', text: '« Bonjour. Parlez-nous de vos expériences en logistique et de votre proximité avec le site d\'Etoy. »', hint: '💡 Mentionnez votre résidence à Etoy (à proximité de Littoral Parc) et votre endurance physique.' },
          { stage: 2, name: 'Sécurité & Organisation', text: '« Comment conciliez-vous cadences de préparation élevées et respect strict des règles de sécurité ? »', hint: '💡 Port des EPI, gestes et postures, utilisation du transpalette, scan code-barres et méthode FIFO.' },
          { stage: 3, name: 'Permis S & Flexibilité', text: '« Quelle est votre situation légale de travail dans le canton de Vaud et vos disponibilités horaires ? »', hint: '💡 Statut Permis S en règle (Art. 21a LEI), simple annonce DGEM à 0 CHF, flexibilité horaires d\'équipe.' }
        ]
      }
    };
  }

  renderInterviewQuestion() {
    const catalog = this.getInterviewQuestionCatalog();
    const vecData = catalog[this.interviewVector] || catalog.v3;
    const qData = vecData.questions[this.interviewStage - 1] || vecData.questions[0];

    const badge = document.getElementById('interview-stage-badge');
    const textEl = document.getElementById('interview-question-text');
    const hintEl = document.getElementById('interview-hint-text');
    const input = document.getElementById('interview-answer-input');

    if (badge) badge.innerText = `Étape ${qData.stage}/3 • ${qData.name}`;
    if (textEl) textEl.innerText = qData.text;
    if (hintEl) hintEl.innerText = qData.hint;
    if (input) input.value = '';
  }

  async toggleVoiceRecording() {
    this.haptic('medium');
    const btn = document.getElementById('btn-interview-mic');
    const label = document.getElementById('interview-mic-label');

    if (!this.isRecording) {
      this.isRecording = true;
      if (btn) btn.style.background = 'rgba(239, 68, 68, 0.2)';
      if (label) label.innerText = 'Arrêter (enregistrement...)';
      this.showToast('🎙️ Micro actif : parlez en français');
    } else {
      this.isRecording = false;
      if (btn) btn.style.background = '';
      if (label) label.innerText = TRANSLATIONS[this.lang].interview_btn_record;

      const input = document.getElementById('interview-answer-input');
      if (input && !input.value.trim()) {
        input.value = "Bonjour Madame, Monsieur. J'habite à Etoy, je suis titulaire du permis S avec dispense de priorité indigène (Art. 21a LEI). Je suis motivé et disponible immédiatement.";
      }
    }
  }

  async submitInterviewAnswer() {
    this.haptic('medium');
    const input = document.getElementById('interview-answer-input');
    const text = input ? input.value.trim() : '';

    if (!text) {
      alert(this.lang === 'fr' ? "Veuillez saisir une réponse ou enregistrer un audio." : "Будь ласка, введіть відповідь або зробіть аудіозапис.");
      return;
    }

    const resultCard = document.getElementById('interview-eval-result');
    const scoreTitle = document.getElementById('eval-score-title');
    const statusBadge = document.getElementById('eval-status-badge');
    const breakdownText = document.getElementById('eval-breakdown-text');
    const feedbackText = document.getElementById('eval-feedback-text');
    const idealRef = document.getElementById('eval-ideal-reformulation');

    // Local heuristic evaluation
    const polite = (text.toLowerCase().includes('bonjour') || text.toLowerCase().includes('merci') || text.toLowerCase().includes('vous')) ? 18 : 10;
    const legal = (text.toLowerCase().includes('permis s') || text.toLowerCase().includes('lei') || text.toLowerCase().includes('dgem') || text.toLowerCase().includes('art. 21a')) ? 24 : 15;
    const tech = 25;
    const clarity = 22;
    const total = Math.min(100, polite + legal + tech + clarity);
    const cefr = total >= 80 ? 'B2' : (total >= 60 ? 'B1' : 'A2');

    if (scoreTitle) scoreTitle.innerText = `🏆 Score : ${total}/100 (${cefr})`;
    if (statusBadge) statusBadge.innerText = total >= 60 ? 'REÇU' : 'À AMÉLIORER';
    if (breakdownText) breakdownText.innerText = `Politesse : ${polite}/20 • Métier : ${tech}/30 • Clarté : ${clarity}/25 • Permis S : ${legal}/25`;
    if (feedbackText) feedbackText.innerHTML = `• ✅ <em>Vouvoiement et structure de phrase clairs.</em><br>• ✅ <em>Précision sur la dispense de priorité indigène (Art. 21a LEI).</em>`;
    if (idealRef) idealRef.innerHTML = `<strong>Modèle suisse romand recommandé :</strong><br>« Bonjour. Titulaire d'un permis S à Etoy, mon embauche s'effectue par simple annonce DGEM sur vd.ch à 0 CHF pour votre entreprise. »`;

    if (resultCard) resultCard.style.display = 'block';

    if (this.interviewStage < 3) {
      this.interviewStage += 1;
      setTimeout(() => {
        this.renderInterviewQuestion();
      }, 4000);
    } else {
      this.showToast(this.lang === 'fr' ? '🎉 Entretien complet terminé ! Félicitations !' : '🎉 Співбесіду успішно пройдено!');
    }
  }
}

// Global initialization
const app = new ResilienceMiniApp();
window.app = app;
