const Payment = require('../../api/v1/payments/model');
const snap = require('../../utils/midtrans');
const { isTransactionValid } = require('../../middlewares/isTransactionValid');
const { BadRequestError, NotFoundError } = require('../../errors');

const createPayment = async (req) => {
  const { items, totalAmount } = req.body;

  const result = new Payment({
    user: req.user.id,
    items,
    totalAmount,
    transactionId: Math.floor(Math.random() * 1000000000000).toString(),
    paymentStatus: 'pending',
  });

  await result.save();

  const transactionDetails = items.map((item) => ({
    id: item.itemId,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
  }));

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: result._id,
      gross_amount: totalAmount,
    },
    item_details: transactionDetails,
    customer_details: {
      user_id: req.user.id,
    },
  });

  return {
    result,
    token: transaction.token,
  };
};

const handleMidtransNotification = async (req) => {
  const notification = req.body;
  const isValid = await isTransactionValid(notification);

  if (!isValid) {
    throw new BadRequestError(`Invalid transaction`);
  }

  const { order_id, transaction_status } = notification;

  const payment = await Payment.findOne({ _id: order_id });

  if (!payment) {
    throw new NotFoundError(`Payment not found`);
  }

  if (transaction_status === 'capture' || transaction_status === 'settlement') {
    payment.paymentStatus = 'paid';
  } else if (
    transaction_status === 'deny' ||
    transaction_status === 'cancel' ||
    transaction_status === 'expire'
  ) {
    payment.paymentStatus = 'failed';
  } else if (transaction_status === 'pending') {
    payment.paymentStatus = 'pending';
  }

  await payment.save();

  return payment;
};

module.exports = {
  createPayment,
  handleMidtransNotification,
};
