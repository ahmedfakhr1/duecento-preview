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
    var last = '', bar = jump.querySelector('.chin'), chips = [].slice.call(jump.querySelectorAll('.chip')), lock = 0;
    function mark(id) {
      chips.forEach(function (c) {
        var on = c.getAttribute('href') === '#' + id;
        c.classList.toggle('on', on);
        if (on) last = id;
        if (on) { c.setAttribute('aria-current', 'true'); bar.scrollLeft = c.offsetLeft - (bar.clientWidth - c.offsetWidth) / 2; } else c.removeAttribute('aria-current');
      });
    }
    jump.addEventListener('click', function (e) {
      var c = e.target.closest('.chip'); if (!c) return;
      var id = c.getAttribute('href').slice(1), t = document.getElementById(id); if (!t) return;
      e.preventDefault();
      var off = parseFloat(getComputedStyle(jump).top) + jump.offsetHeight + 12;
      lock = 1; mark(id);
      window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - off, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
    
    var secs = chips.map(function (c) { return document.querySelector(c.getAttribute('href')); }).filter(Boolean);
    // after a chip tap the highlight stays put until the visitor scrolls by hand
    function release() { lock = 0; }
    ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, release, { passive: true }); });
    window.addEventListener('scroll', function () {
      if (lock) return;
      var cur = secs[0];
      secs.forEach(function (s) { if (s.getBoundingClientRect().top <= 170) cur = s; });
      if (cur && cur.id !== last) { last = cur.id; mark(cur.id); }
    }, { passive: true });
  }
})();
