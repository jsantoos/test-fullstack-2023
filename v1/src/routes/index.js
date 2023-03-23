const express = require('express');
const router = express.Router();

const serverInfoRoutes = require('./serverInfo');
const userRoutes = require('./users');

router.use('/server-info', serverInfoRoutes);
router.use('/users', userRoutes);

module.exports = router;
