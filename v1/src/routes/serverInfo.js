const express = require('express');
const router = express.Router();
const ServerInfoController = require('../controllers/ServerInfoController');

router.get('/', ServerInfoController.getServerInfo);

module.exports = router;
