const express = require('express');
const router = express.Router();
const { createPostForLostPet, createPostForPetAdoption, getRecentPosts, getOldPosts, getRecentPostsType, getOldPostsType } = require('../controllers/Post.controller');

// Route to create a post for a lost pet
router.post('/createPostLosePet', createPostForLostPet);

// Route to create a post of a pet for a adoption
router.post('/createPostPetAdoption', createPostForPetAdoption);

// Route to get all recent posts
router.get('/getAllRecentPosts', getRecentPosts);

// Route to get all old posts
router.get('/getAllOldPosts', getOldPosts);

// Route to get all recent post of a type
router.get('/getRecentPostsType/:post_type', getRecentPostsType);

// Route to get all old post of a type
router.get('/getOldPostsType/:post_type', getOldPostsType);

module.exports = router;