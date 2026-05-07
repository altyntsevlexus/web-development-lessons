// PAGE_HTML, ANSWER_CSS, BASE_CSS are defined in each sandbox's content.js
const editor  = document.getElementById('css-editor');
const preview = document.getElementById('preview');

function renderFull(css) {
  preview.srcdoc = PAGE_HTML.replace(
    '<style id="student-style"></style>',
    `<style id="student-style">${css}</style>`
  );
}

function updateCSS() {
  try {
    const el = preview.contentDocument &&
               preview.contentDocument.getElementById('student-style');
    if (el) {
      el.textContent = editor.value;
    } else {
      renderFull(editor.value);
    }
  } catch {
    renderFull(editor.value);
  }
}

window.resetCSS = function() {
  editor.value = BASE_CSS;
  renderFull(BASE_CSS);
};

window.showAnswer = function() {
  editor.value = ANSWER_CSS;
  updateCSS();
};

window.insert = function(snippet) {
  const start  = editor.selectionStart;
  const before = editor.value.substring(0, start);
  const after  = editor.value.substring(editor.selectionEnd);
  const needNL = before.length > 0 && !before.endsWith('\n');
  editor.value = before + (needNL ? '\n' : '') + snippet + after;
  const pos = start + (needNL ? 1 : 0) + snippet.length;
  editor.selectionStart = editor.selectionEnd = pos;
  editor.focus();
  updateCSS();
};

window.toggle = function(id) {
  document.getElementById(id).classList.toggle('open');
};

let timer;
editor.addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(updateCSS, 250);
});

editor.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  e.preventDefault();
  const s = editor.selectionStart;
  editor.value = editor.value.slice(0, s) + '  ' + editor.value.slice(editor.selectionEnd);
  editor.selectionStart = editor.selectionEnd = s + 2;
});

const resizer    = document.getElementById('resizer');
const editorWrap = document.querySelector('.editor-wrap');
const rightPanel = document.querySelector('.right-panel');

let dragging = false, dragStartY, dragStartH;

resizer.addEventListener('mousedown', e => {
  e.preventDefault();
  dragging   = true;
  dragStartY = e.clientY;
  dragStartH = editorWrap.getBoundingClientRect().height;
  resizer.classList.add('dragging');

  const overlay = document.createElement('div');
  overlay.id = 'drag-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;cursor:ns-resize;';
  document.body.appendChild(overlay);
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const totalH = rightPanel.getBoundingClientRect().height;
  const newH   = Math.min(Math.max(dragStartH + (e.clientY - dragStartY), 80), totalH - 80);
  editorWrap.style.height = newH + 'px';
});

document.addEventListener('mouseup', () => {
  if (!dragging) return;
  dragging = false;
  resizer.classList.remove('dragging');
  const overlay = document.getElementById('drag-overlay');
  if (overlay) overlay.remove();
});

editor.value = BASE_CSS;
renderFull(BASE_CSS);
