// ============================================================================
// Personal Branding Portfolio - Main Script
// Clean, modern ES6+ JavaScript — zero external dependencies
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Mobile Hamburger Menu
  // ──────────────────────────────────────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  const closeMenu = () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
  };

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks?.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Smooth Scrolling
  // ──────────────────────────────────────────────────────────────────────────
  const NAVBAR_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Scroll Spy (Active Navigation)
  // ──────────────────────────────────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const SCROLL_SPY_OFFSET = 200;

  const updateScrollSpy = () => {
    const scrollPos = window.scrollY + SCROLL_SPY_OFFSET;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navAnchors.forEach((a) => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${sectionId}`) {
            a.classList.add('active');
          }
        });
      }
    });
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Navbar Background on Scroll
  // ──────────────────────────────────────────────────────────────────────────
  const navbar = document.querySelector('.navbar');

  // Inject the behaviour-driven scrolled rule (CSS handles all other styling)
  const scrolledStyle = document.createElement('style');
  scrolledStyle.textContent =
    '.navbar.scrolled { box-shadow: var(--shadow-md); }';
  document.head.appendChild(scrolledStyle);

  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 9. Scroll to Top Button
  // ──────────────────────────────────────────────────────────────────────────
  const scrollTopBtn = document.querySelector('.scroll-top');

  const updateScrollTopBtn = () => {
    if (window.scrollY > 500) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  };

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Unified scroll handler (debounced via rAF) ───────────────────────────
  let scrollTicking = false;

  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollSpy();
        updateNavbar();
        updateScrollTopBtn();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Fire once on load so initial state is correct
  updateScrollSpy();
  updateNavbar();
  updateScrollTopBtn();

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Scroll-Triggered Animations (IntersectionObserver)
  // ──────────────────────────────────────────────────────────────────────────
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  if (animateElements.length) {
    const animateObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((el) => animateObserver.observe(el));
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Skill Bars Animation
  // ──────────────────────────────────────────────────────────────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillBars.length) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const width = el.getAttribute('data-width');
            el.classList.add('animated');
            el.style.width = width + '%';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. GitHub Contribution Graph Generator
  // ──────────────────────────────────────────────────────────────────────────
  const githubGraph = document.querySelector('#github-graph');

  if (githubGraph) {
    const WEEKS = 52;
    const DAYS = 7;
    const TOTAL_CELLS = WEEKS * DAYS;

    // Simple seeded pseudo-random number generator (mulberry32)
    const seededRandom = (seed) => {
      let t = (seed + 0x6d2b79f5) | 0;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Set grid layout to 7 rows
    githubGraph.style.gridTemplateRows = 'repeat(7, 1fr)';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < TOTAL_CELLS; i++) {
      const cell = document.createElement('div');
      cell.className = 'github-cell';

      const rand = seededRandom(i * 2654435761); // consistent hash per cell

      // ~60% empty, 20% level-1, 10% level-2, 7% level-3, 3% level-4
      if (rand < 0.6) {
        // empty — no level class
      } else if (rand < 0.8) {
        cell.classList.add('level-1');
      } else if (rand < 0.9) {
        cell.classList.add('level-2');
      } else if (rand < 0.97) {
        cell.classList.add('level-3');
      } else {
        cell.classList.add('level-4');
      }

      fragment.appendChild(cell);
    }

    githubGraph.appendChild(fragment);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 8. Contact Form Handling
  // ──────────────────────────────────────────────────────────────────────────
  const contactForm = document.querySelector('#contactForm');
  const formNote = document.querySelector('#formNote');

  const showFormMessage = (message, type) => {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.className = type; // 'error' or 'success'
  };

  const clearFormNote = () => {
    if (!formNote) return;
    formNote.textContent = '';
    formNote.className = '';
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim() ?? '';
    const email = formData.get('email')?.trim() ?? '';
    const company = formData.get('company')?.trim() ?? '';
    const subject = formData.get('subject')?.trim() ?? '';
    const message = formData.get('message')?.trim() ?? '';

    // Validate required fields
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Validate email
    if (!EMAIL_REGEX.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }

      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

      // Clear success message after 5 seconds
      setTimeout(clearFormNote, 5000);
    }, 1500);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 10. Counter Animation for Stats
  // ──────────────────────────────────────────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') === '+' ? '+' : '';
    const duration = 2000; // ~2 seconds
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural feel
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (statNumbers.length) {
    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statNumbers.forEach((el) => statObserver.observe(el));
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 11. Keyboard Navigation
  // ──────────────────────────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      clearFormNote();
    }
  });
});

// ============================================================================
// 12. Performance Monitoring (Modern API)
// ============================================================================
window.addEventListener('load', () => {
  if (performance.getEntriesByType) {
    const [navigation] = performance.getEntriesByType('navigation');
    if (navigation) {
      console.log(`Page load: ${Math.round(navigation.loadEventEnd)}ms`);
    }
  }
});
