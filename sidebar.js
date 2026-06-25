/**
 * Skill Builder — 公共左侧导航组件
 * 用法：<script src="../sidebar.js"></script>
 *       SkillBuilderSidebar.render('gallery')  // 传入当前页面 key
 */
(function(global) {
  const NAV_ITEMS = [
    { key: 'create',    icon: 'fas fa-plus-circle',   label: '创建技能', href: 'create.html' },
    { key: 'skills',    icon: 'fas fa-layer-group',   label: '我的技能', href: 'skills.html' },
    { key: 'gallery',   icon: 'fas fa-compass',       label: 'Skillhub', href: 'gallery.html' },
    { key: 'templates', icon: 'fas fa-file-alt',      label: '优秀案例', href: 'templates.html' },
    { key: 'testing',   icon: 'fas fa-flask',         label: '评测优化', href: 'testing.html' },
    { key: 'analytics', icon: 'fas fa-chart-line',    label: '数据分析', href: 'analytics.html' },
  ];

  const BOTTOM_ITEMS = [
    { icon: 'fas fa-book-open', label: '文档 & 教程' },
    { icon: 'fas fa-bell',      label: '通知', badge: '3' },
  ];

  const CSS = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      display: flex;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      font-size: 14px;
      color: #111;
      background: #f5f6fa;
    }
    :root {
      --border: #eceef2;
      --surface: #fff;
      --bg: #f5f6fa;
      --text-main: #111;
      --text-sub: #555;
      --text-muted: #999;
      --radius: 8px;
    }
    #sb-sidebar {
      width: 192px;
      min-width: 192px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      overflow-y: auto;
      overflow-x: hidden;
      user-select: none;
    }
    .sb-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 14px 12px;
      flex-shrink: 0;
    }
    .sb-logo-icon {
      width: 26px; height: 26px;
      border-radius: 7px;
      background: #111;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; color: #fff; font-weight: 800;
      flex-shrink: 0;
      letter-spacing: -0.5px;
    }
    .sb-logo-text {
      font-size: 14px; font-weight: 700; color: var(--text-main);
      white-space: nowrap; letter-spacing: -0.3px;
    }
    .sb-divider { height: 1px; background: var(--border); margin: 4px 0; }
    .sb-group { padding: 2px 8px; }
    .sb-nav-item {
      display: flex; align-items: center; gap: 9px;
      padding: 7px 8px;
      border-radius: var(--radius);
      cursor: pointer; color: var(--text-sub); font-size: 13px;
      text-decoration: none;
      transition: background 0.1s, color 0.1s;
      position: relative;
    }
    .sb-nav-item:hover { background: var(--bg); color: var(--text-main); }
    .sb-nav-item.active {
      background: var(--bg);
      color: var(--text-main);
      font-weight: 600;
    }
    .sb-nav-item.active .sb-icon { color: var(--text-main); }
    .sb-nav-item .sb-icon { width: 15px; text-align: center; font-size: 12px; flex-shrink: 0; color: var(--text-muted); transition: color 0.1s; }
    .sb-nav-item:hover .sb-icon { color: var(--text-main); }
    .sb-badge {
      margin-left: auto;
      font-size: 10px; background: #eceef2; color: #555;
      padding: 1px 6px; border-radius: 9999px; font-weight: 600;
    }
    .sb-bottom {
      margin-top: auto;
      padding: 6px 8px 10px;
      border-top: 1px solid var(--border);
    }
    .sb-bottom-item {
      display: flex; align-items: center; gap: 9px;
      padding: 7px 8px; border-radius: var(--radius);
      cursor: pointer; color: var(--text-sub); font-size: 13px;
      transition: background 0.1s;
    }
    .sb-bottom-item:hover { background: var(--bg); color: var(--text-main); }
    .sb-bottom-item .sb-icon { width: 15px; text-align: center; font-size: 12px; flex-shrink: 0; color: var(--text-muted); }
    .sb-user-row {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 8px; border-radius: var(--radius);
      cursor: pointer; margin-top: 4px;
      transition: background 0.1s;
    }
    .sb-user-row:hover { background: var(--bg); }
    .sb-avatar {
      width: 26px; height: 26px; border-radius: 50%;
      background: #111;
      color: #fff; font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .sb-user-name { font-size: 13px; font-weight: 500; color: var(--text-main); flex: 1; }
    .sb-user-more { font-size: 10px; color: var(--text-muted); }
    #sb-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  `;

  function render(activeKey) {
    // 注入字体
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const fa = document.createElement('link');
      fa.rel = 'stylesheet';
      fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fa);
    }
    // 注入样式
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // 构建侧边栏 HTML
    const navItemsHTML = NAV_ITEMS.map(item => `
      <a class="sb-nav-item ${item.key === activeKey ? 'active' : ''} ${item.accent ? 'accent' : ''}" href="${item.href}">
        <i class="sb-icon ${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `).join('');

    const bottomHTML = BOTTOM_ITEMS.map(item => `
      <div class="sb-bottom-item">
        <i class="sb-icon ${item.icon}"></i>
        <span>${item.label}</span>
        ${item.badge ? `<span class="sb-badge">${item.badge}</span>` : ''}
      </div>
    `).join('');

    const sidebarEl = document.createElement('aside');
    sidebarEl.id = 'sb-sidebar';
    sidebarEl.innerHTML = `
      <div class="sb-logo">
        <div class="sb-logo-icon">S</div>
        <span class="sb-logo-text">Skill Builder</span>
      </div>
      <div class="sb-group">
        ${navItemsHTML}
      </div>
      <div class="sb-bottom">
        ${bottomHTML}
        <div class="sb-divider" style="margin:6px 0"></div>
        <div class="sb-user-row">
          <div class="sb-avatar">贾</div>
          <span class="sb-user-name">贾世霖</span>
          <i class="fas fa-chevron-up sb-user-more"></i>
        </div>
      </div>
    `;

    // 包裹 body 内容
    const bodyChildren = Array.from(document.body.childNodes);
    const contentEl = document.createElement('div');
    contentEl.id = 'sb-content';
    bodyChildren.forEach(node => contentEl.appendChild(node));

    document.body.appendChild(sidebarEl);
    document.body.appendChild(contentEl);
  }

  global.SkillBuilderSidebar = { render };
})(window);
