import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const galleryPath = resolve('gallery.html');
const html = readFileSync(galleryPath, 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const requiredSnippets = [
  '<script src="sidebar.js"></script>',
  "SkillBuilderSidebar.render('gallery')",
  'id="aiHubShell"',
  'id="expertsView"',
  'id="skillsView"',
  'id="connectorView"',
  '发现各领域 AI 专家，一键使用',
  'OfficeCLI&nbsp;&nbsp;一站式文档处理',
  'id="connGrid"',
  'try { showExpertTab("experts"); }',
];

for (const snippet of requiredSnippets) {
  assert(html.includes(snippet), `gallery.html is missing required AI Hub markup: ${snippet}`);
}

const requiredStyleSelectors = [
  '.cat-tabs',
  '.cat-tab',
  '.sub-tabs',
  '.sub-tab',
  '.emp-grid',
  '.emp-card',
  '.emp-card-top',
  '.emp-avatar',
  '.emp-name',
  '.emp-author',
  '.emp-desc',
  '.skl-layout',
  '.skl-main',
  '.skl-side',
  '.skl-banner',
  '.stat-card',
  '.stat-grid',
  '.stat-lbl',
  '.stat-val',
  '.skl-grid',
  '.skl-card',
  '.skl-card-top',
  '.skl-icon',
  '.skl-title',
  '.skl-author',
  '.skl-card-desc',
  '.skl-card-foot',
  '.skl-install',
  '.side-card',
  '.side-card-head',
  '.side-seg',
  '.rank-row',
  '.rank-no',
  '.rank-name',
  '.rank-cat',
  '.rank-dl',
  '.contrib-row',
  '.contrib-av',
  '.contrib-name',
  '.contrib-sub',
];

for (const selector of requiredStyleSelectors) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert(
    new RegExp(`${escaped}(?:\\s|[,:{.#>])`).test(html),
    `gallery.html is missing required AI Hub display style: ${selector}`,
  );
}

assert(!html.includes('<nav class="nav">'), 'gallery.html should use the AI Builder sidebar, not the JoyClaw left nav');
assert(!html.includes('id="kbListCol"'), 'gallery.html should not include the JoyClaw knowledge-base column');
assert(!html.includes('id="mainArea"'), 'gallery.html should not include the JoyClaw knowledge-base main area');
assert(!html.includes('id="chatView"'), 'gallery.html should only include the AI Hub right-side content, not the JoyClaw chat page');
assert(!html.includes('id="scheduleView"'), 'gallery.html should only include the AI Hub right-side content, not the JoyClaw schedule page');

console.log('gallery.html AI Hub structure looks good');
