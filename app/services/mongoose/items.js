const Items = require('../../api/v1/items/model');

const { checkingMerks } = require('./merks');

const { BadRequestError, NotFoundError } = require('../../errors');

const getAllItems = async (req) => {
  const { keyword, merk } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
  }

  if (merk) {
    condition = { ...condition, merk: merk };
  }

  const result = await Items.find(condition).populate({
    path: 'merk',
    select: '_id name',
  });

  return result;
};

const createItems = async (req) => {
  const { name, price, stock, merk } = req.body;

  await checkingMerks(merk);

  const check = await Items.findOne({ name });

  if (check) throw new BadRequestError('Nama item sudah terdaftar');

  const result = await Items.create({
    name,
    price,
    stock,
    merk,
  });

  return result;
};

const getOneByIdItems = async (req) => {
  const { id } = req.params;

  const result = await Items.findOne({
    _id: id,
  }).populate({
    path: 'merk',
    select: '_id name',
  });

  if (!result) throw new NotFoundError(`Tidak ada item dengan id: ${id}`);

  return result;
};

const editItems = async (req) => {
  const { id } = req.params;
  const { name, price, stock, merk } = req.body;

  await checkingMerks(merk);

  const check = await Items.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError(`Item sudah terdaftar`);

  const result = await Items.findOneAndUpdate(
    { _id: id },
    { name, price, stock, merk },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  return result;
};

const deleteItems = async (req) => {
  const { id } = req.params;

  const result = await Items.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  await result.deleteOne();

  return result;
};

const checkingItems = async (id) => {
  const result = await Items.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada item dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllItems,
  createItems,
  getOneByIdItems,
  editItems,
  deleteItems,
  checkingItems,
};
