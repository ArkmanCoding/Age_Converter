const chekBtn = document.getElementById('checkBtn');
const result = document.getElementById('result');
const age_input = document.getElementById('ageInput');

chekBtn.addEventListener('click', function () {
    const age = age_input.value;
    if (age == 0 || age <=0) {
        result.innerHTML = `<h2>
         <span style = 'color : green;'>${age}</span> واقعا ؟ 
         <span style= 'color:gery; font-size: 20px;'>با این حال ، برو وقتی به دنیا اومدی بیا ^_-</span> 
         </h2>`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    }else if (age > 0 && age <= 13) {
        result.innerHTML = `شما <h3>${age}</h3> ساله هستید ، پس کودک هستید`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    }
    else if (age > 13 && age <= 19) {
        result.innerHTML = `شما <h3>${age}</h3> ساله هستید ، پس نوجوان هستید`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    }
    else if (age > 19 && age <= 30) {
        result.innerHTML = `شما <h3>${age}</h3> ساله هستید ، پس جوان هستید`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    }
    else if (age > 30 && age <= 60) {
        result.innerHTML = `شما <h3>${age}</h3> ساله هستید ، پس بزگسال هستید`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    } else {
        result.innerHTML = `<h2 style = 'color : red ;' > سن ${age} چخبره ! مگه سن نوح رو داری :)</h2>`;
        result.classList.remove('is-hidden');
        result.classList.add('show-anim');
    }
})


/**
 * Age Tool — تعاملات
 * مودال سازنده + میان‌بُرهای کیبورد
 *
 * این فایل کاملاً مستقل از script.js است.
 * منطق محاسبه سن هیچ تغییری نمی‌کند.
 * فقط دکمه‌ی تحلیل را کلیک می‌کند و مودال را باز/بسته می‌کند.
 */
(function () {
  'use strict';

  /* ── عناصر ─────────────────────────────────────────────────── */

  var modal = document.getElementById('creator-modal');
  if (!modal) return;

  var trigger  = document.querySelector('.app-brand');
  var closeBtn = modal.querySelector('.modal-close');
  var backdrop = modal.querySelector('.modal-backdrop');
  var cta      = modal.querySelector('.modal-cta');

  var ageInput = document.getElementById('ageInput');
  var checkBtn = document.getElementById('checkBtn');

  var lastFocused = null;


  /* ── وضعیت ─────────────────────────────────────────────────── */

  function isOpen() {
    return modal.classList.contains('is-open') ||
           location.hash === '#creator-modal';
  }


  /* ── باز کردن ──────────────────────────────────────────────── */

  function openModal() {
    lastFocused = document.activeElement;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // جلوگیری از اسکرول پس‌زمینه
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // فوکوس روی دکمه بستن (اولین عنصر قابل فوکوس)
    if (closeBtn) closeBtn.focus();
  }


  /* ── بستن ──────────────────────────────────────────────────── */

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    // آزاد کردن اسکرول
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // اگر مودال با هش (:target) باز شده بود، هش را پاک کن
    if (location.hash === '#creator-modal') {
      history.replaceState(
        null,
        '',
        location.pathname + location.search
      );
    }

    // برگرداندن فوکوس به عنصر قبلی
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  }


  /* ── اتصال تریگر ───────────────────────────────────────────── */

  if (trigger) {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'creator-modal');

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  }


  /* ── اتصال بستن‌ها ─────────────────────────────────────────── */

  [closeBtn, backdrop, cta].forEach(function (el) {
    if (!el) return;
    el.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });


  /* ── میان‌بُرهای کیبورد ─────────────────────────────────────── */

  document.addEventListener('keydown', function (e) {

    // Esc → بستن مودال
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault();
      closeModal();
      return;
    }

    // Enter در فیلد سن → کلیک روی دکمه تحلیل
    if (
      e.key === 'Enter' &&
      document.activeElement === ageInput &&
      checkBtn &&
      !isOpen()
    ) {
      e.preventDefault();
      checkBtn.click();
    }
  });


  /* ── تله فوکوس داخل مودال ──────────────────────────────────── */

  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;

    var focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    var first = focusables[0];
    var last  = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });


  /* ── وضعیت اولیه ───────────────────────────────────────────── */

  // اگر صفحه با هش #creator-modal لود شده، وضعیت aria را اصلاح کن
  if (location.hash === '#creator-modal') {
    modal.setAttribute('aria-hidden', 'false');
  } else {
    modal.setAttribute('aria-hidden', 'true');
  }

})();