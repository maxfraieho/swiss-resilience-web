# 🚀 ACCORD-S v2.7 — Мануал розгортання для AI-агента

**Ціль:** замінити існуючу landing-сторінку в репозиторії `maxfraieho/swiss-resilience-web` на нову версію ACCORD-S v2.7. Cloudflare Pages підхопить зміни автоматично — **збірку робити не треба**.

---

## 📋 0. Передумови

- Доступ до репозиторію: `https://github.com/maxfraieho/swiss-resilience-web`
- Робоча гілка деплою: `main` (Cloudflare Pages слухає саме її)
- Ніяких `npm install`, `npm run build`, webpack чи babel-компіляції. Landing — це **чистий HTML + React 18 UMD + Babel Standalone у браузері**.
- Файли з проєкту Genspark Design, які треба перенести:
  - `ACCORD-S.html` → перейменувати в `index.html`
  - `app.jsx` → покласти поряд з `index.html`

---

## 📁 1. Що саме змінюємо в репозиторії

| Було (старе) | Стає (нове) | Дія |
|---|---|---|
| `index.html` (SwissRelief 2.6 shell) | `index.html` (ACCORD-S v2.7) | **overwrite** вмістом з `ACCORD-S.html` |
| — | `app.jsx` (в корені) | **create** з файлу `app.jsx` цього проєкту |
| `styles.css`, `kit-v2.css`, `colors_and_type.css`, `app-bundle.js`, `data.js`, `i18n.js`, `*.jsx` компоненти | без змін | **не чіпати** — вони обслуговують `/app/` (Telegram Mini App) |
| `mini-app/*`, `hub/*` | без змін | **не чіпати** |

> ⚠️ **Важливо:** нова landing є **самодостатньою** — вона не залежить ні від `styles.css`, ні від `data.js`, ні від `app-bundle.js`. Тому старі файли просто залишаються на місці для інших маршрутів (`/app/`, `/hub/`, `/mini-app/`).

---

## 🔧 2. Покрокова процедура (для агента)

### Крок 1. Клонувати або отримати доступ до репо
```bash
git clone https://github.com/maxfraieho/swiss-resilience-web.git
cd swiss-resilience-web
git checkout main
git pull origin main
```

### Крок 2. Створити резервну копію старої landing
```bash
mv index.html index.legacy-2.6.html
```
(Це страховка на випадок відкату. Cloudflare Pages не роздає `.legacy-*.html` як root.)

### Крок 3. Перенести два файли з проєкту Genspark

Скопіювати з проєкту Genspark Design:
- `ACCORD-S.html` → зберегти як `./index.html` у корені репо
- `app.jsx` → зберегти як `./app.jsx` у корені репо

**Перевірити:** у новому `index.html` в самому низу має бути тег:
```html
<script type="text/babel" src="app.jsx"></script>
```
Шлях відносний — тому `app.jsx` **обов'язково** лежить поруч.

### Крок 4. (Опційно) Замінити favicon на офіційний логотип
Якщо файл `accord_logo.jpg` вже є в репозиторії — оновити тег `<link rel="icon">` в `index.html`:
```html
<!-- замість вбудованого SVG data-URI: -->
<link rel="icon" type="image/jpeg" href="/accord_logo.jpg"/>
```
Якщо офіційного логотипу ще нема — залишити вбудований SVG-favicon.

### Крок 5. Commit + Push

```bash
git add index.html app.jsx index.legacy-2.6.html
git commit -m "feat(landing): ACCORD-S v2.7 — entonnoir Telegram + bénévoles

- Nouvelle identité de marque ACCORD Suisse
- Hero avec double parcours (Bénéficiaires / Bénévoles)
- Grille 4 piliers de confiance
- Catalogue emplois vérifiés (Art. 17 & 21a LEI)
- Section mentors Benevol Suisse (Art. 394 CO)
- Legacy 2.6 archivé dans index.legacy-2.6.html"
git push origin main
```

### Крок 6. Дочекатись Cloudflare Pages
- Автодеплой: **~30–90 сек**
- Перевірити статус на: `https://dash.cloudflare.com/pages/view/swiss-resilience-web`
- Або через GitHub: у комміті з'явиться зелена галочка від Cloudflare Pages bot.

