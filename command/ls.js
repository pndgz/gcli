'use strict'

const chalk = require('chalk')
const config = require('./config')

module.exports = () => {
  console.log(chalk.magenta(' Supports Templates:'))
  Object.keys(config.templates).forEach(item => {
    console.log(' %s \t %s', chalk.green(item), config.templates[item].desc)
  })
  process.exit()
}
