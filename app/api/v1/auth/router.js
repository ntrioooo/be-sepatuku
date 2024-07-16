const express = require('express');
const router = express();
const { login, register } = require('./controller');

router.post('/auth/signin', login);
router.post('/auth/signup', register);

module.exports = router;
