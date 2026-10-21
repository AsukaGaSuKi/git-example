/* =============================================
 * 简单搜索 — 主逻辑
 * 零依赖：直接双击 index.html 即可运行
 * =========================================== */

(function () {
  'use strict';

  /* --------------------------------------------
   * 1. 本地数据集
   * ------------------------------------------ */

  var DATA = [
    { title: 'GitHub', url: 'https://github.com', desc: '全球最大的代码托管与协作平台，开源项目的主要聚集地。', tags: ['git', '代码', '开源'], category: '开发' },
    { title: 'GitLab', url: 'https://gitlab.com', desc: '支持 CI/CD 的 DevOps 平台，可自建私有仓库。', tags: ['git', 'devops', 'ci'], category: '开发' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com', desc: '程序员问答社区，绝大多数技术问题都能搜到答案。', tags: ['问答', '编程'], category: '社区' },
    { title: 'Hacker News', url: 'https://news.ycombinator.com', desc: '技术与创业圈的高质量资讯聚合。', tags: ['资讯', '科技'], category: '社区' },
    { title: 'V2EX', url: 'https://www.v2ex.com', desc: '创意工作者社区，话题杂、技术讨论多。', tags: ['社区', '讨论'], category: '社区' },
    { title: '掘金', url: 'https://juejin.cn', desc: '中文技术社区，前端与后端文章丰富。', tags: ['前端', '博客'], category: '社区' },
    { title: '少数派', url: 'https://sspai.com', desc: '高质量数字生活与效率工具媒体。', tags: ['效率', '技巧'], category: '社区' },

    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', desc: 'Web 平台官方文档，HTML/CSS/JavaScript 的权威参考。', tags: ['文档', '前端', 'javascript'], category: '文档' },
    { title: 'Can I use', url: 'https://caniuse.com', desc: '查询各浏览器对前端特性的支持情况与兼容数据。', tags: ['兼容', '前端'], category: '文档' },
    { title: 'CSS-Tricks', url: 'https://css-tricks.com', desc: 'CSS 技巧与实战案例合集。', tags: ['css', '前端'], category: '文档' },
    { title: 'DevDocs', url: 'https://devdocs.io', desc: '上千个前端库文档的聚合搜索入口。', tags: ['文档', 'api'], category: '文档' },
    { title: '菜鸟教程', url: 'https://www.runoob.com', desc: '中文入门教程站，覆盖主流编程语言与数据库。', tags: ['教程', '入门'], category: '学习' },
    { title: 'W3School', url: 'https://www.w3school.com.cn', desc: '中文在线教程，适合快速查语法。', tags: ['教程', '入门'], category: '学习' },

    { title: 'npm', url: 'https://www.npmjs.com', desc: 'Node.js 包管理器与前端包生态。', tags: ['javascript', 'node', '包管理'], category: '开发' },
    { title: 'PyPI', url: 'https://pypi.org', desc: 'Python 官方包索引，海量第三方库。', tags: ['python', '包管理'], category: '开发' },
    { title: 'Docker Hub', url: 'https://hub.docker.com', desc: '容器镜像仓库与官方镜像集合。', tags: ['docker', '容器'], category: '开发' },
    { title: 'VS Code', url: 'https://code.visualstudio.com', desc: '微软出品的跨平台代码编辑器，扩展生态丰富。', tags: ['编辑器', '工具'], category: '工具' },
    { title: 'Vim Tips', url: 'https://vimhelp.org', desc: 'Vim 官方帮助文档与技巧索引。', tags: ['编辑器', 'vim'], category: '工具' },
    { title: 'Regex101', url: 'https://regex101.com', desc: '在线正则表达式调试器，支持多引擎实时测试。', tags: ['正则', '调试'], category: '工具' },
    { title: 'JSON Formatter', url: 'https://jsonformatter.curiousconcept.com', desc: 'JSON 格式化、校验与树形查看。', tags: ['json', '格式化'], category: '工具' },
    { title: 'Carbon', url: 'https://carbon.now.sh', desc: '把代码片段生成漂亮的图片，方便分享。', tags: ['截图', '分享'], category: '工具' },
    { title: 'Diffchecker', url: 'https://www.diffchecker.com', desc: '文本差异对比工具，找改动很直观。', tags: ['对比', 'diff'], category: '工具' },

    { title: 'React', url: 'https://react.dev', desc: '用于构建用户界面的 JavaScript 库。', tags: ['前端', 'javascript', '框架'], category: '前端' },
    { title: 'Vue.js', url: 'https://cn.vuejs.org', desc: '渐进式 JavaScript 框架，中文文档完善。', tags: ['前端', 'javascript', '框架'], category: '前端' },
    { title: 'Vite', url: 'https://vite.dev', desc: '新一代前端构建工具，冷启动极快。', tags: ['构建', '工具'], category: '前端' },
    { title: 'webpack', url: 'https://webpack.js.org', desc: '成熟的模块打包器，生态与配置能力强大。', tags: ['构建', '打包'], category: '前端' },
    { title: 'Tailwind CSS', url: 'https://tailwindcss.com', desc: '原子化 CSS 框架，用类名拼出界面。', tags: ['css', '框架'], category: '前端' },
    { title: 'Vue Router', url: 'https://router.vuejs.org', desc: 'Vue 官方的路由管理库。', tags: ['路由', 'vue'], category: '前端' },

    { title: 'Figma', url: 'https://www.figma.com', desc: '浏览器里的协作设计工具，原型与界面设计一体。', tags: ['设计', '原型', 'ui'], category: '设计' },
    { title: 'Unsplash', url: 'https://unsplash.com', desc: '高质量免费图片库，可商用。', tags: ['图片', '素材'], category: '设计' },
    { title: 'Pexels', url: 'https://www.pexels.com', desc: '免费图片与视频素材，含大量摄影作品。', tags: ['图片', '视频', '素材'], category: '设计' },
    { title: 'Coolors', url: 'https://coolors.co', desc: '快速生成配色方案，支持对比度检查。', tags: ['配色', '色彩'], category: '设计' },
    { title: 'Google Fonts', url: 'https://fonts.google.com', desc: '开源字体库，中文需另配字体。', tags: ['字体', '设计'], category: '设计' },
    { title: 'Iconify', url: 'https://icon-sets.iconify.design', desc: '汇总上百套开源图标集，统一 API 调用。', tags: ['图标', '素材'], category: '设计' },

    { title: 'ChatGPT', url: 'https://chat.openai.com', desc: 'OpenAI 的对话式智能助手。', tags: ['ai', '对话', '助手'], category: 'AI' },
    { title: 'Claude', url: 'https://claude.ai', desc: 'Anthropic 出品的长文本对话助手。', tags: ['ai', '对话', '写作'], category: 'AI' },
    { title: 'Hugging Face', url: 'https://huggingface.co', desc: '开源模型与数据集社区，含大量推理示例。', tags: ['ai', '模型', '开源'], category: 'AI' },
    { title: 'Midjourney', url: 'https://www.midjourney.com', desc: '以文本生成高质量艺术图像的绘图工具。', tags: ['ai', '绘图', '设计'], category: 'AI' },
    { title: 'Papers with Code', url: 'https://paperswithcode.com', desc: '机器学习论文与配套实现代码索引。', tags: ['ai', '论文', '机器学习'], category: 'AI' },

    { title: 'DeepL 翻译', url: 'https://www.deepl.com/translator', desc: '德语出身的翻译引擎，中英欧语言质量高。', tags: ['翻译', '语言'], category: '翻译' },
    { title: 'Google 翻译', url: 'https://translate.google.com', desc: '支持语种最全的免费翻译工具。', tags: ['翻译', '语言'], category: '翻译' },
    { title: '有道词典', url: 'https://dict.youdao.com', desc: '中文查词、例句与生词本。', tags: ['翻译', '词典'], category: '翻译' },

    { title: 'YouTube', url: 'https://www.youtube.com', desc: '全球最大的视频平台，教程与演讲应有尽有。', tags: ['视频', '教程'], category: '影音' },
    { title: '哔哩哔哩', url: 'https://www.bilibili.com', desc: '中文视频社区，技术区内容扎实。', tags: ['视频', '社区'], category: '影音' },
    { title: 'Netflix', url: 'https://www.netflix.com', desc: '流媒体影视平台。', tags: ['影视', '流媒体'], category: '影音' },
    { title: 'Spotify', url: 'https://open.spotify.com', desc: '音乐流媒体平台与歌单社区。', tags: ['音乐', '流媒体'], category: '影音' },
    { title: 'IMDb', url: 'https://www.imdb.com', desc: '影视作品评分与演员资料库。', tags: ['影视', '评分'], category: '影音' },
    { title: 'Spotify Web Player', url: 'https://open.spotify.com/player', desc: '网页版音乐播放器，可后台播放。', tags: ['音乐', '播放器'], category: '影音' },

    { title: 'Notion', url: 'https://www.notion.so', desc: '块编辑器的知识库与项目管理工具。', tags: ['笔记', '协作'], category: '效率' },
    { title: 'Obsidian', url: 'https://obsidian.md', desc: '基于本地 Markdown 的双链笔记软件。', tags: ['笔记', 'markdown'], category: '效率' },
    { title: 'Todoist', url: 'https://todoist.com', desc: '简洁好用的待办事项管理工具。', tags: ['待办', '任务'], category: '效率' },
    { title: 'Trello', url: 'https://trello.com', desc: '看板式任务管理，拖拽卡片即可推进。', tags: ['看板', '项目管理'], category: '效率' },
    { title: 'Google 文档', url: 'https://docs.google.com', desc: '在线文档、表格与演示文稿套件。', tags: ['文档', '办公'], category: '效率' },
    { title: '语雀', url: 'https://www.yuque.com', desc: '中文团队的文档与知识库协作平台。', tags: ['文档', '知识库'], category: '效率' },
    { title: 'ProcessOn', url: 'https://www.processon.com', desc: '在线画图与思维导图工具。', tags: ['画图', '思维导图'], category: '效率' },

    { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', desc: '免费且系统的编程学习路径。', tags: ['学习', '编程'], category: '学习' },
    { title: 'Coursera', url: 'https://www.coursera.org', desc: '高校与公司的在线课程平台，可旁听许多免费课。', tags: ['课程', '学习'], category: '学习' },
    { title: 'Khan Academy', url: 'https://www.khanacademy.org', desc: '从数理到人文的免费课程平台。', tags: ['课程', '数学'], category: '学习' },
    { title: 'LeetCode', url: 'https://leetcode.cn', desc: '算法与数据结构练习，面试准备必备。', tags: ['算法', '刷题', '面试'], category: '学习' },
    { title: 'free-programming-books', url: 'https://github.com/EbookFoundation/free-programming-books', desc: '按语言分类的免费编程书籍索引。', tags: ['书籍', '编程'], category: '学习' }
  ];

  /* --------------------------------------------
   * 2. 配置与常量
   * ------------------------------------------ */

  var ENGINES = {
    local: { id: 'local', label: '本地数据' },
    google: { id: 'google', label: 'Google', url: 'https://www.google.com/search?q=' },
    bing: { id: 'bing', label: 'Bing', url: 'https://www.bing.com/search?q=' },
    duckduckgo: { id: 'duckduckgo', label: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    baidu: { id: 'baidu', label: '百度', url: 'https://www.baidu.com/s?wd=' }
  };

  var RECENT_KEY = 'simple-search:recent';
  var ENGINE_KEY = 'simple-search:engine';
  var RECENT_MAX = 8;

  /* --------------------------------------------
   * 3. DOM 引用
   * ------------------------------------------ */

  var tabsEl = document.getElementById('tabs');
  var formEl = document.getElementById('searchForm');
  var inputEl = document.getElementById('searchInput');
  var submitEl = document.getElementById('searchSubmit');
  var statusEl = document.getElementById('status');
  var resultsEl = document.getElementById('results');
  var emptyEl = document.getElementById('empty');
  var emptyBtn = document.getElementById('emptyBtn');
  var recentEl = document.getElementById('recent');
  var recentListEl = document.getElementById('recentList');

  var currentEngine = 'local';
  var currentResults = [];
  var activeIndex = -1;
  var debounceTimer = null;

  /* --------------------------------------------
   * 4. 工具函数
   * ------------------------------------------ */

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c];
    });
  }

  /** 转义后高亮命中的关键词 */
  function highlight(text, query) {
    var raw = String(text == null ? '' : text);
    var tokens = tokenize(query);
    if (!tokens.length) return escapeHtml(raw);

    var pattern = tokens
      .map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); })
      .join('|');

    var parts = raw.split(new RegExp('(' + pattern + ')', 'gi'));
    return parts
      .map(function (part, i) {
        return i % 2 === 1 ? '<mark>' + escapeHtml(part) + '</mark>' : escapeHtml(part);
      })
      .join('');
  }

  function tokenize(query) {
    return String(query || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function domainOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch (e) {
      return url;
    }
  }

  /* --------------------------------------------
   * 5. 搜索与排序
   * ------------------------------------------ */

  /** 计算条目与关键词的相关性得分，0 表示不匹配 */
  function scoreItem(item, tokens) {
    var title = item.title.toLowerCase();
    var desc = (item.desc || '').toLowerCase();
    var tags = (item.tags || []).join(' ').toLowerCase();
    var category = (item.category || '').toLowerCase();
    var total = 0;

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i].toLowerCase();
      if (!t) continue;

      if (title === t) total += 200;
      else if (title.indexOf(t) === 0) total += 120;
      else if (title.indexOf(t) !== -1) total += 100;

      if (tags.indexOf(t) !== -1) total += 60;
      if (category.indexOf(t) !== -1) total += 40;
      if (desc.indexOf(t) !== -1) total += 20;
    }
    return total;
  }

  function search(query) {
    var tokens = tokenize(query);
    if (!tokens.length) return DATA.slice();

    return DATA
      .map(function (item) {
        return { item: item, score: scoreItem(item, tokens) };
      })
      .filter(function (entry) { return entry.score > 0; })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.item.title.localeCompare(b.item.title, 'zh-Hans-CN');
      })
      .map(function (entry) { return entry.item; });
  }

  /* --------------------------------------------
   * 6. 渲染
   * ------------------------------------------ */

  function renderTabs() {
    tabsEl.innerHTML = Object.keys(ENGINES)
      .map(function (id) {
        var engine = ENGINES[id];
        var active = id === currentEngine;
        return (
          '<button class="tab' + (active ? ' is-active' : '') + '" type="button" ' +
          'role="tab" data-engine="' + id + '" aria-selected="' + (active ? 'true' : 'false') + '">' +
          escapeHtml(engine.label) +
          '</button>'
        );
      })
      .join('');
  }

  function renderResults(list, query) {
    currentResults = list;
    activeIndex = list.length ? 0 : -1;

    if (!list.length) {
      resultsEl.innerHTML = '';
      statusEl.textContent = '';
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    statusEl.textContent = query
      ? '共 ' + list.length + ' 条结果'
      : '共 ' + list.length + ' 条记录，输入关键词开始筛选';

    resultsEl.innerHTML = list
      .map(function (item, i) {
        var tags = (item.tags || [])
          .map(function (tag) {
            return '<li class="result__tag">' + highlight(tag, query) + '</li>';
          })
          .join('');

        return (
          '<li class="result' + (i === activeIndex ? ' is-active' : '') + '" data-index="' + i + '">' +
          '<div class="result__head">' +
          '<h3 class="result__title">' + highlight(item.title, query) + '</h3>' +
          '<span class="result__badge">' + escapeHtml(item.category || '') + '</span>' +
          '<span class="result__domain">' + escapeHtml(domainOf(item.url)) + '</span>' +
          '</div>' +
          '<p class="result__desc">' + highlight(item.desc, query) + '</p>' +
          (tags ? '<ul class="result__tags">' + tags + '</ul>' : '') +
          '</li>'
        );
      })
      .join('');
  }

  function renderRecent(list) {
    if (!list.length) {
      recentEl.hidden = true;
      return;
    }
    recentEl.hidden = false;
    recentListEl.innerHTML = list
      .map(function (word) {
        return '<button class="chip" type="button" data-word="' + escapeHtml(word) + '">' +
          escapeHtml(word) + '</button>';
      })
      .join('');
  }

  /* --------------------------------------------
   * 7. 交互
   * ------------------------------------------ */

  function setEngine(id) {
    if (!ENGINES[id]) return;
    currentEngine = id;
    try { localStorage.setItem(ENGINE_KEY, id); } catch (e) { /* 忽略隐私模式错误 */ }
    renderTabs();
    runSearch();
  }

  function runSearch() {
    var query = inputEl.value.trim();

    if (currentEngine !== 'local') {
      emptyEl.hidden = true;
      resultsEl.innerHTML = '';
      currentResults = [];
      activeIndex = -1;
      statusEl.textContent = query
        ? '按 Enter 用 ' + ENGINES[currentEngine].label + ' 搜索「' + query + '」'
        : '输入关键词后按 Enter 使用 ' + ENGINES[currentEngine].label + ' 搜索';
      return;
    }

    renderResults(search(query), query);
  }

  function submitExternalSearch() {
    var query = inputEl.value.trim();
    if (!query) {
      inputEl.focus();
      return;
    }
    var engine = ENGINES[currentEngine];
    if (!engine || !engine.url) return;
    window.open(engine.url + encodeURIComponent(query), '_blank', 'noopener');
  }

  function openActive() {
    if (currentEngine !== 'local') {
      submitExternalSearch();
      return;
    }
    var item = currentResults[activeIndex] || currentResults[0];
    if (!item) return;
    window.open(item.url, '_blank', 'noopener');
  }

  function saveRecent(word) {
    if (!word) return;
    try {
      var list = loadRecent().filter(function (w) { return w !== word; });
      list.unshift(word);
      list = list.slice(0, RECENT_MAX);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
      renderRecent(list);
    } catch (e) { /* 忽略存储错误 */ }
  }

  function loadRecent() {
    try {
      var raw = localStorage.getItem(RECENT_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function loadEngine() {
    try {
      var saved = localStorage.getItem(ENGINE_KEY);
      return ENGINES[saved] ? saved : 'local';
    } catch (e) {
      return 'local';
    }
  }

  function setActiveIndex(index) {
    var items = resultsEl.querySelectorAll('.result');
    if (!items.length) return;
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].classList.remove('is-active');
    }
    activeIndex = Math.max(0, Math.min(index, items.length - 1));
    var node = items[activeIndex];
    if (node) {
      node.classList.add('is-active');
      node.scrollIntoView({ block: 'nearest' });
    }
  }

  /* --------------------------------------------
   * 8. 事件绑定
   * ------------------------------------------ */

  tabsEl.addEventListener('click', function (event) {
    var tab = event.target.closest('.tab');
    if (!tab) return;
    setEngine(tab.getAttribute('data-engine'));
  });

  inputEl.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 150);
  });

  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    var query = inputEl.value.trim();
    if (!query) {
      inputEl.focus();
      return;
    }
    saveRecent(query);
    if (currentEngine === 'local') {
      renderResults(search(query), query);
      activeIndex = currentResults.length ? 0 : -1;
      var items = resultsEl.querySelectorAll('.result');
      if (items[0]) items[0].classList.add('is-active');
    } else {
      submitExternalSearch();
    }
  });

  resultsEl.addEventListener('click', function (event) {
    var li = event.target.closest('.result');
    if (!li) return;
    var index = parseInt(li.getAttribute('data-index'), 10);
    setActiveIndex(index);
    var item = currentResults[index];
    if (item) window.open(item.url, '_blank', 'noopener');
  });

  resultsEl.addEventListener('mousemove', function (event) {
    var li = event.target.closest('.result');
    if (!li) return;
    var index = parseInt(li.getAttribute('data-index'), 10);
    if (index !== activeIndex) setActiveIndex(index);
  });

  recentListEl.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip');
    if (!chip) return;
    inputEl.value = chip.getAttribute('data-word') || '';
    inputEl.focus();
    runSearch();
  });

  emptyBtn.addEventListener('click', function () {
    var query = inputEl.value.trim();
    window.open(
      ENGINES.google.url + encodeURIComponent(query || '好用的开发工具'),
      '_blank',
      'noopener'
    );
  });

  document.addEventListener('keydown', function (event) {
    var isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';

    if (isShortcut) {
      event.preventDefault();
      inputEl.focus();
      inputEl.select();
      return;
    }

    if (event.key === '/' && document.activeElement !== inputEl) {
      event.preventDefault();
      inputEl.focus();
      return;
    }

    if (event.key === 'Escape') {
      if (document.activeElement === inputEl) {
        inputEl.value = '';
        inputEl.blur();
        runSearch();
      }
      return;
    }

    if (currentEngine !== 'local' || !currentResults.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(activeIndex - 1);
    }
  });

  /* --------------------------------------------
   * 9. 启动
   * ------------------------------------------ */

  currentEngine = loadEngine();
  renderTabs();
  renderRecent(loadRecent());
  runSearch();
})();
