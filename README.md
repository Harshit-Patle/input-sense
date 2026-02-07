![npm version](https://img.shields.io/npm/v/input-sense.svg)
![npm downloads](https://img.shields.io/npm/dw/input-sense.svg)
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

## Author

[**Harshit Patle**](https://github.com/Harshit-Patle)

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.
