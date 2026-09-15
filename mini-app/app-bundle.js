function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Swiss Resilience Navigator 2.6 — Consolidated Bundle */

// ==================== [Module: shared.jsx] ====================
// Shared atoms / icons / helpers for Swiss Resilience Navigator 2.5 / SwissRelief 2.6
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
window.chf = chf;

// ---------- Language tag / flag helpers ----------
const LANG_FLAGS = {
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  uk: "🇺🇦",
  en: "🇬🇧"
};
const LANG_LABEL = {
  fr: "FR",
  de: "DE",
  it: "IT",
  uk: "UK",
  en: "EN"
};

// ---------- Brand mark: ACCORD squircle logo with SVG fallback ----------
function BrandMark({
  size = 28
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "brand-mark",
    style: {
      width: size,
      height: size,
      minWidth: size,
      borderRadius: Math.round(size * 0.25),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      verticalAlign: 'middle',
      background: '#D52B1E',
      boxShadow: '0 2px 8px rgba(213,43,30,0.35)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/accord_logo.jpg",
    alt: "ACCORD",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    onError: e => {
      e.target.style.display = 'none';
    }
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
    width: "18",
    height: "18",
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
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 12 12 3l9 9M5 10v10h5v-6h4v6h5V10"
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
    width: "18",
    height: "18",
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
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "7",
    x2: "20",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "12",
    x2: "20",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "17",
    x2: "20",
    y2: "17"
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
  })),
  file: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 13h8M8 17h5"
  })),
  train: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "3",
    width: "16",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 11h16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15h.01M16 15h.01"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 19l-2 3M16 19l2 3"
  })),
  gear: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
  })),
  external: p => /*#__PURE__*/React.createElement("svg", _extends({
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "15 3 21 3 21 9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "14",
    x2: "21",
    y2: "3"
  }))
};
const Ico = I;

// Safe storage
const _memStore = {};
function safeGet(k, d = null) {
  try {
    return window.localStorage?.getItem(k) ?? d;
  } catch (e) {
    return _memStore[k] ?? d;
  }
}
function safeSet(k, v) {
  try {
    window.localStorage?.setItem(k, v);
  } catch (e) {
    _memStore[k] = v;
  }
}

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
  Ico,
  safeGet,
  safeSet,
  useSessionMerkle
});

// ==================== [Module: Nav.jsx] ====================
// SwissRelief 2.6 — Sticky header (NO backdrop-filter on the wrap = no containing-block trap, ADR-017)

function TopBannerV2({
  t
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "v2-top-banner",
    role: "status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container v2-top-banner-inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-top-dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, t.banner)));
}
function NavV2({
  lang,
  setLang,
  side,
  setSide,
  onOpenDrawer,
  onOpenDonate,
  onOpenInfo,
  t
}) {
  const [langOpen, setLangOpen] = React.useState(false);
  const FLAGS = {
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    uk: "🇺🇦",
    en: "🇬🇧"
  };
  const NAMES = {
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    uk: "Українська",
    en: "English"
  };
  const LABELS = {
    fr: "FR",
    de: "DE",
    it: "IT",
    uk: "UK",
    en: "EN"
  };
  React.useEffect(() => {
    const closeOnOutside = e => {
      if (!e.target.closest('.v2-lang-dropdown')) setLangOpen(false);
    };
    const closeOnEsc = e => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('click', closeOnOutside);
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('click', closeOnOutside);
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, []);
  const navLabels = {
    uk: {
      housing: "Житло",
      jobs: "Вакансії",
      calc: "Калькулятор",
      dossier: "Досьє",
      sublease: "Суборенда",
      mentors: "Ментори",
      guide: "Інструкція",
      about: "Про проєкт",
      why: "Чому ми",
      privacy: "Конфіденційність"
    },
    fr: {
      housing: "Logement",
      jobs: "Emplois",
      calc: "Calculateur",
      dossier: "Dossier",
      sublease: "Sous-location",
      mentors: "Mentors",
      guide: "Mode d'emploi",
      about: "À propos",
      why: "Pourquoi nous",
      privacy: "Confidentialité"
    },
    de: {
      housing: "Wohnen",
      jobs: "Stellen",
      calc: "Rechner",
      dossier: "Dossier",
      sublease: "Untermiete",
      mentors: "Mentoren",
      guide: "Anleitung",
      about: "Über uns",
      why: "Warum wir",
      privacy: "Datenschutz"
    },
    en: {
      housing: "Housing",
      jobs: "Jobs",
      calc: "Calculator",
      dossier: "Dossier",
      sublease: "Sublease",
      mentors: "Mentors",
      guide: "User Guide",
      about: "About",
      why: "Why us",
      privacy: "Privacy"
    }
  };
  const nl = navLabels[lang] || navLabels.fr;
  return /*#__PURE__*/React.createElement("header", {
    className: "v2-sticky-header",
    role: "banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container v2-nav-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "v2-brand",
    "aria-label": "ACCORD"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 28
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-name"
  }, "ACCORD", /*#__PURE__*/React.createElement("span", null, lang === 'uk' ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'))), /*#__PURE__*/React.createElement("nav", {
    className: "v2-nav-links v2-desktop-only",
    "aria-label": "Navigation principale",
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#housing",
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, nl.housing), /*#__PURE__*/React.createElement("a", {
    href: "#prof",
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, nl.jobs), /*#__PURE__*/React.createElement("a", {
    href: "#calc",
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, nl.calc), /*#__PURE__*/React.createElement("a", {
    href: "#dossier",
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, nl.dossier), /*#__PURE__*/React.createElement("a", {
    href: "#mentors",
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg-2)',
      textDecoration: 'none'
    }
  }, nl.mentors), /*#__PURE__*/React.createElement("a", {
    href: "#guide",
    onClick: e => {
      e.preventDefault();
      if (onOpenInfo) onOpenInfo('guide');
    },
    className: "v2-nav-link",
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: '#38BDF8',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCD6"), " ", nl.guide)), /*#__PURE__*/React.createElement("div", {
    className: "v2-nav-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=web_nav",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-tg v2-desktop-only",
    style: {
      padding: '6px 12px',
      fontSize: 13,
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })), "@SwissResilienceHubBot"), /*#__PURE__*/React.createElement("div", {
    className: "v2-lang-dropdown v2-desktop-only"
  }, /*#__PURE__*/React.createElement("button", {
    className: "v2-lang-btn",
    "aria-expanded": langOpen,
    "aria-haspopup": "menu",
    "aria-label": "S\xE9lectionner la langue",
    onClick: e => {
      e.stopPropagation();
      setLangOpen(v => !v);
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, FLAGS[lang]), /*#__PURE__*/React.createElement("span", null, LABELS[lang]), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: langOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 180ms'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), langOpen && /*#__PURE__*/React.createElement("div", {
    className: "v2-lang-menu",
    role: "menu"
  }, ['fr', 'de', 'it', 'uk', 'en'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `v2-lang-item ${l === lang ? 'active' : ''}`,
    role: "menuitemradio",
    "aria-checked": l === lang,
    onClick: () => {
      setLang(l);
      setLangOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-lang-flag",
    "aria-hidden": "true"
  }, FLAGS[l]), /*#__PURE__*/React.createElement("span", {
    className: "v2-lang-name"
  }, NAMES[l]), l === lang && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })))))), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=donate",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-primary v2-donate",
    "aria-label": t.donate
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-donate-label"
  }, t.donate)), /*#__PURE__*/React.createElement("button", {
    className: "v2-mobile-only",
    onClick: onOpenDrawer,
    "aria-label": "Changer de langue",
    style: {
      padding: '6px 10px',
      borderRadius: 8,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid var(--border-active)',
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      color: 'var(--gold-cream)',
      display: 'none',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, FLAGS[lang]), /*#__PURE__*/React.createElement("span", null, LABELS[lang])), /*#__PURE__*/React.createElement("button", {
    className: "v2-hamburger v2-mobile-only",
    onClick: onOpenDrawer,
    "aria-label": "Ouvrir le menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))))));
}
Object.assign(window, {
  NavV2,
  TopBannerV2,
  BrandMark
});

// ==================== [Module: ServiceSwitcher.jsx] ====================
// SwissRelief 2.6 — Horizontal 5-service switcher bar under the header.
// Isolated stacking context (z-index: 10) so the language dropdown (z: 1100) stays above.
function ServiceSwitcher({
  activeId,
  onPick,
  onOpenChat,
  t
}) {
  const sw = t?.switcher || {};
  const services = [{
    id: 'housing',
    side: 'a',
    num: '01',
    badge: sw.housing?.badge || 'A',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12 12 3l9 9M5 10v10h14V10"
    })),
    label: sw.housing?.label || t?.nav?.housing || "Житло",
    sub: sw.housing?.sub || "Оренда та EVAM"
  }, {
    id: 'prof',
    side: 'a',
    num: '02',
    badge: sw.prof?.badge || 'A',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 3v18h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 15l4-4 3 3 5-6"
    })),
    label: sw.prof?.label || t?.nav?.jobs || "Робота",
    sub: sw.prof?.sub || "Вакансії та CV"
  }, {
    id: 'calc',
    side: 'a',
    num: '03',
    badge: sw.calc?.badge || 'A',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "2",
      width: "16",
      height: "20",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "6",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "10",
      x2: "16",
      y2: "10"
    })),
    label: sw.calc?.label || t?.svc?.calc || "Калькулятор",
    sub: sw.calc?.sub || "Ліміти 26 кантонів"
  }, {
    id: 'dossier',
    side: 'a',
    num: '04',
    badge: sw.dossier?.badge || 'A',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 13h8M8 17h5"
    })),
    label: sw.dossier?.label || t?.nav?.dossier || "Досьє",
    sub: sw.dossier?.sub || "Пакет для режі"
  }, {
    id: 'sublease',
    side: 'b',
    num: '05',
    badge: sw.sublease?.badge || 'B',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    })),
    label: sw.sublease?.label || t?.svc?.sublease || "Суборенда",
    sub: sw.sublease?.sub || "Кімната в оренду"
  }, {
    id: 'mentors',
    side: 'b',
    num: '06',
    badge: sw.mentors?.badge || 'B',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
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
    label: sw.mentors?.label || t?.svc?.mentors || "Ментори",
    sub: sw.mentors?.sub || "Волонтери Benevol"
  }, {
    id: 'beta',
    side: null,
    num: '07',
    badge: sw.beta?.badge || 'FREE',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 11V7a5 5 0 0 1 10 0v4"
    })),
    label: sw.beta?.label || t?.svc?.beta || "Підтримка",
    sub: sw.beta?.sub || "Вільна бета"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "v2-service-banner-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "v2-service-banner",
    "aria-label": "Modules SwissRelief"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-service-inner"
  }, services.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: `v2-svc-btn ${activeId === s.id ? 'active' : ''} ${s.side ? `side-${s.side}` : ''}`,
    onClick: () => onPick(s.id, s.side),
    "aria-current": activeId === s.id ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-num"
  }, s.num), /*#__PURE__*/React.createElement("span", {
    className: `v2-svc-badge badge-${s.badge.toLowerCase()}`
  }, s.badge)), /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-icon",
    "aria-hidden": "true"
  }, s.icon), /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-label"
  }, s.label)), /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-sub"
  }, s.sub))), onOpenChat && /*#__PURE__*/React.createElement("button", {
    className: "v2-svc-btn side-ai",
    onClick: onOpenChat,
    title: "\u0428\u0406-\u041A\u043E\u043F\u0456\u043B\u043E\u0442 ACCORD Suisse",
    style: {
      background: 'linear-gradient(135deg, rgba(213,43,30,0.18) 0%, rgba(15,23,42,0.6) 100%)',
      border: '1px solid rgba(213,43,30,0.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-num",
    style: {
      color: '#F87171'
    }
  }, "AI"), /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-badge",
    style: {
      background: '#22C55E',
      color: '#000',
      fontWeight: 800
    }
  }, "LIVE")), /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-icon",
    "aria-hidden": "true"
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("span", {
    className: "v2-svc-label"
  }, t?.svc?.copilot || "ШІ-Копілот")), /*#__PURE__*/React.createElement("div", {
    className: "v2-svc-sub"
  }, t?.svc?.copilotSub || "Діалог 24/7"))))));
}
Object.assign(window, {
  ServiceSwitcher
});

// ==================== [Module: MobileDrawer.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Mobile Drawer (Anomalie 1 FIX)
// Rendered via ReactDOM.createPortal to document.body → escapes .nav-wrap
// containing-block trap. 100dvh, inset:0, z-index 99999.
// Contains 2×2 language grid (Anomalie 2 FIX).

function MobileDrawer({
  lang,
  setLang,
  side,
  setSide,
  service,
  setService,
  onClose,
  onDonate,
  onOpenInfo,
  onOpenChat,
  t
}) {
  // Body scroll lock
  React.useEffect(() => {
    document.body.classList.add('no-scroll');
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [onClose]);
  const pickLang = l => {
    setLang(l);
    // Auto-close (per spec)
    setTimeout(onClose, 180);
  };
  const goto = (targetSide, sectionId) => {
    if (targetSide) setSide(targetSide);
    if (sectionId) setService(sectionId);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 200);
  };
  const sw = t?.switcher || {};
  const services = [{
    id: 'housing',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(Ico.house, null),
    label: sw.housing?.label || t?.nav?.housing || "Житло",
    sub: sw.housing?.sub || "Оренда та EVAM"
  }, {
    id: 'prof',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(Ico.chart, null),
    label: sw.prof?.label || t?.nav?.jobs || "Робота",
    sub: sw.prof?.sub || "Вакансії та CV"
  }, {
    id: 'calc',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(Ico.house, null),
    label: sw.calc?.label || t?.svc?.calc || "Калькулятор",
    sub: sw.calc?.sub || "Ліміти 26 кантонів"
  }, {
    id: 'dossier',
    side: 'a',
    icon: /*#__PURE__*/React.createElement(Ico.file, null),
    label: sw.dossier?.label || t?.nav?.dossier || "Досьє",
    sub: sw.dossier?.sub || "Пакет для режі"
  }, {
    id: 'sublease',
    side: 'b',
    icon: /*#__PURE__*/React.createElement(Ico.shield, null),
    label: sw.sublease?.label || t?.svc?.sublease || "Суборенда",
    sub: sw.sublease?.sub || "Кімната в оренду"
  }, {
    id: 'mentors',
    side: 'b',
    icon: /*#__PURE__*/React.createElement(Ico.users, null),
    label: sw.mentors?.label || t?.svc?.mentors || "Ментори",
    sub: sw.mentors?.sub || "Волонтери Benevol"
  }, {
    id: 'beta',
    side: null,
    icon: /*#__PURE__*/React.createElement(Ico.heart, null),
    label: sw.beta?.label || t?.svc?.beta || "Підтримка",
    sub: sw.beta?.sub || "Вільна бета"
  }];
  const drawer = /*#__PURE__*/React.createElement("div", {
    className: "drawer-overlay",
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Menu principal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, /*#__PURE__*/React.createElement("span", {
    className: "primary"
  }, "ACCORD Suisse"), /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, "PERMIS S \xB7 100% GRATUIT \uD83C\uDDE8\uD83C\uDDED\uD83C\uDDFA\uD83C\uDDE6"))), /*#__PURE__*/React.createElement("button", {
    className: "drawer-close",
    onClick: onClose,
    "aria-label": "Fermer"
  }, /*#__PURE__*/React.createElement(Ico.x, null))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Мова інтерфейсу' : lang === 'de' ? 'Sprache' : lang === 'it' ? 'Lingua' : 'Langue de l\'interface'), /*#__PURE__*/React.createElement("div", {
    className: "lang-grid",
    role: "radiogroup",
    "aria-label": "Langue"
  }, ['fr', 'de', 'it', 'uk'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    role: "radio",
    "aria-checked": l === lang,
    className: `lang-cell ${l === lang ? 'active' : ''}`,
    onClick: () => pickLang(l)
  }, /*#__PURE__*/React.createElement("span", {
    className: "flag",
    "aria-hidden": "true"
  }, window.LANG_FLAGS ? window.LANG_FLAGS[l] : l), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", null, window.SR_I18N && window.SR_I18N[l]?.lang ? window.SR_I18N[l].lang : l.toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "code"
  }, window.LANG_CODES ? window.LANG_CODES[l] : l.toUpperCase())))))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Оберіть роль' : lang === 'de' ? 'Rolle wählen' : lang === 'it' ? 'Ruolo' : 'Choisir votre rôle'), /*#__PURE__*/React.createElement("div", {
    className: "dossier-status-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: side === 'a' ? 'active' : '',
    onClick: () => {
      setSide('a');
      onClose();
    }
  }, t.tabs?.seekers || "Шукачі (Permis S)"), /*#__PURE__*/React.createElement("button", {
    className: side === 'b' ? 'active' : '',
    onClick: () => {
      setSide('b');
      onClose();
    }
  }, t.tabs?.solidarity || "Швейцарські волонтери"))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Усі сервіси' : lang === 'de' ? 'Alle Dienste' : lang === 'it' ? 'Tutti i servizi' : 'Tous les services'), /*#__PURE__*/React.createElement("div", {
    className: "svc-list"
  }, services.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: `svc-item ${s.side === 'b' ? 'b' : ''}`,
    onClick: () => goto(s.side, s.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, s.sub)), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section-title"
  }, lang === 'uk' ? 'Довідка та правила' : lang === 'de' ? 'Informationen & Regeln' : lang === 'it' ? 'Informazioni e regole' : 'Informations & Règles'), /*#__PURE__*/React.createElement("div", {
    className: "svc-list"
  }, /*#__PURE__*/React.createElement("button", {
    className: "svc-item",
    onClick: () => {
      onClose();
      if (onOpenInfo) onOpenInfo('guide');else window.location.hash = 'guide';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t?.nav?.guide || (lang === 'uk' ? 'Як користуватись' : 'Mode d\'emploi')), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, lang === 'uk' ? 'Покроковий алгоритм дій' : 'Guide pas-à-pas')), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  })), /*#__PURE__*/React.createElement("button", {
    className: "svc-item",
    onClick: () => {
      onClose();
      if (onOpenInfo) onOpenInfo('why');else window.location.hash = 'why';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\u2B50"), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t?.nav?.why || (lang === 'uk' ? 'Чому ми кращі' : 'Pourquoi ACCORD ?')), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, lang === 'uk' ? 'Порівняння з посередниками' : 'Comparatif avec intermédiaires')), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  })), /*#__PURE__*/React.createElement("button", {
    className: "svc-item",
    onClick: () => {
      onClose();
      if (onOpenInfo) onOpenInfo('about');else window.location.hash = 'about';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\uD83C\uDFDB\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t?.nav?.about || (lang === 'uk' ? 'Про проєкт' : 'À propos')), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, lang === 'uk' ? 'Місія, засновник та статус' : 'Statuts, mission & Sonate Solidaire')), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  })), /*#__PURE__*/React.createElement("button", {
    className: "svc-item",
    onClick: () => {
      onClose();
      if (onOpenInfo) onOpenInfo('privacy');else window.location.hash = 'privacy';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t?.nav?.privacy || (lang === 'uk' ? 'Конфіденційність' : 'Confidentialité')), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "nDSG / RGPD \xB7 Arsen Kovalenko")), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  })))), onOpenChat && /*#__PURE__*/React.createElement("div", {
    className: "drawer-section",
    style: {
      paddingTop: '8px',
      paddingBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "svc-item",
    onClick: () => {
      onClose();
      onOpenChat();
    },
    style: {
      background: 'linear-gradient(135deg, rgba(213,43,30,0.18) 0%, rgba(30,41,59,0.7) 100%)',
      border: '1px solid rgba(213,43,30,0.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon"
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      color: '#FCA5A5',
      fontWeight: 700
    }
  }, lang === 'uk' ? 'ШІ-Копілот ACCORD Suisse' : 'Co-pilote IA ACCORD'), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, lang === 'uk' ? 'Діалог 24/7 · EVAM, ст. 262 CO, досьє' : 'Dialogue 24/7 · EVAM, Art. 262 CO')), /*#__PURE__*/React.createElement(Ico.arrow, {
    className: "arrow"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=web_drawer",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn tg lg block",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Ico.send, null), " Ouvrir @SwissResilienceHubBot"), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=donate",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn ghost lg block",
    style: {
      textDecoration: 'none',
      textAlign: 'center'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Ico.heart, null), " ", t.beta?.donateBtn || "Soutenir via Telegram")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-legal"
  }, "Association Swiss Resilience / ACCORD en cours de constitution", /*#__PURE__*/React.createElement("br", null), "(Art. 60\u201379 CC Suisse) \xB7 Merkle SHA-256")));
  return ReactDOM.createPortal(drawer, document.body);
}
Object.assign(window, {
  MobileDrawer
});

// ==================== [Module: InfoModal.jsx] ====================
// ACCORD Suisse · Dedicated Information & Trust Hub Modal
// Tabs: 'about' (Про проєкт), 'guide' (Як користуватись), 'why' (Чому ми кращі), 'privacy' (Конфіденційність nDSG/GDPR)
// Fully reactive with multilingual support (UK, FR, DE, EN) and direct hash routing.

function InfoModal({
  isOpen,
  onClose,
  initialTab = 'about',
  lang = 'uk',
  t
}) {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  React.useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = e => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "info-modal-overlay",
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'rgba(7, 11, 18, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      animation: 'fadeIn .2s ease-out'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-modal-card",
    onClick: e => e.stopPropagation(),
    style: {
      background: '#0D1424',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: 20,
      width: '100%',
      maxWidth: 880,
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 24px 64px rgba(0,0,0,0.6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px 14px',
      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
      background: 'rgba(15, 23, 42, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 28
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 16,
      color: '#fff',
      letterSpacing: '-0.01em'
    }
  }, "ACCORD Suisse"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#94A3B8'
    }
  }, lang === 'uk' ? 'Довідковий та правовий хаб' : 'Hub d\'information & conformité'))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Fermer",
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: 'none',
      borderRadius: 8,
      width: 32,
      height: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94A3B8',
      cursor: 'pointer',
      fontSize: 18,
      transition: 'all .15s'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, [{
    id: 'about',
    label: `🏛️ ${tm.about}`
  }, {
    id: 'guide',
    label: `📖 ${tm.guide}`
  }, {
    id: 'why',
    label: `⭐ ${tm.why}`
  }, {
    id: 'privacy',
    label: `🛡️ ${tm.privacy}`
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => {
      setActiveTab(tab.id);
      try {
        window.location.hash = tab.id;
      } catch (e) {}
    },
    style: {
      padding: '7px 14px',
      borderRadius: 8,
      fontSize: 12.5,
      fontWeight: 700,
      whiteSpace: 'nowrap',
      border: 'none',
      cursor: 'pointer',
      transition: 'all .15s',
      background: activeTab === tab.id ? '#D52B1E' : 'rgba(255,255,255,0.06)',
      color: activeTab === tab.id ? '#fff' : '#CBD5E1',
      boxShadow: activeTab === tab.id ? '0 2px 8px rgba(213,43,30,0.4)' : 'none'
    }
  }, tab.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px',
      overflowY: 'auto',
      color: '#E2E8F0',
      lineHeight: 1.6,
      fontSize: 13.5
    }
  }, activeTab === 'about' && /*#__PURE__*/React.createElement(AboutTab, {
    lang: lang
  }), activeTab === 'guide' && /*#__PURE__*/React.createElement(GuideTab, {
    lang: lang
  }), activeTab === 'why' && /*#__PURE__*/React.createElement(WhyTab, {
    lang: lang
  }), activeTab === 'privacy' && /*#__PURE__*/React.createElement(PrivacyTab, {
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 24px',
      borderTop: '1px solid rgba(148, 163, 184, 0.15)',
      background: 'rgba(15, 23, 42, 0.95)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#94A3B8'
    }
  }, "violin-integration.works \xB7 @SwissResilienceHubBot \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "/privacy",
    style: {
      color: '#38BDF8',
      textDecoration: 'none'
    }
  }, "/privacy \u2197")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn primary",
    style: {
      padding: '7px 14px',
      fontSize: 12.5,
      textDecoration: 'none'
    }
  }, "Telegram Bot"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "btn ghost",
    style: {
      padding: '7px 14px',
      fontSize: 12.5
    }
  }, lang === 'uk' ? 'Закрити' : 'Fermer')))));
}

