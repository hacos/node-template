const router = require('express').Router();
const debug = require('debug')('routes:api');

// Widgets
router.use('/widgets', require('./widgets'));

module.exports = router;
