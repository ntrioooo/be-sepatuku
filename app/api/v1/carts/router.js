const express = require('express');
const router = express();
const { clear, create, index, removeCart } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/cart', authenticateUser, authorizeRoles('user'), index);

// Route untuk menambah item ke cart
router.post('/cart', authenticateUser, authorizeRoles('user'), create);

// Route untuk menghapus item dari cart
router.delete('/cart', authenticateUser, authorizeRoles('user'), removeCart);

// Route untuk membersihkan semua item dalam cart
router.delete('/cart/clear', authenticateUser, authorizeRoles('user'), clear);

module.exports = router;
