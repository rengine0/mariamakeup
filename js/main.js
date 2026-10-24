(function () {
  'use strict';

  /* ---------- Contato: edite aqui se o número mudar ---------- */
  var PHONE = '5534999431701';            // só números, com 55 e DDD
  var PHONE_DISPLAY = '+55 (34) 99943-1701';

  /* ---------- WhatsApp com mensagem pronta ---------- */
  function message(service) {
    return 'Olá, Maria! Vi seu site e quero agendar uma ' + (service || 'maquiagem') +
      '. Quais horários você tem disponíveis?';
  }
  function link(service) {
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message(service));
  }

  document.querySelectorAll('a[data-service]').forEach(function (a) {
    a.href = link(a.getAttribute('data-service'));
  });

  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var bubble = document.getElementById('msg');
  var send = document.getElementById('wa-send');

  function choose(service) {
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', String(c.getAttribute('data-chip') === service));
    });
    bubble.textContent = message(service);
    send.href = link(service);
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var on = chip.getAttribute('aria-pressed') === 'true';
      choose(on ? '' : chip.getAttribute('data-chip'));
    });
  });

  /* ---------- Copiar número ---------- */
  var copy = document.getElementById('copy');
  var phone = document.getElementById('phone');
  function flash(text) {
    copy.textContent = text;
    setTimeout(function () { copy.textContent = 'Copiar'; }, 1800);
  }
  function selectPhone() {
    try {
      var r = document.createRange();
      r.selectNodeContents(phone);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    } catch (e) { /* sem seleção */ }
    flash('Selecionado');
  }
  copy.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PHONE_DISPLAY).then(function () { flash('Copiado'); }, selectPhone);
    } else {
      selectPhone();
    }
  });

  /* ---------- Revelar seções ao rolar (uma única vez) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Modo claro/escuro ---------- */
  var themeBtn = document.getElementById('theme');
  var metaTheme = document.querySelectorAll('meta[name="theme-color"]');
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.setAttribute('aria-pressed', String(t === 'dark'));
    metaTheme.forEach(function (m, i) { if (i) m.remove(); else { m.removeAttribute('media'); m.content = t === 'dark' ? '#14070F' : '#FFF1F8'; } });
  }
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  themeBtn.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* sem armazenamento */ }
  });

  /* ---------- Mapa só carrega após o clique (LGPD) ---------- */
  var mapBox = document.getElementById('map');
  var mapBtn = document.getElementById('map-load');
  if (mapBox && mapBtn) {
    mapBtn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.className = 'map-embed';
      f.title = 'Mapa do ateliê no Google Maps';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      f.src = mapBox.getAttribute('data-src');
      mapBox.replaceWith(f);
    });
  }
})();
