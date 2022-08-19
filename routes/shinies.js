const express = require('express');
const router = express.Router();
const shinyListController = require('../controllers/shinies');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, shinyListController.index);
router.post('/', isLoggedIn, shinyListController.add);
router.delete('/:id', isLoggedIn, shinyListController.delete);
router.put('/:id', isLoggedIn, shinyListController.edit);

module.exports = router;