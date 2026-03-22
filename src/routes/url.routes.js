const express = require('express');
const { shortenUrl, getUrls, searchUrls } = require('../controllers/url.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// All URL routes require authentication
router.use(protect);

router.post('/shorten', shortenUrl);
router.get('/info', getUrls);
router.get('/search', searchUrls);

module.exports = router;
