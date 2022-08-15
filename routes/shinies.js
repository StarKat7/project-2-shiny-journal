const express = require('express');
const router = express.Router();
const shinyListController = require('../controllers/shinies');

router.get('/', shinyListController.index);
router.post('/shinies/add', shinyListController.add);

module.exports = router;