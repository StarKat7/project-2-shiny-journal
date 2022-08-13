const express = require('express');
const router = express.Router();
const successListController = require('../controllers/successes');

router.get('/', successListController.index);

module.exports = router;