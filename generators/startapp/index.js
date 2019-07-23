// require statement with packages and other js files
const Generator = require('yeoman-generator');
const crypto = require('crypto');
const chalk = require('chalk');
const _ = require('lodash');
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

  writing() {
    // Package.json
    // this.pkg = writePackage(this.answers, this.dependencies);
    // this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);

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
      this.destinationPath('./'),
      tContext,
      null,
      {
        globOptions: {
          dot: true,
          // Exceptions
          ignore: _.filter(
            _.flatten([
              // Has images and binaries
              this.templatePath('./assets/**/*'),
            ])
          )
        }
      }
    );

    // Copy assets (since these are not text files, we don't want to pass
    // through copyTpl)
    // this.fs.copy(
    //   this.templatePath('./assets/**/*'),
    //   this.destinationPath('./assets')
    // );
    //
    // // Copy random assets that needs templating
    // this.fs.copyTpl(
    //   this.templatePath('./assets/**/*.json'),
    //   this.destinationPath('./assets'),
    //   tContext
    // );

    // Gitignore needs to be renamed
    // this.fs.copyTpl(
    //   this.templatePath('.gitignore.tpl'),
    //   this.destinationPath('./.gitignore'),
    //   tContext
    // );
  }

  // All done
  end() {
    // this.log(outputs.done());
    this.log("here's the output!")
  }
};

function randomToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = App;
