'use strict'

/**
 * @name Defy.js
 * @desc Small JavaScript library for data validation.
 * @author Luis Rodrigues (http://www.luisrodriguesweb.com)
 * @version 0.1.0
 * @see https://github.com/MrSlide/defy
 * @license MIT
 */

const alphaNumRegEx = /^[0-9a-z]+$/i
const colorRegEx = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const emailRegEx = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ // Adapted from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
const telRegEx = /^(\+[0-9]{1,5})?( ?\([0-9]{1,5}\) ?)?[0-9 -]+$/
const timeRegEx = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(\.[0-9]{2})?$/
const timezoneRegEx = /^(?:Z|[+-](?:1[0-4]|[0][0-9]):(00|30|45))$/
const urlRegEx = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
const cardDigitsRegEx = /^[0-9]+([ -]{1}[0-9]+)*$/
const dateRegEx = /^[0-9]{4}-(0[1-9]{1}|1[012]{1})-(0[1-9]{1}|[12]{1}[0-9]{1}|3[01]{1})$/

/**
 * Get a normalized representation of a value.
 *
 * @private
 * @since 0.1.0
 * @param {*} [value] - Value to be normalized
 * @return {*} - A string representation of the value, or the value itself if a normalized value cannot be achieved
 */
function normalizeValue (value) {
  try {
    return value.toString()
  } catch (e) {
    return value
  }
}

/**
* Clean up a given value to remove extra spaces that may cause false validation results.
*
* @public
* @since 0.1.0
* @param {!Mixed} [value=''] - The value to be validated.
* @return {Boolean}
*
* @example
* var cleanedValue = defy.cleanValue('  Example   ')
*/
export function cleanValue (value = '') {
  return normalizeValue(value).trim().replace(/\s{2,}/g, ' ')
}

/**
* Verify if a given value only contains alpha-numeric characters.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isValueAlphaNumeric = defy.alphaNumeric('Abc123')
*/
export function alphaNumeric (value) {
  return alphaNumRegEx.test(value)
}

/**
* Verify if a given value is a valid hexadecimal format colour with 3 or 6 characters and preceded by the hash sign.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isColourValid = defy.color('#FFFFFF')
*/
export function color (value) {
  return colorRegEx.test(value)
}

/**
* Verify if a given value is a valid credit card number.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isCCValid = defy.creditcard('378282246310005')
*/
export function creditcard (value) {
  // Accept only digits, optionally in groups separated by a single dash or space
  if (!cardDigitsRegEx.test(value)) {
    return false
  }

  value = value.replace(/\D/g, '')

  if (value.length < 12 || value.length > 19) {
    return false
  }

  // Luhn Algorithm
  let nCheck = 0
  let nDigit = 0
  let bEven = false
  let cDigit

  for (let n = value.length - 1; n >= 0; n--) {
    cDigit = value.charAt(n)
    nDigit = parseInt(cDigit, 10)

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9
    }

    nCheck += nDigit
    bEven = !bEven
  }

  return (nCheck % 10) === 0
}
/**
 * Verify if a given value is a valid date in the format YYYY-MM-DD.
 *
 * @public
 * @since 0.2.0
 * @param {!String} value - The value to be validated.
 * @return {Boolean}
 *
 * @example
 * var isDateValid = defy.date('2016-01-31')
 */
export function date (value) {
  return dateRegEx.test(value)
}

/**
 * Verify if a given value is an existing date.
 *
 * @public
 * @since 0.2.0
 * @param {String} value - A valid RFC3339 date string.
 * @return {Boolean}
 *
 * @example
 * var dateExists = defy.dateExists('2017-05-31')
 */
export function dateExists (value) {
  const dateStr = value.substr(0, 10)
  const dateObj = new Date(Date.parse(dateStr))

  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const day = dateObj.getDate()

  return !isNaN(year) && !isNaN(month) && !isNaN(day)
}

/**
* Verify if a given value is a valid email address.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isEmailValid = defy.email('user@world.net');
*/
export function email (value) {
  const [localPart] = value.split('@')

  // Validate value and part lengths
  if (localPart.length > 64) {
    return false
  }

  return emailRegEx.test(value)
}

/**
* Verify if two given values match.
* Both values will be treated as strings.
*
* @public
* @since 0.1.0
* @param {Mixed} valueA - The first value to match.
* @param {Mixed} valueB - The second value, which will be compared with the first.
* @return {Boolean}
*
* @example
* var doValuesMatch = defy.match(1, '1')
*/
export function match (valueA, valueB) {
  // Normalize values into strings
  const valA = normalizeValue(valueA)
  const valB = normalizeValue(valueB)

  if (valA !== valB) {
    return false
  }

  return true
}

