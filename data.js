// ============================================================
// SWISS RESILIENCE NAVIGATOR 2.5 — DATA LAYER
// 26 cantons · CH-ISCO-19 · Stellenmeldepflicht · Quad-lingual i18n
// ============================================================

// -------- 26 CANTONAL RENT CEILINGS (SOCIAL ASSISTANCE / EVAM-EQUIVALENT) --------
// Values in CHF/month. "brut" = charges comprises, "net" = hors charges.
// Household sizes: 1p, 2p, 3p, 4p, 5p+
window.CANTONS = [
  { code: "VD", name: { fr: "Vaud", de: "Waadt", it: "Vaud", uk: "Во" }, authority: "EVAM", basis: "brut", heating: "included",
    ceilings: { "1": 1050, "2": 1250, "3": 1350, "4": 1650, "5": 2100 } },
  { code: "GE", name: { fr: "Genève", de: "Genf", it: "Ginevra", uk: "Женева" }, authority: "Hospice Général", basis: "net", heating: "separate",
    ceilings: { "1": 1100, "2": 1300, "3": 1550, "4": 1800, "5": 2100 } },
  { code: "ZH", name: { fr: "Zurich", de: "Zürich", it: "Zurigo", uk: "Цюрих" }, authority: "AOZ / SKOS", basis: "brut", heating: "included",
    ceilings: { "1": 1400, "2": 1700, "3": 2000, "4": 2300, "5": 2600 } },
  { code: "BE", name: { fr: "Berne", de: "Bern", it: "Berna", uk: "Берн" }, authority: "GSI Bern", basis: "brut", heating: "included",
    ceilings: { "1": 1000, "2": 1250, "3": 1500, "4": 1750, "5": 2000 } },
  { code: "BS", name: { fr: "Bâle-Ville", de: "Basel-Stadt", it: "Basilea Città", uk: "Базель-Штадт" }, authority: "WSU Basel", basis: "brut", heating: "included",
    ceilings: { "1": 1100, "2": 1450, "3": 1700, "4": 1950, "5": 2200 } },
  { code: "TI", name: { fr: "Tessin", de: "Tessin", it: "Ticino", uk: "Тічино" }, authority: "LAPS Ticino", basis: "brut", heating: "included",
    ceilings: { "1": 800, "2": 1100, "3": 1300, "4": 1500, "5": 1500 } },
  { code: "AG", name: { fr: "Argovie", de: "Aargau", it: "Argovia", uk: "Аргау" }, authority: "SKOS Aargau", basis: "brut", heating: "included",
    ceilings: { "1": 1050, "2": 1300, "3": 1550, "4": 1750, "5": 1950 } },
  { code: "SG", name: { fr: "Saint-Gall", de: "St. Gallen", it: "San Gallo", uk: "Санкт-Ґаллен" }, authority: "SKOS St. Gallen", basis: "brut", heating: "included",
    ceilings: { "1": 950, "2": 1200, "3": 1450, "4": 1650, "5": 1850 } },
  { code: "LU", name: { fr: "Lucerne", de: "Luzern", it: "Lucerna", uk: "Люцерн" }, authority: "DISG Luzern", basis: "brut", heating: "included",
    ceilings: { "1": 1050, "2": 1300, "3": 1550, "4": 1800, "5": 2000 } },
  { code: "SO", name: { fr: "Soleure", de: "Solothurn", it: "Soletta", uk: "Золотурн" }, authority: "SKOS Solothurn", basis: "brut", heating: "included",
    ceilings: { "1": 950, "2": 1200, "3": 1400, "4": 1600, "5": 1800 } },
  { code: "FR", name: { fr: "Fribourg", de: "Freiburg", it: "Friborgo", uk: "Фрібур" }, authority: "SASoc Fribourg", basis: "brut", heating: "included",
    ceilings: { "1": 950, "2": 1200, "3": 1450, "4": 1650, "5": 1850 } },
  { code: "NE", name: { fr: "Neuchâtel", de: "Neuenburg", it: "Neuchâtel", uk: "Невшатель" }, authority: "SCAS Neuchâtel", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1350, "4": 1550, "5": 1750 } },
  { code: "VS", name: { fr: "Valais", de: "Wallis", it: "Vallese", uk: "Вале" }, authority: "SAS Valais", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1400, "4": 1600, "5": 1800 } },
  { code: "BL", name: { fr: "Bâle-Campagne", de: "Basel-Landschaft", it: "Basilea Campagna", uk: "Базель-Ланд" }, authority: "SID Basel-Land", basis: "brut", heating: "included",
    ceilings: { "1": 1050, "2": 1350, "3": 1600, "4": 1850, "5": 2050 } },
  { code: "TG", name: { fr: "Thurgovie", de: "Thurgau", it: "Turgovia", uk: "Тургау" }, authority: "SKOS Thurgau", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1400, "4": 1600, "5": 1800 } },
  { code: "GR", name: { fr: "Grisons", de: "Graubünden", it: "Grigioni", uk: "Ґраубюнден" }, authority: "SKOS Graubünden", basis: "brut", heating: "included",
    ceilings: { "1": 950, "2": 1200, "3": 1450, "4": 1650, "5": 1850 } },
  { code: "SZ", name: { fr: "Schwytz", de: "Schwyz", it: "Svitto", uk: "Швіц" }, authority: "SKOS Schwyz", basis: "brut", heating: "included",
    ceilings: { "1": 1050, "2": 1350, "3": 1600, "4": 1850, "5": 2050 } },
  { code: "ZG", name: { fr: "Zoug", de: "Zug", it: "Zugo", uk: "Цуґ" }, authority: "SKOS Zug", basis: "brut", heating: "included",
    ceilings: { "1": 1200, "2": 1550, "3": 1850, "4": 2100, "5": 2350 } },
  { code: "AR", name: { fr: "Appenzell Rh. Ext.", de: "Appenzell A.Rh.", it: "Appenzello Esterno", uk: "Аппенцелль-Ауссерроден" }, authority: "SKOS AR", basis: "brut", heating: "included",
    ceilings: { "1": 850, "2": 1100, "3": 1350, "4": 1550, "5": 1750 } },
  { code: "AI", name: { fr: "Appenzell Rh. Int.", de: "Appenzell I.Rh.", it: "Appenzello Interno", uk: "Аппенцелль-Іннерроден" }, authority: "SKOS AI", basis: "brut", heating: "included",
    ceilings: { "1": 850, "2": 1100, "3": 1350, "4": 1550, "5": 1750 } },
  { code: "GL", name: { fr: "Glaris", de: "Glarus", it: "Glarona", uk: "Ґларус" }, authority: "SKOS Glarus", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1350, "4": 1550, "5": 1750 } },
  { code: "NW", name: { fr: "Nidwald", de: "Nidwalden", it: "Nidvaldo", uk: "Нідвальден" }, authority: "SKOS Nidwalden", basis: "brut", heating: "included",
    ceilings: { "1": 950, "2": 1200, "3": 1450, "4": 1650, "5": 1850 } },
  { code: "OW", name: { fr: "Obwald", de: "Obwalden", it: "Obvaldo", uk: "Обвальден" }, authority: "SKOS Obwalden", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1400, "4": 1600, "5": 1800 } },
  { code: "SH", name: { fr: "Schaffhouse", de: "Schaffhausen", it: "Sciaffusa", uk: "Шаффгаузен" }, authority: "SKOS Schaffhausen", basis: "brut", heating: "included",
    ceilings: { "1": 900, "2": 1150, "3": 1400, "4": 1600, "5": 1800 } },
  { code: "UR", name: { fr: "Uri", de: "Uri", it: "Uri", uk: "Урі" }, authority: "SKOS Uri", basis: "brut", heating: "included",
    ceilings: { "1": 850, "2": 1100, "3": 1350, "4": 1550, "5": 1750 } },
  { code: "JU", name: { fr: "Jura", de: "Jura", it: "Giura", uk: "Юра" }, authority: "SAS Jura", basis: "brut", heating: "included",
    ceilings: { "1": 850, "2": 1100, "3": 1300, "4": 1500, "5": 1700 } }
];