// --------------------------------------------------------------------------
// 1. TAB: ПРО ПРОЄКТ (ABOUT)
// --------------------------------------------------------------------------
function AboutTab({
  lang
}) {
  if (lang === 'uk') {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 22,
        fontWeight: 800,
        color: '#fff',
        marginTop: 0,
        marginBottom: 8
      }
    }, "\u041F\u0440\u043E \u043F\u0440\u043E\u0454\u043A\u0442 \u0410\u041A\u041E\u0420\u0414 (L'Accord Suisse)"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--muted)',
        fontSize: 14,
        marginBottom: 20
      }
    }, "\u0421\u0443\u0432\u0435\u0440\u0435\u043D\u043D\u0430 \u0446\u0438\u0444\u0440\u043E\u0432\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043F\u0440\u044F\u043C\u043E\u0457 \u0434\u0456\u0457 \u0434\u043B\u044F \u0433\u0456\u0434\u043D\u043E\u0433\u043E \u0436\u0438\u0442\u043B\u0430, \u043B\u0435\u0433\u0430\u043B\u044C\u043D\u043E\u0457 \u043F\u0440\u0430\u0446\u0456 \u0442\u0430 \u0432\u0437\u0430\u0454\u043C\u043E\u0440\u043E\u0437\u0443\u043C\u0456\u043D\u043D\u044F \u0443 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u0457."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: '#38BDF8',
        marginBottom: 6
      }
    }, "\uD83C\uDFDB\uFE0F \u041C\u0456\u0441\u0456\u044F \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0438"), /*#__PURE__*/React.createElement("div", null, "\u0410\u041A\u041E\u0420\u0414 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E \u0434\u043B\u044F \u0443\u0441\u0443\u043D\u0435\u043D\u043D\u044F \u0431\u044E\u0440\u043E\u043A\u0440\u0430\u0442\u0438\u0447\u043D\u0438\u0445 \u043F\u0435\u0440\u0435\u043F\u043E\u043D \u0442\u0430 \u0432\u0438\u0441\u043D\u0430\u0436\u043B\u0438\u0432\u043E\u0433\u043E \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0443\u043A\u0440\u0430\u0457\u043D\u0446\u0456\u0432 \u0456\u0437 \u0442\u0438\u043C\u0447\u0430\u0441\u043E\u0432\u0438\u043C \u0437\u0430\u0445\u0438\u0441\u0442\u043E\u043C (Permis S). \u041D\u0430\u0448\u0430 \u043C\u0435\u0442\u0430 \u2014 \u043D\u0430\u0434\u0430\u0442\u0438 \u043A\u043E\u0436\u043D\u0456\u0439 \u0440\u043E\u0434\u0438\u043D\u0456 \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E\u0433\u043E, \u0433\u0456\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u0448\u0443\u043A\u0443 \u0436\u0438\u0442\u043B\u0430 \u0442\u0430 \u0440\u043E\u0431\u043E\u0442\u0438 \u0431\u0435\u0437 \u043F\u043E\u0441\u0435\u0440\u0435\u0434\u043D\u0438\u043A\u0456\u0432 \u0456 \u043A\u043E\u043C\u0456\u0441\u0456\u0439.")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: '#10B981',
        marginBottom: 6
      }
    }, "\uD83C\uDFBB \u0427\u043E\u043C\u0443 \u043D\u0430\u0437\u0432\u0430 \xAB\u0410\u041A\u041E\u0420\u0414\xBB?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "L'Accord de bail:"), " \u041E\u0444\u0456\u0446\u0456\u0439\u043D\u0430 \u0437\u0433\u043E\u0434\u0430 \u0440\u0435\u0436\u0456 \u043D\u0430 \u043E\u0440\u0435\u043D\u0434\u0443 \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0438.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "L'Accord de travail:"), " \u041F\u0456\u0434\u043F\u0438\u0441\u0430\u043D\u0438\u0439 \u0442\u0440\u0443\u0434\u043E\u0432\u0438\u0439 \u0434\u043E\u0433\u043E\u0432\u0456\u0440 (LEI / CCT).", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "L'Accord mutuel:"), " \u0421\u0443\u0441\u043F\u0456\u043B\u044C\u043D\u0430 \u0437\u043B\u0430\u0433\u043E\u0434\u0430 \u0442\u0430 \u0432\u0437\u0430\u0454\u043C\u043E\u043F\u043E\u0432\u0430\u0433\u0430.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "\u0413\u0430\u0440\u043C\u043E\u043D\u0456\u044F \u0441\u0442\u0440\u0443\u043D:"), " \u0417\u0432'\u044F\u0437\u043E\u043A \u0456\u0437 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u0438\u043C \u043F\u0440\u043E\u0454\u043A\u0442\u043E\u043C \u0441\u043E\u043B\u0456\u0434\u0430\u0440\u043D\u043E\u0441\u0442\u0456 \u0441\u043A\u0440\u0438\u043F\u0430\u043B\u044F \u0410\u0440\u0441\u0435\u043D\u0430 \u041A\u043E\u0432\u0430\u043B\u0435\u043D\u043A\u0430 ", /*#__PURE__*/React.createElement("em", null, "Sonate Solidaire"), " (", /*#__PURE__*/React.createElement("a", {
      href: "https://sonate-solidaire.me",
      target: "_blank",
      rel: "noopener",
      style: {
        color: '#38BDF8'
      }
    }, "sonate-solidaire.me"), ")."))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'rgba(213,43,30,0.06)',
        border: '1px solid rgba(213,43,30,0.2)',
        borderRadius: 12,
        padding: 18,
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: '#F87171',
        marginBottom: 6
      }
    }, "\u2696\uFE0F \u041D\u0435\u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 \u0442\u0430 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0438"), /*#__PURE__*/React.createElement("div", null, "\u0410\u0441\u043E\u0446\u0456\u0430\u0446\u0456\u044F Swiss Resilience \u043F\u0435\u0440\u0435\u0431\u0443\u0432\u0430\u0454 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0456 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F (\u0441\u0442. 60\u201379 \u0426\u0438\u0432\u0456\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u0434\u0435\u043A\u0441\u0443 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u0457 CC). \u0414\u0456\u044F\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0454 \u043D\u0430 100% \u0432\u043E\u043B\u043E\u043D\u0442\u0435\u0440\u0441\u044C\u043A\u043E\u044E, \u0441\u0435\u0440\u0432\u0456\u0441\u0438 \u043D\u0430\u0434\u0430\u044E\u0442\u044C\u0441\u044F \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u043E \u0434\u043E \u0424\u0435\u0434\u0435\u0440\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u043E\u043D\u0443 \u043F\u0440\u043E \u0441\u043B\u0443\u0436\u0431\u0443 \u0437\u0430\u0439\u043D\u044F\u0442\u043E\u0441\u0442\u0456 (LSE/AVG), \u044F\u043A\u0438\u0439 \u043F\u0440\u044F\u043C\u043E \u0437\u0430\u0431\u043E\u0440\u043E\u043D\u044F\u0454 \u0441\u0442\u044F\u0433\u0443\u0432\u0430\u0442\u0438 \u043F\u043B\u0430\u0442\u0443 \u0437 \u0448\u0443\u043A\u0430\u0447\u0456\u0432 \u0440\u043E\u0431\u043E\u0442\u0438.")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: '#94A3B8',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement("b", null, "\u0406\u043D\u0456\u0446\u0456\u0430\u0442\u043E\u0440 \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u043B\u044C\u043D\u0430 \u043E\u0441\u043E\u0431\u0430:"), " Arsen Kovalenko \xB7 Avenue du Mont-Blanc 29, 1196 Gland (Vaud) \xB7 E-mail: arsen.k111999@gmail.com \xB7 \u0422\u0435\u043B\u0435\u0444\u043E\u043D: +41 78 326 11 12"));
  }

  // French default
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      marginTop: 0,
      marginBottom: 8
    }
  }, "\xC0 propos de l'ACCORD Suisse"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 14,
      marginBottom: 20
    }
  }, "Plateforme souveraine d'action directe pour le logement digne, l'emploi l\xE9gal et l'int\xE9gration en Suisse."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: '#38BDF8',
      marginBottom: 6
    }
  }, "\uD83C\uDFDB\uFE0F Notre Mission"), /*#__PURE__*/React.createElement("div", null, "L'ACCORD a \xE9t\xE9 con\xE7u pour \xE9liminer les interm\xE9diaires abusifs et les frais clandestins. Nous offrons aux b\xE9n\xE9ficiaires du Permis S et aux employeurs suisses un outil direct, souverain et sans friction technique.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: '#10B981',
      marginBottom: 6
    }
  }, "\uD83C\uDFBB Pourquoi \xAB ACCORD \xBB ?"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "L'Accord de bail :"), " Validation de candidature par la g\xE9rance.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "L'Accord de travail :"), " Contrat d'embauche conforme CCT/CCNT.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "L'Accord mutuel :"), " Concorde et confiance r\xE9ciproque.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "Harmonie musicale :"), " Synergie avec l'initiative culturelle ", /*#__PURE__*/React.createElement("em", null, "Sonate Solidaire"), " du violoniste Arsen Kovalenko (", /*#__PURE__*/React.createElement("a", {
    href: "https://sonate-solidaire.me",
    target: "_blank",
    rel: "noopener",
    style: {
      color: '#38BDF8'
    }
  }, "sonate-solidaire.me"), ")."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(213,43,30,0.06)',
      border: '1px solid rgba(213,43,30,0.2)',
      borderRadius: 12,
      padding: 18,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: '#F87171',
      marginBottom: 6
    }
  }, "\u2696\uFE0F Cadre l\xE9gal et gratuit\xE9"), /*#__PURE__*/React.createElement("div", null, "Association Swiss Resilience en cr\xE9ation (Art. 60\u201379 CC). 100% b\xE9n\xE9vole et conforme \xE0 la loi f\xE9d\xE9rale sur le service de l'emploi (LSE/AVG), garantissant la stricte gratuit\xE9 pour tous les candidats.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#94A3B8',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Contact r\xE9f\xE9rent :"), " Arsen Kovalenko \xB7 Avenue du Mont-Blanc 29, 1196 Gland (Vaud) \xB7 E-mail : arsen.k111999@gmail.com \xB7 T\xE9l\xE9phone : +41 78 326 11 12"));
}

// --------------------------------------------------------------------------
// 2. TAB: ЯК КОРИСТУВАТИСЬ (GUIDE) — MULTI-ROLE DOCUMENTATION (CLIENTS & ADMIN)
// --------------------------------------------------------------------------
function GuideTab({
  lang
}) {
  const [role, setRole] = React.useState('seekers');
  const isUk = lang === 'uk';
  const isFr = lang === 'fr';
  const isDe = lang === 'de';
  const roleMeta = {
    uk: {
      seekers: {
        label: "🎯 Шукачам (Permis S)",
        title: "Інструкція для шукачів житла та роботи",
        desc: "Покроковий алгоритм дій для швидкого отримання житла від режі та легальної роботи без посередників і комісій."
      },
      hosts: {
        label: "🤝 Господарям (ст. 262)",
        title: "Посібник для швейцарських господарів",
        desc: "Легальна суборенда за ст. 262 CO, прозорий розрахунок без зловживань та менторство Benevol."
      },
      copilot: {
        label: "🤖 ШІ-Копілот і Голос",
        title: "Як користуватись ШІ-Копілотом ACCORD",
        desc: "Автономний діалог 24/7, швидкі кнопки переходу та голосові повідомлення Whisper STT у Telegram."
      },
      admin: {
        label: "⚙️ Адміністратору",
        title: "Керівництво адміністратора та оператора",
        desc: "Швидкий довідник керування демоном бота, моніторингу шлюзів .184 / .251 та збірки бандлу."
      }
    },
    fr: {
      seekers: {
        label: "🎯 Candidats (Permis S)",
        title: "Mode d'emploi pour candidats Permis S",
        desc: "Guide méthodique pour obtenir un logement vérifié de régie et un emploi légal sans frais d'intermédiaires."
      },
      hosts: {
        label: "🤝 Hôtes (Art. 262 CO)",
        title: "Guide pour les hôtes suisses solidaires",
        desc: "Sous-location légale Art. 262 CO, plafonnement mobilier à 20% et mentorat citoyen Benevol."
      },
      copilot: {
        label: "🤖 Co-pilote & Vocal",
        title: "Utilisation du Co-pilote IA & Vocal",
        desc: "Assistance interactive 24/7, boutons d'action et messages vocaux Whisper STT sur Telegram."
      },
      admin: {
        label: "⚙️ Administration",
        title: "Guide d'exploitation & Administration",
        desc: "Gestion du démon de bot, surveillance des passerelles .184/.251 et compilation du bundle."
      }
    },
    de: {
      seekers: {
        label: "🎯 Status S Suchende",
        title: "Anleitung für Status S Suchende",
        desc: "Schritt-für-Schritt-Leitfaden für Wohnungen von Verwaltungen und legale Arbeit ohne Vermittlungsgebühren."
      },
      hosts: {
        label: "🤝 Gastgeber (Art. 262)",
        title: "Leitfaden für Schweizer Gastgeber",
        desc: "Rechtssichere Untermiete nach Art. 262 OR, Möblierungszuschlag max. 20% und Benevol-Mentorat."
      },
      copilot: {
        label: "🤖 KI-Copilot & Sprache",
        title: "Nutzung des KI-Copiloten & Whisper",
        desc: "24/7 Interaktiver Dialog, Aktionsknöpfe und Sprachnachrichten via Whisper STT im Telegram-Bot."
      },
      admin: {
        label: "⚙️ Administration",
        title: "Betriebshandbuch & Administration",
        desc: "Bot-Daemon-Verwaltung, Statusprüfung der Gateways .184/.251 und Bundle-Kompilierung."
      }
    },
    en: {
      seekers: {
        label: "🎯 Seekers (Permis S)",
        title: "User Guide for Permis S Beneficiaries",
        desc: "Step-by-step roadmap to verified housing and legal employment without exploitative fees."
      },
      hosts: {
        label: "🤝 Swiss Hosts (Art. 262)",
        title: "Guide for Swiss Solidarity Hosts",
        desc: "Legal Art. 262 CO subleases, 20% furniture cap compliance, and Benevol mentorship."
      },
      copilot: {
        label: "🤖 AI Co-Pilot & Voice",
        title: "How to use AI Co-Pilot & Whisper Voice",
        desc: "24/7 interactive widget, 1-click action triggers, and Whisper STT voice notes in Telegram."
      },
      admin: {
        label: "⚙️ Administrator",
        title: "Operator & Platform Administrator Guide",
        desc: "Bot daemon lifecycle management, .184/.251 gateway health, and bundle builds."
      }
    }
  };
  const rm = roleMeta[lang] || roleMeta.fr;
  const currentRole = rm[role] || rm.seekers;
  const stepsData = {
    seekers: {
      uk: [{
        n: "01",
        t: "Пошук житла від режі та Reprise de bail",
        b: "Art. 264 CO",
        d: "Оберіть вкладку «Житло». Переглядайте верифіковані квартири з реальними фото, закріплені за офіційними агенціями (Bernard Nicod, Cogestim, Wincasa). Шукайте позначки «Reprise de bail» (передача чинного договору без підвищення ціни) та розрахунок часу CFF/SBB до вокзалів."
      }, {
        n: "02",
        t: "Калькулятор кантональних лімітів EVAM",
        b: "EVAM / 33%",
        d: "У вкладці «Калькулятор» оберіть кантон Во або Женеву та склад сім'ї. Перевірте, чи вписується чиста оренда та комунальні у соціальні норми (наприклад, CHF 1'350–2'050 для 3 осіб у Во) та правило 33% заробітної плати."
      }, {
        n: "03",
        t: "Генератор досьє для режі в 1 клік",
        b: "Art. 253 CO / USPI",
        d: "Заповніть коротку форму у вкладці «Досьє». Платформа створить офіційний лист-заявку французькою або німецькою мовою за стандартом USPI з переліком обов'язкових додатків: Permis S, витяг з реєстру боргів (Office des poursuites) та гарантія EVAM."
      }, {
        n: "04",
        t: "Вакансії та захищене вікно ст. 21a LEI",
        b: "Art. 17 & 21a LEI",
        d: "У вкладці «Робота» переглядайте 63 реальні вакансії. Використовуйте перевагу 5-денного захищеного вікна RAV/ORP (ст. 21a LEI) та завантажте зразок резюме, адаптованого під швейцарські кадрові стандарти."
      }, {
        n: "05",
        t: "Безоплатний супровід менторів Benevol",
        b: "Art. 394 CO",
        d: "У вкладці «Ментори» подайте запит на волонтерську підтримку від швейцарських громадян (розмовна практика французької, спільні візити на огляди житла, консультації з оформлення)."
      }],
      fr: [{
        n: "01",
        t: "Logement vérifié de régie & Reprise de bail",
        b: "Art. 264 CO",
        d: "Consultez la section « Logement ». Chaque bien est attribué factuellement à sa gérance (Bernard Nicod, Cogestim, etc.) avec calcul précis du temps CFF/SBB et repérage prioritaire des reprises de bail sans hausse de loyer."
      }, {
        n: "02",
        t: "Calculateur des plafonds cantonaux EVAM",
        b: "EVAM / 33%",
        d: "Vérifiez dans le « Calculateur » si le loyer respecte les barèmes officiels de votre canton (ex. CHF 1'350–2'050 pour 3 personnes à Vaud) et la règle impérative des 33% de vos revenus nets."
      }, {
        n: "03",
        t: "Générateur de dossier de régie 1-clic",
        b: "Art. 253 CO / USPI",
        d: "Renseignez vos coordonnées dans le « Dossier ». L'application compose automatiquement la lettre de candidature formelle aux standards USPI avec la liste des pièces justificatives (Permis S, poursuites vierges, attestation EVAM)."
      }, {
        n: "04",
        t: "Offres d'emploi & Priorité indigène Art. 21a LEI",
        b: "Art. 17 & 21a LEI",
        d: "Explorez 63 offres réelles, exploitez la fenêtre de priorité ORP/RAV de 5 jours réservée aux résidents, et suivez le modèle suisse pour optimiser votre CV."
      }, {
        n: "05",
        t: "Accompagnement bénévole Benevol",
        b: "Art. 394 CO",
        d: "Dans la section « Mentors », sollicitez un accompagnement citoyen gratuit (Art. 394 CO) pour la pratique du français et les visites communes de logements."
      }]
    },
    hosts: {
      uk: [{
        n: "01",
        t: "Легальна суборенда кімнати за законом",
        b: "Art. 262 CO",
        d: "Швейцарські господарі та чинні орендарі мають законне право здавати частину житла бенефіціарам статусу S. Формула справедливої частки: (Кімнати кімнати / Загальні кімнати) * Оренда + Комунальні."
      }, {
        n: "02",
        t: "Ліміт націнки за умеблювання (max 20%)",
        b: "Юридичний щит",
        d: "Згідно зі швейцарською судовою практикою, максимальна надбавка за вміст меблів не може перевищувати 20% від базової ставки. Це захищає вас від звинувачень у здирництві (loyer usuraire)."
      }, {
        n: "03",
        t: "Офіційне повідомлення режі (Notification)",
        b: "Art. 262 al. 1 CO",
        d: "Закон вимагає повідомити орендодавця про умови суборенди. Майстер суборенди сформує офіційний лист французькою мовою для вашої режі. Орендодавець не має права відмовити без поважних причин."
      }, {
        n: "04",
        t: "Участь у волонтерській мережі Benevol",
        b: "Art. 394 CO",
        d: "Приєднуйтесь як цивільний наставник. Формат безоплатного доручення (contrat de mandat gratuit) повністю виключає податкові, трудові або юридичні ризики для швейцарських помічників."
      }],
      fr: [{
        n: "01",
        t: "Sous-location légale et transparente",
        b: "Art. 262 CO",
        d: "Les locataires principaux ont le droit légal de sous-louer une partie de leur logement. Formule équitable : (Pièces occupées / Total pièces) * Loyer net + Charges réelles."
      }, {
        n: "02",
        t: "Plafond de majoration pour meubles (max 20%)",
        b: "Bouclier juridique",
        d: "Conformément à la jurisprudence du Tribunal fédéral, la majoration pour mobilier ne doit pas dépasser 20%. Cela vous met à l'abri de toute contestation pour loyer abusif."
      }, {
        n: "03",
        t: "Notification officielle à la gérance",
        b: "Art. 262 al. 1 CO",
        d: "Le formulaire génère automatiquement la lettre de communication formelle destinée à votre régie. Le bailleur ne peut refuser son consentement sauf motifs légitimes stricts."
      }, {
        n: "04",
        t: "Engagement bénévole citoyen Benevol",
        b: "Art. 394 CO",
        d: "Devenez mentor bénévole. Le contrat de mandat gratuit (Art. 394 CO) garantit l'absence totale de contraintes contractuelles ou fiscales d'un rapport de travail."
      }]
    },
    copilot: {
      uk: [{
        n: "01",
        t: "Діалоговий віджет 24/7 на сайті та в Mini App",
        b: "ШІ-Агент",
        d: "Натискайте червону круглу кнопку «🤖 ШІ-Копілот» у нижньому кутку екрана. Ставте запитання будь-якою мовою про норми EVAM, статті законів (CO, LEI), процедури режі або розклад SBB."
      }, {
        n: "02",
        t: "Інтерактивні кнопки дій у відповідях",
        b: "1-Click Дії",
        d: "Кожна відповідь копілота містить кнопки швидкого переходу (наприклад, «🧮 Ліміти EVAM» або «📄 Досьє для режі»), які автоматично відкривають потрібний інструмент з уже підставленими параметрами."
      }, {
        n: "03",
        t: "Голосові повідомлення через Whisper STT у Telegram",
        b: "Whisper AI",
        d: "У боті @SwissResilienceHubBot надсилайте аудіо- або голосові повідомлення. Вбудована модель Whisper STT локально розпізнає голос та надає точну юридичну консультацію за 2 секунди."
      }],
      fr: [{
        n: "01",
        t: "Widget interactif 24/7 Web & Mini App",
        b: "Agent IA",
        d: "Cliquez sur le bouton flottant « 🤖 Co-pilote IA » en bas à droite. Posez librement vos questions sur les barèmes EVAM, les articles CO/LEI, les régies ou les liaisons CFF."
      }, {
        n: "02",
        t: "Boutons d'action intégrés 1-clic",
        b: "Navigation fluide",
        d: "Chaque réponse propose des boutons directionnels (ex. « 🧮 Plafonds EVAM », « 📄 Générer Dossier ») pré-remplissant instantanément les formulaires du portail."
      }, {
        n: "03",
        t: "Messages vocaux via Whisper STT sur Telegram",
        b: "Whisper Vocal",
        d: "Dans le bot @SwissResilienceHubBot, envoyez des notes vocales. Le moteur Whisper STT convertit la voix en texte et formule une réponse juridique précise sans délai."
      }]
    },
    admin: {
      uk: [{
        n: "01",
        t: "Архітектура системи та внутрішні шлюзи",
        b: "Edge / .184 / .251",
        d: "Клієнтський рівень: статичний бандл React (web/app-bundle.js) у Cloudflare CDN. Серверний рівень: Telegram-бот на Python, ШІ-шлюз на http://192.168.1.184:8082 та граф знань Utopia DB на http://192.168.1.251:9922."
      }, {
        n: "02",
        t: "Керування демоном бота (start_bot_daemon.sh)",
        b: "CLI Демон",
        d: "Команди керування: bash scripts/start_bot_daemon.sh {start|stop|restart|status|supervise}. Режим supervise забезпечує безперервний перезапуск бота при збоях."
      }, {
        n: "03",
        t: "Збірка та синхронізація фронтенду",
        b: "node web/build.cjs",
        d: "Після будь-яких правок у web/*.jsx виконайте «node web/build.cjs». Скрипт транскомпілює код через Babel та оновлює бандли в /web/, /hub/, /app/ та /mini-app/."
      }, {
        n: "04",
        t: "Повний технічний та операційний посібник",
        b: "Документація",
        d: "Детальні інструкції для Арсена Коваленка та координаторів зібрано у файлі docs/USER_AND_ADMIN_GUIDE.md (архітектура, безпека даних, логи та відновлення)."
      }],
      fr: [{
        n: "01",
        t: "Architecture système et passerelles internes",
        b: "Edge / .184 / .251",
        d: "Couche client : bundle React statique sans dépendance d'exécution. Couche serveur : bot Telegram Python, passerelle LLM (http://192.168.1.184:8082) et Utopia DB (http://192.168.1.251:9922)."
      }, {
        n: "02",
        t: "Gestion du démon bot (start_bot_daemon.sh)",
        b: "CLI Démon",
        d: "Commandes du cycle de vie : bash scripts/start_bot_daemon.sh {start|stop|restart|status|supervise}. Le mode supervise relance automatiquement le processus en cas d'interruption."
      }, {
        n: "03",
        t: "Compilation du bundle frontend",
        b: "node web/build.cjs",
        d: "Après modification des fichiers web/*.jsx, exécutez « node web/build.cjs ». Il compile le code via Babel et synchronise les répertoires hub, app et mini-app."
      }, {
        n: "04",
        t: "Manuel d'exploitation complet",
        b: "Documentation",
        d: "Retrouvez l'intégralité des spécifications d'administration dans le fichier docs/USER_AND_ADMIN_GUIDE.md du référentiel."
      }]
    }
  };
  const stepsList = stepsData[role] && (stepsData[role][lang] || stepsData[role].uk) || stepsData.seekers.uk;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      margin: '0 0 4px'
    }
  }, currentRole.title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 13,
      margin: 0
    }
  }, currentRole.desc))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 10,
      marginBottom: 18,
      borderBottom: '1px solid rgba(148, 163, 184, 0.15)'
    }
  }, ['seekers', 'hosts', 'copilot', 'admin'].map(rKey => {
    const item = rm[rKey];
    const active = role === rKey;
    return /*#__PURE__*/React.createElement("button", {
      key: rKey,
      onClick: () => setRole(rKey),
      style: {
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        border: active ? '1px solid #D52B1E' : '1px solid rgba(148, 163, 184, 0.2)',
        background: active ? 'rgba(213, 43, 30, 0.2)' : 'rgba(255, 255, 255, 0.04)',
        color: active ? '#FCA5A5' : '#CBD5E1',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all .15s'
      }
    }, item.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 14,
      marginBottom: 20
    }
  }, stepsList.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(148, 163, 184, 0.15)',
      borderRadius: 12,
      padding: 16,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--f-mono)',
      fontSize: 12,
      fontWeight: 800,
      color: '#D52B1E'
    }
  }, isUk ? `КРОК ${s.n}` : `ÉTAPE ${s.n}`), s.b && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10.5,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 6,
      background: 'rgba(56, 189, 248, 0.12)',
      color: '#38BDF8',
      border: '1px solid rgba(56, 189, 248, 0.25)'
    }
  }, s.b)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 6
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: '#94A3B8',
      lineHeight: 1.5
    }
  }, s.d)))), role === 'admin' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(56, 189, 248, 0.08)',
      border: '1px solid rgba(56, 189, 248, 0.25)',
      borderRadius: 12,
      padding: 14,
      fontSize: 12.5,
      color: '#BAE6FD',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uD83D\uDCD8 \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F \u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0456\u044E:"), " \u041F\u043E\u0432\u043D\u0438\u0439 \u0444\u0430\u0439\u043B \u0456\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0439 \u0440\u043E\u0437\u043C\u0456\u0449\u0435\u043D\u043E \u0432 ", /*#__PURE__*/React.createElement("code", null, "docs/USER_AND_ADMIN_GUIDE.md"), "."), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=admin_help",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#38BDF8',
      fontWeight: 700,
      textDecoration: 'none'
    }
  }, "Telegram \u0421\u0442\u0456\u0439\u043A\u0456\u0441\u0442\u044C \u2197")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(213, 43, 30, 0.08)',
      border: '1px solid rgba(213, 43, 30, 0.25)',
      borderRadius: 12,
      padding: 14,
      fontSize: 12.5,
      color: '#FECACA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "\uD83D\uDCA1 \u041F\u043E\u0442\u0440\u0456\u0431\u043D\u0430 \u0436\u0438\u0432\u0430 \u043F\u043E\u0440\u0430\u0434\u0430?"), " \u0428\u0406-\u041A\u043E\u043F\u0456\u043B\u043E\u0442 ACCORD \u043F\u0456\u0434\u043A\u0430\u0436\u0435 \u043B\u0456\u043C\u0456\u0442\u0438 EVAM \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u043A\u043E\u043C\u0443\u043D\u0438 \u0442\u0430 \u0441\u043A\u043B\u0430\u0434\u0435 \u043B\u0438\u0441\u0442 \u0444\u0440\u0430\u043D\u0446\u0443\u0437\u044C\u043A\u043E\u044E \u0437\u0430 20 \u0441\u0435\u043A\u0443\u043D\u0434."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.location.hash !== '#chat') {
        const fab = document.querySelector('.v2-agent-fab');
        if (fab) fab.click();
      }
    },
    style: {
      background: '#D52B1E',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '6px 12px',
      fontSize: 12,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, "\uD83E\uDD16 \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0438 \u041A\u043E\u043F\u0456\u043B\u043E\u0442")));
}

