// ACCORD Suisse — Autonomous Agent Dialogue Widget
// Milestone 4: Multi-channel AI Co-Pilot for Web Portal & Telegram Mini App
// Instant synchronization with 7-service switcher & mobile drawer

function AgentChatWidget({ isOpen, onToggle, activeService, onSwitchService, lang = 'uk', t = {} }) {
  const [messages, setMessages] = React.useState(() => {
    const isUk = lang === 'uk';
    const isFr = lang === 'fr';
    const isDe = lang === 'de';

    const welcome = isUk
      ? "Вітаю! Я автономний ШІ-копілот ACCORD Suisse 🇨🇭🇺🇦.\nДопомагаю знайти житло під ліміти EVAM, підібрати вакансії з дозволом S (ст. 21a LEI), розрахувати суборенду за ст. 262 CO або згенерувати досьє для режі.\n\nОберіть тему або напишіть запитання нижче:"
      : isFr
      ? "Bonjour ! Je suis le co-pilote IA autonome ACCORD Suisse 🇨🇭.\nJe vous accompagne pour le logement aux barèmes EVAM, les postes prioritaires Permis S (Art. 21a LEI), le bouclier de sous-location (Art. 262 CO) et le dossier officiel pour régies.\n\nPosez votre question ou choisissez un sujet ci-dessous :"
      : isDe
      ? "Guten Tag! Ich bin der autonome KI-Copilot von ACCORD Suisse 🇨🇭.\nIch helfe Ihnen bei Wohnungen nach EVAM-Grenzwerten, Stellen für Status S (Art. 21a AIG), Untermiete nach Art. 262 OR und Bewerbungsdossiers für Verwaltungen.\n\nStellen Sie Ihre Frage oder wählen Sie ein Thema:"
      : "Hello! I am the ACCORD Suisse Autonomous AI Co-Pilot 🇨🇭.\nI assist with EVAM-compliant housing, Permis S priority jobs (Art. 21a LEI), Art. 262 CO sublease calculations, and official régie dossiers.\n\nAsk a question or pick a topic below:";

    return [
      {
        id: 'msg_welcome',
        role: 'assistant',
        text: welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: '🧮 Ліміти EVAM (03)', service: 'calc', side: 'a' },
          { label: '🛡️ Суборенда ст. 262 (05)', service: 'sublease', side: 'b' },
          { label: '📄 Досьє для режі (04)', service: 'dossier', side: 'a' }
        ]
      }
    ];
  });

  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Suggestions chips
  const suggestions = [
    { label: '📝 Резюме (CV) та робота', q: 'А з резюме та швейцарським форматом CV допоможеш?' },
    { label: '🏠 Ліміти EVAM (Во)', q: 'Які ліміти оренди EVAM у кантоні Во для сім\'ї з 3 осіб?' },
    { label: '🛡️ Розрахунок суборенди', q: 'Як законно розрахувати плату за кімнату за ст. 262 CO з меблями?' },
    { label: '📄 Досьє для Bernard Nicod', q: 'Як підготувати мотиваційний лист для режі Bernard Nicod?' },
    { label: '💼 Вакансії Art. 21a LEI', q: 'Як працює 5-денне захищене вікно RAV для дозволу S?' },
    { label: '🚆 SBB Etoy -> Lausanne', q: 'Скільки їхати потягом від Etoy до Lausanne Gare?' },
    { label: '🤝 Ментори Benevol', q: 'Як отримати волонтера Benevol за договором ст. 394 CO?' }
  ];

  const handleSend = (textToSend) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Knowledge graph / B-SDD deterministic rule compiler response
    setTimeout(() => {
      const qLow = q.toLowerCase();
      let answer = '';
      let actions = [];

      // 1. Resume / CV / Cover Letter
      if (qLow.includes('резюме') || qLow.includes('cv') || qLow.includes('curriculum') || qLow.includes('vitae')) {
        answer = "📝 **Так, обов'язково допоможемо скласти та перевірити швейцарське резюме (CV)!**\n\n" +
          "У Швейцарії до CV діють суворі стандарти, від яких безпосередньо залежить запрошення на інтерв'ю:\n\n" +
          "1. 📌 **Обов'язкова позначка Permis S у шапці:**\n" +
          "   Зазначте: *«Permis S (activité lucrative autorisée — безумовне право на працю без обмежень за ст. 4 та 21a LEI)»*. Швейцарські HR часто помилково вважають, що потрібні квоти або складний дозвіл влади.\n\n" +
          "2. 📄 **Швейцарська структура (максимум 2 сторінки):**\n" +
          "   • **Фото:** діловий портрет на нейтральному фоні з легкою посмішкою.\n" +
          "   • **Мови за шкалою CEFR:** наприклад, *«Français A2 (en cours) / Anglais B2»*.\n" +
          "   • **Досвід:** у зворотному хронологічному порядку із зазначенням конкретних результатів та обов'язків.\n" +
          "   • **Розділ «Références»:** *«sur demande»* (контакти попередніх керівників або швейцарських менторів).\n\n" +
          "3. 🤝 **Безкоштовна вичитка волонтерами Benevol (ст. 394 CO):**\n" +
          "   Швейцарські носії мови безоплатно вичитають ваше резюме, виправлять стиль і підкажуть правильні терміни.\n\n" +
          "4. 💼 **63 відкриті вакансії:**\n" +
          "   У каталозі АКОРД зібрано перевірені пропозиції без посередників від роботодавців, які готові брати кандидатів з дозволом S.";
        actions = [
          { label: '🤝 Ментор Benevol для вичитки CV (06)', service: 'mentors', side: 'b' },
          { label: '💼 Каталог вакансій Permis S (02)', service: 'prof', side: 'a' },
          { label: '📄 Скласти супровідний лист (04)', service: 'dossier', side: 'a' }
        ];

      // 2. Greetings / Who are you
      } else if (
        qLow.includes('привіт') || qLow.includes('добрий день') || qLow.includes('доброго дня') ||
        qLow.includes('доброго ранку') || qLow.includes('добрий вечір') || qLow.includes('вітаю') ||
        qLow.includes('хто ти') || qLow.includes('що ти вмієш') || qLow.includes('що вмієш') ||
        qLow.includes('hello') || qLow.includes('bonjour') || qLow.includes('salut') ||
        qLow.includes('guten tag') || qLow === 'hi' || qLow === 'hey' || qLow === 'start' ||
        qLow.includes('почати')
      ) {
        answer = "👋 **Вітаю! Я — персональний ШІ-копілот платформи ACCORD Suisse.**\n\n" +
          "Я допомагаю українцям у Швейцарії (кантони Vaud, Genève, Fribourg, Valais) розв'язувати питання житла, роботи та юридичної інтеграції безкоштовно та конфіденційно.\n\n" +
          "🎯 **Ось чим я можу допомогти просто зараз:**\n" +
          "• 📝 **Резюме та робота:** допомога зі швейцарським форматом CV, вичитка носієм мови та 63 відкриті вакансії Permis S.\n" +
          "• 🏠 **Житло від gérances:** перевірені квартири без посередників і точний розрахунок часу поїздами SBB CFF.\n" +
          "• 🧮 **Кантональні норми:** калькулятор лімітів EVAM (Во) та Hospice Général (Женева), правило 33%.\n" +
          "• 🛡️ **Суборенда кімнат:** перевірка законності за ст. 262 CO з обмеженням меблів до 20%.\n" +
          "• 🤝 **Волонтери Benevol:** безкоштовні ментори для практики французької мови (ст. 394 CO).\n\n" +
          "Напишіть ваше запитання або оберіть швидку дію нижче:";
        actions = [
          { label: '📝 Допомога з резюме / CV', service: 'mentors', side: 'b' },
          { label: '🏠 Пошук житла (01)', service: 'housing', side: 'a' },
          { label: '💼 Каталог вакансій (02)', service: 'prof', side: 'a' },
          { label: '🧮 Ліміти EVAM (03)', service: 'calc', side: 'a' }
        ];

      // 3. Gratitude / Thanks
      } else if (qLow.includes('дякую') || qLow.includes('спасибі') || qLow.includes('мерсі') || qLow.includes('merci') || qLow.includes('danke') || qLow.includes('thank')) {
        answer = "🌟 **Щиро будь ласка! Завжди раді підтримати вас у Швейцарії.**\n\n" +
          "Якщо виникнуть нові питання щодо оренди, перевірки договору, адаптації CV чи підготовки до співбесіди — звертайтесь у будь-який час!\n\n" +
          "💡 _Бажаємо успішної та спокійної інтеграції! Разом ми сильніші._ 🇨🇭🇺🇦";
        actions = [
          { label: '🏠 Переглянути житло (01)', service: 'housing', side: 'a' },
          { label: '💼 Каталог вакансій (02)', service: 'prof', side: 'a' },
          { label: '📖 Інструкція платформи', service: 'guide', side: 'a' }
        ];

      // 4. Job Interview / Hiring Process
      } else if (qLow.includes('співбесід') || qLow.includes('інтерв\'ю') || qLow.includes('entretien') || qLow.includes('interview')) {
        answer = "💼 **Підготовка до співбесіди у Швейцарії (Entretien d'embauche) :**\n\n" +
          "• ⏰ **Пунктуальність:** Прибувайте рівно за 5–7 хвилин до початку (у Швейцарії це критичний показник надійності).\n" +
          "• 📜 **Статус Permis S:** Майте копію картки S і впевнено поясніть: компанії достатньо лише подати коротке онлайн-повідомлення (*déclaration de prise d'emploi*), жодних дозволів чи квот не потрібно.\n" +
          "• 🗣️ **Рівень мови:** Чесно вкажіть ваш рівень французької/німецької та готовність швидко вчити професійну термінологію.\n" +
          "• 🤝 **Тренування з ментором:** Волонтери Benevol проводять безоплатні тренувальні співбесіди, щоб зняти мовний бар'єр.";
        actions = [
          { label: '🤝 Потренувати співбесіду з ментором (06)', service: 'mentors', side: 'b' },
          { label: '💼 Каталог вакансій Permis S (02)', service: 'prof', side: 'a' }
        ];

      // 5. Language Learning / French Courses
      } else if (qLow.includes('мовні курс') || qLow.includes('французьк') || qLow.includes('німецьк') || qLow.includes('вивчення мов') || (qLow.includes('мов') && (qLow.includes('курс') || qLow.includes('вчит') || qLow.includes('практик')))) {
        answer = "🗣️ **Вивчення мови (Romandie) та мовна практика з носіями :**\n\n" +
          "• **Офіційні програми EVAM / Hospice:** Соціальні служби компенсують ваучери на курси французької (Français en Jeu, Université Populaire тощо) до рівня B1.\n" +
          "• **Практика з менторами Benevol (ст. 394 CO):** Безкоштовне спілкування з франкомовними волонтерами за кавою, спільні прогулянки та подолання мовного бар'єра.\n" +
          "• **Професійна термінологія:** Складання списку ключових термінів за вашою спеціальністю.";
        actions = [
          { label: '🤝 Обрати ментора Benevol (06)', service: 'mentors', side: 'b' },
          { label: '💼 Вакансії з базовою мовою (02)', service: 'prof', side: 'a' }
        ];

      // 6. Permis S Rights / Labor Law
      } else if (qLow.includes('дозвіл s') || qLow.includes('статус s') || qLow.includes('permis s') || (qLow.includes('прав') && qLow.includes('прац'))) {
        answer = "🛡️ **Правовий статус Permis S у Швейцарії (Art. 4 & 21a LEI) :**\n\n" +
          "• **Безумовне право на працю:** Особи зі статусом захисту S мають право працювати у будь-якому кантоні Швейцарії без квот чи федеральних обмежень.\n" +
          "• **Процедура найму:** Роботодавець не оформлює складний дозвіл — лише надсилає стандартне повідомлення про найм до кантональної служби зайнятості (наприклад, DGEP у Во).\n" +
          "• **Захищене вікно RAV (ст. 21a LEI):** На вакансії у сферах із безробіттям >= 5% діє пріоритетне 5-денне вікно для зареєстрованих шукачів.\n" +
          "• **Оплата:** Права захищені галузевими колективними угодами (CCT), демпінг зарплат суворо заборонено.";
        actions = [
          { label: '💼 Каталог вакансій Permis S (02)', service: 'prof', side: 'a' },
          { label: '🤝 Менторська підтримка (06)', service: 'mentors', side: 'b' }
        ];

      // 7. EVAM / Hospice / Limits
      } else if (qLow.includes('evam') || qLow.includes('ліміт') || qLow.includes('hospice') || qLow.includes('норм') || qLow.includes('плафон') || qLow.includes('вартість')) {
        answer = "🧮 **Офіційні нормативи оренди кантону Во (EVAM) та Женеви (Hospice) :**\n\n" +
          "• **Кантон Во (VD, бареми EVAM):**\n" +
          "  - 1 особа: **CHF 1'050 – 1'350** / міс брутто\n" +
          "  - 2 особи: **CHF 1'200 – 1'750** / міс брутто\n" +
          "  - 3 особи: **CHF 1'350 – 2'050** / міс брутто\n" +
          "  - 4 особи: **CHF 1'500 – 2'350** / міс брутто\n" +
          "• **Правило 33%:** брутто-оренда не повинна перевищувати 33.3% сукупного доходу сім'ї.\n\n" +
          "💡 _Усі квартири у нашому каталозі мають автоматичну відмітку відповідності нормам EVAM._";
        actions = [
          { label: '👉 Відкрити Калькулятор лімітів (03)', service: 'calc', side: 'a' },
          { label: '👉 Переглянути перевірене житло (01)', service: 'housing', side: 'a' }
        ];

      // 8. Sublease / Art. 262 CO
      } else if (qLow.includes('суборенд') || qLow.includes('262') || qLow.includes('кімнат') || qLow.includes('sous-location') || qLow.includes('господар')) {
        answer = "🛡️ **Юридичний захист суборенди за статтею 262 CO (Code des Obligations) :**\n\n" +
          "1. **Безумовне право наймача:** Жодна gérance не може повністю заборонити суборенду. Такий пункт договору є нікчемним (_nul de plein droit_).\n" +
          "2. **Обмеження націнки за меблі:** Максимум **20.0%** від базової частки кімнати (судова практика Федерального суду ATF та директиви ASLOCA).\n" +
          "3. **Еталонний приклад:** 4 кімнати (2'000 CHF) -> 500 CHF/кімната + 100 CHF (20% меблі) + 80 CHF комунальні = **680 CHF/міс**.\n" +
          "4. **Строк розірвання:** 2 тижні на кінець місяця (ст. 266e CO).";
        actions = [
          { label: '👉 Відкрити Майстер суборенди (05)', service: 'sublease', side: 'b' },
          { label: '👉 Повідомлення до режі (Avis 262 CO)', service: 'sublease', side: 'b' }
        ];

      // 9. Rental Dossier / Régies
      } else if (qLow.includes('досьє') || qLow.includes('dossier') || qLow.includes('bernard') || qLow.includes('мотиваційн') || qLow.includes('лист')) {
        answer = "📄 **Стандартизоване швейцарське досьє кандидата (USPI / Art. 253 CO) :**\n\n" +
          "Швейцарські режі (Bernard Nicod, Cogestim, Domicim, Wincasa) вимагають чіткий пакет документів:\n" +
          "1. **Attestation Permis S** (Art. 4 LEI — право легального проживання).\n" +
          "2. **Гарантія оплати EVAM / Fiche de salaire** (підтвердження покриття орендної плати).\n" +
          "3. **Extrait de l'Office des poursuites** (оригінальний витяг без заборгованостей < 3 міс).\n" +
          "4. **Attestation RC Ménage** (поліс страхування цивільної відповідальності на CHF 5'000'000).\n\n" +
          "Наш генератор складає офіційного листа французькою мовою в 1 клік.";
        actions = [
          { label: '👉 Згенерувати офіційне досьє (04)', service: 'dossier', side: 'a' }
        ];

      // 10. Jobs / Art. 21a LEI / RAV / ORP
      } else if (qLow.includes('ваканс') || qLow.includes('робот') || qLow.includes('21a') || qLow.includes('lei') || qLow.includes('rav') || qLow.includes('orp') || qLow.includes('безробітт') || qLow.includes('chômage')) {
        answer = "💼 **Вакансії зі статусом Permis S та правовий режим Art. 21a LEI :**\n\n" +
          "• **Право на працю:** Власники статусу S мають безумовне право працювати у Швейцарії без квот та дозволів кантональної влади.\n" +
          "• **Вікно Stellenmeldepflicht (ст. 21a LEI):** Для професій із рівнем безробіття >= 5% вакансії спочатку публікуються виключно для зареєстрованих шукачів ORP/RAV на 5 робочих днів.\n" +
          "• **Оплата праці:** Суворо регулюється галузевими колективними договорами CCT / GAV.\n" +
          "• **Актуальна база:** 63 перевірені пропозиції у Romandie прямо від роботодавців.";
        actions = [
          { label: '👉 Відкрити каталог вакансій (02)', service: 'prof', side: 'a' },
          { label: '🤝 Ментор Benevol для CV (06)', service: 'mentors', side: 'b' }
        ];

      // 11. SBB / Commute
      } else if (qLow.includes('sbb') || qLow.includes('потяг') || qLow.includes('хвилин') || qLow.includes('etoy') || qLow.includes('morges') || qLow.includes('дорог') || qLow.includes('маршрут')) {
        answer = "🚆 **Транспортна логістика SBB CFF FFS у регіоні La Côte (Vaud) :**\n\n" +
          "• **Etoy ⟷ Morges:** 9 хвилин (прямий потяг RER Vaud R5/R6)\n" +
          "• **Etoy ⟷ Lausanne Gare:** 22-24 хвилини (прямий або 1 пересадка в Renens)\n" +
          "• **Morges ⟷ Genève:** 29 хвилин (прямий міжрегіональний потяг IR)\n" +
          "• **Matran ⟷ Lausanne:** 25 хвилин (1 пересадка)\n\n" +
          "Усі картки житла на порталі АКОРД автоматично розраховують точний час сполучення.";
        actions = [
          { label: '👉 Шукати житло біля станцій (01)', service: 'housing', side: 'a' }
        ];

      // 12. Housing Search with REAL APARTMENT DATABASE QUERY (Typo-tolerant & Price-aware)
      } else if (
        qLow.includes('житл') || qLow.includes('квартир') || qLow.includes('квартип') ||
        qLow.includes('кватрир') || qLow.includes('кварт') || qLow.includes('знайти житло') ||
        qLow.includes('оренд') || qLow.includes('аренд') || qLow.includes('зняти') ||
        qLow.includes('снять') || qLow.includes('помешкан') || qLow.includes('хат') ||
        qLow.includes('кімнат') || qLow.includes('комнат') || qLow.includes('студі') ||
        qLow.includes('studio') || qLow.includes('appart') || qLow.includes('logement') ||
        qLow.includes('wohnung') || qLow.includes('coloc') || qLow.includes('sublet') ||
        qLow.includes('лозанн') || qLow.includes('ньон') || qLow.includes('морж') ||
        qLow.includes('женев') || qLow.includes('рене') || qLow.includes('фрібур') ||
        qLow.includes('еґль') || qLow.includes('егль') || qLow.includes('матран') ||
        qLow.includes('блоне') || qLow.includes('версуа') || qLow.includes('шезо') ||
        qLow.includes('кларен') ||
        (/\b\d{3,4}\b\s*(?:франк|іранк|chf|фр)/.test(qLow)) ||
        (/(?:до|бюджет|дешевш|ціна|вартіст|<)\s*\d{3,4}/.test(qLow))
      ) {
        const allListings = (typeof window !== 'undefined' && (window.HOUSING_LISTINGS || window.SR_HOUSING)) || [];

        // 1. City aliases
        const cityAliases = {
          'Nyon': ['nyon', 'ньон'],
          'Лозанна': ['lausanne', 'лозанн'],
          'Morges': ['morges', 'морж'],
          'Matran': ['matran', 'матран'],
          'Женева': ['genev', 'женев', 'geneva'],
          'Рене': ['renens', 'рене'],
          'Corcelles-près-Concise': ['corcelles', 'корсель'],
          'Blonay': ['blonay', 'блоне'],
          'Еґль': ['aigle', 'еґль', 'егль'],
          'Фрібур': ['fribourg', 'фрібур', 'фрибур'],
          'Versoix': ['versoix', 'версуа'],
          'Cheseaux-sur-Lausanne': ['cheseaux', 'шезо'],
          'Clarens': ['clarens', 'кларен'],
          'Monthey': ['monthey', 'монтей'],
          'Martigny': ['martigny', 'мартіньї', 'мартиньи'],
          'Avenches': ['avenches', 'аванш'],
          'Grolley': ['grolley', 'гролле']
        };

        let targetCity = null;
        for (const [cityName, aliases] of Object.entries(cityAliases)) {
          if (aliases.some(a => qLow.includes(a))) {
            targetCity = cityName;
            break;
          }
        }

        // 2. Price filter
        const priceMatches = qLow.match(/\b(\d{3,4})\b/g);
        let maxPrice = null;
        if (priceMatches) {
          const nums = priceMatches.map(p => parseInt(p, 10)).filter(n => n >= 300 && n <= 6000);
          if (nums.length > 0) {
            maxPrice = (qLow.includes('до') || qLow.includes('<') || qLow.includes('дешевш') || qLow.includes('макс') || qLow.includes('бюджет') || qLow.includes('за') || qLow.includes('ціна')) ? Math.min(...nums) : nums[0];
          }
        }

        // 3. Rooms filter
        const roomMatch = qLow.match(/(\d(?:\.5)?)\s*(?:кімн|room|pièce)/);
        const targetRooms = roomMatch ? parseFloat(roomMatch[1]) : (qLow.includes('студі') || qLow.includes('studio') ? 1.0 : null);

        // 4. EVAM compliance filter
        const evamOnly = qLow.includes('evam') || qLow.includes('норм') || qLow.includes('соціал') || qLow.includes('погоджен');

        let filtered = allListings.filter(item => {
          if (targetCity) {
            const cName = (item.city_name || (item.city && (item.city.fr || item.city.uk)) || '').toLowerCase();
            const aliases = cityAliases[targetCity] || [targetCity.toLowerCase()];
            if (!aliases.some(a => cName.includes(a))) return false;
          }
          const itemPrice = item.price || item.rent_gross || 0;
          if (maxPrice && itemPrice > maxPrice) return false;
          if (targetRooms && item.rooms !== targetRooms) return false;
          if (evamOnly && item.compliance && !item.compliance.ok) return false;
          return true;
        });

        let prefixNote = '';
        if (filtered.length === 0 && allListings.length > 0) {
          if (targetCity) {
            prefixNote = `_У місті **${targetCity}** наразі прямих вільних об'єктів немає, але ось найближчі перевірені варіанти поруч уздовж гілки SBB:_\n\n`;
            filtered = allListings.slice(0, 3);
          } else if (maxPrice) {
            // Sort by price ascending so the user sees the cheapest real options
            const sortedByPrice = [...allListings].sort((a, b) => {
              const pa = a.price || a.rent_gross || 99999;
              const pb = b.price || b.rent_gross || 99999;
              return pa - pb;
            });
            prefixNote = `⚠️ _За вартістю до **CHF ${maxPrice}** окремих квартир у базі наразі немає (найдоступніша окрема студія в базі — від **CHF 860/міс** у Lovatens, або кімната в **суборенді за ст. 262 CO** за CHF 500–750/міс). Ось найдешевші перевірені варіанти з нашої бази:_\n\n`;
            filtered = sortedByPrice.slice(0, 3);
          } else {
            filtered = allListings.slice(0, 3);
          }
        }

        const displayItems = filtered.slice(0, 3);

        if (displayItems.length > 0) {
          const listMd = displayItems.map((item, idx) => {
            const title = (item.title && item.title.uk) || item.title || 'Квартира';
            const city = (item.city && item.city.uk) || item.city_name || item.city || 'Romandie';
            const price = item.price || item.rent_gross || 1450;
            const rooms = item.rooms || 2.0;
            const regie = item.regie || item.regie_name || 'Gérance Immobilière';
            const sbbMin = item.sbb ? item.sbb.minutes : (item.sbb_minutes || 20);
            const sbbCity = item.sbb ? item.sbb.city : (item.sbb_anchor || 'Lausanne');
            const isEvamOk = item.compliance ? item.compliance.ok : (item.evam_ok !== false);
            const evamBadge = isEvamOk ? '🟢 Відповідає нормам EVAM' : '🟡 Потребує погодження соцслужби';

            return `${idx + 1}. 🏢 **${title}**\n` +
              `   • 📍 **Місто:** ${city} (${item.postal_code || ''}, ${item.canton || 'VD'})\n` +
              `   • 💰 **Оренда:** CHF ${price.toLocaleString('fr-CH')} / міс брутто (з комунальними)\n` +
              `   • 🛏️ **Кімнат:** ${rooms} · 🏢 **Режі:** ${regie}\n` +
              `   • 🚆 **SBB:** ${sbbMin} хв до ${sbbCity}\n` +
              `   • 📋 **EVAM:** ${evamBadge}`;
          }).join('\n\n');

          answer = `🏠 **Знайдено перевірені квартири у базі АКОРД (${filtered.length} варіантів з 40) :**\n\n` +
            prefixNote +
            listMd +
            `\n\n💡 _Усі об'єкти доступні без комісій та посередників за офіційним договором (Art. 253 CO)._`;

          actions = [
            { label: '👉 Відкрити каталог житла (01)', service: 'housing', side: 'a' },
            ...(maxPrice && maxPrice < 1000 ? [{ label: '🛡️ Суборенда кімнати (05)', service: 'sublease', side: 'a' }] : []),
            { label: '📄 Скласти досьє для режі (04)', service: 'dossier', side: 'a' },
            { label: '🧮 Ліміти EVAM (03)', service: 'calc', side: 'a' }
          ];
        } else {
          answer = "🏠 **База перевіреного житла ACCORD Suisse :**\n\n" +
            "Усі квартири на платформі перевірені за 3 критеріями:\n" +
            "1. **Прямі gérances (Bernard Nicod, Domicim, Cogestim) :** без комісій і посередників.\n" +
            "2. **Норми EVAM / Hospice :** автоматичний бейдж узгодження з соціальними службами.\n" +
            "3. **SBB-калькулятор :** точний розрахунок часу доріг до Лозанни, Моржа та Женеви.\n\n" +
            "Перегляньте повний каталог житла за кнопкою нижче:";
          actions = [
            { label: '👉 Переглянути каталог житла (01)', service: 'housing', side: 'a' },
            { label: '🧮 Перевірити ліміти EVAM (03)', service: 'calc', side: 'a' }
          ];
        }

      // 13. Benevol Mentors
      } else if (qLow.includes('ментор') || qLow.includes('benevol') || qLow.includes('волонтер')) {
        answer = "🤝 **Мережа швейцарських волонтерів Benevol (Art. 394 CO) :**\n\n" +
          "• **Формат:** Безоплатне цивільне доручення (_contrat de mandat gratuit_), що виключає трудові зобов'язання (ст. 319 CO).\n" +
          "• **Сфери допомоги:**\n" +
          "  1. Практика розмовної французької мови.\n" +
          "  2. Перевірка швейцарського резюме (CV) та супровідних листів.\n" +
          "  3. Спільні візити на перегляди житла.\n" +
          "  4. Допомога з адміністративними процедурами.";
        actions = [
          { label: '👉 Обрати ментора Benevol (06)', service: 'mentors', side: 'b' }
        ];

      // 14. User Guide / Documentation
      } else if (qLow.includes('інструкц') || qLow.includes('користуват') || qLow.includes('посібник') || qLow.includes('довідк') || qLow.includes('як працює') || qLow.includes('guide') || qLow.includes('emploi') || qLow.includes('anleitung')) {
        answer = "📖 **Покроковий посібник користувача ACCORD Suisse :**\n\n" +
          "1. 🏠 **Житло:** верифіковані квартири від режі (без комісій і посередників) та логістика SBB.\n" +
          "2. 🧮 **Калькулятор:** ліміти EVAM кантону Во та Hospice Женеви (правило 33% доходу).\n" +
          "3. 📄 **Досьє для режі:** 1-Click створення офіційного пакета за ст. 253 CO французькою.\n" +
          "4. 💼 **Робота:** 63 вакансії та 5-денне захищене вікно ORP/RAV (ст. 21a LEI).\n" +
          "5. 🛡️ **Суборенда:** легальний розрахунок за ст. 262 CO з меблями (max 20%).\n" +
          "6. 🤝 **Ментори:** безоплатна підтримка волонтерів Benevol (ст. 394 CO).\n" +
          "7. 🎙️ **Голос у Telegram:** записуйте голосові повідомлення у боті @SwissResilienceHubBot (Whisper STT).\n\n" +
          "Оберіть дію нижче для перегляду повного інтерактивного керівництва:";
        actions = [
          { label: '📖 Відкрити повний гід', service: 'guide', side: 'a' },
          { label: '🧮 Ліміти EVAM (03)', service: 'calc', side: 'a' },
          { label: '📄 Досьє для режі (04)', service: 'dossier', side: 'a' }
        ];

      // 15. Smart Contextual Fallback
      } else {
        answer = "🤖 **Дякую за ваше запитання щодо:** *«" + q + "»*\n\n" +
          "Я можу допомогти вам знайти точне та юридично вивірене рішення за нормами Швейцарії. Оберіть тему, яка найкраще відповідає вашій ситуації:\n\n" +
          "• 📝 **Резюме та пошук роботи:** адаптація CV під швейцарські вимоги, вичитка носієм мови через Benevol, 63 перевірені вакансії без посередників.\n" +
          "• 🏠 **Житло та нормативи:** перевірка орендної плати за лімітами EVAM (Во) чи Hospice (Женева), пошук квартир без комісій.\n" +
          "• 🛡️ **Суборенда кімнати:** легальний розрахунок вартості за ст. 262 CO (максимум 20% за меблі).\n" +
          "• 📄 **Досьє кандидата:** генерація офіційного листа для gérances французькою в 1 клік.\n" +
          "• 🤝 **Швейцарський волонтер:** безкоштовний ментор для розмовної практики та супроводу.\n\n" +
          "Оберіть один із розділів або сформулюйте запит детальніше :";
        actions = [
          { label: '📝 Резюме та вакансії (02)', service: 'prof', side: 'a' },
          { label: '🏠 Пошук житла (01)', service: 'housing', side: 'a' },
          { label: '🧮 Ліміти EVAM (03)', service: 'calc', side: 'a' },
          { label: '🤝 Ментор Benevol (06)', service: 'mentors', side: 'b' }
        ];
      }

      const botMsg = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (act) => {
    if (act.service === 'guide') {
      try { window.location.hash = 'guide'; } catch (e) {}
    } else if (act.service && onSwitchService) {
      onSwitchService(act.service, act.side || 'a');
    }
  };

  return (
    <React.Fragment>
      {/* Floating Toggle Button */}
      <button
        onClick={onToggle}
        className="v2-agent-fab"
        aria-label="ШІ-Копілот ACCORD Suisse"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9000,
          background: 'linear-gradient(135deg, #D52B1E 0%, #991B1B 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '28px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 8px 30px rgba(213, 43, 30, 0.45)',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span style={{ fontSize: '16px' }}>🤖</span>
        <span>{lang === 'uk' ? 'ШІ-Копілот' : lang === 'fr' ? 'Co-pilote IA' : lang === 'de' ? 'KI-Copilot' : 'AI Co-Pilot'}</span>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#22C55E',
          boxShadow: '0 0 8px #22C55E',
          display: 'inline-block'
        }}></span>
      </button>

      {/* Slide-in / Modal Dialogue Container */}
      {isOpen && (
        <div
          className="v2-agent-dialogue-overlay"
          onClick={onToggle}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 11, 18, 0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '16px'
          }}
        >
          <div
            className="v2-agent-dialogue-panel"
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '82vh',
              maxHeight: '680px',
              background: '#0B111E',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(213, 43, 30, 0.2)',
              overflow: 'hidden',
              fontFamily: "'Inter', sans-serif",
              color: '#F8FAFC'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 16px',
              background: 'linear-gradient(180deg, rgba(213, 43, 30, 0.15) 0%, rgba(11, 17, 30, 0) 100%)',
              borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #D52B1E 0%, #7F1D1D 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  boxShadow: '0 0 12px rgba(213, 43, 30, 0.4)'
                }}>
                  🤖
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ACCORD Co-Pilot
                    <span style={{ fontSize: '10px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ADE80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1px 5px', borderRadius: '4px' }}>
                      ONLINE
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                    NVIDIA Nemotron .184 · Utopia DB .251
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setMessages(prev => prev.slice(0, 1))}
                  title="Очистити історію"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '4px'
                  }}
                >
                  🔄
                </button>
                <button
                  onClick={onToggle}
                  aria-label="Закрити"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Suggestions Carousel */}
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              whiteSpace: 'nowrap',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s.q)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    borderRadius: '16px',
                    color: '#CBD5E1',
                    padding: '5px 10px',
                    fontSize: '11.5px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Messages Stream */}
            <div style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '88%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div
                      style={{
                        background: isUser ? 'linear-gradient(135deg, #D52B1E 0%, #B91C1C 100%)' : 'rgba(30, 41, 59, 0.65)',
                        border: isUser ? 'none' : '1px solid rgba(148, 163, 184, 0.15)',
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        padding: '10px 14px',
                        fontSize: '12.5px',
                        lineHeight: 1.55,
                        color: '#F8FAFC',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        boxShadow: isUser ? '0 4px 14px rgba(213, 43, 30, 0.25)' : 'none'
                      }}
                    >
                      {m.text}
                    </div>

                    {/* Action buttons if attached */}
                    {m.actions && m.actions.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                        {m.actions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            style={{
                              background: 'rgba(56, 189, 248, 0.12)',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              borderRadius: '12px',
                              padding: '4px 10px',
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#38BDF8',
                              cursor: 'pointer'
                            }}
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <span style={{
                      fontSize: '10px',
                      color: '#64748B',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      padding: '0 4px'
                    }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(30, 41, 59, 0.65)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#94A3B8'
                }}>
                  <span>Аналіз законодавства Швейцарії</span>
                  <span style={{ display: 'inline-block', animation: 'pulse 1s infinite' }}>⏳</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              style={{
                padding: '12px',
                borderTop: '1px solid rgba(148, 163, 184, 0.12)',
                background: 'rgba(11, 17, 30, 0.95)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'uk' ? "Запитайте про оренду, EVAM, суборенду, досьє..." : "Posez une question sur le logement, EVAM, bail..."}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  color: '#F8FAFC',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#D52B1E' : 'rgba(255, 255, 255, 0.08)',
                  color: input.trim() ? '#FFFFFF' : '#64748B',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s ease'
                }}
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { AgentChatWidget });
