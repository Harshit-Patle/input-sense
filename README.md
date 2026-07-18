![npm version](https://img.shields.io/npm/v/input-sense.svg)
![npm downloads](https://img.shields.io/npm/dw/input-sense.svg)
![coverage](https://codecov.io/gh/Harshit-Patle/input-sense/branch/main/graph/badge.svg)
![CI](https://github.com/Harshit-Patle/input-sense/actions/workflows/ci.yml/badge.svg)
![license](https://img.shields.io/github/license/Harshit-Patle/input-sense)

---

# input-sense

A lightweight JavaScript utility that detects low-quality, fake, or placeholder user inputs that pass traditional regex validation.

It adds a human-intent layer on top of normal validation.

---

## Why input-sense

Most validation libraries focus on syntax, not intent.

Inputs like:

- `aaaa`
- `test`
- `123456`
- `qwerty`
- `asdf`
- `😊😊😊`
- `password`

often pass validation even though they are meaningless.

input-sense helps detect such inputs early and improve overall data quality.

---

## Features

- Detects repeated characters
- Flags placeholder words (38 built-in + custom words support)
- Detects sequential patterns
- Detects reverse sequences
- Identifies keyboard patterns
- Detects all-caps inputs
- Detects unicode/emoji-only inputs
- Detects leet speak placeholder variants (e.g. `4dmin`, `t3st`)
- **Input type presets** — smart rule configuration for `email`, `fullName`, `pin`, `phone`, and `password` fields
- Supports returning all detected issues (`mode: "all"`)
- Supports structured output with rule names (`mode: "detailed"`)
- Supports quality scoring (`mode: "score"`)
- Allows enabling/disabling specific rules
- Supports custom rule execution order via `priority` option
- Supports per-rule configuration for fine-grained tuning
- Batch validation for multiple form fields (`senseInputBatch`)
- Runtime rule discovery (`listRules`)
- Ships as both ESM and CommonJS
- Lightweight and dependency-free
- Frontend-friendly
- Full TypeScript support with per-mode return type inference
- Includes automated tests for core validation logic
- Detects symbol-only or whitespace inputs
- Detects numeric-only inputs
- Detects repeated word patterns
- Detects low vowel ratio (non-human-like input)

---

## Installation

Using **npm**:

```bash
npm install input-sense
```

Using **yarn**:

```bash
yarn add input-sense
```

Using **pnpm**:

```bash
pnpm add input-sense
```

---

## Usage

```js
import { senseInput } from "input-sense";

const result = senseInput("qwerty");

if (result) {
  console.log(result);
} else {
  console.log("Input looks valid");
}
```

CommonJS is also supported:

```js
const { senseInput } = require("input-sense");
```

---

## Input Type Presets

Use the `type` option to automatically apply the right rules for a specific form field.
No need to manually configure `disable`, `rules`, or `priority` — the preset handles it.

### `type: "email"`

Validates email inputs with comprehensive real-world checks:

```js
senseInput("harshit@gmail.com", { type: "email" })
// null — valid email

senseInput("test@gmail.com", { type: "email" })
// "Email local part looks like a placeholder"

senseInput("user@mailinator.com", { type: "email" })
// "Email domain looks disposable or fake"

senseInput("noreply@gmail.com", { type: "email" })
// "Email local part looks like a system address"

senseInput("notanemail", { type: "email" })
// "Input does not look like a valid email address"

senseInput("1234@gmail.com", { type: "email" })
// "Input does not look like a valid email address"

senseInput("user@gmai1.com", { type: "email" })
// "Input does not look like a valid email address"

senseInput("test+123@gmail.com", { type: "email" })
// "Email local part looks like a placeholder"

senseInput("harshit+work@gmail.com", { type: "email" })
// null — legitimate plus tag
```

**Email config options:**

```js
// Only allow specific domains
senseInput("user@gmail.com", {
  type: "email",
  rules: {
    validEmailFormat: {
      allowedDomains: ["company.com", "company.co.in"]
    }
  }
})
// "Email domain is not accepted"

// Block additional domains
senseInput("user@competitor.com", {
  type: "email",
  rules: {
    validEmailFormat: {
      blockedDomains: ["competitor.com"]
    }
  }
})
// "Email domain looks disposable or fake"
```

**What email validation covers:**
- Format: `@` count, local part 2–64 chars, total max 254 chars
- No all-numeric local parts, no consecutive dots, no leading/trailing dots
- Domain name cannot contain digits (catches `gmai1.com`, `g00gle.com`)
- Domain cannot start or end with hyphens
- 33 built-in blocked disposable domains
- Blocked system addresses: `noreply`, `postmaster`, `support`, `admin`, `info` and more
- Placeholder detection in local part segments (`test.user@`, `demo_app@`)
- Plus-tag placeholder detection

---

### `type: "fullName"`

Validates full name inputs requiring first and last name:

```js
senseInput("Harshit Patle", { type: "fullName" })
// null — valid full name

senseInput("Harshit", { type: "fullName" })
// "Please enter your full name (first and last name)"

senseInput("HARSHIT PATLE", { type: "fullName" })
// "Input contains only uppercase letters and looks non-meaningful"

senseInput("J Smith", { type: "fullName" })
// "Each part of your name must be at least 2 characters"

senseInput("John 123", { type: "fullName" })
// "Name parts must contain only letters"

senseInput("Mary-Jane Watson", { type: "fullName" })
// null — hyphenated names supported

senseInput("O'Brien Connor", { type: "fullName" })
// null — apostrophe names supported

senseInput("María García", { type: "fullName" })
// null — accented characters supported

senseInput("St. John Smith", { type: "fullName" })
// null — dotted prefixes supported

senseInput("john smith", { type: "fullName" })
// null — casing is not enforced
```

**What fullName validation covers:**
- Must contain a space (first and last name required)
- Each name part minimum 2 characters
- No digits in any name part
- Supports hyphens, apostrophes, dots in names
- Supports Unicode/accented characters
- Normalizes multiple spaces automatically
- Maximum 100 characters total
- Catches placeholder words, repeated chars, all-caps, keyboard patterns

**Disable space requirement for mononyms:**

```js
senseInput("Beyonce", {
  type: "fullName",
  disable: ["spaceRequired"]
})
// null
```

---

### `type: "pin"`

Validates PIN inputs for numeric-only fields:

```js
senseInput("1478", { type: "pin" })
// null — valid PIN

senseInput("123", { type: "pin" })
// "PIN must be at least 4 digits"

senseInput("1111", { type: "pin" })
// "PIN must not contain repeated digits"

senseInput("1234", { type: "pin" })
// null — sequential digits allowed by default

senseInput("147258", { type: "pin" })
// null — valid 6-digit PIN

senseInput("1234567", { type: "pin" })
// "PIN must be at most 6 digits"

senseInput("abcd", { type: "pin" })
// "PIN must contain only numbers"
```

**PIN config options:**

```js
// Disallow sequential digits
senseInput("1234", {
  type: "pin",
  rules: { pinRule: { noSequential: true } }
})
// "PIN must not contain sequential digits"

// Allow repeated digits
senseInput("1111", {
  type: "pin",
  rules: { pinRule: { noRepeated: false } }
})
// null
```

**What PIN validation covers:**
- Numeric-only (no letters, no special characters)
- Default length: 4–6 digits (configurable)
- No repeated digits (configurable, default: true)
- No sequential digits (configurable, default: false)
- Configurable min/max length

---

### `type: "phone"`

Validates phone numbers with international format support:

```js
senseInput("1234567890", { type: "phone" })
// null — valid 10-digit phone

senseInput("(123) 456-7890", { type: "phone" })
// null — formatted phone

senseInput("+1 234-567-8900", { type: "phone" })
// null — international format

senseInput("+91 98765 43210", { type: "phone" })
// null — India format

senseInput("123", { type: "phone" })
// "Phone number must contain at least 10 digits"

senseInput("abc123", { type: "phone" })
// "Phone number must contain only numbers and valid separators"

senseInput("1111111111", { type: "phone" })
// null — repeated digits allowed by default
```

**Phone config options:**

```js
// Disallow repeated digits
senseInput("1111111111", {
  type: "phone",
  rules: { phoneRule: { noRepeated: true } }
})
// "Phone number must not contain repeated digits"

// Custom digit range
senseInput("12345", {
  type: "phone",
  rules: { phoneRule: { minDigits: 5, maxDigits: 15 } }
})
// null
```

**What phone validation covers:**
- Digit count: 10–15 by default (configurable)
- Allows separators: `+`, spaces, dashes, parentheses (configurable)
- No letters allowed
- Repeated digits check (configurable, default: false)
- International format support

---

### `type: "password"`

Validates password strength with comprehensive checks:

```js
senseInput("Harshit@123", { type: "password" })
// null — strong password

senseInput("harshit", { type: "password" })
// "Password must be at least 8 characters"

senseInput("harshit123", { type: "password" })
// "Password must contain at least 1 uppercase letter"

senseInput("HARSHIT123", { type: "password" })
// "Password must contain at least 1 lowercase letter"

senseInput("Harshit@", { type: "password" })
// "Password must contain at least 1 number"

senseInput("Harshit123", { type: "password" })
// "Password must contain at least 1 special character"

senseInput("password", { type: "password" })
// "Password is too common and easily guessable"

senseInput("P@ssw0rd", { type: "password" })
// "Password is too common and easily guessable"
```

**Password config options:**

```js
// Custom minimum length
senseInput("H@1", {
  type: "password",
  rules: { passwordStrength: { minLength: 3, requireSpecial: true } }
})
// null

// Skip uppercase requirement
senseInput("harshit@123", {
  type: "password",
  rules: { passwordStrength: { requireUppercase: false } }
})
// null

// Skip common password check
senseInput("password123", {
  type: "password",
  rules: { passwordStrength: { checkCommon: false } }
})
// null
```

**What password validation covers:**
- Minimum length: 8 by default (configurable)
- At least 1 uppercase letter (configurable)
- At least 1 lowercase letter (configurable)
- At least 1 number (configurable)
- At least 1 special character (configurable)
- Common password blacklist (50+ entries, configurable)
- Works alongside existing rules (repeatedChar, keyboardPattern, sequential, leetSpeak, entropy, minLength)

---

## Advanced Usage

### Get all detected issues

By default, `input-sense` returns only the first detected issue.
To get **all detected issues**, use `mode: "all"`.

```js
senseInput("aa", { mode: "all" });
```

### Get structured output with rule names

Use `mode: "detailed"` to get back an array of `{ rule, message }` objects.
This is useful when you want to show different UI feedback per rule.

```js
senseInput("aaaa", { mode: "detailed" });
// [{ rule: "repeatedChar", message: "Input looks like repeated characters" }]
```

### Get a quality score

Use `mode: "score"` to get a 0–100 quality score instead of pass/fail.
100 means fully clean, 0 means completely unusable.

```js
senseInput("Harshit", { mode: "score" });
// 100

senseInput("aaaa", { mode: "score" });
// 0
```

### Validate multiple fields at once

Use `senseInputBatch` to validate an entire form object in one call.

```js
import { senseInputBatch } from "input-sense";

senseInputBatch({
  email: "harshit@gmail.com",
  fullName: "Harshit Patle"
}, { type: "email" });
```

Or validate different field types separately:

```js
const emailResult = senseInput(emailValue, { type: "email" });
const nameResult = senseInput(nameValue, { type: "fullName" });
const pinResult = senseInput(pinValue, { type: "pin" });
const phoneResult = senseInput(phoneValue, { type: "phone" });
const passwordResult = senseInput(passwordValue, { type: "password" });
```

### Control rule execution order

```js
senseInput("aaaa", {
  priority: ["minLength", "repeatedChar"],
  rules: { minLength: { minLength: 5 } }
});
// "Input is too short to be meaningful (minimum 5 characters)"
```

### Discover available rules at runtime

```js
import { listRules } from "input-sense";

listRules();
// ["spaceRequired", "repeatedChar", "allCaps", "unicodeOnly", "symbolOnly",
//  "numericOnly", "placeholderWord", "leetSpeak", "repeatedWord", "minLength",
//  "sequential", "reverseSequential", "keyboardPattern", "entropy",
//  "lowVowelRatio", "validEmailFormat", "namePartsRule", "pinRule",
//  "phoneRule", "passwordStrength"]
```

### Disable specific rules

```js
senseInput("aa", {
  mode: "all",
  disable: ["repeatedChar"]
});
```

### Rule Configuration Examples

#### repeatedChar — custom repetition threshold

```js
senseInput("aaa", {
  rules: { repeatedChar: { threshold: 4 } }
});
// null — only flags when 5+ repetitions
```

#### placeholderWord — add custom words

```js
senseInput("mycustomword", {
  rules: { placeholderWord: { customWords: ["mycustomword"] } }
});
// "Input looks like a placeholder word"
```

#### keyboardPattern — custom minimum length

```js
senseInput("qw", {
  rules: { keyboardPattern: { minLength: 5 } }
});
// null — input is too short to check
```

#### repeatedWord — allow some duplication

```js
senseInput("hey hey there", {
  rules: { repeatedWord: { maxAllowedRatio: 0.6 } }
});
// null
```

#### minLength — custom minimum length

```js
senseInput("hello", {
  rules: { minLength: { minLength: 6 } }
});
// "Input is too short to be meaningful (minimum 6 characters)"
```

#### pinRule — custom PIN config

```js
senseInput("1234", {
  type: "pin",
  rules: { pinRule: { noSequential: true } }
});
// "PIN must not contain sequential digits"
```

#### phoneRule — custom phone config

```js
senseInput("1111111111", {
  type: "phone",
  rules: { phoneRule: { noRepeated: true } }
});
// "Phone number must not contain repeated digits"
```

#### passwordStrength — custom password config

```js
senseInput("Harshit123", {
  type: "password",
  rules: { passwordStrength: { requireSpecial: false } }
});
// null
```

### When to use each mode

| Mode | Returns | Use when |
|------|---------|----------|
| `"first"` (default) | `string \| null` | You only need the first blocking issue |
| `"all"` | `string[] \| null` | You want to show all issues at once |
| `"detailed"` | `{ rule, message }[] \| null` | You need to know which rule fired |
| `"score"` | `number` | You want a 0–100 quality score |

---

## Rule Configuration Reference

| Rule | Config option | Type | Default | Description |
|------|--------------|------|---------|-------------|
| `repeatedChar` | `threshold` | `number` | `0` | Min repetitions before flagging |
| `allCaps` | `minLength` | `number` | `4` | Min length before checking |
| `unicodeOnly` | `minLength` | `number` | `1` | Min length before checking |
| `placeholderWord` | `customWords` | `string[]` | `[]` | Extra words to flag |
| `leetSpeak` | `customWords` | `string[]` | `[]` | Extra decoded words to flag |
| `keyboardPattern` | `minLength` | `number` | `3` | Min length before checking |
| `repeatedWord` | `maxAllowedRatio` | `number` | `0` | Max allowed duplication ratio |
| `lowVowelRatio` | `minLength` | `number` | `5` | Min length before checking |
| `lowVowelRatio` | `minRatio` | `number` | `0.2` | Min vowel ratio required |
| `minLength` | `minLength` | `number` | `4` | Min required input length |
| `entropy` | `minLength` | `number` | `6` | Min length before checking |
| `entropy` | `minRatio` | `number` | `0.6` | Min character diversity ratio |
| `validEmailFormat` | `allowedDomains` | `string[]` | `[]` | Whitelist specific domains |
| `validEmailFormat` | `blockedDomains` | `string[]` | `[]` | Extra domains to block |
| `pinRule` | `minLength` | `number` | `4` | Min PIN length |
| `pinRule` | `maxLength` | `number` | `6` | Max PIN length |
| `pinRule` | `noRepeated` | `boolean` | `true` | Disallow repeated digits |
| `pinRule` | `noSequential` | `boolean` | `false` | Disallow sequential digits |
| `phoneRule` | `minDigits` | `number` | `10` | Min digit count |
| `phoneRule` | `maxDigits` | `number` | `15` | Max digit count |
| `phoneRule` | `allowPlus` | `boolean` | `true` | Allow + sign |
| `phoneRule` | `allowSpaces` | `boolean` | `true` | Allow spaces |
| `phoneRule` | `allowDashes` | `boolean` | `true` | Allow dashes |
| `phoneRule` | `allowParens` | `boolean` | `true` | Allow parentheses |
| `phoneRule` | `noRepeated` | `boolean` | `false` | Disallow repeated digits |
| `passwordStrength` | `minLength` | `number` | `8` | Min password length |
| `passwordStrength` | `requireUppercase` | `boolean` | `true` | Require uppercase |
| `passwordStrength` | `requireLowercase` | `boolean` | `true` | Require lowercase |
| `passwordStrength` | `requireNumber` | `boolean` | `true` | Require number |
| `passwordStrength` | `requireSpecial` | `boolean` | `true` | Require special char |
| `passwordStrength` | `checkCommon` | `boolean` | `true` | Check common passwords |

All rules have safe defaults. Unknown rule names in `rules` config are safely ignored.

---

## Example Outputs

```js
senseInput("aaaa");
// "Input looks like repeated characters"

senseInput("HELLO");
// "Input contains only uppercase letters and looks non-meaningful"

senseInput("🔥🔥🔥");
// "Input contains no standard characters and looks non-meaningful"

senseInput("4dmin");
// "Input looks like a leet speak placeholder word"

senseInput("test");
// "Input looks like a placeholder word"

senseInput("1234");
// "Input looks like a sequential pattern"

senseInput("9876");
// "Input looks like a reverse sequential pattern"

senseInput("qwerty");
// "Input looks like a keyboard pattern"

senseInput("123456");
// "Input contains only numbers and looks non-meaningful"

senseInput("test test test");
// "Input contains repeated words and looks non-meaningful"

senseInput("bcdfgh");
// "Input has very low vowel presence and looks non-meaningful"

senseInput("Harshit");
// null
```

---

## Test Coverage

This project uses automated test coverage to ensure reliability.
Coverage is collected and reported on every commit via CI.
All rule files maintain 100% coverage across statements, branches, functions, and lines.

---

## Mental Model

Think of `input-sense` as an **intent checker**, not a validator.

It runs a series of small, focused rules to answer one question:

> "Does this input look meaningful for a human?"

- Each rule checks a specific pattern
- Rules run in a configurable order
- Type presets automatically apply the right rules for each field
- By default, the first issue is returned
- You can opt into collecting all issues, structured output, or a quality score

---

## How it works

### Validation flow

```
User Input
    ↓
input-sense
• Regex validation (minLength, numericOnly, sequential patterns, etc.)
• Intent detection (placeholder words, disposable emails, leet-speak, etc.)
• Optional type presets (email, fullName, pin, phone, password)
    ↓
Pass → valid input
Fail → descriptive error message
```

---

## What input-sense does NOT do

- Does not replace backend validation
- Does not replace regex validation
- Does not block submissions automatically
- Does not use AI
- Does not store user data

---

## Limitations

- This library does not guarantee semantic correctness
- It does not understand language meaning
- It should be used alongside traditional validation

---

## Use Cases

- Signup and login forms
- Admin dashboards
- Hackathon projects
- Educational platforms
- Frontend UX improvement
- Pre-API input sanity checks
- PIN entry forms
- Phone number collection
- Password strength indicators

---

## Project Status

This project is actively maintained.
All core validation rules are covered by automated tests and enforced via CI.

---

## Quick Guide

| Use case | Recommendation |
|----------|----------------|
| Email field | `type: "email"` |
| Full name field | `type: "fullName"` |
| PIN field | `type: "pin"` |
| Phone field | `type: "phone"` |
| Password field | `type: "password"` |
| Simple forms | Default mode |
| Rich UX | `mode: "all"` |
| Rule-specific UX | `mode: "detailed"` |
| Live quality indicator | `mode: "score"` |
| Full form validation | `senseInputBatch` |
| Custom rule order | `priority` option |
| Strict apps | Enable entropy tuning |
| JS projects | ESM or CommonJS |
| TS projects | Enjoy full type safety |

---

## Author

[**Harshit Patle**](https://github.com/Harshit-Patle)

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.