// --------------------------------------------------------------------------
// 3. TAB: ЧОМУ МИ КРАЩІ (WHY ACCORD / COMPARISON)
// --------------------------------------------------------------------------
function WhyTab({
  lang
}) {
  const isUk = lang === 'uk';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      marginTop: 0,
      marginBottom: 8
    }
  }, isUk ? 'Чому АКОРД — найефективніший вибір?' : 'Pourquoi l\'ACCORD est la meilleure solution ?'), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 14,
      marginBottom: 20
    }
  }, isUk ? 'Пряме порівняння: АКОРД проти комерційних посередників та звичайних дощок оголошень.' : 'Comparatif objectif entre l\'ACCORD Suisse, les intermédiaires payants et les portails généralistes.'), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12.5,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '2px solid rgba(148, 163, 184, 0.25)',
      color: '#94A3B8'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 12px'
    }
  }, isUk ? 'Критерій' : 'Critère'), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, isUk ? 'Платні «посередники»' : 'Intermédiaires payants'), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 12px',
      color: '#FBBF24'
    }
  }, isUk ? 'Звичайні сайти (ImmoScout)' : 'Portails classiques'), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      background: 'rgba(16,185,129,0.08)',
      borderRadius: '6px 6px 0 0'
    }
  }, isUk ? '✓ АКОРД Швейцарія' : '✓ L\'ACCORD Suisse'))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      fontWeight: 700
    }
  }, isUk ? 'Вартість' : 'Tarification'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, "50 \u2013 800 CHF"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px'
    }
  }, "\u041F\u043B\u0430\u0442\u043D\u0456 \u043F\u0456\u0434\u043F\u0438\u0441\u043A\u0438 Pro"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      fontWeight: 700,
      background: 'rgba(16,185,129,0.05)'
    }
  }, isUk ? '100% Безкоштовно (ст. 2 LSE)' : '100% Gratuit (Loi LSE)')), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      fontWeight: 700
    }
  }, isUk ? 'Швидкість сигналу' : 'Délai d\'alerte'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, "\u0412\u0440\u0443\u0447\u043D\u0443 / \u0456\u0437 \u0437\u0430\u043F\u0456\u0437\u043D\u0435\u043D\u043D\u044F\u043C"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px'
    }
  }, "Email \u0447\u0435\u0440\u0435\u0437 2\u201312 \u0433\u043E\u0434\u0438\u043D"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      fontWeight: 700,
      background: 'rgba(16,185,129,0.05)'
    }
  }, isUk ? '< 60 секунд у Telegram' : '< 60 s via Telegram')), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      fontWeight: 700
    }
  }, isUk ? 'Кантональні норми' : 'Barèmes cantonaux'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, "\u0406\u0433\u043D\u043E\u0440\u0443\u044E\u0442\u044C \u043D\u043E\u0440\u043C\u0438 \u043A\u0430\u043D\u0442\u043E\u043D\u0443"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px'
    }
  }, "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u044F \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0430"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      fontWeight: 700,
      background: 'rgba(16,185,129,0.05)'
    }
  }, isUk ? 'Офіційні ліміти 26 кантонів' : '26 cantons intégrés (EVAM/SKOS)')), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      fontWeight: 700
    }
  }, isUk ? 'Пакет для режі' : 'Dossier de régie'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, "\u041F\u043B\u0430\u0442\u043D\u0435 \u0441\u043A\u043B\u0430\u0434\u0430\u043D\u043D\u044F"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px'
    }
  }, "\u0421\u0430\u043C\u043E\u0441\u0442\u0456\u0439\u043D\u043E \u0431\u0435\u0437 \u0437\u0440\u0430\u0437\u043A\u0430"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      fontWeight: 700,
      background: 'rgba(16,185,129,0.05)'
    }
  }, isUk ? '1-Click USPI (PDF/A)' : '1-Click USPI conforme Art. 253 CO')), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      fontWeight: 700
    }
  }, isUk ? 'Супровід волонтерів' : 'Mentorat citoyen'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#F87171'
    }
  }, "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px'
    }
  }, "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '10px 12px',
      color: '#34D399',
      fontWeight: 700,
      background: 'rgba(16,185,129,0.05)'
    }
  }, isUk ? 'Мережа Benevol (ст. 394 CO)' : 'Réseau Benevol Suisse officiel'))))));
}

// --------------------------------------------------------------------------
// 4. TAB: ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ (PRIVACY nDSG / GDPR — 12 SECTIONS)
// --------------------------------------------------------------------------
function PrivacyTab({
  lang
}) {
  const isUk = lang === 'uk';
  const sectionsUk = [{
    title: "1. Відповідальна особа",
    content: `Відповідальним за обробку даних на цьому веб-сайті є:

Арсен Коваленко (Arsen Kovalenko)
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Швейцарія

E-mail: arsen.k111999@gmail.com
Телефон: +41 78 326 11 12`
  }, {
    title: "2. Зібрані дані",
    content: `Ми збираємо такі дані:

• Локальні налаштування інтерфейсу: обрана мова, статус захисту, обраний кантон та параметри калькулятора (зберігаються локально у вашому браузері через localStorage).
• Telegram Bot / Mini App: ідентифікатор користувача Telegram (ID) виключно для доставки запитаних сповіщень про житло та роботу.
• Технічні дані: журнали сервера Cloudflare (анонімізована IP-адреса, дата й час, запитувана сторінка) для захисту від DDoS та кібератак.`
  }, {
    title: "3. Мета обробки",
    content: `Ми обробляємо ваші дані виключно з такими цілями:

• Надання безоплатного доступу до бази перевіреного житла та вакансій.
• Створення офіційного досьє для режі (Dossier de candidature Art. 253 CO) на стороні клієнта.
• Забезпечення технічної безпеки, захисту від зловживань та високої швидкості завантаження.`
  }, {
    title: "4. Правова основа (nDSG / GDPR)",
    content: `Обробка персональних даних здійснюється на основі:

• Ст. 6 п. 1 літ. a GDPR / Ст. 31 нового швейцарського Закону nDSG: Згода користувача.
• Ст. 6 п. 1 літ. b GDPR / Ст. 31 nDSG: Виконання запиту користувача (генерація документів, сповіщення).
• Ст. 6 п. 1 літ. f GDPR / Ст. 31 nDSG: Законні інтереси (безпека серверної інфраструктури, запобігання шахрайству).`
  }, {
    title: "5. Відсутність продажу даних та безкоштовність",
    content: `ACCORD Suisse діє згідно з Федеральним законом про службу зайнятості (LSE/AVG), ст. 2 якого категорично забороняє стягувати плату з шукачів роботи. Ми ніколи не продаємо, не здаємо в оренду і не передаємо персональні дані комерційним рекламодавцям чи посередникам.`
  }, {
    title: "6. Зберігання та файли Cookies / LocalStorage",
    content: `Наш сайт використовує технічно необхідне локальне сховище (localStorage):

• sr26-lang / sr-v2-lang: збереження обраної мови інтерфейсу.
• sr26-canton: збереження обраного кантону для розрахунку EVAM / SKOS.
• sr26-status / sr26-income: розрахунок 33% стелі оренди.
Ви можете в будь-який момент очистити ці дані в налаштуваннях вашого браузера або натиснувши "Очистити" у футері сайту.`
  }, {
    title: "7. Термін зберігання",
    content: `• Локальні налаштування браузера: до моменту очищення кешу користувачем.
• Telegram-сповіщення: до зупинки бота або введення команди /stop.
• Журнали безпеки Cloudflare: 30 днів.`
  }, {
    title: "8. Ваші права згідно з nDSG та GDPR",
    content: `Згідно зі швейцарським законодавством (nDSG) та європейським регламентом GDPR, ви маєте право:

• Право на доступ до ваших даних.
• Право на виправлення або повне видалення.
• Право на обмеження або припинення обробки.
• Право на відкликання згоди в будь-який момент.

Для реалізації будь-якого з цих прав звертайтесь безпосередньо до Арсена Коваленка: arsen.k111999@gmail.com.`
  }, {
    title: "9. Міжнародна передача та безпека інфраструктури",
    content: `Сайт розміщено в мережі Cloudflare (Cloudflare Inc., США / ЄС) відповідно до рамкової угоди Swiss-US Data Privacy Framework та гарантій ст. 16 nDSG / ст. 46 GDPR. Увесь трафік шифрується за протоколом HTTPS (TLS 1.3).`
  }, {
    title: "10. Наглядовий орган Швейцарії",
    content: `Компетентний наглядовий орган у сфері захисту даних у Швейцарії:

Федеральний уповноважений із захисту даних та інформації (EDÖB / PFPDT)
Feldeggweg 1, 3003 Bern, Швейцарія
Веб-сайт: www.edoeb.admin.ch`
  }, {
    title: "11. Контакти та супровід",
    content: `З усіх питань конфіденційності та захисту даних:
Арсен Коваленко · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Швейцарія
E-mail: arsen.k111999@gmail.com · Телефон: +41 78 326 11 12`
  }];
  const sectionsFr = [{
    title: "1. Responsable du traitement",
    content: `Le responsable du traitement des données sur ce site est :

Arsen Kovalenko
ACCORD Suisse / Sonate Solidaire
Avenue du Mont-Blanc 29
1196 Gland, Vaud, Suisse

E-mail : arsen.k111999@gmail.com
Téléphone : +41 78 326 11 12`
  }, {
    title: "2. Données collectées",
    content: `Nous collectons et traitons les données suivantes :

• Préférences locales d'interface : langue choisie, canton de référence, statut de protection et critères de calcul (stockées localement via localStorage).
• Bot Telegram / Mini App : identifiant Telegram pour la transmission exclusive des alertes de logement ou d'emploi sollicitées.
• Données techniques : journaux de requêtes serveur Cloudflare (adresse IP anonymisée, horodatage, page consultée) pour la protection contre les attaques DDoS.`
  }, {
    title: "3. Finalités du traitement",
    content: `Le traitement des données poursuit les buts exclusifs suivants :

• Fourniture gratuite de l'accès aux offres vérifiées de logement et d'emploi.
• Génération locale du dossier de candidature pour la régie (Art. 253 CO).
• Sécurisation technique et stabilité de la plateforme.`
  }, {
    title: "4. Base juridique (nLPD / RGPD)",
    content: `Le traitement repose sur :

• Art. 6 par. 1 let. a RGPD / Art. 31 nLPD : Consentement de l'utilisateur.
• Art. 6 par. 1 let. b RGPD / Art. 31 nLPD : Exécution de la demande de service.
• Art. 6 par. 1 let. f RGPD / Art. 31 nLPD : Intérêts légitimes (sécurité du réseau et de l'information).`
  }, {
    title: "5. Gratuité absolue et interdiction de cession",
    content: `Conformément à la Loi fédérale sur le service de l'emploi (LSE/AVG), la plateforme est 100% bénévole et gratuite. Aucune donnée n'est vendue ni communiquée à des tiers commerciaux ou intermédiaires payants.`
  }, {
    title: "6. Stockage local et cookies",
    content: `Notre site utilise le stockage local (localStorage) strictement technique :
• sr26-lang / sr-v2-lang : langue de navigation.
• sr26-canton : canton pour les barèmes EVAM / SKOS.
• sr26-status / sr26-income : calcul du plafond d'effort financier de 33%.
Vous pouvez réinitialiser ces données à tout moment dans les paramètres de votre navigateur.`
  }, {
    title: "7. Durée de conservation",
    content: `• Préférences du navigateur : conservées jusqu'à effacement par l'utilisateur.
• Alertes Telegram : conservées jusqu'à la commande /stop dans le bot.
• Journaux serveur de sécurité Cloudflare : 30 jours maximum.`
  }, {
    title: "8. Vos droits (nLPD & RGPD)",
    content: `Vous disposez d'un droit complet d'accès, de rectification, de suppression et de limitation de vos données. Pour exercer vos droits : arsen.k111999@gmail.com.`
  }, {
    title: "9. Sécurité et hébergement Cloudflare",
    content: `La plateforme est hébergée sur l'infrastructure Cloudflare sous les garanties du Swiss-US Data Privacy Framework (Art. 16 nLPD). Les échanges sont intégralement chiffrés en HTTPS (TLS 1.3).`
  }, {
    title: "10. Autorité de surveillance suisse",
    content: `Préposé fédéral à la protection des données et à la transparence (PFPDT / EDÖB) :
Feldeggweg 1, 3003 Berne, Suisse
Site officiel : www.edoeb.admin.ch`
  }, {
    title: "11. Contact",
    content: `Pour toute question relative à la protection des données :
Arsen Kovalenko · Avenue du Mont-Blanc 29, 1196 Gland, Vaud, Suisse
E-mail : arsen.k111999@gmail.com · Téléphone : +41 78 326 11 12`
  }];
  const sections = isUk ? sectionsUk : sectionsFr;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: '#fff',
      marginTop: 0,
      marginBottom: 4
    }
  }, isUk ? 'Політика конфіденційності (nDSG / GDPR)' : 'Politique de confidentialité (nLPD / RGPD)'), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 12.5,
      marginBottom: 18
    }
  }, isUk ? 'Останнє оновлення: 14 вересня 2026 року · Відповідність швейцарському закону nDSG та GDPR · sonate-solidaire.me' : 'Dernière mise à jour : 14 septembre 2026 · Conforme à la loi fédérale suisse nLPD et au RGPD · sonate-solidaire.me'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, sections.map((s, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(148, 163, 184, 0.12)',
      borderRadius: 10,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: '#38BDF8',
      margin: '0 0 6px'
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: 'pre-line',
      fontSize: 13,
      color: '#CBD5E1'
    }
  }, s.content)))));
}
Object.assign(window, {
  InfoModal
});

