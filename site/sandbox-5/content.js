// ── Space Explorer Blog page HTML embedded as template string ─────────
const PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Space Explorer Blog</title>
<style>
body { font-family: Georgia, serif; background-color: #f0f4f8; color: #1a1a2e; }
.site-header { background-color: #0f3460; color: #ffffff; padding: 24px 32px; }
.site-title { margin: 0; font-size: 2rem; }
.site-tagline { margin: 6px 0 0; color: #a8b2d8; font-size: 1rem; }
.nav-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; gap: 24px; }
.nav-item { font-size: 0.95rem; cursor: pointer; color: #e0e0e0; }
.main-content { padding: 32px; }
.site-footer { background-color: #0f3460; color: #a8b2d8; padding: 20px 32px; text-align: center; font-size: 0.85rem; }
.site-footer__text { margin: 0; }
.hero-banner { background-color: #16213e; background-image: url('https://wallup.net/wp-content/uploads/2019/09/14758-planets.jpg'); background-size: cover; background-position: center; width: 100%; height: 200px; }
.article-preview { background-color: #ffffff; margin-bottom: 32px; }
.article-preview__title { font-size: 1.4rem; color: #0f3460; margin: 0 0 8px; }
.article-preview__text { margin: 0; line-height: 1.7; color: #444; }
.team-section { margin-bottom: 32px; }
.author-card { display: inline-block; text-align: center; }
.author-avatar { width: 80px; height: 80px; background-image: url('https://randomuser.me/api/portraits/women/44.jpg'); background-size: cover; background-position: center; border: 3px solid #a8b2d8; }
.author-name { margin: 8px 0 0; font-weight: bold; color: #0f3460; }
.author-role { margin: 4px 0 0; font-size: 0.85rem; color: #666; }
.fact-card { border: 2px solid #0f3460; background-color: #e8f4fd; margin-bottom: 32px; }
.fact-card__title { margin: 0 0 8px; font-size: 1.1rem; color: #0f3460; }
.fact-card__text { margin: 0; font-style: italic; line-height: 1.7; color: #1a1a2e; }
.article-body { margin-bottom: 32px; }
.section-title { font-size: 1.5rem; color: #0f3460; margin: 0 0 8px; }
.article-body p { line-height: 1.7; color: #333; }
.container { }
.newsletter-banner { width: 500px; background-color: #16213e; color: #ffffff; margin-bottom: 32px; }
.newsletter-banner__text { margin: 0; text-align: center; font-size: 0.95rem; }
.featured-quote { background-color: #ffffff; border-left: 5px solid #0f3460; padding: 20px 24px; font-size: 1.2rem; font-style: italic; color: #333; margin: 0 0 32px; }
.featured-quote__author { display: block; margin-top: 12px; font-size: 0.9rem; font-style: normal; color: #666; }
.mission-log { background-color: #ffffff; border: 2px solid #b0c4de; padding: 16px; height: 120px; margin-bottom: 32px; }
.mission-log__title { margin: 0 0 8px; font-size: 1rem; color: #0f3460; }
.mission-log p { margin: 4px 0; font-size: 0.88rem; color: #444; }
.nav-item--soon { }
</style>
<style id="student-style"></style>
</head>
<body>
<header class="site-header">
  <h1 class="site-title">Space Explorer Blog</h1>
  <p class="site-tagline">Your guide to the cosmos</p>
  <nav class="site-nav">
    <ul class="nav-list">
      <li class="nav-item">Home</li>
      <li class="nav-item">Articles</li>
      <li class="nav-item">About</li>
      <li class="nav-item nav-item--soon">Premium</li>
    </ul>
  </nav>
</header>
<div class="hero-banner"></div>
<main class="main-content">
  <div class="container">
    <div class="article-preview">
      <h2 class="article-preview__title">Jupiter: The Giant Planet</h2>
      <p class="article-preview__text">Jupiter is the largest planet in the Solar System. Its famous Great Red Spot is a storm that has been raging for over 350 years. One day on Jupiter lasts only 10 hours.</p>
    </div>
    <div class="team-section">
      <div class="author-card">
        <div class="author-avatar"></div>
        <p class="author-name">Dr. Anna Kowalski</p>
        <p class="author-role">Astrophysicist</p>
      </div>
    </div>
    <div class="fact-card">
      <h3 class="fact-card__title">Did you know?</h3>
      <p class="fact-card__text">Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth. When you look at the Sun, you are seeing it as it was over 8 minutes ago.</p>
    </div>
    <section class="article-body">
      <h2 class="section-title">The Solar System</h2>
      <p>The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud.</p>
      <p>The vast majority of the system's mass is in the Sun, with most of the remaining mass contained in the planet Jupiter.</p>
      <p>The four inner planets — Mercury, Venus, Earth and Mars — are terrestrial planets, composed primarily of rock and metal.</p>
      <p>Beyond the planets, the Solar System is also home to regions populated by smaller objects, including the asteroid belt between Mars and Jupiter.</p>
    </section>
    <div class="newsletter-banner">
      <p class="newsletter-banner__text">Subscribe — new space articles every Monday!</p>
    </div>
    <blockquote class="featured-quote">
      "The universe is under no obligation to make sense to you."
      <cite class="featured-quote__author">— Neil deGrasse Tyson</cite>
    </blockquote>
    <div class="mission-log">
      <h3 class="mission-log__title">Mission Log</h3>
      <p>Day 1: Launched from Kennedy Space Center at 09:00 UTC.</p>
      <p>Day 3: Successfully entered Earth orbit. All systems nominal.</p>
      <p>Day 7: Passed the Moon. Beautiful view of the lunar surface.</p>
      <p>Day 14: Crossing the asteroid belt. Minor debris detected, no threat.</p>
      <p>Day 30: Jupiter is visible with the naked eye. Incredible sight.</p>
      <p>Day 45: Entered Jupiter's gravitational influence. Preparing for orbital insertion.</p>
    </div>
  </div>
</main>
<footer class="site-footer">
  <p class="site-footer__text">© 2026 Space Explorer Blog. All rights reserved.</p>
</footer>
</body>
</html>`;

// ── CSS snippets ──────────────────────────────────────────────────────
const ANSWER_CSS =
`/* Завдання 1 — height & width */
.hero-banner {
  height: 400px;
}

/* Завдання 2 — border */
.article-preview {
  border: 2px solid #0f3460;
}

/* Завдання 3 — border-radius */
.article-preview {
  border-radius: 8px;
}
.author-avatar {
  border-radius: 50%;
}

/* Завдання 4 — padding */
.article-preview {
  padding: 20px;
}
.fact-card {
  padding: 16px 20px;
}

/* Завдання 5a — margin-top між абзацами */
.article-body p {
  margin-top: 24px;
}

/* Завдання 5б — margin: auto для центрування */
.newsletter-banner {
  margin: 0 auto 32px;
  padding: 14px 24px;
}
.container {
  max-width: 960px;
  margin: 0 auto;
}

/* Завдання 6 — min/max-width & min-height */
.featured-quote {
  max-width: 680px;
  min-height: 80px;
}

/* Завдання 7 — overflow */
.mission-log {
  overflow: scroll;
}

/* Завдання 8 — скидання стандартних стилів */
* {
  margin: 0;
  padding: 0;
}

/* Завдання 9 — visibility */
.nav-item--soon {
  visibility: hidden;
}
`;

const BASE_CSS =
`/* Пиши свій CSS тут.
   Натисни «Вставити в редактор» у завданні
   або вводь код вручну — preview оновлюється автоматично. */

`;
