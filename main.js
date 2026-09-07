(function () {
  // nav: transparent over hero, sticky white after scrolling past 120px
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  function onScroll() { nav.classList.toggle('sticky', (window.scrollY || 0) > 120); }
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
