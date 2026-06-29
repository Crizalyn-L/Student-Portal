/**
 * LEGEND HIGH — STUDENT PORTAL
 * script.js
 * Handles: Pre-loader, Tooltips, Popovers, Toasts,
 *          Scrollspy nav sync, Fade-in on scroll,
 *          Form helpers, Leave modal confirmation
 */

/* PRELOADER */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Give loader bar time to fill, then hide
  setTimeout(() => {
    preloader.classList.add('hidden');

    // Show welcome toast after loader clears
    setTimeout(() => {
      const welcomeToast = document.getElementById('toastWelcome');
      if (welcomeToast) {
        new bootstrap.Toast(welcomeToast).show();
      }
      // Show reminder toast shortly after
      setTimeout(() => {
        const alertToast = document.getElementById('toastAlert2');
        if (alertToast) {
          new bootstrap.Toast(alertToast, { delay: 4000 }).show();
        }
      }, 2200);
    }, 400);
  }, 2000);
});

/* ================================================================
   TOOLTIPS (#12) — Initialize all
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el, { trigger: 'hover focus' });
  });
});

/* ================================================================
   POPOVERS (#8) — Initialize all, dismiss on outside click
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const popoverList = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverList.forEach(el => {
    new bootstrap.Popover(el, { trigger: 'click', html: false });
  });

  // Dismiss any open popover when clicking outside
  document.addEventListener('click', (e) => {
    popoverList.forEach(el => {
      const pop = bootstrap.Popover.getInstance(el);
      if (pop && !el.contains(e.target)) {
        pop.hide();
      }
    });
  });
});

/* ================================================================
   TOAST TRIGGERS (#11)
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // "Show Notifications" button
  const btnNotifs = document.getElementById('btnShowToasts');
  if (btnNotifs) {
    btnNotifs.addEventListener('click', () => {
      const welcome = document.getElementById('toastWelcome');
      const reminder = document.getElementById('toastAlert2');
      if (welcome)  bootstrap.Toast.getOrCreateInstance(welcome,  { delay: 5000 }).show();
      if (reminder) {
        setTimeout(() => {
          bootstrap.Toast.getOrCreateInstance(reminder, { delay: 4000 }).show();
        }, 600);
      }
    });
  }

  // Support form "Send Message" → success toast
  const btnSend = document.getElementById('btnSendSupport');
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      const toastEl = document.getElementById('toastSubmit');
      if (toastEl) {
        bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
      }
    });
  }

  // Leave modal "Submit" → success toast
  const btnLeave = document.getElementById('btnSubmitLeave');
  if (btnLeave) {
    btnLeave.addEventListener('click', () => {
      const toastEl = document.getElementById('toastSubmit');
      if (toastEl) {
        toastEl.querySelector('.toast-body').textContent =
          '✅ Leave of Absence request submitted to your adviser.';
        bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
      }
    });
  }
});

/* ================================================================
   SCROLLSPY — Active nav link sync (#9)
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#mainNav .nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) link.classList.add('active');
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
});

/* ================================================================
   FADE-IN ON SCROLL
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
});

/* ================================================================
   DROPDOWN — Concern type selector (Support form)
================================================================ */
function setConcern(el) {
  const textEl = document.getElementById('concernText');
  if (textEl) {
    textEl.textContent = el.textContent.trim();
    textEl.style.color = 'var(--text-dark)';
  }
}

/* ================================================================
   GRADE PROGRESS BARS — Animate on scroll into view
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.progress-thin-bar');
  bars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = targetWidth;
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    barObserver.observe(bar);
  });
});

/* ================================================================
   SIDEBAR — Highlight active link based on hash
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const sideLinks = document.querySelectorAll('.sidebar-link[href]');

  const highlightSidebar = () => {
    const hash = window.location.hash || '#home';
    sideLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === hash);
    });
  };

  window.addEventListener('hashchange', highlightSidebar);
  highlightSidebar();
});

/* ================================================================
   COLLAPSE — Rotate chevron icon on toggle
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
    const icon = btn.querySelector('.bi-chevron-down');
    if (!icon) return;

    const targetId = btn.getAttribute('data-bs-target');
    const target = document.querySelector(targetId);
    if (!target) return;

    // Set initial state
    if (target.classList.contains('show')) {
      icon.style.transform = 'rotate(180deg)';
    }

    target.addEventListener('show.bs.collapse', () => {
      icon.style.transition = 'transform .25s ease';
      icon.style.transform = 'rotate(180deg)';
    });
    target.addEventListener('hide.bs.collapse', () => {
      icon.style.transition = 'transform .25s ease';
      icon.style.transform = 'rotate(0deg)';
    });
  });
});

/* ================================================================
   HERO STATS — Count-up animation
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const statsEl = document.querySelectorAll('.hero-stat-num');

  const countUp = (el, target, decimals = 0, suffix = '') => {
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = ease * target;
      el.textContent = decimals
        ? value.toFixed(decimals) + suffix
        : Math.floor(value) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      if (text.includes('.')) {
        countUp(el, parseFloat(text), 1);
      } else if (text.includes('%')) {
        countUp(el, parseInt(text), 0, '%');
      } else {
        countUp(el, parseInt(text));
      }
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statsEl.forEach(el => statObserver.observe(el));
});
