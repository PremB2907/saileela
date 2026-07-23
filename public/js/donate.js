document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.getElementById('donationForm');
  if (!donationForm) return;

  const amountInput = document.getElementById('donationAmount');
  const amountButtons = document.querySelectorAll('.btn-preset-amount');

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

  // Helper to complete donation and download 80G receipt
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

  // Handle Donation Submission & Payment Initiation
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

    const submitBtn = document.getElementById('btnDonateSubmit');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Opening Razorpay Gateway...</span>';
    }

    try {
      // Step 1: Create Payment Order on Backend
      const orderRes = await fetch('/api/create-donation-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, category, donor_name: donorName, phone })
      });

      const orderData = await orderRes.json();
      if (!orderData.success) {
        throw new Error(orderData.message || 'Payment initiation failed.');
      }

      const orderInfo = orderData.order;

      // Base payment payload for backend confirmation
      const paymentPayload = {
        receipt_no: orderData.receipt_no,
        donor_name: donorName,
        phone,
        email,
        amount,
        category,
        pan_number: panNumber
      };

      // Step 2: Configure Razorpay Checkout Options
      const options = {
        key: orderInfo.key_id,
        amount: orderInfo.amount,
        currency: orderInfo.currency,
        name: 'Shri Sai Leela Seva Trust',
        description: `Donation for ${category}`,
        image: '/images/trust-logo.png',
        handler: async function (response) {
          paymentPayload.payment_id = response.razorpay_payment_id || `pay_test_${Date.now()}`;
          paymentPayload.order_id = response.razorpay_order_id || orderInfo.order_id;
          paymentPayload.signature = response.razorpay_signature || `mock_sig_${Date.now()}`;
          await finalizeDonation(paymentPayload);
        },
        prefill: {
          name: donorName,
          email: email,
          contact: phone
        },
        theme: {
          color: '#D97706'
        }
      };

      // Only attach order_id if it's a real order ID created on Razorpay servers
      if (orderInfo.order_id && !orderInfo.order_id.startsWith('order_sim_')) {
        options.order_id = orderInfo.order_id;
      }

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (resp) {
          console.warn('Razorpay payment failed/cancelled:', resp.error);
          showToast('Payment cancelled or failed. You can try again.', 'error');
        });

        rzp.open();
      } else {
        showToast('Razorpay Checkout SDK not loaded in browser.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Error processing donation.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>💳 Proceed to Donate & Download 80G Receipt</span>';
      }
    }
  });
});
