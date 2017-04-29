'use strict'

/* eslint-env jasmine */

const defy = window.defy

/**
 * @test {defy}
 */
describe('The Defy.js library', function () {
  /**
   * @test {defy.cleanValue}
   */
  it('should be able to clean up a value', function () {
    expect(defy.cleanValue('test')).toBe('test')
    expect(defy.cleanValue(' test ')).toBe('test')
    expect(defy.cleanValue('  test')).toBe('test')
    expect(defy.cleanValue('\ntest')).toBe('test')
    expect(defy.cleanValue(' ')).toBe('')
    expect(defy.cleanValue()).toBe('')
  })

  /**
   * @test {defy.alphaNumeric}
   */
  it('should be able to validate if a value contains only alpha numeric characters', function () {
    expect(defy.alphaNumeric('t35t sTring')).toBe(false)
    expect(defy.alphaNumeric('t35t_sTring')).toBe(false)

    expect(defy.alphaNumeric('t35tsTring')).toBe(true)
  })

  /**
   * @test {defy.color}
   */
  it('should be able to validate a colour in hex format, with either 6 or 3 characters', function () {
    expect(defy.color('FFFFFF')).toBe(false)
    expect(defy.color('FFF')).toBe(false)

    expect(defy.color('#FFFFFF')).toBe(true)
    expect(defy.color('#FFF')).toBe(true)
  })

  /**
   * @test {defy.email}
   */
  it('should be able to validate an email address', function () {
    expect(defy.email('testuser@domain.com')).toBe(true)
    expect(defy.email('test.user@domain.com')).toBe(true)
    expect(defy.email('test_user@domain.com')).toBe(true)
    expect(defy.email('test-user@domain.com')).toBe(true)
    expect(defy.email('testuser@domain.gov.uk')).toBe(true)
    expect(defy.email('testuser@do-main.gov.uk')).toBe(true)

    expect(defy.email('zr5k6xomedxre41lahuu3iknftmhvhtkaedjgtn9r734sjm73ohmpkiynj00xxx9t@domain.com')).toBe(false)
    expect(defy.email('zr5k6xomedxre41lahuu3iknftmhvhtkaedjgtn9r734sjm73ohmpkiynj00x@zr5k6xomedxre41lahuu3iknftmhvhtkaedjgtn9r734sjm73ohmpkiynj00x.zr5k6xomedxre41lahuu3iknftmhvhtkaedjgtn9r734sjm73ohmpkiynj00xhjj')).toBe(false)
    expect(defy.email('test user@domain.com')).toBe(false)
    expect(defy.email('testuser!@domain.com')).toBe(false)
    expect(defy.email('testuserdomain.com')).toBe(false)
    expect(defy.email('testuser.domain.com')).toBe(false)
  })

  /**
   * @test {defy.match}
   */
  it('should be able to check that two given values match', function () {
    expect(defy.match('test', 'test')).toBe(true)
    expect(defy.match('', '')).toBe(true)
    expect(defy.match('0', 0)).toBe(true)
    expect(defy.match('false', false)).toBe(true)
    expect(defy.match(null, null)).toBe(true)
    expect(defy.match(undefined, undefined)).toBe(true)

    expect(defy.match('0', false)).toBe(false)
    expect(defy.match(1, 2)).toBe(false)
    expect(defy.match('test', '')).toBe(false)
    expect(defy.match(null, undefined)).toBe(false)
  })

  /**
   * @test {defy.max}
   */
  it('should be able to validate that a value is lower than or equal to a given maximum value', function () {
    expect(defy.max('a', 'a')).toBe(true)
    expect(defy.max('a', 'aa')).toBe(true)
    expect(defy.max('a', 'b')).toBe(true)
    expect(defy.max('A', 'a')).toBe(true)
    expect(defy.max('A', 'B')).toBe(true)
    expect(defy.max('1', '2')).toBe(true)
    expect(defy.max('8', '20')).toBe(true)
    expect(defy.max(1, 1)).toBe(true)
    expect(defy.max(1, 2)).toBe(true)
    expect(defy.max(-1, 0)).toBe(true)
    expect(defy.max('2015-11-26', '2015-12-26')).toBe(true)

    expect(defy.max('b', 'a')).toBe(false)
    expect(defy.max('bb', 'b')).toBe(false)
    expect(defy.max('b', 'B')).toBe(false)
    expect(defy.max('B', 'A')).toBe(false)
    expect(defy.max('20', '8')).toBe(false)
    expect(defy.max(2, 1)).toBe(false)
    expect(defy.max(-2, -3)).toBe(false)
    expect(defy.max('2015-11-26', '2015-11-25')).toBe(false)
  })

  /**
   * @test {defy.maxlength}
   */
  it('should be able to validate the maximum length of a value', function () {
    expect(defy.maxlength('a', 1)).toBe(true)
    expect(defy.maxlength(1, 1)).toBe(true)

    expect(defy.maxlength('aa', 1)).toBe(false)
    expect(defy.maxlength(11, 1)).toBe(false)
    expect(defy.maxlength('test', 3)).toBe(false)
  })

  /**
   * @test {defy.min}
   */
  it('should be able to validate that a value is greater than or equal to a given minimum value', function () {
    expect(defy.min('a', 'a')).toBe(true)
    expect(defy.min('aa', 'a')).toBe(true)
    expect(defy.min('b', 'a')).toBe(true)
    expect(defy.min('a', 'A')).toBe(true)
    expect(defy.min('B', 'A')).toBe(true)
    expect(defy.min('2', '1')).toBe(true)
    expect(defy.min('20', '8')).toBe(true)
    expect(defy.min(1, 1)).toBe(true)
    expect(defy.min(2, 1)).toBe(true)
    expect(defy.min(0, -1)).toBe(true)
    expect(defy.min('2015-12-26', '2015-11-26')).toBe(true)

    expect(defy.min('a', 'b')).toBe(false)
    expect(defy.min('a', 'aa')).toBe(false)
    expect(defy.min('B', 'b')).toBe(false)
    expect(defy.min('A', 'B')).toBe(false)
    expect(defy.min('8', '20')).toBe(false)
    expect(defy.min(1, 2)).toBe(false)
    expect(defy.min(-3, -2)).toBe(false)
    expect(defy.min('2015-11-25', '2015-11-26')).toBe(false)
  })

  /**
   * @test {defy.minlength}
   */
  it('should be able to validate the minimum length of a value', function () {
    expect(defy.minlength('a', 1)).toBe(true)
    expect(defy.minlength(1, 1)).toBe(true)

    expect(defy.minlength('aa', 3)).toBe(false)
    expect(defy.minlength(11, 3)).toBe(false)
  })

  /**
   * @test {defy.number}
   */
  it('should be able to validate a number', function () {
    expect(defy.number(1)).toBe(true)
    expect(defy.number(+1)).toBe(true)
    expect(defy.number(-1)).toBe(true)
    expect(defy.number(1.1)).toBe(true)
    expect(defy.number('1')).toBe(true)
    expect(defy.number('+1')).toBe(true)
    expect(defy.number('-1')).toBe(true)
    expect(defy.number('1.1')).toBe(true)
    expect(defy.number(Number.MAX_VALUE)).toBe(true)
    expect(defy.number(Number.MIN_VALUE)).toBe(true)

    expect(defy.number('a')).toBe(false)
    expect(defy.number('1-2')).toBe(false)
    expect(defy.number('1a')).toBe(false)
    expect(defy.number('one')).toBe(false)
    expect(defy.number('2005/12/12')).toBe(false)

    expect(defy.number(undefined)).toBe(false)
    expect(defy.number(null)).toBe(false)
    expect(defy.number(true)).toBe(false)
    expect(defy.number(false)).toBe(false)
    expect(defy.number({})).toBe(false)
    expect(defy.number([])).toBe(false)
    expect(defy.number(function () {})).toBe(false)

    expect(defy.number(Number.NaN)).toBe(false)
    expect(defy.number(Number.POSITIVE_INFINITY)).toBe(false)
    expect(defy.number(Number.NEGATIVE_INFINITY)).toBe(false)
  })

  /**
   * @test {defy.pattern}
   */
  it('should be able to validate a value against a given regular expression', function () {
    expect(defy.pattern('Aadsfsf1435', '[a-zA-Z0-9]+')).toBe(true)
    expect(defy.pattern('asdsdf', '[a-zA-Z0-9]+')).toBe(true)
    expect(defy.pattern('567653456', '[a-zA-Z0-9]+')).toBe(true)

    expect(defy.pattern('567653456.', '[a-zA-Z0-9]+')).toBe(false)
    expect(defy.pattern('5676 53456', '[a-zA-Z0-9]+')).toBe(false)
  })

  /**
   * @test {defy.tel}
   */
  it('should be able to validate a generic phone number with optional country code', function () {
    expect(defy.tel('+44 (0)20 7684 8444')).toBe(true)
    expect(defy.tel('+612 9018 4144')).toBe(true)
    expect(defy.tel('+1 646 847 9415')).toBe(true)
    expect(defy.tel('+852 5239 8278')).toBe(true)
    expect(defy.tel('0345 740 4404')).toBe(true)
    expect(defy.tel('(55) 1234 5678')).toBe(true)
    expect(defy.tel('6641234567')).toBe(true)
    expect(defy.tel('(044) 664 123 45 67')).toBe(true)
    expect(defy.tel('(01111) 111111')).toBe(true)
    expect(defy.tel('82 011-111-1111')).toBe(true)

    expect(defy.tel('+(44) (0)20 7684 8444')).toBe(false)
    expect(defy.tel('+ 612-9018-4144')).toBe(false)
    expect(defy.tel('+1.646.847.9415')).toBe(false)
    expect(defy.tel('+852 5239 8278432413434346428')).toBe(false)
    expect(defy.tel('0345_740_4404')).toBe(false)
    expect(defy.tel('(+55)12345678')).toBe(false)
    expect(defy.tel('664/1234567')).toBe(false)
    expect(defy.tel('(044)i664 123 45 67')).toBe(false)
    expect(defy.tel('(01111) (111111)')).toBe(false)
    expect(defy.tel('[82] 011-111-1111')).toBe(false)
  })

  /**
   * @test {defy.required}
   */
  it('should be able to validate a required value', function () {
    expect(defy.required('test')).toBe(true)
    expect(defy.required(0)).toBe(true)
    expect(defy.required(1)).toBe(true)

    expect(defy.required()).toBe(false)
    expect(defy.required('')).toBe(false)
    expect(defy.required(' ')).toBe(false)
    expect(defy.required(undefined)).toBe(false)
    expect(defy.required(null)).toBe(false)
  })

  /**
   * @test {defy.time}
   */
  it('should be able to validate a time as defined in RFC3339', function () {
    expect(defy.time('23:20:50.52')).toBe(true)
    expect(defy.time('17:39:57')).toBe(true)

    expect(defy.time('17h39m57')).toBe(false)
    expect(defy.time('17.39.57')).toBe(false)
    expect(defy.time('24:39:57')).toBe(false)
    expect(defy.time('23:61:57')).toBe(false)
    expect(defy.time('17:39:60')).toBe(false)
    expect(defy.time('17:39:555')).toBe(false)
    expect(defy.time('23:20:50.100')).toBe(false)
  })

  /**
   * @test {defy.timezone}
   */
  it('should be able to validate a time offset from a date-time format as defined in RFC3339', function () {
    expect(defy.timezone('Z')).toBe(true)
    expect(defy.timezone('-12:00')).toBe(true)
    expect(defy.timezone('+12:00')).toBe(true)
    expect(defy.timezone('+06:30')).toBe(true)

    expect(defy.timezone('z')).toBe(false)
    expect(defy.timezone('T')).toBe(false)
    expect(defy.timezone('06:30')).toBe(false)
    expect(defy.timezone('+06:25')).toBe(false)
    expect(defy.timezone('+15:30')).toBe(false)
    expect(defy.timezone('+06:300')).toBe(false)
    expect(defy.timezone('+006:30')).toBe(false)
    expect(defy.timezone('+600:30')).toBe(false)
  })

  /**
   * @test {defy.url}
   */
  it('should be able to validate a URL', function () {
    expect(defy.url('http://www.google.com')).toBe(true)
    expect(defy.url('http://www.google.com:80')).toBe(true)
    expect(defy.url('http://www.google.com/')).toBe(true)
    expect(defy.url('http://google.com')).toBe(true)
    expect(defy.url('https://google.com')).toBe(true)
    expect(defy.url('https://www.google.com')).toBe(true)
    expect(defy.url('http://www.google.com/test')).toBe(true)
    expect(defy.url('//www.google.com')).toBe(true)
    expect(defy.url('http://121.0.0.1')).toBe(true)

    expect(defy.url('http://google')).toBe(false)
    expect(defy.url('google')).toBe(false)
    expect(defy.url('www.google.com')).toBe(false)
    expect(defy.url('google.com')).toBe(false)
    expect(defy.url('http://localhost')).toBe(false)
    expect(defy.url('http://localhost:80')).toBe(false)
    expect(defy.url('121.0.0.1')).toBe(false)
  })
})
