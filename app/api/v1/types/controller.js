const Types = require('./model');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Types.create({ name });

    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Types.find().select('_id name');
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Types.findOne({ _id: id }).select('_id name');

    if (!result) {
      return res.status(404).json({
        message: 'ID not found',
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await Types.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });

    if (!result) {
      return res.status(404).json({
        message: 'ID not found',
      });
    }

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Types.findOneAndRemove({ _id: id });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};
