const { pre, c } = IDE;

// ── Base page styles (hidden from the student) ────────────────────
const BASE_CSS = `
body { font-family: Arial, sans-serif; color: #222; line-height: 1.6; margin: 0; padding: 16px 28px; background: #fff; }
img, video { max-width: 100%; }
`;

// Makes parents (div) and inline fragments (span) visible in the preview
const BOXES_CSS = `
div { border: 2px dashed #5b9cf6; padding: 4px 16px; margin: 12px 0; }
span { background: #ffe58a; }
`;

// Each exercise starts from its own small index.html
const doc = (code, extraCss = '') => ({
  'base.css':   { code: BASE_CSS + extraCss, hidden: true },
  'index.html': { code, editable: true },
});

const txt = el => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();

// ── Starter documents ─────────────────────────────────────────────
const EX1 = `<h1>Моя перша сторінка</h1>

<p>Це <strong>дуже важливе речення.</p>

<p>А це звичайний текст, але він чомусь теж жирний.</p>
`;

const EX2 = `<div>
  <h2>Про мене</h2>
  <p>Мені 13 років, я вчуся в ліцеї.</p>
  <p>Я люблю <strong>програмувати</p></strong>
</div>
`;

const EX3 = `<!DOCTYPE html>
<html>
<head>
  <title>Моя сторінка</title>
</head>
<body>
  <h1>Привіт, світ!</h1>
</body>
</html>

<p>Цей абзац загубився — він поза body.</p>
`;

const EX4 = `<h1>Футбол</h1>
<p>Футбол — найпопулярніша командна гра у світі.</p>

<h1>Історія футболу</h1>
<p>Перші правила футболу записали в Англії у 1863 році.</p>
`;

const EX5 = `<div>
  <p>Моя улюблена гра — Minecraft.</p>
</div>
`;

const EX6 = `<h2>Оголошення</h2>
<p>Увага! Завтра контрольна з HTML.</p>
<p>Я справді люблю програмувати.</p>
`;

const EX7 = `<h2>Адреса</h2>
<p>вул. Хрещатик, 1 Київ, 01001 Україна</p>
`;

const EX8 = `<h1>Мій план навчання</h1>
`;

const EX9 = `<h2>Мій кіт</h2>
<img src="cat.svg">
`;

