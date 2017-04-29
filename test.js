'use strict'

const fs = require('fs')
const chalk = require('chalk')
const coveralls = require('coveralls')
const karma = require('karma')
const server = new karma.Server({
  autoWatch: false,
  babelPreprocessor: {
    options: {
      sourceMap: 'inline',
      plugins: [
        [
          'istanbul',
          {
            exclude: [
              '**/*.spec.js'
            ]
          }
        ],
        'transform-es2015-modules-umd'
      ]
    }
  },
  basePath: __dirname,
  browsers: ['PhantomJS'],
  client: {
    captureConsole: true
  },
  concurrency: 1,
  coverageReporter: {
    check: {
      global: {
        statements: 100,
        functions: 100
      }
    },
    dir: 'coverage',
    reporters: [
      {
        type: 'lcov',
        subdir: '.'
      },
      {
        type: 'text-summary'
      }
    ],
    watermarks: {
      statements: [100, 100],
      functions: [100, 100]
    }
  },
  files: [
    './lib/index.js',
    './test/index.spec.js'
  ],
  frameworks: ['jasmine'],
  preprocessors: {
    'lib/**/*.js': ['babel'],
    'test/**/*.spec.js': ['babel']
  },
  reporters: [
    'spec',
    'coverage'
  ],
  singleRun: true
}, function (exitCode) {
  if (process.env.COVERALLS_REPO_TOKEN) {
    fs.readFile('coverage/lcov.info', 'utf8', function (err, file) {
      if (err) {
        console.error(chalk.red(err.message))
        process.exit(1)
      }

      coveralls.convertLcovToCoveralls(file, {
        filepath: '.'
      }, function (err, coverallsData) {
        if (err) {
          console.error(chalk.red(err.message))
          process.exit(1)
        }

        coveralls.sendToCoveralls(coverallsData, function (err, response, body) {
          if (err) {
            console.error(chalk.red(err.message))
            process.exit(1)
          }

          console.log(body.error ? chalk.red(body.message) : chalk.green(body.message))
          process.exit(0)
        })
      })
    })
  } else {
    process.exit(exitCode)
  }
})

try {
  server.start()
} catch (err) {
  console.error(chalk.red(err.message))
  process.exit(1)
}
