const express = require('express');
const router = express.Router();
const yatraController = require('../controllers/yatraController');

router.get('/', yatraController.renderHomePage);
router.get('/schedule', yatraController.renderSchedulePage);
router.get('/api/live-status', yatraController.getLiveStatusApi);

module.exports = router;
