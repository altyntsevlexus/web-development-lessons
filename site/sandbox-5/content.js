const { pre, c } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
const BASE_CSS = `
body { font-family: Georgia, serif; background-color: #f0f4f8; color: #1a1a2e; }
.site-header { background-color: #0f3460; color: #ffffff; padding: 24px 32px; }
.site-title { margin: 0; font-size: 2rem; }
.site-tagline { margin: 6px 0 0; color: #a8b2d8; font-size: 1rem; }
.nav-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; gap: 24px; }
.nav-item { font-size: 0.95rem; cursor: pointer; color: #e0e0e0; }
.hero-banner {
  height: 160px; display: flex; align-items: flex-end; padding: 0 32px;
  background-color: #16213e;
  background-image:
    radial-gradient(circle at 78% 40%, #f4a261 0 34px, #e76f51 35px 38px, transparent 39px),
    radial-gradient(circle at 20% 30%, #fff 0 1px, transparent 2px),
    radial-gradient(circle at 45% 70%, #fff 0 1px, transparent 2px),
    radial-gradient(circle at 60% 20%, #fff 0 1.5px, transparent 2.5px),
    radial-gradient(circle at 90% 85%, #fff 0 1px, transparent 2px),
    linear-gradient(160deg, #16213e, #0f3460 60%, #533483);
}
.hero-text { color: #e0e0e0; font-size: 0.9rem; letter-spacing: 0.05em; }
.main-content { padding: 32px; }
.article-preview { background-color: #ffffff; margin-bottom: 32px; }
.article-preview__title { font-size: 1.4rem; color: #0f3460; margin: 0 0 8px; }
.article-preview__text { margin: 0; line-height: 1.7; color: #444; }
.team-section { margin-bottom: 32px; }
.author-card { display: inline-block; text-align: center; }
.author-avatar {
  width: 80px; height: 80px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #533483, #0f3460); color: #fff; font-weight: bold; font-size: 1.4rem;
  border: 3px solid #a8b2d8;
}
.author-name { margin: 8px 0 0; font-weight: bold; color: #0f3460; }
.author-role { margin: 4px 0 0; font-size: 0.85rem; color: #666; }
.fact-card { border: 2px solid #0f3460; background-color: #e8f4fd; margin-bottom: 32px; }
.fact-card__title { margin: 0 0 8px; font-size: 1.1rem; color: #0f3460; }
.fact-card__text { margin: 0; font-style: italic; line-height: 1.7; color: #1a1a2e; }
.article-body { margin-bottom: 32px; }
.section-title { font-size: 1.5rem; color: #0f3460; margin: 0 0 8px; }
.article-body p { line-height: 1.7; color: #333; }
.promo { background: #fff3cd; color: #7a5a00; border: 1px dashed #e0b000; padding: 10px 16px; margin-bottom: 32px; font-size: 0.9rem; }
.newsletter-banner { width: 300px; background-color: #16213e; color: #ffffff; margin-bottom: 32px; }
.newsletter-banner__text { margin: 0; text-align: center; font-size: 0.95rem; }
.featured-quote { background-color: #ffffff; border-left: 5px solid #0f3460; padding: 20px 24px; font-size: 1.2rem; font-style: italic; color: #333; margin: 0 0 32px; }
.featured-quote__author { display: block; margin-top: 12px; font-size: 0.9rem; font-style: normal; color: #666; }
.mission-log { background-color: #ffffff; border: 2px solid #b0c4de; padding: 16px; height: 120px; margin-bottom: 32px; }
.mission-log__title { margin: 0 0 8px; font-size: 1rem; color: #0f3460; }
.mission-log p { margin: 4px 0; font-size: 0.88rem; color: #444; }
.site-footer { background-color: #0f3460; color: #a8b2d8; padding: 20px 32px; text-align: center; font-size: 0.85rem; }
.site-footer__text { margin: 0; }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Space Explorer</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <h1 class="site-title">Space Explorer</h1>
    <p class="site-tagline">Твій путівник космосом</p>
    <nav class="site-nav">
      <ul class="nav-list">
        <li class="nav-item">Головна</li>
        <li class="nav-item">Статті</li>
        <li class="nav-item nav-item--soon">Premium</li>
        <li class="nav-item">Про нас</li>
      </ul>
    </nav>
  </header>

  <div class="hero-banner">
    <p class="hero-text">Місія «Юпітер» · 2026</p>
  </div>

  <main class="main-content">
    <div class="container">
      <div class="article-preview">
        <h2 class="article-preview__title">Юпітер — планета-гігант</h2>
        <p class="article-preview__text">Юпітер — найбільша планета Сонячної системи. Його Велика червона пляма — це буря, яка вирує вже понад 350 років. А доба на Юпітері триває лише 10 годин.</p>
      </div>

      <div class="team-section">
        <div class="author-card">
          <div class="author-avatar">АК</div>
          <p class="author-name">Д-р Анна Коваль</p>
          <p class="author-role">Астрофізикиня</p>
        </div>
      </div>

      <div class="fact-card">
        <h3 class="fact-card__title">А ти знав?</h3>
        <p class="fact-card__text">Світло від Сонця летить до Землі приблизно 8 хвилин 20 секунд. Коли ти дивишся на Сонце, ти бачиш його таким, яким воно було понад 8 хвилин тому.</p>
      </div>

      <section class="article-body">
        <h2 class="section-title">Сонячна система</h2>
        <p>Сонячна система утворилася 4,6 мільярда років тому з гігантської хмари газу й пилу.</p>
        <p>Майже вся її маса зосереджена в Сонці, а більша частина решти — в Юпітері.</p>
        <p>Чотири внутрішні планети — Меркурій, Венера, Земля і Марс — складаються з каменю та металу.</p>
        <p>Між Марсом і Юпітером розташований пояс астероїдів — тисячі кам'яних уламків.</p>
      </section>

      <div class="promo">Реклама: телескоп «Зоряний» всього за 999 ₴!</div>

      <div class="newsletter-banner">
        <p class="newsletter-banner__text">Підпишись — нові статті щопонеділка!</p>
      </div>

      <blockquote class="featured-quote">
        «Всесвіт не зобов'язаний бути зрозумілим для тебе.»
        <cite class="featured-quote__author">— Ніл деГрасс Тайсон</cite>
      </blockquote>

      <div class="mission-log">
        <h3 class="mission-log__title">Журнал місії</h3>
        <p>День 1: Старт з космодрому о 09:00.</p>
        <p>День 3: Вийшли на орбіту Землі. Усі системи в нормі.</p>
        <p>День 7: Пролетіли повз Місяць. Чудовий вигляд на кратери.</p>
        <p>День 14: Перетинаємо пояс астероїдів. Загрози немає.</p>
        <p>День 30: Юпітер видно неозброєним оком!</p>
        <p>Код сигналу: 7F3A9C2E4B1D8F6A0C5E7B9D3F1A2C4E6B8D0F7A9C</p>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p class="site-footer__text">© 2026 Space Explorer. Усі права захищені.</p>
  </footer>
</body>
</html>
`;

