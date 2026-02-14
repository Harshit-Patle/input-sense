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
- Flags placeholder words
- Detects sequential patterns
- Detects reverse sequences
- Identifies keyboard patterns
- Supports returning all detected issues (`mode: "all"`)
- Allows enabling/disabling specific rules
- Lightweight and dependency-free
- Frontend-friendly
- Includes automated tests for core validation logic

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

### Disable specific rules

You can disable specific validation rules if they are not relevant for your use case.

```js
senseInput("aa", {
  mode: "all",
  disable: ["repeatedChar"]
});
```

### Rule Configuration Examples

You can fine-tune certain rules using the `rules` option.

#### Customize minimum length sensitivity

```js
senseInput("hello", {
  rules: {
    minLength: {
      minLength: 6
    }
  }
});
```
This increases the minimum required length from the default value.

#### Customize entropy (character diversity)
```js
senseInput("abcdef", {
  rules: {
    entropy: {
      minLength: 6,
      minRatio: 0.9
    }
  }
});
```
This makes entropy detection more strict by requiring higher character diversity.

#### Combine multiple rule configurations
```js
senseInput("aa", {
  mode: "all",
  rules: {
    minLength: {
      minLength: 5
    },
    entropy: {
      minLength: 6,
      minRatio: 0.6
    }
  }
});
```
Multiple rules can be configured together, and defaults apply to any rule not configured.

### When to use `mode: "all"`

Use `mode: "all"` when:
- You want to show multiple validation hints at once
- You are building rich form UX
- You want analytics or debugging insight

Use the default mode when:
- You only need the first blocking issue
- You want fast, simple validation

---

## Rule Configuration

Some rules support fine-grained configuration via the `rules` option.

All rules have safe defaults, and unknown rule names are safely ignored.

---

## Example Outputs

```js
senseInput("aaaa");
// Input looks like repeated characters

senseInput("test");
// Input looks like a placeholder word

senseInput("1234");
// Input looks like a sequential pattern

senseInput("9876");
// Input looks like a reverse sequential pattern

senseInput("qwerty");
// Input looks like a keyboard pattern

senseInput("Harshit");
// null
```

---

## Test Coverage

This project uses automated test coverage to ensure reliability.  
Coverage is collected and reported on every commit via CI.

---

## Mental Model

Think of `input-sense` as an **intent checker**, not a validator.

It runs a series of small, focused rules to answer one question:

> “Does this input look meaningful for a human?”

- Each rule checks a specific pattern
- Rules run in a fixed order
- By default, the first issue is returned
- You can opt into collecting all issues

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
|--------|----------------|
Simple forms | Default mode |
Rich UX | `mode: "all"` |
Strict apps | Enable entropy tuning |
JS projects | Rely on runtime behavior |
TS projects | Enjoy full type safety |

---

## Author

[**Harshit Patle**](https://github.com/Harshit-Patle)

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.
