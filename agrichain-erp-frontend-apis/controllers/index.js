var express = require('express'),
router = express.Router();

router.use('/batch', require('./BatchController'));
router.use('/', require('./AdminController')); // admin

module.exports = router
