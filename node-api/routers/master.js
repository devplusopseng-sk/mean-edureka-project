const router = require('express').Router({
    caseSensitive: true
});
const fetchDocMaster = require('../middleware/fetchDocMaster');

router.get('/', fetchDocMaster);

module.exports = router;