// Highlights the lesson TOC entry for the section currently in view.
(() => {
  const links = [...document.querySelectorAll('.lesson-toc nav a')];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  const visible = new Set();

  const setActive = id => links.forEach(a => a.classList.toggle('is-active', a === byId.get(id)));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
    const first = [...byId.keys()].find(id => visible.has(id));
    if (first) setActive(first);
  }, { rootMargin: '-120px 0px -55% 0px' });

  byId.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
