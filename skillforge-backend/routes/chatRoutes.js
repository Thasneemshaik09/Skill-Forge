const express = require('express');
const router = express.Router();
const { chatWithGemini } = require('../controllers/chatController');

// POST /api/chat
router.post('/', chatWithGemini);

module.exports = router;
