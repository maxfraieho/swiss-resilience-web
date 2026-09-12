function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Swiss Resilience Navigator 2.5 — Consolidated Bundle */

// ==================== [Module: shared.jsx] ====================
// Shared atoms / icons / helpers for Swiss Resilience Navigator 2.5
const {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback
} = React;

// ---------- Formatting ----------
const chf = n => new Intl.NumberFormat('de-CH', {
  maximumFractionDigits: 0
}).format(Math.round(n)).replace(/,/g, "'");

// ---------- Language tag / flag helpers ----------
const LANG_FLAGS = {
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  uk: "🇺🇦"
};
const LANG_LABEL = {
  fr: "FR",
  de: "DE",
  it: "IT",
  uk: "UK"
};

// ---------- Brand mark: Swiss cross + compass overlay ----------
function BrandMark({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "1",
    width: "22",
    height: "22",
    rx: "4",
    fill: "#D52B1E"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10.5",
    y: "5",
    width: "3",
    height: "14",
    fill: "#F8FAFC"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "10.5",
    width: "14",
    height: "3",
    fill: "#F8FAFC"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "#D97706",
    strokeWidth: "0.6",
    opacity: "0.55",
    fill: "none"
  }));
}

// ---------- Simple stroke icons ----------
const I = {
  arrow: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  })),
  send: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })),
  check: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  warn: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  })),
  shield: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })),
  x: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })),
  star: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 2 15 8l6 .9-4.5 4.4L18 20l-6-3.2L6 20l1.5-6.7L3 8.9 9 8z"
  })),
  hash: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "9",
    x2: "20",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "15",
    x2: "20",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "3",
    x2: "8",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "3",
    x2: "14",
    y2: "21"
  })),
  house: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 12 12 3l9 9M5 10v10h14V10"
  })),
  heart: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })),
  lock: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })),
  euro: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"
  })),
  chart: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 15l4-4 3 3 5-6"
  })),
  users: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  menu: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })),
  chevron: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))
};

// ---------- Merkle root cosmetic rotator (session mock) ----------
function useSessionMerkle() {
  const [root] = useState(() => {
    // regenerate a cosmetic 64-char hex per session so it feels live
    const hex = "0123456789abcdef";
    let s = "0x";
    for (let i = 0; i < 64; i++) s += hex[Math.floor(Math.random() * 16)];
    return s;
  });
  return root;
}
Object.assign(window, {
  chf,
  LANG_FLAGS,
  LANG_LABEL,
  BrandMark,
  I,
  useSessionMerkle
});

// ==================== [Module: side-a.jsx] ====================
// Side A: Chercheurs — Barème calculator + CH-ISCO cascade
const {
  useState: uSA,
  useMemo: mSA,
  useEffect: eSA
} = React;

// ============================================================
// TOP BANNER (Radical Honesty)
// ============================================================
function TopBanner({
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "top-banner",
    role: "status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "top-banner-dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "top-banner-full"
  }, t.banner)));
}

