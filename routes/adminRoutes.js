const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.renderDashboard);
router.post('/admin/api/verify-pass', adminController.verifyPassApi);
router.post('/admin/broadcast-sms', adminController.sendBroadcastSMS);

module.exports = router;
