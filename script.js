/* ========================================
   FinAcc Pro - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------
  // Header Scroll Effect
  // ----------------------------------------
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header styling
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ----------------------------------------
  // Mobile Menu
  // ----------------------------------------
  const hamburger = document.getElementById('hamburger');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenuOverlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) closeMobileMenu();
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ----------------------------------------
  // Active Nav Link on Scroll
  // ----------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ----------------------------------------
  // Scroll Animations (Intersection Observer)
  // ----------------------------------------
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, parseInt(delay));
        animateObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => animateObserver.observe(el));

  // ----------------------------------------
  // Counter Animation
  // ----------------------------------------
  function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.floor(start + (target - start) * easedProgress);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // Observe stat numbers for counter animation
  const statNumbers = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ----------------------------------------
  // 3D Card Tilt Effect (Mouse Follow)
  // ----------------------------------------
  const cards3d = document.querySelectorAll('.card-3d');

  cards3d.forEach(card => {
    const inner = card.querySelector('.card-3d-inner');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      // Only apply tilt if not in hover/flip state
      if (!card.matches(':hover')) {
        inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = '';
    });
  });

  // ----------------------------------------
  // Dashboard Card 3D Tilt
  // ----------------------------------------
  const dashboardCards = document.querySelectorAll('.dashboard-card');

  dashboardCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ----------------------------------------
  // Smooth Scroll for Anchor Links
  // ----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || this.closest('form')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----------------------------------------
  // Contact Form Handling
  // ----------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      // Simulate form submission
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 2500);
      }, 1500);
    });
  }

  // ----------------------------------------
  // Parallax Effect for Hero Shapes
  // ----------------------------------------
  const heroShapes = document.querySelectorAll('.hero-shape');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroShapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.03;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }
  }, { passive: true });

  // ----------------------------------------
  // Card Stagger Animation on Scroll
  // ----------------------------------------
  const serviceCards = document.querySelectorAll('.card-3d');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => cardObserver.observe(card));

  // ----------------------------------------
  // Typing Effect for Hero Badge (optional polish)
  // ----------------------------------------
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '1';
  }

  // ----------------------------------------
  // Touch Device Detection for 3D Cards
  // ----------------------------------------
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    cards3d.forEach(card => {
      card.addEventListener('click', function (e) {
        const inner = this.querySelector('.card-3d-inner');
        const isFlipped = inner.style.transform === 'rotateY(180deg)';

        // Reset all other cards
        cards3d.forEach(c => {
          if (c !== card) {
            c.querySelector('.card-3d-inner').style.transform = '';
          }
        });

        inner.style.transform = isFlipped ? '' : 'rotateY(180deg)';
      });
    });
  }

  // ----------------------------------------
  // Preloader (Optional - fade out)
  // ----------------------------------------
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // ----------------------------------------
  // Industry Testimonial Tabs
  // ----------------------------------------
  const industryTabs = document.querySelectorAll('.industry-tab');
  const industryCards = document.querySelectorAll('.industry-testimonials-grid .testimonial-card');

  industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      industryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.industry;
      industryCards.forEach(card => {
        if (filter === 'all' || card.dataset.industry === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ----------------------------------------
  // Testimonial Stats Counter
  // ----------------------------------------
  const statValues = document.querySelectorAll('.testimonial-stat-value');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 16);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statValues.forEach(val => statObserver.observe(val));

});
