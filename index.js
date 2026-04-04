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

export function senseInput(value, options = {}) {
  const mode = options.mode || "first";
  const issues = [];
  const disabledRules = options.disable || [];
  const ruleConfigs = options.rules || {};

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
    "allCaps"
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
    if (mode === "all" || mode === "detailed") {
      issues.push({ rule: ruleName, message });
      return false;
    }
    return true;
  }

  // Rule: repeated characters
  if (!disabledRules.includes("repeatedChar")) {
    const repeatedCharConfig = ruleConfigs.repeatedChar || {};
    const result = repeatedCharRule(value, repeatedCharConfig.threshold);
    if (handle("repeatedChar", result)) return mode === "detailed" ? { rule: "repeatedChar", message: result } : result;
  }

  // Rule: all caps input
  if (!disabledRules.includes("allCaps")) {
    const allCapsConfig = ruleConfigs.allCaps || {};
    const result = allCapsRule(value, allCapsConfig.minLength);
    if (handle("allCaps", result)) return mode === "detailed" ? { rule: "allCaps", message: result } : result;
  }

  // Rule: symbol only / whitespace
  if (!disabledRules.includes("symbolOnly")) {
    const result = symbolOnlyRule(value);
    if (handle("symbolOnly", result)) return mode === "detailed" ? { rule: "symbolOnly", message: result } : result;
  }

  // Rule: numeric-only input
  if (!disabledRules.includes("numericOnly")) {
    const result = numericOnlyRule(value);
    if (handle("numericOnly", result)) return mode === "detailed" ? { rule: "numericOnly", message: result } : result;
  }

  // Rule: placeholder words
  if (!disabledRules.includes("placeholderWord")) {
    const placeholderConfig = ruleConfigs.placeholderWord || {};
    const result = placeholderWordRule(value, placeholderConfig.customWords);
    if (handle("placeholderWord", result)) return mode === "detailed" ? { rule: "placeholderWord", message: result } : result;
  }

  // Rule: repeated words
  if (!disabledRules.includes("repeatedWord")) {
    const repeatedWordConfig = ruleConfigs.repeatedWord || {};
    const result = repeatedWordRule(value, repeatedWordConfig.maxAllowedRatio);
    if (handle("repeatedWord", result)) return mode === "detailed" ? { rule: "repeatedWord", message: result } : result;
  }

  // Rule: minimum meaningful length
  if (!disabledRules.includes("minLength")) {
    const minLengthConfig = ruleConfigs.minLength || {};
    const result = minLengthRule(value, minLengthConfig.minLength);
    if (handle("minLength", result)) return mode === "detailed" ? { rule: "minLength", message: result } : result;
  }

  // Rule: sequential patterns
  if (!disabledRules.includes("sequential")) {
    const result = sequentialPatternRule(value);
    if (handle("sequential", result)) return mode === "detailed" ? { rule: "sequential", message: result } : result;
  }

  // Rule: reverse sequential patterns
  if (!disabledRules.includes("reverseSequential")) {
    const result = reverseSequentialPatternRule(value);
    if (handle("reverseSequential", result)) return mode === "detailed" ? { rule: "reverseSequential", message: result } : result;
  }

  // Rule: keyboard patterns
  if (!disabledRules.includes("keyboardPattern")) {
    const keyboardPatternConfig = ruleConfigs.keyboardPattern || {};
    const result = keyboardPatternRule(value, keyboardPatternConfig.minLength);
    if (handle("keyboardPattern", result)) return mode === "detailed" ? { rule: "keyboardPattern", message: result } : result;
  }

  // Rule: character diversity / entropy
  if (!disabledRules.includes("entropy")) {
    const entropyConfig = ruleConfigs.entropy || {};
    const result = entropyRule(value, entropyConfig.minLength, entropyConfig.minRatio);
    if (handle("entropy", result)) return mode === "detailed" ? { rule: "entropy", message: result } : result;
  }

  // Rule: low vowel ratio
  if (!disabledRules.includes("lowVowelRatio")) {
    const vowelConfig = ruleConfigs.lowVowelRatio || {};
    const result = vowelRatioRule(value, vowelConfig.minLength, vowelConfig.minRatio);
    if (handle("lowVowelRatio", result)) return mode === "detailed" ? { rule: "lowVowelRatio", message: result } : result;
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
    "symbolOnly",
    "numericOnly",
    "placeholderWord",
    "repeatedWord",
    "minLength",
    "sequential",
    "reverseSequential",
    "keyboardPattern",
    "entropy",
    "lowVowelRatio"
  ];
}