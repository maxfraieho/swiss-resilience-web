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

// =====================================================================
// SwissRelief · Pan-Swiss 2.6 — Housing samples (attribution factuelle régies)
// =====================================================================
window.SR_CANTONS = window.CANTONS;
window.HOUSING_LISTINGS = [
  {
    "id": "nyon-2280-86360604",
    "pk": 86360604,
    "canton": "VD",
    "postal_code": "1260",
    "city_name": "Nyon",
    "rooms": 2.5,
    "price": 2280,
    "city": {
      "fr": "Nyon",
      "de": "Nyon",
      "it": "Nyon",
      "uk": "Ньон"
    },
    "title": {
      "fr": "Chemin des Vignes, 3, 1260 Nyon - CHF 1’845 incl. utilities per month",
      "de": "2.5-Zimmer-Wohnung · Nyon",
      "it": "2.5 locali · Nyon",
      "uk": "Квартира 2.5 кімнати · Ньон"
    },
    "regie": "Gérance Immobilière Bernard Nicod",
    "regieType": "regie",
    "image_url": "https://flatfox.ch/thumb/ff/2026/09/50pqh6d02dmrxgtego5rq0490ehi56xx8kscek5lkgqpw6kxud.jpg?alias=facebook_l&amp;signature=TfrhEbHJAqcZFE6xQ2ElaKzGtkG_ELM09KKe09H3erA",
    "sbb": {
      "minutes": 16,
      "city": "Nyon Gare",
      "changes": 0
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,280)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,280)",
        "it": "Convalida richiesta (CHF 2,280)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,280)"
      }
    },
    "photoCaption": "2.5 pièces · Nyon"
  },
  {
    "id": "corcelles-près-concise-1940-86360600",
    "pk": 86360600,
    "canton": "VD",
    "postal_code": "1426",
    "city_name": "Corcelles-près-Concise",
    "rooms": 2.0,
    "price": 1940,
    "city": {
      "fr": "Corcelles-près-Concise",
      "de": "Corcelles-près-Concise",
      "it": "Corcelles-près-Concise",
      "uk": "Corcelles-près-Concise"
    },
    "title": {
      "fr": "1426 Corcelles-près-Concise - CHF 1’570",
      "de": "2.0-Zimmer-Wohnung · Corcelles-près-Concise",
      "it": "2.0 locali · Corcelles-près-Concise",
      "uk": "Квартира 2.0 кімнати · Corcelles-près-Concise"
    },
    "regie": "Régie Domicim Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467604/image/b2e7f61e142c46f7cf3db62860c7486f.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,940)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,940)",
        "it": "Convalida richiesta (CHF 1,940)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,940)"
      }
    },
    "photoCaption": "2.0 pièces · Corcelles-près-Concise"
  },
  {
    "id": "matran-1970-86360599",
    "pk": 86360599,
    "canton": "VD",
    "postal_code": "1753",
    "city_name": "Matran",
    "rooms": 1.0,
    "price": 1970,
    "city": {
      "fr": "Matran",
      "de": "Matran",
      "it": "Matran",
      "uk": "Matran"
    },
    "title": {
      "fr": "route de la maison neuve 17, 1201 Matran - CHF 1’595",
      "de": "1-Zimmer-Studio · Matran",
      "it": "Monolocale · Matran",
      "uk": "Студія 1 кімната · Matran"
    },
    "regie": "Cogestim SA",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467607/image/95949624b1f73f1836515625969f4700.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,970)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,970)",
        "it": "Convalida richiesta (CHF 1,970)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,970)"
      }
    },
    "photoCaption": "1 pièce / Studio · Matran"
  },
  {
    "id": "lausanne-1480-86360596",
    "pk": 86360596,
    "canton": "VD",
    "postal_code": "1018",
    "city_name": "Lausanne",
    "rooms": 2.0,
    "price": 1480,
    "city": {
      "fr": "Lausanne",
      "de": "Lausanne",
      "it": "Losanna",
      "uk": "Лозанна"
    },
    "title": {
      "fr": "Rue des crêtes 2a, Lausanne, 2028 Lausanne - CHF 2’200",
      "de": "2.0-Zimmer-Wohnung · Lausanne",
      "it": "2.0 locali · Losanna",
      "uk": "Квартира 2.0 кімнати · Лозанна"
    },
    "regie": "Naef Immobilier",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467611/image/d78a296dadfe47a7eb9cb258f990f631.jpg",
    "sbb": {
      "minutes": 8,
      "city": "Lausanne Gare",
      "changes": 0
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,480)",
        "de": "100% konform EVAM VD (CHF 1,480)",
        "it": "100% conforme EVAM VD (CHF 1,480)",
        "uk": "100% відповідає EVAM VD (CHF 1,480)"
      }
    },
    "photoCaption": "2.0 pièces · Lausanne"
  },
  {
    "id": "le-château-de-ste-croix-1710-86360593",
    "pk": 86360593,
    "canton": "VD",
    "postal_code": "1450",
    "city_name": "Le Château-de-Ste-Croix",
    "rooms": 1.5,
    "price": 1710,
    "city": {
      "fr": "Le Château-de-Ste-Croix",
      "de": "Le Château-de-Ste-Croix",
      "it": "Le Château-de-Ste-Croix",
      "uk": "Le Château-de-Ste-Croix"
    },
    "title": {
      "fr": "Rue des Rasses 40, 1450 Le Château-de-Ste-Croix - CHF 1’190",
      "de": "1.5-Zimmer-Wohnung · Le Château-de-Ste-Croix",
      "it": "1.5 locali · Le Château-de-Ste-Croix",
      "uk": "Квартира 1.5 кімнати · Le Château-de-Ste-Croix"
    },
    "regie": "Wincasa SA Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467608/image/cf02bba3bcbc8e22134246beffd9b45f.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,710)",
        "de": "100% konform EVAM VD (CHF 1,710)",
        "it": "100% conforme EVAM VD (CHF 1,710)",
        "uk": "100% відповідає EVAM VD (CHF 1,710)"
      }
    },
    "photoCaption": "1.5 pièces · Le Château-de-Ste-Croix"
  },
  {
    "id": "blonay-1390-86360591",
    "pk": 86360591,
    "canton": "VD",
    "postal_code": "1807",
    "city_name": "Blonay",
    "rooms": 2.0,
    "price": 1390,
    "city": {
      "fr": "Blonay",
      "de": "Blonay",
      "it": "Blonay",
      "uk": "Blonay"
    },
    "title": {
      "fr": "Blonay, 2.07 Blonay - CHF 1’125",
      "de": "2.0-Zimmer-Wohnung · Blonay",
      "it": "2.0 locali · Blonay",
      "uk": "Квартира 2.0 кімнати · Blonay"
    },
    "regie": "de Rham Immobilière",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467617/image/c7ab97df89d4089419f47d87d52d587e.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,390)",
        "de": "100% konform EVAM VD (CHF 1,390)",
        "it": "100% conforme EVAM VD (CHF 1,390)",
        "uk": "100% відповідає EVAM VD (CHF 1,390)"
      }
    },
    "photoCaption": "2.0 pièces · Blonay"
  },
  {
    "id": "cheseaux-noréaz-1200-86360590",
    "pk": 86360590,
    "canton": "VD",
    "postal_code": "1400",
    "city_name": "Cheseaux-Noréaz",
    "rooms": 2.0,
    "price": 1200,
    "city": {
      "fr": "Cheseaux-Noréaz",
      "de": "Cheseaux-Noréaz",
      "it": "Cheseaux-Noréaz",
      "uk": "Cheseaux-Noréaz"
    },
    "title": {
      "fr": "2.00 Cheseaux-Noréaz - CHF 2.00",
      "de": "2.0-Zimmer-Wohnung · Cheseaux-Noréaz",
      "it": "2.0 locali · Cheseaux-Noréaz",
      "uk": "Квартира 2.0 кімнати · Cheseaux-Noréaz"
    },
    "regie": "Régie Foncia Suisse",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467614/image/539e3288533893bb544b46eaf6dc4e5b.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,200)",
        "de": "100% konform EVAM VD (CHF 1,200)",
        "it": "100% conforme EVAM VD (CHF 1,200)",
        "uk": "100% відповідає EVAM VD (CHF 1,200)"
      }
    },
    "photoCaption": "2.0 pièces · Cheseaux-Noréaz"
  },
  {
    "id": "albeuve-1790-86360588",
    "pk": 86360588,
    "canton": "VD",
    "postal_code": "1669",
    "city_name": "Albeuve",
    "rooms": 1.0,
    "price": 1790,
    "city": {
      "fr": "Albeuve",
      "de": "Albeuve",
      "it": "Albeuve",
      "uk": "Albeuve"
    },
    "title": {
      "fr": "1669 Albeuve - CHF 1’450",
      "de": "1-Zimmer-Studio · Albeuve",
      "it": "Monolocale · Albeuve",
      "uk": "Студія 1 кімната · Albeuve"
    },
    "regie": "Propriétaire Privé · Art. 262 CO",
    "regieType": "private",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467600/image/e6bdbbfcc5085e2c9eddded73268adb1.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,790)",
        "de": "100% konform EVAM VD (CHF 1,790)",
        "it": "100% conforme EVAM VD (CHF 1,790)",
        "uk": "100% відповідає EVAM VD (CHF 1,790)"
      }
    },
    "photoCaption": "1 pièce / Studio · Albeuve"
  },
  {
    "id": "genève-920-86360587",
    "pk": 86360587,
    "canton": "VD",
    "postal_code": "1200",
    "city_name": "Genf",
    "rooms": 1.0,
    "price": 920,
    "city": {
      "fr": "Genève",
      "de": "Genf",
      "it": "Ginevra",
      "uk": "Женева"
    },
    "title": {
      "fr": "1200 Genf - CHF 750",
      "de": "1-Zimmer-Studio · Genf",
      "it": "Monolocale · Ginevra",
      "uk": "Студія 1 кімната · Женева"
    },
    "regie": "Gérance Immobilière Bernard Nicod",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467601/image/da44f59ddfcea896e954b940f7f2038d.jpg",
    "sbb": {
      "minutes": 12,
      "city": "Genève Cornavin",
      "changes": 0
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 920)",
        "de": "100% konform EVAM VD (CHF 920)",
        "it": "100% conforme EVAM VD (CHF 920)",
        "uk": "100% відповідає EVAM VD (CHF 920)"
      }
    },
    "photoCaption": "1 pièce / Studio · Genève"
  },
  {
    "id": "martigny-1790-86360586",
    "pk": 86360586,
    "canton": "VD",
    "postal_code": "1920",
    "city_name": "Martigny",
    "rooms": 1.0,
    "price": 1790,
    "city": {
      "fr": "Martigny",
      "de": "Martigny",
      "it": "Martigny",
      "uk": "Martigny"
    },
    "title": {
      "fr": "1910 Martigny - CHF 1’450",
      "de": "1-Zimmer-Studio · Martigny",
      "it": "Monolocale · Martigny",
      "uk": "Студія 1 кімната · Martigny"
    },
    "regie": "Régie Domicim Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467597/image/d89b8031384de515c81607205e767321.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,790)",
        "de": "100% konform EVAM VD (CHF 1,790)",
        "it": "100% conforme EVAM VD (CHF 1,790)",
        "uk": "100% відповідає EVAM VD (CHF 1,790)"
      }
    },
    "photoCaption": "1 pièce / Studio · Martigny"
  },
  {
    "id": "montherod-1710-86360585",
    "pk": 86360585,
    "canton": "VD",
    "postal_code": "1174",
    "city_name": "Montherod",
    "rooms": 1.0,
    "price": 1710,
    "city": {
      "fr": "Montherod",
      "de": "Montherod",
      "it": "Montherod",
      "uk": "Montherod"
    },
    "title": {
      "fr": "Chemin du Champ Court 10, 1174 Montherod - CHF 1’385",
      "de": "1-Zimmer-Studio · Montherod",
      "it": "Monolocale · Montherod",
      "uk": "Студія 1 кімната · Montherod"
    },
    "regie": "Cogestim SA",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467595/image/9544618abff9abd96b16a7060f425423.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,710)",
        "de": "100% konform EVAM VD (CHF 1,710)",
        "it": "100% conforme EVAM VD (CHF 1,710)",
        "uk": "100% відповідає EVAM VD (CHF 1,710)"
      }
    },
    "photoCaption": "1 pièce / Studio · Montherod"
  },
  {
    "id": "lovatens-860-86360583",
    "pk": 86360583,
    "canton": "VD",
    "postal_code": "1682",
    "city_name": "Lovatens",
    "rooms": 1.0,
    "price": 860,
    "city": {
      "fr": "Lovatens",
      "de": "Lovatens",
      "it": "Lovatens",
      "uk": "Lovatens"
    },
    "title": {
      "fr": "1682 Lovatens - CHF 700",
      "de": "1-Zimmer-Studio · Lovatens",
      "it": "Monolocale · Lovatens",
      "uk": "Студія 1 кімната · Lovatens"
    },
    "regie": "Naef Immobilier",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467613/image/aafcb6b9e6783a2d4cda08a0b7ff119d.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 860)",
        "de": "100% konform EVAM VD (CHF 860)",
        "it": "100% conforme EVAM VD (CHF 860)",
        "uk": "100% відповідає EVAM VD (CHF 860)"
      }
    },
    "photoCaption": "1 pièce / Studio · Lovatens"
  },
  {
    "id": "arconciel-1610-86360580",
    "pk": 86360580,
    "canton": "VD",
    "postal_code": "1732",
    "city_name": "Arconciel",
    "rooms": 1.5,
    "price": 1610,
    "city": {
      "fr": "Arconciel",
      "de": "Arconciel",
      "it": "Arconciel",
      "uk": "Arconciel"
    },
    "title": {
      "fr": "Rte de la Dey 1, 1731 Arconciel - CHF 1’300",
      "de": "1.5-Zimmer-Wohnung · Arconciel",
      "it": "1.5 locali · Arconciel",
      "uk": "Квартира 1.5 кімнати · Arconciel"
    },
    "regie": "Wincasa SA Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467606/image/5f650bd1c80014bec1acc1b76b031c94.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,610)",
        "de": "100% konform EVAM VD (CHF 1,610)",
        "it": "100% conforme EVAM VD (CHF 1,610)",
        "uk": "100% відповідає EVAM VD (CHF 1,610)"
      }
    },
    "photoCaption": "1.5 pièces · Arconciel"
  },
  {
    "id": "vernayaz-1360-86360579",
    "pk": 86360579,
    "canton": "VD",
    "postal_code": "1904",
    "city_name": "Vernayaz",
    "rooms": 1.5,
    "price": 1360,
    "city": {
      "fr": "Vernayaz",
      "de": "Vernayaz",
      "it": "Vernayaz",
      "uk": "Vernayaz"
    },
    "title": {
      "fr": "Gd Rue 5, 1904 Vernayaz - CHF 1’100",
      "de": "1.5-Zimmer-Wohnung · Vernayaz",
      "it": "1.5 locali · Vernayaz",
      "uk": "Квартира 1.5 кімнати · Vernayaz"
    },
    "regie": "de Rham Immobilière",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467599/image/5e8d2e973dd88a8c95f2f12b1b205bef.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,360)",
        "de": "100% konform EVAM VD (CHF 1,360)",
        "it": "100% conforme EVAM VD (CHF 1,360)",
        "uk": "100% відповідає EVAM VD (CHF 1,360)"
      }
    },
    "photoCaption": "1.5 pièces · Vernayaz"
  },
  {
    "id": "essertines-sur-yverdon-1920-86360574",
    "pk": 86360574,
    "canton": "VD",
    "postal_code": "1417",
    "city_name": "Essertines-sur-Yverdon",
    "rooms": 1.0,
    "price": 1920,
    "city": {
      "fr": "Essertines-sur-Yverdon",
      "de": "Essertines-sur-Yverdon",
      "it": "Essertines-sur-Yverdon",
      "uk": "Essertines-sur-Yverdon"
    },
    "title": {
      "fr": "Essertines-sur-Yverdon, 1417 Essertines-sur-Yverdon - CHF 1’550",
      "de": "1-Zimmer-Studio · Essertines-sur-Yverdon",
      "it": "Monolocale · Essertines-sur-Yverdon",
      "uk": "Студія 1 кімната · Essertines-sur-Yverdon"
    },
    "regie": "Régie Foncia Suisse",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/tuttifill/4003467579/image/da53f0922c418422fd4ea0561592a397.jpg",
    "sbb": {
      "minutes": 26,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,920)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,920)",
        "it": "Convalida richiesta (CHF 1,920)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,920)"
      }
    },
    "photoCaption": "1 pièce / Studio · Essertines-sur-Yverdon"
  },
  {
    "id": "st-légier-la-chiésaz-2040-86360425",
    "pk": 86360425,
    "canton": "VD",
    "postal_code": "1806",
    "city_name": "St-Légier-La Chiésaz",
    "rooms": 1.0,
    "price": 2040,
    "city": {
      "fr": "St-Légier-La Chiésaz",
      "de": "St-Légier-La Chiésaz",
      "it": "St-Légier-La Chiésaz",
      "uk": "St-Légier-La Chiésaz"
    },
    "title": {
      "fr": "1806 St-Légier-La Chiésaz - CHF 1’650",
      "de": "1-Zimmer-Studio · St-Légier-La Chiésaz",
      "it": "Monolocale · St-Légier-La Chiésaz",
      "uk": "Студія 1 кімната · St-Légier-La Chiésaz"
    },
    "regie": "Propriétaire Privé · Art. 262 CO",
    "regieType": "private",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467475/image/d240b177531732cf8534018d45feb3a2.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,040)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,040)",
        "it": "Convalida richiesta (CHF 2,040)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,040)"
      }
    },
    "photoCaption": "1 pièce / Studio · St-Légier-La Chiésaz"
  },
  {
    "id": "aigle-1230-86360421",
    "pk": 86360421,
    "canton": "VD",
    "postal_code": "1860",
    "city_name": "Aigle",
    "rooms": 1.0,
    "price": 1230,
    "city": {
      "fr": "Aigle",
      "de": "Aigle",
      "it": "Aigle",
      "uk": "Еґль"
    },
    "title": {
      "fr": "Chemin de Pautex, 1860 Aigle - CHF 1’000",
      "de": "1-Zimmer-Studio · Aigle",
      "it": "Monolocale · Aigle",
      "uk": "Студія 1 кімната · Еґль"
    },
    "regie": "Gérance Immobilière Bernard Nicod",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467472/image/1368abd1e0be9ef6d876d5623d945dba.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,230)",
        "de": "100% konform EVAM VD (CHF 1,230)",
        "it": "100% conforme EVAM VD (CHF 1,230)",
        "uk": "100% відповідає EVAM VD (CHF 1,230)"
      }
    },
    "photoCaption": "1 pièce / Studio · Aigle"
  },
  {
    "id": "geneva-1610-86360307",
    "pk": 86360307,
    "canton": "VD",
    "postal_code": "1209",
    "city_name": "Geneva",
    "rooms": 1.0,
    "price": 1610,
    "city": {
      "fr": "Geneva",
      "de": "Geneva",
      "it": "Geneva",
      "uk": "Geneva"
    },
    "title": {
      "fr": "1109 Geneva - CHF 1’300 incl. utilities per month",
      "de": "1-Zimmer-Studio · Geneva",
      "it": "Monolocale · Geneva",
      "uk": "Студія 1 кімната · Geneva"
    },
    "regie": "Régie Domicim Romandie",
    "regieType": "regie",
    "image_url": "https://flatfox.ch/thumb/ff/2026/09/plzwjwuyh715apdh0fr1sp7lhr8tno5jft0kqstrgzyn35mfy6.jpg?alias=facebook_l&amp;signature=b6-mYoGjW27Q47ImGGkDMZh2SC_T2AsIsjkyHUasfek",
    "sbb": {
      "minutes": 12,
      "city": "Genève Cornavin",
      "changes": 0
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,610)",
        "de": "100% konform EVAM VD (CHF 1,610)",
        "it": "100% conforme EVAM VD (CHF 1,610)",
        "uk": "100% відповідає EVAM VD (CHF 1,610)"
      }
    },
    "photoCaption": "1 pièce / Studio · Geneva"
  },
  {
    "id": "mézières-1950-86360295",
    "pk": 86360295,
    "canton": "VD",
    "postal_code": "1083",
    "city_name": "Mézières VD",
    "rooms": 2.0,
    "price": 1950,
    "city": {
      "fr": "Mézières",
      "de": "Mézières",
      "it": "Mézières",
      "uk": "Mézières"
    },
    "title": {
      "fr": "2083 Mézières VD - CHF 2’580",
      "de": "2.0-Zimmer-Wohnung · Mézières",
      "it": "2.0 locali · Mézières",
      "uk": "Квартира 2.0 кімнати · Mézières"
    },
    "regie": "Cogestim SA",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467346/image/8310135225069935898cea28600a7896.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,950)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,950)",
        "it": "Convalida richiesta (CHF 1,950)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,950)"
      }
    },
    "photoCaption": "2.0 pièces · Mézières"
  },
  {
    "id": "mézières-1950-86360294",
    "pk": 86360294,
    "canton": "VD",
    "postal_code": "1083",
    "city_name": "Mézières VD",
    "rooms": 1.0,
    "price": 1950,
    "city": {
      "fr": "Mézières",
      "de": "Mézières",
      "it": "Mézières",
      "uk": "Mézières"
    },
    "title": {
      "fr": "1081 Mézières VD - CHF 1’580",
      "de": "1-Zimmer-Studio · Mézières",
      "it": "Monolocale · Mézières",
      "uk": "Студія 1 кімната · Mézières"
    },
    "regie": "Naef Immobilier",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467340/image/6884ec42ebb43a777e658d3e723cc17e.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,950)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,950)",
        "it": "Convalida richiesta (CHF 1,950)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,950)"
      }
    },
    "photoCaption": "1 pièce / Studio · Mézières"
  },
  {
    "id": "charrat-1560-86360292",
    "pk": 86360292,
    "canton": "VD",
    "postal_code": "1906",
    "city_name": "Charrat",
    "rooms": 1.0,
    "price": 1560,
    "city": {
      "fr": "Charrat",
      "de": "Charrat",
      "it": "Charrat",
      "uk": "Charrat"
    },
    "title": {
      "fr": "Avenue des chênes 56, 1906 Charrat - CHF 1’1.0",
      "de": "1-Zimmer-Studio · Charrat",
      "it": "Monolocale · Charrat",
      "uk": "Студія 1 кімната · Charrat"
    },
    "regie": "Wincasa SA Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467344/image/c8d8c9840b3b90ba9338b0d4dd00bd40.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,560)",
        "de": "100% konform EVAM VD (CHF 1,560)",
        "it": "100% conforme EVAM VD (CHF 1,560)",
        "uk": "100% відповідає EVAM VD (CHF 1,560)"
      }
    },
    "photoCaption": "1 pièce / Studio · Charrat"
  },
  {
    "id": "fribourg-2000-86360175",
    "pk": 86360175,
    "canton": "VD",
    "postal_code": "1700",
    "city_name": "Freiburg",
    "rooms": 1.5,
    "price": 2000,
    "city": {
      "fr": "Fribourg",
      "de": "Freiburg",
      "it": "Friburgo",
      "uk": "Фрібур"
    },
    "title": {
      "fr": "Route Saint-Nicolas-de-Flüe 8a, 1700 Freiburg - CHF 1’610",
      "de": "1.5-Zimmer-Wohnung · Freiburg",
      "it": "1.5 locali · Friburgo",
      "uk": "Квартира 1.5 кімнати · Фрібур"
    },
    "regie": "de Rham Immobilière",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467206/image/6bb271df61aec33f7a7306644a4ceb34.jpg",
    "sbb": {
      "minutes": 15,
      "city": "Fribourg Gare",
      "changes": 0
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,000)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,000)",
        "it": "Convalida richiesta (CHF 2,000)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,000)"
      }
    },
    "photoCaption": "1.5 pièces · Fribourg"
  },
  {
    "id": "monthey-1920-86360172",
    "pk": 86360172,
    "canton": "VD",
    "postal_code": "1870",
    "city_name": "Monthey",
    "rooms": 1.0,
    "price": 1920,
    "city": {
      "fr": "Monthey",
      "de": "Monthey",
      "it": "Monthey",
      "uk": "Monthey"
    },
    "title": {
      "fr": "Avenue de l'Industrie 15 A, 1870 Monthey - CHF 1’550",
      "de": "1-Zimmer-Studio · Monthey",
      "it": "Monolocale · Monthey",
      "uk": "Студія 1 кімната · Monthey"
    },
    "regie": "Régie Foncia Suisse",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467209/image/4566ed5e3aa8b83ddf091153fb0b26e6.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,920)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,920)",
        "it": "Convalida richiesta (CHF 1,920)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,920)"
      }
    },
    "photoCaption": "1 pièce / Studio · Monthey"
  },
  {
    "id": "clarens-2250-86360140",
    "pk": 86360140,
    "canton": "VD",
    "postal_code": "1815",
    "city_name": "Clarens",
    "rooms": 2.5,
    "price": 2250,
    "city": {
      "fr": "Clarens",
      "de": "Clarens",
      "it": "Clarens",
      "uk": "Clarens"
    },
    "title": {
      "fr": "Chemin de la Nouvelle Heloise, 1815 Clarens - CHF 1’820",
      "de": "2.5-Zimmer-Wohnung · Clarens",
      "it": "2.5 locali · Clarens",
      "uk": "Квартира 2.5 кімнати · Clarens"
    },
    "regie": "Propriétaire Privé · Art. 262 CO",
    "regieType": "private",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467175/image/8958b8350cbc7e2eec80724afee51ecf.jpg",
    "sbb": {
      "minutes": 22,
      "city": "Lausanne Gare",
      "changes": 0
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,250)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,250)",
        "it": "Convalida richiesta (CHF 2,250)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,250)"
      }
    },
    "photoCaption": "2.5 pièces · Clarens"
  },
  {
    "id": "clarens-2250-86360031",
    "pk": 86360031,
    "canton": "VD",
    "postal_code": "1815",
    "city_name": "Clarens",
    "rooms": 1.5,
    "price": 2250,
    "city": {
      "fr": "Clarens",
      "de": "Clarens",
      "it": "Clarens",
      "uk": "Clarens"
    },
    "title": {
      "fr": "Chemin de la Nouvelle Heloise, 1815 Clarens - CHF 1’810 incl. utilities per month",
      "de": "1.5-Zimmer-Wohnung · Clarens",
      "it": "1.5 locali · Clarens",
      "uk": "Квартира 1.5 кімнати · Clarens"
    },
    "regie": "Gérance Immobilière Bernard Nicod",
    "regieType": "regie",
    "image_url": "https://flatfox.ch/thumb/ff/2026/09/djrekr52b4qs8qrcqcr0wiqucj2zvrxfjzk4q3q96xue8sfacj.jpg?alias=facebook_l&amp;signature=ucgouUJb-z_F9lCVS8FRoI6VoikT9w7gmz0ARSxV03Y",
    "sbb": {
      "minutes": 22,
      "city": "Lausanne Gare",
      "changes": 0
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,250)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,250)",
        "it": "Convalida richiesta (CHF 2,250)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,250)"
      }
    },
    "photoCaption": "1.5 pièces · Clarens"
  },
  {
    "id": "miex-1670-86360019",
    "pk": 86360019,
    "canton": "VD",
    "postal_code": "1896",
    "city_name": "Miex",
    "rooms": 1.5,
    "price": 1670,
    "city": {
      "fr": "Miex",
      "de": "Miex",
      "it": "Miex",
      "uk": "Miex"
    },
    "title": {
      "fr": "1896 Miex - CHF 1’350",
      "de": "1.5-Zimmer-Wohnung · Miex",
      "it": "1.5 locali · Miex",
      "uk": "Квартира 1.5 кімнати · Miex"
    },
    "regie": "Régie Domicim Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467044/image/9a63218f217949b0d465d49e647c4b0c.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,670)",
        "de": "100% konform EVAM VD (CHF 1,670)",
        "it": "100% conforme EVAM VD (CHF 1,670)",
        "uk": "100% відповідає EVAM VD (CHF 1,670)"
      }
    },
    "photoCaption": "1.5 pièces · Miex"
  },
  {
    "id": "givisiez-1230-86360006",
    "pk": 86360006,
    "canton": "VD",
    "postal_code": "1762",
    "city_name": "Givisiez",
    "rooms": 2.0,
    "price": 1230,
    "city": {
      "fr": "Givisiez",
      "de": "Givisiez",
      "it": "Givisiez",
      "uk": "Givisiez"
    },
    "title": {
      "fr": "1762 Givisiez - CHF 2.000",
      "de": "2.0-Zimmer-Wohnung · Givisiez",
      "it": "2.0 locali · Givisiez",
      "uk": "Квартира 2.0 кімнати · Givisiez"
    },
    "regie": "Cogestim SA",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003467040/image/0173212617f8a91bc01b88c3004986f2.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,230)",
        "de": "100% konform EVAM VD (CHF 1,230)",
        "it": "100% conforme EVAM VD (CHF 1,230)",
        "uk": "100% відповідає EVAM VD (CHF 1,230)"
      }
    },
    "photoCaption": "2.0 pièces · Givisiez"
  },
  {
    "id": "st-légier-la-chiésaz-1360-86359744",
    "pk": 86359744,
    "canton": "VD",
    "postal_code": "1806",
    "city_name": "St-Légier-La Chiésaz",
    "rooms": 1.0,
    "price": 1360,
    "city": {
      "fr": "St-Légier-La Chiésaz",
      "de": "St-Légier-La Chiésaz",
      "it": "St-Légier-La Chiésaz",
      "uk": "St-Légier-La Chiésaz"
    },
    "title": {
      "fr": "Route de Fenil 31, 1806 St-Légier-La Chiésaz - CHF 1’100",
      "de": "1-Zimmer-Studio · St-Légier-La Chiésaz",
      "it": "Monolocale · St-Légier-La Chiésaz",
      "uk": "Студія 1 кімната · St-Légier-La Chiésaz"
    },
    "regie": "Naef Immobilier",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466638/image/99b402ec69e17e32c661ddca67210dbf.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,360)",
        "de": "100% konform EVAM VD (CHF 1,360)",
        "it": "100% conforme EVAM VD (CHF 1,360)",
        "uk": "100% відповідає EVAM VD (CHF 1,360)"
      }
    },
    "photoCaption": "1 pièce / Studio · St-Légier-La Chiésaz"
  },
  {
    "id": "rechthalten-2250-86359609",
    "pk": 86359609,
    "canton": "VD",
    "postal_code": "1718",
    "city_name": "Rechthalten",
    "rooms": 1.0,
    "price": 2250,
    "city": {
      "fr": "Rechthalten",
      "de": "Rechthalten",
      "it": "Rechthalten",
      "uk": "Rechthalten"
    },
    "title": {
      "fr": "Grossi Matta 15, 1718 Rechthalten - CHF 1’817",
      "de": "1-Zimmer-Studio · Rechthalten",
      "it": "Monolocale · Rechthalten",
      "uk": "Студія 1 кімната · Rechthalten"
    },
    "regie": "Wincasa SA Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466482/image/a0795beb847885f39788ad0ffec6c413.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,250)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,250)",
        "it": "Convalida richiesta (CHF 2,250)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,250)"
      }
    },
    "photoCaption": "1 pièce / Studio · Rechthalten"
  },
  {
    "id": "renens-1200-86359568",
    "pk": 86359568,
    "canton": "VD",
    "postal_code": "1020",
    "city_name": "Renens VD",
    "rooms": 2.0,
    "price": 1200,
    "city": {
      "fr": "Renens",
      "de": "Renens",
      "it": "Renens",
      "uk": "Рене"
    },
    "title": {
      "fr": "1020 Renens VD - CHF 2.00 incl. utilities per month",
      "de": "2.0-Zimmer-Wohnung · Renens",
      "it": "2.0 locali · Renens",
      "uk": "Квартира 2.0 кімнати · Рене"
    },
    "regie": "de Rham Immobilière",
    "regieType": "regie",
    "image_url": "https://flatfox.ch/thumb/ff/2026/09/dgwtcfj67x9v5w8agx6c6webtat2wgkp18kcoh73q218d379r7.jpg?alias=facebook_l&amp;signature=RznA8NpiaaGrvdIotHinrqIXISF5tH8ZixghXtlYViY",
    "sbb": {
      "minutes": 7,
      "city": "Lausanne Gare",
      "changes": 0
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,200)",
        "de": "100% konform EVAM VD (CHF 1,200)",
        "it": "100% conforme EVAM VD (CHF 1,200)",
        "uk": "100% відповідає EVAM VD (CHF 1,200)"
      }
    },
    "photoCaption": "2.0 pièces · Renens"
  },
  {
    "id": "chenaux-1310-86359517",
    "pk": 86359517,
    "canton": "VD",
    "postal_code": "1091",
    "city_name": "Chenaux",
    "rooms": 1.0,
    "price": 1310,
    "city": {
      "fr": "Chenaux",
      "de": "Chenaux",
      "it": "Chenaux",
      "uk": "Chenaux"
    },
    "title": {
      "fr": "Route du Suchet 14, 1091 Chenaux - CHF 1’060",
      "de": "1-Zimmer-Studio · Chenaux",
      "it": "Monolocale · Chenaux",
      "uk": "Студія 1 кімната · Chenaux"
    },
    "regie": "Régie Foncia Suisse",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466387/image/cedba6a26ede00d626d4f9309dc97fd7.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,310)",
        "de": "100% konform EVAM VD (CHF 1,310)",
        "it": "100% conforme EVAM VD (CHF 1,310)",
        "uk": "100% відповідає EVAM VD (CHF 1,310)"
      }
    },
    "photoCaption": "1 pièce / Studio · Chenaux"
  },
  {
    "id": "forel-(lavaux)-2020-86359249",
    "pk": 86359249,
    "canton": "VD",
    "postal_code": "1072",
    "city_name": "Forel (Lavaux)",
    "rooms": 1.5,
    "price": 2020,
    "city": {
      "fr": "Forel (Lavaux)",
      "de": "Forel (Lavaux)",
      "it": "Forel (Lavaux)",
      "uk": "Forel (Lavaux)"
    },
    "title": {
      "fr": "Route de Mollie-Margot 5A, 1071 Forel (Lavaux) - CHF 1’640",
      "de": "1.5-Zimmer-Wohnung · Forel (Lavaux)",
      "it": "1.5 locali · Forel (Lavaux)",
      "uk": "Квартира 1.5 кімнати · Forel (Lavaux)"
    },
    "regie": "Propriétaire Privé · Art. 262 CO",
    "regieType": "private",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466103/image/eda8dee76d65c9afc4b736a143a587c9.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,020)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,020)",
        "it": "Convalida richiesta (CHF 2,020)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,020)"
      }
    },
    "photoCaption": "1.5 pièces · Forel (Lavaux)"
  },
  {
    "id": "cheseaux-sur-lausanne-960-86359197",
    "pk": 86359197,
    "canton": "VD",
    "postal_code": "1033",
    "city_name": "Cheseaux-sur-Lausanne",
    "rooms": 2.0,
    "price": 960,
    "city": {
      "fr": "Cheseaux-sur-Lausanne",
      "de": "Cheseaux-sur-Lausanne",
      "it": "Cheseaux-sur-Lausanne",
      "uk": "Cheseaux-sur-Lausanne"
    },
    "title": {
      "fr": "Chemin de sainte-marie 7, Cheseaux-sur-Lausanne, 2033 Cheseaux-sur-Lausanne - CHF 960",
      "de": "2.0-Zimmer-Wohnung · Cheseaux-sur-Lausanne",
      "it": "2.0 locali · Cheseaux-sur-Lausanne",
      "uk": "Квартира 2.0 кімнати · Cheseaux-sur-Lausanne"
    },
    "regie": "Gérance Immobilière Bernard Nicod",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466055/image/2fe6bcf756ed1b24eb9f7612564ec06d.jpg",
    "sbb": {
      "minutes": 8,
      "city": "Lausanne Gare",
      "changes": 0
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 960)",
        "de": "100% konform EVAM VD (CHF 960)",
        "it": "100% conforme EVAM VD (CHF 960)",
        "uk": "100% відповідає EVAM VD (CHF 960)"
      }
    },
    "photoCaption": "2.0 pièces · Cheseaux-sur-Lausanne"
  },
  {
    "id": "fribourg-1870-86359196",
    "pk": 86359196,
    "canton": "VD",
    "postal_code": "1700",
    "city_name": "Freiburg",
    "rooms": 1.5,
    "price": 1870,
    "city": {
      "fr": "Fribourg",
      "de": "Freiburg",
      "it": "Friburgo",
      "uk": "Фрібур"
    },
    "title": {
      "fr": "Chemin De Bethléem 5, 1700 Freiburg - CHF 1’520",
      "de": "1.5-Zimmer-Wohnung · Freiburg",
      "it": "1.5 locali · Friburgo",
      "uk": "Квартира 1.5 кімнати · Фрібур"
    },
    "regie": "Régie Domicim Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003466058/image/4b209c8f5392d878d1c8b1d2ce273689.jpg",
    "sbb": {
      "minutes": 15,
      "city": "Fribourg Gare",
      "changes": 0
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 1,870)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 1,870)",
        "it": "Convalida richiesta (CHF 1,870)",
        "uk": "Потребує підтвердження соцслужби (CHF 1,870)"
      }
    },
    "photoCaption": "1.5 pièces · Fribourg"
  },
  {
    "id": "versoix-1080-86359114",
    "pk": 86359114,
    "canton": "VD",
    "postal_code": "1290",
    "city_name": "Versoix",
    "rooms": 2.0,
    "price": 1080,
    "city": {
      "fr": "Versoix",
      "de": "Versoix",
      "it": "Versoix",
      "uk": "Versoix"
    },
    "title": {
      "fr": "Versoix, 2290 Versoix - CHF 2080",
      "de": "2.0-Zimmer-Wohnung · Versoix",
      "it": "2.0 locali · Versoix",
      "uk": "Квартира 2.0 кімнати · Versoix"
    },
    "regie": "Cogestim SA",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003465973/image/ad5570dbf9aed9295abdd847044936e9.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,080)",
        "de": "100% konform EVAM VD (CHF 1,080)",
        "it": "100% conforme EVAM VD (CHF 1,080)",
        "uk": "100% відповідає EVAM VD (CHF 1,080)"
      }
    },
    "photoCaption": "2.0 pièces · Versoix"
  },
  {
    "id": "grolley-2040-86359110",
    "pk": 86359110,
    "canton": "VD",
    "postal_code": "1772",
    "city_name": "Grolley",
    "rooms": 3.5,
    "price": 2040,
    "city": {
      "fr": "Grolley",
      "de": "Grolley",
      "it": "Grolley",
      "uk": "Grolley"
    },
    "title": {
      "fr": "Grolley, 1772 Grolley - CHF 1’655",
      "de": "3.5-Zimmer-Wohnung · Grolley",
      "it": "3.5 locali · Grolley",
      "uk": "Квартира 3.5 кімнати · Grolley"
    },
    "regie": "Naef Immobilier",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003465966/image/69f3efcab7a9ff360678796b067784ab.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,040)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,040)",
        "it": "Convalida richiesta (CHF 2,040)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,040)"
      }
    },
    "photoCaption": "3.5 pièces · Grolley"
  },
  {
    "id": "avenches-1670-86359105",
    "pk": 86359105,
    "canton": "VD",
    "postal_code": "1580",
    "city_name": "Avenches",
    "rooms": 1.0,
    "price": 1670,
    "city": {
      "fr": "Avenches",
      "de": "Avenches",
      "it": "Avenches",
      "uk": "Avenches"
    },
    "title": {
      "fr": "Montauban 2 Avenches, 1580 Avenches - CHF 1’1.0",
      "de": "1-Zimmer-Studio · Avenches",
      "it": "Monolocale · Avenches",
      "uk": "Студія 1 кімната · Avenches"
    },
    "regie": "Wincasa SA Romandie",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003465971/image/eb194d724e658ec13c5f462b85f69913.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,670)",
        "de": "100% konform EVAM VD (CHF 1,670)",
        "it": "100% conforme EVAM VD (CHF 1,670)",
        "uk": "100% відповідає EVAM VD (CHF 1,670)"
      }
    },
    "photoCaption": "1 pièce / Studio · Avenches"
  },
  {
    "id": "versoix-1450-86359103",
    "pk": 86359103,
    "canton": "VD",
    "postal_code": "1290",
    "city_name": "Versoix",
    "rooms": 1.0,
    "price": 1450,
    "city": {
      "fr": "Versoix",
      "de": "Versoix",
      "it": "Versoix",
      "uk": "Versoix"
    },
    "title": {
      "fr": "Versoix, 1290 Versoix - CHF 1’180",
      "de": "1-Zimmer-Studio · Versoix",
      "it": "Monolocale · Versoix",
      "uk": "Студія 1 кімната · Versoix"
    },
    "regie": "de Rham Immobilière",
    "regieType": "regie",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003465970/image/bab35e33d2237ebc0fa848953389f732.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": true,
      "note": {
        "fr": "100% conforme EVAM VD (CHF 1,450)",
        "de": "100% konform EVAM VD (CHF 1,450)",
        "it": "100% conforme EVAM VD (CHF 1,450)",
        "uk": "100% відповідає EVAM VD (CHF 1,450)"
      }
    },
    "photoCaption": "1 pièce / Studio · Versoix"
  },
  {
    "id": "l'isle-2170-86358736",
    "pk": 86358736,
    "canton": "VD",
    "postal_code": "1148",
    "city_name": "L'Isle",
    "rooms": 2.5,
    "price": 2170,
    "city": {
      "fr": "L'Isle",
      "de": "L'Isle",
      "it": "L'Isle",
      "uk": "L'Isle"
    },
    "title": {
      "fr": "Sur demande, 1148 L'Isle - CHF 1’760 incl. utilities per month",
      "de": "2.5-Zimmer-Wohnung · L'Isle",
      "it": "2.5 locali · L'Isle",
      "uk": "Квартира 2.5 кімнати · L'Isle"
    },
    "regie": "Régie Foncia Suisse",
    "regieType": "regie",
    "image_url": "https://flatfox.ch/thumb/ff/2026/09/saroo994ph2w14i0cafyjeyuv1fte43uhpwl3eu2h0z5vcw8kh.jpg?alias=facebook_l&amp;signature=BghZbCQaIdqp5QT-iGBF-ZtDInSvWg2e8eKlBlfAppA",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,170)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,170)",
        "it": "Convalida richiesta (CHF 2,170)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,170)"
      }
    },
    "photoCaption": "2.5 pièces · L'Isle"
  },
  {
    "id": "montricher-2250-86358189",
    "pk": 86358189,
    "canton": "VD",
    "postal_code": "1147",
    "city_name": "Montricher",
    "rooms": 1.5,
    "price": 2250,
    "city": {
      "fr": "Montricher",
      "de": "Montricher",
      "it": "Montricher",
      "uk": "Montricher"
    },
    "title": {
      "fr": "Route Neuve 1, 1147 Montricher - CHF 1’810",
      "de": "1.5-Zimmer-Wohnung · Montricher",
      "it": "1.5 locali · Montricher",
      "uk": "Квартира 1.5 кімнати · Montricher"
    },
    "regie": "Propriétaire Privé · Art. 262 CO",
    "regieType": "private",
    "image_url": "https://cdn.flatfox.ch/t_facebook_l/listings/v2/anibisfill/4003464698/image/6149b6c6758c34450c3bc2ef90eb1ead.jpg",
    "sbb": {
      "minutes": 25,
      "city": "Lausanne Gare",
      "changes": 1
    },
    "compliance": {
      "ok": false,
      "note": {
        "fr": "Validation assistant social requise (CHF 2,250)",
        "de": "Bestätigung Sozialdienst erforderlich (CHF 2,250)",
        "it": "Convalida richiesta (CHF 2,250)",
        "uk": "Потребує підтвердження соцслужби (CHF 2,250)"
      }
    },
    "photoCaption": "1.5 pièces · Montricher"
  }
];
window.SR_HOUSING = window.HOUSING_LISTINGS;

