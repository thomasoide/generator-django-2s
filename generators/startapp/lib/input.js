// dependencies
const _ = require('lodash');

module.exports = function(generator) {
  let c = [];

  c.push({
    type: 'input',
    name: 'djangoAppName',
    message: 'Name of the app that will go in the project',
    filter: _.kebabCase,
    required: true,
    validate: function(str) {
      return str.length > 0;
    },
    default: _.kebabCase(generator.djangoAppName)
  });

  c.push({
    type: 'confirm',
    name: 'install',
    message: 'Install app in settings?',
    required: true,
    default: true,
  });

  c = c.map(i => {
    i.message = i.message + '\n';
    return i;
  });

  return c;
};