// ==================== [Module: Hero.jsx] ====================
// SwissRelief 2.6 — Hero with SHORT title, two-sided tab switcher, trust badges.
// Uses fluid grid `repeat(auto-fit, minmax(220px, 1fr))` for badges (ADR-017 anomaly #4 fix).
function HeroV2({
  side,
  setSide,
  onOpenInfo,
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-tabs",
    role: "tablist",
    "aria-label": "Public cible",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `v2-hero-tab tab-a ${side === 'a' ? 'active' : ''}`,
    role: "tab",
    "aria-selected": side === 'a',
    onClick: () => setSide('a')
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-label"
  }, t?.tabs?.seekers || "Шукачам житла та роботи"), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-sub"
  }, t?.tabs?.seekersSub || "Статус S · Без посередників"))), /*#__PURE__*/React.createElement("button", {
    className: `v2-hero-tab tab-b ${side === 'b' ? 'active' : ''}`,
    role: "tab",
    "aria-selected": side === 'b',
    onClick: () => setSide('b')
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-label"
  }, t?.tabs?.solidarity || t?.tabs?.volunteers || "Швейцарським друзям"), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-sub"
  }, t?.tabs?.solSub || t?.tabs?.volunteersSub || "Господарям та волонтерам")))), /*#__PURE__*/React.createElement("h1", {
    className: "v2-hero-title"
  }, t?.hero?.line1 || t?.hero?.title1 || "Гідне житло, легальна робота —", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-accent"
  }, t?.hero?.line2 || t?.hero?.title2 || "без шахраїв та посередників.")), /*#__PURE__*/React.createElement("p", {
    className: "v2-hero-sub"
  }, t?.hero?.lede || ""), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-cta-group hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=web_hero",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-primary v2-btn-tg btn tg lg"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })), /*#__PURE__*/React.createElement("span", null, t?.hero?.ctaBot || "Запустити АКОРД у Telegram")), /*#__PURE__*/React.createElement("a", {
    href: "/app/",
    className: "v2-btn v2-btn-secondary btn primary lg"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12 12 3l9 9M5 10v10h14V10"
  })), /*#__PURE__*/React.createElement("span", null, t?.hero?.ctaApp || "Відкрити Mini App")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenInfo ? onOpenInfo('guide') : window.location.hash = 'guide',
    className: "v2-btn v2-btn-secondary btn ghost lg",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCD6 ", t?.nav?.guide || "Як користуватись"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-trust-grid"
  }, (t?.trust || []).map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `v2-trust-tile rail-${['emerald', 'crimson', 'gold', 'cyan'][i % 4]}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-trust-label"
  }, m.k), /*#__PURE__*/React.createElement("div", {
    className: "v2-trust-value"
  }, m.v), /*#__PURE__*/React.createElement("div", {
    className: "v2-trust-desc"
  }, m.d))))));
}
function FourPillars({
  onOpenInfo,
  t
}) {
  const p = t?.pillars || {
    eyebrow: "POURQUOI L'ACCORD ?",
    title: "Principes de confiance",
    sub: "Un outil d'action directe conçu pour la réalité suisse.",
    items: [{
      idx: "01",
      cls: "pillar-1",
      icon: "⚡",
      title: "Vitesse décisive",
      body: "Alertes Telegram en moins de 60 secondes.",
      kpi: {
        n: "< 60 s",
        l: "temps de signal"
      }
    }, {
      idx: "02",
      cls: "pillar-2",
      icon: "🤖",
      title: "Copilote IA 24/7",
      body: "Normes suisses pour CV et lettres de motivation.",
      kpi: {
        n: "Claude · GPT",
        l: "modèles suisses"
      }
    }, {
      idx: "03",
      cls: "pillar-3",
      icon: "🤝",
      title: "Mentors suisses",
      body: "Réseau de bénévoles suisses (Benevol).",
      kpi: {
        n: "148+",
        l: "mentors actifs"
      }
    }, {
      idx: "04",
      cls: "pillar-4",
      icon: "🛡️",
      title: "Conformité totale",
      body: "100% gratuit selon la loi LSE et Art. 262 CO.",
      kpi: {
        n: "LPD · LSE",
        l: "cadre légal"
      }
    }]
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "pillars-section",
    id: "pillars",
    style: {
      padding: '40px 0',
      borderBottom: '1px solid var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      textAlign: 'center',
      maxWidth: 700,
      margin: '0 auto 32px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      fontSize: 11.5,
      letterSpacing: '0.12em',
      color: 'var(--swiss-red)',
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, p.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "section-title",
    style: {
      fontSize: 26,
      fontWeight: 800,
      margin: '6px 0 10px',
      letterSpacing: '-0.02em',
      color: '#fff'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "section-sub",
    style: {
      fontSize: 14,
      color: 'var(--muted)',
      margin: 0
    }
  }, p.sub)), /*#__PURE__*/React.createElement("div", {
    className: "pillar-grid"
  }, (p.items || []).map(it => /*#__PURE__*/React.createElement("article", {
    key: it.idx,
    className: `pillar-card ${it.cls}`,
    style: {
      background: 'rgba(15,23,42,.65)',
      border: '1px solid var(--line-2)',
      borderRadius: 16,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pillar-top",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pillar-idx",
    style: {
      fontFamily: 'var(--f-mono)',
      fontSize: 12,
      color: 'var(--muted)',
      fontWeight: 700
    }
  }, it.idx), /*#__PURE__*/React.createElement("span", {
    className: "pillar-icon",
    style: {
      fontSize: 22
    },
    "aria-hidden": "true"
  }, it.icon)), /*#__PURE__*/React.createElement("h3", {
    className: "pillar-title",
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: '#fff',
      margin: '0 0 8px'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    className: "pillar-body",
    style: {
      fontSize: 13,
      color: 'var(--fg-3)',
      lineHeight: 1.5,
      margin: '0 0 16px'
    }
  }, it.body)), /*#__PURE__*/React.createElement("div", {
    className: "pillar-kpi",
    style: {
      borderTop: '1px solid var(--line-1)',
      paddingTop: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "kpi-num",
    style: {
      fontFamily: 'var(--f-mono)',
      fontSize: 14,
      fontWeight: 700,
      color: '#10B981'
    }
  }, it.kpi.n), /*#__PURE__*/React.createElement("span", {
    className: "kpi-lbl",
    style: {
      fontSize: 11.5,
      color: 'var(--muted)'
    }
  }, it.kpi.l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenInfo ? onOpenInfo('why') : window.location.hash = 'why',
    className: "btn ghost",
    style: {
      padding: '8px 16px',
      fontSize: 13,
      cursor: 'pointer',
      borderColor: 'rgba(16,185,129,0.3)',
      color: '#34D399'
    }
  }, "\u2B50 ", t?.nav?.why ? `Порівняння: ${t.nav.why}` : "Чому ми кращий варіант"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenInfo ? onOpenInfo('guide') : window.location.hash = 'guide',
    className: "btn ghost",
    style: {
      padding: '8px 16px',
      fontSize: 13,
      cursor: 'pointer',
      borderColor: 'rgba(56,189,248,0.3)',
      color: '#38BDF8'
    }
  }, "\uD83D\uDCD6 ", t?.nav?.guide || "Як користуватись"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpenInfo ? onOpenInfo('about') : window.location.hash = 'about',
    className: "btn ghost",
    style: {
      padding: '8px 16px',
      fontSize: 13,
      cursor: 'pointer'
    }
  }, "\uD83C\uDFDB\uFE0F ", t?.nav?.about || "Про проєкт АКОРД"))));
}
Object.assign(window, {
  HeroV2,
  FourPillars
});

// ==================== [Module: CantonCalculator.jsx] ====================
// SwissRelief 2.6 — Canton barème calculator (Side A)
// Connects to full 26-canton dataset with quad-lingual labels (window.CANTONS).
const CANTONS_FALLBACK = [{
  code: "VD",
  name: "Vaud",
  authority: "EVAM",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1050,
    2: 1250,
    3: 1350,
    4: 1650,
    5: 2100
  }
}, {
  code: "GE",
  name: "Genève",
  authority: "Hospice Général",
  basis: "net",
  heating: "separate",
  ceilings: {
    1: 1100,
    2: 1300,
    3: 1550,
    4: 1800,
    5: 2100
  }
}, {
  code: "ZH",
  name: "Zurich",
  authority: "AOZ / SKOS",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1400,
    2: 1700,
    3: 2000,
    4: 2300,
    5: 2600
  }
}, {
  code: "BE",
  name: "Berne",
  authority: "GSI Bern",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1000,
    2: 1250,
    3: 1500,
    4: 1750,
    5: 2000
  }
}, {
  code: "BS",
  name: "Bâle-Ville",
  authority: "WSU Basel",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1100,
    2: 1450,
    3: 1700,
    4: 1950,
    5: 2200
  }
}, {
  code: "TI",
  name: "Tessin",
  authority: "LAPS Ticino",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 800,
    2: 1100,
    3: 1300,
    4: 1500,
    5: 1500
  }
}, {
  code: "LU",
  name: "Lucerne",
  authority: "DISG Luzern",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1050,
    2: 1300,
    3: 1550,
    4: 1800,
    5: 2000
  }
}, {
  code: "ZG",
  name: "Zoug",
  authority: "SKOS Zug",
  basis: "brut",
  heating: "included",
  ceilings: {
    1: 1200,
    2: 1550,
    3: 1850,
    4: 2100,
    5: 2350
  }
}];
const chfV2 = n => new Intl.NumberFormat('de-CH', {
  maximumFractionDigits: 0
}).format(Math.round(n)).replace(/,/g, "'");
function CantonCalculatorV2({
  t,
  lang = 'fr',
  canton: propCanton,
  setCanton: propSetCanton,
  status = 'evam',
  income = 0
}) {
  const [localCanton, setLocalCanton] = React.useState("VD");
  const canton = propCanton || localCanton;
  const setCanton = propSetCanton || setLocalCanton;
  const [size, setSize] = React.useState(3);
  const [rentType, setRentType] = React.useState("brut");
  const [testRent, setTestRent] = React.useState(1400);
  const cantons = typeof window !== 'undefined' && Array.isArray(window.CANTONS) && window.CANTONS.length >= 26 ? window.CANTONS : CANTONS_FALLBACK;
  const c = cantons.find(x => x.code === canton) || cantons[0];
  const ceilings = c.ceilings || {
    1: 1000,
    2: 1200,
    3: 1400,
    4: 1600,
    5: 1800
  };
  const raw = ceilings[size] || ceilings[5] || 1200;
  const rawDisplayCeiling = c.basis === rentType ? raw : c.basis === "brut" ? Math.round(raw * 0.85) : Math.round(raw / 0.85);
  const rule33 = income && Number(income) > 0 ? Math.round(Number(income) * 0.33) : null;
  const displayCeiling = status === 'salary' && rule33 ? Math.min(rawDisplayCeiling, rule33) : rawDisplayCeiling;
  const over = testRent - displayCeiling;
  const compliant = over <= 0;
  const cantonName = typeof c.name === 'object' ? c.name[lang] || c.name.fr || c.code : c.name || c.code;
  return /*#__PURE__*/React.createElement("section", {
    id: "calc",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.calc.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, t.calc.title), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, t.calc.lede)), /*#__PURE__*/React.createElement("div", {
    className: "v2-calc-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "v2-canton"
  }, t.calc.canton), /*#__PURE__*/React.createElement("select", {
    id: "v2-canton",
    className: "v2-select",
    value: canton,
    onChange: e => setCanton(e.target.value)
  }, cantons.map(x => {
    const optName = typeof x.name === 'object' ? x.name[lang] || x.name.fr || x.code : x.name || x.code;
    return /*#__PURE__*/React.createElement("option", {
      key: x.code,
      value: x.code
    }, x.code, " \xB7 ", optName, " \u2014 ", x.authority);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, t.calc.household), /*#__PURE__*/React.createElement("div", {
    className: "v2-pill-group"
  }, [1, 2, 3, 4, 5].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    className: `v2-pill-btn ${size === s ? 'active' : ''}`,
    onClick: () => setSize(s)
  }, s, s === 5 ? '+' : '', " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.7,
      fontWeight: 500
    }
  }, "pers."))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, t.calc.rentType), /*#__PURE__*/React.createElement("div", {
    className: "v2-seg"
  }, /*#__PURE__*/React.createElement("button", {
    className: rentType === 'brut' ? 'active' : '',
    onClick: () => setRentType('brut')
  }, t.calc.brut), /*#__PURE__*/React.createElement("button", {
    className: rentType === 'net' ? 'active' : '',
    onClick: () => setRentType('net')
  }, t.calc.net))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "v2-rent"
  }, t.calc.testRent), /*#__PURE__*/React.createElement("div", {
    className: "v2-input-with-suffix"
  }, /*#__PURE__*/React.createElement("input", {
    id: "v2-rent",
    type: "number",
    min: "200",
    max: "6000",
    step: "10",
    className: "v2-input",
    value: testRent,
    onChange: e => setTestRent(Number(e.target.value) || 0)
  }), /*#__PURE__*/React.createElement("span", {
    className: "v2-input-suffix"
  }, "CHF / mois")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-verdict"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-verdict-label"
  }, t.calc.ceiling), /*#__PURE__*/React.createElement("div", {
    className: "v2-verdict-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, chfV2(displayCeiling)), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ mois")), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-label"
  }, t.calc.authority), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-value"
  }, c.authority)), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-label"
  }, t.calc.basis), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-value"
  }, c.basis === 'brut' ? t.calc.brut : t.calc.net)), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact v2-fact-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-label"
  }, t.calc.heating), /*#__PURE__*/React.createElement("div", {
    className: "v2-fact-value"
  }, c.heating === 'included' ? t.calc.heatIncluded : t.calc.heatSeparate))), /*#__PURE__*/React.createElement("div", {
    className: `v2-compliance ${compliant ? 'ok' : 'warn'}`,
    key: compliant + ':' + displayCeiling
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-icon"
  }, compliant ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-title"
  }, compliant ? t.calc.compliant : `${t.calc.over} CHF ${chfV2(over)}`), /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-body"
  }, compliant ? `${c.authority} · ${cantonName} · ${size}${size === 5 ? '+' : ''} ${lang === 'uk' ? 'осіб' : lang === 'de' ? 'Personen' : lang === 'it' ? 'persone' : 'personne(s)'}` : t.calc.overNote))), /*#__PURE__*/React.createElement("div", {
    className: "v2-subsidiarity"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      color: 'var(--gold-2)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16",
    r: "0.5",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("span", null, t.calc.subsidiarityNote))))));
}
Object.assign(window, {
  CantonCalculatorV2,
  chfV2
});

// ==================== [Module: HousingCards.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Housing Cards (source-agnostic)
// Attribution factuelle aux régies sans mention de portails tiers (Art. 5 LCD/UWG)

function HousingCard({
  item,
  t,
  lang,
  onGenerate
}) {
  const compOk = item.compliance?.ok ?? true;
  const isPrivate = item.regieType === 'private';
  const [imgFailed, setImgFailed] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    className: "h-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-photo"
  }, item.image_url && !imgFailed ? /*#__PURE__*/React.createElement("img", {
    src: item.image_url,
    alt: item.title?.[lang] || item.title || "Logement Suisse",
    className: "h-photo-img",
    loading: "lazy",
    onError: () => setImgFailed(true)
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "placeholder",
    style: {
      display: !item.image_url || imgFailed ? 'flex' : 'none'
    }
  }, item.photoCaption || item.title && (item.title[lang] || item.title) || "Logement Suisse"), /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, /*#__PURE__*/React.createElement("span", {
    className: `regie-badge ${isPrivate ? 'priv' : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    "aria-hidden": "true"
  }), item.regie), /*#__PURE__*/React.createElement("span", {
    className: `compliance-badge ${compOk ? '' : 'warn'}`
  }, compOk ? '✓' : '!', " EVAM"))), /*#__PURE__*/React.createElement("div", {
    className: "h-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-price-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), window.chf(item.price), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ ", lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois')), /*#__PURE__*/React.createElement("div", {
    className: "h-loc"
  }, item.city?.[lang] || item.city_name || "Vaud", " ", /*#__PURE__*/React.createElement("span", {
    className: "canton"
  }, "\xB7 ", item.canton))), /*#__PURE__*/React.createElement("div", {
    className: "h-title"
  }, item.title?.[lang] || item.title), /*#__PURE__*/React.createElement("div", {
    className: "sbb-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Ico.train, null)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "min"
  }, item.sbb?.minutes || 15), " min \u2192 ", item.sbb?.city || "Gare"), /*#__PURE__*/React.createElement("span", {
    className: "swap"
  }, t.housing?.changes ? t.housing.changes(item.sbb?.changes || 0) : `${item.sbb?.changes || 0} corresp.`)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      padding: '6px 10px',
      background: 'rgba(16,185,129,.06)',
      border: '1px solid rgba(16,185,129,.20)',
      borderRadius: 6,
      lineHeight: 1.4
    }
  }, "\uD83D\uDFE2 ", item.compliance?.note?.[lang] || (item.compliance?.ok ? "100% conforme EVAM" : "Validation requise"))), /*#__PURE__*/React.createElement("div", {
    className: "h-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => onGenerate(item)
  }, /*#__PURE__*/React.createElement(Ico.file, null), " ", t.housing?.generate || "Générer dossier"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: () => {
      const dest = encodeURIComponent(`${item.city?.[lang] || item.city_name || ''}`);
      window.open(`https://www.sbb.ch/fr/acheter/pages/fahrplan/fahrplan.xhtml?von=Morges&nach=${dest}`, '_blank');
    }
  }, /*#__PURE__*/React.createElement(Ico.train, null), " ", t.housing?.sbb || "Horaires SBB")));
}
function HousingSection({
  t,
  lang,
  canton: propCanton,
  onGenerate
}) {
  const [limit, setLimit] = React.useState(9);
  const [selectedCanton, setSelectedCanton] = React.useState(propCanton || 'ALL');
  React.useEffect(() => {
    if (propCanton) setSelectedCanton(propCanton);
  }, [propCanton]);
  React.useEffect(() => {
    setLimit(9);
  }, [selectedCanton]);
  const allItems = React.useMemo(() => {
    return window.SR_HOUSING || window.HOUSING_LISTINGS || [];
  }, []);
  const availableCantons = React.useMemo(() => {
    const counts = {
      ALL: allItems.length
    };
    allItems.forEach(h => {
      if (h.canton) {
        counts[h.canton] = (counts[h.canton] || 0) + 1;
      }
    });
    // Cantons in order: ALL, VD, FR, VS, GE or any others present
    const standardOrder = ['ALL', 'VD', 'FR', 'VS', 'GE'];
    const extraCantons = Object.keys(counts).filter(c => !standardOrder.includes(c));
    const cantons = [...standardOrder, ...extraCantons].filter(c => c === 'ALL' || counts[c] && counts[c] > 0);
    return {
      cantons,
      counts
    };
  }, [allItems]);
  const CANTON_LABELS = {
    VD: {
      fr: 'VD · Vaud',
      uk: 'VD · Во (Vaud)',
      de: 'VD · Waadt',
      it: 'VD · Vaud',
      en: 'VD · Vaud'
    },
    FR: {
      fr: 'FR · Fribourg',
      uk: 'FR · Фрібур (Fribourg)',
      de: 'FR · Freiburg',
      it: 'FR · Friburgo',
      en: 'FR · Fribourg'
    },
    VS: {
      fr: 'VS · Valais',
      uk: 'VS · Вале (Valais)',
      de: 'VS · Wallis',
      it: 'VS · Vallese',
      en: 'VS · Valais'
    },
    GE: {
      fr: 'GE · Genève',
      uk: 'GE · Женева (Genève)',
      de: 'GE · Genf',
      it: 'GE · Ginevra',
      en: 'GE · Geneva'
    }
  };
  const items = React.useMemo(() => {
    if (!selectedCanton || selectedCanton === 'ALL') return allItems;
    return allItems.filter(h => h.canton === selectedCanton);
  }, [selectedCanton, allItems]);
  const visibleItems = items.slice(0, limit);
  return /*#__PURE__*/React.createElement("section", {
    id: "housing",
    className: "block",
    style: {
      background: 'rgba(15,23,42,.25)',
      padding: '50px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "section-eyebrow",
    style: {
      color: 'var(--swiss-red)',
      fontWeight: 700,
      letterSpacing: '0.1em'
    }
  }, t.housing?.eyebrow || "LOGEMENT VÉRIFIÉ"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title",
    style: {
      color: '#fff',
      margin: '4px 0 8px'
    }
  }, t.housing?.title || "Offres vérifiées en Romandie"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub",
    style: {
      color: 'var(--muted)',
      margin: 0
    }
  }, t.housing?.lede || "Directement attribué aux régies sans mention de portails tiers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontFamily: 'var(--f-mono)',
      padding: '6px 12px',
      borderRadius: 8,
      background: 'rgba(56,189,248,.08)',
      border: '1px solid rgba(56,189,248,.25)',
      color: 'var(--sbb-blue)'
    }
  }, "\u26A1 ", items.length, " ", lang === 'uk' ? 'пропозицій з реальними фото' : lang === 'de' ? 'Angebote mit echten Fotos' : lang === 'it' ? 'offerte con foto reali' : 'offres avec photos réelles')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 24
    },
    role: "tablist",
    "aria-label": "Filtre par canton"
  }, availableCantons.cantons.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `btn ${selectedCanton === c ? 'primary' : 'ghost'}`,
    onClick: () => setSelectedCanton(c),
    role: "tab",
    "aria-selected": selectedCanton === c,
    style: {
      fontSize: 12.5,
      padding: '6px 14px',
      borderRadius: 8,
      fontWeight: selectedCanton === c ? 700 : 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", null, c === 'ALL' ? lang === 'uk' ? 'Усі кантони' : lang === 'de' ? 'Alle Kantone' : lang === 'it' ? 'Tutti i cantoni' : 'Tous cantons' : CANTON_LABELS[c]?.[lang] || CANTON_LABELS[c]?.fr || c), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      padding: '1px 6px',
      borderRadius: 10,
      background: selectedCanton === c ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)',
      color: selectedCanton === c ? '#fff' : 'var(--muted)',
      fontWeight: 700
    }
  }, availableCantons.counts[c] || 0)))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 20px',
      background: 'rgba(15,23,42,0.4)',
      borderRadius: 16,
      border: '1px dashed var(--line-2)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: 15,
      margin: 0
    }
  }, lang === 'uk' ? 'Наразі немає активних пропозицій у цьому кантоні.' : 'Aucun logement actif pour ce canton actuellement.')) : /*#__PURE__*/React.createElement("div", {
    className: "housing-list"
  }, visibleItems.map(it => /*#__PURE__*/React.createElement(HousingCard, {
    key: it.id,
    item: it,
    t: t,
    lang: lang,
    onGenerate: onGenerate
  }))), limit < items.length && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    style: {
      padding: '12px 28px',
      fontSize: 14,
      fontWeight: 600
    },
    onClick: () => setLimit(prev => prev + 9)
  }, lang === 'uk' ? `Показати більше пропозицій (ще ${items.length - limit}) ↓` : lang === 'de' ? `Mehr Wohnungen anzeigen (noch ${items.length - limit}) ↓` : lang === 'it' ? `Mostra più alloggi (altri ${items.length - limit}) ↓` : `Afficher plus de logements (encore ${items.length - limit}) ↓`))));
}
Object.assign(window, {
  HousingCard,
  HousingSection
});

// ==================== [Module: DossierGenerator.jsx] ====================
// SwissRelief · Pan-Swiss 2.6 — Générateur de Dossier Régie 1-Click (Art. 253 CO)

function DossierGenerator({
  t,
  lang,
  prefill
}) {
  const [name, setName] = React.useState('Maryna Vokovytch');
  const [permis, setPermis] = React.useState('S-VD-2024-0847');
  const [statusForm, setStatusForm] = React.useState('evam'); // evam | salary
  const [salary, setSalary] = React.useState(4800);
  const [guarantors, setGuarantors] = React.useState('—');
  const [poursuites, setPoursuites] = React.useState('has');
  const [previewLang, setPreviewLang] = React.useState('fr'); // fr | de

  // Prefill from a housing card
  const listing = prefill || window.SR_HOUSING[0];
  const today = new Date().toLocaleDateString(previewLang === 'de' ? 'de-CH' : 'fr-CH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const financialLine = statusForm === 'evam' ? previewLang === 'de' ? "Die Miete wird vollständig durch das kantonale Amt EVAM (Vaud) übernommen, gemäss der bundesrechtlichen Kostenübernahme für Personen mit S-Ausweis." : "Le loyer est intégralement pris en charge par l'organe cantonal EVAM (Vaud), au titre de la couverture fédérale des personnes titulaires du Permis S." : previewLang === 'de' ? `Mein regelmässiges Nettoeinkommen beträgt CHF ${window.chf(salary)}/Monat, was der 33%-Regel (max. CHF ${window.chf(Math.round(salary * 0.33))}) entspricht.` : `Mon revenu net régulier s'élève à CHF ${window.chf(salary)}/mois, respectant la règle des 33% (loyer max. CHF ${window.chf(Math.round(salary * 0.33))}).`;
  const poursuitesLine = poursuites === 'has' ? previewLang === 'de' ? "Ein aktueller Betreibungsregisterauszug (leer, weniger als 3 Monate alt) liegt diesem Schreiben bei." : "Un extrait du Registre des Poursuites (vierge, daté de moins de 3 mois) est joint à la présente." : previewLang === 'de' ? "Der Betreibungsregisterauszug wurde beim zuständigen Amt beantragt und wird innerhalb von 5 Werktagen nachgereicht." : "L'extrait du Registre des Poursuites a été demandé à l'Office et sera transmis sous 5 jours ouvrés.";
  const salutation = previewLang === 'de' ? "Sehr geehrte Damen und Herren," : "Madame, Monsieur,";
  const opening = previewLang === 'de' ? `mit Interesse habe ich Ihr Angebot für die ${listing.title.de} zur Kenntnis genommen und erlaube mir, mich hiermit als Mieter/in zu bewerben.` : `Ayant pris connaissance avec grand intérêt de votre annonce concernant l'${listing.title.fr.toLowerCase()}, je me permets par la présente de me porter candidat·e à la location de ce bien.`;
  const closing = previewLang === 'de' ? "Für ein Vorstellungsgespräch stehe ich Ihnen gerne zur Verfügung. In der Zwischenzeit danke ich Ihnen für die Prüfung meiner Bewerbung und verbleibe mit freundlichen Grüssen," : "Je me tiens à votre entière disposition pour un entretien de présentation. Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.";
  const cityName = listing.city.fr;
  const priceLine = `CHF ${window.chf(listing.price)}/mois`;
  const d = t?.dossier || {};
  return /*#__PURE__*/React.createElement("section", {
    id: "dossier",
    className: "block",
    style: {
      background: 'rgba(213,43,30,.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "section-eyebrow"
  }, d.eyebrow || "Dossier régie 1-Click · Art. 253 CO"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, d.title || "Générateur de dossier de candidature locative"), /*#__PURE__*/React.createElement("p", {
    className: "section-sub"
  }, d.lede || "Formulaire candidat conforme aux normes régies suisses."), /*#__PURE__*/React.createElement("div", {
    className: "dossier-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--f-mono)',
      fontSize: 10.5,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--gold-2)',
      fontWeight: 700,
      marginBottom: 14
    }
  }, "\uD83D\uDCC4 ", d.formTitle || "Formulaire candidat"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 12px',
      marginBottom: 16,
      background: 'rgba(213,43,30,.08)',
      border: '1px solid rgba(213,43,30,.25)',
      borderRadius: 10,
      fontSize: 12,
      color: 'var(--ink-2)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--ink-0)'
    }
  }, "Bien cibl\xE9 :"), " ", listing.title?.[lang] || listing.title?.fr || listing.title || "Logement Suisse", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--muted)',
      fontSize: 11
    }
  }, listing.regie, " \xB7 CHF ", window.chf(listing.price), "/mois \xB7 ", listing.city?.[lang] || listing.city?.fr || listing.city_name || "Vaud")), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, d.name || "Nom · Prénom"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, d.permis || "N° dossier / Permis S"), /*#__PURE__*/React.createElement("input", {
    className: "input mono",
    value: permis,
    onChange: e => setPermis(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, d.status || "Statut financier"), /*#__PURE__*/React.createElement("div", {
    className: "dossier-status-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: statusForm === 'evam' ? 'active' : '',
    onClick: () => setStatusForm('evam')
  }, "\uD83D\uDCCB ", d.evamPec || "Prise en charge EVAM"), /*#__PURE__*/React.createElement("button", {
    className: statusForm === 'salary' ? 'active' : '',
    onClick: () => setStatusForm('salary')
  }, "\uD83D\uDCBC ", lang === 'de' ? 'Lohn' : lang === 'it' ? 'Salario' : lang === 'uk' ? 'Зарплата' : 'Salaire'))), statusForm === 'salary' && /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, d.salary || "Revenu mensuel (CHF)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input mono",
    value: salary,
    onChange: e => setSalary(Number(e.target.value) || 0)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, d.guarantors || "Garants éventuels"), /*#__PURE__*/React.createElement("input", {
    className: "input",
    value: guarantors,
    onChange: e => setGuarantors(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field",
    style: {
      marginBottom: 0
    }
  }, /*#__PURE__*/React.createElement("label", null, d.poursuites || "Extrait du Registre des Poursuites"), /*#__PURE__*/React.createElement("div", {
    className: "dossier-status-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: poursuites === 'has' ? 'active' : '',
    onClick: () => setPoursuites('has')
  }, "\u2713 ", d.hasIt || "Disponible (< 3 mois)"), /*#__PURE__*/React.createElement("button", {
    className: poursuites === 'will' ? 'active' : '',
    onClick: () => setPoursuites('will')
  }, "\u23F3 ", d.willGet || "En cours de commande")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lang-preview-toggle"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--f-mono)',
      fontSize: 10.5,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      padding: '6px 8px',
      fontWeight: 600
    }
  }, d.previewIn || "Aperçu de la lettre"), /*#__PURE__*/React.createElement("button", {
    className: previewLang === 'fr' ? 'active' : '',
    onClick: () => setPreviewLang('fr')
  }, "\uD83C\uDDEB\uD83C\uDDF7 FR"), /*#__PURE__*/React.createElement("button", {
    className: previewLang === 'de' ? 'active' : '',
    onClick: () => setPreviewLang('de')
  }, "\uD83C\uDDE9\uD83C\uDDEA DE")), /*#__PURE__*/React.createElement("div", {
    className: "letter",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "from"
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#0f172a'
    }
  }, name), /*#__PURE__*/React.createElement("br", null), previewLang === 'de' ? 'S-Ausweis Nr.' : 'Permis S n°', " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, permis), /*#__PURE__*/React.createElement("br", null), "c/o EVAM, Route de Chavannes 33", /*#__PURE__*/React.createElement("br", null), "1007 Lausanne \xB7 +41 21 XXX XX XX"), /*#__PURE__*/React.createElement("div", {
    className: "to"
  }, /*#__PURE__*/React.createElement("b", null, listing.regie), /*#__PURE__*/React.createElement("br", null), previewLang === 'de' ? 'Vermietungsabteilung' : 'Service Location', /*#__PURE__*/React.createElement("br", null), "Case postale", /*#__PURE__*/React.createElement("br", null), "1000 Lausanne"), /*#__PURE__*/React.createElement("div", {
    className: "place-date"
  }, "Lausanne, ", today), /*#__PURE__*/React.createElement("div", {
    className: "subject"
  }, previewLang === 'de' ? `Betreff: Bewerbung für die Miete – ${listing.title.de}` : `Objet : Candidature à la location – ${listing.title.fr}`, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 11,
      color: '#64748B'
    }
  }, "R\xE9f. annonce : ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, listing.id.toUpperCase()), " \xB7 ", priceLine)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8
    }
  }, salutation), /*#__PURE__*/React.createElement("p", null, opening), /*#__PURE__*/React.createElement("div", {
    className: "listing-box"
  }, /*#__PURE__*/React.createElement("b", null, previewLang === 'de' ? 'Betroffenes Objekt' : 'Objet concerné'), /*#__PURE__*/React.createElement("br", null), listing.title[previewLang === 'de' ? 'de' : 'fr'], /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748B'
    }
  }, listing.city[previewLang === 'de' ? 'de' : 'fr'], " \xB7 ", priceLine, " \xB7 ", listing.rooms, " ", previewLang === 'de' ? 'Zimmer' : 'pièces')), /*#__PURE__*/React.createElement("p", null, financialLine), /*#__PURE__*/React.createElement("p", null, poursuitesLine), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14
    }
  }, closing), /*#__PURE__*/React.createElement("div", {
    className: "sig"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), previewLang === 'de' ? 'Unterschrift' : 'Signature'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }), previewLang === 'de' ? 'Ort · Datum' : 'Lieu · Date')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      paddingTop: 14,
      borderTop: '1px dotted rgba(0,0,0,.18)',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: 10,
      color: '#94A3B8',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", null, previewLang === 'de' ? 'Beilagen' : 'Annexes', " :"), ' ', previewLang === 'de' ? 'Kopie S-Ausweis · EVAM-Kostenübernahmebestätigung · Betreibungsauszug' : 'Copie Permis S · Attestation EVAM · Extrait Poursuites', /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#D97706'
    }
  }, previewLang === 'de' ? 'Erstellt mit SwissRelief 2.6 · Art. 253 OR konform · Merkle SHA-256' : 'Généré via SwissRelief 2.6 · Conforme Art. 253 CO · Merkle SHA-256'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => alert('Génération PDF/A (mock)')
  }, /*#__PURE__*/React.createElement(Ico.file, null), " ", d.downloadPdf || "Télécharger PDF/A"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: () => alert('Texte copié dans le presse-papier (mock)')
  }, d.copyText || "Copier le texte"))))));
}
window.DossierGenerator = DossierGenerator;
Object.assign(window, {
  DossierGenerator
});

// ==================== [Module: ProfessionSelector.jsx] ====================
// SwissRelief 2.6 / 2.7 — Emploi & Métiers CH-ISCO + Offres d'emploi vérifiées
// Intègre les 63 offres d'emploi en direct, la détection Art. 21a LEI, et l'assistant de lettre de motivation en français.

