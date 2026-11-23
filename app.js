(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  var LANGS = ['zh', 'ru', 'en'];
  var NEXT_LANG = { zh: ['en', 'EN'], en: ['ru', 'РУС'], ru: ['zh', '中文'] };
  var lang = params.get('lang') || localStorage.getItem('mc-lang') || 'zh';
  if (LANGS.indexOf(lang) < 0) lang = 'zh';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pick(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.zh || v.en || v.ru || '';
  }
  function t(v) { return esc(pick(v)); }
  function raw(v) { return pick(v); }
  function list(s) { return String(s || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean); }
  function visible(arr) { return (arr || []).filter(function (x) { return !x.hidden; }); }
  function color(c) { return ['lavender', 'lilac', 'pink', 'orchid', 'white'].indexOf(c) >= 0 ? c : 'lavender'; }
  function link(u) { return u ? esc(u) : '#'; }
  var ARROW = '<svg class="arrow" viewBox="0 0 30 12" aria-hidden="true"><path d="M0 6 H24 M18 1 L26 6 L18 11" fill="none" stroke="#2B2A57" stroke-width="2"/></svg>';

  function render(c) {
    var s = c.settings || {}, h = c.hero || {}, a = c.about || {}, m = c.method || {}, ct = c.contact || {};
    var steps = visible(c.steps);
    var lane = function (n) { return steps.filter(function (x) { return String(x.lane) === n; }); };
    var num = 0;
    var task = function (st) {
      num += 1;
      var chips = list(raw(st.tools)).map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('');
      return '<div class="task' + (num === 2 ? ' hot' : '') + '"><div class="task-num">0' + num + '</div><h3 class="hand">' + t(st.title) + '</h3><p>' + t(st.text) + '</p><div class="chips">' + chips + '</div></div>';
    };
    var laneHtml = function (items) { return items.map(task).join(ARROW); };
    var l1 = lane('1'), l2 = lane('2');
    var resume = lang === 'ru' ? (s.resume_ru || s.resume_en || s.resume_zh) : lang === 'en' ? (s.resume_en || s.resume_zh || s.resume_ru) : (s.resume_zh || s.resume_en || s.resume_ru);
    var brands = visible(c.brands).map(function (b) {
      return '<span class="brand">' + (b.logo ? '<img src="' + esc(b.logo) + '" alt="' + t(b.name) + '">' : t(b.name)) + (b.via ? ' <small>' + esc(b.via) + '</small>' : '') + '</span>';
    }).join('');
    var UI = {
      zh: { about: '关于我', how: '全链路能力', cases: '工作经历', wordsNav: '教育经历', resume: '简历', work: '查看经历', casesEy: '工作经历', casesT1: '从经理助理到海外仓主管', casesT2: '六年中俄全链路', brands: '工作过的公司', lab: '更多优势', labT: '语言、证书与海外经验', words: '教育经历', wordsT: '俄语口译，本硕一脉相承', talk: '联系方式', s1: '获取完整简历', s1b: '或邮件索取', s2: '给我发邮件', s2b: '我会尽快回复', s3: 'GitHub', s3b: '我的开源项目', photo: '徐小娟的照片' },
      en: { about: 'About me', how: 'End-to-end', cases: 'Experience', wordsNav: 'Education', resume: 'Resume', work: 'See my experience', casesEy: 'EXPERIENCE', casesT1: 'From assistant manager to overseas warehouse supervisor —', casesT2: 'six years, China to Russia', brands: 'COMPANIES I’VE WORKED WITH', lab: 'MORE', labT: 'Languages, certificates and overseas experience', words: 'EDUCATION', wordsT: 'Russian interpretation, bachelor through master', talk: 'LET’S TALK', s1: 'Get my full resume', s1b: 'or ask by email', s2: 'Email me', s2b: 'I reply quickly', s3: 'GitHub', s3b: 'My open-source projects', photo: 'Photo of Xu Xiaojuan' },
      ru: { about: 'О себе', how: 'Компетенции', cases: 'Опыт', wordsNav: 'Образование', resume: 'Резюме', work: 'Смотреть опыт', casesEy: 'ОПЫТ РАБОТЫ', casesT1: 'От ассистента до руководителя зарубежного склада —', casesT2: 'шесть лет, Китай — Россия', brands: 'КОМПАНИИ, ГДЕ Я РАБОТАЛА', lab: 'ЕЩЁ', labT: 'Языки, сертификаты и опыт за рубежом', words: 'ОБРАЗОВАНИЕ', wordsT: 'Устный перевод: бакалавриат и магистратура', talk: 'НАПИШИТЕ МНЕ', s1: 'Полное резюме', s1b: 'или по запросу', s2: 'Напишите мне', s2b: 'Отвечаю быстро', s3: 'GitHub', s3b: 'Мои проекты', photo: 'Фото Сюй Сяоцзюань' }
    };
    var ui = UI[lang];
    var TITLES = { zh: '徐小娟 · 中俄国际物流 / 俄语人才', ru: 'Сюй Сяоцзюань · Логистика Китай–Россия', en: 'Xu Xiaojuan · China–Russia Logistics' };
    document.title = TITLES[lang];

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    return '' +
    '<header class="topbar pad"><a class="logo name-font" style="font-size:24px" href="#top">' + t(s.name) + '</a>' +
      '<button class="menu-btn" type="button" id="menu" aria-expanded="false" aria-controls="mainnav" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="mainnav" aria-label="Main">' +
      '<a href="#about">' + ui.about + '</a><a href="#method">' + ui.how + '</a><a href="#work">' + ui.cases + '</a><a href="#words">' + ui.wordsNav + '</a>' +
      (s.github ? '<a href="' + link(s.github) + '">GitHub</a>' : '') +
      '<button class="lang" type="button" id="lang" aria-label="Language / Язык / 语言">' + NEXT_LANG[lang][1] + '</button>' +
      '<a class="btn btn-ink" style="padding:10px 22px" href="' + link(resume) + '">' + ui.resume + '</a></nav></header>' +

    '<section id="top" class="hero pad"><div class="hero-text">' +
      '<p class="eyebrow">' + t(h.eyebrow) + '</p><p class="hero-name">' + t(s.name) + '</p>' +
      '<span class="pill bg-lavender" style="font-weight:500;font-size:15px">' + t(h.pill) + '</span>' +
      '<h1>' + t(h.title_a) + '<br><span class="violet">+</span> <span class="orchid">' + t(h.title_b) + '</span></h1>' +
      '<p class="hero-promise">' + t(h.promise) + '</p>' +
      '<div class="hero-actions"><a class="btn btn-ink" href="#work">' + ui.work + '</a>' +
        (s.github ? '<a class="btn bg-lavender" href="' + link(s.github) + '">GitHub ↗</a>' : '') +
        (s.linkedin ? '<a class="btn bg-pink" href="' + link(s.linkedin) + '">LinkedIn ↗</a>' : '') + '</div></div>' +
      '<div class="hero-photo"><div class="frame"><img class="frame-img" src="assets/frame-lilac.webp" alt="">' +
        (h.photo ? '<img class="frame-photo" src="' + esc(h.photo) + '" alt="' + ui.photo + '">' : '') + '</div>' +
        (t(h.sticker) ? '<span class="sticker">' + t(h.sticker) + '</span>' : '') + '</div></section>' +

    '<section class="pad" aria-label="Key numbers" style="padding-bottom:0"><div class="grid grid-3">' +
      visible(c.stats).map(function (x) { return '<div class="card bg-' + color(x.color) + '"><div class="stat-value">' + t(x.value) + '</div><div class="stat-label">' + t(x.label) + '</div></div>'; }).join('') +
    '</div></section>' +

    '<section id="about" class="about pad"><div class="about-photo">' + (a.photo ? '<img src="' + esc(a.photo) + '" alt="' + ui.photo + '">' : '') + '</div>' +
      '<div class="about-text"><p class="eyebrow">' + t(a.eyebrow) + '</p><h2 class="h2">' + t(a.title_a) + ' <span class="orchid">' + t(a.title_b) + '</span></h2>' +
      '<p>' + t(a.p1) + '</p><p>' + t(a.p2) + '</p><div class="pills">' +
      (a.pills || []).map(function (p, i) { return '<span class="pill bg-' + ['lavender', 'lilac', 'pink'][i % 3] + '">' + t(p) + '</span>'; }).join('') +
    '</div></div></section>' +

    '<section id="method" class="method pad bg-white"><div class="method-head"><div><p class="eyebrow">' + t(m.eyebrow) + '</p>' +
      '<h2 class="h2">' + t(m.title_a) + ' <span class="violet">+</span> <span class="orchid">' + t(m.title_b) + '</span></h2><p class="method-intro">' + t(m.intro) + '</p></div>' +
      (m.image ? '<img src="' + esc(m.image) + '" alt="">' : '') + '</div>' +
      '<div class="pool" style="--n:' + Math.max(l1.length, l2.length, 1) + '" role="img" aria-label="' + t(m.lane1) + ' / ' + t(m.lane2) + '">' +
        '<div class="lane lane-1"><div class="lane-label"><span>' + t(m.lane1) + '</span></div><div class="lane-body"><span class="event" aria-hidden="true"></span>' + ARROW + laneHtml(l1) + '</div></div>' +
        '<div class="lane lane-2"><div class="lane-label"><span>' + t(m.lane2) + '</span></div><div class="lane-body"><span class="marker">' + t(m.marker) + '</span><span class="ph"></span><span class="ph"></span>' + laneHtml(l2) + ARROW + '<span class="event end" aria-hidden="true"></span></div></div>' +
      '</div></section>' +

    '<section id="work" class="cases pad"><p class="eyebrow">' + ui.casesEy + '</p><h2 class="h2" style="margin-bottom:40px">' + ui.casesT1 + ' <span class="orchid">' + ui.casesT2 + '</span></h2><div class="grid grid-3">' +
      visible(c.cases).map(function (k) {
        return '<article class="case bg-white"><div class="case-img bg-' + color(k.color) + '">' + (k.image ? '<img src="' + esc(k.image) + '" alt="">' : '[image]') + '</div>' +
          '<div class="case-body"><span class="case-label">' + t(k.label) + '</span><h3>' + t(k.title) + '</h3><p>' + t(k.summary) + '</p>' +
          '<div class="chips">' + list(raw(k.metrics)).map(function (x) { return '<span class="chip">' + esc(x) + '</span>'; }).join('') + '</div>' +
          '<a class="btn btn-ink" href="' + link(k.link) + '">' + t(k.button) + '</a></div></article>';
      }).join('') + '</div></section>' +

    '<section class="brands" aria-label="Companies"><p class="eyebrow" style="text-align:center;margin-bottom:20px">' + ui.brands + '</p>' +
      '<div class="marquee"><div class="marquee-track">' + brands + '<span aria-hidden="true" style="display:contents">' + brands + '</span></div></div>' +
      '<div class="certs">' + visible(c.certs).map(function (x) { return '<a href="' + link(x.link) + '" title="' + t(x.name) + '">' + (x.image ? '<img src="' + esc(x.image) + '" alt="">' : '') + '<span>' + t(x.name) + '</span></a>'; }).join('') + '</div></section>' +

    '<section id="lab" class="lab pad"><div><p class="eyebrow">' + ui.lab + '</p><h2 class="h2" style="font-size:36px">' + ui.labT + '</h2></div><div class="lab-grid">' +
      visible(c.lab).map(function (x) { return '<a class="lab-item bg-' + color(x.color) + '" href="' + link(x.link) + '"><strong>' + t(x.title) + '</strong><br><span style="font-size:14px">' + t(x.text) + '</span></a>'; }).join('') +
    '</div></section>' +

    '<section id="words" class="words pad bg-white"><p class="eyebrow">' + ui.words + '</p><h2 class="h2" style="margin-bottom:32px">' + ui.wordsT + '</h2><div class="grid grid-3">' +
      visible(c.testimonials).map(function (x) { return '<figure class="quote"><blockquote>“' + t(x.quote) + '”</blockquote><figcaption>' + (x.photo ? '<img src="' + esc(x.photo) + '" alt="">' : '') + '<span><strong>' + t(x.name) + '</strong><br><span class="violet">' + t(x.role) + '</span></span></figcaption></figure>'; }).join('') +
    '</div></section>' +

    '<section id="contact" class="contact pad"><h2 class="h2">' + t(ct.title_a) + ' <span class="orchid">' + t(ct.title_b) + '</span></h2><p class="eyebrow" style="margin:0 0 32px">' + ui.talk + '</p>' +
      '<div class="steps-cta">' +
        '<a class="step-cta bg-lavender" href="' + link(resume) + '"><span class="step-num">1</span><span><strong>' + ui.s1 + '</strong><br><span style="font-size:14px">' + ui.s1b + '</span></span></a>' +
        '<a class="step-cta bg-orchid" href="mailto:' + esc(s.email) + '"><span class="step-num">2</span><span><strong>' + ui.s2 + '</strong><br><span style="font-size:14px">' + esc(s.email) + '</span></span></a>' +
        (s.github ? '<a class="step-cta bg-pink" href="' + link(s.github) + '"><span class="step-num">3</span><span><strong>' + ui.s3 + '</strong><br><span style="font-size:14px">' + ui.s3b + '</span></span></a>' : '') +
      '</div><p class="facts">' + t(ct.facts) + '</p></section>' +

    '<footer class="footer pad"><span class="name-font" style="font-size:20px">' + t(s.name) + '</span><span class="links">' +
      (s.email ? '<a href="mailto:' + esc(s.email) + '">' + esc(s.email) + '</a>' : '') +
      (s.linkedin ? '<a href="' + link(s.linkedin) + '">LinkedIn</a>' : '') +
      (s.tiktok ? '<a href="' + link(s.tiktok) + '">TikTok</a>' : '') +
      (s.github ? '<a href="' + link(s.github) + '">GitHub</a>' : '') +
    '</span><span>© ' + new Date().getFullYear() + '</span></footer>';
  }

  // Numbers in the stat cards count up from 0 the first time they scroll into view.
  function countUp(root) {
    var els = root.querySelectorAll('.stat-value');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    var run = function (el) {
      var raw = el.textContent, m = raw.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
      if (!m) return;
      var end = parseFloat(m[2].replace(',', '.')), dec = (m[2].split(/[.,]/)[1] || '').length, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = m[1] + (end * e).toFixed(dec) + m[3];
        if (p < 1) requestAnimationFrame(step); else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); run(en.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { el.style.fontVariantNumeric = 'tabular-nums'; io.observe(el); });
  }

  function mount(content) {
    var app = document.getElementById('app');
    app.innerHTML = render(content);
    var btn = document.getElementById('lang');
    if (btn) btn.addEventListener('click', function () {
      lang = NEXT_LANG[lang][0];
      try { localStorage.setItem('mc-lang', lang); } catch (e) {}
      mount(content);
    });
    countUp(app);
    var menu = document.getElementById('menu'), bar = app.querySelector('.topbar');
    if (menu && bar) {
      menu.addEventListener('click', function () {
        var open = bar.classList.toggle('open');
        menu.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      bar.querySelectorAll('.nav a').forEach(function (a) {
        a.addEventListener('click', function () { bar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); });
      });
    }
  }

  // The admin panel sends unsaved drafts here for live preview.
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.type !== 'mc-preview' || !e.data.content) return;
    if (e.data.lang) lang = e.data.lang;
    mount(e.data.content);
  });

  fetch('content.json?v=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.json(); })
    .then(mount)
    .catch(function () { document.getElementById('app').innerHTML = '<p class="pad" style="padding:48px">Could not load content.json</p>'; });
})();
