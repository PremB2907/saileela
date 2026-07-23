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
      submitBtn.innerHTML = '<span>⏳ Processing Payment...</span>';
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

      // Step 2: Configure Razorpay Checkout Options
      const options = {
        key: orderInfo.key_id,
        amount: orderInfo.amount,
        currency: orderInfo.currency,
        name: 'Shri Sai Leela Seva Trust',
        description: `Donation for ${category}`,
        image: '/images/trust-logo.png',
        order_id: orderInfo.order_id,
        handler: async function (response) {
          // Step 3: Send Payment Confirmation to Backend
          try {
            const confirmRes = await fetch('/api/confirm-donation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                receipt_no: orderData.receipt_no,
                donor_name: donorName,
                phone,
                email,
                amount,
                category,
                payment_id: response.razorpay_payment_id || `pay_sim_${Date.now()}`,
                order_id: response.razorpay_order_id || orderInfo.order_id,
                signature: response.razorpay_signature || `mock_sig_${Date.now()}`,
                pan_number: panNumber
              })
            });

            const confirmData = await confirmRes.json();
            if (confirmData.success) {
              showToast('Donation successful! Redirecting to receipt...', 'success');
              setTimeout(() => {
                window.location.href = `/download-receipt/${confirmData.receipt_no}`;
              }, 1500);
            } else {
              showToast(confirmData.message || 'Payment confirmation error.', 'error');
            }
          } catch (err) {
            showToast('Error recording donation payment.', 'error');
          }
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

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback simulation if Razorpay script is blocked or offline
        console.log('Razorpay Checkout SDK not loaded, triggering instant donation confirmation simulation.');
        setTimeout(() => {
          options.handler({
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            razorpay_order_id: orderInfo.order_id,
            razorpay_signature: `mock_sig_${Date.now()}`
          });
        }, 1000);
      }
    } catch (err) {
      showToast(err.message || 'Error processing donation.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>💳 Proceed to Donate</span>';
      }
    }
  });
});
