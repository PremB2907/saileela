const express = require('express');
const router = express.Router();
const yatraController = require('../controllers/yatraController');
const tshirtController = require('../controllers/tshirtController');

// Home & Event Routes
router.get('/', yatraController.renderHomePage);
router.get('/schedule', yatraController.renderSchedulePage);
router.get('/api/live-status', yatraController.getLiveStatusApi);

// Contact Us Page (Chinchpokli Cha Chintamani Style)
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'आमचे संपर्क | Mumbai Central Cha Raja Official',
    activeTab: 'contact'
  });
});

// Official T-Shirt & Merchandise Store Routes
router.get('/tshirt', tshirtController.renderTshirtPage);
router.post('/tshirt/create-order', tshirtController.createPaymentOrder);
router.post('/tshirt/confirm', tshirtController.confirmTshirtOrder);
router.get('/download-tshirt-receipt/:receiptNo', tshirtController.downloadTshirtReceipt);

module.exports = router;
