const { pre, c } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
const BASE_CSS = `
body { font-family: Arial, sans-serif; background-color: #f5f5f5; color: #222; line-height: 1.6; }
.site-header { background-color: #16213e; color: white; padding: 20px 32px; display: flex; align-items: center; justify-content: space-between; }
.site-nav { display: flex; gap: 8px; }
.site-nav a { color: #ccc; }
.main-content { max-width: 800px; margin: 32px auto; padding: 0 24px; display: flex; flex-direction: column; gap: 32px; }
.game-article { background: white; padding: 24px; border-radius: 8px; }
.article-text { margin-bottom: 16px; line-height: 1.7; }
.tags-row { display: flex; gap: 8px; flex-wrap: wrap; }
.sidebar { max-width: 800px; margin: 0 auto 32px; padding: 0 24px; }
.sidebar-title { margin-bottom: 12px; }
.popular-list { padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
.site-footer { background-color: #16213e; color: #aaa; padding: 16px 32px; text-align: center; font-size: 0.85rem; }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>GameZone Blog</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <h1 id="site-title" class="header-title">GameZone Blog</h1>
    <nav class="site-nav">
      <a href="#">Головна</a>
      <a href="#">Огляди</a>
      <a href="#">Новини</a>
      <a href="#">Топ-100</a>
    </nav>
  </header>

  <main class="main-content">
    <article class="game-article">
      <h2 class="section-title featured">Топ-ігри місяця</h2>
      <p class="article-text">Цього місяця гравці обирають:
        <span class="highlight">Elden Ring</span>,
        <span class="highlight">Hollow Knight</span> та
        <span class="highlight">Celeste</span>.</p>
      <div class="tags-row">
        <span class="game-tag">Action</span>
        <span class="game-tag">RPG</span>
        <span class="game-tag">Indie</span>
      </div>
    </article>

    <article class="game-article">
      <h2 class="section-title">Нові надходження</h2>
      <p class="article-text">Особливу увагу привертає
        <span class="highlight">Hollow Knight: Silksong</span>.</p>
      <div class="tags-row">
        <span class="game-tag">Metroidvania</span>
        <span class="game-tag">Indie</span>
      </div>
    </article>
  </main>

  <aside class="sidebar">
    <h3 class="sidebar-title">Популярне зараз</h3>
    <ul class="popular-list">
      <li><a href="https://minecraft.net">Minecraft</a></li>
      <li><a href="https://stardewvalley.net">Stardew Valley</a></li>
      <li><a href="#">Zelda: TotK</a></li>
      <li><a href="#">Cyberpunk 2077</a></li>
    </ul>
  </aside>

  <footer class="site-footer">
    <p>GameZone Blog · 2026</p>
  </footer>
</body>
</html>
`;

const STYLE_CSS = `/* Пиши свої CSS-правила тут.
   Перегляд праворуч оновлюється сам,
   а «▶ Перевірити» перевіряє завдання. */

`;