// ============================================================
// NAVBAR
// ============================================================
// NAVBAR (Sandwich Mobile Drawer & Dropdown Language Switcher)
// ============================================================
function Navbar({
  t,
  lang,
  onLang,
  side,
  onSide,
  onDonate
}) {
  const [langOpen, setLangOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close dropdown on outside click or escape
  React.useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest('.lang-dropdown-container')) setLangOpen(false);
    };
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  const navigateToService = (targetSide, sectionId) => {
    if (targetSide && onSide) onSide(targetSide);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({
        behavior: 'smooth'
      });
    }, 60);
  };
  const servicesList = [{
    id: 'calc',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(I.house, null),
    label: t.nav?.calc || "Barèmes 26 Cantons",
    sub: "EVAM · Hospice · AOZ · 26 Cantons"
  }, {
    id: 'prof',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(I.chart, null),
    label: t.nav?.profession || "Métiers CH-ISCO",
    sub: "Art. 21a LEI · CH-ISCO-19"
  }, {
    id: 'sublease',
    side: 'b',
    icon: /*#__PURE__*/React.createElement(I.shield, null),
    label: lang === 'uk' ? 'Суборенда (ст. 262 CO)' : lang === 'de' ? 'Untermiete (Art. 262 OR)' : lang === 'it' ? 'Sublocazione (Art. 262 CO)' : 'Sous-location (Art. 262 CO)',
    sub: "10–20% Möblierung · ASLOCA"
  }, {
    id: 'mentors',
    side: 'b',
    icon: /*#__PURE__*/React.createElement(I.users, null),
    label: lang === 'uk' ? 'Ментори (Benevol)' : lang === 'de' ? 'Mentoren (Benevol)' : lang === 'it' ? 'Mentori (Benevol)' : 'Mentors (Benevol)',
    sub: "Art. 394 CO · Mandat bénévole"
  }, {
    id: 'beta',
    side: null,
    icon: /*#__PURE__*/React.createElement(I.lock, null),
    label: lang === 'uk' ? 'Бета-тарифи' : lang === 'de' ? 'Beta-Tarife' : lang === 'it' ? 'Tariffe Beta' : 'Tarifs Bêta (Gratuit)',
    sub: "0 CHF · Inactif en Bêta"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "nav-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nav",
    "aria-label": "Main navigation"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "brand",
    "aria-label": "SwissRelief 2.6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "SwissRelief", /*#__PURE__*/React.createElement("span", null, "2.6 \xB7 Pan-Swiss"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("button", {
    className: `nav-link-btn ${side === 'a' ? 'active-side' : ''}`,
    onClick: () => navigateToService('a', 'calc')
  }, t.nav?.calc || "Barèmes"), /*#__PURE__*/React.createElement("button", {
    className: `nav-link-btn ${side === 'a' ? 'active-side' : ''}`,
    onClick: () => navigateToService('a', 'prof')
  }, t.nav?.profession || "CH-ISCO"), /*#__PURE__*/React.createElement("button", {
    className: `nav-link-btn ${side === 'b' ? 'active-side' : ''}`,
    onClick: () => navigateToService('b', 'sublease')
  }, lang === 'uk' ? 'Суборенда 262' : lang === 'de' ? 'Untermiete 262' : lang === 'it' ? 'Sublocazione 262' : 'Sous-location 262'), /*#__PURE__*/React.createElement("button", {
    className: `nav-link-btn ${side === 'b' ? 'active-side' : ''}`,
    onClick: () => navigateToService('b', 'mentors')
  }, lang === 'uk' ? 'Ментори' : lang === 'de' ? 'Mentoren' : lang === 'it' ? 'Mentori' : 'Mentors'), /*#__PURE__*/React.createElement("button", {
    className: "nav-link-btn",
    onClick: () => navigateToService(null, 'beta')
  }, t.nav?.transparency || "Transparence")), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-dropdown-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lang-select-btn",
    onClick: e => {
      e.stopPropagation();
      setLangOpen(!langOpen);
    },
    "aria-expanded": langOpen,
    "aria-label": "S\xE9lectionner la langue"
  }, /*#__PURE__*/React.createElement("span", null, LANG_FLAGS[lang]), /*#__PURE__*/React.createElement("span", {
    className: "lang-code"
  }, LANG_LABEL[lang]), /*#__PURE__*/React.createElement(I.chevron, {
    style: {
      transform: langOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform .18s'
    }
  })), langOpen && /*#__PURE__*/React.createElement("div", {
    className: "lang-dropdown-menu",
    role: "menu"
  }, ['fr', 'de', 'it', 'uk'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `lang-dropdown-item ${l === lang ? 'active' : ''}`,
    onClick: () => {
      onLang(l);
      setLangOpen(false);
    },
    role: "menuitem"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flag"
  }, LANG_FLAGS[l]), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, window.I18N?.[l]?.lang || l.toUpperCase()), l === lang && /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, /*#__PURE__*/React.createElement(I.check, null)))))), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-ghost nav-bot-link"
  }, /*#__PURE__*/React.createElement(I.send, null), " ", /*#__PURE__*/React.createElement("span", null, "@SwissResilienceHubBot")), /*#__PURE__*/React.createElement("button", {
    onClick: onDonate,
    className: "btn btn-primary nav-donate-btn",
    "aria-label": "Faire un don"
  }, /*#__PURE__*/React.createElement(I.heart, null), " ", /*#__PURE__*/React.createElement("span", null, lang === 'de' ? 'Spenden' : lang === 'it' ? 'Dona' : lang === 'uk' ? 'Пожертва' : 'Faire un don')), /*#__PURE__*/React.createElement("button", {
    className: "hamburger-btn",
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
    "aria-label": "Menu principal",
    "aria-expanded": mobileMenuOpen
  }, mobileMenuOpen ? /*#__PURE__*/React.createElement(I.x, null) : /*#__PURE__*/React.createElement(I.menu, null)))), /*#__PURE__*/React.createElement("div", {
    className: "service-banner",
    role: "navigation",
    "aria-label": "Services Swiss Resilience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-banner-inner"
  }, servicesList.map((s, idx) => {
    const isSideActive = s.side === side;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: `service-btn ${isSideActive ? s.side === 'b' ? 'active side-b' : 'active' : ''}`,
      onClick: () => navigateToService(s.side, s.id),
      title: s.sub
    }, /*#__PURE__*/React.createElement("div", {
      className: "svc-top-line"
    }, /*#__PURE__*/React.createElement("span", {
      className: "svc-num"
    }, idx + 1, ". ", s.side ? s.side === 'a' ? lang === 'uk' ? 'Шукачі' : 'Chercheurs' : lang === 'uk' ? 'Солідарні' : 'Solidaires' : 'Bêta'), /*#__PURE__*/React.createElement("span", {
      className: `svc-badge ${s.side === 'a' ? 'badge-a' : s.side === 'b' ? 'badge-b' : 'badge-free'}`
    }, s.side === 'a' ? 'Côté A' : s.side === 'b' ? 'Côté B' : '0 CHF')), /*#__PURE__*/React.createElement("div", {
      className: "svc-label-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "svc-icon"
    }, s.icon), /*#__PURE__*/React.createElement("span", {
      className: "svc-label"
    }, s.label)));
  })))), mobileMenuOpen && ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    className: "mobile-drawer-overlay",
    onClick: () => setMobileMenuOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-drawer",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "SwissRelief ", /*#__PURE__*/React.createElement("span", null, "2.6 \xB7 Pan-Swiss"))), /*#__PURE__*/React.createElement("button", {
    className: "drawer-close",
    onClick: () => setMobileMenuOpen(false),
    "aria-label": "Fermer"
  }, /*#__PURE__*/React.createElement(I.x, null))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Мова інтерфейсу' : lang === 'de' ? 'Sprache' : lang === 'it' ? 'Lingua' : 'Langue'), /*#__PURE__*/React.createElement("div", {
    className: "drawer-lang-grid"
  }, ['fr', 'de', 'it', 'uk'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `drawer-lang-btn ${l === lang ? 'active' : ''}`,
    onClick: () => {
      onLang(l);
      setMobileMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "flag"
  }, LANG_FLAGS[l]), /*#__PURE__*/React.createElement("span", null, window.I18N?.[l]?.lang || l.toUpperCase()))))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Усі сервіси' : lang === 'de' ? 'Alle Dienste' : lang === 'it' ? 'Tutti i servizi' : 'Tous les services'), /*#__PURE__*/React.createElement("div", {
    className: "drawer-services-list"
  }, servicesList.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: "drawer-service-item",
    onClick: () => navigateToService(s.side, s.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-icon"
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    className: "service-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "service-label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "service-sub"
  }, s.sub)), /*#__PURE__*/React.createElement(I.arrow, null))))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setMobileMenuOpen(false);
      onDonate();
    },
    className: "btn btn-primary btn-lg",
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(I.heart, null), " ", lang === 'de' ? 'Spenden' : lang === 'it' ? 'Dona' : lang === 'uk' ? 'Пожертва' : 'Faire un don de soutien'), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-ghost btn-lg",
    style: {
      width: '100%',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(I.send, null), " @SwissResilienceHubBot")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-legal"
  }, "Association Swiss Resilience en cours de constitution (Art. 60\u201379 CC Suisse)"))), document.body));
}

