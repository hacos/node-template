const router = require('express').Router();
const locals = require('../middlewares/locals');

// API
router.use('/v1', require('../middlewares/token'), require('./api'))

// UI
router.use(locals());
router.get('/', (req, res, next) => res.render('index')); // Home page
router.use('/widgets', require('./ui'));

module.exports = router;