window.LESSON = {
  id: 'lesson-3',
  num: '03',
  title: 'CSS Селектори',
  back: '../lesson-3.html',
  next: '../lesson-4.html',
  files: {
    'base.css':   { code: BASE_CSS, hidden: true },
    'index.html': { code: PAGE_HTML, editable: true },
    'style.css':  { code: STYLE_CSS, editable: true },
  },
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'Анатомія CSS-правила',
      body: `
        <p>Праворуч — блог <strong>GameZone</strong>. У редакторі два файли: ${c('index.html')} (структура) і ${c('style.css')} (оформлення). Ти будеш працювати переважно в ${c('style.css')}.</p>
        <p>Кожне CSS-правило має однакову будову:</p>
        ${pre(`h1 {
  color: blue;
}`)}
        <ul>
          <li><strong>Селектор</strong> — ${c('h1')}: <em>який</em> елемент стилізуємо.</li>
          <li><strong>Властивість</strong> — ${c('color')}: <em>що</em> змінюємо.</li>
          <li><strong>Значення</strong> — ${c('blue')}: <em>як</em> змінюємо.</li>
          <li><strong>Декларація</strong> — ${c('color: blue;')}: властивість + значення. Завжди закінчується ${c(';')}.</li>
        </ul>`,
      tasks: [
        {
          text: `<p>У ${c('style.css')} напиши правило для селектора ${c('body')}, яке змінює колір фону сторінки (${c('background-color')}) на ${c('#fffaf0')}.</p>`,
          hint: `<p>Селектор — ${c('body')}, властивість — ${c('background-color')}. Не забудь фігурні дужки та крапку з комою.</p>`,
          solution: { file: 'style.css', code: `body {\n  background-color: #fffaf0;\n}` },
          check: t => t.is('body', 'background-color', '#fffaf0') ||
            'Фон сторінки ще не #fffaf0. Перевір селектор <code>body</code> і назву властивості <code>background-color</code>.',
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: 'Три способи підключити CSS',
      focus: 'index.html',
      body: `
        <p><strong>1. Вбудований стиль (inline)</strong> — атрибут ${c('style')} прямо в тезі:</p>
        ${pre(`<p style="color: red; font-size: 20px;">Текст</p>`, 'html')}
        <p><strong>2. Тег ${c('<style>')}</strong> всередині ${c('<head>')}:</p>
        ${pre(`<head>
  <style>
    p { color: red; }
  </style>
</head>`, 'html')}
        <p><strong>3. Зовнішній файл ✅</strong> — підключається тегом ${c('<link>')}:</p>
        ${pre(`<link rel="stylesheet" href="style.css">`, 'html')}
        <div class="note">Перші два способи — антипатерн: стилі розкидані по HTML, і щоб змінити один колір, доведеться правити кожен тег. Зовнішній файл керує всім сайтом з одного місця.</div>
        <p>Відкрий вкладку ${c('index.html')} — у ${c('<head>')} уже є ${c('<link>')} на ${c('style.css')}.</p>`,
      tasks: [
        {
          text: `<p>Щоб відчути різницю, додай <strong>inline-стиль</strong> до тегу ${c('<footer>')} в ${c('index.html')}: атрибут ${c('style')} зі значенням ${c('font-style: italic;')}.</p>`,
          solution: { file: 'index.html', replace: '<footer class="site-footer">', code: '<footer class="site-footer" style="font-style: italic;">' },
          hint: `<p>Атрибут пишеться всередині відкривального тегу, поруч з ${c('class')}:</p>${pre(`<footer class="site-footer" style="font-style: italic;">`, 'html')}`,
          check: t => {
            const f = t.$('footer');
            if (!f) return 'Тег <code>&lt;footer&gt;</code> зник з index.html — натисни «↺ Скинути код», якщо щось зламалось.';
            if (!f.hasAttribute('style')) return 'У тегу <code>&lt;footer&gt;</code> ще немає атрибута <code>style</code>.';
            return t.is('footer', 'font-style', 'italic') || 'Атрибут <code>style</code> є, але текст футера не курсивний. Перевір <code>font-style: italic;</code>';
          },
        },
        {
          text: `<p>Переконайся, що в ${c('<head>')} залишився тег ${c('<link>')} з ${c('rel="stylesheet"')} і ${c('href="style.css"')} — без нього жодне правило з ${c('style.css')} не спрацює.</p>`,
          check: t => t.has('index.html', /<link[^>]*rel=["']stylesheet["'][^>]*href=["']style\.css["']|<link[^>]*href=["']style\.css["'][^>]*rel=["']stylesheet["']/i) ||
            'Не знайдено <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> у index.html.',
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'Селектор за тегом і універсальний *',
      focus: 'style.css',
      body: `
        <p><strong>Селектор за тегом</strong> — назва тегу без кутових дужок. Вибирає <em>всі</em> такі елементи:</p>
        ${pre(`p  { color: green; }
h1 { color: maroon; }`)}
        <p><strong>Універсальний селектор</strong> ${c('*')} вибирає <em>кожен</em> елемент сторінки. Найчастіше ним скидають відступи, які браузер додає сам:</p>
        ${pre(`* {
  margin: 0;
  padding: 0;
}`)}
        <div class="note">${c('*')} має найнижчу специфічність (0) — будь-яке інше правило його перевизначить.</div>`,
      tasks: [
        {
          text: `<p>За допомогою ${c('*')} обнули ${c('margin')} і ${c('padding')} для всіх елементів. Подивись, як зникнуть білі поля навколо шапки.</p>`,
          solution: { file: 'style.css', code: `* {\n  margin: 0;\n  padding: 0;\n}` },
          check: t => {
            if (!t.rule('*')) return 'Не знайдено правила з селектором <code>*</code>.';
            return (t.is('body', 'margin-top', '0px') && t.is('h1', 'margin-top', '0px')) ||
              'Правило <code>*</code> є, але відступи не обнулені. Потрібні <code>margin: 0;</code> і <code>padding: 0;</code>';
          },
        },
        {
          text: `<p>Зроби <strong>всі</strong> заголовки ${c('h2')} темно-синіми: ${c('color: #0f3460')}.</p>`,
          solution: { file: 'style.css', code: `h2 {\n  color: #0f3460;\n}` },
          check: t => t.declIs('h2', 'color', '#0f3460') ||
            'Потрібне правило з селектором <code>h2</code> і <code>color: #0f3460;</code>',
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'Селектор за класом',
      body: `
        <p>Атрибут ${c('class')} дає елементу «ярлик». У CSS перед назвою класу ставлять <strong>крапку</strong>:</p>
        ${pre(`<p class="title">Заголовок</p>`, 'html')}
        ${pre(`.title { color: teal; }`)}
        <p>Один клас можна дати багатьом елементам — і всі вони отримають однаковий стиль. А один елемент може мати <strong>кілька класів</strong> через пробіл:</p>
        ${pre(`<h1 class="title uppercase">Заголовок</h1>`, 'html')}
        <p>Знайди в ${c('index.html')} елементи з класами ${c('game-tag')} і ${c('highlight')}.</p>`,
      tasks: [
        {
          text: `<p>Перетвори всі теги-бейджики ${c('.game-tag')} на «таблетки»: фон ${c('#e94560')}, білий текст (${c('white')}).</p>`,
          solution: { file: 'style.css', code: `.game-tag {\n  background-color: #e94560;\n  color: white;\n}` },
          check: t => {
            if (!t.rule('.game-tag')) return 'Не знайдено правила з селектором <code>.game-tag</code> (з крапкою!).';
            if (!t.all('.game-tag', 'background-color', '#e94560')) return 'Фон бейджиків ще не <code>#e94560</code>.';
            return t.all('.game-tag', 'color', 'white') || 'Текст бейджиків має бути білим — <code>color: white;</code>';
          },
        },
        {
          text: `<p>Додай бейджикам ${c('padding: 4px 12px')} і ${c('border-radius: 20px')}, щоб бейджики стали округлими.</p>`,
          solution: { file: 'style.css', code: `.game-tag {\n  padding: 4px 12px;\n  border-radius: 20px;\n}` },
          check: t => {
            if (!t.is('.game-tag', 'border-top-left-radius', '20px')) return 'Кути ще не заокруглені: <code>border-radius: 20px;</code>';
            return (t.is('.game-tag', 'padding-left', '12px') && t.is('.game-tag', 'padding-top', '4px')) ||
              'Перевір <code>padding: 4px 12px;</code> — 4px зверху/знизу, 12px зліва/справа.';
          },
        },
        {
          text: `<p>Виділи назви ігор ${c('.highlight')}: жирний шрифт (${c('font-weight: bold')}) і колір ${c('#e94560')}.</p>`,
          solution: { file: 'style.css', code: `.highlight {\n  font-weight: bold;\n  color: #e94560;\n}` },
          check: t => (t.all('.highlight', 'font-weight', '700') && t.all('.highlight', 'color', '#e94560')) ||
            'Елементи <code>.highlight</code> мають бути жирні та кольору <code>#e94560</code>.',
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'Селектор за ID і специфічність',
      body: `
        <p><strong>ID</strong> — унікальне ім'я елемента, воно має бути лише в <em>одного</em> елемента на сторінці. У CSS перед ним ставлять ${c('#')}:</p>
        ${pre(`<h1 id="article-title">Великий заголовок</h1>`, 'html')}
        ${pre(`#article-title { font-family: cursive; }`)}
        <p>Коли кілька правил змінюють одне й те саме, перемагає правило з вищою <strong>специфічністю</strong>:</p>
        ${pre(`h1        { color: red; }       /* тег  → 1   */
.headline { color: firebrick; } /* клас → 10  */
#heading  { color: blue; }      /* id   → 100 */
/* Переможе blue */`)}
        <div class="note">ID → клас → тег. Використовуй ID рідко — тільки для справді унікальних елементів.</div>`,
      tasks: [
        {
          text: `<p>У заголовка сайту є ${c('id="site-title"')}. Через ID-селектор зроби його розмір ${c('2.5rem')} і колір ${c('#e94560')}.</p>`,
          solution: { file: 'style.css', code: `#site-title {\n  font-size: 2.5rem;\n  color: #e94560;\n}` },
          check: t => {
            if (!t.rule('#site-title')) return 'Не знайдено правила з селектором <code>#site-title</code>.';
            if (!t.declIs('#site-title', 'font-size', '2.5rem')) return 'Розмір має бути <code>font-size: 2.5rem;</code>';
            return t.declIs('#site-title', 'color', '#e94560') || 'Колір має бути <code>color: #e94560;</code>';
          },
        },
        {
          text: `<p>Перевір специфічність на практиці. <strong>Нижче</strong> в файлі додай ще два правила для того самого заголовка: ${c('h1 { color: green; }')} і ${c('.header-title { color: orange; }')}. Якого кольору став заголовок?</p>`,
          solution: { file: 'style.css', code: `h1 {\n  color: green;\n}\n\n.header-title {\n  color: orange;\n}` },
          hint: `<p>Правила нижче у файлі зазвичай перемагають, але лише при <em>однаковій</em> специфічності. ID (100) сильніший за клас (10) і тег (1).</p>`,
          check: t => {
            if (!t.declIs('h1', 'color', 'green')) return 'Додай правило <code>h1 { color: green; }</code>';
            if (!t.declIs('.header-title', 'color', 'orange')) return 'Додай правило <code>.header-title { color: orange; }</code>';
            return t.is('#site-title', 'color', '#e94560') ||
              'Заголовок мав би залишитись <code>#e94560</code> — ID перемагає. Чи не змінив ти правило <code>#site-title</code>?';
          },
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'Атрибути і псевдокласи',
      body: `
        <p><strong>Селектор за атрибутом</strong> пишеться у квадратних дужках:</p>
        ${pre(`[disabled]       { opacity: 0.5; }
[type="text"]    { border: 1px solid gray; }
[href^="https"]  { color: green; } /* починається з */
[href$=".pdf"]   { color: red; }   /* закінчується на */`)}
        <p><strong>Псевдоклас</strong> описує <em>стан</em> або <em>позицію</em> елемента й пишеться через двокрапку:</p>
        ${pre(`a:hover        { color: darkorange; } /* курсор над елементом */
li:first-child { font-weight: bold; }  /* перший у списку */
input:focus    { border-color: blue; } /* поле активне */`)}`,
      tasks: [
        {
          text: `<p>У списку «Популярне зараз» частина посилань веде на справжні сайти. Зроби зеленими (${c('green')}) лише ті посилання, чий ${c('href')} <strong>починається</strong> з ${c('https')}.</p>`,
          solution: { file: 'style.css', code: `[href^="https"] {\n  color: green;\n}` },
          check: t => {
            const ext = t.$$('a[href^="https"]'), local = t.$$('a[href="#"]');
            if (!ext.every(a => t.is(a, 'color', 'green'))) return 'Посилання на minecraft.net і stardewvalley.net ще не зелені. Використай <code>[href^="https"]</code>.';
            return local.every(a => !t.is(a, 'color', 'green')) || 'Зеленими стали всі посилання — а мали лише ті, що починаються з https.';
          },
        },
        {
          text: `<p>Коли курсор наведено на будь-яке посилання, воно має ставати ${c('#e94560')} і втрачати підкреслення (${c('text-decoration: none')}).</p>`,
          solution: { file: 'style.css', code: `a:hover {\n  color: #e94560;\n  text-decoration: none;\n}` },
          check: t => {
            if (!t.rule('a:hover')) return 'Не знайдено правила з селектором <code>a:hover</code>.';
            if (!t.declIs('a:hover', 'color', '#e94560')) return 'У <code>a:hover</code> потрібен <code>color: #e94560;</code>';
            return /none/.test(t.decl('a:hover', 'text-decoration')) || 'Додай у <code>a:hover</code> <code>text-decoration: none;</code>';
          },
        },
        {
          text: `<p>Зроби жирним (${c('font-weight: bold')}) лише <strong>перший</strong> пункт будь-якого списку — через псевдоклас ${c(':first-child')}.</p>`,
          solution: { file: 'style.css', code: `li:first-child {\n  font-weight: bold;\n}` },
          check: t => {
            const lis = t.$$('.popular-list li');
            if (!t.is(lis[0], 'font-weight', '700')) return 'Перший пункт списку ще не жирний.';
            return !t.is(lis[1], 'font-weight', '700') || 'Жирними стали всі пункти, а мав лише перший — <code>li:first-child</code>.';
          },
        },
      ],
    },

    // ── 7 ──────────────────────────────────────────────────────────
    {
      title: 'Ланцюжок, вкладеність, групування',
      body: `
        <p><strong>Ланцюжок</strong> (без пробілу) — елемент має відповідати <em>обом</em> умовам:</p>
        ${pre(`h1.special { color: gold; } /* лише h1 з класом special */`)}
        <p><strong>Вкладеність</strong> (через пробіл) — елемент <em>всередині</em> іншого:</p>
        ${pre(`.main-list li { color: green; } /* li всередині .main-list */`)}
        <p><strong>Групування</strong> (через кому) — одне правило для кількох селекторів:</p>
        ${pre(`h1,
.menu {
  font-family: Georgia;
}`)}`,
      tasks: [
        {
          text: `<p>Лише заголовок ${c('h2')} з класом ${c('featured')} зроби кольору ${c('#e94560')} і курсивним (${c('font-style: italic')}). Інші ${c('h2')} мають залишитись темно-синіми.</p>`,
          solution: { file: 'style.css', code: `h2.featured {\n  color: #e94560;\n  font-style: italic;\n}` },
          check: t => {
            if (!t.rule('h2.featured')) return 'Потрібен ланцюжок <code>h2.featured</code> — без пробілу.';
            if (!(t.is('h2.featured', 'color', '#e94560') && t.is('h2.featured', 'font-style', 'italic'))) return 'Заголовок «Топ-ігри місяця» має бути <code>#e94560</code> і курсивним.';
            return !t.is('h2:not(.featured)', 'font-style', 'italic') || 'Курсивними стали всі h2 — а мав лише h2 з класом featured.';
          },
        },
        {
          text: `<p>Прибери підкреслення (${c('text-decoration: none')}) у посилань <strong>всередині</strong> навігації ${c('nav.site-nav')}. Посилання в sidebar мають лишитись підкресленими.</p>`,
          solution: { file: 'style.css', code: `nav.site-nav a {\n  text-decoration: none;\n}` },
          check: t => {
            if (!t.all('.site-nav a', 'text-decoration-line', 'none')) return 'Посилання в навігації ще підкреслені.';
            return t.$$('.popular-list a[href="#"]').some(a => t.is(a, 'text-decoration-line', 'underline')) ||
              'Підкреслення зникло всюди. Обмеж правило навігацією: <code>nav.site-nav a</code>.';
          },
        },
        {
          text: `<p>Одним правилом з групуванням задай ${c('font-family: Georgia, serif')} для ${c('h1')}, ${c('h2')} і ${c('h3')}.</p>`,
          solution: { file: 'style.css', code: `h1,\nh2,\nh3 {\n  font-family: Georgia, serif;\n}` },
          check: t => {
            if (!t.rule('h1, h2, h3')) return 'Потрібне одне правило з селектором <code>h1, h2, h3</code> (через коми).';
            return ['h1', 'h2', 'h3'].every(s => /georgia/i.test(t.css(s, 'font-family'))) || 'Заголовки ще не Georgia.';
          },
        },
      ],
    },

    // ── 8 ──────────────────────────────────────────────────────────
    {
      title: 'Підсумок: специфічність і !important',
      body: `
        <table>
          <tr><th>Тип</th><th>Приклад</th><th>Вага</th></tr>
          <tr><td>Універсальний</td><td>${c('*')}</td><td>0</td></tr>
          <tr><td>Тег</td><td>${c('p')}</td><td>1</td></tr>
          <tr><td>Клас, псевдоклас, атрибут</td><td>${c('.name')} ${c(':hover')}</td><td>10</td></tr>
          <tr><td>ID</td><td>${c('#name')}</td><td>100</td></tr>
          <tr><td>Ланцюжок / вкладеність</td><td>${c('p.note')} ${c('.list li')}</td><td>сума: 11</td></tr>
        </table>
        <p>${c('!important')} після значення перемагає <em>будь-яку</em> специфічність:</p>
        ${pre(`p { color: blue !important; }`)}
        <div class="note">⛔ Уникай ${c('!important')} у справжніх проєктах — потім його неможливо перебити, і стилі стає важко підтримувати.</div>`,
      tasks: [
        {
          text: `<p>Заголовок сайту зараз має колір з правила ${c('#site-title')} (вага 100). Зміни <strong>лише</strong> правило ${c('h1 { color: green; }')} так, щоб заголовок став зеленим.</p>`,
          hint: `<p>Тег має вагу 1 і програє ID. Але ${c('!important')} сильніший за специфічність.</p>`,
          solution: { file: 'style.css', code: `h1 {\n  color: green !important;\n}` },
          check: t => {
            if (!t.is('#site-title', 'color', 'green')) return 'Заголовок ще не зелений. Додай <code>!important</code> після значення в правилі <code>h1</code>.';
            return t.important('h1', 'color') ||
              'Заголовок зелений, але не через <code>h1 { color: green !important; }</code>.';
          },
        },
        {
          text: `<p>Порахуй вагу селектора ${c('nav.site-nav a')} і впиши її коментарем першим рядком у ${c('style.css')}, наприклад ${c('/* 12 */')}.</p>`,
          hint: `<p>${c('nav')} — тег (1), ${c('.site-nav')} — клас (10), ${c('a')} — тег (1).</p>`,
          check: t => /^\s*\/\*\s*12\s*\*\//.test(t.code('style.css')) ||
            (/^\s*\/\*\s*\d+\s*\*\//.test(t.code('style.css')) ? 'Число не те. Склади вагу кожної частини: тег + клас + тег.' : 'Першим рядком style.css має бути коментар з числом, наприклад <code>/* 5 */</code>.'),
        },
      ],
    },
  ],
};