// ============================================================
// HERO with two-sided tab switcher
// ============================================================
function Hero({
  t,
  side,
  onSide
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "26 CANTONS \xB7 4 LANGUES \xB7 MERKLE SHA-256"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, t.hero.title), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, t.hero.lede), /*#__PURE__*/React.createElement("div", {
    className: "hero-tabs",
    role: "tablist",
    "aria-label": "Platform side"
  }, /*#__PURE__*/React.createElement("button", {
    className: `hero-tab tab-a ${side === 'a' ? 'active' : ''}`,
    onClick: () => onSide('a'),
    role: "tab",
    "aria-selected": side === 'a'
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, /*#__PURE__*/React.createElement(I.users, null)), /*#__PURE__*/React.createElement("span", null, t.tabs.seekers, /*#__PURE__*/React.createElement("span", {
    className: "hero-tab-sub"
  }, t.tabs.seekersSub))), /*#__PURE__*/React.createElement("button", {
    className: `hero-tab tab-b ${side === 'b' ? 'active' : ''}`,
    onClick: () => onSide('b'),
    role: "tab",
    "aria-selected": side === 'b'
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, /*#__PURE__*/React.createElement(I.heart, null)), /*#__PURE__*/React.createElement("span", null, t.tabs.solidarity, /*#__PURE__*/React.createElement("span", {
    className: "hero-tab-sub"
  }, t.tabs.solSub)))), /*#__PURE__*/React.createElement("div", {
    className: "metrics",
    role: "list"
  }, t.hero.metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `metric ${['', 'v-crimson', 'v-gold', 'v-blue'][i] || ''}`,
    role: "listitem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, m.k), /*#__PURE__*/React.createElement("div", {
    className: "metric-value"
  }, m.v), /*#__PURE__*/React.createElement("div", {
    className: "metric-desc"
  }, m.d))))));
}

// ============================================================
// 26-CANTON CALCULATOR
// ============================================================
function CantonCalculator({
  t,
  lang
}) {
  const [canton, setCanton] = uSA("VD");
  const [size, setSize] = uSA("3");
  const [rentType, setRentType] = uSA("brut"); // brut | net
  const [testRent, setTestRent] = uSA(1400);
  const c = window.CANTONS.find(x => x.code === canton);
  const ceiling = c.ceilings[size];

  // Adjust ceiling display for rent-type mismatch (approx: net = brut * 0.85)
  const displayCeiling = mSA(() => {
    if (c.basis === rentType) return ceiling;
    if (c.basis === "brut" && rentType === "net") return Math.round(ceiling * 0.85);
    return Math.round(ceiling / 0.85);
  }, [c, ceiling, rentType]);
  const over = testRent - displayCeiling;
  const compliant = over <= 0;
  return /*#__PURE__*/React.createElement("section", {
    id: "calc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, t.calc.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, t.calc.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, t.calc.lede), /*#__PURE__*/React.createElement("div", {
    className: "calc-grid",
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "canton-sel"
  }, t.calc.canton), /*#__PURE__*/React.createElement("select", {
    id: "canton-sel",
    className: "select",
    value: canton,
    onChange: e => setCanton(e.target.value)
  }, window.CANTONS.map(x => /*#__PURE__*/React.createElement("option", {
    key: x.code,
    value: x.code
  }, x.code, " \xB7 ", x.name[lang])))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, t.calc.household), /*#__PURE__*/React.createElement("div", {
    className: "pill-group"
  }, ["1", "2", "3", "4", "5"].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    className: `pill-btn ${size === s ? 'active' : ''}`,
    onClick: () => setSize(s)
  }, t.calc.persons(Number(s)), s === "5" ? "+" : "")))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, t.calc.rentType), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: rentType === 'brut' ? 'active' : '',
    onClick: () => setRentType('brut')
  }, t.calc.brut), /*#__PURE__*/React.createElement("button", {
    className: rentType === 'net' ? 'active' : '',
    onClick: () => setRentType('net')
  }, t.calc.net))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "test-rent"
  }, t.calc.testRent), /*#__PURE__*/React.createElement("input", {
    id: "test-rent",
    type: "number",
    min: "200",
    max: "6000",
    step: "10",
    className: "input",
    value: testRent,
    onChange: e => setTestRent(Number(e.target.value) || 0)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "verdict-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verdict-label"
  }, t.calc.ceiling), /*#__PURE__*/React.createElement("div", {
    className: "verdict-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, chf(displayCeiling)), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ ", lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois')), /*#__PURE__*/React.createElement("div", {
    className: "verdict-facts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verdict-fact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t.calc.authority), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, c.authority)), /*#__PURE__*/React.createElement("div", {
    className: "verdict-fact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t.calc.basis), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, c.basis === "brut" ? t.calc.brut : t.calc.net)), /*#__PURE__*/React.createElement("div", {
    className: "verdict-fact",
    style: {
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t.calc.heating), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, c.heating === "included" ? t.calc.heatIncluded : t.calc.heatSeparate))), /*#__PURE__*/React.createElement("div", {
    className: `compliance-box ${compliant ? 'ok' : 'warn'}`,
    key: compliant + String(displayCeiling)
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, compliant ? '✓' : '!'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, compliant ? t.calc.compliant : `${t.calc.over} CHF ${chf(over)}`), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, compliant ? `${c.authority} · ${c.name[lang]} · ${t.calc.persons(Number(size))}${size === '5' ? '+' : ''}` : t.calc.overNote))), /*#__PURE__*/React.createElement("div", {
    className: "subsidiarity"
  }, t.calc.subsidiarityNote)))));
}

