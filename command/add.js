'use strict'
const co = require('co')
const promt = require('co-prompt')
const config = require('./config')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  co(function *() {
    let templateName = ''
    do {
      templateName = yield promt(chalk.magenta('Template Name: '))
      templateName = templateName.toLowerCase()
      if (config.templates[templateName]) {
        console.log(chalk.red(`x Template ${templateName} already exists!`))
        templateName = ''
      }
    } while (templateName.trim() === '')
    let templateDesc = ''
    do {
      templateDesc = yield promt(chalk.magenta('Template Description: '))
    } while (templateDesc.trim() === '')
    let templateUrl = ''
    do {
      templateUrl = yield promt(chalk.magenta('Template Git URL: '))
    } while (templateUrl.trim() === '')
    // save
    config.templates[templateName] = {}
    config.templates[templateName]['url'] = templateUrl
    config.templates[templateName]['desc'] = templateDesc
    let configFile = path.resolve(__dirname, '../command/config.json')
    fs.writeFile(configFile, JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        console.log(chalk.red('x ' + err))
      }
      console.log(chalk.green('√ Template Add Success'))
      process.exit()
    })
  })
}
