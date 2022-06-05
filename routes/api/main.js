const express = require('express');
const router = express.Router();

const mainController = require('../../controllers/MainController.js');

router.put('/sensors', mainController.updateSensors);
router.get('/controls/led', mainController.getLed);
router.get('/controls/pump', mainController.getPump);
router.get('/controls/servo', mainController.getServo);
router.get('/sensors', mainController.getSensors);
router.post('/sensor/change-control-device-status', mainController.changeControlDeviceStatus);

module.exports = router;