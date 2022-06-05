const express = require('express');
const router = express.Router();

const dashboardController = require('../../controllers/DashboardController.js');

router.put('/device/:id', dashboardController.update)
router.get('/', dashboardController.indexApi);

module.exports = router;