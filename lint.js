'use strict'

const standard = require('standard')
const chalk = require('chalk')
const table = require('text-table')

/**
 * Given a word and a count, append an s if count is not one.
 *
 * @private
 * @param {String} word - A word in its singular form.
 * @param {Int} count - A number controlling whether word should be pluralized.
 * @return {String} The original word with an s on the end if count is not one.
 */
function pluralize (word, count) {
  return (count === 1 ? word : word + 's')
}

/**
 * Process the Standard linting results.
 *
 * @private
 * @param {Array<Object>} results - The linting results for each file.
 * @param {String} results[].filePath - Absolute path of a linted script.
 * @param {Array<String>} results[].messages - Error and warning detail messages.
 * @param {Number} results[].errorCount - The number of errors encountered in the script.
 * @param {Number} results[].warningCount - The number of errors encountered in the script.
 * @return {String}
 */
function processResults (results) {
  var output = '\n'
  var total = 0

  results.forEach(function (result) {
    var messages = result.messages

    if (messages.length === 0) {
      return
    }

    total += messages.length
    output += chalk.underline(result.filePath) + '\n'

    output += table(
      messages.map(function (message) {
        var messageType

        messageType = chalk.red('error')

        return [
          '',
          message.line || 0,
          message.column || 0,
          messageType,
          message.message.replace(/\.$/, ''),
          chalk.dim(message.ruleId || '')
        ]
      }),
      {
        align: ['', 'r', 'l'],
        stringLength: function (str) {
          return chalk.stripColor(str).length
        }
      }
    ).split('\n').map(function (el) {
      return el.replace(/(\d+)\s+(\d+)/, function (m, p1, p2) {
        return chalk.dim(p1 + ':' + p2)
      })
    }).join('\n') + '\n\n'
  })

  if (total > 0) {
    output += chalk.red.bold([
      '\u2716 ', total, pluralize(' problem', total), '\n'
    ].join(''))
  }

  return total > 0 ? output : chalk.green.bold('\u2713 0 problems')
}

standard.lintFiles('**/*.js', {
  ignore: ['node_modules', 'dist']
}, function (err, res) {
  if (err) {
    console.error(chalk.red(err.message))
    process.exit(1)
  }

  const results = processResults(res.results)

  if (res.warningCount || res.errorCount) {
    console.error(results)
    process.exit(1)
  }

  console.info(results)
  process.exit(0)
})
