# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2019-11-15
### Added
- Test cases for auth-required commands
### Fixed
- CreateGame in `games.spec.js` fixed jsDoc.

## [0.3.1] - 2019-11-15
### Refactored
- A bit of cleanup in websocketWrapper class. It should now be way more clear. 

## [0.3.0] - 2019-11-14
### Added
- Fixed websocket queueId not sent

## [0.2.1] - 2019-11-13
### Changed
- Added parameter wsWrapper to wrapper in `games.spec.js`

## [0.2.0] - 2019-11-12
### Added
- Chai and Mocha for testing
- Now testing the functionality of the `fetchGames` function
### Changed
- Export types of each module to `module.exports` in order to use them correctly

## [0.1.2] - 2019-11-11
### Changed
- Navigation in README.md

## [0.1.1] - 2019-11-11
### Added
- Logo for README.md to res/logo.svg
- `eslint` to CHANGELOG.md file
### Changed
- README.md

## [0.1.0] - 2019-11-11
### Added
- CHANGELOG.md
- README.md
- CONTRIBUTING.md
- package.json
- index.js
- .gitignore
- GamesWrapper with `fetchGames`, `createGame`, `join`, `fetchHand`, `start`, `playCard`, `fetchAllPlayedCards`, `pickCard` functions
- UserWrapper with `register` and `login` function
- eslint

[Unreleased]: https://github.com/CardJizzerApp/CardJizzerWrapper/compare/v1.0.0...HEAD
[0.1.0]: https://github.com/CardJizzerApp/CardJizzerWrapper/tree/4d620ba4615d11034739383bd7af67b23bea0929
[0.1.1]: https://github.com/CardJizzerApp/CardJizzerWrapper/tree/4e0746b0d9b77eb136d98e28ea48d75e19a64cdd
