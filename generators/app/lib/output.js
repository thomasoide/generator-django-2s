const chalk = require('chalk');

module.exports = {
  welcome: function() {
    return (
      `
   ${chalk.bgCyan.white('                                    ')}
   ${chalk.bgCyan.black('   ★ Django Project Generator ★     ')}
   ${chalk.bgCyan.white('                                    ')}
` +
      chalk.white`
Welcome! This generator is going to create a Django project for you so that you
don't have to go through the work of dividing files manually on your own. Please enter some information below.
`
    );
  },

  finishedapp: function () {
    return (`
      ${chalk.bgCyan.white('                                    ')}
      ${chalk.bgCyan.black('   ★ We are done! ★                 ')}
      ${chalk.bgCyan.white('                                    ')}

      Read the ${chalk.yellow('README.md')} that was generated in this project for further instructions on setup.

      Run ${chalk.bgYellow.black(' pipenv install ; pipenv shell ')} to start developing your project.

      Refer to Zappa's documentation to learn more about deployment, but Zappa's serverless architcture is not the only way to deploy Django projects.

    `);
  },

  finishedproject: function () {
    return (`

      Read the ${chalk.yellow('README.md')} that was generated in this project for further instructions on setup.

      Be sure to run ${chalk.bgYellow.black(' yo django-2s:startapp ')} and follow the prompts to build an application within your project folder.

    `);
  },
};
