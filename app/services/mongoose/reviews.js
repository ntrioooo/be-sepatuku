const Reviews = require('../../api/v1/reviews/model');
const { checkingItems } = require('./items');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllReviews = async (req) => {
  const { item } = req.query;
  let condition = {};

  if (item) {
    condition = { ...condition, item };
  }

  const result = await Reviews.find(condition)
    .populate({
      path: 'user',
      select: '_id firstName lastName',
    })
    .populate({
      path: 'item',
      select: '_id name',
    });

  return result;
};

const createReview = async (req) => {
  const { item, rating, comment } = req.body;

  await checkingItems(item);

  const checkReview = await Reviews.findOne({ user: req.user.id, item });

  if (checkReview)
    throw new BadRequestError('Anda sudah memberikan ulasan untuk item ini');

  const result = await Reviews.create({
    user: req.user.id,
    item,
    rating,
    comment,
  });

  return result;
};

const deleteReview = async (req) => {
  const { id } = req.params;

  const result = await Reviews.findOne({
    _id: id,
    user: req.user.id,
  });

  if (!result) throw new NotFoundError('Ulasan tidak ditemukan');

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllReviews,
  createReview,
  deleteReview,
};
