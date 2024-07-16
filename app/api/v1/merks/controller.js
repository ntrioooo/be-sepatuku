const { StatusCodes } = require('http-status-codes');

const {
  checkingMerks,
  createMerks,
  deleteMerks,
  editMerks,
  getAllMerks,
  getOneByIdMerks,
} = require('../../../services/mongoose/merks');

const index = async (req, res, next) => {
  try {
    const result = await getAllMerks();
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createMerks(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneByIdMerks(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await editMerks(req);
    res.status(StatusCodes.OK).json({
      data: result,
      message: 'Merk berhasil diupdate',
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteMerks(req);
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
