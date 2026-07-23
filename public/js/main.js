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

  // Live Yatra Status Poll (updates live stats every 30s)
  function fetchLiveYatraStatus() {
    fetch('/api/live-status')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.status) {
          const s = data.status;
          const distElem = document.getElementById('statDistanceCovered');
          const mealsElem = document.getElementById('statMealsServed');
          const locElem = document.getElementById('statCurrentLocation');

          if (distElem) distElem.textContent = `${s.distance_covered_km} / ${s.total_distance_km} KM`;
          if (mealsElem) mealsElem.textContent = s.meals_served_today.toLocaleString('en-IN');
          if (locElem) locElem.textContent = s.current_location;
        }
      })
      .catch(err => console.log('Live status update check:', err.message));
  }

  setInterval(fetchLiveYatraStatus, 30000);
});

// Toast notification helper function
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
