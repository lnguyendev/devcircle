const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'Name field is required.';
  } else {
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters.';
    }
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  } else {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email must be in the correct format.';
    }
  }

  if (isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  } else {
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }
  }

  if (isEmpty(data.confirmedPassword)) {
    errors.confirmedPassword = 'Confirmed Password field is required.';
  } else {
    if (!Validator.equals(data.password || '', data.confirmedPassword)) {
      errors.confirmedPassword = 'Passwords must match.';
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
