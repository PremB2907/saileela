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
});
