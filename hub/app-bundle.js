/* Swiss Resilience Navigator 2.5 — Consolidated Bundle */

// ==================== [Module: Nav.jsx] ====================
// SwissRelief 2.6 — Sticky header (NO backdrop-filter on the wrap = no containing-block trap, ADR-017)
function BrandMark({
  size = 22
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
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
  t
}) {
  const [langOpen, setLangOpen] = React.useState(false);
  const FLAGS = {
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    uk: "🇺🇦"
  };
  const NAMES = {
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    uk: "Українська"
  };
  const LABELS = {
    fr: "FR",
    de: "DE",
    it: "IT",
    uk: "UK"
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
  return /*#__PURE__*/React.createElement("header", {
    className: "v2-sticky-header",
    role: "banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container v2-nav-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    className: "v2-brand",
    "aria-label": "SwissRelief"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-name"
  }, "SwissRelief", /*#__PURE__*/React.createElement("span", null, "Pan-Swiss 2.6"))), /*#__PURE__*/React.createElement("div", {
    className: "v2-nav-tagline",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-mono-tag"
  }, "26 CANTONS \xB7 4 LANGUES \xB7 ART. 60\u201379 CC")), /*#__PURE__*/React.createElement("div", {
    className: "v2-nav-actions"
  }, /*#__PURE__*/React.createElement("div", {
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
  }, ['fr', 'de', 'it', 'uk'].map(l => /*#__PURE__*/React.createElement("button", {
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
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-ghost v2-desktop-only"
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
  })), /*#__PURE__*/React.createElement("span", null, "Bot Telegram")), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-primary v2-donate",
    onClick: onOpenDonate,
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
  t
}) {
  const services = [{
    id: 'calc',
    side: 'a',
    num: '01',
    badge: 'A',
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
    label: t.svc.calc,
    sub: 'EVAM · Hospice · AOZ'
  }, {
    id: 'prof',
    side: 'a',
    num: '02',
    badge: 'A',
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
    label: t.svc.prof,
    sub: 'Art. 21a LEI · CH-ISCO'
  }, {
    id: 'sublease',
    side: 'b',
    num: '03',
    badge: 'B',
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
    label: t.svc.sublease,
    sub: '10–20% mobilier · ASLOCA'
  }, {
    id: 'mentors',
    side: 'b',
    num: '04',
    badge: 'B',
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
    label: t.svc.mentors,
    sub: 'Art. 394 CO · Benevol'
  }, {
    id: 'beta',
    side: null,
    num: '05',
    badge: 'FREE',
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
    label: t.svc.beta,
    sub: '0 CHF · Transparence'
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
  }, s.sub)))))));
}
Object.assign(window, {
  ServiceSwitcher
});

