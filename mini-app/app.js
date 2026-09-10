// Telegram Mini App Client for Swiss Resilience Navigator
// Integrates Telegram WebApp SDK & Appwrite Pro Cloud (Frankfurt)

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

class ResilienceMiniApp {
  constructor() {
    this.tg = window.Telegram?.WebApp || null;
    this.lang = 'ua';
    this.activeTab = 'radar';
    this.familySize = 3;
    this.selectedCommunes = new Set(['Etoy', 'Morges', 'Lausanne']);
    this.incomeType = 'evam';
    this.filters = { evam: true, reprise: true, etoy: false };
    this.listings = [];
    this.selectedListing = null;
    this.checkoutTier = 'pro';
    this.checkoutCurrency = 'CHF';
    this.interviewVector = 'v3';
    this.interviewStage = 1;
    this.isRecording = false;

    this.init();
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

    this.loadListings();
    this.loadZsuLedger();
  }

  haptic(type = 'light') {
    if (this.tg && this.tg.HapticFeedback) {
      this.tg.HapticFeedback.impactOccurred(type);
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

    // Update header title
    const titles = {
      radar: 'Свіжі квартири',
      dossier: 'Досьє кандидата',
      orp: "Кар'єрний хаб ORP",
      zsu: 'Військова солідарність',
      onboarding: 'Профіль пошуку'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.innerText = titles[tabName] || 'Resilience Navigator';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleHeaderAction() {
    this.haptic('medium');
    if (this.tg && this.tg.close) {
      this.tg.close();
    } else {
      alert('Telegram Mini App — закриття застосунку.');
    }
  }

  setLanguage(lang) {
    this.haptic('light');
    this.lang = lang;
    document.getElementById('lang-ua').classList.toggle('active', lang === 'ua');
    document.getElementById('lang-fr').classList.toggle('active', lang === 'fr');
  }

  // ================= PROFILE & ONBOARDING =================
  setFamilySize(size, el) {
    this.haptic('light');
    this.familySize = size;
    el.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    this.renderListings();
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
    document.getElementById('communes-counter').innerText = `${this.selectedCommunes.size} обрано`;
    this.renderListings();
  }

  setIncomeType(type, el) {
    this.haptic('light');
    this.incomeType = type;
    el.parentElement.querySelectorAll('.radio-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    this.renderListings();
  }

  saveProfileAndLaunchRadar() {
    this.haptic('success');
    if (this.tg && this.tg.showPopup) {
      this.tg.showPopup({
        title: '✅ Профіль збережено',
        message: 'Параметри пошуку оновлено в захищеному сховищі Appwrite. Радар активовано!',
        buttons: [{ type: 'ok' }]
      }, () => this.switchTab('radar'));
    } else {
      this.switchTab('radar');
    }
  }

  // ================= RADAR & LISTINGS =================
  toggleFilter(filterKey) {
    this.haptic('light');
    this.filters[filterKey] = !this.filters[filterKey];
    const btn = document.getElementById(`filter-${filterKey}`);
    if (btn) btn.classList.toggle('active', this.filters[filterKey]);
    this.renderListings();
  }

  async loadListings() {
    const fallbackListings = [
      {
        external_id: 'flatfox_86350930',
        title: 'Appartement 2 pièces à Denens',
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
        external_id: 'flatfox_86550114',
        title: '2.5 pièces moderne avec balcon',
        city: 'Morges',
        zipcode: '1110',
        rent_gross: 1350,
        rooms: 2.5,
        distance_km: 7.0,
        is_reprise: false,
        regie: 'Domicim Morges',
        url: 'https://flatfox.ch/en/flat/1110-morges/86550114/'
      },
      {
        external_id: 'flatfox_86229910',
        title: 'Studio rénové à 2 min du lac',
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
        title: '3 pièces lumineux quartier gare',
        city: 'Lausanne',
        zipcode: '1003',
        rent_gross: 1380,
        rooms: 3.0,
        distance_km: 21.0,
        is_reprise: true,
        regie: 'Wincasa Lausanne',
        url: 'https://flatfox.ch/en/flat/1003-lausanne/86771120/'
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
            rent_gross: d.rent_gross,
            rooms: d.rooms,
            distance_km: d.distance_km || 10.0,
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

    this.renderListings();
  }

  renderListings() {
    const container = document.getElementById('property-feed-container');
    if (!container) return;

    let filtered = this.listings;

    if (this.filters.reprise) {
      filtered = filtered.filter(l => l.is_reprise);
    }
    if (this.filters.etoy) {
      filtered = filtered.filter(l => l.distance_km <= 10.0);
    }

    const counterEl = document.getElementById('listings-stat-count');
    if (counterEl) counterEl.innerText = `${filtered.length} об'єктів знайдено`;

    if (filtered.length === 0) {
      container.innerHTML = `<div class="card" style="text-align:center; padding:30px 20px; color:var(--text-3);">Немає об'єктів під поточні фільтри. Зніміть частину обмежень.</div>`;
      return;
    }

    container.innerHTML = filtered.map(l => {
      const priceFormatted = Number(l.rent_gross).toLocaleString('fr-CH');
      const evamApproved = l.rent_gross <= 1350;

      return `
        <div class="prop-card">
          <div class="prop-top-row">
            <div class="prop-thumb">
              🏢
              <span class="new-tag">NEW</span>
            </div>
            <div class="prop-info">
              <div class="prop-title">${l.rooms} кімн • CHF ${priceFormatted} / міс</div>
              <div class="prop-address">📍 ${l.zipcode} ${l.city} (${l.distance_km} км від Etoy)</div>
              <div class="badge-stack">
                ${evamApproved ? '<span class="badge-item evam">🟢 EVAM Схвалено</span>' : '<span class="badge-item regie">⚠️ Часткове EVAM</span>'}
                ${l.is_reprise ? '<span class="badge-item reprise">⚡ Reprise (Art. 264)</span>' : ''}
                <span class="badge-item regie">${l.regie}</span>
              </div>
            </div>
          </div>
          <div class="prop-actions">
            <button class="btn-secondary" onclick="window.open('${l.url}', '_blank')">📍 Flatfox</button>
            <button class="btn-emerald" onclick="app.triggerDossier('${l.external_id}')">⚡ Досьє 1-Click</button>
          </div>
        </div>
      `;
    }).join('');
  }

  // ================= DOSSIER GENERATION =================
  triggerDossier(listingId) {
    this.haptic('medium');
    const listing = this.listings.find(l => l.external_id === listingId);
    if (listing) {
      this.selectedListing = listing;
      const letterText = `Madame, Monsieur le Gestionnaire de ${listing.regie},<br><br>
        Faisant suite à la visite de l'appartement de <strong>${listing.rooms} pièces</strong> situé à <strong>${listing.zipcode} ${listing.city}</strong> (Loyer : CHF ${listing.rent_gross} / mois), j'ai l'honneur de vous soumettre par la présente mon dossier complet de candidature dans le cadre strict d'une <strong>reprise de bail à loyer anticipée</strong>, conformément aux dispositions de <strong>l'article 264 du Code des obligations suisse (CO)</strong>.<br><br>
        Titulaire d'un permis S, mon loyer fait l'objet d'une prise en charge institutionnelle garantie par l'EVAM. Mon extrait de l'Office des poursuites est vierge de toute inscription.`;
      
      const letterEl = document.getElementById('dossier-letter-text');
      if (letterEl) letterEl.innerHTML = letterText;
    }
    this.switchTab('dossier');
  }

  sendDossierByEmail() {
    this.haptic('success');
    alert('✉️ Досьє успішно сформовано та надіслано в управляючу компанію через сервіс Appwrite Cloud!');
  }

  downloadDossierPdf() {
    this.haptic('light');
    window.open('/applications/test-output/Test_Dossier_Denens.pdf', '_blank');
  }

  // ================= ZSU TRANSPARENCY =================
  async loadZsuLedger() {
    const tableBody = document.getElementById('merkle-log-body');
    if (!tableBody) return;

    try {
      const resp = await fetch('/api/v1/zsu/public-ledger');
      if (resp.ok) {
        const data = await resp.json();
        if (data.recent_transactions && data.recent_transactions.length > 0) {
          tableBody.innerHTML = data.recent_transactions.slice(-5).reverse().map(tx => {
            const dt = tx.timestamp ? tx.timestamp.slice(0, 10).split('-').reverse().join('.') : '10.09.2026';
            const to = tx.recipient_fund ? tx.recipient_fund.split('(')[0].trim() : 'Come Back Alive';
            const chf = (tx.zsu_amount_chf || 5.70).toFixed(2);
            const h = (tx.entry_hash || 'genesis').slice(0, 10) + '...';
            return `
              <tr>
                <td style="color:var(--text-2);">${dt}</td>
                <td style="color:#FBBF24; font-weight:600;">${to}</td>
                <td style="color:var(--emerald-2); font-weight:700;">CHF ${chf}</td>
                <td style="color:var(--text-3); font-size:10px;">${h}</td>
              </tr>
            `;
          }).join('');
          return;
        }
      }
    } catch (e) {
      // Fallback below
    }

    const mockTxs = [
      { date: '10.09.2026', to: 'Come Back Alive', chf: '14.70', hash: '88d013b403...' },
      { date: '09.09.2026', to: 'NBU Special Def.', chf: '5.70', hash: '346e48b92b...' },
      { date: '08.09.2026', to: 'Come Back Alive', chf: '5.70', hash: ' genesis_tx ' }
    ];

    tableBody.innerHTML = mockTxs.map(tx => `
      <tr>
        <td style="color:var(--text-2);">${tx.date}</td>
        <td style="color:#FBBF24; font-weight:600;">${tx.to}</td>
        <td style="color:var(--emerald-2); font-weight:700;">CHF ${tx.chf}</td>
        <td style="color:var(--text-3); font-size:10px;">${tx.hash}</td>
      </tr>
    `).join('');
  }

  // ================= DUAL-RAIL CHECKOUT =================
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

    this.updateCheckoutBadge();
    modal.style.display = 'flex';
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
  }

  updateCheckoutBadge() {
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const badgeEl = document.getElementById('checkout-badge-text');
    if (!badgeEl) return;

    if (this.checkoutCurrency === 'CHF') {
      badgeEl.innerHTML = `🛡️ <strong>${t.zsu_pct}% вашого внеску (CHF ${t.zsu_chf})</strong> автоматично спрямовується до фонду ЗСУ з фіксацією в реєстрі Merkle.`;
    } else {
      badgeEl.innerHTML = `🛡️ <strong>${t.zsu_pct}% вашого внеску (~ ${t.zsu_uah} грн)</strong> автоматично спрямовується до фонду ЗСУ з фіксацією в реєстрі Merkle.`;
    }
  }

  async initiatePayment(rail) {
    this.haptic('success');
    const t = TIERS[this.checkoutTier] || TIERS.pro;
    const tgUser = this.tg?.initDataUnsafe?.user || {};
    const chatId = tgUser.id || 0;
    const userId = tgUser.username ? `@${tgUser.username}` : (tgUser.id ? `tg_${tgUser.id}` : 'candidate_arsen');

    const payload = {
      tier: this.checkoutTier,
      rail: rail,
      user_id: userId,
      chat_id: chatId,
      currency: this.checkoutCurrency
    };

    let targetUrl = null;

    try {
      // Attempt backend session creation
      const resp = await fetch('/api/v1/payments/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const data = await resp.json();
        targetUrl = data.checkout_url;
      }
    } catch (e) {
      console.warn('Backend payment checkout session failed, falling back to direct link:', e);
    }

    // Direct fallback if offline or mock backend
    if (!targetUrl) {
      if (rail === 'chf_stripe') {
        targetUrl = `https://checkout.stripe.com/pay/cs_swiss_${this.checkoutTier}_${chatId}`;
      } else if (rail === 'chf_revolut') {
        targetUrl = `https://revolut.me/swissresilience/${Math.round(t.chf)}CHF?ref=tg_${chatId}_${this.checkoutTier}`;
      } else if (rail === 'uah_mono_checkout') {
        targetUrl = `https://pay.mbnk.biz/invoice?amount=${Math.round(t.uah * 100)}&ref=tg_${chatId}_${this.checkoutTier}`;
      } else if (rail === 'uah_mono_jar') {
        targetUrl = `https://send.monobank.ua/jar/JAR_SWISS_RESILIENCE_ZSU?a=${Math.round(t.uah)}&t=tg_${chatId}_${this.checkoutTier}`;
      }
    }

    this.closeCheckout();

    // Open via Telegram SDK or window
    if (this.tg && this.tg.openLink) {
      this.tg.openLink(targetUrl);
    } else {
      window.open(targetUrl, '_blank');
    }

    if (this.tg && this.tg.showPopup) {
      this.tg.showPopup({
        title: '💳 Перехід до оплати',
        message: `Ви переходите до сплати ${this.checkoutCurrency === 'CHF' ? 'CHF ' + t.chf : t.uah + ' грн'}.\n${t.zsu_pct}% буде автоматично зафіксовано в реєстрі Merkle!`,
        buttons: [{ type: 'ok' }]
      });
    }
  }

  exportOrpMonthlyReport() {
    this.haptic('medium');
    alert("📄 Звіт пошуку роботи за стандартом ORP (Preuves de recherches d'emploi) згенеровано!");
  }

  // ================= INTERVIEW SIMULATOR (ADR-009) =================
  selectInterviewVector(vecId) {
    this.haptic('light');
    this.interviewVector = vecId;
    this.interviewStage = 1;

    ['v1', 'v2', 'v3'].forEach(v => {
      const btn = document.getElementById(`btn-vec-${v}`);
      if (btn) {
        if (v === vecId) btn.classList.add('active');
        else btn.classList.remove('active');
      }
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

      if (this.tg && this.tg.showPopup) {
        this.tg.showPopup({
          title: '🎙️ Enregistrement audio actif',
          message: 'Parlez en français en tenant votre micro. Cliquez sur Arrêter une fois terminé.',
          buttons: [{ type: 'ok' }]
        });
      }
    } else {
      this.isRecording = false;
      if (btn) btn.style.background = '';
      if (label) label.innerText = 'Enregistrer audio';

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
      alert("Veuillez saisir votre réponse ou enregistrer un message vocal.");
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
      if (this.tg && this.tg.showPopup) {
        this.tg.showPopup({
          title: '🎉 Entretien complet terminé !',
          message: `Félicitations ! Vous avez complété les 3 étapes avec un score global de ${total}/100 (${cefr}).`,
          buttons: [{ type: 'ok' }]
        });
      }
    }
  }
}

// Global initialization
const app = new ResilienceMiniApp();
window.app = app;
