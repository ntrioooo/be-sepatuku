const express = require('express');
const router = express();
const { create, index, find, changeStatus } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/orders', authenticateUser, authorizeRoles('admin', 'user'), index);
router.get('/orders/:id', authenticateUser, authorizeRoles('user'), find);
router.post('/orders', authenticateUser, authorizeRoles('user'), create);
router.put(
  '/orders/:id/status',
  authenticateUser,
  authorizeRoles('admin', 'user'),
  changeStatus
);

module.exports = router;
