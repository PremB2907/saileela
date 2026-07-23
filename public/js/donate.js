document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.getElementById('donationForm');
  if (!donationForm) return;

  const amountInput = document.getElementById('donationAmount');
  const amountButtons = document.querySelectorAll('.btn-preset-amount');

  // Modal elements
  const modalBackdrop = document.getElementById('sevaModalBackdrop');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnConfirmSevaPayment = document.getElementById('btnConfirmSevaPayment');

  const modalCategoryText = document.getElementById('modalCategoryText');
  const modalAmountText = document.getElementById('modalAmountText');
  const upiQrCodeImg = document.getElementById('upiQrCodeImg');

  const payTabs = document.querySelectorAll('.pay-tab');
  const payContents = document.querySelectorAll('.pay-content');

  let activeDonationPayload = null;

  // Handle Preset Amount Button Clicks
  amountButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      amountButtons.forEach(b => b.classList.remove('btn-primary'));
      amountButtons.forEach(b => b.classList.add('btn-outline-dark'));

      btn.classList.remove('btn-outline-dark');
      btn.classList.add('btn-primary');

      const selectedVal = btn.dataset.amount;
      if (amountInput) amountInput.value = selectedVal;
    });
  });

  // Modal Tab Switcher
  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => {
        t.style.background = 'var(--bg-surface)';
        t.style.color = 'var(--text-muted)';
        t.classList.remove('active');
      });

      tab.style.background = 'var(--gold-glow)';
      tab.style.color = 'var(--primary-gold)';
      tab.classList.add('active');

      const targetId = tab.dataset.tab;
      payContents.forEach(c => {
        c.style.display = c.id === targetId ? 'block' : 'none';
      });
    });
  });

  // Close Modal Handler
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.style.display = 'none';
    });
  }

  // Finalize Donation API Call
  async function finalizeDonation(paymentDetails) {
    try {
      showToast('Processing Seva Donation...', 'info');
      const confirmRes = await fetch('/api/confirm-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentDetails)
      });

      const confirmData = await confirmRes.json();
      if (confirmData.success) {
        showToast('Donation successful! Generating 80G Tax Receipt...', 'success');
        setTimeout(() => {
          window.location.href = `/download-receipt/${confirmData.receipt_no}`;
        }, 1200);
      } else {
        showToast(confirmData.message || 'Payment confirmation error.', 'error');
      }
    } catch (err) {
      showToast('Error recording donation payment.', 'error');
    }
  }

  // Handle Donation Submission & Payment Modal Trigger
  donationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const donorName = document.getElementById('donor_name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const amount = amountInput.value.trim();
    const category = document.getElementById('category').value;
    const panNumber = document.getElementById('pan_number').value.trim();

    if (!donorName || !phone || !amount || parseFloat(amount) <= 0) {
      showToast('Please provide your name, phone number, and a valid donation amount.', 'error');
      return;
    }

    // Prepare Donation Payload
    const tempReceiptNo = `SLP-REC-2026-${Math.floor(100 + Math.random() * 900)}`;
    activeDonationPayload = {
      receipt_no: tempReceiptNo,
      donor_name: donorName,
      phone,
      email,
      amount,
      category,
      pan_number: panNumber,
      payment_id: `pay_seva_${Date.now()}`,
      order_id: `order_seva_${Date.now()}`,
      signature: `mock_sig_${Date.now()}`
    };

    // Update Modal Details
    if (modalCategoryText) modalCategoryText.textContent = category;
    if (modalAmountText) modalAmountText.textContent = `₹${parseFloat(amount).toLocaleString('en-IN')}`;

    // Generate Dynamic UPI QR Code
    const upiString = `upi://pay?pa=saileelatrust@upi&pn=Shri%20Sai%20Leela%20Seva%20Trust&am=${amount}&cu=INR`;
    if (upiQrCodeImg) {
      upiQrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiString)}`;
    }

    // Open Modal
    if (modalBackdrop) {
      modalBackdrop.style.display = 'flex';
    }
  });

  // Handle Modal Confirm Payment Button Click
  if (btnConfirmSevaPayment) {
    btnConfirmSevaPayment.addEventListener('click', async () => {
      if (!activeDonationPayload) return;

      btnConfirmSevaPayment.disabled = true;
      btnConfirmSevaPayment.innerHTML = '<span>⏳ Issuing 80G Receipt...</span>';

      if (modalBackdrop) modalBackdrop.style.display = 'none';
      await finalizeDonation(activeDonationPayload);
    });
  }
});
