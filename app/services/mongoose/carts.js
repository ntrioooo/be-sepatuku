const Cart = require('../../api/v1/carts/model');
const { checkingItems } = require('./items');
const { NotFoundError } = require('../../errors');

const getCart = async (req) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'items.item',
    select: '_id name price',
  });

  if (!cart) throw new NotFoundError('Cart tidak ditemukan');

  return cart;
};

const addToCart = async (req) => {
  const { item, color, size, quantity } = req.body;

  const userId = req.user.id;

  await checkingItems(item);

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (i) => i.item.toString() === item && i.color === color && i.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ item, color, size, quantity });
    }
  } else {
    cart = await Cart.create({
      user: req.user.id,
      items: [{ item, color, size, quantity }],
    });
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (req) => {
  const { itemId, color, size } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new NotFoundError('Cart not found');

  const itemIndex = cart.items.findIndex(
    (item) =>
      item.itemId.toString() === itemId &&
      item.color === color &&
      item.size === size
  );

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return cart;
  } else {
    throw new NotFoundError('Item not found in cart');
  }
};

const clearCart = async (req) => {
  const userId = req.user.id;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: [] },
    { new: true }
  );

  if (!cart) throw new NotFoundError('Cart not found');

  return cart;
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
