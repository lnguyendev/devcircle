const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email must be in the correct format.';
    }
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }

  return { errors, isValid: isEmpty(errors) };
};
