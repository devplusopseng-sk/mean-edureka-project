const router = require('express').Router({
    caseSensitive: true
});

const registerUser = require('../middleware/registerUser');
const authenticate = require('../middleware/authenticate');
const fetchUsers = require('../middleware/fetchUsers');
const fetchUserById = require('../middleware/fetchUserById');
const fetchUserByEmail = require('../middleware/fetchUserByEmail');
const updateuserphotoId = require('../middleware/updateuserphotoId');
const updateUser = require('../middleware/updateUser');
const changePassword = require('../middleware/changePassword');
const fetchIsUsr = require('../middleware/fetchIsUsr');

router.post('/register', registerUser);
router.post('/authenticate', authenticate);
router.get('/', fetchUsers);
router.post('/finduserbyemail', fetchUserByEmail);
router.post('/updateuserphotoId', updateuserphotoId);
router.put('/changePassword', changePassword);
router.put('/:userId', updateUser);
router.get('/:userId', fetchUserById);
router.post('/authCheck', fetchIsUsr);

module.exports = router;