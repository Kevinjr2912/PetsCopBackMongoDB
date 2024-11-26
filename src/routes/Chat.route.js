const express = require('express');
const router = express.Router();
const chatController = require('../controllers/Chat.controller');

// Route to init a Chat
router.post('/init', chatController.initChat);

// Route to get Chats by ID of a user
router.get('/get_by_user/:id_user', chatController.getChats);

module.exports = router;