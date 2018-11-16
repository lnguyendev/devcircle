const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  const dataFields = ['title', 'company', 'from'];

  dataFields.forEach(field => {
    if (isEmpty(data[field])) {
      errors[field] = `${field} field is required`;
    }
  });

  return { errors, isValid: isEmpty(errors) };
};
