const chalk = require('chalk');

module.exports = {
  welcome: function() {
    return (
      `
   ${chalk.bgCyan.white('                                    ')}
   ${chalk.bgCyan.white('   ★ Django Project Generator ★     ')}
   ${chalk.bgCyan.white('                                    ')}
` +
      chalk.white`
Welcome! This generator is going to create a Django project for you so that you
don't have to go through the work of dividing files manually on your own. Please enter some information below.
`
    );
  },
}
