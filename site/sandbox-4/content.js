const { pre, c } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
const BASE_CSS = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; color: #222; line-height: 1.6; }
.site-header { padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
.site-nav { display: flex; gap: 24px; }
.site-nav a { text-decoration: none; color: inherit; white-space: nowrap; }
.hero { height: 400px; display: flex; align-items: center; justify-content: center; background-color: #2a2a4a; }
.hero-overlay { padding: 40px; color: white; }
.hero-subtitle { margin-top: 12px; font-size: 1.1rem; color: #ccc; }
.about, .tracks { max-width: 800px; margin: 48px auto; padding: 0 32px; }
.section-title { margin-bottom: 20px; font-size: 1.8rem; }
.about-text { margin-bottom: 14px; line-height: 1.8; color: #444; }
.track-list { list-style: none; border-top: 1px solid #eee; }
.track-item { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid #eee; }
.track-num { font-size: 0.85rem; color: #999; width: 28px; }
.track-name { flex: 1; font-weight: 500; }
.track-duration { font-size: 0.85rem; color: #999; font-family: monospace; }
.site-footer { background-color: #1a1a2e; color: #888; padding: 20px 40px; text-align: center; font-size: 0.85rem; }
`;

const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>SoundWave Band</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <h1 class="band-name">SoundWave</h1>
    <nav class="site-nav">
      <a class="nav-link" href="#">Про нас</a>
      <a class="nav-link" href="#">Музика</a>
      <a class="nav-link" href="#">Концерти</a>
      <a class="nav-link" href="#">Контакт</a>
    </nav>
  </header>

  <section class="hero">
    <div class="hero-overlay">
      <h2 class="hero-title">Наш новий альбом</h2>
      <p class="hero-subtitle">«Electric Sky» — вже доступний на всіх платформах</p>
    </div>
  </section>

  <section class="about">
    <h2 class="section-title">Про гурт</h2>
    <p class="about-text">SoundWave — це тріо з Харкова, яке грає на перетині електронної музики та рок-звучання.
      Заснований у 2019 році, гурт швидко здобув популярність завдяки яскравим живим виступам та
      самобутньому звуку.</p>
    <p class="about-text">Наша музика — це подорож: від тихих електронних пейзажів до потужних гітарних риффів.</p>
  </section>

  <section class="tracks">
    <h2 class="section-title">Треки з альбому</h2>
    <ul class="track-list">
      <li class="track-item">
        <span class="track-num">01</span>
        <span class="track-name">Night Drive</span>
        <span class="track-duration">3:42</span>
      </li>
      <li class="track-item">
        <span class="track-num">02</span>
        <span class="track-name">Summer Rain</span>
        <span class="track-duration">4:15</span>
      </li>
      <li class="track-item">
        <span class="track-num">03</span>
        <span class="track-name">Electric Sky</span>
        <span class="track-duration">5:01</span>
      </li>
      <li class="track-item">
        <span class="track-num">04</span>
        <span class="track-name">Midnight Echo</span>
        <span class="track-duration">3:58</span>
      </li>
      <li class="track-item">
        <span class="track-num">05</span>
        <span class="track-name">Horizon Line</span>
        <span class="track-duration">4:33</span>
      </li>
    </ul>
  </section>

  <footer class="site-footer">
    <p class="footer-text">© 2026 SoundWave Band. Усі права захищені.</p>
  </footer>
</body>
</html>
`;

const STYLE_CSS = `/* Пиши свої CSS-правила тут.
   Перегляд праворуч оновлюється сам,
   а «▶ Перевірити» перевіряє завдання. */

`;

const HERO_IMG = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80';

window.LESSON = {
  id: 'lesson-4',
  num: '04',
  title: 'CSS Візуальні правила',
  back: '../lesson-4.html',
  next: '../lesson-5.html',
  files: {
    'base.css':   { code: BASE_CSS, hidden: true },
    'index.html': { code: PAGE_HTML, editable: true },
    'style.css':  { code: STYLE_CSS, editable: true },
  },
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'Шрифт: font-family',
      focus: 'style.css',
      body: `
        <p>Праворуч — сторінка гурту <strong>SoundWave</strong>. Поки що вона дуже проста: чорний текст на білому, стандартний шрифт. За цей урок ти перетвориш її на справжню афішу. Пиши код у ${c('style.css')}.</p>
        <p>Властивість ${c('font-family')} задає шрифт тексту:</p>
        ${pre(`h1 {
  font-family: Garamond;
}

h2 {
  font-family: "Courier New"; /* кілька слів — у лапках */
}`)}
        <p>Через кому можна вказати <strong>запасний</strong> шрифт — браузер візьме його, якщо першого немає на комп'ютері:</p>
        ${pre(`p {
  font-family: Georgia, serif;
}`)}
        <div class="note">Шрифт має бути встановлений на комп'ютері користувача. Якщо його немає — браузер покаже запасний, а без запасного — стандартний (зазвичай Times New Roman). Тому запасний шрифт ${c('serif')}, ${c('sans-serif')} чи ${c('monospace')} варто писати завжди.</div>`,
      tasks: [
        {
          text: `<p>Одним правилом зміни шрифт <strong>усіх</strong> заголовків ${c('h1')} і ${c('h2')} на ${c('Georgia')}, а як запасний вкажи ${c('serif')}.</p>`,
          hint: `<p>Згадай групування з минулого уроку: селектори через кому. А шрифти в значенні теж ідуть через кому.</p>`,
          solution: { file: 'style.css', code: `h1, h2 {\n  font-family: Georgia, serif;\n}` },
          check: t => {
            if (!/georgia/i.test(t.css('.section-title', 'font-family'))) return 'Заголовки <code>h2</code> («Про гурт», «Треки з альбому») ще не Georgia.';
            // .band-name (task 2) may override h1 later, so also accept a Georgia rule that targets h1
            const h1Rule = ['h1, h2', 'h2, h1', 'h1'].map(s => t.decl(s, 'font-family')).join(' ');
            if (!/georgia/i.test(t.css('h1', 'font-family')) && !/georgia/i.test(h1Rule)) return 'Заголовок <code>h1</code> (SoundWave) ще не Georgia — додай його в селектор.';
            return /serif/i.test(t.css('h2', 'font-family').replace(/sans-serif/gi, '')) ||
              'Не вистачає запасного шрифту: після <code>Georgia</code> через кому напиши <code>serif</code>.';
          },
        },
        {
          text: `<p>Назва гурту ${c('.band-name')} має виглядати як напис з друкарської машинки. Задай їй шрифт ${c('Courier New')} (назва з двох слів!) із запасним ${c('monospace')}.</p>`,
          hint: `<p>Правило для класу ${c('.band-name')} сильніше за правило для ${c('h1')}, тож воно перемагає Georgia. Назву з пробілом бери в лапки.</p>`,
          solution: { file: 'style.css', code: `.band-name {\n  font-family: "Courier New", monospace;\n}` },
          check: t => {
            if (!/courier new/i.test(t.css('.band-name', 'font-family'))) return 'Назва гурту ще не <code>Courier New</code>. Потрібне правило з селектором <code>.band-name</code>.';
            if (!t.has('style.css', /["']courier new["']/i)) return 'Шрифт працює, але назву з двох слів треба взяти в лапки: <code>"Courier New"</code>.';
            return /monospace/i.test(t.css('.band-name', 'font-family')) || 'Додай запасний шрифт <code>monospace</code> через кому.';
          },
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: 'Розмір і жирність шрифту',
      focus: 'style.css',
      body: `
        <p><strong>${c('font-size')}</strong> задає розмір тексту. Найпоширеніша одиниця — пікселі:</p>
        ${pre(`p {
  font-size: 18px;
}`)}
        <p>Є й відносні одиниці: ${c('em')} (відносно батьківського елемента), ${c('rem')} (відносно кореневого, зазвичай 1rem = 16px) і ${c('%')}. Наприклад, ${c('2rem')} — це 32px.</p>
        <p><strong>${c('font-weight')}</strong> задає товщину (жирність) шрифту:</p>
        ${pre(`p    { font-weight: bold; }   /* жирний */
span { font-weight: normal; } /* звичайний */`)}
        <p>Замість слів можна писати числа від ${c('100')} (найтонший) до ${c('900')} (найжирніший). ${c('normal')} = ${c('400')}, ${c('bold')} = ${c('700')}.</p>`,
      tasks: [
        {
          text: `<p>Заголовок банера «Наш новий альбом» (${c('.hero-title')}) має домінувати на сторінці. Зроби його розмір ${c('3rem')}.</p>`,
          solution: { file: 'style.css', code: `.hero-title {\n  font-size: 3rem;\n}` },
          check: t => t.is('.hero-title', 'font-size', '48px') ||
            'Розмір <code>.hero-title</code> ще не <code>3rem</code> (це 48px). Перевір селектор з крапкою і назву <code>font-size</code>.',
        },
        {
          text: `<p>Текст розділу «Про гурт» (${c('.about-text')}) дрібнуватий. Збільш його до ${c('18px')}.</p>`,
          solution: { file: 'style.css', code: `.about-text {\n  font-size: 18px;\n}` },
          check: t => t.all('.about-text', 'font-size', '18px') ||
            'Абзаци <code>.about-text</code> ще не <code>18px</code>.',
        },
        {
          text: `<p>Зроби посилання меню (${c('.nav-link')}) жирними, а назви треків (${c('.track-name')}) — <strong>найжирнішими</strong>, числом ${c('900')}.</p>`,
          hint: `<p>Тут два окремі правила: одне для ${c('.nav-link')} зі словом ${c('bold')}, друге для ${c('.track-name')} з числом.</p>`,
          solution: { file: 'style.css', code: `.nav-link {\n  font-weight: bold;\n}\n\n.track-name {\n  font-weight: 900;\n}` },
          check: t => {
            if (!t.all('.nav-link', 'font-weight', '700')) return 'Посилання меню <code>.nav-link</code> ще не жирні (<code>bold</code> або <code>700</code>).';
            return t.all('.track-name', 'font-weight', '900') || 'Назви треків <code>.track-name</code> мають бути <code>font-weight: 900;</code>';
          },
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'Вирівнювання тексту: text-align',
      focus: 'style.css',
      body: `
        <p>Властивість ${c('text-align')} керує горизонтальним вирівнюванням тексту <em>всередині</em> елемента:</p>
        ${pre(`h1 { text-align: center; } /* по центру */
p  { text-align: left; }   /* зліва (за замовчуванням) */
.q { text-align: right; }  /* справа */`)}
        <p>Є ще значення ${c('justify')} — текст розтягується по ширині, як у газеті: рівний і лівий, і правий край.</p>
        <div class="note">${c('text-align')} рухає <strong>текст</strong> всередині блоку, а не сам блок.</div>`,
      tasks: [
        {
          text: `<p>Банер виглядатиме як справжня афіша, якщо текст у ньому стоятиме по центру. Відцентруй текст у ${c('.hero-overlay')}.</p>`,
          solution: { file: 'style.css', code: `.hero-overlay {\n  text-align: center;\n}` },
          check: t => t.is('.hero-overlay', 'text-align', 'center') ||
            'Текст у <code>.hero-overlay</code> ще не по центру.',
        },
        {
          text: `<p>Вирівняй абзаци «Про гурт» (${c('.about-text')}) <strong>по ширині</strong>, щоб обидва краї тексту стали рівними.</p>`,
          solution: { file: 'style.css', code: `.about-text {\n  text-align: justify;\n}` },
          check: t => t.all('.about-text', 'text-align', 'justify') ||
            'Абзаци <code>.about-text</code> ще не вирівняні по ширині — потрібне значення <code>justify</code>.',
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'Колір тексту і фону',
      focus: 'style.css',
      body: `
        <p>${c('color')} — колір тексту. ${c('background-color')} — колір фону елемента:</p>
        ${pre(`h1 {
  color: red;              /* колір тексту */
  background-color: blue;  /* колір фону */
}`)}
        <p>Колір можна записати по-різному:</p>
        <ul>
          <li><strong>Назва:</strong> ${c('red')}, ${c('coral')}, ${c('teal')}, ${c('whitesmoke')}</li>
          <li><strong>HEX:</strong> ${c('#ff0000')}, ${c('#00d4aa')}</li>
          <li><strong>RGB:</strong> ${c('rgb(255, 0, 0)')} — скільки червоного, зеленого, синього (від 0 до 255)</li>
          <li><strong>RGBA</strong> (з прозорістю): ${c('rgba(0, 212, 170, 0.5)')}</li>
        </ul>
        <div class="note">${c('color')} успадковується: якщо задати його блоку, текст усіх елементів всередині теж змінить колір (якщо в них немає власного).</div>`,
      tasks: [
        {
          text: `<p>Зроби шапку сайту (${c('.site-header')}) темною: фон ${c('#1a1a2e')}, а текст — білий (${c('#ffffff')}). Назва гурту й меню мають стати білими разом із шапкою.</p>`,
          hint: `<p>Обидві властивості — в одному правилі для ${c('.site-header')}. Назва і посилання успадкують ${c('color')} від шапки.</p>`,
          solution: { file: 'style.css', code: `.site-header {\n  background-color: #1a1a2e;\n  color: #ffffff;\n}` },
          check: t => {
            if (!t.is('.site-header', 'background-color', '#1a1a2e')) return 'Фон шапки ще не <code>#1a1a2e</code>.';
            if (!t.is('.band-name', 'color', '#ffffff')) return 'Назва гурту ще не біла. Додай <code>color: #ffffff;</code> у правило <code>.site-header</code>.';
            return t.all('.nav-link', 'color', '#ffffff') || 'Посилання меню ще не білі.';
          },
        },
        {
          text: `<p>Задай заголовкам розділів (${c('.section-title')}) яскравий малиновий колір, записаний у форматі <strong>RGB</strong>: 233 червоного, 69 зеленого, 96 синього.</p>`,
          solution: { file: 'style.css', code: `.section-title {\n  color: rgb(233, 69, 96);\n}` },
          check: t => {
            if (!t.all('.section-title', 'color', 'rgb(233, 69, 96)')) return 'Заголовки <code>.section-title</code> ще не того кольору. Потрібно <code>rgb(233, 69, 96)</code>.';
            return t.has('style.css', /rgb\s*\(/i) || 'Колір правильний, але запиши його саме у форматі <code>rgb(...)</code>.';
          },
        },
        {
          text: `<p>Дай фону всієї сторінки (${c('body')}) ніжний сірий відтінок — кольором <strong>за назвою</strong> ${c('whitesmoke')}.</p>`,
          solution: { file: 'style.css', code: `body {\n  background-color: whitesmoke;\n}` },
          check: t => t.is('body', 'background-color', 'whitesmoke') ||
            'Фон <code>body</code> ще не <code>whitesmoke</code>.',
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'Прозорість: opacity і rgba',
      focus: 'style.css',
      body: `
        <p>Властивість ${c('opacity')} задає прозорість <strong>всього</strong> елемента — від ${c('0')} (повністю прозорий) до ${c('1')} (повністю непрозорий):</p>
        ${pre(`.overlay {
  opacity: 0.5; /* 50% прозорості */
}

.hidden {
  opacity: 0;   /* невидимий, але займає місце */
}`)}
        <p>${c('opacity')} робить прозорим елемент <em>разом із вмістом</em> — і фон, і текст. Якщо прозорим має бути <strong>лише фон</strong>, задай його через ${c('rgba()')}, де четверте число — прозорість:</p>
        ${pre(`.box {
  background-color: rgba(0, 0, 0, 0.5); /* напівпрозорий чорний */
}`)}`,
      tasks: [
        {
          text: `<p>Трек «Horizon Line» ще не вийшов. Зроби <strong>останній</strong> пункт списку треків (${c('.track-item')}) напівпрозорим: ${c('0.4')}. Решта треків мають лишитись непрозорими.</p>`,
          hint: `<p>Псевдоклас ${c(':last-child')} працює так само, як ${c(':first-child')} з минулого уроку, тільки вибирає останній елемент. Інший спосіб — дописати цьому ${c('<li>')} у ${c('index.html')} свій клас.</p>`,
          solution: { file: 'style.css', code: `.track-item:last-child {\n  opacity: 0.4;\n}` },
          check: t => {
            const items = t.$$('.track-item');
            if (items.length < 2) return 'Список треків зламався — натисни «↺ Скинути код», якщо щось пішло не так.';
            if (!t.is(items[items.length - 1], 'opacity', '0.4')) return 'Останній трек ще не має <code>opacity: 0.4</code>.';
            return items.slice(0, -1).every(li => t.is(li, 'opacity', '1')) ||
              'Напівпрозорими стали й інші треки, а мав лише останній.';
          },
        },
        {
          text: `<p>Дай блоку з текстом банера (${c('.hero-overlay')}) <strong>напівпрозорий чорний фон</strong> (прозорість ${c('0.5')}). Сам текст при цьому має лишитись яскравим — тож ${c('opacity')} тут не підходить.</p>`,
          solution: { file: 'style.css', code: `.hero-overlay {\n  background-color: rgba(0, 0, 0, 0.5);\n}` },
          check: t => {
            if (!t.is('.hero-overlay', 'opacity', '1')) return 'Ти зробив прозорим весь блок разом з текстом. Прибери <code>opacity</code> і задай прозорість лише фону через <code>rgba()</code>.';
            return t.is('.hero-overlay', 'background-color', 'rgba(0, 0, 0, 0.5)') ||
              'Фон <code>.hero-overlay</code> має бути чорним з прозорістю 0.5: <code>rgba(0, 0, 0, 0.5)</code>.';
          },
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'Фонове зображення',
      focus: 'style.css',
      body: `
        <p>Властивість ${c('background-image')} ставить картинку фоном елемента. Адреса картинки пишеться всередині ${c('url()')}:</p>
        ${pre(`.hero {
  background-image: url("https://example.com/photo.jpg");
}`)}
        <p>Зазвичай разом із зображенням задають ще кілька властивостей:</p>
        ${pre(`.hero {
  background-image: url("photo.jpg");
  background-size: cover;      /* заповнює весь елемент */
  background-position: center; /* центрує зображення */
  background-repeat: no-repeat; /* не повторювати плиткою */
}`)}
        <p>Ось адреса фото з концерту, яке знадобиться у вправі:</p>
        ${pre(HERO_IMG, 'css')}`,
      tasks: [
        {
          text: `<p>Постав фото з концерту (адреса вище) фоном банера ${c('.hero')}.</p>`,
          hint: `<p>Скопіюй адресу і встав її в лапки всередині ${c('url("...")')}.</p>`,
          solution: { file: 'style.css', code: `.hero {\n  background-image: url("${HERO_IMG}");\n}` },
          check: t => {
            const bg = t.css('.hero', 'background-image');
            if (!bg || bg === 'none') return 'У <code>.hero</code> ще немає фонового зображення. Потрібна властивість <code>background-image</code> з <code>url(...)</code>.';
            return /photo-1511671782779/.test(bg) || 'Зображення є, але не те — встав адресу фото з опису вправи.';
          },
        },
        {
          text: `<p>Зараз фото може бути обрізане не там, де треба. Зроби так, щоб воно <strong>заповнювало весь банер</strong>, стояло <strong>по центру</strong> і <strong>не повторювалось</strong>.</p>`,
          solution: { file: 'style.css', code: `.hero {\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}` },
          check: t => {
            if (!t.is('.hero', 'background-size', 'cover')) return 'Фото ще не заповнює банер: <code>background-size: cover;</code>';
            if (!t.is('.hero', 'background-position', '50% 50%')) return 'Фото ще не по центру: <code>background-position: center;</code>';
            return t.is('.hero', 'background-repeat', 'no-repeat') || 'Додай <code>background-repeat: no-repeat;</code>';
          },
        },
      ],
    },

    // ── 7 ──────────────────────────────────────────────────────────
    {
      title: 'Підсумок: усе разом',
      focus: 'style.css',
      body: `
        <table>
          <tr><th>Властивість</th><th>Що робить</th><th>Приклад</th></tr>
          <tr><td>${c('font-family')}</td><td>Тип шрифту</td><td>${c('Arial')}</td></tr>
          <tr><td>${c('font-size')}</td><td>Розмір шрифту</td><td>${c('18px')}</td></tr>
          <tr><td>${c('font-weight')}</td><td>Жирність шрифту</td><td>${c('bold')}</td></tr>
          <tr><td>${c('text-align')}</td><td>Вирівнювання тексту</td><td>${c('center')}</td></tr>
          <tr><td>${c('color')}</td><td>Колір тексту</td><td>${c('#333')}</td></tr>
          <tr><td>${c('background-color')}</td><td>Колір фону</td><td>${c('teal')}</td></tr>
          <tr><td>${c('opacity')}</td><td>Прозорість елемента</td><td>${c('0.7')}</td></tr>
          <tr><td>${c('background-image')}</td><td>Фонове зображення</td><td>${c('url("img.jpg")')}</td></tr>
        </table>
        <p>Наостанок — два завдання, де треба поєднати кілька властивостей в одному правилі.</p>`,
      tasks: [
        {
          text: `<p>Тривалість треків (${c('.track-duration')}) зараз блідо-сіра. Зроби її кольору ${c('#e94560')}, жирністю ${c('600')} і розміром ${c('1rem')}.</p>`,
          solution: { file: 'style.css', code: `.track-duration {\n  color: #e94560;\n  font-weight: 600;\n  font-size: 1rem;\n}` },
          check: t => {
            if (!t.all('.track-duration', 'color', '#e94560')) return 'Колір <code>.track-duration</code> ще не <code>#e94560</code>.';
            if (!t.all('.track-duration', 'font-weight', '600')) return 'Жирність тривалості має бути <code>600</code>.';
            return t.all('.track-duration', 'font-size', '16px') || 'Розмір тривалості має бути <code>1rem</code> (16px).';
          },
        },
        {
          text: `<p>Перефарбуй футер (${c('.site-footer')}): фон ${c('#e94560')}, білий текст, а сам напис — притиснутий <strong>до правого краю</strong>.</p>`,
          solution: { file: 'style.css', code: `.site-footer {\n  background-color: #e94560;\n  color: white;\n  text-align: right;\n}` },
          check: t => {
            if (!t.is('.site-footer', 'background-color', '#e94560')) return 'Фон футера ще не <code>#e94560</code>.';
            if (!t.is('.footer-text', 'color', 'white')) return 'Текст футера ще не білий.';
            return t.is('.footer-text', 'text-align', 'right') || 'Напис у футері ще не справа — <code>text-align: right;</code>';
          },
        },
      ],
    },
  ],
};
