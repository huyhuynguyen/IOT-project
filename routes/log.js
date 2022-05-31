const express = require('express');
const router = express.Router();

const logController = require('../controllers/LogController.js');

router.post('/', logController.create);
router.get('/', logController.index);

module.exports = router;