// ============================================================
// CH-ISCO-19 PROFESSION CASCADE
// ============================================================
function ProfessionSelector({
  t,
  lang
}) {
  const [sectorId, setSectorId] = uSA(window.SECTORS[0].id);
  const [catId, setCatId] = uSA("all");
  const [qualif, setQualif] = uSA("all");
  const sector = window.SECTORS.find(s => s.id === sectorId);
  const categories = sector?.categories || [];
  eSA(() => {
    setCatId("all");
  }, [sectorId]);
  const jobs = mSA(() => {
    const source = catId === "all" ? categories.flatMap(c => c.jobs.map(j => ({
      ...j,
      catLabel: c.labels[lang]
    }))) : categories.find(c => c.id === catId)?.jobs.map(j => ({
      ...j,
      catLabel: categories.find(c => c.id === catId).labels[lang]
    })) || [];
    return source.filter(j => qualif === "all" || j.qualif === qualif);
  }, [sectorId, catId, qualif, lang, categories]);
  const anyStellen = jobs.some(j => j.stellen);
  return /*#__PURE__*/React.createElement("section", {
    id: "prof"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, t.prof.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, t.prof.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, t.prof.lede), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 20,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, t.prof.sector), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: sectorId,
    onChange: e => setSectorId(e.target.value)
  }, window.SECTORS.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.id
  }, s.id, " \xB7 ", s.labels[lang])))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, t.prof.category), /*#__PURE__*/React.createElement("select", {
    className: "select",
    value: catId,
    onChange: e => setCatId(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "\u2014 ", lang === 'de' ? 'Alle Kategorien' : lang === 'it' ? 'Tutte le categorie' : lang === 'uk' ? 'Усі категорії' : 'Toutes les catégories', " \u2014"), categories.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.labels[lang]))))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 18,
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, t.prof.qualif), /*#__PURE__*/React.createElement("div", {
    className: "pill-group"
  }, /*#__PURE__*/React.createElement("button", {
    className: `pill-btn ${qualif === 'all' ? 'active' : ''}`,
    onClick: () => setQualif('all')
  }, t.prof.allQualif), window.QUALIF_LEVELS.map(q => /*#__PURE__*/React.createElement("button", {
    key: q.id,
    className: `pill-btn ${qualif === q.id ? 'active' : ''}`,
    onClick: () => setQualif(q.id)
  }, q.labels[lang])))), anyStellen && /*#__PURE__*/React.createElement("div", {
    className: "stellen-alert",
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, t.prof.stellenBadge), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, "\u26A0 ", t.prof.stellenTitle), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, t.prof.stellenBody))), jobs.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "no-results"
  }, t.prof.noResults) : /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "prof-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, t.prof.isco), /*#__PURE__*/React.createElement("th", null, t.prof.titleCol), /*#__PURE__*/React.createElement("th", null, t.prof.qualif), /*#__PURE__*/React.createElement("th", null, t.prof.salary), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, jobs.map((j, i) => {
    // localized primary + alt in other langs
    const altLangs = ['fr', 'de', 'it', 'uk'].filter(l => l !== lang);
    const alt = altLangs.map(l => `${LANG_LABEL[l]} · ${j.titles[l]}`).join(' · ');
    return /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      className: "isco"
    }, j.isco), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "job-title"
    }, j.titles[lang]), /*#__PURE__*/React.createElement("div", {
      className: "job-title-alt"
    }, alt)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "qbadge"
    }, window.QUALIF_LEVELS.find(q => q.id === j.qualif).labels[lang].split(' ')[0])), /*#__PURE__*/React.createElement("td", {
      className: "salary"
    }, chf(j.salary[0]), " \u2013 ", chf(j.salary[1])), /*#__PURE__*/React.createElement("td", null, j.stellen && /*#__PURE__*/React.createElement("span", {
      className: "stellen-flag"
    }, "\u26A0 21a LEI")));
  })))))));
}
Object.assign(window, {
  TopBanner,
  Navbar,
  Hero,
  CantonCalculator,
  ProfessionSelector
});

// ==================== [Module: side-b.jsx] ====================
// Side B: Solidarité Suisse — Host sublease wizard + Benevol mentors
const {
  useState: uSB,
  useMemo: mSB
} = React;

