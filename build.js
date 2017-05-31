'use strict'

const fs = require('fs')
const chalk = require('chalk')
const babel = require('babel-core')

const promises = []

promises.push(new Promise(function (resolve, reject) {
  babel.transformFile('lib/index.js', {
    presets: [
      ['es2015', { modules: false }]
    ]
  }, function (err, res) {
    if (err) {
      console.error(chalk.red(err.message))
      process.exit(1)
    }

    try {
      fs.accessSync('dist')
    } catch (err) {
      fs.mkdirSync('dist')
    }

    fs.writeFile('dist/index.es.js', res.code, function (err) {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}))

promises.push(new Promise(function (resolve, reject) {
  babel.transformFile('lib/index.js', {
    ast: false,
    presets: [
      'es2015'
    ],
    plugins: [
      'transform-es2015-modules-umd'
    ]
  }, function (err, res) {
    if (err) {
      console.error(chalk.red(err.message))
      process.exit(1)
    }

    try {
      fs.accessSync('dist')
    } catch (err) {
      fs.mkdirSync('dist')
    }

    fs.writeFile('dist/index.umd.js', res.code, function (err) {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}))

Promise.all(promises).then(function () {
  console.info(chalk.green.bold('\u2713 Build complete'))
  process.exit(0)
}).catch(function (err) {
  console.error(chalk.red(err.message))
  process.exit(1)
})
