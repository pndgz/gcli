'use strict'
const co = require('co')
const promt = require('co-prompt')
const config = require('./config')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

module.exports = (rmtmpl) => {
  co(function *() {
    let templateName = rmtmpl.toLowerCase()
    if (!config.templates[templateName]) {
      console.log(chalk.red(` x Template ${templateName} not exists!`))
      process.exit()
    }
    // remove
    delete config.templates[templateName]
    let configFile = path.resolve(__dirname, '../command/config.json')
    fs.writeFile(configFile, JSON.stringify(config), 'utf-8', (err) => {
      if (err) {
        console.log(chalk.red(' x ' + err))
      }
      console.log(chalk.green(' √ Template Remove Success'))
      process.exit()
    })
  })
}
