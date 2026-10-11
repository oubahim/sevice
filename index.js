// Live Preview Modal Functions
function openPreview(url) {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    if (modal && iframe) {
        iframe.src = url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    const modal = document.getElementById('preview-modal');
    const iframe = document.getElementById('preview-iframe');
    if (modal && iframe) {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = 'auto';
    }
}

function resizePreview(device) {
    const wrapper = document.getElementById('iframe-wrapper');
    const buttons = document.querySelectorAll('.responsive-controls button');
    
    if (wrapper) {
        wrapper.className = device;
    }
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// Order Modal Functions
function toggleOrderModal(show) {
    const modal = document.getElementById('order-modal');
    if (modal) {
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

function acceptCookies(accepted) {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
}

function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' || consent === 'declined') {
        banner.classList.add('hidden');
    }
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const previewModal = document.getElementById('preview-modal');
    const orderModal = document.getElementById('order-modal');
    
    if (event.target === previewModal) {
        closePreview();
    }
    if (event.target === orderModal) {
        toggleOrderModal(false);
    }
};

// Mobile Navigation Toggle (if menu button exists or added)
document.addEventListener('DOMContentLoaded', () => {
    initCookieConsent();

    const nav = document.querySelector('nav');
    // Lazy loading images smooth effect
    const lazyImages = document.querySelectorAll('.lazy-smooth');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    if (image.dataset.src) {
                        image.src = image.dataset.src;
                    }
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        lazyImages.forEach(image => {
            if (image.dataset.src) {
                image.src = image.dataset.src;
            }
        });
    }
});

function validateBmPhone(input) {
  // إبقاء الأرقام فقط
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);

  const errEl = document.getElementById('bm-phone-err');
  const isValid = /^0[67][0-9]{8}$/.test(input.value);

  if (input.value.length === 10 && !isValid) {
    errEl.textContent = 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 06 أو 07 ويتكون من 10 أرقام';
    errEl.style.display = 'block';
    input.setCustomValidity(errEl.textContent);
  } else if (input.value.length > 0 && input.value.length < 10) {
    errEl.style.display = 'none';
    input.setCustomValidity('');
  } else {
    errEl.style.display = 'none';
    input.setCustomValidity('');
  }
}