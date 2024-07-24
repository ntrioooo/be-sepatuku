const midtransClient = require('midtrans-client');
const { serverKeyMidtrans, clientKeyMidtrans } = require('../config');

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: serverKeyMidtrans || '',
  clientKey: clientKeyMidtrans || '',
});

module.exports = snap;
