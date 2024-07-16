const Users = require('../../api/v1/users/model');
const {
  BadRequestError,
  UnauthorizedError,
  UnauthenticationError,
} = require('../../errors');
const { createTokenUsers, createJWT } = require('../../utils');

const signIn = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email dan password harus diisi');
  }

  const result = await Users.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = createJWT({ payload: createTokenUsers(result) });

  return {
    token,
    role: result.role,
  };
};

const signUp = async (req) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new BadRequestError(
      'Email, password, fist name, dan last name harus diisi'
    );
  }

  const checkEmail = await Users.findOne({ email: email });

  if (checkEmail) {
    throw new BadRequestError('Email sudah terdaftar');
  }

  const result = await Users.create({
    email,
    password,
    firstName,
    lastName,
    role,
  });

  return result;
};

module.exports = {
  signIn,
  signUp,
};
