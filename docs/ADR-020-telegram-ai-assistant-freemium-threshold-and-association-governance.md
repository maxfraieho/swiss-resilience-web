# ADR-020: Telegram AI Co-Pilot Architecture, Freemium Economic Viability Thresholds, Swiss Association Governance, and Sonate Solidaire Cultural Integration

* **Status:** ACCEPTED
* **Date:** 2026-09-14
* **Deciders:** Lead Architect, Legal Compliance Adviser, Socio-Cultural Lead, FinTech & Operations Lead
* **Consulted:** Swiss Civil Code (Art. 60–79 CC), Federal Act on Employment Services (Art. 9 LSE), Canton de Vaud Tax Administration (ACI Vaud Exonération), Benevol Switzerland Volunteer Network Standards, Sonate Solidaire Initiative Committee

---

## 1. Context and Problem Statement

Following the establishment of the scraping matrix (ADR-019) and multi-cantonal scaling (ADR-014), two fundamental challenges have emerged in the rollout of the **Swiss Resilience Navigator**:

1. **User Onboarding & Funnel Retention:**
   - Visitors arriving at the web portal or Telegram Mini App (TMA) often view listings passively. However, real-time push alerts, instant match recommendations, and dossier generation are fundamentally delivered through the **Telegram Bot** (`@SwissResilienceHubBot`).
   - To maximize adoption, the web interface and TMA (Design 2.7) must actively articulate a compelling, human-centered value proposition—explaining why registration in the bot provides unmatched speed, privacy, and precision, without technical jargon or mentioning third-party aggregators.

2. **Human Mentor Scarcity & The Need for an AI Co-Pilot:**
   - Over 65,000 Ukrainian refugees under **Permis S** reside in Switzerland, navigating complex Swiss administrative hurdles: Swiss-standard CVs, housing application dossiers (*dossiers de candidature*), local tenant law (*Art. 262 CO*), and employment priority regulations (*Stellenmeldepflicht, Art. 21a LEI*).
   - While Swiss volunteers offer invaluable support under **Benevol Switzerland** standards, human mentors cannot scale instantly to thousands of families.
   - An **AI Co-Pilot** in the Telegram Bot is required to serve as an intelligent, empathetic surrogate mentor—deciphering vacancies, tailoring applications to Swiss etiquette, and preparing housing dossiers until a local volunteer is paired.
   - Host `.184` already hosts an enterprise-grade LLM proxy platform (`/opt/free-claude-code`, repository `free-claude-code-alpine`) with active routing across NVIDIA NIM, OpenRouter, and Anthropic models.

3. **Legal Entity Formalization & Swiss Association Governance:**
   - Under ADR-014, the platform operates as an *« Association en cours de constitution »*.
   - To sign institutional partnerships, receive cantonal subsidies (EVAM, Hospice Général, Loterie Romande), and ensure non-profit tax exemption (*exonération fiscale* under *Art. 56 LIFD* and *Art. 90 bis LI-VD*), the association must be formally constituted under **Articles 60–79 of the Swiss Civil Code (CC)** with an initiative group of Swiss residents.
   - The cultural initiative **Sonate Solidaire** (`sonate-solidaire.me`, tested on host `.184`) already possesses completed statutes, institutional correspondence (Philippe Leroy, EVAM v2), and cantonal partner lists. It provides the exact legal blueprint and can be integrated as the association's cultural integration pillar.

4. **Economic Viability & Freemium Transition Research:**
   - In accordance with the Federal Act on Private Employment Agencies (**Art. 9 LSE**), charging jobseekers fees for placement is strictly illegal. Basic housing/job search must remain 100% free.
   - The platform needs an empirical research model defining the **client volume inflection threshold** at which the project can transition from purely voluntary donations to a sustainable freemium/institutional model.

---

## 2. Decision Drivers

