const CustomAPIError = require('./custom-api-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthenticationError = require('./unauthentication');
const UnauthorizedError = require('./unauthorized');

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticationError,
  UnauthorizedError,
};
