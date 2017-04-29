'use strict'

const chalk = require('chalk')
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
        type: 'lcovonly',
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
  process.exit(exitCode)
})

try {
  server.start()
} catch (err) {
  console.error(chalk.red(err.message))
  process.exit(1)
}
