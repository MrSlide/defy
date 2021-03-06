# defy

[![Travis branch](https://img.shields.io/travis/MrSlide/defy/master.svg)](https://travis-ci.org/MrSlide/defy)
[![Coverage Status](https://img.shields.io/coveralls/MrSlide/defy/master.svg)](https://coveralls.io/github/MrSlide/defy?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/mrslide/defy.svg)](https://github.com/MrSlide/defy)
[![Dependencies](https://img.shields.io/david/mrslide/defy.svg)](https://www.npmjs.com/package/defy)
[![npm](https://img.shields.io/npm/v/defy.svg)](https://www.npmjs.com/package/defy)
[![npm](https://img.shields.io/npm/dt/defy.svg)](https://www.npmjs.com/package/defy)
[![Standard](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/mrslide/defy.svg)](https://github.com/MrSlide/defy)

Small JavaScript library for data validation with flexibility in mind. It won't decide how you do form validation or present error messages. You simply provide some value to validate, and it will tell you if it is valid or not.



## Install

```
npm install defy
```



## Usage

Defy is a UMD and ES6 module.

```
// Loading the module in ES6 style
import * as defy from 'defy'

// It is also possible to only load the required validations when loading the module in ES6 style (this is the preferred way when possible)
import {required, password} from 'defy'
import {date as defyDate} from 'defy'

// Some module bundlers will give preference to the UMD module instead of the ES6 module.
// Force loading the ES6 module instead by including the index.js file in the import path.
import {date as defyDate} from 'defy/index.js'

// Loading the module in CommonJS style
const defy = require('defy')
```



## Static Public Methods

### age(dob: String[, minAge: Number = 0[, maxAge: Number]]): Boolean | Number

Verify if someone's age falls within a minimum and maximum age values and get the age value.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| dob                      | String                   | A valid RFC3339 date string representing the date of birth.                                                     |
| minAge                   | Number                   | The minimum accepted age value.                                                                                 |
| maxAge                   | Number                   | The maximum accepted age value.                                                                                 |

#### Return

Boolean | Number - Returns `false` if the minimum or maximum age are not valid, or the calculated age if valid.

#### Example

```
var isAgeValid = defy.age('1999-02-22', 18)
var userAge = defy.age('1979-06-12')
```



## Static Public Methods

### alphaNumeric(value: String): Boolean

Verify if a given value only contains alpha-numeric characters.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isValueAlphaNumeric = defy.alphaNumeric('Abc123')
```



### cleanValue(value: Mixed): Boolean

Clean up a given value to remove extra spaces that may cause false validation results.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Mixed                    | The value to be validated.                                                                                      |

#### Return

Boolean

#### Throw

##### TypeError

If trying to clean a value that cannot be converted to a string.

#### Example

```
var cleanedValue = defy.cleanValue('  Example   ')
```



### color(value: String): Boolean

Verify if a given value is a valid hexadecimal format colour with 3 or 6 characters and preceded by the hash sign.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isColourValid = defy.color('#FFFFFF')
```



### creditcard(value: String): Boolean

Verify if a given value is a valid credit card number.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isCCValid = defy.creditcard('378282246310005')
```



### date(value: String): Boolean

Verify if a given value is a valid date.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isDateValid = defy.date('2017-05-31')
```



### dateExists(value: String): Boolean

Verify if a given date exists. The value must be a valid date string and pass the `defy.date()` validation.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var dateExists = defy.dateExists('2017-05-31')
```



### email(value: String): Boolean

Verify if a given value is a valid email address.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isEmailValid = defy.email('user@world.net');
```



### match(valueA: Mixed, valueB: Mixed): Boolean

Verify if two given values match. Both values will be treated as strings.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| valueA                   | Mixed                    | The first value to match.                                                                                       |
| valueB                   | Mixed                    | The second value, which will be compared with the first.                                                        |

#### Return

Boolean

#### Example

```
var doValuesMatch = defy.match(1, '1')
```



### max(value: Number | String, maxValue: Number | String): Boolean

Verify if a given value does not exceed another given value. Both values will be treated as strings.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |
| maxValue                 | Mixed                    | The maximum allowed for the given value.                                                                        |

#### Return

Boolean

#### Example

```
var isValueLessThanEleven = defy.max(5, 10)
```



### maxlength(value: Number | String, maxLen: Number): Boolean

Verify if a given value's length does not exceed the given maximum length. For strings this will validate the number of characters. For numbers, this will validate the number of digits, including the decimal places, and the decimal mark.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |
| maxLen                   | Number                   | The maximum allowed for the given value.                                                                        |

#### Return

Boolean

#### Example

```
var isValueNotTooLong = defy.maxlength('Example', 10)
```



### min(value: Number | String, minValue: Number | String): Boolean

Verify if a given value is not inferior to another given value. Both values will be treated as strings.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |
| minValue                 | Number | String          | The minimum allowed for the given value.                                                                        |

#### Return

Boolean

#### Example

```
var isValueGreaterThanZero = defy.min(5, 0)
```



### minlength(value: Number | String, minLen: Number): Boolean

Verify if a given value's length is at least the given minimum length. For strings this will validate the number of characters. For numbers, this will validate the number of digits, including the decimal places, and the decimal mark.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |
| minLen                   | Number                   | The minimum length allowed for the given value.                                                                 |

#### Return

Boolean

#### Example

```
var isValueLongEnough = defy.minlength('Example', 2)
```



### number(value: Number | String): Boolean

Verify if a given number is an integer or decimal number.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isValueNumeric = defy.number(123.45)
```



### password(value: String): Boolean

Verify if a given value is a valid password.
A password is considered valid if it is at least 6 characters long and only includes characters from the ASCII printable characters table excluding spaces.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isValueValid = defy.password('WowqGY0Gi?oaPnT,MwiJ[kBQ4ID29Hb!')
```



### pattern(value: Number | String, pattern: String): Boolean

Verify if a given value matches a given regular expression pattern.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Number | String          | The value to be validated.                                                                                      |
| pattern                  | String                   | The regular expression pattern in a format accepted by HTML5 validation rules.                                  |

#### Return

Boolean

#### Example

```
var isValueValid = defy.pattern('GBR', '[A-Za-z]{3}')
```



### required(value: Array | Number | String): Boolean

Verify if a given value is not empty.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | Array | Number | String  | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isValueProvided = defy.required('Example')
```



### tel(value: String): Boolean

Verify if a given value is a valid phone number with or without a country code. The digits can be separated by spaces and area codes can be wrapped in parenthesis.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated. Must be a string to avoid losing digits if a number starts with 0.                   |

#### Return

Boolean

#### Example

```
var isPhoneNumberValid = defy.tel('+44 (0)20 7684 8444');
```



### time(value: String): Boolean

Verify if a given value is a valid time in the format of HH:MM:SS.mm (RFC3339).

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isTimeValid = defy.time('12:00')
```



### timezone(value: String): Boolean

Verify if a given value is a value timezone offset.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The timezone offset value.                                                                                      |

#### Return

Boolean

#### Example

```
var isTimezoneValid = defy.timezone('Z')
```



### url(value: String): Boolean

Verify if a given value is a valid web URL address.

#### Params

| Name                     | Type                     | Description                                                                                                     |
|--------------------------|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| value                    | String                   | The value to be validated.                                                                                      |

#### Return

Boolean

#### Example

```
var isUrlValid = defy.url('https://www.google.com')
```



## Contributing

If you find any bugs and want to fix them, or if you want to add new features, you're welcome to create a fork of the project and then create a pull request once you're done. The code adheres to the [Standard](https://standardjs.com/) and is unit tested fully. No pull requests will be accepted if the code coverage is below 100% or there are linting errors or warnings.

There are some safe-guards in place to prevent a drop in code quality. When you run `npm install`, a Git hook will also be installed, so that no commits will be possible if the unit tests fail or there are linting problems.

The API documentation should also be kept up to date, and ESDoc tags should be used in the source code.




## License

Released under the [MIT](https://opensource.org/licenses/MIT) license



## Copyright

Copyright (c) 2018 Luís Rodrigues
