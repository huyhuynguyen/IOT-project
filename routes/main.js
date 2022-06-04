const express = require('express');
const router = express.Router();

const mainController = require('../controllers/MainController.js');

router.put('/sensors', mainController.updateSensors);
router.post('/sensor/change-led-status', mainController.changeLedStatus);
router.get('/', mainController.index);

module.exports = router;