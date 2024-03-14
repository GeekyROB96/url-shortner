const express = require('express');

const router = express.Router();

const urlcontroller = require('../controllers/url');
const url = require('../controllers/url');


router.post('/',urlcontroller.handleGenerateNewShortUrl);

router.get('/analytics/:shortId',urlcontroller.handleGetAnalytics);


module.exports = router;