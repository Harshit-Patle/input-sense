import { repeatedCharRule } from "./rules/repeatedChar.js";
import { placeholderWordRule } from "./rules/placeholderWord.js";
import { sequentialPatternRule } from "./rules/sequentialPattern.js";
import { reverseSequentialPatternRule } from "./rules/reverseSequentialPattern.js";
import { keyboardPatternRule } from "./rules/keyboardPattern.js";
import { minLengthRule } from "./rules/minLength.js";
import { entropyRule } from "./rules/entropyRule.js";

export function senseInput(value, options = {}) {

    // select mode type
    const mode = options.mode || "first";
    // issues storage
    const issues = [];
    // store not to use rules
    const disabledRules = options.disable || [];

    // Rule: repeated characters
    if (!disabledRules.includes("repeatedChar")) {
        const repeatedCharResult = repeatedCharRule(value);
        if (repeatedCharResult) {
            if (mode === "all") issues.push(repeatedCharResult);
            else return repeatedCharResult;
        }
    }

    // Rule: placeholder words
    if (!disabledRules.includes("placeholderWord")) {
        const placeholderWordResult = placeholderWordRule(value);
        if (placeholderWordResult) {
            if (mode === "all") issues.push(placeholderWordResult);
            else return placeholderWordResult;
        }
    }

    // Rule: minimum meaningful length
    if (!disabledRules.includes("minLength")) {
        const minLengthResult = minLengthRule(value);
        if (minLengthResult) {
            if (mode === "all") issues.push(minLengthResult);
            else return minLengthResult;
        }
    }

    // Rule: sequential patterns
    if (!disabledRules.includes("sequential")) {
        const sequentialPatternResult = sequentialPatternRule(value);
        if (sequentialPatternResult) {
            if (mode === "all") issues.push(sequentialPatternResult);
            else return sequentialPatternResult;
        }
    }

    // Rule: reverse sequential patterns
    if (!disabledRules.includes("reverseSequential")) {
        const reverseSequentialPatternResult = reverseSequentialPatternRule(value);
        if (reverseSequentialPatternResult) {
            if (mode === "all") issues.push(reverseSequentialPatternResult);
            else return reverseSequentialPatternResult;
        }
    }

    // Rule: keyboard patterns
    if (!disabledRules.includes("keyboardPattern")) {
        const keyboardPatternResult = keyboardPatternRule(value);
        if (keyboardPatternResult) {
            if (mode === "all") issues.push(keyboardPatternResult);
            else return keyboardPatternResult;
        }
    }

    // Rule: character diversity / entropy
    if (!disabledRules.includes("entropy")) {
        const entropyResult = entropyRule(value);
        if (entropyResult) {
            if (mode === "all") issues.push(entropyResult);
            else return entropyResult;
        }
    }

    // no issue found
    if (mode === "all") {
        return issues.length > 0 ? issues : null;
    }

    return null;
}