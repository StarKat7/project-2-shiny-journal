const express = require('express');
const router = express.Router();
const shinyListController = require('../controllers/shinies');

router.get('/', shinyListController.index);
router.post('/', shinyListController.add);

module.exports = router;