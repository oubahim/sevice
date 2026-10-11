/* ═══════════════════════════════════════════════════════
   app.js — Portfolio "Code Editor ↔ Live Browser"
   mouad web, 2026
═══════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────
   1. CODE TYPING ANIMATION — Hero Section
───────────────────────────────────────────────────── */

/**
 * The HTML snippet that gets "typed" in the editor.
 * Each item is one line. The live preview rebuilds the
 * iframe document as each line is appended.
 */
const CODE_LINES = [
  { raw: `<!DOCTYPE html>`,            html: `<span class="pu">&lt;!DOCTYPE </span><span class="kw">html</span><span class="pu">&gt;</span>` },
  { raw: `<html lang="ar">`,           html: `<span class="pu">&lt;</span><span class="tag">html</span> <span class="attr">lang</span><span class="pu">="</span><span class="val">ar</span><span class="pu">"&gt;</span>` },
  { raw: `<head>`,                     html: `<span class="pu">&lt;</span><span class="tag">head</span><span class="pu">&gt;</span>` },
  { raw: `  <title>موقعي</title>`,     html: `  <span class="pu">&lt;</span><span class="tag">title</span><span class="pu">&gt;</span><span class="str">موقعي</span><span class="pu">&lt;/</span><span class="tag">title</span><span class="pu">&gt;</span>` },
  { raw: `  <link rel="stylesheet"`,   html: `  <span class="pu">&lt;</span><span class="tag">link</span> <span class="attr">rel</span><span class="pu">="</span><span class="val">stylesheet</span><span class="pu">"</span>` },
  { raw: `       href="style.css">`,   html: `       <span class="attr">href</span><span class="pu">="</span><span class="val">style.css</span><span class="pu">"&gt;</span>` },
  { raw: `</head>`,                    html: `<span class="pu">&lt;/</span><span class="tag">head</span><span class="pu">&gt;</span>` },
  { raw: `<body>`,                     html: `<span class="pu">&lt;</span><span class="tag">body</span><span class="pu">&gt;</span>` },
  { raw: `  <!-- Hero Section -->`,    html: `  <span class="cm">&lt;!-- Hero Section --&gt;</span>` },
  { raw: `  <h1 class="title">`,       html: `  <span class="pu">&lt;</span><span class="tag">h1</span> <span class="attr">class</span><span class="pu">="</span><span class="val">title</span><span class="pu">"&gt;</span>` },
  { raw: `    مرحباً بك! 👋`,           html: `    <span class="str">مرحباً بك! 👋</span>` },
  { raw: `  </h1>`,                    html: `  <span class="pu">&lt;/</span><span class="tag">h1</span><span class="pu">&gt;</span>` },
  { raw: `  <p class="desc">`,         html: `  <span class="pu">&lt;</span><span class="tag">p</span> <span class="attr">class</span><span class="pu">="</span><span class="val">desc</span><span class="pu">"&gt;</span>` },
  { raw: `    موقعك الاحترافي`,         html: `    <span class="str">موقعك الاحترافي</span>` },
  { raw: `  </p>`,                     html: `  <span class="pu">&lt;/</span><span class="tag">p</span><span class="pu">&gt;</span>` },
  { raw: `  <a class="btn">`,          html: `  <span class="pu">&lt;</span><span class="tag">a</span> <span class="attr">class</span><span class="pu">="</span><span class="val">btn</span><span class="pu">"&gt;</span>` },
  { raw: `    تواصل معي`,              html: `    <span class="str">تواصل معي</span>` },
  { raw: `  </a>`,                     html: `  <span class="pu">&lt;/</span><span class="tag">a</span><span class="pu">&gt;</span>` },
  { raw: `</body>`,                    html: `<span class="pu">&lt;/</span><span class="tag">body</span><span class="pu">&gt;</span>` },
  { raw: `</html>`,                    html: `<span class="pu">&lt;/</span><span class="tag">html</span><span class="pu">&gt;</span>` },
];