---

## ✅ 3. Пост-деплой валідація

### 3.1 Візуальна перевірка (обов'язкова)
Відкрити в incognito-вікні:
- **`https://violin-integration.works/`** → має відрендеритись нова ACCORD landing (темний фон, червона плитка з логотипом S+хрест, hero з градієнтним заголовком).
- **`https://violin-integration.works/app/`** → має **не змінитись** — це TMA (Telegram Mini App), він живе окремо.

### 3.2 Функціональні контракти
| Що перевірити | Очікуваний результат |
|---|---|
| Language toggle FR/DE/UK/EN | Кнопки перемикаються, активна = біла заливка |
| Tab «Bénéficiaires ↔ Bénévoles» | Змінює порядок секцій (Jobs vs Volunteers перші) |
| CTA «Lancer ACCORD sur Telegram» | Відкриває `t.me/SwissResilienceHubBot?start=seeker` у новій вкладці |
| CTA «Rejoindre le réseau des mentors» | Відкриває `?start=volunteer` |
| Job cards → «Générer lettre suisse» | Відкриває `?start=letter_<id>` |
| Filter по кантонах (Tous/VD/GE/ZH/BE/FR) | Фільтрує сітку вакансій |
| `?tab=jobs` в URL | Автоматично активує Бénéficiaires |
| `?tab=volunteer` в URL | Автоматично активує Bénévoles |
| DevTools Console | **0 помилок**. Допустимі warn від Babel Standalone («in-browser transformer»). |

### 3.3 Технічні перевірки
```bash
# Перевірити, що сторінка справді самодостатня
curl -s https://violin-integration.works/ | grep -c "app.jsx"      # має бути 1
curl -s https://violin-integration.works/app.jsx | head -c 200     # має віддавати JSX-код
curl -sI https://violin-integration.works/ | grep -i cache          # Cloudflare cache HIT/MISS
```

---

## 🔄 4. Швидкий відкат (rollback)

Якщо щось пішло не так:

```bash
# Варіант A — swap назад
mv index.html index.v2.7-broken.html
mv index.legacy-2.6.html index.html
git add -A
git commit -m "revert: rollback to landing 2.6 legacy"
git push origin main
```

```bash
# Варіант B — через git revert
git revert HEAD --no-edit
git push origin main
```

Cloudflare Pages також дає можливість натиснути **«Rollback to this deployment»** прямо в UI (Deployments → попередній деплой → three dots).

---

## 🧾 5. Чек-лист для агента (TL;DR)

- [ ] `git pull` main
- [ ] `mv index.html index.legacy-2.6.html`
- [ ] скопіювати `ACCORD-S.html` → `index.html`
- [ ] скопіювати `app.jsx` → `app.jsx`
- [ ] переконатись, що `app.jsx` лежить у корені (не в підпапці)
- [ ] `git commit` + `git push origin main`
- [ ] дочекатись зеленого деплою Cloudflare (~1 хв)
- [ ] відкрити incognito → перевірити 4 контракти (лендинг, `/app/` не зачеплено, CTA працюють, console порожня)
- [ ] якщо треба відкат — swap файлів або `git revert`

---

## 📌 Важливі нотатки для агента

1. **НЕ виконувати `npm run build`** — build-крок відсутній. Це не помилка конфігу, це так задумано (React 18 UMD + Babel Standalone).
2. **НЕ чіпати** `mini-app/`, `hub/`, `app-bundle.js`, `data.js`, `styles.css` — вони обслуговують інші маршрути.
3. **НЕ додавати** новий `wrangler.toml` / `_headers` / `_redirects` — існуюча конфігурація Cloudflare Pages вже коректна.
4. Якщо `accord_logo.jpg` з'явиться в репо пізніше — просто замінити рядок `<link rel="icon">` (Крок 4). Решта може лишатись SVG-заглушкою.
5. Файли `PROMPT_GENSPARK_*.md` — це історична документація, не чіпати.

---

**Готово. Час деплою: ~3 хвилини від pull до валідації.**
