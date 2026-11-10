// ORT 141 · practice IDE engine.
// Load order: CodeMirror (optional) → ide.js → content.js (defines window.LESSON).
// The IDE boots on DOMContentLoaded, after content.js has run.
//
// LESSON = {
//   id, num, title, back, next,
//   files: { 'index.html': { code, editable }, 'style.css': { code, editable } },
//   exercises: [{
//     title, body,                        // body: HTML (use IDE.pre / IDE.c for code)
//     files?,                             // own file set instead of the shared lesson one
//     focus?,                             // file tab to open
//     tasks: [{ text, hint?, solution?: { file, code, before?, replace? }, check(t) → true | 'message' | false }]
//     (.html solutions are inserted before </body>, or before `before`; `replace` swaps that text for code)
//   }]
// }

(() => {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const modeOf = file =>
    file.endsWith('.css') ? 'css' : file.endsWith('.js') ? 'javascript' : 'htmlmixed';

  window.IDE = {
    esc,
    c: s => `<code>${esc(s)}</code>`,
    pre: (src, lang = 'css') =>
      `<pre class="cm-s-ort" data-lang="${lang}"><code>${esc(src.replace(/^\n+|\s+$/g, ''))}</code></pre>`,
  };

  // ── Check helpers (passed to every task.check) ──────────────────
  const norm = s => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ').replace(/["']/g, '');
  const normSel = s => s.replace(/\s*([>,+~])\s*/g, '$1').replace(/\s+/g, ' ').trim().toLowerCase();

  function makeCtx(frame, files) {
    const doc = frame.contentDocument;
    const win = frame.contentWindow;
    const $ = sel => doc.querySelector(sel);
    const $$ = sel => [...doc.querySelectorAll(sel)];

    const studentRules = () => {
      const out = [];
      const walk = list => {
        for (const r of list) {
          if (r.selectorText) out.push(r);
          else if (r.cssRules) walk(r.cssRules);
        }
      };
      doc.querySelectorAll('style[data-file]').forEach(s => { try { walk(s.sheet.cssRules); } catch {} });
      return out;
    };

    const probe = (prop, value) => {
      const el = doc.createElement('div');
      el.style.setProperty(prop, value);
      doc.body.appendChild(el);
      const v = win.getComputedStyle(el).getPropertyValue(prop);
      el.remove();
      return v;
    };

    const css = (sel, prop, pseudo) => {
      const el = typeof sel === 'string' ? $(sel) : sel;
      return el ? win.getComputedStyle(el, pseudo).getPropertyValue(prop).trim() : null;
    };

    const t = {
      doc, win, $, $$, css,
      code: file => files[file] ?? '',
      // computed value of `prop` on `sel` equals `expected` (normalised by the browser)
      is(sel, prop, expected) {
        const actual = css(sel, prop);
        if (actual == null) return false;
        if (norm(actual) === norm(expected)) return true;
        return norm(actual) === norm(probe(prop, expected));
      },
      // every element matching sel has prop == expected
      all(sel, prop, expected) {
        const els = $$(sel);
        return els.length > 0 && els.every(el => t.is(el, prop, expected));
      },
      // all student rules with exactly this selector (in file order)
      rules(sel) {
        const want = normSel(sel);
        return studentRules().filter(r => normSel(r.selectorText) === want).map(r => r.style);
      },
      // the student wrote a rule with this selector; returns its style (last one wins) or null
      rule(sel) {
        const all = t.rules(sel);
        return all.length ? all[all.length - 1] : null;
      },
      // declared value for prop across the student's rules with this selector (works for :hover etc.)
      decl(sel, prop) {
        const vals = t.rules(sel).map(s => s.getPropertyValue(prop).trim()).filter(Boolean);
        return vals.length ? vals[vals.length - 1] : '';
      },
      important: (sel, prop) => t.rules(sel).some(s => s.getPropertyPriority(prop) === 'important'),
      declIs(sel, prop, expected) {
        const v = t.decl(sel, prop);
        return !!v && (norm(v) === norm(expected) || norm(probe(prop, v)) === norm(probe(prop, expected)));
      },
      has: (file, re) => (re instanceof RegExp ? re : new RegExp(re, 'i')).test(files[file] ?? ''),
      text: sel => ($(sel)?.textContent ?? '').trim(),
    };
    return t;
  }

  // ── Boot ────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const L = window.LESSON;
    if (!L) return;
    document.title = `Практика · ${L.title}`;

    const KEY = `ort-ide:${L.id}`;
    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
    const store = Object.assign({ ex: 0, code: {}, done: {} }, load());
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch {} };

    const hashEx = parseInt(location.hash.slice(1), 10);
    let cur = Number.isInteger(hashEx) && hashEx >= 1 && hashEx <= L.exercises.length ? hashEx - 1 : Math.min(store.ex || 0, L.exercises.length - 1);
    let activeFile = null;

    // ── Layout ──
    document.body.innerHTML = `
      <header class="ide-top">
        <a class="ide-back" href="${L.back}">← Конспект</a>
        <div class="ide-title"><span>Урок ${L.num} · Практика</span>${esc(L.title)}</div>
        <div class="ide-progress"><div class="ide-progress-bar"><i></i></div><span class="ide-progress-txt"></span></div>
        <button class="ide-top-btn" data-act="reset" title="Повернути початковий код">↺ Скинути код</button>
      </header>
      <nav class="ex-menu"></nav>
      <main class="ide-main">
        <section class="learn">
          <div class="learn-scroll"></div>
          <div class="learn-foot">
            <button class="btn btn-icon" data-act="prev" title="Попередня вправа">←</button>
            <button class="btn btn-run" data-act="run">▶ Перевірити</button>
            <button class="foot-count btn btn-icon" data-act="menu" style="border:0;color:var(--subtle)"></button>
            <button class="btn btn-next" data-act="next">Далі →</button>
          </div>
        </section>
        <section class="code">
          <div class="tabs"></div>
          <div class="editor-host"></div>
        </section>
        <section class="browser">
          <div class="browser-bar">
            <div class="browser-dots"><i></i><i></i><i></i></div>
            <div class="browser-url">localhost/index.html</div>
            <button class="browser-refresh" data-act="refresh" title="Оновити">⟳</button>
          </div>
          <iframe sandbox="allow-same-origin allow-scripts allow-modals" title="Перегляд"></iframe>
        </section>
      </main>
      <div class="toast"></div>`;

    const $ = s => document.querySelector(s);
    const learn = $('.learn-scroll');
    const tabs = $('.tabs');
    const host = $('.editor-host');
    const frame = $('iframe');
    const menu = $('.ex-menu');

    // ── Files / scope ──
    const ex = () => L.exercises[cur];
    const scopeKey = () => (ex().files ? `ex${cur}` : 'lesson');
    const fileDefs = () => ex().files || L.files;
    const files = () => {
      const k = scopeKey();
      const defs = fileDefs();
      const saved = store.code[k] || (store.code[k] = {});
      // editable files keep the student's code; locked/hidden ones always come from content.js
      for (const [n, f] of Object.entries(defs)) {
        if (f.hidden || f.editable === false || !(n in saved)) saved[n] = f.code;
      }
      return saved;
    };

    // ── Editor (CodeMirror with textarea fallback) ──
    const hasCM = !!window.CodeMirror;
    let cm = null, ta = null;
    const docs = {};
    if (hasCM) {
      cm = CodeMirror(host, {
        theme: 'ort', lineNumbers: true, tabSize: 2, indentUnit: 2, lineWrapping: true,
        autoCloseBrackets: true, autoCloseTags: true,
        extraKeys: { Tab: c => c.replaceSelection('  '), 'Ctrl-Enter': () => run(), 'Cmd-Enter': () => run() },
      });
      cm.on('change', () => onEdit(cm.getValue()));
    } else {
      ta = document.createElement('textarea');
      ta.className = 'fallback';
      ta.spellcheck = false;
      host.appendChild(ta);
      ta.addEventListener('input', () => onEdit(ta.value));
      ta.addEventListener('keydown', e => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        const s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 2;
        onEdit(ta.value);
      });
    }
    const roNote = document.createElement('div');
    roNote.className = 'readonly-note';
    roNote.textContent = '🔒 лише для читання';
    host.appendChild(roNote);

    let swapping = false;
    function openFile(name) {
      activeFile = name;
      const editable = fileDefs()[name].editable !== false;
      const value = files()[name];
      swapping = true;
      if (cm) {
        const k = `${scopeKey()}/${name}`;
        if (!docs[k] || docs[k].getValue() !== value) docs[k] = CodeMirror.Doc(value, modeOf(name));
        cm.swapDoc(docs[k]);
        cm.setOption('readOnly', editable ? false : 'nocursor');
        cm.getWrapperElement().classList.toggle('CodeMirror-readonly', !editable);
        setTimeout(() => cm.refresh(), 0);
      } else {
        ta.value = value;
        ta.readOnly = !editable;
      }
      swapping = false;
      roNote.style.display = editable ? 'none' : '';
      tabs.querySelectorAll('.tab').forEach(b => b.classList.toggle('is-active', b.dataset.file === name));
    }

    function renderTabs() {
      tabs.innerHTML = Object.entries(fileDefs()).filter(([, f]) => !f.hidden).map(([n, f]) =>
        `<button class="tab" data-file="${n}">${n}${f.editable === false ? '<span class="lock">🔒</span>' : ''}</button>`
      ).join('');
      tabs.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => openFile(b.dataset.file)));
    }

    // ── Preview ──
    function buildPage() {
      const f = files();
      const htmlName = Object.keys(f).find(n => n.endsWith('.html'));
      let html = htmlName ? f[htmlName] : '<!DOCTYPE html><html><head></head><body></body></html>';
      for (const [name, code] of Object.entries(f)) {
        const hidden = fileDefs()[name]?.hidden;
        if (name.endsWith('.css') && hidden) {
          const tag = `<style data-hidden="${name}">${code}</style>`;
          html = /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, m => m + tag) : tag + html;
        } else if (name.endsWith('.css')) {
          const tag = `<style data-file="${name}">${code}</style>`;
          const linkRe = new RegExp(`<link[^>]*href=["']${name.replace('.', '\\.')}["'][^>]*>`, 'i');
          if (linkRe.test(html)) html = html.replace(linkRe, () => tag);
          else if (html.includes('<style id="student-style"></style>')) html = html.replace('<style id="student-style"></style>', () => tag);
          else if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i, () => tag + '</head>');
          else html = tag + html;
        } else if (name.endsWith('.js')) {
          const tag = `<script data-file="${name}">${code}<\/script>`;
          const srcRe = new RegExp(`<script[^>]*src=["']${name.replace('.', '\\.')}["'][^>]*><\\/script>`, 'i');
          if (srcRe.test(html)) html = html.replace(srcRe, () => tag);
          else if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, () => tag + '</body>');
          else html += tag;
        }
      }
      // keep in-page anchor clicks inside the preview (#id still scrolls to its target)
      html = html.replace(/<\/body>/i, () => `<script>document.addEventListener('click',e=>{const a=e.target.closest('a');const h=a&&(a.getAttribute('href')||'');if(a&&/^(#|$)/.test(h)){e.preventDefault();const el=h.length>1&&document.getElementById(decodeURIComponent(h.slice(1)));if(el)el.scrollIntoView({behavior:'smooth'});}});<\/script></body>`);
      return html;
    }

    // non-CSS source: if it hasn't changed since the last render, CSS can be patched in place
    const structKey = () => JSON.stringify(Object.entries(files()).filter(([n]) => !n.endsWith('.css')));
    let renderedKey = null;

    // resolves once the new document's DOM is parsed — without waiting for images/video to download
    function render() {
      let oldDoc = null;
      try { oldDoc = frame.contentDocument; } catch {}
      renderedKey = structKey();
      frame.srcdoc = buildPage();
      return new Promise(res => {
        const t0 = Date.now();
        (function poll() {
          let d = null;
          try { d = frame.contentDocument; } catch {}
          if ((d && d !== oldDoc && d.readyState !== 'loading' && d.URL === 'about:srcdoc') || Date.now() - t0 > 5000) return res();
          setTimeout(poll, 20);
        })();
      });
    }

    // CSS-only edits update in place (no flicker, scroll kept)
    function patchCSS(name, code) {
      try {
        const el = frame.contentDocument.querySelector(`style[data-file="${name}"]`);
        if (el) { el.textContent = code; return true; }
      } catch {}
      return false;
    }

    let timer;
    function onEdit(value) {
      if (swapping || !activeFile) return;
      files()[activeFile] = value;
      save();
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!(activeFile.endsWith('.css') && patchCSS(activeFile, value))) render();
      }, 300);
    }

    // HTML solutions go before </body> (or before `s.before`); `s.replace` swaps that text for the code.
    function insertCode(file, code, s = {}) {
      if (activeFile !== file) openFile(file);
      const text = cm ? cm.getValue() : ta.value;
      const marker = s.replace || s.before || (file.endsWith('.html') ? '</body>' : null);
      const at = marker ? text.indexOf(marker) : -1;
      if (at >= 0) {
        let from = at, to = s.replace ? at + marker.length : at, add = code.replace(/^\n+|\s+$/g, '');
        if (!s.replace) {
          const lineStart = text.lastIndexOf('\n', at - 1) + 1;
          if (/^\s*$/.test(text.slice(lineStart, at))) { from = to = lineStart; add += '\n'; }
        }
        if (cm) {
          const d = cm.getDoc();
          d.replaceRange(add, d.posFromIndex(from), d.posFromIndex(to));
          cm.focus();
          cm.scrollIntoView(d.posFromIndex(from));
        } else {
          ta.value = text.slice(0, from) + add + text.slice(to);
          onEdit(ta.value);
        }
        return;
      }
      if (cm) {
        const d = cm.getDoc();
        const last = d.lastLine();
        const end = { line: last, ch: d.getLine(last).length };
        const sep = d.getValue().length && !d.getValue().endsWith('\n\n') ? (d.getValue().endsWith('\n') ? '\n' : '\n\n') : '';
        d.replaceRange(sep + code.trim() + '\n', end);
        cm.focus();
        cm.scrollIntoView(d.lastLine());
      } else {
        ta.value = ta.value.replace(/\s*$/, '\n\n') + code.trim() + '\n';
        onEdit(ta.value);
      }
    }

    // ── Learn panel ──
    const doneOf = i => store.done[i] || [];
    const exDone = i => {
      const n = L.exercises[i].tasks?.length || 0;
      return n === 0 ? !!store.done[i] : doneOf(i).filter(Boolean).length === n;
    };

    function highlight(root) {
      if (!window.CodeMirror?.runMode) return;
      root.querySelectorAll('pre[data-lang] code').forEach(code => {
        const src = code.textContent;
        code.textContent = '';
        CodeMirror.runMode(src, modeOf('x.' + (code.parentElement.dataset.lang === 'html' ? 'html' : code.parentElement.dataset.lang)), code);
      });
    }

    function renderLearn() {
      const e = ex();
      const tasks = e.tasks || [];
      const done = doneOf(cur);
      learn.innerHTML = `
        <div class="learn-eyebrow">Вправа ${cur + 1} з ${L.exercises.length}</div>
        <h1>${e.title}</h1>
        <div class="learn-body">${e.body || ''}</div>
        ${tasks.length ? `
        <div class="instr">
          <div class="instr-head">☑ Завдання</div>
          ${tasks.map((t, i) => `
            <div class="task ${done[i] ? 'is-done' : ''}" data-i="${i}">
              <div class="task-mark">${done[i] ? '✓' : i + 1}</div>
              <div class="task-text">${t.text}</div>
              ${t.hint || t.solution ? `<button class="task-hint-btn" data-hint="${i}">Застряг? Показати підказку</button>
              <div class="task-hint" hidden>
                ${t.hint ? `<div>${t.hint}</div>` : ''}
                ${t.solution ? IDE.pre(t.solution.code, t.solution.file.split('.').pop()) +
                  `<button class="insert-btn" data-insert="${i}">+ Вставити в ${t.solution.file}</button>` : ''}
              </div>` : ''}
            </div>`).join('')}
        </div>` : ''}
        <div class="ex-done" ${exDone(cur) && tasks.length ? '' : 'hidden'}>✓ Вправу виконано! Тисни «Далі →».</div>`;
      highlight(learn);
      learn.scrollTop = 0;

      learn.querySelectorAll('[data-hint]').forEach(b => b.addEventListener('click', () => {
        const box = b.nextElementSibling;
        box.hidden = !box.hidden;
        b.textContent = box.hidden ? 'Застряг? Показати підказку' : 'Сховати підказку';
      }));
      learn.querySelectorAll('[data-insert]').forEach(b => b.addEventListener('click', () => {
        const s = tasks[+b.dataset.insert].solution;
        insertCode(s.file, s.code, s);
      }));
    }

    function renderChrome() {
      const total = L.exercises.length;
      const finished = L.exercises.filter((_, i) => exDone(i)).length;
      $('.ide-progress-bar i').style.width = `${(finished / total) * 100}%`;
      $('.ide-progress-txt').textContent = `${finished} / ${total}`;
      $('.foot-count').textContent = `${cur + 1} / ${total} ☰`;
      $('[data-act="prev"]').disabled = cur === 0;
      const next = $('[data-act="next"]');
      const last = cur === total - 1;
      next.textContent = last ? 'Завершити ✓' : 'Далі →';
      next.classList.toggle('is-ready', exDone(cur) || !(ex().tasks || []).length);
      $('[data-act="run"]').style.display = (ex().tasks || []).length ? '' : 'none';
      menu.innerHTML = L.exercises.map((e, i) =>
        `<a href="#${i + 1}" data-go="${i}" class="${i === cur ? 'is-current' : ''} ${exDone(i) ? 'is-done' : ''}">
          <span class="m">${exDone(i) ? '✓' : String(i + 1).padStart(2, '0')}</span><span>${e.title}</span></a>`).join('');
      menu.querySelectorAll('[data-go]').forEach(a => a.addEventListener('click', ev => {
        ev.preventDefault();
        menu.classList.remove('is-open');
        go(+a.dataset.go);
      }));
    }

    function go(i) {
      const prevScope = scopeKey();
      cur = Math.max(0, Math.min(L.exercises.length - 1, i));
      store.ex = cur;
      if (!(ex().tasks || []).length) store.done[cur] = true;
      save();
      history.replaceState(null, '', `#${cur + 1}`);
      renderLearn();
      renderChrome();
      if (scopeKey() !== prevScope || !activeFile) renderTabs();
      const defs = fileDefs();
      const want = ex().focus || (activeFile in defs && scopeKey() === prevScope ? activeFile : null) ||
        Object.keys(defs).find(n => n.endsWith('.css') && !defs[n].hidden && defs[n].editable !== false) ||
        Object.keys(defs).find(n => !defs[n].hidden && defs[n].editable !== false) || Object.keys(defs).find(n => !defs[n].hidden);
      openFile(want);
      render();
    }

    // ── Run checks ──
    let toastTimer;
    function toast(msg) {
      const t = $('.toast');
      t.textContent = msg;
      t.classList.add('is-on');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('is-on'), 2600);
    }

    async function run() {
      const tasks = ex().tasks || [];
      if (!tasks.length) return;
      // flush pending edits; reload only when HTML/JS changed, otherwise check the live preview
      clearTimeout(timer);
      const cssOk = Object.entries(files()).filter(([n]) => n.endsWith('.css') && !fileDefs()[n]?.hidden)
        .every(([n, code]) => patchCSS(n, code));
      if (renderedKey !== structKey() || !cssOk) await render();
      const ctx = makeCtx(frame, files());
      const results = [];
      let failMsg = null, failAt = -1;
      for (let i = 0; i < tasks.length; i++) {
        let r;
        try { r = tasks[i].check(ctx); } catch (err) { r = false; console.warn(err); }
        if (r === true) { results[i] = true; continue; }
        results[i] = false;
        if (failAt < 0) { failAt = i; failMsg = typeof r === 'string' ? r : 'Ще не зовсім. Перечитай завдання або відкрий підказку.'; }
      }
      store.done[cur] = results;
      save();
      renderLearn();
      renderChrome();
      if (failAt >= 0) {
        const row = learn.querySelector(`.task[data-i="${failAt}"]`);
        row.classList.add('is-fail');
        const err = document.createElement('div');
        err.className = 'task-err';
        err.innerHTML = failMsg;
        row.querySelector('.task-text').after(err);
        row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        toast(cur === L.exercises.length - 1 ? '🎉 Усі вправи уроку виконано!' : '✓ Чудово! Переходь до наступної вправи.');
        learn.querySelector('.ex-done')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }

    // ── Actions ──
    document.addEventListener('click', e => {
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (!act) {
        if (!e.target.closest('.ex-menu')) menu.classList.remove('is-open');
        return;
      }
      if (act === 'run') run();
      if (act === 'prev') go(cur - 1);
      if (act === 'next') {
        if (cur === L.exercises.length - 1) location.href = L.next || L.back;
        else go(cur + 1);
      }
      if (act === 'menu') menu.classList.toggle('is-open');
      if (act === 'refresh') render();
      if (act === 'reset' && confirm('Повернути початковий код? Твої зміни у файлах цієї вправи зникнуть.')) {
        delete store.code[scopeKey()];
        Object.keys(docs).forEach(k => k.startsWith(scopeKey() + '/') && delete docs[k]);
        save();
        openFile(activeFile);
        render();
      }
    });

    renderTabs();
    go(cur);
  });
})();