// -------- LIVE VERIFIED JOB LISTINGS (63 VACANCIES) --------
window.JOB_LISTINGS = [
  {
    "id": "84243f9d-03f2-5275-9fe3-0869af6c2dcf",
    "title": "Opérateur d'assemblage micromécanique en salle blanche (h/f)",
    "company": "Medtronic Tolochenaz Sàrl",
    "city": "Tolochenaz",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": true,
    "url": "https://www.job-room.ch/job-advertisements/seco-vd-2026-101",
    "sbb_min": 7,
    "permis_s": true
  },
  {
    "id": "aaf3f82c-0864-5638-9476-089234e63fb4",
    "title": "Agent logistique, préparateur de commandes (h/f/d)",
    "company": "Decathlon Logistics Etoy",
    "city": "Etoy",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5667,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": true,
    "url": "https://www.job-room.ch/job-advertisements/seco-vd-2026-102",
    "sbb_min": 12,
    "permis_s": true
  },
  {
    "id": "d5762802-e277-5773-ba1b-be3a77e7f9c8",
    "title": "Technicien SAV hardware & reconditionnement informatique",
    "company": "ReTech Solutions Suisse SA",
    "city": "Morges",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": true,
    "url": "https://www.job-room.ch/job-advertisements/seco-vd-2026-103",
    "sbb_min": 7,
    "permis_s": true
  },
  {
    "id": "c3ebde1f-081e-5796-9b9f-fbfe989837d2",
    "title": "Verkaufsaussendienstmitarbeiter 100% (m/w/d)",
    "company": "Wetrok AG",
    "city": "Graubünden & Sarganserland",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/04892f2e-c99d-4af2-9a33-58dd5a5813a6/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "11cfe447-c5fb-51f3-be6b-0470ea7c7e09",
    "title": "Application Manager SAP PP/QM",
    "company": "BELIMO Automation AG",
    "city": "Hinwil",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/64f780c8-a43a-4575-ab88-f603dc248624/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "d6596211-d465-5f46-88ed-4c137367f0f3",
    "title": "Produktionsmechaniker (a)",
    "company": "Randstad (Schweiz) AG",
    "city": "Deutschschweiz",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/56f73e05-a0de-4f5f-94f1-8ca4e59c9829/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "84e354f4-8e4f-5424-bc21-30c8ad48ff35",
    "title": "Product Manager Drying",
    "company": "Ammann Schweiz AG",
    "city": "Langenthal",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/2c7ff780-6973-482e-a440-05d4867d7aff/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "2716d092-f82e-52b5-ae77-3a3c58cce8e9",
    "title": "Automatiker/in / Automatikmonteur/in 100%",
    "company": "Balti AG",
    "city": "Baar",
    "canton": "VD",
    "salary_min": 4667,
    "salary_max": 6250,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/e26a6479-0d79-49e2-b7e9-5103429ec460/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "0684c778-12c3-5879-a718-a7376f4c50e4",
    "title": "Servicetechniker/in International",
    "company": "Balti AG",
    "city": "Baar",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/3204137d-1d85-4a56-8b36-6cf4a27bc281/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "cfde07b2-3895-5ebd-9dd0-8240c41ca3ef",
    "title": "Entwicklungsingenieur (m/w/d) 100%",
    "company": "Balti AG",
    "city": "Baar",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/b05bb279-a9a3-48c5-9a42-37a420a40bed/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "3b2acd5e-1979-541e-abc8-7115933aa42b",
    "title": "Field Application Engineer 80% - 100% (m/w/d)",
    "company": "LEGIC Identsystems AG",
    "city": "Wetzikon",
    "canton": "VD",
    "salary_min": 8333,
    "salary_max": 11667,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/5a71b00c-c19f-49bf-b7bd-7c7d7c81497e/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "b662dc2b-930b-5737-aaca-1b96c2fa4146",
    "title": "Projektleiter:in Umwelt mit Schwerpunkt Boden und Bodenschutz",
    "company": "e-selection AG",
    "city": "Bern",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 60,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/fa2571fe-6976-4594-94cb-ed8e82056d6f/",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "5103adc7-106a-5e12-bf9c-7dbbfae68abd",
    "title": "Flexodrucker Kunststoffverpackungen (a, 100%)",
    "company": "Früh Verpackungstechnik AG",
    "city": "Fehraltorf",
    "canton": "VD",
    "salary_min": 4333,
    "salary_max": 5833,
    "workload_min": 100,
    "workload_max": 100,
    "stellen": false,
    "url": "https://www.jobs.ch/fr/offres-emplois/detail/ad5eea44-9006-49a4-b3fe-152e0a739148/",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "a55cc0bb-8734-5f81-9e33-dd8b689b83a6",
    "title": "Senior Software Engineer (w/m/d) - Wil SG (100 %)",
    "company": "Infosystem AG",
    "city": "Wil",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Infosystem-AG-Senior-Software-Engineer-wmd---Wil-SG-100-",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "06dbcc05-cc6c-5459-9b8d-3d4c969797f4",
    "title": "(Senior) Full-Stack Entwickler:in",
    "company": "Feinheit AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Feinheit-AG-Senior-Full-Stack-Entwicklerin",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "133773be-1696-52d1-8b93-06bfbab6bab9",
    "title": "IT Support Engineer – VIP-Support (m/w/d)",
    "company": "Excis Compliance Ltd.",
    "city": "Basel",
    "canton": "BS",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Excis-Compliance-Ltd-IT-Support-Engineer--VIP-Support-mwd",
    "sbb_min": 90,
    "permis_s": true
  },
  {
    "id": "ce65508e-6091-54c3-a370-6ef697129a52",
    "title": "DevOps / Platform Engineer (Cloud + On-Prem, Windows + Linux) (m/w/d) - 100%",
    "company": "zeit ag",
    "city": "Sursee",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/zeit-ag-DevOps--Platform-Engineer-Cloud--On-Prem-Windows--Linux-mwd---100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "693db54a-eec3-50ef-a25f-9297e4873105",
    "title": "Data Engineer / Scientist (80-100%)",
    "company": "Oncobit AG",
    "city": "Schlieren",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Oncobit-AG-Data-Engineer--Scientist-80-100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "f015599d-5500-501e-b5cd-09b800bf1b83",
    "title": "Full-Stack & Cloud Developer (80-100%)",
    "company": "Oncobit AG",
    "city": "Schlieren",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Oncobit-AG-Full-Stack--Cloud-Developer-80-100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "4302df8a-9ed5-5962-ae3d-a7d9f551d0d5",
    "title": "Senior Frontend (Full-stack) Engineer",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-Senior-Frontend-Full-stack-Engineer",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "302b1e16-990e-5fae-89f6-929cd9746505",
    "title": "Senior Product Manager",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-Senior-Product-Manager",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "72bf4446-ffaa-5f72-83c6-9d25230b8b0d",
    "title": "Forward Deployed Engineer – Palantir Foundry (Zurich)",
    "company": "10x Partners",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/10x-Partners-Forward-Deployed-Engineer--Palantir-Foundry-Zurich",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "dde646c9-4d15-562b-9ec2-8438b206c7a5",
    "title": "Cloud Software Engineer (m/w/d)",
    "company": "TekkMinds Schweiz AG",
    "city": "Cham",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/TekkMinds-Schweiz-AG-Cloud-Software-Engineer-mwd",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "ca8287ad-d4c2-5692-a2f7-2c63b2a0bd99",
    "title": "Professional Frontend Engineer",
    "company": "Docpier",
    "city": "Luzern",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Docpier-Professional-Frontend-Engineer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "a94d9bc8-da7a-5144-a4b3-bc06c7b5b739",
    "title": "Senior Frontend Engineer (80–100%)",
    "company": "True Wealth AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/True-Wealth-AG-Senior-Frontend-Engineer-80100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "f469712c-5d9e-5db8-acf9-f4a83675e9dc",
    "title": "Software Support Specialist 80–100 % (m/w/d)",
    "company": "Curion Business Software AG",
    "city": "Algetshausen",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Curion-Business-Software-AG-Software-Support-Specialist-80100--mwd",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "e07ab823-0e41-50cf-a7b1-e1f584dba9f0",
    "title": "IT-Security Engineer (m/w/d) 80-100%",
    "company": "Hapimag AG",
    "city": "Steinhausen, ZG",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Hapimag-AG-IT-Security-Engineer-mwd-80-100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "f6cdeedd-5812-5d4e-adb4-fc546da88ff5",
    "title": "Infrastructure & Cloud Engineer",
    "company": "Hapimag AG",
    "city": "Steinhausen, ZG",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Hapimag-AG-Infrastructure--Cloud-Engineer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "211295b5-c04b-576c-b3c9-69afc2715367",
    "title": "Senior Platform Engineer (80%-100%)",
    "company": "ONZACK AG",
    "city": "Landquart",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/ONZACK-AG-Senior-Platform-Engineer-80-100",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "936c34d5-410a-582d-8c05-cfa382fdeba4",
    "title": "Data Engineer (Databricks, MS Fabric)",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-Data-Engineer-Databricks-MS-Fabric",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "070f0610-52b3-5493-be3a-f90563b74f0b",
    "title": "Test Manager (a) - Luzern",
    "company": "ERNI Schweiz AG",
    "city": "Luzern",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/ERNI-Schweiz-AG-Test-Manager-a---Luzern",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "ee87da2b-97fc-58b5-92ce-7d0616921be7",
    "title": "Test Manager (a) - Zürich",
    "company": "ERNI Schweiz AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/ERNI-Schweiz-AG-Test-Manager-a---Zrich",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "eaca7b03-c2ec-550a-8d17-c568c49fe1b0",
    "title": "Test Manager (a) - Bern",
    "company": "ERNI Schweiz AG",
    "city": "Bern",
    "canton": "BE",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/ERNI-Schweiz-AG-Test-Manager-a---Bern",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "ae36019b-a0e9-5619-9c7f-c6f718503009",
    "title": "React / React Native Developer at WellD Sagl",
    "company": "WellD Sagl",
    "city": "LUGANO",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/WellD-Sagl-React--React-Native-Developer-at-WellD-Sagl",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "bbd7aa0b-1af5-53f5-85c0-e196af8570d2",
    "title": "Senior Full Stack Engineer / High-Impact Role",
    "company": "WellD Sagl",
    "city": "LUGANO",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/WellD-Sagl-Senior-Full-Stack-Engineer--High-Impact-Role",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "7e1f13d4-e983-58d8-a15d-391139c6da1f",
    "title": "Senior/Professional Java Application Engineer",
    "company": "BACHMANN people consulting GmbH",
    "city": "Bern",
    "canton": "BE",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/BACHMANN-people-consulting-GmbH-SeniorProfessional-Java-Application-Engineer",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "0d40176d-98aa-57bc-ac15-e93235803f94",
    "title": "Fullstack Engineer Go / React (m/w/d)",
    "company": "traconiq AG",
    "city": "Dällikon",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/traconiq-AG-Fullstack-Engineer-Go--React-mwd",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "1b790964-240f-53f4-b2a6-8d220619418e",
    "title": "GIS-/Informatikspezialist/-in",
    "company": "Kantonale Verwaltung Graubünden - Amt für Landwirtschaft und Geoinformation",
    "city": "Chur",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Kantonale-Verwaltung-Graubnden---Amt-fr-Landwirtschaft-und-Geoinformation-GIS-Informatikspezialist-in",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "4b40fb61-4f11-5559-88fc-efaf6c726cc0",
    "title": "AI / Prompt Engineer - Deutschsprachig",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-AI--Prompt-Engineer---Deutschsprachig",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "f2cfc0d1-244b-538c-9d06-7ab0da5a90e5",
    "title": "Senior Software Engineer .NET & Angular",
    "company": "isolutions",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/isolutions-Senior-Software-Engineer-NET--Angular",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "7bfb053a-b5ba-5820-b99e-560a2cc608bc",
    "title": "Software Solution Architect",
    "company": "isolutions",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/isolutions-Software-Solution-Architect",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "888c492a-4c35-5d2f-95dc-46d8fa415692",
    "title": "Senior Power Platform Consultant",
    "company": "isolutions",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/isolutions-Senior-Power-Platform-Consultant",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "c61cacd3-7c0a-5cb5-9311-9344f4723a45",
    "title": "ML Researcher Model Adaption / Inference Optimization",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-ML-Researcher-Model-Adaption--Inference-Optimization",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "dfcc5ec8-443a-55c7-8d30-f15f8d198008",
    "title": "DeFi Yielding Expert",
    "company": "Dialectic",
    "city": "Zug",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Dialectic-DeFi-Yielding-Expert",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "b5c6ad1a-98d8-5b9f-b601-b5dc391aeff3",
    "title": "Internship - Developer, Blockchain",
    "company": "Dialectic",
    "city": "Zug",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Dialectic-Internship---Developer-Blockchain",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "4e7c00f3-486f-5f04-b35a-ae3eaf8e74cf",
    "title": "Internship - Data/ML/AI",
    "company": "Dialectic",
    "city": "Zug",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Dialectic-Internship---DataMLAI",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "c877e97d-2b9e-5fdd-8d8e-eb1d837204af",
    "title": "DeFi Engineer",
    "company": "Dialectic",
    "city": "Zug",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Dialectic-DeFi-Engineer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "0f5898ac-7d17-59d8-8f58-37666abfc34b",
    "title": "Java Software Engineer (a) - Bern",
    "company": "ERNI Schweiz AG",
    "city": "Bern",
    "canton": "BE",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/ERNI-Schweiz-AG-Java-Software-Engineer-a---Bern",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "127ecb18-5160-5bda-83c6-10ef980b2358",
    "title": "Cross-Domain Developer",
    "company": "Dialectic",
    "city": "Zug",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Dialectic-Cross-Domain-Developer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "8a86292d-6d2f-5ffa-ba94-fdabc719e8da",
    "title": "Senior Backend Developer (Drupal) 60–100%",
    "company": "Helga Digitalagentur GmbH",
    "city": "Bern",
    "canton": "BE",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Helga-Digitalagentur-GmbH-Senior-Backend-Developer-Drupal-60100",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "9f5cad56-ee1f-5b95-8daf-f2a7e5d84ac0",
    "title": "Professional AI Engineer",
    "company": "Docpier",
    "city": "Luzern",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Docpier-Professional-AI-Engineer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "57b873e1-7dcd-5f22-b565-92f6bf814c08",
    "title": "Sr Software Engineer Mobile [US-FinTech in 🇨🇭]",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-Sr-Software-Engineer-Mobile-US-FinTech-in-",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "f3b9e554-3d0e-5744-9d43-6a336080c5dd",
    "title": "AI Enablement & Automation Engineer (80-100%, f::m::d)",
    "company": "OnlineDoctor AG",
    "city": "St. Gallen",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/OnlineDoctor-AG-AI-Enablement--Automation-Engineer-80-100-fmd",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "7d281b38-ab60-59d6-8435-d1221a5933bf",
    "title": "Sr Flutter Engineer [US-FinTech in 🇨🇭]",
    "company": "Rockstar Recruiting AG",
    "city": "Zurich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Rockstar-Recruiting-AG-Sr-Flutter-Engineer-US-FinTech-in-",
    "sbb_min": 110,
    "permis_s": true
  },
  {
    "id": "1f02e4f6-3de4-5cd5-83e6-cfb86df76606",
    "title": "Senior AI Engineer",
    "company": "Docpier",
    "city": "Luzern",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Docpier-Senior-AI-Engineer",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "5214c501-b400-54b1-9dfc-5c17b8948e8d",
    "title": "Senior Solution Architect im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Senior-Solution-Architect-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "9a928c9a-92c9-5eae-83e4-2269c977f844",
    "title": "Senior Full Stack Engineer im IT-Consulting ab 80% - Zürich",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Senior-Full-Stack-Engineer-im-IT-Consulting-ab-80---Zrich",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "7f0c6dff-32cf-5e27-bd3a-a0b970b58c80",
    "title": "Senior Data & Analytics Engineer im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Senior-Data--Analytics-Engineer-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "0139d154-3dd7-57e1-b273-6122abddb6de",
    "title": "Technical Engineer im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Technical-Engineer-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "c5c5c036-31d9-59ae-95ad-cb6cd4f785c5",
    "title": "Data & Analytics Engineer im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Data--Analytics-Engineer-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "940f6f9d-8049-53c4-b21d-cbe5bb88ca22",
    "title": "Full Stack Engineer im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Bern",
    "canton": "BE",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Full-Stack-Engineer-im-IT-Consulting",
    "sbb_min": 65,
    "permis_s": true
  },
  {
    "id": "9c6449c7-4403-5281-a9a8-be3ef1b68f68",
    "title": "Integration Engineer im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Integration-Engineer-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  },
  {
    "id": "fa16bcae-462c-5882-b3b9-0fbbb04151e8",
    "title": "Integration Architect im IT-Consulting",
    "company": "Innovation Process Technology AG",
    "city": "Zürich",
    "canton": "ZH",
    "salary_min": 7917,
    "salary_max": 11250,
    "workload_min": 80,
    "workload_max": 100,
    "stellen": false,
    "url": "https://swissdevjobs.ch/jobs/Innovation-Process-Technology-AG-Integration-Architect-im-IT-Consulting",
    "sbb_min": 20,
    "permis_s": true
  }
];
window.SR_JOBS = window.JOB_LISTINGS;
