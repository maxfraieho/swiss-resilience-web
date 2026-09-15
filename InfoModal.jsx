// ACCORD Suisse · Dedicated Information & Trust Hub Modal
// Tabs: 'about' (Про проєкт), 'guide' (Як користуватись), 'why' (Чому ми кращі), 'privacy' (Конфіденційність nDSG/GDPR)
// Fully reactive with multilingual support (UK, FR, DE, EN) and direct hash routing.

function InfoModal({ isOpen, onClose, initialTab = 'about', lang = 'uk', t }) {
  const [activeTab, setActiveTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabsMeta = {
    uk: {
      about: "Про проєкт",
      guide: "Як користуватись",
      why: "Чому ми кращі",
      privacy: "Конфіденційність"
    },
    fr: {
      about: "À propos",
      guide: "Mode d'emploi",
      why: "Pourquoi ACCORD ?",
      privacy: "Confidentialité"
    },
    de: {
      about: "Über uns",
      guide: "Anleitung",
      why: "Warum wir ?",
      privacy: "Datenschutz"
    },
    en: {
      about: "About project",
      guide: "User Guide",
      why: "Why ACCORD ?",
      privacy: "Privacy Policy"
    }
  };

  const tm = tabsMeta[lang] || tabsMeta.fr;

  return (
    <div className="info-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(7, 11, 18, 0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px', animation: 'fadeIn .2s ease-out'
    }}>
      <div className="info-modal-card" onClick={e => e.stopPropagation()} style={{
        background: '#0D1424', border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: 20, width: '100%', maxWidth: 880, maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
      }}>
        {/* Header with brand & tabs */}
        <div style={{
          padding: '18px 24px 14px', borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(15, 23, 42, 0.95)', display: 'flex', flexDirection: 'column', gap: 14
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BrandMark size={28}/>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', letterSpacing: '-0.01em' }}>
                  ACCORD Suisse
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>
                  {lang === 'uk' ? 'Довідковий та правовий хаб' : 'Hub d\'information & conformité'}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              style={{
                background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 8,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#94A3B8', cursor: 'pointer', fontSize: 18, transition: 'all .15s'
              }}
            >
              ✕
            </button>
          </div>

          {/* Navigation tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { id: 'about', label: `🏛️ ${tm.about}` },
              { id: 'guide', label: `📖 ${tm.guide}` },
              { id: 'why',   label: `⭐ ${tm.why}` },
              { id: 'privacy', label: `🛡️ ${tm.privacy}` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  try { window.location.hash = tab.id; } catch(e) {}
                }}
                style={{
                  padding: '7px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
                  whiteSpace: 'nowrap', border: 'none', cursor: 'pointer', transition: 'all .15s',
                  background: activeTab === tab.id ? '#D52B1E' : 'rgba(255,255,255,0.06)',
                  color: activeTab === tab.id ? '#fff' : '#CBD5E1',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(213,43,30,0.4)' : 'none'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal body (scrollable) */}
        <div style={{ padding: '24px', overflowY: 'auto', color: '#E2E8F0', lineHeight: 1.6, fontSize: 13.5 }}>
          {activeTab === 'about' && <AboutTab lang={lang}/>}
          {activeTab === 'guide' && <GuideTab lang={lang}/>}
          {activeTab === 'why'   && <WhyTab lang={lang}/>}
          {activeTab === 'privacy' && <PrivacyTab lang={lang}/>}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid rgba(148, 163, 184, 0.15)',
          background: 'rgba(15, 23, 42, 0.95)', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 10
        }}>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>
            violin-integration.works · @SwissResilienceHubBot · <a href="/privacy" style={{ color: '#38BDF8', textDecoration: 'none' }}>/privacy ↗</a>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href="https://t.me/SwissResilienceHubBot"
              target="_blank" rel="noopener noreferrer"
              className="btn primary"
              style={{ padding: '7px 14px', fontSize: 12.5, textDecoration: 'none' }}
            >
              Telegram Bot
            </a>
            <button
              onClick={onClose}
              className="btn ghost"
              style={{ padding: '7px 14px', fontSize: 12.5 }}
            >
              {lang === 'uk' ? 'Закрити' : 'Fermer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 1. TAB: ПРО ПРОЄКТ (ABOUT)
// --------------------------------------------------------------------------
function AboutTab({ lang }) {
  if (lang === 'uk') {
    return (
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
          Про проєкт АКОРД (L'Accord Suisse)
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
          Суверенна цифрова платформа прямої дії для гідного житла, легальної праці та взаєморозуміння у Швейцарії.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', marginBottom: 6 }}>🏛️ Місія платформи</div>
            <div>
              АКОРД створено для усунення бюрократичних перепон та виснажливого очікування для українців із тимчасовим захистом (Permis S). Наша мета — надати кожній родині інструмент для самостійного, гідного пошуку житла та роботи без посередників і комісій.
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981', marginBottom: 6 }}>🎻 Чому назва «АКОРД»?</div>
            <div>
              <b>L'Accord de bail:</b> Офіційна згода режі на оренду квартири.<br/>
              <b>L'Accord de travail:</b> Підписаний трудовий договір (LEI / CCT).<br/>
              <b>L'Accord mutuel:</b> Суспільна злагода та взаємоповага.<br/>
              <b>Гармонія струн:</b> Зв'язок із культурним проєктом солідарності скрипаля Арсена Коваленка <em>Sonate Solidaire</em> (<a href="https://sonate-solidaire.me" target="_blank" rel="noopener" style={{ color: '#38BDF8' }}>sonate-solidaire.me</a>).
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(213,43,30,0.06)', border: '1px solid rgba(213,43,30,0.2)', borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#F87171', marginBottom: 6 }}>⚖️ Некомерційний статус та стандарти</div>
          <div>
            Асоціація Swiss Resilience перебуває в процесі створення (ст. 60–79 Цивільного кодексу Швейцарії CC). Діяльність є на 100% волонтерською, сервіси надаються абсолютно безкоштовно відповідно до Федерального закону про службу зайнятості (LSE/AVG), який прямо забороняє стягувати плату з шукачів роботи.
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
          <b>Ініціатор та відповідальна особа:</b> Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland (Vaud) · E-mail: arsen.k111999@gmail.com · Телефон: +41 78 326 11 12
        </div>
      </div>
    );
  }

  // French default
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
        À propos de l'ACCORD Suisse
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        Plateforme souveraine d'action directe pour le logement digne, l'emploi légal et l'intégration en Suisse.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#38BDF8', marginBottom: 6 }}>🏛️ Notre Mission</div>
          <div>
            L'ACCORD a été conçu pour éliminer les intermédiaires abusifs et les frais clandestins. Nous offrons aux bénéficiaires du Permis S et aux employeurs suisses un outil direct, souverain et sans friction technique.
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981', marginBottom: 6 }}>🎻 Pourquoi « ACCORD » ?</div>
          <div>
            <b>L'Accord de bail :</b> Validation de candidature par la gérance.<br/>
            <b>L'Accord de travail :</b> Contrat d'embauche conforme CCT/CCNT.<br/>
            <b>L'Accord mutuel :</b> Concorde et confiance réciproque.<br/>
            <b>Harmonie musicale :</b> Synergie avec l'initiative culturelle <em>Sonate Solidaire</em> du violoniste Arsen Kovalenko (<a href="https://sonate-solidaire.me" target="_blank" rel="noopener" style={{ color: '#38BDF8' }}>sonate-solidaire.me</a>).
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(213,43,30,0.06)', border: '1px solid rgba(213,43,30,0.2)', borderRadius: 12, padding: 18, marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#F87171', marginBottom: 6 }}>⚖️ Cadre légal et gratuité</div>
        <div>
          Association Swiss Resilience en création (Art. 60–79 CC). 100% bénévole et conforme à la loi fédérale sur le service de l'emploi (LSE/AVG), garantissant la stricte gratuité pour tous les candidats.
        </div>
      </div>

      <div style={{ fontSize: 12, color: '#94A3B8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
        <b>Contact référent :</b> Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland (Vaud) · E-mail : arsen.k111999@gmail.com · Téléphone : +41 78 326 11 12
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 2. TAB: ЯК КОРИСТУВАТИСЬ (GUIDE) — MULTI-ROLE DOCUMENTATION (CLIENTS & ADMIN)
// --------------------------------------------------------------------------
function GuideTab({ lang }) {
  const [role, setRole] = React.useState('seekers');
  const isUk = lang === 'uk';
  const isFr = lang === 'fr';
  const isDe = lang === 'de';

  const roleMeta = {
    uk: {
      seekers: { label: "🎯 Шукачам (Permis S)", title: "Інструкція для шукачів житла та роботи", desc: "Покроковий алгоритм дій для швидкого отримання житла від режі та легальної роботи без посередників і комісій." },
      hosts:   { label: "🤝 Господарям (ст. 262)", title: "Посібник для швейцарських господарів", desc: "Легальна суборенда за ст. 262 CO, прозорий розрахунок без зловживань та менторство Benevol." },
      copilot: { label: "🤖 ШІ-Копілот і Голос", title: "Як користуватись ШІ-Копілотом ACCORD", desc: "Автономний діалог 24/7, швидкі кнопки переходу та голосові повідомлення Whisper STT у Telegram." },
      admin:   { label: "⚙️ Адміністратору", title: "Керівництво адміністратора та оператора", desc: "Швидкий довідник керування демоном бота, моніторингу шлюзів .184 / .251 та збірки бандлу." }
    },
    fr: {
      seekers: { label: "🎯 Candidats (Permis S)", title: "Mode d'emploi pour candidats Permis S", desc: "Guide méthodique pour obtenir un logement vérifié de régie et un emploi légal sans frais d'intermédiaires." },
      hosts:   { label: "🤝 Hôtes (Art. 262 CO)", title: "Guide pour les hôtes suisses solidaires", desc: "Sous-location légale Art. 262 CO, plafonnement mobilier à 20% et mentorat citoyen Benevol." },
      copilot: { label: "🤖 Co-pilote & Vocal", title: "Utilisation du Co-pilote IA & Vocal", desc: "Assistance interactive 24/7, boutons d'action et messages vocaux Whisper STT sur Telegram." },
      admin:   { label: "⚙️ Administration", title: "Guide d'exploitation & Administration", desc: "Gestion du démon de bot, surveillance des passerelles .184/.251 et compilation du bundle." }
    },
    de: {
      seekers: { label: "🎯 Status S Suchende", title: "Anleitung für Status S Suchende", desc: "Schritt-für-Schritt-Leitfaden für Wohnungen von Verwaltungen und legale Arbeit ohne Vermittlungsgebühren." },
      hosts:   { label: "🤝 Gastgeber (Art. 262)", title: "Leitfaden für Schweizer Gastgeber", desc: "Rechtssichere Untermiete nach Art. 262 OR, Möblierungszuschlag max. 20% und Benevol-Mentorat." },
      copilot: { label: "🤖 KI-Copilot & Sprache", title: "Nutzung des KI-Copiloten & Whisper", desc: "24/7 Interaktiver Dialog, Aktionsknöpfe und Sprachnachrichten via Whisper STT im Telegram-Bot." },
      admin:   { label: "⚙️ Administration", title: "Betriebshandbuch & Administration", desc: "Bot-Daemon-Verwaltung, Statusprüfung der Gateways .184/.251 und Bundle-Kompilierung." }
    },
    en: {
      seekers: { label: "🎯 Seekers (Permis S)", title: "User Guide for Permis S Beneficiaries", desc: "Step-by-step roadmap to verified housing and legal employment without exploitative fees." },
      hosts:   { label: "🤝 Swiss Hosts (Art. 262)", title: "Guide for Swiss Solidarity Hosts", desc: "Legal Art. 262 CO subleases, 20% furniture cap compliance, and Benevol mentorship." },
      copilot: { label: "🤖 AI Co-Pilot & Voice", title: "How to use AI Co-Pilot & Whisper Voice", desc: "24/7 interactive widget, 1-click action triggers, and Whisper STT voice notes in Telegram." },
      admin:   { label: "⚙️ Administrator", title: "Operator & Platform Administrator Guide", desc: "Bot daemon lifecycle management, .184/.251 gateway health, and bundle builds." }
    }
  };

  const rm = roleMeta[lang] || roleMeta.fr;
  const currentRole = rm[role] || rm.seekers;

  const stepsData = {
    seekers: {
      uk: [
        { n: "01", t: "Пошук житла від режі та Reprise de bail", b: "Art. 264 CO", d: "Оберіть вкладку «Житло». Переглядайте верифіковані квартири з реальними фото, закріплені за офіційними агенціями (Bernard Nicod, Cogestim, Wincasa). Шукайте позначки «Reprise de bail» (передача чинного договору без підвищення ціни) та розрахунок часу CFF/SBB до вокзалів." },
        { n: "02", t: "Калькулятор кантональних лімітів EVAM", b: "EVAM / 33%", d: "У вкладці «Калькулятор» оберіть кантон Во або Женеву та склад сім'ї. Перевірте, чи вписується чиста оренда та комунальні у соціальні норми (наприклад, CHF 1'350–2'050 для 3 осіб у Во) та правило 33% заробітної плати." },
        { n: "03", t: "Генератор досьє для режі в 1 клік", b: "Art. 253 CO / USPI", d: "Заповніть коротку форму у вкладці «Досьє». Платформа створить офіційний лист-заявку французькою або німецькою мовою за стандартом USPI з переліком обов'язкових додатків: Permis S, витяг з реєстру боргів (Office des poursuites) та гарантія EVAM." },
        { n: "04", t: "Вакансії та захищене вікно ст. 21a LEI", b: "Art. 17 & 21a LEI", d: "У вкладці «Робота» переглядайте 63 реальні вакансії. Використовуйте перевагу 5-денного захищеного вікна RAV/ORP (ст. 21a LEI) та завантажте зразок резюме, адаптованого під швейцарські кадрові стандарти." },
        { n: "05", t: "Безоплатний супровід менторів Benevol", b: "Art. 394 CO", d: "У вкладці «Ментори» подайте запит на волонтерську підтримку від швейцарських громадян (розмовна практика французької, спільні візити на огляди житла, консультації з оформлення)." }
      ],
      fr: [
        { n: "01", t: "Logement vérifié de régie & Reprise de bail", b: "Art. 264 CO", d: "Consultez la section « Logement ». Chaque bien est attribué factuellement à sa gérance (Bernard Nicod, Cogestim, etc.) avec calcul précis du temps CFF/SBB et repérage prioritaire des reprises de bail sans hausse de loyer." },
        { n: "02", t: "Calculateur des plafonds cantonaux EVAM", b: "EVAM / 33%", d: "Vérifiez dans le « Calculateur » si le loyer respecte les barèmes officiels de votre canton (ex. CHF 1'350–2'050 pour 3 personnes à Vaud) et la règle impérative des 33% de vos revenus nets." },
        { n: "03", t: "Générateur de dossier de régie 1-clic", b: "Art. 253 CO / USPI", d: "Renseignez vos coordonnées dans le « Dossier ». L'application compose automatiquement la lettre de candidature formelle aux standards USPI avec la liste des pièces justificatives (Permis S, poursuites vierges, attestation EVAM)." },
        { n: "04", t: "Offres d'emploi & Priorité indigène Art. 21a LEI", b: "Art. 17 & 21a LEI", d: "Explorez 63 offres réelles, exploitez la fenêtre de priorité ORP/RAV de 5 jours réservée aux résidents, et suivez le modèle suisse pour optimiser votre CV." },
        { n: "05", t: "Accompagnement bénévole Benevol", b: "Art. 394 CO", d: "Dans la section « Mentors », sollicitez un accompagnement citoyen gratuit (Art. 394 CO) pour la pratique du français et les visites communes de logements." }
      ]
    },
    hosts: {
      uk: [
        { n: "01", t: "Легальна суборенда кімнати за законом", b: "Art. 262 CO", d: "Швейцарські господарі та чинні орендарі мають законне право здавати частину житла бенефіціарам статусу S. Формула справедливої частки: (Кімнати кімнати / Загальні кімнати) * Оренда + Комунальні." },
        { n: "02", t: "Ліміт націнки за умеблювання (max 20%)", b: "Юридичний щит", d: "Згідно зі швейцарською судовою практикою, максимальна надбавка за вміст меблів не може перевищувати 20% від базової ставки. Це захищає вас від звинувачень у здирництві (loyer usuraire)." },
        { n: "03", t: "Офіційне повідомлення режі (Notification)", b: "Art. 262 al. 1 CO", d: "Закон вимагає повідомити орендодавця про умови суборенди. Майстер суборенди сформує офіційний лист французькою мовою для вашої режі. Орендодавець не має права відмовити без поважних причин." },
        { n: "04", t: "Участь у волонтерській мережі Benevol", b: "Art. 394 CO", d: "Приєднуйтесь як цивільний наставник. Формат безоплатного доручення (contrat de mandat gratuit) повністю виключає податкові, трудові або юридичні ризики для швейцарських помічників." }
      ],
      fr: [
        { n: "01", t: "Sous-location légale et transparente", b: "Art. 262 CO", d: "Les locataires principaux ont le droit légal de sous-louer une partie de leur logement. Formule équitable : (Pièces occupées / Total pièces) * Loyer net + Charges réelles." },
        { n: "02", t: "Plafond de majoration pour meubles (max 20%)", b: "Bouclier juridique", d: "Conformément à la jurisprudence du Tribunal fédéral, la majoration pour mobilier ne doit pas dépasser 20%. Cela vous met à l'abri de toute contestation pour loyer abusif." },
        { n: "03", t: "Notification officielle à la gérance", b: "Art. 262 al. 1 CO", d: "Le formulaire génère automatiquement la lettre de communication formelle destinée à votre régie. Le bailleur ne peut refuser son consentement sauf motifs légitimes stricts." },
        { n: "04", t: "Engagement bénévole citoyen Benevol", b: "Art. 394 CO", d: "Devenez mentor bénévole. Le contrat de mandat gratuit (Art. 394 CO) garantit l'absence totale de contraintes contractuelles ou fiscales d'un rapport de travail." }
      ]
    },
    copilot: {
      uk: [
        { n: "01", t: "Діалоговий віджет 24/7 на сайті та в Mini App", b: "ШІ-Агент", d: "Натискайте червону круглу кнопку «🤖 ШІ-Копілот» у нижньому кутку екрана. Ставте запитання будь-якою мовою про норми EVAM, статті законів (CO, LEI), процедури режі або розклад SBB." },
        { n: "02", t: "Інтерактивні кнопки дій у відповідях", b: "1-Click Дії", d: "Кожна відповідь копілота містить кнопки швидкого переходу (наприклад, «🧮 Ліміти EVAM» або «📄 Досьє для режі»), які автоматично відкривають потрібний інструмент з уже підставленими параметрами." },
        { n: "03", t: "Голосові повідомлення через Whisper STT у Telegram", b: "Whisper AI", d: "У боті @SwissResilienceHubBot надсилайте аудіо- або голосові повідомлення. Вбудована модель Whisper STT локально розпізнає голос та надає точну юридичну консультацію за 2 секунди." }
      ],
      fr: [
        { n: "01", t: "Widget interactif 24/7 Web & Mini App", b: "Agent IA", d: "Cliquez sur le bouton flottant « 🤖 Co-pilote IA » en bas à droite. Posez librement vos questions sur les barèmes EVAM, les articles CO/LEI, les régies ou les liaisons CFF." },
        { n: "02", t: "Boutons d'action intégrés 1-clic", b: "Navigation fluide", d: "Chaque réponse propose des boutons directionnels (ex. « 🧮 Plafonds EVAM », « 📄 Générer Dossier ») pré-remplissant instantanément les formulaires du portail." },
        { n: "03", t: "Messages vocaux via Whisper STT sur Telegram", b: "Whisper Vocal", d: "Dans le bot @SwissResilienceHubBot, envoyez des notes vocales. Le moteur Whisper STT convertit la voix en texte et formule une réponse juridique précise sans délai." }
      ]
    },
    admin: {
      uk: [
        { n: "01", t: "Архітектура системи та внутрішні шлюзи", b: "Edge / .184 / .251", d: "Клієнтський рівень: статичний бандл React (web/app-bundle.js) у Cloudflare CDN. Серверний рівень: Telegram-бот на Python, ШІ-шлюз на http://192.168.1.184:8082 та граф знань Utopia DB на http://192.168.1.251:9922." },
        { n: "02", t: "Керування демоном бота (start_bot_daemon.sh)", b: "CLI Демон", d: "Команди керування: bash scripts/start_bot_daemon.sh {start|stop|restart|status|supervise}. Режим supervise забезпечує безперервний перезапуск бота при збоях." },
        { n: "03", t: "Збірка та синхронізація фронтенду", b: "node web/build.cjs", d: "Після будь-яких правок у web/*.jsx виконайте «node web/build.cjs». Скрипт транскомпілює код через Babel та оновлює бандли в /web/, /hub/, /app/ та /mini-app/." },
        { n: "04", t: "Повний технічний та операційний посібник", b: "Документація", d: "Детальні інструкції для Арсена Коваленка та координаторів зібрано у файлі docs/USER_AND_ADMIN_GUIDE.md (архітектура, безпека даних, логи та відновлення)." }
      ],
      fr: [
        { n: "01", t: "Architecture système et passerelles internes", b: "Edge / .184 / .251", d: "Couche client : bundle React statique sans dépendance d'exécution. Couche serveur : bot Telegram Python, passerelle LLM (http://192.168.1.184:8082) et Utopia DB (http://192.168.1.251:9922)." },
        { n: "02", t: "Gestion du démon bot (start_bot_daemon.sh)", b: "CLI Démon", d: "Commandes du cycle de vie : bash scripts/start_bot_daemon.sh {start|stop|restart|status|supervise}. Le mode supervise relance automatiquement le processus en cas d'interruption." },
        { n: "03", t: "Compilation du bundle frontend", b: "node web/build.cjs", d: "Après modification des fichiers web/*.jsx, exécutez « node web/build.cjs ». Il compile le code via Babel et synchronise les répertoires hub, app et mini-app." },
        { n: "04", t: "Manuel d'exploitation complet", b: "Documentation", d: "Retrouvez l'intégralité des spécifications d'administration dans le fichier docs/USER_AND_ADMIN_GUIDE.md du référentiel." }
      ]
    }
  };

  const stepsList = (stepsData[role] && (stepsData[role][lang] || stepsData[role].uk)) || stepsData.seekers.uk;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
            {currentRole.title}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0 }}>
            {currentRole.desc}
          </p>
        </div>
      </div>

      {/* Role sub-navigation pills */}
      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 18,
        borderBottom: '1px solid rgba(148, 163, 184, 0.15)'
      }}>
        {['seekers', 'hosts', 'copilot', 'admin'].map(rKey => {
          const item = rm[rKey];
          const active = role === rKey;
          return (
            <button
              key={rKey}
              onClick={() => setRole(rKey)}
              style={{
                padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                border: active ? '1px solid #D52B1E' : '1px solid rgba(148, 163, 184, 0.2)',
                background: active ? 'rgba(213, 43, 30, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                color: active ? '#FCA5A5' : '#CBD5E1',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Step Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 20 }}>
        {stepsList.map(s => (
          <div key={s.n} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--f-mono)', fontSize: 12, fontWeight: 800, color: '#D52B1E' }}>
                {isUk ? `КРОК ${s.n}` : `ÉTAPE ${s.n}`}
              </span>
              {s.b && (
                <span style={{
                  fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                  background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.25)'
                }}>
                  {s.b}
                </span>
              )}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.t}</div>
            <div style={{ fontSize: 12.5, color: '#94A3B8', lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>

      {/* Extra Action Callout */}
      {role === 'admin' ? (
        <div style={{
          background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 12, padding: 14, fontSize: 12.5, color: '#BAE6FD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10
        }}>
          <div>
            <b>📘 Документація репозиторію:</b> Повний файл інструкцій розміщено в <code>docs/USER_AND_ADMIN_GUIDE.md</code>.
          </div>
          <a
            href="https://t.me/SwissResilienceHubBot?start=admin_help"
            target="_blank" rel="noopener noreferrer"
            style={{ color: '#38BDF8', fontWeight: 700, textDecoration: 'none' }}
          >
            Telegram Стійкість ↗
          </a>
        </div>
      ) : (
        <div style={{
          background: 'rgba(213, 43, 30, 0.08)', border: '1px solid rgba(213, 43, 30, 0.25)',
          borderRadius: 12, padding: 14, fontSize: 12.5, color: '#FECACA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10
        }}>
          <div>
            <b>💡 Потрібна жива порада?</b> ШІ-Копілот ACCORD підкаже ліміти EVAM для вашої комуни та складе лист французькою за 20 секунд.
          </div>
          <button
            onClick={() => {
              if (window.location.hash !== '#chat') {
                const fab = document.querySelector('.v2-agent-fab');
                if (fab) fab.click();
              }
            }}
            style={{
              background: '#D52B1E', color: '#fff', border: 'none', borderRadius: 8,
              padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer'
            }}
          >
            🤖 Запустити Копілот
          </button>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. TAB: ЧОМУ МИ КРАЩІ (WHY ACCORD / COMPARISON)
// --------------------------------------------------------------------------
function WhyTab({ lang }) {
  const isUk = lang === 'uk';

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 8 }}>
        {isUk ? 'Чому АКОРД — найефективніший вибір?' : 'Pourquoi l\'ACCORD est la meilleure solution ?'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        {isUk
          ? 'Пряме порівняння: АКОРД проти комерційних посередників та звичайних дощок оголошень.'
          : 'Comparatif objectif entre l\'ACCORD Suisse, les intermédiaires payants et les portails généralistes.'}
      </p>

      {/* Comparison table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(148, 163, 184, 0.25)', color: '#94A3B8' }}>
              <th style={{ padding: '10px 12px' }}>{isUk ? 'Критерій' : 'Critère'}</th>
              <th style={{ padding: '10px 12px', color: '#F87171' }}>{isUk ? 'Платні «посередники»' : 'Intermédiaires payants'}</th>
              <th style={{ padding: '10px 12px', color: '#FBBF24' }}>{isUk ? 'Звичайні сайти (ImmoScout)' : 'Portails classiques'}</th>
              <th style={{ padding: '10px 12px', color: '#34D399', background: 'rgba(16,185,129,0.08)', borderRadius: '6px 6px 0 0' }}>
                {isUk ? '✓ АКОРД Швейцарія' : '✓ L\'ACCORD Suisse'}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Вартість' : 'Tarification'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>50 – 800 CHF</td>
              <td style={{ padding: '10px 12px' }}>Платні підписки Pro</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '100% Безкоштовно (ст. 2 LSE)' : '100% Gratuit (Loi LSE)'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Швидкість сигналу' : 'Délai d\'alerte'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Вручну / із запізненням</td>
              <td style={{ padding: '10px 12px' }}>Email через 2–12 годин</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '< 60 секунд у Telegram' : '< 60 s via Telegram'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Кантональні норми' : 'Barèmes cantonaux'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Ігнорують норми кантону</td>
              <td style={{ padding: '10px 12px' }}>Відсутня перевірка</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? 'Офіційні ліміти 26 кантонів' : '26 cantons intégrés (EVAM/SKOS)'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Пакет для режі' : 'Dossier de régie'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Платне складання</td>
              <td style={{ padding: '10px 12px' }}>Самостійно без зразка</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? '1-Click USPI (PDF/A)' : '1-Click USPI conforme Art. 253 CO'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
              <td style={{ padding: '10px 12px', fontWeight: 700 }}>{isUk ? 'Супровід волонтерів' : 'Mentorat citoyen'}</td>
              <td style={{ padding: '10px 12px', color: '#F87171' }}>Відсутній</td>
              <td style={{ padding: '10px 12px' }}>Відсутній</td>
              <td style={{ padding: '10px 12px', color: '#34D399', fontWeight: 700, background: 'rgba(16,185,129,0.05)' }}>
                {isUk ? 'Мережа Benevol (ст. 394 CO)' : 'Réseau Benevol Suisse officiel'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 4. TAB: ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ (PRIVACY nDSG / GDPR — 12 SECTIONS)
// --------------------------------------------------------------------------
function PrivacyTab({ lang }) {
  const isUk = lang === 'uk';

  const sectionsUk = [
    {
      title: "1. Відповідальна особа",
      content: `Відповідальним за обробку даних на цьому веб-сайті є:

Арсен Коваленко (Arsen Kovalenko)
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Швейцарія

E-mail: arsen.k111999@gmail.com
Телефон: +41 78 326 11 12`
    },
    {
      title: "2. Зібрані дані",
      content: `Ми збираємо такі дані:

• Локальні налаштування інтерфейсу: обрана мова, статус захисту, обраний кантон та параметри калькулятора (зберігаються локально у вашому браузері через localStorage).
• Telegram Bot / Mini App: ідентифікатор користувача Telegram (ID) виключно для доставки запитаних сповіщень про житло та роботу.
• Технічні дані: журнали сервера Cloudflare (анонімізована IP-адреса, дата й час, запитувана сторінка) для захисту від DDoS та кібератак.`
    },
    {
      title: "3. Мета обробки",
      content: `Ми обробляємо ваші дані виключно з такими цілями:

• Надання безоплатного доступу до бази перевіреного житла та вакансій.
• Створення офіційного досьє для режі (Dossier de candidature Art. 253 CO) на стороні клієнта.
• Забезпечення технічної безпеки, захисту від зловживань та високої швидкості завантаження.`
    },
    {
      title: "4. Правова основа (nDSG / GDPR)",
      content: `Обробка персональних даних здійснюється на основі:

• Ст. 6 п. 1 літ. a GDPR / Ст. 31 нового швейцарського Закону nDSG: Згода користувача.
• Ст. 6 п. 1 літ. b GDPR / Ст. 31 nDSG: Виконання запиту користувача (генерація документів, сповіщення).
• Ст. 6 п. 1 літ. f GDPR / Ст. 31 nDSG: Законні інтереси (безпека серверної інфраструктури, запобігання шахрайству).`
    },
    {
      title: "5. Відсутність продажу даних та безкоштовність",
      content: `ACCORD Suisse діє згідно з Федеральним законом про службу зайнятості (LSE/AVG), ст. 2 якого категорично забороняє стягувати плату з шукачів роботи. Ми ніколи не продаємо, не здаємо в оренду і не передаємо персональні дані комерційним рекламодавцям чи посередникам.`
    },
    {
      title: "6. Зберігання та файли Cookies / LocalStorage",
      content: `Наш сайт використовує технічно необхідне локальне сховище (localStorage):

• sr26-lang / sr-v2-lang: збереження обраної мови інтерфейсу.
• sr26-canton: збереження обраного кантону для розрахунку EVAM / SKOS.
• sr26-status / sr26-income: розрахунок 33% стелі оренди.
Ви можете в будь-який момент очистити ці дані в налаштуваннях вашого браузера або натиснувши "Очистити" у футері сайту.`
    },
    {
      title: "7. Термін зберігання",
      content: `• Локальні налаштування браузера: до моменту очищення кешу користувачем.
• Telegram-сповіщення: до зупинки бота або введення команди /stop.
• Журнали безпеки Cloudflare: 30 днів.`
    },
    {
      title: "8. Ваші права згідно з nDSG та GDPR",
      content: `Згідно зі швейцарським законодавством (nDSG) та європейським регламентом GDPR, ви маєте право:

• Право на доступ до ваших даних.
• Право на виправлення або повне видалення.
• Право на обмеження або припинення обробки.
• Право на відкликання згоди в будь-який момент.

Для реалізації будь-якого з цих прав звертайтесь безпосередньо до Арсена Коваленка: arsen.k111999@gmail.com.`
    },
    {
      title: "9. Міжнародна передача та безпека інфраструктури",
      content: `Сайт розміщено в мережі Cloudflare (Cloudflare Inc., США / ЄС) відповідно до рамкової угоди Swiss-US Data Privacy Framework та гарантій ст. 16 nDSG / ст. 46 GDPR. Увесь трафік шифрується за протоколом HTTPS (TLS 1.3).`
    },
    {
      title: "10. Наглядовий орган Швейцарії",
      content: `Компетентний наглядовий орган у сфері захисту даних у Швейцарії:

Федеральний уповноважений із захисту даних та інформації (EDÖB / PFPDT)
Feldeggweg 1, 3003 Bern, Швейцарія
Веб-сайт: www.edoeb.admin.ch`
    },
    {
      title: "11. Контакти та супровід",
      content: `З усіх питань конфіденційності та захисту даних:
Арсен Коваленко · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Швейцарія
E-mail: arsen.k111999@gmail.com · Телефон: +41 78 326 11 12`
    }
  ];

  const sectionsFr = [
    {
      title: "1. Responsable du traitement",
      content: `Le responsable du traitement des données sur ce site est :

Arsen Kovalenko
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Suisse

E-mail : arsen.k111999@gmail.com
Téléphone : +41 78 326 11 12`
    },
    {
      title: "2. Données collectées",
      content: `Nous collectons et traitons les données suivantes :

• Préférences locales d'interface : langue choisie, canton de référence, statut de protection et critères de calcul (stockées localement via localStorage).
• Bot Telegram / Mini App : identifiant Telegram pour la transmission exclusive des alertes de logement ou d'emploi sollicitées.
• Données techniques : journaux de requêtes serveur Cloudflare (adresse IP anonymisée, horodatage, page consultée) pour la protection contre les attaques DDoS.`
    },
    {
      title: "3. Finalités du traitement",
      content: `Le traitement des données poursuit les buts exclusifs suivants :

• Fourniture gratuite de l'accès aux offres vérifiées de logement et d'emploi.
• Génération locale du dossier de candidature pour la régie (Art. 253 CO).
• Sécurisation technique et stabilité de la plateforme.`
    },
    {
      title: "4. Base juridique (nLPD / RGPD)",
      content: `Le traitement repose sur :

• Art. 6 par. 1 let. a RGPD / Art. 31 nLPD : Consentement de l'utilisateur.
• Art. 6 par. 1 let. b RGPD / Art. 31 nLPD : Exécution de la demande de service.
• Art. 6 par. 1 let. f RGPD / Art. 31 nLPD : Intérêts légitimes (sécurité du réseau et de l'information).`
    },
    {
      title: "5. Gratuité absolue et interdiction de cession",
      content: `Conformément à la Loi fédérale sur le service de l'emploi (LSE/AVG), la plateforme est 100% bénévole et gratuite. Aucune donnée n'est vendue ni communiquée à des tiers commerciaux ou intermédiaires payants.`
    },
    {
      title: "6. Stockage local et cookies",
      content: `Notre site utilise le stockage local (localStorage) strictement technique :
• sr26-lang / sr-v2-lang : langue de navigation.
• sr26-canton : canton pour les barèmes EVAM / SKOS.
• sr26-status / sr26-income : calcul du plafond d'effort financier de 33%.
Vous pouvez réinitialiser ces données à tout moment dans les paramètres de votre navigateur.`
    },
    {
      title: "7. Durée de conservation",
      content: `• Préférences du navigateur : conservées jusqu'à effacement par l'utilisateur.
• Alertes Telegram : conservées jusqu'à la commande /stop dans le bot.
• Journaux serveur de sécurité Cloudflare : 30 jours maximum.`
    },
    {
      title: "8. Vos droits (nLPD & RGPD)",
      content: `Vous disposez d'un droit complet d'accès, de rectification, de suppression et de limitation de vos données. Pour exercer vos droits : arsen.k111999@gmail.com.`
    },
    {
      title: "9. Sécurité et hébergement Cloudflare",
      content: `La plateforme est hébergée sur l'infrastructure Cloudflare sous les garanties du Swiss-US Data Privacy Framework (Art. 16 nLPD). Les échanges sont intégralement chiffrés en HTTPS (TLS 1.3).`
    },
    {
      title: "10. Autorité de surveillance suisse",
      content: `Préposé fédéral à la protection des données et à la transparence (PFPDT / EDÖB) :
Feldeggweg 1, 3003 Berne, Suisse
Site officiel : www.edoeb.admin.ch`
    },
    {
      title: "11. Contact",
      content: `Pour toute question relative à la protection des données :
Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Suisse
E-mail : arsen.k111999@gmail.com · Téléphone : +41 78 326 11 12`
    }
  ];

  const sections = isUk ? sectionsUk : sectionsFr;

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 0, marginBottom: 4 }}>
        {isUk ? 'Політика конфіденційності (nDSG / GDPR)' : 'Politique de confidentialité (nLPD / RGPD)'}
      </h2>
      <p style={{ color: 'var(--muted)', fontSize: 12.5, marginBottom: 18 }}>
        {isUk
          ? 'Останнє оновлення: 14 вересня 2026 року · Відповідність швейцарському закону nDSG та GDPR · sonate-solidaire.me'
          : 'Dernière mise à jour : 14 septembre 2026 · Conforme à la loi fédérale suisse nLPD et au RGPD · sonate-solidaire.me'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sections.map((s, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148, 163, 184, 0.12)', borderRadius: 10, padding: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#38BDF8', margin: '0 0 6px' }}>{s.title}</h3>
            <div style={{ whiteSpace: 'pre-line', fontSize: 13, color: '#CBD5E1' }}>{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { InfoModal });
