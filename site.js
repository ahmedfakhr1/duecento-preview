(function () {
  var body = document.body, burger = document.querySelector('.burger'), mnav = document.getElementById('mnav');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    body.classList.toggle('nav-open', open);
    mnav.hidden = !open;
  }
  if (burger && mnav) {
    burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  var g = document.querySelector('.js-greet');
  if (g) {
    var h = new Date().getHours();
    g.textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  }

  var jump = document.querySelector('.js-jump');
  if (jump) {
    var chips = [].slice.call(jump.querySelectorAll('.chip')), lock = 0;
    function mark(id) {
      chips.forEach(function (c) {
        var on = c.getAttribute('href') === '#' + id;
        c.classList.toggle('on', on);
        if (on) { c.setAttribute('aria-current', 'true'); c.scrollIntoView({ block: 'nearest', inline: 'center' }); } else c.removeAttribute('aria-current');
      });
    }
    jump.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      lock = Date.now() + 1200; mark(c.getAttribute('href').slice(1));
    });
    var secs = chips.map(function (c) { return document.querySelector(c.getAttribute('href')); }).filter(Boolean);
    var last = '';
    window.addEventListener('scroll', function () {
      if (Date.now() < lock) return;
      var cur = secs[0];
      secs.forEach(function (s) { if (s.getBoundingClientRect().top <= 170) cur = s; });
      if (cur && cur.id !== last) { last = cur.id; mark(cur.id); }
    }, { passive: true });
  }
})();
