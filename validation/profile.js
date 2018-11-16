const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  const siteUrls = [
    'website',
    'youtube',
    'twitter',
    'facebook',
    'linkedin',
    'instagram'
  ];
  const dataFields = ['handle', 'status', 'skills'];

  dataFields.forEach(field => {
    if (isEmpty(data[field])) {
      errors[field] = `${field} field is required`;
    }
  });

  if (
    !isEmpty(data.handle) &&
    !Validator.isLength(data.handle, { min: 2, max: 40 })
  ) {
    errors.handle = 'Handle must be between 2 and 30 characters.';
  }

  siteUrls.forEach(site => {
    if (!isEmpty(data[site]) && !Validator.isURL(data[site])) {
      errors[site] = `Not a valid ${site} URL`;
    }
  });

  return { errors, isValid: isEmpty(errors) };
};
