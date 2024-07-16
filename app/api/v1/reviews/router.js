const express = require('express');
const router = express();
const { destroy, create, index } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/cart', authenticateUser, authorizeRoles('user', 'admin'), index);

// Route untuk menambah item ke cart
router.post('/cart', authenticateUser, authorizeRoles('user'), create);

// Route untuk menghapus item dari cart
router.delete('/cart', authenticateUser, authorizeRoles('admin'), destroy);

module.exports = router;
