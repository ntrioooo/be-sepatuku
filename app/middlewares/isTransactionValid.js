const midtransClient = require('midtrans-client');
const { serverKeyMidtrans, clientKeyMidtrans } = require('../config');

const isTransactionValid = async (notification) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKeyMidtrans || '',
      clientKey: clientKeyMidtrans || '',
    });

    const transactionStatus = await snap.transaction.status(
      notification.order_id
    );

    return transactionStatus.status_code === '200';
  } catch (err) {
    console.error('Error validating transaction:', err);
    return false;
  }
};

module.exports = { isTransactionValid };