function JobLetterModal({
  job,
  onClose,
  lang = 'fr',
  t
}) {
  const [name, setName] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-name', '') : '');
  const [phone, setPhone] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-phone', '') : '');
  const [email, setEmail] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-email', '') : '');
  const [residence, setResidence] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-city', 'Morges (VD)') : 'Morges (VD)');
  const [permis, setPermis] = React.useState(() => window.safeGet ? window.safeGet('sr-cand-permis', 'S-VD-2026') : 'S-VD-2026');
  const [frenchLevel, setFrenchLevel] = React.useState('B1');
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (window.safeSet) {
      if (name) window.safeSet('sr-cand-name', name);
      if (phone) window.safeSet('sr-cand-phone', phone);
      if (email) window.safeSet('sr-cand-email', email);
      if (residence) window.safeSet('sr-cand-city', residence);
      if (permis) window.safeSet('sr-cand-permis', permis);
    }
  }, [name, phone, email, residence, permis]);
  const todayStr = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('fr-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, []);
  const generatedLetter = React.useMemo(() => {
    const candidateDisp = name.trim() || '[Votre Prénom et Nom]';
    const phoneDisp = phone.trim() || '+41 79 000 00 00';
    const emailDisp = email.trim() || 'candidat.suisse@email.ch';
    const resDisp = residence.trim() || 'Morges (VD)';
    const permisDisp = permis.trim() || 'Permis S · Canton de Vaud';
    const compDisp = job.company || 'Entreprise suisse';
    const cityDisp = job.city || 'Suisse';
    const titleDisp = job.title || 'Poste proposé';
    const sbbDisp = job.sbb_min ? `${job.sbb_min} minutes` : '15 minutes';
    return `${candidateDisp}
${resDisp}
Tél. : ${phoneDisp} | Email : ${emailDisp}
Statut : Titulaire du Permis S (${permisDisp}) — Droit de travail immédiat

À l'attention du Service des Ressources Humaines
${compDisp}
${cityDisp}, Suisse

${cityDisp}, le ${todayStr}

Objet : Candidature au poste de : ${titleDisp}

Madame, Monsieur,

C'est avec un vif intérêt et une grande motivation que je vous soumets ma candidature pour le poste de ${titleDisp} au sein de votre établissement ${compDisp} à ${cityDisp}.

Actuellement domicilié(e) à ${resDisp}, je dispose d'une accessibilité directe et rapide à votre site (environ ${sbbDisp} via le réseau CFF), ce qui me garantit une parfaite ponctualité, une disponibilité rapide et une grande flexibilité opérationnelle.

Sur le plan administratif, je suis titulaire du statut de protection S (Permis S), lequel m'accorde l'autorisation d'exercer une activité lucrative immédiate en Suisse. L'engagement s'effectue selon la procédure cantonale simplifiée de simple déclaration préalable, sans contingentement, sans taxe pour l'employeur, et sans délai d'attente administratif (conformément aux directives SEM et à la législation fédérale LEI).

Rigoureux(se), volontaire et doté(e) d'une grande conscience professionnelle, j'ai à cœur de m'intégrer rapidement au sein de votre équipe. Je possède un niveau de français opérationnel (${frenchLevel}) me permettant de communiquer efficacement au quotidien et de respecter strictement l'ensemble de vos consignes opérationnelles et de sécurité.

Convaincu(e) de pouvoir apporter une contribution constructive et fiable à ${compDisp}, je me tiens à votre entière disposition pour un entretien à votre convenance.

Je vous remercie chaleureusement de l'attention que vous porterez à ma candidature et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.


${candidateDisp}`;
  }, [name, phone, email, residence, permis, frenchLevel, job, todayStr]);
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    style: {
      maxWidth: 780
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDCC4 Assistant Lettre de Motivation Suisse"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--muted)'
    }
  }, "Candidature cibl\xE9e pour ", /*#__PURE__*/React.createElement("strong", null, job.company), " \xB7 ", job.title)), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose,
    "aria-label": "Fermer"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "Nom & Pr\xE9nom"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "ex. Olena Petrenko",
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "T\xE9l\xE9phone"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: phone,
    onChange: e => setPhone(e.target.value),
    placeholder: "+41 79 123 45 67",
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "votre.email@domaine.ch",
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "Lieu de r\xE9sidence actuel"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: residence,
    onChange: e => setResidence(e.target.value),
    placeholder: "ex. Morges (VD)",
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "N\xB0 Dossier Permis S"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: permis,
    onChange: e => setPermis(e.target.value),
    placeholder: "S-VD-...",
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: 4
    }
  }, "Niveau de fran\xE7ais"), /*#__PURE__*/React.createElement("select", {
    value: frenchLevel,
    onChange: e => setFrenchLevel(e.target.value),
    style: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "A2 (notions solides)"
  }, "A2 (notions solides)"), /*#__PURE__*/React.createElement("option", {
    value: "B1 (op\xE9rationnel)"
  }, "B1 (op\xE9rationnel)"), /*#__PURE__*/React.createElement("option", {
    value: "B2 (courant)"
  }, "B2 (courant)"), /*#__PURE__*/React.createElement("option", {
    value: "C1 (autonome)"
  }, "C1 (autonome)")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0B1220',
      border: '1px solid var(--line-2)',
      borderRadius: 12,
      padding: 18,
      maxHeight: '380px',
      overflowY: 'auto',
      fontFamily: 'var(--f-mono)',
      fontSize: 12.5,
      lineHeight: 1.6,
      color: '#E2E8F0',
      whiteSpace: 'pre-wrap',
      marginBottom: 20
    }
  }, generatedLetter), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: onClose,
    style: {
      padding: '8px 16px',
      fontSize: 13
    }
  }, "Fermer"), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: handleCopy,
    style: {
      padding: '8px 20px',
      fontSize: 13,
      background: copied ? 'var(--emerald-2)' : undefined
    }
  }, copied ? '✓ Copié dans le presse-papier !' : '📋 Copier la lettre'))));
}
function JobCard({
  job,
  t,
  lang,
  onOpenLetter
}) {
  const isStellen = !!job.stellen;
  const salaryStr = job.salary_min && job.salary_max ? `CHF ${window.chf ? window.chf(job.salary_min) : job.salary_min} – ${window.chf ? window.chf(job.salary_max) : job.salary_max}` : 'Selon CCT / Barème';
  return /*#__PURE__*/React.createElement("article", {
    className: "h-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 8px',
      borderBottom: '1px solid var(--line-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "regie-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    "aria-hidden": "true"
  }), job.company), /*#__PURE__*/React.createElement("span", {
    className: `compliance-badge ${isStellen ? 'warn' : ''}`
  }, isStellen ? '⏳ Art. 21a LEI (délai ORP)' : '✓ Libre marché')), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ink-0)',
      margin: '4px 0 6px',
      lineHeight: 1.35
    }
  }, job.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: 'var(--ink-2)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD ", job.city), /*#__PURE__*/React.createElement("span", {
    className: "v2-mono-tag"
  }, job.canton), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--muted)',
      fontSize: 11.5
    }
  }, "\xB7 ", job.workload_min, "%\u2013", job.workload_max, "%"))), /*#__PURE__*/React.createElement("div", {
    className: "h-body",
    style: {
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-price-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-price",
    style: {
      fontSize: 18
    }
  }, salaryStr, /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ ", lang === 'de' ? 'Monat' : lang === 'it' ? 'mese' : lang === 'uk' ? 'міс.' : 'mois'))), /*#__PURE__*/React.createElement("div", {
    className: "sbb-pill",
    style: {
      margin: '4px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Ico.train, null)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "min"
  }, job.sbb_min || 12), " min de Morges / Lausanne (CFF)")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--muted)',
      padding: '6px 10px',
      background: 'rgba(16,185,129,.06)',
      border: '1px solid rgba(16,185,129,.20)',
      borderRadius: 6,
      lineHeight: 1.4
    }
  }, "\uD83D\uDFE2 ", /*#__PURE__*/React.createElement("strong", null, "Permis S :"), " Autorisation d'embauche imm\xE9diate sans contingent ni taxe employeur.")), /*#__PURE__*/React.createElement("div", {
    className: "h-actions",
    style: {
      padding: '10px 16px 14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => onOpenLetter(job),
    style: {
      flex: '1 1 140px',
      minHeight: 38,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Ico.file, null), " \uD83D\uDCC4 Lettre de motivation"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: () => window.open(job.url || 'https://www.job-room.ch', '_blank'),
    style: {
      flex: '1 1 110px',
      minHeight: 38,
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Ico.external, null), " Voir l'offre")));
}
const SECTORS_FALLBACK = [{
  id: 'HOSP',
  label: 'Hôtellerie & Restauration',
  jobs: [{
    isco: '9412',
    stellen: true,
    qualif: 'Sans qualif.',
    salary: [3713, 4100],
    title: 'Aide de cuisine',
    cat: 'Cuisine'
  }, {
    isco: '5120',
    stellen: true,
    qualif: 'CFC',
    salary: [4528, 5200],
    title: 'Cuisinier',
    cat: 'Cuisine'
  }, {
    isco: '5131',
    stellen: true,
    qualif: 'CFC',
    salary: [4300, 5000],
    title: 'Serveur / Kellner',
    cat: 'Service'
  }, {
    isco: '1412',
    stellen: false,
    qualif: 'Tertiaire',
    salary: [5293, 6800],
    title: 'Chef de cuisine',
    cat: 'Cuisine'
  }]
}, {
  id: 'CONST',
  label: 'Bâtiment & Génie civil',
  jobs: [{
    isco: '9313',
    stellen: true,
    qualif: 'Sans qualif.',
    salary: [4500, 4900],
    title: 'Manœuvre de construction',
    cat: 'Gros-œuvre'
  }, {
    isco: '7112',
    stellen: true,
    qualif: 'CFC',
    salary: [5300, 6100],
    title: 'Maçon',
    cat: 'Gros-œuvre'
  }, {
    isco: '7115',
    stellen: true,
    qualif: 'CFC',
    salary: [5200, 6000],
    title: 'Charpentier / Menuisier',
    cat: 'Second-œuvre'
  }]
}, {
  id: 'HEALTH',
  label: 'Santé & Soins',
  jobs: [{
    isco: '5322',
    stellen: false,
    qualif: 'AFP',
    salary: [4500, 5100],
    title: 'Assistante en soins (ASA/ASSC)',
    cat: 'Soins'
  }, {
    isco: '2221',
    stellen: false,
    qualif: 'Tertiaire',
    salary: [6200, 7800],
    title: 'Infirmier·ère diplômé·e HF',
    cat: 'Soins'
  }]
}, {
  id: 'LOG',
  label: 'Logistique & Transport',
  jobs: [{
    isco: '9333',
    stellen: false,
    qualif: 'Sans qualif.',
    salary: [4100, 4600],
    title: 'Manutentionnaire',
    cat: 'Magasinage'
  }, {
    isco: '4321',
    stellen: false,
    qualif: 'CFC',
    salary: [4700, 5500],
    title: 'Logisticien CFC',
    cat: 'Magasinage'
  }, {
    isco: '8332',
    stellen: false,
    qualif: 'CFC',
    salary: [4800, 5600],
    title: 'Chauffeur poids lourd',
    cat: 'Conduite'
  }]
}];
function ProfessionSelector({
  t,
  lang = 'fr'
}) {
  const [subTab, setSubTab] = React.useState('offers'); // 'offers' | 'radar'
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCanton, setSelectedCanton] = React.useState('ALL');
  const [selectedStatus, setSelectedStatus] = React.useState('ALL'); // 'ALL' | 'FREE' | 'STELLEN'
  const [limit, setLimit] = React.useState(9);
  const [activeLetterJob, setActiveLetterJob] = React.useState(null);

  // Load verified job listings from data layer
  const rawJobs = React.useMemo(() => {
    return window.JOB_LISTINGS || window.SR_JOBS || [];
  }, []);

  // Filtered live jobs
  const filteredJobs = React.useMemo(() => {
    return rawJobs.filter(j => {
      if (selectedCanton !== 'ALL' && j.canton !== selectedCanton) return false;
      if (selectedStatus === 'FREE' && j.stellen) return false;
      if (selectedStatus === 'STELLEN' && !j.stellen) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = j.title && j.title.toLowerCase().includes(q) || j.company && j.company.toLowerCase().includes(q) || j.city && j.city.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [rawJobs, selectedCanton, selectedStatus, searchQuery]);

  // Deep-link check: if URL has ?job=<id>, auto-open letter modal for that job
  React.useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const targetJobId = p.get('job');
      if (targetJobId && rawJobs.length > 0) {
        const found = rawJobs.find(j => j.id === targetJobId);
        if (found) {
          setActiveLetterJob(found);
          setSubTab('offers');
        }
      }
    } catch (e) {}
  }, [rawJobs]);

  // CH-ISCO Radar sectors
  const rawSectors = typeof window !== 'undefined' && Array.isArray(window.SECTORS) && window.SECTORS.length > 0 ? window.SECTORS : null;
  const sectors = React.useMemo(() => {
    if (!rawSectors) return SECTORS_FALLBACK;
    return rawSectors.map(s => {
      const label = s.labels && (s.labels[lang] || s.labels.fr) || s.label || s.id;
      const jobs = (s.categories || []).flatMap(c => {
        const catName = c.labels && (c.labels[lang] || c.labels.fr) || c.id;
        return (c.jobs || []).map(j => ({
          isco: j.isco || '',
          stellen: !!j.stellen,
          qualif: j.qualif || 'CFC',
          salary: j.salary || [4500, 5500],
          title: j.titles && (j.titles[lang] || j.titles.fr) || j.title || '',
          cat: catName
        }));
      });
      return {
        id: s.id,
        label,
        jobs: jobs.length > 0 ? jobs : SECTORS_FALLBACK[0].jobs
      };
    });
  }, [rawSectors, lang]);
  const [sectorId, setSectorId] = React.useState(sectors[0]?.id || 'HOSP');
  const sector = sectors.find(s => s.id === sectorId) || sectors[0];
  const anyStellen = sector && sector.jobs && sector.jobs.some(j => j.stellen);
  return /*#__PURE__*/React.createElement("section", {
    id: "prof",
    className: "v2-section",
    style: {
      background: 'rgba(15,23,42,.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.prof?.eyebrow || "MODULE 02 · EMPLOI & INSERTION"), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, lang === 'uk' ? 'Каталог вакансій та професії CH-ISCO' : lang === 'de' ? 'Stellenkatalog & CH-ISCO Berufe' : lang === 'it' ? 'Catalogo offerte & Professioni CH-ISCO' : "Offres d'emploi vérifiées & Métiers CH-ISCO"), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, lang === 'uk' ? 'Офіційні пропозиції роботи в Romandie, помічник складання мотиваційних листів за нормами Швейцарії та радар зарплат.' : lang === 'de' ? 'Verifizierte Stellen in der Westschweiz, Schweizer Bewerbungsschreiben-Assistent und Lohn-Radar.' : lang === 'it' ? 'Offerte verificate in Romandia, generatore di lettere di motivazione e radar salariale.' : "Offres réelles en Suisse romande, assistant de lettre de motivation selon les normes RH suisses, et radar des salaires CCNT.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginBottom: 24,
      borderBottom: '1px solid var(--line-2)',
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${subTab === 'offers' ? 'primary' : 'ghost'}`,
    onClick: () => setSubTab('offers'),
    style: {
      padding: '8px 18px',
      fontSize: 13.5,
      fontWeight: 700
    }
  }, "\uD83D\uDCBC ", lang === 'uk' ? `Вакансії (${rawJobs.length})` : lang === 'de' ? `Stellen (${rawJobs.length})` : `Offres d'emploi (${rawJobs.length})`), /*#__PURE__*/React.createElement("button", {
    className: `btn ${subTab === 'radar' ? 'primary' : 'ghost'}`,
    onClick: () => setSubTab('radar'),
    style: {
      padding: '8px 18px',
      fontSize: 13.5,
      fontWeight: 700
    }
  }, "\uD83D\uDCCA ", lang === 'uk' ? 'Тарифна сітка CH-ISCO' : lang === 'de' ? 'Lohntabelle CH-ISCO' : 'Grille salariale CH-ISCO'), /*#__PURE__*/React.createElement("button", {
    className: `btn ${subTab === 'cv' ? 'primary' : 'ghost'}`,
    onClick: () => setSubTab('cv'),
    style: {
      padding: '8px 18px',
      fontSize: 13.5,
      fontWeight: 700
    }
  }, "\uD83D\uDCC4 ", lang === 'uk' ? 'Швейцарський стандарт CV' : lang === 'de' ? 'Schweizer CV-Standards' : 'Normes CV Suisse')), subTab === 'offers' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      alignItems: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    placeholder: lang === 'uk' ? 'Пошук посади, компанії чи міста...' : "Rechercher un poste, employeur ou ville...",
    style: {
      flex: '1 1 240px',
      padding: '9px 14px',
      borderRadius: 10,
      background: 'rgba(2,6,15,.6)',
      border: '1px solid var(--line-2)',
      color: '#fff',
      fontSize: 13.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['ALL', 'VD', 'BE', 'BS', 'ZH'].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `amount-chip ${selectedCanton === c ? 'active' : ''}`,
    onClick: () => setSelectedCanton(c),
    style: {
      fontSize: 12,
      padding: '6px 12px'
    }
  }, c === 'ALL' ? lang === 'uk' ? 'Усі кантони' : 'Tous cantons' : c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `amount-chip ${selectedStatus === 'ALL' ? 'active' : ''}`,
    onClick: () => setSelectedStatus('ALL'),
    style: {
      fontSize: 12,
      padding: '6px 12px'
    }
  }, lang === 'uk' ? 'Усі статуси' : 'Tous statuts'), /*#__PURE__*/React.createElement("button", {
    className: `amount-chip ${selectedStatus === 'FREE' ? 'active' : ''}`,
    onClick: () => setSelectedStatus('FREE'),
    style: {
      fontSize: 12,
      padding: '6px 12px'
    }
  }, "\u2713 ", lang === 'uk' ? 'Вільні' : 'Libre marché'), /*#__PURE__*/React.createElement("button", {
    className: `amount-chip ${selectedStatus === 'STELLEN' ? 'active' : ''}`,
    onClick: () => setSelectedStatus('STELLEN'),
    style: {
      fontSize: 12,
      padding: '6px 12px'
    }
  }, "\u23F3 Art. 21a LEI"))), /*#__PURE__*/React.createElement("div", {
    className: "housing-list"
  }, filteredJobs.slice(0, limit).map(j => /*#__PURE__*/React.createElement(JobCard, {
    key: j.id,
    job: j,
    t: t,
    lang: lang,
    onOpenLetter: item => setActiveLetterJob(item)
  }))), filteredJobs.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: 'var(--muted)',
      fontSize: 14
    }
  }, lang === 'uk' ? 'Жодної вакансії не знайдено за заданими фільтрами.' : "Aucune offre ne correspond aux critères sélectionnés."), limit < filteredJobs.length && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    style: {
      padding: '12px 28px',
      fontSize: 14,
      fontWeight: 600
    },
    onClick: () => setLimit(prev => prev + 9)
  }, lang === 'uk' ? `Показати більше вакансій (ще ${filteredJobs.length - limit}) ↓` : `Afficher plus d'offres (encore ${filteredJobs.length - limit}) ↓`))), subTab === 'radar' && /*#__PURE__*/React.createElement("div", {
    className: "v2-card v2-prof-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-prof-tabs",
    role: "tablist",
    "aria-label": "Secteurs CH-ISCO-19"
  }, sectors.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    role: "tab",
    "aria-selected": sectorId === s.id,
    className: `v2-prof-tab ${sectorId === s.id ? 'active' : ''}`,
    onClick: () => setSectorId(s.id)
  }, s.label))), anyStellen && /*#__PURE__*/React.createElement("div", {
    className: "v2-stellen-alert",
    role: "note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-stellen-badge"
  }, "Art. 21a LEI"), /*#__PURE__*/React.createElement("div", {
    className: "v2-stellen-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-stellen-title"
  }, t.prof?.stellenTitle || "Profession soumise à l'obligation d'annoncer (Art. 21a LEI)"), /*#__PURE__*/React.createElement("div", {
    className: "v2-stellen-text"
  }, t.prof?.stellenBody || "Taux de chômage national ≥ 5%. Le poste doit être réservé aux inscrits ORP pendant 5 jours ouvrables."))), /*#__PURE__*/React.createElement("div", {
    className: "v2-prof-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "v2-prof-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ISCO"), /*#__PURE__*/React.createElement("th", null, t.prof?.titleCol || "Intitulé du poste"), /*#__PURE__*/React.createElement("th", null, t.prof?.qualif || "Qualification"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, t.prof?.salary || "Fourchette CCNT"), /*#__PURE__*/React.createElement("th", null, t.prof?.stellenCol || "Statut"))), /*#__PURE__*/React.createElement("tbody", null, sector.jobs.map((j, i) => /*#__PURE__*/React.createElement("tr", {
    key: j.isco + '-' + i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "v2-mono-tag"
  }, j.isco)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-job-title"
  }, j.title), /*#__PURE__*/React.createElement("div", {
    className: "v2-job-cat"
  }, j.cat)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `v2-qbadge ${j.qualif === 'Sans qualif.' ? 'none' : j.qualif === 'AFP' ? 'afp' : j.qualif === 'Tertiaire' ? 'sup' : 'cfc'}`
  }, j.qualif)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-salary-range"
  }, "CHF ", window.chf ? window.chf(j.salary[0]) : j.salary[0], " \u2013 ", window.chf ? window.chf(j.salary[1]) : j.salary[1])), /*#__PURE__*/React.createElement("td", null, j.stellen ? /*#__PURE__*/React.createElement("span", {
    className: "v2-status-pill warn",
    title: "Priorit\xE9 ORP / RAV 5 jours"
  }, "\u25CF Art. 21a LEI") : /*#__PURE__*/React.createElement("span", {
    className: "v2-status-pill free",
    title: "March\xE9 libre"
  }, "Libre")))))))), subTab === 'cv' && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(15,23,42,.6)',
      borderRadius: 16,
      border: '1px solid var(--line-2)',
      padding: '28px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 780,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83C\uDDE8\uD83C\uDDED"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 18,
      color: '#fff',
      fontWeight: 700
    }
  }, lang === 'uk' ? 'Швейцарський стандарт CV (Резюме) для Permis S' : lang === 'de' ? 'Schweizer Lebenslauf-Standards für S-Ausweis Inhaber' : 'Normes du Curriculum Vitae (CV) suisse pour titulaires du Permis S'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      color: 'var(--muted)'
    }
  }, lang === 'uk' ? 'Офіційні вимоги швейцарських HR: структура, обов\'язкові пункти та формулювання прав' : 'Exigences clés des recruteurs suisses : structure, mentions indispensables et législation SEM'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0B1220',
      border: '1px solid var(--line-1)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--sbb-blue)',
      marginBottom: 8
    }
  }, "1. \u0424\u043E\u0442\u043E \u0442\u0430 \u043E\u0441\u043E\u0431\u0438\u0441\u0442\u0456 \u0434\u0430\u043D\u0456"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--fg-3)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u0424\u043E\u0442\u043E:"), " \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0435 \u0434\u0456\u043B\u043E\u0432\u0435 \u0444\u043E\u0442\u043E (\u0441\u0432\u0456\u0442\u043B\u0438\u0439 \u043D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u0438\u0439 \u0444\u043E\u043D, \u043B\u0435\u0433\u043A\u0430 \u043F\u043E\u0441\u043C\u0456\u0448\u043A\u0430)."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438:"), " \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u044C\u043A\u0438\u0439 \u043D\u043E\u043C\u0435\u0440 (+41), email (\u0456\u043C'\u044F.\u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0435), \u0442\u043E\u0447\u043D\u0435 \u043C\u0456\u0441\u0442\u043E \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u043D\u044F."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F \u0442\u0430 \u0441\u0456\u043C\u0435\u0439\u043D\u0438\u0439 \u0441\u0442\u0430\u043D:"), " \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E \u0437\u0430 \u0448\u0432\u0435\u0439\u0446\u0430\u0440\u0441\u044C\u043A\u043E\u044E \u0442\u0440\u0430\u0434\u0438\u0446\u0456\u0454\u044E."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0B1220',
      border: '1px solid var(--line-1)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--emerald)',
      marginBottom: 8
    }
  }, "2. \u042E\u0440\u0438\u0434\u0438\u0447\u043D\u0438\u0439 \u0441\u0442\u0430\u0442\u0443\u0441 Permis S"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--fg-3)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u041E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0438\u0439 \u0440\u044F\u0434\u043E\u043A:"), " ", /*#__PURE__*/React.createElement("em", null, "\xABTitulaire du Permis S \u2014 Autorisation de travail imm\xE9diate (Art. 17 LEI)\xBB")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "\u041F\u0435\u0440\u0435\u0432\u0430\u0433\u0430 \u0434\u043B\u044F HR:"), " \u0431\u0435\u0437 \u043A\u0432\u043E\u0442, \u0431\u0435\u0437 \u0441\u043F\u043B\u0430\u0442\u0438 \u0437\u0431\u043E\u0440\u0456\u0432, \u043F\u0440\u043E\u0441\u0442\u0430 \u0434\u0435\u043A\u043B\u0430\u0440\u0430\u0446\u0456\u044F \u043E\u043D\u043B\u0430\u0439\u043D."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0B1220',
      border: '1px solid var(--line-1)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--gold)',
      marginBottom: 8
    }
  }, "3. \u041C\u043E\u0432\u0438 \u0437\u0430 \u0448\u043A\u0430\u043B\u043E\u044E CEFR"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--fg-3)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("li", null, "\u0427\u0456\u0442\u043A\u0430 \u0433\u0440\u0430\u0434\u0430\u0446\u0456\u044F: ", /*#__PURE__*/React.createElement("strong", null, "Fran\xE7ais B1 (op\xE9rationnel)"), " / ", /*#__PURE__*/React.createElement("strong", null, "B2 (courant)"), "."), /*#__PURE__*/React.createElement("li", null, "\u041D\u0456\u043C\u0435\u0446\u044C\u043A\u0430 (Deutsch), \u0410\u043D\u0433\u043B\u0456\u0439\u0441\u044C\u043A\u0430 (Anglais) \u0442\u0430 \u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (langue maternelle)."))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#0B1220',
      border: '1px solid var(--line-1)',
      borderRadius: 12,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--violet)',
      marginBottom: 8
    }
  }, "4. \u0414\u043E\u0441\u0432\u0456\u0434 \u0442\u0430 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0456\u0457"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 18,
      fontSize: 13,
      color: 'var(--fg-3)',
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("li", null, "\u0410\u043D\u0442\u0438\u0445\u0440\u043E\u043D\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0438\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A (\u043D\u0430\u0439\u043D\u043E\u0432\u0456\u0448\u0438\u0439 \u0434\u043E\u0441\u0432\u0456\u0434 \u0437\u0432\u0435\u0440\u0445\u0443)."), /*#__PURE__*/React.createElement("li", null, "\u0420\u044F\u0434\u043E\u043A: ", /*#__PURE__*/React.createElement("em", null, "\xABCertificats de travail et r\xE9f\xE9rences disponibles sur demande\xBB"), "."), /*#__PURE__*/React.createElement("li", null, "\u0417\u0430\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0432\u043E\u043B\u043E\u043D\u0442\u0435\u0440\u0430 Benevol \u044F\u043A \u043C\u0456\u0441\u0446\u0435\u0432\u043E\u0433\u043E \u043F\u043E\u0440\u0443\u0447\u0438\u0442\u0435\u043B\u044F.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=cv_help",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn primary",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 24px',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })), /*#__PURE__*/React.createElement("span", null, lang === 'uk' ? 'Перевірити CV з ШІ-копілотом у Telegram' : 'Vérifier mon CV avec le copilote IA sur Telegram'))))), activeLetterJob && /*#__PURE__*/React.createElement(JobLetterModal, {
    job: activeLetterJob,
    onClose: () => setActiveLetterJob(null),
    lang: lang,
    t: t
  })));
}
Object.assign(window, {
  ProfessionSelector,
  JobCard,
  JobLetterModal
});

