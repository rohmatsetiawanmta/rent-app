const Types = require('../../api/v1/types/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllTypes = async () => {
  const result = await Types.find();
  return result;
};

const createTypes = async (req) => {
  const { name } = req.body;
  const check = await Types.findOne({ name });
  if (check) throw new BadRequestError('Kategori sudah ada');

  const result = await Types.create({ name });
  return result;
};

const getOneTypes = async (req) => {
  const { id } = req.params;
  const result = await Types.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan ID ${id}`);

  return result;
};

const updateTypes = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Types.findOne({ name, _id: { $ne: id } });
  if (check) throw new BadRequestError('Kategori sudah ada');

  const result = await Types.findOneAndUpdate({ _id: id }, { name }, { new: true, runValidators: true });
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan ID ${id}`);

  return result;
};

const deleteTypes = async (req) => {
  const { id } = req.params;

  const result = await Types.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada kategori dengan ID ${id}`);

  await result.deleteOne();
  return result;
};

module.exports = { getAllTypes, createTypes, getOneTypes, updateTypes, deleteTypes };