* **Empathetic & Jargon-Free UX (Design 2.7):** Clean, inspiring multi-lingual messaging (UA, FR, EN, DE) motivating bot registration.
* **Two-Sided Community Engagement:** Distinct onboarding for beneficiaries (job/housing seekers) and Swiss resident volunteers (housing hosts, career mentors).
* **AI Surrogate Mentorship:** 24/7 conversational assistance for Swiss CV tailoring, housing cover letters, and landlord/employer communication etiquette.
* **Zero-Cost LLM Proxy Infrastructure:** Reuse `/opt/free-claude-code` on host `.184` without new commercial API subscriptions.
* **Association Formalization (Art. 60–79 CC):** Formation with Swiss resident initiative group and integration of Sonate Solidaire.
* **Strict Legal Compliance:** Art. 9 LSE (free job access), Art. 75a CC (limited liability), and ACI Vaud tax-exemption standards.

---

## 3. Key Decisions & Architecture

```
                                  +-------------------------------------------------------------+
                                  |                 DESIGN 2.7 CONVERSION FUNNEL                |
                                  |   Web Portal & Mini App (UA / FR / EN / DE)                 |
                                  |   "Why SwissRelief?" + "Devenez Mentor Suisse"              |
                                  +------------------------------+------------------------------+
                                                                 |
                                        Deep-Link Routing        |
                               +---------------------------------+---------------------------------+
                               |                                                                   |
                               v                                                                   v
               +-------------------------------+                                   +-------------------------------+
               |   Beneficiary Seeker Track    |                                   |     Swiss Volunteer Track     |
               |   t.me/Bot?start=seeker       |                                   |   t.me/Bot?start=volunteer    |
               +---------------+---------------+                                   +---------------+---------------+
                               |                                                                   |
                               +---------------------------------+---------------------------------+
                                                                 v
                                  +-------------------------------------------------------------+
                                  |              TELEGRAM BOT (@SwissResilienceHubBot)          |
                                  |       Core Alerts + Multi-Cantonal Search + AI Co-Pilot      |
                                  +------------------------------+------------------------------+
                                                                 |
                                                    JSON-RPC / SSE over SSH
                                                                 |
                                                                 v
                                  +-------------------------------------------------------------+
                                  |          HOST .184: /opt/free-claude-code PROXY             |
                                  |    NVIDIA NIM / OpenRouter / Claude (Session & Limiter)     |
                                  +------------------------------+------------------------------+
                                                                 |
                                              +------------------+------------------+
                                              |                                     |
                                              v                                     v
                               +-----------------------------+       +-----------------------------+
                               |    Pillar 1: SwissRelief    |       |  Pillar 2: Sonate Solidaire |
                               |   Socio-Economic Platform   |       |  Cultural & Integration Hub |
                               +-----------------------------+       +-----------------------------+
                                              |                                     |
                                              +------------------+------------------+
                                                                 v
                                  +-------------------------------------------------------------+
                                  |         SWISS NON-PROFIT ASSOCIATION (Art. 60-79 CC)        |
                                  |   Swiss Resident Initiative Group | ACI Tax Exemption Vaud  |
                                  +-------------------------------------------------------------+
```

### 3.1 Telegram AI Co-Pilot Architecture

1. **Proxy Connection:**
   - The Telegram bot daemon communicates with the LLM proxy on host `192.168.3.184` running in `/opt/free-claude-code`.
   - The proxy utilizes `messaging/command_dispatcher.py` and `services/` to manage sessions, rate limiting, and prompt caching.
   - Under the hood, requests are routed to fast, cost-effective models (e.g., Llama 3.3 70B, Qwen 2.5, or Mistral Large via NVIDIA NIM / OpenRouter), ensuring response times under 2.5 seconds.

