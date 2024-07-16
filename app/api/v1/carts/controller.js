const { StatusCodes } = require('http-status-codes');

const {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} = require('../../../services/mongoose/carts');

const index = async (req, res, next) => {
  try {
    const result = await getCart(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await addToCart(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeCart = async (req, res, next) => {
  try {
    const result = await removeFromCart(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const clear = async (req, res, next) => {
  try {
    const result = await clearCart(req);
    res.status(StatusCodes.OK).json({
      data: result,
      message: 'Data berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clear,
  removeCart,
  create,
  index,
};
