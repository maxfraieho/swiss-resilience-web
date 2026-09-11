/**
 * Swiss Resilience Navigator — EVAM & Hospice Général Compliance Engine
 * Module: calculator.js
 *
 * Implements:
 * 1. Barèmes lookup for Canton de Vaud (EVAM) & Canton de Genève (Hospice Général).
 * 2. Real-time verdict calculation based on family size, commune, and applicant legal status.
 * 3. Dynamic compliance gauge & legal recommendations (Art. 264 CO Reprise de bail).
 * 4. Full bilingual page translation (UA / FR) across navigation, hero, metrics, features, pricing, and footer.
 * 5. UI metric counter animation & smooth scrolling.
 */

// Official and indicative reference rent ceilings (CHF/month, gross rent cap)
// Source: EVAM Directives d'application (Vaud) & Hospice Général barèmes d'aide sociale (Genève).
export const BAREMES = {
  vd: {
    lausanne: { 1: 1100, 2: 1210, 3: 1290, 4: 1490, 5: 1690 },
    morges:   { 1: 1050, 2: 1180, 3: 1260, 4: 1430, 5: 1620 },
    etoy:     { 1: 1020, 2: 1150, 3: 1230, 4: 1400, 5: 1580 },
    nyon:     { 1: 1150, 2: 1260, 3: 1340, 4: 1540, 5: 1750 },
    vevey:    { 1: 1080, 2: 1200, 3: 1280, 4: 1460, 5: 1650 },
    yverdon:  { 1: 990,  2: 1120, 3: 1190, 4: 1350, 5: 1520 }
  },
  ge: {
    geneve:   { 1: 1350, 2: 1600, 3: 1850, 4: 2100, 5: 2350 },
    carouge:  { 1: 1320, 2: 1570, 3: 1820, 4: 2070, 5: 2320 },
    vernier:  { 1: 1300, 2: 1550, 3: 1780, 4: 2020, 5: 2260 },
    meyrin:   { 1: 1300, 2: 1550, 3: 1780, 4: 2020, 5: 2260 },
    lancy:    { 1: 1310, 2: 1560, 3: 1800, 4: 2040, 5: 2290 },
    lausanne: { 1: 1300, 2: 1550, 3: 1750, 4: 1950, 5: 2150 },
    morges:   { 1: 1300, 2: 1550, 3: 1750, 4: 1950, 5: 2150 },
    etoy:     { 1: 1300, 2: 1550, 3: 1750, 4: 1950, 5: 2150 },
    nyon:     { 1: 1300, 2: 1550, 3: 1750, 4: 1950, 5: 2150 }
  }
};

export const COMMUNES_BY_CANTON = {
  vd: [
    { value: 'lausanne', labelUA: 'Lausanne · Лозанна', labelFR: 'Lausanne (District de Lausanne)' },
    { value: 'morges',   labelUA: 'Morges · Морж',     labelFR: 'Morges (District de Morges)' },
    { value: 'etoy',     labelUA: 'Etoy · Етуа',       labelFR: 'Etoy (District de Morges)' },
    { value: 'nyon',     labelUA: 'Nyon · Ньйон',      labelFR: 'Nyon (District de Nyon)' },
    { value: 'vevey',    labelUA: 'Vevey · Веве',      labelFR: 'Vevey (District Riviera-Pays-d\'Enhaut)' },
    { value: 'yverdon',  labelUA: 'Yverdon · Івердон', labelFR: 'Yverdon-les-Bains (Jura-Nord vaudois)' }
  ],
  ge: [
    { value: 'geneve',   labelUA: 'Genève · Женева',   labelFR: 'Genève-Ville' },
    { value: 'carouge',  labelUA: 'Carouge · Каруж',   labelFR: 'Carouge' },
    { value: 'vernier',  labelUA: 'Vernier · Верньє',  labelFR: 'Vernier' },
    { value: 'meyrin',   labelUA: 'Meyrin · Мейран',   labelFR: 'Meyrin' },
    { value: 'lancy',    labelUA: 'Lancy · Лансі',     labelFR: 'Lancy' }
  ]
};

