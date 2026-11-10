const { pre, c, esc } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
const BASE_CSS = `
body { font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 16px 24px 40px; background-color: #fafafa; color: #222; line-height: 1.6; }
h1 { color: #16213e; }
a { color: #0b63c5; }
nav { position: sticky; top: 0; background-color: #fafafa; padding: 10px 0; border-bottom: 1px solid #ddd; }
section { min-height: 380px; padding-top: 4px; border-bottom: 1px dashed #ccc; }
footer { margin-top: 24px; color: #777; font-size: 0.9rem; }
`;

// Each exercise has its own small document; base.css is always there (hidden).
const files = (html, extra = {}) => ({
  'base.css':   { code: BASE_CSS, hidden: true },
  'index.html': { code: html, editable: true },
  ...extra,
});

// part of the source between <tag ...> and </tag> (lower-cased), or ''
const inside = (code, tag) => {
  const m = code.match(new RegExp(`<${tag}[\\s>][\\s\\S]*?<\\/${tag}>`, 'i'));
  return m ? m[0].toLowerCase() : '';
};
const linkText = (t, sel, text) => t.$$(sel).find(a => a.textContent.trim().toLowerCase() === text.toLowerCase());

// ── 1 ────────────────────────────────────────────────────────────
const CAT_HTML = `<html>
<head>
  <meta charset="UTF-8">
  <title>Мій кіт Барсик</title>
</head>
<body>
  <h1>Мій кіт Барсик</h1>
  <p>Барсику три роки. Він любить спати на клавіатурі.</p>
</body>
</html>
`;

// ── 2 ────────────────────────────────────────────────────────────
const PIZZA_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <title>Документ</title>
</head>
<body>
  <h1>Піцерія Маріо</h1>
  <p>Наше меню:</p>
  <ul>
    <li>Маргарита — 180 грн</li>
    <li>Пепероні — 220 грн</li>
    <li>Чотири сири — 240 грн</li>
  </ul>
</body>
</html>
`;

const PIZZA_CSS = `/* Оформлення сторінки піцерії */
h1 {
  color: #c0392b;
}

li {
  margin-bottom: 6px;
}
`;

// ── 3 ────────────────────────────────────────────────────────────
const LINKS_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Корисні сайти</title>
</head>
<body>
  <h1>Корисні сайти для навчання</h1>
  <ul>
    <li>Вікіпедія</li>
    <li>MDN — довідник веб-розробника</li>
  </ul>
</body>
</html>
`;

// ── 4 ────────────────────────────────────────────────────────────
const LANDING_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Кав'ярня «Зерно»</title>
</head>
<body>
  <h1>Кав'ярня «Зерно»</h1>
  <nav>
    <a href="#">Про нас</a> |
    <a href="#">Меню</a> |
    <a href="#">Контакти</a>
  </nav>

  <section>
    <h2>Про нас</h2>
    <p>Ми варимо каву з 2015 року і печемо круасани щоранку.</p>
  </section>

  <section>
    <h2>Меню</h2>
    <p>Еспресо, капучино, какао і домашній лимонад.</p>
  </section>

  <section>
    <h2>Контакти</h2>
    <p>Київ, вул. Кавова, 7 · щодня з 8:00 до 20:00</p>
  </section>
</body>
</html>
`;

// ── 5 ────────────────────────────────────────────────────────────
const MESSY_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Мій день</title>
</head>
<body>
  <h1>Мій день</h1>
  <p>
    Котик сів на підвіконня,
    дивиться на сонце.
  </p>
  <h2>Уроки сьогодні</h2>
  <ul><li>Математика</li><li>Українська мова</li><li>Інформатика</li></ul>
</body>
</html>
`;

// ── 6 ────────────────────────────────────────────────────────────
const COMMENTS_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Шкільний гурток</title>
</head>
<body>
  <h1>Гурток робототехніки</h1>
  <nav>
    <a href="#">Розклад</a> |
    <a href="#">Проєкти</a>
  </nav>
  <p>Збираємось щовівторка о 15:00 в кабінеті 214.</p>
  <p>TODO: додати фото з виставки</p>
  <footer>Гурток робототехніки · 2026</footer>