/**
* Verify if a given value does not exceed another given value.
* Both values will be treated as strings.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @param {!Number|String} maxValue - The maximum allowed for the given value.
* @return {Boolean}
*
* @example
* var isValueLessThanEleven = defy.max(5, 10)
*/
export function max (value, maxValue) {
  let val = value
  let maxVal = maxValue

  if (normalizeValue(val).length !== normalizeValue(maxVal).length) {
    if (this.number(val)) {
      val = parseFloat(val)
    }

    if (this.number(maxVal)) {
      maxVal = parseFloat(maxVal)
    }
  }

  if (val > maxVal) {
    return false
  }

  return true
}

/**
* Verify if a given value's length does not exceed the given maximum length.
* For strings this will validate the number of characters.
* For numbers, this will validate the number of digits, including the decimal places, and the decimal mark.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @param {!Number} maxLen - The maximum length allowed for the given value.
* @return {Boolean}
*
* @example
* var isValueNotTooLong = defy.maxlength('Example', 10)
*/
export function maxlength (value, maxLen) {
  let val = value

  if (typeof value === 'number') {
    val = normalizeValue(value)
  }

  const mxLength = parseInt(maxLen, 10)

  if (val.length > mxLength) {
    return false
  }

  return true
}

/**
* Verify if a given value is not inferior to another given value.
* Both values will be treated as strings.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @param {!Number|String} minValue - The minimum allowed for the given value.
* @return {Boolean}
*
* @example
* var isValueGreaterThanZero = defy.min(5, 0)
*/
export function min (value, minValue) {
  let val = value
  let minVal = minValue

  if (normalizeValue(val).length !== normalizeValue(minVal).length) {
    if (this.number(val)) {
      val = parseFloat(val)
    }

    if (this.number(minVal)) {
      minVal = parseFloat(minVal)
    }
  }

  if (val < minVal) {
    return false
  }

  return true
}

/**
* Verify if a given value's length is at least the given minimum length.
* For strings this will validate the number of characters.
* For numbers, this will validate the number of digits, including the decimal places, and the decimal mark.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @param {!Number} minLen - The minimum length allowed for the given value.
* @return {Boolean}
*
* @example
* var isValueLongEnough = defy.minlength('Example', 2)
*/
export function minlength (value, minLen) {
  let val = value

  if (typeof value === 'number') {
    val = normalizeValue(value)
  }

  const mnLength = parseInt(minLen, 10)

  if (val.length < mnLength) {
    return false
  }

  return true
}

/**
* Verify if a given number is an integer or decimal number.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isValueNumeric = defy.number(123.45)
*/
export function number (value) {
  return !isNaN(parseFloat(normalizeValue(value))) && isFinite(value)
}

/**
* Verify if a given value matches a given regular expression pattern.
*
* @public
* @since 0.1.0
* @param {!Number|String} value - The value to be validated.
* @param {!String} pattern - The regular expression pattern in a format accepted by HTML5 validation rules.
* @return {Boolean}
*
* @example
* var isValueValid = defy.pattern('GBR', '[A-Za-z]{3}')
*/
export function pattern (value, pattern) {
  const regEx = new RegExp('^(?:' + pattern + ')$')

  return regEx.test(value)
}

/**
* Verify if a given value is a valid phone number with or without a country code.
* The digits can be separated by spaces and area codes can be wrapped in parenthesis.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated. Must be a string to avoid losing digits if a number starts with 0.
* @return {Boolean}
*
* @example
* var isPhoneNumberValid = defy.tel('+44 (0)20 7684 8444');
*/
export function tel (value) {
  if (value.length > 20) {
    return false
  }

  return telRegEx.test(value)
}

/**
* Verify if a given value is a valid time in the format of HH:MM:SS.mm ({@link RFC3339}).
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isTimeValid = defy.time('12:00')
*/
export function time (value) {
  return timeRegEx.test(value)
}

/**
* Verify if a given value is a value timezone offset.
*
* @public
* @since 0.1.0
* @param {!String} value - The timezone offset value
* @return {Boolean}
*
* @example
* var isTimezoneValid = defy.timezone('Z')
*/
export function timezone (value) {
  return timezoneRegEx.test(value)
}

/**
* Verify if a given value is not empty.
*
* @public
* @since 0.1.0
* @param {!Array|Number|String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isValueProvided = defy.required('Example')
*/
export function required (value) {
  let inputValue = value

  // Clean up a string before validating it
  if (typeof value === 'string') {
    inputValue = this.cleanValue(inputValue)
  }

  if (inputValue === undefined || inputValue === null) {
    return false
  } else if (typeof inputValue !== 'number' && inputValue.length === 0) {
    return false
  }

  return true
}

/**
* Verify if a given value is a valid web URL address.
*
* @public
* @since 0.1.0
* @param {!String} value - The value to be validated.
* @return {Boolean}
*
* @example
* var isUrlValid = defy.url('https://www.google.com')
*/
export function url (value) {
  return urlRegEx.test(value)
}
