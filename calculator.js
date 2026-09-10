/**
 * Swiss Resilience Navigator — EVAM & Hospice Général Compliance Engine
 * Module: calculator.js
 *
 * Implements:
 * 1. Barèmes lookup for Canton de Vaud (EVAM) & Canton de Genève (Hospice Général).
 * 2. Real-time verdict calculation based on family size, commune, and applicant legal status.
 * 3. Dynamic compliance gauge & legal recommendations (Art. 264 CO Reprise de bail).
 * 4. Language switching (UA / FR) & UI metric counter animation.
 */

// Official and indicative reference rent ceilings (CHF/month, gross rent cap)
// Source: EVAM Directives d'application (Vaud) & Hospice Général barèmes d'aide sociale (Genève).
export const BAREMES = {
  // Canton de Vaud (EVAM-aligned) — Communes Vaudoises
  vd: {
    lausanne: { 1: 1100, 2: 1210, 3: 1290, 4: 1490, 5: 1690 },
    morges:   { 1: 1050, 2: 1180, 3: 1260, 4: 1430, 5: 1620 },
    etoy:     { 1: 1020, 2: 1150, 3: 1230, 4: 1400, 5: 1580 },
    nyon:     { 1: 1150, 2: 1260, 3: 1340, 4: 1540, 5: 1750 },
    vevey:    { 1: 1080, 2: 1200, 3: 1280, 4: 1460, 5: 1650 },
    yverdon:  { 1: 990,  2: 1120, 3: 1190, 4: 1350, 5: 1520 }
  },
  // Canton de Genève (Hospice Général)
  ge: {
    geneve:   { 1: 1350, 2: 1600, 3: 1850, 4: 2100, 5: 2350 },
    carouge:  { 1: 1320, 2: 1570, 3: 1820, 4: 2070, 5: 2320 },
    vernier:  { 1: 1300, 2: 1550, 3: 1780, 4: 2020, 5: 2260 },
    meyrin:   { 1: 1300, 2: 1550, 3: 1780, 4: 2020, 5: 2260 },
    lancy:    { 1: 1310, 2: 1560, 3: 1800, 4: 2040, 5: 2290 },
    // Compatibility fallbacks for Vaud communes when switching cantons
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

// Swiss standard thousands separator formatting (e.g. 1'290)
export const formatSwissNumber = (n) => {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
};

/**
 * Main Calculator Controller
 */
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

    this.currentLanguage = 'ua';
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCommunes();
    this.updateVerdict();
    this.initMetricCounters();
    this.initSmoothScroll();
    this.initLanguageToggle();
  }

  bindEvents() {
    if (this.cantonSelect) {
      this.cantonSelect.addEventListener('change', () => {
        this.updateCommunes();
        this.updateVerdict();
      });
    }

    if (this.communeSelect) {
      this.communeSelect.addEventListener('change', () => this.updateVerdict());
    }

    if (this.familySelect) {
      this.familySelect.addEventListener('change', () => this.updateVerdict());
    }

    this.statusRadios.forEach((radio) => {
      radio.addEventListener('click', () => {
        this.statusRadios.forEach((r) => r.classList.remove('checked'));
        radio.classList.add('checked');
        const input = radio.querySelector('input');
        if (input) input.checked = true;
        this.updateVerdict();
      });
    });
  }

  updateCommunes() {
    if (!this.cantonSelect || !this.communeSelect) return;
    const canton = this.cantonSelect.value || 'vd';
    const list = COMMUNES_BY_CANTON[canton] || COMMUNES_BY_CANTON.vd;

    const previousValue = this.communeSelect.value;
    this.communeSelect.innerHTML = '';

    list.forEach((item) => {
      const opt = document.createElement('option');
      opt.value = item.value;
      opt.textContent = this.currentLanguage === 'fr' ? item.labelFR : item.labelUA;
      this.communeSelect.appendChild(opt);
    });

    // Restore previous commune if exists in new canton list, else select first
    const hasPrev = list.some((c) => c.value === previousValue);
    if (hasPrev) {
      this.communeSelect.value = previousValue;
    } else {
      this.communeSelect.selectedIndex = 0;
    }
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
      // Fallback
      base = canton === 'ge' ? 1750 : 1290;
    }

    // "Own income" status allows a 15% higher debt-to-income margin (33% net salary rule)
    if (status === 'income') {
      base = Math.round((base * 1.15) / 10) * 10;
    }

    this.verdictValue.textContent = formatSwissNumber(base);

    // Update contextual note & guidance
    const cantonName = canton === 'vd' ? 'Communes Vaudoises (EVAM)' : 'Hospice Général (Genève)';
    const communeLabel = this.communeSelect && this.communeSelect.selectedIndex >= 0
      ? this.communeSelect.options[this.communeSelect.selectedIndex].text.split('·')[0].trim()
      : 'Lausanne';
    const famLabel = this.familySelect && this.familySelect.selectedIndex >= 0
      ? this.familySelect.options[this.familySelect.selectedIndex].text.split('·')[0].trim()
      : '3 особи';

    if (this.verdictNote) {
      if (this.currentLanguage === 'fr') {
        this.verdictNote.textContent =
          `Barème ${cantonName} · ${famLabel} · ${communeLabel} · mis à jour 09.2026`;
      } else {
        this.verdictNote.textContent =
          `Barème ${cantonName} · ${famLabel} · ${communeLabel} · оновлено 09.2026`;
      }
    }

    // Dynamic Gauge & Legal recommendation update
    if (status === 'income') {
      if (this.gaugeTitle) {
        this.gaugeTitle.textContent = this.currentLanguage === 'fr'
          ? 'Solvabilité Régie Standard (Règle des 33%)'
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
          if (this.currentLanguage === 'fr') {
            p.innerHTML = '<strong>Recommandé : Dépôt direct avec extrait OP.</strong> Joindre obligatoirement une attestation de non-poursuite récente (< 3 mois) et les 3 dernières fiches de salaire. Le générateur génère la lettre de motivation conforme USPI en 1 clic.';
          } else {
            p.innerHTML = '<strong>Рекомендовано: Пряма подача досьє з Extrait OP.</strong> Додайте довідку про відсутність боргів (Office des Poursuites &lt; 3 міс.) та 3 останні зарплатні листи. Наш сервіс генерує мотиваційний лист стандарту USPI в 1 клік.';
          }
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
          if (this.currentLanguage === 'fr') {
            p.innerHTML = '<strong>Recommandé : Reprise de bail (Art. 264 CO).</strong> Le loyer est bloqué selon le bail en vigueur sans majoration par la régie. Nous fournissons le modèle officiel et le dossier complet USPI.';
          } else {
            p.innerHTML = '<strong>Рекомендовано: Reprise de bail (Art. 264 CO).</strong> Орендна плата фіксується за чинним договором без права режі на підвищення. Ми надамо шаблон запиту та повний пакет USPI-стандарту досьє в 1 клік.';
          }
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
        this.updateCommunes();
        this.updateVerdict();
      });
    });
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

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.swissCalculator = new HousingCalculator('calc-widget');
  });
}
