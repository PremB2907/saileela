/**
 * Mumbai Central Cha Raja - Main Frontend Interactions
 * Libraries: GSAP, ScrollTrigger, Swiper.js
 * Official Mandal: Belasis Road B.I.T. Chawl Sarvajanik Shri Ganeshotsav Mandal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      }
    });
  }

  // ==========================================================================
  // CUSTOM STUDIO FOLLOWER CURSOR LOGIC
  // ==========================================================================
  const cursorDot = document.getElementById('customCursorDot');
  const cursorOutline = document.getElementById('customCursorOutline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverables = document.querySelectorAll('a, button, .filter-pill, .gold-motion-frame, .scroll-reel-card, [data-lightbox]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // Live Video Streaming Modal Listener
  const btnLiveDarshanModal = document.getElementById('btnLiveDarshanModal');
  const videoModal = document.getElementById('videoModal');
  const btnCloseVideoModal = document.getElementById('btnCloseVideoModal');

  if (btnLiveDarshanModal && videoModal) {
    btnLiveDarshanModal.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal.classList.add('active');
    });
  }

  if (btnCloseVideoModal && videoModal) {
    btnCloseVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('active');
    });
  }

  // Close modal when clicking background overlay
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('active');
      }
    });
  }

  // GSAP Animations (if loaded)
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    gsap.from('.hero-content h1', {
      opacity: 0,
      y: 35,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 25,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  // ==========================================================================
  // SCROLL EVENT INTERACTIVE INFO POP-UP LOGIC
  // ==========================================================================
  const scrollInfoPopup = document.getElementById('scrollInfoPopup');
  const btnCloseScrollPopup = document.getElementById('btnCloseScrollPopup');

  if (scrollInfoPopup) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300 && !sessionStorage.getItem('mcc_popup_dismissed')) {
        scrollInfoPopup.classList.add('visible');
      }
    });

    if (btnCloseScrollPopup) {
      btnCloseScrollPopup.addEventListener('click', () => {
        scrollInfoPopup.classList.remove('visible');
        sessionStorage.setItem('mcc_popup_dismissed', 'true');
      });
    }
  }

  // ==========================================================================
  // GALLERY LIGHTBOX PREVIEW MODAL
  // ==========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = item.getAttribute('data-lightbox-src') || item.src;
      const title = item.getAttribute('data-lightbox-title') || 'Mumbai Central Cha Raja';
      const caption = item.getAttribute('data-lightbox-caption') || '';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxTitle) lightboxTitle.innerText = title;
        if (lightboxCaption) lightboxCaption.innerText = caption;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (btnCloseLightbox && lightboxModal) {
    btnCloseLightbox.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // GALLERY CATEGORY FILTER PILLS
  // ==========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-card-item');

  if (filterPills.length > 0 && galleryItems.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const category = pill.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // GANESHOTSAV LIVE COUNTDOWN TIMER TICKER
  // ==========================================================================
  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMins = document.getElementById('countMins');
  const countSecs = document.getElementById('countSecs');

  if (countDays && countHours && countMins && countSecs) {
    const targetDate = new Date('2026-09-14T00:00:00+05:30').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        countDays.innerText = days < 10 ? '0' + days : days;
        countHours.innerText = hours < 10 ? '0' + hours : hours;
        countMins.innerText = mins < 10 ? '0' + mins : mins;
        countSecs.innerText = secs < 10 ? '0' + secs : secs;
      } else {
        countDays.innerText = '00';
        countHours.innerText = '00';
        countMins.innerText = '00';
        countSecs.innerText = '00';
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ==========================================================================
  // TOP UTILITY BAR SCROLL COLLAPSE LOGIC
  // ==========================================================================
  const topUtilityBar = document.getElementById('topUtilityBar');
  let lastScrollY = window.scrollY;

  if (topUtilityBar) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80 && currentScrollY > lastScrollY) {
        topUtilityBar.classList.add('collapsed');
      } else {
        topUtilityBar.classList.remove('collapsed');
      }
      lastScrollY = currentScrollY;
    });
  }

  // ==========================================================================
  // HERO 3-SLIDE CAROUSEL LOGIC
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');

  if (heroSlides.length > 0 && carouselDots.length > 0) {
    let currentSlide = 0;
    const slideCount = heroSlides.length;

    function goToSlide(index) {
      heroSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      carouselDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
      currentSlide = index;
    }

    function nextSlide() {
      const nextIndex = (currentSlide + 1) % slideCount;
      goToSlide(nextIndex);
    }

    carouselDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
        if (!isNaN(slideIndex)) {
          goToSlide(slideIndex);
        }
      });
    });

    setInterval(nextSlide, 6500);
  }

  // ==========================================================================
  // ANIMATED STAT NUMBER COUNTERS (Intersection Observer)
  // ==========================================================================
  const statNumElements = document.querySelectorAll('.stat-num-value[data-target]');

  if (statNumElements.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute('data-target'), 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';

          if (!isNaN(targetNum)) {
            let startNum = 0;
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = targetNum / steps;

            const timer = setInterval(() => {
              startNum += increment;
              if (startNum >= targetNum) {
                el.innerText = prefix + targetNum.toLocaleString() + suffix;
                clearInterval(timer);
              } else {
                el.innerText = prefix + Math.floor(startNum).toLocaleString() + suffix;
              }
            }, stepTime);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    statNumElements.forEach(el => observer.observe(el));
  }
});



