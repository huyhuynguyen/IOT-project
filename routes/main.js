const express = require('express');
const router = express.Router();

const mainController = require('../controllers/MainController.js');

router.get('/', mainController.index);

module.exports = router;