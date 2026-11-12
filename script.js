/* Vo Minh Tri · Portfolio. Plain JS, no dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  /* ---------------------------------------------------------
     i18n: English lives in the HTML (good for SEO and no-JS).
     Vietnamese strings below; English originals are captured
     from the DOM on load so switching back is lossless.
     --------------------------------------------------------- */
  var VI = {
    'skip': 'Bỏ qua để đến nội dung',
    'menu': 'Menu',
    'newtab': '(mở trong tab mới)',
    'nav.about': 'Giới thiệu',
    'nav.impact': 'Thành tích',
    'nav.experience': 'Kinh nghiệm',
    'nav.projects': 'Dự án',
    'nav.skills': 'Kỹ năng',
    'nav.contact': 'Liên hệ',

    'hero.status': 'Đang tìm cơ hội Senior Data Engineer',
    'hero.pitch': 'Data Engineer với hơn 4 năm kinh nghiệm Python &amp; SQL, xây dựng pipeline ETL trên cloud, batch job và dịch vụ dữ liệu trên GCP cho khách hàng Nhật Bản.',
    'hero.location': 'Đà Nẵng, Việt Nam',
    'cta.email': 'Gửi email',
    'cta.cv': 'Tải CV',

    'about.title': 'Pipeline nhanh, có test và dễ giám sát',
    'about.p1': 'Tôi là Data Engineer tại <strong>DAC Data Technology Vietnam</strong> ở Đà Nẵng, với hơn 4 năm làm việc thực tế với Python và SQL. Tôi xây dựng pipeline ETL, batch job và dịch vụ dữ liệu trên Google Cloud, đưa dữ liệu từ các nguồn như Box và Cloud Storage qua Cloud Run và Vertex AI (Gemini) vào BigQuery và Cloud SQL.',
    'about.p2': 'Từ tháng 8/2025, tôi là Data Engineer trong team offshore phục vụ một công ty quảng cáo Nhật Bản, phụ trách thêm thiết kế kỹ thuật, ước lượng công việc, review code và merge release. Trước đó, tôi có ba năm làm backend engineer với các dịch vụ Python/Flask. Tôi thích tối ưu hiệu năng, viết test tự động chắc chắn và giữ cho CI luôn nhanh khi codebase lớn dần.',
    'about.factsLabel': 'Thông tin nhanh',
    'facts.role': 'Vị trí',
    'facts.base': 'Nơi ở',
    'facts.focus': 'Chuyên môn',
    'facts.focusVal': 'Pipeline &amp; dịch vụ dữ liệu trên GCP',
    'facts.langs': 'Ngoại ngữ',
    'facts.langsVal': 'Tiếng Anh, tiếng Nhật (N5)',

    'impact.title': '12 tháng gần nhất qua những con số',
    'impact.batchLabel': 'Thời gian chạy batch',
    'impact.faster': 'nhanh hơn',
    'impact.batchDesc': 'Rút ngắn một bước batch trên production từ ~90 phút xuống ~11 phút.',
    'impact.ciLabel': 'CI pipeline',
    'impact.ciDesc': 'CI cho bộ <strong>17,000+</strong> test, tăng tốc nhờ chia shard chạy song song.',
    'impact.prs': 'pull request đã merge',
    'impact.commits': 'commit',
    'impact.repos': 'repository đang chạy production',
    'impact.tests': 'unit test cho ETL BigQuery → Gemini → BigQuery',

    'exp.title': 'Kinh nghiệm làm việc',
    'exp.present': 'Hiện tại',
    'exp.j1.sub': 'Team offshore cho một công ty quảng cáo Nhật Bản',
    'exp.j1.b1': 'Công việc bao gồm thiết kế kỹ thuật, ước lượng công việc, review code và merge release.',
    'exp.j1.b2': 'Xây dựng pipeline ETL, batch job và dịch vụ dữ liệu trên GCP: Cloud Run, Cloud Tasks, BigQuery, Cloud SQL, Vertex AI.',
    'exp.j1.b3': 'Rút ngắn một bước batch từ ~90 xuống ~11 phút và CI cho 17,000+ test từ hơn 25 xuống ~8 phút.',
    'exp.j2.b1': 'Refactor tầng truy cập cơ sở dữ liệu bằng SQLAlchemy để cải thiện hiệu năng.',
    'exp.j2.b2': 'Viết unit test bằng pytest và tích hợp Microsoft SSO.',
    'exp.j2.b3': 'Phát triển microservice cho hệ thống phân tích dữ liệu và thu thập dữ liệu (scraping).',
    'exp.j2.b4': 'Xây dựng ETL workflow trên BigQuery, Cloud Storage và Cloud Functions.',

    'proj.title': 'Dự án tiêu biểu',
    'proj.note': 'Đây là dự án cho khách hàng nên tên khách hàng được ẩn và mã nguồn không công khai.',
    'p1.title': 'Nền tảng workflow vận hành quảng cáo ứng dụng AI',
    'p1.client': 'Công ty quảng cáo Nhật Bản · cho một thương hiệu ô tô lớn',
    'p1.desc': 'Orchestrator với pipeline nhiều luồng. Các tác vụ chạy lâu được xử lý trên Cloud Run và Cloud Tasks với run lock. File được nạp từ Box và GCS vào Cloud SQL, lỗi được cảnh báo qua Microsoft Teams và CI chạy song song theo shard.',
    'p2.title': 'ETL đối soát log quảng cáo TV',
    'p2.desc': 'Batch ETL dùng Gemini trên Vertex AI để đối soát log quảng cáo truyền hình. Chạy dưới dạng Cloud Run Job, có Cloud Logging, unit test và integration test.',
    'p3.title': 'Material Database Tool',
    'p3.desc': 'Tạo file upload cho hơn <strong>30</strong> định dạng nền tảng quảng cáo, kèm validator, API gateway dùng API key, đo lường quota API và caching.',
    'p4.title': 'Business planning studio, FY27–FY30',
    'p4.desc': 'Xây dựng từ đầu: engine Flask + Node, golden test đạt 100% coverage phần lõi, quy trình phê duyệt, audit log và giải thích bằng AI.',
    'p5.title': 'Công cụ AI agent',
    'p5.desc': 'MCP server cho Box và Backlog, cùng các Claude Code skill hỗ trợ team ước lượng công việc và review code.',

    'skills.title': 'Công cụ tôi dùng hằng ngày',
    'skills.lang': 'Ngôn ngữ &amp; dữ liệu',
    'skills.devops': 'DevOps &amp; chất lượng',
    'skills.integrations': 'Tích hợp &amp; AI',

    'edu.eyebrow': 'Học vấn',
    'edu.title': 'Học vấn &amp; chứng chỉ',
    'edu.school': 'Trường Đại học Bách khoa, Đại học Đà Nẵng',
    'edu.major': 'Công nghệ Thông tin, chuyên ngành Mạng thông tin',
    'edu.certs': 'Chứng chỉ',
    'cert.pcap': 'Lập trình Python cấp Associate',
    'cert.pcep': 'Lập trình Python cấp Entry',
    'cert.jlpt': 'Tiếng Nhật',

    'contact.title': 'Cùng trao đổi về nền tảng dữ liệu của bạn',
    'contact.lead': 'Tôi quan tâm đến các vị trí Senior Data Engineer. Cách nhanh nhất để liên hệ với tôi là qua email hoặc LinkedIn.',
    'contact.copy': 'Sao chép email',
    'footer.built': 'Tự viết bằng HTML, CSS &amp; JS, không dùng framework.',
    'footer.top': 'Lên đầu trang ↑'
  };

  var UI = {
    en: {
      title: document.title,
      desc: (document.querySelector('meta[name="description"]') || {}).content,
      langAria: 'Chuyển sang tiếng Việt',
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      copied: 'Copied!',
      copiedSr: 'Email address copied to clipboard'
    },
    vi: {
      title: 'Võ Minh Trí · Data Engineer (Python, SQL, GCP) · Đà Nẵng',
      desc: 'Võ Minh Trí là Data Engineer tại Đà Nẵng với hơn 4 năm kinh nghiệm Python và SQL, xây dựng pipeline ETL, batch job và dịch vụ dữ liệu trên GCP cho khách hàng Nhật Bản.',
      langAria: 'Switch to English',
      toLight: 'Chuyển sang giao diện sáng',
      toDark: 'Chuyển sang giao diện tối',
      menuOpen: 'Mở menu',
      menuClose: 'Đóng menu',
      copied: 'Đã sao chép!',
      copiedSr: 'Đã sao chép địa chỉ email'
    }
  };

  var i18nNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  i18nNodes.forEach(function (el) { el.setAttribute('data-en', el.innerHTML); });
  var attrNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-attr]'));
  attrNodes.forEach(function (el) {
    var parts = el.getAttribute('data-i18n-attr').split(':');
    el.setAttribute('data-en-attr', el.getAttribute(parts[0]) || '');
  });

  var currentLang = 'en';

  function t(key) { return UI[currentLang][key]; }

  function applyLang(lang) {
    currentLang = lang === 'vi' ? 'vi' : 'en';
    root.setAttribute('lang', currentLang);

    i18nNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = currentLang === 'vi' && VI[key] ? VI[key] : el.getAttribute('data-en');
    });
    attrNodes.forEach(function (el) {
      var parts = el.getAttribute('data-i18n-attr').split(':');
      var key = parts[1];
      if (key === 'lang.aria' || key.indexOf('theme.') === 0) return; // stateful, handled below
      el.setAttribute(parts[0], currentLang === 'vi' && VI[key] ? VI[key] : el.getAttribute('data-en-attr'));
    });

    document.title = t('title');
    var md = document.querySelector('meta[name="description"]');
    if (md && t('desc')) md.setAttribute('content', t('desc'));

    var lt = document.querySelector('.lang-toggle');
    if (lt) lt.setAttribute('aria-label', t('langAria'));
    updateThemeLabel();
    updateMenuLabel();
  }

  /* ---------------- Theme ---------------- */
  var themeBtn = document.querySelector('.theme-toggle');
  function updateThemeLabel() {
    if (!themeBtn) return;
    var dark = root.getAttribute('data-theme') !== 'light';
    themeBtn.setAttribute('aria-label', dark ? t('toLight') : t('toDark'));
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      store('theme', next);
      updateThemeLabel();
    });
  }

  /* ---------------- Language toggle ---------------- */
  var langBtn = document.querySelector('.lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = currentLang === 'en' ? 'vi' : 'en';
      applyLang(next);
      store('lang', next);
      try {
        var url = new URL(location.href);
        if (next === 'vi') url.searchParams.set('lang', 'vi'); else url.searchParams.delete('lang');
        history.replaceState(null, '', url);
      } catch (e) {}
    });
  }

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-links');
  function updateMenuLabel() {
    if (!menuBtn) return;
    var open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.querySelector('.sr-only').textContent = open ? t('menuClose') : t('menuOpen');
  }
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    updateMenuLabel();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
    });
  }

  /* ---------------- Header border on scroll ---------------- */
  var header = document.querySelector('.site-header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Count-up ---------------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-to'), 10);
    if (isNaN(to)) return;
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    if (reduceMotion) { el.textContent = fmt(to); return; }
    var dur = 1100, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  /* ---------------- Reveal on scroll + active nav ---------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.count').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var navLinks = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------------- Copy email ---------------- */
  var copyBtn = document.querySelector('.copy-btn');
  var copyStatus = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      var label = copyBtn.querySelector('.copy-label');
      var done = function () {
        var prev = label.innerHTML;
        label.textContent = t('copied');
        if (copyStatus) copyStatus.textContent = t('copiedSr');
        setTimeout(function () { label.innerHTML = prev; if (copyStatus) copyStatus.textContent = ''; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { location.href = 'mailto:' + text; });
      } else {
        location.href = 'mailto:' + text;
      }
    });
  }

  /* ---------------- Profile photo fallback ---------------- */
  var avatar = document.querySelector('.avatar');
  var avatarImg = avatar && avatar.querySelector('img');
  if (avatarImg) {
    var hasPhoto = function () { if (avatarImg.naturalWidth > 0) avatar.classList.add('has-photo'); };
    if (avatarImg.complete) hasPhoto();
    avatarImg.addEventListener('load', hasPhoto);
  }

  /* ---------------- Footer year ---------------- */
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  /* ---------------- Init ---------------- */
  applyLang(root.getAttribute('lang') === 'vi' ? 'vi' : 'en');
})();
