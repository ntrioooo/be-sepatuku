const { StatusCodes } = require('http-status-codes');

const {
  getAllOrders,
  createOrders,
  getOrderById,
  updateOrderStatus,
} = require('../../../services/mongoose/orders');

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createOrders(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOrderById(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const result = await updateOrderStatus(req);
    res.status(StatusCodes.OK).json({
      data: result,
      message: 'Data berhasil diupdate',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
  find,
  changeStatus,
};
