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

- aaaa
- test
- 123456
- qwerty
- asdf

often pass validation even though they are meaningless.

input-sense helps detect such inputs early and improve overall data quality.

---

## Features

- Detects repeated characters
- Flags placeholder words (38 built-in + custom words support)
- Detects sequential patterns
- Detects reverse sequences
- Identifies keyboard patterns
- Supports returning all detected issues (`mode: "all"`)
- Supports structured output with rule names (`mode: "detailed"`)
- Allows enabling/disabling specific rules
- Supports per-rule configuration for fine-grained tuning
- Batch validation for multiple form fields (`senseInputBatch`)
- Runtime rule discovery (`listRules`)
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

### Validate multiple fields at once

Use `senseInputBatch` to validate an entire form object in one call.
It accepts the same options as `senseInput` and applies them to every field.

```js
import { senseInputBatch } from "input-sense";

senseInputBatch({
  username: "aaaa",
  email: "test",
  bio: "Harshit"
});
// { username: "Input looks like repeated characters", email: "Input looks like a placeholder word", bio: null }
```

Works with all modes:

```js
senseInputBatch({ username: "aaaa" }, { mode: "detailed" });
// { username: [{ rule: "repeatedChar", message: "Input looks like repeated characters" }] }
```

### Discover available rules at runtime

Use `listRules` to get all available rule names in execution order.

```js
import { listRules } from "input-sense";

listRules();
// ["repeatedChar", "symbolOnly", "numericOnly", "placeholderWord", "repeatedWord",
//  "minLength", "sequential", "reverseSequential", "keyboardPattern", "entropy", "lowVowelRatio"]
```

This is useful for validating your `disable` array before passing it to `senseInput`.

### Disable specific rules

```js
senseInput("aa", {
  mode: "all",
  disable: ["repeatedChar"]
});
```

### Rule Configuration Examples

You can fine-tune rules using the `rules` option.

#### repeatedChar — custom repetition threshold

```js
senseInput("aaa", {
  rules: {
    repeatedChar: { threshold: 4 }
  }
});
// null — only flags when 5+ repetitions (threshold + 1)
```

#### placeholderWord — add custom words

```js
senseInput("mycustomword", {
  rules: {
    placeholderWord: { customWords: ["mycustomword"] }
  }
});
// "Input looks like a placeholder word"
```

#### keyboardPattern — custom minimum length

```js
senseInput("qw", {
  rules: {
    keyboardPattern: { minLength: 5 }
  }
});
// null — input is too short to check
```

#### repeatedWord — allow some duplication

```js
senseInput("hey hey there", {
  rules: {
    repeatedWord: { maxAllowedRatio: 0.6 }
  }
});
// null — duplication ratio is within the allowed limit
```

#### lowVowelRatio — relax vowel requirement

```js
senseInput("bcdfgh", {
  rules: {
    lowVowelRatio: { minRatio: 0.1 }
  }
});
// null — ratio threshold is relaxed
```

#### minLength — custom minimum length

```js
senseInput("hello", {
  rules: {
    minLength: { minLength: 6 }
  }
});
// "Input is too short to be meaningful (minimum 6 characters)"
```

#### entropy — custom character diversity

```js
senseInput("abcdef", {
  rules: {
    entropy: { minLength: 6, minRatio: 0.9 }
  }
});
```

#### Combine multiple rule configurations

```js
senseInput("aa", {
  mode: "all",
  rules: {
    minLength: { minLength: 5 },
    entropy: { minLength: 6, minRatio: 0.6 }
  }
});
```

### When to use each mode

| Mode | Returns | Use when |
|------|---------|----------|
| `"first"` (default) | `string \| null` | You only need the first blocking issue |
| `"all"` | `string[] \| null` | You want to show all issues at once |
| `"detailed"` | `{ rule, message }[] \| null` | You need to know which rule fired |

---

## Rule Configuration Reference

| Rule | Config option | Type | Default | Description |
|------|--------------|------|---------|-------------|
| `repeatedChar` | `threshold` | `number` | `0` | Min repetitions before flagging |
| `placeholderWord` | `customWords` | `string[]` | `[]` | Extra words to flag |
| `keyboardPattern` | `minLength` | `number` | `3` | Min length before checking |
| `repeatedWord` | `maxAllowedRatio` | `number` | `0` | Max allowed duplication ratio |
| `lowVowelRatio` | `minLength` | `number` | `5` | Min length before checking |
| `lowVowelRatio` | `minRatio` | `number` | `0.2` | Min vowel ratio required |
| `minLength` | `minLength` | `number` | `4` | Min required input length |
| `entropy` | `minLength` | `number` | `6` | Min length before checking |
| `entropy` | `minRatio` | `number` | `0.6` | Min character diversity ratio |

All rules have safe defaults. Unknown rule names in `rules` config are safely ignored.

---

## Example Outputs

```js
senseInput("aaaa");
// "Input looks like repeated characters"

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
All 11 rule files maintain 100% coverage across statements, branches, functions, and lines.

---

## Mental Model

Think of `input-sense` as an **intent checker**, not a validator.

It runs a series of small, focused rules to answer one question:

> "Does this input look meaningful for a human?"

- Each rule checks a specific pattern
- Rules run in a fixed order
- By default, the first issue is returned
- You can opt into collecting all issues or structured output

---

## How it works

The library runs multiple checks in a fixed order and returns the first detected issue.

### Validation flow

```
User Input
↓
Regex / Required Validation
↓
input-sense (intent detection)
↓
Backend Validation
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

---

## Project Status

This project is actively maintained.
All core validation rules are covered by automated tests and enforced via CI.

---

## Quick Guide

| Use case | Recommendation |
|----------|----------------|
| Simple forms | Default mode |
| Rich UX | `mode: "all"` |
| Rule-specific UX | `mode: "detailed"` |
| Full form validation | `senseInputBatch` |
| Strict apps | Enable entropy tuning |
| JS projects | Rely on runtime behavior |
| TS projects | Enjoy full type safety |

---

## Author

[**Harshit Patle**](https://github.com/Harshit-Patle)

---

## License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.
