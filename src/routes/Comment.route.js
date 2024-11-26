const express = require('express');
const router = express.Router();
const { createCommentToPost, updateUserCommentOnPost, deleteCommentUserOnPost } = require('../controllers/Comment.controller');

// Route to create a comment within a post
router.put('/createCommentToPost/:id_post/:id_user', createCommentToPost);

// Route to update a user's comment to a post
router.put('/updateCommentUser/:id_post/:id_comment', updateUserCommentOnPost);

// Route to delete a user´s comment to a post
router.delete('/deleteCommentUserToPost/:id_post/:id_comment', deleteCommentUserOnPost); 


module.exports = router;