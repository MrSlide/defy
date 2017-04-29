'use strict'

const fs = require('fs')
const chalk = require('chalk')
const babel = require('babel-core')

babel.transformFile('lib/index.js', {
  ast: false,
  comments: false,
  compact: false,
  minified: false,
  moduleId: 'defy'
}, function (err, res) {
  if (err) {
    console.error(chalk.red(err.message))
    process.exit(1)
  }

  try {
    if (!fs.statSync('dist').isDirectory()) {
      fs.mkdirSync('dist')
    }
  } catch (err) {
    if (err) {
      console.error(chalk.red(err.message))
      process.exit(1)
    }
  }

  fs.writeFile('dist/index.js', res.code, function (err) {
    if (err) {
      console.error(chalk.red(err.message))
      process.exit(1)
    }

    console.info(chalk.green.bold('\u2713 Build complete'))
    process.exit(0)
  })
})
