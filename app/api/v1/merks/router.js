const express = require('express');
const router = express();
const { create, destroy, find, index, update } = require('./controller');

router.get('/merks', index)
router.get('/merks/:id', find)
router.post('/merks', create)
router.put('/merks/:id', update)
router.delete('/merks/:id', destroy)

module.exports = router;
