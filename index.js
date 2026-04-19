import { repeatedCharRule } from "./rules/repeatedChar.js";
import { placeholderWordRule } from "./rules/placeholderWord.js";
import { sequentialPatternRule } from "./rules/sequentialPattern.js";
import { reverseSequentialPatternRule } from "./rules/reverseSequentialPattern.js";
import { keyboardPatternRule } from "./rules/keyboardPattern.js";
import { minLengthRule } from "./rules/minLength.js";
import { entropyRule } from "./rules/entropyRule.js";
import { symbolOnlyRule } from "./rules/symbolOnlyRule.js";
import { numericOnlyRule } from "./rules/numericOnlyRule.js";
import { repeatedWordRule } from "./rules/repeatedWordRule.js";
import { vowelRatioRule } from "./rules/vowelRatioRule.js";
import { allCapsRule } from "./rules/allCapsRule.js";
import { unicodeOnlyRule } from "./rules/unicodeOnlyRule.js";
import { leetSpeakRule } from "./rules/leetSpeakRule.js";

export function senseInput(value, options = {}) {
  const mode = options.mode || "first";
  const issues = [];
  const disabledRules = options.disable || [];
  const ruleConfigs = options.rules || {};
  const priority = options.priority || [];

  const RULE_WEIGHTS = {
    repeatedChar: 100,
    allCaps: 30,
    unicodeOnly: 100,
    symbolOnly: 100,
    numericOnly: 60,
    placeholderWord: 80,
    leetSpeak: 80,
    repeatedWord: 50,
    minLength: 40,
    sequential: 70,
    reverseSequential: 70,
    keyboardPattern: 90,
    entropy: 50,
    lowVowelRatio: 40,
  };

  const KNOWN_RULES = [
    "repeatedChar",
    "placeholderWord",
    "minLength",
    "sequential",
    "reverseSequential",
    "keyboardPattern",
    "entropy",
    "symbolOnly",
    "numericOnly",
    "repeatedWord",
    "lowVowelRatio",
    "allCaps",
    "unicodeOnly",
    "leetSpeak"
  ];

  if (process.env.NODE_ENV !== "production") {
    disabledRules.forEach((rule) => {
      if (!KNOWN_RULES.includes(rule)) {
        console.warn(`[input-sense] Unknown rule "${rule}"`);
      }
    });
  }

  function handle(ruleName, message) {
    if (!message) return false;
    if (mode === "all" || mode === "detailed" || mode === "score") {
      issues.push({ rule: ruleName, message });
      return false;
    }
    return true;
  }

  const ALL_RULES = [
    {
      name: "repeatedChar",
      run: () => repeatedCharRule(value, (ruleConfigs.repeatedChar || {}).threshold),
    },
    {
      name: "allCaps",
      run: () => allCapsRule(value, (ruleConfigs.allCaps || {}).minLength),
    },
    {
      name: "unicodeOnly",
      run: () => unicodeOnlyRule(value, (ruleConfigs.unicodeOnly || {}).minLength),
    },
    {
      name: "symbolOnly",
      run: () => symbolOnlyRule(value),
    },
    {
      name: "numericOnly",
      run: () => numericOnlyRule(value),
    },
    {
      name: "placeholderWord",
      run: () => placeholderWordRule(value, (ruleConfigs.placeholderWord || {}).customWords),
    },
    {
      name: "leetSpeak",
      run: () => leetSpeakRule(value, (ruleConfigs.leetSpeak || {}).customWords),
    },
    {
      name: "repeatedWord",
      run: () => repeatedWordRule(value, (ruleConfigs.repeatedWord || {}).maxAllowedRatio),
    },
    {
      name: "minLength",
      run: () => minLengthRule(value, (ruleConfigs.minLength || {}).minLength),
    },
    {
      name: "sequential",
      run: () => sequentialPatternRule(value),
    },
    {
      name: "reverseSequential",
      run: () => reverseSequentialPatternRule(value),
    },
    {
      name: "keyboardPattern",
      run: () => keyboardPatternRule(value, (ruleConfigs.keyboardPattern || {}).minLength),
    },
    {
      name: "entropy",
      run: () => entropyRule(value, (ruleConfigs.entropy || {}).minLength, (ruleConfigs.entropy || {}).minRatio),
    },
    {
      name: "lowVowelRatio",
      run: () => vowelRatioRule(value, (ruleConfigs.lowVowelRatio || {}).minLength, (ruleConfigs.lowVowelRatio || {}).minRatio),
    },
  ];

  const orderedRules = [
    ...priority
      .filter(name => KNOWN_RULES.includes(name))
      .map(name => ALL_RULES.find(r => r.name === name))
      .filter(Boolean),
    ...ALL_RULES.filter(r => !priority.includes(r.name)),
  ];

  for (const rule of orderedRules) {
    if (disabledRules.includes(rule.name)) continue;
    const result = rule.run();
    if (handle(rule.name, result)) {
      return mode === "detailed" ? { rule: rule.name, message: result } : result;
    }
  }

  if (mode === "score") {
    if (issues.length === 0) return 100;
    const totalDeduction = issues.reduce((sum, issue) => {
      return sum + (RULE_WEIGHTS[issue.rule] || 50);
    }, 0);
    return Math.max(0, 100 - totalDeduction);
  }

  if (mode === "all") {
    return issues.length > 0 ? issues.map(i => i.message) : null;
  }

  if (mode === "detailed") {
    return issues.length > 0 ? issues : null;
  }

  return null;
}

export function senseInputBatch(fields, options = {}) {
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    throw new TypeError("[input-sense] senseInputBatch expects a plain object of field names to values");
  }

  const results = {};

  for (const [field, value] of Object.entries(fields)) {
    results[field] = senseInput(value, options);
  }

  return results;
}

export function listRules() {
  return [
    "repeatedChar",
    "allCaps",
    "unicodeOnly",
    "symbolOnly",
    "numericOnly",
    "placeholderWord",
    "leetSpeak",
    "repeatedWord",
    "minLength",
    "sequential",
    "reverseSequential",
    "keyboardPattern",
    "entropy",
    "lowVowelRatio"
  ];
}