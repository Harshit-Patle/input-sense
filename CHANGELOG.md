# Changelog

> ℹ️ Note: Versions prior to 0.4.0 were early experimental releases.
> This changelog tracks stable, user-facing changes from 0.4.0 onward.

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