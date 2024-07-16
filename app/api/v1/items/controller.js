const { StatusCodes } = require('http-status-codes');

const {
  getAllItems,
  createItems,
  getOneByIdItems,
  deleteItems,
  editItems,
} = require('../../../services/mongoose/items');

const index = async (req, res, next) => {
  try {
    const result = await getAllItems(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createItems(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneByIdItems(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editItems(req);
    res.status(StatusCodes.OK).json({
      data: result,
      message: 'Data berhasil diupdate',
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteItems(req);
    res.status(StatusCodes.OK).json({
      data: result,
      message: 'Data berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
  find,
  update,
  destroy,
};
