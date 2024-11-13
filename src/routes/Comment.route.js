const express = require('express');
const router = express.Router();
const { createCommentToPost, createReplyToUSerComment , updateUserCommentOnPost, updateReplyUserComment, deleteCommentUserOnPost, deleteReplyComment } = require('../controllers/Comment.controller');

// Route to create a comment within a post
router.put('/createCommentToPost/:id_post/:id_user', createCommentToPost);

// Route to create a reply to a user's comment
router.put('/createReplyToComment/:id_post/:id_comment/:id_user', createReplyToUSerComment);

// Route to update a user's comment to a post
router.put('/updateCommentUser/:id_post/:id_comment', updateUserCommentOnPost);

// Route to update a reply to a comment regarding a user
router.put('/updateReplyComment/:id_post/:id_comment/:id_response_comment', updateReplyUserComment);

// Route to delete a user´s comment to a post
router.delete('/deleteCommentUserToPost/:id_post/:id_comment', deleteCommentUserOnPost); 

// Route to delete a reply to a comment regarding a user
router.delete('/deleteReplyComment/:id_post/:id_comment/:id_response_comment', deleteReplyComment);

module.exports = router;