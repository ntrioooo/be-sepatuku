const { StatusCodes } = require('http-status-codes');

const {
  createReview,
  deleteReview,
  getAllReviews,
} = require('../../../services/mongoose/reviews');

const index = async (req, res, next) => {
  try {
    const result = await getAllReviews(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createReview(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteReview(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  create,
  destroy,
};