</body>
</html>
`;

// the two phrases end up on different lines of the rendered page?
const onDifferentLines = (t, a, b) => {
  const top = phrase => {
    const walker = t.doc.createTreeWalker(t.doc.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const i = n.data.indexOf(phrase);
      if (i < 0) continue;
      const r = t.doc.createRange();
      r.setStart(n, i);
      r.setEnd(n, i + 1);
      return r.getBoundingClientRect().top;
    }
    return null;
  };
  const ya = top(a), yb = top(b);
  return ya != null && yb != null && Math.abs(ya - yb) > 5;
};

window.LESSON = {
  id: 'lesson-2',
  num: '02',
  title: 'Стандарти HTML-документа',
  back: '../lesson-2.html',
  next: '../lesson-3.html',
  files: files(CAT_HTML),
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'DOCTYPE і структура документа',
      files: files(CAT_HTML),
      focus: 'index.html',
      body: `
        <p>Праворуч — сторінка про кота Барсика. Ти працюєш у файлі ${c('index.html')}, а результат одразу видно в браузері.</p>
        <p>Перший рядок будь-якого HTML-файлу — оголошення типу документа. Воно каже браузеру: «це HTML5».</p>
        ${pre(`<!DOCTYPE html>
<html>
  ...
</html>`, 'html')}
        <div class="note">${c('<!DOCTYPE html>')} — завжди <strong>найперший</strong> рядок файлу, до нього нічого не пишуть.</div>
        <p>Далі — стандартна структура з трьох частин:</p>
        ${pre(`<!DOCTYPE html>
<html lang="uk">

  <head>
    <!-- інформація про сторінку -->
  </head>

  <body>
    <!-- видимий вміст -->
  </body>

</html>`, 'html')}
        <ul>
          <li>${c('<head>')} — невидима частина: назва вкладки, кодування, підключення CSS.</li>
          <li>${c('<body>')} — усе, що бачить відвідувач.</li>
          <li>Атрибут ${c('lang="uk"')} у тегу ${c('<html>')} повідомляє браузеру й пошуковикам мову сторінки.</li>
        </ul>`,
      tasks: [
        {
          text: `<p>У файлі бракує оголошення типу документа. Додай його <strong>першим рядком</strong> ${c('index.html')}.</p>`,
          hint: `<p>Воно пишеться в кутових дужках зі знаком оклику, перед тегом ${c('<html>')}.</p>`,
          solution: { file: 'index.html', code: `<!DOCTYPE html>`, before: '<html' },
          check: t => {
            const code = t.code('index.html').replace(/^﻿/, '').trimStart();
            if (/^<!doctype html>/i.test(code)) return true;
            return /<!doctype html>/i.test(code)
              ? 'DOCTYPE є, але не першим рядком. Перенеси його на самий верх файлу.'
              : 'Не знайдено <code>&lt;!DOCTYPE html&gt;</code> у першому рядку.';
          },
        },
        {
          text: `<p>Сторінка написана українською. Повідом про це браузеру: вкажи мову ${c('uk')} у тегу ${c('<html>')}.</p>`,
          hint: `<p>Мову задає атрибут ${c('lang')}.</p>`,
          solution: { file: 'index.html', code: `<html lang="uk">`, replace: '<html>' },
          check: t => {
            const lang = t.doc.documentElement.getAttribute('lang');
            if (!lang) return 'У тегу <code>&lt;html&gt;</code> ще немає атрибута <code>lang</code>.';
            return lang.trim().toLowerCase() === 'uk' || `Зараз мова — <code>${esc(lang)}</code>, а потрібна <code>uk</code>.`;
          },
        },
        {
          text: `<p>Додай на сторінку ще один абзац ${c('<p>')} про Барсика — наприклад, що він любить. Абзац має бути у <strong>видимій</strong> частині документа.</p>`,
          hint: `<p>Видимий вміст живе між ${c('<body>')} і ${c('</body>')}. Допиши новий ${c('<p>')} одразу після першого.</p>`,
          solution: { file: 'index.html', code: `  <p>Ще він обожнює ганятися за клубком ниток.</p>` },
          check: t => {
            const body = inside(t.code('index.html'), 'body');
            if (!body) return 'Не знайдено пари тегів <code>&lt;body&gt;</code> … <code>&lt;/body&gt;</code>.';
            const ps = (body.match(/<p[\s>]/g) || []).length;
            if (ps < 2) return 'Між <code>&lt;body&gt;</code> і <code>&lt;/body&gt;</code> поки лише один абзац <code>&lt;p&gt;</code>.';
            return t.$$('body p').filter(p => p.textContent.trim()).length >= 2 || 'Новий абзац порожній — напиши в ньому якийсь текст.';
          },
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: '&lt;head&gt; і &lt;title&gt;',
      files: files(PIZZA_HTML, { 'style.css': { code: PIZZA_CSS, editable: false } }),
      focus: 'index.html',
      body: `
        <p>${c('<head>')} містить <strong>мета-дані</strong> — інформацію, яку браузер використовує, але не показує на сторінці. Типовий ${c('<head>')} виглядає так:</p>
        ${pre(`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Назва вкладки</title>
  <link rel="stylesheet" href="style.css">
</head>`, 'html')}
        <ul>
          <li>${c('charset="UTF-8"')} — щоб кирилиця й інші символи показувались правильно.</li>
          <li>${c('viewport')} — щоб сторінка нормально виглядала на телефоні.</li>
          <li>${c('<title>')} — текст у вкладці браузера та в результатах пошуку Google.</li>
          <li>${c('<link>')} — підключає CSS-файл.</li>
        </ul>
        <div class="note">💡 Хороший ${c('<title>')} — короткий і точно описує сторінку (до 60 символів).</div>
        <p>Праворуч — сторінка піцерії. Її ${c('<head>')} поки майже порожній.</p>`,
      tasks: [
        {
          text: `<p>Додай у ${c('<head>')} два теги ${c('<meta>')}: кодування ${c('UTF-8')} і налаштування ${c('viewport')} для мобільних.</p>`,
          hint: `<p>Обидва ${c('<meta>')} — одиночні теги (без закривального). Їх прийнято ставити на початку ${c('<head>')}, перед ${c('<title>')}.</p>`,
          solution: { file: 'index.html', code: `  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">`, before: '<title>' },
          check: t => {
            const cs = t.$('head meta[charset]');
            if (!cs) return 'Не знайдено <code>&lt;meta charset="UTF-8"&gt;</code> у <code>&lt;head&gt;</code>.';
            if (cs.getAttribute('charset').trim().toLowerCase() !== 'utf-8') return 'Кодування має бути <code>UTF-8</code>.';
            const vp = t.$('head meta[name="viewport"]');
            if (!vp) return 'Є charset, але бракує <code>&lt;meta name="viewport" …&gt;</code>.';
            return /width\s*=\s*device-width/i.test(vp.getAttribute('content') || '') ||
              'У viewport атрибут <code>content</code> має містити <code>width=device-width, initial-scale=1.0</code>.';
          },
        },
        {
          text: `<p>Зараз у вкладці браузера було б написано «Документ» — це нічого не каже відвідувачу. Зміни назву вкладки на ${c('Піцерія Маріо')}.</p>`,
          hint: `<p>Назву вкладки задає тег ${c('<title>')} всередині ${c('<head>')}. Заміни текст між ${c('<title>')} і ${c('</title>')}.</p>`,
          solution: { file: 'index.html', code: `<title>Піцерія Маріо</title>`, replace: '<title>Документ</title>' },
          check: t => {
            if (!t.$('head title')) return 'Тег <code>&lt;title&gt;</code> має бути всередині <code>&lt;head&gt;</code>.';
            const title = t.doc.title.trim().replace(/\s+/g, ' ');
            if (title === 'Документ') return 'У <code>&lt;title&gt;</code> досі «Документ».';
            return title.toLowerCase() === 'піцерія маріо' || `Назва вкладки зараз «${esc(title)}», а потрібна «Піцерія Маріо».`;
          },
        },
        {
          text: `<p>У проєкті є файл ${c('style.css')} з оформленням сторінки (вкладка зверху). Підключи його в ${c('<head>')} тегом ${c('<link>')}.</p>`,
          hint: `<p>Тегу ${c('<link>')} потрібні два атрибути: ${c('rel')} (завжди ${c('stylesheet')}) і ${c('href')} (шлях до файлу).</p>`,
          solution: { file: 'index.html', code: `  <link rel="stylesheet" href="style.css">`, before: '</head>' },
          check: t => {
            const head = inside(t.code('index.html'), 'head');
            if (!head) return 'Не знайдено пари тегів <code>&lt;head&gt;</code> … <code>&lt;/head&gt;</code>.';
            const link = head.match(/<link[^>]*>/g)?.find(l => /href\s*=\s*["']?style\.css/.test(l));
            if (!link) return 'У <code>&lt;head&gt;</code> немає <code>&lt;link&gt;</code> з <code>href="style.css"</code>.';
            return /rel\s*=\s*["']?stylesheet/.test(link) || 'Тегу <code>&lt;link&gt;</code> бракує <code>rel="stylesheet"</code>.';
          },
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'Посилання &lt;a&gt;',
      files: files(LINKS_HTML),
      focus: 'index.html',
      body: `
        <p>Тег ${c('<a>')} (anchor — якір) створює посилання. Атрибут ${c('href')} вказує, <em>куди</em> воно веде, а текст між тегами — те, на що клікають.</p>
        ${pre(`<!-- Зовнішнє посилання -->
<a href="https://google.com">Відкрити Google</a>

<!-- Внутрішня сторінка -->
<a href="about.html">Про нас</a>

<!-- Відкрити в новій вкладці -->
<a href="https://google.com" target="_blank">Google</a>`, 'html')}
        <ul>
          <li>Зовнішні посилання починаються з ${c('https://')}.</li>
          <li>Внутрішні — просто ім'я файлу: ${c('about.html')}.</li>
          <li>${c('target="_blank"')} — відкрити в новій вкладці.</li>
        </ul>`,
      tasks: [
        {
          text: `<p>Перетвори слово «Вікіпедія» у списку на посилання, що веде на ${c('https://uk.wikipedia.org')}.</p>`,
          hint: `<p>Обгорни текст пункту тегом ${c('<a>')} — сам ${c('<li>')} залишається.</p>`,
          solution: { file: 'index.html', code: `<li><a href="https://uk.wikipedia.org">Вікіпедія</a></li>`, replace: '<li>Вікіпедія</li>' },
          check: t => {
            const a = linkText(t, 'a', 'Вікіпедія');
            if (!a) return 'Слово «Вікіпедія» ще не є посиланням <code>&lt;a&gt;</code>.';
            const href = (a.getAttribute('href') || '').trim();
            if (!href) return 'У посилання немає атрибута <code>href</code>.';
            return /^https:\/\/uk\.wikipedia\.org\/?$/i.test(href) || `Посилання веде на <code>${esc(href)}</code>, а має на <code>https://uk.wikipedia.org</code>.`;
          },
        },
        {
          text: `<p>Зроби пункт «MDN — довідник веб-розробника» посиланням на ${c('https://developer.mozilla.org')}, яке відкривається <strong>в новій вкладці</strong>.</p>`,
          hint: `<p>Крім ${c('href')}, потрібен ще один атрибут — той, що відповідає за нову вкладку.</p>`,
          solution: { file: 'index.html', code: `<li><a href="https://developer.mozilla.org" target="_blank">MDN — довідник веб-розробника</a></li>`, replace: '<li>MDN — довідник веб-розробника</li>' },
          check: t => {
            const a = t.$$('a').find(x => /mdn/i.test(x.textContent));
            if (!a) return 'Текст про MDN ще не є посиланням <code>&lt;a&gt;</code>.';
            const href = (a.getAttribute('href') || '').trim();
            if (!/^https:\/\/developer\.mozilla\.org\/?$/i.test(href)) return 'Посилання на MDN має вести на <code>https://developer.mozilla.org</code>.';
            return a.getAttribute('target') === '_blank' || 'Посилання на MDN ще відкривається в тій самій вкладці. Додай <code>target="_blank"</code>.';
          },
        },
        {
          text: `<p>Під списком додай посилання з текстом «Про мене», яке веде на <strong>внутрішню</strong> сторінку сайту ${c('about.html')}.</p>`,
          hint: `<p>Для внутрішньої сторінки в ${c('href')} пишуть просто ім'я файлу, без ${c('https://')}. Посилання можна покласти в окремий абзац ${c('<p>')}.</p>`,
          solution: { file: 'index.html', code: `  <p><a href="about.html">Про мене</a></p>` },
          check: t => {
            const a = linkText(t, 'a', 'Про мене');
            if (!a) return 'Не знайдено посилання <code>&lt;a&gt;</code> з текстом «Про мене».';
            const href = (a.getAttribute('href') || '').trim();
            return href === 'about.html' || `Посилання «Про мене» веде на <code>${esc(href || '(порожньо)')}</code>, а має на <code>about.html</code>.`;
          },
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'Якоря — переходи по сторінці',
      files: files(LANDING_HTML),
      focus: 'index.html',
      body: `
        <p>Посилання може вести не на іншу сторінку, а на <strong>розділ тієї самої</strong>. Для цього розділу дають ${c('id')}, а в ${c('href')} пишуть ${c('#')} і цей id:</p>
        ${pre(`<!-- Посилання-якір (зазвичай у навігації) -->
<a href="#contacts">Перейти до контактів</a>

<!-- ... далі по сторінці ... -->

<!-- Цільовий розділ -->
<section id="contacts">
  <h2>Контакти</h2>
  ...
</section>`, 'html')}
        <div class="note">💡 Так роблять меню на односторінкових сайтах: «Про нас», «Послуги», «Контакти» — клік прокручує сторінку до потрібного розділу.</div>
        <p>Праворуч — сайт кав'ярні. Посилання в меню поки ведуть на ${c('#')}, тобто нікуди.</p>`,
      tasks: [
        {
          text: `<p>Дай розділу ${c('<section>')} з заголовком «Контакти» ідентифікатор ${c('contacts')}.</p>`,
          hint: `<p>Атрибут ${c('id')} пишеться у відкривальному тегу ${c('<section>')}.</p>`,
          solution: { file: 'index.html', code: `<section id="contacts">\n    <h2>Контакти</h2>`, replace: '<section>\n    <h2>Контакти</h2>' },
          check: t => {
            const el = t.$('#contacts');
            if (!el) return 'На сторінці немає елемента з <code>id="contacts"</code>.';
            return (el.tagName === 'SECTION' && /контакти/i.test(el.querySelector('h2')?.textContent || '')) ||
              '<code>id="contacts"</code> має бути в тегу <code>&lt;section&gt;</code>, де заголовок «Контакти».';
          },
        },
        {
          text: `<p>Тепер зроби так, щоб пункт меню «Контакти» вів до цього розділу. Клікни на нього в перегляді — сторінка має прокрутитись.</p>`,
          hint: `<p>У ${c('href')} якоря пишуть ${c('#')} і одразу id розділу, без пробілів.</p>`,
          solution: { file: 'index.html', code: `<a href="#contacts">Контакти</a>`, replace: '<a href="#">Контакти</a>' },
          check: t => {
            const a = linkText(t, 'nav a', 'Контакти');
            if (!a) return 'Не знайдено в <code>&lt;nav&gt;</code> посилання з текстом «Контакти».';
            const href = (a.getAttribute('href') || '').trim();
            return href === '#contacts' || `Посилання «Контакти» веде на <code>${esc(href || '(порожньо)')}</code>, а має на <code>#contacts</code>.`;
          },
        },
        {
          text: `<p>Самостійно: зроби робочим пункт меню «Меню». Назву для ${c('id')} придумай сам (латиницею, без пробілів).</p>`,
          hint: `<p>Два кроки, як і для контактів: ${c('id')} у ${c('<section>')} з заголовком «Меню», а потім ${c('#')} + цей id у ${c('href')} посилання.</p>`,
          check: t => {
            const a = linkText(t, 'nav a', 'Меню');
            if (!a) return 'Не знайдено в <code>&lt;nav&gt;</code> посилання з текстом «Меню».';
            const href = (a.getAttribute('href') || '').trim();
            if (!href.startsWith('#') || href.length < 2) return 'Посилання «Меню» ще веде нікуди. У <code>href</code> має бути <code>#</code> і id розділу.';
            let target = null;
            try { target = t.doc.getElementById(decodeURIComponent(href.slice(1))); } catch {}
            if (!target) return `Посилання веде на <code>${esc(href)}</code>, але елемента з <code>id="${esc(href.slice(1))}"</code> на сторінці немає.`;
            const h2 = target.closest('section')?.querySelector('h2') || target.querySelector?.('h2');
            return /^меню$/i.test(h2?.textContent.trim() || '') ||
              `<code>id="${esc(href.slice(1))}"</code> стоїть не на розділі «Меню».`;
          },
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'Пробіли і відступи в коді',
      files: files(MESSY_HTML),
      focus: 'index.html',
      body: `
        <p>Браузер <strong>ігнорує</strong> зайві пробіли, переноси рядків і відступи в HTML. Кілька пробілів підряд він стискає до одного. Тому ці два варіанти виглядають на сторінці однаково:</p>
        ${pre(`<p>Привіт</p><p>Світ</p>

<p>Привіт</p>
<p>Світ</p>`, 'html')}
        <p>Пробіли і переноси потрібні не браузеру, а <strong>людям</strong> — щоб код було легко читати. Вкладені елементи зсувають вправо на 2 пробіли (або один Tab):</p>
        ${pre(`<!-- Погано — структуру не видно -->
<ul><li>HTML</li><li>CSS</li></ul>

<!-- Добре — структура видна одразу -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>`, 'html')}
        <div class="note">💡 Кожен рівень вкладеності — один відступ. Між великими блоками коду залишай порожній рядок.</div>`,
      tasks: [
        {
          text: `<p>У коді вірш про котика записаний у два рядки, але на сторінці він злипся в один. Зроби так, щоб на сторінці кожен рядок вірша був <strong>окремим абзацом</strong>.</p>`,
          hint: `<p>Перенос рядка в коді браузер не бачить. Кожен рядок вірша треба загорнути у власний ${c('<p>')}.</p>`,
          solution: {
            file: 'index.html',
            code: `<p>Котик сів на підвіконня,</p>\n  <p>дивиться на сонце.</p>`,
            replace: '<p>\n    Котик сів на підвіконня,\n    дивиться на сонце.\n  </p>',
          },
          check: t => {
            if (!/котик сів/i.test(t.doc.body.textContent) || !/дивиться на сонце/i.test(t.doc.body.textContent))
              return 'Обидва рядки вірша мають залишитись на сторінці.';
            const p1 = t.$$('p').find(p => /котик сів/i.test(p.textContent));
            const p2 = t.$$('p').find(p => /дивиться на сонце/i.test(p.textContent));
            if (p1 && p2 && p1 !== p2) return true;
            return onDifferentLines(t, 'Котик сів', 'дивиться')
              ? 'Рядки вже на різних рядках — але завдання просить саме два окремі абзаци <code>&lt;p&gt;</code>.'
              : 'Рядки вірша досі в одному абзаці. Розбий його на два <code>&lt;p&gt;</code>.';
          },
        },
        {
          text: `<p>Список уроків записаний в один рядок — його важко читати. Відформатуй його: кожен ${c('<li>')} на окремому рядку з відступом, а ${c('<ul>')} і ${c('</ul>')} — на своїх рядках.</p>`,
          hint: `<p>Поставь курсор перед кожним ${c('<li>')} і перед ${c('</ul>')}, натисни Enter, а потім додай пробіли (або Tab) перед ${c('<li>')}. Подивись: сторінка праворуч не зміниться!</p>`,
          solution: {
            file: 'index.html',
            code: `<ul>\n    <li>Математика</li>\n    <li>Українська мова</li>\n    <li>Інформатика</li>\n  </ul>`,
            replace: '<ul><li>Математика</li><li>Українська мова</li><li>Інформатика</li></ul>',
          },
          check: t => {
            if (t.$$('ul li').length < 3) return 'У списку мають залишитись усі три уроки.';
            const ul = t.code('index.html').match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
            if (!ul) return 'Не знайдено пари тегів <code>&lt;ul&gt;</code> … <code>&lt;/ul&gt;</code>.';
            const lines = ul[1].split('\n');
            const liLines = lines.filter(l => /<li/i.test(l));
            if (liLines.some(l => (l.match(/<li/gi) || []).length > 1) || /<li/i.test(lines[0]))
              return 'Кожен <code>&lt;li&gt;</code> має стояти на окремому рядку.';
            if (!liLines.every(l => /^[ \t]+<li/i.test(l))) return 'Рядки з <code>&lt;li&gt;</code> мають починатися з відступу (пробіли або Tab).';
            if (lines[lines.length - 1].trim()) return '<code>&lt;/ul&gt;</code> має стояти на окремому рядку.';
            const ulIndent = t.code('index.html').match(/^([ \t]*)<ul/im)?.[1].length ?? 0;
            return liLines.every(l => l.match(/^[ \t]*/)[0].length > ulIndent) ||
              'Відступ у <code>&lt;li&gt;</code> має бути більшим, ніж у <code>&lt;ul&gt;</code> — так видно, що пункти вкладені.';
          },
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'Коментарі &lt;!-- --&gt;',
      files: files(COMMENTS_HTML),
      focus: 'index.html',
      body: `
        <p>Коментар — це нотатка в коді, яку браузер <strong>не показує</strong>. Коментарі пояснюють код тобі й іншим розробникам:</p>
        ${pre(`<!-- Це коментар — браузер його ігнорує -->

<header>
  <!-- Навігація -->
  <nav>...</nav>
</header>

<!-- TODO: додати форму зворотного зв'язку -->`, 'html')}
        <div class="note">⚠ Коментарі видно у вихідному коді сторінки («Переглянути код» у браузері). Ніколи не пиши в коментарях паролі чи особисті дані.</div>`,
      tasks: [
        {
          text: `<p>Підпиши блок навігації: просто над тегом ${c('<nav>')} додай коментар зі словом «Навігація».</p>`,
          hint: `<p>Коментар починається з ${c('<!--')} і закінчується ${c('-->')}.</p>`,
          solution: { file: 'index.html', code: `  <!-- Навігація -->`, before: '<nav>' },
          check: t => {
            const code = t.code('index.html');
            if (!/<!--[\s\S]*?-->\s*<nav/i.test(code)) return 'Безпосередньо над <code>&lt;nav&gt;</code> немає коментаря <code>&lt;!-- … --&gt;</code>.';
            return /<!--[^>]*навігац[\s\S]*?-->\s*<nav/i.test(code) || 'Коментар над <code>&lt;nav&gt;</code> є, але в ньому має бути слово «Навігація».';
          },
        },
        {
          text: `<p>Нотатку «TODO: додати фото з виставки» розробник залишив для себе, а її бачать усі відвідувачі. Зроби так, щоб вона зникла зі сторінки, але <strong>залишилась у коді</strong>.</p>`,
          hint: `<p>Перетвори абзац на коментар: замість ${c('<p>')} і ${c('</p>')} постав ${c('<!--')} і ${c('-->')}.</p>`,
          solution: { file: 'index.html', code: `<!-- TODO: додати фото з виставки -->`, replace: '<p>TODO: додати фото з виставки</p>' },
          check: t => {
            if (/todo/i.test(t.doc.body.innerText)) return 'Нотатку TODO досі видно на сторінці.';
            return /<!--[\s\S]*?todo[\s\S]*?-->/i.test(t.code('index.html')) ||
              'Нотатка зникла зі сторінки, але й з коду теж. Залиш її в коді — як коментар.';
          },
        },
      ],
    },
  ],
};