2. **Core AI Assistance Domains:**
   - **Swiss CV Tailoring:** Adjusts resumes to Swiss norms (professional photo placement, Swiss residency permit category, official language certifications according to CECR A1–C2, chronological structure without gaps).
   - **Vacancy Breakdown & Requirement Analysis:** Explains Swiss diplomas (AFP, CFC, Brevet fédéral), identifies whether a vacancy is subject to the 5-day *Stellenmeldepflicht* (Art. 21a LEI), and highlights missing prerequisite skills.
   - **Housing Dossier Assembly:** Guides users in structuring the Swiss *dossier de candidature* (Extrait de l'Office des poursuites, fiches de salaire / attestation de prise en charge EVAM/Hospice Général, copie pièce d'identité et Permis S).
   - **Polite Communication & Etiquette:** Generates culturally aligned Swiss French/German inquiry letters to landlords (*gérances*) and prospective employers, avoiding assertive phrasing while demonstrating solvency, cleanliness, and integration motivation.
   - **Surrogate Mentorship:** Provides immediate, empathetic 24/7 coaching while waiting for a matching human Swiss mentor.

### 3.2 Economic Viability & Freemium Transition Thresholds

To maintain financial self-sufficiency while complying with Swiss labor regulations (**Art. 9 LSE** - prohibition of placement fees), the platform adopts a phased economic model:

| Phase | Active Bot User Threshold | Operational Cost / Month | Revenue & Funding Model | Free vs Premium Boundary |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1: Community Beta** | **0 – 500 users** | ~$15 – $30 (Proxy bandwidth & server power) | 100% Free; voluntary solidarity donations via Telegram Stars, cards & crypto; ZSU split | 100% Free access to all jobs, housing, and basic AI features. |
| **Phase 2: Freemium Inflection** | **500 – 2,500 users** | ~$80 – $250 (Token consumption: ~50k tokens/user/mo) | Introduction of **Co-Pilot Pro** (CHF 9.00 / month) + Cantonal integration training vouchers | **Core Search & Alerts:** 100% Free forever (social mandate).<br>**Pro Tier:** Instant push (<60s), unlimited full-dossier PDF export, 1-on-1 human mentor fast-track. |
| **Phase 3: Institutional Scale** | **2,500+ users** | ~$500 – $1,200 (Multi-server clusters & premium LLM capacity) | Institutional B2B contracts with cantonal integration bodies (EVAM VD, Hospice Général GE, AOZ ZH, communes) at CHF 2,000–5,000/mo | Full Pro access subsidized by cantonal authorities for registered refugee jobseekers. |

**Break-Even Point:**
At Phase 2, with 1,500 active seekers, assuming a conservative 6% conversion rate to Co-Pilot Pro (90 subscribers @ CHF 9/mo = CHF 810/mo), the platform generates surplus revenue to fully cover infrastructure costs, proxy bandwidth, and seed funding for community volunteer activities.

### 3.3 Swiss Non-Profit Association (Art. 60–79 CC) & Governance Roadmap

1. **Founding Initiative Group:**
   - In accordance with Swiss practice, an initiative group of Swiss residents/citizens (based in Canton de Vaud / Romandie) is convened.
   - Governance structure:
     - **Président(e):** Swiss citizen/permanent resident ensuring institutional representation.
     - **Secrétaire:** Managing official correspondence, general assembly protocols, and member registry.
     - **Trésorier:** Overseeing non-profit bookkeeping, donation receipts, and annual financial statements.
     - **Signature collective à deux:** Mandatory dual-signature rule for all banking and contractual commitments to eliminate individual liability under Art. 75a CC.

2. **Documentation Package (Derived from Sonate Solidaire on host `.184`):**
   - **Statuts Officiels:** Incorporating non-profit aim (*but idéal*), non-lucrative operation, voluntary committee mandates (*gratuité des mandats*), and the mandatory tax-exemption dissolution clause transferring assets to an approved Swiss public-benefit organization.
   - **Procès-Verbal de l'Assemblée Générale Constitutive:** Formal adoption of statutes, election of organs, and authorization for bank account opening (BCV / PostFinance).
   - **Dossier d'Exonération Fiscale (ACI Vaud):** Formal submission to the *Administration cantonale des impôts* (Division personnes morales) for cantonal and federal tax exemption under Art. 56 let. g LIFD and Art. 90 bis LI-VD.

### 3.4 Integration of Sonate Solidaire as Cultural & Integration Pillar

