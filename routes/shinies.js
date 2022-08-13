const express = require('express');
const router = express.Router();
const shinyListController = require('../controllers/shinies');

router.get('/', shinyListController.index);

module.exports = router;