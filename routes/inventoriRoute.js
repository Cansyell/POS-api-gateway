const express = require('express');
const router = express.Router();
const proxy = require('../proxy/ProxyHandler');

router.all('/*', proxy);
module.exports = router;