'use strict'

const chalk = require('chalk')
const config = require('./config')

function _fixStrLen(str, len) {
  if (str.length >= len) {
    return str.substring(0, (len - 2)) + '… '
  }
  let fitLen = len - str.length;
  for (let i = 0; i < fitLen; i++) {
    str += ' '
  }
  return str;
}

module.exports = () => {
  console.log(chalk.magenta('Supports Templates:'))
  Object.keys(config.templates).forEach(item => {
    console.log('%s %s', chalk.green(_fixStrLen(item, 20)), config.templates[item].desc)
  })
  process.exit()
}