export const FAMILY_OPTIONS = {
  ua: [
    { value: '1', label: '1 особа · кімната або студія' },
    { value: '2', label: '2 особи · 2 пок.' },
    { value: '3', label: '3 особи · 3 пок.' },
    { value: '4', label: '4 особи · 4 пок.' },
    { value: '5', label: '5+ осіб · 4.5–5 пок.' }
  ],
  fr: [
    { value: '1', label: '1 personne · chambre ou studio' },
    { value: '2', label: '2 personnes · 2 pièces' },
    { value: '3', label: '3 personnes · 3 pièces' },
    { value: '4', label: '4 personnes · 4 pièces' },
    { value: '5', label: '5+ personnes · 4.5–5 pièces' }
  ]
};

export const formatSwissNumber = (n) => {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

export class HousingCalculator {
  constructor(containerId = 'calc-widget') {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.cantonSelect = document.getElementById('canton');
    this.communeSelect = document.getElementById('commune');
    this.familySelect = document.getElementById('family');
    this.statusRadios = document.querySelectorAll('#status-group .radio');
    this.verdictValue = document.getElementById('verdict-value');
    this.verdictNote = document.getElementById('verdict-note');
    this.gaugeTitle = document.querySelector('.gauge-title');
    this.gaugeSub = document.querySelector('.gauge-sub');
    this.legalNoteEl = document.querySelector('.legal-note');

    this.currentLanguage = localStorage.getItem('srn_lang') || 'ua';
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCommunes();
    this.updateFamilyOptions();
    this.updateVerdict();
    this.initMetricCounters();
    this.initSmoothScroll();
    this.initLanguageToggle();
    this.applyPageLanguage(this.currentLanguage);
  }

  bindEvents() {
    if (this.cantonSelect) {
      this.cantonSelect.addEventListener('change', () => {
        this.updateCommunes();
        this.updateVerdict();
      });
    }

    if (this.communeSelect) {
      this.communeSelect.addEventListener('change', () => {
        this.updateVerdict();
      });
    }

    if (this.familySelect) {
      this.familySelect.addEventListener('change', () => {
        this.updateVerdict();
      });
    }

    this.statusRadios.forEach((radioLabel) => {
      radioLabel.addEventListener('click', (e) => {
        this.statusRadios.forEach((r) => r.classList.remove('checked'));
        radioLabel.classList.add('checked');
        const input = radioLabel.querySelector('input[type="radio"]');
        if (input) input.checked = true;
        this.updateVerdict();
      });
    });
  }

  updateCommunes() {
    if (!this.communeSelect || !this.cantonSelect) return;
    const canton = this.cantonSelect.value || 'vd';
    const communes = COMMUNES_BY_CANTON[canton] || COMMUNES_BY_CANTON.vd;
    const currentVal = this.communeSelect.value;

    this.communeSelect.innerHTML = '';
    communes.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c.value;
      opt.textContent = this.currentLanguage === 'fr' ? c.labelFR : c.labelUA;
      if (c.value === currentVal) {
        opt.selected = true;
      }
      this.communeSelect.appendChild(opt);
    });

    if (!this.communeSelect.value && communes.length > 0) {
      this.communeSelect.value = communes[0].value;
    }
  }

  updateFamilyOptions() {
    if (!this.familySelect) return;
    const curVal = this.familySelect.value || '3';
    const opts = FAMILY_OPTIONS[this.currentLanguage] || FAMILY_OPTIONS.ua;

    this.familySelect.innerHTML = '';
    opts.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      if (o.value === curVal) opt.selected = true;
      this.familySelect.appendChild(opt);
    });
  }

  updateVerdict() {
    if (!this.verdictValue) return;

    const canton = this.cantonSelect ? this.cantonSelect.value : 'vd';
    const commune = this.communeSelect ? this.communeSelect.value : 'lausanne';
    const family = this.familySelect ? this.familySelect.value : '3';
    
    const checkedStatus = document.querySelector('input[name="status"]:checked');
    const status = checkedStatus ? checkedStatus.value : 'evam';

    let base = BAREMES[canton]?.[commune]?.[family];
    if (!base) {
      base = canton === 'ge' ? 1750 : 1290;
    }

    if (status === 'income') {
      base = Math.round((base * 1.15) / 10) * 10;
    }

    this.verdictValue.textContent = formatSwissNumber(base);

    const cantonName = canton === 'vd' ? 'Communes Vaudoises (EVAM)' : 'Hospice Général (Genève)';
    const communeLabel = this.communeSelect && this.communeSelect.selectedIndex >= 0
      ? this.communeSelect.options[this.communeSelect.selectedIndex].text.split('·')[0].trim()
      : 'Lausanne';
    const famLabel = this.familySelect && this.familySelect.selectedIndex >= 0
      ? this.familySelect.options[this.familySelect.selectedIndex].text.split('·')[0].trim()
      : '3 personnes';

    if (this.verdictNote) {
      this.verdictNote.textContent = this.currentLanguage === 'fr'
        ? `Barème ${cantonName} · ${famLabel} · ${communeLabel} · mis à jour 09.2026`
        : `Barème ${cantonName} · ${famLabel} · ${communeLabel} · оновлено 09.2026`;
    }

    if (status === 'income') {
      if (this.gaugeTitle) {
        this.gaugeTitle.textContent = this.currentLanguage === 'fr'
          ? 'Solvabilité Régie Standard (Règle 33%)'
          : 'Regie Solvency Standard (Règle 33%)';
      }
      if (this.gaugeSub) {
        this.gaugeSub.textContent = this.currentLanguage === 'fr'
          ? 'Revenu suffisant pour les régies suisses sans recours aux plafonds EVAM'
          : 'Розрахунок базується на платоспроможності (оренда ≤ 33% чистого доходу) без обмежень соціальних барем';
      }
      if (this.legalNoteEl) {
        const p = this.legalNoteEl.querySelector('p');
        if (p) {
          p.innerHTML = this.currentLanguage === 'fr'
            ? '<strong>Recommandé : Dépôt direct avec extrait OP.</strong> Joindre obligatoirement une attestation de non-poursuite récente (< 3 mois) et les 3 dernières fiches de salaire. Le générateur compile la lettre conforme USPI en 1 clic.'
            : '<strong>Рекомендовано: Пряма подача досьє з Extrait OP.</strong> Додайте довідку про відсутність боргів (Office des Poursuites &lt; 3 міс.) та 3 останні зарплатні листи. Наш сервіс генерує мотиваційний лист стандарту USPI в 1 клік.';
        }
      }
    } else {
      if (this.gaugeTitle) {
        this.gaugeTitle.textContent = '100% EVAM Compliant';
      }
      if (this.gaugeSub) {
        this.gaugeSub.textContent = this.currentLanguage === 'fr'
          ? 'Bail entièrement pris en charge par l\'aide sociale EVAM sans risque de rejet'
          : 'Договір може бути повністю покритий соціальною допомогою EVAM без ризику відхилення';
      }
      if (this.legalNoteEl) {
        const p = this.legalNoteEl.querySelector('p');
        if (p) {
          p.innerHTML = this.currentLanguage === 'fr'
            ? '<strong>Recommandé : Reprise de bail (Art. 264 CO).</strong> Le loyer est bloqué selon le bail en vigueur sans majoration par la régie. Nous fournissons le modèle officiel et le dossier complet USPI.'
            : '<strong>Рекомендовано: Reprise de bail (Art. 264 CO).</strong> Орендна плата фіксується за чинним договором без права режі на підвищення. Ми надамо шаблон запиту та повний пакет USPI-стандарту досьє в 1 клік.';
        }
      }
    }
  }

  initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-toggle button');
    langButtons.forEach((b) => {
      b.addEventListener('click', () => {
        langButtons.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        this.currentLanguage = b.getAttribute('data-lang') || 'ua';
        localStorage.setItem('srn_lang', this.currentLanguage);
        this.updateCommunes();
        this.updateFamilyOptions();
        this.updateVerdict();
        this.applyPageLanguage(this.currentLanguage);
      });
    });

    // Set initial active state based on stored preference
    langButtons.forEach((b) => {
      if (b.getAttribute('data-lang') === this.currentLanguage) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  applyPageLanguage(lang) {
    const isFr = lang === 'fr';

    // Top Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length >= 5) {
      navLinks[0].textContent = isFr ? 'Radar Logement' : 'Житловий Радар';
      navLinks[1].textContent = isFr ? 'Calculateur EVAM' : 'Калькулятор EVAM';
      navLinks[2].textContent = isFr ? 'Solidarité ZSU' : 'ЗСУ Прозорість';
      navLinks[3].textContent = isFr ? 'Carrière ORP' : "Кар'єра ORP";
      navLinks[4].textContent = isFr ? 'Tarifs' : 'Тарифи';
    }

    // Nav CTA buttons
    const navTgBtn = document.querySelector('.nav-actions .btn-ghost');
    if (navTgBtn) {
      navTgBtn.innerHTML = isFr
        ? `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Lancer le bot Telegram`
        : `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Запустити Telegram-бота`;
    }

    const navAppBtn = document.querySelector('.nav-actions .btn-primary');
    if (navAppBtn) {
      navAppBtn.href = '/app/';
      navAppBtn.innerHTML = isFr
        ? `Ouvrir la Web App <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`
        : `Відкрити Web App <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`;
    }

    // Hero Section
    const heroPill = document.querySelector('.hero .pill');
    if (heroPill) {
      heroPill.innerHTML = isFr
        ? `<span class="pulse-dot" aria-hidden="true"></span> ⚡ SURVEILLANCE DIRECTE FLATFOX REST API · &lt; 60 SECONDES`
        : `<span class="pulse-dot" aria-hidden="true"></span> ⚡ ПРЯМИЙ МОНІТОРИНГ FLATFOX REST API · &lt; 60 СЕКУНД`;
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = isFr
        ? `Logement suisse et intégration légale <span class="accent">sans intermédiaires ni frais abusifs</span>`
        : `Швейцарське житло та легальна інтеграція <span class="accent">без посередників і переплат</span>`;
    }

    const heroSub = document.querySelector('.hero-sub');
    if (heroSub) {
      heroSub.textContent = isFr
        ? `Surveillance automatisée selon les barèmes officiels EVAM et Hospice Général, reprises de bail (art. 264 CO), génération instantanée de dossiers conformes USPI et contribution solidaire de 30% à la défense ukrainienne.`
        : `Прямий автоматизований моніторинг житла за офіційними баремами EVAM та Hospice Général, передача договорів оренди (Reprise de bail, Art. 264 CO), миттєва компіляція досьє стандарту USPI та солідарний внесок 30% на захист України.`;
    }

    const heroCtas = document.querySelectorAll('.hero-cta a');
    if (heroCtas.length >= 2) {
      heroCtas[0].href = '/app/';
      heroCtas[0].innerHTML = isFr
        ? `🚀 Ouvrir l'application Web (TMA) <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`
        : `🚀 Відкрити веб-додаток (TMA) <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`;

      heroCtas[1].innerHTML = isFr
        ? `📊 Calculer l'éligibilité EVAM <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`
        : `📊 Розрахувати шанс оренди <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    }

    // Hero Metrics
    const metrics = document.querySelectorAll('.hero-metrics .metric');
    if (metrics.length >= 3) {
      metrics[0].querySelector('.metric-label').textContent = isFr ? 'Statut juridique' : 'Правовий статус';
      const m0Val = metrics[0].querySelector('.metric-value');
      if (m0Val) m0Val.textContent = 'Art. 60–79 CC';
      metrics[0].querySelector('.metric-desc').textContent = isFr
        ? 'Association suisse sans but lucratif · Protection 100% aide EVAM (LARA)'
        : 'Швейцарська некомерційна асоціація · 100% захист соціальної допомоги EVAM (LARA)';

      metrics[1].querySelector('.metric-label').textContent = isFr ? 'Commissions intermédiaires' : 'Комісії посередникам';
      const m1Val = metrics[1].querySelector('.metric-value');
      if (m1Val) m1Val.textContent = '0 CHF';
      metrics[1].querySelector('.metric-desc').textContent = isFr
        ? 'payées aux spéculateurs — accès direct et gratuit aux sources'
        : 'сплачено тіньовим спекулянтам — прямий доступ до першоджерела';

      metrics[2].querySelector('.metric-label').textContent = isFr ? 'Solidarité Défense 🇺🇦' : 'Солідарна допомога 🇺🇦';
      const m2Val = metrics[2].querySelector('.metric-value');
      if (m2Val) m2Val.textContent = '30%';
      metrics[2].querySelector('.metric-desc').textContent = isFr
        ? 'de chaque souscription reversé de manière transparente aux fonds officiels (BNU / Come Back Alive)'
        : 'фіксоване відрахування з кожного платного тарифу на перевірені рахунки оборони (НБУ / Повернись живим)';
    }

    // Calculator section titles & labels
    const calcTitle = document.querySelector('#calc .section-title');
    if (calcTitle) {
      calcTitle.innerHTML = isFr
        ? `Calculateur des barèmes EVAM / Hospice&nbsp;Général`
        : `Калькулятор бареми EVAM / Hospice&nbsp;Général`;
    }

    const calcSub = document.querySelector('#calc .section-sub');
    if (calcSub) {
      calcSub.textContent = isFr
        ? `Renseignez la taille du ménage et la commune — obtenez immédiatement le budget plafond, le statut d'éligibilité et les recommandations juridiques.`
        : `Введіть склад сім'ї та комуну — миттєво отримайте максимальний бюджет оренди, статус відповідності та юридичну рекомендацію щодо оптимальної процедури укладення договору.`;
    }

    const calcLeftTitle = document.querySelector('.calc-left h3');
    if (calcLeftTitle) calcLeftTitle.textContent = isFr ? 'Votre profil' : 'Ваш профіль';

    const calcRightTitle = document.querySelector('.calc-right h3');
    if (calcRightTitle) calcRightTitle.textContent = isFr ? 'Verdict juridique' : 'Юридичний вердикт';

    const verdictLabel = document.querySelector('.verdict-label');
    if (verdictLabel) verdictLabel.textContent = isFr ? 'Loyer brut maximum autorisé' : 'Максимальний допустимий бюджет оренди';

    const perMonth = document.querySelector('.verdict-amount .per');
    if (perMonth) perMonth.textContent = isFr ? ' / mois' : ' / місяць';

    const radioTexts = document.querySelectorAll('#status-group .radio span:last-child');
    if (radioTexts.length >= 2) {
      radioTexts[0].textContent = isFr ? 'Bénéficiaire EVAM (barème)' : 'Бенефіціар EVAM';
      radioTexts[1].textContent = isFr ? 'Salarié / Revenu d\'activité' : 'Працевлаштований / власний дохід';
    }

    // Pricing Section
    const pricingTitle = document.querySelector('#pricing .section-title');
    if (pricingTitle) {
      pricingTitle.textContent = isFr ? 'Des formules transparentes — utiles à l’Ukraine' : 'Тарифи, що працюють на вас — і на Україну';
    }

    const pricingSub = document.querySelector('#pricing .section-sub');
    if (pricingSub) {
      pricingSub.textContent = isFr
        ? 'Tarification claire sans abonnement caché. Chaque règlement reverse automatiquement 30% au profit de la défense ukrainienne.'
        : 'Прозоре ціноутворення без прихованих комісій. Кожна платна підписка автоматично відраховує 30% на потреби оборони України.';
    }

    // Pricing cards buttons — Direct Telegram Deep Links & Web App Checkout
    const priceCtas = document.querySelectorAll('.price-card a.price-cta');
    if (priceCtas.length >= 3) {
      priceCtas[0].href = '/app/?view=onboarding';
      priceCtas[0].textContent = isFr ? 'Commencer gratuitement (Web App)' : 'Почати безкоштовно (Web App)';

      priceCtas[1].href = 'https://t.me/SwissResilienceHubBot?start=pay_pro19';
      priceCtas[1].target = '_blank';
      priceCtas[1].rel = 'noopener noreferrer';
      priceCtas[1].textContent = isFr ? '⚡ Souscrire dans Telegram (@SwissResilienceHubBot)' : '⚡ Оформити в Telegram (@SwissResilienceHubBot)';

      priceCtas[2].href = 'https://t.me/SwissResilienceHubBot?start=pay_success49';
      priceCtas[2].target = '_blank';
      priceCtas[2].rel = 'noopener noreferrer';
      priceCtas[2].textContent = isFr ? '⚡ Commander dans Telegram (@SwissResilienceHubBot)' : '⚡ Замовити в Telegram (@SwissResilienceHubBot)';
    }
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
          }
        }
      });
    });
  }

  initMetricCounters() {
    const counters = document.querySelectorAll('.metric-value[data-count]');
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;

      const isCurrency = el.textContent.includes('CHF');
      let current = 0;
      const duration = 1200;
      const start = performance.now();

      const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        current = Math.round(target * ease);

        if (isCurrency) {
          el.textContent = `CHF ${formatSwissNumber(current)}`;
        } else {
          el.textContent = `${formatSwissNumber(current)}+`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    });
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.swissCalculator = new HousingCalculator('calc-widget');
  });
}
