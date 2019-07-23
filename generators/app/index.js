// require statement with packages and other js files
const Generator = require('yeoman-generator');
const crypto = require('crypto');
const chalk = require('chalk');
const inputs = require('./lib/input.js');

const App = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  prompting() {
    return this.prompt(inputs(this)).then(answers => {
      this.answers = answers;
    });
  }

};

module.exports = App;