/** HTML injected into the live preview iframe */
const PREVIEW_BASE_STYLES = `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Tajawal', 'Segoe UI', sans-serif;
      background: #0d1117;
      color: #e6edf3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      direction: rtl;
      gap: 1.2rem;
    }
    .title {
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(90deg, #38bdf8, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-align: center;
    }
    .desc {
      font-size: 1.3rem;
      color: #8b949e;
      text-align: center;
      max-width: 260px;
    }
    .btn {
      display: inline-block;
      padding: 0.7rem 1.8rem;
      background: #f59e0b;
      color: #0d1117;
      border-radius: 6px;
      font-size: 1.1rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }
  </style>
`;

let typingDone = false;

function buildLivePreviewHTML(lineIndex) {
  const rawLines = CODE_LINES.slice(0, lineIndex + 1).map(l => l.raw).join('\n');

  // Progressive rendering: only show visible content elements
  const hasTitle = lineIndex >= 11;
  const hasDesc  = lineIndex >= 14;
  const hasBtn   = lineIndex >= 17;

  const bodyContent = `
    ${hasTitle ? '<h1 class="title">مرحباً بك! 👋</h1>' : ''}
    ${hasDesc  ? '<p class="desc">موقعك الاحترافي يُبنى هنا</p>' : ''}
    ${hasBtn   ? '<a class="btn">تواصل معي</a>' : ''}
  `;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  ${PREVIEW_BASE_STYLES}
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

function initTypingAnimation() {
  const codeDisplay   = document.getElementById('code-display');
  const lineNumbersEl = document.getElementById('line-numbers');
  const livePreview   = document.getElementById('live-preview');

  if (!codeDisplay || !livePreview) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    // Show full code instantly
    codeDisplay.innerHTML = CODE_LINES.map(l => l.html).join('\n');
    updateLineNumbers(CODE_LINES.length);
    updateLivePreview(livePreview, CODE_LINES.length - 1);
    typingDone = true;
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineHTML = '';
  let displayedLines = [];

  const LINE_DELAY    = 55;   // ms between characters
  const NEWLINE_PAUSE = 320;  // ms pause after finishing a line

  function typeChar() {
    if (typingDone) return;

    const currentLine = CODE_LINES[lineIndex];
    const rawLine = currentLine.raw;

    if (charIndex < rawLine.length) {
      charIndex++;
      // Show the highlighted version up to the character count of the raw line
      // We reveal the highlighted HTML fully at the end for simplicity (character-based progress)
      const progress = charIndex / rawLine.length;
      if (progress >= 1) {
        currentLineHTML = currentLine.html;
      } else {
        // Show raw partial text until line complete
        currentLineHTML = escapeHTML(rawLine.slice(0, charIndex));
      }

      const allHTML = [...displayedLines, currentLineHTML].join('\n');
      codeDisplay.innerHTML = allHTML;
      scrollCodeToBottom(codeDisplay.parentElement);

      setTimeout(typeChar, LINE_DELAY);

    } else {
      // Line complete — use the highlighted version
      currentLineHTML = currentLine.html;
      displayedLines.push(currentLineHTML);
      charIndex = 0;
      lineIndex++;

      // Update line numbers
      updateLineNumbers(displayedLines.length);

      // Update live preview
      updateLivePreview(livePreview, lineIndex - 1);

      codeDisplay.innerHTML = displayedLines.join('\n');
      scrollCodeToBottom(codeDisplay.parentElement);

      if (lineIndex < CODE_LINES.length) {
        setTimeout(typeChar, NEWLINE_PAUSE);
      } else {
        typingDone = true;
      }
    }
  }

  // Start after a short delay (page load settle)
  setTimeout(typeChar, 800);
}

function updateLineNumbers(count) {
  const el = document.getElementById('line-numbers');
  if (!el) return;
  let html = '';
  for (let i = 1; i <= count; i++) {
    html += i + '\n';
  }
  el.textContent = html;
}

function updateLivePreview(iframe, lineIndex) {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const html = buildLivePreviewHTML(lineIndex);
    doc.open();
    doc.write(html);
    doc.close();
  } catch (e) {
    // Cross-origin safety
  }
}

