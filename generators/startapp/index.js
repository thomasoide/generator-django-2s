// require statement with packages and other js files
const Generator = require('yeoman-generator');
const crypto = require('crypto');
const chalk = require('chalk');
const _ = require('lodash');
const inputs = require('./lib/input.js');
const path = require('path');
const outputs = require('./lib/output.js');

const App = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  prompting() {
    this.log(outputs.welcome());

    return this.prompt(inputs(this)).then(answers => {
      this.answers = answers;
    });
  }

  writing() {

    // Templating context
    const tContext = {
      _: _,
      answers: this.answers,
      env: process.env,
      token: randomToken()
    };

    // Copy template files.  Overall, assume files are template-able
    // files.
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath(path.join('./', this.answers.djangoAppName)),
      tContext,
      null,
      {
        globOptions: {
          dot: true,
          ignore: _.filter(
            _.flatten([
              // These are not text files and have subdirectories so they should not be copied as templates
              this.templatePath('./static/*'),
              this.templatePath('./templates/**/*')
            ])
          )
        }
      }
    );

    // Copy assets (since these are not text files, we don't want to pass
    // through copyTpl)
    this.fs.copy(
      this.templatePath('./static/*'),
      this.destinationPath(path.join('./', this.answers.djangoAppName, 'static', this.answers.djangoAppName)),
      this.templatePath('./static/img'),
      this.destinationPath(path.join('./', this.answers.djangoAppName, 'static')),
      tContext
    );

    this.fs.copy(
      this.templatePath('./templates/**/*'),
      this.destinationPath(path.join('./', this.answers.djangoAppName, 'templates', this.answers.djangoAppName)),
      tContext
    );
  }

  // done
  end() {
    this.log(outputs.finishedapp());
  }
};

function randomToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = App;
