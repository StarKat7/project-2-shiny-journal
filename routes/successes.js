const express = require('express');
const router = express.Router();
const successListController = require('../controllers/successes');

router.get('/', successListController.index);
router.post('/', successListController.add);
router.delete('/:id', successListController.delete);

module.exports = router;