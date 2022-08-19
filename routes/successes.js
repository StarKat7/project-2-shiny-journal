const express = require('express');
const router = express.Router();
const successListController = require('../controllers/successes');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, successListController.index);
router.post('/', isLoggedIn, successListController.add);
router.delete('/:id', isLoggedIn, successListController.delete);
router.put('/:id', isLoggedIn, successListController.edit);

module.exports = router;