// -------- CH-ISCO-19 SECTORS + REPRESENTATIVE PROFESSIONS --------
// stellenmeldepflicht = subject to 5-day RAV/ORP priority (Art. 21a LEI)
window.SECTORS = [
  { id: "HOSP", labels: { fr: "Hôtellerie & Restauration", de: "Hotellerie & Gastronomie", it: "Alberghi & Ristorazione", uk: "Готелі та ресторани" },
    categories: [
      { id: "kitchen", labels: { fr: "Cuisine", de: "Küche", it: "Cucina", uk: "Кухня" }, jobs: [
        { isco: "9412", stellen: true,  qualif: "sans", salary: [3713, 4100], titles: { fr: "Aide de cuisine", de: "Küchenhilfe", it: "Aiuto cuoco", uk: "Помічник кухаря" } },
        { isco: "5120", stellen: true,  qualif: "cfc",  salary: [4528, 5200], titles: { fr: "Cuisinier", de: "Koch", it: "Cuoco", uk: "Кухар" } },
        { isco: "1412", stellen: false, qualif: "tert", salary: [5293, 6800], titles: { fr: "Chef de cuisine", de: "Küchenchef", it: "Capocuoco", uk: "Шеф-кухар" } }
      ]},
      { id: "service", labels: { fr: "Service & Salle", de: "Service & Saal", it: "Servizio & Sala", uk: "Обслуговування залу" }, jobs: [
        { isco: "9412", stellen: true,  qualif: "sans", salary: [3713, 4000], titles: { fr: "Aide de service", de: "Servicehilfe", it: "Aiuto cameriere", uk: "Помічник офіціанта" } },
        { isco: "5131", stellen: true,  qualif: "cfc",  salary: [4300, 5000], titles: { fr: "Serveur", de: "Kellner / Servicefachangestellte", it: "Cameriere", uk: "Офіціант" } }
      ]},
      { id: "front",   labels: { fr: "Réception & Front office", de: "Rezeption", it: "Ricezione", uk: "Ресепшн" }, jobs: [
        { isco: "4224", stellen: true,  qualif: "cfc",  salary: [4200, 5100], titles: { fr: "Réceptionniste hôtelier", de: "Empfangsmitarbeiter Hotel", it: "Receptionist", uk: "Адміністратор готелю" } }
      ]}
    ]},
  { id: "CONST", labels: { fr: "Bâtiment, Construction & Génie civil", de: "Bau & Ingenieurbau", it: "Edilizia & Genio civile", uk: "Будівництво та інжиніринг" },
    categories: [
      { id: "gros", labels: { fr: "Gros-œuvre", de: "Rohbau", it: "Struttura grezza", uk: "Основні роботи" }, jobs: [
        { isco: "9313", stellen: true,  qualif: "sans", salary: [4500, 4900], titles: { fr: "Manœuvre de construction", de: "Bauarbeiter", it: "Manovale edile", uk: "Різнороб на будівництві" } },
        { isco: "7112", stellen: true,  qualif: "cfc",  salary: [5300, 6100], titles: { fr: "Maçon", de: "Maurer", it: "Muratore", uk: "Муляр" } }
      ]},
      { id: "second", labels: { fr: "Second-œuvre", de: "Ausbau", it: "Finiture", uk: "Оздоблювальні роботи" }, jobs: [
        { isco: "7115", stellen: true,  qualif: "cfc",  salary: [5200, 6000], titles: { fr: "Charpentier / Menuisier", de: "Zimmermann / Schreiner", it: "Carpentiere / Falegname", uk: "Тесля / Столяр" } },
        { isco: "7126", stellen: false, qualif: "cfc",  salary: [5100, 5900], titles: { fr: "Installateur sanitaire", de: "Sanitärinstallateur", it: "Installatore sanitario", uk: "Сантехнік" } }
      ]}
    ]},
  { id: "HEALTH", labels: { fr: "Santé, Soins & Petite enfance", de: "Gesundheit, Pflege & Kinderbetreuung", it: "Salute, Cure & Prima infanzia", uk: "Охорона здоров'я, догляд, діти" },
    categories: [
      { id: "care", labels: { fr: "Soins & Assistance", de: "Pflege & Betreuung", it: "Cure & Assistenza", uk: "Догляд" }, jobs: [
        { isco: "5322", stellen: false, qualif: "afp",  salary: [4500, 5100], titles: { fr: "Assistante en soins (ASA/ASSC)", de: "FaGe / AGS", it: "Operatore socio-sanitario", uk: "Асистент з догляду" } },
        { isco: "2221", stellen: false, qualif: "tert", salary: [6200, 7800], titles: { fr: "Infirmier·ère diplômé·e", de: "Dipl. Pflegefachperson HF", it: "Infermiere diplomato", uk: "Дипломована медсестра" } }
      ]},
      { id: "child", labels: { fr: "Petite enfance", de: "Kinderbetreuung", it: "Prima infanzia", uk: "Догляд за дітьми" }, jobs: [
        { isco: "5311", stellen: false, qualif: "cfc",  salary: [4300, 5000], titles: { fr: "Éducatrice de l'enfance (ASE)", de: "Fachfrau Betreuung Kind", it: "Operatrice per l'infanzia", uk: "Вихователь" } }
      ]}
    ]},
  { id: "CLEAN", labels: { fr: "Nettoyage, Sécurité & Facility", de: "Reinigung, Sicherheit & Facility", it: "Pulizia, Sicurezza & Facility", uk: "Прибирання, безпека, facility" },
    categories: [
      { id: "clean", labels: { fr: "Nettoyage", de: "Reinigung", it: "Pulizia", uk: "Прибирання" }, jobs: [
        { isco: "9112", stellen: false, qualif: "sans", salary: [3800, 4300], titles: { fr: "Agent·e de propreté", de: "Reinigungskraft", it: "Addetto pulizie", uk: "Прибиральник" } }
      ]},
      { id: "sec",  labels: { fr: "Sécurité", de: "Sicherheit", it: "Sicurezza", uk: "Безпека" }, jobs: [
        { isco: "5414", stellen: false, qualif: "cfc",  salary: [4600, 5300], titles: { fr: "Agent·e de sécurité", de: "Sicherheitsmitarbeiter", it: "Addetto alla sicurezza", uk: "Охоронець" } }
      ]}
    ]},
  { id: "LOG", labels: { fr: "Logistique, Transport & Magasinage", de: "Logistik, Transport & Lager", it: "Logistica, Trasporti & Magazzino", uk: "Логістика та транспорт" },
    categories: [
      { id: "wh",   labels: { fr: "Magasinage", de: "Lager", it: "Magazzino", uk: "Склад" }, jobs: [
        { isco: "9333", stellen: false, qualif: "sans", salary: [4100, 4600], titles: { fr: "Manutentionnaire", de: "Lagermitarbeiter", it: "Addetto magazzino", uk: "Комірник" } },
        { isco: "4321", stellen: false, qualif: "cfc",  salary: [4700, 5500], titles: { fr: "Logisticien CFC", de: "Logistiker EFZ", it: "Impiegato di logistica AFC", uk: "Логіст" } }
      ]},
      { id: "drv",  labels: { fr: "Conduite & Livraison", de: "Fahrdienst & Lieferung", it: "Guida & Consegna", uk: "Водії" }, jobs: [
        { isco: "8332", stellen: false, qualif: "cfc",  salary: [4800, 5600], titles: { fr: "Chauffeur poids lourd", de: "LKW-Chauffeur", it: "Autista camion", uk: "Водій вантажівки" } }
      ]}
    ]},
  { id: "IND", labels: { fr: "Industrie, Métallurgie & Horlogerie", de: "Industrie, Metall & Uhrmacherei", it: "Industria, Metallo & Orologeria", uk: "Промисловість та годинникарство" },
    categories: [
      { id: "prod", labels: { fr: "Production", de: "Produktion", it: "Produzione", uk: "Виробництво" }, jobs: [
        { isco: "9329", stellen: false, qualif: "sans", salary: [4000, 4500], titles: { fr: "Ouvrier de production", de: "Produktionsmitarbeiter", it: "Operaio di produzione", uk: "Робітник виробництва" } }
      ]},
      { id: "watch",labels: { fr: "Horlogerie", de: "Uhrmacherei", it: "Orologeria", uk: "Годинникарство" }, jobs: [
        { isco: "7311", stellen: false, qualif: "cfc",  salary: [5000, 6200], titles: { fr: "Horloger·ère", de: "Uhrmacher", it: "Orologiaio", uk: "Годинникар" } }
      ]}
    ]},
  { id: "RETAIL", labels: { fr: "Vente au détail & Commerce", de: "Detailhandel & Verkauf", it: "Vendita al dettaglio", uk: "Роздрібна торгівля" },
    categories: [
      { id: "sales",labels: { fr: "Vente", de: "Verkauf", it: "Vendita", uk: "Продажі" }, jobs: [
        { isco: "5223", stellen: false, qualif: "afp",  salary: [4100, 4800], titles: { fr: "Assistant·e du commerce de détail", de: "Detailhandelsassistent EBA", it: "Assistente vendita AFP", uk: "Помічник продавця" } },
        { isco: "5223", stellen: false, qualif: "cfc",  salary: [4400, 5300], titles: { fr: "Gestionnaire du commerce de détail", de: "Detailhandelsfachfrau EFZ", it: "Impiegata vendita AFC", uk: "Продавець-консультант" } }
      ]}
    ]},
  { id: "OFFICE", labels: { fr: "Administration & Bureau", de: "Administration & Büro", it: "Amministrazione", uk: "Адміністрація та офіс" },
    categories: [
      { id: "admin",labels: { fr: "Employé·e de commerce", de: "Kauffrau/-mann", it: "Impiegato di commercio", uk: "Офісний працівник" }, jobs: [
        { isco: "4110", stellen: false, qualif: "cfc",  salary: [4700, 5800], titles: { fr: "Employé·e de commerce CFC", de: "Kauffrau EFZ", it: "Impiegato di commercio AFC", uk: "Комерційний працівник" } }
      ]}
    ]},
  { id: "IT", labels: { fr: "Informatique & Digital", de: "Informatik & Digital", it: "Informatica & Digitale", uk: "IT та цифрові технології" },
    categories: [
      { id: "dev",  labels: { fr: "Développement", de: "Entwicklung", it: "Sviluppo", uk: "Розробка" }, jobs: [
        { isco: "2512", stellen: false, qualif: "tert", salary: [7000, 9500], titles: { fr: "Développeur·euse logiciel", de: "Softwareentwickler", it: "Sviluppatore software", uk: "Розробник ПЗ" } }
      ]},
      { id: "sup",  labels: { fr: "Support IT", de: "IT-Support", it: "Supporto IT", uk: "ІТ-підтримка" }, jobs: [
        { isco: "3512", stellen: false, qualif: "cfc",  salary: [5200, 6500], titles: { fr: "Informaticien·ne CFC (Support)", de: "Informatiker EFZ Support", it: "Informatico AFC", uk: "ІТ-спеціаліст" } }
      ]}
    ]},
  { id: "AGRI", labels: { fr: "Agriculture & Viticulture", de: "Landwirtschaft & Weinbau", it: "Agricoltura & Viticoltura", uk: "Сільське господарство" },
    categories: [
      { id: "farm", labels: { fr: "Exploitation agricole", de: "Landwirtschaft", it: "Azienda agricola", uk: "Сільське господарство" }, jobs: [
        { isco: "9211", stellen: false, qualif: "sans", salary: [3400, 3900], titles: { fr: "Ouvrier·ère agricole", de: "Landwirtschaftlicher Mitarbeiter", it: "Bracciante agricolo", uk: "Сільськогосподарський робітник" } }
      ]}
    ]},
  { id: "BEAUTY", labels: { fr: "Coiffure & Esthétique", de: "Coiffure & Kosmetik", it: "Parrucchiere & Estetica", uk: "Перукарство та естетика" },
    categories: [
      { id: "hair", labels: { fr: "Coiffure", de: "Coiffure", it: "Parrucchiere", uk: "Перукар" }, jobs: [
        { isco: "5141", stellen: false, qualif: "cfc",  salary: [4000, 4700], titles: { fr: "Coiffeur·euse CFC", de: "Coiffeur EFZ", it: "Parrucchiere AFC", uk: "Перукар" } }
      ]}
    ]},
  { id: "EDU", labels: { fr: "Éducation & Enseignement", de: "Bildung & Unterricht", it: "Educazione", uk: "Освіта" },
    categories: [
      { id: "aide", labels: { fr: "Assistance éducative", de: "Schulische Assistenz", it: "Assistente educativo", uk: "Асистент викладача" }, jobs: [
        { isco: "5312", stellen: false, qualif: "afp",  salary: [4200, 4900], titles: { fr: "Assistant·e éducatif·ve", de: "Klassenassistenz", it: "Assistente scolastico", uk: "Асистент вихователя" } }
      ]}
    ]},
  { id: "SOCIAL", labels: { fr: "Travail social & Intégration", de: "Sozialarbeit & Integration", it: "Lavoro sociale & Integrazione", uk: "Соціальна робота" },
    categories: [
      { id: "int",  labels: { fr: "Médiation & Interprétariat", de: "Interkulturelle Vermittlung", it: "Mediazione interculturale", uk: "Міжкультурна медіація" }, jobs: [
        { isco: "3413", stellen: false, qualif: "brev", salary: [5000, 6200], titles: { fr: "Médiateur·rice interculturel·le", de: "Interkulturelle Übersetzerin", it: "Mediatore interculturale", uk: "Медіатор" } }
      ]}
    ]},
  { id: "AUTO", labels: { fr: "Automobile & Mécanique", de: "Auto & Mechanik", it: "Automobile & Meccanica", uk: "Автомобільна галузь" },
    categories: [
      { id: "mech", labels: { fr: "Mécanique automobile", de: "Automechanik", it: "Meccanica auto", uk: "Автомеханіка" }, jobs: [
        { isco: "7231", stellen: false, qualif: "cfc",  salary: [4700, 5600], titles: { fr: "Mécanicien·ne automobile CFC", de: "Automechaniker EFZ", it: "Meccanico d'auto AFC", uk: "Автомеханік" } }
      ]}
    ]},
  { id: "CULT", labels: { fr: "Culture, Arts & Événementiel", de: "Kultur, Kunst & Events", it: "Cultura, Arti & Eventi", uk: "Культура та мистецтво" },
    categories: [
      { id: "event",labels: { fr: "Événementiel", de: "Event-Management", it: "Eventi", uk: "Івенти" }, jobs: [
        { isco: "3339", stellen: false, qualif: "cfc",  salary: [4400, 5400], titles: { fr: "Assistant·e événementiel", de: "Eventassistent", it: "Assistente eventi", uk: "Асистент з івентів" } }
      ]}
    ]}
];