// ============================================================
// HOST SUBLEASE WIZARD (Art. 262 CO)
// ============================================================
function HostSubleaseWizard({
  t,
  lang
}) {
  const [totalRent, setTotalRent] = uSB(1800);
  const [rooms, setRooms] = uSB(4);
  const [surcharge, setSurcharge] = uSB(15);
  const [showPdf, setShowPdf] = uSB(false);
  const base = mSB(() => Math.round(totalRent / rooms), [totalRent, rooms]);
  const finalRent = mSB(() => Math.round(base * (1 + surcharge / 100)), [base, surcharge]);
  const over20 = surcharge > 20;
  return /*#__PURE__*/React.createElement("section", {
    id: "sublease"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, t.sublease.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, t.sublease.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, t.sublease.lede), /*#__PURE__*/React.createElement("div", {
    className: "host-grid",
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shield-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(I.shield, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t.sublease.shield), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, t.sublease.shieldBody))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.totalRent), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "500",
    max: "8000",
    step: "50",
    className: "input",
    value: totalRent,
    onChange: e => setTotalRent(Number(e.target.value) || 0)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.rooms), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "10",
    step: "0.5",
    className: "input",
    value: rooms,
    onChange: e => setRooms(Number(e.target.value) || 1)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.base), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      background: 'rgba(15,23,42,0.65)',
      border: '1px solid var(--line-2)',
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--muted)'
    },
    className: "mono"
  }, "CHF ", chf(totalRent), " / ", rooms, " = "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 18,
      fontWeight: 700,
      color: '#E2E8F0'
    }
  }, "CHF ", chf(base)))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, t.sublease.surcharge), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: over20 ? '#FCA5A5' : '#FCD34D'
    }
  }, surcharge, "%")), /*#__PURE__*/React.createElement("div", {
    className: "slider-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "30",
    step: "1",
    className: "slider",
    value: surcharge,
    onChange: e => setSurcharge(Number(e.target.value))
  }), /*#__PURE__*/React.createElement("div", {
    className: "slider-labels"
  }, /*#__PURE__*/React.createElement("span", null, "0%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--emerald-2)'
    }
  }, "10%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-2)'
    }
  }, "20% MAX"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FCA5A5'
    }
  }, "30%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      marginTop: 6
    }
  }, t.sublease.surchargeLimit)), /*#__PURE__*/React.createElement("div", {
    className: "final-rent-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t.sublease.final), /*#__PURE__*/React.createElement("div", {
    className: "amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), " ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, chf(finalRent))), /*#__PURE__*/React.createElement("div", {
    className: "breakdown"
  }, "CHF ", chf(base), " + ", surcharge, "% = CHF ", chf(finalRent), " / ", lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'), /*#__PURE__*/React.createElement("div", {
    className: `compliance-box ${over20 ? 'warn' : 'ok'}`,
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, over20 ? '!' : '✓'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, over20 ? t.sublease.overBadge : t.sublease.okBadge), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA / Mieterverband')))), /*#__PURE__*/React.createElement("div", {
    className: "badges-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mini-badge gold"
  }, /*#__PURE__*/React.createElement(I.euro, null), " ", t.sublease.taxBadge), /*#__PURE__*/React.createElement("span", {
    className: "mini-badge blue"
  }, /*#__PURE__*/React.createElement(I.shield, null), " ", t.sublease.insBadge)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-blue",
    onClick: () => setShowPdf(true),
    disabled: over20
  }, /*#__PURE__*/React.createElement(I.arrow, null), " ", t.sublease.letterBtn)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, t.sublease.letterHint)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pdf-preview"
  }, /*#__PURE__*/React.createElement("h4", null, t.sublease.pdfTitle), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 12px',
      fontSize: 11.5,
      color: '#334155',
      fontStyle: 'italic'
    }
  }, t.sublease.pdfIntro), /*#__PURE__*/React.createElement("div", {
    className: "pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, t.sublease.pdfFields.from), /*#__PURE__*/React.createElement("span", null, "[ Nom \xB7 Adresse \xB7 NPA / Ville ]")), /*#__PURE__*/React.createElement("div", {
    className: "pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, t.sublease.pdfFields.to), /*#__PURE__*/React.createElement("span", null, "[ G\xE9rance \xB7 Adresse ]")), /*#__PURE__*/React.createElement("div", {
    className: "pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, t.sublease.pdfFields.subtenant), /*#__PURE__*/React.createElement("span", null, "[ Nom \xB7 N\xB0 Permis S ]")), /*#__PURE__*/React.createElement("div", {
    className: "pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, t.sublease.pdfFields.desc), /*#__PURE__*/React.createElement("span", null, "1 pi\xE8ce meubl\xE9e, ", Math.round(15 / (rooms || 1) * 100) / 10 || 12, " m\xB2, partag\xE9e cuisine/SdB")), /*#__PURE__*/React.createElement("div", {
    className: "pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, t.sublease.pdfFields.rent), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "CHF ", chf(finalRent), " / mois")), /*#__PURE__*/React.createElement("div", {
    className: "pdf-close"
  }, t.sublease.pdfClose), /*#__PURE__*/React.createElement("div", {
    className: "pdf-sig"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), "Signature locataire principal"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), "Date \xB7 Lieu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '12px 14px',
      background: 'rgba(15,23,42,0.5)',
      border: '1px dashed var(--line-2)',
      borderRadius: 12,
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, "\uD83D\uDCC4 Aper\xE7u du courrier \u2014 bouton \"", t.sublease.letterBtn, "\" g\xE9n\xE8re un PDF/A signable, avec citations l\xE9gales compl\xE8tes et coordonn\xE9es de la g\xE9rance cibl\xE9e.")))));
}

// ============================================================
// BENEVOL MENTOR HUB
// ============================================================
function BenevolMentors({
  t,
  lang
}) {
  const [commit, setCommit] = uSB(1);
  return /*#__PURE__*/React.createElement("section", {
    id: "mentors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, t.mentors.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, t.mentors.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, t.mentors.lede), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, t.mentors.commit), /*#__PURE__*/React.createElement("div", {
    className: "pill-group"
  }, t.mentors.commitOpts.map((opt, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `pill-btn active-blue ${commit === i ? 'active-blue' : ''}`,
    style: {
      opacity: commit === i ? 1 : 0.55
    },
    onClick: () => setCommit(i)
  }, opt)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-label",
    style: {
      marginBottom: 12
    }
  }, t.mentors.tracks), /*#__PURE__*/React.createElement("div", {
    className: "tracks-grid"
  }, t.mentors.trackList.map((tr, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "track-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "track-num"
  }, "TRACK 0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "track-title"
  }, tr.t), /*#__PURE__*/React.createElement("div", {
    className: "track-body"
  }, tr.b))))), /*#__PURE__*/React.createElement("div", {
    className: "legal-strip"
  }, /*#__PURE__*/React.createElement("span", null, t.mentors.legal)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-blue btn-lg"
  }, /*#__PURE__*/React.createElement(I.users, null), " ", t.mentors.apply), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=mentor",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-ghost btn-lg"
  }, /*#__PURE__*/React.createElement(I.send, null), " @SwissResilienceHubBot")))));
}
Object.assign(window, {
  HostSubleaseWizard,
  BenevolMentors
});

// ==================== [Module: beta-donation.jsx] ====================
// Beta pricing (frozen) + Donation Merkle modal + Legal footer
const {
  useState: uSD,
  useEffect: eSD
} = React;

