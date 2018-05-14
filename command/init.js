'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('./config')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function* () {
    let templateName = ''
    do {
      templateName = yield prompt(chalk.magenta('Template Name: '))
    } while (templateName.trim() === '')
    templateName = templateName.toLowerCase()
    if (!config.templates[templateName]) {
      console.log(chalk.red(`x Not support ${templateName}`))
      process.exit()
    }
    let projectName = ''
    do {
      projectName = yield prompt(chalk.magenta('Your Project Name: '))
    } while (projectName.trim() === '')
    console.log(chalk.white('Start generating ……'))
    let gitUrl = config.templates[templateName].url
    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName}`
    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
      } else {
        exec(`rm -rf ${projectName}/.git`, (error, stdout, stderr) => {
          if (error) {
            console.log(error)
          } else {
            console.log(chalk.green('√ Generation completed!'))
            console.log('%s %s', chalk.green('Now enter your project with:'), chalk.white(`cd ${projectName}`))
          }
          process.exit()
        })
      }
    })
  })
}
