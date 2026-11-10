/* GTA MUSK — The Meme Edition (fan-made parody). No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // small stagger among siblings
        var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [];
        var i = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(i * 90, 360) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- HUD: money + wanted stars follow scroll progress ---------- */
  var money = document.getElementById('hudMoney');
  var stars = Array.prototype.slice.call(document.querySelectorAll('#hudStars span'));
  var sun = document.getElementById('sun');
  var MAX_MONEY = 44000000000; // the mission log's headline number
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var ticking = false;

  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var p = Math.min(1, Math.max(0, window.scrollY / max));
    if (money) money.textContent = fmt(p * MAX_MONEY);
    var lit = Math.round(p * stars.length);
    stars.forEach(function (s, i) { s.classList.toggle('on', i < lit); });
    if (sun && !reduceMotion) sun.style.setProperty('--sun-y', Math.min(window.scrollY * 0.18, 140) + 'px');
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  /* ---------- toast ---------- */
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toastMsg');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  /* ---------- copy / share ---------- */
  function pageUrl() {
    return location.protocol === 'file:' ? document.title : location.href.split('#')[0];
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    copyText(pageUrl()).then(function () { showToast('LINK COPIED'); },
                              function () { showToast('COPY FAILED'); });
  });

  // click-to-copy chip in the hero: copies whatever text is inside .chip__text
  var copyChip = document.getElementById('copyChip');
  var chipTimer;
  if (copyChip) copyChip.addEventListener('click', function () {
    var textEl = copyChip.querySelector('.chip__text');
    var text = textEl ? textEl.textContent.trim() : '';
    if (!text) return;
    copyText(text).then(function () {
      copyChip.classList.add('copied');
      clearTimeout(chipTimer);
      chipTimer = setTimeout(function () { copyChip.classList.remove('copied'); }, 1800);
      showToast('COPIED');
    }, function () { showToast('COPY FAILED'); });
  });

})();
