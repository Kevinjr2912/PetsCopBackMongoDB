const express = require('express');
const router = express.Router();
const { createCommentToLocalOrService, createReplyToUserComment, updateUserCommentOnLocalOrService, updateReplyUserComment, deleteCommentUserOnLocalOrService, deleteReplyComment } = require('../controllers/CommentToLocalService.controller');

router.put('/createCommentToLocalService/:id_local_service/:id_user',createCommentToLocalOrService);

// Route to create a reply to a user's comment
router.put('/createReplyToComment/:id_local_service/:id_comment/:id_user', createReplyToUserComment);

// Route to update a user's comment to a post
router.put('/updateCommentUser/:id_local_service/:id_comment', updateUserCommentOnLocalOrService);

// Route to update a reply to a comment regarding a user
router.put('/updateReplyComment/:id_local_service/:id_comment/:id_response_comment', updateReplyUserComment);

// Route to delete a user´s comment to a post
router.delete('/deleteCommentUserToLocalService/:id_local_service/:id_comment', deleteCommentUserOnLocalOrService); 

// Route to delete a reply to a comment regarding a user
router.delete('/deleteReplyComment/:id_local_service/:id_comment/:id_response_comment', deleteReplyComment);

module.exports = router;