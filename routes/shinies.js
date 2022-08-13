const express = require('express');
const router = express.Router();
const shinyListController = require('../controllers/shinies');

router.get('/shinies', shinyListController.index)

module.exports = router;