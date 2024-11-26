const express = require('express');
const router = express.Router();
const { createCommentToLocalOrService, updateUserCommentOnLocalOrService, deleteCommentUserOnLocalOrService } = require('../controllers/CommentToLocalService.controller');

router.put('/createCommentToLocalService/:id_local_service/:id_user',createCommentToLocalOrService);

// Route to update a user's comment to a post
router.put('/updateCommentUser/:id_local_service/:id_comment', updateUserCommentOnLocalOrService);

// Route to delete a user´s comment to a post
router.delete('/deleteCommentUserToLocalService/:id_local_service/:id_comment', deleteCommentUserOnLocalOrService); 


module.exports = router;