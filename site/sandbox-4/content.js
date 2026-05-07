// ── SoundWave Band page HTML ──────────────────────────────────────
const PAGE_HTML = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SoundWave Band</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; color: #222; line-height: 1.6; }
.site-header { padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; }
.site-nav { display: flex; gap: 24px; }
.site-nav a { text-decoration: none; color: inherit; }
.hero { height: 400px; display: flex; align-items: center; justify-content: center; background-color: #2a2a4a; }
.hero-overlay { padding: 40px; color: white; }
.hero-subtitle { margin-top: 12px; font-size: 1.1rem; color: #ccc; }
.about, .tracks { max-width: 800px; margin: 48px auto; padding: 0 32px; }
.about .section-title, .tracks .section-title { margin-bottom: 20px; font-size: 1.8rem; }
.about-text { margin-bottom: 14px; line-height: 1.8; color: #444; }
.track-list { list-style: none; border-top: 1px solid #eee; }
.track-item { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid #eee; }
.track-num { font-size: 0.85rem; color: #999; width: 28px; }
.track-name { flex: 1; font-weight: 500; }
.track-duration { font-size: 0.85rem; color: #999; font-family: monospace; }
.site-footer { background-color: #1a1a2e; color: #888; padding: 20px 40px; text-align: center; font-size: 0.85rem; }
</style>
<style id="student-style"></style>
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
</html>`;

// ── Answer CSS ────────────────────────────────────────────────────
const ANSWER_CSS =
`/* Завдання 1 — font-family */
h1, h2 {
  font-family: 'Georgia', serif;
}

/* Завдання 2 — font-size */
.hero-title {
  font-size: 3rem;
}

/* Завдання 3 — font-weight */
.nav-link {
  font-weight: bold;
}

/* Завдання 4 — text-align */
.hero-overlay {
  text-align: center;
}

/* Завдання 5 — color + background-color */
.site-header {
  background-color: #1a1a2e;
  color: #ffffff;
}

/* Завдання 7 — background-image (спочатку!) */
.hero {
  background-image: url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80');
  background-size: cover;
  background-position: center;
}

/* Завдання 6 — opacity (після background-image) */
.hero-overlay {
  opacity: 0.85;
}
`;

// ── Base CSS ──────────────────────────────────────────────────────
const BASE_CSS =
`/* Пиши свій CSS тут.
   Натисни «Вставити в редактор» у завданні
   або вводь код вручну — preview оновлюється автоматично. */

`;