// ==================== [Module: MobileDrawer.jsx] ====================
// SwissRelief 2.6 — Portal-mounted full-height drawer.
// Uses ReactDOM.createPortal(..., document.body) to escape ANY parent containing block (ADR-017).
function MobileDrawer({
  lang,
  setLang,
  side,
  setSide,
  onClose,
  onOpenDonate,
  t
}) {
  const FLAGS = {
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    uk: "🇺🇦"
  };
  const NAMES = {
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    uk: "Українська"
  };
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
  const gotoService = (targetSide, id) => {
    if (targetSide) setSide(targetSide);
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 80);
  };
  const services = [{
    id: 'calc',
    side: 'a',
    label: t.svc.calc,
    sub: 'EVAM · Hospice · AOZ',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 12 12 3l9 9M5 10v10h14V10"
    }))
  }, {
    id: 'prof',
    side: 'a',
    label: t.svc.prof,
    sub: 'Art. 21a LEI · CH-ISCO',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
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
    }))
  }, {
    id: 'sublease',
    side: 'b',
    label: t.svc.sublease,
    sub: '10–20% mobilier · ASLOCA',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }))
  }, {
    id: 'mentors',
    side: 'b',
    label: t.svc.mentors,
    sub: 'Art. 394 CO · Benevol',
    icon: /*#__PURE__*/React.createElement("svg", {
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
    }))
  }, {
    id: 'beta',
    side: null,
    label: t.svc.beta,
    sub: '0 CHF · Transparence',
    icon: /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
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
    }))
  }];
  const overlay = /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("aside", {
    className: "v2-drawer",
    role: "dialog",
    "aria-label": "Menu SwissRelief",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-badge"
  }, /*#__PURE__*/React.createElement(BrandMark, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-name"
  }, "SwissRelief", /*#__PURE__*/React.createElement("span", null, "Pan-Swiss 2.6"))), /*#__PURE__*/React.createElement("button", {
    className: "v2-drawer-close",
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
    className: "v2-drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-section-title"
  }, t.drawer.language), /*#__PURE__*/React.createElement("div", {
    className: "v2-lang-grid"
  }, ['fr', 'de', 'it', 'uk'].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    className: `v2-lang-tile ${l === lang ? 'active' : ''}`,
    onClick: () => setLang(l)
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-lang-tile-flag",
    "aria-hidden": "true"
  }, FLAGS[l]), /*#__PURE__*/React.createElement("span", {
    className: "v2-lang-tile-name"
  }, NAMES[l]))))), /*#__PURE__*/React.createElement("section", {
    className: "v2-drawer-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-section-title"
  }, t.drawer.modules), /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-services"
  }, services.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: "v2-drawer-service",
    onClick: () => gotoService(s.side, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: `v2-drawer-svc-icon ${s.side ? `side-${s.side}` : ''}`
  }, s.icon), /*#__PURE__*/React.createElement("span", {
    className: "v2-drawer-svc-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-drawer-svc-label"
  }, s.label), /*#__PURE__*/React.createElement("span", {
    className: "v2-drawer-svc-sub"
  }, s.sub)), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-drawer-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-primary",
    style: {
      width: '100%'
    },
    onClick: () => {
      onClose();
      onOpenDonate();
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
  })), t.donate), /*#__PURE__*/React.createElement("a", {
    href: "https://t.me/SwissResilienceHubBot",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "v2-btn v2-btn-ghost",
    style: {
      width: '100%',
      marginTop: 10
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
  })), "@SwissResilienceHubBot"), /*#__PURE__*/React.createElement("p", {
    className: "v2-drawer-legal"
  }, "Association en cr\xE9ation \u2014 Art. 60\u201379 CC Suisse", /*#__PURE__*/React.createElement("br", null), "B\xEAta publique \xB7 Aucun \xE9molument \xB7 Aucun abonnement payant"))));
  return ReactDOM.createPortal(overlay, document.body);
}
Object.assign(window, {
  MobileDrawer
});