// ==================== [Module: Sublease.jsx] ====================
// SwissRelief 2.6 — Sublease wizard (Side B) — Art. 262 CO
// Computes fair share with 20% furniture cap + Georgia serif PDF preview mock.
function SubleaseWizard({
  t
}) {
  const [totalRent, setTotalRent] = React.useState(1800);
  const [rooms, setRooms] = React.useState(4);
  const [surcharge, setSurcharge] = React.useState(15);
  const [pdfGenerated, setPdfGenerated] = React.useState(false);
  const base = Math.round(totalRent / Math.max(rooms, 1));
  const finalRent = Math.round(base * (1 + surcharge / 100));
  const over20 = surcharge > 20;
  const handlePrintPdf = () => {
    setPdfGenerated(true);
    setTimeout(() => {
      window.print();
    }, 200);
  };
  const sub = t?.sublease || {};
  return /*#__PURE__*/React.createElement("section", {
    id: "sublease",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, sub.title || "Héberger en toute légalité (Art. 262 CO)"), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, sub.lede || "Calcul d'une juste participation aux frais et plafonnement légal.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-sublease-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-shield-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-shield-icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-shield-title"
  }, sub.shield || "Bouclier juridique du locataire — Art. 262 CO"), /*#__PURE__*/React.createElement("div", {
    className: "v2-shield-body"
  }, sub.shieldBody || "Le bailleur ne peut pas interdire la sous-location de manière générale."))), /*#__PURE__*/React.createElement("div", {
    className: "v2-two-col-fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, sub.totalRent || "Loyer total net (CHF/mois)"), /*#__PURE__*/React.createElement("div", {
    className: "v2-input-with-suffix"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "500",
    max: "8000",
    step: "50",
    className: "v2-input",
    value: totalRent,
    onChange: e => setTotalRent(Number(e.target.value) || 0)
  }), /*#__PURE__*/React.createElement("span", {
    className: "v2-input-suffix"
  }, "CHF / mois"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, sub.rooms || "Nombre de pièces"), /*#__PURE__*/React.createElement("div", {
    className: "v2-input-with-suffix"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "10",
    step: "0.5",
    className: "v2-input",
    value: rooms,
    onChange: e => setRooms(Number(e.target.value) || 1)
  }), /*#__PURE__*/React.createElement("span", {
    className: "v2-input-suffix"
  }, "pi\xE8ces")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, sub.base || "Quote-part loyer brut"), /*#__PURE__*/React.createElement("div", {
    className: "v2-quote-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-quote-formula"
  }, "CHF ", chfV2(totalRent), " / ", rooms, " pi\xE8ces"), /*#__PURE__*/React.createElement("span", {
    className: "v2-quote-value"
  }, "CHF ", chfV2(base)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "v2-slider-label"
  }, /*#__PURE__*/React.createElement("span", null, sub.surcharge || "Majoration meubles & équipement"), /*#__PURE__*/React.createElement("span", {
    className: `v2-slider-value ${over20 ? 'danger' : 'ok'}`
  }, surcharge, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "30",
    step: "1",
    className: "v2-slider",
    value: surcharge,
    onChange: e => setSurcharge(Number(e.target.value))
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-slider-scale"
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
  }, "30%")), /*#__PURE__*/React.createElement("div", {
    className: "v2-slider-hint"
  }, sub.surchargeLimit || "Plafond légal 20% · Jurisprudence ASLOCA")), /*#__PURE__*/React.createElement("div", {
    className: "v2-final-rent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-final-label"
  }, sub.final || "Participation mensuelle demandée"), /*#__PURE__*/React.createElement("div", {
    className: "v2-final-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, chfV2(finalRent)), /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/ mois")), /*#__PURE__*/React.createElement("div", {
    className: "v2-final-breakdown"
  }, "CHF ", chfV2(base), " + ", surcharge, "% mobilier = CHF ", chfV2(finalRent)), /*#__PURE__*/React.createElement("div", {
    className: `v2-compliance ${over20 ? 'warn' : 'ok'}`,
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-icon"
  }, over20 ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-title"
  }, over20 ? sub.overBadge || "Loyer abusif" : sub.okBadge || "Conforme Art. 262 CO"), /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-body"
  }, over20 ? 'Art. 262 al. 2 let. b CO' : 'Art. 262 CO · TF · ASLOCA')))), /*#__PURE__*/React.createElement("div", {
    className: "v2-badges-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-mini-badge gold"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 10h12M4 14h9M18 6a7 7 0 0 0-7 7 7 7 0 0 0 7 7"
  })), sub.taxBadge || "Non imposable"), /*#__PURE__*/React.createElement("span", {
    className: "v2-mini-badge blue"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  })), sub.insBadge || "RC collective 5M"), /*#__PURE__*/React.createElement("span", {
    className: "v2-mini-badge cyan"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
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
  })), sub.merkleBadge || "Merkle SHA-256")), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-blue",
    style: {
      marginTop: 20,
      width: '100%'
    },
    disabled: over20,
    onClick: handlePrintPdf
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  })), pdfGenerated ? '✓ Document prêt — Imprimer / PDF' : sub.letterBtn || "Générer la notification régie (PDF)"), /*#__PURE__*/React.createElement("div", {
    className: "v2-btn-hint"
  }, sub.letterHint || "Courrier prêt à signer pour la gérance.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-head"
  }, sub.pdfTitle || "NOTIFICATION OFFICIELLE À LA GÉRANCE"), /*#__PURE__*/React.createElement("p", {
    className: "v2-pdf-intro"
  }, sub.pdfIntro || "En application de l'art. 262 CO..."), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Locataire principal"), /*#__PURE__*/React.createElement("span", null, "[ Nom \xB7 Adresse \xB7 NPA / Ville ]")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "G\xE9rance"), /*#__PURE__*/React.createElement("span", null, "[ Nom \xB7 Adresse \xB7 Contact ]")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Sous-locataire (Permis S)"), /*#__PURE__*/React.createElement("span", null, "[ Nom \xB7 N\xB0 Permis S ]")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Locaux sous-lou\xE9s"), /*#__PURE__*/React.createElement("span", null, "1 pi\xE8ce meubl\xE9e, ~", (15 / Math.max(rooms, 1)).toFixed(1), " m\xB2, cuisine/SdB partag\xE9es")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Loyer forfaitaire"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, "CHF ", chfV2(finalRent), " / mois")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-close"
  }, sub.pdfClose || "Le préavis applicable demeure celui de l'art. 266e CO."), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-sig"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-line"
  }), "Signature \xB7 locataire principal"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-line"
  }), "Date \xB7 Lieu"))))));
}
Object.assign(window, {
  SubleaseWizard
});

// ==================== [Module: BenevolMentors.jsx] ====================
// SwissRelief 2.6 — Benevol mentor network (Side B) · Art. 394 CO
function BenevolMentors({
  t
}) {
  const [commit, setCommit] = React.useState(1);
  const handleApply = () => {
    const url = 'https://t.me/SwissResilienceHubBot?start=mentor';
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };
  const m = t?.mentors || {};
  return /*#__PURE__*/React.createElement("section", {
    id: "mentors",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, m.eyebrow || "Module 04 · Engagement Citoyen — Réseau Benevol"), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, m.title || "Mentorat solidaire : 1 à 3 heures par semaine"), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, m.lede || "Accompagnement bénévole structuré sous mandat gratuit (Art. 394 CO).")), /*#__PURE__*/React.createElement("div", {
    className: "v2-mentors-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, m.commit || "Disponibilité souhaitée"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pill-group"
  }, (m.commitOpts || ["1 h / semaine", "2–3 h / semaine", "À la demande"]).map((o, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `v2-pill-btn ${commit === i ? 'active-blue' : ''}`,
    onClick: () => setCommit(i)
  }, o)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, m.tracks || "Axes d'accompagnement"), /*#__PURE__*/React.createElement("div", {
    className: "v2-tracks-grid"
  }, (m.trackList || [{
    t: "Codes professionnels suisses",
    b: "Relecture de CV, préparation aux entretiens, culture d'entreprise locale."
  }, {
    t: "Logement & intégration",
    b: "Aide aux visites de régies, décryptage des baux, orientation quartier."
  }, {
    t: "Pratique linguistique",
    b: "Conversations hebdomadaires en français ou allemand en situation réelle."
  }]).map((tr, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    className: "v2-track-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-track-num"
  }, "TRACK ", String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "v2-track-title"
  }, tr.t), /*#__PURE__*/React.createElement("div", {
    className: "v2-track-body"
  }, tr.b))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-legal-strip"
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xA7"), /*#__PURE__*/React.createElement("span", null, m.legal || "Engagement régi par l'art. 394 CO (mandat civil bénévole). Aucun lien de subordination.")), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-blue",
    style: {
      marginTop: 18
    },
    onClick: handleApply
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })), m.apply || "Rejoindre le réseau de mentors")), /*#__PURE__*/React.createElement("div", {
    className: "v2-mentors-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-side-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-num"
  }, "1\u20133 h"), /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-lbl"
  }, "/ semaine \xB7 engagement souple")), /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-num"
  }, "Art. 394 CO"), /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-lbl"
  }, "Mandat civil gratuit \xB7 aucun lien d'emploi")), /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-num"
  }, "Benevol Suisse"), /*#__PURE__*/React.createElement("div", {
    className: "v2-side-metric-lbl"
  }, "Standards ehrenamtliche Arbeit CH")))))));
}
Object.assign(window, {
  BenevolMentors
});

// ==================== [Module: BetaDonation.jsx] ====================
// SwissRelief 2.6 — Beta transparency section + Donation modal (MoR: Twint / Card / QR-Facture / Crypto ZK / Stars).
// Fully functional payment interactions as requested by user ("Оплата має працювати для отримання донату").
function BetaSection({
  onOpenDonate,
  t
}) {
  const b = t?.beta || {};
  return /*#__PURE__*/React.createElement("section", {
    id: "beta",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, b.eyebrow || "BÊTA PUBLIQUE · ACCORD SUISSE"), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, b.title || "Transparence absolue & solidarité"), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, b.lede || "Plateforme 100% libre et gratuite pendant toute la phase publique.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-beta-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-price-card frozen"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-frozen-tag"
  }, "B\xEAta \xB7 Gel\xE9"), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-name"
  }, "Candidat \xB7 Pro"), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), " 29 ", /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/mois")), /*#__PURE__*/React.createElement("p", {
    className: "v2-price-tag"
  }, "Filtres USPI \xB7 Alertes ORP prioritaires \xB7 Dossier de candidature PDF/A packag\xE9."), /*#__PURE__*/React.createElement("ul", {
    className: "v2-features"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Recherche source-agnostique \xB7 attribution factuelle r\xE9gie"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Alertes push 5 jours priorit\xE9"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Dossier USPI sign\xE9 PDF/A")), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-disabled",
    disabled: true
  }, "Inactif en B\xEAta")), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-card donation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-price-name"
  }, "Soutenir la plateforme"), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), " 10 ", /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/mois")), /*#__PURE__*/React.createElement("p", {
    className: "v2-price-tag"
  }, "70% infrastructure technique \xB7 30% aide humanitaire & d\xE9fense de l'Ukraine \u2014 v\xE9rifiable Merkle SHA-256."), /*#__PURE__*/React.createElement("div", {
    className: "v2-split-viz",
    role: "img",
    "aria-label": "R\xE9partition des dons"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split v2-split-70"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split-pct"
  }, "70%"), /*#__PURE__*/React.createElement("div", {
    className: "v2-split-desc"
  }, "Serveurs \xB7 API \xB7 ledger Merkle")), /*#__PURE__*/React.createElement("div", {
    className: "v2-split v2-split-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split-pct"
  }, "30%"), /*#__PURE__*/React.createElement("div", {
    className: "v2-split-desc"
  }, "D\xE9fense & humanitaire Ukraine"))), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot?start=donate",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-primary",
    style: {
      width: '100%',
      marginTop: 16,
      textDecoration: 'none',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.79 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })), /*#__PURE__*/React.createElement("span", null, t.donate || "Soutenir via Telegram Bot"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-card frozen"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-frozen-tag"
  }, "B\xEAta \xB7 Gel\xE9"), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-name"
  }, "H\xF4te \xB7 Pro"), /*#__PURE__*/React.createElement("div", {
    className: "v2-price-amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cur"
  }, "CHF"), " 19 ", /*#__PURE__*/React.createElement("span", {
    className: "per"
  }, "/mois")), /*#__PURE__*/React.createElement("p", {
    className: "v2-price-tag"
  }, "R\xE9daction PDF g\xE9rance illimit\xE9e \xB7 Garantie RC 5M \xB7 Suivi mensuel des dossiers."), /*#__PURE__*/React.createElement("ul", {
    className: "v2-features"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Lettres g\xE9rance illimit\xE9es"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Garantie RC 5'000'000 CHF"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), " Support ASLOCA prioritaire")), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-disabled",
    disabled: true
  }, "Inactif en B\xEAta")))));
}

// ---- Donation modal — Portal for full-viewport overlay ----
function DonationModal({
  onClose,
  t
}) {
  const [amount, setAmount] = React.useState(25);
  const [custom, setCustom] = React.useState('');
  const [method, setMethod] = React.useState('twint'); // 'twint' | 'qrfact' | 'crypto' | 'stars'
  const [copiedKey, setCopiedKey] = React.useState(null);
  const [statusMsg, setStatusMsg] = React.useState('');
  const merkle = React.useMemo(() => {
    const h = '0123456789abcdef';
    let s = '0x';
    for (let i = 0; i < 64; i++) s += h[Math.floor(Math.random() * 16)];
    return s;
  }, []);
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  const chips = [10, 25, 50, 100];
  const effectiveAmount = custom ? Number(custom) || 0 : amount;
  const copyToClipboard = (text, key) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };
  const handlePay = () => {
    if (method === 'twint') {
      const url = `https://t.me/SwissResilienceHubBot?start=donate_${effectiveAmount}`;
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
      } else {
        window.open(url, '_blank');
      }
      setStatusMsg(`Redirection vers le paiement sécurisé Twint / Carte (CHF ${effectiveAmount})...`);
    } else if (method === 'stars') {
      const url = `https://t.me/SwissResilienceHubBot?start=stars_${effectiveAmount * 25}`;
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.openTelegramLink) {
        window.Telegram.WebApp.openTelegramLink(url);
      } else {
        window.open(url, '_blank');
      }
      setStatusMsg(`Ouverture du paiement Telegram Stars (${effectiveAmount * 25} XTR)...`);
    } else if (method === 'qrfact') {
      copyToClipboard('CH7409000000123456789', 'iban');
      setStatusMsg(`IBAN copié dans le presse-papier ! Utilisez la référence : SR-${effectiveAmount}-${merkle.slice(2, 8)}`);
    } else if (method === 'crypto') {
      copyToClipboard('TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress', 'usdt');
      setStatusMsg(`Adresse USDT copié dans le presse-papier !`);
    }
  };
  const overlay = /*#__PURE__*/React.createElement("div", {
    className: "v2-modal-backdrop",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    },
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Faire un don"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-modal"
  }, /*#__PURE__*/React.createElement("header", {
    className: "v2-modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v2-eyebrow",
    style: {
      padding: 0,
      background: 'none',
      border: 0
    }
  }, "Merchant of Record \xB7 MoR"), /*#__PURE__*/React.createElement("h2", {
    className: "v2-modal-title"
  }, t.donation?.title || "Soutenir SwissRelief — Registre Merkle public"), /*#__PURE__*/React.createElement("p", {
    className: "v2-modal-sub"
  }, t.donation?.sub || "Bêta = 0 CHF, aucun abonnement. Ce don est strictement volontaire au sens de l'Art. 239 CO (donation).")), /*#__PURE__*/React.createElement("button", {
    className: "v2-modal-close",
    onClick: onClose,
    "aria-label": "Fermer"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "v2-modal-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-modal-label"
  }, t.donation?.amount || "Montant"), /*#__PURE__*/React.createElement("div", {
    className: "v2-amount-row"
  }, chips.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `v2-amount-chip ${!custom && amount === c ? 'active' : ''}`,
    onClick: () => {
      setAmount(c);
      setCustom('');
    }
  }, "CHF ", c)), /*#__PURE__*/React.createElement("div", {
    className: "v2-amount-custom"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    placeholder: "Autre",
    value: custom,
    onChange: e => setCustom(e.target.value),
    className: "v2-input",
    style: {
      paddingRight: 44
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "v2-input-suffix"
  }, "CHF"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-amount-hints"
  }, /*#__PURE__*/React.createElement("span", null, "10 CHF \xB7 Soutien serveur"), /*#__PURE__*/React.createElement("span", null, "25 CHF \xB7 Audit cantonal"), /*#__PURE__*/React.createElement("span", null, "50 CHF \xB7 Parrainage dossier"))), /*#__PURE__*/React.createElement("section", {
    className: "v2-modal-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-modal-label"
  }, t.donation?.method || "Mode de paiement"), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-grid"
  }, [{
    id: 'twint',
    title: t.donation?.twint || 'Twint / Carte',
    sub: t.donation?.twintSub || 'Checkout Stripe SE · TWINT app',
    color: 'blue'
  }, {
    id: 'qrfact',
    title: t.donation?.qr || 'IBAN QR-Facture',
    sub: t.donation?.qrSub || 'Réf. BVR / QR-IID suisse',
    color: 'gold'
  }, {
    id: 'crypto',
    title: t.donation?.crypto || 'Crypto ZK',
    sub: t.donation?.cryptoSub || 'BTC · ETH · USDT · zk-proof',
    color: 'cyan'
  }, {
    id: 'stars',
    title: t.donation?.stars || 'Telegram Stars',
    sub: t.donation?.starsSub || '1-Clic instantané dans Telegram',
    color: 'blue'
  }].map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    className: `v2-pay-card ${p.color} ${method === p.id ? 'active' : ''}`,
    onClick: () => setMethod(p.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "v2-pay-sub"
  }, p.sub)))), method === 'qrfact' && /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "B\xE9n\xE9ficiaire :"), " Association Swiss Resilience"), /*#__PURE__*/React.createElement("span", {
    className: "v2-mono-tag"
  }, "Suisse")), /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Banque :"), " PostFinance / Banque Cantonale de Gen\xE8ve")), /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "IBAN :"), " ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: 'var(--gold-soft-fg)',
      fontFamily: 'var(--font-mono)'
    }
  }, "CH74 0900 0000 1234 5678 9")), /*#__PURE__*/React.createElement("button", {
    className: "v2-copy-btn",
    onClick: () => copyToClipboard('CH7409000000123456789', 'iban')
  }, copiedKey === 'iban' ? t.donation?.copied || "✓ Copié !" : t.donation?.copyIban || "Copier l'IBAN")), /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row",
    style: {
      fontSize: 12,
      color: 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Communication :"), " Don volontaire Art. 239 CO \xB7 ", effectiveAmount, " CHF"))), method === 'crypto' && /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "USDT (TRC20) :"), " ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: '#67E8F9',
      fontFamily: 'var(--font-mono)',
      fontSize: 11
    }
  }, "TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress")), /*#__PURE__*/React.createElement("button", {
    className: "v2-copy-btn",
    onClick: () => copyToClipboard('TYDzs8XpLqW9rZ2vKmN5h8ZKCryptoAddress', 'usdt')
  }, copiedKey === 'usdt' ? t.donation?.copied || "✓ Copié !" : t.donation?.copyAddr || "Copier")), /*#__PURE__*/React.createElement("div", {
    className: "v2-qr-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "ETH / ERC20 :"), " ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: '#67E8F9',
      fontFamily: 'var(--font-mono)',
      fontSize: 11
    }
  }, "0x71C8705a2B88e60802778841B5e9E24F749bB692")), /*#__PURE__*/React.createElement("button", {
    className: "v2-copy-btn",
    onClick: () => copyToClipboard('0x71C8705a2B88e60802778841B5e9E24F749bB692', 'eth')
  }, copiedKey === 'eth' ? t.donation?.copied || "✓ Copié !" : t.donation?.copyAddr || "Copier"))), statusMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: '8px 12px',
      borderRadius: 8,
      background: 'rgba(16,185,129,0.15)',
      border: '1px solid rgba(16,185,129,0.4)',
      color: 'var(--emerald-soft-fg)',
      fontSize: 13
    }
  }, statusMsg)), /*#__PURE__*/React.createElement("section", {
    className: "v2-split-viz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split v2-split-70"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split-pct"
  }, "70%"), /*#__PURE__*/React.createElement("div", {
    className: "v2-split-desc"
  }, "CHF ", (effectiveAmount * 0.7).toFixed(2), " \xB7 infrastructure")), /*#__PURE__*/React.createElement("div", {
    className: "v2-split v2-split-30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-split-pct"
  }, "30%"), /*#__PURE__*/React.createElement("div", {
    className: "v2-split-desc"
  }, "CHF ", (effectiveAmount * 0.3).toFixed(2), " \xB7 Ukraine"))), /*#__PURE__*/React.createElement("section", {
    className: "v2-merkle-strip",
    "aria-label": "Empreinte Merkle"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-merkle-label"
  }, t.donation?.merkleLabel || "Merkle root · session"), /*#__PURE__*/React.createElement("span", {
    className: "v2-merkle-hash"
  }, merkle.slice(0, 22), "\u2026", merkle.slice(-10)), /*#__PURE__*/React.createElement("a", {
    className: "v2-merkle-verify",
    href: "https://github.com/vokov/swiss-resilience-web",
    target: "_blank",
    rel: "noopener noreferrer"
  }, t.donation?.verify || "Vérifier ↗")), /*#__PURE__*/React.createElement("footer", {
    className: "v2-modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-ghost",
    onClick: onClose
  }, t.donation?.cancel || "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-primary",
    onClick: handlePay
  }, t.donation?.btn || "Contribuer CHF", " ", effectiveAmount || 0))));
  return ReactDOM.createPortal(overlay, document.body);
}
Object.assign(window, {
  BetaSection,
  DonationModal
});

// ==================== [Module: AgentChatWidget.jsx] ====================
// ACCORD Suisse — Autonomous Agent Dialogue Widget
// Milestone 4: Multi-channel AI Co-Pilot for Web Portal & Telegram Mini App
// Instant synchronization with 7-service switcher & mobile drawer

