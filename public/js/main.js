/**
 * Mumbai Central Cha Raja - Main Frontend JS & Manus AI Integration
 * Libraries: GSAP, ScrollTrigger, Anime.js, Motion.dev, Manus AI
 * Official Handle: @mumbaicentralcharajaofficial
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
  // GSAP & ScrollTrigger Animations
  // ==========================================================================
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero title entrance timeline
    gsap.from('.hero-title-chintamani', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle-chintamani', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.hero-tracker-card', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: 0.3,
      ease: 'back.out(1.7)'
    });
  }

  // ==========================================================================
  // Anime.js Logo Aura & Micro-Interactions
  // ==========================================================================
  if (typeof anime !== 'undefined') {
    anime({
      targets: '.brand-logo img',
      rotate: [-3, 3],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    anime({
      targets: '.live-pulse-tag',
      scale: [1, 1.08, 1],
      duration: 1800,
      loop: true,
      easing: 'easeInOutQuad'
    });
  }

  // ==========================================================================
  // Manus AI Devotee Assistant Engine (🤖 राजा AI मार्गदर्शक)
  // ==========================================================================
  const btnManusAi = document.getElementById('btnManusAi');
  const manusAiModal = document.getElementById('manusAiModal');
  const btnCloseManusAi = document.getElementById('btnCloseManusAi');
  const manusAiInput = document.getElementById('manusAiInput');
  const btnSendManusAi = document.getElementById('btnSendManusAi');
  const manusChatBody = document.getElementById('manusChatBody');

  const manusAiKnowledge = [
    {
      keywords: ['aarti', 'time', 'timing', 'आरती', 'वेळ', 'समय'],
      response: '🌺 **दैनिक महाआरती वेळापत्रक:**\n• सकाळची महाआरती: सकाळी ८:०० वाजता\n• दुपारची भोग आरती: दुपारी १२:३० वाजता\n• सायंकाळची मुख्य महाआरती: रात्री ८:०० वाजता (BIT Chawl Ground).'
    },
    {
      keywords: ['pass', 'vip', 'दर्शन', 'पास', 'ticket', 'entry'],
      response: '🎟️ **व्हीआयपी पास नोंदणी:**\nतुम्ही वेबसाईटवरील [व्हीआयपी पास](/register-pass) मेनूवर जाऊन विनामूल्य क्यूआर-कोड पास नोंदवू शकता. मंडप रांगेत त्वरित प्राधान्य मिळेल.'
    },
    {
      keywords: ['donate', 'donation', '80g', 'देणगी', 'दान', 'कर'],
      response: '💖 **८०जी करसवलत देणगी:**\nसर्व देणग्यांना कलम 80G अंतर्गत ५०% करसवलत मिळतो. [ऑनलाइन देणगी द्या](/donate) आणि त्वरित PDF पावती डाउनलोड करा.'
    },
    {
      keywords: ['tshirt', 't-shirt', 'merchandise', 'टी-शर्ट', 'कपडे'],
      response: '👕 **ऑफिशियल टी-शर्ट बुकिंग:**\nमुंबई सेंट्रलचा राजा ऑफिशियल टी-शर्ट बुकिंग ₹४९९/- मध्ये उपलब्ध आहे. [टी-शर्ट बुकिंग करा](/tshirt) आणि मण्डप काउंटरवरून पिकअप करा.'
    },
    {
      keywords: ['address', 'location', 'station', 'रेल्वे', 'पत्ता', 'बस'],
      response: '🚆 **मुख्य मंडप पत्ता व मार्ग:**\nबेलासिस रोड, बी.आय.टी. चाळ, मुंबई सेंट्रल (पु.), मुंबई - ४००००८.\n• जवळचे स्टेशन: मुंबई सेंट्रल (०.५ किमी), भायखळा (१ किमी).'
    }
  ];

  function appendChatMessage(sender, text) {
    if (!manusChatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.style.marginBottom = '1rem';
    msgDiv.style.textAlign = sender === 'user' ? 'right' : 'left';

    const bubble = document.createElement('div');
    bubble.style.display = 'inline-block';
    bubble.style.padding = '0.7rem 1.1rem';
    bubble.style.borderRadius = sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px';
    bubble.style.background = sender === 'user' ? 'linear-gradient(135deg, #FF6F00 0%, #D97706 100%)' : '#FFF5E6';
    bubble.style.color = sender === 'user' ? '#FFFFFF' : '#1E293B';
    bubble.style.fontSize = '0.92rem';
    bubble.style.maxWidth = '85%';
    bubble.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    bubble.style.border = sender === 'user' ? 'none' : '1px solid #E0C097';

    // Simple markdown link converter
    let htmlText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#800020; font-weight:800; text-decoration:underline;">$1</a>');
    htmlText = htmlText.replace(/\n/g, '<br>');
    bubble.innerHTML = htmlText;

    msgDiv.appendChild(bubble);
    manusChatBody.appendChild(msgDiv);
    manusChatBody.scrollTop = manusChatBody.scrollHeight;
  }

  function handleManusAiQuery(queryText) {
    if (!queryText || !queryText.trim()) return;
    appendChatMessage('user', queryText);
    if (manusAiInput) manusAiInput.value = '';

    const lowerQuery = queryText.toLowerCase();
    let foundAnswer = null;

    for (const item of manusAiKnowledge) {
      if (item.keywords.some(k => lowerQuery.includes(k))) {
        foundAnswer = item.response;
        break;
      }
    }

    if (!foundAnswer) {
      foundAnswer = '🚩 **गणपती बाप्पा मोरया!**\nआपल्या प्रश्नाचे सविस्तर उत्तर मिळवण्यासाठी कृपया मंडळाच्या २४/७ हेल्पलाईनवर संपर्क साधा: +९१ ९८७६५ ४३२१० किंवा [संपर्क पान पाहा](/contact).';
    }

    setTimeout(() => {
      appendChatMessage('manus', foundAnswer);
    }, 500);
  }

  if (btnManusAi && manusAiModal) {
    btnManusAi.addEventListener('click', () => {
      manusAiModal.style.display = 'flex';
      if (manusChatBody && manusChatBody.children.length === 0) {
        appendChatMessage('manus', '🚩 **नमस्कार! मी Manus AI (राजा मार्गदर्शक) आहे.**\nमी तुम्हाला आरती वेळा, व्हीआयपी पास, देणगी पावती आणि मण्डप मार्गाबद्दल मदत करू शकतो. प्रश्न विचारा किंवा खालील बटणावर क्लिक करा!');
      }
    });
  }

  if (btnCloseManusAi && manusAiModal) {
    btnCloseManusAi.addEventListener('click', () => {
      manusAiModal.style.display = 'none';
    });
  }

  if (btnSendManusAi) {
    btnSendManusAi.addEventListener('click', () => {
      if (manusAiInput) handleManusAiQuery(manusAiInput.value);
    });
  }

  if (manusAiInput) {
    manusAiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleManusAiQuery(manusAiInput.value);
    });
  }

  // Global Quick Chip Handler for Manus AI
  window.askManusAi = function(questionText) {
    if (manusAiModal && manusAiModal.style.display !== 'flex') {
      manusAiModal.style.display = 'flex';
    }
    handleManusAiQuery(questionText);
  };
});

// Toast Helper
function showToast(message, type = 'info') {
  let toast = document.getElementById('alertToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'alertToast';
    toast.className = 'alert-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${type === 'success' ? '✅' : type === 'error' ? '🛑' : 'ℹ️'}</span>
    <div>${message}</div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
