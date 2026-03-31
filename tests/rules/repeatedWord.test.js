import { describe, it, expect } from "vitest";
import { repeatedWordRule } from "../../rules/repeatedWordRule.js";

describe("repeatedWordRule", () => {
    it("detects repeated words", () => {
        expect(repeatedWordRule("test test")).toBeTruthy();
        expect(repeatedWordRule("hello hello hello")).toBeTruthy();
    });

    it("allows normal sentences", () => {
        expect(repeatedWordRule("hello world")).toBe(null);
        expect(repeatedWordRule("this is valid")).toBe(null);
    });

    it("allows input when duplication is under custom maxAllowedRatio", () => {
        const result = repeatedWordRule("hey hey there", 0.6);
        expect(result).toBe(null);
    });

    it("flags input when duplication exceeds custom maxAllowedRatio", () => {
        const result = repeatedWordRule("test test test", 0.3);
        expect(result).toBeTruthy();
    });

    it("uses default behaviour when no maxAllowedRatio is provided", () => {
        const result = repeatedWordRule("test test");
        expect(result).toBeTruthy();
    });

    it("returns null for empty input", () => {
        expect(repeatedWordRule("")).toBe(null);
        expect(repeatedWordRule(null)).toBe(null);
    });

    it("returns null for single word input", () => {
        expect(repeatedWordRule("hello")).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(repeatedWordRule("   ")).toBe(null);
    });
});