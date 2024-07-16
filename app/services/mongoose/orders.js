const Orders = require('../../api/v1/orders/model');
const { checkingItems } = require('./items');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllOrders = async (req) => {
  const { keyword } = req.query;

  let condition = {};

  if (keyword) {
    condition = {
      ...condition,
      'orderItems.item.name': { $regex: keyword, $options: 'i' },
    };
  }

  if (req.user.role !== 'admin') {
    condition = { ...condition, user: req.user.id };
  }

  const result = await Orders.find(condition)
    .populate({
      path: 'orderItems.item',
      select: '_id name',
    })
    .populate({
      path: 'user',
      select: '_id firstName lastName',
    });

  return result;
};

const createOrders = async (req) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  const user = req.user.id;
  const itemsWithDetails = await Promise.all(
    orderItems.map(async (orderItem) => {
      const item = await checkingItems(orderItem.item);
      return {
        ...orderItem,
        price: item.price,
      };
    })
  );

  const totalPrice = itemsWithDetails.reduce((total, orderItem) => {
    return total + orderItem.price * orderItem.quantity;
  }, 0);

  const result = await Orders.create({
    user,
    orderItems: itemsWithDetails,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  return result;
};

const getOrderById = async (req) => {
  const { id } = req.params;

  const result = await Orders.findOne({ _id: id })
    .populate({
      path: 'orderItems.item',
      select: '_id name',
    })
    .populate({
      path: 'user',
      select: '_id firstName lastName',
    });

  if (!result) throw new NotFoundError(`Tidak ada order dengan id: ${id}`);

  return result;
};

const updateOrderStatus = async (req) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await Orders.findByIdAndUpdate(
    { _id: id },
    { status },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada order dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllOrders,
  createOrders,
  getOrderById,
  updateOrderStatus,
};
