const Merks = require('../../api/v1/merks/model');

const { BadRequestError, NotFoundError } = require('../../errors');

const getAllMerks = async () => {
  const result = await Merks.find();

  return result;
};

const getOneByIdMerks = async (req) => {
  const { id } = req.params;

  const result = await Merks.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  return result;
};
const createMerks = async (req) => {
  const { name } = req.body;

  const checkName = await Merks.findOne({ name: name });

  if (checkName) throw new BadRequestError(`Merk sudah terdaftar:`);

  const result = await Merks.create({
    name: name,
  });

  return result;
};
const editMerks = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Merks.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError(`Merk sudah terdaftar`);

  const result = await Merks.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  return result;
};

const deleteMerks = async (req) => {
  const { id } = req.params;

  const result = await Merks.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  await result.deleteOne();

  return result;
};

const checkingMerks = async (id) => {
  const result = await Merks.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada merk dengan id: ${id}`);

  return result;
};

module.exports = {
  getAllMerks,
  getOneByIdMerks,
  createMerks,
  editMerks,
  deleteMerks,
  checkingMerks,
};