// ============================================================
// BETA PRICING (frozen tiers + donation card)
// ============================================================
function BetaPricing({
  t,
  onDonate
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "beta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, t.beta.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, t.beta.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, t.beta.lede), /*#__PURE__*/React.createElement("div", {
    className: "pricing-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price-card frozen"
  }, /*#__PURE__*/React.createElement("span", {
    className: "frozen-overlay"
  }, t.beta.inactiveBadge), /*#__PURE__*/React.createElement("div", {
    className: "price-name"
  }, "Pro Solidarity"), /*#__PURE__*/React.createElement("div", {
    className: "price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "19"), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ ", t.lang === 'Français' ? 'mois' : t.lang === 'Deutsch' ? 'Monat' : t.lang === 'Italiano' ? 'mese' : 'міс.')), /*#__PURE__*/React.createElement("p", {
    className: "price-tagline"
  }, t.beta.proTagline), /*#__PURE__*/React.createElement("ul", {
    className: "features"
  }, t.beta.proFeatures.map((f, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, /*#__PURE__*/React.createElement(I.check, null)), f))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-disabled",
    style: {
      width: '100%'
    }
  }, t.beta.inactiveBadge)), /*#__PURE__*/React.createElement("div", {
    className: "price-card frozen"
  }, /*#__PURE__*/React.createElement("span", {
    className: "frozen-overlay"
  }, t.beta.inactiveBadge), /*#__PURE__*/React.createElement("div", {
    className: "price-name"
  }, "Success Relocation"), /*#__PURE__*/React.createElement("div", {
    className: "price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "54"), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ one-shot")), /*#__PURE__*/React.createElement("p", {
    className: "price-tagline"
  }, t.beta.successTagline), /*#__PURE__*/React.createElement("ul", {
    className: "features"
  }, t.beta.successFeatures.map((f, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, /*#__PURE__*/React.createElement(I.check, null)), f))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-disabled",
    style: {
      width: '100%'
    }
  }, t.beta.inactiveBadge)), /*#__PURE__*/React.createElement("div", {
    className: "price-card donation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "price-name",
    style: {
      color: '#FCD34D'
    }
  }, "\u2605 ", t.beta.freeAccess), /*#__PURE__*/React.createElement("div", {
    className: "price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, "0")), /*#__PURE__*/React.createElement("p", {
    className: "price-tagline"
  }, t.beta.donationTagline), /*#__PURE__*/React.createElement("ul", {
    className: "features"
  }, t.beta.donationFeatures.map((f, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, /*#__PURE__*/React.createElement(I.check, null)), f))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      width: '100%'
    },
    onClick: onDonate
  }, /*#__PURE__*/React.createElement(I.heart, null), " ", t.beta.donateBtn)))));
}

