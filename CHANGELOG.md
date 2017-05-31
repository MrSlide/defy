# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [v0.2.0] - 2017-05-31
### Added

- Added date value validation through `defy.date()`
- Added date existence validation through `defy.dateExists()`


## [v0.1.3] - 2017-04-30

### Changed

- Changed how the unit test coverage report is sent to Coveralls

### Fixed

- The main Node module now exports the correct object
- Fixed build errors related to the build directory not existing


## [v0.1.2] - 2017-04-29

### Fixed

- Fixed redundant run of tests when publishing the package
- Fixed a package installation error


## [v0.1.1] - 2017-04-29

### Fixed

- Fixed an error when trying to upload the test coverage results to Coveralls which was causing the build to not pass


## [v0.1.0] - 2017-04-29

### Added

- Added a utility function to clean up values by trimming white space through `defy.cleanValue()`
- Added alpha-numeric value validation through `defy.alphanumeric()`
- Added hexadecimal color value validation through `defy.color()`
- Added credit card number value validation through `defy.creditcard()`
- Added email address value validation through `defy.email()`
- Added validation of equality of two values through `defy.match()`
- Added maximum value validation through `defy.max()`
- Added maximum value length validation through `defy.maxlength()`
- Added minimum value validation through `defy.min()`
- Added minimum value length validation through `defy.minlength()`
- Added number value validation through `defy.number()`
- Added regular expression pattern match validation through `defy.pattern()`
- Added phone number value validation through `defy.tel()`
- Added time value validation through `defy.time()`
- Added time zone value validation through `defy.timezone()`
- Added value requirement validation through `defy.required()`
- Added url value validation through `defy.url()`


[Latest]: https://github.com/MrSlide/defy/tree/master
[Unreleased]: https://github.com/MrSlide/defy/tree/develop
[v0.1.3]: https://github.com/MrSlide/defy/tree/v0.1.3
[v0.1.2]: https://github.com/MrSlide/defy/tree/v0.1.2
[v0.1.1]: https://github.com/MrSlide/defy/tree/v0.1.1
[v0.1.0]: https://github.com/MrSlide/defy/tree/v0.1.0
