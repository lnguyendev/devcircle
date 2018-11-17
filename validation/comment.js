const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateCommentInput(data) {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = 'Comment field is required.';
  } else {
    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
      errors.text = 'Comment must be between 10 and 300 characters.';
    }
  }

  return { errors, isValid: isEmpty(errors) };
};
