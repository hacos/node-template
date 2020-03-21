const router = require('express').Router();
const debug = require('debug')('routes:widgets');

const { widgetController } = require('../controllers');

// Widgets
router.get('/', widgetController.list);
router.get('/:name', widgetController.get);
router.post('/', widgetController.post);
router.put('/:name', widgetController.put);
router.delete('/:name', widgetController.delete);

module.exports = router;
