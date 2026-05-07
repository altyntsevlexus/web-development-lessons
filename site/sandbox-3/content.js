// ── GameZone Blog page HTML ───────────────────────────────────────
const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GameZone Blog</title>
<style>
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
.popular-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.site-footer { background-color: #16213e; color: #aaa; padding: 16px 32px; text-align: center; font-size: 0.85rem; }
</style>
<style id="student-style"></style>
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
    <p class="article-text">Цього місяця гравці обирають: <span class="highlight">Elden Ring</span>,
      <span class="highlight">Hollow Knight</span> та <span class="highlight">Celeste</span>.
      Кожна з них — справжній шедевр жанру.</p>
    <div class="tags-row">
      <span class="game-tag">Action</span>
      <span class="game-tag">RPG</span>
      <span class="game-tag">Indie</span>
      <span class="game-tag">Платформер</span>
    </div>
  </article>
  <article class="game-article">
    <h2 class="section-title">Нові надходження</h2>
    <p class="article-text">У листопаді вийшли одразу кілька великих проєктів.
      Особливу увагу привертає <span class="highlight">Hollow Knight: Silksong</span> —
      довгоочікуваний сиквел культового метроідванії.</p>
    <div class="tags-row">
      <span class="game-tag">Metroidvania</span>
      <span class="game-tag">Indie</span>
    </div>
  </article>
  <article class="game-article">
    <h2 class="section-title">Класика, яку варто пройти</h2>
    <p class="article-text">Якщо ви ще не грали в <span class="highlight">The Legend of Zelda: Breath of the Wild</span>,
      саме час виправити це. Відкритий світ, головоломки та неймовірна атмосфера.</p>
    <div class="tags-row">
      <span class="game-tag">Adventure</span>
      <span class="game-tag">Open World</span>
    </div>
  </article>
</main>
<aside class="sidebar">
  <h3 class="sidebar-title">Популярне зараз</h3>
  <ul class="popular-list">
    <li><a href="#">The Legend of Zelda: TotK</a></li>
    <li><a href="#">Minecraft</a></li>
    <li><a href="#">Cyberpunk 2077</a></li>
    <li><a href="#">Stardew Valley</a></li>
  </ul>
</aside>
<footer class="site-footer">
  <p>GameZone Blog · 2026 · Всі права захищені</p>
</footer>
</body>
</html>`;

// ── Answer CSS ────────────────────────────────────────────────────
const ANSWER_CSS =
`/* Завдання 1 — Універсальний селектор */
* {
  margin: 0;
  padding: 0;
}

/* Завдання 2 — Тег */
h2 {
  color: #0f3460;
}

/* Завдання 3 — ID */
#site-title {
  font-size: 2.5rem;
  color: #e94560;
}

/* Завдання 4 — Клас */
.game-tag {
  background-color: #e94560;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Завдання 5 — :hover */
a:hover {
  color: #e94560;
  text-decoration: none;
}

/* Завдання 6 — Ланцюжок */
h2.featured {
  color: #e94560;
  font-style: italic;
}

/* Завдання 7 — Вкладений */
nav.site-nav a {
  text-decoration: none;
  color: #e0e0e0;
  padding: 0 12px;
}

/* Завдання 8 — Групування */
h1,
h2,
h3 {
  font-family: Georgia, serif;
}
`;

// ── Base CSS ──────────────────────────────────────────────────────
const BASE_CSS =
`/* Пиши свій CSS тут.
   Натисни «Вставити в редактор» у завданні
   або вводь код вручну — preview оновлюється автоматично. */

`;
