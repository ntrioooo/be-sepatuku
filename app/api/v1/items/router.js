const express = require('express');
const router = express();
const { index, create, find, update, destroy } = require('./controller');

router.get('/items', index);
router.get('/items/:id', find);
router.post('/items', create);
router.put('/items/:id', update);
router.delete('/items/:id', destroy);

module.exports = router;