// ============================================================
// DONATION MODAL — Merkle Ledger + Operational Payment rails
// ============================================================
function DonationModal({
  t,
  lang,
  onClose
}) {
  const [rail, setRail] = uSD("stars"); // stars | card | qr | crypto
  const [amount, setAmount] = uSD(250);
  const [customOn, setCustomOn] = uSD(false);
  const [copied, setCopied] = uSD(false);
  const merkleRoot = useSessionMerkle();
  eSD(() => {
    const h = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  const chips = rail === "stars" ? [50, 250, 950, 2450] : [10, 25, 50, 100];
  const unit = rail === "stars" ? "XTR" : "CHF";
  const handleCopy = text => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handleStarsPay = e => {
    const url = `https://t.me/SwissResilienceHubBot?start=donate_${amount}`;
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
      e.preventDefault();
      window.Telegram.WebApp.openTelegramLink(url);
    }
  };
  const copyLabel = lang === 'uk' ? '✓ Скопійовано !' : lang === 'de' ? '✓ Kopiert !' : lang === 'it' ? '✓ Copiato !' : '✓ Copié !';
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, t.donation?.title || "Don de soutien — Registre public Merkle"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted)',
      fontSize: 13.5
    }
  }, "Association Swiss Resilience \xB7 Art. 60\u201379 CC \xB7 B\xEAta publique")), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(I.x, null))), /*#__PURE__*/React.createElement("div", {
    className: "split-viz",
    "aria-label": "Fund allocation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split-70"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split-pct"
  }, "70%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      marginBottom: 4
    }
  }, "Infrastructure & APIs"), /*#__PURE__*/React.createElement("div", {
    className: "split-desc"
  }, t.donation?.split70 || "70% — Hébergement, serveurs, scanners d'offres et coûts d'API")), /*#__PURE__*/React.createElement("div", {
    className: "split-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split-pct"
  }, "30%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      marginBottom: 4,
      color: '#FEF3C7'
    }
  }, "\uD83C\uDDFA\uD83C\uDDE6 ZSU Solidarity"), /*#__PURE__*/React.createElement("div", {
    className: "split-desc"
  }, t.donation?.split30 || "30% — Soutien humanitaire et matériel pour l'Ukraine"))), /*#__PURE__*/React.createElement("div", {
    className: "pay-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pay-card stars",
    style: {
      borderColor: rail === 'stars' ? 'rgba(59,130,246,0.9)' : ''
    },
    onClick: () => {
      setRail('stars');
      setAmount(250);
      setCustomOn(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(I.star, null)), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, t.donation?.stars || "Telegram Stars (XTR)")), /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, t.donation?.starsHint || "1-Clic instantané dans Telegram · 0% commission")), /*#__PURE__*/React.createElement("button", {
    className: "pay-card card",
    style: {
      borderColor: rail === 'card' ? 'rgba(16,185,129,0.9)' : ''
    },
    onClick: () => {
      setRail('card');
      setAmount(25);
      setCustomOn(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(I.lock, null)), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, t.donation?.card || "Carte / Apple & Google Pay")), /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, t.donation?.cardHint || "Paiement sécurisé Visa, MC, Apple Pay"))), /*#__PURE__*/React.createElement("div", {
    className: "pay-row",
    style: {
      gridTemplateColumns: '1fr 1fr',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "pay-card qr",
    style: {
      borderColor: rail === 'qr' ? 'rgba(213,43,30,0.9)' : ''
    },
    onClick: () => {
      setRail('qr');
      setCustomOn(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(I.hash, null)), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, t.donation?.qr || "QR-Facture & IBAN CH")), /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, t.donation?.qrHint || "Virement bancaire suisse direct")), /*#__PURE__*/React.createElement("button", {
    className: "pay-card crypto",
    style: {
      borderColor: rail === 'crypto' ? 'rgba(217,119,6,0.9)' : ''
    },
    onClick: () => {
      setRail('crypto');
      setCustomOn(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "icon"
  }, /*#__PURE__*/React.createElement(I.shield, null)), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, "Crypto (USDT TRC20/ERC20)")), /*#__PURE__*/React.createElement("div", {
    className: "hint"
  }, lang === 'uk' ? 'USDT TRC20 та ERC20 з чеком у боті' : lang === 'de' ? 'USDT TRC20 & ERC20 mit Quittung' : lang === 'it' ? 'USDT TRC20 & ERC20 con ricevuta' : 'USDT TRC20 & ERC20 avec reçu'))), (rail === 'stars' || rail === 'card') && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      marginBottom: 8,
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      fontWeight: 700,
      fontFamily: "'JetBrains Mono',monospace"
    }
  }, "Montant du don \xB7 ", unit), /*#__PURE__*/React.createElement("div", {
    className: "amount-chips"
  }, chips.map(a => /*#__PURE__*/React.createElement("button", {
    key: a,
    className: `amount-chip ${amount === a && !customOn ? 'active' : ''}`,
    onClick: () => {
      setAmount(a);
      setCustomOn(false);
    }
  }, a, " ", unit)), /*#__PURE__*/React.createElement("button", {
    className: `amount-chip ${customOn ? 'active' : ''}`,
    onClick: () => setCustomOn(true)
  }, t.donation.customAmount)), customOn && /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    className: "input",
    style: {
      marginTop: 10,
      maxWidth: 220
    },
    value: amount,
    onChange: e => setAmount(Number(e.target.value) || 0)
  })), rail === 'qr' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: 16,
      background: 'rgba(15,23,42,0.85)',
      border: '1px solid var(--line-2)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: '#F8FAFC',
      marginBottom: 8
    }
  }, "Coordonn\xE9es bancaires suisses (BVR / QR-Facture)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: '#CBD5E1',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "B\xE9n\xE9ficiaire :"), " Association Swiss Resilience (en constitution)"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Banque :"), " PostFinance / Banque Cantonale de Gen\xE8ve"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "IBAN :"), " ", /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: '#FCD34D'
    }
  }, "CH74 0900 0000 1234 5678 9"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '4px 8px',
      minHeight: 28,
      fontSize: 11
    },
    onClick: () => handleCopy('CH7409000000123456789')
  }, copied ? copyLabel : lang === 'uk' ? 'Копіювати IBAN' : lang === 'de' ? 'IBAN kopieren' : lang === 'it' ? 'Copia IBAN' : 'Copier l\'IBAN')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Motif :"), " Don solidarit\xE9 B\xEAta (70% Infra / 30% ZSU)"))), rail === 'crypto' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      padding: 16,
      background: 'rgba(15,23,42,0.85)',
      border: '1px solid var(--line-2)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: '#F8FAFC',
      marginBottom: 8
    }
  }, lang === 'uk' ? 'Офіційні криптовалютні адреси (USDT)' : lang === 'de' ? 'Offizielle Krypto-Adressen (USDT)' : lang === 'it' ? 'Indirizzi crypto ufficiali (USDT)' : 'Adresses cryptographiques officielles (USDT)'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: '#CBD5E1',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--muted)',
      display: 'block'
    }
  }, "USDT (TRC-20 Tron) :"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: '#FEF3C7',
      wordBreak: 'break-all'
    }
  }, "TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '4px 8px',
      minHeight: 28,
      fontSize: 11
    },
    onClick: () => handleCopy('TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a')
  }, copied ? copyLabel : lang === 'uk' ? 'Копіювати' : lang === 'de' ? 'Kopieren' : lang === 'it' ? 'Copia' : 'Copier'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--muted)',
      display: 'block'
    }
  }, "USDT / ETH (ERC-20 Ethereum) :"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: '#FEF3C7',
      wordBreak: 'break-all'
    }
  }, "0x4E8b7a129d2fC7c47d3B6c21A77E8b3F13D75a9B"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '4px 8px',
      minHeight: 28,
      fontSize: 11
    },
    onClick: () => handleCopy('0x4E8b7a129d2fC7c47d3B6c21A77E8b3F13D75a9B')
  }, copied ? copyLabel : lang === 'uk' ? 'Копіювати' : lang === 'de' ? 'Kopieren' : lang === 'it' ? 'Copia' : 'Copier'))))), /*#__PURE__*/React.createElement("div", {
    className: "merkle-strip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, t.donation?.merkleRoot || "Merkle Root SHA-256"), /*#__PURE__*/React.createElement("span", {
    className: "hash"
  }, merkleRoot.slice(0, 42), "\u2026"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/maxfraieho/swiss-job-hunter",
    target: "_blank",
    rel: "noopener noreferrer"
  }, t.donation?.verifyBtn || "GitHub Audit", " \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onClose
  }, t.donation?.close || "Fermer"), rail === 'stars' ? /*#__PURE__*/React.createElement("a", {
    href: `https://t.me/SwissResilienceHubBot?start=donate_${amount}`,
    onClick: handleStarsPay,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary btn-lg"
  }, /*#__PURE__*/React.createElement(I.star, null), " ", amount, " Stars (XTR) \u2014 @SwissResilienceHubBot") : rail === 'card' ? /*#__PURE__*/React.createElement("a", {
    href: "https://send.monobank.ua/jar/3kCfxsNspw",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary btn-lg"
  }, /*#__PURE__*/React.createElement(I.heart, null), " ", lang === 'uk' ? `Підтримати ${amount} CHF (Картка / Apple Pay)` : lang === 'de' ? `Unterstützen ${amount} CHF (Karte / Apple Pay)` : lang === 'it' ? `Dona ${amount} CHF (Carta / Apple Pay)` : `Payer ${amount} CHF (Carte / Apple Pay)`) : rail === 'qr' ? /*#__PURE__*/React.createElement("a", {
    href: `https://t.me/SwissResilienceHubBot?start=donate_qr`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary btn-lg"
  }, /*#__PURE__*/React.createElement(I.hash, null), " ", lang === 'uk' ? 'Отримати QR-рахунок у боті' : lang === 'de' ? 'QR-Rechnung im Bot erhalten' : lang === 'it' ? 'Ricevi fattura QR nel bot' : 'Recevoir la QR-facture PDF') : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-lg",
    onClick: () => handleCopy('TX7yK9L3mV2Z5h8Qp1nR4s6t9u2w4y6z8a')
  }, /*#__PURE__*/React.createElement(I.check, null), " ", copied ? copyLabel : lang === 'uk' ? 'Скопіювати адресу USDT TRC20' : lang === 'de' ? 'USDT TRC20 Adresse kopieren' : lang === 'it' ? 'Copia indirizzo USDT TRC20' : 'Copier l\'adresse USDT TRC20'))));
}

