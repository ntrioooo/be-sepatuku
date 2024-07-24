const express = require('express');
const router = express();
const { create, notification } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.post('/payments', authenticateUser, authorizeRoles('user'), create);

router.post('/midtrans/notification', notification);

module.exports = router;
