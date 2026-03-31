import { describe, it, expect } from "vitest";
import { reverseSequentialPatternRule } from "../../rules/reverseSequentialPattern.js";

describe("reverseSequentialPatternRule", () => {
    it("detects reverse sequential patterns", () => {
        const result = reverseSequentialPatternRule("9876");
        expect(result).toBeTruthy();
    });

    it("returns null for non-sequential input", () => {
        const result = reverseSequentialPatternRule("Harshit");
        expect(result).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(reverseSequentialPatternRule("")).toBe(null);
        expect(reverseSequentialPatternRule(null)).toBe(null);
    });

    it("returns null for non-sequential edge case", () => {
        expect(reverseSequentialPatternRule("abcd")).toBe(null);
    });

    it("returns null for input shorter than 3 characters", () => {
        expect(reverseSequentialPatternRule("98")).toBe(null);
        expect(reverseSequentialPatternRule("z")).toBe(null);
    });
});