// ============================================================
// LEGAL FOOTER
// ============================================================
function LegalFooter({
  t
}) {
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    style: {
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "Swiss Resilience Navigator", /*#__PURE__*/React.createElement("span", null, "2.5 \xB7 Pan-Swiss B\xEAta"))), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 320
    }
  }, "Plateforme communautaire d'entraide entre b\xE9n\xE9ficiaires du Permis S et r\xE9sidents suisses solidaires \u2014 26 cantons, 4 langues, z\xE9ro commission.")), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, t.footer.status), /*#__PURE__*/React.createElement("p", null, t.footer.statusBody)), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, t.footer.lse), /*#__PURE__*/React.createElement("p", null, t.footer.lseBody)), /*#__PURE__*/React.createElement("div", {
    className: "foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, t.footer.links), /*#__PURE__*/React.createElement("ul", null, t.footer.linkList.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, l)))), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: 22
    }
  }, t.footer.lcd), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12
    }
  }, t.footer.lcdBody))), /*#__PURE__*/React.createElement("div", {
    className: "compliance-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.shield, null), " Swiss nLPD Compliant"), /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.shield, null), " EU GDPR"), /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.lock, null), " AES-256 \xB7 SHA-256 Merkle"), /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.hash, null), " Appwrite Cloud \xB7 Frankfurt"), /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.shield, null), " Benevol Switzerland"), /*#__PURE__*/React.createElement("span", {
    className: "comp-chip"
  }, /*#__PURE__*/React.createElement(I.shield, null), " ASLOCA / Mieterverband")), /*#__PURE__*/React.createElement("div", {
    className: "foot-legal"
  }, t.footer.close)));
}
Object.assign(window, {
  BetaPricing,
  DonationModal,
  LegalFooter
});

// ==================== [Module: app.jsx] ====================
// Swiss Resilience Navigator 2.5 — App root
const {
  useState: uApp,
  useEffect: eApp
} = React;

// Safe storage helper resilient to Telegram in-app browser and private mode storage blocks
const _memStore = {};
function safeStorageGet(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : _memStore[key];
  } catch (e) {
    return _memStore[key] || null;
  }
}
function safeStorageSet(key, val) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, val);
  } catch (e) {
    _memStore[key] = val;
  }
}
function App() {
  const [lang, setLang] = uApp(() => {
    // Check URL params first, then localStorage, then default to 'fr'
    const urlParams = new URLSearchParams(window.location.search);
    const paramLang = urlParams.get('lang');
    if (paramLang && window.I18N && window.I18N[paramLang]) return paramLang;
    return safeStorageGet('srn-lang') || 'fr';
  });
  const [side, setSide] = uApp(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramSide = urlParams.get('side');
    if (paramSide === 'a' || paramSide === 'b') return paramSide;
    return safeStorageGet('srn-side') || 'a';
  });
  const [donateOpen, setDonateOpen] = uApp(false);
  eApp(() => {
    safeStorageSet('srn-lang', lang);
  }, [lang]);
  eApp(() => {
    safeStorageSet('srn-side', side);
  }, [side]);

  // Support Telegram WebApp auto-theme and expand if inside TMA
  eApp(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);
  const t = window.I18N && window.I18N[lang] ? window.I18N[lang] : window.I18N ? window.I18N['fr'] : {};
  if (!t || !t.banner) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 40,
        textAlign: 'center',
        color: '#CBD5E1'
      }
    }, "Chargement du Swiss Resilience Navigator 2.5...");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBanner, {
    t: t
  }), /*#__PURE__*/React.createElement(Navbar, {
    t: t,
    lang: lang,
    onLang: setLang,
    side: side,
    onSide: setSide,
    onDonate: () => setDonateOpen(true)
  }), /*#__PURE__*/React.createElement(Hero, {
    t: t,
    side: side,
    onSide: setSide
  }), /*#__PURE__*/React.createElement("div", {
    className: "fade-in",
    key: side
  }, side === 'a' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CantonCalculator, {
    t: t,
    lang: lang
  }), /*#__PURE__*/React.createElement(ProfessionSelector, {
    t: t,
    lang: lang
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HostSubleaseWizard, {
    t: t,
    lang: lang
  }), /*#__PURE__*/React.createElement(BenevolMentors, {
    t: t,
    lang: lang
  }))), /*#__PURE__*/React.createElement(BetaPricing, {
    t: t,
    onDonate: () => setDonateOpen(true)
  }), /*#__PURE__*/React.createElement(LegalFooter, {
    t: t
  }), donateOpen && /*#__PURE__*/React.createElement(DonationModal, {
    t: t,
    lang: lang,
    onClose: () => setDonateOpen(false)
  }));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));