window.LESSON = {
  id: 'lesson-1',
  num: '01',
  title: 'Вступ до HTML',
  back: '../lesson-1.html',
  next: '../lesson-2.html',
  files: doc(EX1),
  exercises: [
    // ── 1 ──────────────────────────────────────────────────────────
    {
      title: 'Теги: відкриваючий і закриваючий',
      files: doc(EX1),
      body: `
        <p><strong>HTML</strong> описує, <em>що</em> є на сторінці: заголовки, абзаци, картинки. Праворуч — редактор з файлом ${c('index.html')} і браузер, який одразу показує результат.</p>
        <p>Майже кожен елемент — це <strong>відкриваючий тег</strong>, <strong>вміст</strong> і <strong>закриваючий тег</strong> з косою рискою ${c('/')}:</p>
        ${pre(`<h1>Це заголовок</h1>
<p>Це абзац тексту.</p>
<strong>Жирний текст</strong>`, 'html')}
        <div class="note">Забув закриваючий тег — і браузер «розтягне» елемент на решту сторінки. Зараз праворуч саме така помилка: подивись, скільки тексту стало жирним.</div>`,
      tasks: [
        {
          text: `<p>Зміни текст головного заголовка на свій — наприклад, «Сторінка Олі».</p>`,
          solution: { file: 'index.html', replace: '<h1>Моя перша сторінка</h1>', code: '<h1>Сторінка Олі</h1>' },
          hint: `<p>Текст заголовка — усе між ${c('<h1>')} і ${c('</h1>')}. Самі теги не чіпай, міняй лише слова між ними.</p>`,
          check: t => {
            const h = t.$('h1');
            if (!h) return 'Заголовок <code>&lt;h1&gt;</code> зник. Перевір, що відкриваючий і закриваючий теги на місці.';
            if (!txt(h)) return 'Заголовок порожній — напиши текст між <code>&lt;h1&gt;</code> і <code>&lt;/h1&gt;</code>.';
            return txt(h) !== 'Моя перша сторінка' || 'Заголовок досі «Моя перша сторінка». Напиши свій текст.';
          },
        },
        {
          text: `<p>Другий абзац став жирним, бо в першому абзаці забули закрити тег. Знайди його і закрий так, щоб жирними залишились лише слова «дуже важливе речення.»</p>`,
          solution: { file: 'index.html', replace: 'дуже важливе речення.</p>', code: 'дуже важливе речення.</strong></p>' },
          hint: `<p>Тег ${c('<strong>')} відкрили, але ${c('</strong>')} ніде немає. Закриваючий тег має стояти <em>перед</em> ${c('</p>')}:</p>
            ${pre(`<p>Це <strong>дуже важливе речення.</strong></p>`, 'html')}`,
          check: t => {
            const s = t.$$('strong');
            if (s.length === 0) return 'Тег <code>&lt;strong&gt;</code> зник зовсім. Слова «дуже важливе речення.» мають лишитись жирними.';
            if (s.length > 1 || !t.has('index.html', /<\/strong>/)) return 'Жирний текст досі «розповзається» на наступні абзаци. Додай <code>&lt;/strong&gt;</code> у першому абзаці.';
            return /важливе речення/.test(txt(s[0])) || 'Жирними мають бути саме слова «дуже важливе речення.»';
          },
        },
        {
          text: `<p>Додай у кінець сторінки ще один абзац — одне речення про себе.</p>`,
          solution: { file: 'index.html', code: `<p>Мене звати Оля, і я вчуся створювати сайти.</p>` },
          check: t => {
            const ps = t.$$('p');
            if (ps.length < 3) return 'На сторінці досі два абзаци. Новий абзац пишеться між <code>&lt;p&gt;</code> і <code>&lt;/p&gt;</code>.';
            return txt(ps[ps.length - 1]).length > 2 || 'Останній абзац порожній — напиши в ньому речення.';
          },
        },
      ],
    },

    // ── 2 ──────────────────────────────────────────────────────────
    {
      title: 'Вкладеність: батько і дитина',
      files: doc(EX2, BOXES_CSS),
      body: `
        <p>Елементи можна вкладати один в одного. Той, що всередині, — <strong>дитина</strong> (child), той, що містить, — <strong>батько</strong> (parent):</p>
        ${pre(`<div>                <!-- батько -->
  <p>Перший абзац</p>  <!-- дитина -->
  <p>Другий абзац</p>  <!-- дитина -->
</div>`, 'html')}
        <p>У перегляді праворуч кожен ${c('<div>')} обведено пунктиром — так видно, хто кого містить.</p>
        <div class="note">Закривай теги у зворотному порядку: відкрив ${c('<p>')}, потім ${c('<strong>')} — закривай спочатку ${c('</strong>')}, потім ${c('</p>')}.</div>`,
      tasks: [
        {
          text: `<p>В останньому абзаці теги закриті не в тому порядку. Виправ: тег, відкритий останнім, має закритися першим.</p>`,
          solution: { file: 'index.html', replace: 'програмувати</p></strong>', code: 'програмувати</strong></p>' },
          hint: `<p>${c('<strong>')} всередині ${c('<p>')}, тож і закриватись він має всередині:</p>
            ${pre(`<p>Я люблю <strong>програмувати</strong></p>`, 'html')}`,
          check: t => {
            if (t.has('index.html', /<\/p>\s*<\/strong>/)) return 'Досі <code>&lt;/p&gt;&lt;/strong&gt;</code> — спочатку закрий <code>strong</code>, потім <code>p</code>.';
            const s = t.$('p strong');
            if (!s) return 'Слово «програмувати» має лишитись усередині <code>&lt;strong&gt;</code> в абзаці.';
            return t.has('index.html', /<\/strong>\s*<\/p>/) || 'Не бачу <code>&lt;/strong&gt;&lt;/p&gt;</code> — перевір порядок закриваючих тегів.';
          },
        },
        {
          text: `<p>Під першим блоком створи ще один блок-батько ${c('<div>')} з двома дітьми: заголовком другого рівня «Мої хобі» і абзацом про твоє хобі.</p>`,
          solution: { file: 'index.html', code: `<div>\n  <h2>Мої хобі</h2>\n  <p>Я граю у футбол і малюю комікси.</p>\n</div>` },
          check: t => {
            const h = t.$$('h2').find(e => /хобі/i.test(txt(e)));
            if (!h) return 'Не знайдено заголовка <code>&lt;h2&gt;</code> з текстом «Мої хобі».';
            if (h.parentElement.tagName !== 'DIV') return 'Заголовок «Мої хобі» має бути <em>всередині</em> <code>&lt;div&gt;</code> — між <code>&lt;div&gt;</code> і <code>&lt;/div&gt;</code>.';
            if (t.$$('div').length < 2) return 'Потрібен <em>новий</em> <code>&lt;div&gt;</code>, а не перший блок.';
            const p = [...h.parentElement.children].find(e => e.tagName === 'P');
            return (p && txt(p).length > 2) || 'У блоці «Мої хобі» ще немає абзацу <code>&lt;p&gt;</code> з текстом.';
          },
        },
      ],
    },

    // ── 3 ──────────────────────────────────────────────────────────
    {
      title: 'Тег body — видимий вміст',
      files: doc(EX3),
      body: `
        <p>Тут файл уже повний: про ${c('<!DOCTYPE>')} і ${c('<head>')} поговоримо на наступному уроці. Зараз важливе одне — <strong>усе видиме</strong> пишеться між ${c('<body>')} і ${c('</body>')}:</p>
        ${pre(`<body>
  <h1>Привіт, світ!</h1>
  <p>Це перша сторінка.</p>
</body>`, 'html')}
        <div class="note">Браузер намагається «врятувати» елементи поза ${c('<body>')}, тож інколи вони навіть видні. Але це помилка в коді, і на справжньому сайті вона може зламати сторінку.</div>`,
      tasks: [
        {
          text: `<p>Абзац у самому низу файлу опинився поза ${c('<body>')}. Перенеси його всередину — під заголовок ${c('<h1>')}.</p>`,
          hint: `<p>Виріж рядок з ${c('<p>')} і встав його перед ${c('</body>')}:</p>
            ${pre(`<body>
  <h1>Привіт, світ!</h1>
  <p>Цей абзац загубився — він поза body.</p>
</body>
</html>`, 'html')}`,
          check: t => {
            const code = t.code('index.html');
            const end = code.search(/<\/html>/i);
            if (end < 0) return 'Тег <code>&lt;/html&gt;</code> зник — натисни «↺ Скинути код», якщо щось зламалось.';
            if (/<[a-z]/i.test(code.slice(end))) return 'Після <code>&lt;/html&gt;</code> ще є теги. Усе видиме має бути між <code>&lt;body&gt;</code> і <code>&lt;/body&gt;</code>.';
            const open = code.search(/<body[^>]*>/i), close = code.search(/<\/body>/i);
            const p = code.search(/<p[\s>]/i);
            if (p < 0) return 'Абзац <code>&lt;p&gt;</code> зник — перенеси його, а не видаляй.';
            return (open < p && p < close) || 'Абзац має стояти між <code>&lt;body&gt;</code> і <code>&lt;/body&gt;</code>.';
          },
        },
        {
          text: `<p>Додай усередину ${c('<body>')}, у самий кінець, ще один абзац: «Це моя перша сторінка.»</p>`,
          solution: { file: 'index.html', code: '  <p>Це моя перша сторінка.</p>' },
          hint: `<p>Новий абзац пиши в рядку перед ${c('</body>')}.</p>`,
          check: t => {
            const code = t.code('index.html');
            const open = code.search(/<body[^>]*>/i), close = code.search(/<\/body>/i);
            const p = t.$$('p').find(e => /моя перша сторінка/i.test(txt(e)));
            if (!p) return 'Не знайдено абзацу з текстом «Це моя перша сторінка.»';
            const at = code.search(/<p[^>]*>\s*Це моя перша сторінка/i);
            return (at > open && at < close) || 'Абзац є, але не всередині <code>&lt;body&gt;</code>.';
          },
        },
      ],
    },

    // ── 4 ──────────────────────────────────────────────────────────
    {
      title: 'Заголовки h1 – h6',
      files: doc(EX4),
      body: `
        <p>Теги від ${c('<h1>')} до ${c('<h6>')} — заголовки шести рівнів: ${c('<h1>')} найважливіший і найбільший, ${c('<h6>')} — найменший.</p>
        ${pre(`<h1>Головний заголовок</h1>
<h2>Підзаголовок розділу</h2>
<h3>Підрозділ</h3>`, 'html')}
        <div class="note">На сторінці має бути лише <strong>один</strong> ${c('<h1>')} — головна тема. Розділи всередині позначають ${c('<h2>')}, їхні частини — ${c('<h3>')}. Так сторінку краще розуміють і люди, і пошукові системи.</div>`,
      tasks: [
        {
          text: `<p>На сторінці два заголовки першого рівня. Залиш ${c('<h1>')} лише для «Футбол», а «Історія футболу» зроби заголовком розділу — другого рівня.</p>`,
          solution: { file: 'index.html', replace: '<h1>Історія футболу</h1>', code: '<h2>Історія футболу</h2>' },
          hint: `<p>Заміни <em>обидва</em> теги навколо «Історія футболу»: і відкриваючий, і закриваючий.</p>`,
          check: t => {
            const h1 = t.$$('h1');
            if (h1.length !== 1) return `Заголовків <code>&lt;h1&gt;</code> зараз ${h1.length}, а має бути рівно один.`;
            if (!/футбол/i.test(txt(h1[0])) || /історія/i.test(txt(h1[0]))) return 'Єдиний <code>&lt;h1&gt;</code> має бути «Футбол».';
            return t.$$('h2').some(e => /історія футболу/i.test(txt(e))) || '«Історія футболу» має стати <code>&lt;h2&gt;</code>.';
          },
        },
        {
          text: `<p>Додай у кінець сторінки підрозділ: заголовок <strong>третього</strong> рівня «Правила гри» і під ним абзац з одним правилом.</p>`,
          solution: { file: 'index.html', code: `<h3>Правила гри</h3>\n<p>Грати м'ячем руками може лише воротар.</p>` },
          check: t => {
            const h = t.$$('h3').find(e => /правила гри/i.test(txt(e)));
            if (!h) return 'Не знайдено заголовка <code>&lt;h3&gt;</code> з текстом «Правила гри».';
            const next = h.nextElementSibling;
            return (next?.tagName === 'P' && txt(next).length > 2) || 'Одразу під «Правила гри» має бути абзац <code>&lt;p&gt;</code> з текстом.';
          },
        },
      ],
    },

    // ── 5 ──────────────────────────────────────────────────────────
    {
      title: 'p, span і div',
      files: doc(EX5, BOXES_CSS),
      body: `
        <p>Три найуживаніші теги:</p>
        <ul>
          <li>${c('<p>')} — абзац. <strong>Блоковий</strong>: завжди починається з нового рядка.</li>
          <li>${c('<span>')} — <strong>рядковий</strong> фрагмент усередині тексту, нового рядка не створює.</li>
          <li>${c('<div>')} — контейнер, що групує інші елементи. Сам по собі невидимий.</li>
        </ul>
        ${pre(`<div>
  <p>Звичайний текст, а тут <span>виділений фрагмент</span> прямо в рядку.</p>
  <p>Ще один абзац у тому самому контейнері.</p>
</div>`, 'html')}
        <p>Щоб їх було видно, у перегляді ${c('<div>')} обведено пунктиром, а ${c('<span>')} підсвічено жовтим.</p>`,
      tasks: [
        {
          text: `<p>Обгорни слово «Minecraft» тегом ${c('<span>')}, щоб воно підсвітилось, але залишилось у тому самому рядку.</p>`,
          solution: { file: 'index.html', replace: 'Minecraft.', code: '<span>Minecraft</span>.' },
          hint: `<p>Відкриваючий тег став перед словом, закриваючий — одразу після нього (крапка лишається поза span):</p>
            ${pre(`<p>Моя улюблена гра — <span>Minecraft</span>.</p>`, 'html')}`,
          check: t => {
            const s = t.$('p span');
            if (!s) return 'Усередині абзацу ще немає <code>&lt;span&gt;</code>.';
            if (txt(s).replace(/\.$/, '') !== 'Minecraft') return 'У <code>&lt;span&gt;</code> має бути лише слово «Minecraft».';
            return /улюблена гра/.test(txt(s.parentElement)) || 'Решта речення має лишитись у тому самому абзаці.';
          },
        },
        {
          text: `<p>Створи під першим блоком новий контейнер ${c('<div>')}, у якому будуть <strong>два</strong> абзаци: про твою улюблену книгу і улюблений фільм.</p>`,
          solution: { file: 'index.html', code: `<div>\n  <p>Моя улюблена книга — «Гаррі Поттер».</p>\n  <p>Мій улюблений фільм — «Король Лев».</p>\n</div>` },
          check: t => {
            const divs = t.$$('div');
            if (divs.length < 2) return 'Потрібен другий <code>&lt;div&gt;</code> — новий контейнер.';
            return divs.some(d => [...d.children].filter(e => e.tagName === 'P').length >= 2) ||
              'У новому <code>&lt;div&gt;</code> мають бути два абзаци <code>&lt;p&gt;</code> — між <code>&lt;div&gt;</code> і <code>&lt;/div&gt;</code>.';
          },
        },
      ],
    },

    // ── 6 ──────────────────────────────────────────────────────────
    {
      title: 'Виділення тексту: em і strong',
      files: doc(EX6),
      body: `
        <p>Два теги для <em>смислового</em> виділення слів усередині абзацу:</p>
        ${pre(`<p>Це <em>курсивний текст</em> — легке смислове виділення.</p>
<p>Це <strong>жирний текст</strong> — важлива інформація.</p>`, 'html')}
        <div class="note">${c('<em>')} і ${c('<strong>')} кажуть браузеру, що слово <em>важливе</em>. Коли треба просто змінити вигляд (без зміни сенсу), використовують CSS — це буде на наступних уроках.</div>`,
      tasks: [
        {
          text: `<p>Позначь слово «Увага!» як <strong>важливу інформацію</strong>.</p>`,
          solution: { file: 'index.html', replace: 'Увага!', code: '<strong>Увага!</strong>' },
          hint: `<p>Для важливого — ${c('<strong>')}. Обгорни ним «Увага!» (разом зі знаком оклику).</p>`,
          check: t => t.$$('strong').some(e => txt(e) === 'Увага!') ||
            (t.$('em') && txt(t.$('em')) === 'Увага!' ? 'Це легке виділення (<code>em</code>). Для важливої інформації потрібен інший тег.' :
              'Не знайдено <code>&lt;strong&gt;</code> зі словом «Увага!» всередині.'),
        },
        {
          text: `<p>У другому абзаці додай <em>легке смислове виділення</em> (курсив) слову «справді».</p>`,
          solution: { file: 'index.html', replace: 'справді', code: '<em>справді</em>' },
          hint: `<p>Легке виділення — ${c('<em>')}:</p>${pre(`<p>Я <em>справді</em> люблю програмувати.</p>`, 'html')}`,
          check: t => t.$$('em').some(e => txt(e) === 'справді') ||
            'Не знайдено <code>&lt;em&gt;</code> зі словом «справді» всередині.',
        },
        {
          text: `<p>Допиши в кінець ще один абзац, у якому одне слово виділено як важливе, а інше — курсивом.</p>`,
          solution: { file: 'index.html', code: `<p>Принеси <strong>ручку</strong> і <em>гарний</em> настрій.</p>` },
          check: t => t.$$('p').some(p => p.querySelector('strong') && p.querySelector('em')) ||
            'Потрібен абзац, у якому є і <code>&lt;strong&gt;</code>, і <code>&lt;em&gt;</code>.',
        },
      ],
    },

    // ── 7 ──────────────────────────────────────────────────────────
    {
      title: 'Перенос рядка br',
      files: doc(EX7),
      body: `
        <p>Браузер ігнорує переноси рядків у коді: скільки б Enter ти не натиснув, текст абзацу йде в один рядок. Щоб почати новий рядок <em>усередині</em> абзацу, ставлять тег ${c('<br>')}:</p>
        ${pre(`<p>
  вул. Хрещатик, 1<br>
  Київ, 01001<br>
  Україна
</p>`, 'html')}
        <p>${c('<br>')} — <strong>самозакриваючий</strong>: у нього немає вмісту і немає ${c('</br>')}.</p>
        <div class="note">${c('<br>')} — для адрес і віршів. Відступи між блоками роблять через CSS, а не купою ${c('<br>')}.</div>`,
      tasks: [
        {
          text: `<p>Розбий адресу на три рядки: вулиця, місто з індексом, країна.</p>`,
          solution: { file: 'index.html', replace: 'вул. Хрещатик, 1 Київ, 01001 Україна', code: 'вул. Хрещатик, 1<br>\nКиїв, 01001<br>\nУкраїна' },
          hint: `<p>Постав ${c('<br>')} після «1» і після «01001».</p>`,
          check: t => {
            if (t.has('index.html', /<\/br>/)) return 'У <code>&lt;br&gt;</code> немає закриваючого тегу — прибери <code>&lt;/br&gt;</code>.';
            const p = t.$$('p').find(e => /Хрещатик/.test(e.textContent));
            if (!p) return 'Абзац з адресою зник — натисни «↺ Скинути код».';
            const n = p.querySelectorAll('br').length;
            return n === 2 || (n < 2 ? 'Адреса має бути у <strong>три</strong> рядки — потрібно два <code>&lt;br&gt;</code>.' : 'Забагато <code>&lt;br&gt;</code>: рядків має бути рівно три.');
          },
        },
        {
          text: `<p>Додай у кінець абзац з віршем щонайменше на <strong>чотири</strong> рядки — кожен з нового рядка.</p>`,
          solution: { file: 'index.html', code: `<p>\n  Садок вишневий коло хати,<br>\n  Хрущі над вишнями гудуть,<br>\n  Плугатарі з плугами йдуть,<br>\n  Співають ідучи дівчата.\n</p>` },
          check: t => {
            if (t.has('index.html', /<\/br>/)) return 'У <code>&lt;br&gt;</code> немає закриваючого тегу — прибери <code>&lt;/br&gt;</code>.';
            const poem = t.$$('p').filter(e => !/Хрещатик/.test(e.textContent));
            if (!poem.length) return 'Не знайдено нового абзацу <code>&lt;p&gt;</code> з віршем.';
            return poem.some(p => p.querySelectorAll('br').length >= 3) || 'У вірші має бути щонайменше чотири рядки — тобто три <code>&lt;br&gt;</code>.';
          },
        },
      ],
    },

    // ── 8 ──────────────────────────────────────────────────────────
    {
      title: 'Списки ul і ol',
      files: doc(EX8),
      body: `
        <p>${c('<ul>')} — маркований список (•), ${c('<ol>')} — нумерований (1, 2, 3…). Кожен пункт — тег ${c('<li>')} усередині списку:</p>
        ${pre(`<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>
  <li>Відкрити редактор</li>
  <li>Написати HTML</li>
</ol>`, 'html')}
        <p>Числа в ${c('<ol>')} браузер ставить сам — писати їх у тексті не треба.</p>`,
      tasks: [
        {
          text: `<p>Додай маркований список з трьох мов, які ти вивчиш на цьому курсі: HTML, CSS і JavaScript.</p>`,
          solution: { file: 'index.html', code: `<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>` },
          check: t => {
            const ul = t.$('ul');
            if (!ul) return 'Не знайдено маркованого списку <code>&lt;ul&gt;</code>.';
            const items = [...ul.children].filter(e => e.tagName === 'LI').map(txt);
            if (items.length < 3) return 'У списку має бути три пункти <code>&lt;li&gt;</code>.';
            return ['HTML', 'CSS', 'JavaScript'].every(w => items.some(i => i.toLowerCase() === w.toLowerCase())) ||
              'Пункти мають бути: HTML, CSS, JavaScript — кожен у своєму <code>&lt;li&gt;</code>.';
          },
        },
        {
          text: `<p>Під ним додай <strong>нумерований</strong> список — щонайменше три кроки твого ранку (наприклад, прокинутись, поснідати, піти до ліцею).</p>`,
          solution: { file: 'index.html', code: `<ol>\n  <li>Прокинутись</li>\n  <li>Поснідати</li>\n  <li>Піти до ліцею</li>\n</ol>` },
          check: t => {
            const ol = t.$('ol');
            if (!ol) return 'Не знайдено нумерованого списку <code>&lt;ol&gt;</code>.';
            const items = [...ol.children].filter(e => e.tagName === 'LI');
            if (items.length < 3) return 'У нумерованому списку має бути щонайменше три пункти <code>&lt;li&gt;</code>.';
            return !items.some(li => /^\d+[.)]/.test(txt(li))) || 'Числа браузер ставить сам — прибери «1.», «2.» з тексту пунктів.';
          },
        },
      ],
    },

    // ── 9 ──────────────────────────────────────────────────────────
    {
      title: 'Зображення img і відео video',
      files: doc(EX9),
      body: `
        <p>Картинки й відео не пишуть у HTML — на них <strong>посилаються</strong> через атрибути:</p>
        ${pre(`<img src="photo.jpg" alt="Опис фото">

<video src="clip.mp4" controls></video>`, 'html')}
        <ul>
          <li>${c('src')} — шлях до файлу: назва файлу поруч зі сторінкою або повна адреса з мережі (${c('https://...')}).</li>
          <li>${c('alt')} — текстовий опис картинки. Його показують, якщо картинка не завантажилась, і зачитують незрячим людям. Заповнюй завжди!</li>
          <li>${c('controls')} — показує кнопки керування відео.</li>
        </ul>
        <div class="note">${c('<img>')} — самозакриваючий тег. А в ${c('<video>')} закриваючий тег є: ${c('</video>')}.</div>`,
      tasks: [
        {
          text: `<p>У картинки кота немає опису. Додай їй атрибут, який коротко розповідає, що на ній зображено.</p>`,
          solution: { file: 'index.html', replace: '<img src="cat.svg">', code: '<img src="cat.svg" alt="Рудий кіт сидить на траві">' },
          hint: `<p>Атрибут ${c('alt')} пишеться всередині тегу, поруч із ${c('src')}:</p>
            ${pre(`<img src="cat.svg" alt="Рудий кіт сидить на траві">`, 'html')}`,
          check: t => {
            const img = t.$('img[src*="cat"]');
            if (!img) return 'Картинка кота зникла. Перевір <code>src="cat.svg"</code>.';
            if (!img.hasAttribute('alt')) return 'У <code>&lt;img&gt;</code> ще немає атрибута <code>alt</code>.';
            return img.getAttribute('alt').trim().length >= 3 || 'Атрибут <code>alt</code> порожній — напиши кілька слів про картинку.';
          },
        },
        {
          text: `<p>Додай під картинкою відео з кнопками керування. Адреса відео: ${c('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4')}</p>`,
          solution: { file: 'index.html', code: `<video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" controls></video>` },
          check: t => {
            const v = t.$('video');
            if (!v) return 'Не знайдено тегу <code>&lt;video&gt;</code>.';
            if (!/flower\.mp4/.test(v.getAttribute('src') || '')) return 'У відео має бути атрибут <code>src</code> з адресою flower.mp4.';
            return v.hasAttribute('controls') || 'Кнопок керування немає — додай атрибут <code>controls</code>.';
          },
        },
      ],
    },
  ],
};