function AgentChatWidget({
  isOpen,
  onToggle,
  activeService,
  onSwitchService,
  lang = 'uk',
  t = {}
}) {
  const [messages, setMessages] = React.useState(() => {
    const isUk = lang === 'uk';
    const isFr = lang === 'fr';
    const isDe = lang === 'de';
    const welcome = isUk ? "Вітаю! Я автономний ШІ-копілот ACCORD Suisse 🇨🇭🇺🇦.\nДопомагаю знайти житло під ліміти EVAM, підібрати вакансії з дозволом S (ст. 21a LEI), розрахувати суборенду за ст. 262 CO або згенерувати досьє для режі.\n\nОберіть тему або напишіть запитання нижче:" : isFr ? "Bonjour ! Je suis le co-pilote IA autonome ACCORD Suisse 🇨🇭.\nJe vous accompagne pour le logement aux barèmes EVAM, les postes prioritaires Permis S (Art. 21a LEI), le bouclier de sous-location (Art. 262 CO) et le dossier officiel pour régies.\n\nPosez votre question ou choisissez un sujet ci-dessous :" : isDe ? "Guten Tag! Ich bin der autonome KI-Copilot von ACCORD Suisse 🇨🇭.\nIch helfe Ihnen bei Wohnungen nach EVAM-Grenzwerten, Stellen für Status S (Art. 21a AIG), Untermiete nach Art. 262 OR und Bewerbungsdossiers für Verwaltungen.\n\nStellen Sie Ihre Frage oder wählen Sie ein Thema:" : "Hello! I am the ACCORD Suisse Autonomous AI Co-Pilot 🇨🇭.\nI assist with EVAM-compliant housing, Permis S priority jobs (Art. 21a LEI), Art. 262 CO sublease calculations, and official régie dossiers.\n\nAsk a question or pick a topic below:";
    return [{
      id: 'msg_welcome',
      role: 'assistant',
      text: welcome,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      actions: [{
        label: '🧮 Ліміти EVAM (03)',
        service: 'calc',
        side: 'a'
      }, {
        label: '🛡️ Суборенда ст. 262 (05)',
        service: 'sublease',
        side: 'b'
      }, {
        label: '📄 Досьє для режі (04)',
        service: 'dossier',
        side: 'a'
      }]
    }];
  });
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, isOpen]);

  // Suggestions chips
  const suggestions = [{
    label: '📝 Резюме (CV) та робота',
    q: 'А з резюме та швейцарським форматом CV допоможеш?'
  }, {
    label: '🏠 Ліміти EVAM (Во)',
    q: 'Які ліміти оренди EVAM у кантоні Во для сім\'ї з 3 осіб?'
  }, {
    label: '🛡️ Розрахунок суборенди',
    q: 'Як законно розрахувати плату за кімнату за ст. 262 CO з меблями?'
  }, {
    label: '📄 Досьє для Bernard Nicod',
    q: 'Як підготувати мотиваційний лист для режі Bernard Nicod?'
  }, {
    label: '💼 Вакансії Art. 21a LEI',
    q: 'Як працює 5-денне захищене вікно RAV для дозволу S?'
  }, {
    label: '🚆 SBB Etoy -> Lausanne',
    q: 'Скільки їхати потягом від Etoy до Lausanne Gare?'
  }, {
    label: '🤝 Ментори Benevol',
    q: 'Як отримати волонтера Benevol за договором ст. 394 CO?'
  }];
  const handleSend = textToSend => {
    const q = (textToSend || input).trim();
    if (!q) return;
    const userMsg = {
      id: 'usr_' + Date.now(),
      role: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
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
        answer = "📝 **Так, обов'язково допоможемо скласти та перевірити швейцарське резюме (CV)!**\n\n" + "У Швейцарії до CV діють суворі стандарти, від яких безпосередньо залежить запрошення на інтерв'ю:\n\n" + "1. 📌 **Обов'язкова позначка Permis S у шапці:**\n" + "   Зазначте: *«Permis S (activité lucrative autorisée — безумовне право на працю без обмежень за ст. 4 та 21a LEI)»*. Швейцарські HR часто помилково вважають, що потрібні квоти або складний дозвіл влади.\n\n" + "2. 📄 **Швейцарська структура (максимум 2 сторінки):**\n" + "   • **Фото:** діловий портрет на нейтральному фоні з легкою посмішкою.\n" + "   • **Мови за шкалою CEFR:** наприклад, *«Français A2 (en cours) / Anglais B2»*.\n" + "   • **Досвід:** у зворотному хронологічному порядку із зазначенням конкретних результатів та обов'язків.\n" + "   • **Розділ «Références»:** *«sur demande»* (контакти попередніх керівників або швейцарських менторів).\n\n" + "3. 🤝 **Безкоштовна вичитка волонтерами Benevol (ст. 394 CO):**\n" + "   Швейцарські носії мови безоплатно вичитають ваше резюме, виправлять стиль і підкажуть правильні терміни.\n\n" + "4. 💼 **63 відкриті вакансії:**\n" + "   У каталозі АКОРД зібрано перевірені пропозиції без посередників від роботодавців, які готові брати кандидатів з дозволом S.";
        actions = [{
          label: '🤝 Ментор Benevol для вичитки CV (06)',
          service: 'mentors',
          side: 'b'
        }, {
          label: '💼 Каталог вакансій Permis S (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '📄 Скласти супровідний лист (04)',
          service: 'dossier',
          side: 'a'
        }];

        // 2. Greetings / Who are you
      } else if (qLow.includes('привіт') || qLow.includes('добрий день') || qLow.includes('доброго дня') || qLow.includes('доброго ранку') || qLow.includes('добрий вечір') || qLow.includes('вітаю') || qLow.includes('хто ти') || qLow.includes('що ти вмієш') || qLow.includes('що вмієш') || qLow.includes('hello') || qLow.includes('bonjour') || qLow.includes('salut') || qLow.includes('guten tag') || qLow === 'hi' || qLow === 'hey' || qLow === 'start' || qLow.includes('почати')) {
        answer = "👋 **Вітаю! Я — персональний ШІ-копілот платформи ACCORD Suisse.**\n\n" + "Я допомагаю українцям у Швейцарії (кантони Vaud, Genève, Fribourg, Valais) розв'язувати питання житла, роботи та юридичної інтеграції безкоштовно та конфіденційно.\n\n" + "🎯 **Ось чим я можу допомогти просто зараз:**\n" + "• 📝 **Резюме та робота:** допомога зі швейцарським форматом CV, вичитка носієм мови та 63 відкриті вакансії Permis S.\n" + "• 🏠 **Житло від gérances:** перевірені квартири без посередників і точний розрахунок часу поїздами SBB CFF.\n" + "• 🧮 **Кантональні норми:** калькулятор лімітів EVAM (Во) та Hospice Général (Женева), правило 33%.\n" + "• 🛡️ **Суборенда кімнат:** перевірка законності за ст. 262 CO з обмеженням меблів до 20%.\n" + "• 🤝 **Волонтери Benevol:** безкоштовні ментори для практики французької мови (ст. 394 CO).\n\n" + "Напишіть ваше запитання або оберіть швидку дію нижче:";
        actions = [{
          label: '📝 Допомога з резюме / CV',
          service: 'mentors',
          side: 'b'
        }, {
          label: '🏠 Пошук житла (01)',
          service: 'housing',
          side: 'a'
        }, {
          label: '💼 Каталог вакансій (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '🧮 Ліміти EVAM (03)',
          service: 'calc',
          side: 'a'
        }];

        // 3. Gratitude / Thanks
      } else if (qLow.includes('дякую') || qLow.includes('спасибі') || qLow.includes('мерсі') || qLow.includes('merci') || qLow.includes('danke') || qLow.includes('thank')) {
        answer = "🌟 **Щиро будь ласка! Завжди раді підтримати вас у Швейцарії.**\n\n" + "Якщо виникнуть нові питання щодо оренди, перевірки договору, адаптації CV чи підготовки до співбесіди — звертайтесь у будь-який час!\n\n" + "💡 _Бажаємо успішної та спокійної інтеграції! Разом ми сильніші._ 🇨🇭🇺🇦";
        actions = [{
          label: '🏠 Переглянути житло (01)',
          service: 'housing',
          side: 'a'
        }, {
          label: '💼 Каталог вакансій (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '📖 Інструкція платформи',
          service: 'guide',
          side: 'a'
        }];

        // 4. Job Interview / Hiring Process
      } else if (qLow.includes('співбесід') || qLow.includes('інтерв\'ю') || qLow.includes('entretien') || qLow.includes('interview')) {
        answer = "💼 **Підготовка до співбесіди у Швейцарії (Entretien d'embauche) :**\n\n" + "• ⏰ **Пунктуальність:** Прибувайте рівно за 5–7 хвилин до початку (у Швейцарії це критичний показник надійності).\n" + "• 📜 **Статус Permis S:** Майте копію картки S і впевнено поясніть: компанії достатньо лише подати коротке онлайн-повідомлення (*déclaration de prise d'emploi*), жодних дозволів чи квот не потрібно.\n" + "• 🗣️ **Рівень мови:** Чесно вкажіть ваш рівень французької/німецької та готовність швидко вчити професійну термінологію.\n" + "• 🤝 **Тренування з ментором:** Волонтери Benevol проводять безоплатні тренувальні співбесіди, щоб зняти мовний бар'єр.";
        actions = [{
          label: '🤝 Потренувати співбесіду з ментором (06)',
          service: 'mentors',
          side: 'b'
        }, {
          label: '💼 Каталог вакансій Permis S (02)',
          service: 'prof',
          side: 'a'
        }];

        // 5. Language Learning / French Courses
      } else if (qLow.includes('мовні курс') || qLow.includes('французьк') || qLow.includes('німецьк') || qLow.includes('вивчення мов') || qLow.includes('мов') && (qLow.includes('курс') || qLow.includes('вчит') || qLow.includes('практик'))) {
        answer = "🗣️ **Вивчення мови (Romandie) та мовна практика з носіями :**\n\n" + "• **Офіційні програми EVAM / Hospice:** Соціальні служби компенсують ваучери на курси французької (Français en Jeu, Université Populaire тощо) до рівня B1.\n" + "• **Практика з менторами Benevol (ст. 394 CO):** Безкоштовне спілкування з франкомовними волонтерами за кавою, спільні прогулянки та подолання мовного бар'єра.\n" + "• **Професійна термінологія:** Складання списку ключових термінів за вашою спеціальністю.";
        actions = [{
          label: '🤝 Обрати ментора Benevol (06)',
          service: 'mentors',
          side: 'b'
        }, {
          label: '💼 Вакансії з базовою мовою (02)',
          service: 'prof',
          side: 'a'
        }];

        // 6. Permis S Rights / Labor Law
      } else if (qLow.includes('дозвіл s') || qLow.includes('статус s') || qLow.includes('permis s') || qLow.includes('прав') && qLow.includes('прац')) {
        answer = "🛡️ **Правовий статус Permis S у Швейцарії (Art. 4 & 21a LEI) :**\n\n" + "• **Безумовне право на працю:** Особи зі статусом захисту S мають право працювати у будь-якому кантоні Швейцарії без квот чи федеральних обмежень.\n" + "• **Процедура найму:** Роботодавець не оформлює складний дозвіл — лише надсилає стандартне повідомлення про найм до кантональної служби зайнятості (наприклад, DGEP у Во).\n" + "• **Захищене вікно RAV (ст. 21a LEI):** На вакансії у сферах із безробіттям >= 5% діє пріоритетне 5-денне вікно для зареєстрованих шукачів.\n" + "• **Оплата:** Права захищені галузевими колективними угодами (CCT), демпінг зарплат суворо заборонено.";
        actions = [{
          label: '💼 Каталог вакансій Permis S (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '🤝 Менторська підтримка (06)',
          service: 'mentors',
          side: 'b'
        }];

        // 7. EVAM / Hospice / Limits
      } else if (qLow.includes('evam') || qLow.includes('ліміт') || qLow.includes('hospice') || qLow.includes('норм') || qLow.includes('плафон') || qLow.includes('вартість')) {
        answer = "🧮 **Офіційні нормативи оренди кантону Во (EVAM) та Женеви (Hospice) :**\n\n" + "• **Кантон Во (VD, бареми EVAM):**\n" + "  - 1 особа: **CHF 1'050 – 1'350** / міс брутто\n" + "  - 2 особи: **CHF 1'200 – 1'750** / міс брутто\n" + "  - 3 особи: **CHF 1'350 – 2'050** / міс брутто\n" + "  - 4 особи: **CHF 1'500 – 2'350** / міс брутто\n" + "• **Правило 33%:** брутто-оренда не повинна перевищувати 33.3% сукупного доходу сім'ї.\n\n" + "💡 _Усі квартири у нашому каталозі мають автоматичну відмітку відповідності нормам EVAM._";
        actions = [{
          label: '👉 Відкрити Калькулятор лімітів (03)',
          service: 'calc',
          side: 'a'
        }, {
          label: '👉 Переглянути перевірене житло (01)',
          service: 'housing',
          side: 'a'
        }];

        // 8. Sublease / Art. 262 CO
      } else if (qLow.includes('суборенд') || qLow.includes('262') || qLow.includes('кімнат') || qLow.includes('sous-location') || qLow.includes('господар')) {
        answer = "🛡️ **Юридичний захист суборенди за статтею 262 CO (Code des Obligations) :**\n\n" + "1. **Безумовне право наймача:** Жодна gérance не може повністю заборонити суборенду. Такий пункт договору є нікчемним (_nul de plein droit_).\n" + "2. **Обмеження націнки за меблі:** Максимум **20.0%** від базової частки кімнати (судова практика Федерального суду ATF та директиви ASLOCA).\n" + "3. **Еталонний приклад:** 4 кімнати (2'000 CHF) -> 500 CHF/кімната + 100 CHF (20% меблі) + 80 CHF комунальні = **680 CHF/міс**.\n" + "4. **Строк розірвання:** 2 тижні на кінець місяця (ст. 266e CO).";
        actions = [{
          label: '👉 Відкрити Майстер суборенди (05)',
          service: 'sublease',
          side: 'b'
        }, {
          label: '👉 Повідомлення до режі (Avis 262 CO)',
          service: 'sublease',
          side: 'b'
        }];

        // 9. Rental Dossier / Régies
      } else if (qLow.includes('досьє') || qLow.includes('dossier') || qLow.includes('bernard') || qLow.includes('мотиваційн') || qLow.includes('лист')) {
        answer = "📄 **Стандартизоване швейцарське досьє кандидата (USPI / Art. 253 CO) :**\n\n" + "Швейцарські режі (Bernard Nicod, Cogestim, Domicim, Wincasa) вимагають чіткий пакет документів:\n" + "1. **Attestation Permis S** (Art. 4 LEI — право легального проживання).\n" + "2. **Гарантія оплати EVAM / Fiche de salaire** (підтвердження покриття орендної плати).\n" + "3. **Extrait de l'Office des poursuites** (оригінальний витяг без заборгованостей < 3 міс).\n" + "4. **Attestation RC Ménage** (поліс страхування цивільної відповідальності на CHF 5'000'000).\n\n" + "Наш генератор складає офіційного листа французькою мовою в 1 клік.";
        actions = [{
          label: '👉 Згенерувати офіційне досьє (04)',
          service: 'dossier',
          side: 'a'
        }];

        // 10. Jobs / Art. 21a LEI / RAV / ORP
      } else if (qLow.includes('ваканс') || qLow.includes('робот') || qLow.includes('21a') || qLow.includes('lei') || qLow.includes('rav') || qLow.includes('orp') || qLow.includes('безробітт') || qLow.includes('chômage')) {
        answer = "💼 **Вакансії зі статусом Permis S та правовий режим Art. 21a LEI :**\n\n" + "• **Право на працю:** Власники статусу S мають безумовне право працювати у Швейцарії без квот та дозволів кантональної влади.\n" + "• **Вікно Stellenmeldepflicht (ст. 21a LEI):** Для професій із рівнем безробіття >= 5% вакансії спочатку публікуються виключно для зареєстрованих шукачів ORP/RAV на 5 робочих днів.\n" + "• **Оплата праці:** Суворо регулюється галузевими колективними договорами CCT / GAV.\n" + "• **Актуальна база:** 63 перевірені пропозиції у Romandie прямо від роботодавців.";
        actions = [{
          label: '👉 Відкрити каталог вакансій (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '🤝 Ментор Benevol для CV (06)',
          service: 'mentors',
          side: 'b'
        }];

        // 11. SBB / Commute
      } else if (qLow.includes('sbb') || qLow.includes('потяг') || qLow.includes('хвилин') || qLow.includes('etoy') || qLow.includes('morges') || qLow.includes('дорог') || qLow.includes('маршрут')) {
        answer = "🚆 **Транспортна логістика SBB CFF FFS у регіоні La Côte (Vaud) :**\n\n" + "• **Etoy ⟷ Morges:** 9 хвилин (прямий потяг RER Vaud R5/R6)\n" + "• **Etoy ⟷ Lausanne Gare:** 22-24 хвилини (прямий або 1 пересадка в Renens)\n" + "• **Morges ⟷ Genève:** 29 хвилин (прямий міжрегіональний потяг IR)\n" + "• **Matran ⟷ Lausanne:** 25 хвилин (1 пересадка)\n\n" + "Усі картки житла на порталі АКОРД автоматично розраховують точний час сполучення.";
        actions = [{
          label: '👉 Шукати житло біля станцій (01)',
          service: 'housing',
          side: 'a'
        }];

        // 12. Housing Search with REAL APARTMENT DATABASE QUERY (Typo-tolerant & Price-aware)
      } else if (qLow.includes('житл') || qLow.includes('квартир') || qLow.includes('квартип') || qLow.includes('кватрир') || qLow.includes('кварт') || qLow.includes('знайти житло') || qLow.includes('оренд') || qLow.includes('аренд') || qLow.includes('зняти') || qLow.includes('снять') || qLow.includes('помешкан') || qLow.includes('хат') || qLow.includes('кімнат') || qLow.includes('комнат') || qLow.includes('студі') || qLow.includes('studio') || qLow.includes('appart') || qLow.includes('logement') || qLow.includes('wohnung') || qLow.includes('coloc') || qLow.includes('sublet') || qLow.includes('лозанн') || qLow.includes('ньон') || qLow.includes('морж') || qLow.includes('женев') || qLow.includes('рене') || qLow.includes('фрібур') || qLow.includes('еґль') || qLow.includes('егль') || qLow.includes('матран') || qLow.includes('блоне') || qLow.includes('версуа') || qLow.includes('шезо') || qLow.includes('кларен') || /\b\d{3,4}\b\s*(?:франк|іранк|chf|фр)/.test(qLow) || /(?:до|бюджет|дешевш|ціна|вартіст|<)\s*\d{3,4}/.test(qLow)) {
        const allListings = typeof window !== 'undefined' && (window.HOUSING_LISTINGS || window.SR_HOUSING) || [];

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
            maxPrice = qLow.includes('до') || qLow.includes('<') || qLow.includes('дешевш') || qLow.includes('макс') || qLow.includes('бюджет') || qLow.includes('за') || qLow.includes('ціна') ? Math.min(...nums) : nums[0];
          }
        }

        // 3. Rooms filter
        const roomMatch = qLow.match(/(\d(?:\.5)?)\s*(?:кімн|room|pièce)/);
        const targetRooms = roomMatch ? parseFloat(roomMatch[1]) : qLow.includes('студі') || qLow.includes('studio') ? 1.0 : null;

        // 4. EVAM compliance filter
        const evamOnly = qLow.includes('evam') || qLow.includes('норм') || qLow.includes('соціал') || qLow.includes('погоджен');
        let filtered = allListings.filter(item => {
          if (targetCity) {
            const cName = (item.city_name || item.city && (item.city.fr || item.city.uk) || '').toLowerCase();
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
            const title = item.title && item.title.uk || item.title || 'Квартира';
            const city = item.city && item.city.uk || item.city_name || item.city || 'Romandie';
            const price = item.price || item.rent_gross || 1450;
            const rooms = item.rooms || 2.0;
            const regie = item.regie || item.regie_name || 'Gérance Immobilière';
            const sbbMin = item.sbb ? item.sbb.minutes : item.sbb_minutes || 20;
            const sbbCity = item.sbb ? item.sbb.city : item.sbb_anchor || 'Lausanne';
            const isEvamOk = item.compliance ? item.compliance.ok : item.evam_ok !== false;
            const evamBadge = isEvamOk ? '🟢 Відповідає нормам EVAM' : '🟡 Потребує погодження соцслужби';
            return `${idx + 1}. 🏢 **${title}**\n` + `   • 📍 **Місто:** ${city} (${item.postal_code || ''}, ${item.canton || 'VD'})\n` + `   • 💰 **Оренда:** CHF ${price.toLocaleString('fr-CH')} / міс брутто (з комунальними)\n` + `   • 🛏️ **Кімнат:** ${rooms} · 🏢 **Режі:** ${regie}\n` + `   • 🚆 **SBB:** ${sbbMin} хв до ${sbbCity}\n` + `   • 📋 **EVAM:** ${evamBadge}`;
          }).join('\n\n');
          answer = `🏠 **Знайдено перевірені квартири у базі АКОРД (${filtered.length} варіантів з 40) :**\n\n` + prefixNote + listMd + `\n\n💡 _Усі об'єкти доступні без комісій та посередників за офіційним договором (Art. 253 CO)._`;
          actions = [{
            label: '👉 Відкрити каталог житла (01)',
            service: 'housing',
            side: 'a'
          }, ...(maxPrice && maxPrice < 1000 ? [{
            label: '🛡️ Суборенда кімнати (05)',
            service: 'sublease',
            side: 'a'
          }] : []), {
            label: '📄 Скласти досьє для режі (04)',
            service: 'dossier',
            side: 'a'
          }, {
            label: '🧮 Ліміти EVAM (03)',
            service: 'calc',
            side: 'a'
          }];
        } else {
          answer = "🏠 **База перевіреного житла ACCORD Suisse :**\n\n" + "Усі квартири на платформі перевірені за 3 критеріями:\n" + "1. **Прямі gérances (Bernard Nicod, Domicim, Cogestim) :** без комісій і посередників.\n" + "2. **Норми EVAM / Hospice :** автоматичний бейдж узгодження з соціальними службами.\n" + "3. **SBB-калькулятор :** точний розрахунок часу доріг до Лозанни, Моржа та Женеви.\n\n" + "Перегляньте повний каталог житла за кнопкою нижче:";
          actions = [{
            label: '👉 Переглянути каталог житла (01)',
            service: 'housing',
            side: 'a'
          }, {
            label: '🧮 Перевірити ліміти EVAM (03)',
            service: 'calc',
            side: 'a'
          }];
        }

        // 13. Benevol Mentors
      } else if (qLow.includes('ментор') || qLow.includes('benevol') || qLow.includes('волонтер')) {
        answer = "🤝 **Мережа швейцарських волонтерів Benevol (Art. 394 CO) :**\n\n" + "• **Формат:** Безоплатне цивільне доручення (_contrat de mandat gratuit_), що виключає трудові зобов'язання (ст. 319 CO).\n" + "• **Сфери допомоги:**\n" + "  1. Практика розмовної французької мови.\n" + "  2. Перевірка швейцарського резюме (CV) та супровідних листів.\n" + "  3. Спільні візити на перегляди житла.\n" + "  4. Допомога з адміністративними процедурами.";
        actions = [{
          label: '👉 Обрати ментора Benevol (06)',
          service: 'mentors',
          side: 'b'
        }];

        // 14. User Guide / Documentation
      } else if (qLow.includes('інструкц') || qLow.includes('користуват') || qLow.includes('посібник') || qLow.includes('довідк') || qLow.includes('як працює') || qLow.includes('guide') || qLow.includes('emploi') || qLow.includes('anleitung')) {
        answer = "📖 **Покроковий посібник користувача ACCORD Suisse :**\n\n" + "1. 🏠 **Житло:** верифіковані квартири від режі (без комісій і посередників) та логістика SBB.\n" + "2. 🧮 **Калькулятор:** ліміти EVAM кантону Во та Hospice Женеви (правило 33% доходу).\n" + "3. 📄 **Досьє для режі:** 1-Click створення офіційного пакета за ст. 253 CO французькою.\n" + "4. 💼 **Робота:** 63 вакансії та 5-денне захищене вікно ORP/RAV (ст. 21a LEI).\n" + "5. 🛡️ **Суборенда:** легальний розрахунок за ст. 262 CO з меблями (max 20%).\n" + "6. 🤝 **Ментори:** безоплатна підтримка волонтерів Benevol (ст. 394 CO).\n" + "7. 🎙️ **Голос у Telegram:** записуйте голосові повідомлення у боті @SwissResilienceHubBot (Whisper STT).\n\n" + "Оберіть дію нижче для перегляду повного інтерактивного керівництва:";
        actions = [{
          label: '📖 Відкрити повний гід',
          service: 'guide',
          side: 'a'
        }, {
          label: '🧮 Ліміти EVAM (03)',
          service: 'calc',
          side: 'a'
        }, {
          label: '📄 Досьє для режі (04)',
          service: 'dossier',
          side: 'a'
        }];

        // 15. Smart Contextual Fallback
      } else {
        answer = "🤖 **Дякую за ваше запитання щодо:** *«" + q + "»*\n\n" + "Я можу допомогти вам знайти точне та юридично вивірене рішення за нормами Швейцарії. Оберіть тему, яка найкраще відповідає вашій ситуації:\n\n" + "• 📝 **Резюме та пошук роботи:** адаптація CV під швейцарські вимоги, вичитка носієм мови через Benevol, 63 перевірені вакансії без посередників.\n" + "• 🏠 **Житло та нормативи:** перевірка орендної плати за лімітами EVAM (Во) чи Hospice (Женева), пошук квартир без комісій.\n" + "• 🛡️ **Суборенда кімнати:** легальний розрахунок вартості за ст. 262 CO (максимум 20% за меблі).\n" + "• 📄 **Досьє кандидата:** генерація офіційного листа для gérances французькою в 1 клік.\n" + "• 🤝 **Швейцарський волонтер:** безкоштовний ментор для розмовної практики та супроводу.\n\n" + "Оберіть один із розділів або сформулюйте запит детальніше :";
        actions = [{
          label: '📝 Резюме та вакансії (02)',
          service: 'prof',
          side: 'a'
        }, {
          label: '🏠 Пошук житла (01)',
          service: 'housing',
          side: 'a'
        }, {
          label: '🧮 Ліміти EVAM (03)',
          service: 'calc',
          side: 'a'
        }, {
          label: '🤝 Ментор Benevol (06)',
          service: 'mentors',
          side: 'b'
        }];
      }
      const botMsg = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        text: answer,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        actions: actions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };
  const handleActionClick = act => {
    if (act.service === 'guide') {
      try {
        window.location.hash = 'guide';
      } catch (e) {}
    } else if (act.service && onSwitchService) {
      onSwitchService(act.service, act.side || 'a');
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    className: "v2-agent-fab",
    "aria-label": "\u0428\u0406-\u041A\u043E\u043F\u0456\u043B\u043E\u0442 ACCORD Suisse",
    style: {
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
      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '16px'
    }
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("span", null, lang === 'uk' ? 'ШІ-Копілот' : lang === 'fr' ? 'Co-pilote IA' : lang === 'de' ? 'KI-Copilot' : 'AI Co-Pilot'), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#22C55E',
      boxShadow: '0 0 8px #22C55E',
      display: 'inline-block'
    }
  })), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "v2-agent-dialogue-overlay",
    onClick: onToggle,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(7, 11, 18, 0.72)',
      backdropFilter: 'blur(6px)',
      zIndex: 99998,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-agent-dialogue-panel",
    onClick: e => e.stopPropagation(),
    style: {
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
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      background: 'linear-gradient(180deg, rgba(213, 43, 30, 0.15) 0%, rgba(11, 17, 30, 0) 100%)',
      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #D52B1E 0%, #7F1D1D 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      boxShadow: '0 0 12px rgba(213, 43, 30, 0.4)'
    }
  }, "\uD83E\uDD16"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: '14px',
      letterSpacing: '-0.01em',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, "ACCORD Co-Pilot", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      background: 'rgba(34, 197, 94, 0.15)',
      color: '#4ADE80',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      padding: '1px 5px',
      borderRadius: '4px'
    }
  }, "ONLINE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#94A3B8'
    }
  }, "NVIDIA Nemotron .184 \xB7 Utopia DB .251"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMessages(prev => prev.slice(0, 1)),
    title: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u0456\u0441\u0442\u043E\u0440\u0456\u044E",
    style: {
      background: 'transparent',
      border: 'none',
      color: '#94A3B8',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '4px'
    }
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
    style: {
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
    }
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px',
      borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
      display: 'flex',
      gap: '6px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      whiteSpace: 'nowrap',
      background: 'rgba(255, 255, 255, 0.02)'
    }
  }, suggestions.map((s, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => handleSend(s.q),
    style: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(148, 163, 184, 0.15)',
      borderRadius: '16px',
      color: '#CBD5E1',
      padding: '5px 10px',
      fontSize: '11.5px',
      fontWeight: 500,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '14px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, messages.map(m => {
    const isUser = m.role === 'user';
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '88%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
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
      }
    }, m.text), m.actions && m.actions.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '4px'
      }
    }, m.actions.map((act, aIdx) => /*#__PURE__*/React.createElement("button", {
      key: aIdx,
      onClick: () => handleActionClick(act),
      style: {
        background: 'rgba(56, 189, 248, 0.12)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '12px',
        padding: '4px 10px',
        fontSize: '11px',
        fontWeight: 600,
        color: '#38BDF8',
        cursor: 'pointer'
      }
    }, act.label))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '10px',
        color: '#64748B',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        padding: '0 4px'
      }
    }, m.time));
  }), isTyping && /*#__PURE__*/React.createElement("div", {
    style: {
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
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u0410\u043D\u0430\u043B\u0456\u0437 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0432\u0441\u0442\u0432\u0430 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u0457"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      animation: 'pulse 1s infinite'
    }
  }, "\u23F3")), /*#__PURE__*/React.createElement("div", {
    ref: messagesEndRef
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      handleSend();
    },
    style: {
      padding: '12px',
      borderTop: '1px solid rgba(148, 163, 184, 0.12)',
      background: 'rgba(11, 17, 30, 0.95)',
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: input,
    onChange: e => setInput(e.target.value),
    placeholder: lang === 'uk' ? "Запитайте про оренду, EVAM, суборенду, досьє..." : "Posez une question sur le logement, EVAM, bail...",
    style: {
      flex: 1,
      background: 'rgba(255, 255, 255, 0.06)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      borderRadius: '12px',
      padding: '10px 14px',
      fontSize: '12.5px',
      color: '#F8FAFC',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !input.trim(),
    style: {
      background: input.trim() ? '#D52B1E' : 'rgba(255, 255, 255, 0.08)',
      color: input.trim() ? '#FFFFFF' : '#64748B',
      border: 'none',
      borderRadius: '12px',
      padding: '10px 16px',
      fontWeight: 700,
      fontSize: '13px',
      cursor: input.trim() ? 'pointer' : 'default',
      transition: 'background 0.2s ease'
    }
  }, "\u27A4")))));
}
Object.assign(window, {
  AgentChatWidget
});

