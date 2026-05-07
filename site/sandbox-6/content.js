// ── TechDaily page HTML embedded as template string ──────────────────
const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TechDaily</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background-color: #f0f2f5; color: #1a1a2e; line-height: 1.6; padding-top: 80px; }
.site-header { background-color: #1a1a4a; color: #fff; height: 64px; width: 100%; }
.header-inner { max-width: 1100px; margin: 0 auto; padding: 0 24px; height: 100%; display: flex; align-items: center; justify-content: space-between; }
.logo { font-size: 1.4rem; font-weight: bold; color: #4fc3f7; letter-spacing: 1px; }
.main-nav { display: flex; gap: 24px; }
.nav-link { color: #e0e0e0; text-decoration: none; font-size: .9rem; font-weight: 600; }
.nav-link:hover { color: #4fc3f7; }
.floating-alert { position: fixed; top: 14px; right: 24px; background-color: #e53e3e; color: #fff; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: .78rem; letter-spacing: .5px; }
.page-body { max-width: 1100px; margin: 0 auto; padding: 24px 24px 64px; }
.hero-section { background-color: #1a1a4a; background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80'); background-size: cover; background-position: center; height: 420px; display: flex; align-items: flex-end; border-radius: 12px; overflow: hidden; margin-bottom: 32px; }
.breaking-badge { background-color: #e53e3e; color: #fff; font-size: .72rem; font-weight: bold; letter-spacing: 2px; padding: 6px 14px; border-radius: 4px; }
.hero-content { background: linear-gradient(to top, rgba(0,0,0,.88) 0%, rgba(0,0,0,.45) 55%, transparent 100%); width: 100%; padding: 48px 36px 36px; }
.hero-title { font-size: 1.9rem; color: #fff; line-height: 1.25; margin-bottom: 14px; max-width: 680px; }
.hero-lead { color: #c8c8c8; font-size: .95rem; max-width: 580px; margin-bottom: 22px; }
.hero-cta { display: inline-block; background-color: #4fc3f7; color: #0a0a1a; text-decoration: none; font-weight: bold; font-size: .85rem; padding: 10px 22px; border-radius: 4px; }
.content-grid { display: flex; gap: 32px; align-items: flex-start; }
.articles-col { flex: 1; }
.article-preview { background-color: #fff; padding: 24px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.article-thumb { width: 100%; height: 200px; border-radius: 6px; object-fit: cover; display: block; margin-bottom: 16px; }
.article-title { font-size: 1.15rem; color: #1a1a2e; margin-bottom: 10px; line-height: 1.35; }
.article-text { color: #555; font-size: .9rem; line-height: 1.65; margin-bottom: 12px; }
.read-more { display: inline-block; color: #1565c0; font-weight: bold; text-decoration: none; font-size: .9rem; }
.stats-bar { background-color: #fff; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.stat-box { background-color: #e8f8f5; border: 1px solid #a3e4d7; border-radius: 6px; padding: 16px 20px; text-align: center; margin-bottom: 8px; }
.stat-num { font-size: 1.5rem; font-weight: bold; color: #117a65; }
.stat-label { font-size: .78rem; color: #555; margin-top: 2px; }
.topics-section { background-color: #fff; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.topics-title { font-size: .8rem; color: #999; margin-bottom: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.topic-chip { background-color: #e3f2fd; color: #1565c0; font-size: .8rem; font-weight: 600; padding: 5px 14px; border-radius: 20px; border: 1px solid #90caf9; margin-right: 6px; }
.sidebar { width: 280px; flex-shrink: 0; background-color: #fff; border-radius: 8px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,.07); }
.sidebar-title { font-size: .75rem; letter-spacing: 1px; color: #999; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid #4fc3f7; }
.popular-list { list-style: decimal; padding-left: 18px; margin-bottom: 28px; }
.popular-list li { margin-bottom: 12px; font-size: .875rem; line-height: 1.45; }
.popular-list a { color: #1a1a2e; text-decoration: none; }
.popular-list a:hover { color: #4fc3f7; }
.sidebar-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.sidebar-tags span { background-color: #f0f2f5; color: #666; font-size: .78rem; padding: 4px 12px; border-radius: 20px; }
.site-footer { background-color: #1a1a4a; color: #a0a8c0; padding: 48px 24px; }
.footer-inner { max-width: 1100px; margin: 0 auto; display: flex; gap: 64px; align-items: flex-start; }
.footer-brand { font-size: 1.2rem; font-weight: bold; color: #4fc3f7; white-space: nowrap; padding-top: 4px; }
.footer-link { color: #a0a8c0; text-decoration: none; font-size: .875rem; }
.footer-link:hover { color: #4fc3f7; }
</style>
<style id="student-style"></style>
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <div class="logo">TechDaily</div>
    <nav class="main-nav">
      <a class="nav-link" href="#">Технології</a>
      <a class="nav-link" href="#">Наука</a>
      <a class="nav-link" href="#">Ігри</a>
      <a class="nav-link" href="#">Майбутнє</a>
    </nav>
  </div>
</header>
<div class="floating-alert">🔴 В ПРЯМОМУ ЕФІРІ</div>
<main class="page-body">
  <section class="hero-section">
    <div class="breaking-badge">BREAKING</div>
    <div class="hero-content">
      <h1 class="hero-title">Штучний інтелект навчився писати код краще за більшість програмістів</h1>
      <p class="hero-lead">Нова модель GPT-5 Ultra пройшла тести і отримала вищий бал, ніж 90% учасників змагань з програмування.</p>
      <a class="hero-cta" href="#">Читати повністю →</a>
    </div>
  </section>
  <div class="content-grid">
    <div class="articles-col">
      <article class="article-preview">
        <img class="article-thumb" src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=320&q=80" alt="Робот">
        <h2 class="article-title">Роботи-хірурги провели першу операцію без участі людини</h2>
        <p class="article-text">Команда вчених із Стенфорда представила автономного хірургічного робота, який успішно провів операцію на серці без жодного втручання хірурга. Точність виявилась на 40% вищою.</p>
        <a class="read-more" href="#">Читати далі →</a>
      </article>
      <div class="stats-bar">
        <div class="stat-box"><div class="stat-num">1.2M</div><div class="stat-label">переглядів</div></div>
        <div class="stat-box"><div class="stat-num">48K</div><div class="stat-label">лайків</div></div>
        <div class="stat-box"><div class="stat-num">9K</div><div class="stat-label">поширень</div></div>
      </div>
      <div class="topics-section">
        <h3 class="topics-title">Теми:</h3>
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
        <li><a href="#">Tesla випустила акумулятор на 1000 км пробігу</a></li>
        <li><a href="#">SpaceX відправляє перших туристів на Місяць у 2026 році</a></li>
        <li><a href="#">Apple показала нові окуляри AR Vision Pro 2</a></li>
        <li><a href="#">Microsoft купила ще одну велику ігрову студію</a></li>
      </ol>
      <h3 class="sidebar-title">Теги</h3>
      <div class="sidebar-tags">
        <span>AI</span><span>Космос</span><span>Авто</span><span>Гаджети</span><span>Медицина</span>
      </div>
    </aside>
  </div>
</main>
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">TechDaily © 2025</div>
    <nav class="footer-nav">
      <a class="footer-link" href="#">Головна</a>
      <a class="footer-link" href="#">Технології</a>
      <a class="footer-link" href="#">Наука</a>
      <a class="footer-link" href="#">Про нас</a>
      <a class="footer-link" href="#">Контакти</a>
    </nav>
  </div>
</footer>
</body>
</html>`;

// ── CSS snippets ──────────────────────────────────────────────────────
const ANSWER_CSS =
`/* Завдання 1 — position: relative */
.hero-section {
  position: relative;
}

/* Завдання 2 — position: absolute */
.breaking-badge {
  position: absolute;
  top: 20px;
  left: 20px;
}

/* Завдання 3 — position: fixed */
.site-header {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Завдання 4 — position: sticky */
.sidebar {
  position: sticky;
  top: 80px;
}

/* Завдання 5 — z-index */
.site-header {
  z-index: 100;
}

/* Завдання 6 — display: inline */
.topic-chip {
  display: inline;
}

/* Завдання 7 — display: block */
.footer-link {
  display: block;
  padding: 6px 0;
}

/* Завдання 8 — display: inline-block */
.stat-box {
  display: inline-block;
  width: 180px;
  vertical-align: top;
  margin-right: 8px;
  margin-bottom: 0;
}
`;

const BASE_CSS =
`/* Пиши свій CSS тут.
   Натисни «Вставити в редактор» у завданні
   або вводь код вручну — preview оновлюється автоматично. */

`;
