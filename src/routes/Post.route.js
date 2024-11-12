const express = require('express');
const router = express.Router();
const { createPostForLostPet, createPostForPetAdoption, getRecentPosts, getOldPosts, getRecentPostsType, getOldPostsType, getPostByIdUser, searchPosts, updateLostPetPostUpdateFound, deletePostOfAUser, updateInformationPost } = require('../controllers/Post.controller');

// Route to create a post for a lost pet
router.post('/createPostLosePet', createPostForLostPet);

// Route to create a post of a pet for a adoption
router.post('/createPostPetAdoption', createPostForPetAdoption);

// Route to get all recent posts
router.get('/getAllRecentPosts', getRecentPosts);

// Route to get all old posts
router.get('/getAllOldPosts', getOldPosts);

// Route to get all recent post of a type
router.post('/getRecentPostsType/:post_type', getRecentPostsType);

// Route to get all old post of a type
router.post('/getOldPostsType/:post_type', getOldPostsType);

// Route to get the posts of a user
router.post('/getPostsUser/:id_user', getPostByIdUser);

// Route to get the posts for a description
router.post('/searchPost', searchPosts);

// Route to updating a post
router.put('/updateInformationPost/:id_post', updateInformationPost);

// Route to updating a post from a lost pet to a found pet
router.put('/updatePostLostPetToFoundPet/:id_post', updateLostPetPostUpdateFound);

// Route to delete a user's post
router.delete('/deletePost/:id_post', deletePostOfAUser);

module.exports = router;