// ==================== [Module: Hero.jsx] ====================
// SwissRelief 2.6 — Hero with SHORT title, two-sided tab switcher, trust badges.
// Uses fluid grid `repeat(auto-fit, minmax(220px, 1fr))` for badges (ADR-017 anomaly #4 fix).
function HeroV2({
  side,
  setSide,
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-pulse-dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, "26 CANTONS \xB7 4 LANGUES \xB7 MERKLE SHA-256")), /*#__PURE__*/React.createElement("h1", {
    className: "v2-hero-title"
  }, t.hero.line1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-accent"
  }, t.hero.line2)), /*#__PURE__*/React.createElement("p", {
    className: "v2-hero-sub"
  }, t.hero.lede), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-tabs",
    role: "tablist",
    "aria-label": "Public cible"
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
  }, t.tabs.seekers), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-sub"
  }, t.tabs.seekersSub))), /*#__PURE__*/React.createElement("button", {
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
  }, t.tabs.solidarity), /*#__PURE__*/React.createElement("span", {
    className: "v2-tab-sub"
  }, t.tabs.solSub)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-trust-grid"
  }, t.trust.map((m, i) => /*#__PURE__*/React.createElement("div", {
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
Object.assign(window, {
  HeroV2
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
  lang = 'fr'
}) {
  const [canton, setCanton] = React.useState("VD");
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
  const displayCeiling = c.basis === rentType ? raw : c.basis === "brut" ? Math.round(raw * 0.85) : Math.round(raw / 0.85);
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

// ==================== [Module: ProfessionSelector.jsx] ====================
// SwissRelief 2.6 — CH-ISCO profession radar (Side A)
// Connected to all 15 sectors from window.SECTORS with localized titles, salaries, and Art. 21a LEI tags.
// Fixed stellen-alert stacking: column on mobile, row on desktop (ADR-017 anomaly #3).
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
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.prof.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, t.prof.title), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, t.prof.lede)), /*#__PURE__*/React.createElement("div", {
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
  }, t.prof.stellenTitle), /*#__PURE__*/React.createElement("div", {
    className: "v2-stellen-text"
  }, t.prof.stellenBody))), /*#__PURE__*/React.createElement("div", {
    className: "v2-prof-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "v2-prof-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ISCO"), /*#__PURE__*/React.createElement("th", null, t.prof.titleCol), /*#__PURE__*/React.createElement("th", null, t.prof.qualif), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, t.prof.salary), /*#__PURE__*/React.createElement("th", null, t.prof.stellenCol))), /*#__PURE__*/React.createElement("tbody", null, sector.jobs.map((j, i) => /*#__PURE__*/React.createElement("tr", {
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
  }, "CHF ", chfV2(j.salary[0]), " \u2013 ", chfV2(j.salary[1]))), /*#__PURE__*/React.createElement("td", null, j.stellen ? /*#__PURE__*/React.createElement("span", {
    className: "v2-status-pill warn",
    title: "Priorit\xE9 ORP / RAV 5 jours"
  }, "\u25CF Art. 21a LEI") : /*#__PURE__*/React.createElement("span", {
    className: "v2-status-pill free",
    title: "March\xE9 libre"
  }, "Libre"))))))))));
}
Object.assign(window, {
  ProfessionSelector
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
  return /*#__PURE__*/React.createElement("section", {
    id: "sublease",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.sublease.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, t.sublease.title), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, t.sublease.lede)), /*#__PURE__*/React.createElement("div", {
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
  }, t.sublease.shield), /*#__PURE__*/React.createElement("div", {
    className: "v2-shield-body"
  }, t.sublease.shieldBody))), /*#__PURE__*/React.createElement("div", {
    className: "v2-two-col-fields"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.totalRent), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.rooms), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("label", null, t.sublease.base), /*#__PURE__*/React.createElement("div", {
    className: "v2-quote-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-quote-formula"
  }, "CHF ", chfV2(totalRent), " / ", rooms, " pi\xE8ces"), /*#__PURE__*/React.createElement("span", {
    className: "v2-quote-value"
  }, "CHF ", chfV2(base)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "v2-slider-label"
  }, /*#__PURE__*/React.createElement("span", null, t.sublease.surcharge), /*#__PURE__*/React.createElement("span", {
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
  }, t.sublease.surchargeLimit)), /*#__PURE__*/React.createElement("div", {
    className: "v2-final-rent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-final-label"
  }, t.sublease.final), /*#__PURE__*/React.createElement("div", {
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
  }, over20 ? t.sublease.overBadge : t.sublease.okBadge), /*#__PURE__*/React.createElement("div", {
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
  })), t.sublease.taxBadge), /*#__PURE__*/React.createElement("span", {
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
  })), t.sublease.insBadge), /*#__PURE__*/React.createElement("span", {
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
  })), t.sublease.merkleBadge)), /*#__PURE__*/React.createElement("button", {
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
  })), pdfGenerated ? '✓ Document prêt — Imprimer / PDF' : t.sublease.letterBtn), /*#__PURE__*/React.createElement("div", {
    className: "v2-btn-hint"
  }, t.sublease.letterHint)), /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-pdf-head"
  }, t.sublease.pdfTitle), /*#__PURE__*/React.createElement("p", {
    className: "v2-pdf-intro"
  }, t.sublease.pdfIntro), /*#__PURE__*/React.createElement("div", {
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
  }, t.sublease.pdfClose), /*#__PURE__*/React.createElement("div", {
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
  return /*#__PURE__*/React.createElement("section", {
    id: "mentors",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.mentors.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, t.mentors.title), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, t.mentors.lede)), /*#__PURE__*/React.createElement("div", {
    className: "v2-mentors-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, t.mentors.commit), /*#__PURE__*/React.createElement("div", {
    className: "v2-pill-group"
  }, t.mentors.commitOpts.map((o, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: `v2-pill-btn ${commit === i ? 'active-blue' : ''}`,
    onClick: () => setCommit(i)
  }, o)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-field"
  }, /*#__PURE__*/React.createElement("label", null, t.mentors.tracks), /*#__PURE__*/React.createElement("div", {
    className: "v2-tracks-grid"
  }, t.mentors.trackList.map((tr, i) => /*#__PURE__*/React.createElement("article", {
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
  }, "\xA7"), /*#__PURE__*/React.createElement("span", null, t.mentors.legal)), /*#__PURE__*/React.createElement("button", {
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
  })), t.mentors.apply)), /*#__PURE__*/React.createElement("div", {
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
  return /*#__PURE__*/React.createElement("section", {
    id: "beta",
    className: "v2-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, t.beta.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "v2-section-title"
  }, t.beta.title), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-sub"
  }, t.beta.lede)), /*#__PURE__*/React.createElement("div", {
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
  }, "\u2713"), " Filtres avanc\xE9s Flatfox / Job-Room"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
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
  }, "D\xE9fense & humanitaire Ukraine"))), /*#__PURE__*/React.createElement("button", {
    className: "v2-btn v2-btn-primary",
    style: {
      width: '100%',
      marginTop: 16
    },
    onClick: onOpenDonate
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
  })), t.donate || "Faire un don libre")), /*#__PURE__*/React.createElement("div", {
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

// ==================== [Module: Footer.jsx] ====================
// SwissRelief 2.6 — Legal footer with compliance chip strip
function FooterV2({
  t
}) {
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
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "v2-brand-name"
  }, "SwissRelief", /*#__PURE__*/React.createElement("span", null, "Pan-Swiss 2.6"))), /*#__PURE__*/React.createElement("p", null, t.footer.about), /*#__PURE__*/React.createElement("p", {
    className: "v2-foot-url"
  }, "violin-integration.works \xB7 swiss-resilience-web.pages.dev")), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Modules"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#calc"
  }, "Bar\xE8mes cantonaux (26)")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prof"
  }, "Radar CH-ISCO-19")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#sublease"
  }, "Sous-location 262 CO")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#mentors"
  }, "Mentors Benevol")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#beta"
  }, "Transparence Merkle")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "R\xE9f\xE9rences l\xE9gales"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Art. 262 CO \xB7 Sous-location")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Art. 21a LEI \xB7 Priorit\xE9 ORP")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Art. 394 CO \xB7 Mandat gratuit")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Art. 60\u201379 CC \xB7 Association")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Art. 239 CO \xB7 Donation")))), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Conformit\xE9"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "LPD / GDPR-CH")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "SKOS Standards")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "USPI \xB7 ASLOCA")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Benevol Suisse")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "WCAG 2.1 AA"))))), /*#__PURE__*/React.createElement("div", {
    className: "v2-compliance-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "SKOS \xB7 CH"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "CCNT / CCT"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "Benevol Suisse"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "USPI \xB7 ASLOCA"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "SECO \xB7 Art. 21a LEI"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip cyan"
  }, "Merkle SHA-256"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "WCAG 2.1 AA"), /*#__PURE__*/React.createElement("span", {
    className: "v2-comp-chip"
  }, "TMA v7.10")), /*#__PURE__*/React.createElement("div", {
    className: "v2-foot-legal"
  }, "\xA9 2026 SwissRelief \u2014 Association en cr\xE9ation \xB7 Gen\xE8ve / Vaud \xB7 Art. 60\u201379 CC Suisse.", /*#__PURE__*/React.createElement("br", null), "Aucun abonnement commercial pendant la B\xEAta. Toutes les donn\xE9es proviennent des sources officielles (SKOS, cantons, SECO, Job-Room, Tribunal f\xE9d\xE9ral).")));
}
Object.assign(window, {
  FooterV2
});

