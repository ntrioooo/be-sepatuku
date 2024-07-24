const { StatusCodes } = require('http-status-codes');

const {
  createPayment,
  handleMidtransNotification,
} = require('../../../services/mongoose/payments');

const create = async (req, res, next) => {
  try {
    const result = await createPayment(req);

    res.status(StatusCodes.CREATED).json({
      data: result.result,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};

const notification = async (req, res, next) => {
  try {
    const result = await handleMidtransNotification(req);

    console.log(result);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { create, notification };
