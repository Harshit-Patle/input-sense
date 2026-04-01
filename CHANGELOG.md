# Changelog

> ℹ️ Note: Versions prior to 0.4.0 were early experimental releases.
> This changelog tracks stable, user-facing changes from 0.4.0 onward.

## 0.11.0

- Added `exports` field to `package.json` for proper ESM and TypeScript resolution
- Added `sideEffects: false` for tree-shaking support
- Added `engines` field to declare minimum Node.js version
- Added configurable `threshold` option to `repeatedChar` rule
- Added configurable `maxAllowedRatio` option to `repeatedWord` rule
- Added configurable `minLength` option to `keyboardPattern` rule
- Added configurable `minLength` and `minRatio` options to `lowVowelRatio` rule
- Added configurable `customWords` option to `placeholderWord` rule
- Expanded built-in placeholder word list from 6 to 38 words
- Added `mode: "detailed"` to return structured `{ rule, message }` objects
- Added `senseInputBatch()` for validating multiple form fields in one call
- Added `listRules()` utility to expose all available rule names at runtime
- Updated TypeScript typings to cover all new configs, modes, and functions
- Expanded test suite from 58 to 112 tests with full rule and branch coverage
- No breaking changes

## 0.10.0

- Added symbol-only input detection rule
- Added numeric-only input detection rule
- Added repeated word pattern detection
- Added low vowel ratio heuristic rule
- Improved overall input quality detection
- No breaking changes

## 0.9.0

- Added configurable rule tuning for `minLength` and `entropy`
- Added rule enable/disable support with safe defaults
- Improved TypeScript typings for rule configuration
- Expanded README with advanced usage and mental model
- No breaking changes

## 0.8.0

- Added automated test coverage reporting
- Integrated coverage upload into CI
- Added coverage badge to README
- No breaking changes

## 0.7.0

- Added ESLint and Prettier for consistent code quality
- Added full test coverage for all validation rules
- Added GitHub Actions CI to enforce tests on push and PR
- Improved contributor experience and repository signals
- No breaking changes

## 0.6.0

- Added automated test suite using Vitest
- Core validation logic is now covered by tests
- Improved reliability and confidence for contributors
- No breaking changes

## 0.5.0

- Added `mode: "all"` to return all detected issues
- Added rule toggling via `disable` option

## 0.4.0

- Added minimum length validation
- Added entropy-based character diversity check
