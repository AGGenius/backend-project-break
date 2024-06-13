const express = require('express');
const router = express.Router();

router.use('/', require('./productRoutes'));
router.use('/login', require('./authRoutes'));
router.use('/api', require('./api'));

module.exports = router