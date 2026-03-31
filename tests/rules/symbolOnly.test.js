import { describe, it, expect } from "vitest";
import { symbolOnlyRule } from "../../rules/symbolOnlyRule.js";

describe("symbolOnlyRule", () => {
    it("detects symbol-only input", () => {
        expect(symbolOnlyRule("----")).toBeTruthy();
        expect(symbolOnlyRule("*****")).toBeTruthy();
        expect(symbolOnlyRule("     ")).toBeTruthy();
    });

    it("allow alphanumeric input", () => {
        expect(symbolOnlyRule("a")).toBe(null);
        expect(symbolOnlyRule("a-1")).toBe(null);
        expect(symbolOnlyRule("hello!")).toBe(null);
    });

    it("returns null for empty input", () => {
        expect(symbolOnlyRule("")).toBe(null);
        expect(symbolOnlyRule(null)).toBe(null);
    });
});