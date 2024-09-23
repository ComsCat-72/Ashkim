const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/auth');

router.post('/create', auth, groupController.createGroup);
router.get('/:groupId/messages', auth, groupController.getMessages);
router.post('/:groupId/message', auth, groupController.sendMessage);

module.exports = router;
