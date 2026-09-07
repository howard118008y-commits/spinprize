(function () {
  // nav: transparent on top, black after scroll, hide on scroll down / show on scroll up
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || 0;
    nav.classList.toggle('floating', y > 40);
    nav.classList.toggle('hide', y > lastY && y > 120 && !menu.classList.contains('open'));
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); nav.classList.remove('menu-open'); }
  });

  // hero slider
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var cur = 0, timer;
  var curEl = document.getElementById('cur');
  function go(n) {
    slides[cur].classList.remove('is-on');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('is-on');
    curEl.textContent = cur + 1;
  }
  function auto() { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6000); }
  document.getElementById('prev').addEventListener('click', function () { go(cur - 1); auto(); });
  document.getElementById('next').addEventListener('click', function () { go(cur + 1); auto(); });
  auto();

  // contact form → mailto
  var MAIL_TO = 'spinprize.digital@gmail.com';
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var v = function (n) { return (f.elements[n].value || '').trim(); };
    var subject = '【索取報價】' + v('shop');
    var body = '店名：' + v('shop') + '\n稱呼：' + v('name') + '\n電話或 LINE：' + v('tel') +
      '\n想了解的級距：' + v('tier') + '\n想解決的問題：' + v('msg') + '\n';
    window.location.href = 'mailto:' + MAIL_TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
