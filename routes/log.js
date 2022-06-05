const express = require('express');
const router = express.Router();

const logController = require('../controllers/LogController.js');

router.get('/', logController.index);

module.exports = router;