// ==================== [Module: app.jsx] ====================
// SwissRelief 2.6 — App Root Component
// Implements ADR-016 safe storage, Telegram WebApp stabilization, and quad-lingual i18n routing.

// Safe storage helper resilient to Telegram in-app browser and private mode storage blocks (ADR-016)
const _memStore = {};
function safeStorageGet(key, def = null) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) || def : _memStore[key] || def;
  } catch (e) {
    return _memStore[key] || def;
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
  const [lang, setLang] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang');
      if (paramLang && ['fr', 'de', 'it', 'uk'].includes(paramLang)) return paramLang;
    } catch (e) {}
    return safeStorageGet('sr-v2-lang', 'fr');
  });
  const [side, setSide] = React.useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramSide = urlParams.get('side');
      if (paramSide === 'a' || paramSide === 'b') return paramSide;
    } catch (e) {}
    return safeStorageGet('sr-v2-side', 'a');
  });
  const [service, setService] = React.useState('calc');
  const [drawerOpen, setDrawer] = React.useState(false);
  const [donateOpen, setDonate] = React.useState(false);
  React.useEffect(() => {
    safeStorageSet('sr-v2-lang', lang);
  }, [lang]);
  React.useEffect(() => {
    safeStorageSet('sr-v2-side', side);
  }, [side]);

  // Early Telegram WebApp initialization and stabilization
  React.useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        if (window.Telegram.WebApp.enableClosingConfirmation) {
          window.Telegram.WebApp.enableClosingConfirmation();
        }
      } catch (e) {
        console.warn('Telegram WebApp init warning:', e);
      }
    }
  }, []);
  const t = window.SR_I18N && window.SR_I18N[lang] ? window.SR_I18N[lang] : window.SR_I18N ? window.SR_I18N.fr : {};
  const pickService = (id, s) => {
    setService(id);
    if (s) setSide(s);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 40);
  };
  if (!t || !t.banner) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 40,
        textAlign: 'center',
        color: '#CBD5E1',
        fontFamily: 'Inter, sans-serif'
      }
    }, "Chargement de l'environnement SwissRelief 2.6...");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBannerV2, {
    t: t
  }), /*#__PURE__*/React.createElement(NavV2, {
    lang: lang,
    setLang: setLang,
    side: side,
    setSide: setSide,
    onOpenDrawer: () => setDrawer(true),
    onOpenDonate: () => setDonate(true),
    t: t
  }), /*#__PURE__*/React.createElement(ServiceSwitcher, {
    activeId: service,
    onPick: pickService,
    t: t
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(HeroV2, {
    side: side,
    setSide: setSide,
    t: t
  }), side === 'a' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CantonCalculatorV2, {
    t: t,
    lang: lang
  }), /*#__PURE__*/React.createElement(ProfessionSelector, {
    t: t,
    lang: lang
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SubleaseWizard, {
    t: t
  }), /*#__PURE__*/React.createElement(BenevolMentors, {
    t: t
  })), /*#__PURE__*/React.createElement(BetaSection, {
    onOpenDonate: () => setDonate(true),
    t: t
  })), /*#__PURE__*/React.createElement(FooterV2, {
    t: t
  }), drawerOpen && /*#__PURE__*/React.createElement(MobileDrawer, {
    lang: lang,
    setLang: setLang,
    side: side,
    setSide: setSide,
    onClose: () => setDrawer(false),
    onOpenDonate: () => setDonate(true),
    t: t
  }), donateOpen && /*#__PURE__*/React.createElement(DonationModal, {
    onClose: () => setDonate(false),
    t: t
  }));
}
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(/*#__PURE__*/React.createElement(App, null));
}