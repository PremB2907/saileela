const express = require('express');
const router = express.Router();

// Redirect VIP pass endpoints to Schedule & Ganeshotsav Portal
router.get('/register-pass', (req, res) => res.redirect('/schedule'));
router.get('/pass-status', (req, res) => res.redirect('/schedule'));

module.exports = router;
