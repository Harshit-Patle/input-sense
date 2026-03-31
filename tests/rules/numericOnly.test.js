import { describe, it, expect } from "vitest";
import { numericOnlyRule } from "../../rules/numericOnlyRule.js";

describe("numericOnlyRule", () => {
    it("detects numeric-only input", () => {
        expect(numericOnlyRule("123456")).toBeTruthy();
        expect(numericOnlyRule("0000")).toBeTruthy();
    });

    it("allows mixed input", () => {
        expect(numericOnlyRule("a123")).toBe(null);
        expect(numericOnlyRule("123abc")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(numericOnlyRule("")).toBe(null);
        expect(numericOnlyRule(null)).toBe(null);
    });

    it("returns null for whitespace-only input", () => {
        expect(numericOnlyRule("   ")).toBe(null);
    });
});