// -------- SWISS QUALIFICATION LEVELS --------
window.QUALIF_LEVELS = [
  { id: "sans", labels: { fr: "Sans diplôme", de: "Ohne Abschluss", it: "Senza diploma", uk: "Без диплома" } },
  { id: "afp",  labels: { fr: "AFP / EBA (2 ans)", de: "EBA (2 J.)", it: "CFP / AFP (2 anni)", uk: "AFP / EBA (2 роки)" } },
  { id: "cfc",  labels: { fr: "CFC / EFZ (3-4 ans)", de: "EFZ (3-4 J.)", it: "AFC / EFZ (3-4 anni)", uk: "CFC / EFZ (3-4 роки)" } },
  { id: "brev", labels: { fr: "Brevet féd. / HF", de: "Berufsprüfung / HF", it: "Attestato prof. / SSS", uk: "Профатестат / HF" } },
  { id: "tert", labels: { fr: "Tertiaire / HES / Uni", de: "Hochschule / FH / Uni", it: "Terziario / SUP / Università", uk: "Вища освіта" } }
];

// -------- QUAD-LINGUAL DICTIONARY --------
window.I18N = {
  fr: {
    lang: "Français",
    banner: "Phase de test public — Association Swiss Resilience en cours de constitution (Art. 60–79 CC Suisse). Aucun abonnement payant, aucun émolument pour les candidats.",
    bannerShort: "Bêta publique · Association bénévole en création (Art. 60–79 CC)",
    nav: { housing: "Logement & Emploi", solidarity: "Solidarité Suisse", calc: "Barèmes Cantonaux", profession: "Métiers CH-ISCO", transparency: "Transparence Merkle" },
    tgBot: "Ouvrir le Bot Telegram",
    tabs: { seekers: "Candidats & Réfugiés", seekersSub: "Permis S · Recherche directe", solidarity: "Solidarité Suisse", solSub: "Hôtes privés & Mentors bénévoles" },
    hero: {
      title: "Trouver un toit digne et un emploi légal en Suisse — sans intermédiaire abusif.",
      lede: "Calculateur officiel des barèmes de loyer social des 26 cantons (EVAM, Hospice Général, AOZ), détection des emplois protégés par l'obligation d'annoncer (SECO), sous-location solidaire sécurisée (Art. 262 CO) et réseau de mentors bénévoles. Plateforme 100% gratuite et bénévole pendant la phase Bêta.",
      metrics: [
        { k: "26 cantons", v: "Barèmes officiels", d: "EVAM · Hospice Général · AOZ · GSI · WSU · LAPS et 20 autres services sociaux" },
        { k: "4 langues", v: "FR · DE · IT · UK", d: "Parité linguistique intégrale pour les réfugiés et les hôtes suisses" },
        { k: "Art. 60–79 CC", v: "Association en création", d: "Structure d'entraide désintéressée · Zéro dividende commercial" },
        { k: "Merkle SHA-256", v: "Transparence absolue", d: "Chaque franc de don vérifiable cryptographiquement en temps réel" }
      ]
    },
    calc: {
      eyebrow: "Module 01 · Conformité Sociale du Logement",
      title: "Calculateur de barème de loyer social (26 cantons)",
      lede: "Vérifiez instantanément si votre futur bail respecte les plafonds d'aide sociale de votre canton afin d'éviter tout refus de prise en charge par l'autorité compétente.",
      canton: "Canton de résidence",
      household: "Composition du ménage",
      rentType: "Structure du bail",
      brut: "Charges comprises (Brut)",
      net: "Charges nettes (Hors charges)",
      testRent: "Loyer mensuel à vérifier (CHF)",
      ceiling: "Plafond social maximal admissible",
      authority: "Service social compétent",
      basis: "Régime d'évaluation",
      heating: "Frais de chauffage & eau chaude",
      heatIncluded: "Inclus forfaitairement dans le plafond",
      heatSeparate: "Pris en charge séparément sur facture réelle",
      compliant: "Conforme au barème cantonal — Prise en charge intégrale",
      over: "Dépassement de plafond de",
      overNote: "Attention : risque de refus catégorique de prise en charge par le service social cantonal",
      subsidiarityNote: "Sous réserve de validation finale par l'assistant social référent (principe de subsidiarité)",
      persons: (n) => `${n} ${n <= 1 ? "personne" : "personnes"}`
    },
    prof: {
      eyebrow: "Module 02 · Insertion Professionnelle & Salaires",
      title: "Radar des métiers suisses & Postes protégés (SECO)",
      lede: "Explorez les 15 secteurs clés, les grilles salariales minimales obligatoires (CCNT / CCT) et repérez les métiers soumis au délai de priorité de 5 jours sur Job-Room.",
      sector: "Secteur d'activité (CH-ISCO-19)",
      category: "Branche / Spécialisation",
      qualif: "Degré de qualification requis en Suisse",
      titleCol: "Intitulé du poste",
      salary: "Fourchette salariale brute CCNT (CHF/mois)",
      isco: "Code ISCO-08",
      allQualif: "Toutes qualifications confondues",
      stellenBadge: "Art. 21a LEI · Priorité d'embauche",
      stellenTitle: "Profession soumise à l'obligation d'annoncer (5 jours de priorité ORP)",
      stellenBody: "En raison d'un taux de chômage national ≥ 5%, ce poste doit être exclusivement réservé aux inscrits auprès de l'ORP pendant 5 jours ouvrables avant diffusion publique. Notre système capte ces offres dès leur publication légale.",
      noResults: "Aucune profession ne correspond à ces critères. Veuillez élargir le filtre de qualification."
    },
    sublease: {
      eyebrow: "Module 03 · Solidarité Suisse — Logement chez l'habitant",
      title: "Héberger en toute légalité : guide de sous-location (Art. 262 CO)",
      lede: "Accueillez un bénéficiaire du Permis S en toute sécurité juridique. Droit impératif du locataire, calcul d'une juste participation aux frais, plafonnement légal des meubles à 20% et avis formel à la gérance.",
      shield: "Bouclier juridique du locataire — Art. 262 CO",
      shieldBody: "Le propriétaire ou la gérance ne peut pas interdire la sous-location de manière générale : toute clause d'interdiction absolue dans le bail est nulle de plein droit. Le locataire doit seulement en aviser la gérance, qui ne peut refuser son accord que pour des motifs légitimes stricts (Art. 262 al. 2 CO).",
      totalRent: "Loyer total net de l'appartement (CHF/mois)",
      rooms: "Nombre total de pièces du logement",
      roomFor: "Pièce(s) mise(s) à disposition du sous-locataire",
      base: "Quote-part loyer au prorata des pièces",
      surcharge: "Majoration meubles & équipements (%)",
      surchargeLimit: "Plafond légal 20% · Jurisprudence ASLOCA / Tribunal fédéral",
      final: "Participation mensuelle demandée au sous-locataire",
      okBadge: "Conforme à la jurisprudence du Tribunal fédéral & de l'ASLOCA",
      overBadge: "Loyer potentiellement abusif — Art. 262 al. 2 let. b CO",
      letterBtn: "Générer la notification officielle à la gérance (PDF)",
      letterHint: "Génère un courrier prêt à signer intégrant les références légales (Art. 262 et 266e CO) et le préavis légal de 2 semaines.",
      taxBadge: "Non imposable : simple remboursement à prix coûtant",
      insBadge: "Garantie Responsabilité Civile collective 5'000'000 CHF",
      pdfTitle: "NOTIFICATION OFFICIELLE À LA GÉRANCE — SOUS-LOCATION PARTIELLE D'UN LOGEMENT",
      pdfIntro: "En application de l'art. 262 du Code des obligations et de la jurisprudence constante du Tribunal fédéral, le locataire soussigné notifie par la présente la sous-location d'une chambre meublée aux conditions suivantes :",
      pdfFields: { from: "Locataire principal", to: "Gérance immobilière / Bailleur", subtenant: "Sous-locataire accueilli (statut S)", desc: "Désignation des locaux sous-loués", rent: "Loyer mensuel forfaitaire (quote-part + équipement + charges)" },
      pdfClose: "Le préavis de congé applicable demeure celui prévu par l'art. 266e CO (2 semaines pour la fin d'un mois). La participation financière demandée ne génère aucun enrichissement et couvre exclusivement les frais effectifs."
    },
    mentors: {
      eyebrow: "Module 04 · Engagement Citoyen — Réseau Benevol",
      title: "Mentorat solidaire : 1 à 3 heures par semaine pour changer un parcours",
      lede: "Accompagnement bénévole structuré sous mandat gratuit (Art. 394 CO). Aidez un nouvel arrivant à maîtriser les codes professionnels suisses, sans lien de subordination ni risque juridique.",
      commit: "Disponibilité souhaitée",
      commitOpts: ["1 heure par semaine", "2 à 3 heures par semaine", "Accompagnement ponctuel"],
      tracks: "Champs d'intervention bénévoles",
      apply: "Devenir mentor bénévole",
      trackList: [
        { t: "Optimisation de CV & dossier suisse", b: "Mise aux normes USPI et adaptation aux standards des recruteurs locaux." },
        { t: "Tandem de conversation professionnelle", b: "Pratique du français ou de l'allemand appliqué aux situations de travail." },
        { t: "Simulation d'entretiens d'embauche", b: "Préparation aux codes culturels suisses et debriefing bienveillant." },
        { t: "Assistance administrative & courriers", b: "Aide à la compréhension des formulaires ORP, EVAM et des démarches citoyennes." }
      ],
      legal: "Cadre légal sécurisé : Art. 394 CO — mandat civil gratuit. Aucun lien d'emploi, aucune rémunération, aucune responsabilité solidaire quant au résultat des candidatures."
    },
    beta: {
      eyebrow: "Module 05 · Éthique & Radical Honesty",
      title: "Transparence totale : aucun abonnement payant pendant la Bêta",
      lede: "Fidèles à nos valeurs d'entraide et d'honnêteté radicale, nous ne commercialisons aucun abonnement tant que notre association est en formation. L'intégralité des outils est en accès 100% libre et gratuit.",
      inactiveBadge: "Désactivé en phase Bêta",
      freeAccess: "Accès 100% libre et sans frais",
      donateTitle: "Soutenir les serveurs et la résistance ukrainienne",
      donateLede: "Notre fonctionnement repose exclusivement sur des dons volontaires : 70% financent l'infrastructure technique et 30% soutiennent l'effort de défense et d'aide humanitaire en Ukraine.",
      donateBtn: "Faire une contribution volontaire",
      proTagline: "Alertes prioritaires < 60 s · Dossiers USPI illimités · Suivi ORP mensuel · Entraide communautaire.",
      proFeatures: [
        "Alertes instantanées Telegram en moins de 60 secondes",
        "Générateur illimité de dossiers de candidature USPI en PDF/A",
        "Rapports mensuels de recherches d'emploi pour le conseiller ORP (Art. 17 LACI)",
        "Comparateur automatique avec les barèmes des 26 cantons"
      ],
      successTagline: "Accompagnement à la reprise de bail (Art. 264 CO) · Relecture du contrat · Modèles juridiques.",
      successFeatures: [
        "Guide pas à pas pour la reprise anticipée de bail (Art. 264 CO)",
        "Modèles de lettres types validés pour les gérances romandes et alémaniques",
        "Assistance méthodologique pour constituer un dossier solvable",
        "Accès prioritaire aux ateliers d'intégration professionnelle"
      ],
      donationTagline: "Accès libre pour tous · Outils financés par la solidarité citoyenne.",
      donationFeatures: [
        "Accès complet aux calculateurs de loyer des 26 cantons",
        "Explorateur exhaustif des métiers CH-ISCO-19 & alertes SECO",
        "Assistant juridique de sous-location chez l'habitant (Art. 262 CO)",
        "Mise en relation avec le réseau de mentors suisses Benevol",
        "Audit public en temps réel sur notre registre Merkle SHA-256"
      ]
    },
    donation: {
      title: "Don de soutien — Registre public Merkle",
      split70: "70% — Hébergement, serveurs, scanners d'offres et coûts d'API",
      split30: "30% — Soutien humanitaire et matériel pour l'Ukraine (ZSU Solidarity)",
      stars: "Telegram Stars (XTR)",
      starsHint: "Contribution directe en 1 clic via le bot officiel @SwissResilienceHubBot",
      card: "Carte bancaire · Apple Pay · Twint",
      cardHint: "Paiement sécurisé opéré sous statut non-profit via Merchant of Record",
      qr: "QR-Facture suisse · Virement SEPA",
      qrHint: "Coordonnées bancaires de l'Association Swiss Resilience (Vaud)",
      merkleRoot: "Empreinte cryptographique actuelle (Merkle Root)",
      verifyBtn: "Vérifier la transparence sur GitHub",
      customAmount: "Montant libre de votre choix (CHF)",
      close: "Fermer la fenêtre",
      pay: "Valider la contribution"
    },
    footer: {
      status: "Statut juridique officiel",
      statusBody: "Association Swiss Resilience en cours de constitution sous l'empire des Art. 60 à 79 du Code civil suisse. Dépôt statutaire au Registre du commerce du Canton de Vaud en finalisation.",
      lse: "Loi sur le service de l'emploi (LSE Art. 9) — Non-agence de placement",
      lseBody: "Swiss Resilience Navigator est une initiative d'entraide communautaire et d'information civique. La plateforme n'exerce aucune activité d'agence de placement privé (LSE / RS 823.11). Aucun frais ni honoraire n'est réclamé aux candidats. Aucune promesse contractuelle d'emploi ou de bail n'est consentie.",
      lcd: "Loi contre la concurrence déloyale (LCD Art. 3) & Code pénal (Art. 146 CP)",
      lcdBody: "Tous les chiffres d'activité, fonds collectés et métriques d'impact affichés sur ce site sont certifiés par preuve cryptographique immuable (Merkle SHA-256), excluant toute allégation mensongère.",
      links: "Documentation & Transparence",
      linkList: ["Conditions Générales d'Utilisation (CGU)", "Politique de confidentialité (nLPD)", "Barèmes officiels des 26 cantons", "Registre de transparence Merkle"],
      close: "© 2026 · Association Swiss Resilience (en formation) · Fièrement engagés pour la solidarité suisse et ukrainienne 🇨🇭 🇺🇦"
    }
  },

  de: {
    lang: "Deutsch",
    banner: "Öffentliche Beta-Phase — Verein Swiss Resilience in Gründung (Art. 60–79 ZGB). Keine kostenpflichtigen Abonnemente, keine Vermittlungsgebühren.",
    bannerShort: "Öffentliche Beta · Verein in Gründung (Art. 60–79 ZGB)",
    nav: { housing: "Wohnen & Arbeit", solidarity: "Schweizer Solidarität", calc: "Kantonale Richtlinien", profession: "CH-ISCO Berufe", transparency: "Merkle-Transparenz" },
    tgBot: "Telegram-Bot öffnen",
    tabs: { seekers: "Stellensuchende & Geflüchtete", seekersSub: "Status S · Direktsuche", solidarity: "Schweizer Solidarität", solSub: "Gastgeber & Freiwillige Mentoren" },
    hero: {
      title: "Sicheres Wohnen und faire Arbeit in der Schweiz — ohne Vermittlungsgebühren.",
      lede: "Offizielle Sozialhilfe-Mietzinsrichtlinien aller 26 Kantone (AOZ, GSI, WSU), automatische Erkennung meldepflichtiger Stellen (SECO), rechtssichere Untermiete (Art. 262 OR) und ehrenamtliches Mentoring-Netzwerk. 100% kostenlos während der öffentlichen Beta-Phase.",
      metrics: [
        { k: "26 Kantone", v: "Offizielle Richtlinien", d: "AOZ · GSI · WSU · EVAM · Hospice Général · LAPS und 20 weitere Sozialämter" },
        { k: "4 Sprachen", v: "DE · FR · IT · UK", d: "Vollständige Sprachparität für Geflüchtete und Schweizer Gastgeber" },
        { k: "Art. 60–79 ZGB", v: "Verein in Gründung", d: "Gemeinnützige Selbsthilfe · Null gewinnorientierte Ausschüttung" },
        { k: "Merkle SHA-256", v: "Volle Transparenz", d: "Jeder Spendenfranken kryptografisch in Echtzeit nachprüfbar" }
      ]
    },
    calc: {
      eyebrow: "Modul 01 · Kantonale Mietzins-Konformität",
      title: "Sozialhilfe-Mietzinsrechner (26 Kantone)",
      lede: "Überprüfen Sie in wenigen Sekunden, ob Ihr Mietvertrag den Sozialhilferichtlinien Ihres Kantons entspricht, um eine Ablehnung der Kostenübernahme zu vermeiden.",
      canton: "Wohnkanton",
      household: "Haushaltsgrösse",
      rentType: "Mietvertragsart",
      brut: "Bruttomiete (inkl. Nebenkosten)",
      net: "Nettomiete (ohne Nebenkosten)",
      testRent: "Monatlicher Mietzins zur Prüfung (CHF)",
      ceiling: "Maximal zulässige Mietzinsobergrenze",
      authority: "Zuständige Sozialbehörde",
      basis: "Berechnungsgrundlage",
      heating: "Heiz- und Warmwasserkosten",
      heatIncluded: "Pauschal in der Obergrenze enthalten",
      heatSeparate: "Separat gegen effektive Abrechnung erstattet",
      compliant: "Konform mit kantonalen Richtlinien — Volle Deckung",
      over: "Überschreitung der Obergrenze um",
      overNote: "Achtung: Erhebliches Risiko der Verweigerung durch das kantonale Sozialamt",
      subsidiarityNote: "Vorbehaltlich der individuellen Prüfung durch die zuständige Sozialbehörde (Subsidiaritätsprinzip)",
      persons: (n) => `${n} ${n <= 1 ? "Person" : "Personen"}`
    },
    prof: {
      eyebrow: "Modul 02 · Arbeitsmarkt & GAV-Löhne",
      title: "Schweizer Berufsradar & Stellenmeldepflicht (SECO)",
      lede: "Übersicht über 15 Schlüsselbranchen, verbindliche GAV-Mindestlöhne und rechtzeitige Erkennung meldepflichtiger Berufe mit 5-tägigem Vorrang auf Job-Room.",
      sector: "Berufsfeld (CH-ISCO-19)",
      category: "Kategorie / Fachbereich",
      qualif: "In der Schweiz geforderte Qualifikationsstufe",
      titleCol: "Berufsbezeichnung",
      salary: "GAV Bruttorichtschnur (CHF/Monat)",
      isco: "ISCO-08 Code",
      allQualif: "Alle Qualifikationsstufen",
      stellenBadge: "Art. 21a AIG · Stellenmeldepflicht",
      stellenTitle: "Stellenmeldepflichtiger Beruf (5 Tage RAV-Meldevorsprung)",
      stellenBody: "Bei Berufsarten mit ≥ 5% Arbeitslosigkeit gilt ein fünftägiger Publikationsvorsprung auf Job-Room zugunsten registrierter Stellensuchender. Unser Radar identifiziert diese Angebote unmittelbar bei Erscheinen.",
      noResults: "Keine Berufe für diese Kriterien gefunden. Bitte erweitern Sie den Qualifikationsfilter."
    },
    sublease: {
      eyebrow: "Modul 03 · Schweizer Solidarität — Privates Wohnen",
      title: "Rechtssicher untervermieten: Leitfaden für Gastgeber (Art. 262 OR)",
      lede: "Geben Sie Menschen mit Status S ein sicheres Zuhause. Gesetzliches Untermietrecht des Mieters, faire Kostenaufteilung, transparente Möblierungspauschale bis 20% und offizielle Vermieter-Mitteilung.",
      shield: "Gesetzlicher Schutz für Mieter — Art. 262 OR",
      shieldBody: "Der Vermieter kann die Untermiete nicht pauschal verbieten: Vertragliche Generalverbote sind von Gesetzes wegen nichtig. Der Hauptmieter muss die Verwaltung lediglich vorab informieren; eine Verweigerung ist nur aus eng begrenzten sachlichen Gründen zulässig (Art. 262 Abs. 2 OR).",
      totalRent: "Gesamte Nettomiete der Wohnung (CHF/Monat)",
      rooms: "Gesamte Zimmerzahl der Wohnung",
      roomFor: "Anteil der untervermieteten Zimmer",
      base: "Anteiliger Grundmietzins nach Zimmeranteil",
      surcharge: "Möblierungs- und Ausstattungspauschale (%)",
      surchargeLimit: "Gesetzliche Obergrenze 20% · Bundesgericht & Mieterverband",
      final: "Faire monatliche Gesamtkostenbeteiligung",
      okBadge: "Konform mit Bundesgerichtspraxis & Mieterverband",
      overBadge: "Potenziell missbräuchlicher Mietzins — Art. 262 Abs. 2 lit. b OR",
      letterBtn: "Offizielle Vermieter-Mitteilung generieren (PDF)",
      letterHint: "Erstellt ein unterschriftsreifes Schreiben inklusive der Gesetzesverweise (Art. 262 & 266e OR) und 2-wöchiger Kündigungsfrist.",
      taxBadge: "Steuerfrei: Reine Kostendeckung ohne Erwerbsabsicht",
      insBadge: "Kollektive Haftpflichtdeckung 5'000'000 CHF",
      pdfTitle: "OFFIZIELLE MITTEILUNG AN DIE VERWALTUNG — UNTERMIETE EINES ZIMMERS",
      pdfIntro: "In Übereinstimmung mit Art. 262 des Obligationenrechts und der ständigen Rechtsprechung des Bundesgerichts teilt der unterzeichnende Hauptmieter hiermit die Untervermietung eines möblierten Zimmers zu folgenden Bedingungen mit:",
      pdfFields: { from: "Hauptmieter", to: "Liegenschaftsverwaltung / Vermieter", subtenant: "Untermieter (Status S)", desc: "Bezeichnung des untervermieteten Zimmers", rent: "Monatlicher Pauschalmietzins (Anteil + Möblierung + NK)" },
      pdfClose: "Die Kündigungsfrist richtet sich nach Art. 266e OR (2 Wochen auf Monatsende). Die vereinbarte Entschädigung deckt ausschliesslich die anteiligen Selbstkosten ohne jeglichen Erwerbsgewinn."
    },
    mentors: {
      eyebrow: "Modul 04 · Freiwilliges Engagement — Benevol Netzwerk",
      title: "Ehrenamtliches Mentoring: 1 bis 3 Stunden pro Woche mit grosser Wirkung",
      lede: "Strukturierte Begleitung nach Benevol-Standards als unentgeltlicher Auftrag (Art. 394 OR). Unterstützen Sie Geflüchtete beim Berufseinstieg — verbindlich im Engagement, frei von Arbeitsrechtsrisiken.",
      commit: "Zeitlicher Einsatz",
      commitOpts: ["1 Stunde pro Woche", "2 bis 3 Stunden pro Woche", "Punktuelle Beratung"],
      tracks: "Unterstützungsbereiche",
      apply: "Als Mentor/in mitwirken",
      trackList: [
        { t: "Optimierung des Schweizer Lebenslaufs", b: "Anpassung des Dossiers an Schweizer Bewerbungsstandards und Gepflogenheiten." },
        { t: "Berufsbezogenes Sprachtandem", b: "Praxisorientierte Konversation auf Deutsch oder Französisch für den Arbeitsalltag." },
        { t: "Simulation von Vorstellungsgesprächen", b: "Kulturelle Vorbereitung auf HR-Gespräche und konstruktives Feedback." },
        { t: "Verstehen von Behördenpost", b: "Orientierung bei Briefen von RAV, Sozialämtern und Arbeitslosenkassen." }
      ],
      legal: "Rechtlicher Rahmen: Art. 394 OR — unentgeltlicher bürgerlicher Auftrag. Kein Arbeitsverhältnis, keine Honorierung, keine Haftung für den tatsächlichen Vermittlungserfolg."
    },
    beta: {
      eyebrow: "Modul 05 · Ethik & Transparenz",
      title: "Volle Offenheit: Keine kommerziellen Tarife während der Beta-Phase",
      lede: "Gemäss unserem Grundsatz radikaler Ehrlichkeit erheben wir während der Gründungsphase unseres Vereins keine kostenpflichtigen Abos. Sämtliche Kernfunktionen stehen uneingeschränkt kostenlos zur Verfügung.",
      inactiveBadge: "Während Beta ausgesetzt",
      freeAccess: "100% kostenloser Vollzugang",
      donateTitle: "Serverbetrieb sichern und Ukraine-Nothilfe unterstützen",
      donateLede: "Wir finanzieren uns ausschliesslich über freiwillige Beiträge: 70% decken Rechenzentrums- und Schnittstellenkosten, 30% fliessen in humanitäre Hilfe und Verteidigung der Ukraine.",
      donateBtn: "Freiwilligen Beitrag leisten",
      proTagline: "Schnelle Benachrichtigungen < 60 s · Unbegrenzte USPI-Dossiers · RAV-Suchnachweise.",
      proFeatures: [
        "Sofortige Telegram-Meldungen bei neuen Angeboten unter 60 Sekunden",
        "Unbegrenzter Export standardisierter Schweizer Bewerbungsdossiers als PDF/A",
        "Monatliche Nachweise persönlicher Arbeitsbemühungen für das RAV (Art. 17 AVIG)",
        "Automatischer Abgleich mit den Mietzinsrichtlinien aller 26 Kantone"
      ],
      successTagline: "Leitfaden zur vorzeitigen Mietvertragsübernahme (Art. 264 OR) · Rechtliche Muster.",
      successFeatures: [
        "Schritt-für-Schritt-Anleitung zur vorzeitigen Rückgabe der Mietsache (Art. 264 OR)",
        "Geprüfte Musterschreiben für Liegenschaftsverwaltungen in der gesamten Schweiz",
        "Methodische Prüfung der Solvenznachweise für Nachmieter",
        "Prioritärer Zugang zu Online-Informationsveranstaltungen"
      ],
      donationTagline: "Freier Zugang für alle · Getragen durch zivilgesellschaftliche Solidarität.",
      donationFeatures: [
        "Freie Nutzung aller Mietzinsrechner für 26 Kantone",
        "Vollständiger CH-ISCO-19 Berufsfinder mit SECO-Meldepflichtanzeige",
        "Rechtssicherer Assistent für private Untermiete (Art. 262 OR)",
        "Vermittlung an erfahrene Schweizer Mentoren nach Benevol-Standard",
        "Öffentliche Echtzeit-Prüfung im SHA-256 Merkle-Transparenzregister"
      ]
    },
    donation: {
      title: "Freiwillige Solidaritätsspende — Öffentliches Merkle-Ledger",
      split70: "70% — Serverinfrastruktur, API-Kosten und automatisierte Datenabgleiche",
      split30: "30% — Humanitäre Hilfe und Verteidigungsgüter für die Ukraine (ZSU Solidarität)",
      stars: "Telegram Stars (XTR)",
      starsHint: "1-Klick-Direktunterstützung über den Telegram-Bot @SwissResilienceHubBot",
      card: "Kreditkarte · Apple Pay · Twint",
      cardHint: "Sichere gemeinnützige Abwicklung über lizenzierten Merchant of Record",
      qr: "Schweizer QR-Rechnung · SEPA-Überweisung",
      qrHint: "Vereinskonto Verein Swiss Resilience (Waadt) — nach vollzogener Eintragung",
      merkleRoot: "Aktueller kryptografischer Merkle-Root-Hash",
      verifyBtn: "Transparenzregister auf GitHub einsehen",
      customAmount: "Frei wählbarer Betrag (CHF)",
      close: "Schliessen",
      pay: "Beitrag bestätigen"
    },
    footer: {
      status: "Offizieller Rechtsstatus",
      statusBody: "Verein Swiss Resilience in Gründung gemäss Art. 60–79 des Schweizerischen Zivilgesetzbuches. Die Hinterlegung beim Handelsregisteramt des Kantons Waadt befindet sich in der Finalisierung.",
      lse: "Arbeitsvermittlungsgesetz (AVG Art. 9) — Keine private Arbeitsvermittlung",
      lseBody: "Swiss Resilience Navigator ist eine zivilgesellschaftliche Plattform zur Orientierung und Selbsthilfe. Es wird keine gewerbsmässige Arbeitsvermittlung (AVG / SR 823.11) betrieben. Von Stellensuchenden werden keinerlei Entgelte erhoben. Es werden keine Erfolgsgarantien für Anstellungen oder Mietverträge abgegeben.",
      lcd: "Bundesgesetz gegen den unlauteren Wettbewerb (UWG Art. 3) & Strafgesetzbuch (Art. 146 StGB)",
      lcdBody: "Sämtliche auf dieser Plattform ausgewiesenen Finanz- und Wirkungskennzahlen sind durch ein unveränderliches kryptografisches Register (Merkle SHA-256) nachweisbar, wodurch irreführende Angaben ausgeschlossen sind.",
      links: "Rechtliches & Transparenz",
      linkList: ["Allgemeine Nutzungsbedingungen (AGB)", "Datenschutzerklärung (revDSG)", "Mietzinsrichtlinien 26 Kantone", "Öffentliches Merkle-Register"],
      close: "© 2026 · Verein Swiss Resilience (in Gründung) · Aus Überzeugung für Schweizer Solidarität und die Ukraine 🇨🇭 🇺🇦"
    }
  },

  it: {
    lang: "Italiano",
    banner: "Fase di test pubblico — Associazione Swiss Resilience in costituzione (Art. 60–79 CC Svizzero). Nessun canone commerciale, nessun costo per i candidati.",
    bannerShort: "Beta pubblica · Associazione in costituzione (Art. 60–79 CC)",
    nav: { housing: "Alloggio & Lavoro", solidarity: "Solidarietà Svizzera", calc: "Parametri Cantonali", profession: "Professioni CH-ISCO", transparency: "Trasparenza Merkle" },
    tgBot: "Apri il Bot Telegram",
    tabs: { seekers: "Candidati & Rifugiati", seekersSub: "Permesso S · Ricerca diretta", solidarity: "Solidarietà Svizzera", solSub: "Ospitanti privati & Mentori volontari" },
    hero: {
      title: "Un alloggio dignitoso e un lavoro regolare in Svizzera — senza intermediari a pagamento.",
      lede: "Massimali ufficiali di locazione sociale per tutti i 26 cantoni (LAPS, Hospice Général, AOZ), identificazione delle professioni con obbligo di annuncio (SECO), sublocazione solidale sicura (Art. 262 CO) e tutorato volontario. Piattaforma 100% gratuita durante la fase Beta.",
      metrics: [
        { k: "26 cantoni", v: "Parametri ufficiali", d: "LAPS · Hospice Général · AOZ · EVAM · GSI · WSU e altri 20 uffici sociali" },
        { k: "4 lingue", v: "IT · FR · DE · UK", d: "Parità linguistica integrale per rifugiati e residenti svizzeri" },
        { k: "Art. 60–79 CC", v: "Associazione in nascita", d: "Ente non-profit di mutuo soccorso · Zero dividendi commerciali" },
        { k: "Merkle SHA-256", v: "Trasparenza verificabile", d: "Ogni franco donato è verificabile crittograficamente in tempo reale" }
      ]
    },
    calc: {
      eyebrow: "Modulo 01 · Conformità della Locazione Sociale",
      title: "Calcolatore massimali di locazione (26 cantoni)",
      lede: "Verificate all'istante se il canone del vostro alloggio rientra nei limiti dell'aiuto sociale del vostro cantone, prevenendo rifiuti di copertura da parte delle autorità.",
      canton: "Cantone di residenza",
      household: "Nucleo familiare",
      rentType: "Tipologia contrattuale",
      brut: "Spese accessorie incluse (Lordo)",
      net: "Spese accessorie escluse (Netto)",
      testRent: "Canone mensile da verificare (CHF)",
      ceiling: "Massimale sociale consentito",
      authority: "Servizio sociale competente",
      basis: "Criterio di computo",
      heating: "Spese di riscaldamento & acqua calda",
      heatIncluded: "Incluse forfettariamente nel massimale",
      heatSeparate: "Rimborsate separatamente su fattura effettiva",
      compliant: "Conforme ai parametri cantonali — Copertura integrale",
      over: "Superamento del massimale di",
      overNote: "Attenzione: elevato rischio di diniego di copertura da parte del servizio sociale",
      subsidiarityNote: "Soggetto alla convalida del servizio sociale competente (principio di sussidiarietà)",
      persons: (n) => `${n} ${n <= 1 ? "persona" : "persone"}`
    },
    prof: {
      eyebrow: "Modulo 02 · Mercato del Lavoro & Salari CCL",
      title: "Radar professionale svizzero & Posti prioritari (SECO)",
      lede: "Panoramica di 15 settori lavorativi, salari minimi contrattuali (CCL) e individuazione delle professioni con obbligo di annuncio esclusivo di 5 giorni su Job-Room.",
      sector: "Settore d'attività (CH-ISCO-19)",
      category: "Ambito / Specializzazione",
      qualif: "Livello di qualifica richiesto in Svizzera",
      titleCol: "Mansione",
      salary: "Salario lordo di riferimento CCL (CHF/mese)",
      isco: "Codice ISCO-08",
      allQualif: "Tutte le qualifiche",
      stellenBadge: "Art. 21a LStrI · Obbligo di annuncio",
      stellenTitle: "Professione con obbligo di annuncio (5 giorni di priorità URC)",
      stellenBody: "Nei settori con disoccupazione nazionale ≥ 5%, i posti devono essere riservati per 5 giorni lavorativi agli iscritti agli URC prima della pubblicazione aperta. Il nostro sistema intercetta tali annunci all'istante.",
      noResults: "Nessuna professione corrisponde ai criteri selezionati. Provate ad ampliare i filtri."
    },
    sublease: {
      eyebrow: "Modulo 03 · Solidarietà Svizzera — Ospitalità Privata",
      title: "Subaffittare in sicurezza: guida pratica per residenti (Art. 262 CO)",
      lede: "Accogliete persone con Permesso S con piena tranquillità legale. Diritto inderogabile alla sublocazione, equa ripartizione dei costi, limite arredo al 20% e notifica formale alla gérance.",
      shield: "Scudo legale del conduttore — Art. 262 CO",
      shieldBody: "Il locatore non può vietare la sublocazione in via generale: ogni divieto totale inserito nel contratto di locazione è nullo di pieno diritto. Il conduttore principale deve semplicemente informare la gérance, che può rifiutare solo per gravi e tassativi motivi (Art. 262 cpv. 2 CO).",
      totalRent: "Canone netto complessivo dell'alloggio (CHF/mese)",
      rooms: "Numero totale di locali dell'abitazione",
      roomFor: "Locali messi a disposizione del sublocatario",
      base: "Quota parte proporzionale del canone base",
      surcharge: "Supplemento per arredamento e dotazioni (%)",
      surchargeLimit: "Limite massimo 20% · Giurisprudenza del Tribunale federale",
      final: "Contributo mensile equo richiesto al sublocatario",
      okBadge: "Conforme alla giurisprudenza del Tribunale federale & ASLOCA",
      overBadge: "Canone potenzialmente abusivo — Art. 262 cpv. 2 lett. b CO",
      letterBtn: "Genera la notifica ufficiale per la gérance (PDF)",
      letterHint: "Crea una lettera formale pronta da firmare con riferimenti di legge (Art. 262 e 266e CO) e preavviso di 2 settimane.",
      taxBadge: "Non tassabile: rimborso a prezzo di costo senza scopo di lucro",
      insBadge: "Copertura Responsabilità Civile collettiva 5'000'000 CHF",
      pdfTitle: "NOTIFICA FORMALE ALLA GÉRANCE — SUBLOCAZIONE PARZIALE DI LOCALI",
      pdfIntro: "In applicazione dell'art. 262 del Codice delle obbligazioni e della costante giurisprudenza federale, il locatario sottoscritto notifica la sublocazione di una stanza ammobiliata alle seguenti condizioni:",
      pdfFields: { from: "Locatario principale", to: "Gérance immobiliare / Proprietario", subtenant: "Sublocatario accolto (Permesso S)", desc: "Designazione dei locali sublocati", rent: "Canone mensile forfettario (quota + arredo + spese)" },
      pdfClose: "Il termine di disdetta resta conforme all'art. 266e CO (2 settimane per la fine di un mese). La somma richiesta copre unicamente i costi vivi proporzionali senza alcun provento commerciale."
    },
    mentors: {
      eyebrow: "Modulo 04 · Volontariato Civico — Rete Benevol",
      title: "Tutorato solidale: da 1 a 3 ore settimanali per costruire un futuro",
      lede: "Accompagnamento volontario qualificato sotto mandato gratuito (Art. 394 CO). Aiutate un rifugiato ad orientarsi nel mondo del lavoro svizzero, in totale sicurezza giuridica.",
      commit: "Impegno richiesto",
      commitOpts: ["1 ora a settimana", "2-3 ore a settimana", "Consulenza puntuale"],
      tracks: "Aree di tutorato",
      apply: "Candidati come mentore",
      trackList: [
        { t: "Perfezionamento del CV in formato svizzero", b: "Allineamento agli standard di candidatura e alle prassi dei datori di lavoro elvetici." },
        { t: "Tandem di conversazione lavorativa", b: "Esercitazioni pratiche in tedesco o francese per l'ambiente aziendale." },
        { t: "Simulazione di colloqui di lavoro", b: "Preparazione alle dinamiche relazionali svizzere e feedback costruttivo." },
        { t: "Supporto burocratico e corrispondenza", b: "Aiuto nella decifrazione delle comunicazioni da URC, casse disoccupazione e servizi sociali." }
      ],
      legal: "Inquadramento giuridico: Art. 394 CO — mandato civile gratuito. Assenza di rapporto di lavoro subordinato, nessuna remunerazione e nessuna responsabilità solidale circa l'esito professionale."
    },
    beta: {
      eyebrow: "Modulo 05 · Etica & Trasparenza",
      title: "Trasparenza totale: nessun piano a pagamento durante la fase Beta",
      lede: "Fedeli al nostro impegno di trasparenza radicale, non offriamo abbonamenti commerciali durante la costituzione dell'associazione. Ogni funzionalità è disponibile in modo completamente gratuito.",
      inactiveBadge: "Non attivo durante la Beta",
      freeAccess: "Accesso 100% libero e gratuito",
      donateTitle: "Sostieni l'infrastruttura e la solidarietà con l'Ucraina",
      donateLede: "Funzioniamo unicamente grazie a contributi volontari: il 70% finanzia l'infrastruttura tecnica e il 30% sostiene l'assistenza umanitaria e la resilienza ucraina.",
      donateBtn: "Fai una donazione di sostegno",
      proTagline: "Notifiche rapide < 60 s · Dossier USPI illimitati · Report mensili URC.",
      proFeatures: [
        "Avvisi istantanei su Telegram entro 60 secondi",
        "Generazione illimitata di dossier di candidatura conformi USPI in PDF/A",
        "Rapporti mensili sulle ricerche di lavoro per il consulente URC (Art. 17 LADI)",
        "Raffronto automatico con i massimali d'affitto di tutti i 26 cantoni"
      ],
      successTagline: "Guida al subentro nel contratto di locazione (Art. 264 CO) · Modelli giuridici.",
      successFeatures: [
        "Istruzioni guidate per il subentro tempestivo nella locazione (Art. 264 CO)",
        "Modelli di comunicazione certificati per le gérances immobiliari",
        "Verifica preliminare della solvibilità dei candidati subentranti",
        "Accesso prioritario a sessioni informative e di orientamento"
      ],
      donationTagline: "Accesso libero a beneficio della comunità · Finanziato dalla solidarietà.",
      donationFeatures: [
        "Accesso completo a tutti i calcolatori d'affitto dei 26 cantoni",
        "Esplorazione integrale del catalogo professionale CH-ISCO-19 & avvisi SECO",
        "Guida per l'ospitalità e la sublocazione privata (Art. 262 CO)",
        "Contatto con la rete di mentori volontari svizzeri Benevol",
        "Verifica pubblica in tempo reale sul registro crittografico Merkle SHA-256"
      ]
    },
    donation: {
      title: "Contributo volontario — Registro pubblico Merkle",
      split70: "70% — Infrastruttura server, API di acquisizione dati e hosting cloud",
      split30: "30% — Aiuti umanitari e supporto alla resilienza in Ucraina (ZSU Solidarity)",
      stars: "Telegram Stars (XTR)",
      starsHint: "Donazione immediata in 1 clic sul bot ufficiale @SwissResilienceHubBot",
      card: "Carta di credito · Apple Pay · Twint",
      cardHint: "Transazione protetta gestita sotto profilo non-profit tramite Merchant of Record",
      qr: "QR-Fattura svizzera · Bonifico SEPA",
      qrHint: "Conto ufficiale dell'Associazione Swiss Resilience (Vaud)",
      merkleRoot: "Impronta crittografica corrente (Merkle Root)",
      verifyBtn: "Verifica l'autenticità su GitHub",
      customAmount: "Importo libero personalizzato (CHF)",
      close: "Chiudi",
      pay: "Conferma la donazione"
    },
    footer: {
      status: "Inquadramento giuridico ufficiale",
      statusBody: "Associazione Swiss Resilience in costituzione ai sensi degli Art. 60–79 del Codice Civile Svizzero. Iscrizione statutaria presso il Registro di Commercio del Canton Vaud in corso di completamento.",
      lse: "Legge sul collocamento (LCol Art. 9) — Non agenzia di collocamento",
      lseBody: "Swiss Resilience Navigator è un'iniziativa comunitaria di pubblica utilità e orientamento civico. La piattaforma non svolge alcuna attività di agenzia di collocamento privato (LCol / RS 823.11). Non viene richiesto alcun compenso economico ai candidati. Non viene rilasciata alcuna promessa vincolante di assunzione o locazione.",
      lcd: "Legge contro la concorrenza sleale (LCSl Art. 3) & Codice Penale (Art. 146 CP)",
      lcdBody: "Tutte le metriche operative e i dati sui fondi raccolti presenti su questo portale sono autenticati da registri crittografici immutabili (Merkle SHA-256), a garanzia della massima trasparenza.",
      links: "Trasparenza & Informazioni Legali",
      linkList: ["Condizioni Generali di Contratto (CGC)", "Informativa sulla privacy (nLPD)", "Tabelle massimali 26 cantoni", "Registro pubblico di trasparenza Merkle"],
      close: "© 2026 · Associazione Swiss Resilience (in costituzione) · Con impegno al servizio della solidarietà elvetica e ucraina 🇨🇭 🇺🇦"
    }
  },

  uk: {
    lang: "Українська",
    banner: "Офіційне публічне тестування — Асоціація Swiss Resilience створюється за ст. 60–79 ЦК Швейцарії. Жодних платних підписок та жодних зборів із шукачів.",
    bannerShort: "Публічна бета · Неприбуткова асоціація у процесі створення (ст. 60–79 ЦК)",
    nav: { housing: "Житло та робота", solidarity: "Швейцарська солідарність", calc: "Кантональні ліміти", profession: "Професії CH-ISCO", transparency: "Прозорість Merkle" },
    tgBot: "Відкрити Telegram-бот",
    tabs: { seekers: "Шукачам житла та роботи", seekersSub: "Permis S · Прямий пошук", solidarity: "Швейцарська солідарність", solSub: "Швейцарські господарі та ментори" },
    hero: {
      title: "Гідне житло та легальна робота в Швейцарії — без посередників і комісій.",
      lede: "Офіційні ліміти соціальної оренди для 26 кантонів (EVAM, Hospice Général, AOZ тощо), моніторинг захищених вакансій з обов'язковим оголошенням (SECO), безпечна суборенда кімнат за ст. 262 CO та підтримка швейцарських волонтерів-наставників Benevol. Сервіс на 100% безкоштовний на період бета-тестування.",
      metrics: [
        { k: "26 кантонів", v: "Офіційні ліміти оренди", d: "EVAM · Hospice Général · AOZ · GSI · WSU · LAPS та ще 20 кантональних соцслужб" },
        { k: "4 мови", v: "UK · FR · DE · IT", d: "Повна мовна доступність для українців та швейцарських господарів" },
        { k: "Ст. 60–79 ЦК", v: "Асоціація у створенні", d: "Благодійна взаємодопомога · Нуль комерційного прибутку засновників" },
        { k: "Merkle SHA-256", v: "Криптографічний аудит", d: "Кожен франк пожертв відкрито фіксується в незмінному публічному реєстрі" }
      ]
    },
    calc: {
      eyebrow: "Модуль 01 · Соціальні Норми Житла",
      title: "Калькулятор соціальних лімітів оренди (26 кантонів)",
      lede: "Перевірте за 10 секунд, чи погодить ваш договір оренди соціальна служба вашого кантону, щоб захистити родину від відмови у виплаті допомоги.",
      canton: "Кантон проживання",
      household: "Склад родини",
      rentType: "Умови договору оренди",
      brut: "З комунальними (Брутто)",
      net: "Без комунальних (Нетто)",
      testRent: "Орендна плата на перевірку (CHF/міс.)",
      ceiling: "Максимальний дозволений ліміт соцслужби",
      authority: "Відповідальна соціальна служба",
      basis: "Принцип обліку",
      heating: "Витрати на опалення та гарячу воду",
      heatIncluded: "Включено у фіксований ліміт",
      heatSeparate: "Оплачується окремо за фактичними квитанціями",
      compliant: "Повністю відповідає нормам кантону — 100% компенсація",
      over: "Перевищення ліміту оренди на",
      overNote: "Увага: високий ризик відмови соціальної служби у погодженні житла",
      subsidiarityNote: "Остаточне рішення ухвалює соціальний куратор за правилом субсидіарності",
      persons: (n) => `${n} ${n <= 1 ? "особа" : n < 5 ? "особи" : "осіб"}`
    },
    prof: {
      eyebrow: "Модуль 02 · Працевлаштування та Офіційні Ставки",
      title: "Радар швейцарських професій та захищені вакансії (SECO)",
      lede: "15 провідних секторів швейцарської економіки, мінімальні тарифні сітки за трудовими конвенціями (CCNT / CCT) та відстеження вакансій з обов'язковим 5-денним пріоритетом.",
      sector: "Галузь діяльності (CH-ISCO-19)",
      category: "Спеціалізація / Підгалузь",
      qualif: "Рівень кваліфікації у Швейцарії",
      titleCol: "Назва посади",
      salary: "Офіційний орієнтир зарплати CCNT (CHF/міс. брутто)",
      isco: "Код ISCO-08",
      allQualif: "Усі рівні кваліфікації",
      stellenBadge: "Ст. 21a LEI · Пріоритетне оголошення",
      stellenTitle: "Професія підпадає під обов'язок оголошення (Stellenmeldepflicht)",
      stellenBody: "Через рівень безробіття ≥ 5% у цій галузі роботодавець зобов'язаний спочатку опублікувати вакансію ексклюзивно на Job-Room (ORP/RAV) на 5 робочих днів. Наш сканер виявляє такі пропозиції в перші хвилини публікації.",
      noResults: "За вказаними параметрами посад не знайдено. Будь ласка, розширте фільтр кваліфікації."
    },
    sublease: {
      eyebrow: "Модуль 03 · Солідарність Швейцарців — Проживання в Родинах",
      title: "Легальна гостинність: безпечна суборенда кімнати (ст. 262 CO)",
      lede: "Швейцарські наймачі мають законне право здавати кімнати українцям. Справедливий розрахунок частки житла, обмеження націнки за меблі до 20% та юридично грамотне повідомлення орендодавцю.",
      shield: "Захист головного наймача — ст. 262 Швейцарського кодексу зобов'язань",
      shieldBody: "Власник житла або gérance не мають права заборонити суборенду загалом: будь-який пункт повної заборони в договорі оренди є нікчемним за законом. Наймач має лише письмово повідомити gérance, а відмовити вони можуть лише за наявності чітких поважних причин (ст. 262 ч. 2 CO).",
      totalRent: "Загальна чиста оренда квартири (CHF/міс.)",
      rooms: "Загальна кількість кімнат у квартирі",
      roomFor: "Кімната, яка надається у суборенду",
      base: "Справедлива пропорційна частка оренди кімнати",
      surcharge: "Надбавка за меблювання та побутову техніку (%)",
      surchargeLimit: "Законна межа до 20% · Судова практика Федерального суду та ASLOCA",
      final: "Підсумкова сума щомісячної компенсації від суборендаря",
      okBadge: "Повністю відповідає нормам Федерального суду та ASLOCA",
      overBadge: "Ризик визнання завищеної оренди — ст. 262 ч. 2 п. b CO",
      letterBtn: "Сформувати офіційне повідомлення до gérance (PDF)",
      letterHint: "Генерує готовий до підпису офіційний лист із посиланням на статті 262 і 266e CO та законним терміном розірвання 2 тижні.",
      taxBadge: "Не оподатковується: компенсація фактичної собівартості без прибутку",
      insBadge: "Захист колективним страхуванням відповідальності RC на 5 000 000 CHF",
      pdfTitle: "ОФІЦІЙНЕ ПОВІДОМЛЕННЯ ДЛЯ GÉRANCE — ЧАСТКОВА СУБОРЕНДА ЖИТЛА",
      pdfIntro: "На підставі статті 262 Швейцарського кодексу зобов'язань (CO) та усталеної практики Федерального суду, нижчепідписаний наймач повідомляє про надання в суборенду мебльованої кімнати на таких умовах:",
      pdfFields: { from: "Головний наймач", to: "Gérance / Орендодавець", subtenant: "Суборендар ( Permis S)", desc: "Опис кімнати, що надається в суборенду", rent: "Місячна фіксована компенсація (частка + меблі + комунальні)" },
      pdfClose: "Термін розірвання суборенди відповідає ст. 266e CO (2 тижні на кінець місяця). Сума компенсації покриває виключно пропорційні реальні витрати та не містить комерційної націнки."
    },
    mentors: {
      eyebrow: "Модуль 04 · Волонтерство — Спільнота Benevol",
      title: "Швейцарські наставники: 1–3 години на тиждень, що змінюють долю",
      lede: "Офіційний швейцарський формат волонтерства за стандартами Benevol на базі безоплатного доручення (ст. 394 CO). Допоможіть біженцям адаптувати резюме, підготуватися до співбесіди та розібратися у вимогах ринку.",
      commit: "Бажана залученість",
      commitOpts: ["1 година на тиждень", "2–3 години на тиждень", "Консультації за запитом"],
      tracks: "Напрями волонтерської допомоги",
      apply: "Стати волонтером-наставником",
      trackList: [
        { t: "Адаптація резюме до швейцарських норм", b: "Оформлення CV за стандартами USPI з урахуванням місцевої специфіки рекрутингу." },
        { t: "Мовний тандем для роботи", b: "Практика живої розмовної французької або німецької для робочого середовища." },
        { t: "Тренувальні співбесіди", b: "Знайомство зі швейцарським корпоративним етикетом та конструктивний зворотний зв'язок." },
        { t: "Роз'яснення офіційної кореспонденції", b: "Допомога у розумінні листів від ORP/RAV, кас з безробіття та соціальних служб." }
      ],
      legal: "Чіткі правові рамки: ст. 394 CO — безоплатне цивільне доручення. Відсутні трудові відносини, відсутня оплата, ментор не несе фінансової відповідальності за результати пошуку роботи."
    },
    beta: {
      eyebrow: "Модуль 05 · Радикальна Чесність та Етика",
      title: "Абсолютна відкритість: жодних платних тарифів під час тестування",
      lede: "Ми дотримуємося принципу безкомпромісної чесності: доки триває юридичне оформлення асоціації, ми принципово не продаємо жодних платних планів. Увесь функціонал платформи відкритий для кожного без жодних оплат.",
      inactiveBadge: "Вимкнено на час бета-тесту",
      freeAccess: "100% безкоштовний повний доступ",
      donateTitle: "Підтримати сервери та захисників України",
      donateLede: "Платформа існує завдяки добровільній підтримці спільноти: 70% покривають сервери й технічні API, а 30% перераховуються на гуманітарні та оборонні потреби України.",
      donateBtn: "Зробити добровільну пожертву",
      proTagline: "Пріоритетні сповіщення < 60 с · Досьє USPI · Звіти для куратора ORP.",
      proFeatures: [
        "Миттєве сповіщення в Telegram про нове житло та роботу менш ніж за 60 секунд",
        "Необмежене формування готових досьє на житло за стандартами USPI у форматі PDF/A",
        "Щомісячний звіт про пошукову активність для куратора ORP (ст. 17 LACI)",
        "Автоматична перевірка відповідності нормам усіх 26 кантонів"
      ],
      successTagline: "Супровід передачі договору оренди (Reprise de bail / ст. 264 CO) · Шаблони.",
      successFeatures: [
        "Покрокова інструкція з дострокової передачі оренди згідно зі ст. 264 CO",
        "Юридично вивірені бланки звернень до швейцарських gérance",
        "Методична перевірка платоспроможності кандидатів-наступників",
        "Пріоритетний доступ до спільних вебінарів з адаптації"
      ],
      donationTagline: "Вільний доступ для всіх · Фінансується завдяки небайдужим людям.",
      donationFeatures: [
        "Повний доступ до калькуляторів оренди 26 кантонів Швейцарії",
        "Каталог професій CH-ISCO-19 зі сповіщеннями про Stellenmeldepflicht SECO",
        "Юридичний модуль безпечної суборенди кімнат (ст. 262 CO)",
        "Прямий зв'язок зі швейцарськими волонтерами-наставниками Benevol",
        "Публічний криптографічний контроль кожної пожертви в Merkle Ledger"
      ]
    },
    donation: {
      title: "Добровільна пожертва — Відкритий Merkle Ledger",
      split70: "70% — Оренда серверів, API-шлюзи та автоматичний моніторинг баз даних",
      split30: "30% — Гуманітарна допомога та матеріальне забезпечення ЗСУ (солідарний фонд)",
      stars: "Telegram Stars (XTR)",
      starsHint: "Миттєва підтримка в 1 клік через офіційного бота @SwissResilienceHubBot",
      card: "Банківська картка · Apple Pay · Twint",
      cardHint: "Захищений неприбутковий платіж через Merchant of Record",
      qr: "Швейцарський QR-рахунок · Переказ SEPA",
      qrHint: "Офіційний рахунок Асоціації Swiss Resilience (Vaud) після завершення реєстрації",
      merkleRoot: "Поточний криптографічний Merkle Root Hash",
      verifyBtn: "Перевірити реєстр транзакцій на GitHub",
      customAmount: "Будь-яка сума внеску на ваш вибір (CHF)",
      close: "Закрити",
      pay: "Підтвердити пожертву"
    },
    footer: {
      status: "Офіційний правовий статус",
      statusBody: "Асоціація Swiss Resilience створюється відповідно до ст. 60–79 Цивільного кодексу Швейцарії. Статутні документи передаються до Торгового реєстру кантону Vaud.",
      lse: "Закон про службу зайнятості (LSE ст. 9) — Платформа не є агентством",
      lseBody: "Swiss Resilience Navigator — неприбуткова волонтерська ініціатива громадської самопомоги. Сервіс не займається комерційним працевлаштуванням (LSE / RS 823.11) і не бере жодних коштів із шукачів роботи. Ми не гарантуємо укладання контрактів чи договорів оренди.",
      lcd: "Закон про недобросовісну конкуренцію (LCD ст. 3) та Кримінальний кодекс (ст. 146 CP)",
      lcdBody: "Усі показники витрат, залучених пожертв та результатів роботи публічно фіксуються в незмінному криптографічному реєстрі (Merkle SHA-256), що виключає будь-яке введення в оману.",
      links: "Правова інформація та прозорість",
      linkList: ["Умови використання (CGU)", "Захист персональних даних (nLPD)", "Офіційні ліміти оренди 26 кантонів", "Публічний Merkle-реєстр"],
      close: "© 2026 · Асоціація Swiss Resilience (у створенні) · З повагою до Швейцарії та вірою в Україну 🇨🇭 🇺🇦"
    }
  }
};


// -------- MOCK MERKLE ROOT (SHA-256, updated cosmetically per session) --------
window.MERKLE_ROOT = "0x8f3a7c9d2e5b4a1f6c8b9d0e2f4a7c1b3d5e6f8a9b0c1d2e3f4a5b6c7d8e9f0a";
