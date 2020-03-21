const router = require('express').Router();
const debug = require('debug')('routes:ui');

const { uiController } = require('../controllers');

// Widgets
router.get('/new', uiController.new);
router.get('/', uiController.list);
router.get('/:name', uiController.get);
router.post('/', uiController.post);
router.put('/:name', uiController.put);
router.delete('/:name', uiController.delete);

module.exports = router;