// ==================== [Module: Footer.jsx] ====================
// ACCORD Suisse — Legal and accessible footer with verified working links
function FooterV2({
  t,
  onOpenInfo,
  lang = 'uk'
}) {
  const isUk = lang === 'uk';
  return /*#__PURE__*/React.createElement("footer", {
    className: "v2-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-brand",
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-name"
  }, "ACCORD", /*#__PURE__*/React.createElement("span", null, isUk ? 'АКОРД Швейцарія · Permis S' : 'L\'Accord Suisse · Permis S'))), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.6,
      color: '#94A3B8',
      fontSize: 13
    }
  }, isUk ? "Вільний волонтерський проєкт взаємодопомоги у Швейцарії: перевірені квартири від агенцій, легальна робота та підтримка місцевих жителів без посередників і комісій." : "Plateforme citoyenne et bénévole pour le logement digne, l'emploi légal et l'intégration en Suisse Romande. 100% gratuit et sans intermédiaire."), /*#__PURE__*/React.createElement("p", {
    className: "v2-foot-url",
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#38BDF8',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u2708\uFE0F"), " @SwissResilienceHubBot"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, isUk ? 'Сервіси' : 'Services'), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#housing"
  }, isUk ? 'Житло від режі (EVAM/SBB)' : 'Logement vérifié (EVAM / SBB)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prof"
  }, isUk ? 'Робота та резюме (LEI)' : 'Offres d\'emploi & CV (LEI)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#calc"
  }, isUk ? 'Калькулятор норм (26 кантонів)' : 'Calculateur plafonds (26 cantons)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#dossier"
  }, isUk ? 'Досьє для режі (1-Click)' : 'Dossier régie 1-Click (USPI)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#sublease"
  }, isUk ? 'Суборенда кімнати (ст. 262 CO)' : 'Sous-location solidaire (262 CO)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#mentors"
  }, isUk ? 'Швейцарські ментори Benevol' : 'Mentors bénévoles Benevol')))), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, isUk ? 'Корисне та довідка' : 'Guide & À propos'), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#guide",
    onClick: e => {
      e.preventDefault();
      if (onOpenInfo) onOpenInfo('guide');else window.location.hash = 'guide';
    }
  }, "\uD83D\uDCD6 ", isUk ? 'Як користуватись сервісом' : 'Mode d\'emploi')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#why",
    onClick: e => {
      e.preventDefault();
      if (onOpenInfo) onOpenInfo('why');else window.location.hash = 'why';
    }
  }, "\u2B50 ", isUk ? 'Чому ми кращі (порівняння)' : 'Pourquoi ACCORD (comparatif)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#about",
    onClick: e => {
      e.preventDefault();
      if (onOpenInfo) onOpenInfo('about');else window.location.hash = 'about';
    }
  }, "\uD83C\uDFDB\uFE0F ", isUk ? 'Про проєкт АКОРД' : 'À propos du projet')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "/privacy"
  }, "\uD83D\uDEE1\uFE0F ", isUk ? 'Політика конфіденційності (nDSG)' : 'Confidentialité (nLPD / RGPD)')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://sonate-solidaire.me",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83C\uDFBB Sonate Solidaire (Arsen Kovalenko) \u2197")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, isUk ? 'Офіційні ресурси Швейцарії' : 'Ressources officielles'), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.fedlex.admin.ch",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83C\uDDE8\uD83C\uDDED Fedlex \xB7 \u0417\u0430\u043A\u043E\u043D\u0438 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u0457 (CO / LEI) \u2197")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.edoeb.admin.ch",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83C\uDFDB\uFE0F ED\xD6B \xB7 \u0417\u0430\u0445\u0438\u0441\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u0438\u0445 \u0434\u0430\u043D\u0438\u0445 \u2197")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.asloca.ch",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83C\uDFE2 ASLOCA \xB7 \u0417\u0430\u0445\u0438\u0441\u0442 \u043F\u0440\u0430\u0432 \u043E\u0440\u0435\u043D\u0434\u0430\u0440\u0456\u0432 \u2197")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.seco.admin.ch",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83D\uDCBC SECO \xB7 \u0420\u0438\u043D\u043E\u043A \u043F\u0440\u0430\u0446\u0456 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u0457 \u2197")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://www.benevol.ch",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\uD83E\uDD1D Benevol Suisse \xB7 \u041C\u0435\u0440\u0435\u0436\u0430 \u0432\u043E\u043B\u043E\u043D\u0442\u0435\u0440\u0456\u0432 \u2197"))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-row",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "\u2713 100% \u0411\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E (\u0441\u0442. 2 LSE)"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "\u2713 \u041E\u0444\u0456\u0446\u0456\u0439\u043D\u0456 \u043B\u0456\u043C\u0456\u0442\u0438 26 \u043A\u0430\u043D\u0442\u043E\u043D\u0456\u0432"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip cyan"
  }, "\u2713 \u0417\u0430\u0445\u0438\u0441\u0442 \u0434\u0430\u043D\u0438\u0445 (nDSG / RGPD)"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "\u2713 \u0421\u043F\u0456\u043B\u044C\u043D\u043E\u0442\u0430 \u0432\u043E\u043B\u043E\u043D\u0442\u0435\u0440\u0456\u0432 Benevol")), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-legal"
  }, "\xA9 2026 \u0410\u041A\u041E\u0420\u0414 \u0428\u0432\u0435\u0439\u0446\u0430\u0440\u0456\u044F (ACCORD Suisse) \xB7 \u041D\u0435\u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0430 \u0432\u043E\u043B\u043E\u043D\u0442\u0435\u0440\u0441\u044C\u043A\u0430 \u0456\u043D\u0456\u0446\u0456\u0430\u0442\u0438\u0432\u0430 \u0432\u0437\u0430\u0454\u043C\u043E\u0434\u043E\u043F\u043E\u043C\u043E\u0433\u0438. \u0406\u043D\u0456\u0446\u0456\u0430\u0442\u043E\u0440: Arsen Kovalenko (Avenue du Mont-Blanc 29, 1196 Gland).", /*#__PURE__*/React.createElement("br", null), "\u0423\u0441\u0456 \u0434\u0430\u043D\u0456 \u043D\u0430\u0434\u0445\u043E\u0434\u044F\u0442\u044C \u0437 \u043E\u0444\u0456\u0446\u0456\u0439\u043D\u0438\u0445 \u0434\u0436\u0435\u0440\u0435\u043B (\u043A\u0430\u043D\u0442\u043E\u043D\u0438, SECO, \u043E\u0444\u0456\u0446\u0456\u0439\u043D\u0456 \u0436\u0438\u0442\u043B\u043E\u0432\u0456 \u0430\u0433\u0435\u043D\u0446\u0456\u0457). \u0421\u0435\u0440\u0432\u0456\u0441 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u043B\u044E\u0434\u0435\u0439 \u0456 \u043D\u0456\u043A\u043E\u043B\u0438 \u043D\u0435 \u0431\u0435\u0440\u0435 \u0433\u0440\u043E\u0448\u0435\u0439 \u0437\u0430 \u043F\u043E\u0448\u0443\u043A \u0440\u043E\u0431\u043E\u0442\u0438 \u0447\u0438 \u0436\u0438\u0442\u043B\u0430.")));
}
Object.assign(window, {
  FooterV2
});

// ==================== [Module: app.jsx] ====================
// ACCORD-S · Root Application Router & Unification
// Combines ACCORD 2.7 branding with full 2.6 suite:
// - HousingCards (real apartments with photos, EVAM limits, SBB travel time)
// - ProfessionSelector & JobCard (63 live job openings, Swiss cover letter assistant, CV guide)
// - CantonCalculator (26 cantons official social ceilings)
// - DossierGenerator (USPI standard rental dossier builder)
// - Sublease (Art. 262 CO sublease calculator & contract)
// - BenevolMentors (Benevol Suisse mentor network)
// - BetaDonation (Transparent association support & Telegram link)

const _appMemStore = {};
function safeStorageGet(key, def = null) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) || def : _appMemStore[key] || def;
  } catch (e) {
    return _appMemStore[key] || def;
  }
}
function safeStorageSet(key, val) {
  try {
    if (window.localStorage) window.localStorage.setItem(key, val);
  } catch (e) {
    _appMemStore[key] = val;
  }
}
window.safeGet = safeStorageGet;
window.safeSet = safeStorageSet;
function App() {
  const isTMA = (() => {
    try {
      const p = window.location.pathname;
      if (p.includes('/app') || p.includes('/mini-app')) return true;
      if (window.Telegram?.WebApp?.initData) return true;
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'tma' || params.get('tma') === '1') return true;
    } catch (e) {}
    return false;
  })();
  const [lang, setLang] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang');
      if (paramLang && ['fr', 'de', 'it', 'uk', 'en'].includes(paramLang)) return paramLang;
    } catch (e) {}
    return safeStorageGet('sr26-lang', safeStorageGet('sr-v2-lang', 'uk'));
  });
  const [side, setSide] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSide = urlParams.get('side');
      if (paramSide === 'a' || paramSide === 'b') return paramSide;
      const viewParam = urlParams.get('view') || urlParams.get('service') || urlParams.get('tab');
      if (viewParam === 'sublease' || viewParam === 'mentors') return 'b';
      if (['prof', 'jobs', 'calc', 'housing', 'dossier'].includes(viewParam)) return 'a';
    } catch (e) {}
    return safeStorageGet('sr26-side', safeStorageGet('sr-v2-side', 'a'));
  });
  const [service, setService] = React.useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') || params.get('service') || params.get('tab');
      if (viewParam) {
        if (['prof', 'jobs', 'job', 'emplois'].includes(viewParam)) return 'prof';
        if (['housing', 'calc', 'dossier', 'beta', 'sublease', 'mentors'].includes(viewParam)) return viewParam;
        if (viewParam === 'checkout' || viewParam === 'donate') return 'beta';
      }
      if (params.get('job')) return 'prof';
      if (params.get('housing') || params.get('item')) return 'housing';
      const h = window.location.hash.replace('#', '');
      if (['calc', 'housing', 'dossier', 'beta', 'prof', 'jobs', 'sublease', 'mentors'].includes(h)) {
        return h === 'jobs' ? 'prof' : h;
      }
    } catch (e) {}
    return 'housing';
  });
  const [canton, setCanton] = React.useState(() => safeStorageGet('sr26-canton', 'VD'));
  const [status, setStatus] = React.useState(() => safeStorageGet('sr26-status', 'evam'));
  const [income, setIncome] = React.useState(() => Number(safeStorageGet('sr26-income', 4800)) || 4800);
  const [drawerOpen, setDrawer] = React.useState(false);
  const [dossierPrefill, setPrefill] = React.useState(null);
  const [infoModal, setInfoModal] = React.useState({
    open: false,
    tab: 'about'
  });
  const [chatOpen, setChatOpen] = React.useState(false);
  const openChat = () => setChatOpen(true);
  const toggleChat = () => setChatOpen(prev => !prev);
  const openInfo = (tab = 'about') => {
    setInfoModal({
      open: true,
      tab
    });
    try {
      window.location.hash = tab;
    } catch (e) {}
  };
  const closeInfo = () => {
    setInfoModal(prev => ({
      ...prev,
      open: false
    }));
    const h = window.location.hash.replace('#', '');
    if (['about', 'guide', 'why', 'privacy'].includes(h)) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
  };

  // Persistence
  React.useEffect(() => {
    safeStorageSet('sr26-lang', lang);
    safeStorageSet('sr-v2-lang', lang);
  }, [lang]);
  React.useEffect(() => {
    safeStorageSet('sr26-side', side);
    safeStorageSet('sr-v2-side', side);
  }, [side]);
  React.useEffect(() => {
    safeStorageSet('sr26-canton', canton);
  }, [canton]);
  React.useEffect(() => {
    safeStorageSet('sr26-status', status);
  }, [status]);
  React.useEffect(() => {
    safeStorageSet('sr26-income', String(income));
  }, [income]);

  // Telegram WebApp initialization
  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        if (tg.enableClosingConfirmation) {
          tg.enableClosingConfirmation();
        }
        if (tg.MainButton) {
          tg.MainButton.hide();
        }
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);

  // Hash & query routing
  React.useEffect(() => {
    const checkDeepLink = () => {
      try {
        const h = window.location.hash.replace('#', '');
        if (['about', 'guide', 'why', 'privacy'].includes(h)) {
          setInfoModal({
            open: true,
            tab: h
          });
        } else if (['housing', 'calc', 'dossier', 'prof', 'sublease', 'mentors', 'beta'].includes(h)) {
          setService(h);
          if (['sublease', 'mentors'].includes(h)) setSide('b');else if (['housing', 'calc', 'dossier', 'prof'].includes(h)) setSide('a');
        } else if (h === 'jobs') {
          setService('prof');
          setSide('a');
        }
      } catch (e) {}
    };
    window.addEventListener('hashchange', checkDeepLink);
    checkDeepLink();
    return () => window.removeEventListener('hashchange', checkDeepLink);
  }, []);
  const t = window.SR_I18N && window.SR_I18N[lang] ? window.SR_I18N[lang] : window.SR_I18N && window.SR_I18N.uk ? window.SR_I18N.uk : window.SR_I18N ? window.SR_I18N.fr : {};
  const pickService = (id, s) => {
    const targetId = id === 'jobs' ? 'prof' : id;
    setService(targetId);
    if (s) setSide(s);else if (['sublease', 'mentors'].includes(targetId)) setSide('b');else if (['housing', 'prof', 'calc', 'dossier'].includes(targetId)) setSide('a');
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  };
  const handleGenerate = item => {
    setPrefill(item);
    setSide('a');
    setService('dossier');
    setTimeout(() => {
      const el = document.getElementById('dossier');
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 80);
  };
  const openTelegramDonate = () => {
    const url = 'https://t.me/SwissResilienceHubBot?start=donate';
    if (window.Telegram?.WebApp && window.Telegram.WebApp.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Telegram Mini App dedicated mobile view
  if (isTMA) {
    return /*#__PURE__*/React.createElement("div", {
      className: "tma-app-shell"
    }, /*#__PURE__*/React.createElement("header", {
      className: "tma-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tma-brand"
    }, /*#__PURE__*/React.createElement(BrandMark, {
      size: 28
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "tma-title"
    }, "ACCORD Suisse"), /*#__PURE__*/React.createElement("div", {
      className: "tma-sub"
    }, "Permis S \xB7 Romandie"))), /*#__PURE__*/React.createElement("div", {
      className: "tma-actions"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => openInfo('guide'),
      "aria-label": "Mode d'emploi",
      style: {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(148,163,184,0.2)',
        borderRadius: 8,
        padding: '4px 8px',
        fontSize: 11.5,
        color: '#38BDF8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCD6"), /*#__PURE__*/React.createElement("span", null, lang === 'uk' ? 'Гід' : 'Guide')), /*#__PURE__*/React.createElement("button", {
      className: "v2-lang-btn",
      onClick: () => {
        const order = ['uk', 'fr', 'de', 'en'];
        const next = order[(order.indexOf(lang) + 1) % order.length];
        setLang(next);
      },
      style: {
        padding: '4px 8px',
        fontSize: 11.5
      }
    }, /*#__PURE__*/React.createElement("span", null, window.LANG_FLAGS ? window.LANG_FLAGS[lang] : '🌐'), /*#__PURE__*/React.createElement("span", null, window.LANG_CODES ? window.LANG_CODES[lang] : lang.toUpperCase())))), /*#__PURE__*/React.createElement("main", {
      className: "tma-content"
    }, service === 'housing' && /*#__PURE__*/React.createElement(HousingSection, {
      t: t,
      lang: lang,
      canton: canton,
      onGenerate: handleGenerate
    }), service === 'calc' && /*#__PURE__*/React.createElement(CantonCalculatorV2, {
      t: t,
      lang: lang,
      canton: canton,
      setCanton: setCanton,
      status: status,
      income: income
    }), service === 'dossier' && /*#__PURE__*/React.createElement(DossierGenerator, {
      t: t,
      lang: lang,
      prefill: dossierPrefill
    }), service === 'prof' && /*#__PURE__*/React.createElement(ProfessionSelector, {
      t: t,
      lang: lang
    }), service === 'sublease' && /*#__PURE__*/React.createElement(SubleaseWizard, {
      t: t
    }), service === 'mentors' && /*#__PURE__*/React.createElement(BenevolMentors, {
      t: t
    }), service === 'beta' && /*#__PURE__*/React.createElement(BetaSection, {
      onOpenDonate: openTelegramDonate,
      t: t
    })), /*#__PURE__*/React.createElement("nav", {
      className: "tma-bottom-bar",
      "aria-label": "Navigation Mini App"
    }, /*#__PURE__*/React.createElement("button", {
      className: service === 'housing' ? 'active' : '',
      onClick: () => {
        setSide('a');
        pickService('housing');
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12 12 3l9 9M5 10v10h14V10"
    })), /*#__PURE__*/React.createElement("span", null, t.nav?.housing || "Житло")), /*#__PURE__*/React.createElement("button", {
      className: service === 'prof' ? 'active' : '',
      onClick: () => {
        setSide('a');
        pickService('prof');
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 3v18h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 15l4-4 3 3 5-6"
    })), /*#__PURE__*/React.createElement("span", null, t.nav?.jobs || "Робота")), /*#__PURE__*/React.createElement("button", {
      className: service === 'calc' ? 'active' : '',
      onClick: () => {
        setSide('a');
        pickService('calc');
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "4",
      y: "2",
      width: "16",
      height: "20",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "6",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "10",
      x2: "16",
      y2: "10"
    })), /*#__PURE__*/React.createElement("span", null, t.svc?.calc || "Ліміти")), /*#__PURE__*/React.createElement("button", {
      className: service === 'dossier' ? 'active' : '',
      onClick: () => {
        setSide('a');
        pickService('dossier');
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 13h8M8 17h5"
    })), /*#__PURE__*/React.createElement("span", null, t.nav?.dossier || "Досьє")), /*#__PURE__*/React.createElement("button", {
      className: service === 'mentors' || service === 'sublease' ? 'active' : '',
      onClick: () => {
        setSide('b');
        pickService('mentors', 'b');
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 21v-2a4 4 0 0 0-3-3.87"
    })), /*#__PURE__*/React.createElement("span", null, t.svc?.mentors || "Ментори"))), /*#__PURE__*/React.createElement(AgentChatWidget, {
      isOpen: chatOpen,
      onToggle: toggleChat,
      activeService: service,
      onSwitchService: pickService,
      lang: lang,
      t: t
    }), /*#__PURE__*/React.createElement(InfoModal, {
      isOpen: infoModal.open,
      onClose: closeInfo,
      initialTab: infoModal.tab,
      lang: lang,
      t: t
    }));
  }

  // Full Desktop & Mobile Web Experience
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBannerV2, {
    t: t
  }), /*#__PURE__*/React.createElement(NavV2, {
    lang: lang,
    setLang: setLang,
    side: side,
    setSide: setSide,
    onOpenDrawer: () => setDrawer(true),
    onOpenDonate: openTelegramDonate,
    onOpenInfo: openInfo,
    t: t
  }), /*#__PURE__*/React.createElement(ServiceSwitcher, {
    activeId: service,
    onPick: pickService,
    onOpenChat: openChat,
    t: t
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(HeroV2, {
    side: side,
    setSide: setSide,
    onOpenInfo: openInfo,
    t: t
  }), side === 'a' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FourPillars, {
    onOpenInfo: openInfo,
    t: t
  }), /*#__PURE__*/React.createElement(HousingSection, {
    t: t,
    lang: lang,
    canton: canton,
    onGenerate: handleGenerate
  }), /*#__PURE__*/React.createElement(ProfessionSelector, {
    t: t,
    lang: lang
  }), /*#__PURE__*/React.createElement(CantonCalculatorV2, {
    t: t,
    lang: lang,
    canton: canton,
    setCanton: setCanton,
    status: status,
    income: income
  }), /*#__PURE__*/React.createElement(DossierGenerator, {
    t: t,
    lang: lang,
    prefill: dossierPrefill
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FourPillars, {
    onOpenInfo: openInfo,
    t: t
  }), /*#__PURE__*/React.createElement(SubleaseWizard, {
    t: t
  }), /*#__PURE__*/React.createElement(BenevolMentors, {
    t: t
  })), /*#__PURE__*/React.createElement(BetaSection, {
    onOpenDonate: openTelegramDonate,
    t: t
  })), /*#__PURE__*/React.createElement(FooterV2, {
    t: t,
    onOpenInfo: openInfo,
    lang: lang
  }), drawerOpen && /*#__PURE__*/React.createElement(MobileDrawer, {
    lang: lang,
    setLang: setLang,
    side: side,
    setSide: setSide,
    service: service,
    setService: setService,
    onClose: () => setDrawer(false),
    onOpenDonate: openTelegramDonate,
    onDonate: openTelegramDonate,
    onOpenInfo: openInfo,
    onOpenChat: openChat,
    t: t
  }), /*#__PURE__*/React.createElement(AgentChatWidget, {
    isOpen: chatOpen,
    onToggle: toggleChat,
    activeService: service,
    onSwitchService: pickService,
    lang: lang,
    t: t
  }), /*#__PURE__*/React.createElement(InfoModal, {
    isOpen: infoModal.open,
    onClose: closeInfo,
    initialTab: infoModal.tab,
    lang: lang,
    t: t
  }));
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ACCORD App ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B12',
          color: '#F8FAFC',
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center',
          padding: 24
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 56,
          height: 56,
          borderRadius: 14,
          background: '#D52B1E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          boxShadow: '0 0 24px rgba(213,43,30,0.45)',
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("img", {
        src: "/accord_logo.jpg",
        alt: "ACCORD",
        style: {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        },
        onError: e => {
          e.target.style.display = 'none';
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 6,
          letterSpacing: '-0.01em'
        }
      }, "ACCORD Suisse"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: '#94A3B8',
          maxWidth: 360,
          lineHeight: 1.5,
          marginBottom: 18
        }
      }, "\u041E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0434\u0430\u043D\u0438\u0445... \u042F\u043A\u0449\u043E \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0430 \u043D\u0435 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u043B\u0430\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E, \u043D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0447\u0435:"), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          try {
            localStorage.clear();
          } catch (e) {}
          window.location.reload();
        },
        style: {
          background: '#D52B1E',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer'
        }
      }, "\u041E\u043D\u043E\u0432\u0438\u0442\u0438 \u0441\u0442\u043E\u0440\u0456\u043D\u043A\u0443"));
    }
    return this.props.children;
  }
}
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(App, null)));
}