function scrollCodeToBottom(container) {
  if (container) container.scrollTop = container.scrollHeight;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


/* ─────────────────────────────────────────────────────
   2. NAVBAR — Active Tab on Scroll + Smooth Scroll
───────────────────────────────────────────────────── */

function initNavbar() {
  const tabs       = document.querySelectorAll('.nav-tab');
  const mobileTabs = document.querySelectorAll('.mobile-tab');
  const sections   = document.querySelectorAll('section[id]');
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Smooth scroll for all nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // Intersection Observer for active tab
  const observerOptions = {
    root: null,
    rootMargin: `-${document.querySelector('.navbar')?.offsetHeight || 58}px 0px -60% 0px`,
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveTab(id, tabs);
        setActiveTab(id, mobileTabs);
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));
}

function setActiveTab(sectionId, tabs) {
  tabs.forEach(tab => {
    const href = tab.getAttribute('href') || tab.getAttribute('data-section');
    const matches = href && href.includes(sectionId);
    tab.classList.toggle('active', matches);
  });
}


/* ─────────────────────────────────────────────────────
   3. SCROLL TO TOP BUTTON
───────────────────────────────────────────────────── */

function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ─────────────────────────────────────────────────────
   4. PROJECT CARDS — Hover Glow
───────────────────────────────────────────────────── */

function initProjectCards() {
  const cards = document.querySelectorAll('.project-card:not(.project-card--coming)');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform, box-shadow';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = '';
    });
  });
}


/* ─────────────────────────────────────────────────────
   5. PRICING CARDS — Number Animate on Scroll
───────────────────────────────────────────────────── */