1. **Unified Dual-Pillar Mission:**
   - **Pillar 1: Swiss Resilience Hub:** Socio-economic self-help, housing assistance, employment matchmaking, and administrative co-pilot.
   - **Pillar 2: Sonate Solidaire:** Cultural integration, charity concerts, classical music education, masterclasses, and Ukrainian refugee musician integration (led by Arsen Kovalenko and cultural mentors).

2. **Synergy Benefits:**
   - Broadens eligibility for Swiss grants: can apply to both social integration funds (Lotteriefonds / Loterie Romande, Swiss Red Cross, Caritas, cantonal cohesion funds) and cultural foundations (Fondation Leenaards, Pour-cent culturel Migros, Ville de Lausanne, Communes).
   - Fosters holistic community integration: combining economic dignity (job & housing) with cultural connection (music, shared concerts, French/Ukrainian exchange).

---

## 4. Design 2.7 Funnel & Multi-Lingual Copy Specifications

### 4.1 Narrative Guidelines
- **Zero Technical Jargon:** No mention of web scraping, crawlers, proxies, or backends. Focus exclusively on speed, freshness, dignity, and real results.
- **No Third-Party Mentions:** Never mention other specific portals or blocked aggregators. Present SwissRelief simply as the unified Swiss resilience intelligence platform.
- **Four-Language Parity:** Complete translations across Ukrainian (UA), French (FR), German (DE), and English (EN).

### 4.2 Value Proposition ("Why SwissRelief?")
1. **Швидкість, яка вирішує все (Speed that wins):** Пропозиції житла та вакансій з'являються в боті за лічені хвилини після публікації — ви встигаєте відгукнутися першими.
2. **ШІ-помічник для швейцарських стандартів (AI Swiss Co-Pilot):** Допомога в адаптації резюме (CV), написанні мотиваційного листа французькою чи німецькою, та формування бездоганного досьє на оренду.
3. **Підтримка місцевих волонтерів (Local Swiss Mentors):** Зв'язок із реальними швейцарськими резидентами, які готові підтримати, піти на перегляд житла або потренувати розмовну мову.
4. **Повна повага до вашого часу (Zero noise):** Жодних дублікатів та застарілих оголошень. Тільки перевірені пропозиції, що відповідають офіційним критеріям вашого кантону.

### 4.3 Swiss Volunteer Track ("Devenez Mentor / Hôte Solidaire")
- **Target Audience:** Swiss residents wishing to share knowledge, offer a room under Art. 262 CO, or mentor a newcomer in French/German and job applications.
- **Commitment:** Flexible (1 to 3 hours per week).
- **Registration Flow:**
  - Dedicated landing section: *« Vous souhaitez accompagner une famille ou un réfugié vers l'autonomie ? »*
  - Direct deep-link: `https://t.me/SwissResilienceHubBot?start=volunteer`
  - Bot onboarding asks: Canton of residence, spoken languages, area of mentoring (CV review, conversation, housing inspection accompaniment, spare room subletting).

---

## 5. Consequences & Next Steps

1. **Immediate:**
   - Commit ADR-020 to `projects/swiss-job-hunter` and `projects/swiss-resilience-web`.
   - Update `ai-memory` with page `decisions/adr-020-ai-copilot-freemium-threshold-association.md`.
   - Ingest facts and entities into Utopia Knowledge Graph on host `.251`.
2. **Design 2.7 Implementation:**
   - Generate the complete prompt artifact [PROMPT_GENSPARK_REDESIGN_PAN_SWISS_2_7.md](file:///home/vokov/.gemini/antigravity-cli/brain/5eb693e8-b86f-40fc-a2c5-20a08128c6c6/PROMPT_GENSPARK_REDESIGN_PAN_SWISS_2_7.md) detailing all screen states, conversion cards, and volunteer registration forms.
3. **Association Formation:**
   - Assemble the founding initiative group in Vaud.
   - Finalize unified statutes incorporating SwissRelief + Sonate Solidaire.
   - Schedule the Constitutive General Assembly.
