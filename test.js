'use strict'

const chalk = require('chalk')
const karma = require('karma')
const server = new karma.Server({
  autoWatch: false,
  babelPreprocessor: {
    options: {
      sourceMap: 'inline',
      presets: [
        'es2015'
      ],
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
  reporters: process.env.COVERALLS_REPO_TOKEN ? ['spec', 'coverage', 'coveralls'] : ['spec', 'coverage'],
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
