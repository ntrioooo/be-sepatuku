const express = require('express');
const router = express();
const { clear, create, index, removeCart } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/carts', authenticateUser, authorizeRoles('user'), index);

// Route untuk menambah item ke cart
router.post('/carts', authenticateUser, authorizeRoles('user'), create);

// Route untuk menghapus item dari cart
router.delete('/carts', authenticateUser, authorizeRoles('user'), removeCart);

// Route untuk membersihkan semua item dalam cart
router.delete('/carts/clear', authenticateUser, authorizeRoles('user'), clear);

module.exports = router;
