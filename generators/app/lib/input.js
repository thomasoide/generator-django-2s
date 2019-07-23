// dependencies
const _ = require('lodash');

module.exports = function(generator) {
  let c = [];

  c.push({
    type: 'input',
    name: 'name',
    message: 'Project name/identifier',
    filter: _.kebabCase,
    required: true,
    validate: function(str) {
      return str.length > 0;
    },
    default: _.kebabCase(generator.appname)
  });

  c.push({
    type: 'input',
    name: 'title',
    message: 'Project title',
    required: true,
    validate: function(str) {
      return str.length > 0;
    },
    default: _.startCase(generator.appname)
  });

  c.push({
    type: 'input',
    name: 'description',
    message: 'Description',
    required: true,
    validate: function(str) {
      return str.length > 0;
    }
  });

  c.push({
    name: 'authorName',
    message: 'Author name',
    default: generator.user.git.name()
  });

  c.push({
    name: 'authorEmail',
    message: 'Author email',
    default: generator.user.git.email()
  });

  c = c.map(i => {
    i.message = i.message + '\n';
    return i;
  });

  return c;
};
