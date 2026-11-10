const { pre, c } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
// Nothing here sets position / z-index / display on the elements the tasks are about.
const BASE_CSS = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background-color: #f0f2f5; color: #1a1a2e; line-height: 1.6; }
.site-header { background-color: #1a1a4a; color: #fff; height: 64px; }
.header-inner { max-width: 1100px; margin: 0 auto; padding: 0 20px; height: 100%; display: flex; align-items: center; gap: 24px; }
.logo { font-size: 1.2rem; font-weight: bold; color: #4fc3f7; letter-spacing: 1px; }
.main-nav { display: flex; gap: 16px; }
.nav-link { color: #e0e0e0; text-decoration: none; font-size: .8rem; font-weight: 600; }
.nav-link:hover { color: #4fc3f7; }
.floating-alert { background-color: #e53e3e; color: #fff; padding: 3px 12px; border-radius: 20px; font-weight: bold; font-size: .75rem; letter-spacing: 1px; }
.page-body { max-width: 1100px; margin: 0 auto; padding: 20px 20px 48px; }
.hero-section { background-color: #1a1a4a; background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80'); background-size: cover; background-position: center; height: 340px; display: flex; align-items: flex-end; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
.breaking-badge { background-color: #e53e3e; color: #fff; font-size: .7rem; font-weight: bold; letter-spacing: 2px; padding: 5px 12px; border-radius: 4px; }
.hero-content { background: linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,.45) 55%, transparent 100%); width: 100%; padding: 40px 24px 24px; }
.hero-title { font-size: 1.4rem; color: #fff; line-height: 1.25; margin-bottom: 10px; max-width: 680px; }
.hero-lead { color: #c8c8c8; font-size: .85rem; max-width: 580px; margin-bottom: 18px; }
.hero-cta { display: inline-block; background-color: #4fc3f7; color: #0a0a1a; text-decoration: none; font-weight: bold; font-size: .8rem; padding: 8px 18px; border-radius: 4px; }
.stats-bar { background-color: #fff; padding: 16px 16px 8px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.stat-box { background-color: #e8f8f5; border: 1px solid #a3e4d7; border-radius: 6px; padding: 12px 8px; text-align: center; margin: 0 4px 8px 0; }
.stat-num { font-size: 1.4rem; font-weight: bold; color: #117a65; }
.stat-label { font-size: .75rem; color: #555; }
.content-grid { display: flex; gap: 20px; align-items: flex-start; }
.articles-col { flex: 1; min-width: 0; }
.article-preview { background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.new-label { background-color: #e53e3e; color: #fff; font-size: .7rem; font-weight: bold; letter-spacing: 1px; padding: 3px 10px; border-radius: 20px; }
.article-thumb { width: 100%; height: 180px; border-radius: 6px; object-fit: cover; display: block; margin-bottom: 14px; background: #dde3ea; }
.article-title { font-size: 1.05rem; color: #1a1a2e; margin-bottom: 8px; line-height: 1.35; }
.article-text { color: #555; font-size: .875rem; line-height: 1.65; margin-bottom: 12px; }
.read-more { color: #1565c0; font-weight: bold; text-decoration: none; font-size: .875rem; }
.topics-section { background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.topics-title { font-size: .8rem; color: #999; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.topic-chip { background-color: #e3f2fd; color: #1565c0; font-size: .8rem; font-weight: 600; padding: 5px 14px; border-radius: 20px; border: 1px solid #90caf9; margin-right: 6px; }
.sidebar { width: 170px; flex-shrink: 0; background-color: #fff; border-radius: 8px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.sidebar-title { font-size: .72rem; letter-spacing: 1px; color: #999; font-weight: 700; text-transform: uppercase; margin-bottom: 14px; padding-bottom: 6px; border-bottom: 2px solid #4fc3f7; }
.popular-list { list-style: decimal; padding-left: 18px; margin-bottom: 24px; }
.popular-list li { margin-bottom: 10px; font-size: .82rem; line-height: 1.45; }
.popular-list a { color: #1a1a2e; text-decoration: none; }
.popular-list a:hover { color: #4fc3f7; }
.sidebar-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.sidebar-tags span { background-color: #f0f2f5; color: #666; font-size: .75rem; padding: 3px 10px; border-radius: 20px; }
.site-footer { background-color: #1a1a4a; color: #a0a8c0; padding: 36px 20px; }
.footer-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 48px; align-items: flex-start; }
.footer-brand { font-size: 1.1rem; font-weight: bold; color: #4fc3f7; white-space: nowrap; }
.footer-link { color: #a0a8c0; text-decoration: none; font-size: .875rem; margin-right: 14px; }
.footer-link:hover { color: #4fc3f7; }
.to-top { background-color: #4fc3f7; color: #0a0a1a; width: 44px; height: 44px; line-height: 44px; border-radius: 50%; text-align: center; text-decoration: none; font-weight: bold; font-size: 1.2rem; box-shadow: 0 4px 12px rgba(0,0,0,.25); }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>TechDaily</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <div class="logo">TechDaily</div>
      <nav class="main-nav">
        <a class="nav-link" href="#">Технології</a>
        <a class="nav-link" href="#">Наука</a>
        <a class="nav-link" href="#">Ігри</a>
      </nav>
    </div>
  </header>

  <div class="floating-alert">🔴 LIVE</div>

  <main class="page-body">
    <section class="hero-section">
      <div class="breaking-badge">BREAKING</div>
      <div class="hero-content">
        <h1 class="hero-title">Штучний інтелект навчився писати код краще за більшість програмістів</h1>
        <p class="hero-lead">Нова модель пройшла тести і отримала вищий бал, ніж 90% учасників змагань з програмування.</p>
        <a class="hero-cta" href="#">Читати повністю →</a>
      </div>
    </section>

    <div class="stats-bar">
      <div class="stat-box"><div class="stat-num">1.2M</div><div class="stat-label">переглядів</div></div>
      <div class="stat-box"><div class="stat-num">48K</div><div class="stat-label">лайків</div></div>
      <div class="stat-box"><div class="stat-num">9K</div><div class="stat-label">поширень</div></div>
    </div>

    <div class="content-grid">
      <div class="articles-col">
        <article class="article-preview">
          <span class="new-label">NEW</span>
          <img class="article-thumb" src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=480&q=80" alt="Робот">
          <h2 class="article-title">Роботи-хірурги провели першу операцію без участі людини</h2>
          <p class="article-text">Команда вчених представила автономного хірургічного робота, який провів операцію на серці без втручання хірурга. Точність виявилась на 40% вищою.</p>
          <a class="read-more" href="#">Читати далі →</a>
        </article>

        <article class="article-preview">
          <img class="article-thumb" src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=480&q=80" alt="Космос">
          <h2 class="article-title">Супутник сфотографував Землю з рекордною чіткістю</h2>
          <p class="article-text">На нових знімках видно навіть окремі автомобілі на парковках. Дані будуть відкритими для науковців з усього світу.</p>
          <a class="read-more" href="#">Читати далі →</a>
        </article>

        <div class="topics-section">
          <h3 class="topics-title">Теми</h3>
          <div class="topic-chip">AI</div>
          <div class="topic-chip">Роботика</div>
          <div class="topic-chip">Наука</div>
          <div class="topic-chip">Медицина</div>
          <div class="topic-chip">Майбутнє</div>
        </div>
      </div>

      <aside class="sidebar">
        <h3 class="sidebar-title">Популярне зараз</h3>
        <ol class="popular-list">
          <li><a href="#">Акумулятор на 1000 км пробігу</a></li>
          <li><a href="#">Перші туристи летять на Місяць</a></li>
          <li><a href="#">Нові AR-окуляри: перший огляд</a></li>
          <li><a href="#">Велика ігрова студія змінила власника</a></li>
        </ol>
        <h3 class="sidebar-title">Теги</h3>
        <div class="sidebar-tags">
          <span>AI</span><span>Космос</span><span>Авто</span><span>Гаджети</span>
        </div>
      </aside>
    </div>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">TechDaily © 2026</div>
      <nav class="footer-nav">
        <a class="footer-link" href="#">Головна</a>
        <a class="footer-link" href="#">Технології</a>
        <a class="footer-link" href="#">Наука</a>
        <a class="footer-link" href="#">Про нас</a>
        <a class="footer-link" href="#">Контакти</a>
      </nav>
    </div>
  </footer>

  <a class="to-top" href="#">↑</a>
</body>
</html>
`;

const STYLE_CSS = `/* Пиши свої CSS-правила тут.
   Перегляд праворуч оновлюється сам,
   а «▶ Перевірити» перевіряє завдання. */

`;

// ── Geometry helpers for the checks ───────────────────────────────
const box = (t, sel) => (typeof sel === 'string' ? t.$(sel) : sel)?.getBoundingClientRect();
const near = (a, b, tol = 1.5) => Math.abs(a - b) <= tol;
const zOf = (t, sel) => parseInt(t.css(sel, 'z-index'), 10);

window.LESSON = {
  id: 'lesson-6',
  num: '06',
  title: 'Display та Позиціонування',
  back: '../lesson-6.html',
  next: '../index.html',
  files: {
    'base.css':   { code: BASE_CSS, hidden: true },
    'index.html': { code: PAGE_HTML, editable: true },
    'style.css':  { code: STYLE_CSS, editable: true },
  },
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'Потік документа',
      focus: 'index.html',
      body: `
        <p>Праворуч — новинний сайт <strong>TechDaily</strong>. Поки що на ньому немає жодного ${c('position')} чи ${c('display')} — всі елементи стоять у <strong>нормальному потоці</strong>: браузер розкладає їх зверху вниз у тому порядку, у якому вони записані в HTML.</p>
        <ul>
          <li><strong>Блокові</strong> елементи (${c('<div>')}, ${c('<p>')}, ${c('<h1>')}) займають весь рядок і стоять один під одним.</li>
          <li><strong>Рядкові</strong> (${c('<span>')}, ${c('<a>')}, ${c('<strong>')}) течуть усередині тексту, як слова.</li>
        </ul>
        ${pre(`<div>Блок 1</div>
<div>Блок 2</div>  <!-- новий рядок -->
<p>Текст і <a href="#">посилання</a> в одному рядку</p>`, 'html')}
        <p>Подивись на сторінку: червона смуга «LIVE» на всю ширину, бейдж «BREAKING» внизу банера, теми AI / Роботика… у стовпчик, кнопка «↑» десь у самому низу. Протягом уроку ти розставиш усе це по місцях.</p>`,
      tasks: [
        {
          text: `<p>У блоці «Теми» (${c('.topics-section')}) в ${c('index.html')} додай шосту тему — ще один ${c('<div class="topic-chip">')} з текстом «Космос». Зверни увагу: вона стане на <em>новий рядок</em>, бо ${c('<div>')} — блоковий.</p>`,
          solution: { file: 'index.html', replace: '<div class="topic-chip">Майбутнє</div>', code: '<div class="topic-chip">Майбутнє</div>\n<div class="topic-chip">Космос</div>' },
          hint: `<p>Скопіюй рядок з «Майбутнє» і встав під ним, всередині ${c('.topics-section')}:</p>${pre(`<div class="topic-chip">Космос</div>`, 'html')}`,
          check: t => {
            const chips = t.$$('.topics-section .topic-chip');
            if (!chips.some(ch => /космос/i.test(ch.textContent))) {
              return t.$$('.topic-chip').some(ch => /космос/i.test(ch.textContent))
                ? 'Тема «Космос» є, але не всередині <code>.topics-section</code>. Встав її під «Майбутнє», до закривального <code>&lt;/div&gt;</code>.'
                : 'Не знайдено <code>&lt;div class="topic-chip"&gt;Космос&lt;/div&gt;</code> у блоці «Теми».';
            }
            return chips.length >= 6 || 'Тем має бути шість — не видаляй старі.';
          },
        },
        {
          text: `<p>У тексті першої статті (${c('.article-text')}) обгорни «40%» тегом ${c('<strong>')}. Слово стане жирним, але залишиться <em>в тому самому рядку</em> — ${c('<strong>')} рядковий.</p>`,
          solution: { file: 'index.html', replace: ' 40%', code: ' <strong>40%</strong>' },
          hint: pre(`… на <strong>40%</strong> вищою.`, 'html'),
          check: t => {
            const s = t.$('.article-text strong');
            if (!s) return 'Усередині <code>.article-text</code> ще немає тегу <code>&lt;strong&gt;</code>.';
            return /^\s*40\s*%\s*$/.test(s.textContent) || 'У <code>&lt;strong&gt;</code> має бути лише «40%».';
          },
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: 'position: relative',
      focus: 'style.css',
      body: `
        <p>З ${c('position: relative')} елемент <strong>залишається в потоці</strong>, але його можна зсунути від свого звичайного місця властивостями ${c('top')}, ${c('left')}, ${c('right')}, ${c('bottom')}:</p>
        ${pre(`.card {
  position: relative;
  top: 10px;   /* зсув вниз на 10px */
  left: 20px;  /* зсув вправо на 20px */
}`)}
        <p>Місце, яке елемент займав, <strong>зберігається</strong> — сусіди не «з'їжджають» на нього.</p>
        <div class="note">💡 Найчастіше ${c('relative')} ставлять <strong>не для зсуву</strong>, а щоб зробити елемент <strong>контейнером позиціонування</strong> для вкладених ${c('absolute')}-елементів. Це знадобиться в наступній вправі.</div>`,
      tasks: [
        {
          text: `<p>Зсунь кнопку «Читати повністю →» (${c('.hero-cta')}) на ${c('8px')} вниз і на ${c('12px')} вправо, не виймаючи її з потоку.</p>`,
          hint: `<p>Потрібні три властивості: ${c('position')}, ${c('top')} і ${c('left')}. ${c('top')} зсуває <em>вниз</em> (відштовхує від верхнього краю), ${c('left')} — <em>вправо</em>.</p>`,
          solution: { file: 'style.css', code: `.hero-cta {\n  position: relative;\n  top: 8px;\n  left: 12px;\n}` },
          check: t => {
            if (!t.is('.hero-cta', 'position', 'relative')) return 'У <code>.hero-cta</code> ще немає <code>position: relative;</code>';
            if (!t.is('.hero-cta', 'top', '8px')) return 'Зсув вниз має бути <code>top: 8px;</code>';
            return t.is('.hero-cta', 'left', '12px') || 'Зсув вправо має бути <code>left: 12px;</code>';
          },
        },
        {
          text: `<p>Зроби банер ${c('.hero-section')} <strong>контейнером позиціонування</strong> — так, щоб він нікуди не зсунувся. Видимих змін не буде, але це підготовка до наступної вправи.</p>`,
          solution: { file: 'style.css', code: `.hero-section {\n  position: relative;\n}` },
          check: t => {
            if (!t.is('.hero-section', 'position', 'relative')) return 'У <code>.hero-section</code> потрібен <code>position: relative;</code>';
            const shifted = ['top', 'left', 'right', 'bottom'].some(p => !['auto', '0px'].includes(t.css('.hero-section', p)));
            return !shifted || 'Банер не треба зсувати — прибери <code>top</code>/<code>left</code> з <code>.hero-section</code>.';
          },
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'position: absolute',
      body: `
        <p>${c('position: absolute')} <strong>повністю виймає елемент з потоку</strong>. Він розміщується відносно найближчого предка, у якого ${c('position')} не ${c('static')} (наприклад, ${c('relative')}). Якщо такого предка немає — відносно сторінки.</p>
        ${pre(`.parent {
  position: relative;  /* контейнер */
}

.badge {
  position: absolute;
  top: 16px;
  right: 16px;         /* правий верхній кут .parent */
}`)}
        <div class="note">⚠ Absolute-елемент <strong>не займає місця</strong> в потоці: інші елементи його «не бачать» і можуть з ним перекриватися.</div>`,
      tasks: [
        {
          text: `<p>Бейдж «BREAKING» (${c('.breaking-badge')}) зараз тулиться внизу банера. Перенеси його у <strong>лівий верхній кут банера</strong>: ${c('20px')} від верхнього і ${c('20px')} від лівого краю.</p>`,
          hint: `<p>Банер уже є контейнером (${c('position: relative')} з попередньої вправи). Бейджу потрібні ${c('position: absolute')}, ${c('top')} і ${c('left')}.</p>`,
          solution: { file: 'style.css', code: `.breaking-badge {\n  position: absolute;\n  top: 20px;\n  left: 20px;\n}` },
          check: t => {
            if (!t.is('.breaking-badge', 'position', 'absolute')) return 'У <code>.breaking-badge</code> ще немає <code>position: absolute;</code>';
            const b = box(t, '.breaking-badge'), h = box(t, '.hero-section');
            if (near(b.top - h.top, 20) && near(b.left - h.left, 20)) return true;
            if (!t.is('.hero-section', 'position', 'relative')) return 'Бейдж рахує відступи від сторінки, а не від банера: у <code>.hero-section</code> немає <code>position: relative;</code> (вправа 2).';
            return 'Бейдж має стояти рівно на 20px від верхнього (<code>top</code>) і лівого (<code>left</code>) краю банера.';
          },
        },
        {
          text: `<p>У першій статті є мітка «NEW» (${c('.new-label')}). Поклади її в <strong>правий верхній кут картки статті</strong> (${c('.article-preview')}), на ${c('12px')} від верхнього і правого краю — поверх картинки.</p>`,
          hint: `<p>Тут два кроки, як у прикладі з ${c('.parent')} і ${c('.badge')}: картка стає контейнером, а мітка — absolute з ${c('top')} і ${c('right')}.</p>`,
          solution: { file: 'style.css', code: `.article-preview {\n  position: relative;\n}\n\n.new-label {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}` },
          check: t => {
            if (!t.is('.new-label', 'position', 'absolute')) return 'У <code>.new-label</code> ще немає <code>position: absolute;</code>';
            const l = box(t, '.new-label'), a = box(t, '.article-preview');
            if (near(l.top - a.top, 12) && near(a.right - l.right, 12)) return true;
            if (!t.is('.article-preview', 'position', 'relative')) return 'Мітка вилетіла за межі картки: у <code>.article-preview</code> немає <code>position: relative;</code>';
            return 'Мітка має бути на 12px від верхнього (<code>top</code>) і правого (<code>right</code>) краю картки.';
          },
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'position: fixed',
      body: `
        <p>${c('position: fixed')} прикріплює елемент до <strong>вікна браузера</strong>: при прокрутці він <strong>не рухається</strong>. Так роблять шапки сайтів, кнопку «вгору», чат-кнопку, cookie-банер.</p>
        ${pre(`.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;   /* про це — у вправі 6 */
}`)}
        <div class="note">💡 Fixed-елемент виходить з потоку, і вміст сторінки «заїжджає» під нього. Щоб нічого не ховалось, додай ${c('body')} ${c('padding-top')}, рівний висоті шапки.</div>`,
      tasks: [
        {
          text: `<p>Закріпи шапку ${c('.site-header')} у верхній частині вікна: вона має бути притиснута до верхнього краю і займати <strong>всю ширину</strong>. Прокрути перегляд — шапка має лишатися на місці.</p>`,
          hint: `<p>Без ${c('width: 100%')} fixed-шапка стискається до ширини свого вмісту.</p>`,
          solution: { file: 'style.css', code: `.site-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}` },
          check: t => {
            if (!t.is('.site-header', 'position', 'fixed')) return 'У <code>.site-header</code> ще немає <code>position: fixed;</code>';
            if (!near(box(t, '.site-header').top, 0)) return 'Шапка має бути притиснута до верху: <code>top: 0;</code>';
            return near(box(t, '.site-header').width, t.doc.documentElement.clientWidth) ||
              'Шапка не на всю ширину вікна — додай <code>width: 100%;</code>';
          },
        },
        {
          text: `<p>Тепер банер і червона смуга сховались під шапкою. Відсунь вміст сторінки: дай ${c('body')} відступ зверху, рівний висоті шапки — ${c('64px')}.</p>`,
          solution: { file: 'style.css', code: `body {\n  padding-top: 64px;\n}` },
          check: t => {
            if (!t.is('.site-header', 'position', 'fixed')) return 'Спочатку зроби шапку fixed (завдання 1).';
            const p = parseFloat(t.css('body', 'padding-top'));
            if (p < 64) return 'Вміст досі ховається під шапкою: додай <code>body</code> <code>padding-top: 64px;</code>';
            return p <= 100 || 'Відступ завеликий — шапка висотою 64px, тож <code>padding-top: 64px;</code>';
          },
        },
        {
          text: `<p>Червона смуга «🔴 LIVE» (${c('.floating-alert')}) має стати маленькою плашкою, що завжди висить у <strong>правому верхньому куті вікна</strong>: ${c('18px')} від верху, ${c('20px')} від правого краю.</p>`,
          hint: `<p>Fixed-елемент без ширини стискається до свого вмісту — тому смуга й перетвориться на плашку. Потрібні ${c('top')} і ${c('right')}.</p>`,
          solution: { file: 'style.css', code: `.floating-alert {\n  position: fixed;\n  top: 18px;\n  right: 20px;\n}` },
          check: t => {
            if (!t.is('.floating-alert', 'position', 'fixed')) return 'У <code>.floating-alert</code> ще немає <code>position: fixed;</code>';
            const r = box(t, '.floating-alert');
            if (!near(r.top, 18)) return 'Плашка має бути на 18px від верху вікна: <code>top: 18px;</code>';
            return near(t.doc.documentElement.clientWidth - r.right, 20) || 'Плашка має бути на 20px від правого краю: <code>right: 20px;</code>';
          },
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'position: sticky',
      body: `
        <p>${c('position: sticky')} — гібрид ${c('relative')} і ${c('fixed')}. Елемент рухається разом зі сторінкою, як звичайний, а коли доходить до заданого порогу — <strong>«прилипає»</strong> до краю вікна.</p>
        ${pre(`.sidebar {
  position: sticky;
  top: 80px;   /* прилипає, коли до верху вікна лишається 80px */
}`)}
        <div class="note">⚠ Sticky не працює, якщо в батьківського елемента ${c('overflow: hidden')} або ${c('overflow: auto')}.</div>`,
      tasks: [
        {
          text: `<p>Зроби так, щоб бічна колонка «Популярне зараз» (${c('.sidebar')}) під час прокрутки <strong>прилипала на 80px від верху вікна</strong> — одразу під шапкою. Прокрути перегляд і переконайся.</p>`,
          hint: `<p>Чому 80px, а не 0? Шапка висотою 64px — з ${c('top: 0')} колонка сховалась би під нею.</p>`,
          solution: { file: 'style.css', code: `.sidebar {\n  position: sticky;\n  top: 80px;\n}` },
          check: t => {
            if (!t.is('.sidebar', 'position', 'sticky')) return 'У <code>.sidebar</code> ще немає <code>position: sticky;</code>';
            if (!t.is('.sidebar', 'top', '80px')) return 'Поріг прилипання має бути <code>top: 80px;</code>';
            // scroll the preview past the grid top and see where the sidebar ends up
            const y0 = t.win.scrollY;
            const grid = t.$('.content-grid');
            const gridTop = grid.getBoundingClientRect().top + y0;
            const room = grid.offsetHeight - t.$('.sidebar').offsetHeight;
            if (room < 80) return true; // page too short to test the sticking itself
            t.win.scrollTo(0, gridTop - 80 + 60);
            const top = box(t, '.sidebar').top;
            t.win.scrollTo(0, y0);
            return near(top, 80, 2) || 'Колонка не прилипає. Перевір, що в її батьків немає <code>overflow: hidden</code>.';
          },
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'z-index — порядок шарів',
      body: `
        <p>Коли елементи перекриваються, ${c('z-index')} вирішує, хто буде зверху. <strong>Більше число — вище.</strong></p>
        ${pre(`.header {
  position: fixed;
  z-index: 100;
}

.overlay {
  position: fixed;
  z-index: 150;   /* між header і popup */
}

.popup {
  position: absolute;
  z-index: 200;   /* поверх усього */
}`)}
        <div class="note">⚠ ${c('z-index')} працює <strong>лише на позиціонованих</strong> елементах — з ${c('position')} relative, absolute, fixed або sticky. На ${c('static')} він не діє.</div>
        <p>У реальних проєктах домовляються про «рівні»: контент 1–10, шапка 100, модальне вікно 1000, підказка 9999.</p>`,
      tasks: [
        {
          text: `<p>Прокрути перегляд трохи вниз: бейдж «BREAKING», кнопка банера й мітка «NEW» проїжджають <strong>поверх</strong> шапки. Виправ: шапка (${c('.site-header')}) має бути на рівні ${c('100')}.</p>`,
          hint: `<p>Ці елементи позиціоновані (relative/absolute), а пізніші в HTML малюються зверху. Шапці потрібен ${c('z-index')} — і вона вже позиціонована (fixed), тож він подіє.</p>`,
          solution: { file: 'style.css', code: `.site-header {\n  z-index: 100;\n}` },
          check: t => {
            if (!t.is('.site-header', 'position', 'fixed')) return 'Шапка має бути fixed (вправа 4) — інакше перекриття не буде видно.';
            const z = zOf(t, '.site-header');
            if (!(z > 0)) return 'У <code>.site-header</code> ще немає <code>z-index</code>.';
            if (z !== 100) return 'Домовились про рівень шапки <code>z-index: 100;</code>';
            // scroll so the badge sits under the header and see who is on top
            const badge = t.$('.breaking-badge');
            const y0 = t.win.scrollY;
            t.win.scrollTo(0, badge.getBoundingClientRect().top + y0 - 20);
            const r = badge.getBoundingClientRect();
            const el = t.doc.elementFromPoint(r.left + 4, Math.max(r.top + 4, 4));
            t.win.scrollTo(0, y0);
            return t.$('.site-header').contains(el) || 'Бейдж досі проїжджає поверх шапки.';
          },
        },
        {
          text: `<p>Тепер плашка «🔴 LIVE» сховалась під шапкою — а мала б бути поверх неї. Дай ${c('.floating-alert')} рівень <strong>вищий</strong>, ніж у шапки.</p>`,
          solution: { file: 'style.css', code: `.floating-alert {\n  z-index: 200;\n}` },
          check: t => {
            if (!t.is('.floating-alert', 'position', 'fixed')) return 'Плашка має бути fixed (вправа 4, завдання 3).';
            const za = zOf(t, '.floating-alert'), zh = zOf(t, '.site-header');
            if (!(za > 0)) return 'У <code>.floating-alert</code> ще немає <code>z-index</code>.';
            if (!(za > (zh || 0))) return `z-index плашки (${za}) має бути більшим, ніж у шапки (${zh}).`;
            const r = box(t, '.floating-alert');
            const el = t.doc.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !!el?.closest('.floating-alert') || 'Плашку досі щось перекриває.';
          },
        },
      ],
    },

    // ── 7 ──────────────────────────────────────────────────────────
    {
      title: 'display: inline',
      body: `
        <p>${c('display: inline')} — елемент поводиться як частина тексту: <strong>не починає новий рядок</strong> і займає рівно стільки ширини, скільки треба вмісту. Так за замовчуванням поводяться ${c('<span>')}, ${c('<a>')}, ${c('<strong>')}, ${c('<em>')}, ${c('<img>')}, ${c('<button>')}, ${c('<input>')}.</p>
        ${pre(`span   { display: inline; }  /* за замовчуванням */
a      { display: inline; }
strong { display: inline; }`)}
        <p>Обмеження inline-елементів:</p>
        <ul>
          <li>${c('width')} і ${c('height')} — не діють;</li>
          <li>вертикальні ${c('margin')} (top/bottom) не відсувають сусідів;</li>
          <li>горизонтальні ${c('padding')} і ${c('margin')} — працюють.</li>
        </ul>`,
      tasks: [
        {
          text: `<p>Теми AI / Роботика / Наука… (${c('.topic-chip')}) — це ${c('<div>')}, тому стоять стовпчиком. Зроби їх <strong>рядковими</strong>, щоб вони вишикувались в рядок, як слова.</p>`,
          solution: { file: 'style.css', code: `.topic-chip {\n  display: inline;\n}` },
          check: t => {
            if (!t.all('.topic-chip', 'display', 'inline')) return 'Теми ще не рядкові: потрібен <code>display: inline;</code> для <code>.topic-chip</code>.';
            const [a, b] = t.$$('.topic-chip').map(el => el.getBoundingClientRect());
            return near(a.top, b.top) || 'Теми мали б стати в один рядок.';
          },
        },
        {
          text: `<p>Експеримент: додай темам ${c('margin-top: 10px')}. Подивись — відступ над темами <strong>не з'явився</strong>, бо inline-елементи ігнорують вертикальний margin. Залиш це правило — у вправі 9 ми його «оживимо».</p>`,
          solution: { file: 'style.css', code: `.topic-chip {\n  margin-top: 10px;\n}` },
          check: t => {
            if (!(parseFloat(t.decl('.topic-chip', 'margin-top')) > 0)) return 'У правилі <code>.topic-chip</code> ще немає <code>margin-top: 10px;</code>';
            return t.all('.topic-chip', 'display', 'inline') || 'Для експерименту теми мають лишатись <code>display: inline</code>.';
          },
        },
      ],
    },

    // ── 8 ──────────────────────────────────────────────────────────
    {
      title: 'display: block',
      body: `
        <p>${c('display: block')} — елемент <strong>починає новий рядок</strong> і займає всю доступну ширину батька. Блокові за замовчуванням: ${c('<div>')}, ${c('<p>')}, ${c('<h1>–<h6>')}, ${c('<section>')}, ${c('<article>')}, ${c('<ul>')}, ${c('<li>')}.</p>
        ${pre(`div { display: block; }  /* за замовчуванням */
p   { display: block; }
h1  { display: block; }`)}
        <p>Що вміють блоки:</p>
        <ul>
          <li>можна задати ${c('width')} і ${c('height')};</li>
          <li>працюють <em>усі</em> ${c('padding')} і ${c('margin')}, включно з верхніми й нижніми;</li>
          <li>${c('margin: 0 auto')} центрує блок із заданою шириною по горизонталі.</li>
        </ul>`,
      tasks: [
        {
          text: `<p>Посилання у футері (${c('.footer-link')}) зараз стоять в рядок. Перетвори їх на <strong>блоки</strong>, щоб кожне було на своєму рядку, і дай їм ${c('padding: 6px 0')}.</p>`,
          hint: `<p>${c('<a>')} за замовчуванням inline — тому вертикальний padding на ньому не відсуває сусідів. Після ${c('display: block')} — відсуває.</p>`,
          solution: { file: 'style.css', code: `.footer-link {\n  display: block;\n  padding: 6px 0;\n}` },
          check: t => {
            if (!t.all('.footer-link', 'display', 'block')) return 'Посилання футера ще не блоки: <code>display: block;</code>';
            if (!t.all('.footer-link', 'padding-top', '6px')) return 'Додай посиланням <code>padding: 6px 0;</code>';
            const [a, b] = t.$$('.footer-link').map(el => el.getBoundingClientRect());
            return b.top >= a.bottom - 1 || 'Посилання мали б стати одне під одним.';
          },
        },
        {
          text: `<p>Зроби посилання «Читати далі →» (${c('.read-more')}) великою кнопкою: <strong>блок на всю ширину картки</strong>, текст по центру, фон ${c('#e3f2fd')}, ${c('padding: 10px')}. Так у нього стає більша зона кліку.</p>`,
          solution: { file: 'style.css', code: `.read-more {\n  display: block;\n  text-align: center;\n  background-color: #e3f2fd;\n  padding: 10px;\n}` },
          check: t => {
            if (!t.all('.read-more', 'display', 'block')) return 'Посилання ще не блок: <code>display: block;</code>';
            const rm = box(t, '.read-more'), txt = box(t, '.article-text');
            if (!near(rm.width, txt.width, 2)) return 'Кнопка має займати всю ширину картки — не задавай їй <code>width</code>.';
            if (!t.is('.read-more', 'text-align', 'center')) return 'Текст має бути по центру: <code>text-align: center;</code>';
            if (!t.is('.read-more', 'background-color', '#e3f2fd')) return 'Фон має бути <code>#e3f2fd</code>.';
            return t.is('.read-more', 'padding-top', '10px') || 'Додай <code>padding: 10px;</code>';
          },
        },
      ],
    },

    // ── 9 ──────────────────────────────────────────────────────────
    {
      title: 'display: inline-block',
      body: `
        <p>${c('inline-block')} — гібрид: елементи <strong>стоять в рядок</strong>, як inline, але їм можна задати <strong>ширину, висоту і всі відступи</strong>, як block.</p>
        ${pre(`.button {
  display: inline-block;
  width: 120px;
  height: 40px;
  padding: 8px 16px;
  vertical-align: top;  /* вирівнювання по верху */
}`)}
        <p>Сьогодні замість inline-block часто беруть ${c('flex')}, але для <strong>кнопок, іконок, чіпів</strong> він досі зручний.</p>`,
      tasks: [
        {
          text: `<p>Три блоки статистики (${c('.stat-box')}: 1.2M / 48K / 9K) стоять стовпчиком на всю ширину. Постав їх <strong>в один рядок</strong>, кожен шириною ${c('90px')}, вирівняні по верхньому краю.</p>`,
          hint: `<p>Зі звичайним ${c('inline')} ширина не спрацює — потрібен гібрид. Для вирівнювання — ${c('vertical-align: top')}.</p>`,
          solution: { file: 'style.css', code: `.stat-box {\n  display: inline-block;\n  width: 90px;\n  vertical-align: top;\n}` },
          check: t => {
            if (!t.all('.stat-box', 'display', 'inline-block')) return 'Потрібен <code>display: inline-block;</code> для <code>.stat-box</code>.';
            const rs = t.$$('.stat-box').map(el => el.getBoundingClientRect());
            if (!rs.every(r => near(r.width, 90))) return 'Кожен блок має бути шириною <code>90px</code>.';
            if (!t.all('.stat-box', 'vertical-align', 'top')) return 'Додай <code>vertical-align: top;</code>';
            return rs.every(r => near(r.top, rs[0].top)) || 'Блоки не вміщаються в один рядок — перевір ширину <code>90px</code>.';
          },
        },
        {
          text: `<p>Повернись до тем (${c('.topic-chip')}): зроби їх ${c('inline-block')}. Тепер ${c('margin-top: 10px')} з вправи 7 нарешті запрацює — рядки тем перестануть злипатись.</p>`,
          solution: { file: 'style.css', code: `.topic-chip {\n  display: inline-block;\n}` },
          check: t => {
            if (!t.all('.topic-chip', 'display', 'inline-block')) return 'Теми ще не <code>inline-block</code>.';
            return parseFloat(t.css('.topic-chip', 'margin-top')) > 0 || 'Не бачу <code>margin-top</code> у тем — додай <code>margin-top: 10px;</code>';
          },
        },
      ],
    },

    // ── 10 ─────────────────────────────────────────────────────────
    {
      title: 'Підсумок',
      body: `
        <table>
          <tr><th>Властивість</th><th>Ефект</th><th>У потоці?</th></tr>
          <tr><td>${c('position: relative')}</td><td>Зсув від свого місця; контейнер для absolute</td><td>Так</td></tr>
          <tr><td>${c('position: absolute')}</td><td>Відносно найближчого позиціонованого предка</td><td>Ні</td></tr>
          <tr><td>${c('position: fixed')}</td><td>Прикріплений до вікна браузера</td><td>Ні</td></tr>
          <tr><td>${c('position: sticky')}</td><td>Прилипає при прокрутці до порогу</td><td>Так / Ні*</td></tr>
          <tr><td>${c('z-index')}</td><td>Порядок шарів (більше = вище)</td><td>—</td></tr>
          <tr><td>${c('display: inline')}</td><td>Рядковий; без width/height</td><td>Так</td></tr>
          <tr><td>${c('display: block')}</td><td>Новий рядок; повна ширина</td><td>Так</td></tr>
          <tr><td>${c('display: inline-block')}</td><td>Рядковий + width/height</td><td>Так</td></tr>
        </table>
        <p style="font-size:13px">* sticky — у потоці, доки не «прилипне»; потім поводиться як fixed.</p>`,
      tasks: [
        {
          text: `<p>Кнопка «↑» (${c('.to-top')}) загубилась у самому низу. Зроби її круглою кнопкою, що <strong>завжди висить у правому нижньому куті вікна</strong>: ${c('20px')} від нижнього і правого краю. Її розмір 44×44 вже задано в стилях сайту — він запрацює, щойно кнопка вийде з потоку.</p>`,
          hint: `<p>Який з видів ${c('position')} прикріплює до <em>вікна</em>? Замість ${c('top')} тут знадобиться ${c('bottom')}.</p>`,
          solution: { file: 'style.css', code: `.to-top {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n}` },
          check: t => {
            if (!t.is('.to-top', 'position', 'fixed')) return 'Кнопка має бути прикріплена до вікна — <code>position: fixed;</code>';
            const r = box(t, '.to-top'), de = t.doc.documentElement;
            if (!near(r.width, 44) || !near(r.height, 44)) return 'Кнопка має бути 44×44. Чи не перевизначив ти її <code>width</code>/<code>height</code> або <code>display</code>?';
            if (!near(de.clientHeight - r.bottom, 20)) return 'Кнопка має бути на 20px від нижнього краю вікна: <code>bottom: 20px;</code>';
            return near(de.clientWidth - r.right, 20) || 'Кнопка має бути на 20px від правого краю вікна: <code>right: 20px;</code>';
          },
        },
        {
          text: `<p>За таблицею: які значення ${c('position')} <strong>повністю виймають</strong> елемент з потоку? Напиши їх коментарем у ${c('style.css')}, наприклад ${c('/* значення, значення */')}.</p>`,
          hint: `<p>Шукай у таблиці рядки з «Ні» в колонці «У потоці?». Sticky не рахується — він лише інколи поводиться як fixed.</p>`,
          solution: { file: 'style.css', code: `/* absolute, fixed */` },
          check: t => {
            const notes = [...t.code('style.css').matchAll(/\/\*([\s\S]*?)\*\//g)].map(m => m[1].toLowerCase());
            const hit = notes.find(s => /absolute|fixed|relative|static|sticky/.test(s));
            if (!hit) return 'Не знайдено коментаря зі значеннями <code>position</code>, наприклад <code>/* … */</code>.';
            const ok = notes.find(s => /absolute/.test(s) && /fixed/.test(s));
            if (!ok) return 'Не всі такі значення названо. Перевір колонку «У потоці?» у таблиці.';
            return !/relative|static|sticky/.test(ok) || 'Зайве значення: <code>relative</code>, <code>static</code> і <code>sticky</code> залишають місце в потоці.';
          },
        },
      ],
    },
  ],
};
