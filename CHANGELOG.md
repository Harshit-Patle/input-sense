# Changelog

> ℹ️ Note: Versions prior to 0.4.0 were early experimental releases.
> This changelog tracks stable, user-facing changes from 0.4.0 onward.

## 0.15.0

### Fixed

#### Email
- Blocked emojis and non-ASCII characters in local part (`😊@gmail.com` → fail)
- Added max TLD length (8 chars) – `user@domain.abcdefghi` → fail

#### PIN
- Added common PIN blacklist – `1234`, `1111`, `2580`, `123456` etc. → fail
- `1478`, `3691`, `9876` are NOT blocked (valid non-common PINs)

#### Phone
- Added validation for multiple `+` signs (`+1+234567890` → fail)
- Added validation for empty parentheses (`()1234567890` → fail)
- Added validation for consecutive separators (`123--456-7890` → fail)

#### Tests
- Expanded test coverage for all fixes
- All 309 tests passing

### No Breaking Changes
All existing APIs continue to work.

## 0.14.0

### Added

#### New Presets
- **`type: "pin"`** – PIN validation with configurable length (4–6 digits), no repeated/sequential digits
- **`type: "phone"`** – International phone validation with 10–15 digits, flexible separators (+, spaces, dashes, parentheses)
- **`type: "password"`** – Password strength validation with uppercase, lowercase, number, special character checks, and common password blacklist (50+ entries)

#### New Rules
- `pinRule` – numeric-only PIN validation with configurable options
- `phoneRule` – phone number validation with digit counting and format options
- `passwordStrengthRule` – comprehensive password strength validation with common password blacklist

#### TypeScript
- Added `PinRuleConfig`, `PhoneRuleConfig`, `PasswordStrengthRuleConfig` interfaces
- Updated `InputType` to include `"pin"`, `"phone"`, `"password"`
- Updated `RuleName` with new rule names

#### Tests
- Expanded from 255 to 303 tests
- 100% coverage on all rule files

### Changed
- Updated README with all 5 types and examples
- Updated CHANGELOG with v0.14.0 changes

### No Breaking Changes
All existing APIs continue to work. The new `type` options are additive.

## 0.13.0

- Added `type` option with preset system — automatically configures rules for specific input fields
- Added `type: "email"` preset with comprehensive real-world email validation:
  - Format checks: `@` count, local part length (2–64 chars), total length (max 254 chars)
  - Blocks all-numeric local parts, consecutive dots, leading/trailing dots
  - Blocks domain names with digits (catches `gmai1.com`, `g00gle.com`)
  - Blocks domains starting or ending with hyphens, consecutive dots in domain
  - Expanded blocked disposable domains list (33 providers)
  - Blocked system local parts (`noreply`, `postmaster`, `support`, `admin` etc.)
  - Placeholder detection in local part segments (`test.user@`, `demo_app@`)
  - Plus-tag placeholder detection (`test+123@gmail.com` → fail, `harshit+work@gmail.com` → pass)
  - `allowedDomains` — whitelist specific domains
  - `blockedDomains` — add custom blocked domains
- Added `type: "fullName"` preset with real-world name validation:
  - Requires space between first and last name (`spaceRequired` rule)
  - Each name part must be at least 2 characters
  - No digits allowed in any name part
  - Supports hyphenated names (`Mary-Jane Watson`)
  - Supports apostrophe names (`O'Brien Connor`)
  - Supports accented/Unicode characters (`María García`)
  - Supports dotted prefixes (`St. John Smith`)
  - Normalizes multiple spaces automatically
  - Maximum 100 characters total
- Added `spaceRequired` rule — flags inputs missing a space
- Added `namePartsRule` rule — validates individual name parts
- Added `validEmailFormat` rule — comprehensive email format and quality checking
- Extended `keyboardPattern` rule to check segments in compound inputs (`qwerty@gmail.com`)
- Extended `placeholderWord` rule to check individual words in multi-word inputs
- Updated TypeScript typings for type presets, new rules, and config options
- Added `listTypes()` utility groundwork via preset system
- Expanded test suite from 157 to 231 tests
- No breaking changes

## 0.12.0

- Added CJS dual build — package now ships both ESM and CommonJS via `dist/index.cjs`
- Added `allCaps` rule to detect fully uppercase inputs
- Added `unicodeOnly` rule to detect inputs with no standard Latin or digit characters
- Added `leetSpeak` rule to detect leet speak variants of placeholder words (e.g. `4dmin`, `t3st`)
- Added `mode: "score"` to return a 0–100 input quality score
- Added `priority` option to control rule execution order
- Updated TypeScript typings for all new rules, score mode, and priority option
- Expanded test suite from 112 to 157 tests
- No breaking changes

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