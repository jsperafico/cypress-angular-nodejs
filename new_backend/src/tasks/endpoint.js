const express = require('express');
const router = express.Router();
const {TaskController} = require('./controller');

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getEntry);
router.post('/', TaskController.addEntry);
router.delete('/:id', TaskController.deleteEntry);
router.patch('/:id', TaskController.updateEntry);

module.exports = router;