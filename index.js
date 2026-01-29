import { repeatedCharRule } from "./rules/repeatedChar.js";
import { placeholderWordRule } from "./rules/placeholderWord.js";
import { sequentialPatternRule } from "./rules/sequentialPattern.js";
import { reverseSequentialPatternRule } from "./rules/reverseSequentialPattern.js";
import { keyboardPatternRule } from "./rules/keyboardPattern.js";
import { minLengthRule } from "./rules/minLength.js";
import { entropyRule } from "./rules/entropyRule.js";

export function senseInput(value) {

    // Rule: repeated characters
    const repeatedCharResult = repeatedCharRule(value);
    if (repeatedCharResult) return repeatedCharResult;

    // Rule: placeholder words
    const placeholderWordResult = placeholderWordRule(value);
    if (placeholderWordResult) return placeholderWordResult;

    // Rule: minimum meaningful length
    const minLengthResult = minLengthRule(value);
    if (minLengthResult) return minLengthResult;

    // Rule: sequential patterns
    const sequentialPatternResult = sequentialPatternRule(value);
    if (sequentialPatternResult) return sequentialPatternResult;

    // Rule: reverse sequential patterns
    const reverseSequentialPatternResult = reverseSequentialPatternRule(value);
    if (reverseSequentialPatternResult) return reverseSequentialPatternResult;

    // Rule: keyboard patterns
    const keyboardPatternResult = keyboardPatternRule(value);
    if (keyboardPatternResult) return keyboardPatternResult;

    // Rule: character diversity / entropy
    const entropyResult = entropyRule(value);
    if (entropyResult) return entropyResult;

    // no issue found
    return null;
}