// require statement with packages and other js files
const Generator = require('yeoman-generator');
const crypto = require('crypto');
const chalk = require('chalk');
const _ = require('lodash');
const inputs = require('./lib/input.js');
const outputs = require('./lib/output.js');

const App = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  prompting() {
    this.log(outputs.welcome())

    return this.prompt(inputs(this)).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    // Package.json
    // this.pkg = writePackage(this.answers, this.dependencies);
    // this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);

    // Templating context
    const tContext = {
      _: _,
      answers: this.answers,
      package: this.pkg,
      env: process.env,
      token: randomToken()
    };

    // Copy template files.  Overall, assume files are template-able
    // files.
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath('./'),
      tContext,
      null,
      {
        globOptions: {
          dot: true,
          // Exceptions
          ignore: _.filter(
            _.flatten([
              // We need to rename this
              this.templatePath('./.gitignore.tpl'),
            ])
          )
        }
      }
    );

    // Gitignore needs to be renamed
    this.fs.copyTpl(
      this.templatePath('.gitignore.tpl'),
      this.destinationPath('./.gitignore'),
      tContext
    );
  }

  // done
  end() {
    this.log(outputs.finishedproject());
  }
};

function randomToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = App;
