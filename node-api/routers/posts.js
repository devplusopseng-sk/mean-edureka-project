const router = require('express').Router({
    caseSensitive: true
});
const createPost = require('../middleware/createPost');
const fetchPostById = require('../middleware/fetchPostById');
const fetchPostByUserId = require('../middleware/fetchPostByUserId');
const fetchPosts = require('../middleware/fetchPosts');
const deletePostById = require('../middleware/deletePostById');

router.post('/createPost', createPost);
router.get('/:postId', fetchPostById);
router.post('/findpostbyuserid', fetchPostByUserId);
router.get('/', fetchPosts);
router.delete('/:id', deletePostById);

module.exports = router;