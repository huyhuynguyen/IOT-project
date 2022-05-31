const express = require('express');
const router = express.Router();

const chartController = require('../controllers/ChartController.js');

router.get('/', chartController.index);

module.exports = router;