const STYLE_CSS = `/* Пиши свої CSS-правила тут.
   Перегляд праворуч оновлюється сам,
   а «▶ Перевірити» перевіряє завдання. */

`;

const px = v => parseFloat(v) || 0;
const sides = ['top', 'right', 'bottom', 'left'];

window.LESSON = {
  id: 'lesson-5',
  num: '05',
  title: 'Блокова модель',
  back: '../lesson-5.html',
  next: '../lesson-6.html',
  files: {
    'base.css':   { code: BASE_CSS, hidden: true },
    'index.html': { code: PAGE_HTML, editable: true },
    'style.css':  { code: STYLE_CSS, editable: true },
  },
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'Блокова модель: width і height',
      focus: 'style.css',
      body: `
        <p>Праворуч — блог <strong>Space Explorer</strong>. Браузер бачить кожен елемент цієї сторінки як <strong>прямокутну коробку</strong>. У кожної коробки чотири шари — зсередини назовні:</p>
        <ul>
          <li><strong>content</strong> — сам вміст; його розмір задають ${c('width')} і ${c('height')};</li>
          <li><strong>padding</strong> — внутрішній відступ між вмістом і рамкою;</li>
          <li><strong>border</strong> — рамка;</li>
          <li><strong>margin</strong> — зовнішній відступ, простір до сусідів.</li>
        </ul>
        <p>За замовчуванням браузер сам підлаштовує розмір під вміст. Але можна задати точні розміри:</p>
        ${pre(`p {
  width: 240px;
  height: 80px;
}`)}
        <div class="note">Фіксовані пікселі дають точний розмір, але на телефоні можуть зламати макет. Про гнучкі розміри — у вправі 5.</div>`,
      tasks: [
        {
          text: `<p>Космічний банер під шапкою (${c('.hero-banner')}) зараз низенький. Зроби його висоту ${c('300px')}.</p>`,
          solution: { file: 'style.css', code: `.hero-banner {\n  height: 300px;\n}` },
          check: t => {
            if (!t.rule('.hero-banner')) return 'Не знайдено правила з селектором <code>.hero-banner</code>.';
            return t.is('.hero-banner', 'height', '300px') || 'Висота банера ще не 300px. Потрібна властивість <code>height</code>.';
          },
        },
        {
          text: `<p>Аватар автора (${c('.author-avatar')}) замалий. Зроби його квадратом ${c('120px')} на ${c('120px')}.</p>`,
          hint: `<p>Квадрат — це коли ширина (${c('width')}) дорівнює висоті (${c('height')}). Потрібні обидві властивості.</p>`,
          solution: { file: 'style.css', code: `.author-avatar {\n  width: 120px;\n  height: 120px;\n}` },
          check: t => {
            const w = t.is('.author-avatar', 'width', '120px'), h = t.is('.author-avatar', 'height', '120px');
            if (w && h) return true;
            if (w || h) return `Задано лише ${w ? '<code>width</code>' : '<code>height</code>'}. Для квадрата потрібні обидві властивості по 120px.`;
            return 'Аватар ще не 120×120. Напиши правило для <code>.author-avatar</code> з <code>width</code> і <code>height</code>.';
          },
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: 'Рамка і закруглення кутів',
      body: `
        <p><strong>${c('border')}</strong> — лінія навколо елемента. Потрібні три значення: <em>товщина, стиль, колір</em>:</p>
        ${pre(`p {
  border: 3px solid coral;
}`)}
        <p>Стилі лінії: ${c('solid')} (суцільна), ${c('dashed')} (штрихи), ${c('dotted')} (крапки), ${c('none')} (немає). Без стилю рамку не видно взагалі!</p>
        <p><strong>${c('border-radius')}</strong> закруглює кути. Значення — радіус закруглення:</p>
        ${pre(`div {
  border-radius: 8px;   /* м'які кути */
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;   /* ідеальне коло */
}`)}
        <div class="note">${c('border-radius: 50%')} дає коло, лише якщо ширина дорівнює висоті. Інакше вийде овал.</div>`,
      tasks: [
        {
          text: `<p>Картка статті про Юпітер (${c('.article-preview')}) зливається з фоном. Дай їй <strong>суцільну</strong> рамку товщиною ${c('2px')} кольору ${c('#0f3460')}.</p>`,
          solution: { file: 'style.css', code: `.article-preview {\n  border: 2px solid #0f3460;\n}` },
          check: t => {
            const s = '.article-preview';
            if (!t.rule(s)) return 'Не знайдено правила з селектором <code>.article-preview</code>.';
            if (!t.is(s, 'border-top-style', 'solid')) return 'Рамки не видно або вона не суцільна. Стиль лінії — <code>solid</code>.';
            if (!t.is(s, 'border-top-width', '2px')) return 'Товщина рамки має бути <code>2px</code>.';
            return t.is(s, 'border-top-color', '#0f3460') || 'Колір рамки має бути <code>#0f3460</code>.';
          },
        },
        {
          text: `<p>Закругли кути цієї ж картки на ${c('12px')}.</p>`,
          solution: { file: 'style.css', code: `.article-preview {\n  border-radius: 12px;\n}` },
          check: t => t.is('.article-preview', 'border-top-left-radius', '12px') ||
            'Кути картки ще не закруглені на 12px. Потрібна властивість <code>border-radius</code>.',
        },
        {
          text: `<p>Перетвори квадратний аватар автора на <strong>коло</strong>.</p>`,
          hint: `<p>Аватар уже квадратний (120×120). Яке значення ${c('border-radius')} робить з квадрата коло?</p>`,
          solution: { file: 'style.css', code: `.author-avatar {\n  border-radius: 50%;\n}` },
          check: t => {
            if (t.is('.author-avatar', 'border-top-left-radius', '50%')) return true;
            if (px(t.css('.author-avatar', 'border-top-left-radius')) > 0) return 'Кути закруглені, але це ще не коло. Спробуй значення у відсотках — <code>50%</code>.';
            return 'Аватар ще квадратний. Додай <code>.author-avatar</code> властивість <code>border-radius</code>.';
          },
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'Внутрішній відступ (padding)',
      body: `
        <p><strong>Padding</strong> — простір між вмістом і рамкою. Він «заливається» кольором фону елемента. Записати його можна по-різному:</p>
        ${pre(`p {
  padding: 10px;            /* з усіх чотирьох боків */
  padding: 10px 20px;       /* верх/низ  ліво/право */
  padding: 5px 10px 15px;   /* верх  ліво/право  низ */
  padding: 5px 10px 15px 20px; /* верх право низ ліво — за годинниковою стрілкою */
}`)}
        <p>Або кожен бік окремо:</p>
        ${pre(`p {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}`)}`,
      tasks: [
        {
          text: `<p>Текст у картці статті (${c('.article-preview')}) впирається в рамку. Дай картці внутрішній відступ ${c('20px')} з усіх боків.</p>`,
          solution: { file: 'style.css', code: `.article-preview {\n  padding: 20px;\n}` },
          check: t => sides.every(s => t.is('.article-preview', `padding-${s}`, '20px')) ||
            'Картці потрібен <code>padding</code> 20px з <em>усіх</em> чотирьох боків.',
        },
        {
          text: `<p>Картці «А ти знав?» (${c('.fact-card')}) дай відступ ${c('16px')} зверху й знизу та ${c('24px')} зліва й справа — <strong>одним</strong> рядком ${c('padding')}.</p>`,
          hint: `<p>Коли в ${c('padding')} два значення, перше — для верху й низу, друге — для лівого й правого боку.</p>`,
          solution: { file: 'style.css', code: `.fact-card {\n  padding: 16px 24px;\n}` },
          check: t => {
            const s = '.fact-card';
            if (!(t.is(s, 'padding-top', '16px') && t.is(s, 'padding-bottom', '16px'))) return 'Зверху й знизу картки має бути 16px.';
            return (t.is(s, 'padding-left', '24px') && t.is(s, 'padding-right', '24px')) || 'Зліва й справа картки має бути 24px.';
          },
        },
        {
          text: `<p>У цитати (${c('.featured-quote')}) уже є відступи ${c('20px')} зверху/знизу і ${c('24px')} з боків. Збільш <strong>лише лівий</strong> відступ до ${c('48px')} — інші мають лишитись як були.</p>`,
          hint: `<p>Для одного боку є окрема властивість: ${c('padding-left')}.</p>`,
          solution: { file: 'style.css', code: `.featured-quote {\n  padding-left: 48px;\n}` },
          check: t => {
            const s = '.featured-quote';
            if (!t.is(s, 'padding-left', '48px')) return 'Лівий відступ цитати ще не 48px.';
            return (t.is(s, 'padding-top', '20px') && t.is(s, 'padding-right', '24px')) ||
              'Лівий відступ правильний, але змінились і інші боки. Зміни лише <code>padding-left</code>.';
          },
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'Зовнішній відступ (margin)',
      body: `
        <p><strong>Margin</strong> — простір <em>зовні</em> рамки, між елементом і його сусідами. Скорочений запис — такий самий, як у padding:</p>
        ${pre(`p {
  margin: 20px;       /* з усіх боків */
  margin-top: 24px;   /* лише зверху */
}

.box {
  width: 300px;
  margin: 0 auto;     /* центрування по горизонталі */
}`)}
        <p>${c('auto')} ділить вільне місце порівну між лівим і правим боком — і блок стає по центру. Це працює, лише якщо в блоку є ширина (${c('width')}).</p>
        <div class="note"><strong>Злиття margin:</strong> вертикальні відступи двох сусідніх елементів не додаються, а <em>зливаються</em> — лишається більший. Горизонтальні завжди додаються.</div>`,
      tasks: [
        {
          text: `<p>Абзаци в розділі «Сонячна система» (${c('.article-body p')}) стоять надто щільно. Задай їм зовнішній відступ <strong>зверху</strong> ${c('24px')}.</p>`,
          solution: { file: 'style.css', code: `.article-body p {\n  margin-top: 24px;\n}` },
          check: t => t.all('.article-body p', 'margin-top', '24px') ||
            'Верхній margin абзаців у <code>.article-body</code> ще не 24px. Підійде селектор <code>.article-body p</code>.',
        },
        {
          text: `<p>Банер розсилки (${c('.newsletter-banner')}, ширина 300px) притиснутий до лівого краю. Відцентруй його по горизонталі, а знизу залиш ${c('32px')}.</p>`,
          hint: `<p>Верх — ${c('0')}, ліво/право — ${c('auto')}, низ — ${c('32px')}. У скороченому записі з трьома значеннями порядок такий: верх, ліво/право, низ.</p>`,
          solution: { file: 'style.css', code: `.newsletter-banner {\n  margin: 0 auto 32px;\n}` },
          check: t => {
            const s = '.newsletter-banner';
            const l = px(t.css(s, 'margin-left')), r = px(t.css(s, 'margin-right'));
            if (!(l > 1 && Math.abs(l - r) < 1)) return 'Банер ще не по центру. Лівому й правому margin потрібне значення <code>auto</code>.';
            return t.is(s, 'margin-bottom', '32px') || 'Банер по центру, але знизу має лишитись <code>32px</code>.';
          },
        },
        {
          text: `<p>Подумай: у абзаців тепер ${c('margin-top: 24px')}, а знизу браузер дає їм ${c('16px')}. Яка <strong>реальна</strong> відстань між двома абзацами? Впиши відповідь у ${c('style.css')} коментарем, наприклад ${c('/* 40 */')}.</p>`,
          hint: `<p>Вертикальні margin сусідів зливаються — лишається <em>більший</em> з двох, а не сума.</p>`,
          check: t => {
            const nums = [...t.code('style.css').matchAll(/\/\*\s*(\d+)\s*(?:px)?\s*\*\//g)].map(m => +m[1]);
            if (nums.includes(24)) return true;
            if (nums.length) return 'Не те число. Вертикальні відступи не додаються — вони зливаються. Котрий з двох лишається?';
            return 'Не знайдено коментаря з числом, наприклад <code>/* 40 */</code>.';
          },
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'Мінімальні й максимальні розміри',
      body: `
        <p>Замість точного розміру можна задати <strong>межі</strong>: елемент підлаштовується під екран, але не виходить за них.</p>
        ${pre(`p {
  min-width: 300px;   /* не вужче */
  max-width: 600px;   /* не ширше */
  min-height: 150px;  /* не нижче */
  max-height: 300px;  /* не вище */
}`)}
        <p>Різниця з ${c('width')}: ${c('width: 600px')} — завжди рівно 600px, навіть на вузькому телефоні. ${c('max-width: 600px')} — до 600px, а на вузькому екрані блок просто стане вужчим.</p>
        <div class="note">Якщо ${c('max-height')} замалий, вміст «вилазить» за межі елемента. Що з цим робити — у наступній вправі.</div>`,
      tasks: [
        {
          text: `<p>Цитата (${c('.featured-quote')}) розтягується на всю ширину. Обмеж її ширину: <strong>не більше</strong> ${c('360px')}.</p>`,
          solution: { file: 'style.css', code: `.featured-quote {\n  max-width: 360px;\n}` },
          check: t => {
            if (t.is('.featured-quote', 'max-width', '360px')) return true;
            if (t.declIs('.featured-quote', 'width', '360px')) return 'Ти задав точну ширину <code>width</code>. А потрібна максимальна — <code>max-width</code>.';
            return 'Максимальна ширина цитати ще не 360px.';
          },
        },
        {
          text: `<p>Зроби так, щоб цитата була <strong>не нижчою</strong> за ${c('140px')}, навіть якщо тексту мало.</p>`,
          solution: { file: 'style.css', code: `.featured-quote {\n  min-height: 140px;\n}` },
          check: t => {
            if (t.is('.featured-quote', 'min-height', '140px')) return true;
            if (t.declIs('.featured-quote', 'height', '140px')) return 'Ти задав точну висоту <code>height</code>. А потрібна мінімальна — <code>min-height</code>.';
            return 'Мінімальна висота цитати ще не 140px.';
          },
        },
        {
          text: `<p>Експеримент: обмеж висоту картки «А ти знав?» (${c('.fact-card')}) — <strong>не вище</strong> ${c('80px')}. Подивись, що станеться з текстом.</p>`,
          solution: { file: 'style.css', code: `.fact-card {\n  max-height: 80px;\n}` },
          check: t => t.is('.fact-card', 'max-height', '80px') || 'Максимальна висота картки <code>.fact-card</code> ще не 80px.',
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'Переповнення (overflow)',
      body: `
        <p>Коли вміст більший за свою коробку, ${c('overflow')} вирішує, що з ним робити:</p>
        ${pre(`div { overflow: visible; } /* за замовчуванням — вилазить за межі */
div { overflow: hidden; }  /* зайве обрізається */
div { overflow: scroll; }  /* з'являється прокрутка */
div { overflow: auto; }    /* прокрутка лише коли вона потрібна */`)}
        <p>Можна керувати осями окремо: ${c('overflow-x')} — по горизонталі, ${c('overflow-y')} — по вертикалі.</p>
        <p>Подивись на «Журнал місії» внизу сторінки: у нього ${c('height: 120px')}, а записів набагато більше — текст налазить на підвал.</p>`,
      tasks: [
        {
          text: `<p>Зроби так, щоб «Журнал місії» (${c('.mission-log')}) можна було <strong>прокручувати</strong>, а текст не вилазив за рамку.</p>`,
          solution: { file: 'style.css', code: `.mission-log {\n  overflow: scroll;\n}` },
          check: t => ['scroll', 'auto'].includes(t.css('.mission-log', 'overflow-y')) ||
            (t.css('.mission-log', 'overflow-y') === 'hidden'
              ? 'Зараз зайвий текст просто обрізається — його не прочитати. Потрібна прокрутка: <code>scroll</code> або <code>auto</code>.'
              : 'Журнал ще не прокручується. Додай <code>.mission-log</code> властивість <code>overflow</code>.'),
        },
        {
          text: `<p>Довгий «Код сигналу» додав журналу ще й <strong>горизонтальну</strong> прокрутку. Заборони прокрутку по горизонталі (зайве обріж), а вертикальну залиш.</p>`,
          hint: `<p>Для однієї осі є окрема властивість: ${c('overflow-x')}. Яке значення обрізає зайве?</p>`,
          solution: { file: 'style.css', code: `.mission-log {\n  overflow-x: hidden;\n}` },
          check: t => {
            if (t.css('.mission-log', 'overflow-x') !== 'hidden') return 'Горизонтальна прокрутка ще є. Потрібно <code>overflow-x: hidden;</code>';
            return ['scroll', 'auto'].includes(t.css('.mission-log', 'overflow-y')) ||
              'Горизонталь обрізана, але зникла й вертикальна прокрутка. Перевір <code>overflow-y</code>.';
          },
        },
        {
          text: `<p>Повернись до картки «А ти знав?»: після ${c('max-height')} її текст вилазить за рамку. Цього разу <strong>обріж</strong> зайве, без прокрутки.</p>`,
          solution: { file: 'style.css', code: `.fact-card {\n  overflow: hidden;\n}` },
          check: t => {
            const v = t.css('.fact-card', 'overflow-y');
            if (v === 'hidden' || v === 'clip') return true;
            if (v === 'scroll' || v === 'auto') return 'Це прокрутка. А завдання — просто обрізати зайве.';
            return 'Текст картки <code>.fact-card</code> ще вилазить. Яке значення <code>overflow</code> обрізає?';
          },
        },
      ],
    },

    // ── 7 ──────────────────────────────────────────────────────────
    {
      title: 'Скидання стилів і box-sizing',
      body: `
        <p>Браузер сам додає елементам ${c('margin')} і ${c('padding')} — тому, наприклад, навколо шапки є біла смужка. Розробники на самому початку CSS скидають ці відступи:</p>
        ${pre(`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`)}
        <p>Значення ${c('0')} не потребує одиниць. А твої власні правила (як ${c('margin-top: 24px')}) не зникнуть — у них вища специфічність, ніж у ${c('*')}.</p>
        <p><strong>${c('box-sizing')}.</strong> За замовчуванням (${c('content-box')}) ${c('width')} — це ширина лише <em>вмісту</em>, а padding і border додаються зверху:</p>
        ${pre(`.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* реальна ширина = 200 + 20×2 + 2×2 = 244px */
}`)}
        <p>З ${c('box-sizing: border-box')} padding і border вписуються <em>всередину</em> width. Що написав — стільки місця й займає: рівно 200px.</p>`,
      tasks: [
        {
          text: `<p>Скинь стандартні браузерні ${c('margin')} і ${c('padding')} для <strong>всіх</strong> елементів сторінки. Біла смужка навколо шапки має зникнути.</p>`,
          hint: `<p>Який селектор вибирає всі елементи? Його вивчали в уроці 3.</p>`,
          solution: { file: 'style.css', code: `* {\n  margin: 0;\n  padding: 0;\n}` },
          check: t => {
            if (!t.rule('*')) return 'Не знайдено правила з селектором <code>*</code>.';
            if (!t.declIs('*', 'margin-top', '0')) return 'У правилі <code>*</code> немає <code>margin: 0;</code>';
            if (!t.declIs('*', 'padding-top', '0')) return 'У правилі <code>*</code> немає <code>padding: 0;</code>';
            return t.is('body', 'margin-top', '0px') || 'Відступ навколо сторінки не зник. Чи не перебиває його інше правило?';
          },
        },
        {
          text: `<p>Дай банеру розсилки (${c('.newsletter-banner')}) внутрішній відступ ${c('16px')} зверху/знизу і ${c('40px')} з боків. Подивись: банер став ширшим за свої 300px!</p>`,
          solution: { file: 'style.css', code: `.newsletter-banner {\n  padding: 16px 40px;\n}` },
          check: t => {
            const s = '.newsletter-banner';
            return (t.is(s, 'padding-top', '16px') && t.is(s, 'padding-left', '40px') && t.is(s, 'padding-right', '40px')) ||
              'Банеру потрібен <code>padding</code>: 16px зверху/знизу, 40px зліва/справа.';
          },
        },
        {
          text: `<p>Порахуй: 300 + 40 + 40 = 380px. Виправ це для <strong>всіх</strong> елементів одразу — так, щоб банер знову займав рівно ${c('300px')} разом із відступами.</p>`,
          hint: `<p>Додай ${c('box-sizing')} з потрібним значенням у правило ${c('*')}.</p>`,
          solution: { file: 'style.css', code: `* {\n  box-sizing: border-box;\n}` },
          check: t => {
            if (!t.declIs('*', 'box-sizing', 'border-box')) {
              return t.is('.newsletter-banner', 'box-sizing', 'border-box')
                ? 'Для банера спрацювало, але завдання — для всіх елементів. Додай <code>box-sizing</code> у правило <code>*</code>.'
                : 'Потрібна властивість <code>box-sizing: border-box;</code> у правилі <code>*</code>.';
            }
            return t.$('.newsletter-banner').offsetWidth === 300 ||
              'box-sizing є, але банер не 300px завширшки. Чи не змінив ти його <code>width</code>?';
          },
        },
      ],
    },

    // ── 8 ──────────────────────────────────────────────────────────
    {
      title: 'Видимість: visibility і display',
      body: `
        <p>Сховати елемент можна двома способами — і вони поводяться по-різному:</p>
        ${pre(`.hidden { visibility: hidden; } /* невидимий, але місце займає */
.gone   { display: none; }      /* повністю зникає з макету */`)}
        <table>
          <tr><th>Властивість</th><th>Видно?</th><th>Займає місце?</th></tr>
          <tr><td>${c('visibility: visible')}</td><td>Так</td><td>Так</td></tr>
          <tr><td>${c('visibility: hidden')}</td><td>Ні</td><td><strong>Так</strong></td></tr>
          <tr><td>${c('display: none')}</td><td>Ні</td><td><strong>Ні</strong></td></tr>
        </table>`,
      tasks: [
        {
          text: `<p>Розділ «Premium» у меню (${c('.nav-item--soon')}) ще не готовий. Сховай його так, щоб на його місці лишилась <strong>порожнеча</strong>, — сусідні пункти не мають зсуватися.</p>`,
          solution: { file: 'style.css', code: `.nav-item--soon {\n  visibility: hidden;\n}` },
          check: t => {
            const s = '.nav-item--soon';
            if (t.css(s, 'display') === 'none') return 'Пункт зник разом зі своїм місцем — «Про нас» зсунувся. Потрібен спосіб, який лишає місце.';
            return t.is(s, 'visibility', 'hidden') || 'Пункт «Premium» ще видно.';
          },
        },
        {
          text: `<p>Рекламу телескопа (${c('.promo')}) прибери <strong>повністю</strong> — щоб від неї не лишилось навіть порожнього місця.</p>`,
          solution: { file: 'style.css', code: `.promo {\n  display: none;\n}` },
          check: t => {
            const s = '.promo';
            if (t.css(s, 'display') === 'none') return true;
            if (t.is(s, 'visibility', 'hidden')) return 'Рекламу не видно, але порожнє місце лишилось. Потрібен інший спосіб.';
            return 'Реклама ще на сторінці.';
          },
        },
      ],
    },
  ],
};
