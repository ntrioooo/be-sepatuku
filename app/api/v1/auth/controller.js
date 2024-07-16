const { signIn, signUp } = require('../../../services/mongoose/auth');

const { StatusCodes } = require('http-status-codes');

const login = async (req, res, next) => {
  try {
    const result = await signIn(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const result = await signUp(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
