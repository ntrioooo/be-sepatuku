const express = require('express');
const router = express();
const {
  clear,
  create,
  index,
  removeCart,
  updateCartQuantity,
  updateCartCheck,
} = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/carts', authenticateUser, authorizeRoles('user'), index);

router.post('/carts', authenticateUser, authorizeRoles('user'), create);

router.put(
  '/carts/:itemId',
  authenticateUser,
  authorizeRoles('user'),
  updateCartQuantity
);

router.put(
  '/carts/updateChecked/:itemId',
  authenticateUser,
  authorizeRoles('user'),
  updateCartCheck
);

router.delete(
  '/carts/:itemId',
  authenticateUser,
  authorizeRoles('user'),
  removeCart
);

router.delete('/carts/clear', authenticateUser, authorizeRoles('user'), clear);

module.exports = router;
