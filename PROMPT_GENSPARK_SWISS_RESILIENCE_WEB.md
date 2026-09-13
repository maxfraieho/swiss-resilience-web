# 🎯 MASTER PROMPT GENSPARK : SWISS-RESILIENCE-WEB (PAN-SWISS 2.6)
### Dépôt GitHub Officiel : https://github.com/maxfraieho/swiss-resilience-web
### Architecture Modulaire : React 18, Tailwind/Kit-v2 CSS, Pre-compiled Bundle (`build.cjs`), Telegram WebApp SDK

---

> **RÔLE POUR GENSPARK AI :**  
> Tu es un Lead Frontend Architect et UX/UI Designer d'élite. Tu travailles directement sur le code source de **https://github.com/maxfraieho/swiss-resilience-web**.  
> Ta mission est d'actualiser et de sublimer cette interface modulaire existante afin de :
> 1. **Maximiser l'acquisition et la conversion d'utilisateurs** (réfugiés avec Statut S et expatriés en Suisse) vers le bot Telegram `@swiss_relief_bot` et la Web Mini App (`/app`).
> 2. **Refléter 100% des nouvelles capacités du backend souverain** (agrégation source-agnostique ADR-018, SBB Transit Mobility Engine, générateur de dossier régie 1-clic, barèmes EVAM et réseau Benevol).
> 3. **Conserver une conformité juridique suisse absolue** (Art. 5 LCD / UWG, Art. 21a LEI, Art. 253/262 CO) avec ZÉRO fuite de marques de portails donneurs (*Flatfox, ImmoScout24, Homegate, Jobs.ch*).

---

## 1. 📁 STRUCTURE DES COMPOSANTS CIBLES DANS LE RÉPERTOIRE

Le projet est déjà découpé en composants modulaires propres réunis par `build.cjs` :

```
swiss-resilience-web/
├── Nav.jsx                 # Header desktop, dropdown langue, burger menu
├── MobileDrawer.jsx        # Tiroir mobile plein écran (100dvh) avec grille 2x2 de langues
├── Hero.jsx                # Hero section avec tabs Seekers / Solidarity et trust badges
├── ServiceSwitcher.jsx     # Barre d'accès rapide aux 5 services pan-suisses
├── CantonCalculator.jsx    # Calculateur de plafonds de loyer (26 cantons) + listings régies
├── ProfessionSelector.jsx  # Radar des métiers CH-ISCO & Alerte Stellenmeldepflicht (Art. 21a LEI)
├── Sublease.jsx            # Wizard sous-location (Art. 262 CO) & Générateur Dossier Régie
├── BenevolMentors.jsx      # Réseau de mentors bénévoles (Art. 394 CO)
├── BetaDonation.jsx        # Modèle Bêta Gratuite + 30% Solidarité ZSU (Merkle Ledger)
├── Footer.jsx              # Pied de page institutionnel suisse & liens légaux
├── app.jsx                 # Racine React & initialisation Telegram WebApp SDK
├── build.cjs               # Script de compilation vers app-bundle.js
├── kit-v2.css / styles.css # Design system Dark Titanium (#070B12) & Rouge Fédéral (#D52B1E)
└── data.js / i18n.js       # Données des 26 cantons, barèmes sociaux et traductions
```

---

## 2. 🎯 AXE 1 : ACQUISITION D'UTILISATEURS & CTA HAUTE CONVERSION

### 2.1 Hero Section (`Hero.jsx`) : Intégration du Dual CTA
Dans `Hero.jsx`, juste sous `<p className="v2-hero-sub">{t.hero.lede}</p>` et avant les tabs, insérer un bloc d'action immédiate :

```jsx
<div className="v2-hero-cta-group">
  <a 
    href="https://t.me/swiss_relief_bot?start=web_hero" 
    target="_blank" 
    rel="noopener noreferrer"
    className="v2-btn v2-btn-primary v2-btn-tg"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
    <span>{lang === 'uk' ? '🚀 Відкрити в Telegram (@swiss_relief_bot)' : '🚀 Ouvrir dans Telegram'}</span>
  </a>

  <a 
    href="/app/" 
    className="v2-btn v2-btn-secondary"
  >
    <span>{lang === 'uk' ? '📱 Запустити Web Mini App' : '📱 Lancer la Web Mini App'}</span>
  </a>
</div>
```

### 2.2 Telegram WebApp SDK (`app.jsx`)
Dans `app.jsx`, s'assurer de l'activation native du SDK Telegram dans un `useEffect` :
```javascript
useEffect(() => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    
    // Adaptation du thème Telegram
    document.documentElement.style.setProperty('--tg-bg', tg.backgroundColor || '#070B12');
    
    // MainButton Telegram pointant sur la recherche de logement
    tg.MainButton.setText(lang === 'uk' ? "🏠 ПЕРЕВІРИТИ ЖИТЛО ТА РОБОТУ" : "🏠 EXPLORER LE LOGEMENT EN ROMANDIE");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      const calcEl = document.getElementById('calc');
      if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
}, [lang]);
```