function animateNumber(el, target, duration = 1000) {
  const start  = performance.now();
  const from   = 0;

  function update(time) {
    const elapsed  = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(from + (target - from) * ease);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initPricingAnimation() {
  const priceEls = document.querySelectorAll('.price-value');
  if (!priceEls.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent, 10);
        if (!isNaN(target)) {
          animateNumber(el, target, 900);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  priceEls.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────────────
   6. SECTION ENTRANCE ANIMATIONS
───────────────────────────────────────────────────── */

function initSectionAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Add fade-in CSS dynamically (keeps CSS file clean)
  const style = document.createElement('style');
  style.textContent = `
    .anim-fade {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .anim-fade.visible {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  // Mark animatable elements
  const animTargets = [
    ...document.querySelectorAll('.project-card'),
    ...document.querySelectorAll('.pricing-card'),
    ...document.querySelectorAll('.hero-headline'),
    document.querySelector('.md-doc'),
  ].filter(Boolean);

  animTargets.forEach((el, i) => {
    el.classList.add('anim-fade');
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animTargets.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────────────
   7. KEYBOARD SHORTCUTS
───────────────────────────────────────────────────── */

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu on Escape
      const menu = document.getElementById('mobile-menu');
      const ham  = document.querySelector('.hamburger');
      if (menu?.classList.contains('open')) {
        menu.classList.remove('open');
        ham?.classList.remove('open');
        ham?.setAttribute('aria-expanded', 'false');
      }
      // Also close booking modal
      closeBookingModal();
    }
  });
}


/* ─────────────────────────────────────────────────────
   8. BOOKING MODAL — FAB + Form + WhatsApp Send
   ID: 20170713-0001
   WhatsApp: 0700660204
───────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = '212700660204'; // format: country code + number
const BOOKING_ID      = '20170713-0001';

function openBookingModal() {
  const overlay = document.getElementById('bookingModal');
  const fab     = document.getElementById('bookingFab');
  if (!overlay) return;

  overlay.classList.add('bm-open');
  overlay.setAttribute('aria-hidden', 'false');
  fab?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';

  // Focus first field
  setTimeout(() => {
    document.getElementById('bm-name')?.focus();
  }, 120);
}

function closeBookingModal() {
  const overlay = document.getElementById('bookingModal');
  const fab     = document.getElementById('bookingFab');
  if (!overlay || !overlay.classList.contains('bm-open')) return;

  overlay.classList.remove('bm-open');
  overlay.setAttribute('aria-hidden', 'true');
  fab?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';

  // Return focus to FAB
  fab?.focus();
}

/* ── Phone Validation ── */
function sanitizePhoneInput(input) {
  // Allow only digits, no spaces, no letters, no special chars
  let val = input.value.replace(/\D/g, '');

  // Remove leading duplicate zeros (e.g. 00600... → 0600...)
  val = val.replace(/^0{2,}/, '0');

  // Cap at 10 digits
  if (val.length > 10) val = val.slice(0, 10);

  // Prevent pasting the same number more than once (very basic dupe check)
  input.value = val;
  return val;
}

function validatePhone(val) {
  // Must be 9 or 10 digits, start with 0 (Moroccan) or any digit
  return /^[0-9]{9,10}$/.test(val);
}

function validateName(val) {
  return val.trim().length >= 2;
}

function showFieldError(inputEl, errEl, msg) {
  inputEl.classList.add('is-error');
  inputEl.classList.remove('is-valid');
  if (errEl) errEl.textContent = msg;
}

function showFieldValid(inputEl, errEl) {
  inputEl.classList.remove('is-error');
  inputEl.classList.add('is-valid');
  if (errEl) errEl.textContent = '';
}

function clearFieldState(inputEl, errEl) {
  inputEl.classList.remove('is-error', 'is-valid');
  if (errEl) errEl.textContent = '';
}

/* ── Build WhatsApp Message ── */
function buildWhatsAppMessage(data) {
  const lines = [
    `🗓 *طلب حجز موقع — mouad web*`,
    ``,
    `📋 *المرجع:* ${BOOKING_ID}`,
    `👤 *الاسم:* ${data.name}`,
    `📞 *الهاتف:* ${data.phone}`,
    `📦 *الباقة:* ${data.package}`,
    data.notes ? `📝 *ملاحظات:* ${data.notes}` : null,
    ``,
    `_تم الإرسال عبر موقع mouad.web_`,
  ].filter(l => l !== null).join('\n');

  return encodeURIComponent(lines);
}

/* ── Init Booking Modal ── */
function initBookingModal() {
  const fab      = document.getElementById('bookingFab');
  const overlay  = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('bookingClose');
  const form     = document.getElementById('bookingForm');

  if (!fab || !overlay) return;

  /* Open */
  fab.addEventListener('click', openBookingModal);

  /* Close button */
  closeBtn?.addEventListener('click', closeBookingModal);

  /* Close on overlay backdrop click */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBookingModal();
  });

  /* ── Phone field: live sanitization ── */
  const phoneInput  = document.getElementById('bm-phone');
  const phoneWrap   = phoneInput?.closest('.bm-phone-wrap');
  const phoneErr    = document.getElementById('bm-phone-err');

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      const val = sanitizePhoneInput(phoneInput);

      // Apply state to wrapper too for border color
      if (val.length === 0) {
        clearFieldState(phoneInput, phoneErr);
        phoneWrap?.classList.remove('is-error', 'is-valid');
      } else if (validatePhone(val)) {
        showFieldValid(phoneInput, phoneErr);
        phoneWrap?.classList.remove('is-error');
        phoneWrap?.classList.add('is-valid');
      } else {
        // Only show error after user has typed enough chars
        if (val.length >= 9) {
          showFieldError(phoneInput, phoneErr, 'رقم الهاتف غير صحيح (9–10 أرقام)');
          phoneWrap?.classList.add('is-error');
          phoneWrap?.classList.remove('is-valid');
        } else {
          clearFieldState(phoneInput, phoneErr);
          phoneWrap?.classList.remove('is-error', 'is-valid');
        }
      }
    });

    /* Block paste of non-numeric content */
    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const digitsOnly = pasted.replace(/\D/g, '').slice(0, 10);
      const start = phoneInput.selectionStart;
      const end   = phoneInput.selectionEnd;
      const current = phoneInput.value;
      const newVal = (current.slice(0, start) + digitsOnly + current.slice(end)).slice(0, 10);
      phoneInput.value = newVal;
      phoneInput.dispatchEvent(new Event('input'));
    });

    /* Block non-numeric key input */
    phoneInput.addEventListener('keydown', (e) => {
      const allowed = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
        'Tab', 'Home', 'End'
      ];
      if (allowed.includes(e.key)) return;
      if (/^\d$/.test(e.key)) return; // digit key
      if (e.ctrlKey || e.metaKey) return; // allow Ctrl+A, Ctrl+C, etc.
      e.preventDefault(); // block everything else
    });
  }

  /* ── Name field: live validation ── */
  const nameInput = document.getElementById('bm-name');
  const nameErr   = document.getElementById('bm-name-err');

  nameInput?.addEventListener('blur', () => {
    const val = nameInput.value.trim();
    if (val.length === 0) {
      clearFieldState(nameInput, nameErr);
    } else if (!validateName(val)) {
      showFieldError(nameInput, nameErr, 'الاسم يجب أن يكون حرفين على الأقل');
    } else {
      showFieldValid(nameInput, nameErr);
    }
  });

  /* ── Package select ── */
  const pkgSelect = document.getElementById('bm-package');
  const pkgErr    = document.getElementById('bm-pkg-err');

  pkgSelect?.addEventListener('change', () => {
    if (pkgSelect.value) {
      showFieldValid(pkgSelect, pkgErr);
    }
  });

  /* ── Notes: character counter ── */
  const notesEl    = document.getElementById('bm-notes');
  const notesCount = document.getElementById('bm-notes-count');

  notesEl?.addEventListener('input', () => {
    const len = notesEl.value.length;
    if (notesCount) notesCount.textContent = `${len} / 300`;
    if (len > 270) {
      notesCount.style.color = '#f59e0b';
    } else {
      notesCount.style.color = '';
    }
  });

  /* ── Form Submit ── */
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // Validate name
    const name = nameInput?.value.trim() || '';
    if (!validateName(name)) {
      showFieldError(nameInput, nameErr, 'الرجاء إدخال اسمك');
      valid = false;
    } else {
      showFieldValid(nameInput, nameErr);
    }

    // Validate phone
    const phone = phoneInput?.value.trim() || '';
    if (!validatePhone(phone)) {
      showFieldError(phoneInput, phoneErr, 'رقم الهاتف غير صحيح (9–10 أرقام)');
      phoneWrap?.classList.add('is-error');
      phoneWrap?.classList.remove('is-valid');
      valid = false;
    } else {
      showFieldValid(phoneInput, phoneErr);
      phoneWrap?.classList.remove('is-error');
      phoneWrap?.classList.add('is-valid');
    }

    // Validate package
    const pkg = pkgSelect?.value || '';
    if (!pkg) {
      if (pkgErr) pkgErr.textContent = 'الرجاء اختيار الباقة';
      pkgSelect?.classList.add('is-error');
      valid = false;
    } else {
      if (pkgErr) pkgErr.textContent = '';
      pkgSelect?.classList.remove('is-error');
    }

    if (!valid) {
      // Shake the submit button
      const btn = document.getElementById('bookingSubmit');
      btn?.classList.add('shake');
      setTimeout(() => btn?.classList.remove('shake'), 500);
      return;
    }

    // Build message and redirect to WhatsApp
    const notes = notesEl?.value.trim() || '';
    const msg = buildWhatsAppMessage({ name, phone, package: pkg, notes });
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;

    // Disable button briefly to prevent double-submit
    const submitBtn = document.getElementById('bookingSubmit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري الإرسال...';
    }

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Reset after short delay
    setTimeout(() => {
      form.reset();
      [nameInput, phoneInput, pkgSelect, notesEl].forEach(el => {
        if (el) clearFieldState(el, null);
      });
      phoneWrap?.classList.remove('is-error', 'is-valid');
      if (notesCount) notesCount.textContent = '0 / 300';

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> <span>إرسال عبر واتساب</span>';
      }

      closeBookingModal();
    }, 1200);
  });

  /* Focus trap inside modal */
  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = overlay.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });
}


/* ─────────────────────────────────────────────────────
   INIT — DOMContentLoaded
───────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initNavbar();
  initScrollTop();
  initProjectCards();
  initPricingAnimation();
  initSectionAnimations();
  initKeyboard();
  initBookingModal();

  // Add shake keyframe for invalid submit feedback
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    .shake { animation: shake 0.45s ease; }
  `;
  document.head.appendChild(shakeStyle);
});

