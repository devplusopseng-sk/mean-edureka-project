const router = require('express').Router({
    caseSensitive: true
});
const createFriendRequest = require('../middleware/createFriendRequest');
const updateFrndReqById = require('../middleware/updateFrndReqById');
const fetchFriends = require('../middleware/fetchFriends');
const fetchFrndById = require('../middleware/fetchFrndById');

router.post('/createrequest', createFriendRequest);
router.put('/:id', updateFrndReqById);
router.get('/', fetchFriends);
router.get('/:id', fetchFrndById);

module.exports = router;