---

## 3. ⚡ AXE 2 : CAPACITÉS BACKEND SOUVERAIN (ADR-018 & SOURCE-AGNOSTIC)

### 3.1 Cartes Logement Régies & Mobilité SBB (`CantonCalculator.jsx`)
Sous le sélecteur de canton et le barème EVAM, afficher des exemples réels de logements avec le composant **SBB Transit Pill** et l'attribution directe à une gérance :

* **Gérance officielle :** *Gérance Immobilière Bernard Nicod*, *Régie Domicim*, *Naef Immobilier*, *Propriétaire Privé (Art. 262 CO)*.
* **ZÉRO MENTION de Flatfox, ImmoScout24 ou Homegate** (Protection absolue Art. 5 LCD / UWG).
* **Pill Mobilité SBB :**  
  `🚆 SBB Transit : 24 min jusqu'à Morges · 1 correspondance`
* **Contrôle Plafonds Sociaux :**  
  `🟢 Conforme barème EVAM Vaud & règle des 33%`
* **CTA Carte :**  
  `[ 📄 Générer Dossier Régie 1-Click ]` -> Fait défiler jusqu'au générateur de dossier pré-rempli.

### 3.2 Générateur de Dossier Régie 1-Clic (`Sublease.jsx`)
Ajouter un onglet ou volet dédié à la génération du **Courrier Officiel de Candidature Locative (Art. 253 CO)** :
* Formulaire rapide : Nom complet, Permis S / N° de dossier cantonal, Prise en charge EVAM / Salaire, Extrait de l'Office des poursuites vierge.
* Aperçu en direct d'un courrier formel en français soigné destiné à la gérance immobilière avec bouton `[ 📋 Copier le courrier ]` et `[ 🖨️ Imprimer / PDF ]`.

### 3.3 Priorité Métiers & Emploi (`ProfessionSelector.jsx`)
Mettre en valeur le respect de l'**Art. 21a LEI (Stellenmeldepflicht)** :
* Alerte 5 jours de priorité légale pour les résidents et titulaires du Permis S.
* Affichage des salaires conformes aux CCT (Conventions Collectives de Travail).

### 3.4 Bêta 100% Gratuite & Transparence ZSU (`BetaDonation.jsx`)
* Mettre en exergue : **« Bêta Publique Ouverte — 100% Gratuite & Sans Engagement »**.
* Afficher la répartition solidaire post-bêta : **70% Infrastructure & Sécurité / 30% Soutien aux Forces Armées Ukrainiennes (ZSU)** avec affichage de l'empreinte Merkle SHA-256 en direct.

---

## 4. 🎨 AXE 3 : POLISH DESIGN & CONFORMITÉ MOBILE

### 4.1 Header & Tiroir Mobile (`Nav.jsx` & `MobileDrawer.jsx`)
* Vérifier que le tiroir mobile s'ouvre bien en plein écran (`100dvh`) sans être tronqué à 120px (résolution de la contrainte `backdrop-filter`).
* La sélection des 4 langues (**🇫🇷 FR, 🇩🇪 DE, 🇮🇹 IT, 🇺🇦 UK**) dans le menu sandwich se fait via une grille 2×2 tactile qui se referme automatiquement au clic.

### 4.2 Styles CSS (`kit-v2.css` / `styles.css`)
Boutons d'action Hero recommandés :
```css
.v2-hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 24px 0 32px;
}
.v2-btn-tg {
  background: #24A1DE !important;
  color: #FFFFFF !important;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(36, 161, 222, 0.35);
}
.v2-btn-tg:hover {
  background: #1F8EC4 !important;
  transform: translateY(-1px);
}
.v2-sbb-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 9999px;
  font-family: var(--v2-font-mono, monospace);
  font-size: 12px;
  background: rgba(213, 43, 30, 0.12);
  color: #F87171;
  border: 1px solid rgba(213, 43, 30, 0.3);
}
```

---

## 5. 🛠️ WORKFLOW DE RE-COMPILATION OBLIGATOIRE

Après modification des fichiers `.jsx` :
```bash
# 1. Compiler le bundle de production unifié
node build.cjs

# 2. Vérifier la création de app-bundle.js et app-bundle.jsx
ls -lh app-bundle.js

# 3. Vérifier que index.html et app/index.html chargent correctement app-bundle.js
```

---

## 6. ✅ CRITÈRES DE VALIDATION
1. `Hero.jsx` contient les deux boutons CTA bien visibles avec lien vers `t.me/swiss_relief_bot?start=web_hero` et `/app/`.
2. Zéro fuite de marques tierces (Flatfox/ImmoScout) dans tout le code.
3. Le bundle `app-bundle.js` est recompilé avec succès via `node build.cjs`.
4. L'expérience mobile (360px–412px) est fluide, le drawer couvre 100dvh, et le sélecteur 2×2 fonctionne.
